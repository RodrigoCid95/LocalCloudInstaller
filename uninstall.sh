#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Este script debe ejecutarse como root" >&2
  exit 1
fi

systemctl stop local-cloud
systemctl disable local-cloud
rm /etc/systemd/system/local-cloud.service
rm -R /etc/local-cloud

systemctl stop nginx
systemctl stop mongod
systemctl stop samba
systemctl stop smbd
systemctl stop nmbd
systemctl disable nginx
systemctl disable mongod
systemctl disable samba
systemctl disable smbd
systemctl disable nmbd

apt purge nginx mongod samba samba-common samba-common-bin -y
apt autoremove -y
rm -rf /etc/samba
rm -rf /var/lib/samba
rm -rf /var/cache/samba
rm -r /var/log/mongodb
rm -r /var/lib/mongodb

systemctl daemon-reload

echo "LocalCloud se desinstaló por completo, se recomienda reiniciar."
