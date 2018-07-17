@echo off
C:
cd C:\Program Files\MongoDB\Server\4.0\bin
mongod.exe --bind_ip 192.168.2.103 --dbpath D:\pulsatechs\test\data
pause