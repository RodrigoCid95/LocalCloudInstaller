#!/bin/bash

if [ "$EUID" -ne 0 ]; then
    echo "Este script debe ejecutarse como root" >&2
    exit 1
fi

systemctl stop local-cloud
rm -R /etc/local-cloud/connector
rm -R /etc/local-cloud/node_modules
rm -R /etc/local-cloud/package-lock.json
rm -R /etc/local-cloud/package.json
rm -R /etc/local-cloud/server
rm -R /etc/local-cloud/lc/client/public
rm -R /etc/local-cloud/lc/client/views/os
rm -R /etc/local-cloud/lc/client/views/layout.liquid
cp -R ./local-cloud/connector /etc/local-cloud
cp -R ./local-cloud/server /etc/local-cloud
cp -R ./local-cloud/package.json /etc/local-cloud
cp -R ./local-cloud/lc/client/public /etc/local-cloud/lc/client
cp -R ./local-cloud/lc/client/views/os /etc/local-cloud/lc/client/views
cp -R ./local-cloud/lc/client/views/layout.liquid /etc/local-cloud/lc/client/views
initial_path=$(pwd)
cd /etc/local-cloud
npm i
cd "$initial_path"
systemctl start local-cloud
