/**
 * Visual Components
 */
const CSS_SLIDER = `.noshi-slider{position:relative;overflow:hidden;width:100%;height:300px;background:#111}
.noshi-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity .6s ease;z-index:0}
.noshi-slide.active{opacity:1;visibility:visible;z-index:1}
.noshi-slider-dots{position:absolute;bottom:.75rem;left:50%;transform:translateX(-50%);display:flex;gap:.4rem;z-index:2}
.noshi-slider-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:var(--tr)}.noshi-slider-dot.active{background:#fff;width:24px;border-radius:4px}`;

const CSS_LOAD = `.noshi-loading-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:9999}
.noshi-spinner{width:44px;height:44px;border:4px solid var(--gray);border-top-color:var(--p);border-radius:50%;animation:noshi-spin 1s linear infinite}
.noshi-dots-holder{display:flex;gap:.35rem}
.noshi-dot{width:12px;height:12px;border-radius:50%;background:var(--p);animation:noshi-bounce 1.4s ease-in-out infinite}`;

NoshiBuilder.prototype.slider = function(info) {
    NoshiStyles.inject('slider', CSS_SLIDER);
    const slides = (info.images||[]).map((img, i) => new NoshiCE({ tag:'img', class:`noshi-slide${i===0?' active':''}`, src: img.src||img, style:`height:${info.height||'300px'}` }).tag);
    const dots = (info.images||[]).map((_, i) => new NoshiCE({ tag:'div', class:`noshi-slider-dot${i===0?' active':''}` }).tag);
    const dotsEl = new NoshiCE({ tag:'div', class:'noshi-slider-dots', child: dots }).tag;
    const wrap = new NoshiCE({ tag:'div', class:'noshi-slider', style:`height:${info.height||'300px'}`, child:[...slides, dotsEl] }).tag;
    let cur = 0;
    const go = (n) => {
        slides[cur].classList.remove('active'); dots[cur].classList.remove('active');
        cur = (n + slides.length) % slides.length;
        slides[cur].classList.add('active'); dots[cur].classList.add('active');
    };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    if (slides.length > 1) setInterval(() => go(cur + 1), (info.time || 4) * 1000);
    return wrap;
};

// Register tags
NoshiRegistry.define('slider', NoshiBuilder.prototype.slider);
