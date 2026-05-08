(function(global) {
    "use strict";

    const VERSION = "2.0.0";

    /* ─────────────────────────────────────────────
       STYLE INJECTION ENGINE
       Injects a <style> tag once per component ID.
    ───────────────────────────────────────────── */
    const NoshiStyles = {
        _injected: new Set(),
        inject(id, css) {
            if (this._injected.has(id)) return;
            const s = document.createElement('style');
            s.id = 'noshi-' + id;
            s.textContent = css;
            document.head.appendChild(s);
            this._injected.add(id);
        },
        remove(id) {
            const el = document.getElementById('noshi-' + id);
            if (el) el.remove();
            this._injected.delete(id);
        }
    };

