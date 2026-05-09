/**
 * Basic Elements
 */
const CSS_BTN = `.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1.25rem;border:none;border-radius:var(--r-sm);font-size:.95rem;font-weight:500;cursor:pointer;transition:var(--tr);white-space:nowrap;user-select:none;position:relative;overflow:hidden}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn:active{transform:scale(.98)}
.btn-default{background:var(--gray);color:var(--txt)}.btn-default:hover{background:#d5d5d5}
.btn-active{background:var(--p);color:#fff;box-shadow:0 3px 10px rgba(0,119,182,.3)}.btn-active:hover{filter:brightness(1.1)}
.btn-correct{background:var(--ok);color:#fff}.btn-correct:hover{filter:brightness(1.1)}
.btn-warning{background:var(--warn);color:var(--dark)}.btn-warning:hover{filter:brightness(1.05)}
.btn-error{background:var(--err);color:#fff}.btn-error:hover{filter:brightness(1.1)}
.btn-dark{background:var(--dark);color:#fff}.btn-dark:hover{filter:brightness(1.2)}
.btn-outline{background:transparent;color:var(--p);border:1.5px solid var(--p)}.btn-outline:hover{background:var(--p);color:#fff}
.btn-ghost{background:transparent;color:var(--muted)}.btn-ghost:hover{background:var(--gray);color:var(--txt)}
.btn-link{background:transparent;color:var(--p);padding:0;border-radius:0;text-decoration:underline}.btn-link:hover{color:#005f91}
.btn-soft{background:var(--c-primary-soft);color:var(--p)}.btn-soft:hover{background:rgba(0,119,182,.15)}
.btn-sm{padding:.35rem .85rem;font-size:.82rem}.btn-lg{padding:.85rem 2rem;font-size:1.05rem}
.btn-pill{border-radius:50px}.btn-block{width:100%;justify-content:center}
.btn-icon{padding:.6rem;border-radius:50%;width:2.2rem;height:2.2rem;justify-content:center}`;

const CSS_CARD = `.card{display:flex;flex-direction:column;background:#fff;border-radius:var(--r-md);overflow:hidden;box-shadow:var(--sh-sm);transition:var(--tr);color:inherit;border:1px solid transparent}
.card-hover:hover{box-shadow:var(--sh-md);transform:translateY(-3px)}
.card-dark{background:var(--dark);color:#fff}
.card-border{border-color:var(--gray);box-shadow:none}
.card-image{width:100%;object-fit:cover}
.card-body{padding:1.25rem;flex:1}
.card-title{font-size:1.1rem;font-weight:600;margin-bottom:.5rem}
.card-text{font-size:.9rem;color:var(--muted);line-height:1.6}
.card-footer{padding:.75rem 1.25rem;border-top:1px solid var(--gray);display:flex;gap:.5rem}
.card-dark .card-text{color:rgba(255,255,255,.6)}.card-dark .card-footer{border-color:rgba(255,255,255,.1)}
.card-horizontal{flex-direction:row}.card-horizontal .card-image{width:200px;height:auto}`;

const CSS_BADGE = `.noshi-badge{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .65rem;border-radius:20px;font-size:.75rem;font-weight:600;white-space:nowrap}
.noshi-badge-info{background:rgba(0,119,182,.12);color:var(--p)}.noshi-badge-success{background:rgba(88,129,87,.12);color:var(--ok)}
.noshi-badge-warning{background:rgba(255,201,113,.2);color:#a06000}.noshi-badge-error{background:rgba(158,42,43,.1);color:var(--err)}
.noshi-badge-dark{background:var(--dark);color:#fff}.noshi-badge-gray{background:var(--gray);color:var(--muted)}
.noshi-badge-outline{background:transparent;border:1px solid currentColor}
.noshi-badge-dot::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:currentColor}`;

const CSS_NOTE = `.noshi-note{display:flex;align-items:stretch;border-radius:var(--r-sm);overflow:hidden;border:1px solid var(--gray);box-shadow:var(--sh-sm);margin:.5rem 0}
.noshi-note-icon{display:flex;align-items:center;justify-content:center;min-width:48px;font-size:1.2rem;color:#fff;padding:0 .75rem;background:var(--dark)}
.noshi-note-body{padding:.85rem 1rem;flex:1;font-size:.9rem;line-height:1.55;color:var(--txt)}
.noshi-note-success .noshi-note-icon{background:var(--ok)}.noshi-note-success .noshi-note-body{background:rgba(88,129,87,.05)}
.noshi-note-warning .noshi-note-icon{background:var(--warn);color:var(--dark)}.noshi-note-warning .noshi-note-body{background:rgba(255,201,113,.07)}
.noshi-note-error .noshi-note-icon{background:var(--err)}.noshi-note-error .noshi-note-body{background:rgba(158,42,43,.04)}
.noshi-note-glass{background:rgba(255,255,255,.1);backdrop-filter:blur(10px);border-color:rgba(255,255,255,.2)}`;

