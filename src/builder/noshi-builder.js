/**
 * Noshi v2.0 — The Component Factory
 */
window.NoshiBuilder = function() {
    this._e = () => document.createElement('div');
};
const NoshiBuilder = window.NoshiBuilder;

// Registry for custom elements
window.NoshiRegistry = {
    components: {},
    _pending: [],
    define(name, componentFn) {
        this.components[name] = componentFn;
        this._pending.push({ name, componentFn });
    },
    init() {
        this._pending.forEach(({ name, componentFn }) => {
            class NoshiElement extends HTMLElement {
                constructor() {
                    super();
                    this._rendered = false;
                }
                connectedCallback() {
                    if (this._rendered) return;
                    
                    requestAnimationFrame(() => {
                        const props = {};
                        for (const attr of this.attributes) {
                            let val = attr.value;
                            if (val === 'true') val = true;
                            else if (val === 'false') val = false;
                            else if (!isNaN(val) && val !== '') val = Number(val);
                            
                            if (attr.name.startsWith('on') || attr.name === 'click' || attr.name === 'change') {
                                const eventCode = val;
                                props[attr.name] = (e) => {
                                    try {
                                        if (typeof eventCode === 'function') eventCode(e);
                                        else new Function('event', 'Noshi', 'b', eventCode)(e, window.Noshi, new window.NoshiBuilder());
                                    } catch(err) { console.error('Noshi Event Error:', err); }
                                };
                            } else {
                                props[attr.name] = val;
                            }
                        }
                        
                        const children = Array.from(this.children);
                        if (children.length > 0 && !props.items && !props.tabs && !props.fields) {
                            const items = children.map(child => {
                                const item = { content: child.innerHTML, title: child.getAttribute('title') || child.getAttribute('label') || '' };
                                for (const a of child.attributes) item[a.name] = a.value;
                                return item;
                            });
                            const n = name.toLowerCase();
                            if (n === 'tabs') props.tabs = items;
                            else if (n === 'accordion') props.items = items;
                            else if (n === 'stepper') props.steps = items;
                            else if (n === 'form') props.fields = items;
                            else if (n === 'slider') props.images = items;
                            else props.items = items;
                        }

                        const b = new NoshiBuilder();
                        const el = componentFn.call(b, props);
                        this.innerHTML = '';
                        if (el instanceof HTMLElement) this.appendChild(el);
                        this._rendered = true;
                    });
                }
            }
            const tagName = name.toLowerCase();
            if (!customElements.get(`noshi-${tagName}`)) {
                customElements.define(`noshi-${tagName}`, NoshiElement);
                customElements.define(`n-${tagName}`, class extends NoshiElement {});
            }
        });
        this._pending = [];
    }
};
const NoshiRegistry = window.NoshiRegistry;
