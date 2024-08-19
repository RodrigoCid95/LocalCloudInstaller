#!/bin/bash

if command -v node &>/dev/null; then
	NODE_VERSION=$(node -v | grep -oP '\d+\.\d+\.\d+')
	NODE_MAJOR_VERSION=$(echo "$NODE_VERSION" | cut -d. -f1)
	if [ "$NODE_MAJOR_VERSION" -lt 20 ]; then
		echo "Actualizando Node.JS ..."
		curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
		bash nodesource_setup.sh
		apt install -y nodejs
		rm nodesource_setup.sh
	else
		echo "Instalando Nodoe.JS LTS..."
		curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
		bash nodesource_setup.sh
		apt install -y nodejs
		rm nodesource_setup.sh
	fi
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
	apt install -y nginx
	if [ $? -eq 0 ]; then
		echo "nginx se ha instalado correctamente."
		mkdir /etc/nginx/ssl_certificate
		openssl genrsa -out /etc/nginx/ssl_certificate/key.pem
		openssl req -new -key /etc/nginx/ssl_certificate/key.pem -out /etc/nginx/ssl_certificate/csr.pem -config ./openssl.cnf
		openssl x509 -req -days 9999 -in /etc/nginx/ssl_certificate/csr.pem -signkey /etc/nginx/ssl_certificate/key.pem -out /etc/nginx/ssl_certificate/cert.pem
		systemctl enable nginx
		systemctl stop nginx
	else
		echo "Hubo un problema al instalar nginx."
		exit 1
	fi
else
	systemctl stop nginx
fi

if ! dpkg -l | grep -qw samba; then
	echo "Instalando Samba ..."
	apt install -y samba
	if [ $? -eq 0 ]; then
		echo "Samba ha sido instalado exitosamente."
	else
		echo "Hubo un problema al instalar Samba."
		exit 1
	fi
fi

if ! grep -q "^lc:" /etc/group; then
	groupadd lc
fi

cp -r ./local-cloud /etc
mkdir /var/log/local-cloud
cp ./local-cloud.service /etc/systemd/system

PASSWORD=$(openssl rand -hex 16 | sed 's/\(..\)/\1-/g; s/-\{1,3\}$//; s/^\(...........\)/\1-/')
mongosh --host localhost --port 27017 admin --eval "db.createUser({
  user: 'lc',
  pwd: '$PASSWORD',
  roles: [
  	{ role: 'readWrite', db: '_lc' }
  ]
})"
echo "$PASSWORD" > /etc/local-cloud/mongod

node ./install.js
IP=$(hostname -I)
IP=$(echo "$IP" | tr -d '[[:space:]]')
echo "Después de reiniciar el sistema, puedes iniciar sesión desde https://$IP"
