on("onClientResourceStart", resource_name => {
    if (GetCurrentResourceName() !== resource_name)
        return;

    if (config["framework"] != "esx")
        return;

    const ESX = exports["es_extended"]["getSharedObject"]();

    // Player's money update
    setInterval(() => {
        if (!ESX)
            return;

        const player_data = ESX.GetPlayerData();
        NuiMessage("update_money", player_data.accounts);
    }, config.timings.main_update_interval);
    
    // Player's thirst & hunger update
    on("esx_status:onTick", status => {
        ui_infos["player_stats"][status[0].name] = { "percent": status[0].percent };
        ui_infos["player_stats"][status[1].name] = { "percent": status[1].percent };
        
        NuiMessage("update_player_stats", ui_infos);
    });
});