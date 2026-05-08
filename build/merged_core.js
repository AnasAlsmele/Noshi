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
/**
 * Noshi v2.0 - Phase 2: Base CSS Strings
 * All foundational styles embedded as JS template literals.
 * Injected once on library init via NoshiStyles.inject().
 */
const CSS_BASE = `
:root {
    --noshi-primary: #0077b6;
    --noshi-secondary: #588157;
    --noshi-error: #9e2a2b;
    --noshi-warning: #ffc971;
    --noshi-success: #588157;
    --noshi-dark: #222222;
    --noshi-light: #fdfdfd;
    --noshi-gray: #e5e5e5;
    --noshi-text: #444444;
    --noshi-text-muted: #888888;
    --noshi-shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
    --noshi-shadow-md: 0 4px 12px rgba(0,0,0,0.1);
    --noshi-shadow-lg: 0 10px 30px rgba(0,0,0,0.12);
    --noshi-radius-sm: 6px;
    --noshi-radius-md: 10px;
    --noshi-radius-lg: 16px;
    --noshi-transition: all 0.25s ease;
    --noshi-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--noshi-font); color: var(--noshi-text); display: flex; flex-direction: column; }
a { text-decoration: none; color: inherit; }
.noshi-dark-mode {
    --noshi-light: #1e1e1e;
    --noshi-gray: #333;
    --noshi-dark: #f0f0f0;
    --noshi-text: #e0e0e0;
    --noshi-text-muted: #aaa;
    background-color: #121212;
}
[dir="rtl"] .input-holder, [dir="rtl"] .btn-holder, [dir="rtl"] .note-holder { flex-direction: row-reverse; }
.error-screen { padding:1em; margin:1em; background:#fff3f3; border:1px solid var(--noshi-error); color:var(--noshi-error); border-radius:var(--noshi-radius-sm); }
`;

const CSS_UTILS = `
.w5{width:5%} .w10{width:10%} .w20{width:20%} .w25{width:25%} .w30{width:30%}
.w33{width:33.33%} .w40{width:40%} .w50{width:50%} .w60{width:60%} .w70{width:70%}
.w75{width:75%} .w80{width:80%} .w90{width:90%} .w100{width:100%}
.h25{height:25vh} .h50{height:50vh} .h75{height:75vh} .h100{height:100vh}
.flex{display:flex} .flex-col{flex-direction:column} .flex-row{flex-direction:row}
.flex-1{flex:1} .flex-wrap{flex-wrap:wrap}
.jc-center{justify-content:center} .jc-end{justify-content:flex-end}
.jc-between{justify-content:space-between} .jc-around{justify-content:space-around}
.ai-center{align-items:center} .ai-end{align-items:flex-end} .ai-start{align-items:flex-start}
.left{text-align:left} .right{text-align:right} .center{text-align:center} .justify{text-align:justify}
.bold{font-weight:700} .italic{font-style:italic} .underline{text-decoration:underline}
.xsmall{font-size:.7em} .small{font-size:.85em} .large{font-size:1.2em} .xlarge{font-size:1.5em}
.p1{padding:.5rem} .p2{padding:1rem} .p3{padding:1.5rem} .p4{padding:2rem}
.m1{margin:.5rem} .m2{margin:1rem} .m3{margin:1.5rem} .m4{margin:2rem}
.mt1{margin-top:.5rem} .mt2{margin-top:1rem} .mt3{margin-top:1.5rem}
.mb1{margin-bottom:.5rem} .mb2{margin-bottom:1rem} .mb3{margin-bottom:1.5rem}
.gap1{gap:.5rem} .gap2{gap:1rem} .gap3{gap:1.5rem}
.rounded{border-radius:var(--noshi-radius-sm)} .rounded-md{border-radius:var(--noshi-radius-md)}
.shadow{box-shadow:var(--noshi-shadow-sm)} .shadow-md{box-shadow:var(--noshi-shadow-md)}
.overflow-hidden{overflow:hidden} .relative{position:relative} .absolute{position:absolute}
.cursor-pointer{cursor:pointer} .select-none{user-select:none}
.cred{color:var(--noshi-error)} .cblue{color:var(--noshi-primary)} .cgreen{color:var(--noshi-success)}
.cyellow{color:var(--noshi-warning)} .cgray{color:var(--noshi-text-muted)}
.bgred{background:var(--noshi-error)} .bgblue{background:var(--noshi-primary)}
.bggreen{background:var(--noshi-success)} .bggray{background:var(--noshi-gray)}
.bglight{background:var(--noshi-light)} .bgdark{background:var(--noshi-dark)}
`;

const CSS_ANIMATIONS = `
@keyframes noshi-spin { to { transform: rotate(360deg); } }
@keyframes noshi-fade-in { from { opacity:0; } to { opacity:1; } }
@keyframes noshi-slide-up { from { transform:translateY(16px); opacity:0; } to { transform:translateY(0); opacity:1; } }
@keyframes noshi-slide-in-right { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
@keyframes noshi-bounce { 0%,80%,100% { transform:scale(0); } 40% { transform:scale(1); } }
@keyframes noshi-progress-stripe {
    from { background-position: 40px 0; }
    to   { background-position: 0 0; }
}
.noshi-fade-in { animation: noshi-fade-in 0.3s ease; }
.noshi-slide-up { animation: noshi-slide-up 0.3s ease; }
`;
/**
 * Noshi v2.0 - Phase 3: Component CSS Strings
 * Each constant is injected once when the component is first used.
 */

const CSS_BUTTONS = `
.btn { display:inline-flex; align-items:center; gap:.5rem; padding:.6rem 1.25rem; border:none; border-radius:var(--noshi-radius-sm); font-size:.95rem; font-weight:500; cursor:pointer; transition:var(--noshi-transition); white-space:nowrap; }
.btn:disabled { opacity:.5; cursor:not-allowed; }
.btn-default { background:var(--noshi-gray); color:var(--noshi-text); }
.btn-default:hover { background:#d5d5d5; }
.btn-active { background:var(--noshi-primary); color:#fff; box-shadow:0 3px 10px rgba(0,119,182,.3); }
.btn-active:hover { filter:brightness(1.1); }
.btn-correct { background:var(--noshi-success); color:#fff; box-shadow:0 3px 10px rgba(88,129,87,.3); }
.btn-correct:hover { filter:brightness(1.1); }
.btn-warning { background:var(--noshi-warning); color:var(--noshi-dark); }
.btn-warning:hover { filter:brightness(1.05); }
.btn-error { background:var(--noshi-error); color:#fff; box-shadow:0 3px 10px rgba(158,42,43,.3); }
.btn-error:hover { filter:brightness(1.1); }
.btn-dark { background:var(--noshi-dark); color:#fff; }
.btn-dark:hover { filter:brightness(1.2); }
.btn-outline { background:transparent; color:var(--noshi-primary); border:1.5px solid var(--noshi-primary); }
.btn-outline:hover { background:var(--noshi-primary); color:#fff; }
.btn-ghost { background:transparent; color:var(--noshi-text-muted); }
.btn-ghost:hover { background:var(--noshi-gray); color:var(--noshi-text); }
.btn-sm { padding:.35rem .85rem; font-size:.82rem; }
.btn-lg { padding:.85rem 2rem; font-size:1.05rem; border-radius:var(--noshi-radius-md); }
.btn-icon { padding:.6rem; border-radius:50%; width:2.2rem; height:2.2rem; justify-content:center; }
`;

