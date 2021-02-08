window.onload = function () {
    var url = new URL(window.location.href).searchParams;
    var page = "welcome";
    if (url.get("page") != "" && url.get("page") != null) {
        page = url.get("page");
    }
    var pages = [
        ["Welcome", "welcome", null],
        ["Installation", "install", null],
        ["Components", "components", [
                ["Layout", "_layout", null],
                ["Navbar", "_navbar", null],
                ["Table", "_table", null],
                ["Input", "_input", null],
                ["Select", "_select", null],
            ]],
        ["Icons", "icons", null],
        ["Statics", "statics", null],
        ["Functions", "functions", [
                ["Noshi Builder", "_noshibuilder", null]
            ]]
    ];
    var f = function (txt, href, style) {
        if (href == page) {
            style += "-active";
        }
        var c = new NoshiCE({
            tag: "a",
            target: "_self",
            href: "index.html?page=" + href,
            text: txt,
            "class": style
        }).tag;
        return c;
    };
    for (var i = 0; i < pages.length; i++) {
        var href = pages[i][1].toString();
        _("body-left").appendChild(f(pages[i][0].toString(), href, "body-left-head-a"));
        if (pages[i][2] !== null) {
            for (var j = 0; j < pages[i][2].length; j++) {
                var hrefs = href + pages[i][2][j][1].toString();
                _("body-left").appendChild(f(pages[i][2][j][0].toString(), hrefs, "body-left-sub-a"));
                if (pages[i][2][j][2] !== null) {
                    for (var k = 0; k < pages[i][2][j][2].length; k++) {
                        var hrefb = hrefs + pages[i][2][j][2][k][1].toString();
                        _("body-left").appendChild(f(pages[i][2][j][2][k][0].toString(), hrefb, "body-left-branch-a"));
                    }
                }
            }
        }
    }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200) {
            var xr = x.responseText;
            _("body-mid").innerHTML = xr;
            genRightSide();
            styleCode();
            _activeNavs();
        }
        else if (x.status == 404) {
            _("body-mid").innerHTML = "<p class='np-note' align='center'>documents not available now</p>";
        }
    };
    x.open("GET", "./pages/" + page + ".noshipage", true);
    x.send();
    var genRightSide = function () {
        var c = _("body-mid").children;
        for (var i = 0; i < c.length; i++) {
            var n = c[i].nodeName;
            if (n === "H1" || n === "H2" || n === "H3") {
                _("body-right-head-holder").appendChild(f(c[i].innerText, page + "#" + c[i].getAttribute("id"), "body-right-head"));
            }
        }
    };
    var styleCode = function () {
        var styleUp = function (target, code) {
            var c = "";
            c = code.replace(/    /gim, function (x) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;";
            });
            switch (target) {
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
                    break;
                case "js":
                    c = c.replace(/var |let |const |new /gi, function (x) {
                        return "<js-var>" + x.slice(0, x.length - 1) + "</js-var> ";
                    });
                    c = c.replace(/[a-z]+: ['"{\(]/gi, function (x) {
                        return "<js-obj-key>" + x.slice(0, x.length - 2) + "</js-obj-key>" + x.slice(x.length - 2, x.length);
                    });
                    c = c.replace(/['"][a-zA-Z!,0-9-:;\./\(\)\s]+['"]/gi, function (x) {
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
            return c;
        };
        var c = document.getElementsByTagName("code");
        for (var i = 0; i < c.length; i++) {
            if (c[i].getAttribute("data-target") != null) {
                var target = c[i].getAttribute("data-target");
                var code = c[i].getAttribute("data-code");
                c[i].innerHTML = styleUp(target, code);
            }
        }
    };
};
