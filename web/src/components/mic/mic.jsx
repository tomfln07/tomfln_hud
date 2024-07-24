import { useEffect, useRef, useState } from "react"
import "./style.css"

export function Mic() {
    const [mic_vol, set_mic_vol] = useState(0);
    const [show_mic, set_show_mic] = useState(false);
    //const timeout = useRef();

    function is_dot_on(min_volume) {
        if (mic_vol < min_volume) return "off"
        else return ""
    }

    useEffect(() => {
        function hundler(e) {
            if (e.data.type == "update_voice_chat_state") {
                const is_player_talking = e.data.data["voice_chat"]["is_player_talking"];
                
                //clearTimeout(timeout.current);
                if (is_player_talking)
                    set_show_mic(true);
                else {

                }

                /*if (!is_player_talking)
                    timeout.current = setTimeout(() => set_show_mic(false), 3500);*/
            }
        }

        window.addEventListener("message", hundler);

        return () => {
            removeEventListener("message", hundler);
        }
    }, [])

    return (
        show_mic ? (
            <>
                <div id="mic-level-box-container">
                    <div id="mic-level-box">
                        <p>{config["trad"][config["lang"]]["mic_txt"]}</p>
                        <div className={`dot switched-on-color1 ${is_dot_on(1)}`}></div>
                        <div className={`dot switched-on-color2 ${is_dot_on(2)}`}></div>
                        <div className={`dot switched-on-color3 ${is_dot_on(3)}`}></div>
                    </div>
                </div>
            </>
        ) : null
    )
}