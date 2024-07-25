import { Player_stat } from '../player_stat'
import './style.css'

export function Player_stats({ config }) {
    return (
        <>
            <div className="player-stats-positioner">
                <div id="player-stats-container">
                    <Player_stat type={"pv"}/>
                    <Player_stat type={"armour"}/>
                    {
                        config["framework"] == "esx" && config["esx_option"]["show_basicneeds"] ? 
                        (
                            <>
                                <Player_stat type={"hunger"}/>
                                <Player_stat type={"thirst"}/>
                            </>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}