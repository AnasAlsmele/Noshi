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