const CSS_CARDS = `
.card { display:flex; flex-direction:column; background:#fff; border-radius:var(--noshi-radius-md); overflow:hidden; box-shadow:var(--noshi-shadow-sm); transition:var(--noshi-transition); text-decoration:none; color:inherit; }
.card-hover:hover { box-shadow:var(--noshi-shadow-md); transform:translateY(-3px); }
.card-dark { background:var(--noshi-dark); color:#fff; }
.card-image { width:100%; object-fit:cover; }
.card-body { padding:1.25rem; flex:1; }
.card-title { font-size:1.1rem; font-weight:600; margin-bottom:.5rem; }
.card-text { font-size:.9rem; color:var(--noshi-text-muted); line-height:1.6; }
.card-footer { padding:.75rem 1.25rem; border-top:1px solid var(--noshi-gray); display:flex; }
.card-dark .card-text { color:rgba(255,255,255,.6); }
.card-dark .card-footer { border-color:rgba(255,255,255,.1); }
`;

const CSS_INPUTS = `
.noshi-input { width:100%; padding:.65rem 1rem; border:1.5px solid var(--noshi-gray); border-radius:var(--noshi-radius-sm); font-size:.95rem; color:var(--noshi-text); background:#fff; outline:none; transition:var(--noshi-transition); }
.noshi-input:focus { border-color:var(--noshi-primary); box-shadow:0 0 0 3px rgba(0,119,182,.1); }
.noshi-input::placeholder { color:#bbb; }
.noshi-input:disabled { background:var(--noshi-gray); cursor:not-allowed; opacity:.7; }
.noshi-input-warning { border-color:var(--noshi-warning) !important; }
.noshi-input-error { border-color:var(--noshi-error) !important; }
.noshi-input-holder { display:flex; align-items:center; border:1.5px solid var(--noshi-gray); border-radius:var(--noshi-radius-sm); padding:.5rem 1rem; gap:.75rem; background:#fff; transition:var(--noshi-transition); cursor:pointer; }
.noshi-input-holder:hover { border-color:var(--noshi-primary); }
.noshi-input-label { flex:1; font-size:.95rem; cursor:pointer; }
input[type="checkbox"], input[type="radio"] { accent-color:var(--noshi-primary); width:1.1rem; height:1.1rem; cursor:pointer; }
.noshi-field-group { display:flex; flex-direction:column; gap:.35rem; margin-bottom:.75rem; }
.noshi-field-label { font-size:.85rem; font-weight:600; color:var(--noshi-text); }
.noshi-field-hint { font-size:.78rem; color:var(--noshi-text-muted); }
.noshi-field-error { font-size:.78rem; color:var(--noshi-error); }
`;

const CSS_FORMS = `
.noshi-form { display:flex; flex-direction:column; gap:.5rem; }
.noshi-form-title { font-size:1.25rem; font-weight:700; margin-bottom:.5rem; color:var(--noshi-text); }
.noshi-form-btns { display:flex; gap:.75rem; margin-top:.5rem; flex-wrap:wrap; }
.noshi-select { width:100%; padding:.65rem 1rem; border:1.5px solid var(--noshi-gray); border-radius:var(--noshi-radius-sm); font-size:.95rem; color:var(--noshi-text); background:#fff; outline:none; cursor:pointer; transition:var(--noshi-transition); appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23888' d='M6 8L0 0h12z'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 1rem center; padding-right:2.5rem; }
.noshi-select:focus { border-color:var(--noshi-primary); box-shadow:0 0 0 3px rgba(0,119,182,.1); }
`;

const CSS_NOTES = `
.noshi-note { display:flex; align-items:stretch; border-radius:var(--noshi-radius-sm); overflow:hidden; border:1px solid var(--noshi-gray); box-shadow:var(--noshi-shadow-sm); margin:.5rem 0; }
.noshi-note-icon { display:flex; align-items:center; justify-content:center; min-width:48px; font-size:1.2rem; color:#fff; padding:0 .75rem; background:var(--noshi-dark); }
.noshi-note-body { padding:.85rem 1rem; flex:1; font-size:.9rem; line-height:1.55; color:var(--noshi-text); }
.noshi-note-success { border-color:rgba(88,129,87,.3); }
.noshi-note-success .noshi-note-icon { background:var(--noshi-success); }
.noshi-note-success .noshi-note-body { background:rgba(88,129,87,.05); }
.noshi-note-warning { border-color:rgba(255,201,113,.4); }
.noshi-note-warning .noshi-note-icon { background:var(--noshi-warning); color:var(--noshi-dark); }
.noshi-note-warning .noshi-note-body { background:rgba(255,201,113,.07); }
.noshi-note-error { border-color:rgba(158,42,43,.2); }
.noshi-note-error .noshi-note-icon { background:var(--noshi-error); }
.noshi-note-error .noshi-note-body { background:rgba(158,42,43,.04); }
`;

const CSS_MODALS = `
.noshi-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); backdrop-filter:blur(5px); display:flex; align-items:center; justify-content:center; z-index:2000; animation:noshi-fade-in .25s ease; }
.noshi-modal { background:#fff; border-radius:var(--noshi-radius-lg); box-shadow:var(--noshi-shadow-lg); display:flex; flex-direction:column; overflow:hidden; width:90%; max-width:560px; animation:noshi-slide-up .3s ease; }
.noshi-modal-header { display:flex; justify-content:space-between; align-items:center; padding:1.25rem 1.5rem; border-bottom:1px solid var(--noshi-gray); }
.noshi-modal-header h3 { font-size:1.15rem; font-weight:700; }
.noshi-modal-close { cursor:pointer; font-size:1.6rem; color:var(--noshi-text-muted); line-height:1; transition:var(--noshi-transition); }
.noshi-modal-close:hover { color:var(--noshi-error); }
.noshi-modal-body { padding:1.5rem; overflow-y:auto; max-height:65vh; }
.noshi-modal-footer { padding:1rem 1.5rem; border-top:1px solid var(--noshi-gray); display:flex; justify-content:flex-end; gap:.75rem; background:#fafafa; }
`;

