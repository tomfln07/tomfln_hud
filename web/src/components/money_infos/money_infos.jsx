import { useEffect, useRef, useState } from "react"
import "./style.css"
import { num_anim } from "../num_anim";

const default_money_infos = { 
    "money": 0, 
    "black_money": 0, 
    "bank": 0,
    "currency": ""
}

export function Money_infos({ config }) {
    const [money_infos, set_money_infos] = useState(default_money_infos);
    const [money_infos_old, set_money_infos_old] = useState(default_money_infos);
    
    const money_ref = useRef();
    const bank_ref = useRef();
    const black_money_ref = useRef();

    useEffect(() => {
        function update_money(e) {
            if (e.data.type != "update_money") 
                return;
            
            const data = e.data.data

            set_money_infos_old(money_infos);
            set_money_infos({
                [data[0].name]: data[0].money, 
                [data[1].name]: data[1].money,
                [data[2].name]: data[2].money,
                "currency": config["currency"]
            })
        }

        window.addEventListener("message", update_money);

        return () => {
            window.removeEventListener("message", update_money);
        }
    }, [money_infos])

    useEffect(() => {
        if (money_infos.money != money_infos_old.money)
            num_anim(money_ref.current, money_infos_old.money, money_infos.money, config["currency"], config.timings.money_animation);

        if (money_infos.bank != money_infos_old.bank)
            num_anim(bank_ref.current, money_infos_old.bank, money_infos.bank, config["currency"], config.timings.money_animation);

        if (money_infos.black_money != money_infos_old.black_money)
            num_anim(black_money_ref.current, money_infos_old.black_money, money_infos.black_money, config["currency"], config.timings.money_animation);
    }, [money_infos, money_infos_old])


    return (
        <>
            <div id="money_infos_container">
                <div id="money">
                    <p className="money-count" ref={money_ref}> {money_infos["money"]}{money_infos["currency"]}</p>
                    <img src="./img/money.png" />
                </div>

                <div id="dirty-money">
                    <p className="money-count" ref={black_money_ref}> {money_infos["black_money"]}{money_infos["currency"]}</p>
                    <img src="./img/dirty_money.png"/>
                </div>

                <div id="bank-money">
                    <p className="money-count" ref={bank_ref}> {money_infos["bank"]}{money_infos["currency"]}</p>
                    <img src="./img/bank.png" />
                </div>
            </div>
        </>
    )
}