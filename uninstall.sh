#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Este script debe ejecutarse como root" >&2
  exit 1
fi

# Remove Local Cloud
systemctl stop local-cloud
systemctl disable local-cloud
rm /etc/systemd/system/local-cloud.service
rm -R /etc/local-cloud
rm -R /var/lc/

# Remove Samba
read -p "¿Desea eliminar por completo Samba del sistema? (s/S/y/Y para sí): " respuesta
respuesta=$(echo "$respuesta" | tr '[:upper:]' '[:lower:]')
if [[ "$respuesta" == "s" || "$respuesta" == "y" ]]; then
  systemctl stop samba
  systemctl disable samba
  systemctl stop smbd
  systemctl stop nmbd
  systemctl disable smbd
  systemctl disable nmbd
  apt-get remove --purge -y samba samba-common samba-common-bin
  apt-get autoremove -y
  rm -rf /etc/samba
  rm -rf /var/lib/samba
  rm -rf /var/cache/samba
  updatedb
fi

echo "LocalCloud se desinstaló por completo, se recomienda reiniciar."
