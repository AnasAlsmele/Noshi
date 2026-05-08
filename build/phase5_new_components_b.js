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
