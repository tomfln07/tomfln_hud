import { Player_stat } from '../player_stat'
import './style.css'

export function Player_stats() {
    return (
        <>
            <div className="player-stats-positioner">
                <div id="player-stats-container">
                    <Player_stat type={"pv"}/>
                    <Player_stat type={"armour"}/>
                </div>
            </div>
        </>
    )
}