        /* ── MODAL ── */
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

        /* ── TOAST ── */
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

        /* ── TABS ── */
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

        /* ── BADGE ── */
        this.badge = (info) => {
            NoshiStyles.inject('badges', CSS_BADGE);
            const el = new NoshiCE({ tag:'span', class:`noshi-badge noshi-badge-${info.type||'gray'}${info.dot?' noshi-badge-dot':''}`, text: info.text||'' }).tag;
            return el;
        };

        /* ── PROGRESS ── */
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

        /* ── STATS CARD ── */
        this.statsCard = (info) => {
            NoshiStyles.inject('stats', CSS_STATS);
            const iconType = info.iconType || 'primary';
            const iconEl   = new NoshiCE({ tag:'div', class:`noshi-stats-icon noshi-stats-icon-${iconType}` }).tag;
            iconEl.textContent = info.emoji || '';
            if (info.icon) iconEl.appendChild(new NoshiCE({ tag:'i', class: info.icon }).tag);

            const bodyChildren = [
                new NoshiCE({ tag:'div', class:'noshi-stats-value', text: String(info.value||'0') }).tag,
                new NoshiCE({ tag:'div', class:'noshi-stats-label', text: info.label||'' }).tag
            ];
            if (info.trend) bodyChildren.push(new NoshiCE({ tag:'div', class:`noshi-stats-trend noshi-trend-${info.trendUp?'up':'down'}`, text:`${info.trendUp?'▲':'▼'} ${info.trend}` }).tag);
            return new NoshiCE({ tag:'div', class:'noshi-stats-card', child:[iconEl, new NoshiCE({ tag:'div', class:'noshi-stats-body', child: bodyChildren }).tag] }).tag;
        };

        /* ── ACCORDION ── */
        this.accordion = (info) => {
            NoshiStyles.inject('accordion', CSS_ACC);
            const root = new NoshiCE({ tag:'div', class:'noshi-accordion' }).tag;
            (info.items||[]).forEach((item, i) => {
                const body  = new NoshiCE({ tag:'div', class:'noshi-accordion-body' }).tag;
                if (item.content instanceof HTMLElement) body.appendChild(item.content);
                else body.innerHTML = `<div class="noshi-accordion-content">${item.content||''}</div>`;

                const arrow = new NoshiCE({ tag:'span', class:'noshi-accordion-arrow', text:'▼' }).tag;
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

        /* ── TOOLTIP ── */
        this.tooltip = (element, info) => {
            NoshiStyles.inject('tooltip', CSS_TIP);
            const pos = info.position || 'top';
            const box = new NoshiCE({ tag:'span', class:'noshi-tooltip-box', text: info.text||'' }).tag;
            return new NoshiCE({ tag:'span', class:`noshi-tooltip-wrap noshi-tooltip-${pos}`, child:[element, box] }).tag;
        };

        /* ── TABLE ── */
        this.table = (info) => {
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
            wrap.refresh  = () => applyFilter();
            applyFilter();
            return wrap;
        };

        /* ── STEPPER ── */
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
            const prevBtn = new NoshiCE({ tag:'button', class:'btn btn-ghost', text:'← Back' }).tag;
            const nextBtn = new NoshiCE({ tag:'button', class:'btn btn-active', text:'Next →' }).tag;
            const counter = new NoshiCE({ tag:'span', class:'small' }).tag;
            const footer  = new NoshiCE({ tag:'div', class:'noshi-stepper-footer', child:[prevBtn, counter, nextBtn] }).tag;

            const update = () => {
                circles.forEach((c,i) => { c.className='noshi-step-circle'+(i===cur?' active':i<cur?' done':''); c.textContent=i<cur?'✓':String(i+1); });
                labels.forEach((l,i) => l.className='noshi-step-label'+(i===cur?' active':i<cur?' done':''));
                lines.forEach((l,i) => l.classList.toggle('done', i<cur));
                panes.forEach((p,i) => p.classList.toggle('active', i===cur));
                prevBtn.style.visibility = cur===0?'hidden':'visible';
                nextBtn.textContent = cur===steps.length-1 ? (info.completeText||'Finish ✓') : 'Next →';
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

