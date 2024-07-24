import { useEffect, useState } from "react"

import { Player_stats } from "./components/player_stats"
import { Server_infos } from "./components/server_infos/server_infos"
import { Street_name } from "./components/street_name/street_name"
import { Money_infos } from "./components/money_infos/money_infos"
import { Mic } from "./components/mic/mic"

import { send_nui_cb } from "./nui_callback"

import "./App.css"

export default function App() {
  const [show, set_show] = useState(true);
  const [config, set_config] = useState();
  const [is_config_recieved, set_is_config_recieved] = useState(false);
  
  useEffect(() => {
    function hundler(e) {
      if (e.data.type == "show") {
        set_show(e.data.data);
      }
      else if (e.data.type == "config") {
        set_config(e.data.data);
        set_is_config_recieved(true);
      }
    }

    window.addEventListener("message", hundler);
    send_nui_cb("hudready", {});

    return () => {
      removeEventListener("message", hundler);
    }
  }, [])

  return (
    show && config ? (
      <>
        {config["framework"] == "esx" ? <Money_infos/> : null}
        <Street_name/>
        <Player_stats/>
        <Server_infos config={config}/>
        {/*<Mic/>*/}
      </>
    ) : null
  )
}
