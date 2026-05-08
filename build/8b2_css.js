    /* ── NOTES CSS ── */
    const CSS_NOTE = `.noshi-note{display:flex;align-items:stretch;border-radius:var(--r-sm);overflow:hidden;border:1px solid var(--gray);box-shadow:var(--sh-sm);margin:.5rem 0}
.noshi-note-icon{display:flex;align-items:center;justify-content:center;min-width:48px;font-size:1.2rem;color:#fff;padding:0 .75rem;background:var(--dark)}
.noshi-note-body{padding:.85rem 1rem;flex:1;font-size:.9rem;line-height:1.55;color:var(--txt)}
.noshi-note-success .noshi-note-icon{background:var(--ok)}.noshi-note-success .noshi-note-body{background:rgba(88,129,87,.05)}
.noshi-note-warning .noshi-note-icon{background:var(--warn);color:var(--dark)}.noshi-note-warning .noshi-note-body{background:rgba(255,201,113,.07)}
.noshi-note-error .noshi-note-icon{background:var(--err)}.noshi-note-error .noshi-note-body{background:rgba(158,42,43,.04)}`;

    /* ── MODALS CSS ── */
    const CSS_MODAL = `.noshi-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;z-index:2000;animation:noshi-fade-in .25s ease}
.noshi-modal{background:#fff;border-radius:var(--r-lg);box-shadow:var(--sh-lg);display:flex;flex-direction:column;overflow:hidden;width:90%;max-width:560px;animation:noshi-slide-up .3s ease}
.noshi-modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid var(--gray)}
.noshi-modal-header h3{font-size:1.15rem;font-weight:700}
.noshi-modal-close{cursor:pointer;font-size:1.6rem;color:var(--muted);line-height:1;transition:var(--tr)}.noshi-modal-close:hover{color:var(--err)}
.noshi-modal-body{padding:1.5rem;overflow-y:auto;max-height:65vh}
.noshi-modal-footer{padding:1rem 1.5rem;border-top:1px solid var(--gray);display:flex;justify-content:flex-end;gap:.75rem;background:#fafafa}`;

    /* ── TABS CSS ── */
    const CSS_TABS = `.noshi-tabs{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden}
.noshi-tabs-nav{display:flex;background:#f8f9fa;border-bottom:1px solid var(--gray);overflow-x:auto}
.noshi-tab-btn{padding:.85rem 1.5rem;cursor:pointer;font-size:.93rem;font-weight:500;color:var(--muted);border-bottom:3px solid transparent;white-space:nowrap;transition:var(--tr);background:none;border-top:none;border-left:none;border-right:none}
.noshi-tab-btn:hover{color:var(--p);background:rgba(0,119,182,.03)}
.noshi-tab-btn.active{color:var(--p);border-bottom-color:var(--p);background:#fff;font-weight:600}
.noshi-tab-pane{display:none;padding:1.5rem;animation:noshi-fade-in .25s ease}.noshi-tab-pane.active{display:block}`;

    /* ── TOASTS CSS ── */
    const CSS_TOAST = `.noshi-toasts{position:fixed;bottom:1.5rem;right:1.5rem;display:flex;flex-direction:column;gap:.75rem;z-index:3000}
.noshi-toast{display:flex;align-items:center;gap:.75rem;min-width:280px;max-width:380px;padding:.9rem 1.1rem;background:var(--dark);color:#fff;border-radius:var(--r-sm);box-shadow:var(--sh-md);animation:noshi-slide-in-right .3s ease}
.noshi-toast-msg{flex:1;font-size:.9rem;line-height:1.4}
.noshi-toast-close{cursor:pointer;font-size:1.1rem;opacity:.65;transition:var(--tr)}.noshi-toast-close:hover{opacity:1}
.noshi-toast-info{border-left:4px solid var(--p)}.noshi-toast-success{border-left:4px solid var(--ok)}
.noshi-toast-warning{border-left:4px solid var(--warn)}.noshi-toast-error{border-left:4px solid var(--err)}`;

    /* ── SLIDER CSS ── */
    const CSS_SLIDER = `.noshi-slider{position:relative;overflow:hidden;width:100%;height:300px;background:#111}
.noshi-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity .6s ease;z-index:0}
.noshi-slide.active{opacity:1;visibility:visible;z-index:1}
.noshi-slider-dots{position:absolute;bottom:.75rem;left:50%;transform:translateX(-50%);display:flex;gap:.4rem;z-index:2}
.noshi-slider-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:var(--tr)}.noshi-slider-dot.active{background:#fff;width:24px;border-radius:4px}`;

    /* ── LOADING CSS ── */
    const CSS_LOAD = `.noshi-loading-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:9999}
.noshi-spinner{width:44px;height:44px;border:4px solid var(--gray);border-top-color:var(--p);border-radius:50%;animation:noshi-spin 1s linear infinite}
.noshi-dots-holder{display:flex;gap:.35rem}
.noshi-dot{width:12px;height:12px;border-radius:50%;background:var(--p);animation:noshi-bounce 1.4s ease-in-out infinite}`;

    /* ── CODE CSS ── */
    const CSS_CODE = `.noshi-code{display:block;background:#1e1e2e;color:#cdd6f4;padding:1.25rem;border-radius:var(--r-sm);overflow-x:auto;font-family:'Fira Code',Consolas,monospace;font-size:.88rem;line-height:1.7;white-space:pre}
code-line{display:block}html-tag-border{color:#89b4fa}html-tag-attr{color:#a6e3a1}html-tag-attr-val{color:#f38ba8}
css-property{color:#89b4fa}css-value{color:#a6e3a1}js-var{color:#cba6f7}js-txt{color:#a6e3a1}js-bracket{color:#fab387}js-func{color:#89b4fa}`;

    /* ── GRAPH CSS ── */
    const CSS_GRAPH = `.noshi-graph{display:flex;flex-direction:column;border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm)}
.noshi-graph-head{padding:.75rem 1.25rem;font-weight:600;font-size:1rem;background:#f8f9fa;border-bottom:1px solid var(--gray)}
.noshi-graph svg{display:block;width:100%}circle{transition:r .2s ease;cursor:pointer}`;

    /* ── TABLE CSS ── */
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

    /* ── BADGES CSS ── */
    const CSS_BADGE = `.noshi-badge{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .65rem;border-radius:20px;font-size:.75rem;font-weight:600;white-space:nowrap}
.noshi-badge-info{background:rgba(0,119,182,.12);color:var(--p)}.noshi-badge-success{background:rgba(88,129,87,.12);color:var(--ok)}
.noshi-badge-warning{background:rgba(255,201,113,.2);color:#a06000}.noshi-badge-error{background:rgba(158,42,43,.1);color:var(--err)}
.noshi-badge-dark{background:var(--dark);color:#fff}.noshi-badge-gray{background:var(--gray);color:var(--muted)}
.noshi-badge-dot::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:currentColor}`;

    /* ── PROGRESS CSS ── */
    const CSS_PROG = `.noshi-progress-wrap{width:100%}
.noshi-progress-label{display:flex;justify-content:space-between;font-size:.83rem;color:var(--muted);margin-bottom:.4rem}
.noshi-progress-track{width:100%;height:10px;background:var(--gray);border-radius:20px;overflow:hidden}
.noshi-progress-bar{height:100%;border-radius:20px;transition:width .6s ease;background:var(--p)}
.noshi-progress-striped .noshi-progress-bar{background-image:linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%);background-size:40px 40px;animation:noshi-stripe .8s linear infinite}
.noshi-progress-sm .noshi-progress-track{height:6px}.noshi-progress-lg .noshi-progress-track{height:16px}
.noshi-progress-success .noshi-progress-bar{background:var(--ok)}.noshi-progress-warning .noshi-progress-bar{background:var(--warn)}.noshi-progress-error .noshi-progress-bar{background:var(--err)}`;

    /* ── STATS CSS ── */
    const CSS_STATS = `.noshi-stats-card{display:flex;align-items:center;gap:1rem;padding:1.25rem 1.5rem;background:#fff;border-radius:var(--r-md);box-shadow:var(--sh-sm);border:1px solid var(--gray);transition:var(--tr)}.noshi-stats-card:hover{box-shadow:var(--sh-md);transform:translateY(-2px)}
.noshi-stats-icon{width:48px;height:48px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
.noshi-stats-icon-primary{background:rgba(0,119,182,.1);color:var(--p)}.noshi-stats-icon-success{background:rgba(88,129,87,.1);color:var(--ok)}.noshi-stats-icon-warning{background:rgba(255,201,113,.2);color:#a06000}.noshi-stats-icon-error{background:rgba(158,42,43,.1);color:var(--err)}
.noshi-stats-body{flex:1}.noshi-stats-value{font-size:1.75rem;font-weight:700;line-height:1;color:var(--txt)}.noshi-stats-label{font-size:.83rem;color:var(--muted);margin-top:.25rem}
.noshi-stats-trend{font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:.2rem;margin-top:.35rem}.noshi-trend-up{color:var(--ok)}.noshi-trend-down{color:var(--err)}`;

    /* ── ACCORDION CSS ── */
    const CSS_ACC = `.noshi-accordion{border:1px solid var(--gray);border-radius:var(--r-md);overflow:hidden}
.noshi-accordion-item{border-bottom:1px solid var(--gray)}.noshi-accordion-item:last-child{border-bottom:none}
.noshi-accordion-head{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;cursor:pointer;background:#fff;transition:var(--tr);user-select:none}
.noshi-accordion-head:hover{background:#f8f9fa}.noshi-accordion-head.open{background:#f0f7ff;color:var(--p)}
.noshi-accordion-title{font-weight:600;font-size:.95rem}
.noshi-accordion-arrow{font-size:.75rem;transition:transform .3s ease;color:var(--muted)}.noshi-accordion-head.open .noshi-accordion-arrow{transform:rotate(180deg);color:var(--p)}
.noshi-accordion-body{max-height:0;overflow:hidden;transition:max-height .35s ease,padding .2s ease;padding:0 1.25rem}.noshi-accordion-body.open{max-height:600px;padding:1rem 1.25rem}
.noshi-accordion-content{font-size:.9rem;color:var(--muted);line-height:1.65}`;

    /* ── TOOLTIP CSS ── */
    const CSS_TIP = `.noshi-tooltip-wrap{position:relative;display:inline-flex}
.noshi-tooltip-box{position:absolute;background:rgba(30,30,30,.92);color:#fff;font-size:.78rem;padding:.35rem .75rem;border-radius:var(--r-sm);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s ease;z-index:1000}
.noshi-tooltip-wrap:hover .noshi-tooltip-box{opacity:1}
.noshi-tooltip-top .noshi-tooltip-box{bottom:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.noshi-tooltip-bottom .noshi-tooltip-box{top:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.noshi-tooltip-left .noshi-tooltip-box{right:calc(100% + 6px);top:50%;transform:translateY(-50%)}
.noshi-tooltip-right .noshi-tooltip-box{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}`;

    /* ── STEPPER CSS ── */
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

    /* ── PAGE CSS ── */
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

    /* ── NAV CSS ── */
    const CSS_NAV = `.noshi-nav{display:flex;align-items:center;background:#fff;border-bottom:1px solid var(--gray);padding:0 1.5rem;height:60px;position:sticky;top:0;z-index:100;box-shadow:var(--sh-sm)}
.noshi-nav-brand{font-size:1.2rem;font-weight:700;color:var(--p);margin-right:2rem}
.noshi-nav-links{display:flex;gap:1rem;flex:1}.noshi-nav-link{padding:.4rem .75rem;border-radius:var(--r-sm);color:var(--muted);font-size:.93rem;transition:var(--tr)}.noshi-nav-link:hover,.noshi-nav-link.active{color:var(--p);background:rgba(0,119,182,.06)}
.noshi-nav-actions{display:flex;gap:.5rem}
.noshi-nav-menu-head{cursor:pointer;display:flex;align-items:center;gap:.4rem;position:relative}
.noshi-nav-menu-body{display:none;position:absolute;top:100%;background:#fff;border:1px solid var(--gray);border-radius:var(--r-sm);box-shadow:var(--sh-md);min-width:180px;overflow:hidden;z-index:200}.noshi-nav-menu-body.open{display:flex;flex-direction:column;animation:noshi-slide-up .2s ease}
.noshi-nav-menu-item{padding:.75rem 1rem;font-size:.9rem;transition:var(--tr);cursor:pointer}.noshi-nav-menu-item:hover{background:var(--gray)}`;

    /* inject base styles immediately on load */
    NoshiStyles.inject('base', CSS_BASE + CSS_UTILS + CSS_ANIM);

