# Instalación

Despues de clonar el repositorio hay que seguir las siguientes instrucciones:

```sh
# Hay que darle permiso de ejecución al archivo install.sh
sudo chmod +x ./install.sh

# Ejecuta el archivo de instalación
sudo ./install.sh
```
o

```sh
# Ejecuta el archivo de instalación con bash
sudo sh ./install.sh
```

# Actualzación

Es similar a la instalación:

```sh
# Hay que darle permiso de ejecución al archivo update.sh
sudo chmod +x ./update.sh

# Ejecuta el archivo de instalación
sudo ./update.sh
```
o

```sh
# Ejecuta el archivo de instalación con bash
sudo sh ./update.sh
```

# Desinstalación

Es el mismo método:

```sh
# Hay que darle permiso de ejecución al archivo uninstall.sh
sudo chmod +x ./uninstall.sh

# Ejecuta el archivo de instalación
sudo ./update.sh
```
o

```sh
# Ejecuta el archivo de instalación con bash
sudo sh ./uninstall.sh
```

## Nota:

El servidor corre sobre HTTP y espera una encriptación basada en la API [Crypto](https://developer.mozilla.org/es/docs/Web/API/Crypto) y se habilita cuando se usa el protocolo HTTPS. En futuras versiones se va a corregir esto, pero se puede resolver provisionalmente usando [NGINX](https://nginx.org/) como reverse proxy que apunte al puerto 3001.
Un ejemplo de configuración de [NGINX](https://nginx.org/) puede ser el siguiente:

```
server {
    listen 80;
    server_name example.com;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;

    server_name example.com;

    ssl_certificate /etc/nginx/ssl_certificates/cert.pem;
    ssl_certificate_key /etc/nginx/ssl_certificates/key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 1024M;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Considera que el certificado ssl va por tu cuenta, pero te sugiero crearlo con estos comandos:

```
# Genera una llave SSH
openssl genrsa -out key.pem

# Genera una solicitud de servicio de certificado
openssl req -new -key key.pem -out csr.pem

# Finalmente crea el certificado
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```
