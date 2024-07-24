var ped_id = PlayerPedId();
var is_radar_displayed = true;
var ui_infos = {
    "player_stats": {
        "pv": {
            "current": undefined,
            "max": undefined
        },
        "armour": {
            "current": undefined,
            "max": undefined
        },
        "cash": undefined,
        "dirty_cash": undefined,
        "bank_money": undefined
    },
    "server_stats": {
        "ping": undefined,
        "id": undefined,
        "current_players": undefined,
        "max_players": undefined
    },
    "voice_chat": {
        "is_player_talking": undefined
    },
    "street_name": undefined
}

function update_player_stats() {
    const pv = GetEntityHealth(ped_id);
    const armour = GetPedArmour(ped_id);
    var send_to_ui = false;
   
    if (pv != ui_infos["player_stats"]["pv"]["current"]) {
        ui_infos["player_stats"]["pv"] = {
            "current": pv,
            "max": GetEntityMaxHealth(ped_id)
        };
        send_to_ui = true;
    }
    
    if (armour != ui_infos["player_stats"]["armour"]["current"]) {
        ui_infos["player_stats"]["armour"]= {
            "current": armour,
            "max": 100
        };
        send_to_ui = true;
    }

    if (send_to_ui) NuiMessage("update_player_stats", ui_infos);
}

function update_server_stats() {
    NuiMessage("update_server_stats", ui_infos);
    emitNet("get_server_stats");
}

function update_street_name() {
    const street_name = get_player_street();

    if (ui_infos["street_name"] != street_name) {
        ui_infos["street_name"] = street_name;
        NuiMessage("update_street_name", ui_infos);
    }
}

function Show_radar_in_vehicule() {
    if (IsPedInAnyVehicle(ped_id, true)) {
        if (is_radar_displayed == false) {
            is_radar_displayed = true;
            DisplayRadar(is_radar_displayed);
        }
    }
    else if (is_radar_displayed == true) {
        is_radar_displayed = false;
        DisplayRadar(is_radar_displayed);
    }
}

/*setInterval(() => {
    const is_talking = MumbleIsPlayerTalking(PlayerId());

    if (ui_infos["voice_chat"]["is_player_talking"] != is_talking) {
        ui_infos["voice_chat"]["is_player_talking"] = is_talking;
        NuiMessage("update_voice_chat_state", ui_infos);
    }
}, 250)*/

// Disable classic gta hud
setTick(() => {
    HideHudComponentThisFrame(3);
    HideHudComponentThisFrame(4);
    HideHudComponentThisFrame(6);
    HideHudComponentThisFrame(7);
    HideHudComponentThisFrame(8);
    HideHudComponentThisFrame(9);
    HideHudComponentThisFrame(16);
})

setInterval(() => {
    update_server_stats();
    update_player_stats();
    Show_radar_in_vehicule();
}, 1000);

setInterval(update_street_name, 3500); // interval needs to be >= time that a street name stays on screen (cf web/srv/street_name/street_name.jsx)