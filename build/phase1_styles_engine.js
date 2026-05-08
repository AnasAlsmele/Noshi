/**
 * Noshi v2.0 - Phase 1: CSS-in-JS Engine
 * NoshiStyles: inject component styles once, on first use.
 */
const NoshiStyles = {
    _injected: new Set(),

    inject: function(id, css) {
        if (this._injected.has(id)) return;
        const style = document.createElement('style');
        style.id = 'noshi-style-' + id;
        style.textContent = css;
        document.head.appendChild(style);
        this._injected.add(id);
    },

    remove: function(id) {
        const el = document.getElementById('noshi-style-' + id);
        if (el) el.remove();
        this._injected.delete(id);
    },

    has: function(id) {
        return this._injected.has(id);
    }
};
