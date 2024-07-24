export function num_anim(element_ref, start_val, end_val, currency, duration) {
    const start = performance.now();

    function anim(current_time) {
        if (!current_time)
            return;

        const elapsed = current_time - start;
        const progress = Math.min(elapsed / duration, 1);
        const new_val = start_val + (end_val - start_val) * progress;
        
        element_ref.textContent = `${new_val.toFixed(0)}${currency}`;

        if (progress < 1)
            requestAnimationFrame(anim);
    }

    requestAnimationFrame(anim);
}