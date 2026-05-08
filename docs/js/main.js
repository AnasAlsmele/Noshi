/**
 * Noshi v2.0 — Docs Site JS
 */
(function() {
    const params   = new URL(window.location.href).searchParams;
    let current    = params.get('page') || 'welcome';

    /* ── Navigation map ── */
    const NAV = [
        { title: 'Getting Started', items: [
            { id: 'welcome',   label: 'Welcome'       },
            { id: 'install',   label: 'Installation'  }
        ]},
        { title: 'Layout', items: [
            { id: 'page',      label: 'Page Scaffold' },
            { id: 'navbars',   label: 'Navbar'        }
        ]},
        { title: 'Components', items: [
            { id: 'buttons',   label: 'Buttons'   },
            { id: 'cards',     label: 'Cards'     },
            { id: 'badges',    label: 'Badges'    },
            { id: 'notes',     label: 'Notes'     },
            { id: 'modals',    label: 'Modals'    },
            { id: 'tabs',      label: 'Tabs'      },
            { id: 'toasts',    label: 'Toasts'    },
            { id: 'accordion', label: 'Accordion' },
            { id: 'tooltip',   label: 'Tooltip'   },
            { id: 'stepper',   label: 'Stepper'   },
            { id: 'slider',    label: 'Slider'    },
            { id: 'graphs',    label: 'Graphs'    }
        ]},
        { title: 'Forms & Data', items: [
            { id: 'forms',    label: 'Forms'      },
            { id: 'inputs',   label: 'Inputs'     },
            { id: 'tables',   label: 'Tables'     },
            { id: 'progress', label: 'Progress'   },
            { id: 'stats',    label: 'Stats Card' }
        ]},
        { title: 'Utilities', items: [
            { id: 'ajax',      label: 'AJAX'       },
            { id: 'loading',   label: 'Loading'    },
            { id: 'store',     label: 'Store'      },
            { id: 'selectors', label: 'Selectors'  },
            { id: 'darkmode',  label: 'Dark Mode'  },
            { id: 'statics',   label: 'Statics'    }
        ]}
    ];

    /* ── Build sidebar ── */
    const sidebar = document.getElementById('d-sidebar');
    NAV.forEach(section => {
        const title = document.createElement('div');
        title.className = 'd-section-title';
        title.textContent = section.title;
        sidebar.appendChild(title);

        section.items.forEach(item => {
            const a = document.createElement('a');
            a.className = 'd-nav-link' + (item.id === current ? ' active' : '');
            a.textContent = item.label;
            a.href = '?page=' + item.id;
            a.id = 'nav-' + item.id;
            a.addEventListener('click', e => {
                e.preventDefault();
                navigateTo(item.id);
            });
            sidebar.appendChild(a);
        });
    });

    /* ── Dark mode ── */
    const darkBtn = document.getElementById('dark-toggle');
    const isDark  = localStorage.getItem('noshi-dark') === 'true';
    if (isDark) { document.documentElement.classList.add('dark'); darkBtn.textContent = '☀️'; }

    darkBtn.addEventListener('click', () => {
        const on = document.documentElement.classList.toggle('dark');
        darkBtn.textContent = on ? '☀️' : '🌙';
        localStorage.setItem('noshi-dark', on);
    });

    /* ── Navigate ── */
    function navigateTo(pageId) {
        current = pageId;
        window.history.pushState({}, '', '?page=' + pageId);
        document.querySelectorAll('.d-nav-link').forEach(el => el.classList.remove('active'));
        const activeLink = document.getElementById('nav-' + pageId);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.scrollIntoView({ block: 'nearest' });
        }
        loadPage(pageId);
    }

    /* ── Load page ── */
    const pageArea = document.getElementById('page-area');
    const tocEl    = document.getElementById('d-toc');

    async function loadPage(id) {
        pageArea.style.opacity = '0';
        try {
            const html = await Noshi.ajax({ url: './pages/' + id + '.noshipage' });
            pageArea.innerHTML = html;
            pageArea.style.animation = 'none';
            requestAnimationFrame(() => {
                pageArea.style.animation = '';
                pageArea.style.opacity   = '1';
            });
            buildTOC();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch(err) {
            pageArea.innerHTML = `
                <h1>Page Not Found</h1>
                <p style="color:var(--c-muted);margin-top:1rem">
                    Could not load <code>${id}</code>.
                    Make sure you are running on a local server:
                    <code>php -S localhost:8000 -t "c:/wamp64/www/Noshi"</code>
                </p>`;
            pageArea.style.opacity = '1';
            tocEl.innerHTML = '';
        }
    }

    /* ── TOC ── */
    function buildTOC() {
        tocEl.innerHTML = '';
        const headings = pageArea.querySelectorAll('h2, h3');
        if (headings.length < 2) return;

        const title = document.createElement('div');
        title.className = 'd-toc-title';
        title.textContent = 'On This Page';
        tocEl.appendChild(title);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const link = tocEl.querySelector(`[data-target="${entry.target.id}"]`);
                if (link) link.classList.toggle('active', entry.isIntersecting);
            });
        }, { rootMargin: '-10% 0px -80% 0px' });

        headings.forEach((h, i) => {
            if (!h.id) h.id = 'h-' + i;
            const a = document.createElement('a');
            a.className = 'd-toc-link' + (h.tagName === 'H3' ? ' h3' : '');
            a.textContent = h.textContent;
            a.href = '#' + h.id;
            a.setAttribute('data-target', h.id);
            a.addEventListener('click', e => {
                e.preventDefault();
                h.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            tocEl.appendChild(a);
            observer.observe(h);
        });
    }

    /* ── Browser back/forward ── */
    window.addEventListener('popstate', () => {
        const p = new URL(window.location.href).searchParams.get('page') || 'welcome';
        current = p;
        document.querySelectorAll('.d-nav-link').forEach(el => el.classList.remove('active'));
        const l = document.getElementById('nav-' + p);
        if (l) l.classList.add('active');
        loadPage(p);
    });

    /* ── Initial load ── */
    loadPage(current);
})();
