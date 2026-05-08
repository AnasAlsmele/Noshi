    /* ─────────────────────────────────────────────
       NoshiBuilder — existing component methods
    ───────────────────────────────────────────── */
    function NoshiBuilder() {
        const _e = () => document.createElement('div');

        /* ── SELECT ── */
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

        /* ── INPUT ── */
        this.input = (info) => {
            NoshiStyles.inject('inputs', CSS_INPUT);
            const type = info.type || 'text';
            if (type === 'checkbox' || type === 'radio') {
                const id  = info.id || 'noshi-' + Math.random().toString(36).substr(2,6);
                const inp = new NoshiCE({ tag:'input', type, id, name: info.name||'', value: info.value||'', checked: info.checked, required: info.required }).tag;
                const lbl = new NoshiCE({ tag:'label', for: id, class:'noshi-input-label', text: info.text||'' }).tag;
                return new NoshiCE({ tag:'div', class:'noshi-input-holder', child:[inp, lbl] }).tag;
            }
            return new NoshiCE({ tag:'input', class:'noshi-input', type, id: info.id||'', name: info.name||'', placeholder: info.placeholder||'', value: info.value||'', required: info.required, disabled: info.disabled }).tag;
        };

        /* ── BUTTON ── */
        this.button = (info) => {
            NoshiStyles.inject('buttons', CSS_BTN);
            const cls = info.class ? `btn btn-${info.class}` : 'btn btn-default';
            const children = [];
            if (info.icon && info.iconPos !== 'right') children.push(new NoshiCE({ tag:'i', class: info.icon }).tag);
            children.push(new NoshiCE({ tag:'span', text: info.text||'' }).tag);
            if (info.icon && info.iconPos === 'right') children.push(new NoshiCE({ tag:'i', class: info.icon }).tag);
            return new NoshiCE({ tag:'button', class: cls, disabled: info.disabled, click: info.click||null, child: children }).tag;
        };

        /* ── NOTE ── */
        this.note = (info) => {
            NoshiStyles.inject('notes', CSS_NOTE);
            const type  = info.class || 'default';
            const icon  = new NoshiCE({ tag:'div', class:'noshi-note-icon', html: info.icon ? `<i class="${info.icon}"></i>` : '&#9432;' }).tag;
            const body  = new NoshiCE({ tag:'div', class:'noshi-note-body', html: info.text||'' }).tag;
            return new NoshiCE({ tag:'div', class:`noshi-note noshi-note-${type}`, child:[icon, body] }).tag;
        };

        /* ── CARD ── */
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

        /* ── FORM ── */
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

        /* ── CODE ── */
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

        /* ── GRAPH ── */
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

        /* ── SLIDER ── */
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

