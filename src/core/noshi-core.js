/**
 * Noshi v3.0 — Core Utilities & Store
 */
(function(N) {
    N.$     = (s, p = document) => p.querySelector(s);
    N.$$    = (s, p = document) => Array.from(p.querySelectorAll(s));
    N.create = (tag, props = {}) => { return new window.NoshiCE({ tag, ...props }).tag; };
    N.on    = (s, e, f) => { const el = typeof s === 'string' ? N.$(s) : s; if (el) el.addEventListener(e, f); };
    N.onAll = (s, e, f) => { N.$$(s).forEach(el => el.addEventListener(e, f)); };
    
    N.append = (p, ...c) => {
        const parent = typeof p === 'string' ? N.$(p) : p;
        if (!parent) return;
        c.flat().forEach(child => {
            if (child instanceof Node) parent.appendChild(child);
            else if (typeof child === 'string' || typeof child === 'number') parent.appendChild(document.createTextNode(child));
        });
    };
    
    N.ajax = (config) => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const method = (config.method || 'GET').toUpperCase();
        xhr.open(method, config.url, true);
        if (config.headers) Object.keys(config.headers).forEach(k => xhr.setRequestHeader(k, config.headers[k]));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const isLocal = window.location.protocol === 'file:';
                if ((xhr.status >= 200 && xhr.status < 300) || (isLocal && xhr.status === 0))
                    resolve(xhr.responseText);
                else
                    reject({ status: xhr.status, text: xhr.statusText || 'Network Error' });
            }
        };
        xhr.onerror = () => reject({ status: xhr.status, text: 'Network Error' });
        xhr.send(config.data || null);
    });
    
    N.store = (function() {
        const _s = {}, _l = {}, _c = {};
        function _notify(key) {
            const val = _s[key];
            (_l[key]||[]).forEach(fn => { try { fn(val, key); } catch(e) { console.error('Noshi.store:', e); } });
            Object.keys(_c).forEach(ck => { if (_c[ck].deps.includes(key)) { _s[ck] = _c[ck].fn(_s); _notify(ck); } });
        }
        return {
            set(k, v)          { _s[k]=v; _notify(k); return this; },
            get(k)             { return _s[k]; },
            getAll()           { return Object.assign({}, _s); },
            on(k, fn)          { if (!_l[k]) _l[k]=[]; _l[k].push(fn); if (_s[k]!==undefined) fn(_s[k],k); return () => this.off(k,fn); },
            off(k, fn)         { if (_l[k]) _l[k]=_l[k].filter(f=>f!==fn); return this; },
            clear(k)           { if(k){delete _l[k];delete _s[k];}else{Object.keys(_l).forEach(k=>delete _l[k]);Object.keys(_s).forEach(k=>delete _s[k]);} return this; },
            update(k, fn)      { return this.set(k, fn(_s[k])); },
            compute(k, deps, fn){ _c[k]={deps,fn}; _s[k]=fn(_s); _notify(k); return this; },
            persist(k, def)    { const saved=localStorage.getItem('noshi_'+k); this.set(k, saved!==null?JSON.parse(saved):def); this.on(k, v=>localStorage.setItem('noshi_'+k,JSON.stringify(v))); return this; },
            bind(k, el, prop)  { if (el) this.on(k, v=>{ el[prop]=v; }); return this; },
            batch(obj)         { Object.keys(obj).forEach(k=>{ _s[k]=obj[k]; }); Object.keys(obj).forEach(k=>_notify(k)); return this; }
        };
    })();
    
    N._ = (selector, multi=false, err=true) => {
        try {
            const el = multi ? N.$$(selector) : N.$(selector);
            if (!el && err) throw new Error("Element not found: " + selector);
            return el;
        } catch(e) { console.error("Noshi Selection Error:", e); return null; }
    };

    N.toggleDarkMode = (force) => {
        const isDark = force !== undefined ? force : !document.body.classList.contains('noshi-dark-mode');
        document.body.classList.toggle('noshi-dark-mode', isDark);
        localStorage.setItem('noshi-dark', isDark);
    };

    N.loading = (info={}) => {
        const CSS_LOAD = `.noshi-loading-overlay{position:fixed;inset:0;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;z-index:9999;animation:noshi-fade-in .3s ease}
        .noshi-spinner{width:40px;height:40px;border:3px solid var(--gray);border-top-color:var(--p);border-radius:50%;animation:noshi-spin .8s linear infinite}
        .noshi-dots{display:flex;gap:.4rem}.noshi-dot{width:10px;height:10px;background:var(--p);border-radius:50%;animation:noshi-bounce 1.4s infinite ease-in-out}`;
        window.NoshiStyles.inject('loading', CSS_LOAD);
        const overlay = document.createElement('div'); overlay.className = 'noshi-loading-overlay';
        if (info.type === 'dots') {
            const dots = document.createElement('div'); dots.className = 'noshi-dots';
            for(let i=0;i<3;i++){ const d=document.createElement('div'); d.className='noshi-dot'; d.style.animationDelay=(i*0.16)+'s'; dots.appendChild(d); }
            overlay.appendChild(dots);
        } else {
            const spin = document.createElement('div'); spin.className = 'noshi-spinner'; overlay.appendChild(spin);
        }
        document.body.appendChild(overlay);
        return { close: () => overlay.remove() };
    };
    N.loading.show = (info) => N.loading(info);
    N.loading.hide = () => {
        const overlay = document.querySelector('.noshi-loading-overlay');
        if (overlay) overlay.remove();
    };

    N.errorScreen = (msg) => {
        const el = document.createElement('div'); el.className = 'error-screen noshi-fade-in'; el.textContent = msg;
        document.body.appendChild(el);
    };

})(window.Noshi);
