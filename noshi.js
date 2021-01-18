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
                    console.log(props.required);
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
                        "class": "input-radio-holder",
                        child: [
                            new NoshiCE({
                                tag: "label",
                                "for": info.id,
                                "class": "input-radio-label",
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
    }
    return NoshiBuilder;
}());
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
        var _loop_1 = function (i) {
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
            _loop_1(i);
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
startNoshi([_setLang, _activeNavs, _hideNavs]);
