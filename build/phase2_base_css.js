/**
 * Noshi v2.0 - Phase 2: Base CSS Strings
 * All foundational styles embedded as JS template literals.
 * Injected once on library init via NoshiStyles.inject().
 */
const CSS_BASE = `
:root {
    --noshi-primary: #0077b6;
    --noshi-secondary: #588157;
    --noshi-error: #9e2a2b;
    --noshi-warning: #ffc971;
    --noshi-success: #588157;
    --noshi-dark: #222222;
    --noshi-light: #fdfdfd;
    --noshi-gray: #e5e5e5;
    --noshi-text: #444444;
    --noshi-text-muted: #888888;
    --noshi-shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
    --noshi-shadow-md: 0 4px 12px rgba(0,0,0,0.1);
    --noshi-shadow-lg: 0 10px 30px rgba(0,0,0,0.12);
    --noshi-radius-sm: 6px;
    --noshi-radius-md: 10px;
    --noshi-radius-lg: 16px;
    --noshi-transition: all 0.25s ease;
    --noshi-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--noshi-font); color: var(--noshi-text); display: flex; flex-direction: column; }
a { text-decoration: none; color: inherit; }
.noshi-dark-mode {
    --noshi-light: #1e1e1e;
    --noshi-gray: #333;
    --noshi-dark: #f0f0f0;
    --noshi-text: #e0e0e0;
    --noshi-text-muted: #aaa;
    background-color: #121212;
}
[dir="rtl"] .input-holder, [dir="rtl"] .btn-holder, [dir="rtl"] .note-holder { flex-direction: row-reverse; }
.error-screen { padding:1em; margin:1em; background:#fff3f3; border:1px solid var(--noshi-error); color:var(--noshi-error); border-radius:var(--noshi-radius-sm); }
`;

const CSS_UTILS = `
.w5{width:5%} .w10{width:10%} .w20{width:20%} .w25{width:25%} .w30{width:30%}
.w33{width:33.33%} .w40{width:40%} .w50{width:50%} .w60{width:60%} .w70{width:70%}
.w75{width:75%} .w80{width:80%} .w90{width:90%} .w100{width:100%}
.h25{height:25vh} .h50{height:50vh} .h75{height:75vh} .h100{height:100vh}
.flex{display:flex} .flex-col{flex-direction:column} .flex-row{flex-direction:row}
.flex-1{flex:1} .flex-wrap{flex-wrap:wrap}
.jc-center{justify-content:center} .jc-end{justify-content:flex-end}
.jc-between{justify-content:space-between} .jc-around{justify-content:space-around}
.ai-center{align-items:center} .ai-end{align-items:flex-end} .ai-start{align-items:flex-start}
.left{text-align:left} .right{text-align:right} .center{text-align:center} .justify{text-align:justify}
.bold{font-weight:700} .italic{font-style:italic} .underline{text-decoration:underline}
.xsmall{font-size:.7em} .small{font-size:.85em} .large{font-size:1.2em} .xlarge{font-size:1.5em}
.p1{padding:.5rem} .p2{padding:1rem} .p3{padding:1.5rem} .p4{padding:2rem}
.m1{margin:.5rem} .m2{margin:1rem} .m3{margin:1.5rem} .m4{margin:2rem}
.mt1{margin-top:.5rem} .mt2{margin-top:1rem} .mt3{margin-top:1.5rem}
.mb1{margin-bottom:.5rem} .mb2{margin-bottom:1rem} .mb3{margin-bottom:1.5rem}
.gap1{gap:.5rem} .gap2{gap:1rem} .gap3{gap:1.5rem}
.rounded{border-radius:var(--noshi-radius-sm)} .rounded-md{border-radius:var(--noshi-radius-md)}
.shadow{box-shadow:var(--noshi-shadow-sm)} .shadow-md{box-shadow:var(--noshi-shadow-md)}
.overflow-hidden{overflow:hidden} .relative{position:relative} .absolute{position:absolute}
.cursor-pointer{cursor:pointer} .select-none{user-select:none}
.cred{color:var(--noshi-error)} .cblue{color:var(--noshi-primary)} .cgreen{color:var(--noshi-success)}
.cyellow{color:var(--noshi-warning)} .cgray{color:var(--noshi-text-muted)}
.bgred{background:var(--noshi-error)} .bgblue{background:var(--noshi-primary)}
.bggreen{background:var(--noshi-success)} .bggray{background:var(--noshi-gray)}
.bglight{background:var(--noshi-light)} .bgdark{background:var(--noshi-dark)}
`;

const CSS_ANIMATIONS = `
@keyframes noshi-spin { to { transform: rotate(360deg); } }
@keyframes noshi-fade-in { from { opacity:0; } to { opacity:1; } }
@keyframes noshi-slide-up { from { transform:translateY(16px); opacity:0; } to { transform:translateY(0); opacity:1; } }
@keyframes noshi-slide-in-right { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
@keyframes noshi-bounce { 0%,80%,100% { transform:scale(0); } 40% { transform:scale(1); } }
@keyframes noshi-progress-stripe {
    from { background-position: 40px 0; }
    to   { background-position: 0 0; }
}
.noshi-fade-in { animation: noshi-fade-in 0.3s ease; }
.noshi-slide-up { animation: noshi-slide-up 0.3s ease; }
`;
