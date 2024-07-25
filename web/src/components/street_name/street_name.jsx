import { useEffect, useRef, useState } from "react"
import "./style.css"

export function Street_name({ config }) {
    const [street_name, set_street_name] = useState();
    const timeout = useRef(null);
    const anim_ref = useRef();

    useEffect(() => {
        function show_street(e) {
            if (e.data.type == "update_street_name") {
                clearTimeout(timeout.current);
                set_street_name(e.data.data["street_name"]);

                timeout.current = setTimeout(() => set_street_name(null), config.timings.street_name_duration);
            }
        }

        window.addEventListener("message", show_street);

        return () => {
            window.removeEventListener("message", show_street);
            timeout => clearTimeout(timeout.current);
        }
    }, [])

    return (
        street_name ? (
            <div id="street-name-container">
                <p ref={anim_ref} className="simple-txt-shadows">{street_name}</p>
            </div>
        ) : null
    )
}