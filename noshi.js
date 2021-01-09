var _this = this;
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
            "placeholder": "placeholder"
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
// set language 
var folderLang = "en";
document.head.appendChild(new CE({
    "tag": "script",
    "src": "./lang/" + folderLang + ".js"
}).tag);
var errorScreen = function (msg) {
    document.body.innerHTML = "";
    document.body.appendChild(new CE({
        "tag": "code",
        "html": msg,
        "class": "error-screen"
    }).tag);
};
window.addEventListener("load", function () {
    // let b = _("li");
    // let c = new CE({
    //     "tag":"div",
    //     "class":"holder",
    //     "child": new CE({
    //         "tag":"div",
    //         "class":"div",
    //         "child": new CE({
    //             "tag":"input",
    //             "class":"input-placeholder large",
    //             "id":"test-input",
    //             "placeholder":"hello world!",
    //             "style":"color: red; background-color: #359869;"
    //         }).tag
    //     }).tag
    // });
    // document.body.appendChild(c.tag);
});