const CSS_TABS = `
.noshi-tabs { border:1px solid var(--noshi-gray); border-radius:var(--noshi-radius-md); overflow:hidden; }
.noshi-tabs-nav { display:flex; background:#f8f9fa; border-bottom:1px solid var(--noshi-gray); overflow-x:auto; }
.noshi-tab-btn { padding:.85rem 1.5rem; cursor:pointer; font-size:.93rem; font-weight:500; color:var(--noshi-text-muted); border-bottom:3px solid transparent; white-space:nowrap; transition:var(--noshi-transition); background:none; border-left:none; border-right:none; border-top:none; }
.noshi-tab-btn:hover { color:var(--noshi-primary); background:rgba(0,119,182,.03); }
.noshi-tab-btn.active { color:var(--noshi-primary); border-bottom-color:var(--noshi-primary); background:#fff; font-weight:600; }
.noshi-tab-pane { display:none; padding:1.5rem; animation:noshi-fade-in .25s ease; }
.noshi-tab-pane.active { display:block; }
`;

const CSS_TOASTS = `
.noshi-toasts { position:fixed; bottom:1.5rem; right:1.5rem; display:flex; flex-direction:column; gap:.75rem; z-index:3000; }
.noshi-toast { display:flex; align-items:center; gap:.75rem; min-width:280px; max-width:380px; padding:.9rem 1.1rem; background:var(--noshi-dark); color:#fff; border-radius:var(--noshi-radius-sm); box-shadow:var(--noshi-shadow-md); animation:noshi-slide-in-right .3s ease; }
.noshi-toast-msg { flex:1; font-size:.9rem; line-height:1.4; }
.noshi-toast-close { cursor:pointer; font-size:1.1rem; opacity:.65; transition:var(--noshi-transition); flex-shrink:0; }
.noshi-toast-close:hover { opacity:1; }
.noshi-toast-info  { border-left:4px solid var(--noshi-primary); }
.noshi-toast-success { border-left:4px solid var(--noshi-success); }
.noshi-toast-warning { border-left:4px solid var(--noshi-warning); }
.noshi-toast-error  { border-left:4px solid var(--noshi-error); }
`;

const CSS_SLIDERS = `
.noshi-slider { position:relative; overflow:hidden; width:100%; height:300px; background:#111; }
.noshi-slide { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; visibility:hidden; transition:opacity .6s ease; z-index:0; }
.noshi-slide.active { opacity:1; visibility:visible; z-index:1; }
.noshi-slider-dots { position:absolute; bottom:.75rem; left:50%; transform:translateX(-50%); display:flex; gap:.4rem; z-index:2; }
.noshi-slider-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.4); cursor:pointer; transition:var(--noshi-transition); }
.noshi-slider-dot.active { background:#fff; width:24px; border-radius:4px; }
`;

const CSS_LOADING = `
.noshi-loading-overlay { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:9999; }
.noshi-spinner { width:44px; height:44px; border:4px solid var(--noshi-gray); border-top-color:var(--noshi-primary); border-radius:50%; animation:noshi-spin 1s linear infinite; }
.noshi-dots-holder { display:flex; gap:.35rem; }
.noshi-dot { width:12px; height:12px; border-radius:50%; background:var(--noshi-primary); animation:noshi-bounce 1.4s ease-in-out infinite; }
`;

const CSS_CODES = `
.noshi-code { display:block; background:#1e1e2e; color:#cdd6f4; padding:1.25rem; border-radius:var(--noshi-radius-sm); overflow-x:auto; font-family:'Fira Code','Consolas',monospace; font-size:.88rem; line-height:1.7; white-space:pre; }
code-line { display:block; }
html-tag-border { color:#89b4fa; }
html-tag-attr  { color:#a6e3a1; }
html-tag-attr-val { color:#f38ba8; }
css-property { color:#89b4fa; }
css-value { color:#a6e3a1; }
js-var { color:#cba6f7; }
js-txt { color:#a6e3a1; }
js-bracket { color:#fab387; }
js-func { color:#89b4fa; }
`;

const CSS_GRAPH = `
.noshi-graph { display:flex; flex-direction:column; border:1px solid var(--noshi-gray); border-radius:var(--noshi-radius-md); overflow:hidden; box-shadow:var(--noshi-shadow-sm); }
.noshi-graph-head { padding:.75rem 1.25rem; font-weight:600; font-size:1rem; background:#f8f9fa; border-bottom:1px solid var(--noshi-gray); }
.noshi-graph-svg { display:block; width:100%; }
circle { transition:r .2s ease; cursor:pointer; }
`;

const CSS_NAVS = `
.noshi-nav { display:flex; align-items:center; background:#fff; border-bottom:1px solid var(--noshi-gray); padding:0 1.5rem; height:60px; position:sticky; top:0; z-index:100; box-shadow:var(--noshi-shadow-sm); }
.noshi-nav-brand { font-size:1.2rem; font-weight:700; color:var(--noshi-primary); margin-right:2rem; }
.noshi-nav-links { display:flex; gap:1rem; flex:1; }
.noshi-nav-link { padding:.4rem .75rem; border-radius:var(--noshi-radius-sm); color:var(--noshi-text-muted); font-size:.93rem; transition:var(--noshi-transition); }
.noshi-nav-link:hover, .noshi-nav-link.active { color:var(--noshi-primary); background:rgba(0,119,182,.06); }
.noshi-nav-actions { display:flex; gap:.5rem; }
.noshi-nav-menu-head { cursor:pointer; display:flex; align-items:center; gap:.4rem; }
.noshi-nav-menu-body { display:none; position:absolute; top:60px; background:#fff; border:1px solid var(--noshi-gray); border-radius:var(--noshi-radius-sm); box-shadow:var(--noshi-shadow-md); min-width:180px; overflow:hidden; z-index:200; }
.noshi-nav-menu-body.open { display:flex; flex-direction:column; animation:noshi-slide-up .2s ease; }
.noshi-nav-menu-item { padding:.75rem 1rem; font-size:.9rem; transition:var(--noshi-transition); cursor:pointer; }
.noshi-nav-menu-item:hover { background:var(--noshi-gray); }
`;