NoshiBuilder.prototype.button = function(info) {
    NoshiStyles.inject('buttons', CSS_BTN);
    let cls = 'btn btn-' + (info.class || 'default');
    if (info.pill) cls += ' btn-pill';
    if (info.block) cls += ' btn-block';
    if (info.size) cls += ' btn-' + info.size;
    if (info.variant) cls += ' btn-' + info.variant;
    
    const children = [];
    const addIcon = () => {
        if (info.icon instanceof Node) children.push(info.icon);
        else if (typeof info.icon === 'string' && info.icon) {
            // Check if it's a built-in icon name or a class
            const builtIn = window.NoshiIcon ? window.NoshiIcon(info.icon, { size: info.size==='sm'?14:16 }) : null;
            if (builtIn) children.push(builtIn);
            else children.push(new NoshiCE({ tag:'i', class: info.icon }).tag);
        }
    };
    
    if (info.icon && info.iconPos !== 'right') addIcon();
    if (info.text || info.label) children.push(info.text || info.label);
    if (info.icon && info.iconPos === 'right') addIcon();
    
    return new NoshiCE({ tag:'button', class: cls, disabled: info.disabled, click: info.click||null, child: children, title: info.title||null }).tag;
};

NoshiBuilder.prototype.card = function(info) {
    NoshiStyles.inject('cards', CSS_CARD);
    const children = [];
    if (info.image) children.push(new NoshiCE({ tag:'img', class:'card-image', src: info.image, alt: info.title||'', style: info.imageHeight ? `height:${info.imageHeight}` : '' }).tag);
    const bodyChildren = [];
    if (info.title) bodyChildren.push(new NoshiCE({ tag:'div', class:'card-title', text: info.title }).tag);
    if (info.text || info.content) bodyChildren.push(new NoshiCE({ tag:'div', class:'card-text', html: info.text || info.content }).tag);
    children.push(new NoshiCE({ tag:'div', class:'card-body', child: bodyChildren }).tag);
    
    if (info.button || info.footer) {
        const foot = new NoshiCE({ tag:'div', class:'card-footer' }).tag;
        if (info.button) {
            const btn = this.button(typeof info.button==='string' ? { text: info.button, class:'active' } : { class:'active', ...info.button });
            foot.appendChild(btn);
        }
        if (info.footer) {
            if (info.footer instanceof Node) foot.appendChild(info.footer);
            else foot.innerHTML += info.footer;
        }
        children.push(foot);
    }
    
    let cls = 'card';
    if (info.mode === 'dark') cls += ' card-dark';
    if (info.hover !== false) cls += ' card-hover';
    if (info.variant) cls += ' card-' + info.variant;
    if (info.horizontal) cls += ' card-horizontal';
    
    return new NoshiCE({ tag: info.link ? 'a' : 'div', class: cls, href: info.link||null, child: children }).tag;
};

NoshiBuilder.prototype.badge = function(info) {
    NoshiStyles.inject('badges', CSS_BADGE);
    let cls = `noshi-badge noshi-badge-${info.type||'gray'}`;
    if (info.dot) cls += ' noshi-badge-dot';
    if (info.variant === 'outline') cls += ' noshi-badge-outline';
    return new NoshiCE({ tag:'span', class: cls, text: info.text||'' }).tag;
};

NoshiBuilder.prototype.note = function(info) {
    NoshiStyles.inject('notes', CSS_NOTE);
    const type = info.class || 'default';
    const iconWrap = document.createElement('div');
    iconWrap.className = 'noshi-note-icon';
    if (info.icon instanceof Node) iconWrap.appendChild(info.icon);
    else if (typeof info.icon === 'string' && info.icon) {
        const builtIn = window.NoshiIcon ? window.NoshiIcon(info.icon, { size: 20, color:'#fff' }) : null;
        if (builtIn) iconWrap.appendChild(builtIn);
        else iconWrap.innerHTML = '<i class="' + info.icon + '"></i>';
    }
    else iconWrap.innerHTML = '&#9432;';
    const body = new NoshiCE({ tag:'div', class:'noshi-note-body', html: info.text || info.content || '' }).tag;
    let cls = 'noshi-note noshi-note-'+type;
    if (info.variant === 'glass') cls += ' noshi-note-glass';
    return new NoshiCE({ tag:'div', class: cls, child:[iconWrap, body] }).tag;
};

// Register tags
NoshiRegistry.define('button', NoshiBuilder.prototype.button);
NoshiRegistry.define('btn', NoshiBuilder.prototype.button);
NoshiRegistry.define('card', NoshiBuilder.prototype.card);
NoshiRegistry.define('badge', NoshiBuilder.prototype.badge);
NoshiRegistry.define('note', NoshiBuilder.prototype.note);
