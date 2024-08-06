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
    NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1)
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

if ! command -v nginx >/dev/null 2>&1; then
    echo "instalando Nginx ..."
    sudo apt update
    sudo apt install -y nginx
    if [ $? -eq 0 ]; then
        echo "nginx se ha instalado correctamente."
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

chmod +x ./install
./install
systemctl start local-cloud
systemctl enable nginx
systemctl start nginx
IP=$(hostname -I)
IP=$(echo "$IP" | tr -d '[[:space:]]')
echo "Puedes iniciar sesión desde https://$IP"