const CSS_TABLES = `
.noshi-table-wrap { border:1px solid var(--noshi-gray); border-radius:var(--noshi-radius-md); overflow:hidden; box-shadow:var(--noshi-shadow-sm); }
.noshi-table-toolbar { display:flex; justify-content:space-between; align-items:center; padding:.75rem 1rem; background:#f8f9fa; border-bottom:1px solid var(--noshi-gray); gap:1rem; flex-wrap:wrap; }
.noshi-table-search { padding:.5rem .85rem; border:1.5px solid var(--noshi-gray); border-radius:var(--noshi-radius-sm); font-size:.9rem; outline:none; transition:var(--noshi-transition); min-width:200px; }
.noshi-table-search:focus { border-color:var(--noshi-primary); }
.noshi-table { width:100%; border-collapse:collapse; }
.noshi-table th { padding:.75rem 1rem; text-align:left; font-size:.82rem; text-transform:uppercase; letter-spacing:.05em; color:var(--noshi-text-muted); background:#f8f9fa; border-bottom:1px solid var(--noshi-gray); white-space:nowrap; }
.noshi-table th.sortable { cursor:pointer; user-select:none; }
.noshi-table th.sortable:hover { color:var(--noshi-primary); }
.noshi-table th.sort-asc::after { content:" ↑"; color:var(--noshi-primary); }
.noshi-table th.sort-desc::after { content:" ↓"; color:var(--noshi-primary); }
.noshi-table td { padding:.75rem 1rem; font-size:.9rem; border-bottom:1px solid var(--noshi-gray); color:var(--noshi-text); }
.noshi-table tr:last-child td { border-bottom:none; }
.noshi-table tr:hover td { background:rgba(0,119,182,.025); }
.noshi-table-footer { display:flex; justify-content:space-between; align-items:center; padding:.6rem 1rem; background:#f8f9fa; border-top:1px solid var(--noshi-gray); font-size:.85rem; color:var(--noshi-text-muted); flex-wrap:wrap; gap:.5rem; }
.noshi-table-pages { display:flex; gap:.35rem; }
.noshi-page-btn { padding:.3rem .65rem; border:1px solid var(--noshi-gray); border-radius:var(--noshi-radius-sm); cursor:pointer; font-size:.82rem; background:#fff; transition:var(--noshi-transition); }
.noshi-page-btn:hover { border-color:var(--noshi-primary); color:var(--noshi-primary); }
.noshi-page-btn.active { background:var(--noshi-primary); color:#fff; border-color:var(--noshi-primary); }
`;
/**
 * Noshi v2.0 - Phase 4: New Components A
 * CSS strings + Builder methods for: badge, progress, statsCard
 */

// ─── CSS ────────────────────────────────────────────────────────────────────

const CSS_BADGES = `
.noshi-badge { display:inline-flex; align-items:center; gap:.3rem; padding:.2rem .65rem; border-radius:20px; font-size:.75rem; font-weight:600; white-space:nowrap; }
.noshi-badge-info    { background:rgba(0,119,182,.12); color:var(--noshi-primary); }
.noshi-badge-success { background:rgba(88,129,87,.12); color:var(--noshi-success); }
.noshi-badge-warning { background:rgba(255,201,113,.2); color:#a06000; }
.noshi-badge-error   { background:rgba(158,42,43,.1); color:var(--noshi-error); }
.noshi-badge-dark    { background:var(--noshi-dark); color:#fff; }
.noshi-badge-gray    { background:var(--noshi-gray); color:var(--noshi-text-muted); }
.noshi-badge-dot::before { content:''; display:inline-block; width:7px; height:7px; border-radius:50%; background:currentColor; }
`;

const CSS_PROGRESS = `
.noshi-progress-wrap { width:100%; }
.noshi-progress-label { display:flex; justify-content:space-between; font-size:.83rem; color:var(--noshi-text-muted); margin-bottom:.4rem; }
.noshi-progress-track { width:100%; height:10px; background:var(--noshi-gray); border-radius:20px; overflow:hidden; }
.noshi-progress-bar { height:100%; border-radius:20px; transition:width .6s ease; background:var(--noshi-primary); }
.noshi-progress-striped .noshi-progress-bar {
    background-image:linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent);
    background-size:40px 40px;
    animation:noshi-progress-stripe .8s linear infinite;
}
.noshi-progress-sm .noshi-progress-track { height:6px; }
.noshi-progress-lg .noshi-progress-track { height:16px; }
.noshi-progress-success .noshi-progress-bar { background:var(--noshi-success); }
.noshi-progress-warning .noshi-progress-bar { background:var(--noshi-warning); }
.noshi-progress-error   .noshi-progress-bar { background:var(--noshi-error); }
`;

const CSS_STATS = `
.noshi-stats-card { display:flex; align-items:center; gap:1rem; padding:1.25rem 1.5rem; background:#fff; border-radius:var(--noshi-radius-md); box-shadow:var(--noshi-shadow-sm); border:1px solid var(--noshi-gray); transition:var(--noshi-transition); }
.noshi-stats-card:hover { box-shadow:var(--noshi-shadow-md); transform:translateY(-2px); }
.noshi-stats-icon { width:48px; height:48px; border-radius:var(--noshi-radius-sm); display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
.noshi-stats-icon-primary { background:rgba(0,119,182,.1); color:var(--noshi-primary); }
.noshi-stats-icon-success { background:rgba(88,129,87,.1); color:var(--noshi-success); }
.noshi-stats-icon-warning { background:rgba(255,201,113,.2); color:#a06000; }
.noshi-stats-icon-error   { background:rgba(158,42,43,.1); color:var(--noshi-error); }
.noshi-stats-body { flex:1; }
.noshi-stats-value { font-size:1.75rem; font-weight:700; line-height:1; color:var(--noshi-text); }
.noshi-stats-label { font-size:.83rem; color:var(--noshi-text-muted); margin-top:.25rem; }
.noshi-stats-trend { font-size:.8rem; font-weight:600; display:flex; align-items:center; gap:.2rem; margin-top:.35rem; }
.noshi-trend-up   { color:var(--noshi-success); }
.noshi-trend-down { color:var(--noshi-error); }
`;

// ─── BUILDER METHODS ────────────────────────────────────────────────────────

/**
 * builder.badge({ text, type, dot, icon })
 * type: 'info' | 'success' | 'warning' | 'error' | 'dark' | 'gray'
 */
const _buildBadge = function(info) {
    NoshiStyles.inject('badges', CSS_BADGES);
    const type = info.type || 'gray';
    const dot  = info.dot ? 'noshi-badge-dot' : '';
    const badge = new NoshiCE({
        tag: 'span',
        class: `noshi-badge noshi-badge-${type} ${dot}`.trim(),
        text: info.text || ''
    }).tag;
    if (info.icon) {
        const ico = new NoshiCE({ tag: 'i', class: info.icon }).tag;
        badge.prepend(ico);
    }
    return badge;
};

/**
 * builder.progress({ value, max, label, size, color, striped })
 * color: 'primary' | 'success' | 'warning' | 'error'
 * size:  'sm' | 'md' | 'lg'
 */
