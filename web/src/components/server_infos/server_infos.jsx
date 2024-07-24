import { useState } from "react"
import "./style.css"

export function Server_infos({ config }) {
    const [serv_current_players, set_serv_current_players] = useState("-");
    const [serv_max_players, set_serv_max_players] = useState("-");
    const [id, set_id] = useState("-");
    const [ping, set_ping] = useState("-");

    window.addEventListener("message", e => {
        if (e.data.type == "update_server_stats") {
            const server_data = e.data.data["server_stats"];
            
            set_serv_current_players(server_data["current_players"]);
            set_serv_max_players(server_data["max_players"]);
            set_id(server_data["id"]);
            set_ping(server_data["ping"]);
        }
    });

    return (
        <>
            <div id="server-infos-container" className="simple-txt-shadows">
                <h1>{config["server_name"]}</h1>
                <div id="player-numbers-container" style={{ fontSize: "20px" }}>
                    <p id="current-players">{serv_current_players} / {serv_max_players} {config["trad"][config["lang"]]["number_players"]}</p>
                </div>
                <p>id {id} | {ping} ping</p>
            </div>
        </>
    )
}