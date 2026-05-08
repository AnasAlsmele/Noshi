/**
 * Noshi v2.0 - Phase 6: New Components C
 * CSS strings + methods for: stepper, Noshi.page()
 */

// ─── CSS ────────────────────────────────────────────────────────────────────

const CSS_STEPPER = `
.noshi-stepper { display:flex; flex-direction:column; gap:0; }
.noshi-stepper-nav { display:flex; align-items:center; padding:1.5rem 2rem; background:#fff; border-bottom:1px solid var(--noshi-gray); }
.noshi-step-item { display:flex; align-items:center; flex:1; }
.noshi-step-item:last-child { flex:0; }
.noshi-step-circle { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; font-weight:700; flex-shrink:0; transition:var(--noshi-transition); background:var(--noshi-gray); color:var(--noshi-text-muted); }
.noshi-step-circle.active { background:var(--noshi-primary); color:#fff; box-shadow:0 0 0 4px rgba(0,119,182,.15); }
.noshi-step-circle.done   { background:var(--noshi-success); color:#fff; }
.noshi-step-info  { margin-left:.6rem; }
.noshi-step-label { font-size:.82rem; font-weight:600; color:var(--noshi-text-muted); transition:var(--noshi-transition); white-space:nowrap; }
.noshi-step-label.active { color:var(--noshi-primary); }
.noshi-step-label.done   { color:var(--noshi-success); }
.noshi-step-line  { flex:1; height:2px; background:var(--noshi-gray); margin:0 .75rem; transition:background .4s ease; }
.noshi-step-line.done { background:var(--noshi-success); }
.noshi-stepper-content { padding:2rem; }
.noshi-step-pane { display:none; animation:noshi-fade-in .3s ease; }
.noshi-step-pane.active { display:block; }
.noshi-stepper-footer { display:flex; justify-content:space-between; align-items:center; padding:1rem 2rem; border-top:1px solid var(--noshi-gray); background:#fafafa; gap:.75rem; }
`;

const CSS_PAGE = `
.noshi-page { display:flex; flex-direction:column; min-height:100vh; }
.noshi-page-header { position:sticky; top:0; z-index:100; background:#fff; border-bottom:1px solid var(--noshi-gray); display:flex; align-items:center; padding:0 1.5rem; height:60px; gap:1rem; box-shadow:var(--noshi-shadow-sm); }
.noshi-page-brand { font-size:1.15rem; font-weight:700; color:var(--noshi-primary); }
.noshi-page-nav { display:flex; gap:.5rem; flex:1; }
.noshi-page-nav-link { padding:.4rem .8rem; border-radius:var(--noshi-radius-sm); color:var(--noshi-text-muted); font-size:.9rem; transition:var(--noshi-transition); cursor:pointer; }
.noshi-page-nav-link:hover, .noshi-page-nav-link.active { background:rgba(0,119,182,.07); color:var(--noshi-primary); }
.noshi-page-body { display:flex; flex:1; }
.noshi-page-sidebar { width:240px; flex-shrink:0; background:#fff; border-right:1px solid var(--noshi-gray); padding:1.25rem 0; position:sticky; top:60px; height:calc(100vh - 60px); overflow-y:auto; }
.noshi-page-sidebar-title { font-size:.72rem; text-transform:uppercase; letter-spacing:.06em; color:var(--noshi-text-muted); font-weight:700; padding:.75rem 1.25rem .3rem; }
.noshi-page-sidebar-link { display:flex; align-items:center; gap:.6rem; padding:.55rem 1.25rem; font-size:.9rem; color:var(--noshi-text); transition:var(--noshi-transition); cursor:pointer; }
.noshi-page-sidebar-link:hover { background:#f0f7ff; color:var(--noshi-primary); }
.noshi-page-sidebar-link.active { background:#e8f4ff; color:var(--noshi-primary); font-weight:600; border-right:3px solid var(--noshi-primary); }
.noshi-page-content { flex:1; padding:2rem; overflow-y:auto; }
.noshi-page-footer { padding:1rem 2rem; border-top:1px solid var(--noshi-gray); text-align:center; font-size:.83rem; color:var(--noshi-text-muted); background:#fafafa; }
`;

