var _this = this;
// general creator 
var CE = /** @class */ (function () {
    function CE(props) {
        var _this = this;
        this.propsNames = {
            "id": "id",
            "name": "name",
            "style": "style",
            "class": "className",
            "disabled": "disabled",
            "text": "innerText",
            "html": "innerHTML",
            "placeholder": "placeholder",
            "type": "type"
        };
        var propsKeys = Object.keys(props);
        this.props = props;
        var tag = document.createElement(this.props.tag);
        propsKeys.forEach(function (element) {
            if (element === "child") {
                tag.appendChild(_this.props.child);
            }
            else {
                tag[_this.propsNames[element]] = _this.props[element];
            }
        });
        if (props.tag === "script" || props.tag === "img") {
            tag.setAttribute("src", this.props.src);
        }
        this.tag = tag;
    }
    return CE;
}());
// AJAX request
var ajax = function (type, link, state, data) {
    if (type === void 0) { type = "GET"; }
    if (state === void 0) { state = true; }
    if (data === void 0) { data = ""; }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (_this.readyState == '4' && _this.status == '200') {
            return x.responseText;
        }
    };
    x.open(type, link, state);
    x.send(data);
};
// set language 
var _setLang = function () {
    var folderLang = "en";
    document.head.prepend(new CE({
        "tag": "script",
        "src": "./lang/" + folderLang + ".js",
        "type": "application/javascript"
    }).tag);
};
// general finder
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
    errorScreen(lang.errors.e + "'<b>" + id + "</b>' " + lang.errors.tnf);
};
// error on screen
var errorScreen = function (msg) {
    document.body.innerHTML = "";
    document.body.appendChild(new CE({
        "tag": "code",
        "html": msg,
        "class": "error-screen"
    }).tag);
};
// navbars
var _activeNavs = function () {
    var navs = _("nav-menu-heads", true);
    console.log(navs);
};
// initilize Noshi
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
var aws = function () { console.log("dd"); };
// run Noshi
startNoshi([_setLang, _activeNavs, aws]);
