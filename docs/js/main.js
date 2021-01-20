window.onload = function () {
    var url = new URL(window.location.href).searchParams;
    var page = "welcome";
    switch (url.get("page")) {
        case "install":
            page = "install";
            break;
        case "components":
            page = "components";
            break;
        case "components_tables":
            page = "components_tables";
            break;
        case "components_inputs":
            page = "components_inputs";
            break;
        case "components_inputs_navbar":
            page = "components_inputs_navbar";
            break;
        case "components_inputs_text":
            page = "components_inputs_text";
            break;
        case "components_inputs_radio":
            page = "components_inputs_radio";
            break;
        case "components_inputs_checkbox":
            page = "components_inputs_checkbox";
            break;
        default:
            page = "welcome";
            break;
    }
    var pages = [
        ["Welcome", "welcome", null],
        ["Installation", "install", null],
        ["Components", "components", [
                ["Tables", "_tables", null],
                ["Inputs", "_inputs", [
                        ["Navbar", "_navbar", null],
                        ["Text", "_text", null],
                        ["Radio", "_radio", null],
                        ["Checkbox", "_checkbox", null]
                    ]]
            ]],
        ["Icons", "icons", null]
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
            switch (target) {
                case "html":
                    var rg = new RegExp("<|>", "g");
                    c = code.replace(rg, function (x) { return "<html-tag-border>" + x + "</html-tag-border>"; });
                    c = c.replace(/\s[a-z]+/gi, function (x) { return "<html-tag-attr>" + x + "</html-tag-attr>"; });
                    c = c.replace(/=["'][a-z/.-]+['"]/gi, function (x) { return "<html-tag-attr-val>" + x + "</html-tag-attr-val>"; });
                    c = c.replace(/^.+.$/gim, function (x) {
                        return "<code-line>" + x + "</code-line";
                    });
                    break;
                case "css":
                    break;
                default:
                    break;
            }
            return c;
        };
        var c = document.getElementsByTagName("code");
        for (var i = 0; i < c.length; i++) {
            var target = c[i].getAttribute("data-target");
            if (target != null) {
                var code = c[i].getAttribute("data-code");
                c[i].innerHTML = styleUp(target, code);
            }
        }
    };
};