// ─── BUILDER METHOD: stepper ─────────────────────────────────────────────────

/**
 * builder.stepper({ steps: [{ title, content }], onComplete, completeText })
 * Returns the stepper element with .goTo(n), .next(), .prev() methods.
 */
const _buildStepper = function(info) {
    NoshiStyles.inject('stepper', CSS_STEPPER);
    const steps = info.steps || [];
    let current = 0;

    // ── nav circles + lines
    const navItems = [];
    steps.forEach((step, i) => {
        const circle = new NoshiCE({ tag: 'div', class: 'noshi-step-circle', text: String(i + 1) }).tag;
        const label  = new NoshiCE({ tag: 'div', class: 'noshi-step-label', text: step.title }).tag;
        const info_  = new NoshiCE({ tag: 'div', class: 'noshi-step-info', child: [label] }).tag;
        const item   = new NoshiCE({ tag: 'div', class: 'noshi-step-item', child: [circle, info_] }).tag;
        navItems.push({ el: item, circle, label });
    });

    const navChildren = [];
    navItems.forEach((ni, i) => {
        navChildren.push(ni.el);
        if (i < navItems.length - 1) {
            navChildren.push(new NoshiCE({ tag: 'div', class: 'noshi-step-line' }).tag);
        }
    });
    const nav = new NoshiCE({ tag: 'div', class: 'noshi-stepper-nav', child: navChildren }).tag;
    const lines = nav.querySelectorAll('.noshi-step-line');

    // ── panes
    const panes = steps.map((step, i) => {
        const pane = new NoshiCE({ tag: 'div', class: 'noshi-step-pane' }).tag;
        if (step.content instanceof HTMLElement) pane.appendChild(step.content);
        else pane.innerHTML = step.content || '';
        return pane;
    });
    const content = new NoshiCE({ tag: 'div', class: 'noshi-stepper-content', child: panes }).tag;

    // ── footer buttons
    const prevBtn = new NoshiCE({ tag: 'button', class: 'btn btn-ghost', text: '← Back' }).tag;
    const nextBtn = new NoshiCE({ tag: 'button', class: 'btn btn-active', text: 'Next →' }).tag;
    const stepCounter = new NoshiCE({ tag: 'span', class: 'small', style: 'color:var(--noshi-text-muted)' }).tag;
    const footer = new NoshiCE({ tag: 'div', class: 'noshi-stepper-footer', child: [prevBtn, stepCounter, nextBtn] }).tag;

    const root = new NoshiCE({ tag: 'div', class: 'noshi-stepper', child: [nav, content, footer] }).tag;

    function updateView() {
        // update circles, labels, lines
        navItems.forEach(({ circle, label }, i) => {
            circle.className = 'noshi-step-circle' + (i === current ? ' active' : i < current ? ' done' : '');
            label.className  = 'noshi-step-label'  + (i === current ? ' active' : i < current ? ' done' : '');
            circle.textContent = i < current ? '✓' : String(i + 1);
        });
        lines.forEach((line, i) => {
            line.classList.toggle('done', i < current);
        });
        // panes
        panes.forEach((p, i) => p.classList.toggle('active', i === current));
        // buttons
        prevBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
        nextBtn.textContent = current === steps.length - 1
            ? (info.completeText || 'Finish ✓')
            : 'Next →';
        stepCounter.textContent = `Step ${current + 1} of ${steps.length}`;
    }

    prevBtn.addEventListener('click', () => { if (current > 0) { current--; updateView(); } });
    nextBtn.addEventListener('click', () => {
        if (current < steps.length - 1) {
            const validate = steps[current].validate;
            if (validate && !validate()) return;
            current++;
            updateView();
        } else {
            if (info.onComplete) info.onComplete();
        }
    });

    // public API
    root.goTo = (n) => { current = Math.max(0, Math.min(n, steps.length - 1)); updateView(); };
    root.next = () => nextBtn.click();
    root.prev = () => prevBtn.click();

    updateView();
    return root;
};

