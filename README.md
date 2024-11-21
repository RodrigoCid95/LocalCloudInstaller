# Descripción

El instalador se actualizó a un paquete `.deb` pero depende de [Samba](https://packages.ubuntu.com/oracular/samba) y de [NGINX](https://nginx.org).

## Dependencias

Para no tener problemas con el instalador, instala las dependencias manualmente con:

```bash
sudo apt update
sudo apt install nginx samba -y
```

## Instalación

Por ser un paquete DEBIAN, instala el paquete con el siguiente comando:

```bash
sudo dpkg -i local-cloud.deb
```

## Configuración

Cuando termine de instalarse el paquete puedes usar `hostname -I` para ver tu IP y acceder a tu servidor con tu navegador, ahí, en el último paso, tendrás que seleccionar los comprimidos del directorio `./apps` de este repositorio. Cuando termines da clic en el botón `Reiniciar` y esto no reiniciará tu servidor sino el servicio del servidor para que reconozca la nueva configuración.