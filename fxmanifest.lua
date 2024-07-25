fx_version 'cerulean'
games { 'gta5' }

author "tomfln (discord: tom.fln)"
description "Standalone & esx compatible FiveM hud"
version "0.1"

client_scripts { "client/**/*" }
server_scripts { "server/**/*" }

shared_script { "config/*" }

ui_page 'web/dist/index.html'
files { "web/dist/**/*" }