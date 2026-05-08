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
