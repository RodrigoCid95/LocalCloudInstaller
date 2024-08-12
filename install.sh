#!/bin/bash

if [ "$EUID" -ne 0 ]; then
    echo "Este script debe ejecutarse como root" >&2
    exit 1
fi

if systemctl list-units --type=service --all | grep -q "local-cloud"; then
    echo "LocalCloud ya está instalando."
    if [ -x ./update.sh ]; then
        chmod +x update
        ./update
        exit 0
    else
        echo "El archivo update.sh no existe o no es ejecutable" >&2
        exit 1
    fi
fi

if command -v node &>/dev/null; then
    NODE_VERSION=$(node -v | grep -oP '\d+\.\d+\.\d+')
    NODE_MAJOR_VERSION=$(echo "$NODE_VERSION" | cut -d. -f1)
    if [ "$NODE_MAJOR_VERSION" -lt 20 ]; then
        echo "Actualizando Node.JS ..."
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        apt-get install -y nodejs
    fi
else
    echo "Instalando Nodoe.JS LTS..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    apt-get install -y nodejs
fi

if ! dpkg -l | grep -q "^ii mongodb-org"; then
    echo "Instalando MongoDB ..."
    apt install -y gnupg curl
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    apt update
    apt install -y mongodb-org
    echo "mongodb-org hold" | dpkg --set-selections
    echo "mongodb-org-database hold" | dpkg --set-selections
    echo "mongodb-org-server hold" | dpkg --set-selections
    echo "mongodb-mongosh hold" | dpkg --set-selections
    echo "mongodb-org-mongos hold" | dpkg --set-selections
    echo "mongodb-org-tools hold" | dpkg --set-selections
    systemctl enable mongod
    systemctl daemon-reload
    systemctl start mongod
else
    echo "MongoDB ya está instalado."
fi

if ! command -v nginx >/dev/null 2>&1; then
    echo "instalando Nginx ..."
    sudo apt update
    sudo apt install -y nginx
    if [ $? -eq 0 ]; then
        echo "nginx se ha instalado correctamente."
        mkdir /etc/nginx/ssl_certificate
        openssl genrsa -out /etc/nginx/ssl_certificate/key.pem
        openssl req -new -key /etc/nginx/ssl_certificate/key.pem -out /etc/nginx/ssl_certificate/csr.pem -config ./openssl.cnf
        openssl x509 -req -days 9999 -in /etc/nginx/ssl_certificate/csr.pem -signkey /etc/nginx/ssl_certificate/key.pem -out /etc/nginx/ssl_certificate/cert.pem
        systemctl enable nginx
        systemctl start nginx
    else
        echo "Hubo un problema al instalar nginx."
        exit 1
    fi
fi

if ! dpkg -l | grep -qw samba; then
    echo "Instalando Samba ..."
    apt-get update
    apt-get install -y samba
    if [ $? -eq 0 ]; then
        echo "Samba ha sido instalado exitosamente."
    else
        echo "Hubo un problema al instalar Samba."
        exit 1
    fi
fi

initial_path=$(pwd)
cp -r ./local-cloud /etc
cd /etc/local-cloud
npm i
cd "$initial_path"
cp ./local-cloud.service /etc/systemd/system
mkdir /var/log/local-cloud
systemctl daemon-reload
systemctl enable local-cloud

if ! grep -q "^lc:" /etc/group; then
    groupadd lc
fi

PASSWORD=$(openssl rand -hex 16 | sed 's/\(..\)/\1-/g; s/-\{1,3\}$//; s/^\(...........\)/\1-/')

mongosh --host localhost --port 27017 admin --eval "db.createUser({
  user: 'lc',
  pwd: '$PASSWORD',
  roles: [
    { role: 'readWrite', db: '_lc' }
  ]
})"

echo "$PASSWORD" > /etc/local-cloud/mongod

chmod +x ./install
./install
systemctl start local-cloud
systemctl restart nginx
IP=$(hostname -I)
IP=$(echo "$IP" | tr -d '[[:space:]]')
echo "Puedes iniciar sesión desde https://$IP"
