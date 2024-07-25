import { useEffect, useRef, useState } from 'react';
import './style.css'
//import './script'

export function Player_stat({ type }) {
    const [stat, set_stat] = useState(0);
    
    useEffect(() => {
        function hundler(e) {
            const data = e.data.data;

            if (e.data.type == "update_player_stats") {
                var stat;
                
                if (type == "thirst" || type == "hunger") {
                    stat = data["player_stats"][type]["percent"]
                }
                else if (type == "pv") {
                    stat = (data["player_stats"][type]["current"] - 100) / (data["player_stats"][type]["max"] - 100) * 100;
                    
                    if (stat <= 0) stat = 0;
                    else if (stat > 100) stat = 100;
                }
                else stat = data["player_stats"][type]["current"]
                
                set_stat(stat.toFixed(0));
            }
        }

        window.addEventListener("message", hundler);

        return () => {
            removeEventListener("message", hundler);
        }
    }, [])

    return (
        <>
            <div className="stat-container">
                <img src={
                    type == "pv" ? "./img/heart.png" :
                    type == "armour" ? "./img/armour.png" :
                    type == "thirst" ? "./img/water.png" :
                    type == "hunger" ? "./img/chicken_leg.png"
                    : null
                } className="player_stat_img" />
                <div className="bar">
                    <div className={`progress ${type}`} style={{ width: `${stat}%` }}>
                        <p className="bar-txt" style={{ marginLeft: `${stat/2}%` }}>{stat != 0 ? `${stat}%` : null}</p>
                    </div>
                </div>
            </div>
        </>
    )
}