
ESX = exports["es_extended"]:getSharedObject()

RegisterCommand("opentablet", function(source, args, rawCommand)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(_source)
    TriggerClientEvent('esx_emsTablet:OpenTablet', _source)
end)