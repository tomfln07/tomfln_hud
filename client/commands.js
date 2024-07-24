RegisterCommand("showhud", (player_id, args) => {
    const show_hud_state = parseInt(args[0])

    if (show_hud_state != 0 && show_hud_state != 1)
        console.log("argument for 'showhud' needs to be 0 or 1");
    else
        NuiMessage("show", show_hud_state);
});