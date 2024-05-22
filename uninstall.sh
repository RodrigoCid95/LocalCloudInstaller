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
  sudo systemctl stop smbd
  sudo systemctl stop nmbd
  sudo systemctl disable smbd
  sudo systemctl disable nmbd
  sudo apt-get remove --purge -y samba samba-common samba-common-bin
  sudo apt-get autoremove -y
  sudo rm -rf /etc/samba
  sudo rm -rf /var/lib/samba
  sudo rm -rf /var/cache/samba
  sudo updatedb
fi

echo "LocalCloud se desinstaló por completo, se recomienda reiniciar."
