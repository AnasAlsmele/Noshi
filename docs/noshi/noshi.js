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
            var gType = "line";
            var gHeight = "300px";
            var gWidth = "100%";
            var gWidthNumber = [0, ""];
            var gBg = "#ffffff";
            if (info.graph !== undefined) {
                if (info.graph.type !== undefined) {
                    switch (info.graph.type) {
                        case "column":
                            gType = "column";
                            break;
                        case "area":
                            gType = "area";
                            break;
                        case "pie":
                            gType = "pie";
                            break;
                        default:
                            break;
                    }
                }
                if (info.graph.height !== undefined && typeof info.graph.height == "string") {
                    gHeight = info.graph.height;
                }
                if (info.graph.width !== undefined && typeof info.graph.width == "string") {
                    gWidth = info.graph.width;
                }
                gWidthNumber[1] = gWidth.replace(/[0-9]+/g, "");
                var rex = new RegExp(gWidthNumber[1], "g");
                gWidthNumber[0] = Number(gWidth.replace(rex, ""));
                gWidthNumber[0] = document.body.offsetWidth * (gWidthNumber[0] / 100);
                if (info.graph.backgroundColor !== undefined && typeof info.graph.backgroundColor == "string") {
                    gBg = info.graph.backgroundColor;
                }
            }
            var svgHPadding = 4;
            var height = Number(gHeight.match(/[0-9]+/gi)[0]) - 25;
            var width = Number(gWidth.match(/[0-9]+/gi)[0]) - svgHPadding;
            var lineColors = ["green", "red", "blue", "orange", "purple", "cyan", "pink", "black", "gray"];
            if (info.data !== undefined) {
                if (info.data.length !== 0) {
                    var lines = [];
                    var pieValues = [];
                    var columnStep = 0;
                    var _loop_1 = function (i) {
                        var areaPoints = [];
                        var curvePoints = [];
                        var lineColor = lineColors[i];
                        var lineStyle = info.style[i];
                        if (lineStyle !== undefined) {
                            if (lineStyle.color !== undefined && lineStyle.color !== "") {
                                lineColor = lineStyle.color;
                            }
                        }
                        for (var j = 0; j < info.data[i].length; j++) {
                            var dataLine = info.data[i];
                            var w = Number(gWidthNumber[0]);
                            var step = w / dataLine.length;
                            var svgShift = w / 100 * (svgHPadding / 2);
                            var maxFactor = -2;
                            var y1 = height - dataLine[j] / (Math.max.apply(Math, dataLine) - maxFactor) * height;
                            var x1 = step * j + svgShift;
                            if (dataLine.length > 1) {
                                var y2 = height - dataLine[j + 1] / (Math.max.apply(Math, dataLine) - maxFactor) * height;
                                var x2 = step * (j + 1) + svgShift;
                                if (j == info.data[i].length - 1) {
                                    y2 = y1;
                                    x2 = x1;
                                }
                                if (info.graph.grid !== undefined && info.graph.grid === true) {
                                    var gridColor = "#e5e5e5";
                                    if (info.graph.gridColor !== undefined && info.graph.gridColor !== "") {
                                        gridColor = info.graph.gridColor;
                                    }
                                    if (i == 0) {
                                        lines.push(new NoshiCENS({
                                            tag: "line",
                                            x1: x1,
                                            x2: x1,
                                            y1: 0,
                                            y2: height,
                                            stroke: gridColor
                                        }).tag);
                                        lines.push(new NoshiCENS({
                                            tag: "line",
                                            x1: svgShift / 2,
                                            x2: step * dataLine.length - svgShift,
                                            y1: y1,
                                            y2: y1,
                                            stroke: gridColor
                                        }).tag);
                                        if (info.label !== undefined) {
                                            var labelColor = "#a9a9a9";
                                            if (info.graph.labelColor !== undefined) {
                                                labelColor = info.graph.labelColor;
                                            }
                                            var xText = j;
                                            if (info.label.x !== undefined && info.label.x[j] !== undefined) {
                                                xText = info.label.x[j];
                                            }
                                            lines.push(new NoshiCENS({
                                                tag: "text",
                                                x: x1,
                                                y: height + 20,
                                                fill: labelColor,
                                                text: xText,
                                                style: "font-size: .6em;"
                                            }).tag);
                                            var yText = dataLine[j];
                                            if (info.label.y !== undefined && info.label.y[j] !== undefined) {
                                                yText = info.label.y[j];
                                            }
                                            lines.push(new NoshiCENS({
                                                tag: "text",
                                                x: 0,
                                                y: y1,
                                                fill: labelColor,
                                                text: yText,
                                                style: "font-size: .6em;"
                                            }).tag);
                                        }
                                    }
                                }
                                curvePoints.push([x1, y1]);
                                if (gType === "line" && info.graph.curve !== true) {
                                    lines.push(new NoshiCENS({
                                        tag: "line",
                                        x1: x1,
                                        x2: x2,
                                        y1: y1,
                                        y2: y2,
                                        stroke: lineColor,
                                        strokeWidth: 3
                                    }).tag);
                                }
                                if (gType === "column") {
                                    lines.push(new NoshiCENS({
                                        tag: "line",
                                        x1: x1 + columnStep,
                                        x2: x1 + columnStep,
                                        y1: y1,
                                        y2: height,
                                        stroke: lineColor,
                                        strokeWidth: 25
                                    }).tag);
                                }
                            }
                            areaPoints.push([x1, y1]);
                            if ((gType === "line" || gType === "area") && info.graph.points !== false) {
                                lines.push(new NoshiCENS({
                                    tag: "circle",
                                    cx: x1,
                                    cy: y1,
                                    r: 6,
                                    stroke: gBg,
                                    strokeWidth: 3,
                                    fill: lineColor
                                }).tag);
                            }
                        }
                        columnStep += 10;
                        if (gType === "area" && info.graph.curve !== true) {
                            var w = gWidthNumber[0];
                            var step = w / areaPoints.length;
                            var svgShift = w / 100 * (svgHPadding / 2);
                            for (var k = 0; k < areaPoints.length; k++) {
                                areaPoints[k][0] = step * k + svgShift;
                            }
                            lines.push(new NoshiCENS({
                                tag: "polygon",
                                points: "" + svgShift + "," + height + " " + areaPoints.join(" ") + " " + (areaPoints[areaPoints.length - 1][0]) + "," + height,
                                fill: lineColor,
                                style: "opacity: .4"
                            }).tag);
                        }
                        if (gType === "pie") {
                            var yMount = 0;
                            for (var i_1 = 0; i_1 < curvePoints.length; i_1++) {
                                yMount += curvePoints[i_1][1];
                            }
                            pieValues.push(yMount);
                        }
                        if (info.graph.curve === true && (gType === "line" || gType === "area")) {
                            var line_1 = function (pointA, pointB) {
                                var lx = pointB[0] - pointA[0];
                                var ly = pointB[1] - pointA[1];
                                return {
                                    length: Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2)),
                                    angle: Math.atan2(ly, lx)
                                };
                            };
                            var controlPoints_1 = function (current, prv, next, reverse) {
                                var p = prv || current;
                                var n = next || current;
                                var smoothing = .2;
                                var o = line_1(p, n);
                                var angle = o.angle + (reverse ? Math.PI : 0);
                                var length = o.length * smoothing;
                                var x = current[0] + Math.cos(angle) * length;
                                var y = current[1] + Math.sin(angle) * length;
                                return [x, y];
                            };
                            var bz = function (point, i, a) {
                                var _a = controlPoints_1(a[i - 1], a[i - 2], point, false), sx = _a[0], sy = _a[1];
                                var _b = controlPoints_1(point, a[i - 1], a[i + 1], true), ex = _b[0], ey = _b[1];
                                return "C" + sx + " " + sy + " " + ex + " " + ey + " " + point[0] + " " + point[1];
                            };
                            var points = "";
                            for (var i_2 = 1; i_2 < curvePoints.length; i_2++) {
                                points += bz(curvePoints[i_2], i_2, curvePoints);
                            }
                            var fillMode = ["transparent", 1];
                            if (info.graph.type === "area") {
                                fillMode = [lineColor, .4];
                                points = "\n                                M" + curvePoints[0][0] + " " + height + "\n                                L" + curvePoints[0][0] + " " + curvePoints[0][1] + "\n                                " + points + " \n                                L" + curvePoints[curvePoints.length - 1][0] + " " + height + "\n                                Z\n                            ";
                            }
                            else {
                                points = "M" + curvePoints[0][0] + " " + curvePoints[0][1] + " " + points;
                            }
                            if (info.graph.type !== "column") {
                                lines.push(new NoshiCENS({
                                    tag: "path",
                                    d: points,
                                    stroke: lineColor,
                                    strokeWidth: 3,
                                    fill: fillMode[0],
                                    style: "opacity: " + fillMode[1]
                                }).tag);
                            }
                        }
                    };
                    for (var i = 0; i < info.data.length; i++) {
                        _loop_1(i);
                    }
                    if (gType === "pie") {
                        var r = height / 2 - 20;
                        var bodyWidth = gWidthNumber[0];
                        lines.push(new NoshiCENS({
                            tag: "path",
                            d: "M" + bodyWidth / 2 + " " + (height / 2 - r) + " L" + bodyWidth / 2 + " " + height / 2,
                            stroke: "red",
                            strokeWidth: 3
                        }).tag);
                        var sum = pieValues.reduce(function (a, b) { return a + b; }, 0);
                        var percentage = 0;
                        for (var i = 0; i < pieValues.length; i++) {
                            percentage += pieValues[i] / sum * 360;
                            console.log(percentage);
                            var angel = percentage + 180;
                            console.log(angel);
                            var sin = -1 * Math.sin(angel * (Math.PI / 180)) * r;
                            var cos = Math.cos(angel * (Math.PI / 180)) * r;
                            lines.push(new NoshiCENS({
                                tag: "circle",
                                cx: (bodyWidth / 2) + sin,
                                cy: (height / 2) + cos,
                                r: 5,
                                stroke: "yellow",
                                strokeWidth: 5
                            }).tag);
                            lines.push(new NoshiCENS({
                                tag: "path",
                                d: "M" + (bodyWidth / 2 + sin) + " " + (height / 2 + cos) + " A" + r + " " + r + " 0 0 1 " + r + " 132.45",
                                stroke: "green",
                                strokeWidth: 3
                            }).tag);
                            lines.push(new NoshiCENS({
                                tag: "line",
                                x1: bodyWidth / 2,
                                x2: (bodyWidth / 2) + sin,
                                y1: height / 2,
                                y2: (height / 2) + cos,
                                stroke: "red",
                                strokeWidth: 3
                            }).tag);
                            console.log(percentage + " " + sin + " " + cos);
                        }
                        lines.push(new NoshiCENS({
                            tag: "circle",
                            cx: bodyWidth / 2,
                            cy: height / 2,
                            r: 5
                        }).tag);
                        lines.push(new NoshiCENS({
                            tag: "circle",
                            cx: bodyWidth / 2,
                            cy: height / 2,
                            r: r,
                            style: "opacity: .2"
                        }).tag);
                    }
                    if (info.graph.legend !== undefined && info.graph.legend === true) {
                        var legendLines = [];
                        var yLegendRow = 40;
                        for (var i = 0; i < info.data.length; i++) {
                            var legendLineColor = lineColors[i];
                            var lineStyle = info.style[i];
                            if (lineStyle !== undefined) {
                                if (lineStyle.color !== undefined && lineStyle.color !== "") {
                                    legendLineColor = lineStyle.color;
                                }
                            }
                            var line = new NoshiCENS({
                                tag: "line",
                                x1: 40,
                                x2: 70,
                                y1: yLegendRow - 5,
                                y2: yLegendRow - 5,
                                stroke: legendLineColor,
                                strokeWidth: 3,
                                "class": "legend-line"
                            }).tag;
                            var legendRowText = "unknown";
                            if (info.graph.legendTitles[i] !== undefined && info.graph.legendTitles[i] !== "") {
                                legendRowText = info.graph.legendTitles[i];
                            }
                            var text = new NoshiCENS({
                                tag: "text",
                                text: legendRowText,
                                x: 75,
                                y: yLegendRow,
                                "class": "legend-text"
                            }).tag;
                            legendLines.push(new NoshiCENS({
                                tag: "g",
                                child: [
                                    line,
                                    text
                                ]
                            }).tag);
                            yLegendRow += 15;
                        }
                        var legendWidth = 0;
                        for (var i = 0; i < info.graph.legendTitles.length; i++) {
                            if (info.graph.legendTitles[i].length > legendWidth) {
                                legendWidth = info.graph.legendTitles[i].length;
                            }
                        }
                        legendWidth *= 7;
                        legendWidth += 45;
                        var legendPosition = "tl";
                        var legendBorderY = 10;
                        var legendBorderX = "30";
                        switch (info.graph.legendPosition) {
                            case "lt":
                                legendPosition = "translate(0,0)";
                                break;
                            case "lb":
                                legendPosition = "translate(0, " + (height - yLegendRow) + ")";
                                legendBorderY = height - yLegendRow;
                                break;
                            case "rt":
                                legendPosition = "translate(0,0)";
                                legendBorderX = "calc(88%)";
                                break;
                            default:
                                legendPosition = "translate(0,0)";
                                break;
                        }
                        lines.push(new NoshiCENS({
                            tag: "rect",
                            fill: "rgba(240, 240, 240, .4)",
                            stroke: "#e5e5e5",
                            strokeWidth: 2,
                            child: legendLines,
                            width: legendWidth,
                            height: yLegendRow,
                            x: legendBorderX,
                            y: legendBorderY
                        }).tag);
                        lines.push(new NoshiCENS({
                            tag: "g",
                            x: 30,
                            transform: legendPosition,
                            "class": "legend-holder",
                            child: legendLines
                        }).tag);
                    }
                    var svg = new NoshiCENS({
                        tag: "svg",
                        id: "test-id",
                        height: gHeight,
                        width: "100%",
                        backgroundColor: gBg,
                        child: lines
                    }).tag;
                    items.push(svg);
                }
                else {
                    errorScreen("Error: <b>data</b> property can't be empty");
                    return _this.et;
                }
            }
            else {
                errorScreen("Error: you must pass <b>data</b> property");
                return _this.et;
            }
            var graphHead = _this.et;
            if (info.head !== undefined) {
                if (typeof info.head == "object") {
                    var hTitle = "Untitled";
                    var hTitleColor = "#222222";
                    var hBGColor = "#f5f5f5";
                    var hPosition = "top";
                    if (info.head.title !== undefined && typeof info.head.title == "string") {
                        hTitle = info.head.title;
                    }
                    if (info.head.color !== undefined && typeof info.head.color == "string") {
                        hTitleColor = info.head.color;
                    }
                    if (info.head.backgroundColor !== undefined && typeof info.head.backgroundColor == "string") {
                        hBGColor = info.head.backgroundColor;
                    }
                    if (info.head.position === "bottom") {
                        hPosition = "bottom";
                    }
                    graphHead = new NoshiCE({
                        tag: "p",
                        "class": "graph-head-title-holder",
                        text: hTitle,
                        style: "color: " + hTitleColor + "; background-color: " + hBGColor
                    }).tag;
                }
            }
            var graphStyle = "width:" + gWidth + ";background-color:" + gBg + ";";
            var graphDiv = new NoshiCE({
                tag: "div",
                "class": "graph-holder",
                style: graphStyle,
                child: items
            }).tag;
            var graphChild = [];
            if (info.head.position === "bottom") {
                graphChild.push(graphDiv);
                graphChild.push(graphHead);
            }
            else {
                graphChild.push(graphHead);
                graphChild.push(graphDiv);
            }
            return new NoshiCE({
                tag: "div",
                child: graphChild,
                style: "flex: 1; margin: .5em; display: flex; flex-direction: column; border: 1px solid #e5e5e5;"
            }).tag;
        };
    }
    return NoshiBuilder;
}());
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