const _buildProgress = function(info) {
    NoshiStyles.inject('progress', CSS_PROGRESS);
    const value   = Math.min(Math.max(info.value || 0, 0), info.max || 100);
    const max     = info.max || 100;
    const pct     = Math.round((value / max) * 100);
    const color   = info.color || 'primary';
    const size    = info.size ? `noshi-progress-${info.size}` : '';
    const striped = info.striped ? 'noshi-progress-striped' : '';
    const colorCls = color !== 'primary' ? `noshi-progress-${color}` : '';

    const bar = new NoshiCE({ tag: 'div', class: 'noshi-progress-bar', style: `width:${pct}%` }).tag;
    const track = new NoshiCE({ tag: 'div', class: 'noshi-progress-track', child: [bar] }).tag;

    const children = [];
    if (info.label !== false) {
        const lbl = new NoshiCE({
            tag: 'div',
            class: 'noshi-progress-label',
            child: [
                new NoshiCE({ tag: 'span', text: info.label || '' }).tag,
                new NoshiCE({ tag: 'span', text: `${pct}%` }).tag
            ]
        }).tag;
        children.push(lbl);
    }
    children.push(track);

    return new NoshiCE({
        tag: 'div',
        class: `noshi-progress-wrap ${size} ${striped} ${colorCls}`.trim(),
        child: children
    }).tag;
};

/**
 * builder.statsCard({ icon, iconType, value, label, trend, trendUp })
 * iconType: 'primary' | 'success' | 'warning' | 'error'
 */
const _buildStatsCard = function(info) {
    NoshiStyles.inject('stats', CSS_STATS);
    const iconType = info.iconType || 'primary';

    const iconEl = new NoshiCE({
        tag: 'div',
        class: `noshi-stats-icon noshi-stats-icon-${iconType}`,
        child: [new NoshiCE({ tag: 'i', class: info.icon || '' }).tag]
    }).tag;
    if (!info.icon) iconEl.textContent = info.emoji || '📊';

    const valueEl = new NoshiCE({ tag: 'div', class: 'noshi-stats-value', text: String(info.value || '0') }).tag;
    const labelEl = new NoshiCE({ tag: 'div', class: 'noshi-stats-label', text: info.label || '' }).tag;

    const bodyChildren = [valueEl, labelEl];

    if (info.trend) {
        const trendDir = info.trendUp ? 'up' : 'down';
        const arrow    = info.trendUp ? '▲' : '▼';
        const trendEl  = new NoshiCE({
            tag: 'div',
            class: `noshi-stats-trend noshi-trend-${trendDir}`,
            text: `${arrow} ${info.trend}`
        }).tag;
        bodyChildren.push(trendEl);
    }

    const body = new NoshiCE({ tag: 'div', class: 'noshi-stats-body', child: bodyChildren }).tag;

    return new NoshiCE({
        tag: 'div',
        class: 'noshi-stats-card',
        child: [iconEl, body]
    }).tag;
};
/**
 * Noshi v2.0 - Phase 5: New Components B
 * CSS strings + Builder methods for: accordion, tooltip, table
 */

// ─── CSS ────────────────────────────────────────────────────────────────────

const CSS_ACCORDION = `
.noshi-accordion { border:1px solid var(--noshi-gray); border-radius:var(--noshi-radius-md); overflow:hidden; }
.noshi-accordion-item { border-bottom:1px solid var(--noshi-gray); }
.noshi-accordion-item:last-child { border-bottom:none; }
.noshi-accordion-head { display:flex; justify-content:space-between; align-items:center; padding:1rem 1.25rem; cursor:pointer; background:#fff; transition:var(--noshi-transition); user-select:none; }
.noshi-accordion-head:hover { background:#f8f9fa; }
.noshi-accordion-head.open { background:#f0f7ff; color:var(--noshi-primary); }
.noshi-accordion-title { font-weight:600; font-size:.95rem; }
.noshi-accordion-arrow { font-size:.75rem; transition:transform .3s ease; color:var(--noshi-text-muted); }
.noshi-accordion-head.open .noshi-accordion-arrow { transform:rotate(180deg); color:var(--noshi-primary); }
.noshi-accordion-body { max-height:0; overflow:hidden; transition:max-height .35s ease, padding .2s ease; padding:0 1.25rem; }
.noshi-accordion-body.open { max-height:600px; padding:1rem 1.25rem; }
.noshi-accordion-content { font-size:.9rem; color:var(--noshi-text-muted); line-height:1.65; }
`;

const CSS_TOOLTIP = `
.noshi-tooltip-wrap { position:relative; display:inline-flex; }
.noshi-tooltip-box { position:absolute; background:rgba(30,30,30,.92); color:#fff; font-size:.78rem; padding:.35rem .75rem; border-radius:var(--noshi-radius-sm); white-space:nowrap; pointer-events:none; opacity:0; transition:opacity .2s ease, transform .2s ease; z-index:1000; }
.noshi-tooltip-wrap:hover .noshi-tooltip-box { opacity:1; transform:none !important; }
.noshi-tooltip-top    .noshi-tooltip-box { bottom:calc(100% + 6px); left:50%; transform:translateX(-50%) translateY(4px); }
.noshi-tooltip-bottom .noshi-tooltip-box { top:calc(100% + 6px); left:50%; transform:translateX(-50%) translateY(-4px); }
.noshi-tooltip-left   .noshi-tooltip-box { right:calc(100% + 6px); top:50%; transform:translateY(-50%) translateX(4px); }
.noshi-tooltip-right  .noshi-tooltip-box { left:calc(100% + 6px); top:50%; transform:translateY(-50%) translateX(-4px); }
`;

// ─── BUILDER METHODS ────────────────────────────────────────────────────────

/**
 * builder.accordion({ items: [{ title, content }], multiple })
 * multiple: allow multiple items open at once (default: false)
 */
const _buildAccordion = function(info) {
    NoshiStyles.inject('accordion', CSS_ACCORDION);
    const multiple = info.multiple || false;

    const items = (info.items || []).map((item, i) => {
        const body = new NoshiCE({ tag: 'div', class: 'noshi-accordion-body' }).tag;

        if (item.content instanceof HTMLElement) {
            body.appendChild(item.content);
        } else {
            body.appendChild(new NoshiCE({ tag: 'div', class: 'noshi-accordion-content', html: item.content || '' }).tag);
        }

        const arrow = new NoshiCE({ tag: 'span', class: 'noshi-accordion-arrow', text: '▼' }).tag;
        const head = new NoshiCE({
            tag: 'div',
            class: 'noshi-accordion-head',
            child: [
                new NoshiCE({ tag: 'span', class: 'noshi-accordion-title', text: item.title }).tag,
                arrow
            ]
        }).tag;

        head.addEventListener('click', () => {
            const isOpen = body.classList.contains('open');
            if (!multiple) {
                // close all others
                head.closest('.noshi-accordion').querySelectorAll('.noshi-accordion-body').forEach(b => b.classList.remove('open'));
                head.closest('.noshi-accordion').querySelectorAll('.noshi-accordion-head').forEach(h => h.classList.remove('open'));
            }
            body.classList.toggle('open', !isOpen);
            head.classList.toggle('open', !isOpen);
        });

        // open first item by default if specified
        if (i === 0 && info.openFirst) {
            body.classList.add('open');
            head.classList.add('open');
        }

        return new NoshiCE({ tag: 'div', class: 'noshi-accordion-item', child: [head, body] }).tag;
    });

    return new NoshiCE({ tag: 'div', class: 'noshi-accordion', child: items }).tag;
};

