(function(global) {
    "use strict";

    const noshi = {
        activeNavs: {
            target: "",
            state: null
        },
        version: "1.1.0"
    };

    /**
     * Noshi Create Element (NoshiCE)
     * Handles standard DOM element creation
     */
    function NoshiCE(props) {
        const tag = document.createElement(props.tag || 'div');
        
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            
            switch (prop) {
                case "tag":
                    break; // Already handled
                case "child":
                    if (Array.isArray(value)) {
                        value.forEach(c => {
                            if (c instanceof HTMLElement || c instanceof SVGElement) {
                                tag.appendChild(c);
                            }
                        });
                    }
                    break;
                case "html":
                    tag.innerHTML = value;
                    break;
                case "text":
                    tag.textContent = value;
                    break;
                case "src":
                    if (["script", "img", "iframe"].indexOf(props.tag) !== -1) {
                        tag.setAttribute("src", value);
                    }
                    break;
                case "select":
                    if (value) tag.setAttribute("selected", "selected");
                    break;
                case "disabled":
                    if (value) tag.disabled = true;
                    break;
                case "required":
                    if (value) tag.required = true;
                    break;
                case "click":
                    tag.addEventListener("click", value);
                    break;
                case "dbclick":
                    tag.addEventListener("dblclick", value);
                    break;
                case "class":
                    tag.className = value;
                    break;
                // Skip internal props used by NoshiBuilder
                case "options": case "sort": case "images": case "slideTime": 
                case "imageWidth": case "imageHeight": case "imagePos": 
                case "cardTitle": case "cardText": case "image":
                    break;
                default:
                    if (value !== undefined && value !== null) {
                        tag.setAttribute(prop, value);
                    }
                    break;
            }
        });
        
        this.tag = tag;
    }
    /**
     * Noshi Create Element Namespace (NoshiCENS)
     * Handles SVG element creation
     */
    function NoshiCENS(props) {
        const namespace = props.namespace || "http://www.w3.org/2000/svg";
        const tagType = props.tag || "svg";
        const tag = document.createElementNS(namespace, tagType);
        
        Object.keys(props).forEach(key => {
            const value = props[key];
            
            switch (key) {
                case "namespace":
                case "tag":
                    break;
                case "child":
                    if (Array.isArray(value)) {
                        value.forEach(c => tag.appendChild(c));
                    } else {
                        console.error("Noshi Error: 'child' must be an array for SVG elements");
                    }
                    break;
                case "strokeWidth":
                    tag.setAttributeNS(null, "stroke-width", value);
                    break;
                case "text":
                    tag.textContent = value;
                    break;
                case "class":
                    tag.setAttributeNS(null, "class", value);
                    break;
                default:
                    tag.setAttributeNS(null, key, value);
                    break;
            }
        });
        this.tag = tag;
    }
    /**
     * NoshiBuilder
     * Main toolkit for building high-level UI components
     */
    function NoshiBuilder() {
        const et = new NoshiCE({ tag: "div" }).tag;

        this.select = (info) => {
            if (!info.options || info.options.length === 0) {
                errorScreen("Error: select <b>options</b> can't be empty.");
                return et;
            }

            if (info.sort === "az") info.options.sort();
            if (info.sort === "za") info.options.sort().reverse();

            const options = info.options.map((opt, i) => {
                const val = info.mode === "index" ? i.toString() : opt;
                return new NoshiCE({
                    tag: "option",
                    value: val,
                    text: opt,
                    select: info.value === opt
                }).tag;
            });

            const selectInfo = Object.assign({}, info, {
                tag: "select",
                child: options,
                class: "select " + (info.class || "")
            });

            return new NoshiCE(selectInfo).tag;
        };

        this.input = (info) => {
            const inputInfo = Object.assign({}, info, { tag: "input" });
            
            if (info.type === "radio" || info.type === "checkbox") {
                inputInfo.class = "input-" + info.type;
                return new NoshiCE({
                    tag: "div",
                    class: "input-holder",
                    child: [
                        new NoshiCE({
                            tag: "label",
                            for: info.id,
                            class: "input-label",
                            text: info.text
                        }).tag,
                        new NoshiCE(inputInfo).tag
                    ]
                }).tag;
            }

            inputInfo.class = "input " + (info.class || "");
            return new NoshiCE(inputInfo).tag;
        };

        this.slider = (info) => {
            if (!info || !info.images || !Array.isArray(info.images) || info.images.length === 0) {
                errorScreen("Error: slider requires an <b>images</b> array.");
                return et;
            }

            let imgStyle = "";
            if (info.imageWidth) imgStyle += `width: ${typeof info.imageWidth === 'number' ? info.imageWidth + 'px' : info.imageWidth};`;
            if (info.imageHeight) imgStyle += `height: ${typeof info.imageHeight === 'number' ? info.imageHeight + 'px' : info.imageHeight};`;
            
            if (info.imagePos === "top") imgStyle += "transform: none; top: 0; left: unset;";
            else if (info.imagePos === "bottom") imgStyle += "transform: none; bottom: 0; top: unset; left: unset;";

            const slideTime = (typeof info.slideTime === "number" && info.slideTime > 0) ? info.slideTime : 5;

            const images = info.images.map(img => new NoshiCE({
                tag: "img",
                alt: img,
                src: img,
                class: "slider-img",
                style: imgStyle
            }).tag);

            return new NoshiCE({
                tag: "div",
                class: "slider",
                "data-slide-time": slideTime,
                child: images,
                ...info
            }).tag;
        };

        this.form = (info) => {
            if (!info || Object.keys(info).length === 0) {
                errorScreen("Error: no information has been passed to <b>form</b>");
                return et;
            }

            const formFields = [];
            
            if (info.title) {
                formFields.push(new NoshiCE({
                    tag: "p",
                    class: "form-title",
                    text: info.title
                }).tag);
            }

            if (info.fields && Array.isArray(info.fields)) {
                info.fields.forEach(fi => {
                    const fieldRow = new NoshiCE({ tag: "div", class: "form-field-row" }).tag;
                    const inpInfo = { ...fi };
                    
                    let field;
                    if (fi.type === "select") {
                        field = this.select(inpInfo);
                    } else {
                        field = this.input(inpInfo);
                    }
                    fieldRow.appendChild(field);
                    formFields.push(fieldRow);
                });
            }

            if (info.buttons && Array.isArray(info.buttons)) {
                const btns = info.buttons.map(btn => new NoshiCE({
                    tag: "button",
                    text: btn.text || "Button",
                    class: "form-btn" + (btn.active ? "-active" : ""),
                    click: btn.function
                }).tag);

                formFields.push(new NoshiCE({
                    tag: "div",
                    class: "form-btns-holder",
                    child: btns
                }).tag);
            }

            return new NoshiCE({
                tag: "form",
                class: "form-holder",
                method: info.method || "POST",
                action: info.action || "",
                style: info.formWidth ? `width:${info.formWidth};` : "",
                child: formFields
            }).tag;
        };

        this.card = (info) => {
            const title = info.title || "Untitled";
            const text = info.text || "No text";
            const mode = info.mode === "dark" ? "-dark" : "";
            const hover = info.link ? "-hover" : "";
            const cardClass = `card-holder${mode}${hover}`;
            const target = info.target === "blank" ? "_blank" : "_self";

            const cardImage = info.image ? new NoshiCE({
                tag: "img",
                src: info.image,
                alt: info.image,
                style: `height: ${info.imageHeight || 'auto'}; width: ${info.imageWidth || '100%'};`,
                class: "card-image"
            }).tag : et;

            const txtHolder = new NoshiCE({
                tag: "div",
                class: "card-txt-holder",
                child: [
                    new NoshiCE({ tag: "p", text: title, class: "card-title" }).tag,
                    new NoshiCE({ tag: "p", text: text, class: "card-text" }).tag
                ]
            }).tag;

            let cardButton = et;
            if (info.button) {
                const btnPos = info.button.position === "center" ? "center" : (info.button.position === "end" ? "flex-end" : "flex-start");
                cardButton = new NoshiCE({
                    tag: "div",
                    class: "card-btn-holder",
                    style: `justify-content:${btnPos};`,
                    child: [new NoshiCE({
                        tag: "button",
                        class: "card-btn",
                        text: info.button.text || "Click",
                        click: info.button.action
                    }).tag]
                }).tag;
            }

            return new NoshiCE({
                tag: "a",
                href: info.link || "#",
                target: target,
                class: cardClass,
                style: info.size === "fit" ? "align-self: flex-start;" : "",
                child: [cardImage, txtHolder, cardButton]
            }).tag;
        };

        this.note = (info) => {
            if (!info.text) {
                errorScreen("Error: you must set <b>text</b> property for note");
                return et;
            }

            const typeClass = ["warning", "error", "correct"].includes(info.class) ? "-" + info.class : "";
            
            const txt = new NoshiCE({
                tag: "p",
                class: "note-text" + typeClass,
                text: info.text
            }).tag;

            const ico = info.icon ? new NoshiCE({
                tag: "i",
                class: "note-icon" + typeClass + " " + info.icon
            }).tag : et;

            return new NoshiCE({
                tag: "div",
                class: "note-holder" + typeClass,
                child: [ico, txt]
            }).tag;
        };

        this.button = (info) => {
            if (!info.text && !info.icon) {
                errorScreen("Error: button requires <b>text</b> and/or <b>icon</b>");
                return et;
            }

            const btnText = info.text ? new NoshiCE({ tag: "p", class: "btn-holder-text", text: info.text }).tag : et;
            const btnIcon = info.icon ? new NoshiCE({ tag: "i", class: "btn-holder-icon " + info.icon }).tag : et;
            
            const btnChild = info.iconPos === "right" ? [btnText, btnIcon] : [btnIcon, btnText];
            const btnClass = "btn-holder" + (["warning", "error", "correct", "active", "dark"].includes(info.class) ? "-" + info.class : "");

            return new NoshiCE({
                tag: "button",
                class: btnClass,
                disabled: !!info.disabled,
                click: typeof info.click === "function" ? info.click : null,
                child: btnChild
            }).tag;
        };

        this.code = (info) => {
            if (!info.code) {
                errorScreen("Error: code property missing");
                return et;
            }

            let c = info.code.replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;");
            const target = (info.target || "").toLowerCase();

            if (target === "html") {
                c = c.replace(/<|>/g, x => `<html-tag-border>${x}</html-tag-border>`)
                     .replace(/\s[a-z]+=/gi, x => `<html-tag-attr>${x}</html-tag-attr>`)
                     .replace(/["'][\s0-9a-z/.-]+['"]/gi, x => `<html-tag-attr-val>${x}</html-tag-attr-val>`);
            } else if (target === "css") {
                c = c.replace(/@[a-zA-Z0-9-"'\(\)\.\s]+;|@[a-zA-Z0-9-\s]+/g, x => `<css-head>${x}</css-head>`)
                     .replace(/{|}/g, x => `<css-brackets>${x}</css-brackets>`)
                     .replace(/[a-zA-Z0-9-]+:/g, x => `<css-property>${x.slice(0, -1)}</css-property>:`)
                     .replace(/:[a-zA-Z0-9-\s\(\)\.]+/g, x => `<css-value>${x}</css-value>`);
            } else if (target === "js") {
                c = c.replace(/var |let |const |new /g, x => `<js-var>${x.trim()}</js-var> `)
                     .replace(/['"][a-zA-Z!,0-9-:;<>\./\(\)\s]+['"]/g, x => `<js-txt>${x}</js-txt>`)
                     .replace(/{|}/g, x => `<js-bracket>${x}</js-bracket>`)
                     .replace(/[a-z]+\(\)|[a-z]+\(|\)/gi, x => `<js-func>${x}</js-func>`);
            }

            c = c.split('\n').map(line => `<code-line>${line}</code-line>`).join('');

            return new NoshiCE({
                tag: "code",
                class: "noshi-code",
                html: c
            }).tag;
        };

        this.graph = (info) => {
            if (!info || !info.data || !Array.isArray(info.data)) {
                errorScreen("Error: graph requires a <b>data</b> array.");
                return et;
            }

            const gHeight = info.graph && info.graph.height ? info.graph.height : "300px";
            const gWidth = info.graph && info.graph.width ? info.graph.width : "100%";
            const gBg = info.graph && info.graph.backgroundColor ? info.graph.backgroundColor : "var(--noshi-light)";

            const height = parseInt(gHeight) - 40;
            const width = 1000; // Internal SVG coordinate space
            const colors = ["#0077b6", "#9e2a2b", "#588157", "#ffc971", "#purple", "#cyan"];

            const svgElements = [];

            info.data.forEach((dataSet, setIdx) => {
                const color = (info.style && info.style[setIdx] && info.style[setIdx].color) || colors[setIdx % colors.length];
                const step = width / (dataSet.length - 1);
                const max = Math.max(...dataSet.flat()) || 1;

                const points = dataSet.map((val, i) => {
                    const x = i * step;
                    const y = height - (val / max * height);
                    return [x, y];
                });

                if (info.graph && info.graph.type === "area") {
                    const polyPoints = [[0, height], ...points, [width, height]].map(p => p.join(",")).join(" ");
                    svgElements.push(new NoshiCENS({
                        tag: "polygon",
                        points: polyPoints,
                        fill: color,
                        style: "opacity: 0.3"
                    }).tag);
                }

                const pathData = "M " + points.map(p => p.join(" ")).join(" L ");
                svgElements.push(new NoshiCENS({
                    tag: "path",
                    d: pathData,
                    stroke: color,
                    strokeWidth: 3,
                    fill: "none"
                }).tag);

                if (info.graph && info.graph.points !== false) {
                    points.forEach(p => {
                        svgElements.push(new NoshiCENS({
                            tag: "circle",
                            cx: p[0],
                            cy: p[1],
                            r: 5,
                            fill: color,
                            stroke: "#fff",
                            strokeWidth: 2
                        }).tag);
                    });
                }
            });

            const svg = new NoshiCENS({
                tag: "svg",
                viewBox: `0 0 ${width} ${height + 20}`,
                width: "100%",
                height: gHeight,
                style: `background-color: ${gBg};`,
                child: svgElements
            }).tag;

            const header = info.head ? new NoshiCE({
                tag: "div",
                class: "graph-head pad-05 bold",
                text: info.head.title || "Graph",
                style: `background: ${info.head.backgroundColor || 'var(--noshi-gray)'}; color: ${info.head.color || 'var(--noshi-text)'};`
            }).tag : et;

            return new NoshiCE({
                tag: "div",
                class: "graph-holder",
                style: `border: 1px solid var(--noshi-gray); margin: 1em 0;`,
                child: [header, svg]
            }).tag;
        };
    }
        };
    }
    /**
     * Slider Logic
     */
    const _sliders = () => {
        const sliders = _("slider", true, false);
        if (!sliders) return;

        Array.from(sliders).forEach(slider => {
            const children = slider.childNodes;
            const type = slider.getAttribute("type");
            const time = Number(slider.getAttribute("data-slide-time")) || 5;
            
            if (children.length <= 1) return;

            let current = 0;
            const slide = () => {
                const prev = current;
                current = (current + 1) % children.length;
                
                children[prev].style.opacity = "0";
                children[prev].style.zIndex = "-1";
                children[prev].style.visibility = "hidden";

                children[current].style.opacity = "1";
                children[current].style.zIndex = "1";
                children[current].style.visibility = "visible";
            };

            // Initial state
            Array.from(children).forEach((child, i) => {
                child.style.transition = "opacity 0.5s ease";
                if (i === 0) {
                    child.style.opacity = "1";
                    child.style.zIndex = "1";
                    child.style.visibility = "visible";
                } else {
                    child.style.opacity = "0";
                    child.style.zIndex = "-1";
                    child.style.visibility = "hidden";
                }
            });

            window.setInterval(slide, time * 1000);
        });
    };

    /**
     * Loading State
     */
    const loading = (info = {}) => {
        const existing = _("noshi-loading-holder", false, false);
        if (existing) {
            existing.remove();
            return;
        }

        const holder = new NoshiCE({
            tag: "div",
            id: "noshi-loading-holder",
            class: "noshi-loading-holder",
            style: `width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; position: fixed; left: 0; top: 0; z-index: 10000; background-color: ${info.backgroundColor || 'rgba(255,255,255,0.8)'};`
        }).tag;

        let content;
        switch (info.type) {
            case "circle":
                content = new NoshiCE({
                    tag: "div",
                    style: "width: 40px; height: 40px; border: 4px solid var(--noshi-gray); border-top-color: var(--noshi-primary); border-radius: 50%; animation: rotate360 1s infinite linear;"
                }).tag;
                break;
            case "dots":
                const dots = [1, 2, 3, 4].map(i => new NoshiCE({
                    tag: "div",
                    style: `width: 12px; height: 12px; margin: 0 5px; border-radius: 50%; background-color: var(--noshi-primary); animation: loading-dots 1s infinite; animation-delay: ${i * 0.2}s;`
                }).tag);
                content = new NoshiCE({ tag: "div", class: "loading-dots-holder", style: "display: flex;", child: dots }).tag;
                break;
            default:
                content = new NoshiCE({ tag: "p", text: info.text || "Loading...", class: "xlarge bold" }).tag;
        }

        holder.appendChild(content);
        document.body.appendChild(holder);
    };

    /**
     * AJAX (Promise-based)
     */
    const ajax = (config) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const method = (config.method || "GET").toUpperCase();
            const url = config.url;
            
            xhr.open(method, url, true);
            
            if (config.headers) {
                Object.keys(config.headers).forEach(key => xhr.setRequestHeader(key, config.headers[key]));
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.responseText);
                    } else {
                        reject({ status: xhr.status, text: xhr.statusText });
                    }
                }
            };

            xhr.onerror = () => reject({ status: xhr.status, text: "Network Error" });
            
            xhr.send(config.data || null);
        });
    };

    /**
     * Selector Helper
     */
    const _ = (selector, multi = false, err = true) => {
        try {
            const results = multi ? document.querySelectorAll(selector) : document.querySelector(selector);
            if (!results && err) {
                errorScreen(`Error: Element '${selector}' not found.`);
            }
            return results;
        } catch (e) {
            // Fallback for ID/Class search if selector is not a valid CSS selector
            const byId = document.getElementById(selector);
            if (byId) return multi ? [byId] : byId;
            
            const byClass = document.getElementsByClassName(selector);
            if (byClass.length > 0) return multi ? byClass : byClass[0];

            if (err) errorScreen(`Error: Selector '${selector}' failed.`);
            return null;
        }
    };

    /**
     * Error Screen
     */
    const errorScreen = (msg) => {
        console.error("Noshi Error:", msg);
        const errDiv = new NoshiCE({
            tag: "div",
            class: "error-screen",
            html: `<b>Noshi Error:</b> ${msg}`
        }).tag;
        document.body.appendChild(errDiv);
    };

    /**
     * Language Loader
     */
    const _setLang = () => {
        const lang = document.documentElement.lang || "en";
        const script = new NoshiCE({
            tag: "script",
            src: `./lang/${lang}.js`,
            type: "application/javascript"
        }).tag;
        document.head.appendChild(script);
        document.body.setAttribute("data-noshi-lang", lang);
    };

    /**
     * Navigation Logic
     */
    const _activeNavs = () => {
        const navs = _(".nav-menu-head", true, false);
        if (!navs) return;

        navs.forEach(nav => {
            nav.addEventListener("click", () => {
                const targetId = nav.getAttribute("data-target");
                const target = _(`#${targetId}`) || _(`.${targetId}`);
                
                if (!target) return;

                const isOpen = nav.getAttribute("data-status") === "true";
                
                // Close others if needed
                if (!isOpen && noshi.activeNavs.target) {
                    const prevTarget = _(`#${noshi.activeNavs.target}`) || _(`.${noshi.activeNavs.target}`);
                    if (prevTarget) prevTarget.style.display = "none";
                    if (noshi.activeNavs.state) noshi.activeNavs.state.setAttribute("data-status", "false");
                }

                if (isOpen) {
                    target.style.display = "none";
                    nav.setAttribute("data-status", "false");
                    noshi.activeNavs.target = "";
                    noshi.activeNavs.state = null;
                } else {
                    target.style.display = "flex";
                    nav.setAttribute("data-status", "true");
                    noshi.activeNavs.target = targetId;
                    noshi.activeNavs.state = nav;
                }
            });
        });
    };

    /**
     * Initialize Noshi
     */
    const startNoshi = (funcs) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => funcs.forEach(f => f()));
        } else {
            funcs.forEach(f => f());
        }
    };

    // Export to global namespace
    global.noshi = noshi;
    global.NoshiCE = NoshiCE;
    global.NoshiCENS = NoshiCENS;
    global.NoshiBuilder = NoshiBuilder;
    global.Noshi = {
        ajax,
        loading,
        _,
        errorScreen,
        start: startNoshi
    };

    // Auto-start core features
    startNoshi([_setLang, _activeNavs, _sliders]);

})(typeof window !== "undefined" ? window : this);
