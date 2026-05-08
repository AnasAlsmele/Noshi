(function(global) {
    "use strict";

    const VERSION = "2.0.0";

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       STYLE INJECTION ENGINE
       Injects a <style> tag once per component ID.
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

    /* â”€â”€ BASE CSS â”€â”€ */
    const CSS_BASE = `:root{--p:#0077b6;--s:#588157;--err:#9e2a2b;--warn:#ffc971;--ok:#588157;--dark:#222;--light:#fdfdfd;--gray:#e5e5e5;--txt:#444;--muted:#888;--sh-sm:0 2px 4px rgba(0,0,0,.05);--sh-md:0 4px 12px rgba(0,0,0,.1);--sh-lg:0 10px 30px rgba(0,0,0,.12);--r-sm:6px;--r-md:10px;--r-lg:16px;--tr:all .25s ease;--font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font);color:var(--txt);display:flex;flex-direction:column}
a{text-decoration:none;color:inherit}
.noshi-dark-mode{--light:#1e1e1e;--gray:#333;--dark:#f0f0f0;--txt:#e0e0e0;--muted:#aaa;background:#121212}
[dir=rtl] .input-holder,[dir=rtl] .btn-holder,[dir=rtl] .note-holder{flex-direction:row-reverse}
.error-screen{padding:1em;margin:1em;background:#fff3f3;border:1px solid var(--err);color:var(--err);border-radius:var(--r-sm)}`;

    /* â”€â”€ UTILITIES CSS â”€â”€ */
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

    /* â”€â”€ ANIMATIONS CSS â”€â”€ */
    const CSS_ANIM = `@keyframes noshi-spin{to{transform:rotate(360deg)}}
@keyframes noshi-fade-in{from{opacity:0}to{opacity:1}}
@keyframes noshi-slide-up{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes noshi-slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes noshi-bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
@keyframes noshi-stripe{from{background-position:40px 0}to{background-position:0 0}}
.noshi-fade-in{animation:noshi-fade-in .3s ease}.noshi-slide-up{animation:noshi-slide-up .3s ease}`;

    /* â”€â”€ BUTTONS CSS â”€â”€ */
    const CSS_BTN = `.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1.25rem;border:none;border-radius:var(--r-sm);font-size:.95rem;font-weight:500;cursor:pointer;transition:var(--tr);white-space:nowrap}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn-default{background:var(--gray);color:var(--txt)}.btn-default:hover{background:#d5d5d5}
.btn-active{background:var(--p);color:#fff;box-shadow:0 3px 10px rgba(0,119,182,.3)}.btn-active:hover{filter:brightness(1.1)}
.btn-correct{background:var(--ok);color:#fff}.btn-correct:hover{filter:brightness(1.1)}
.btn-warning{background:var(--warn);color:var(--dark)}.btn-warning:hover{filter:brightness(1.05)}
.btn-error{background:var(--err);color:#fff}.btn-error:hover{filter:brightness(1.1)}
.btn-dark{background:var(--dark);color:#fff}.btn-dark:hover{filter:brightness(1.2)}
.btn-outline{background:transparent;color:var(--p);border:1.5px solid var(--p)}.btn-outline:hover{background:var(--p);color:#fff}
.btn-ghost{background:transparent;color:var(--muted)}.btn-ghost:hover{background:var(--gray);color:var(--txt)}
.btn-sm{padding:.35rem .85rem;font-size:.82rem}.btn-lg{padding:.85rem 2rem;font-size:1.05rem}
.btn-icon{padding:.6rem;border-radius:50%;width:2.2rem;height:2.2rem;justify-content:center}`;

    /* â”€â”€ CARDS CSS â”€â”€ */
    const CSS_CARD = `.card{display:flex;flex-direction:column;background:#fff;border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm);transition:var(--tr);color:inherit}
.card-hover:hover{box-shadow:var(--sh-md);transform:translateY(-3px)}
.card-dark{background:var(--dark);color:#fff}
.card-image{width:100%;object-fit:cover}
.card-body{padding:1.25rem;flex:1}
.card-title{font-size:1.1rem;font-weight:600;margin-bottom:.5rem}
.card-text{font-size:.9rem;color:var(--muted);line-height:1.6}
.card-footer{padding:.75rem 1.25rem;border-top:1px solid var(--gray);display:flex}
.card-dark .card-text{color:rgba(255,255,255,.6)}.card-dark .card-footer{border-color:rgba(255,255,255,.1)}`;

    /* â”€â”€ INPUTS CSS â”€â”€ */
    const CSS_INPUT = `.noshi-input{width:100%;padding:.65rem 1rem;border:1.5px solid var(--gray);border-radius:var(--r-sm);font-size:.95rem;color:var(--txt);background:#fff;outline:none;transition:var(--tr)}
.noshi-input:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(0,119,182,.1)}
.noshi-input::placeholder{color:#bbb}
.noshi-input:disabled{background:var(--gray);cursor:not-allowed;opacity:.7}
.noshi-input-holder{display:flex;align-items:center;border:1.5px solid var(--gray);border-radius:var(--r-sm);padding:.5rem 1rem;gap:.75rem;background:#fff;transition:var(--tr);cursor:pointer}
.noshi-input-holder:hover{border-color:var(--p)}
.noshi-input-label{flex:1;font-size:.95rem;cursor:pointer}
input[type=checkbox],input[type=radio]{accent-color:var(--p);width:1.1rem;height:1.1rem;cursor:pointer}
.noshi-field-group{display:flex;flex-direction:column;gap:.35rem;margin-bottom:.75rem}
.noshi-field-label{font-size:.85rem;font-weight:600}
.noshi-field-hint{font-size:.78rem;color:var(--muted)}
.noshi-field-error{font-size:.78rem;color:var(--err)}.noshi-textarea{resize:vertical;min-height:80px;font-family:inherit}`;

    /* â”€â”€ FORMS CSS â”€â”€ */
    const CSS_FORM = `.noshi-form{display:flex;flex-direction:column;gap:.5rem}
.noshi-form-title{font-size:1.25rem;font-weight:700;margin-bottom:.5rem}
.noshi-form-btns{display:flex;gap:.75rem;margin-top:.5rem;flex-wrap:wrap}
.noshi-select{width:100%;padding:.65rem 1rem;border:1.5px solid var(--gray);border-radius:var(--r-sm);font-size:.95rem;color:var(--txt);background:#fff;outline:none;cursor:pointer;transition:var(--tr);appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%23888' d='M6 8L0 0h12z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 1rem center;padding-right:2.5rem}
.noshi-select:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(0,119,182,.1)}`;

    /* â”€â”€ NOTES CSS â”€â”€ */
    const CSS_NOTE = `.noshi-note{display:flex;align-items:stretch;border-radius:var(--r-sm);overflow:hidden;border:1px solid var(--gray);box-shadow:var(--sh-sm);margin:.5rem 0}
.noshi-note-icon{display:flex;align-items:center;justify-content:center;min-width:48px;font-size:1.2rem;color:#fff;padding:0 .75rem;background:var(--dark)}
.noshi-note-body{padding:.85rem 1rem;flex:1;font-size:.9rem;line-height:1.55;color:var(--txt)}
.noshi-note-success .noshi-note-icon{background:var(--ok)}.noshi-note-success .noshi-note-body{background:rgba(88,129,87,.05)}
.noshi-note-warning .noshi-note-icon{background:var(--warn);color:var(--dark)}.noshi-note-warning .noshi-note-body{background:rgba(255,201,113,.07)}
.noshi-note-error .noshi-note-icon{background:var(--err)}.noshi-note-error .noshi-note-body{background:rgba(158,42,43,.04)}`;

    /* â”€â”€ MODALS CSS â”€â”€ */
    const CSS_MODAL = `.noshi-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;z-index:2000;animation:noshi-fade-in .25s ease}
.noshi-modal{background:#fff;border-radius:var(--r-lg);box-shadow:var(--sh-lg);display:flex;flex-direction:column;overflow:hidden;width:90%;max-width:560px;animation:noshi-slide-up .3s ease}
.noshi-modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid var(--gray)}
.noshi-modal-header h3{font-size:1.15rem;font-weight:700}
.noshi-modal-close{cursor:pointer;font-size:1.6rem;color:var(--muted);line-height:1;transition:var(--tr)}.noshi-modal-close:hover{color:var(--err)}
.noshi-modal-body{padding:1.5rem;overflow-y:auto;max-height:65vh}
.noshi-modal-footer{padding:1rem 1.5rem;border-top:1px solid var(--gray);display:flex;justify-content:flex-end;gap:.75rem;background:#fafafa}`;

    /* â”€â”€ TABS CSS â”€â”€ */
    const CSS_TABS = `.noshi-tabs{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden}
.noshi-tabs-nav{display:flex;background:#f8f9fa;border-bottom:1px solid var(--gray);overflow-x:auto}
.noshi-tab-btn{padding:.85rem 1.5rem;cursor:pointer;font-size:.93rem;font-weight:500;color:var(--muted);border-bottom:3px solid transparent;white-space:nowrap;transition:var(--tr);background:none;border-top:none;border-left:none;border-right:none}
.noshi-tab-btn:hover{color:var(--p);background:rgba(0,119,182,.03)}
.noshi-tab-btn.active{color:var(--p);border-bottom-color:var(--p);background:#fff;font-weight:600}
.noshi-tab-pane{display:none;padding:1.5rem;animation:noshi-fade-in .25s ease}.noshi-tab-pane.active{display:block}`;

    /* â”€â”€ TOASTS CSS â”€â”€ */
    const CSS_TOAST = `.noshi-toasts{position:fixed;bottom:1.5rem;right:1.5rem;display:flex;flex-direction:column;gap:.75rem;z-index:3000}
.noshi-toast{display:flex;align-items:center;gap:.75rem;min-width:280px;max-width:380px;padding:.9rem 1.1rem;background:var(--dark);color:#fff;border-radius:var(--r-sm);box-shadow:var(--sh-md);animation:noshi-slide-in-right .3s ease}
.noshi-toast-msg{flex:1;font-size:.9rem;line-height:1.4}
.noshi-toast-close{cursor:pointer;font-size:1.1rem;opacity:.65;transition:var(--tr)}.noshi-toast-close:hover{opacity:1}
.noshi-toast-info{border-left:4px solid var(--p)}.noshi-toast-success{border-left:4px solid var(--ok)}
.noshi-toast-warning{border-left:4px solid var(--warn)}.noshi-toast-error{border-left:4px solid var(--err)}`;

    /* â”€â”€ SLIDER CSS â”€â”€ */
    const CSS_SLIDER = `.noshi-slider{position:relative;overflow:hidden;width:100%;height:300px;background:#111}
.noshi-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity .6s ease;z-index:0}
.noshi-slide.active{opacity:1;visibility:visible;z-index:1}
.noshi-slider-dots{position:absolute;bottom:.75rem;left:50%;transform:translateX(-50%);display:flex;gap:.4rem;z-index:2}
.noshi-slider-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:var(--tr)}.noshi-slider-dot.active{background:#fff;width:24px;border-radius:4px}`;

    /* â”€â”€ LOADING CSS â”€â”€ */
    const CSS_LOAD = `.noshi-loading-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:9999}
.noshi-spinner{width:44px;height:44px;border:4px solid var(--gray);border-top-color:var(--p);border-radius:50%;animation:noshi-spin 1s linear infinite}
.noshi-dots-holder{display:flex;gap:.35rem}
.noshi-dot{width:12px;height:12px;border-radius:50%;background:var(--p);animation:noshi-bounce 1.4s ease-in-out infinite}`;

    /* â”€â”€ CODE CSS â”€â”€ */
    const CSS_CODE = `.noshi-code{display:block;background:#1e1e2e;color:#cdd6f4;padding:1.25rem;border-radius:var(--r-sm);overflow-x:auto;font-family:'Fira Code',Consolas,monospace;font-size:.88rem;line-height:1.7;white-space:pre}
code-line{display:block}html-tag-border{color:#89b4fa}html-tag-attr{color:#a6e3a1}html-tag-attr-val{color:#f38ba8}
css-property{color:#89b4fa}css-value{color:#a6e3a1}js-var{color:#cba6f7}js-txt{color:#a6e3a1}js-bracket{color:#fab387}js-func{color:#89b4fa}`;

    /* â”€â”€ GRAPH CSS â”€â”€ */
    const CSS_GRAPH = `.noshi-graph{display:flex;flex-direction:column;border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm)}
.noshi-graph-head{padding:.75rem 1.25rem;font-weight:600;font-size:1rem;background:#f8f9fa;border-bottom:1px solid var(--gray)}
.noshi-graph svg{display:block;width:100%}circle{transition:r .2s ease;cursor:pointer}`;

    /* â”€â”€ TABLE CSS â”€â”€ */
    const CSS_TABLE = `.noshi-table-wrap{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm)}
.noshi-table-toolbar{display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:#f8f9fa;border-bottom:1px solid var(--gray);gap:1rem;flex-wrap:wrap}
.noshi-table-search{padding:.5rem .85rem;border:1.5px solid var(--gray);border-radius:var(--r-sm);font-size:.9rem;outline:none;transition:var(--tr);min-width:200px}.noshi-table-search:focus{border-color:var(--p)}
.noshi-table{width:100%;border-collapse:collapse}
.noshi-table th{padding:.75rem 1rem;text-align:left;font-size:.82rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);background:#f8f9fa;border-bottom:1px solid var(--gray);white-space:nowrap}
.noshi-table th.sortable{cursor:pointer;user-select:none}.noshi-table th.sortable:hover{color:var(--p)}
.noshi-table th.sort-asc::after{content:" â†‘";color:var(--p)}.noshi-table th.sort-desc::after{content:" â†“";color:var(--p)}
.noshi-table td{padding:.75rem 1rem;font-size:.9rem;border-bottom:1px solid var(--gray);color:var(--txt)}
.noshi-table tr:last-child td{border-bottom:none}.noshi-table tr:hover td{background:rgba(0,119,182,.025)}
.noshi-table-footer{display:flex;justify-content:space-between;align-items:center;padding:.6rem 1rem;background:#f8f9fa;border-top:1px solid var(--gray);font-size:.85rem;color:var(--muted);flex-wrap:wrap;gap:.5rem}
.noshi-table-pages{display:flex;gap:.35rem}
.noshi-page-btn{padding:.3rem .65rem;border:1px solid var(--gray);border-radius:var(--r-sm);cursor:pointer;font-size:.82rem;background:#fff;transition:var(--tr)}.noshi-page-btn:hover{border-color:var(--p);color:var(--p)}.noshi-page-btn.active{background:var(--p);color:#fff;border-color:var(--p)}`;

    /* â”€â”€ BADGES CSS â”€â”€ */
    const CSS_BADGE = `.noshi-badge{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .65rem;border-radius:20px;font-size:.75rem;font-weight:600;white-space:nowrap}
.noshi-badge-info{background:rgba(0,119,182,.12);color:var(--p)}.noshi-badge-success{background:rgba(88,129,87,.12);color:var(--ok)}
.noshi-badge-warning{background:rgba(255,201,113,.2);color:#a06000}.noshi-badge-error{background:rgba(158,42,43,.1);color:var(--err)}
.noshi-badge-dark{background:var(--dark);color:#fff}.noshi-badge-gray{background:var(--gray);color:var(--muted)}
.noshi-badge-dot::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:currentColor}`;

    /* â”€â”€ PROGRESS CSS â”€â”€ */
    const CSS_PROG = `.noshi-progress-wrap{width:100%}
.noshi-progress-label{display:flex;justify-content:space-between;font-size:.83rem;color:var(--muted);margin-bottom:.4rem}
.noshi-progress-track{width:100%;height:10px;background:var(--gray);border-radius:20px;overflow:hidden}
.noshi-progress-bar{height:100%;border-radius:20px;transition:width .6s ease;background:var(--p)}
.noshi-progress-striped .noshi-progress-bar{background-image:linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%);background-size:40px 40px;animation:noshi-stripe .8s linear infinite}
.noshi-progress-sm .noshi-progress-track{height:6px}.noshi-progress-lg .noshi-progress-track{height:16px}
.noshi-progress-success .noshi-progress-bar{background:var(--ok)}.noshi-progress-warning .noshi-progress-bar{background:var(--warn)}.noshi-progress-error .noshi-progress-bar{background:var(--err)}`;

    /* â”€â”€ STATS CSS â”€â”€ */
    const CSS_STATS = `.noshi-stats-card{display:flex;align-items:center;gap:1rem;padding:1.25rem 1.5rem;background:#fff;border-radius:var(--r-md);box-shadow:var(--sh-sm);border:1px solid var(--gray);transition:var(--tr)}.noshi-stats-card:hover{box-shadow:var(--sh-md);transform:translateY(-2px)}
.noshi-stats-icon{width:48px;height:48px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
.noshi-stats-icon-primary{background:rgba(0,119,182,.1);color:var(--p)}.noshi-stats-icon-success{background:rgba(88,129,87,.1);color:var(--ok)}.noshi-stats-icon-warning{background:rgba(255,201,113,.2);color:#a06000}.noshi-stats-icon-error{background:rgba(158,42,43,.1);color:var(--err)}
.noshi-stats-body{flex:1}.noshi-stats-value{font-size:1.75rem;font-weight:700;line-height:1;color:var(--txt)}.noshi-stats-label{font-size:.83rem;color:var(--muted);margin-top:.25rem}
.noshi-stats-trend{font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:.2rem;margin-top:.35rem}.noshi-trend-up{color:var(--ok)}.noshi-trend-down{color:var(--err)}`;

    /* â”€â”€ ACCORDION CSS â”€â”€ */
    const CSS_ACC = `.noshi-accordion{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden}
.noshi-accordion-item{border-bottom:1px solid var(--gray)}.noshi-accordion-item:last-child{border-bottom:none}
.noshi-accordion-head{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;cursor:pointer;background:#fff;transition:var(--tr);user-select:none}
.noshi-accordion-head:hover{background:#f8f9fa}.noshi-accordion-head.open{background:#f0f7ff;color:var(--p)}
.noshi-accordion-title{font-weight:600;font-size:.95rem}
.noshi-accordion-arrow{font-size:.75rem;transition:transform .3s ease;color:var(--muted)}.noshi-accordion-head.open .noshi-accordion-arrow{transform:rotate(180deg);color:var(--p)}
.noshi-accordion-body{max-height:0;overflow:hidden;transition:max-height .35s ease,padding .2s ease;padding:0 1.25rem}.noshi-accordion-body.open{max-height:600px;padding:1rem 1.25rem}
.noshi-accordion-content{font-size:.9rem;color:var(--muted);line-height:1.65}`;

    /* â”€â”€ TOOLTIP CSS â”€â”€ */
    const CSS_TIP = `.noshi-tooltip-wrap{position:relative;display:inline-flex}
.noshi-tooltip-box{position:absolute;background:rgba(30,30,30,.92);color:#fff;font-size:.78rem;padding:.35rem .75rem;border-radius:var(--r-sm);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s ease;z-index:1000}
.noshi-tooltip-wrap:hover .noshi-tooltip-box{opacity:1}
.noshi-tooltip-top .noshi-tooltip-box{bottom:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.noshi-tooltip-bottom .noshi-tooltip-box{top:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.noshi-tooltip-left .noshi-tooltip-box{right:calc(100% + 6px);top:50%;transform:translateY(-50%)}
.noshi-tooltip-right .noshi-tooltip-box{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}`;

    /* â”€â”€ STEPPER CSS â”€â”€ */
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

    /* â”€â”€ PAGE CSS â”€â”€ */
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

    /* â”€â”€ NAV CSS â”€â”€ */
    const CSS_NAV = `.noshi-nav{display:flex;align-items:center;background:#fff;border-bottom:1px solid var(--gray);padding:0 1.5rem;height:60px;position:sticky;top:0;z-index:100;box-shadow:var(--sh-sm)}
.noshi-nav-brand{font-size:1.2rem;font-weight:700;color:var(--p);margin-right:2rem}
.noshi-nav-links{display:flex;gap:1rem;flex:1}.noshi-nav-link{padding:.4rem .75rem;border-radius:var(--r-sm);color:var(--muted);font-size:.93rem;transition:var(--tr)}.noshi-nav-link:hover,.noshi-nav-link.active{color:var(--p);background:rgba(0,119,182,.06)}
.noshi-nav-actions{display:flex;gap:.5rem}
.noshi-nav-menu-head{cursor:pointer;display:flex;align-items:center;gap:.4rem;position:relative}
.noshi-nav-menu-body{display:none;position:absolute;top:100%;background:#fff;border:1px solid var(--gray);border-radius:var(--r-sm);box-shadow:var(--sh-md);min-width:180px;overflow:hidden;z-index:200}.noshi-nav-menu-body.open{display:flex;flex-direction:column;animation:noshi-slide-up .2s ease}
.noshi-nav-menu-item{padding:.75rem 1rem;font-size:.9rem;transition:var(--tr);cursor:pointer}.noshi-nav-menu-item:hover{background:var(--gray)}`;

    /* inject base styles immediately on load */
    NoshiStyles.inject('base', CSS_BASE + CSS_UTILS + CSS_ANIM);

    /* -- ICON SYSTEM -- */
    const NOSHI_ICONS = {
        home:       '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        user:       '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        users:      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        settings:   '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
        bell:       '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
        search:     '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        mail:       '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        phone:      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
        calendar:   '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
        check:      '<polyline points="20 6 9 17 4 12"/>',
        'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
        x:          '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        'x-circle':  '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
        alert:       '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
        info:        '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
        star:        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        heart:       '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
        edit:        '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
        trash:       '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
        download:    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
        upload:      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
        link:        '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
        lock:        '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        unlock:      '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
        eye:         '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        'eye-off':   '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>',
        'chevron-up': '<polyline points="18 15 12 9 6 15"/>',
        'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
        'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
        'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
        menu:        '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
        'more-h':    '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
        'more-v':    '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
        plus:        '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
        minus:       '<line x1="5" y1="12" x2="19" y2="12"/>',
        save:        '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
        copy:        '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
        share:       '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
        filter:      '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
        sort:        '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
        grid:        '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
        list:        '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
        image:       '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
        file:        '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',
        folder:      '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
        chart:       '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
        refresh:     '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
        'log-out':   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
        'log-in':    '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>'
    };

    /* NoshiIcon — renders an inline SVG icon by name */
    function NoshiIcon(name, opts) {
        opts = opts || {};
        const size  = opts.size  || 20;
        const color = opts.color || 'currentColor';
        const paths = NOSHI_ICONS[name];
        if (!paths) return null;
        const css = '.ni{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}';
        NoshiStyles.inject('icons', css);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width',  String(size));
        svg.setAttribute('height', String(size));
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('class', 'ni');
        svg.innerHTML = paths;
        return svg;
    }


    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       NoshiCE â€” Standard DOM element factory
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    function NoshiCE(props) {
        const tag = document.createElement(props.tag || 'div');
        Object.keys(props).forEach(k => {
            const v = props[k];
            switch (k) {
                case 'tag': break;
                case 'child':
                    if (Array.isArray(v)) v.forEach(c => { if (c instanceof Element) tag.appendChild(c); });
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
    }

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       NoshiCENS â€” SVG/namespaced element factory
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    function NoshiCENS(props) {
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
    }

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       NoshiBuilder â€” existing component methods
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    function NoshiBuilder() {
        const _e = () => document.createElement('div');

        /* â”€â”€ SELECT â”€â”€ */
        this.select = (info) => {
            NoshiStyles.inject('forms', CSS_FORM);
            if (!info.options || !info.options.length) { console.error('Noshi: select options empty'); return _e(); }
            if (info.sort === 'az') info.options.sort();
            const sel = new NoshiCE({ tag: 'select', class: 'noshi-select', id: info.id || '', name: info.name || '', disabled: info.disabled }).tag;
            if (info.placeholder) sel.appendChild(new NoshiCE({ tag: 'option', value: '', text: info.placeholder, disabled: true, select: true }).tag);
            info.options.forEach(o => {
                const isObj = typeof o === 'object';
                const opt = new NoshiCE({ tag: 'option', value: isObj ? o.value : o, text: isObj ? o.label : o, select: info.value === (isObj ? o.value : o) }).tag;
                sel.appendChild(opt);
            });
            if (info.change) sel.addEventListener('change', info.change);
            return sel;
        };

        /* -- INPUT (all types) -- */
        this.input = (info) => {
            NoshiStyles.inject('inputs', CSS_INPUT);
            const type = info.type || 'text';
            if (type === 'textarea') {
                const ta = document.createElement('textarea');
                ta.className = 'noshi-input noshi-textarea'; ta.id=info.id||''; ta.name=info.name||''; ta.placeholder=info.placeholder||''; ta.rows=info.rows||4;
                if (info.value)    ta.value    = info.value;
                if (info.required) ta.required = true;
                if (info.disabled) ta.disabled = true;
                if (info.resize === false) ta.style.resize = 'none';
                if (info.change) ta.addEventListener('input', info.change);
                return ta;
            }
            if (type === 'checkbox' || type === 'radio') {
                const id  = info.id || 'noshi-' + Math.random().toString(36).substr(2,6);
                const inp = new NoshiCE({ tag:'input', type, id, name: info.name||'', value: info.value||'', checked: info.checked, required: info.required }).tag;
                const lbl = new NoshiCE({ tag:'label', for: id, class:'noshi-input-label', text: info.text||'' }).tag;
                if (info.change) inp.addEventListener('change', info.change);
                return new NoshiCE({ tag:'div', class:'noshi-input-holder', child:[inp, lbl] }).tag;
            }
            if (type === 'toggle') {
                NoshiStyles.inject('toggle', '.noshi-toggle-wrap{display:flex;align-items:center;gap:.75rem;cursor:pointer}.noshi-toggle{position:relative;width:44px;height:24px;flex-shrink:0}.noshi-toggle input{opacity:0;width:0;height:0}.noshi-toggle-slider{position:absolute;inset:0;background:#ccc;border-radius:24px;transition:.3s}.noshi-toggle-slider::before{content:"";position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s}.noshi-toggle input:checked+.noshi-toggle-slider{background:var(--p)}.noshi-toggle input:checked+.noshi-toggle-slider::before{transform:translateX(20px)}');
                const id=info.id||'noshi-'+Math.random().toString(36).substr(2,6);
                const inp=document.createElement('input'); inp.type='checkbox'; inp.id=id; inp.name=info.name||'';
                if(info.checked) inp.checked=true; if(info.change) inp.addEventListener('change',info.change);
                const slider=document.createElement('span'); slider.className='noshi-toggle-slider';
                const lbl=document.createElement('label'); lbl.className='noshi-toggle'; lbl.htmlFor=id; lbl.appendChild(inp); lbl.appendChild(slider);
                const txt=new NoshiCE({ tag:'span', class:'noshi-input-label', text:info.text||'' }).tag;
                return new NoshiCE({ tag:'div', class:'noshi-toggle-wrap', child:[lbl,txt] }).tag;
            }
            if (type === 'range') {
                NoshiStyles.inject('range-input', '.noshi-range-wrap{display:flex;flex-direction:column;gap:.4rem;width:100%}.noshi-range{width:100%;accent-color:var(--p);cursor:pointer}.noshi-range-labels{display:flex;justify-content:space-between;font-size:.78rem;color:var(--muted)}.noshi-range-val{text-align:center;font-size:.85rem;font-weight:600;color:var(--p)}');
                const id=info.id||'noshi-'+Math.random().toString(36).substr(2,6);
                const inp=document.createElement('input'); inp.type='range'; inp.className='noshi-range'; inp.id=id;
                inp.min=String(info.min||0); inp.max=String(info.max||100); inp.step=String(info.step||1); inp.value=String(info.value||50);
                const valEl=document.createElement('div'); valEl.className='noshi-range-val'; valEl.textContent=inp.value+(info.unit||'');
                inp.addEventListener('input',()=>{ valEl.textContent=inp.value+(info.unit||''); if(info.change) info.change(inp.value); });
                const ch=[];
                if(info.label){ const l=document.createElement('label'); l.htmlFor=id; l.className='noshi-field-label'; l.textContent=info.label; ch.push(l); }
                ch.push(inp);
                if(info.showValue!==false) ch.push(valEl);
                if(info.min!=null||info.max!=null){ const labs=document.createElement('div'); labs.className='noshi-range-labels'; labs.innerHTML='<span>'+info.min+'</span><span>'+info.max+'</span>'; ch.push(labs); }
                return new NoshiCE({ tag:'div', class:'noshi-range-wrap', child:ch }).tag;
            }
            if (type === 'color') {
                NoshiStyles.inject('color-input', '.noshi-color-wrap{display:flex;align-items:center;gap:.75rem}.noshi-color{width:42px;height:42px;border:2px solid var(--gray);border-radius:var(--r-sm);padding:2px;cursor:pointer;background:none}.noshi-color-val{font-size:.85rem;font-family:monospace;color:var(--muted)}');
                const id=info.id||'noshi-'+Math.random().toString(36).substr(2,6);
                const inp=document.createElement('input'); inp.type='color'; inp.id=id; inp.className='noshi-color'; inp.value=info.value||'#0077b6';
                const valEl=document.createElement('span'); valEl.className='noshi-color-val'; valEl.textContent=inp.value;
                inp.addEventListener('input',()=>{ valEl.textContent=inp.value; if(info.change) info.change(inp.value); });
                return new NoshiCE({ tag:'div', class:'noshi-color-wrap', child:[inp,valEl] }).tag;
            }
            if (type === 'file') {
                NoshiStyles.inject('file-input', '.noshi-file-label{display:flex;align-items:center;gap:.75rem;padding:.65rem 1rem;border:2px dashed var(--gray);border-radius:var(--r-sm);cursor:pointer;transition:var(--tr);font-size:.9rem;color:var(--muted)}.noshi-file-label:hover{border-color:var(--p);color:var(--p)}.noshi-file-label input{display:none}.noshi-file-name{font-size:.82rem;color:var(--p);margin-top:.35rem}');
                const id=info.id||'noshi-'+Math.random().toString(36).substr(2,6);
                const inp=document.createElement('input'); inp.type='file'; inp.id=id; inp.name=info.name||'';
                if(info.multiple) inp.multiple=true; if(info.accept) inp.accept=info.accept;
                const nameEl=document.createElement('div'); nameEl.className='noshi-file-name';
                inp.addEventListener('change',()=>{ nameEl.textContent=inp.files.length>1?(inp.files.length+' files selected'):inp.files[0]?.name||''; if(info.change) info.change(inp.files); });
                const label=document.createElement('label'); label.htmlFor=id; label.className='noshi-file-label';
                label.innerHTML='<span>📎</span><span>'+(info.placeholder||'Choose file...')+'</span>'; label.appendChild(inp);
                return new NoshiCE({ tag:'div', child:[label,nameEl] }).tag;
            }
            if (type === 'datalist') {
                const listId=info.id?info.id+'-list':'noshi-dl-'+Math.random().toString(36).substr(2,6);
                const inp=new NoshiCE({ tag:'input', class:'noshi-input', list:listId, id:info.id||'', name:info.name||'', placeholder:info.placeholder||'' }).tag;
                const dl=document.createElement('datalist'); dl.id=listId;
                (info.options||[]).forEach(o=>{ const opt=document.createElement('option'); opt.value=typeof o==='object'?o.value:o; opt.textContent=typeof o==='object'?o.label:o; dl.appendChild(opt); });
                const w=document.createElement('div'); w.appendChild(inp); w.appendChild(dl);
                if(info.change) inp.addEventListener('input',info.change);
                return w;
            }
            const inp=document.createElement('input');
            inp.className='noshi-input'; inp.type=type; inp.id=info.id||''; inp.name=info.name||'';
            inp.placeholder=info.placeholder||''; inp.value=info.value||'';
            if(info.min !=null) inp.min=String(info.min);
            if(info.max !=null) inp.max=String(info.max);
            if(info.step!=null) inp.step=String(info.step);
            if(info.required) inp.required=true;
            if(info.disabled) inp.disabled=true;
            if(info.readonly) inp.readOnly=true;
            if(info.pattern)  inp.pattern=info.pattern;
            if(info.change)   inp.addEventListener('input',info.change);
            return inp;
        };

        /* -- DATEPICKER -- */
        this.datepicker = (info) => {
            const CSS_DP = '.ndp-wrap{position:relative;width:100%}.ndp-inp{width:100%;padding:.65rem 2.5rem .65rem 1rem;border:1.5px solid var(--gray);border-radius:var(--r-sm);font-size:.95rem;color:var(--txt);background:#fff;outline:none;cursor:pointer;transition:var(--tr)}.ndp-inp:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(0,119,182,.1)}.ndp-cal{position:absolute;top:calc(100% + 6px);left:0;background:#fff;border:1px solid var(--gray);border-radius:var(--r-md);box-shadow:var(--sh-md);z-index:500;min-width:280px;display:none}.ndp-cal.open{display:block}.ndp-cal-head{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;border-bottom:1px solid var(--gray)}.ndp-nav{background:none;border:none;cursor:pointer;padding:.25rem .5rem;border-radius:var(--r-sm);color:var(--muted);font-size:1rem;transition:var(--tr)}.ndp-nav:hover{background:var(--gray)}.ndp-title{font-weight:600;font-size:.95rem;cursor:pointer;padding:.2rem .5rem;border-radius:var(--r-sm);background:none;border:none;font-family:inherit;transition:var(--tr)}.ndp-title:hover{background:var(--gray)}.ndp-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;padding:.75rem}.ndp-dow{text-align:center;font-size:.7rem;font-weight:700;color:var(--muted);padding:.3rem 0}.ndp-day{text-align:center;padding:.45rem .2rem;border-radius:var(--r-sm);font-size:.85rem;cursor:pointer;transition:var(--tr)}.ndp-day:hover{background:var(--gray)}.ndp-day.today{color:var(--p);font-weight:700}.ndp-day.selected{background:var(--p);color:#fff}.ndp-day.range-between{background:rgba(0,119,182,.12)}.ndp-day.range-end{background:var(--p);color:#fff;border-radius:0 var(--r-sm) var(--r-sm) 0}.ndp-day.range-start{background:var(--p);color:#fff;border-radius:var(--r-sm) 0 0 var(--r-sm)}.ndp-day.muted{color:#ccc;pointer-events:none}.ndp-footer{display:flex;justify-content:space-between;padding:.5rem .75rem;border-top:1px solid var(--gray)}.ndp-today-btn,.ndp-clear-btn{background:none;border:none;font-size:.82rem;cursor:pointer;padding:.25rem .5rem;border-radius:4px;font-family:inherit;transition:var(--tr)}.ndp-today-btn{color:var(--p)}.ndp-today-btn:hover{background:var(--gray)}.ndp-clear-btn{color:var(--muted)}.ndp-clear-btn:hover{color:var(--err)}.ndp-months,.ndp-years{display:grid;grid-template-columns:repeat(3,1fr);gap:.4rem;padding:.75rem}.ndp-month-btn,.ndp-year-btn{padding:.5rem;border-radius:var(--r-sm);font-size:.85rem;cursor:pointer;text-align:center;transition:var(--tr);border:1.5px solid transparent;background:none;font-family:inherit}.ndp-month-btn:hover,.ndp-year-btn:hover{background:var(--gray)}.ndp-month-btn.active,.ndp-year-btn.active{border-color:var(--p);color:var(--p);font-weight:600}';
            NoshiStyles.inject('datepicker', CSS_DP);
            const mode=info.mode||'single', format=info.format||'YYYY-MM-DD';
            let view='days', today=new Date(), cur={y:today.getFullYear(),m:today.getMonth()};
            let sel1=null, sel2=null;
            const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
            const DAYS=['Su','Mo','Tu','We','Th','Fr','Sa'];
            const fmt=(d)=>{ if(!d) return ''; return format.replace('YYYY',d.getFullYear()).replace('MM',String(d.getMonth()+1).padStart(2,'0')).replace('DD',String(d.getDate()).padStart(2,'0')); };
            const wrap=document.createElement('div'); wrap.className='ndp-wrap';
            const inp=document.createElement('input'); inp.className='ndp-inp'; inp.type='text'; inp.readOnly=true;
            inp.placeholder=info.placeholder||(mode==='range'?'Select date range...':'Select date...');
            inp.id=info.id||''; inp.name=info.name||'';
            const cal=document.createElement('div'); cal.className='ndp-cal';
            if(mode!=='inline'){ wrap.appendChild(inp); wrap.appendChild(cal); }
            else{ cal.style.cssText='position:static;display:block;box-shadow:none'; wrap.appendChild(cal); }
            const head=document.createElement('div'); head.className='ndp-cal-head';
            const prev=document.createElement('button'); prev.className='ndp-nav'; prev.textContent='←'; prev.type='button';
            const next=document.createElement('button'); next.className='ndp-nav'; next.textContent='→'; next.type='button';
            const title=document.createElement('button'); title.className='ndp-title'; title.type='button';
            head.appendChild(prev); head.appendChild(title); head.appendChild(next); cal.appendChild(head);
            const body=document.createElement('div'); cal.appendChild(body);
            const footer=document.createElement('div'); footer.className='ndp-footer';
            const todayBtn=document.createElement('button'); todayBtn.className='ndp-today-btn'; todayBtn.textContent='Today'; todayBtn.type='button';
            const clearBtn=document.createElement('button'); clearBtn.className='ndp-clear-btn'; clearBtn.textContent='Clear'; clearBtn.type='button';
            footer.appendChild(todayBtn); footer.appendChild(clearBtn); cal.appendChild(footer);
            const updateInput=()=>{ inp.value=mode==='range'?sel1&&sel2?fmt(sel1)+' - '+fmt(sel2):sel1?fmt(sel1):'':sel1?fmt(sel1):''; if(info.onChange) info.onChange(mode==='range'?{start:sel1,end:sel2}:sel1); };
            const renderDays=()=>{
                view='days'; title.textContent=MONTHS[cur.m]+' '+cur.y; body.innerHTML='';
                const grid=document.createElement('div'); grid.className='ndp-grid';
                DAYS.forEach(d=>{ const el=document.createElement('div'); el.className='ndp-dow'; el.textContent=d; grid.appendChild(el); });
                const firstDay=new Date(cur.y,cur.m,1).getDay();
                const daysInMonth=new Date(cur.y,cur.m+1,0).getDate();
                const prevMonthDays=new Date(cur.y,cur.m,0).getDate();
                for(let i=firstDay-1;i>=0;i--){ const el=document.createElement('div'); el.className='ndp-day muted'; el.textContent=String(prevMonthDays-i); grid.appendChild(el); }
                for(let d=1;d<=daysInMonth;d++){
                    const date=new Date(cur.y,cur.m,d);
                    const el=document.createElement('div'); el.className='ndp-day'; el.textContent=String(d);
                    const isToday=d===today.getDate()&&cur.m===today.getMonth()&&cur.y===today.getFullYear();
                    if(isToday) el.classList.add('today');
                    if(sel1&&date.toDateString()===sel1.toDateString()) el.classList.add(mode==='range'?'range-start':'selected');
                    if(mode==='range'&&sel2&&date.toDateString()===sel2.toDateString()) el.classList.add('range-end');
                    if(mode==='range'&&sel1&&sel2&&date>sel1&&date<sel2) el.classList.add('range-between');
                    el.addEventListener('click',()=>{
                        if(mode==='range'){ if(!sel1||sel2){ sel1=date; sel2=null; } else if(date<sel1){ sel2=sel1; sel1=date; } else { sel2=date; } }
                        else { sel1=date; if(mode!=='inline') cal.classList.remove('open'); }
                        updateInput(); renderDays();
                    });
                    grid.appendChild(el);
                }
                body.appendChild(grid);
            };
            const renderMonths=()=>{ view='months'; title.textContent=String(cur.y); body.innerHTML=''; const g=document.createElement('div'); g.className='ndp-months'; MONTHS.forEach((m,i)=>{ const el=document.createElement('div'); el.className='ndp-month-btn'+(i===cur.m?' active':''); el.textContent=m.substr(0,3); el.addEventListener('click',()=>{ cur.m=i; renderDays(); }); g.appendChild(el); }); body.appendChild(g); };
            const renderYears=()=>{ view='years'; const start=cur.y-6; title.textContent=start+'-'+(start+11); body.innerHTML=''; const g=document.createElement('div'); g.className='ndp-years'; for(let y=start;y<start+12;y++){ const el=document.createElement('div'); el.className='ndp-year-btn'+(y===cur.y?' active':''); el.textContent=String(y); el.addEventListener('click',()=>{ cur.y=y; renderMonths(); }); g.appendChild(el); } body.appendChild(g); };
            title.addEventListener('click',()=>{ if(view==='days') renderMonths(); else if(view==='months') renderYears(); else renderDays(); });
            prev.addEventListener('click',()=>{ if(view==='days'){ cur.m--; if(cur.m<0){cur.m=11;cur.y--;} renderDays(); } else if(view==='months'){ cur.y--; renderMonths(); } else { cur.y-=12; renderYears(); } });
            next.addEventListener('click',()=>{ if(view==='days'){ cur.m++; if(cur.m>11){cur.m=0;cur.y++;} renderDays(); } else if(view==='months'){ cur.y++; renderMonths(); } else { cur.y+=12; renderYears(); } });
            todayBtn.addEventListener('click',()=>{ sel1=new Date(); cur.y=sel1.getFullYear(); cur.m=sel1.getMonth(); updateInput(); renderDays(); if(mode!=='inline') cal.classList.remove('open'); });
            clearBtn.addEventListener('click',()=>{ sel1=null; sel2=null; inp.value=''; renderDays(); if(info.onChange) info.onChange(null); });
            if(mode!=='inline'){ inp.addEventListener('click',()=>cal.classList.toggle('open')); document.addEventListener('click',e=>{ if(!wrap.contains(e.target)) cal.classList.remove('open'); }); }
            if(info.value){ try{ sel1=new Date(info.value); if(!isNaN(sel1)){ cur.y=sel1.getFullYear(); cur.m=sel1.getMonth(); } else sel1=null; } catch(e){ sel1=null; } updateInput(); }
            renderDays();
            wrap.getValue=()=>mode==='range'?{start:sel1,end:sel2}:sel1;
            wrap.setValue=(v)=>{ try{ sel1=new Date(v); if(!isNaN(sel1)){cur.y=sel1.getFullYear();cur.m=sel1.getMonth();} else sel1=null; } catch(e){sel1=null;} updateInput(); renderDays(); };
            wrap.clear=()=>clearBtn.click();
            return wrap;
        };


        /* â”€â”€ BUTTON â”€â”€ */
        this.button = (info) => {
            NoshiStyles.inject('buttons', CSS_BTN);
            const cls = info.class ? `btn btn-${info.class}` : 'btn btn-default';
            if (info.icon && info.iconPos !== 'right') { if (info.icon instanceof HTMLElement) { children.push(info.icon); } else { children.push(new NoshiCE({ tag:'i', class: info.icon }).tag); } }
            if (info.icon && info.iconPos !== 'right') children.push(new NoshiCE({ tag:'i', class: info.icon }).tag);
            if (info.icon && info.iconPos === 'right')  { if (info.icon instanceof HTMLElement) { children.push(info.icon); } else { children.push(new NoshiCE({ tag:'i', class: info.icon }).tag); } }
            if (info.icon && info.iconPos === 'right') children.push(new NoshiCE({ tag:'i', class: info.icon }).tag);
            return new NoshiCE({ tag:'button', class: cls, disabled: info.disabled, click: info.click||null, child: children }).tag;
        };

        /* â”€â”€ NOTE â”€â”€ */
        this.note = (info) => {
            NoshiStyles.inject('notes', CSS_NOTE);
            const type     = info.class || 'default';
            const iconWrap = document.createElement('div');
            iconWrap.className = 'noshi-note-icon';
            if (info.icon instanceof HTMLElement) {
                iconWrap.appendChild(info.icon);
            } else if (typeof info.icon === 'string' && info.icon) {
                iconWrap.innerHTML = '<i class="' + info.icon + '"></i>';
            } else {
                iconWrap.innerHTML = '&#9432;';
            }
            const body = new NoshiCE({ tag:'div', class:'noshi-note-body', html: info.text||'' }).tag;
            return new NoshiCE({ tag:'div', class:'noshi-note noshi-note-'+type, child:[iconWrap, body] }).tag;
        };

        /* â”€â”€ CARD â”€â”€ */
        this.card = (info) => {
            NoshiStyles.inject('cards', CSS_CARD);
            const children = [];
            if (info.image) children.push(new NoshiCE({ tag:'img', class:'card-image', src: info.image, alt: info.title||'', style: info.imageHeight ? `height:${info.imageHeight}` : '' }).tag);
            const bodyChildren = [];
            if (info.title) bodyChildren.push(new NoshiCE({ tag:'div', class:'card-title', text: info.title }).tag);
            if (info.text)  bodyChildren.push(new NoshiCE({ tag:'div', class:'card-text',  html: info.text  }).tag);
            children.push(new NoshiCE({ tag:'div', class:'card-body', child: bodyChildren }).tag);
            if (info.button) {
                const btn = this.button({ text: info.button.text, class: 'active', click: info.button.action });
                children.push(new NoshiCE({ tag:'div', class:'card-footer', child:[btn] }).tag);
            }
            const mode = info.mode === 'dark' ? ' card-dark' : '';
            const hover = info.hover !== false ? ' card-hover' : '';
            const el = new NoshiCE({ tag: info.link ? 'a' : 'div', class:`card${mode}${hover}`, href: info.link||null, child: children }).tag;
            return el;
        };

        /* â”€â”€ FORM â”€â”€ */
        this.form = (info) => {
            NoshiStyles.inject('forms', CSS_FORM);
            NoshiStyles.inject('inputs', CSS_INPUT);
            const form = new NoshiCE({ tag:'form', class:'noshi-form', method: info.method||'POST' }).tag;
            if (info.title) form.appendChild(new NoshiCE({ tag:'div', class:'noshi-form-title', text: info.title }).tag);
            (info.fields||[]).forEach(f => {
                const group = new NoshiCE({ tag:'div', class:'noshi-field-group' }).tag;
                if (f.label) group.appendChild(new NoshiCE({ tag:'label', class:'noshi-field-label', text: f.label }).tag);
                if (f.type === 'select') {
                    group.appendChild(this.select({ options: f.options||[], name: f.name, placeholder: f.placeholder, value: f.value }));
                } else {
                    group.appendChild(this.input({ type: f.type||'text', name: f.name, placeholder: f.placeholder||'', value: f.value||'', required: f.required, id: f.id }));
                }
                if (f.hint) group.appendChild(new NoshiCE({ tag:'div', class:'noshi-field-hint', text: f.hint }).tag);
                form.appendChild(group);
            });
            if (info.buttons && info.buttons.length) {
                const btnRow = new NoshiCE({ tag:'div', class:'noshi-form-btns' }).tag;
                info.buttons.forEach(b => {
                    btnRow.appendChild(this.button({ text: b.text, class: b.active ? 'active' : 'default', click: b.function||null }));
                });
                form.appendChild(btnRow);
            }
            /* built-in validation */
            form.validate = () => {
                const errors = [];
                form.querySelectorAll('[required]').forEach(el => {
                    if (!el.value.trim()) {
                        errors.push(`${el.name || el.id || 'Field'} is required`);
                        el.classList.add('noshi-input-error');
                    } else {
                        el.classList.remove('noshi-input-error');
                    }
                    if (el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
                        errors.push(`${el.name || 'Email'} is invalid`);
                        el.classList.add('noshi-input-error');
                    }
                });
                return { valid: errors.length === 0, errors };
            };
            return form;
        };

        /* â”€â”€ CODE â”€â”€ */
        this.code = (info) => {
            NoshiStyles.inject('code', CSS_CODE);
            const block = new NoshiCE({ tag:'code', class:'noshi-code' }).tag;
            let c = (info.code||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            const target = info.target || 'js';
            if (target === 'html') {
                c = c.replace(/(&lt;|&gt;)/g, m => `<html-tag-border>${m}</html-tag-border>`);
                c = c.replace(/\s[a-z-]+=(?=['"])/gi, m => `<html-tag-attr>${m}</html-tag-attr>`);
                c = c.replace(/(['"])[^'"]*\1/g, m => `<html-tag-attr-val>${m}</html-tag-attr-val>`);
            } else if (target === 'js') {
                c = c.replace(/\b(const|let|var|new|return|if|else|function|async|await|for|of|in)\b/g, m => `<js-var>${m}</js-var>`);
                c = c.replace(/(['"``])[^'"``]*\1/g, m => `<js-txt>${m}</js-txt>`);
                c = c.replace(/[{}]/g, m => `<js-bracket>${m}</js-bracket>`);
            }
            block.innerHTML = c.split('\n').map(l => `<code-line>${l}</code-line>`).join('');
            return block;
        };

        /* â”€â”€ GRAPH â”€â”€ */
        this.graph = (info) => {
            NoshiStyles.inject('graph', CSS_GRAPH);
            if (!info.data || !info.data.length) return _e();
            const gH   = parseInt(info.graph && info.graph.height ? info.graph.height : 300);
            const gW   = 1000;
            const h    = gH - 40;
            const clrs = ['#0077b6','#9e2a2b','#588157','#ffc971','#9b5de5','#00b4d8'];
            const svgEls = [];

            info.data.forEach((ds, si) => {
                const clr  = (info.style && info.style[si] && info.style[si].color) || clrs[si % clrs.length];
                const step = gW / Math.max(ds.length - 1, 1);
                const max  = Math.max(...ds.flat(), 1);
                const pts  = ds.map((v, i) => [i * step, h - (v / max * h)]);

                if (info.graph && info.graph.type === 'area') {
                    const polyPts = [[0,h], ...pts, [gW,h]].map(p => p.join(',')).join(' ');
                    svgEls.push(new NoshiCENS({ tag:'polygon', points: polyPts, fill: clr, style:'opacity:.2' }).tag);
                }
                svgEls.push(new NoshiCENS({ tag:'path', d:'M '+pts.map(p=>p.join(' ')).join(' L '), stroke: clr, strokeWidth: 3, fill:'none' }).tag);
                if (!info.graph || info.graph.points !== false) {
                    pts.forEach(p => svgEls.push(new NoshiCENS({ tag:'circle', cx:p[0], cy:p[1], r:5, fill:clr, stroke:'#fff', strokeWidth:2 }).tag));
                }
            });

            const svg = new NoshiCENS({ tag:'svg', viewBox:`0 0 ${gW} ${h+20}`, width:'100%', height: String(gH), child: svgEls }).tag;
            const children = [];
            if (info.head) children.push(new NoshiCE({ tag:'div', class:'noshi-graph-head', text: info.head.title||'', style:`background:${info.head.backgroundColor||'#f8f9fa'};color:${info.head.color||'var(--txt)'}` }).tag);
            children.push(svg);
            return new NoshiCE({ tag:'div', class:'noshi-graph', child: children }).tag;
        };

        /* â”€â”€ SLIDER â”€â”€ */
        this.slider = (info) => {
            NoshiStyles.inject('slider', CSS_SLIDER);
            const slides = (info.images||[]).map((img, i) => {
                const s = new NoshiCE({ tag:'img', class:`noshi-slide${i===0?' active':''}`, src: img.src||img, alt: img.alt||'', style:`height:${info.height||'300px'}` }).tag;
                return s;
            });
            const dots = (info.images||[]).map((_, i) => new NoshiCE({ tag:'div', class:`noshi-slider-dot${i===0?' active':''}` }).tag);
            const dotsEl = new NoshiCE({ tag:'div', class:'noshi-slider-dots', child: dots }).tag;
            const wrap   = new NoshiCE({ tag:'div', class:'noshi-slider', style:`height:${info.height||'300px'}`, child:[...slides, dotsEl] }).tag;

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

        /* â”€â”€ MODAL â”€â”€ */
        this.modal = (info) => {
            NoshiStyles.inject('modals', CSS_MODAL);
            const overlay = new NoshiCE({ tag:'div', class:'noshi-overlay', style:'display:none' }).tag;
            const modal   = new NoshiCE({ tag:'div', class:'noshi-modal', style: info.width ? `max-width:${info.width}` : '' }).tag;

            if (info.title) {
                const closeBtn = new NoshiCE({ tag:'span', class:'noshi-modal-close', html:'&times;' }).tag;
                closeBtn.addEventListener('click', () => api.close());
                overlay.addEventListener('click', e => { if (e.target === overlay) api.close(); });
                modal.appendChild(new NoshiCE({ tag:'div', class:'noshi-modal-header', child:[
                    new NoshiCE({ tag:'h3', text: info.title }).tag, closeBtn
                ]}).tag);
            }

            const body = new NoshiCE({ tag:'div', class:'noshi-modal-body' }).tag;
            if (info.content instanceof HTMLElement) body.appendChild(info.content);
            else if (typeof info.content === 'string') body.innerHTML = info.content;
            modal.appendChild(body);

            if (info.footer) {
                const foot = new NoshiCE({ tag:'div', class:'noshi-modal-footer' }).tag;
                (Array.isArray(info.footer) ? info.footer : [info.footer]).forEach(el => foot.appendChild(el));
                modal.appendChild(foot);
            }
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            const api = {
                overlay,
                open:  () => { overlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; },
                close: () => { overlay.style.display = 'none';  document.body.style.overflow = ''; }
            };
            return api;
        };

        /* â”€â”€ TOAST â”€â”€ */
        this.toast = (info) => {
            NoshiStyles.inject('toasts', CSS_TOAST);
            let container = document.getElementById('noshi-toasts');
            if (!container) {
                container = new NoshiCE({ tag:'div', class:'noshi-toasts', id:'noshi-toasts' }).tag;
                document.body.appendChild(container);
            }
            const type  = info.type || 'info';
            const close = new NoshiCE({ tag:'span', class:'noshi-toast-close', html:'&times;' }).tag;
            const toast = new NoshiCE({ tag:'div', class:`noshi-toast noshi-toast-${type}`, child:[
                new NoshiCE({ tag:'div', class:'noshi-toast-msg', text: info.message||'' }).tag,
                close
            ]}).tag;
            close.addEventListener('click', () => toast.remove());
            container.appendChild(toast);
            if (info.duration !== 0) setTimeout(() => { if (toast.parentNode) toast.remove(); }, info.duration || 3500);
        };

        /* â”€â”€ TABS â”€â”€ */
        this.tabs = (info) => {
            NoshiStyles.inject('tabs', CSS_TABS);
            const tabs  = info.tabs || [];
            const nav   = new NoshiCE({ tag:'div', class:'noshi-tabs-nav' }).tag;
            const body  = new NoshiCE({ tag:'div' }).tag;

            tabs.forEach((tab, i) => {
                const btn  = new NoshiCE({ tag:'button', class:`noshi-tab-btn${i===0?' active':''}`, text: tab.title }).tag;
                const pane = new NoshiCE({ tag:'div', class:`noshi-tab-pane${i===0?' active':''}` }).tag;
                if (tab.content instanceof HTMLElement) pane.appendChild(tab.content);
                else pane.innerHTML = tab.content || '';

                btn.addEventListener('click', () => {
                    nav.querySelectorAll('.noshi-tab-btn').forEach(b => b.classList.remove('active'));
                    body.querySelectorAll('.noshi-tab-pane').forEach(p => p.classList.remove('active'));
                    btn.classList.add('active');
                    pane.classList.add('active');
                });
                nav.appendChild(btn);
                body.appendChild(pane);
            });
            return new NoshiCE({ tag:'div', class:'noshi-tabs', child:[nav, body] }).tag;
        };

        /* â”€â”€ BADGE â”€â”€ */
        this.badge = (info) => {
            NoshiStyles.inject('badges', CSS_BADGE);
            const el = new NoshiCE({ tag:'span', class:`noshi-badge noshi-badge-${info.type||'gray'}${info.dot?' noshi-badge-dot':''}`, text: info.text||'' }).tag;
            return el;
        };

        /* â”€â”€ PROGRESS â”€â”€ */
        this.progress = (info) => {
            NoshiStyles.inject('progress', CSS_PROG);
            const pct     = Math.round(Math.min(Math.max(info.value||0, 0), info.max||100) / (info.max||100) * 100);
            const color   = info.color && info.color !== 'primary' ? `noshi-progress-${info.color}` : '';
            const size    = info.size ? `noshi-progress-${info.size}` : '';
            const striped = info.striped ? 'noshi-progress-striped' : '';
            const bar     = new NoshiCE({ tag:'div', class:'noshi-progress-bar', style:`width:${pct}%` }).tag;
            const track   = new NoshiCE({ tag:'div', class:'noshi-progress-track', child:[bar] }).tag;
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

        /* â”€â”€ STATS CARD â”€â”€ */
        this.statsCard = (info) => {
            NoshiStyles.inject('stats', CSS_STATS);
            const iconType = info.iconType || 'primary';
            const iconEl   = new NoshiCE({ tag:'div', class:`noshi-stats-icon noshi-stats-icon-${iconType}` }).tag;
            iconEl.textContent = info.emoji || '';
            if (info.icon) { if (info.icon instanceof HTMLElement) { iconEl.appendChild(info.icon); } else { iconEl.appendChild(new NoshiCE({ tag:'i', class: info.icon }).tag); } }

            const bodyChildren = [
                new NoshiCE({ tag:'div', class:'noshi-stats-value', text: String(info.value||'0') }).tag,
                new NoshiCE({ tag:'div', class:'noshi-stats-label', text: info.label||'' }).tag
            ];
            if (info.trend) bodyChildren.push(new NoshiCE({ tag:'div', class:`noshi-stats-trend noshi-trend-${info.trendUp?'up':'down'}`, text:`${info.trendUp?'â–²':'â–¼'} ${info.trend}` }).tag);
            return new NoshiCE({ tag:'div', class:'noshi-stats-card', child:[iconEl, new NoshiCE({ tag:'div', class:'noshi-stats-body', child: bodyChildren }).tag] }).tag;
        };

        /* â”€â”€ ACCORDION â”€â”€ */
        this.accordion = (info) => {
            NoshiStyles.inject('accordion', CSS_ACC);
            const root = new NoshiCE({ tag:'div', class:'noshi-accordion' }).tag;
            (info.items||[]).forEach((item, i) => {
                const body  = new NoshiCE({ tag:'div', class:'noshi-accordion-body' }).tag;
                if (item.content instanceof HTMLElement) body.appendChild(item.content);
                else body.innerHTML = `<div class="noshi-accordion-content">${item.content||''}</div>`;

                const arrow = new NoshiCE({ tag:'span', class:'noshi-accordion-arrow', text:String.fromCharCode(9660) }).tag;
                const head  = new NoshiCE({ tag:'div', class:'noshi-accordion-head', child:[
                    new NoshiCE({ tag:'span', class:'noshi-accordion-title', text: item.title||'' }).tag, arrow
                ]}).tag;

                head.addEventListener('click', () => {
                    const isOpen = body.classList.contains('open');
                    if (!info.multiple) {
                        root.querySelectorAll('.noshi-accordion-body').forEach(b => b.classList.remove('open'));
                        root.querySelectorAll('.noshi-accordion-head').forEach(h => h.classList.remove('open'));
                    }
                    body.classList.toggle('open', !isOpen);
                    head.classList.toggle('open', !isOpen);
                });
                if (i === 0 && info.openFirst) { body.classList.add('open'); head.classList.add('open'); }
                root.appendChild(new NoshiCE({ tag:'div', class:'noshi-accordion-item', child:[head, body] }).tag);
            });
            return root;
        };

        /* â”€â”€ TOOLTIP â”€â”€ */
        this.tooltip = (element, info) => {
            NoshiStyles.inject('tooltip', CSS_TIP);
            const pos = info.position || 'top';
            const box = new NoshiCE({ tag:'span', class:'noshi-tooltip-box', text: info.text||'' }).tag;
            return new NoshiCE({ tag:'span', class:`noshi-tooltip-wrap noshi-tooltip-${pos}`, child:[element, box] }).tag;
        };

        /* â”€â”€ TABLE â”€â”€ */
        this.table = (info) => {
            NoshiStyles.inject('tables', CSS_TABLE);
            let allData = info.data || [], filtered = [...allData];
            let sortKey = null, sortDir = 'asc', page = 1;
            const perPage = info.pagination || 0;
            const wrap = new NoshiCE({ tag:'div', class:'noshi-table-wrap' }).tag;

            let searchInput = null;
            if (info.search) {
                searchInput = new NoshiCE({ tag:'input', class:'noshi-table-search', placeholder: info.searchPlaceholder||'Searchâ€¦', type:'text' }).tag;
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

            const footer  = new NoshiCE({ tag:'div', class:'noshi-table-footer' }).tag;
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
                    countEl.textContent = `${s+1}â€“${Math.min(s+perPage,total)} of ${total}`;
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
                        else td.textContent=val!=null?String(val):'â€”';
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
            }
            wrap.setData = d => { allData=d; filtered=[...d]; page=1; render(); };
            wrap.refresh  = () => applyFilter();
            applyFilter();
            return wrap;
        };

        /* â”€â”€ STEPPER â”€â”€ */
        this.stepper = (info) => {
            NoshiStyles.inject('stepper', CSS_STEP);
            NoshiStyles.inject('buttons', CSS_BTN);
            const steps = info.steps||[]; let cur = 0;
            const circles=[], labels=[], panes=[], lines=[];

            const nav = new NoshiCE({ tag:'div', class:'noshi-stepper-nav' }).tag;
            steps.forEach((s, i) => {
                const circ = new NoshiCE({ tag:'div', class:'noshi-step-circle', text:String(i+1) }).tag;
                const lbl  = new NoshiCE({ tag:'div', class:'noshi-step-label', text: s.title }).tag;
                circles.push(circ); labels.push(lbl);
                nav.appendChild(new NoshiCE({ tag:'div', class:'noshi-step-item', child:[circ, new NoshiCE({tag:'div',class:'noshi-step-info',child:[lbl]}).tag] }).tag);
                if (i < steps.length-1) { const line=new NoshiCE({tag:'div',class:'noshi-step-line'}).tag; lines.push(line); nav.appendChild(line); }
                const pane=new NoshiCE({tag:'div',class:'noshi-step-pane'}).tag;
                if (s.content instanceof HTMLElement) pane.appendChild(s.content); else pane.innerHTML=s.content||'';
                panes.push(pane);
            });

            const content = new NoshiCE({ tag:'div', class:'noshi-stepper-content', child: panes }).tag;
            const prevBtn = new NoshiCE({ tag:'button', class:'btn btn-ghost', text:String.fromCharCode(8592)+' Back' }).tag;
            const nextBtn = new NoshiCE({ tag:'button', class:'btn btn-active', text:'Next â†’' }).tag;
            const counter = new NoshiCE({ tag:'span', class:'small' }).tag;
            const footer  = new NoshiCE({ tag:'div', class:'noshi-stepper-footer', child:[prevBtn, counter, nextBtn] }).tag;

            const update = () => {
                circles.forEach((c,i) => { c.className='noshi-step-circle'+(i===cur?' active':i<cur?' done':''); c.textContent=i<cur?'âœ“':String(i+1); });
                labels.forEach((l,i) => l.className='noshi-step-label'+(i===cur?' active':i<cur?' done':''));
                lines.forEach((l,i) => l.classList.toggle('done', i<cur));
                panes.forEach((p,i) => p.classList.toggle('active', i===cur));
                prevBtn.style.visibility = cur===0?'hidden':'visible';
                nextBtn.textContent = cur===steps.length-1 ? (info.completeText||'Finish âœ“') : 'Next â†’';
                counter.textContent = `Step ${cur+1} of ${steps.length}`;
            };

            prevBtn.addEventListener('click', () => { if (cur>0){cur--;update();} });
            nextBtn.addEventListener('click', () => {
                if (cur<steps.length-1) { const v=steps[cur].validate; if(v&&!v()) return; cur++; update(); }
                else if (info.onComplete) info.onComplete();
            });

            const root = new NoshiCE({ tag:'div', class:'noshi-stepper', child:[nav, content, footer] }).tag;
            root.goTo = n => { cur=Math.max(0,Math.min(n,steps.length-1)); update(); };
            update();
            return root;
        };

    } /* end NoshiBuilder */

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       NOSHI STORE â€” reactive state manager
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       UTILITIES
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
        } else content = new NoshiCE({ tag:'p', class:'xlarge bold', text: info.text||'Loadingâ€¦' }).tag;
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

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       NOSHI.PAGE() â€” full page scaffolding
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       INIT & EXPORTS
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
    global.NoshiIcon    = NoshiIcon;
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
