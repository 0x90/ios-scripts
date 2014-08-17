#!/bin/sh

echo "Restarting SSHD"
launchctl unload /Library/LaunchDaemons/com.openssh.sshd.plist
launchctl load /Library/LaunchDaemons/com.openssh.sshd.plist



