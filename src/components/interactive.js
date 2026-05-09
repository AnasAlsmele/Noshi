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
