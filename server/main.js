RegisterNetEvent("get_server_stats");
onNet("get_server_stats", () => {
    data = {
        "ping": GetPlayerPing(source),
        "id": source,
        "current_players": GetNumPlayerIndices(),
        "max_players": GetConvarInt("sv_maxclients", 48)
    };

    emitNet("get_server_stats_cb", source, data);
})