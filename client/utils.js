function NuiMessage(type, data) {
    SendNuiMessage(JSON.stringify({
        type: type,
        data: data
    }));
}

function get_player_street() {
    const [playerX, playerY, playerZ] = GetEntityCoords(PlayerPedId(), false);
    const [streetName, crossingRoad] = GetStreetNameAtCoord(playerX, playerY, playerZ);

    return GetStreetNameFromHashKey(streetName);
}