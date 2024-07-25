export function send_nui_cb(event_name, data) {
    fetch(`https://tomfln_hud/${event_name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
    }).then(resp => resp.json()).then(resp => console.log(resp));
}