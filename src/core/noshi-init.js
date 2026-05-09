/**
 * Noshi v3.0 — Initialization
 */
window.Noshi = {
    version: "3.0.0-modular",
    start(funcs) {
        const list = Array.isArray(funcs) ? funcs : [funcs];
        const run  = () => list.forEach(f => typeof f === 'function' && f());
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
        else run();
    }
};
