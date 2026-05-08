    /* ─────────────────────────────────────────────
       NOSHI STORE — reactive state manager
    ───────────────────────────────────────────── */
    const store = (function() {
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

    /* ─────────────────────────────────────────────
       UTILITIES
    ───────────────────────────────────────────── */
    const _ = (selector, multi=false, err=true) => {
        try {
            const r = multi ? document.querySelectorAll(selector) : document.querySelector(selector);
            if (!r && err) console.error(`Noshi: element "${selector}" not found`);
            return r;
        } catch(e) {
            const byId = document.getElementById(selector);
            if (byId) return multi ? [byId] : byId;
            if (err) console.error(`Noshi: selector "${selector}" failed`);
            return null;
        }
    };

    const errorScreen = (msg) => {
        const el = new NoshiCE({ tag:'div', class:'error-screen', html:`<b>Noshi Error:</b> ${msg}` }).tag;
        document.body.appendChild(el);
        console.error('Noshi Error:', msg);
    };

    const ajax = (config) => new Promise((resolve, reject) => {
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

    const loading = (info={}) => {
        const existing = document.getElementById('noshi-loading');
        if (existing) { existing.remove(); document.body.style.overflow=''; return; }
        NoshiStyles.inject('loading', CSS_LOAD);
        const overlay = new NoshiCE({ tag:'div', id:'noshi-loading', class:'noshi-loading-overlay', style:`background:${info.backgroundColor||'rgba(255,255,255,0.85)'}` }).tag;
        let content;
        if (info.type === 'circle')      content = new NoshiCE({ tag:'div', class:'noshi-spinner' }).tag;
        else if (info.type === 'dots') {
            const dots = [1,2,3].map(i => { const d=new NoshiCE({tag:'div',class:'noshi-dot',style:`animation-delay:${i*.2}s`}).tag; return d; });
            content = new NoshiCE({ tag:'div', class:'noshi-dots-holder', child:dots }).tag;
        } else content = new NoshiCE({ tag:'p', class:'xlarge bold', text: info.text||'Loading…' }).tag;
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
    };

    const toggleDarkMode = (state) => {
        const isDark = state !== undefined ? state : !document.body.classList.contains('noshi-dark-mode');
        document.body.classList.toggle('noshi-dark-mode', isDark);
        localStorage.setItem('noshi-dark', isDark);
        return isDark;
    };

    /* ─────────────────────────────────────────────
       NOSHI.PAGE() — full page scaffolding
    ───────────────────────────────────────────── */
    const page = (info) => {
        NoshiStyles.inject('page', CSS_PAGE);
        const root = new NoshiCE({ tag:'div', class:'noshi-page' }).tag;

        if (info.header) {
            const h = info.header;
            const hChildren = [];
            if (h.brand) hChildren.push(new NoshiCE({ tag:'div', class:'noshi-page-brand', text: h.brand }).tag);
            if (h.nav)   hChildren.push(new NoshiCE({ tag:'nav', class:'noshi-page-nav', child: h.nav.map(n => new NoshiCE({ tag:'a', class:`noshi-page-nav-link${n.active?' active':''}`, href:n.href||'#', text:n.label }).tag) }).tag);
            if (h.actions) hChildren.push(new NoshiCE({ tag:'div', style:'display:flex;gap:.5rem', child: h.actions }).tag);
            root.appendChild(new NoshiCE({ tag:'header', class:'noshi-page-header', child: hChildren }).tag);
        }

        const bodyEl = new NoshiCE({ tag:'div', class:'noshi-page-body' }).tag;

        if (info.sidebar) {
            const sb = new NoshiCE({ tag:'aside', class:'noshi-page-sidebar' }).tag;
            (info.sidebar.sections||[]).forEach(section => {
                if (section.title) sb.appendChild(new NoshiCE({ tag:'div', class:'noshi-page-sidebar-title', text:section.title }).tag);
                (section.items||[]).forEach(item => {
                    const ch = [];
                    if (item.icon) ch.push(new NoshiCE({ tag:'i', class:item.icon }).tag);
                    ch.push(new NoshiCE({ tag:'span', text:item.label }).tag);
                    sb.appendChild(new NoshiCE({ tag: item.href?'a':'div', class:`noshi-page-sidebar-link${item.active?' active':''}`, href:item.href||null, child:ch, click:item.click||null }).tag);
                });
            });
            bodyEl.appendChild(sb);
        }

        const contentEl = new NoshiCE({ tag:'main', class:'noshi-page-content' }).tag;
        if (info.content instanceof HTMLElement) contentEl.appendChild(info.content);
        else if (typeof info.content === 'string') contentEl.innerHTML = info.content;
        bodyEl.appendChild(contentEl);
        root.appendChild(bodyEl);

        if (info.footer) root.appendChild(new NoshiCE({ tag:'footer', class:'noshi-page-footer', text: info.footer.text||'' }).tag);

        document.body.innerHTML = '';
        document.body.appendChild(root);
        return { page: root, content: contentEl };
    };

    /* ─────────────────────────────────────────────
       INIT & EXPORTS
    ───────────────────────────────────────────── */
    const startNoshi = (funcs) => {
        const list = Array.isArray(funcs) ? funcs : [funcs];
        const run  = () => list.forEach(f => typeof f === 'function' && f());
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
        else run();
    };

    const _initNavs = () => {
        document.querySelectorAll('[data-noshi-menu]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const target = document.getElementById(trigger.getAttribute('data-noshi-menu'));
                if (target) target.classList.toggle('open');
            });
        });
    };

    const _initDark = () => {
        if (localStorage.getItem('noshi-dark') === 'true') toggleDarkMode(true);
    };

    global.NoshiCE      = NoshiCE;
    global.NoshiCENS    = NoshiCENS;
    global.NoshiBuilder = NoshiBuilder;
    global.NoshiStyles  = NoshiStyles;
    global.Noshi = {
        version: VERSION,
        _,
        ajax,
        loading,
        toggleDarkMode,
        page,
        store,
        start: startNoshi,
        errorScreen
    };

    startNoshi([_initNavs, _initDark]);

})(typeof window !== 'undefined' ? window : this);
