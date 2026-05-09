/**
 * Noshi v3.0 — Style Injection Engine
 */
window.NoshiStyles = {
    _injected: new Set(),
    inject(id, css) {
        if (this._injected.has(id)) return;
        const s = document.createElement('style');
        s.id = 'noshi-' + id;
        s.textContent = css;
        document.head.appendChild(s);
        this._injected.add(id);
    },
    remove(id) {
        const el = document.getElementById('noshi-' + id);
        if (el) el.remove();
        this._injected.delete(id);
    }
};

const CSS_BASE = `:root{--p:#0077b6;--s:#588157;--err:#9e2a2b;--warn:#ffc971;--ok:#588157;--dark:#222;--light:#fdfdfd;--gray:#e5e5e5;--txt:#444;--muted:#888;--sh-sm:0 2px 4px rgba(0,0,0,.05);--sh-md:0 4px 12px rgba(0,0,0,.1);--sh-lg:0 10px 30px rgba(0,0,0,.12);--r-sm:6px;--r-md:10px;--r-lg:16px;--tr:all .25s ease;--font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font);color:var(--txt);display:flex;flex-direction:column}
a{text-decoration:none;color:inherit}
.noshi-dark-mode{--light:#1e1e1e;--gray:#333;--dark:#f0f0f0;--txt:#e0e0e0;--muted:#aaa;background:#121212}
[dir=rtl] .input-holder,[dir=rtl] .btn-holder,[dir=rtl] .note-holder{flex-direction:row-reverse}
.error-screen{padding:1em;margin:1em;background:#fff3f3;border:1px solid var(--err);color:var(--err);border-radius:var(--r-sm)}`;

const CSS_UTILS = `.flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1}.flex-wrap{flex-wrap:wrap}
.jc-center{justify-content:center}.jc-end{justify-content:flex-end}.jc-between{justify-content:space-between}.jc-around{justify-content:space-around}
.ai-center{align-items:center}.ai-end{align-items:flex-end}.ai-start{align-items:flex-start}
.w25{width:25%}.w33{width:33.33%}.w50{width:50%}.w75{width:75%}.w100{width:100%}
.h50{height:50vh}.h100{height:100vh}
.left{text-align:left}.right{text-align:right}.center{text-align:center}.justify{text-align:justify}
.bold{font-weight:700}.italic{font-style:italic}.underline{text-decoration:underline}
.xsmall{font-size:.7em}.small{font-size:.85em}.large{font-size:1.2em}.xlarge{font-size:1.5em}
.p1{padding:.5rem}.p2{padding:1rem}.p3{padding:1.5rem}.p4{padding:2rem}
.m1{margin:.5rem}.m2{margin:1rem}.m3{margin:1.5rem}.m4{margin:2rem}
.mt1{margin-top:.5rem}.mt2{margin-top:1rem}.mt3{margin-top:1.5rem}
.mb1{margin-bottom:.5rem}.mb2{margin-bottom:1rem}.mb3{margin-bottom:1.5rem}
.gap1{gap:.5rem}.gap2{gap:1rem}.gap3{gap:1.5rem}
.rounded{border-radius:var(--r-sm)}.rounded-md{border-radius:var(--r-md)}
.shadow{box-shadow:var(--sh-sm)}.shadow-md{box-shadow:var(--sh-md)}
.cursor-pointer{cursor:pointer}.select-none{user-select:none}.overflow-hidden{overflow:hidden}
.cred{color:var(--err)}.cblue{color:var(--p)}.cgreen{color:var(--ok)}.cgray{color:var(--muted)}
.bgblue{background:var(--p)}.bggreen{background:var(--ok)}.bgred{background:var(--err)}.bggray{background:var(--gray)}`;

const CSS_ANIM = `@keyframes noshi-spin{to{transform:rotate(360deg)}}
@keyframes noshi-fade-in{from{opacity:0}to{opacity:1}}
@keyframes noshi-slide-up{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes noshi-slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes noshi-bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
@keyframes noshi-stripe{from{background-position:40px 0}to{background-position:0 0}}
.noshi-fade-in{animation:noshi-fade-in .3s ease}.noshi-slide-up{animation:noshi-slide-up .3s ease}`;

// Auto-inject base styles
window.NoshiStyles.inject('base', CSS_BASE + CSS_UTILS + CSS_ANIM);
window.Noshi.Styles = window.NoshiStyles;