// ─── Noshi.page() ────────────────────────────────────────────────────────────

/**
 * Noshi.page(info) — full page scaffolding, clears body and builds the layout.
 * info: { header, sidebar, content, footer }
 *
 * header: { brand, nav: [{ label, href, active }], actions: [HTMLElement] }
 * sidebar: { sections: [{ title, items: [{ label, icon, href, active, click }] }] }
 * content: HTMLElement | string
 * footer: { text }
 */
const _buildPage = function(info) {
    NoshiStyles.inject('page', CSS_PAGE);

    const page = new NoshiCE({ tag: 'div', class: 'noshi-page' }).tag;

    // ── Header
    if (info.header) {
        const h = info.header;
        const headerChildren = [];

        if (h.brand) {
            headerChildren.push(new NoshiCE({ tag: 'div', class: 'noshi-page-brand', text: h.brand }).tag);
        }

        if (h.nav) {
            const navLinks = h.nav.map(n => new NoshiCE({
                tag: 'a',
                class: `noshi-page-nav-link${n.active ? ' active' : ''}`,
                href: n.href || '#',
                text: n.label
            }).tag);
            headerChildren.push(new NoshiCE({ tag: 'nav', class: 'noshi-page-nav', child: navLinks }).tag);
        }

        if (h.actions) {
            const actionsEl = new NoshiCE({ tag: 'div', style: 'display:flex;gap:.5rem;', child: h.actions }).tag;
            headerChildren.push(actionsEl);
        }

        page.appendChild(new NoshiCE({ tag: 'header', class: 'noshi-page-header', child: headerChildren }).tag);
    }

    // ── Body
    const bodyEl = new NoshiCE({ tag: 'div', class: 'noshi-page-body' }).tag;

    // Sidebar
    if (info.sidebar) {
        const sidebarEl = new NoshiCE({ tag: 'aside', class: 'noshi-page-sidebar' }).tag;
        (info.sidebar.sections || []).forEach(section => {
            if (section.title) {
                sidebarEl.appendChild(new NoshiCE({ tag: 'div', class: 'noshi-page-sidebar-title', text: section.title }).tag);
            }
            (section.items || []).forEach(item => {
                const children = [];
                if (item.icon) children.push(new NoshiCE({ tag: 'i', class: item.icon }).tag);
                children.push(new NoshiCE({ tag: 'span', text: item.label }).tag);

                const link = new NoshiCE({
                    tag: item.href ? 'a' : 'div',
                    class: `noshi-page-sidebar-link${item.active ? ' active' : ''}`,
                    href: item.href || undefined,
                    child: children,
                    click: item.click || null
                }).tag;
                sidebarEl.appendChild(link);
            });
        });
        bodyEl.appendChild(sidebarEl);
    }

    // Content
    const contentEl = new NoshiCE({ tag: 'main', class: 'noshi-page-content' }).tag;
    if (info.content instanceof HTMLElement) {
        contentEl.appendChild(info.content);
    } else if (typeof info.content === 'string') {
        contentEl.innerHTML = info.content;
    }
    bodyEl.appendChild(contentEl);
    page.appendChild(bodyEl);

    // ── Footer
    if (info.footer) {
        page.appendChild(new NoshiCE({
            tag: 'footer',
            class: 'noshi-page-footer',
            text: info.footer.text || ''
        }).tag);
    }

    document.body.innerHTML = '';
    document.body.appendChild(page);

    return { page, content: contentEl };
};
