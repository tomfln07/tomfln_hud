var ESX;

function update_player_money() {
    if (!ESX)
        return;

    const player_data = ESX.GetPlayerData();
    NuiMessage("update_money", player_data.accounts);
}

on("onClientResourceStart", resource_name => {
    if (GetCurrentResourceName() !== resource_name)
        return;

    if (config["framework"] != "esx")
        return;

    ESX = exports["es_extended"]["getSharedObject"]();
    update_player_money()
    setInterval(update_player_money, 1000);
});