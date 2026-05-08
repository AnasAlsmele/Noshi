/**
 * Noshi v2.0 - Phase 4: New Components A
 * CSS strings + Builder methods for: badge, progress, statsCard
 */

// ─── CSS ────────────────────────────────────────────────────────────────────

const CSS_BADGES = `
.noshi-badge { display:inline-flex; align-items:center; gap:.3rem; padding:.2rem .65rem; border-radius:20px; font-size:.75rem; font-weight:600; white-space:nowrap; }
.noshi-badge-info    { background:rgba(0,119,182,.12); color:var(--noshi-primary); }
.noshi-badge-success { background:rgba(88,129,87,.12); color:var(--noshi-success); }
.noshi-badge-warning { background:rgba(255,201,113,.2); color:#a06000; }
.noshi-badge-error   { background:rgba(158,42,43,.1); color:var(--noshi-error); }
.noshi-badge-dark    { background:var(--noshi-dark); color:#fff; }
.noshi-badge-gray    { background:var(--noshi-gray); color:var(--noshi-text-muted); }
.noshi-badge-dot::before { content:''; display:inline-block; width:7px; height:7px; border-radius:50%; background:currentColor; }
`;

const CSS_PROGRESS = `
.noshi-progress-wrap { width:100%; }
.noshi-progress-label { display:flex; justify-content:space-between; font-size:.83rem; color:var(--noshi-text-muted); margin-bottom:.4rem; }
.noshi-progress-track { width:100%; height:10px; background:var(--noshi-gray); border-radius:20px; overflow:hidden; }
.noshi-progress-bar { height:100%; border-radius:20px; transition:width .6s ease; background:var(--noshi-primary); }
.noshi-progress-striped .noshi-progress-bar {
    background-image:linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent);
    background-size:40px 40px;
    animation:noshi-progress-stripe .8s linear infinite;
}
.noshi-progress-sm .noshi-progress-track { height:6px; }
.noshi-progress-lg .noshi-progress-track { height:16px; }
.noshi-progress-success .noshi-progress-bar { background:var(--noshi-success); }
.noshi-progress-warning .noshi-progress-bar { background:var(--noshi-warning); }
.noshi-progress-error   .noshi-progress-bar { background:var(--noshi-error); }
`;

const CSS_STATS = `
.noshi-stats-card { display:flex; align-items:center; gap:1rem; padding:1.25rem 1.5rem; background:#fff; border-radius:var(--noshi-radius-md); box-shadow:var(--noshi-shadow-sm); border:1px solid var(--noshi-gray); transition:var(--noshi-transition); }
.noshi-stats-card:hover { box-shadow:var(--noshi-shadow-md); transform:translateY(-2px); }
.noshi-stats-icon { width:48px; height:48px; border-radius:var(--noshi-radius-sm); display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
.noshi-stats-icon-primary { background:rgba(0,119,182,.1); color:var(--noshi-primary); }
.noshi-stats-icon-success { background:rgba(88,129,87,.1); color:var(--noshi-success); }
.noshi-stats-icon-warning { background:rgba(255,201,113,.2); color:#a06000; }
.noshi-stats-icon-error   { background:rgba(158,42,43,.1); color:var(--noshi-error); }
.noshi-stats-body { flex:1; }
.noshi-stats-value { font-size:1.75rem; font-weight:700; line-height:1; color:var(--noshi-text); }
.noshi-stats-label { font-size:.83rem; color:var(--noshi-text-muted); margin-top:.25rem; }
.noshi-stats-trend { font-size:.8rem; font-weight:600; display:flex; align-items:center; gap:.2rem; margin-top:.35rem; }
.noshi-trend-up   { color:var(--noshi-success); }
.noshi-trend-down { color:var(--noshi-error); }
`;

// ─── BUILDER METHODS ────────────────────────────────────────────────────────

/**
 * builder.badge({ text, type, dot, icon })
 * type: 'info' | 'success' | 'warning' | 'error' | 'dark' | 'gray'
 */
const _buildBadge = function(info) {
    NoshiStyles.inject('badges', CSS_BADGES);
    const type = info.type || 'gray';
    const dot  = info.dot ? 'noshi-badge-dot' : '';
    const badge = new NoshiCE({
        tag: 'span',
        class: `noshi-badge noshi-badge-${type} ${dot}`.trim(),
        text: info.text || ''
    }).tag;
    if (info.icon) {
        const ico = new NoshiCE({ tag: 'i', class: info.icon }).tag;
        badge.prepend(ico);
    }
    return badge;
};

/**
 * builder.progress({ value, max, label, size, color, striped })
 * color: 'primary' | 'success' | 'warning' | 'error'
 * size:  'sm' | 'md' | 'lg'
 */
const _buildProgress = function(info) {
    NoshiStyles.inject('progress', CSS_PROGRESS);
    const value   = Math.min(Math.max(info.value || 0, 0), info.max || 100);
    const max     = info.max || 100;
    const pct     = Math.round((value / max) * 100);
    const color   = info.color || 'primary';
    const size    = info.size ? `noshi-progress-${info.size}` : '';
    const striped = info.striped ? 'noshi-progress-striped' : '';
    const colorCls = color !== 'primary' ? `noshi-progress-${color}` : '';

    const bar = new NoshiCE({ tag: 'div', class: 'noshi-progress-bar', style: `width:${pct}%` }).tag;
    const track = new NoshiCE({ tag: 'div', class: 'noshi-progress-track', child: [bar] }).tag;

    const children = [];
    if (info.label !== false) {
        const lbl = new NoshiCE({
            tag: 'div',
            class: 'noshi-progress-label',
            child: [
                new NoshiCE({ tag: 'span', text: info.label || '' }).tag,
                new NoshiCE({ tag: 'span', text: `${pct}%` }).tag
            ]
        }).tag;
        children.push(lbl);
    }
    children.push(track);

    return new NoshiCE({
        tag: 'div',
        class: `noshi-progress-wrap ${size} ${striped} ${colorCls}`.trim(),
        child: children
    }).tag;
};

/**
 * builder.statsCard({ icon, iconType, value, label, trend, trendUp })
 * iconType: 'primary' | 'success' | 'warning' | 'error'
 */
const _buildStatsCard = function(info) {
    NoshiStyles.inject('stats', CSS_STATS);
    const iconType = info.iconType || 'primary';

    const iconEl = new NoshiCE({
        tag: 'div',
        class: `noshi-stats-icon noshi-stats-icon-${iconType}`,
        child: [new NoshiCE({ tag: 'i', class: info.icon || '' }).tag]
    }).tag;
    if (!info.icon) iconEl.textContent = info.emoji || '📊';

    const valueEl = new NoshiCE({ tag: 'div', class: 'noshi-stats-value', text: String(info.value || '0') }).tag;
    const labelEl = new NoshiCE({ tag: 'div', class: 'noshi-stats-label', text: info.label || '' }).tag;

    const bodyChildren = [valueEl, labelEl];

    if (info.trend) {
        const trendDir = info.trendUp ? 'up' : 'down';
        const arrow    = info.trendUp ? '▲' : '▼';
        const trendEl  = new NoshiCE({
            tag: 'div',
            class: `noshi-stats-trend noshi-trend-${trendDir}`,
            text: `${arrow} ${info.trend}`
        }).tag;
        bodyChildren.push(trendEl);
    }

    const body = new NoshiCE({ tag: 'div', class: 'noshi-stats-body', child: bodyChildren }).tag;

    return new NoshiCE({
        tag: 'div',
        class: 'noshi-stats-card',
        child: [iconEl, body]
    }).tag;
};
