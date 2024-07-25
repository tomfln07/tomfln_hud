var is_hud_ready = false;

on("onClientResourceStart", resource_name => {
    if (GetCurrentResourceName() !== resource_name)
        return;

    ped_id = PlayerPedId();
    //SetPedArmour(ped_id, 100);
});

RegisterNetEvent("get_server_stats_cb");
on("get_server_stats_cb", data => {
    ui_infos["server_stats"] = data;
});

RegisterNuiCallbackType('hudready');
on('__cfx_nui:hudready', (data, cb) => {
    NuiMessage("config", config);
    is_hud_ready = true;
    cb("ok");
});