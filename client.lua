local display = false
function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        display = bool,
    })
end

RegisterNUICallback('closeUi', function(data, cb)
    SetDisplay(false)
end)

RegisterNUICallback("exit", function(data)
    SetDisplay(false)
end)

RegisterNUICallback("Heal", function(data,cb)
    local Status = nil
    ESX.TriggerServerCallback('esx_injuries:esxHealAllInj', function(status)
        Status = status
    end, data.playerid)
    while Status == nil do
        Citizen.Wait(0)
    end
    cb(Status)
end)

RegisterNUICallback("error", function(data)
    print("Error: "+data.error)
    SetDisplay(false)
end)

RegisterNUICallback("GetInjuries", function(data, cb)
    local ret = {}  
    ESX.TriggerServerCallback('esx_injuries:esxGetInjuriesForPlayer', function(Injuries)
        ret = Injuries
        cb(ret)
    end, data.playerid)
end)


RegisterNetEvent("esx_emsTablet:OpenTablet")
AddEventHandler("esx_emsTablet:OpenTablet", function()
    SetDisplay(true)
    ESX.TriggerServerCallback('tablet_policyjny:pobierzNoweWezwania', function(wezwania)
        for _, v in pairs(wezwania) do
            SendNUIMessage({
                action = 'dodajWezwanie',
                wezwanie_wiadomosc = v.message,
                wezwanie_wzywajacy = v.wzywajacy,
                x = v.x,
                y = v.y,
                z = v.z,
                open = v.open,
                id = v.id,
                type = "ui",
                display = true
            })
        end
    end)
end)

Citizen.CreateThread(function()
    while display do
        Citizen.Wait(0)
        DisableControlAction(0, 1, display) -- LookLeftRight
        DisableControlAction(0, 2, display) -- LookUpDown
        DisableControlAction(0, 24, display) -- Attack
        DisablePlayerFiring(PlayerPedId(), display) -- Disable weapon firing
        DisableControlAction(0, 142, display) -- MeleeAttackAlternate
        DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
        DisableControlAction(0, 18, display) -- Enter
        DisableControlAction(0, 322, display) -- ESC
        DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
    end
end)

RegisterNUICallback("zakonczWezwanie", function(data)
    TriggerServerEvent("tablet_policyjny:zakonczwezwanie", data.id)
  end)

RegisterNUICallback("oznaczGPS", function(data)
    SetDisplay(false)
    local x = data.x 
    local y = data.y 
    local z = data.z
    SetNewWaypoint(tonumber(x), tonumber(y))
    ESX.ShowNotification(y)
 end)
 