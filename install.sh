#!/bin/bash

if [ "$EUID" -ne 0 ]; then
	echo "Este script debe ejecutarse como root" >&2
	exit 1
fi

if systemctl list-units --type=service --all | grep -q "local-cloud"; then
	echo "LocalCloud ya está instalando."
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
	apt-get update
	apt-get install -y samba
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

cp ./local-cloud /etc
mkdir /var/local-cloud
set -eu
dir="/etc/local-cloud"
platform=$(uname -ms)
tgz="$dir/esbuild-0.24.0.tgz"
case $platform in
  'Linux arm64' | 'Linux aarch64') curl -fo "$tgz" "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.24.0.tgz";;
  'Linux x86_64') curl -fo "$tgz" "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.24.0.tgz";;
  *) echo "error: Unsupported platform: $platform"; exit 1
esac
tar -xzf "$tgz" -C "$dir" package/bin/esbuild
mv "$dir/package/bin/esbuild" "$dir"
rm "$tgz"
rm -R "$dir/package"

chmod +x ./install
./install

systemctl daemon-reload
systemctl enable local-cloud
systemctl start local-cloud
systemctl start nginx
IP=$(hostname -I)
IP=$(echo "$IP" | tr -d '[[:space:]]')
echo "Puedes iniciar sesión desde https://$IP"
