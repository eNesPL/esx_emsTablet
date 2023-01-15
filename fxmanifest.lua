fx_version 'bodacious'
game 'gta5'

author 'eNes'
version '1.0.0'

client_script 'client.lua'
server_script 'server.lua'
shared_scripts {
    'shared.lua',
    '@es_extended/imports.lua'
}

ui_page 'ui/index.html'


files {
    'ui/*',
    'ui/js/*',
    'ui/css/*',
    'ui/assets/*'
}