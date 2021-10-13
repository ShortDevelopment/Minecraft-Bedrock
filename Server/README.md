# Setup
You can <a href="https://www.minecraft.net/en-us/download/server/bedrock/">download</a> the offical server for the bedrock edition!   
Remember that the bedrock dedicated server is still in alpha so be carefull and make backups as often as you can!   
Here, you'll find a really good article about how to <a href="https://github.com/perrochon/simple-bedrock-script/blob/master/README.md">setup the server</a> with scripting and addons.   
   
To get startet with server <i>scripting</i> you should have a look at <a href="Scripting/FirstScript.js">Scripting/FirstScript.js</a>!   

### I want more!
No problem! There is a really cool project called `BDSX` that lets you use the scripting mentioned above but also is able to maniupulate every send package and therefor adding new commands and showing forms!
<a href="https://github.com/bdsx/bdsx">Have a look!</a>

### For client connecting to `127.0.0.1`:
```powershell
CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"
```

### Were are my log files?
Current Version: `%appdata%\logs`   
Older Versions: `%appdata%\Minecraft.Server\logs`
