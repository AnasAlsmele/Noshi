/**
 * Layout Components
 */
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

const CSS_NAV = `.noshi-nav{display:flex;align-items:center;background:#fff;border-bottom:1px solid var(--gray);padding:0 1.5rem;height:60px;position:sticky;top:0;z-index:100;box-shadow:var(--sh-sm)}
.noshi-nav-brand{font-size:1.2rem;font-weight:700;color:var(--p);margin-right:2rem}
.noshi-nav-links{display:flex;gap:1rem;flex:1}.noshi-nav-link{padding:.4rem .75rem;border-radius:var(--r-sm);color:var(--muted);font-size:.93rem;transition:var(--tr)}.noshi-nav-link:hover,.noshi-nav-link.active{color:var(--p);background:rgba(0,119,182,.06)}
.noshi-nav-actions{display:flex;gap:.5rem}
.noshi-nav-menu-head{cursor:pointer;display:flex;align-items:center;gap:.4rem;position:relative}
.noshi-nav-menu-body{display:none;position:absolute;top:100%;background:#fff;border:1px solid var(--gray);border-radius:var(--r-sm);box-shadow:var(--sh-md);min-width:180px;overflow:hidden;z-index:200}.noshi-nav-menu-body.open{display:flex;flex-direction:column;animation:noshi-slide-up .2s ease}
.noshi-nav-menu-item{padding:.75rem 1rem;font-size:.9rem;transition:var(--tr);cursor:pointer}.noshi-nav-menu-item:hover{background:var(--gray)}`;

NoshiBuilder.prototype.page = function(info) {
    NoshiStyles.inject('page', CSS_PAGE);
    const root = new NoshiCE({ tag:'div', class:'noshi-page' }).tag;
    if (info.header) {
        const h = info.header;
        const hChildren = [];
        if (h.brand) hChildren.push(new NoshiCE({ tag:'div', class:'noshi-page-brand', text: h.brand }).tag);
        if (h.nav) hChildren.push(new NoshiCE({ tag:'nav', class:'noshi-page-nav', child: h.nav.map(n => new NoshiCE({ tag:'a', class:`noshi-page-nav-link${n.active?' active':''}`, href:n.href||'#', text:n.label }).tag) }).tag);
        root.appendChild(new NoshiCE({ tag:'header', class:'noshi-page-header', child: hChildren }).tag);
    }
    const bodyEl = new NoshiCE({ tag:'div', class:'noshi-page-body' }).tag;
    if (info.sidebar) {
        const sb = new NoshiCE({ tag:'aside', class:'noshi-page-sidebar' }).tag;
        (info.sidebar.sections||[]).forEach(s => {
            if (s.title) sb.appendChild(new NoshiCE({ tag:'div', class:'noshi-page-sidebar-title', text:s.title }).tag);
            (s.items||[]).forEach(item => sb.appendChild(new NoshiCE({ tag: item.href?'a':'div', class:`noshi-page-sidebar-link${item.active?' active':''}`, href:item.href||null, text:item.label }).tag));
        });
        bodyEl.appendChild(sb);
    }
    const contentEl = new NoshiCE({ tag:'main', class:'noshi-page-content' }).tag;
    if (info.content instanceof HTMLElement) contentEl.appendChild(info.content); else if (typeof info.content === 'string') contentEl.innerHTML = info.content;
    bodyEl.appendChild(contentEl); root.appendChild(bodyEl);
    if (info.footer) root.appendChild(new NoshiCE({ tag:'footer', class:'noshi-page-footer', text: info.footer.text||'' }).tag);
    document.body.innerHTML = ''; document.body.appendChild(root);
    return { page: root, content: contentEl };
};

NoshiBuilder.prototype.navbar = function(info) {
    NoshiStyles.inject('nav', CSS_NAV);
    const brand = new NoshiCE({ tag:'div', class:'noshi-nav-brand', text: info.brand || 'Noshi' }).tag;
    const links = new NoshiCE({ tag:'div', class:'noshi-nav-links', child: (info.links||[]).map(l => new NoshiCE({ tag:'a', class:`noshi-nav-link${l.active?' active':''}`, href:l.href||'#', text:l.label }).tag) }).tag;
    return new NoshiCE({ tag:'header', class:'noshi-nav', child:[brand, links] }).tag;
};

// Register tags
NoshiRegistry.define('page', NoshiBuilder.prototype.page);
NoshiRegistry.define('nav', NoshiBuilder.prototype.navbar);
NoshiRegistry.define('navbar', NoshiBuilder.prototype.navbar);
