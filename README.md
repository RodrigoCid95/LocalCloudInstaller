# Descripción

El instalador se actualizó a un paquete `.deb` pero depende de [Samba](https://packages.ubuntu.com/oracular/samba) y de [NGINX](https://nginx.org).

## Instalación

Para instalar el servidor usa lo siguiente:

```bash
sudo apt update
sudo apt install nginx samba -y
wget https://github.com/RodrigoCid95/LocalCloudInstaller/raw/main/local-cloud.deb
sudo dpkg -i local-cloud.deb
```

## Después de la instalación

Utiliza `hostname -I` para obtener la IP local y accede con tu navegador, sigue los pasos que te indica el asistente de configuración y, además de crear un usuario inicial, tendras que subir los archivos de las aplicaciones iniciales para gestionar el servidor. Puedes descargarlos desde acá:

- [Aplicaciones](https://github.com/RodrigoCid95/LocalCloudInstaller/raw/main/apps/com.apps.sys.zip)
- [Usuarios](https://github.com/RodrigoCid95/LocalCloudInstaller/raw/main/apps/com.users.sys.zip)
- [Archivos](https://github.com/RodrigoCid95/LocalCloudInstaller/raw/main/apps/com.files.sys.zip)
