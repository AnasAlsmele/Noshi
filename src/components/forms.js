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
