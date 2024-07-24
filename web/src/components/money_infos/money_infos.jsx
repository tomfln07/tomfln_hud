import { useState } from "react"
import "./style.css"

export function Money_infos() {
    const [money_infos, set_money_infos] = useState({ 
        "money": " ---", 
        "dirty_money": " ---", 
        "bank_money": " ---",
        "currency": "$"
    });

    return (
        <>
            <div id="money_infos_container">
                <div id="money">
                    <p className="money-count"> {money_infos["money"]}{money_infos["currency"]}</p>
                    <img src="./img/money.png" />
                </div>

                <div id="dirty-money">
                    <p className="money-count"> {money_infos["dirty_money"]}{money_infos["currency"]}</p>
                    <img src="./img/dirty_money.png"/>
                </div>

                <div id="bank-money">
                    <p className="money-count"> {money_infos["bank_money"]}{money_infos["currency"]}</p>
                    <img src="./img/bank.png" />
                </div>
            </div>
        </>
    )
}