(function(global) {
    "use strict";
    
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

/**
 * Noshi v3.0 — Style Injection Engine
 */
window.NoshiStyles = {
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

const CSS_BASE = `:root{--p:#0077b6;--s:#588157;--err:#9e2a2b;--warn:#ffc971;--ok:#588157;--dark:#222;--light:#fdfdfd;--gray:#e5e5e5;--txt:#444;--muted:#888;--sh-sm:0 2px 4px rgba(0,0,0,.05);--sh-md:0 4px 12px rgba(0,0,0,.1);--sh-lg:0 10px 30px rgba(0,0,0,.12);--r-sm:6px;--r-md:10px;--r-lg:16px;--tr:all .25s ease;--font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font);color:var(--txt);display:flex;flex-direction:column}
a{text-decoration:none;color:inherit}
.noshi-dark-mode{--light:#1e1e1e;--gray:#333;--dark:#f0f0f0;--txt:#e0e0e0;--muted:#aaa;background:#121212}
[dir=rtl] .input-holder,[dir=rtl] .btn-holder,[dir=rtl] .note-holder{flex-direction:row-reverse}
.error-screen{padding:1em;margin:1em;background:#fff3f3;border:1px solid var(--err);color:var(--err);border-radius:var(--r-sm)}`;

const CSS_UTILS = `.flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1}.flex-wrap{flex-wrap:wrap}
.jc-center{justify-content:center}.jc-end{justify-content:flex-end}.jc-between{justify-content:space-between}.jc-around{justify-content:space-around}
.ai-center{align-items:center}.ai-end{align-items:flex-end}.ai-start{align-items:flex-start}
.w25{width:25%}.w33{width:33.33%}.w50{width:50%}.w75{width:75%}.w100{width:100%}
.h50{height:50vh}.h100{height:100vh}
.left{text-align:left}.right{text-align:right}.center{text-align:center}.justify{text-align:justify}
.bold{font-weight:700}.italic{font-style:italic}.underline{text-decoration:underline}
.xsmall{font-size:.7em}.small{font-size:.85em}.large{font-size:1.2em}.xlarge{font-size:1.5em}
.p1{padding:.5rem}.p2{padding:1rem}.p3{padding:1.5rem}.p4{padding:2rem}
.m1{margin:.5rem}.m2{margin:1rem}.m3{margin:1.5rem}.m4{margin:2rem}
.mt1{margin-top:.5rem}.mt2{margin-top:1rem}.mt3{margin-top:1.5rem}
.mb1{margin-bottom:.5rem}.mb2{margin-bottom:1rem}.mb3{margin-bottom:1.5rem}
.gap1{gap:.5rem}.gap2{gap:1rem}.gap3{gap:1.5rem}
.rounded{border-radius:var(--r-sm)}.rounded-md{border-radius:var(--r-md)}
.shadow{box-shadow:var(--sh-sm)}.shadow-md{box-shadow:var(--sh-md)}
.cursor-pointer{cursor:pointer}.select-none{user-select:none}.overflow-hidden{overflow:hidden}
.cred{color:var(--err)}.cblue{color:var(--p)}.cgreen{color:var(--ok)}.cgray{color:var(--muted)}
.bgblue{background:var(--p)}.bggreen{background:var(--ok)}.bgred{background:var(--err)}.bggray{background:var(--gray)}`;

const CSS_ANIM = `@keyframes noshi-spin{to{transform:rotate(360deg)}}
@keyframes noshi-fade-in{from{opacity:0}to{opacity:1}}
@keyframes noshi-slide-up{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes noshi-slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes noshi-bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
@keyframes noshi-stripe{from{background-position:40px 0}to{background-position:0 0}}
.noshi-fade-in{animation:noshi-fade-in .3s ease}.noshi-slide-up{animation:noshi-slide-up .3s ease}`;

// Auto-inject base styles
window.NoshiStyles.inject('base', CSS_BASE + CSS_UTILS + CSS_ANIM);
window.Noshi.Styles = window.NoshiStyles;

/**
 * Noshi v2.0 — Element Engines
 */
window.NoshiCE = function(props) {
    const tag = document.createElement(props.tag || 'div');
    Object.keys(props).forEach(k => {
        const v = props[k];
        switch (k) {
            case 'tag': break;
            case 'child':
                if (Array.isArray(v)) v.forEach(c => { 
                    if (c instanceof Node) tag.appendChild(c); 
                    else if (typeof c === 'string' || typeof c === 'number') tag.appendChild(document.createTextNode(c)); 
                });
                break;
            case 'html':    tag.innerHTML = v; break;
            case 'text':    tag.textContent = v; break;
            case 'class':   tag.className = v; break;
            case 'click':   if (typeof v === 'function') tag.addEventListener('click', v); break;
            case 'change':  if (typeof v === 'function') tag.addEventListener('change', v); break;
            case 'input':   if (typeof v === 'function') tag.addEventListener('input', v); break;
            case 'disabled': if (v) tag.disabled = true; break;
            case 'required': if (v) tag.required = true; break;
            case 'checked':  if (v) tag.checked = true; break;
            case 'select':   if (v) tag.setAttribute('selected', 'selected'); break;
            case 'src':
                if (['script','img','iframe','source'].includes(props.tag)) tag.setAttribute('src', v);
                break;
            default:
                if (v !== undefined && v !== null) tag.setAttribute(k, v);
        }
    });
    this.tag = tag;
};
const NoshiCE = window.NoshiCE;

window.NoshiCENS = function(props) {
    const ns  = props.namespace || 'http://www.w3.org/2000/svg';
    const tag = document.createElementNS(ns, props.tag || 'svg');
    Object.keys(props).forEach(k => {
        const v = props[k];
        switch (k) {
            case 'tag': case 'namespace': break;
            case 'child':
                if (Array.isArray(v)) v.forEach(c => tag.appendChild(c));
                break;
            case 'text':        tag.textContent = v; break;
            case 'class':       tag.setAttributeNS(null, 'class', v); break;
            case 'strokeWidth': tag.setAttributeNS(null, 'stroke-width', v); break;
            default:            tag.setAttributeNS(null, k, v);
        }
    });
    this.tag = tag;
};
const NoshiCENS = window.NoshiCENS;

/**
 * Noshi v3.0 — Icons
 */
const NOSHI_ICONS = {
    home:       '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    user:       '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users:      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    settings:   '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    bell:       '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h15s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    search:     '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    mail:       '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    phone:      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    calendar:   '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    check:      '<polyline points="20 6 9 17 4 12"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    x:          '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'x-circle':  '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    alert:      '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    info:       '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    star:       '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    heart:      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    edit:       '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    trash:      '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
    download:   '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    upload:     '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    link:       '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    lock:       '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    unlock:     '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
    eye:        '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off':   '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
    'chevron-up':   '<polyline points="18 15 12 9 6 15"/>',
    'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
    'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
    'chevron-right':'<polyline points="9 18 15 12 9 6"/>',
    menu:        '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    'more-h':    '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    'more-v':    '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    plus:        '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus:       '<line x1="5" y1="12" x2="19" y2="12"/>',
    save:        '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    copy:        '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    share:       '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
    filter:      '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    sort:        '<polyline points="11 5 15 9 11 13"/><polyline points="4 9 4 19"/><polyline points="7 19 3 15 7 11"/>',
    grid:        '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    list:        '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    image:       '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    file:        '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',
    folder:      '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    chart:       '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    refresh:     '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    'log-out':    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    'log-in':     '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 5 12 10 7"/><line x1="15" y1="12" x2="5" y2="12"/>'
};

window.NoshiIcon = function(name, opts) {
    opts = opts || {};
    const size = opts.size || 20, color = opts.color || 'currentColor';
    const paths = NOSHI_ICONS[name]; if (!paths) return null;
    window.NoshiStyles.inject('icons', '.ni{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', String(size)); svg.setAttribute('height', String(size)); svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', color); svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round'); svg.setAttribute('class', 'ni');
    svg.innerHTML = paths; return svg;
};
const NoshiIcon = window.NoshiIcon;

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

/**
 * Noshi v2.0 — The Component Factory
 */
window.NoshiBuilder = function() {
    this._e = () => document.createElement('div');
};
const NoshiBuilder = window.NoshiBuilder;

// Registry for custom elements
window.NoshiRegistry = {
    components: {},
    _pending: [],
    define(name, componentFn) {
        this.components[name] = componentFn;
        this._pending.push({ name, componentFn });
    },
    init() {
        this._pending.forEach(({ name, componentFn }) => {
            class NoshiElement extends HTMLElement {
                constructor() {
                    super();
                    this._rendered = false;
                }
                connectedCallback() {
                    if (this._rendered) return;
                    
                    requestAnimationFrame(() => {
                        const props = {};
                        for (const attr of this.attributes) {
                            let val = attr.value;
                            if (val === 'true') val = true;
                            else if (val === 'false') val = false;
                            else if (!isNaN(val) && val !== '') val = Number(val);
                            
                            if (attr.name.startsWith('on') || attr.name === 'click' || attr.name === 'change') {
                                const eventCode = val;
                                props[attr.name] = (e) => {
                                    try {
                                        if (typeof eventCode === 'function') eventCode(e);
                                        else new Function('event', 'Noshi', 'b', eventCode)(e, window.Noshi, new window.NoshiBuilder());
                                    } catch(err) { console.error('Noshi Event Error:', err); }
                                };
                            } else {
                                props[attr.name] = val;
                            }
                        }
                        
                        const children = Array.from(this.children);
                        if (children.length > 0 && !props.items && !props.tabs && !props.fields) {
                            const items = children.map(child => {
                                const item = { content: child.innerHTML, title: child.getAttribute('title') || child.getAttribute('label') || '' };
                                for (const a of child.attributes) item[a.name] = a.value;
                                return item;
                            });
                            const n = name.toLowerCase();
                            if (n === 'tabs') props.tabs = items;
                            else if (n === 'accordion') props.items = items;
                            else if (n === 'stepper') props.steps = items;
                            else if (n === 'form') props.fields = items;
                            else if (n === 'slider') props.images = items;
                            else props.items = items;
                        }

                        const b = new NoshiBuilder();
                        const el = componentFn.call(b, props);
                        this.innerHTML = '';
                        if (el instanceof HTMLElement) this.appendChild(el);
                        this._rendered = true;
                    });
                }
            }
            const tagName = name.toLowerCase();
            if (!customElements.get(`noshi-${tagName}`)) {
                customElements.define(`noshi-${tagName}`, NoshiElement);
                customElements.define(`n-${tagName}`, class extends NoshiElement {});
            }
        });
        this._pending = [];
    }
};
const NoshiRegistry = window.NoshiRegistry;

/**
 * Basic Elements
 */
const CSS_BTN = `.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1.25rem;border:none;border-radius:var(--r-sm);font-size:.95rem;font-weight:500;cursor:pointer;transition:var(--tr);white-space:nowrap;user-select:none;position:relative;overflow:hidden}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn:active{transform:scale(.98)}
.btn-default{background:var(--gray);color:var(--txt)}.btn-default:hover{background:#d5d5d5}
.btn-active{background:var(--p);color:#fff;box-shadow:0 3px 10px rgba(0,119,182,.3)}.btn-active:hover{filter:brightness(1.1)}
.btn-correct{background:var(--ok);color:#fff}.btn-correct:hover{filter:brightness(1.1)}
.btn-warning{background:var(--warn);color:var(--dark)}.btn-warning:hover{filter:brightness(1.05)}
.btn-error{background:var(--err);color:#fff}.btn-error:hover{filter:brightness(1.1)}
.btn-dark{background:var(--dark);color:#fff}.btn-dark:hover{filter:brightness(1.2)}
.btn-outline{background:transparent;color:var(--p);border:1.5px solid var(--p)}.btn-outline:hover{background:var(--p);color:#fff}
.btn-ghost{background:transparent;color:var(--muted)}.btn-ghost:hover{background:var(--gray);color:var(--txt)}
.btn-link{background:transparent;color:var(--p);padding:0;border-radius:0;text-decoration:underline}.btn-link:hover{color:#005f91}
.btn-soft{background:var(--c-primary-soft);color:var(--p)}.btn-soft:hover{background:rgba(0,119,182,.15)}
.btn-sm{padding:.35rem .85rem;font-size:.82rem}.btn-lg{padding:.85rem 2rem;font-size:1.05rem}
.btn-pill{border-radius:50px}.btn-block{width:100%;justify-content:center}
.btn-icon{padding:.6rem;border-radius:50%;width:2.2rem;height:2.2rem;justify-content:center}`;

const CSS_CARD = `.card{display:flex;flex-direction:column;background:#fff;border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm);transition:var(--tr);color:inherit;border:1px solid transparent}
.card-hover:hover{box-shadow:var(--sh-md);transform:translateY(-3px)}
.card-dark{background:var(--dark);color:#fff}
.card-border{border-color:var(--gray);box-shadow:none}
.card-image{width:100%;object-fit:cover}
.card-body{padding:1.25rem;flex:1}
.card-title{font-size:1.1rem;font-weight:600;margin-bottom:.5rem}
.card-text{font-size:.9rem;color:var(--muted);line-height:1.6}
.card-footer{padding:.75rem 1.25rem;border-top:1px solid var(--gray);display:flex;gap:.5rem}
.card-dark .card-text{color:rgba(255,255,255,.6)}.card-dark .card-footer{border-color:rgba(255,255,255,.1)}
.card-horizontal{flex-direction:row}.card-horizontal .card-image{width:200px;height:auto}`;

const CSS_BADGE = `.noshi-badge{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .65rem;border-radius:20px;font-size:.75rem;font-weight:600;white-space:nowrap}
.noshi-badge-info{background:rgba(0,119,182,.12);color:var(--p)}.noshi-badge-success{background:rgba(88,129,87,.12);color:var(--ok)}
.noshi-badge-warning{background:rgba(255,201,113,.2);color:#a06000}.noshi-badge-error{background:rgba(158,42,43,.1);color:var(--err)}
.noshi-badge-dark{background:var(--dark);color:#fff}.noshi-badge-gray{background:var(--gray);color:var(--muted)}
.noshi-badge-outline{background:transparent;border:1px solid currentColor}
.noshi-badge-dot::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:currentColor}`;

const CSS_NOTE = `.noshi-note{display:flex;align-items:stretch;border-radius:var(--r-sm);overflow:hidden;border:1px solid var(--gray);box-shadow:var(--sh-sm);margin:.5rem 0}
.noshi-note-icon{display:flex;align-items:center;justify-content:center;min-width:48px;font-size:1.2rem;color:#fff;padding:0 .75rem;background:var(--dark)}
.noshi-note-body{padding:.85rem 1rem;flex:1;font-size:.9rem;line-height:1.55;color:var(--txt)}
.noshi-note-success .noshi-note-icon{background:var(--ok)}.noshi-note-success .noshi-note-body{background:rgba(88,129,87,.05)}
.noshi-note-warning .noshi-note-icon{background:var(--warn);color:var(--dark)}.noshi-note-warning .noshi-note-body{background:rgba(255,201,113,.07)}
.noshi-note-error .noshi-note-icon{background:var(--err)}.noshi-note-error .noshi-note-body{background:rgba(158,42,43,.04)}
.noshi-note-glass{background:rgba(255,255,255,.1);backdrop-filter:blur(10px);border-color:rgba(255,255,255,.2)}`;

NoshiBuilder.prototype.button = function(info) {
    NoshiStyles.inject('buttons', CSS_BTN);
    let cls = 'btn btn-' + (info.class || 'default');
    if (info.pill) cls += ' btn-pill';
    if (info.block) cls += ' btn-block';
    if (info.size) cls += ' btn-' + info.size;
    if (info.variant) cls += ' btn-' + info.variant;
    
    const children = [];
    const addIcon = () => {
        if (info.icon instanceof Node) children.push(info.icon);
        else if (typeof info.icon === 'string' && info.icon) {
            // Check if it's a built-in icon name or a class
            const builtIn = window.NoshiIcon ? window.NoshiIcon(info.icon, { size: info.size==='sm'?14:16 }) : null;
            if (builtIn) children.push(builtIn);
            else children.push(new NoshiCE({ tag:'i', class: info.icon }).tag);
        }
    };
    
    if (info.icon && info.iconPos !== 'right') addIcon();
    if (info.text || info.label) children.push(info.text || info.label);
    if (info.icon && info.iconPos === 'right') addIcon();
    
    return new NoshiCE({ tag:'button', class: cls, disabled: info.disabled, click: info.click||null, child: children, title: info.title||null }).tag;
};

NoshiBuilder.prototype.card = function(info) {
    NoshiStyles.inject('cards', CSS_CARD);
    const children = [];
    if (info.image) children.push(new NoshiCE({ tag:'img', class:'card-image', src: info.image, alt: info.title||'', style: info.imageHeight ? `height:${info.imageHeight}` : '' }).tag);
    const bodyChildren = [];
    if (info.title) bodyChildren.push(new NoshiCE({ tag:'div', class:'card-title', text: info.title }).tag);
    if (info.text || info.content) bodyChildren.push(new NoshiCE({ tag:'div', class:'card-text', html: info.text || info.content }).tag);
    children.push(new NoshiCE({ tag:'div', class:'card-body', child: bodyChildren }).tag);
    
    if (info.button || info.footer) {
        const foot = new NoshiCE({ tag:'div', class:'card-footer' }).tag;
        if (info.button) {
            const btn = this.button(typeof info.button==='string' ? { text: info.button, class:'active' } : { class:'active', ...info.button });
            foot.appendChild(btn);
        }
        if (info.footer) {
            if (info.footer instanceof Node) foot.appendChild(info.footer);
            else foot.innerHTML += info.footer;
        }
        children.push(foot);
    }
    
    let cls = 'card';
    if (info.mode === 'dark') cls += ' card-dark';
    if (info.hover !== false) cls += ' card-hover';
    if (info.variant) cls += ' card-' + info.variant;
    if (info.horizontal) cls += ' card-horizontal';
    
    return new NoshiCE({ tag: info.link ? 'a' : 'div', class: cls, href: info.link||null, child: children }).tag;
};

NoshiBuilder.prototype.badge = function(info) {
    NoshiStyles.inject('badges', CSS_BADGE);
    let cls = `noshi-badge noshi-badge-${info.type||'gray'}`;
    if (info.dot) cls += ' noshi-badge-dot';
    if (info.variant === 'outline') cls += ' noshi-badge-outline';
    return new NoshiCE({ tag:'span', class: cls, text: info.text||'' }).tag;
};

NoshiBuilder.prototype.note = function(info) {
    NoshiStyles.inject('notes', CSS_NOTE);
    const type = info.class || 'default';
    const iconWrap = document.createElement('div');
    iconWrap.className = 'noshi-note-icon';
    if (info.icon instanceof Node) iconWrap.appendChild(info.icon);
    else if (typeof info.icon === 'string' && info.icon) {
        const builtIn = window.NoshiIcon ? window.NoshiIcon(info.icon, { size: 20, color:'#fff' }) : null;
        if (builtIn) iconWrap.appendChild(builtIn);
        else iconWrap.innerHTML = '<i class="' + info.icon + '"></i>';
    }
    else iconWrap.innerHTML = '&#9432;';
    const body = new NoshiCE({ tag:'div', class:'noshi-note-body', html: info.text || info.content || '' }).tag;
    let cls = 'noshi-note noshi-note-'+type;
    if (info.variant === 'glass') cls += ' noshi-note-glass';
    return new NoshiCE({ tag:'div', class: cls, child:[iconWrap, body] }).tag;
};

// Register tags
NoshiRegistry.define('button', NoshiBuilder.prototype.button);
NoshiRegistry.define('btn', NoshiBuilder.prototype.button);
NoshiRegistry.define('card', NoshiBuilder.prototype.card);
NoshiRegistry.define('badge', NoshiBuilder.prototype.badge);
NoshiRegistry.define('note', NoshiBuilder.prototype.note);

/**
 * Data Visualization
 */
const CSS_TABLE = `.noshi-table-wrap{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm)}
.noshi-table-toolbar{display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:#f8f9fa;border-bottom:1px solid var(--gray);gap:1rem;flex-wrap:wrap}
.noshi-table-search{padding:.5rem .85rem;border:1.5px solid var(--gray);border-radius:var(--r-sm);font-size:.9rem;outline:none;transition:var(--tr);min-width:200px}.noshi-table-search:focus{border-color:var(--p)}
.noshi-table{width:100%;border-collapse:collapse}
.noshi-table th{padding:.75rem 1rem;text-align:left;font-size:.82rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);background:#f8f9fa;border-bottom:1px solid var(--gray);white-space:nowrap}
.noshi-table th.sortable{cursor:pointer;user-select:none}.noshi-table th.sortable:hover{color:var(--p)}
.noshi-table th.sort-asc::after{content:" ↑";color:var(--p)}.noshi-table th.sort-desc::after{content:" ↓";color:var(--p)}
.noshi-table td{padding:.75rem 1rem;font-size:.9rem;border-bottom:1px solid var(--gray);color:var(--txt)}
.noshi-table tr:last-child td{border-bottom:none}.noshi-table tr:hover td{background:rgba(0,119,182,.025)}
.noshi-table-footer{display:flex;justify-content:space-between;align-items:center;padding:.6rem 1rem;background:#f8f9fa;border-top:1px solid var(--gray);font-size:.85rem;color:var(--muted);flex-wrap:wrap;gap:.5rem}
.noshi-table-pages{display:flex;gap:.35rem}
.noshi-page-btn{padding:.3rem .65rem;border:1px solid var(--gray);border-radius:var(--r-sm);cursor:pointer;font-size:.82rem;background:#fff;transition:var(--tr)}.noshi-page-btn:hover{border-color:var(--p);color:var(--p)}.noshi-page-btn.active{background:var(--p);color:#fff;border-color:var(--p)}`;

const CSS_GRAPH = `.noshi-graph{display:flex;flex-direction:column;border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm)}
.noshi-graph-head{padding:.75rem 1.25rem;font-weight:600;font-size:1rem;background:#f8f9fa;border-bottom:1px solid var(--gray)}
.noshi-graph svg{display:block;width:100%}circle{transition:r .2s ease;cursor:pointer}`;

const CSS_PROG = `.noshi-progress-wrap{width:100%}
.noshi-progress-label{display:flex;justify-content:space-between;font-size:.83rem;color:var(--muted);margin-bottom:.4rem}
.noshi-progress-track{width:100%;height:10px;background:var(--gray);border-radius:20px;overflow:hidden}
.noshi-progress-bar{height:100%;border-radius:20px;transition:width .6s ease;background:var(--p)}
.noshi-progress-striped .noshi-progress-bar{background-image:linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%);background-size:40px 40px;animation:noshi-stripe .8s linear infinite}
.noshi-progress-sm .noshi-progress-track{height:6px}.noshi-progress-lg .noshi-progress-track{height:16px}
.noshi-progress-success .noshi-progress-bar{background:var(--ok)}.noshi-progress-warning .noshi-progress-bar{background:var(--warn)}.noshi-progress-error .noshi-progress-bar{background:var(--err)}`;

const CSS_STATS = `.noshi-stats-card{display:flex;align-items:center;gap:1rem;padding:1.25rem 1.5rem;background:#fff;border-radius:var(--r-md);box-shadow:var(--sh-sm);border:1px solid var(--gray);transition:var(--tr)}.noshi-stats-card:hover{box-shadow:var(--sh-md);transform:translateY(-2px)}
.noshi-stats-icon{width:48px;height:48px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
.noshi-stats-icon-primary{background:rgba(0,119,182,.1);color:var(--p)}.noshi-stats-icon-success{background:rgba(88,129,87,.1);color:var(--ok)}.noshi-stats-icon-warning{background:rgba(255,201,113,.2);color:#a06000}.noshi-stats-icon-error{background:rgba(158,42,43,.1);color:var(--err)}
.noshi-stats-body{flex:1}.noshi-stats-value{font-size:1.75rem;font-weight:700;line-height:1;color:var(--txt)}.noshi-stats-label{font-size:.83rem;color:var(--muted);margin-top:.25rem}
.noshi-stats-trend{font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:.2rem;margin-top:.35rem}.noshi-trend-up{color:var(--ok)}.noshi-trend-down{color:var(--err)}`;

NoshiBuilder.prototype.table = function(info) {
    NoshiStyles.inject('tables', CSS_TABLE);
    let allData = info.data || [], filtered = [...allData];
    let sortKey = null, sortDir = 'asc', page = 1;
    const perPage = info.pagination || 0;
    const wrap = new NoshiCE({ tag:'div', class:'noshi-table-wrap' }).tag;
    let searchInput = null;
    if (info.search) {
        searchInput = new NoshiCE({ tag:'input', class:'noshi-table-search', placeholder: info.searchPlaceholder||'Search…', type:'text' }).tag;
        searchInput.addEventListener('input', () => { page = 1; applyFilter(); });
        wrap.appendChild(new NoshiCE({ tag:'div', class:'noshi-table-toolbar', child:[searchInput] }).tag);
    }
    const table = document.createElement('table'); table.className = 'noshi-table';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    (info.columns||[]).forEach(col => {
        const th = document.createElement('th'); th.textContent = col.label||col.key;
        if (col.sortable) {
            th.classList.add('sortable');
            th.addEventListener('click', () => {
                if (sortKey === col.key) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
                else { sortKey = col.key; sortDir = 'asc'; }
                headerRow.querySelectorAll('th').forEach(t => t.classList.remove('sort-asc','sort-desc'));
                th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
                render();
            });
        }
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow); table.appendChild(thead);
    const tbody = document.createElement('tbody'); table.appendChild(tbody);
    wrap.appendChild(table);
    const footer = new NoshiCE({ tag:'div', class:'noshi-table-footer' }).tag;
    const countEl = new NoshiCE({ tag:'span' }).tag;
    const pagesEl = new NoshiCE({ tag:'div', class:'noshi-table-pages' }).tag;
    footer.appendChild(countEl); footer.appendChild(pagesEl);
    if (perPage) wrap.appendChild(footer);

    function applyFilter() {
        const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
        filtered = q ? allData.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q))) : [...allData];
        render();
    }
    function render() {
        let rows = [...filtered];
        if (sortKey) rows.sort((a,b) => { const av=a[sortKey],bv=b[sortKey]; return av<bv ? (sortDir==='asc'?-1:1) : av>bv ? (sortDir==='asc'?1:-1) : 0; });
        let display = rows;
        if (perPage) {
            const total = rows.length, tp = Math.max(1, Math.ceil(total/perPage));
            page = Math.min(page, tp);
            const s = (page-1)*perPage; display = rows.slice(s, s+perPage);
            countEl.textContent = `${s+1}–${Math.min(s+perPage,total)} of ${total}`;
            pagesEl.innerHTML = '';
            for (let p=1;p<=tp;p++) { const btn=new NoshiCE({tag:'button',class:`noshi-page-btn${p===page?' active':''}`,text:String(p)}).tag; btn.addEventListener('click',()=>{page=p;render();}); pagesEl.appendChild(btn); }
        }
        tbody.innerHTML = '';
        if (!display.length) { const tr=document.createElement('tr'),td=document.createElement('td'); td.colSpan=(info.columns||[]).length; td.textContent=info.emptyText||'No results.'; td.style.cssText='text-align:center;padding:2rem;color:var(--muted)'; tr.appendChild(td); tbody.appendChild(tr); return; }
        display.forEach(row => {
            const tr = document.createElement('tr');
            if (info.onRowClick) { tr.style.cursor='pointer'; tr.addEventListener('click',()=>info.onRowClick(row)); }
            (info.columns||[]).forEach(col => {
                const td=document.createElement('td'); const val=row[col.key];
                if (typeof col.render==='function') { const r=col.render(val,row); if (r instanceof HTMLElement) td.appendChild(r); else td.innerHTML=r; }
                else td.textContent=val!=null?String(val):'—';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }
    wrap.setData = d => { allData=d; filtered=[...d]; page=1; render(); };
    wrap.refresh = () => applyFilter();
    applyFilter();
    return wrap;
};

NoshiBuilder.prototype.graph = function(info) {
    NoshiStyles.inject('graph', CSS_GRAPH);
    const data = info.data || [];
    if (!data.length) return new NoshiCE({ tag: 'div', text: 'No data' }).tag;
    
    // Normalize data (support both [1,2,3] and [[1,2,3], [4,5,6]])
    const datasets = Array.isArray(data[0]) ? data : [data];
    
    // Config normalization (flattening or supporting nested)
    const cfg = info.graph || info;
    const gH = parseInt(cfg.height || 300);
    const gW = 1000;
    const h = gH - 40;
    const clrs = ['#0077b6','#588157','#9e2a2b','#ffc971','#a06000','#8b5cf6'];
    
    const svgEls = [];
    const allPoints = datasets.flat();
    const max = Math.max(...allPoints, 1);
    
    datasets.forEach((ds, si) => {
        // Use style color if provided
        let clr = clrs[si % clrs.length];
        if (info.style && info.style[si] && info.style[si].color) clr = info.style[si].color;
        else if (info.color) clr = info.color;

        const step = gW / Math.max(ds.length - 1, 1);
        const pts = ds.map((v, i) => [i * step, h - (v / max * h)]);
        
        if (cfg.type === 'area') {
            const polyPts = [[0,h], ...pts, [gW,h]].map(p => p.join(',')).join(' ');
            svgEls.push(new NoshiCENS({ tag:'polygon', points: polyPts, fill: clr, style:'opacity:.2' }).tag);
        }
        
        svgEls.push(new NoshiCENS({ tag:'path', d:'M '+pts.map(p=>p.join(' ')).join(' L '), stroke: clr, strokeWidth: 3, fill:'none' }).tag);
        
        if (cfg.points !== false) {
            pts.forEach(p => svgEls.push(new NoshiCENS({ tag:'circle', cx:p[0], cy:p[1], r:5, fill:clr, stroke:'#fff', strokeWidth:2 }).tag));
        }
    });

    const svg = new NoshiCENS({ tag:'svg', viewBox:`0 0 1000 ${h+20}`, width:'100%', height: gH.toString(), child: svgEls }).tag;
    const children = [];
    
    const head = info.head || info;
    if (head.title) {
        const headEl = new NoshiCE({ tag:'div', class:'noshi-graph-head', text: head.title }).tag;
        if (head.backgroundColor) headEl.style.backgroundColor = head.backgroundColor;
        children.push(headEl);
    }
    children.push(svg);
    
    return new NoshiCE({ tag:'div', class:'noshi-graph', child: children }).tag;
};

NoshiBuilder.prototype.progress = function(info) {
    NoshiStyles.inject('progress', CSS_PROG);
    const pct = Math.round(Math.min(Math.max(info.value||0, 0), info.max||100) / (info.max||100) * 100);
    const color = info.color && info.color !== 'primary' ? `noshi-progress-${info.color}` : '';
    const size = info.size ? `noshi-progress-${info.size}` : '';
    const striped = info.striped ? 'noshi-progress-striped' : '';
    const bar = new NoshiCE({ tag:'div', class:'noshi-progress-bar', style:`width:${pct}%` }).tag;
    const track = new NoshiCE({ tag:'div', class:'noshi-progress-track', child:[bar] }).tag;
    const children = [];
    if (info.label !== false) {
        children.push(new NoshiCE({ tag:'div', class:'noshi-progress-label', child:[
            new NoshiCE({ tag:'span', text: typeof info.label==='string' ? info.label : '' }).tag,
            new NoshiCE({ tag:'span', text:`${pct}%` }).tag
        ]}).tag);
    }
    children.push(track);
    return new NoshiCE({ tag:'div', class:`noshi-progress-wrap ${color} ${size} ${striped}`.trim(), child: children }).tag;
};

NoshiBuilder.prototype.statsCard = function(info) {
    NoshiStyles.inject('stats', CSS_STATS);
    const iconType = info.iconType || 'primary';
    const iconEl = new NoshiCE({ tag:'div', class:`noshi-stats-icon noshi-stats-icon-${iconType}` }).tag;
    
    if (info.emoji) iconEl.textContent = info.emoji;
    
    if (info.icon) { 
        if (info.icon instanceof Node) iconEl.appendChild(info.icon); 
        else if (typeof info.icon === 'string') {
            const builtIn = window.NoshiIcon ? window.NoshiIcon(info.icon, { size: 24, color: 'currentColor' }) : null;
            if (builtIn) iconEl.appendChild(builtIn);
            else iconEl.appendChild(new NoshiCE({ tag:'i', class: info.icon }).tag); 
        }
    }

    const bodyChildren = [
        new NoshiCE({ tag:'div', class:'noshi-stats-value', text: String(info.value||'0') }).tag,
        new NoshiCE({ tag:'div', class:'noshi-stats-label', text: info.label||'' }).tag
    ];

    if (info.trend) {
        const arrow = info.trendArrow || (info.trendUp ? '▲' : '▼');
        bodyChildren.push(new NoshiCE({ tag:'div', class:`noshi-stats-trend noshi-trend-${info.trendUp?'up':'down'}`, text:`${arrow} ${info.trend}` }).tag);
    }

    return new NoshiCE({ tag:'div', class:'noshi-stats-card', child:[iconEl, new NoshiCE({ tag:'div', class:'noshi-stats-body', child: bodyChildren }).tag] }).tag;
};

// Register tags
NoshiRegistry.define('table', NoshiBuilder.prototype.table);
NoshiRegistry.define('graph', NoshiBuilder.prototype.graph);
NoshiRegistry.define('progress', NoshiBuilder.prototype.progress);
NoshiRegistry.define('stats', NoshiBuilder.prototype.statsCard);

/**
 * Forms & Inputs
 */
const CSS_INPUT = `.noshi-input{width:100%;padding:.65rem 1rem;border:1.5px solid var(--gray);border-radius:var(--r-sm);font-size:.95rem;color:var(--txt);background:#fff;outline:none;transition:var(--tr)}
.noshi-input:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(0,119,182,.1)}
.noshi-input::placeholder{color:#bbb}
.noshi-input:disabled{background:var(--gray);cursor:not-allowed;opacity:.7}
.noshi-input-sm{padding:.4rem .75rem;font-size:.85rem}.noshi-input-lg{padding:.85rem 1.25rem;font-size:1.05rem}
.noshi-input-pill{border-radius:50px}
.noshi-input-error{border-color:var(--err)}.noshi-input-error:focus{box-shadow:0 0 0 3px rgba(158,42,43,.1)}
.noshi-input-success{border-color:var(--ok)}.noshi-input-success:focus{box-shadow:0 0 0 3px rgba(88,129,87,.1)}

.noshi-input-holder{display:flex;align-items:center;border:1.5px solid var(--gray);border-radius:var(--r-sm);padding:.5rem 1rem;gap:.75rem;background:#fff;transition:var(--tr);cursor:pointer}
.noshi-input-holder:hover{border-color:var(--p)}
.noshi-input-label{flex:1;font-size:.95rem;cursor:pointer}
input[type=checkbox],input[type=radio]{accent-color:var(--p);width:1.1rem;height:1.1rem;cursor:pointer}

.noshi-field-group{display:flex;flex-direction:column;gap:.35rem;margin-bottom:.75rem;position:relative}
.noshi-field-label{font-size:.85rem;font-weight:600;color:var(--txt)}
.noshi-field-hint{font-size:.78rem;color:var(--muted)}
.noshi-field-error-text{font-size:.78rem;color:var(--err);margin-top:.2rem}

.noshi-switch{position:relative;display:inline-block;width:44px;height:24px}
.noshi-switch input{opacity:0;width:0;height:0}
.noshi-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--gray);transition:.4s;border-radius:24px}
.noshi-slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background-color:white;transition:.4s;border-radius:50%}
input:checked + .noshi-slider{background-color:var(--p)}
input:focus + .noshi-slider{box-shadow:0 0 1px var(--p)}
input:checked + .noshi-slider:before{transform:translateX(20px)}

.noshi-textarea{resize:vertical;min-height:80px;font-family:inherit}`;

const CSS_FORM = `.noshi-form{display:flex;flex-direction:column;gap:.5rem}
.noshi-form-title{font-size:1.25rem;font-weight:700;margin-bottom:.5rem}
.noshi-form-btns{display:flex;gap:.75rem;margin-top:.5rem;flex-wrap:wrap}
.noshi-select{width:100%;padding:.65rem 1rem;border:1.5px solid var(--gray);border-radius:var(--r-sm);font-size:.95rem;color:var(--txt);background:#fff;outline:none;cursor:pointer;transition:var(--tr);appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%23888' d='M6 8L0 0h12z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 1rem center;padding-right:2.5rem}
.noshi-select:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(0,119,182,.1)}`;

const CSS_STEP = `.noshi-stepper{display:flex;flex-direction:column}
.noshi-stepper-nav{display:flex;align-items:center;padding:1.5rem 2rem;background:#fff;border-bottom:1px solid var(--gray)}
.noshi-step-item{display:flex;align-items:center;flex:1}.noshi-step-item:last-child{flex:0}
.noshi-step-circle{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;flex-shrink:0;transition:var(--tr);background:var(--gray);color:var(--muted)}
.noshi-step-circle.active{background:var(--p);color:#fff;box-shadow:0 0 0 4px rgba(0,119,182,.15)}.noshi-step-circle.done{background:var(--ok);color:#fff}
.noshi-step-info{margin-left:.6rem}.noshi-step-label{font-size:.82rem;font-weight:600;color:var(--muted);transition:var(--tr);white-space:nowrap}
.noshi-step-label.active{color:var(--p)}.noshi-step-label.done{color:var(--ok)}
.noshi-step-line{flex:1;height:2px;background:var(--gray);margin:0 .75rem;transition:background .4s ease}.noshi-step-line.done{background:var(--ok)}
.noshi-stepper-content{padding:2rem}.noshi-step-pane{display:none;animation:noshi-fade-in .3s ease}.noshi-step-pane.active{display:block}
.noshi-stepper-footer{display:flex;justify-content:space-between;align-items:center;padding:1rem 2rem;border-top:1px solid var(--gray);background:#fafafa;gap:.75rem}`;

NoshiBuilder.prototype.input = function(info) {
    NoshiStyles.inject('inputs', CSS_INPUT);
    const type = info.type || 'text';
    
    if (type === 'switch') {
        const id = info.id || 'sw-' + Math.random().toString(36).substr(2,6);
        const inp = new NoshiCE({ tag:'input', type:'checkbox', id, checked: info.checked }).tag;
        const slider = new NoshiCE({ tag:'span', class:'noshi-slider' }).tag;
        const sw = new NoshiCE({ tag:'label', class:'noshi-switch', child:[inp, slider] }).tag;
        if (info.change) inp.addEventListener('change', info.change);
        if (!info.label) return sw;
        const lbl = new NoshiCE({ tag:'label', for:id, class:'noshi-input-label', text: info.label }).tag;
        return new NoshiCE({ tag:'div', class:'noshi-input-holder', style:'border:none;padding:0', child:[sw, lbl] }).tag;
    }

    if (type === 'textarea') {
        const ta = document.createElement('textarea');
        ta.className = 'noshi-input noshi-textarea'; ta.id=info.id||''; ta.name=info.name||''; ta.placeholder=info.placeholder||''; ta.rows=info.rows||4;
        if (info.value) ta.value = info.value;
        if (info.required) ta.required = true;
        if (info.disabled) ta.disabled = true;
        if (info.change) ta.addEventListener('input', info.change);
        return ta;
    }

    if (type === 'checkbox' || type === 'radio') {
        const id = info.id || 'n-' + Math.random().toString(36).substr(2,6);
        const inp = new NoshiCE({ tag:'input', type, id, name: info.name||'', value: info.value||'', checked: info.checked, required: info.required }).tag;
        const lbl = new NoshiCE({ tag:'label', for: id, class:'noshi-input-label', text: info.text || info.label || '' }).tag;
        if (info.change) inp.addEventListener('change', info.change);
        return new NoshiCE({ tag:'div', class:'noshi-input-holder', child:[inp, lbl] }).tag;
    }

    const inp = document.createElement('input');
    let cls = 'noshi-input';
    if (info.size) cls += ' noshi-input-' + info.size;
    if (info.pill) cls += ' noshi-input-pill';
    if (info.status) cls += ' noshi-input-' + info.status;
    
    inp.className = cls; inp.type = type; inp.id = info.id || ''; inp.name = info.name || '';
    inp.placeholder = info.placeholder || ''; inp.value = info.value || '';
    if (info.required) inp.required = true;
    if (info.disabled) inp.disabled = true;
    if (info.change) inp.addEventListener('input', info.change);
    return inp;
};

NoshiBuilder.prototype.select = function(info) {
    NoshiStyles.inject('forms', CSS_FORM);
    const sel = new NoshiCE({ tag: 'select', class: 'noshi-select', id: info.id || '', name: info.name || '', disabled: info.disabled }).tag;
    if (info.placeholder) sel.appendChild(new NoshiCE({ tag: 'option', value: '', text: info.placeholder, disabled: true, select: true }).tag);
    (info.options||[]).forEach(o => {
        const isObj = typeof o === 'object';
        sel.appendChild(new NoshiCE({ tag: 'option', value: isObj ? o.value : o, text: isObj ? o.label : o, select: info.value === (isObj ? o.value : o) }).tag);
    });
    if (info.change) sel.addEventListener('change', info.change);
    return sel;
};

NoshiBuilder.prototype.form = function(info) {
    NoshiStyles.inject('forms', CSS_FORM);
    const form = new NoshiCE({ tag:'form', class:'noshi-form' }).tag;
    if (info.title) form.appendChild(new NoshiCE({ tag:'div', class:'noshi-form-title', text: info.title }).tag);
    (info.fields||[]).forEach(f => {
        const group = new NoshiCE({ tag:'div', class:'noshi-field-group' }).tag;
        if (f.label) group.appendChild(new NoshiCE({ tag:'label', class:'noshi-field-label', text: f.label }).tag);
        if (f.type === 'select') group.appendChild(this.select(f));
        else group.appendChild(this.input(f));
        if (f.hint) group.appendChild(new NoshiCE({ tag:'div', class:'noshi-field-hint', text: f.hint }).tag);
        if (f.error) group.appendChild(new NoshiCE({ tag:'div', class:'noshi-field-error-text', text: f.error }).tag);
        form.appendChild(group);
    });
    if (info.buttons) {
        const row = new NoshiCE({ tag:'div', class:'noshi-form-btns' }).tag;
        info.buttons.forEach(b => row.appendChild(this.button(typeof b === 'string' ? { text: b } : { text: b.text, class: b.active?'active':'default', click: b.function || b.click || null })));
        form.appendChild(row);
    }
    return form;
};

NoshiBuilder.prototype.stepper = function(info) {
    NoshiStyles.inject('stepper', CSS_STEP);
    const steps = info.steps||[]; let cur = 0;
    const circles=[], labels=[], panes=[], lines=[];
    const nav = new NoshiCE({ tag:'div', class:'noshi-stepper-nav' }).tag;
    steps.forEach((s, i) => {
        const circ = new NoshiCE({ tag:'div', class:'noshi-step-circle', text:String(i+1) }).tag;
        const lbl = new NoshiCE({ tag:'div', class:'noshi-step-label', text: s.title }).tag;
        circles.push(circ); labels.push(lbl);
        nav.appendChild(new NoshiCE({ tag:'div', class:'noshi-step-item', child:[circ, new NoshiCE({tag:'div',class:'noshi-step-info',child:[lbl]}).tag] }).tag);
        if (i < steps.length-1) { const line=new NoshiCE({tag:'div',class:'noshi-step-line'}).tag; lines.push(line); nav.appendChild(line); }
        const pane = new NoshiCE({tag:'div',class:'noshi-step-pane'}).tag;
        if (s.content instanceof HTMLElement) pane.appendChild(s.content); else pane.innerHTML = s.content||'';
        panes.push(pane);
    });
    const content = new NoshiCE({ tag:'div', class:'noshi-stepper-content', child: panes }).tag;
    const prevBtn = this.button({ text: 'Back', class: 'ghost' });
    const nextBtn = this.button({ text: 'Next', class: 'active' });
    const footer = new NoshiCE({ tag:'div', class:'noshi-stepper-footer', child:[prevBtn, nextBtn] }).tag;
    const update = () => {
        circles.forEach((c,i) => { c.className='noshi-step-circle'+(i===cur?' active':i<cur?' done':''); c.textContent=i<cur?'✓':String(i+1); });
        panes.forEach((p,i) => p.classList.toggle('active', i===cur));
        prevBtn.style.visibility = cur===0?'hidden':'visible';
        nextBtn.textContent = cur===steps.length-1 ? 'Finish' : 'Next';
    };
    prevBtn.addEventListener('click', () => { if(cur>0){cur--; update();} });
    nextBtn.addEventListener('click', () => { if(cur<steps.length-1){cur++; update();} else if(info.onComplete) info.onComplete(); });
    update();
    return new NoshiCE({ tag:'div', class:'noshi-stepper', child:[nav, content, footer] }).tag;
};

// Register tags
NoshiRegistry.define('input', NoshiBuilder.prototype.input);
NoshiRegistry.define('select', NoshiBuilder.prototype.select);
NoshiRegistry.define('form', NoshiBuilder.prototype.form);
NoshiRegistry.define('stepper', NoshiBuilder.prototype.stepper);

/**
 * Interactive Components
 */
const CSS_MODAL = `.noshi-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;z-index:2000;animation:noshi-fade-in .25s ease}
.noshi-modal{background:#fff;border-radius:var(--r-lg);box-shadow:var(--sh-lg);display:flex;flex-direction:column;overflow:hidden;width:90%;max-width:560px;animation:noshi-slide-up .3s ease}
.noshi-modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid var(--gray)}
.noshi-modal-header h3{font-size:1.15rem;font-weight:700}
.noshi-modal-close{cursor:pointer;font-size:1.6rem;color:var(--muted);line-height:1;transition:var(--tr)}.noshi-modal-close:hover{color:var(--err)}
.noshi-modal-body{padding:1.5rem;overflow-y:auto;max-height:65vh}
.noshi-modal-footer{padding:1rem 1.5rem;border-top:1px solid var(--gray);display:flex;justify-content:flex-end;gap:.75rem;background:#fafafa}
.noshi-modal-glass{background:rgba(255,255,255,.75);backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,.3)}
.noshi-modal-sm{max-width:400px}.noshi-modal-lg{max-width:800px}.noshi-modal-full{max-width:95vw;height:90vh}`;

const CSS_TABS = `.noshi-tabs{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden}
.noshi-tabs-nav{display:flex;background:#f8f9fa;border-bottom:1px solid var(--gray);overflow-x:auto}
.noshi-tab-btn{padding:.85rem 1.5rem;cursor:pointer;font-size:.93rem;font-weight:500;color:var(--muted);border-bottom:3px solid transparent;white-space:nowrap;transition:var(--tr);background:none;border-top:none;border-left:none;border-right:none}
.noshi-tab-btn:hover{color:var(--p);background:rgba(0,119,182,.03)}
.noshi-tab-btn.active{color:var(--p);border-bottom-color:var(--p);background:#fff;font-weight:600}
.noshi-tab-pane{display:none;padding:1.5rem;animation:noshi-fade-in .25s ease}.noshi-tab-pane.active{display:block}
.noshi-tabs-pill .noshi-tabs-nav{background:var(--gray);padding:.4rem;gap:.4rem;border:none;border-radius:10px;margin:1rem;width:fit-content}
.noshi-tabs-pill .noshi-tab-btn{border-radius:8px;border:none;padding:.5rem 1.25rem}
.noshi-tabs-pill .noshi-tab-btn.active{background:var(--p);color:#fff;box-shadow:var(--sh-sm)}`;

const CSS_TOAST = `.noshi-toasts{position:fixed;display:flex;flex-direction:column;gap:.75rem;z-index:3000}
.noshi-toasts-tr{top:1.5rem;right:1.5rem}.noshi-toasts-tl{top:1.5rem;left:1.5rem}
.noshi-toasts-br{bottom:1.5rem;right:1.5rem}.noshi-toasts-bl{bottom:1.5rem;left:1.5rem}
.noshi-toasts-tc{top:1.5rem;left:50%;transform:translateX(-50%)}.noshi-toasts-bc{bottom:1.5rem;left:50%;transform:translateX(-50%)}
.noshi-toast{display:flex;align-items:center;gap:.75rem;min-width:280px;max-width:380px;padding:.9rem 1.1rem;background:var(--dark);color:#fff;border-radius:var(--r-sm);box-shadow:var(--sh-md);animation:noshi-slide-in-right .3s ease}
.noshi-toast-msg{flex:1;font-size:.9rem;line-height:1.4}
.noshi-toast-close{cursor:pointer;font-size:1.1rem;opacity:.65;transition:var(--tr)}.noshi-toast-close:hover{opacity:1}
.noshi-toast-info{border-left:4px solid var(--p)}.noshi-toast-success{border-left:4px solid var(--ok)}
.noshi-toast-warning{border-left:4px solid var(--warn)}.noshi-toast-error{border-left:4px solid var(--err)}
.noshi-toast-glass{background:rgba(15,17,23,.8);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1)}`;

const CSS_ACC = `.noshi-accordion{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden}
.noshi-accordion-item{border-bottom:1px solid var(--gray)}.noshi-accordion-item:last-child{border-bottom:none}
.noshi-accordion-head{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;cursor:pointer;background:#fff;transition:var(--tr);user-select:none}
.noshi-accordion-head:hover{background:#f8f9fa}.noshi-accordion-head.open{background:#f0f7ff;color:var(--p)}
.noshi-accordion-title{font-weight:600;font-size:.95rem}
.noshi-accordion-arrow{font-size:.75rem;transition:transform .3s ease;color:var(--muted)}.noshi-accordion-head.open .noshi-accordion-arrow{transform:rotate(180deg);color:var(--p)}
.noshi-accordion-body{max-height:0;overflow:hidden;transition:max-height .35s ease,padding .2s ease;padding:0 1.25rem}.noshi-accordion-body.open{max-height:600px;padding:1rem 1.25rem}
.noshi-accordion-content{font-size:.9rem;color:var(--muted);line-height:1.65}
.noshi-accordion-separate{border:none;display:flex;flex-direction:column;gap:.75rem}.noshi-accordion-separate .noshi-accordion-item{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden}`;

const CSS_TIP = `.noshi-tooltip-wrap{position:relative;display:inline-flex}
.noshi-tooltip-box{position:absolute;background:rgba(30,30,30,.92);color:#fff;font-size:.78rem;padding:.35rem .75rem;border-radius:var(--r-sm);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s ease;z-index:1000}
.noshi-tooltip-wrap:hover .noshi-tooltip-box{opacity:1}
.noshi-tooltip-top .noshi-tooltip-box{bottom:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.noshi-tooltip-bottom .noshi-tooltip-box{top:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.noshi-tooltip-left .noshi-tooltip-box{right:calc(100% + 6px);top:50%;transform:translateY(-50%)}
.noshi-tooltip-right .noshi-tooltip-box{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}`;

NoshiBuilder.prototype.modal = function(info) {
    NoshiStyles.inject('modals', CSS_MODAL);
    const overlay = new NoshiCE({ tag:'div', class:'noshi-overlay', style:'display:none' }).tag;
    let cls = 'noshi-modal';
    if (info.variant === 'glass') cls += ' noshi-modal-glass';
    if (info.size) cls += ' noshi-modal-' + info.size;
    
    const modal = new NoshiCE({ tag:'div', class: cls, style: info.width ? `max-width:${info.width}` : '' }).tag;
    if (info.title) {
        const closeBtn = new NoshiCE({ tag:'span', class:'noshi-modal-close', html:'&times;' }).tag;
        const api = { close: () => { overlay.style.display='none'; document.body.style.overflow=''; } };
        closeBtn.addEventListener('click', () => api.close());
        overlay.addEventListener('click', e => { if (e.target === overlay) api.close(); });
        modal.appendChild(new NoshiCE({ tag:'div', class:'noshi-modal-header', child:[new NoshiCE({ tag:'h3', text: info.title }).tag, closeBtn] }).tag);
    }
    const body = new NoshiCE({ tag:'div', class:'noshi-modal-body' }).tag;
    if (info.content instanceof HTMLElement) body.appendChild(info.content); else if (typeof info.content === 'string') body.innerHTML = info.content;
    modal.appendChild(body);
    
    if (info.buttons) {
        const foot = new NoshiCE({ tag:'div', class:'noshi-modal-footer' }).tag;
        info.buttons.forEach(b => foot.appendChild(this.button(typeof b==='string' ? { text:b } : b)));
        modal.appendChild(foot);
    }
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    return { open: () => { overlay.style.display='flex'; document.body.style.overflow='hidden'; }, close: () => { overlay.style.display='none'; document.body.style.overflow=''; } };
};

NoshiBuilder.prototype.toast = function(info) {
    NoshiStyles.inject('toasts', CSS_TOAST);
    const pos = info.position || 'br';
    const containerId = 'noshi-toasts-' + pos;
    let container = document.getElementById(containerId);
    if (!container) { container = new NoshiCE({ tag:'div', class:`noshi-toasts noshi-toasts-${pos}`, id: containerId }).tag; document.body.appendChild(container); }
    
    let cls = `noshi-toast noshi-toast-${info.type||'info'}`;
    if (info.variant === 'glass') cls += ' noshi-toast-glass';
    
    const toast = new NoshiCE({ tag:'div', class: cls, child:[
        new NoshiCE({ tag:'div', class:'noshi-toast-msg', text: info.message||'' }).tag,
        new NoshiCE({ tag:'span', class:'noshi-toast-close', html:'&times;', click: (e) => e.target.closest('.noshi-toast').remove() }).tag
    ]}).tag;
    container.appendChild(toast);
    if (info.duration !== 0) setTimeout(() => toast.remove(), info.duration || 3500);
};

NoshiBuilder.prototype.tabs = function(info) {
    NoshiStyles.inject('tabs', CSS_TABS);
    let cls = 'noshi-tabs';
    if (info.variant === 'pill') cls += ' noshi-tabs-pill';
    
    const nav = new NoshiCE({ tag:'div', class:'noshi-tabs-nav' }).tag;
    const body = new NoshiCE({ tag:'div' }).tag;
    (info.tabs||[]).forEach((tab, i) => {
        const btn = new NoshiCE({ tag:'button', class:`noshi-tab-btn${i===0?' active':''}`, text: tab.title }).tag;
        const pane = new NoshiCE({ tag:'div', class:`noshi-tab-pane${i===0?' active':''}` }).tag;
        if (tab.content instanceof HTMLElement) pane.appendChild(tab.content); else pane.innerHTML = tab.content || '';
        btn.addEventListener('click', () => {
            nav.querySelectorAll('.noshi-tab-btn').forEach(b => b.classList.remove('active'));
            body.querySelectorAll('.noshi-tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active'); pane.classList.add('active');
        });
        nav.appendChild(btn); body.appendChild(pane);
    });
    return new NoshiCE({ tag:'div', class: cls, child:[nav, body] }).tag;
};

NoshiBuilder.prototype.accordion = function(info) {
    NoshiStyles.inject('accordion', CSS_ACC);
    let cls = 'noshi-accordion';
    if (info.variant === 'separate') cls += ' noshi-accordion-separate';
    
    const root = new NoshiCE({ tag:'div', class: cls }).tag;
    (info.items||[]).forEach((item, i) => {
        const body = new NoshiCE({ tag:'div', class:'noshi-accordion-body' }).tag;
        if (item.content instanceof HTMLElement) body.appendChild(item.content); else body.innerHTML = `<div class="noshi-accordion-content">${item.content||''}</div>`;
        const head = new NoshiCE({ tag:'div', class:'noshi-accordion-head', child:[
            new NoshiCE({ tag:'span', class:'noshi-accordion-title', text: item.title||'' }).tag,
            new NoshiCE({ tag:'span', class:'noshi-accordion-arrow', text:'▼' }).tag
        ]}).tag;
        head.addEventListener('click', () => {
            const isOpen = body.classList.contains('open');
            if (!info.multiple) {
                root.querySelectorAll('.noshi-accordion-body').forEach(b => b.classList.remove('open'));
                root.querySelectorAll('.noshi-accordion-head').forEach(h => h.classList.remove('open'));
            }
            body.classList.toggle('open', !isOpen); head.classList.toggle('open', !isOpen);
        });
        if (i === 0 && info.openFirst) { body.classList.add('open'); head.classList.add('open'); }
        root.appendChild(new NoshiCE({ tag:'div', class:'noshi-accordion-item', child:[head, body] }).tag);
    });
    return root;
};

NoshiBuilder.prototype.tooltip = function(element, info) {
    NoshiStyles.inject('tooltip', CSS_TIP);
    const box = new NoshiCE({ tag:'span', class:'noshi-tooltip-box', text: info.text||'' }).tag;
    return new NoshiCE({ tag:'span', class:`noshi-tooltip-wrap noshi-tooltip-${info.position||'top'}`, child:[element, box] }).tag;
};

// Register tags
NoshiRegistry.define('tabs', NoshiBuilder.prototype.tabs);
NoshiRegistry.define('accordion', NoshiBuilder.prototype.accordion);
NoshiRegistry.define('modal', function(props) {
    return this.modal({ title: props.title, content: props.content || props.text }).overlay;
});

/**
 * Layout Components
 */
const CSS_PAGE = `.noshi-page{display:flex;flex-direction:column;min-height:100vh}
.noshi-page-header{position:sticky;top:0;z-index:100;background:#fff;border-bottom:1px solid var(--gray);display:flex;align-items:center;padding:0 1.5rem;height:60px;gap:1rem;box-shadow:var(--sh-sm)}
.noshi-page-brand{font-size:1.15rem;font-weight:700;color:var(--p)}
.noshi-page-nav{display:flex;gap:.5rem;flex:1}.noshi-page-nav-link{padding:.4rem .8rem;border-radius:var(--r-sm);color:var(--muted);font-size:.9rem;transition:var(--tr);cursor:pointer}.noshi-page-nav-link:hover,.noshi-page-nav-link.active{background:rgba(0,119,182,.07);color:var(--p)}
.noshi-page-body{display:flex;flex:1}
.noshi-page-sidebar{width:240px;flex-shrink:0;background:#fff;border-right:1px solid var(--gray);padding:1.25rem 0;position:sticky;top:60px;height:calc(100vh - 60px);overflow-y:auto}
.noshi-page-sidebar-title{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:700;padding:.75rem 1.25rem .3rem}
.noshi-page-sidebar-link{display:flex;align-items:center;gap:.6rem;padding:.55rem 1.25rem;font-size:.9rem;color:var(--txt);transition:var(--tr);cursor:pointer}.noshi-page-sidebar-link:hover{background:#f0f7ff;color:var(--p)}.noshi-page-sidebar-link.active{background:#e8f4ff;color:var(--p);font-weight:600;border-right:3px solid var(--p)}
.noshi-page-content{flex:1;padding:2rem;overflow-y:auto}
.noshi-page-footer{padding:1rem 2rem;border-top:1px solid var(--gray);text-align:center;font-size:.83rem;color:var(--muted);background:#fafafa}`;

const CSS_NAV = `.noshi-nav{display:flex;align-items:center;background:#fff;border-bottom:1px solid var(--gray);padding:0 1.5rem;height:60px;position:sticky;top:0;z-index:100;box-shadow:var(--sh-sm)}
.noshi-nav-brand{font-size:1.2rem;font-weight:700;color:var(--p);margin-right:2rem}
.noshi-nav-links{display:flex;gap:1rem;flex:1}.noshi-nav-link{padding:.4rem .75rem;border-radius:var(--r-sm);color:var(--muted);font-size:.93rem;transition:var(--tr)}.noshi-nav-link:hover,.noshi-nav-link.active{color:var(--p);background:rgba(0,119,182,.06)}
.noshi-nav-actions{display:flex;gap:.5rem}
.noshi-nav-menu-head{cursor:pointer;display:flex;align-items:center;gap:.4rem;position:relative}
.noshi-nav-menu-body{display:none;position:absolute;top:100%;background:#fff;border:1px solid var(--gray);border-radius:var(--r-sm);box-shadow:var(--sh-md);min-width:180px;overflow:hidden;z-index:200}.noshi-nav-menu-body.open{display:flex;flex-direction:column;animation:noshi-slide-up .2s ease}
.noshi-nav-menu-item{padding:.75rem 1rem;font-size:.9rem;transition:var(--tr);cursor:pointer}.noshi-nav-menu-item:hover{background:var(--gray)}`;

NoshiBuilder.prototype.page = function(info) {
    NoshiStyles.inject('page', CSS_PAGE);
    const root = new NoshiCE({ tag:'div', class:'noshi-page' }).tag;
    if (info.header) {
        const h = info.header;
        const hChildren = [];
        if (h.brand) hChildren.push(new NoshiCE({ tag:'div', class:'noshi-page-brand', text: h.brand }).tag);
        if (h.nav) hChildren.push(new NoshiCE({ tag:'nav', class:'noshi-page-nav', child: h.nav.map(n => new NoshiCE({ tag:'a', class:`noshi-page-nav-link${n.active?' active':''}`, href:n.href||'#', text:n.label }).tag) }).tag);
        root.appendChild(new NoshiCE({ tag:'header', class:'noshi-page-header', child: hChildren }).tag);
    }
    const bodyEl = new NoshiCE({ tag:'div', class:'noshi-page-body' }).tag;
    if (info.sidebar) {
        const sb = new NoshiCE({ tag:'aside', class:'noshi-page-sidebar' }).tag;
        (info.sidebar.sections||[]).forEach(s => {
            if (s.title) sb.appendChild(new NoshiCE({ tag:'div', class:'noshi-page-sidebar-title', text:s.title }).tag);
            (s.items||[]).forEach(item => sb.appendChild(new NoshiCE({ tag: item.href?'a':'div', class:`noshi-page-sidebar-link${item.active?' active':''}`, href:item.href||null, text:item.label }).tag));
        });
        bodyEl.appendChild(sb);
    }
    const contentEl = new NoshiCE({ tag:'main', class:'noshi-page-content' }).tag;
    if (info.content instanceof HTMLElement) contentEl.appendChild(info.content); else if (typeof info.content === 'string') contentEl.innerHTML = info.content;
    bodyEl.appendChild(contentEl); root.appendChild(bodyEl);
    if (info.footer) root.appendChild(new NoshiCE({ tag:'footer', class:'noshi-page-footer', text: info.footer.text||'' }).tag);
    document.body.innerHTML = ''; document.body.appendChild(root);
    return { page: root, content: contentEl };
};

NoshiBuilder.prototype.navbar = function(info) {
    NoshiStyles.inject('nav', CSS_NAV);
    const brand = new NoshiCE({ tag:'div', class:'noshi-nav-brand', text: info.brand || 'Noshi' }).tag;
    const links = new NoshiCE({ tag:'div', class:'noshi-nav-links', child: (info.links||[]).map(l => new NoshiCE({ tag:'a', class:`noshi-nav-link${l.active?' active':''}`, href:l.href||'#', text:l.label }).tag) }).tag;
    return new NoshiCE({ tag:'header', class:'noshi-nav', child:[brand, links] }).tag;
};

// Register tags
NoshiRegistry.define('page', NoshiBuilder.prototype.page);
NoshiRegistry.define('nav', NoshiBuilder.prototype.navbar);
NoshiRegistry.define('navbar', NoshiBuilder.prototype.navbar);

/**
 * Visual Components
 */
const CSS_SLIDER = `.noshi-slider{position:relative;overflow:hidden;width:100%;height:300px;background:#111}
.noshi-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity .6s ease;z-index:0}
.noshi-slide.active{opacity:1;visibility:visible;z-index:1}
.noshi-slider-dots{position:absolute;bottom:.75rem;left:50%;transform:translateX(-50%);display:flex;gap:.4rem;z-index:2}
.noshi-slider-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:var(--tr)}.noshi-slider-dot.active{background:#fff;width:24px;border-radius:4px}`;

const CSS_LOAD = `.noshi-loading-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:9999}
.noshi-spinner{width:44px;height:44px;border:4px solid var(--gray);border-top-color:var(--p);border-radius:50%;animation:noshi-spin 1s linear infinite}
.noshi-dots-holder{display:flex;gap:.35rem}
.noshi-dot{width:12px;height:12px;border-radius:50%;background:var(--p);animation:noshi-bounce 1.4s ease-in-out infinite}`;

NoshiBuilder.prototype.slider = function(info) {
    NoshiStyles.inject('slider', CSS_SLIDER);
    const slides = (info.images||[]).map((img, i) => new NoshiCE({ tag:'img', class:`noshi-slide${i===0?' active':''}`, src: img.src||img, style:`height:${info.height||'300px'}` }).tag);
    const dots = (info.images||[]).map((_, i) => new NoshiCE({ tag:'div', class:`noshi-slider-dot${i===0?' active':''}` }).tag);
    const dotsEl = new NoshiCE({ tag:'div', class:'noshi-slider-dots', child: dots }).tag;
    const wrap = new NoshiCE({ tag:'div', class:'noshi-slider', style:`height:${info.height||'300px'}`, child:[...slides, dotsEl] }).tag;
    let cur = 0;
    const go = (n) => {
        slides[cur].classList.remove('active'); dots[cur].classList.remove('active');
        cur = (n + slides.length) % slides.length;
        slides[cur].classList.add('active'); dots[cur].classList.add('active');
    };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    if (slides.length > 1) setInterval(() => go(cur + 1), (info.time || 4) * 1000);
    return wrap;
};

// Register tags
NoshiRegistry.define('slider', NoshiBuilder.prototype.slider);


    
    // Auto-initialize
    global.Noshi.start([
        () => window.NoshiRegistry.init(),
        () => {
            document.querySelectorAll('[data-noshi-menu]').forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const target = document.getElementById(trigger.getAttribute('data-noshi-menu'));
                    if (target) target.classList.toggle('open');
                });
            });
        },
        () => { if (localStorage.getItem('noshi-dark') === 'true') window.Noshi.toggleDarkMode(true); }
    ]);

})(typeof window !== 'undefined' ? window : this);