/**
 * builder.tooltip(element, { text, position })
 * position: 'top' | 'bottom' | 'left' | 'right'
 * Returns the wrapped element.
 */
const _buildTooltip = function(element, info) {
    NoshiStyles.inject('tooltip', CSS_TOOLTIP);
    const pos = info.position || 'top';
    const box = new NoshiCE({ tag: 'span', class: 'noshi-tooltip-box', text: info.text || '' }).tag;
    const wrap = new NoshiCE({
        tag: 'span',
        class: `noshi-tooltip-wrap noshi-tooltip-${pos}`,
        child: [element, box]
    }).tag;
    return wrap;
};

/**
 * builder.table({ columns, data, search, pagination, onRowClick })
 * columns: [{ key, label, sortable, render }]
 * render: (value, row) => HTMLElement | string
 */
const _buildTable = function(info) {
    NoshiStyles.inject('tables', CSS_TABLES);

    let allData  = info.data || [];
    let filtered = [...allData];
    let sortKey  = null;
    let sortDir  = 'asc';
    let page     = 1;
    const perPage = info.pagination || 0;

    // ── root container
    const wrap = new NoshiCE({ tag: 'div', class: 'noshi-table-wrap' }).tag;

    // ── toolbar (search)
    let searchInput = null;
    if (info.search) {
        searchInput = new NoshiCE({ tag: 'input', class: 'noshi-table-search', placeholder: info.searchPlaceholder || 'Search…', type: 'text' }).tag;
        searchInput.addEventListener('input', () => { page = 1; applyFilter(); });
        const toolbar = new NoshiCE({ tag: 'div', class: 'noshi-table-toolbar', child: [searchInput] }).tag;
        wrap.appendChild(toolbar);
    }

    // ── table
    const table = new NoshiCE({ tag: 'table', class: 'noshi-table' }).tag;

    // thead
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    (info.columns || []).forEach(col => {
        const th = document.createElement('th');
        th.textContent = col.label || col.key;
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
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // tbody
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    wrap.appendChild(table);

    // footer
    const footer = new NoshiCE({ tag: 'div', class: 'noshi-table-footer' }).tag;
    const countEl = new NoshiCE({ tag: 'span' }).tag;
    const pagesEl = new NoshiCE({ tag: 'div', class: 'noshi-table-pages' }).tag;
    footer.appendChild(countEl);
    footer.appendChild(pagesEl);
    if (perPage) wrap.appendChild(footer);

    // ── core render
    function applyFilter() {
        const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
        filtered = q ? allData.filter(row =>
            Object.values(row).some(v => String(v).toLowerCase().includes(q))
        ) : [...allData];
        render();
    }

    function render() {
        let rows = [...filtered];
        if (sortKey) {
            rows.sort((a, b) => {
                const av = a[sortKey], bv = b[sortKey];
                if (av < bv) return sortDir === 'asc' ? -1 : 1;
                if (av > bv) return sortDir === 'asc' ?  1 : -1;
                return 0;
            });
        }

        const total = rows.length;
        let display = rows;
        let totalPages = 1;

        if (perPage) {
            totalPages = Math.max(1, Math.ceil(total / perPage));
            page = Math.min(page, totalPages);
            const start = (page - 1) * perPage;
            display = rows.slice(start, start + perPage);

            // count
            countEl.textContent = `${start + 1}–${Math.min(start + perPage, total)} of ${total}`;

            // page buttons
            pagesEl.innerHTML = '';
            for (let p = 1; p <= totalPages; p++) {
                const btn = new NoshiCE({ tag: 'button', class: `noshi-page-btn${p === page ? ' active' : ''}`, text: String(p) }).tag;
                btn.addEventListener('click', () => { page = p; render(); });
                pagesEl.appendChild(btn);
            }
        }

        // render rows
        tbody.innerHTML = '';
        if (display.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = (info.columns || []).length;
            td.textContent = info.emptyText || 'No results found.';
            td.style.cssText = 'text-align:center;padding:2rem;color:var(--noshi-text-muted);';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }

        display.forEach(row => {
            const tr = document.createElement('tr');
            if (info.onRowClick) {
                tr.style.cursor = 'pointer';
                tr.addEventListener('click', () => info.onRowClick(row));
            }
            (info.columns || []).forEach(col => {
                const td = document.createElement('td');
                const val = row[col.key];
                if (typeof col.render === 'function') {
                    const rendered = col.render(val, row);
                    if (rendered instanceof HTMLElement) td.appendChild(rendered);
                    else td.innerHTML = rendered;
                } else {
                    td.textContent = val !== undefined && val !== null ? String(val) : '—';
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    // public API
    wrap.setData = (newData) => { allData = newData; filtered = [...newData]; page = 1; render(); };
    wrap.refresh  = () => applyFilter();

    applyFilter();
    return wrap;
};
/**
 * Noshi v2.0 - Phase 6: New Components C
 * CSS strings + methods for: stepper, Noshi.page()
 */

// ─── CSS ────────────────────────────────────────────────────────────────────

const CSS_STEPPER = `
.noshi-stepper { display:flex; flex-direction:column; gap:0; }
.noshi-stepper-nav { display:flex; align-items:center; padding:1.5rem 2rem; background:#fff; border-bottom:1px solid var(--noshi-gray); }
.noshi-step-item { display:flex; align-items:center; flex:1; }
.noshi-step-item:last-child { flex:0; }
.noshi-step-circle { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; font-weight:700; flex-shrink:0; transition:var(--noshi-transition); background:var(--noshi-gray); color:var(--noshi-text-muted); }
.noshi-step-circle.active { background:var(--noshi-primary); color:#fff; box-shadow:0 0 0 4px rgba(0,119,182,.15); }
.noshi-step-circle.done   { background:var(--noshi-success); color:#fff; }
.noshi-step-info  { margin-left:.6rem; }
.noshi-step-label { font-size:.82rem; font-weight:600; color:var(--noshi-text-muted); transition:var(--noshi-transition); white-space:nowrap; }
.noshi-step-label.active { color:var(--noshi-primary); }
.noshi-step-label.done   { color:var(--noshi-success); }
.noshi-step-line  { flex:1; height:2px; background:var(--noshi-gray); margin:0 .75rem; transition:background .4s ease; }
.noshi-step-line.done { background:var(--noshi-success); }
.noshi-stepper-content { padding:2rem; }
.noshi-step-pane { display:none; animation:noshi-fade-in .3s ease; }
.noshi-step-pane.active { display:block; }
.noshi-stepper-footer { display:flex; justify-content:space-between; align-items:center; padding:1rem 2rem; border-top:1px solid var(--noshi-gray); background:#fafafa; gap:.75rem; }
`;

const CSS_PAGE = `
.noshi-page { display:flex; flex-direction:column; min-height:100vh; }
.noshi-page-header { position:sticky; top:0; z-index:100; background:#fff; border-bottom:1px solid var(--noshi-gray); display:flex; align-items:center; padding:0 1.5rem; height:60px; gap:1rem; box-shadow:var(--noshi-shadow-sm); }
.noshi-page-brand { font-size:1.15rem; font-weight:700; color:var(--noshi-primary); }
.noshi-page-nav { display:flex; gap:.5rem; flex:1; }
.noshi-page-nav-link { padding:.4rem .8rem; border-radius:var(--noshi-radius-sm); color:var(--noshi-text-muted); font-size:.9rem; transition:var(--noshi-transition); cursor:pointer; }
.noshi-page-nav-link:hover, .noshi-page-nav-link.active { background:rgba(0,119,182,.07); color:var(--noshi-primary); }
.noshi-page-body { display:flex; flex:1; }
.noshi-page-sidebar { width:240px; flex-shrink:0; background:#fff; border-right:1px solid var(--noshi-gray); padding:1.25rem 0; position:sticky; top:60px; height:calc(100vh - 60px); overflow-y:auto; }
.noshi-page-sidebar-title { font-size:.72rem; text-transform:uppercase; letter-spacing:.06em; color:var(--noshi-text-muted); font-weight:700; padding:.75rem 1.25rem .3rem; }
.noshi-page-sidebar-link { display:flex; align-items:center; gap:.6rem; padding:.55rem 1.25rem; font-size:.9rem; color:var(--noshi-text); transition:var(--noshi-transition); cursor:pointer; }
.noshi-page-sidebar-link:hover { background:#f0f7ff; color:var(--noshi-primary); }
.noshi-page-sidebar-link.active { background:#e8f4ff; color:var(--noshi-primary); font-weight:600; border-right:3px solid var(--noshi-primary); }
.noshi-page-content { flex:1; padding:2rem; overflow-y:auto; }
.noshi-page-footer { padding:1rem 2rem; border-top:1px solid var(--noshi-gray); text-align:center; font-size:.83rem; color:var(--noshi-text-muted); background:#fafafa; }
`;

// ─── BUILDER METHOD: stepper ─────────────────────────────────────────────────

/**
 * builder.stepper({ steps: [{ title, content }], onComplete, completeText })
 * Returns the stepper element with .goTo(n), .next(), .prev() methods.
 */
const _buildStepper = function(info) {
    NoshiStyles.inject('stepper', CSS_STEPPER);
    const steps = info.steps || [];
    let current = 0;

    // ── nav circles + lines
    const navItems = [];
    steps.forEach((step, i) => {
        const circle = new NoshiCE({ tag: 'div', class: 'noshi-step-circle', text: String(i + 1) }).tag;
        const label  = new NoshiCE({ tag: 'div', class: 'noshi-step-label', text: step.title }).tag;
        const info_  = new NoshiCE({ tag: 'div', class: 'noshi-step-info', child: [label] }).tag;
        const item   = new NoshiCE({ tag: 'div', class: 'noshi-step-item', child: [circle, info_] }).tag;
        navItems.push({ el: item, circle, label });
    });

    const navChildren = [];
    navItems.forEach((ni, i) => {
        navChildren.push(ni.el);
        if (i < navItems.length - 1) {
            navChildren.push(new NoshiCE({ tag: 'div', class: 'noshi-step-line' }).tag);
        }
    });
    const nav = new NoshiCE({ tag: 'div', class: 'noshi-stepper-nav', child: navChildren }).tag;
    const lines = nav.querySelectorAll('.noshi-step-line');

    // ── panes
    const panes = steps.map((step, i) => {
        const pane = new NoshiCE({ tag: 'div', class: 'noshi-step-pane' }).tag;
        if (step.content instanceof HTMLElement) pane.appendChild(step.content);
        else pane.innerHTML = step.content || '';
        return pane;
    });
    const content = new NoshiCE({ tag: 'div', class: 'noshi-stepper-content', child: panes }).tag;

    // ── footer buttons
    const prevBtn = new NoshiCE({ tag: 'button', class: 'btn btn-ghost', text: '← Back' }).tag;
    const nextBtn = new NoshiCE({ tag: 'button', class: 'btn btn-active', text: 'Next →' }).tag;
    const stepCounter = new NoshiCE({ tag: 'span', class: 'small', style: 'color:var(--noshi-text-muted)' }).tag;
    const footer = new NoshiCE({ tag: 'div', class: 'noshi-stepper-footer', child: [prevBtn, stepCounter, nextBtn] }).tag;

    const root = new NoshiCE({ tag: 'div', class: 'noshi-stepper', child: [nav, content, footer] }).tag;

    function updateView() {
        // update circles, labels, lines
        navItems.forEach(({ circle, label }, i) => {
            circle.className = 'noshi-step-circle' + (i === current ? ' active' : i < current ? ' done' : '');
            label.className  = 'noshi-step-label'  + (i === current ? ' active' : i < current ? ' done' : '');
            circle.textContent = i < current ? '✓' : String(i + 1);
        });
        lines.forEach((line, i) => {
            line.classList.toggle('done', i < current);
        });
        // panes
        panes.forEach((p, i) => p.classList.toggle('active', i === current));
        // buttons
        prevBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
        nextBtn.textContent = current === steps.length - 1
            ? (info.completeText || 'Finish ✓')
            : 'Next →';
        stepCounter.textContent = `Step ${current + 1} of ${steps.length}`;
    }

    prevBtn.addEventListener('click', () => { if (current > 0) { current--; updateView(); } });
    nextBtn.addEventListener('click', () => {
        if (current < steps.length - 1) {
            const validate = steps[current].validate;
            if (validate && !validate()) return;
            current++;
            updateView();
        } else {
            if (info.onComplete) info.onComplete();
        }
    });

    // public API
    root.goTo = (n) => { current = Math.max(0, Math.min(n, steps.length - 1)); updateView(); };
    root.next = () => nextBtn.click();
    root.prev = () => prevBtn.click();

    updateView();
    return root;
};

// ─── Noshi.page() ────────────────────────────────────────────────────────────

/**
 * Noshi.page(info) — full page scaffolding, clears body and builds the layout.
 * info: { header, sidebar, content, footer }
 *
 * header: { brand, nav: [{ label, href, active }], actions: [HTMLElement] }
 * sidebar: { sections: [{ title, items: [{ label, icon, href, active, click }] }] }
 * content: HTMLElement | string
 * footer: { text }
 */
const _buildPage = function(info) {
    NoshiStyles.inject('page', CSS_PAGE);

    const page = new NoshiCE({ tag: 'div', class: 'noshi-page' }).tag;

    // ── Header
    if (info.header) {
        const h = info.header;
        const headerChildren = [];

        if (h.brand) {
            headerChildren.push(new NoshiCE({ tag: 'div', class: 'noshi-page-brand', text: h.brand }).tag);
        }

        if (h.nav) {
            const navLinks = h.nav.map(n => new NoshiCE({
                tag: 'a',
                class: `noshi-page-nav-link${n.active ? ' active' : ''}`,
                href: n.href || '#',
                text: n.label
            }).tag);
            headerChildren.push(new NoshiCE({ tag: 'nav', class: 'noshi-page-nav', child: navLinks }).tag);
        }

        if (h.actions) {
            const actionsEl = new NoshiCE({ tag: 'div', style: 'display:flex;gap:.5rem;', child: h.actions }).tag;
            headerChildren.push(actionsEl);
        }

        page.appendChild(new NoshiCE({ tag: 'header', class: 'noshi-page-header', child: headerChildren }).tag);
    }

    // ── Body
    const bodyEl = new NoshiCE({ tag: 'div', class: 'noshi-page-body' }).tag;

    // Sidebar
    if (info.sidebar) {
        const sidebarEl = new NoshiCE({ tag: 'aside', class: 'noshi-page-sidebar' }).tag;
        (info.sidebar.sections || []).forEach(section => {
            if (section.title) {
                sidebarEl.appendChild(new NoshiCE({ tag: 'div', class: 'noshi-page-sidebar-title', text: section.title }).tag);
            }
            (section.items || []).forEach(item => {
                const children = [];
                if (item.icon) children.push(new NoshiCE({ tag: 'i', class: item.icon }).tag);
                children.push(new NoshiCE({ tag: 'span', text: item.label }).tag);

                const link = new NoshiCE({
                    tag: item.href ? 'a' : 'div',
                    class: `noshi-page-sidebar-link${item.active ? ' active' : ''}`,
                    href: item.href || undefined,
                    child: children,
                    click: item.click || null
                }).tag;
                sidebarEl.appendChild(link);
            });
        });
        bodyEl.appendChild(sidebarEl);
    }

    // Content
    const contentEl = new NoshiCE({ tag: 'main', class: 'noshi-page-content' }).tag;
    if (info.content instanceof HTMLElement) {
        contentEl.appendChild(info.content);
    } else if (typeof info.content === 'string') {
        contentEl.innerHTML = info.content;
    }
    bodyEl.appendChild(contentEl);
    page.appendChild(bodyEl);

    // ── Footer
    if (info.footer) {
        page.appendChild(new NoshiCE({
            tag: 'footer',
            class: 'noshi-page-footer',
            text: info.footer.text || ''
        }).tag);
    }

    document.body.innerHTML = '';
    document.body.appendChild(page);

    return { page, content: contentEl };
};
/**
 * Noshi v2.0 - Phase 7: Noshi.store()
 * A lightweight reactive state manager.
 * No dependencies. Subscribe, compute, persist — all built in.
 */

const store = (function() {

    const _state     = {};
    const _listeners = {};
    const _computed  = {};

    // ── Internal: notify all listeners for a key
    function _notify(key) {
        const val = _state[key];
        (_listeners[key] || []).forEach(fn => {
            try { fn(val, key); } catch(e) { console.error('Noshi.store listener error:', e); }
        });
        // recompute any computed values that depend on this key
        Object.keys(_computed).forEach(cKey => {
            if (_computed[cKey].deps.includes(key)) {
                _state[cKey] = _computed[cKey].fn(_state);
                _notify(cKey);
            }
        });
    }

    return {

        /**
         * Set a value in the store.
         * store.set('count', 5)
         * store.set('user', { name: 'Anas' })
         */
        set(key, value) {
            _state[key] = value;
            _notify(key);
            return this;
        },

        /**
         * Get a value from the store.
         * store.get('count') // 5
         */
        get(key) {
            return _state[key];
        },

        /**
         * Get all state as a snapshot object.
         */
        getAll() {
            return Object.assign({}, _state);
        },

        /**
         * Subscribe to changes on a key.
         * Returns an unsubscribe function.
         *
         * const unsub = store.on('count', (val) => console.log(val));
         * unsub(); // stop listening
         */
        on(key, fn) {
            if (!_listeners[key]) _listeners[key] = [];
            _listeners[key].push(fn);
            // call immediately with current value if it exists
            if (_state[key] !== undefined) fn(_state[key], key);
            return () => this.off(key, fn);
        },

        /**
         * Unsubscribe a specific listener from a key.
         */
        off(key, fn) {
            if (_listeners[key]) {
                _listeners[key] = _listeners[key].filter(f => f !== fn);
            }
            return this;
        },

        /**
         * Remove all listeners for a key.
         */
        clear(key) {
            if (key) {
                delete _listeners[key];
                delete _state[key];
            } else {
                Object.keys(_listeners).forEach(k => delete _listeners[k]);
                Object.keys(_state).forEach(k => delete _state[k]);
            }
            return this;
        },

        /**
         * Update a key using a function (like React's setState updater).
         * store.update('count', n => n + 1)
         */
        update(key, fn) {
            const current = _state[key];
            this.set(key, fn(current));
            return this;
        },

        /**
         * Define a computed value that auto-updates when dependencies change.
         *
         * store.compute('fullName', ['first', 'last'], (state) =>
         *     `${state.first} ${state.last}`
         * );
         */
        compute(key, deps, fn) {
            _computed[key] = { deps, fn };
            _state[key] = fn(_state);
            _notify(key);
            return this;
        },

        /**
         * Persist a key to localStorage. Restores on init.
         * store.persist('theme', 'light')
         */
        persist(key, defaultValue) {
            const saved = localStorage.getItem('noshi_store_' + key);
            const initial = saved !== null ? JSON.parse(saved) : defaultValue;
            this.set(key, initial);
            this.on(key, val => {
                localStorage.setItem('noshi_store_' + key, JSON.stringify(val));
            });
            return this;
        },

        /**
         * Bind a store key directly to an element's property.
         * Automatically updates the element when state changes.
         *
         * store.bind('username', Noshi._('#welcome'), 'textContent')
         * store.bind('isDark', toggleBtn, 'checked')
         */
        bind(key, element, prop) {
            if (!element) return this;
            this.on(key, val => { element[prop] = val; });
            return this;
        },

        /**
         * Batch multiple set() calls into one notification cycle.
         * store.batch({ count: 0, user: null, loading: false })
         */
        batch(obj) {
            Object.keys(obj).forEach(key => { _state[key] = obj[key]; });
            Object.keys(obj).forEach(key => _notify(key));
            return this;
        }

    };
})();
