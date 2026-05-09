/**
 * Noshi v2.0 — Docs Site JS
 * Features: search, syntax highlight, copy button, live demos,
 *           heading anchors, prev/next nav, mobile sidebar, Ctrl+K
 */
(function () {
    const params  = new URL(window.location.href).searchParams;
    let current   = params.get('page') || 'welcome';

    /* ── Full ordered nav list ── */
    const NAV = [
        { title: 'Getting Started', items: [
            { id: 'welcome',   label: 'Welcome'        },
            { id: 'install',   label: 'Installation'   },
            { id: 'showcase',  label: 'Showcase'       }
        ]},
        { title: 'Layout', items: [
            { id: 'page',      label: 'Page Scaffold'  },
            { id: 'navbars',   label: 'Navbar'         }
        ]},
        { title: 'Components', items: [
            { id: 'buttons',   label: 'Buttons'        },
            { id: 'cards',     label: 'Cards'          },
            { id: 'badges',    label: 'Badges'         },
            { id: 'notes',     label: 'Notes'          },
            { id: 'modals',    label: 'Modals'         },
            { id: 'tabs',      label: 'Tabs'           },
            { id: 'toasts',    label: 'Toasts'         },
            { id: 'accordion', label: 'Accordion'      },
            { id: 'tooltip',   label: 'Tooltip'        },
            { id: 'stepper',   label: 'Stepper'        },
            { id: 'slider',    label: 'Slider'         },
            { id: 'graphs',    label: 'Graphs'         },
            { id: 'icons',     label: 'Icons'          }
        ]},
        { title: 'Forms & Data', items: [
            { id: 'forms',     label: 'Forms'          },
            { id: 'inputs',    label: 'Inputs'         },
            { id: 'tables',    label: 'Tables'         },
            { id: 'progress',  label: 'Progress'       },
            { id: 'stats',     label: 'Stats Card'     }
        ]},
        { title: 'Utilities', items: [
            { id: 'ajax',      label: 'AJAX'           },
            { id: 'loading',   label: 'Loading'        },
            { id: 'store',     label: 'Store'          },
            { id: 'selectors', label: 'Selectors'      },
            { id: 'darkmode',  label: 'Dark Mode'      },
            { id: 'statics',   label: 'Statics'        }
        ]}
    ];

    /* flat ordered list for prev/next */
    const ALL_PAGES = NAV.flatMap(s => s.items);

    /* ── Build Sidebar ── */
    const sidebar = document.getElementById('d-sidebar');

    /* Search box */
    const searchWrap  = document.createElement('div');
    searchWrap.className = 'd-search-wrap';
    const searchInput = document.createElement('input');
    searchInput.type        = 'text';
    searchInput.className   = 'd-search';
    searchInput.placeholder = 'Search docs… (Ctrl+K)';
    const searchHint  = document.createElement('div');
    searchHint.className    = 'd-search-hint';
    searchHint.textContent  = 'Ctrl + K';
    searchWrap.appendChild(searchInput);
    searchWrap.appendChild(searchHint);
    sidebar.appendChild(searchWrap);

    /* Build links */
    const linkMap = {};
    NAV.forEach(section => {
        const title = document.createElement('div');
        title.className   = 'd-section-title';
        title.textContent = section.title;
        sidebar.appendChild(title);

        section.items.forEach(item => {
            const a = document.createElement('a');
            a.className  = 'd-nav-link' + (item.id === current ? ' active' : '');
            a.textContent = item.label;
            a.href        = '?page=' + item.id;
            a.id          = 'nav-' + item.id;
            a.addEventListener('click', e => { e.preventDefault(); navigateTo(item.id); });
            sidebar.appendChild(a);
            linkMap[item.id] = a;
        });
    });

    /* Search filter */
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        Object.entries(linkMap).forEach(([id, el]) => {
            el.classList.toggle('hidden', q !== '' && !el.textContent.toLowerCase().includes(q));
        });
        /* show/hide section titles */
        sidebar.querySelectorAll('.d-section-title').forEach(t => {
            let next = t.nextElementSibling;
            let anyVisible = false;
            while (next && !next.classList.contains('d-section-title')) {
                if (!next.classList.contains('hidden')) anyVisible = true;
                next = next.nextElementSibling;
            }
            t.style.display = anyVisible || q === '' ? '' : 'none';
        });
    });

    /* Ctrl+K shortcut */
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });

    /* ── Dark mode ── */
    const darkBtn = document.getElementById('dark-toggle');
    if (localStorage.getItem('noshi-dark') === 'true') {
        document.documentElement.classList.add('dark');
        darkBtn.textContent = '☀️';
    }
    darkBtn.addEventListener('click', () => {
        const on = document.documentElement.classList.toggle('dark');
        darkBtn.textContent = on ? '☀️' : '🌙';
        localStorage.setItem('noshi-dark', on);
    });

    /* ── Mobile sidebar ── */
    const menuBtn = document.getElementById('menu-toggle');
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    document.addEventListener('click', e => {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuBtn)
            sidebar.classList.remove('open');
    });

    /* ── Navigate ── */
    function navigateTo(pageId) {
        current = pageId;
        window.history.pushState({}, '', '?page=' + pageId);
        Object.values(linkMap).forEach(el => el.classList.remove('active'));
        const activeLink = linkMap[pageId];
        if (activeLink) { activeLink.classList.add('active'); activeLink.scrollIntoView({ block: 'nearest' }); }
        sidebar.classList.remove('open');
        loadPage(pageId);
    }

    /* ── Syntax highlighter ── */
    function highlight(raw) {
        let c = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        /* comments first (before strings eat them) */
        c = c.replace(/(\/\/[^\n]*)/g, '\x00cmt\x00$1\x00end\x00');
        c = c.replace(/(\/\*[\s\S]*?\*\/)/g, '\x00cmt\x00$1\x00end\x00');
        /* strings */
        c = c.replace(/((?:`[^`]*`|'[^'\\]*(?:\\[\s\S][^'\\]*)*'|"[^"\\]*(?:\\[\s\S][^"\\]*)*"))/g, '\x00str\x00$1\x00end\x00');
        /* keywords */
        const KW = 'const|let|var|function|return|if|else|new|class|async|await|for|of|in|this|true|false|null|undefined|import|export|default|typeof|try|catch|throw';
        c = c.replace(new RegExp(`\\b(${KW})\\b`, 'g'), '\x00kw\x00$1\x00end\x00');
        /* numbers */
        c = c.replace(/\b(\d+\.?\d*)\b/g, '\x00num\x00$1\x00end\x00');
        /* method calls */
        c = c.replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '.\x00fn\x00$1\x00end\x00');
        /* object keys */
        c = c.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\s*):/g, '\x00key\x00$1\x00end\x00:');
        /* replace tokens */
        const MAP = { cmt:'hl-cmt', str:'hl-str', kw:'hl-kw', num:'hl-num', fn:'hl-fn', key:'hl-key' };
        c = c.replace(/\x00(\w+)\x00([\s\S]*?)\x00end\x00/g, (_, type, val) => `<span class="${MAP[type]||''}">${val}</span>`);
        return c;
    }

    /* ── Process code blocks: highlight + copy button ── */
    /* ── Execute demo code, populate a preview box ── */
    function execDemo(code, box) {
        /* clear everything except the label */
        const lbl = box.querySelector('.preview-label');
        box.innerHTML = '';
        if (lbl) box.appendChild(lbl);
        try {
            const b = new NoshiBuilder();
            const result = new Function('builder', 'Noshi', 'NoshiBuilder', code)(b, Noshi, NoshiBuilder);
            if (result instanceof HTMLElement) {
                box.appendChild(result);
            } else if (Array.isArray(result)) {
                result.forEach(el => { if (el instanceof HTMLElement) box.appendChild(el); });
            }
        } catch (e) {
            const err = document.createElement('span');
            err.style.cssText = 'color:#ff7b72;font-size:.82rem;font-family:monospace';
            err.textContent   = '⚠ ' + e.message;
            box.appendChild(err);
        }
    }

    /* ── Run live demos — assigns IDs & links to the next <pre> ── */
    function runDemos() {
        let n = 0;
        pageArea.querySelectorAll('script.noshi-demo').forEach(script => {
            const demoId = 'noshi-demo-' + (n++);
            /* preview box */
            const box = document.createElement('div');
            box.className = 'preview-box';
            box.id = demoId;
            const lbl = document.createElement('div');
            lbl.className   = 'preview-label';
            lbl.textContent = '⚡ Live Preview';
            box.appendChild(lbl);
            execDemo(script.textContent.trim(), box);
            script.parentNode.insertBefore(box, script);
            /* link the immediately following <pre> to this demo */
            const next = script.nextElementSibling;
            if (next && next.tagName === 'PRE' && next.classList.contains('docs-code')) {
                next.dataset.demoId   = demoId;
                next.dataset.demoCode = script.textContent.trim();
            }
        });
    }

    /* ── Process code blocks: editable playground OR highlighted readonly ── */
    function processCodeBlocks() {
        pageArea.querySelectorAll('pre.docs-code').forEach(pre => {
            const wrap = document.createElement('div');
            wrap.className = 'code-wrap';
            pre.parentNode.insertBefore(wrap, pre);

            const rawCode = pre.textContent;
            const demoId  = pre.dataset.demoId;
            const demoCode = pre.dataset.demoCode;

            if (demoId) {
                /* ── EDITABLE PLAYGROUND ── */
                const ta = document.createElement('textarea');
                ta.className   = 'code-editor';
                ta.value       = demoCode || rawCode;
                ta.spellcheck  = false;
                ta.autocomplete = 'off';
                /* auto-resize height */
                ta.rows = Math.min(Math.max((demoCode || rawCode).split('\n').length + 1, 4), 30);
                ta.addEventListener('input', () => {
                    ta.rows = Math.min(Math.max(ta.value.split('\n').length + 1, 4), 30);
                });
                /* Tab key inserts spaces instead of leaving field */
                ta.addEventListener('keydown', e => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        const s = ta.selectionStart, end = ta.selectionEnd;
                        ta.value = ta.value.substring(0, s) + '    ' + ta.value.substring(end);
                        ta.selectionStart = ta.selectionEnd = s + 4;
                    }
                    /* Ctrl/Cmd+Enter to run */
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        runBtn.click();
                    }
                });
                wrap.appendChild(ta);

                /* toolbar */
                const toolbar = document.createElement('div');
                toolbar.className = 'code-toolbar';

                const hint = document.createElement('span');
                hint.className   = 'code-hint';
                hint.textContent = 'Ctrl+Enter to run';
                toolbar.appendChild(hint);

                const copyBtn = document.createElement('button');
                copyBtn.className   = 'copy-btn copy-btn-bar';
                copyBtn.textContent = 'Copy';
                copyBtn.addEventListener('click', () => {
                    if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(() => showCopied(copyBtn));
                    else { const t = document.createElement('textarea'); t.value=ta.value; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); showCopied(copyBtn); }
                });

                const runBtn = document.createElement('button');
                runBtn.className   = 'run-btn';
                runBtn.innerHTML   = '&#9654; Run';
                runBtn.addEventListener('click', () => {
                    const box = document.getElementById(demoId);
                    if (box) execDemo(ta.value, box);
                });

                const resetBtn = document.createElement('button');
                resetBtn.className   = 'reset-btn';
                resetBtn.textContent = '↺ Reset';
                resetBtn.addEventListener('click', () => {
                    ta.value = demoCode || rawCode;
                    ta.rows  = Math.min(Math.max(ta.value.split('\n').length + 1, 4), 30);
                    const box = document.getElementById(demoId);
                    if (box) execDemo(ta.value, box);
                });

                toolbar.appendChild(copyBtn);
                toolbar.appendChild(resetBtn);
                toolbar.appendChild(runBtn);
                wrap.appendChild(toolbar);

            } else {
                /* ── READONLY highlighted block ── */
                wrap.appendChild(pre);
                pre.innerHTML = highlight(rawCode);

                const copyBtn = document.createElement('button');
                copyBtn.className   = 'copy-btn';
                copyBtn.textContent = 'Copy';
                copyBtn.addEventListener('click', () => {
                    if (navigator.clipboard) navigator.clipboard.writeText(rawCode).then(() => showCopied(copyBtn));
                    else { const t = document.createElement('textarea'); t.value=rawCode; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); showCopied(copyBtn); }
                });
                wrap.appendChild(copyBtn);
            }
        });
    }

    function showCopied(btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!'; btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
    }

    /* ── Add anchor links to headings ── */
    function addAnchors() {
        pageArea.querySelectorAll('h2[id], h3[id]').forEach(h => {
            if (h.querySelector('.anchor-link')) return;
            const a = document.createElement('a');
            a.className = 'anchor-link';
            a.href      = '#' + h.id;
            a.textContent = '¶';
            a.title     = 'Link to this section';
            h.appendChild(a);
        });
    }

    /* ── Prev / Next navigation ── */
    function addPrevNext() {
        const idx  = ALL_PAGES.findIndex(p => p.id === current);
        const prev = ALL_PAGES[idx - 1];
        const next = ALL_PAGES[idx + 1];
        if (!prev && !next) return;

        const nav = document.createElement('div');
        nav.className = 'page-nav';

        if (prev) {
            const a = document.createElement('a');
            a.className = 'page-nav-btn prev';
            a.href      = '?page=' + prev.id;
            a.innerHTML = `<small>Previous</small><span>${prev.label}</span>`;
            a.addEventListener('click', e => { e.preventDefault(); navigateTo(prev.id); });
            nav.appendChild(a);
        }
        if (next) {
            const a = document.createElement('a');
            a.className = 'page-nav-btn next';
            a.href      = '?page=' + next.id;
            a.innerHTML = `<small>Next</small><span>${next.label}</span>`;
            a.addEventListener('click', e => { e.preventDefault(); navigateTo(next.id); });
            nav.appendChild(a);
        }
        pageArea.appendChild(nav);
    }

    /* ── TOC with IntersectionObserver ── */
    const tocEl = document.getElementById('d-toc');
    function buildTOC() {
        tocEl.innerHTML = '';
        const headings = pageArea.querySelectorAll('h2, h3');
        if (headings.length < 2) return;

        const title = document.createElement('div');
        title.className   = 'd-toc-title';
        title.textContent = 'On This Page';
        tocEl.appendChild(title);

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                const l = tocEl.querySelector(`[data-target="${e.target.id}"]`);
                if (l) l.classList.toggle('active', e.isIntersecting);
            });
        }, { rootMargin: '-5% 0px -80% 0px' });

        headings.forEach((h, i) => {
            if (!h.id) h.id = 'h-' + i;
            const a = document.createElement('a');
            a.className = 'd-toc-link' + (h.tagName === 'H3' ? ' h3' : '');
            a.textContent = h.textContent.replace('¶', '').trim();
            a.href        = '#' + h.id;
            a.setAttribute('data-target', h.id);
            a.addEventListener('click', e => { e.preventDefault(); h.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
            tocEl.appendChild(a);
            obs.observe(h);
        });
    }

    /* ── Load page ── */
    const pageArea = document.getElementById('page-area');

    async function loadPage(id) {
        pageArea.style.opacity = '0';
        tocEl.innerHTML        = '';
        try {
            const html = await Noshi.ajax({ url: './pages/' + id + '.noshipage' });
            pageArea.innerHTML    = html;
            pageArea.style.animation = 'none';
            requestAnimationFrame(() => {
                pageArea.style.animation = '';
                pageArea.style.opacity   = '1';
            });
            runDemos();
            processCodeBlocks();
            addAnchors();
            buildTOC();
            addPrevNext();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            pageArea.innerHTML = `
                <h1 style="color:var(--c-text)">Page Not Found</h1>
                <p style="color:var(--c-muted);margin-top:1rem;line-height:1.7">
                    Could not load <code>${id}.noshipage</code>.<br>
                    Make sure you are running on a local server:<br>
                    <code>php -S localhost:8000 -t "c:/wamp64/www/Noshi"</code>
                </p>`;
            pageArea.style.opacity = '1';
        }
    }

    /* ── Browser back/forward ── */
    window.addEventListener('popstate', () => {
        const p = new URL(window.location.href).searchParams.get('page') || 'welcome';
        current = p;
        Object.values(linkMap).forEach(el => el.classList.remove('active'));
        if (linkMap[p]) linkMap[p].classList.add('active');
        loadPage(p);
    });

    /* ── Initial load ── */
    loadPage(current);
})();
