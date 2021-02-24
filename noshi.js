var noshi = {
    "activeNavs": {
        "target": "",
        "state": HTMLElement
    }
};
var NoshiCE = (function () {
    function NoshiCE(props) {
        var propsKeys = Object.keys(props);
        var tag = document.createElement(props.tag);
        propsKeys.forEach(function (prop) {
            switch (prop) {
                case "child":
                    var c = props.child;
                    for (var i = 0; i < c.length; i++) {
                        tag.appendChild(c[i]);
                    }
                    break;
                case "html":
                    tag.innerHTML = props.html;
                    break;
                case "text":
                    tag.innerText = props.text;
                    break;
                case "src":
                    if (props.tag === "script" || props.tag === "img") {
                        tag.setAttribute("src", props.src);
                    }
                    break;
                case "select":
                    if (props.select) {
                        tag.setAttribute("selected", "selected");
                    }
                    break;
                case "disabled":
                    if (props.disabled) {
                        tag.setAttribute("disabled", "disabled");
                    }
                    break;
                case "required":
                    if (props.required) {
                        tag.setAttribute("required", "required");
                    }
                    break;
                case "strokeWidth":
                    tag.setAttribute("stroke-width", props.strokeWidth);
                    break;
                case "click":
                    tag.addEventListener("click", props[prop]);
                    break;
                case "dbclick":
                    tag.addEventListener("dblclick", props[prop]);
                    break;
                case "tag":
                case "options":
                case "sort":
                case "images":
                case "slideTime":
                case "imageWidth":
                case "imageHeight":
                case "imagePos":
                case "cardTitle":
                case "cardText":
                case "image":
                    break;
                default:
                    tag.setAttribute(prop, props[prop]);
                    break;
            }
        });
        this.tag = tag;
    }
    return NoshiCE;
}());
var NoshiCENS = (function () {
    function NoshiCENS(props) {
        var keys = Object.keys(props);
        var namespace = "http://www.w3.org/2000/svg";
        if (props.namespace !== undefined && typeof props.namespace == "string") {
            namespace = props.namespace;
        }
        var tagType = "svg";
        if (props['tag'] !== undefined && props['tag'] !== "") {
            tagType = props['tag'];
        }
        var tag = document.createElementNS(namespace, tagType);
        keys.forEach(function (key) {
            switch (key) {
                case "child":
                    if (typeof props['child'] === "object") {
                        for (var i = 0; i < props['child'].length; i++) {
                            tag.appendChild(props['child'][i]);
                        }
                    }
                    else {
                        errorScreen("Error: <b>child</b> must be an array");
                    }
                    break;
                case "strokeWidth":
                    tag.setAttributeNS(null, "stroke-width", props[key]);
                    break;
                case "text":
                    tag.textContent = props[key];
                    break;
                case "tag":
                    break;
                default:
                    tag.setAttributeNS(null, key, props[key]);
                    break;
            }
        });
        this.tag = tag;
    }
    return NoshiCENS;
}());
var NoshiBuilder = (function () {
    function NoshiBuilder() {
        var _this = this;
        this.et = new NoshiCE({ tag: "div" }).tag;
        this.select = function (info) {
            if (info.options === undefined || info.options.length === 0) {
                errorScreen("Error: select <b>options</b> can't be empty.");
                return _this.et;
            }
            else {
                if (info.sort == "az") {
                    info.options.sort();
                }
                if (info.sort == "za") {
                    info.options.sort();
                    info.options.reverse();
                }
                var o = [];
                for (var i = 0; i < info.options.length; i++) {
                    var optionValue = info.options[i];
                    if (info.mode === "index") {
                        optionValue = i.toString();
                    }
                    var selectOption = false;
                    if (info.value === info.options[i]) {
                        selectOption = true;
                    }
                    o.push(new NoshiCE({
                        "tag": "option",
                        "value": optionValue,
                        "text": info.options[i],
                        "select": selectOption
                    }).tag);
                }
                info.tag = "select";
                info.child = o;
                if (info["class"] != undefined && info["class"] != "") {
                    info["class"] = "select " + info["class"];
                }
                else {
                    info["class"] = "select";
                }
                return new NoshiCE(info).tag;
            }
        };
        this.input = function (info) {
            info.tag = "input";
            switch (info.type) {
                case "radio":
                    info["class"] = "input-radio";
                    return new NoshiCE({
                        tag: "div",
                        "class": "input-holder",
                        child: [
                            new NoshiCE({
                                tag: "label",
                                "for": info.id,
                                "class": "input-label",
                                text: info.text
                            }).tag,
                            new NoshiCE(info).tag
                        ]
                    }).tag;
                    break;
                case "checkbox":
                    info["class"] = "input-checkbox";
                    return new NoshiCE({
                        tag: "div",
                        "class": "input-holder",
                        child: [
                            new NoshiCE({
                                tag: "label",
                                "for": info.id,
                                "class": "input-label",
                                text: info.text
                            }).tag,
                            new NoshiCE(info).tag
                        ]
                    }).tag;
                    break;
                default:
                    if (info["class"] != undefined && info["class"] != "") {
                        info["class"] = "input " + info["class"];
                    }
                    else {
                        info["class"] = "input";
                    }
                    return new NoshiCE(info).tag;
                    break;
            }
        };
        this.slider = function (info) {
            if (info === undefined) {
                errorScreen("Error: no information have been passed");
            }
            else if (info.images === undefined) {
                errorScreen("Error: <b>images</b> property not set");
            }
            else if (typeof info.images !== "object") {
                errorScreen("Error: <b>images</b> property should be an array");
            }
            else if (info.images.length === 0) {
                errorScreen("Error: you should pass at least 1 image to slider");
            }
            else {
                var imgStyle_1 = "";
                if (info.imageWidth !== undefined && info.imageWidth !== "") {
                    if (typeof info.imageWidth === "string") {
                        imgStyle_1 += "width: " + info.imageWidth + ";";
                    }
                    else if (typeof info.imageWidth === "number") {
                        imgStyle_1 += "width: " + info.imageWidth + "px;";
                    }
                    else {
                        errorScreen("Error: <b>imageWidth</b> can be only string or number");
                        return 0;
                    }
                }
                if (info.imageHeight !== undefined && info.imageHeight !== "") {
                    if (typeof info.imageHeight === "string") {
                        imgStyle_1 += "height: " + info.imageHeight + ";";
                    }
                    else if (typeof info.imageHeight === "number") {
                        imgStyle_1 += "height: " + info.imageHeight + "px;";
                    }
                    else {
                        errorScreen("Error: <b>imageHeight</b> can be only string or number");
                        return 0;
                    }
                }
                if (info.imagePos !== undefined && info.imagePos !== "") {
                    if (typeof info.imagePos === "string") {
                        if (info.imagePos === "top") {
                            imgStyle_1 += "transform: none; top: 0; left: unset;";
                        }
                        else if (info.imagePos === "bottom") {
                            imgStyle_1 += "transform: none; bottom: 0; top: unset; left: unset;";
                        }
                        else if (info.imagePos === "center") {
                        }
                        else {
                            errorScreen("Error: " + info.imagePos + " not defined as a value of <b>imagePos</b>");
                        }
                    }
                    else {
                        errorScreen("Error: <b>imagePos</b> value should be only center, top, or bottom");
                        return 0;
                    }
                }
                if (info.slideTime !== undefined) {
                    if (typeof info.slideTime === "number" && info.slideTime > 0) {
                        info["data-slide-time"] = info.slideTime;
                    }
                    else {
                        errorScreen("Error: <b>slideTime</b> get only numerical values larger than 0");
                        return 0;
                    }
                }
                var images_1 = [];
                info.images.forEach(function (img) {
                    images_1.push(new NoshiCE({
                        tag: "img",
                        alt: img,
                        src: img,
                        "class": "slider-img",
                        style: imgStyle_1
                    }).tag);
                });
                info.tag = "div";
                info["class"] = "slider";
                info.child = images_1;
                return new NoshiCE(info).tag;
            }
            return new NoshiCE({}).tag;
        };
        this.form = function (info) {
            if (Object.keys(info).length !== 0) {
                var nInfo = {
                    tag: "form",
                    "class": "form-holder"
                };
                var formTitle = _this.et;
                var formFields = [];
                var formButtons = _this.et;
                nInfo.method = "POST";
                if (info.method !== undefined) {
                    if (info.method != "") {
                        nInfo.method = info.method;
                    }
                }
                if (info.action !== undefined && info.action != "") {
                    nInfo.action = info.action;
                }
                if (info.title !== undefined && info.title != "") {
                    formTitle = new NoshiCE({
                        tag: "p",
                        "class": "form-title",
                        text: info.title
                    }).tag;
                }
                if (info.formWidth !== undefined && info.formWidth != "") {
                    nInfo.style = "width:" + info.formWidth + ";";
                }
                if (info.fields !== undefined) {
                    if (typeof info.fields === "object" && Object.keys(info.fields).length > 0) {
                        for (var i = 0; i < Object.keys(info.fields).length; i++) {
                            var fi = info.fields[i];
                            var fieldRow = {
                                tag: "div",
                                "class": "form-field-row"
                            };
                            var inpInfo = {
                                tag: "noshi"
                            };
                            if (fi.id !== undefined) {
                                inpInfo.id = fi.id;
                            }
                            if (fi.name !== undefined) {
                                inpInfo.name = fi.name;
                            }
                            if (fi.value !== undefined) {
                                inpInfo.value = fi.value;
                            }
                            if (fi.required !== undefined) {
                                inpInfo.required = fi.required;
                            }
                            if (fi["class"] !== undefined) {
                                inpInfo["class"] = fi["class"];
                            }
                            if (fi.style !== undefined) {
                                inpInfo.style = fi.style;
                            }
                            switch (fi.type) {
                                case "select":
                                    if (fi.sort !== undefined) {
                                        inpInfo.sort = fi.sort;
                                    }
                                    else {
                                        delete inpInfo.sort;
                                    }
                                    inpInfo.options = fi.options;
                                    fieldRow.child = [
                                        _this.select(inpInfo)
                                    ];
                                    break;
                                case "calendar":
                                    break;
                                default:
                                    if (fi.type !== undefined) {
                                        inpInfo.type = fi.type;
                                    }
                                    else {
                                        delete inpInfo.type;
                                    }
                                    if (fi.placeholder !== undefined) {
                                        inpInfo.placeholder = fi.placeholder;
                                    }
                                    else {
                                        delete inpInfo.placeholder;
                                    }
                                    if (fi.title !== undefined) {
                                        inpInfo.title = fi.title;
                                    }
                                    else {
                                        delete inpInfo.title;
                                    }
                                    if (fi.text !== undefined) {
                                        inpInfo.text = fi.text;
                                    }
                                    else {
                                        delete inpInfo.text;
                                    }
                                    fieldRow.child = [
                                        _this.input(inpInfo)
                                    ];
                                    break;
                            }
                            formFields.push(new NoshiCE(fieldRow).tag);
                        }
                    }
                    else {
                        errorScreen("Error: <b>fields</b> must be an object with at least length 1");
                        return _this.et;
                    }
                }
                if (info.buttons !== undefined) {
                    if (typeof info.buttons === "object" && Object.keys(info.buttons).length > 0) {
                        var buttons = info.buttons;
                        var btns = [];
                        for (var i = 0; i < buttons.length; i++) {
                            var bi = {
                                tag: "button"
                            };
                            if (info.buttons[i].text !== undefined) {
                                bi.text = info.buttons[i].text;
                            }
                            if (info.buttons[i]["function"] !== undefined) {
                                bi.click = info.buttons[i]["function"];
                            }
                            bi["class"] = "form-btn";
                            if (info.buttons[i].active === true) {
                                bi["class"] += "-active";
                            }
                            btns.push(new NoshiCE(bi).tag);
                        }
                        formButtons = new NoshiCE({
                            tag: "div",
                            "class": "form-btns-holder",
                            child: btns
                        }).tag;
                    }
                    else {
                        errorScreen("Error: <b>buttons</b> must be an object with at least length 1");
                        return _this.et;
                    }
                }
                formFields.unshift(formTitle);
                formFields.push(formButtons);
                nInfo.child = formFields;
                return new NoshiCE(nInfo).tag;
            }
            else {
                errorScreen("Error: no information has been passed to <b>form</b>");
                return _this.et;
            }
        };
        this.card = function (info) {
            if (info.title === undefined || info.title == "") {
                info.cardTitle = "Untitled";
            }
            else {
                info.cardTitle = info.title;
            }
            if (info.text === undefined || info.text == "") {
                info.cardText = "no text";
            }
            else {
                info.cardText = info.text;
            }
            var cardClass = "card-holder";
            if (info.mode !== undefined && info.mode === "dark") {
                cardClass += "-dark";
            }
            var cardLink = "#";
            if (info.link !== undefined && info.link != "") {
                info.cardLink = info.link;
                cardClass += "-hover";
                cardLink = info.link;
            }
            if (info.target !== undefined && info.target == "blank") {
                info.target = "_blank";
            }
            else {
                if (cardLink != "#") {
                    info.target = "_self";
                }
                else {
                    delete info.target;
                }
            }
            if (info.size !== undefined && info.size == "fit") {
                if (info.style !== undefined && info.style != "") {
                    info.style = "align-self: flex-start;" + info.style;
                }
                else {
                    info.style = "align-self: flex-start;";
                }
            }
            var imageHeight = "auto";
            var imageWidth = "100%";
            if (info.imageHeight !== undefined) {
                imageHeight = info.imageHeight;
            }
            if (info.imageWidth !== undefined) {
                imageWidth = info.imageWidth;
            }
            var cardImage;
            if (info.image !== undefined && info.image != "") {
                cardImage = new NoshiCE({
                    tag: "img",
                    src: info.image,
                    alt: info.image,
                    style: "height: " + imageHeight + "; width: " + imageWidth + ";",
                    "class": "card-image"
                }).tag;
            }
            else {
                cardImage = new NoshiCE({}).tag;
            }
            var cardButton;
            if (info.button !== undefined) {
                if (typeof info.button === "object") {
                    var btnText = "unknown";
                    var btnTextPos = "flex-start";
                    var btnFunc = function () { };
                    if (info.button.text !== undefined && info.button.text != "") {
                        btnText = info.button.text;
                    }
                    if (info.button.action !== undefined && typeof info.button.action === "function") {
                        btnFunc = info.button.action;
                    }
                    if (info.button.position !== undefined && info.button.position != "") {
                        if (info.button.position === "center") {
                            btnTextPos = "center";
                        }
                        else if (info.button.position === "end") {
                            btnTextPos = "flex-end";
                        }
                    }
                    cardButton = new NoshiCE({
                        tag: "div",
                        "class": "card-btn-holder",
                        style: "justify-content:" + btnTextPos + ";",
                        child: [new NoshiCE({
                                tag: "button",
                                "class": "card-btn",
                                text: btnText,
                                click: btnFunc
                            }).tag]
                    }).tag;
                }
                else {
                    errorScreen("Error: <b>button</b> must be an object");
                    return _this.et;
                }
            }
            delete info.image;
            delete info.title;
            delete info.text;
            delete info.link;
            delete info.size;
            delete info.imageHeight;
            delete info.imageWidth;
            delete info.button;
            var cardTitle = new NoshiCE({
                tag: "p",
                text: info.cardTitle,
                "class": "card-title"
            });
            var cardText = new NoshiCE({
                tag: "p",
                text: info.cardText,
                "class": "card-text"
            });
            var txtHolder = new NoshiCE({
                tag: "div",
                "class": "card-txt-holder",
                child: [cardTitle.tag, cardText.tag]
            }).tag;
            info.tag = "a";
            info.href = cardLink;
            info["class"] = cardClass;
            info.child = [cardImage, txtHolder, cardButton];
            return new NoshiCE(info).tag;
        };
        this.note = function (info) {
            if (info.text !== undefined && info.text !== "") {
                var className = "";
                switch (info["class"]) {
                    case "warning":
                        className = "-warning";
                        break;
                    case "error":
                        className = "-error";
                        break;
                    case "correct":
                        className = "-correct";
                        break;
                    default:
                        className = "";
                        break;
                }
                var txt = new NoshiCE({
                    tag: "p",
                    "class": "note-text" + className,
                    text: info.text
                }).tag;
                var ico = _this.et;
                if (info.icon !== undefined && info.icon !== "") {
                    ico = new NoshiCE({
                        tag: "i",
                        "class": "note-icon" + className + " " + info.icon
                    }).tag;
                }
                var note = {
                    tag: "div",
                    "class": "note-holder" + className,
                    child: [ico, txt]
                };
                return new NoshiCE(note).tag;
            }
            else {
                errorScreen("Error: you must set <b>text</b> property");
                return _this.et;
            }
        };
        this.button = function (info) {
            if (info.text !== undefined || info.icon !== undefined) {
                var btnText = _this.et;
                var btnChild = [];
                if (info.text !== undefined && info.text !== "") {
                    btnText = new NoshiCE({
                        tag: "p",
                        "class": "btn-holder-text",
                        text: info.text
                    }).tag;
                }
                var btnIcon = _this.et;
                if (info.icon !== undefined && info.icon !== "") {
                    btnIcon = new NoshiCE({
                        tag: "i",
                        "class": "btn-holder-icon " + info.icon
                    }).tag;
                }
                btnChild = [btnIcon, btnText];
                if (info.iconPos !== undefined && info.iconPos === "right") {
                    btnChild = [btnText, btnIcon];
                }
                var btnClass = "btn-holder";
                switch (info["class"]) {
                    case "warning":
                        btnClass += "-warning";
                        break;
                    case "error":
                        btnClass += "-error";
                        break;
                    case "correct":
                        btnClass += "-correct";
                        break;
                    case "active":
                        btnClass += "-active";
                        break;
                    case "dark":
                        btnClass += "-dark";
                        break;
                    default:
                        break;
                }
                var btnInfo = {
                    tag: "button",
                    "class": btnClass,
                    child: btnChild
                };
                if (info.disabled !== undefined && info.disabled === true) {
                    btnInfo.disabled = true;
                }
                if (info.click !== undefined) {
                    if (typeof info.click === "function") {
                        btnInfo.click = info.click;
                    }
                    else {
                        errorScreen("Error: <b>click</b> property must be a function");
                        return _this.et;
                    }
                }
                return new NoshiCE(btnInfo).tag;
            }
            else {
                errorScreen("Error: you have to set <b>text</b> and/or <b>icon</b> property");
                return _this.et;
            }
        };
        this.code = function (info) {
            if (info.code === undefined || info.code === "") {
                errorScreen("Error: you have to set <b>code</b> property");
                return _this.et;
            }
            var c = "";
            c = info.code.replace(/    /gim, function (x) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;";
            });
            if (info.target !== undefined && info.target !== "") {
                info.target = info.target.toLowerCase();
            }
            switch (info.target) {
                case "html":
                    var rg = new RegExp("<|>", "g");
                    c = c.replace(rg, function (x) { return "<html-tag-border>" + x + "</html-tag-border>"; });
                    c = c.replace(/\s[a-z]+=/gi, function (x) { return "<html-tag-attr>" + x + "</html-tag-attr>"; });
                    c = c.replace(/["'][\s0-9a-z/.-]+['"]/gi, function (x) { return "<html-tag-attr-val>" + x + "</html-tag-attr-val>"; });
                    c = c.replace(/^.+.$/gim, function (x) {
                        return "<code-line>" + x + "</code-line>";
                    });
                    break;
                case "css":
                    c = c.replace(/@[a-zA-Z0-9-"'\(\)\.\s]+;|@[a-zA-Z0-9-\s]+/g, function (x) {
                        return "<css-head>" + x + "</css-head>";
                    });
                    c = c.replace(/{|}/g, function (x) {
                        return "<css-brackets>" + x + "</css-brackets>";
                    });
                    c = c.replace(/[a-zA-Z0-9-]+:/g, function (x) {
                        return "<css-property>" + x.slice(0, x.length - 1) + "</css-property>:";
                    });
                    c = c.replace(/:[a-zA-Z0-9-\s\(\)\.]+/g, function (x) {
                        return "<css-value>" + x + "</css-value>";
                    });
                    c = c.replace(/^.+.$/gim, function (x) {
                        return "<code-line>" + x + "</code-line>";
                    });
                    break;
                case "js":
                    c = c.replace(/<|>/gi, function (x) {
                        return "<js-bracket>" + x + "</js-bracket>";
                    });
                    c = c.replace(/var |let |const |new /gi, function (x) {
                        return "<js-var>" + x.slice(0, x.length - 1) + "</js-var> ";
                    });
                    c = c.replace(/[a-z]+: ['"{\(]/gi, function (x) {
                        return "<js-obj-key>" + x.slice(0, x.length - 2) + "</js-obj-key>" + x.slice(x.length - 2, x.length);
                    });
                    c = c.replace(/['"][a-zA-Z!,0-9-:;<>\./\(\)\s]+['"]/gi, function (x) {
                        return "<js-txt>" + x + "</js-txt>";
                    });
                    c = c.replace(/{|}/gi, function (x) {
                        return "<js-bracket>" + x + "</js-bracket>";
                    });
                    c = c.replace(/[a-z]+\(\)|[a-z]+\(|\)/gi, function (x) {
                        return "<js-func>" + x + "</js-func>";
                    });
                    c = c.replace(/^.+.$/gim, function (x) {
                        return "<code-line>" + x + "</code-line>";
                    });
                    break;
                default:
                    break;
            }
            return new NoshiCE({
                tag: "code",
                "class": "noshi-code",
                html: c
            }).tag;
        };
        this.graph = function (info) {
            var items = [];
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
var _sliders = function () {
    var sliders = _("slider", true, false);
    if (sliders !== undefined) {
        var _loop_2 = function (i) {
            var c = sliders[i].childNodes;
            var t = sliders[i].getAttribute("type");
            var m = Number(sliders[i].getAttribute("data-slide-time"));
            if (m <= 0) {
                m = 5;
            }
            var oimagePointer = c.length - 1;
            var imagePointer = 0;
            var setFirstImg = true;
            var slideFunction = function () { };
            if (c.length > 1) {
                switch (t) {
                    case "flash":
                        slideFunction = function () {
                            var img = c[imagePointer];
                            var oimg = c[oimagePointer];
                            img.style.opacity = "1";
                            img.style.zIndex = "1";
                            oimg.style.opacity = "0";
                            oimg.style.zIndex = "-1";
                            if (imagePointer < c.length - 1) {
                                oimagePointer = imagePointer;
                                imagePointer++;
                            }
                            else {
                                imagePointer = 0;
                                oimagePointer = c.length - 1;
                            }
                        };
                        break;
                    case "zoomin":
                        for (var i_3 = 0; i_3 < c.length; i_3++) {
                            var img_1 = c[i_3];
                            img_1.style.opacity = "1";
                            img_1.style.width = "0";
                            img_1.style.zIndex = "1";
                            img_1.style.visibility = "hidden";
                        }
                        var img = c[0];
                        img.style.width = "100%";
                        img.style.visibility = "visible";
                        slideFunction = function () {
                            var img = c[imagePointer];
                            img.style.width = "100%";
                            img.style.zIndex = "1";
                            img.style.visibility = "visible";
                            window.setTimeout(function () {
                                img.style.width = "0";
                                img.style.zIndex = "0";
                                img.style.visibility = "hidden";
                            }, m * 1000);
                            if (imagePointer < c.length - 1) {
                                imagePointer++;
                            }
                            else {
                                imagePointer = 0;
                            }
                        };
                        break;
                    case "toleft":
                        for (var i_4 = 0; i_4 < c.length - 1; i_4++) {
                            var img_2 = c[i_4];
                            img_2.style.position = "unset";
                            img_2.style.opacity = "1";
                            img_2.style.zIndex = "1";
                            img_2.style.width = "100%";
                        }
                        slideFunction = function () {
                            var oimg = c[oimagePointer];
                            oimg.style.left = "-100%";
                            if (imagePointer < c.length - 1) {
                                oimagePointer = imagePointer;
                                imagePointer++;
                            }
                            else {
                                imagePointer = 0;
                                oimagePointer = c.length - 1;
                            }
                        };
                        break;
                    default:
                        for (var i_5 = 0; i_5 < c.length - 1; i_5++) {
                            var img_3 = c[i_5];
                            img_3.style.opacity = "1";
                            img_3.style.zIndex = "initial";
                            img_3.style.visibility = "hidden";
                        }
                        slideFunction = function () {
                            var img = c[imagePointer];
                            var oimg = c[oimagePointer];
                            img.style.visibility = "visible";
                            oimg.style.visibility = "hidden";
                            if (imagePointer < c.length - 1) {
                                oimagePointer = imagePointer;
                                imagePointer++;
                            }
                            else {
                                imagePointer = 0;
                                oimagePointer = c.length - 1;
                            }
                        };
                        break;
                }
            }
            if (setFirstImg) {
                var firstImg = c[0];
                firstImg.style.opacity = "1";
                firstImg.style.zIndex = "1";
            }
            var tvl = window.setInterval(slideFunction, m * 1000);
        };
        for (var i = 0; i < sliders.length; i++) {
            _loop_2(i);
        }
    }
};
var loading = function (info) {
    if (_("loading", false, false) === undefined) {
        var nlhInfo = {
            tag: "div",
            id: "noshi-loading-holder",
            "class": "noshi-loading-holder",
            style: "width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; position: fixed; left: 0; top: 0; z-index: 10000;"
        };
        var child = [];
        switch (info.type) {
            case "circle":
                child.push(new NoshiCE({
                    tag: "div",
                    style: "width: 30px; height: 30px; border: 6px solid #222222; border-top-color: #fdfdfd; border-radius: 50%; animation: rotate360 1s infinite linear;"
                }).tag);
                break;
            default:
                child.push(new NoshiCE({
                    tag: "p",
                    text: "loading...",
                    style: "color: #222222; background-color: rgba(220, 220, 220, .4);"
                }).tag);
                break;
        }
        nlhInfo.child = child;
        document.body.appendChild(new NoshiCE(nlhInfo).tag);
    }
    else {
        var nlh = _("noshi-loading-holder", false, false);
        nlh.remove();
    }
};
var ajax = function (type, link, state, data) {
    if (type === void 0) { type = "GET"; }
    if (state === void 0) { state = true; }
    if (data === void 0) { data = ""; }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200) {
            return x.responseText;
        }
    };
    x.open(type, link, state);
    x.send(data);
};
var _setLang = function () {
    var folderLang = "en";
    var docLang = document.documentElement.getAttribute("lang");
    if (docLang != null) {
        folderLang = docLang;
    }
    document.head.appendChild(new NoshiCE({
        tag: "script",
        src: "./lang/" + folderLang + ".js",
        type: "application/javascript"
    }).tag);
    document.body.setAttribute("lang", folderLang);
};
var _ = function (id, multi, err) {
    if (multi === void 0) { multi = false; }
    if (err === void 0) { err = true; }
    if (document.getElementById(id) != null) {
        return document.getElementById(id);
    }
    else if (document.getElementsByClassName(id).length > 0) {
        if (multi) {
            return document.getElementsByClassName(id);
        }
        else {
            return document.getElementsByClassName(id)[0];
        }
    }
    if (err) {
        errorScreen("Error: '<b>" + id + "</b>' id and/or class name not found.");
    }
};
var errorScreen = function (msg) {
    document.body.appendChild(new NoshiCE({
        tag: "code",
        html: msg,
        "class": "error-screen"
    }).tag);
};
var _activeNavs = function () {
    if (_("nav-menu-head", true, false) !== undefined) {
        var navs = _("nav-menu-head", true);
        var _loop_3 = function (i) {
            var nav = navs[i];
            nav.addEventListener("click", function () {
                var target = nav.getAttribute("data-target");
                var status = nav.getAttribute("data-status");
                var t = _(target);
                if (status != "true") {
                    if (noshi.activeNavs.target != "") {
                        var cc = _(noshi.activeNavs.target);
                        cc.style.display = "none";
                        noshi.activeNavs.state.setAttribute("data-status", false);
                        noshi.activeNavs.target = "";
                        noshi.activeNavs.state = "";
                    }
                    t.style.display = "flex";
                    nav.setAttribute("data-status", "true");
                    noshi.activeNavs.target = target;
                    noshi.activeNavs.state = nav;
                }
                else {
                    t.style.display = "none";
                    nav.setAttribute("data-status", "false");
                }
            });
        };
        for (var i = 0; i < Object.keys(navs).length; i++) {
            _loop_3(i);
        }
    }
};
var _hideNavs = function () {
    window.onclick = function (e) {
        if (e.srcElement.className != "nav-menu-head") {
            if (noshi.activeNavs.target != "") {
                var t = _(noshi.activeNavs.target);
                t.style.display = "none";
                noshi.activeNavs.state.setAttribute("data-status", false);
            }
        }
    };
};
var startNoshi = function (funcs) {
    funcs.forEach(function (func) {
        var start = window.onload;
        if (typeof start != "function") {
            window.onload = function () {
                func();
            };
        }
        else {
            window.onload = function () {
                if (start) {
                    start();
                }
                func();
            };
        }
    });
};
startNoshi([_setLang, _activeNavs, _hideNavs, _sliders]);
