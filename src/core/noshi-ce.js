/**
 * Noshi v2.0 — Element Engines
 */
window.NoshiCE = function(props) {
    const tag = document.createElement(props.tag || 'div');
    Object.keys(props).forEach(k => {
        const v = props[k];
        switch (k) {
            case 'tag': break;
            case 'child':
                if (Array.isArray(v)) v.forEach(c => { 
                    if (c instanceof Node) tag.appendChild(c); 
                    else if (typeof c === 'string' || typeof c === 'number') tag.appendChild(document.createTextNode(c)); 
                });
                break;
            case 'html':    tag.innerHTML = v; break;
            case 'text':    tag.textContent = v; break;
            case 'class':   tag.className = v; break;
            case 'click':   if (typeof v === 'function') tag.addEventListener('click', v); break;
            case 'change':  if (typeof v === 'function') tag.addEventListener('change', v); break;
            case 'input':   if (typeof v === 'function') tag.addEventListener('input', v); break;
            case 'disabled': if (v) tag.disabled = true; break;
            case 'required': if (v) tag.required = true; break;
            case 'checked':  if (v) tag.checked = true; break;
            case 'select':   if (v) tag.setAttribute('selected', 'selected'); break;
            case 'src':
                if (['script','img','iframe','source'].includes(props.tag)) tag.setAttribute('src', v);
                break;
            default:
                if (v !== undefined && v !== null) tag.setAttribute(k, v);
        }
    });
    this.tag = tag;
};
const NoshiCE = window.NoshiCE;

window.NoshiCENS = function(props) {
    const ns  = props.namespace || 'http://www.w3.org/2000/svg';
    const tag = document.createElementNS(ns, props.tag || 'svg');
    Object.keys(props).forEach(k => {
        const v = props[k];
        switch (k) {
            case 'tag': case 'namespace': break;
            case 'child':
                if (Array.isArray(v)) v.forEach(c => tag.appendChild(c));
                break;
            case 'text':        tag.textContent = v; break;
            case 'class':       tag.setAttributeNS(null, 'class', v); break;
            case 'strokeWidth': tag.setAttributeNS(null, 'stroke-width', v); break;
            default:            tag.setAttributeNS(null, k, v);
        }
    });
    this.tag = tag;
};
const NoshiCENS = window.NoshiCENS;
