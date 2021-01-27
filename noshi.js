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
var NoshiBuilder = (function () {
    function NoshiBuilder() {
        this.select = function (info) {
            if (info.options === undefined || info.options.length === 0) {
                errorScreen("Error: select <b>options</b> can't be empty.");
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
    }
    return NoshiBuilder;
}());
var _sliders = function () {
    var sliders = _("slider", true, false);
    if (sliders !== undefined) {
        var _loop_1 = function (i) {
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
                        for (var i_1 = 0; i_1 < c.length; i_1++) {
                            var img_1 = c[i_1];
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
                        for (var i_2 = 0; i_2 < c.length - 1; i_2++) {
                            var img_2 = c[i_2];
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
                        for (var i_3 = 0; i_3 < c.length - 1; i_3++) {
                            var img_3 = c[i_3];
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
            _loop_1(i);
        }
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
        var _loop_2 = function (i) {
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
            _loop_2(i);
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
