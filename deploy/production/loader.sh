#!/bin/bash

cd /root/web/

pm2-runtime start npm --name "coderplanets_admin" -- run launch.prod &

while true
do
    sleep 100
done
