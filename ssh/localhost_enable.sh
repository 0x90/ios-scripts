#!/bin/sh
# http://blog.gaiterjones.com/ios-7-x-jailbreak-ssh-access-ssh-tunnel/

PORT=52222

echo "Enable ssh for localhost at port $PORT"
echo ssh2   $PORT/udp    #SSH Server >> /etc/services
echo ssh2   $PORT/tcp    # SSH Server >> /etc/services

sed -i 's/<string>ssh<\/string>/<string>ssh2<\/string>/g'  /Library/LaunchDaemons/com.openssh.sshd.plist

./restart.sh

