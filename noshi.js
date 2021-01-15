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
                    tag.appendChild(props.child);
                    break;
                case "text":
                    tag.innerText = props.text;
                    break;
                case "src":
                    if (props.tag === "script" || props.tag === "img") {
                        tag.setAttribute("src", props.src);
                    }
                    break;
                case "click":
                    tag.addEventListener("click", props[prop]);
                    break;
                case "dbclick":
                    tag.addEventListener("dblclick", props[prop]);
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
    document.head.prepend(new NoshiCE({
        "tag": "script",
        "src": "./lang/" + folderLang + ".js",
        "type": "application/javascript"
    }).tag);
    document.body.setAttribute("lang", folderLang);
};
var _ = function (id, multi) {
    if (multi === void 0) { multi = false; }
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
    errorScreen("Error: '<b>" + id + "</b>' id and/or class name not found.");
};
var errorScreen = function (msg) {
    document.body.innerHTML = "";
    document.body.appendChild(new NoshiCE({
        "tag": "code",
        "child": msg,
        "class": "error-screen"
    }).tag);
};
var _activeNavs = function () {
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
var navbar = function (navInfo) {
    var nav = new NoshiCE({
        "tag": navInfo.tag,
        "id": navInfo.id
    });
    return nav.tag;
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
