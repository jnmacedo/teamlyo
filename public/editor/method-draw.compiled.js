function touchHandler(a) {
    var s = a.changedTouches,
        g = s[0],
        b = "";
    switch (a.type) {
        case "touchstart":
            b = "mousedown";
            break;
        case "touchmove":
            b = "mousemove";
            break;
        case "touchend":
            b = "mouseup";
            break;
        default:
            return
    }
    var p = document.createEvent("MouseEvent");
    p.initMouseEvent(b, true, true, window, 1, g.screenX, g.screenY, g.clientX, g.clientY, false, false, false, false, 0, null);
    if (s.length < 2) {
        g.target.dispatchEvent(p);
        a.preventDefault()
    }
};
(function(a) {
    function s(g) {
        if (typeof g.data === "string") {
            var b = g.handler,
                p = g.data.toLowerCase().split(" ");
            g.handler = function(w) {
                if (!(this !== w.target && (/textarea|select/i.test(w.target.nodeName) || w.target.type === "text"))) {
                    var c = w.type !== "keypress" && a.hotkeys.specialKeys[w.which],
                        f = String.fromCharCode(w.which).toLowerCase(),
                        d = "",
                        n = {};
                    if (w.altKey && c !== "alt") d += "alt+";
                    if (w.ctrlKey && c !== "ctrl") d += "ctrl+";
                    if (w.metaKey && !w.ctrlKey && c !== "meta") d += "meta+";
                    if (w.shiftKey && c !== "shift") d += "shift+";
                    if (c) n[d + c] =
                        true;
                    else {
                        n[d + f] = true;
                        n[d + a.hotkeys.shiftNums[f]] = true;
                        if (d === "shift+") n[a.hotkeys.shiftNums[f]] = true
                    }
                    c = 0;
                    for (f = p.length; c < f; c++)
                        if (n[p[c]]) return b.apply(this, arguments)
                }
            }
        }
    }
    a.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            191: "/",
            224: "meta",
            219: "[",
            221: "]"
        },
        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };
    a.each(["keydown", "keyup", "keypress"], function() {
        a.event.special[this] = {
            add: s
        }
    })
})(jQuery);
(function(a, s) {
    function g(ca) {
        return typeof ca === "string"
    }

    function b(ca) {
        var U = d.call(arguments, 1);
        return function() {
            return ca.apply(this, U.concat(d.call(arguments)))
        }
    }

    function p(ca, U, Z, na, pa) {
        var ma;
        if (na !== f) {
            U = Z.match(ca ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/);
            Z = U[3] || "";
            if (pa === 2 && g(na)) na = na.replace(ca ? ea : V, "");
            else {
                ma = q(U[2]);
                na = g(na) ? q[ca ? ga : N](na) : na;
                na = pa === 2 ? na : pa === 1 ? a.extend({}, na, ma) : a.extend({}, ma, na);
                na = v(na);
                if (ca) na = na.replace(Ba, n)
            }
            ca = U[1] + (ca ? "#" : na || !U[1] ? "?" : "") + na + Z
        } else ca =
            U(Z !== f ? Z : s[oa][Y]);
        return ca
    }

    function w(ca, U, Z) {
        if (U === f || typeof U === "boolean") {
            Z = U;
            U = v[ca ? ga : N]()
        } else U = g(U) ? U.replace(ca ? ea : V, "") : U;
        return q(U, Z)
    }

    function c(ca, U, Z, na) {
        if (!g(Z) && typeof Z !== "object") {
            na = Z;
            Z = U;
            U = f
        }
        return this.each(function() {
            var pa = a(this),
                ma = U || S()[(this.nodeName || "").toLowerCase()] || "",
                la = ma && pa.attr(ma) || "";
            pa.attr(ma, v[ca](la, Z, na))
        })
    }
    var f, d = Array.prototype.slice,
        n = decodeURIComponent,
        v = a.param,
        B, q, L, Q = a.bbq = a.bbq || {},
        K, I, S, R = a.event.special,
        N = "querystring",
        ga = "fragment",
        oa =
        "location",
        Y = "href",
        V = /^.*\?|#.*$/g,
        ea = /^.*\#/,
        Ba, ja = {};
    v[N] = b(p, 0, function(ca) {
        return ca.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    });
    v[ga] = B = b(p, 1, function(ca) {
        return ca.replace(/^[^#]*#?(.*)$/, "$1")
    });
    B.noEscape = function(ca) {
        ca = ca || "";
        ca = a.map(ca.split(""), encodeURIComponent);
        Ba = RegExp(ca.join("|"), "g")
    };
    B.noEscape(",/");
    a.deparam = q = function(ca, U) {
        var Z = {},
            na = {
                "true": true,
                "false": false,
                "null": null
            };
        a.each(ca.replace(/\+/g, " ").split("&"), function(pa, ma) {
            var la = ma.split("="),
                ya = n(la[0]),
                za = Z,
                Ja =
                0,
                Ia = ya.split("]["),
                Fa = Ia.length - 1;
            if (/\[/.test(Ia[0]) && /\]$/.test(Ia[Fa])) {
                Ia[Fa] = Ia[Fa].replace(/\]$/, "");
                Ia = Ia.shift().split("[").concat(Ia);
                Fa = Ia.length - 1
            } else Fa = 0;
            if (la.length === 2) {
                la = n(la[1]);
                if (U) la = la && !isNaN(la) ? +la : la === "undefined" ? f : na[la] !== f ? na[la] : la;
                if (Fa)
                    for (; Ja <= Fa; Ja++) {
                        ya = Ia[Ja] === "" ? za.length : Ia[Ja];
                        za = za[ya] = Ja < Fa ? za[ya] || (Ia[Ja + 1] && isNaN(Ia[Ja + 1]) ? {} : []) : la
                    } else if (a.isArray(Z[ya])) Z[ya].push(la);
                    else Z[ya] = Z[ya] !== f ? [Z[ya], la] : la
            } else if (ya) Z[ya] = U ? f : ""
        });
        return Z
    };
    q[N] = b(w,
        0);
    q[ga] = L = b(w, 1);
    a.elemUrlAttr || (a.elemUrlAttr = function(ca) {
        return a.extend(ja, ca)
    })({
        a: Y,
        base: Y,
        iframe: "src",
        img: "src",
        input: "src",
        form: "action",
        link: Y,
        script: "src"
    });
    S = a.elemUrlAttr;
    a.fn[N] = b(c, N);
    a.fn[ga] = b(c, ga);
    Q.pushState = K = function(ca, U) {
        if (g(ca) && /^#/.test(ca) && U === f) U = 2;
        var Z = ca !== f;
        Z = B(s[oa][Y], Z ? ca : {}, Z ? U : 2);
        s[oa][Y] = Z + (/#/.test(Z) ? "" : "#")
    };
    Q.getState = I = function(ca, U) {
        return ca === f || typeof ca === "boolean" ? L(ca) : L(U)[ca]
    };
    Q.removeState = function(ca) {
        var U = {};
        if (ca !== f) {
            U = I();
            a.each(a.isArray(ca) ?
                ca : arguments,
                function(Z, na) {
                    delete U[na]
                })
        }
        K(U, 2)
    };
    R.hashchange = a.extend(R.hashchange, {
        add: function(ca) {
            function U(na) {
                var pa = na[ga] = B();
                na.getState = function(ma, la) {
                    return ma === f || typeof ma === "boolean" ? q(pa, ma) : q(pa, la)[ma]
                };
                Z.apply(this, arguments)
            }
            var Z;
            if (a.isFunction(ca)) {
                Z = ca;
                return U
            } else {
                Z = ca.handler;
                ca.handler = U
            }
        }
    })
})(jQuery, this);
(function(a, s, g) {
    function b(B) {
        B = B || s[c][f];
        return B.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var p, w = a.event.special,
        c = "location",
        f = "href",
        d = document.documentMode,
        n = a.browser.msie && (d === g || d < 8),
        v = "onhashchange" in s && !n;
    a.hashchangeDelay = 100;
    w.hashchange = a.extend(w.hashchange, {
        setup: function() {
            if (v) return false;
            a(p.start)
        },
        teardown: function() {
            if (v) return false;
            a(p.stop)
        }
    });
    p = function() {
        function B() {
            K = I = function(S) {
                return S
            };
            if (n) {
                Q = a('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;
                I = function() {
                    return b(Q.document[c][f])
                };
                K = function(S, R) {
                    if (S !== R) {
                        var N = Q.document;
                        N.open().close();
                        N[c].hash = "#" + S
                    }
                };
                K(b())
            }
        }
        var q = {},
            L, Q, K, I;
        q.start = function() {
            if (!L) {
                var S = b();
                K || B();
                (function R() {
                    var N = b(),
                        ga = I(S);
                    if (N !== S) {
                        K(S = N, ga);
                        a(s).trigger("hashchange")
                    } else if (ga !== S) s[c][f] = s[c][f].replace(/#.*/, "") + "#" + ga;
                    L = setTimeout(R, a.hashchangeDelay)
                })()
            }
        };
        q.stop = function() {
            if (!Q) {
                L && clearTimeout(L);
                L = 0
            }
        };
        return q
    }()
})(jQuery, this);
(function(a) {
    var s = {},
        g;
    a.svgIcons = function(b, p) {
        function w(ca, U) {
            if (ca !== "ajax") {
                if (S) return;
                var Z = (Q = Y[0].contentDocument) && Q.getElementById("svg_eof");
                if (!Z && !(U && Z)) {
                    R++;
                    if (R < 50) setTimeout(w, 20);
                    else {
                        f();
                        S = true
                    }
                    return
                }
                S = true
            }
            L = a(Q.firstChild).children();
            if (p.no_img) setTimeout(function() {
                I || c()
            }, 500);
            else {
                Z = oa + "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D";
                K = a(new Image).attr({
                    src: Z,
                    width: 0,
                    height: 0
                }).appendTo("body").load(function() {
                    c(true)
                }).error(function() {
                    c()
                })
            }
        }

        function c(ca, U) {
            if (!I) {
                if (p.no_img) ca = false;
                if (ca) {
                    var Z = a(document.createElement("div"));
                    Z.hide().appendTo("body")
                }
                if (U) {
                    var na = p.fallback_path ? p.fallback_path : "";
                    a.each(U, function(Fa, Ma) {
                        a("#" + Fa);
                        var Da = a(new Image).attr({
                            "class": "svg_icon",
                            src: na + Ma,
                            width: B,
                            height: q,
                            alt: "icon"
                        });
                        ja(Da, Fa)
                    })
                } else
                    for (var pa = L.length, ma = 0; ma < pa; ma++) {
                        var la = L[ma],
                            ya = la.id;
                        if (ya === "svg_eof") break;
                        a("#" + ya);
                        la = la.getElementsByTagNameNS(n, "svg")[0];
                        var za = document.createElementNS(n, "svg");
                        za.setAttributeNS(n, "viewBox", [0, 0, B, q].join(" "));
                        var Ja = la.getAttribute("width"),
                            Ia = la.getAttribute("height");
                        la.removeAttribute("width");
                        la.removeAttribute("height");
                        la.getAttribute("viewBox") || la.setAttribute("viewBox", [0, 0, Ja, Ia].join(" "));
                        za.setAttribute("xmlns", n);
                        za.setAttribute("width", B);
                        za.setAttribute("height", q);
                        za.setAttribute("xmlns:xlink", v);
                        za.setAttribute("class", "svg_icon");
                        ga || (la = la.cloneNode(true));
                        za.appendChild(la);
                        if (ca) {
                            ga || za.cloneNode(true);
                            Z.empty().append(za);
                            la = oa + d(Z.html());
                            la = a(new Image).attr({
                                "class": "svg_icon",
                                src: la
                            })
                        } else la = g(a(za), ma);
                        ja(la, ya)
                    }
                p.placement && a.each(p.placement, function(Fa, Ma) {
                    s[Ma] && a(Fa).each(function(Da) {
                        var wa = s[Ma].clone();
                        if (Da > 0 && !ca) wa = g(wa, Da, true);
                        Ba(a(this), wa, Ma)
                    })
                });
                if (!U) {
                    ca && Z.remove();
                    Y && Y.remove();
                    K && K.remove()
                }
                p.resize && a.resizeSvgIcons(p.resize);
                I = true;
                p.callback && p.callback(s)
            }
        }

        function f() {
            if (b.indexOf(".svgz") != -1) {
                var ca = b.replace(".svgz", ".svg");
                window.console && console.log(".svgz failed, trying with .svg");
                a.svgIcons(ca, p)
            } else p.fallback && c(false, p.fallback)
        }

        function d(ca) {
            if (window.btoa) return window.btoa(ca);
            var U = Array(Math.floor((ca.length + 2) / 3) * 4),
                Z, na, pa, ma, la, ya, za = 0,
                Ja = 0;
            do {
                Z = ca.charCodeAt(za++);
                na = ca.charCodeAt(za++);
                pa = ca.charCodeAt(za++);
                ma = Z >> 2;
                Z = (Z & 3) << 4 | na >> 4;
                la = (na & 15) << 2 | pa >> 6;
                ya = pa & 63;
                if (isNaN(na)) la = ya = 64;
                else if (isNaN(pa)) ya = 64;
                U[Ja++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(ma);
                U[Ja++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(Z);
                U[Ja++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(la);
                U[Ja++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(ya)
            } while (za < ca.length);
            return U.join("")
        }
        var n = "http://www.w3.org/2000/svg",
            v = "http://www.w3.org/1999/xlink",
            B = p.w ? p.w : 24,
            q = p.h ? p.h : 24,
            L, Q, K, I = false,
            S = false,
            R = 0,
            N = navigator.userAgent,
            ga = !!window.opera;
        N.indexOf("Safari/") > -1 && N.indexOf("Chrome/");
        var oa = "data:image/svg+xml;charset=utf-8;base64,";
        if (p.svgz) {
            var Y = a('<object data="' + b + '" type=image/svg+xml>').appendTo("body").hide();
            try {
                Q = Y[0].contentDocument;
                Y.load(w);
                w(0, true)
            } catch (V) {
                f()
            }
        } else {
            var ea = new DOMParser;
            a.ajax({
                url: b,
                dataType: "string",
                success: function(ca) {
                    if (ca) {
                        Q = ea.parseFromString(ca, "text/xml");
                        a(function() {
                            w("ajax")
                        })
                    } else a(f)
                },
                error: function(ca) {
                    if (window.opera) a(function() {
                        f()
                    });
                    else if (ca.responseText) {
                        Q = ea.parseFromString(ca.responseText, "text/xml");
                        Q.childNodes.length || a(f);
                        a(function() {
                            w("ajax")
                        })
                    } else a(f)
                }
            })
        }
        var Ba = function(ca, U, Z, na) {
                ga && U.css("visibility", "hidden");
                if (p.replace) {
                    na && U.attr("id", Z);
                    (Z = ca.attr("class")) && U.attr("class",
                        "svg_icon " + Z);
                    ca.replaceWith(U)
                } else ca.append(U);
                ga && setTimeout(function() {
                    U.removeAttr("style")
                }, 1)
            },
            ja = function(ca, U) {
                if (p.id_match === undefined || p.id_match !== false) Ba(holder, ca, U, true);
                s[U] = ca
            };
        g = function(ca, U) {
            var Z = ca.find("defs");
            if (!Z.length) return ca;
            Z = ga ? Z.find("*").filter(function() {
                return !!this.id
            }) : Z.find("[id]");
            var na = ca[0].getElementsByTagName("*"),
                pa = na.length;
            Z.each(function(ma) {
                var la = this.id;
                a(Q).find("#" + la);
                this.id = ma = "x" + la + U + ma;
                la = "url(#" + la + ")";
                var ya = "url(#" + ma + ")";
                for (ma =
                    0; ma < pa; ma++) {
                    var za = na[ma];
                    za.getAttribute("fill") === la && za.setAttribute("fill", ya);
                    za.getAttribute("stroke") === la && za.setAttribute("stroke", ya);
                    za.getAttribute("filter") === la && za.setAttribute("filter", ya)
                }
            });
            return ca
        }
    };
    a.getSvgIcon = function(b, p) {
        var w = s[b];
        if (p && w) w = g(w, 0, true).clone(true);
        return w
    };
    a.resizeSvgIcons = function(b) {
        var p = !a(".svg_icon:first").length;
        a.each(b, function(w, c) {
            var f = a.isArray(c),
                d = f ? c[0] : c,
                n = f ? c[1] : c;
            if (p) w = w.replace(/\.svg_icon/g, "svg");
            a(w).each(function() {
                this.setAttribute("width",
                    d);
                this.setAttribute("height", n);
                if (window.opera && window.widget) {
                    this.parentNode.style.width = d + "px";
                    this.parentNode.style.height = n + "px"
                }
            })
        })
    }
})(jQuery);
(function() {
    function a(b, p, w) {
        b = document.createElementNS(s.svg, b);
        if (g)
            for (var c in p) b.setAttribute(c, p[c]);
        else
            for (c in p) {
                var f = p[c],
                    d = b[c];
                if (d && d.constructor === "SVGLength") d.baseVal.value = f;
                else b.setAttribute(c, f)
            }
        w && w.appendChild(b);
        return b
    }
    var s = {
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink"
    };
    if (!window.console) window.console = new function() {
        this.log = function() {};
        this.dir = function() {}
    };
    $.jGraduate = {
        Paint: function(b) {
            b = b || {};
            this.alpha = isNaN(b.alpha) ? 100 : b.alpha;
            if (b.copy) {
                this.type =
                    b.copy.type;
                this.alpha = b.copy.alpha;
                this.radialGradient = this.linearGradient = this.solidColor = null;
                switch (this.type) {
                    case "solidColor":
                        this.solidColor = b.copy.solidColor;
                        break;
                    case "linearGradient":
                        this.linearGradient = b.copy.linearGradient.cloneNode(true);
                        break;
                    case "radialGradient":
                        this.radialGradient = b.copy.radialGradient.cloneNode(true)
                }
            } else if (b.linearGradient) {
                this.type = "linearGradient";
                this.radialGradient = this.solidColor = null;
                this.linearGradient = b.linearGradient.cloneNode(true)
            } else if (b.radialGradient) {
                this.type =
                    "radialGradient";
                this.linearGradient = this.solidColor = null;
                this.radialGradient = b.radialGradient.cloneNode(true)
            } else if (b.solidColor) {
                this.type = "solidColor";
                this.solidColor = b.solidColor
            } else {
                this.type = "none";
                this.radialGradient = this.linearGradient = this.solidColor = null
            }
        }
    };
    jQuery.fn.jGraduateDefaults = {
        paint: new $.jGraduate.Paint,
        window: {
            pickerTitle: "Drag markers to pick a paint"
        },
        images: {
            clientPath: "images/"
        },
        newstop: "inverse"
    };
    var g = navigator.userAgent.indexOf("Gecko/") >= 0;
    jQuery.fn.jGraduate = function(b) {
        var p =
            arguments;
        return this.each(function() {
            function w(ia, aa, ka, M, P) {
                var da = P || a("stop", {
                    "stop-color": aa,
                    "stop-opacity": ka,
                    offset: ia
                }, ea);
                if (P) {
                    aa = P.getAttribute("stop-color");
                    ka = P.getAttribute("stop-opacity");
                    ia = P.getAttribute("offset")
                } else ea.appendChild(da);
                if (ka === null) ka = 1;
                P = a("path", {
                    d: "M-6.2,0.9c3.6-4,6.7-4.3,6.7-12.4c-0.2,7.9,3.1,8.8,6.5,12.4c3.5,3.8,2.9,9.6,0,12.3c-3.1,2.8-10.4,2.7-13.2,0C-9.6,9.9-9.4,4.4-6.2,0.9z",
                    fill: "url(#jGraduate_trans)",
                    transform: "translate(" + (10 + ia * ga) + ", 26)"
                }, kb);
                var Ea =
                    a("path", {
                        d: "M-6.2,0.9c3.6-4,6.7-4.3,6.7-12.4c-0.2,7.9,3.1,8.8,6.5,12.4c3.5,3.8,2.9,9.6,0,12.3c-3.1,2.8-10.4,2.7-13.2,0C-9.6,9.9-9.4,4.4-6.2,0.9z",
                        fill: aa,
                        "fill-opacity": ka,
                        transform: "translate(" + (10 + ia * ga) + ", 26)",
                        stroke: "#000",
                        "stroke-width": 1.5
                    }, kb);
                $(Ea).mousedown(function(Oa) {
                    c(this);
                    Va = cb;
                    S.mousemove(n).mouseup(f);
                    ta = vb.offset();
                    Oa.preventDefault();
                    return false
                }).data("stop", da).data("bg", P).dblclick(function() {
                    $("div.jGraduate_LightBox").show();
                    for (var Oa = this, Wa = +da.getAttribute("stop-opacity") ||
                            1, Za = da.getAttribute("stop-color") || 1, nb = (parseFloat(Wa) * 255).toString(16); nb.length < 2;) nb = "0" + nb;
                    aa = Za.substr(1) + nb;
                    $("#" + q + "_jGraduate_stopPicker").css({
                        left: 100,
                        bottom: 15
                    }).jPicker({
                        window: {
                            title: "Pick the start color and opacity for the gradient"
                        },
                        images: {
                            clientPath: B.images.clientPath
                        },
                        color: {
                            active: aa,
                            alphaSupport: true
                        }
                    }, function(Ra) {
                        Za = Ra.val("hex") ? "#" + Ra.val("hex") : "none";
                        Wa = Ra.val("a") !== null ? Ra.val("a") / 256 : 1;
                        Oa.setAttribute("fill", Za);
                        Oa.setAttribute("fill-opacity", Wa);
                        da.setAttribute("stop-color",
                            Za);
                        da.setAttribute("stop-opacity", Wa);
                        $("div.jGraduate_LightBox").hide();
                        $("#" + q + "_jGraduate_stopPicker").hide()
                    }, null, function() {
                        $("div.jGraduate_LightBox").hide();
                        $("#" + q + "_jGraduate_stopPicker").hide()
                    })
                });
                $(ea).find("stop").each(function() {
                    var Oa = $(this);
                    if (+this.getAttribute("offset") > ia) {
                        if (!aa) {
                            var Wa = this.getAttribute("stop-color"),
                                Za = this.getAttribute("stop-opacity");
                            da.setAttribute("stop-color", Wa);
                            Ea.setAttribute("fill", Wa);
                            da.setAttribute("stop-opacity", Za === null ? 1 : Za);
                            Ea.setAttribute("fill-opacity",
                                Za === null ? 1 : Za)
                        }
                        Oa.before(da);
                        return false
                    }
                });
                M && c(Ea);
                return da
            }

            function c(ia) {
                cb && cb.setAttribute("stroke", "#000");
                ia.setAttribute("stroke", "blue");
                cb = ia;
                cb.parentNode.appendChild(cb)
            }

            function f() {
                S.unbind("mousemove", n);
                if (Ga.getAttribute("display") !== "none") {
                    Ga.setAttribute("display", "none");
                    var ia = $(cb),
                        aa = ia.data("stop");
                    ia = ia.data("bg");
                    $([cb, aa, ia]).remove()
                }
                Va = null
            }

            function d() {
                var ia = Sa ? "rotate(" + Sa + "," + Ha + "," + db + ") " : "";
                $a === 1 && Ka === 1 ? ea.removeAttribute("gradientTransform") : ea.setAttribute("gradientTransform",
                    ia + "translate(" + -Ha * ($a - 1) + "," + -db * (Ka - 1) + ") scale(" + $a + "," + Ka + ")")
            }

            function n(ia) {
                var aa = ia.pageX - ta.left;
                ia = ia.pageY - ta.top;
                aa = aa < 10 ? 10 : aa > ga + 10 ? ga + 10 : aa;
                var ka = "translate(" + aa + ", 26)";
                if (ia < -60 || ia > 130) {
                    Ga.setAttribute("display", "block");
                    Ga.setAttribute("transform", ka)
                } else Ga.setAttribute("display", "none");
                Va.setAttribute("transform", ka);
                $.data(Va, "bg").setAttribute("transform", ka);
                $.data(Va, "stop").setAttribute("offset", (aa - 10) / ga);
                var M = 0;
                $(ea).find("stop").each(function() {
                    var P = this.getAttribute("offset"),
                        da = $(this);
                    if (P < M) {
                        da.prev().before(da);
                        va = $(ea).find("stop")
                    }
                    M = P
                })
            }
            var v = $(this),
                B = $.extend(true, {}, jQuery.fn.jGraduateDefaults, b),
                q = v.attr("id"),
                L = "#" + v.attr("id") + " ";
            if (L) {
                var Q = function() {
                        switch (v.paint.type) {
                            case "radialGradient":
                                v.paint.linearGradient = null;
                                break;
                            case "linearGradient":
                                v.paint.radialGradient = null;
                                break;
                            case "solidColor":
                                v.paint.radialGradient = v.paint.linearGradient = null
                        }
                        $.isFunction(v.okCallback) && v.okCallback(v.paint);
                        v.hide()
                    },
                    K = function() {
                        $.isFunction(v.cancelCallback) && v.cancelCallback();
                        v.hide()
                    };
                $.extend(true, v, {
                    paint: new $.jGraduate.Paint({
                        copy: B.paint
                    }),
                    okCallback: $.isFunction(p[1]) && p[1] || null,
                    cancelCallback: $.isFunction(p[2]) && p[2] || null
                });
                v.position();
                var I = null,
                    S = $(window);
                if (v.paint.type == "none") v.paint = $.jGraduate.Paint({
                    solidColor: "ffffff"
                });
                v.addClass("jGraduate_Picker");
                v.html('<ul class="jGraduate_tabs"><li class="jGraduate_tab_color jGraduate_tab_current" data-type="col">Solid Color</li><li class="jGraduate_tab_lingrad" data-type="lg">Linear Gradient</li><li class="jGraduate_tab_radgrad" data-type="rg">Radial Gradient</li></ul><div class="jGraduate_colPick"></div><div class="jGraduate_gradPick"></div><div class="jGraduate_LightBox"></div><div id="' +
                    q + '_jGraduate_stopPicker" class="jGraduate_stopPicker"></div>');
                var R = $(L + "> .jGraduate_colPick"),
                    N = $(L + "> .jGraduate_gradPick");
                N.html('<div id="' + q + '_jGraduate_Swatch" class="jGraduate_Swatch"><h2 class="jGraduate_Title">' + B.window.pickerTitle + '</h2><div id="' + q + '_jGraduate_GradContainer" class="jGraduate_GradContainer"></div><div id="' + q + '_jGraduate_StopSlider" class="jGraduate_StopSlider"></div></div><div class="jGraduate_Form jGraduate_Points jGraduate_lg_field"><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">Begin Point</label><div class="jGraduate_Form_Section"><label>x:</label><input type="text" id="' +
                    q + '_jGraduate_x1" size="3" title="Enter starting x value between 0.0 and 1.0"/><label> y:</label><input type="text" id="' + q + '_jGraduate_y1" size="3" title="Enter starting y value between 0.0 and 1.0"/></div></div><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">End Point</label><div class="jGraduate_Form_Section"><label>x:</label><input type="text" id="' + q + '_jGraduate_x2" size="3" title="Enter ending x value between 0.0 and 1.0"/><label> y:</label><input type="text" id="' +
                    q + '_jGraduate_y2" size="3" title="Enter ending y value between 0.0 and 1.0"/></div></div></div><div class="jGraduate_Form jGraduate_Points jGraduate_rg_field"><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">Center Point</label><div class="jGraduate_Form_Section"><label>x:</label><input type="text" id="' + q + '_jGraduate_cx" size="3" title="Enter x value between 0.0 and 1.0"/><label> y:</label><input type="text" id="' + q + '_jGraduate_cy" size="3" title="Enter y value between 0.0 and 1.0"/></div></div><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">Focal Point</label><div class="jGraduate_Form_Section"><label>Match center: <input type="checkbox" checked="checked" id="' +
                    q + '_jGraduate_match_ctr"/></label><br/><label>x:</label><input type="text" id="' + q + '_jGraduate_fx" size="3" title="Enter x value between 0.0 and 1.0"/><label> y:</label><input type="text" id="' + q + '_jGraduate_fy" size="3" title="Enter y value between 0.0 and 1.0"/></div></div></div><div class="jGraduate_StopSection jGraduate_SpreadMethod"><label class="jGraduate_Form_Heading">Spread method</label><div class="jGraduate_Form_Section"><select class="jGraduate_spreadMethod"><option value=pad selected>Pad</option><option value=reflect>Reflect</option><option value=repeat>Repeat</option></select></div></div><div class="jGraduate_Form"><div class="jGraduate_Slider jGraduate_RadiusField jGraduate_rg_field"><label class="prelabel">Radius:</label><div id="' +
                    q + '_jGraduate_Radius" class="jGraduate_SliderBar jGraduate_Radius" title="Click to set radius"><img id="' + q + '_jGraduate_RadiusArrows" class="jGraduate_RadiusArrows" src="' + B.images.clientPath + 'rangearrows2.gif"></div><label><input type="text" id="' + q + '_jGraduate_RadiusInput" size="3" value="100"/>%</label></div><div class="jGraduate_Slider jGraduate_EllipField jGraduate_rg_field"><label class="prelabel">Ellip:</label><div id="' + q + '_jGraduate_Ellip" class="jGraduate_SliderBar jGraduate_Ellip" title="Click to set Ellip"><img id="' +
                    q + '_jGraduate_EllipArrows" class="jGraduate_EllipArrows" src="' + B.images.clientPath + 'rangearrows2.gif"></div><label><input type="text" id="' + q + '_jGraduate_EllipInput" size="3" value="0"/>%</label></div><div class="jGraduate_Slider jGraduate_AngleField jGraduate_rg_field"><label class="prelabel">Angle:</label><div id="' + q + '_jGraduate_Angle" class="jGraduate_SliderBar jGraduate_Angle" title="Click to set Angle"><img id="' + q + '_jGraduate_AngleArrows" class="jGraduate_AngleArrows" src="' + B.images.clientPath +
                    'rangearrows2.gif"></div><label><input type="text" id="' + q + '_jGraduate_AngleInput" size="3" value="0"/>\u00ba&nbsp;</label></div><div class="jGraduate_Slider jGraduate_OpacField"><label class="prelabel">Opac:</label><div id="' + q + '_jGraduate_Opac" class="jGraduate_SliderBar jGraduate_Opac" title="Click to set Opac"><img id="' + q + '_jGraduate_OpacArrows" class="jGraduate_OpacArrows" src="' + B.images.clientPath + 'rangearrows2.gif"></div><label><input type="text" id="' + q + '_jGraduate_OpacInput" size="3" value="100"/>%</label></div></div><div class="jGraduate_OkCancel"><input type="button" id="' +
                    q + '_jGraduate_Ok" class="jGraduate_Ok" value="OK"/><input type="button" id="' + q + '_jGraduate_Cancel" class="jGraduate_Cancel" value="Cancel"/></div>');
                var ga = 256,
                    oa = ga - 0,
                    Y = ga - 0,
                    V, ea, Ba, ja = {};
                $(".jGraduate_SliderBar").width(145);
                var ca = $("#" + q + "_jGraduate_GradContainer")[0],
                    U = a("svg", {
                        id: q + "_jgraduate_svg",
                        width: ga,
                        height: ga,
                        xmlns: s.svg
                    }, ca);
                V = V || v.paint.type;
                var Z = ea = v.paint[V],
                    na = v.paint.alpha,
                    pa = V === "solidColor";
                switch (V) {
                    case "solidColor":
                    case "linearGradient":
                        if (!pa) {
                            ea.id = q + "_lg_jgraduate_grad";
                            Z = ea = U.appendChild(ea)
                        }
                        a("radialGradient", {
                            id: q + "_rg_jgraduate_grad"
                        }, U);
                        if (V === "linearGradient") break;
                    case "radialGradient":
                        if (!pa) {
                            ea.id = q + "_rg_jgraduate_grad";
                            Z = ea = U.appendChild(ea)
                        }
                        a("linearGradient", {
                            id: q + "_lg_jgraduate_grad"
                        }, U)
                }
                if (pa) {
                    Z = ea = $("#" + q + "_lg_jgraduate_grad")[0];
                    I = v.paint[V];
                    w(0, "#" + I, 1);
                    var ma = typeof B.newstop;
                    if (ma === "string") switch (B.newstop) {
                        case "same":
                            w(1, "#" + I, 1);
                            break;
                        case "inverse":
                            ma = "";
                            for (var la = 0; la < 6; la += 2) {
                                I.substr(la, 2);
                                var ya = (255 - parseInt(I.substr(la, 2), 16)).toString(16);
                                if (ya.length < 2) ya = 0 + ya;
                                ma += ya
                            }
                            w(1, "#" + ma, 1);
                            break;
                        case "white":
                            w(1, "#ffffff", 1);
                            break;
                        case "black":
                            w(1, "#000000", 1)
                    } else if (ma === "object") w(1, B.newstop.color || "#" + I, "opac" in B.newstop ? B.newstop.opac : 1)
                }
                I = parseFloat(Z.getAttribute("x1") || 0);
                ma = parseFloat(Z.getAttribute("y1") || 0);
                la = parseFloat(Z.getAttribute("x2") || 1);
                ya = parseFloat(Z.getAttribute("y2") || 0);
                var za = parseFloat(Z.getAttribute("cx") || 0.5),
                    Ja = parseFloat(Z.getAttribute("cy") || 0.5),
                    Ia = parseFloat(Z.getAttribute("fx") || za),
                    Fa = parseFloat(Z.getAttribute("fy") ||
                        Ja);
                Ba = a("rect", {
                    id: q + "_jgraduate_rect",
                    x: 0,
                    y: 0,
                    width: oa,
                    height: Y,
                    fill: "url(#" + q + "_jgraduate_grad)",
                    "fill-opacity": na / 100
                }, U);
                var Ma = $("<div/>").attr({
                        "class": "grad_coord jGraduate_lg_field",
                        title: "Begin Stop"
                    }).text(1).css({
                        top: ma * ga,
                        left: I * ga
                    }).data("coord", "start").appendTo(ca),
                    Da = Ma.clone().text(2).css({
                        top: ya * ga,
                        left: la * ga
                    }).attr("title", "End stop").data("coord", "end").appendTo(ca),
                    wa = $("<div/>").attr({
                        "class": "grad_coord jGraduate_rg_field",
                        title: "Center stop"
                    }).text("C").css({
                        top: Ja * ga,
                        left: za *
                            ga
                    }).data("coord", "center").appendTo(ca),
                    ra = wa.clone().text("F").css({
                        top: Fa * ga,
                        left: Ia * ga,
                        display: "none"
                    }).attr("title", "Focus point").data("coord", "focus").appendTo(ca);
                ra[0].id = q + "_jGraduate_focusCoord";
                $(L + " .grad_coord");
                $.each(["x1", "y1", "x2", "y2", "cx", "cy", "fx", "fy"], function(ia, aa) {
                    var ka = ea.getAttribute(aa),
                        M = isNaN(aa[1]);
                    ka || (ka = M ? "0.5" : aa === "x2" ? "1.0" : "0.0");
                    ja[aa] = $("#" + q + "_jGraduate_" + aa).val(ka).change(function() {
                        if (isNaN(parseFloat(this.value)) || this.value < 0) this.value = 0;
                        else if (this.value >
                            1) this.value = 1;
                        if (!(aa[0] === "f" && !eb))
                            if (M && V === "radialGradient" || !M && V === "linearGradient") ea.setAttribute(aa, this.value);
                        var P = M ? aa[0] === "c" ? wa : ra : aa[1] === "1" ? Ma : Da,
                            da = aa.indexOf("x") >= 0 ? "left" : "top";
                        P.css(da, this.value * ga)
                    }).change()
                });
                var va, kb, vb = $("#" + q + "_jGraduate_StopSlider"),
                    cb, Ta, Va, Ga = a("path", {
                        d: "m9.75,-6l-19.5,19.5m0,-19.5l19.5,19.5",
                        fill: "none",
                        stroke: "#D00",
                        "stroke-width": 5,
                        display: "none"
                    }, Ta),
                    ta, $a = 1,
                    Ka = 1,
                    Sa = 0,
                    Ha = za,
                    db = Ja;
                Ta = a("svg", {
                    width: "100%",
                    height: 45
                }, vb[0]);
                ca = a("pattern", {
                    width: 16,
                    height: 16,
                    patternUnits: "userSpaceOnUse",
                    id: "jGraduate_trans"
                }, Ta);
                a("image", {
                    width: 16,
                    height: 16
                }, ca).setAttributeNS(s.xlink, "xlink:href", B.images.clientPath + "map-opacity.png");
                $(Ta).on("click touchstart", function(ia) {
                    ta = vb.offset();
                    if (ia.target.tagName !== "path") {
                        var aa = ia.pageX - ta.left - 8;
                        aa = aa < 10 ? 10 : aa > ga + 10 ? ga + 10 : aa;
                        w(aa / ga, 0, 0, true);
                        ia.stopPropagation()
                    }
                });
                $(Ta).mouseover(function() {
                    Ta.appendChild(Ga)
                });
                kb = a("g", {}, Ta);
                a("line", {
                    x1: 10,
                    y1: 15,
                    x2: ga + 10,
                    y2: 15,
                    "stroke-width": 2,
                    stroke: "#000"
                }, Ta);
                var lb =
                    N.find(".jGraduate_spreadMethod").change(function() {
                        ea.setAttribute("spreadMethod", $(this).val())
                    }),
                    Ua = null,
                    Xa = function(ia) {
                        var aa = ia.pageX - hb.left,
                            ka = ia.pageY - hb.top;
                        aa = aa < 0 ? 0 : aa > ga ? ga : aa;
                        ka = ka < 0 ? 0 : ka > ga ? ga : ka;
                        Ua.css("left", aa).css("top", ka);
                        aa = aa / oa;
                        ka = ka / Y;
                        var M = Ua.data("coord"),
                            P = ea;
                        switch (M) {
                            case "start":
                                ja.x1.val(aa);
                                ja.y1.val(ka);
                                P.setAttribute("x1", aa);
                                P.setAttribute("y1", ka);
                                break;
                            case "end":
                                ja.x2.val(aa);
                                ja.y2.val(ka);
                                P.setAttribute("x2", aa);
                                P.setAttribute("y2", ka);
                                break;
                            case "center":
                                ja.cx.val(aa);
                                ja.cy.val(ka);
                                P.setAttribute("cx", aa);
                                P.setAttribute("cy", ka);
                                Ha = aa;
                                db = ka;
                                d();
                                break;
                            case "focus":
                                ja.fx.val(aa);
                                ja.fy.val(ka);
                                P.setAttribute("fx", aa);
                                P.setAttribute("fy", ka);
                                d()
                        }
                        ia.preventDefault()
                    },
                    wb = function() {
                        Ua = null;
                        S.unbind("mousemove", Xa).unbind("mouseup", wb)
                    };
                va = ea.getElementsByTagNameNS(s.svg, "stop");
                if (sa < 2) {
                    for (; sa < 2;) {
                        ea.appendChild(document.createElementNS(s.svg, "stop"));
                        ++sa
                    }
                    va = ea.getElementsByTagNameNS(s.svg, "stop")
                }
                var sa = va.length;
                for (la = 0; la < sa; la++) w(0, 0, 0, 0, va[la]);
                lb.val(ea.getAttribute("spreadMethod") ||
                    "pad");
                var hb, eb = false;
                Ba.setAttribute("fill-opacity", na / 100);
                $("#" + q + " div.grad_coord").mousedown(function(ia) {
                    ia.preventDefault();
                    Ua = $(this);
                    Ua.offset();
                    hb = Ua.parent().offset();
                    S.mousemove(Xa).mouseup(wb)
                });
                $("#" + q + "_jGraduate_Ok").bind("click touchstart", function() {
                    v.paint.type = V;
                    v.paint[V] = ea.cloneNode(true);
                    v.paint.solidColor = null;
                    Q()
                });
                $("#" + q + "_jGraduate_Cancel").bind("click touchstart", function() {
                    K()
                });
                if (V === "radialGradient")
                    if (eb) ra.show();
                    else {
                        ra.hide();
                        ja.fx.val("");
                        ja.fy.val("")
                    }
                $("#" +
                    q + "_jGraduate_match_ctr")[0].checked = !eb;
                var sb, ib;
                $("#" + q + "_jGraduate_match_ctr").change(function() {
                    eb = !this.checked;
                    ra.toggle(eb);
                    ja.fx.val("");
                    ja.fy.val("");
                    var ia = ea;
                    if (eb) {
                        var aa = sb || 0.5,
                            ka = ib || 0.5;
                        ia.setAttribute("fx", aa);
                        ia.setAttribute("fy", ka);
                        ja.fx.val(aa);
                        ja.fy.val(ka)
                    } else {
                        sb = ia.getAttribute("fx");
                        ib = ia.getAttribute("fy");
                        ia.removeAttribute("fx");
                        ia.removeAttribute("fy")
                    }
                });
                va = ea.getElementsByTagNameNS(s.svg, "stop");
                sa = va.length;
                if (sa < 2) {
                    for (; sa < 2;) {
                        ea.appendChild(document.createElementNS(s.svg,
                            "stop"));
                        ++sa
                    }
                    va = ea.getElementsByTagNameNS(s.svg, "stop")
                }
                var ab;
                na = N = 0;
                if (V === "radialGradient") {
                    U = ea.gradientTransform.baseVal;
                    if (U.numberOfItems === 2) {
                        sa = U.getItem(0);
                        U = U.getItem(1);
                        if (sa.type === 2 && U.type === 3) {
                            sa = U.matrix;
                            if (sa.a !== 1) N = Math.round(-(1 - sa.a) * 100);
                            else if (sa.d !== 1) N = Math.round((1 - sa.d) * 100)
                        }
                    } else if (U.numberOfItems === 3) {
                        ca = U.getItem(0);
                        sa = U.getItem(1);
                        U = U.getItem(2);
                        if (ca.type === 4 && sa.type === 2 && U.type === 3) {
                            na = Math.round(ca.angle);
                            sa = U.matrix;
                            if (sa.a !== 1) N = Math.round(-(1 - sa.a) * 100);
                            else if (sa.d !==
                                1) N = Math.round((1 - sa.d) * 100)
                        }
                    }
                }
                N = {
                    radius: {
                        handle: "#" + q + "_jGraduate_RadiusArrows",
                        input: "#" + q + "_jGraduate_RadiusInput",
                        val: (ea.getAttribute("r") || 0.5) * 100
                    },
                    opacity: {
                        handle: "#" + q + "_jGraduate_OpacArrows",
                        input: "#" + q + "_jGraduate_OpacInput",
                        val: v.paint.alpha || 100
                    },
                    ellip: {
                        handle: "#" + q + "_jGraduate_EllipArrows",
                        input: "#" + q + "_jGraduate_EllipInput",
                        val: N
                    },
                    angle: {
                        handle: "#" + q + "_jGraduate_AngleArrows",
                        input: "#" + q + "_jGraduate_AngleInput",
                        val: na
                    }
                };
                $.each(N, function(ia, aa) {
                    var ka = $(aa.handle);
                    ka.mousedown(function(M) {
                        var P =
                            ka.parent();
                        ab = {
                            type: ia,
                            elem: ka,
                            input: $(aa.input),
                            parent: P,
                            offset: P.offset()
                        };
                        S.mousemove(ob).mouseup(pb);
                        M.preventDefault()
                    });
                    $(aa.input).val(aa.val).change(function() {
                        var M = +this.value,
                            P = 0,
                            da = V === "radialGradient";
                        switch (ia) {
                            case "radius":
                                da && ea.setAttribute("r", M / 100);
                                P = Math.pow(M / 100, 0.4) / 2 * 145;
                                break;
                            case "opacity":
                                v.paint.alpha = M;
                                Ba.setAttribute("fill-opacity", M / 100);
                                P = M * 1.45;
                                break;
                            case "ellip":
                                $a = Ka = 1;
                                if (M === 0) {
                                    P = 72.5;
                                    break
                                }
                                if (M > 99.5) M = 99.5;
                                if (M > 0) Ka = 1 - M / 100;
                                else $a = -(M / 100) - 1;
                                P = 145 * ((M + 100) /
                                    2) / 100;
                                da && d();
                                break;
                            case "angle":
                                Sa = M;
                                P = Sa / 180;
                                P += 0.5;
                                P *= 145;
                                da && d()
                        }
                        if (P > 145) P = 145;
                        else if (P < 0) P = 0;
                        ka.css({
                            "margin-left": P - 5
                        })
                    }).change()
                });
                var ob = function(ia) {
                        var aa = ia.pageX - ab.offset.left - parseInt(ab.parent.css("border-left-width"));
                        if (aa > 145) aa = 145;
                        if (aa <= 0) aa = 0;
                        var ka = aa - 5;
                        aa /= 145;
                        switch (ab.type) {
                            case "radius":
                                aa = Math.pow(aa * 2, 2.5);
                                if (aa > 0.98 && aa < 1.02) aa = 1;
                                if (aa <= 0.01) aa = 0.01;
                                ea.setAttribute("r", aa);
                                break;
                            case "opacity":
                                v.paint.alpha = parseInt(aa * 100);
                                Ba.setAttribute("fill-opacity", aa);
                                break;
                            case "ellip":
                                Ka = $a = 1;
                                if (aa < 0.5) {
                                    aa /= 0.5;
                                    $a = aa <= 0 ? 0.01 : aa
                                } else if (aa > 0.5) {
                                    aa /= 0.5;
                                    aa = 2 - aa;
                                    Ka = aa <= 0 ? 0.01 : aa
                                }
                                d();
                                aa -= 1;
                                if (Ka === aa + 1) aa = Math.abs(aa);
                                break;
                            case "angle":
                                aa -= 0.5;
                                Sa = aa *= 180;
                                d();
                                aa /= 100
                        }
                        ab.elem.css({
                            "margin-left": ka
                        });
                        aa = Math.round(aa * 100);
                        ab.input.val(aa);
                        ia.preventDefault()
                    },
                    pb = function() {
                        S.unbind("mousemove", ob).unbind("mouseup", pb);
                        ab = null
                    };
                for (N = (v.paint.alpha * 255 / 100).toString(16); N.length < 2;) N = "0" + N;
                N = N.split(".")[0];
                I = v.paint.solidColor == "none" ? "" : v.paint.solidColor + N;
                pa || (I = va[0].getAttribute("stop-color"));
                $.extend($.fn.jPicker.defaults.window, {
                    alphaSupport: true,
                    effects: {
                        type: "show",
                        speed: 0
                    }
                });
                R.jPicker({
                    window: {
                        title: B.window.pickerTitle
                    },
                    images: {
                        clientPath: B.images.clientPath
                    },
                    color: {
                        active: I,
                        alphaSupport: true
                    }
                }, function(ia) {
                    v.paint.type = "solidColor";
                    v.paint.alpha = ia.val("ahex") ? Math.round(ia.val("a") / 255 * 100) : 100;
                    v.paint.solidColor = ia.val("hex") ? ia.val("hex") : "none";
                    v.paint.radialGradient = null;
                    Q()
                }, null, function() {
                    K()
                });
                var fb = $(L + " .jGraduate_tabs li");
                fb.on("click touchstart", function() {
                    fb.removeClass("jGraduate_tab_current");
                    $(this).addClass("jGraduate_tab_current");
                    $(L + " > div").hide();
                    var ia = $(this).attr("data-type");
                    $(L + " .jGraduate_gradPick").show();
                    if (ia === "rg" || ia === "lg") {
                        $(".jGraduate_" + ia + "_field").show();
                        $(".jGraduate_" + (ia === "lg" ? "rg" : "lg") + "_field").hide();
                        $("#" + q + "_jgraduate_rect")[0].setAttribute("fill", "url(#" + q + "_" + ia + "_jgraduate_grad)");
                        V = ia === "lg" ? "linearGradient" : "radialGradient";
                        $("#" + q + "_jGraduate_OpacInput").val(v.paint.alpha).change();
                        var aa = $("#" + q + "_" + ia + "_jgraduate_grad")[0];
                        if (ea !== aa) {
                            var ka =
                                $(ea).find("stop");
                            $(aa).empty().append(ka);
                            ea = aa;
                            aa = lb.val();
                            ea.setAttribute("spreadMethod", aa)
                        }
                        eb = ia === "rg" && ea.getAttribute("fx") != null && !(za == Ia && Ja == Fa);
                        $("#" + q + "_jGraduate_focusCoord").toggle(eb);
                        if (eb) $("#" + q + "_jGraduate_match_ctr")[0].checked = false
                    } else {
                        $(L + " .jGraduate_gradPick").hide();
                        $(L + " .jGraduate_colPick").show()
                    }
                });
                $(L + " > div").hide();
                fb.removeClass("jGraduate_tab_current");
                var tb;
                switch (v.paint.type) {
                    case "linearGradient":
                        tb = $(L + " .jGraduate_tab_lingrad");
                        break;
                    case "radialGradient":
                        tb =
                            $(L + " .jGraduate_tab_radgrad");
                        break;
                    default:
                        tb = $(L + " .jGraduate_tab_color")
                }
                v.show();
                setTimeout(function() {
                    tb.addClass("jGraduate_tab_current").click()
                }, 10)
            } else alert("Container element must have an id attribute to maintain unique id strings for sub-elements.")
        })
    }
})();
jQuery && function() {
    var a = $(window),
        s = $(document);
    $.extend($.fn, {
        contextMenu: function(g, b) {
            if (g.menu == undefined) return false;
            if (g.inSpeed == undefined) g.inSpeed = 150;
            if (g.outSpeed == undefined) g.outSpeed = 75;
            if (g.inSpeed == 0) g.inSpeed = -1;
            if (g.outSpeed == 0) g.outSpeed = -1;
            $(this).each(function() {
                var p = $(this),
                    w = $(p).offset(),
                    c = $("#" + g.menu);
                c.addClass("contextMenu");
                $(this).bind("mousedown", function(d) {
                    $(this).on("mouseup", function(n) {
                        var v = $(this);
                        v.unbind("mouseup");
                        $(".contextMenu").hide();
                        if (d.button === 2 ||
                            g.allowLeft || d.ctrlKey && svgedit.browser.isMac()) svgedit.browser.isTouch() || f(n, d, v)
                    })
                });
                svgedit.browser.isTouch() && $(this).bind("taphold", function(d) {
                    var n = $(this);
                    n.unbind("mouseup");
                    f(d, d, n)
                });
                var f = function(d, n, v) {
                    if (typeof n == "undefined") n = d;
                    d.stopPropagation();
                    if (p.hasClass("disabled") || n.altKey) return false;
                    var B = d.pageX,
                        q = d.pageY;
                    if (svgedit.browser.isTouch()) {
                        B = d.originalEvent.touches[0].pageX;
                        q = d.originalEvent.touches[0].pageY
                    }
                    d = a.width() - c.width();
                    n = a.height() - c.height();
                    if (B > d - 15) B = d - 15;
                    if (q > n - 30) q = n - 30;
                    if (svgedit.browser.isTouch()) q -= c.height() / 2;
                    s.unbind("click");
                    c.css({
                        top: q,
                        left: B
                    }).fadeIn(g.inSpeed);
                    c.find("A").mouseover(function() {
                        c.find("LI.hover").removeClass("hover");
                        $(this).parent().addClass("hover")
                    }).mouseout(function() {
                        c.find("LI.hover").removeClass("hover")
                    });
                    s.keypress(function(L) {
                        switch (L.keyCode) {
                            case 38:
                                if (c.find("LI.hover").length) {
                                    c.find("LI.hover").removeClass("hover").prevAll("LI:not(.disabled)").eq(0).addClass("hover");
                                    c.find("LI.hover").length || c.find("LI:last").addClass("hover")
                                } else c.find("LI:last").addClass("hover");
                                break;
                            case 40:
                                if (c.find("LI.hover").length == 0) c.find("LI:first").addClass("hover");
                                else {
                                    c.find("LI.hover").removeClass("hover").nextAll("LI:not(.disabled)").eq(0).addClass("hover");
                                    c.find("LI.hover").length || c.find("LI:first").addClass("hover")
                                }
                                break;
                            case 13:
                                c.find("LI.hover A").trigger("click");
                                break;
                            case 27:
                                s.trigger("click")
                        }
                    });
                    c.find("A").unbind("mouseup");
                    c.find("LI:not(.disabled) A").mouseup(function() {
                        s.unbind("click").unbind("keypress");
                        $(".contextMenu").hide();
                        b && b($(this).attr("href").substr(1),
                            $(v), {
                                x: B - w.left,
                                y: q - w.top,
                                docX: B,
                                docY: q
                            });
                        return false
                    });
                    setTimeout(function() {
                        s.click(function() {
                            s.unbind("click").unbind("keypress");
                            c.fadeOut(g.outSpeed);
                            return false
                        })
                    }, 0)
                };
                if ($.browser.mozilla) $("#" + g.menu).each(function() {
                    $(this).css({
                        MozUserSelect: "none"
                    })
                });
                else $.browser.msie ? $("#" + g.menu).each(function() {
                    $(this).bind("selectstart.disableTextSelect", function() {
                        return false
                    })
                }) : $("#" + g.menu).each(function() {
                    $(this).bind("mousedown.disableTextSelect", function() {
                        return false
                    })
                });
                $(p).add($("UL.contextMenu")).bind("contextmenu",
                    function() {
                        return false
                    })
            });
            return $(this)
        },
        disableContextMenuItems: function(g) {
            if (g == undefined) {
                $(this).find("LI").addClass("disabled");
                return $(this)
            }
            $(this).each(function() {
                if (g != undefined)
                    for (var b = g.split(","), p = 0; p < b.length; p++) $(this).find('A[href="' + b[p] + '"]').parent().addClass("disabled")
            });
            return $(this)
        },
        enableContextMenuItems: function(g) {
            if (g == undefined) {
                $(this).find("LI.disabled").removeClass("disabled");
                return $(this)
            }
            $(this).each(function() {
                if (g != undefined)
                    for (var b = g.split(","), p =
                            0; p < b.length; p++) $(this).find('A[href="' + b[p] + '"]').parent().removeClass("disabled")
            });
            return $(this)
        },
        disableContextMenu: function() {
            $(this).each(function() {
                $(this).addClass("disabled")
            });
            return $(this)
        },
        enableContextMenu: function() {
            $(this).each(function() {
                $(this).removeClass("disabled")
            });
            return $(this)
        },
        destroyContextMenu: function() {
            $(this).each(function() {
                $(this).unbind("mousedown").unbind("mouseup")
            });
            return $(this)
        }
    })
}(jQuery);
var svgedit = svgedit || {};
(function() {
    if (!svgedit.browser) svgedit.browser = {};
    var a = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    svgedit.browser.supportsSvg = function() {
        return a
    };
    if (svgedit.browser.supportsSvg()) {
        var s = navigator.userAgent,
            g = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            b = !!window.opera,
            p = s.indexOf("AppleWebKit") >= 0,
            w = s.indexOf("Gecko/") >= 0,
            c = s.indexOf("MSIE") >= 0,
            f = s.indexOf("Chrome/") >= 0,
            d = s.indexOf("Windows") >= 0,
            n = s.indexOf("Macintosh") >=
            0,
            v = "ontouchstart" in window,
            B = !!g.querySelector,
            q = !!document.evaluate,
            L = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg", "path");
                oa.setAttribute("d", "M0,0 10,10");
                var Y = oa.pathSegList;
                oa = oa.createSVGPathSegLinetoAbs(5, 5);
                try {
                    Y.replaceItem(oa, 0);
                    return true
                } catch (V) {}
                return false
            }(),
            Q = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg", "path");
                oa.setAttribute("d", "M0,0 10,10");
                var Y = oa.pathSegList;
                oa = oa.createSVGPathSegLinetoAbs(5, 5);
                try {
                    Y.insertItemBefore(oa,
                        0);
                    return true
                } catch (V) {}
                return false
            }(),
            K = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                    Y = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                document.documentElement.appendChild(oa);
                Y.setAttribute("x", 5);
                oa.appendChild(Y);
                var V = document.createElementNS("http://www.w3.org/2000/svg", "text");
                V.textContent = "a";
                Y.appendChild(V);
                Y = V.getStartPositionOfChar(0);
                Y = Y.x;
                document.documentElement.removeChild(oa);
                return Y === 0
            }(),
            I = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg",
                    "svg");
                document.documentElement.appendChild(oa);
                var Y = document.createElementNS("http://www.w3.org/2000/svg", "path");
                Y.setAttribute("d", "M0,0 C0,0 10,10 10,0");
                oa.appendChild(Y);
                Y = Y.getBBox();
                document.documentElement.removeChild(oa);
                return Y.height > 4 && Y.height < 5
            }(),
            S = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                document.documentElement.appendChild(oa);
                var Y = document.createElementNS("http://www.w3.org/2000/svg", "path");
                Y.setAttribute("d", "M0,0 10,0");
                var V = document.createElementNS("http://www.w3.org/2000/svg",
                    "path");
                V.setAttribute("d", "M5,0 15,0");
                var ea = document.createElementNS("http://www.w3.org/2000/svg", "g");
                ea.appendChild(Y);
                ea.appendChild(V);
                oa.appendChild(ea);
                Y = ea.getBBox();
                document.documentElement.removeChild(oa);
                return Y.width == 15
            }(),
            R = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                oa.setAttribute("x", 0.1);
                (oa = oa.cloneNode(false).getAttribute("x").indexOf(",") == -1) || $.alert("NOTE: This version of Opera is known to contain bugs in SVG-edit.\n\t\tPlease upgrade to the <a href='http://opera.com'>latest version</a> in which the problems have been fixed.");
                return oa
            }(),
            N = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                oa.setAttribute("style", "vector-effect:non-scaling-stroke");
                return oa.style.vectorEffect === "non-scaling-stroke"
            }(),
            ga = function() {
                var oa = document.createElementNS("http://www.w3.org/2000/svg", "rect").transform.baseVal,
                    Y = g.createSVGTransform();
                oa.appendItem(Y);
                return oa.getItem(0) == Y
            }();
        svgedit.browser.isOpera = function() {
            return b
        };
        svgedit.browser.isWebkit = function() {
            return p
        };
        svgedit.browser.isGecko = function() {
            return w
        };
        svgedit.browser.isIE = function() {
            return c
        };
        svgedit.browser.isChrome = function() {
            return f
        };
        svgedit.browser.isWindows = function() {
            return d
        };
        svgedit.browser.isMac = function() {
            return n
        };
        svgedit.browser.isTouch = function() {
            return v
        };
        svgedit.browser.supportsSelectors = function() {
            return B
        };
        svgedit.browser.supportsXpath = function() {
            return q
        };
        svgedit.browser.supportsPathReplaceItem = function() {
            return L
        };
        svgedit.browser.supportsPathInsertItemBefore = function() {
            return Q
        };
        svgedit.browser.supportsPathBBox = function() {
            return I
        };
        svgedit.browser.supportsHVLineContainerBBox = function() {
            return S
        };
        svgedit.browser.supportsGoodTextCharPos = function() {
            return K
        };
        svgedit.browser.supportsEditableText = function() {
            return b
        };
        svgedit.browser.supportsGoodDecimals = function() {
            return R
        };
        svgedit.browser.supportsNonScalingStroke = function() {
            return N
        };
        svgedit.browser.supportsNativeTransformLists = function() {
            return ga
        }
    } else window.location = "browser-not-supported.html"
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.transformlist) svgedit.transformlist = {};
    var a = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        s = {};
    svgedit.transformlist.SVGTransformList = function(g) {
        this._elem = g || null;
        this._xforms = [];
        this._update = function() {
            var b = "";
            a.createSVGMatrix();
            for (var p = 0; p < this.numberOfItems; ++p) {
                var w = this._list.getItem(p);
                b = b;
                w = w;
                var c = w.matrix,
                    f = "";
                switch (w.type) {
                    case 1:
                        f = "matrix(" + [c.a, c.b, c.c, c.d, c.e, c.f].join(",") + ")";
                        break;
                    case 2:
                        f = "translate(" + c.e + "," + c.f + ")";
                        break;
                    case 3:
                        f =
                            c.a == c.d ? "scale(" + c.a + ")" : "scale(" + c.a + "," + c.d + ")";
                        break;
                    case 4:
                        var d = 0;
                        f = 0;
                        if (w.angle != 0) {
                            d = 1 - c.a;
                            f = (d * c.f + c.b * c.e) / (d * d + c.b * c.b);
                            d = (c.e - c.b * f) / d
                        }
                        f = "rotate(" + w.angle + " " + d + "," + f + ")"
                }
                b = b + (f + " ")
            }
            this._elem.setAttribute("transform", b)
        };
        this._list = this;
        this._init = function() {
            var b = this._elem.getAttribute("transform");
            if (b)
                for (var p = /\s*((scale|matrix|rotate|translate)\s*\(.*?\))\s*,?\s*/, w = true; w;) {
                    w = b.match(p);
                    b = b.replace(p, "");
                    if (w && w[1]) {
                        var c = w[1].split(/\s*\(/),
                            f = c[0];
                        c = c[1].match(/\s*(.*?)\s*\)/);
                        c[1] = c[1].replace(/(\d)-/g, "$1 -");
                        var d = c[1].split(/[, ]+/),
                            n = "abcdef".split(""),
                            v = a.createSVGMatrix();
                        $.each(d, function(L, Q) {
                            d[L] = parseFloat(Q);
                            if (f == "matrix") v[n[L]] = d[L]
                        });
                        c = a.createSVGTransform();
                        var B = "set" + f.charAt(0).toUpperCase() + f.slice(1),
                            q = f == "matrix" ? [v] : d;
                        if (f == "scale" && q.length == 1) q.push(q[0]);
                        else if (f == "translate" && q.length == 1) q.push(0);
                        else if (f == "rotate" && q.length == 1) {
                            q.push(0);
                            q.push(0)
                        }
                        c[B].apply(c, q);
                        this._list.appendItem(c)
                    }
                }
        };
        this._removeFromOtherLists = function(b) {
            if (b) {
                var p =
                    false,
                    w;
                for (w in s) {
                    for (var c = s[w], f = 0, d = c._xforms.length; f < d; ++f)
                        if (c._xforms[f] == b) {
                            p = true;
                            c.removeItem(f);
                            break
                        }
                    if (p) break
                }
            }
        };
        this.numberOfItems = 0;
        this.clear = function() {
            this.numberOfItems = 0;
            this._xforms = []
        };
        this.initialize = function(b) {
            this.numberOfItems = 1;
            this._removeFromOtherLists(b);
            this._xforms = [b]
        };
        this.getItem = function(b) {
            if (b < this.numberOfItems && b >= 0) return this._xforms[b];
            throw {
                code: 1
            };
        };
        this.insertItemBefore = function(b, p) {
            var w = null;
            if (p >= 0)
                if (p < this.numberOfItems) {
                    this._removeFromOtherLists(b);
                    w = Array(this.numberOfItems + 1);
                    for (var c = 0; c < p; ++c) w[c] = this._xforms[c];
                    w[c] = b;
                    for (var f = c + 1; c < this.numberOfItems; ++f, ++c) w[f] = this._xforms[c];
                    this.numberOfItems++;
                    this._xforms = w;
                    w = b;
                    this._list._update()
                } else w = this._list.appendItem(b);
            return w
        };
        this.replaceItem = function(b, p) {
            var w = null;
            if (p < this.numberOfItems && p >= 0) {
                this._removeFromOtherLists(b);
                w = this._xforms[p] = b;
                this._list._update()
            }
            return w
        };
        this.removeItem = function(b) {
            if (b < this.numberOfItems && b >= 0) {
                for (var p = this._xforms[b], w = Array(this.numberOfItems -
                        1), c = 0; c < b; ++c) w[c] = this._xforms[c];
                for (b = c; b < this.numberOfItems - 1; ++b, ++c) w[b] = this._xforms[c + 1];
                this.numberOfItems--;
                this._xforms = w;
                this._list._update();
                return p
            } else throw {
                code: 1
            };
        };
        this.appendItem = function(b) {
            this._removeFromOtherLists(b);
            this._xforms.push(b);
            this.numberOfItems++;
            this._list._update();
            return b
        }
    };
    svgedit.transformlist.resetListMap = function() {
        s = {}
    };
    svgedit.transformlist.removeElementFromListMap = function(g) {
        g.id && s[g.id] && delete s[g.id]
    };
    svgedit.transformlist.getTransformList = function(g) {
        if (svgedit.browser.supportsNativeTransformLists())
            if (g.transform) return g.transform.baseVal;
            else if (g.gradientTransform) return g.gradientTransform.baseVal;
        else {
            if (g.patternTransform) return g.patternTransform.baseVal
        } else {
            var b = g.id;
            b || (b = "temp");
            var p = s[b];
            if (!p || b == "temp") {
                s[b] = new svgedit.transformlist.SVGTransformList(g);
                s[b]._init();
                p = s[b]
            }
            return p
        }
        return null
    }
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.math) svgedit.math = {};
    var a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgedit.math.transformPoint = function(s, g, b) {
        return {
            x: b.a * s + b.c * g + b.e,
            y: b.b * s + b.d * g + b.f
        }
    };
    svgedit.math.isIdentity = function(s) {
        return s.a === 1 && s.b === 0 && s.c === 0 && s.d === 1 && s.e === 0 && s.f === 0
    };
    svgedit.math.matrixMultiply = function() {
        for (var s = arguments, g = s.length, b = s[g - 1]; g-- > 1;) b = s[g - 1].multiply(b);
        if (Math.abs(b.a) < 1.0E-14) b.a = 0;
        if (Math.abs(b.b) < 1.0E-14) b.b = 0;
        if (Math.abs(b.c) < 1.0E-14) b.c = 0;
        if (Math.abs(b.d) <
            1.0E-14) b.d = 0;
        if (Math.abs(b.e) < 1.0E-14) b.e = 0;
        if (Math.abs(b.f) < 1.0E-14) b.f = 0;
        return b
    };
    svgedit.math.hasMatrixTransform = function(s) {
        if (!s) return false;
        for (var g = s.numberOfItems; g--;) {
            var b = s.getItem(g);
            if (b.type == 1 && !svgedit.math.isIdentity(b.matrix)) return true
        }
        return false
    };
    svgedit.math.transformBox = function(s, g, b, p, w) {
        var c = {
                x: s,
                y: g
            },
            f = {
                x: s + b,
                y: g
            };
        b = {
            x: s + b,
            y: g + p
        };
        s = {
            x: s,
            y: g + p
        };
        g = svgedit.math.transformPoint;
        c = g(c.x, c.y, w);
        var d = p = c.x,
            n = c.y,
            v = c.y;
        f = g(f.x, f.y, w);
        p = Math.min(p, f.x);
        d = Math.max(d, f.x);
        n = Math.min(n, f.y);
        v = Math.max(v, f.y);
        s = g(s.x, s.y, w);
        p = Math.min(p, s.x);
        d = Math.max(d, s.x);
        n = Math.min(n, s.y);
        v = Math.max(v, s.y);
        b = g(b.x, b.y, w);
        p = Math.min(p, b.x);
        d = Math.max(d, b.x);
        n = Math.min(n, b.y);
        v = Math.max(v, b.y);
        return {
            tl: c,
            tr: f,
            bl: s,
            br: b,
            aabox: {
                x: p,
                y: n,
                width: d - p,
                height: v - n
            }
        }
    };
    svgedit.math.transformListToTransform = function(s, g, b) {
        if (s == null) return a.createSVGTransformFromMatrix(a.createSVGMatrix());
        g = g == undefined ? 0 : g;
        b = b == undefined ? s.numberOfItems - 1 : b;
        g = parseInt(g);
        b = parseInt(b);
        if (g > b) {
            var p = b;
            b = g;
            g = p
        }
        p = a.createSVGMatrix();
        for (g = g; g <= b; ++g) {
            var w = g >= 0 && g < s.numberOfItems ? s.getItem(g).matrix : a.createSVGMatrix();
            p = svgedit.math.matrixMultiply(p, w)
        }
        return a.createSVGTransformFromMatrix(p)
    };
    svgedit.math.getMatrix = function(s) {
        s = svgedit.transformlist.getTransformList(s);
        return svgedit.math.transformListToTransform(s).matrix
    };
    svgedit.math.snapToAngle = function(s, g, b, p) {
        var w = Math.PI / 4;
        b = b - s;
        var c = p - g;
        p = Math.sqrt(b * b + c * c);
        w = Math.round(Math.atan2(c, b) / w) * w;
        return {
            x: s + p * Math.cos(w),
            y: g + p * Math.sin(w),
            a: w
        }
    };
    svgedit.math.rectsIntersect = function(s, g) {
        if (!s || !g) return false;
        return g.x < s.x + s.width && g.x + g.width > s.x && g.y < s.y + s.height && g.y + g.height > s.y
    }
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.units) svgedit.units = {};
    var a = ["x", "x1", "cx", "rx", "width"],
        s = ["y", "y1", "cy", "ry", "height"],
        g = $.merge(["r", "radius"], a);
    $.merge(g, s);
    var b, p = {
        px: 1
    };
    svgedit.units.init = function(c) {
        b = c;
        c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        document.body.appendChild(c);
        var f = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        f.setAttribute("width", "1em");
        f.setAttribute("height", "1ex");
        f.setAttribute("x", "1in");
        c.appendChild(f);
        f = f.getBBox();
        document.body.removeChild(c);
        c = f.x;
        p.em = f.width;
        p.ex = f.height;
        p["in"] = c;
        p.cm = c / 2.54;
        p.mm = c / 25.4;
        p.pt = c / 72;
        p.pc = c / 6;
        p["%"] = 0
    };
    svgedit.units.getTypeMap = function() {
        return p
    };
    svgedit.units.shortFloat = function(c) {
        var f = b.getRoundDigits();
        if (isNaN(c)) {
            if ($.isArray(c)) return svgedit.units.shortFloat(c[0]) + "," + svgedit.units.shortFloat(c[1])
        } else return +(+c).toFixed(f);
        return parseFloat(c).toFixed(f) - 0
    };
    svgedit.units.convertUnit = function(c, f) {
        f = f || b.getBaseUnit();
        return svgedit.unit.shortFloat(c / p[f])
    };
    svgedit.units.setUnitAttr = function(c,
        f, d) {
        isNaN(d) || c.getAttribute(f);
        c.setAttribute(f, d)
    };
    var w = {
        line: ["x1", "x2", "y1", "y2"],
        circle: ["cx", "cy", "r"],
        ellipse: ["cx", "cy", "rx", "ry"],
        foreignObject: ["x", "y", "width", "height"],
        rect: ["x", "y", "width", "height"],
        image: ["x", "y", "width", "height"],
        use: ["x", "y", "width", "height"],
        text: ["x", "y"]
    };
    svgedit.units.convertAttrs = function(c) {
        var f = c.tagName,
            d = b.getBaseUnit();
        if (f = w[f])
            for (var n = f.length, v = 0; v < n; v++) {
                var B = f[v],
                    q = c.getAttribute(B);
                if (q) isNaN(q) || c.setAttribute(B, q / p[d] + d)
            }
    };
    svgedit.units.convertToNum =
        function(c, f) {
            if (!isNaN(f)) return f - 0;
            if (f.substr(-1) === "%") {
                var d = f.substr(0, f.length - 1) / 100,
                    n = b.getWidth(),
                    v = b.getHeight();
                return a.indexOf(c) >= 0 ? d * n : s.indexOf(c) >= 0 ? d * v : d * Math.sqrt(n * n + v * v) / Math.sqrt(2)
            } else {
                n = f.substr(-2);
                d = f.substr(0, f.length - 2);
                return d * p[n]
            }
        };
    svgedit.units.isValidUnit = function(c, f, d) {
        var n = false;
        if (g.indexOf(c) >= 0)
            if (isNaN(f)) {
                f = f.toLowerCase();
                $.each(p, function(q) {
                    if (!n)
                        if (RegExp("^-?[\\d\\.]+" + q + "$").test(f)) n = true
                })
            } else n = true;
        else if (c == "id") {
            c = false;
            try {
                var v = b.getElement(f);
                c = v == null || v === d
            } catch (B) {}
            return c
        } else n = true;
        return n
    }
})();
svgedit = svgedit || {};
(function() {
    function a(c) {
        if (svgedit.browser.supportsHVLineContainerBBox()) try {
            return c.getBBox()
        } catch (f) {}
        var d = $.data(c, "ref"),
            n = null;
        if (d) {
            var v = $(d).children().clone().attr("visibility", "hidden");
            $(w).append(v);
            n = v.filter("line, path")
        } else n = $(c).find("line, path");
        var B = false;
        if (n.length) {
            n.each(function() {
                var q = this.getBBox();
                if (!q.width || !q.height) B = true
            });
            if (B) {
                c = d ? v : $(c).children();
                ret = getStrokedBBox(c)
            } else ret = c.getBBox()
        } else ret = c.getBBox();
        d && v.remove();
        return ret
    }
    if (!svgedit.utilities) svgedit.utilities = {};
    var s = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use".split(","),
        g = null,
        b = null,
        p = null,
        w = null;
    svgedit.utilities.init = function(c) {
        g = c;
        b = c.getDOMDocument();
        p = c.getDOMContainer();
        w = c.getSVGRoot()
    };
    svgedit.utilities.toXml = function(c) {
        return $("<p/>").text(c).html()
    };
    svgedit.utilities.fromXml = function(c) {
        return $("<p/>").html(c).text()
    };
    svgedit.utilities.encode64 = function(c) {
        c = svgedit.utilities.convertToXMLReferences(c);
        if (window.btoa) return window.btoa(c);
        var f = Array(Math.floor((c.length + 2) / 3) * 4),
            d, n, v, B, q, L, Q = 0,
            K = 0;
        do {
            d = c.charCodeAt(Q++);
            n = c.charCodeAt(Q++);
            v = c.charCodeAt(Q++);
            B = d >> 2;
            d = (d & 3) << 4 | n >> 4;
            q = (n & 15) << 2 | v >> 6;
            L = v & 63;
            if (isNaN(n)) q = L = 64;
            else if (isNaN(v)) L = 64;
            f[K++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(B);
            f[K++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d);
            f[K++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q);
            f[K++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(L)
        } while (Q <
            c.length);
        return f.join("")
    };
    svgedit.utilities.decode64 = function(c) {
        if (window.atob) return window.atob(c);
        var f = "",
            d, n, v = "",
            B, q = "",
            L = 0;
        c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(L++));
            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(L++));
            B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(L++));
            q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(L++));
            d = d << 2 | n >> 4;
            n = (n & 15) << 4 | B >> 2;
            v = (B & 3) << 6 | q;
            f += String.fromCharCode(d);
            if (B != 64) f += String.fromCharCode(n);
            if (q != 64) f += String.fromCharCode(v)
        } while (L < c.length);
        return unescape(f)
    };
    svgedit.utilities.convertToXMLReferences = function(c) {
        for (var f = "", d = 0; d < c.length; d++) {
            var n = c.charCodeAt(d);
            if (n < 128) f += c[d];
            else if (n > 127) f += "&#" + n + ";"
        }
        return f
    };
    svgedit.utilities.text2xml = function(c) {
        if (c.indexOf("<svg:svg") >= 0) c = c.replace(/<(\/?)svg:/g, "<$1").replace("xmlns:svg", "xmlns");
        var f;
        try {
            var d = window.DOMParser ?
                new DOMParser : new ActiveXObject("Microsoft.XMLDOM");
            d.async = false
        } catch (n) {
            throw Error("XML Parser could not be instantiated");
        }
        try {
            f = d.loadXML ? d.loadXML(c) ? d : false : d.parseFromString(c, "text/xml")
        } catch (v) {
            throw Error("Error parsing XML string");
        }
        return f
    };
    svgedit.utilities.bboxToObj = function(c) {
        return {
            x: c.x,
            y: c.y,
            width: c.width,
            height: c.height
        }
    };
    svgedit.utilities.walkTree = function(c, f) {
        if (c && c.nodeType == 1) {
            f(c);
            for (var d = c.childNodes.length; d--;) svgedit.utilities.walkTree(c.childNodes.item(d), f)
        }
    };
    svgedit.utilities.walkTreePost = function(c, f) {
        if (c && c.nodeType == 1) {
            for (var d = c.childNodes.length; d--;) svgedit.utilities.walkTree(c.childNodes.item(d), f);
            f(c)
        }
    };
    svgedit.utilities.getUrlFromAttr = function(c) {
        if (c)
            if (c.indexOf('url("') === 0) return c.substring(5, c.indexOf('"', 6));
            else if (c.indexOf("url('") === 0) return c.substring(5, c.indexOf("'", 6));
        else if (c.indexOf("url(") === 0) return c.substring(4, c.indexOf(")"));
        return null
    };
    svgedit.utilities.getHref = function(c) {
        if (c) return c.getAttributeNS("http://www.w3.org/1999/xlink",
            "href")
    };
    svgedit.utilities.setHref = function(c, f) {
        c.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", f)
    };
    svgedit.utilities.findDefs = function(c) {
        c = g.getSVGContent().documentElement;
        var f = c.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs");
        return f = f.length > 0 ? f[0] : c.insertBefore(c.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "defs"), c.firstChild.nextSibling)
    };
    svgedit.utilities.getPathBBox = function(c) {
        var f = c.pathSegList,
            d = f.numberOfItems;
        c = [
            [],
            []
        ];
        var n = f.getItem(0),
            v = [n.x, n.y];
        for (n = 0; n < d; n++) {
            var B = f.getItem(n);
            if (typeof B.x != "undefined") {
                c[0].push(v[0]);
                c[1].push(v[1]);
                if (B.x1) {
                    for (var q = [B.x1, B.y1], L = [B.x2, B.y2], Q = [B.x, B.y], K = 0; K < 2; K++) {
                        B = function(ga) {
                            return Math.pow(1 - ga, 3) * v[K] + 3 * Math.pow(1 - ga, 2) * ga * q[K] + 3 * (1 - ga) * Math.pow(ga, 2) * L[K] + Math.pow(ga, 3) * Q[K]
                        };
                        var I = 6 * v[K] - 12 * q[K] + 6 * L[K],
                            S = -3 * v[K] + 9 * q[K] - 9 * L[K] + 3 * Q[K],
                            R = 3 * q[K] - 3 * v[K];
                        if (S == 0) {
                            if (I != 0) {
                                I = -R / I;
                                0 < I && I < 1 && c[K].push(B(I))
                            }
                        } else {
                            R = Math.pow(I, 2) - 4 * R * S;
                            if (!(R < 0)) {
                                var N = (-I + Math.sqrt(R)) / (2 * S);
                                0 < N && N <
                                    1 && c[K].push(B(N));
                                I = (-I - Math.sqrt(R)) / (2 * S);
                                0 < I && I < 1 && c[K].push(B(I))
                            }
                        }
                    }
                    v = Q
                } else {
                    c[0].push(B.x);
                    c[1].push(B.y)
                }
            }
        }
        f = Math.min.apply(null, c[0]);
        d = Math.max.apply(null, c[0]) - f;
        n = Math.min.apply(null, c[1]);
        c = Math.max.apply(null, c[1]) - n;
        return {
            x: f,
            y: n,
            width: d,
            height: c
        }
    };
    svgedit.utilities.getBBox = function(c) {
        var f = c || g.getSelectedElements()[0];
        if (c.nodeType != 1) return null;
        c = null;
        var d = f.nodeName;
        switch (d) {
            case "text":
                if (f.textContent === "") {
                    f.textContent = "a";
                    c = f.getBBox();
                    f.textContent = ""
                } else try {
                    c = f.getBBox()
                } catch (n) {}
                break;
            case "path":
                if (svgedit.browser.supportsPathBBox()) try {
                    c = f.getBBox()
                } catch (v) {} else c = svgedit.utilities.getPathBBox(f);
                break;
            case "g":
            case "a":
                c = a(f);
                break;
            default:
                if (d === "use") c = a(f, true);
                if (d === "use") c || (c = f.getBBox());
                else if (~s.indexOf(d)) try {
                    c = f.getBBox()
                } catch (B) {
                    f = $(f).closest("foreignObject");
                    if (f.length) try {
                        c = f[0].getBBox()
                    } catch (q) {
                        c = null
                    } else c = null
                }
        }
        if (c) c = svgedit.utilities.bboxToObj(c);
        return c
    };
    svgedit.utilities.getRotationAngle = function(c, f) {
        var d = c || g.getSelectedElements()[0];
        d = svgedit.transformlist.getTransformList(d);
        if (!d) return 0;
        for (var n = d.numberOfItems, v = 0; v < n; ++v) {
            var B = d.getItem(v);
            if (B.type == 4) return f ? B.angle * Math.PI / 180 : B.angle
        }
        return 0
    };
    svgedit.utilities.getElem = svgedit.browser.supportsSelectors() ? function(c) {
        return w.querySelector("#" + c)
    } : svgedit.browser.supportsXpath() ? function(c) {
        return b.evaluate('svg:svg[@id="svgroot"]//svg:*[@id="' + c + '"]', p, function() {
            return "http://www.w3.org/2000/svg"
        }, 9, null).singleNodeValue
    } : function(c) {
        return $(w).find("[id=" + c + "]")[0]
    };
    svgedit.utilities.assignAttributes =
        function(c, f, d, n) {
            d || (d = 0);
            svgedit.browser.isOpera() || w.suspendRedraw(d);
            for (var v in f)
                if (d = v.substr(0, 4) === "xml:" ? "http://www.w3.org/XML/1998/namespace" : v.substr(0, 6) === "xlink:" ? "http://www.w3.org/1999/xlink" : null) c.setAttributeNS(d, v, f[v]);
                else n ? svgedit.units.setUnitAttr(c, v, f[v]) : c.setAttribute(v, f[v]);
            svgedit.browser.isOpera() || w.unsuspendRedraw(null)
        };
    svgedit.utilities.cleanupElement = function(c) {
        var f = w.suspendRedraw(60),
            d = {
                "fill-opacity": 1,
                "stop-opacity": 1,
                opacity: 1,
                stroke: "none",
                "stroke-dasharray": "none",
                "stroke-linejoin": "miter",
                "stroke-linecap": "butt",
                "stroke-opacity": 1,
                "stroke-width": 1,
                rx: 0,
                ry: 0
            },
            n;
        for (n in d) {
            var v = d[n];
            c.getAttribute(n) == v && c.removeAttribute(n)
        }
        w.unsuspendRedraw(f)
    }
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.sanitize) svgedit.sanitize = {};
    var a = {};
    a["http://www.w3.org/1999/xlink"] = "xlink";
    a["http://www.w3.org/XML/1998/namespace"] = "xml";
    a["http://www.w3.org/2000/xmlns/"] = "xmlns";
    a["http://svg-edit.googlecode.com"] = "se";
    a["http://www.w3.org/1999/xhtml"] = "xhtml";
    a["http://www.w3.org/1998/Math/MathML"] = "mathml";
    var s = {};
    $.each(a, function(p, w) {
        s[w] = p
    });
    var g = {
            a: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "stroke", "stroke-dasharray",
                "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "xlink:href", "xlink:title"
            ],
            circle: ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "r", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
            clipPath: ["class",
                "clipPathUnits", "id"
            ],
            defs: [],
            style: ["type"],
            desc: [],
            ellipse: ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
            feGaussianBlur: ["class", "color-interpolation-filters", "id", "requiredFeatures", "stdDeviation"],
            filter: ["class", "color-interpolation-filters",
                "filterRes", "filterUnits", "height", "id", "primitiveUnits", "requiredFeatures", "width", "x", "xlink:href", "y"
            ],
            foreignObject: ["class", "font-size", "height", "id", "opacity", "requiredFeatures", "style", "transform", "width", "x", "y"],
            g: ["class", "clip-path", "clip-rule", "id", "display", "fill", "fill-opacity", "fill-rule", "filter", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage",
                "transform", "font-family", "font-size", "font-style", "font-weight", "text-anchor", "data-locked"
            ],
            image: ["class", "clip-path", "clip-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:href", "xlink:title", "y"],
            line: ["shape-rendering", "class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset",
                "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "x1", "x2", "y1", "y2"
            ],
            linearGradient: ["class", "id", "gradientTransform", "gradientUnits", "requiredFeatures", "spreadMethod", "systemLanguage", "x1", "x2", "xlink:href", "y1", "y2"],
            marker: ["id", "class", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "systemLanguage", "viewBox"],
            mask: ["class", "height", "id", "maskContentUnits", "maskUnits", "width", "x",
                "y"
            ],
            metadata: ["class", "id"],
            path: ["class", "clip-path", "clip-rule", "d", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
            pattern: ["class", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "requiredFeatures", "style", "systemLanguage", "viewBox",
                "width", "x", "xlink:href", "y"
            ],
            polygon: ["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "id", "class", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
            polyline: ["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "marker-end", "marker-mid",
                "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"
            ],
            radialGradient: ["class", "cx", "cy", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "requiredFeatures", "spreadMethod", "systemLanguage", "xlink:href"],
            rect: ["shape-rendering", "class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask",
                "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "width", "x", "y"
            ],
            stop: ["class", "id", "offset", "requiredFeatures", "stop-color", "stop-opacity", "style", "systemLanguage"],
            svg: ["class", "clip-path", "clip-rule", "filter", "id", "height", "mask", "preserveAspectRatio", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xmlns", "xmlns:se",
                "xmlns:xlink", "y"
            ],
            "switch": ["class", "id", "requiredFeatures", "systemLanguage"],
            symbol: ["class", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "opacity", "preserveAspectRatio", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "viewBox"],
            text: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule",
                "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "transform", "x", "xml:space", "y"
            ],
            textPath: ["class", "id", "method", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "transform", "xlink:href"],
            title: [],
            tspan: ["class", "clip-path", "clip-rule", "dx", "dy", "fill",
                "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "rotate", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "textLength", "transform", "x", "xml:space", "y"
            ],
            use: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "stroke", "stroke-dasharray", "stroke-dashoffset",
                "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "transform", "width", "x", "xlink:href", "y"
            ],
            annotation: ["encoding"],
            "annotation-xml": ["encoding"],
            maction: ["actiontype", "other", "selection"],
            math: ["class", "id", "display", "xmlns"],
            menclose: ["notation"],
            merror: [],
            mfrac: ["linethickness"],
            mi: ["mathvariant"],
            mmultiscripts: [],
            mn: [],
            mo: ["fence", "lspace", "maxsize", "minsize", "rspace", "stretchy"],
            mover: [],
            mpadded: ["lspace", "width", "height", "depth", "voffset"],
            mphantom: [],
            mprescripts: [],
            mroot: [],
            mrow: ["xlink:href", "xlink:type", "xmlns:xlink"],
            mspace: ["depth", "height", "width"],
            msqrt: [],
            mstyle: ["displaystyle", "mathbackground", "mathcolor", "mathvariant", "scriptlevel"],
            msub: [],
            msubsup: [],
            msup: [],
            mtable: ["align", "columnalign", "columnlines", "columnspacing", "displaystyle", "equalcolumns", "equalrows", "frame", "rowalign", "rowlines", "rowspacing", "width"],
            mtd: ["columnalign", "columnspan", "rowalign", "rowspan"],
            mtext: [],
            mtr: ["columnalign", "rowalign"],
            munder: [],
            munderover: [],
            none: [],
            semantics: []
        },
        b = {};
    $.each(g, function(p, w) {
        var c = {};
        $.each(w, function(f, d) {
            if (d.indexOf(":") >= 0) {
                var n = d.split(":");
                c[n[1]] = s[n[0]]
            } else c[d] = d == "xmlns" ? "http://www.w3.org/2000/xmlns/" : null
        });
        b[p] = c
    });
    svgedit.sanitize.getNSMap = function() {
        return a
    };
    svgedit.sanitize.sanitizeSvg = function(p) {
        if (p.nodeType == 3) {
            p.nodeValue = p.nodeValue.replace(/^\s+|\s+$/g, "");
            p.nodeValue.length || p.parentNode.removeChild(p)
        }
        if (p.nodeType == 1) {
            var w = p.parentNode;
            if (p.ownerDocument && w) {
                var c = g[p.nodeName],
                    f = b[p.nodeName];
                if (c !=
                    undefined) {
                    for (var d = [], n = p.attributes.length; n--;) {
                        var v = p.attributes.item(n),
                            B = v.nodeName,
                            q = v.localName,
                            L = v.namespaceURI;
                        if (!(f.hasOwnProperty(q) && L == f[q] && L != "http://www.w3.org/2000/xmlns/") && !(L == "http://www.w3.org/2000/xmlns/" && a[v.nodeValue])) {
                            B.indexOf("se:") == 0 && d.push([B, v.nodeValue]);
                            p.removeAttributeNS(L, q)
                        }
                        if (svgedit.browser.isGecko()) switch (B) {
                            case "transform":
                            case "gradientTransform":
                            case "patternTransform":
                                q = v.nodeValue.replace(/(\d)-/g, "$1 -");
                                p.setAttribute(B, q)
                        }
                        if (B == "style") {
                            v =
                                v.nodeValue.split(";");
                            for (B = v.length; B--;) {
                                q = v[B].split(":");
                                c.indexOf(q[0]) >= 0 && p.setAttribute(q[0], q[1])
                            }
                            p.removeAttribute("style")
                        }
                    }
                    $.each(d, function(Q, K) {
                        p.setAttributeNS("http://svg-edit.googlecode.com", K[0], K[1])
                    });
                    if ((n = svgedit.utilities.getHref(p)) && ["filter", "linearGradient", "pattern", "radialGradient", "textPath", "use"].indexOf(p.nodeName) >= 0)
                        if (n[0] != "#") {
                            svgedit.utilities.setHref(p, "");
                            p.removeAttributeNS("http://www.w3.org/1999/xlink", "href")
                        }
                    if (p.nodeName == "use" && !svgedit.utilities.getHref(p)) w.removeChild(p);
                    else {
                        $.each(["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start", "mask", "stroke"], function(Q, K) {
                            var I = p.getAttribute(K);
                            if (I)
                                if ((I = svgedit.utilities.getUrlFromAttr(I)) && I[0] !== "#") {
                                    p.setAttribute(K, "");
                                    p.removeAttribute(K)
                                }
                        });
                        for (n = p.childNodes.length; n--;) svgedit.sanitize.sanitizeSvg(p.childNodes.item(n))
                    }
                } else {
                    for (c = []; p.hasChildNodes();) c.push(w.insertBefore(p.firstChild, p));
                    w.removeChild(p);
                    for (n = c.length; n--;) svgedit.sanitize.sanitizeSvg(c[n])
                }
            }
        }
    }
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.history) svgedit.history = {};
    svgedit.history.HistoryEventTypes = {
        BEFORE_APPLY: "before_apply",
        AFTER_APPLY: "after_apply",
        BEFORE_UNAPPLY: "before_unapply",
        AFTER_UNAPPLY: "after_unapply"
    };
    svgedit.history.MoveElementCommand = function(a, s, g, b) {
        this.elem = a;
        this.text = b ? "Move " + a.tagName + " to " + b : "Move " + a.tagName;
        this.oldNextSibling = s;
        this.oldParent = g;
        this.newNextSibling = a.nextSibling;
        this.newParent = a.parentNode
    };
    svgedit.history.MoveElementCommand.type = function() {
        return "svgedit.history.MoveElementCommand"
    };
    svgedit.history.MoveElementCommand.prototype.type =
        svgedit.history.MoveElementCommand.type;
    svgedit.history.MoveElementCommand.prototype.getText = function() {
        return this.text
    };
    svgedit.history.MoveElementCommand.prototype.apply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
        this.elem = this.newParent.insertBefore(this.elem, this.newNextSibling);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    };
    svgedit.history.MoveElementCommand.prototype.unapply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY,
            this);
        this.elem = this.oldParent.insertBefore(this.elem, this.oldNextSibling);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    };
    svgedit.history.MoveElementCommand.prototype.elements = function() {
        return [this.elem]
    };
    svgedit.history.InsertElementCommand = function(a, s) {
        this.elem = a;
        this.text = s || "Create " + a.tagName;
        this.parent = a.parentNode;
        this.nextSibling = this.elem.nextSibling
    };
    svgedit.history.InsertElementCommand.type = function() {
        return "svgedit.history.InsertElementCommand"
    };
    svgedit.history.InsertElementCommand.prototype.type =
        svgedit.history.InsertElementCommand.type;
    svgedit.history.InsertElementCommand.prototype.getText = function() {
        return this.text
    };
    svgedit.history.InsertElementCommand.prototype.apply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
        this.elem = this.parent.insertBefore(this.elem, this.nextSibling);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    };
    svgedit.history.InsertElementCommand.prototype.unapply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY,
            this);
        this.parent = this.elem.parentNode;
        this.elem = this.elem.parentNode.removeChild(this.elem);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    };
    svgedit.history.InsertElementCommand.prototype.elements = function() {
        return [this.elem]
    };
    svgedit.history.RemoveElementCommand = function(a, s, g, b) {
        this.elem = a;
        this.text = b || "Delete " + a.tagName;
        this.nextSibling = s;
        this.parent = g;
        svgedit.transformlist.removeElementFromListMap(a)
    };
    svgedit.history.RemoveElementCommand.type = function() {
        return "svgedit.history.RemoveElementCommand"
    };
    svgedit.history.RemoveElementCommand.prototype.type = svgedit.history.RemoveElementCommand.type;
    svgedit.history.RemoveElementCommand.prototype.getText = function() {
        return this.text
    };
    svgedit.history.RemoveElementCommand.prototype.apply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
        svgedit.transformlist.removeElementFromListMap(this.elem);
        this.parent = this.elem.parentNode;
        this.elem = this.parent.removeChild(this.elem);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY,
            this)
    };
    svgedit.history.RemoveElementCommand.prototype.unapply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
        svgedit.transformlist.removeElementFromListMap(this.elem);
        this.nextSibling == null && window.console && console.log("Error: reference element was lost");
        this.parent.insertBefore(this.elem, this.nextSibling);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    };
    svgedit.history.RemoveElementCommand.prototype.elements = function() {
        return [this.elem]
    };
    svgedit.history.ChangeElementCommand = function(a, s, g) {
        this.elem = a;
        this.text = g ? "Change " + a.tagName + " " + g : "Change " + a.tagName;
        this.newValues = {};
        this.oldValues = s;
        for (var b in s) this.newValues[b] = b == "#text" ? a.textContent : b == "#href" ? svgedit.utilities.getHref(a) : a.getAttribute(b)
    };
    svgedit.history.ChangeElementCommand.type = function() {
        return "svgedit.history.ChangeElementCommand"
    };
    svgedit.history.ChangeElementCommand.prototype.type = svgedit.history.ChangeElementCommand.type;
    svgedit.history.ChangeElementCommand.prototype.getText =
        function() {
            return this.text
        };
    svgedit.history.ChangeElementCommand.prototype.apply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
        var s = false,
            g;
        for (g in this.newValues) {
            if (this.newValues[g])
                if (g == "#text") this.elem.textContent = this.newValues[g];
                else g == "#href" ? svgedit.utilities.setHref(this.elem, this.newValues[g]) : this.elem.setAttribute(g, this.newValues[g]);
            else if (g == "#text") this.elem.textContent = "";
            else {
                this.elem.setAttribute(g, "");
                this.elem.removeAttribute(g)
            }
            if (g ==
                "transform") s = true
        }
        if (!s)
            if (s = svgedit.utilities.getRotationAngle(this.elem)) {
                g = elem.getBBox();
                s = ["rotate(", s, " ", g.x + g.width / 2, ",", g.y + g.height / 2, ")"].join("");
                s != elem.getAttribute("transform") && elem.setAttribute("transform", s)
            }
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this);
        return true
    };
    svgedit.history.ChangeElementCommand.prototype.unapply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
        var s = false,
            g;
        for (g in this.oldValues) {
            if (this.oldValues[g])
                if (g ==
                    "#text") this.elem.textContent = this.oldValues[g];
                else g == "#href" ? svgedit.utilities.setHref(this.elem, this.oldValues[g]) : this.elem.setAttribute(g, this.oldValues[g]);
            else if (g == "#text") this.elem.textContent = "";
            else this.elem.removeAttribute(g);
            if (g == "transform") s = true
        }
        if (!s)
            if (s = svgedit.utilities.getRotationAngle(this.elem)) {
                g = this.elem.getBBox();
                s = ["rotate(", s, " ", g.x + g.width / 2, ",", g.y + g.height / 2, ")"].join("");
                s != this.elem.getAttribute("transform") && this.elem.setAttribute("transform", s)
            }
        svgedit.transformlist.removeElementFromListMap(this.elem);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this);
        return true
    };
    svgedit.history.ChangeElementCommand.prototype.elements = function() {
        return [this.elem]
    };
    svgedit.history.BatchCommand = function(a) {
        this.text = a || "Batch Command";
        this.stack = []
    };
    svgedit.history.BatchCommand.type = function() {
        return "svgedit.history.BatchCommand"
    };
    svgedit.history.BatchCommand.prototype.type = svgedit.history.BatchCommand.type;
    svgedit.history.BatchCommand.prototype.getText = function() {
        return this.text
    };
    svgedit.history.BatchCommand.prototype.apply =
        function(a) {
            a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
            for (var s = this.stack.length, g = 0; g < s; ++g) this.stack[g].apply(a);
            a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
        };
    svgedit.history.BatchCommand.prototype.unapply = function(a) {
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
        for (var s = this.stack.length - 1; s >= 0; s--) this.stack[s].unapply(a);
        a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY,
            this)
    };
    svgedit.history.BatchCommand.prototype.elements = function() {
        for (var a = [], s = this.stack.length; s--;)
            for (var g = this.stack[s].elements(), b = g.length; b--;) a.indexOf(g[b]) == -1 && a.push(g[b]);
        return a
    };
    svgedit.history.BatchCommand.prototype.addSubCommand = function(a) {
        this.stack.push(a)
    };
    svgedit.history.BatchCommand.prototype.isEmpty = function() {
        return this.stack.length == 0
    };
    svgedit.history.UndoManager = function(a) {
        this.handler_ = a || null;
        this.undoStackPointer = 0;
        this.undoStack = [];
        this.undoChangeStackPointer = -1;
        this.undoableChangeStack = []
    };
    svgedit.history.UndoManager.prototype.resetUndoStack = function() {
        this.undoStack = [];
        this.undoStackPointer = 0
    };
    svgedit.history.UndoManager.prototype.getUndoStackSize = function() {
        return this.undoStackPointer
    };
    svgedit.history.UndoManager.prototype.getRedoStackSize = function() {
        return this.undoStack.length - this.undoStackPointer
    };
    svgedit.history.UndoManager.prototype.getNextUndoCommandText = function() {
        return this.undoStackPointer > 0 ? this.undoStack[this.undoStackPointer - 1].getText() :
            ""
    };
    svgedit.history.UndoManager.prototype.getNextRedoCommandText = function() {
        return this.undoStackPointer < this.undoStack.length ? this.undoStack[this.undoStackPointer].getText() : ""
    };
    svgedit.history.UndoManager.prototype.undo = function() {
        this.undoStackPointer > 0 && this.undoStack[--this.undoStackPointer].unapply(this.handler_)
    };
    svgedit.history.UndoManager.prototype.redo = function() {
        this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0 && this.undoStack[this.undoStackPointer++].apply(this.handler_)
    };
    svgedit.history.UndoManager.prototype.addCommandToHistory = function(a) {
        if (this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0) this.undoStack = this.undoStack.splice(0, this.undoStackPointer);
        this.undoStack.push(a);
        this.undoStackPointer = this.undoStack.length
    };
    svgedit.history.UndoManager.prototype.beginUndoableChange = function(a, s) {
        for (var g = ++this.undoChangeStackPointer, b = s.length, p = Array(b), w = Array(b); b--;) {
            var c = s[b];
            if (c != null) {
                w[b] = c;
                p[b] = c.getAttribute(a)
            }
        }
        this.undoableChangeStack[g] = {
            attrName: a,
            oldValues: p,
            elements: w
        }
    };
    svgedit.history.UndoManager.prototype.finishUndoableChange = function() {
        for (var a = this.undoChangeStackPointer--, s = this.undoableChangeStack[a], g = s.elements.length, b = s.attrName, p = new svgedit.history.BatchCommand("Change " + b); g--;) {
            var w = s.elements[g];
            if (w != null) {
                var c = {};
                c[b] = s.oldValues[g];
                c[b] != w.getAttribute(b) && p.addSubCommand(new svgedit.history.ChangeElementCommand(w, c, b))
            }
        }
        this.undoableChangeStack[a] = null;
        return p
    }
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.select) svgedit.select = {};
    var a, s, g;
    svgedit.select.Selector = function(b, p) {
        this.id = b;
        this.selectedElement = p;
        this.locked = true;
        this.selectorGroup = a.createSVGElement({
            element: "g",
            attr: {
                id: "selectorGroup" + this.id
            }
        });
        this.selectorRect = this.selectorGroup.appendChild(a.createSVGElement({
            element: "path",
            attr: {
                id: "selectedBox" + this.id,
                fill: "none",
                stroke: "#4F80FF",
                "stroke-width": "1",
                "shape-rendering": "crispEdges",
                style: "pointer-events:none"
            }
        }));
        svgedit.browser.isTouch() && this.selectorRect.setAttribute("stroke-opacity",
            0.3);
        this.gripCoords = {
            nw: null,
            n: null,
            ne: null,
            e: null,
            se: null,
            s: null,
            sw: null,
            w: null
        };
        this.reset(this.selectedElement)
    };
    svgedit.select.Selector.prototype.reset = function(b) {
        this.locked = true;
        this.selectedElement = b;
        this.resize();
        this.selectorGroup.setAttribute("display", "inline")
    };
    svgedit.select.Selector.prototype.updateGripCursors = function(b) {
        var p = [];
        b = Math.round(b / 45);
        if (b < 0) b += 8;
        for (var w in g.selectorGrips) p.push(w);
        for (; b > 0;) {
            p.push(p.shift());
            b--
        }
        b = 0;
        for (w in g.selectorGrips) {
            g.selectorGrips[w].setAttribute("style",
                "cursor:" + p[b] + "-resize");
            b++
        }
    };
    svgedit.select.Selector.prototype.showGrips = function(b) {
        g.selectorGripsGroup.setAttribute("display", b ? "inline" : "none");
        var p = this.selectedElement;
        this.hasGrips = b;
        if (p && b) {
            this.selectorGroup.appendChild(g.selectorGripsGroup);
            this.updateGripCursors(svgedit.utilities.getRotationAngle(p))
        }
    };
    svgedit.select.Selector.prototype.resize = function() {
        var b = this.selectorRect,
            p = g,
            w = p.selectorGrips,
            c = this.selectedElement,
            f = c.getAttribute("stroke-width"),
            d = a.currentZoom(),
            n = 1 / d;
        if (c.getAttribute("stroke") !==
            "none" && !isNaN(f)) n += f / 2;
        var v = c.tagName;
        if (v === "text") n += 2 / d;
        f = svgedit.transformlist.getTransformList(c);
        f = svgedit.math.transformListToTransform(f).matrix;
        f.e *= d;
        f.f *= d;
        var B = svgedit.utilities.getBBox(c);
        if (v === "g" && !$.data(c, "gsvg"))
            if (v = a.getStrokedBBox(c.childNodes)) B = v;
        v = B.x;
        var q = B.y,
            L = B.width;
        B = B.height;
        n *= d;
        d = svgedit.math.transformBox(v * d, q * d, L * d, B * d, f);
        f = d.aabox;
        v = f.x - n;
        q = f.y - n;
        L = f.width + n * 2;
        var Q = f.height + n * 2;
        f = v + L / 2;
        B = q + Q / 2;
        if (c = svgedit.utilities.getRotationAngle(c)) {
            v = a.svgRoot().createSVGTransform();
            v.setRotate(-c, f, B);
            v = v.matrix;
            d.tl = svgedit.math.transformPoint(d.tl.x, d.tl.y, v);
            d.tr = svgedit.math.transformPoint(d.tr.x, d.tr.y, v);
            d.bl = svgedit.math.transformPoint(d.bl.x, d.bl.y, v);
            d.br = svgedit.math.transformPoint(d.br.x, d.br.y, v);
            v = d.tl;
            L = v.x;
            Q = v.y;
            var K = v.x,
                I = v.y;
            v = Math.min;
            q = Math.max;
            L = v(L, v(d.tr.x, v(d.bl.x, d.br.x))) - n;
            Q = v(Q, v(d.tr.y, v(d.bl.y, d.br.y))) - n;
            K = q(K, q(d.tr.x, q(d.bl.x, d.br.x))) + n;
            I = q(I, q(d.tr.y, q(d.bl.y, d.br.y))) + n;
            v = L;
            q = Q;
            L = K - L;
            Q = I - Q
        }
        n = a.svgRoot().suspendRedraw(100);
        b.setAttribute("d",
            "M" + v + "," + q + " L" + (v + L) + "," + q + " " + (v + L) + "," + (q + Q) + " " + v + "," + (q + Q) + "z");
        this.selectorGroup.setAttribute("transform", c ? "rotate(" + [c, f, B].join(",") + ")" : "");
        if (svgedit.browser.isTouch()) {
            v -= 15.75;
            q -= 15.75
        } else {
            v -= 4;
            q -= 4
        }
        this.gripCoords = {
            nw: [v, q].map(Math.round),
            ne: [v + L, q].map(Math.round),
            sw: [v, q + Q].map(Math.round),
            se: [v + L, q + Q].map(Math.round),
            n: [v + L / 2, q].map(Math.round),
            w: [v, q + Q / 2].map(Math.round),
            e: [v + L, q + Q / 2].map(Math.round),
            s: [v + L / 2, q + Q].map(Math.round)
        };
        for (var S in this.gripCoords) {
            b = this.gripCoords[S];
            w[S].setAttribute("x", b[0]);
            w[S].setAttribute("y", b[1])
        }
        this.rotateCoords = {
            nw: [v, q],
            ne: [v + L + 8, q],
            sw: [v, q + Q + 8],
            se: [v + L + 8, q + Q + 8]
        };
        for (S in this.rotateCoords) {
            b = this.rotateCoords[S];
            p.rotateGrips[S].setAttribute("cx", b[0]);
            p.rotateGrips[S].setAttribute("cy", b[1])
        }
        a.svgRoot().unsuspendRedraw(n)
    };
    svgedit.select.SelectorManager = function() {
        this.rubberBandBox = this.selectorParentGroup = null;
        this.selectors = [];
        this.selectorMap = {};
        this.selectorGrips = {
            nw: null,
            n: null,
            ne: null,
            e: null,
            se: null,
            s: null,
            sw: null,
            w: null
        };
        this.selectorGripsGroup = null;
        this.rotateGrips = {
            nw: null,
            ne: null,
            se: null,
            sw: null
        };
        this.initGroup()
    };
    svgedit.select.SelectorManager.prototype.initGroup = function() {
        this.selectorParentGroup && this.selectorParentGroup.parentNode && this.selectorParentGroup.parentNode.removeChild(this.selectorParentGroup);
        this.selectorParentGroup = a.createSVGElement({
            element: "g",
            attr: {
                id: "selectorParentGroup"
            }
        });
        this.selectorGripsGroup = a.createSVGElement({
            element: "g",
            attr: {
                display: "none"
            }
        });
        this.selectorParentGroup.appendChild(this.selectorGripsGroup);
        a.svgRoot().appendChild(this.selectorParentGroup);
        this.selectorMap = {};
        this.selectors = [];
        this.rubberBandBox = null;
        for (var b in this.rotateGrips) {
            var p = a.createSVGElement({
                element: "circle",
                attr: {
                    id: "selectorGrip_rotate_" + b,
                    fill: "#000",
                    r: 8,
                    stroke: "#000",
                    "fill-opacity": 0,
                    "stroke-opacity": 0,
                    "stroke-width": 0,
                    style: "cursor:url(" + s.imgPath + "rotate.png) 12 12, auto;"
                }
            });
            $.data(p, "dir", b);
            $.data(p, "type", "rotate");
            this.rotateGrips[b] = this.selectorGripsGroup.appendChild(p)
        }
        for (b in this.selectorGrips) {
            p = a.createSVGElement({
                element: "rect",
                attr: {
                    id: "selectorGrip_resize_" + b,
                    width: 8,
                    height: 8,
                    fill: "#4F80FF",
                    stroke: "rgba(0,0,0,0)",
                    "stroke-width": 1,
                    style: "cursor:" + b + "-resize",
                    "pointer-events": "all"
                }
            });
            if (svgedit.browser.isTouch()) {
                p.setAttribute("width", 30.5);
                p.setAttribute("height", 30.5);
                p.setAttribute("fill-opacity", 0.3)
            }
            $.data(p, "dir", b);
            $.data(p, "type", "resize");
            this.selectorGrips[b] = this.selectorGripsGroup.appendChild(p)
        }
        if (!$("#canvasBackground").length) {
            b = s.dimensions;
            b = a.createSVGElement({
                element: "svg",
                attr: {
                    id: "canvasBackground",
                    width: b[0],
                    height: b[1],
                    x: 0,
                    y: 0,
                    overflow: svgedit.browser.isWebkit() ? "none" : "visible",
                    style: "pointer-events:none"
                }
            });
            p = a.createSVGElement({
                element: "defs",
                attr: {
                    id: "placeholder_defs"
                }
            });
            var w = a.createSVGElement({
                    element: "pattern",
                    attr: {
                        id: "checkerPattern",
                        patternUnits: "userSpaceOnUse",
                        x: 0,
                        y: 0,
                        width: 20,
                        height: 20,
                        viewBox: "0 0 10 10"
                    }
                }),
                c = a.createSVGElement({
                    element: "rect",
                    attr: {
                        x: 0,
                        y: 0,
                        width: 10,
                        height: 10,
                        fill: "#fff"
                    }
                }),
                f = a.createSVGElement({
                    element: "rect",
                    attr: {
                        x: 0,
                        y: 0,
                        width: 5,
                        height: 5,
                        fill: "#eee"
                    }
                }),
                d = a.createSVGElement({
                    element: "rect",
                    attr: {
                        x: 5,
                        y: 5,
                        width: 5,
                        height: 5,
                        fill: "#eee"
                    }
                }),
                n = a.createSVGElement({
                    element: "rect",
                    attr: {
                        width: "100%",
                        height: "100%",
                        x: 0,
                        y: 0,
                        "stroke-width": 1,
                        stroke: "#000",
                        fill: "url(#checkerPattern)",
                        style: "pointer-events:none"
                    }
                });
            b.appendChild(p);
            p.appendChild(w);
            w.appendChild(c);
            w.appendChild(f);
            w.appendChild(d);
            b.appendChild(n);
            a.svgRoot().insertBefore(b, a.svgContent())
        }
    };
    svgedit.select.SelectorManager.prototype.requestSelector = function(b) {
        if (b == null) return null;
        var p = this.selectors.length;
        if (typeof this.selectorMap[b.id] == "object") {
            this.selectorMap[b.id].locked = true;
            return this.selectorMap[b.id]
        }
        for (var w = 0; w < p; ++w)
            if (this.selectors[w] && !this.selectors[w].locked) {
                this.selectors[w].locked = true;
                this.selectors[w].reset(b);
                this.selectorMap[b.id] = this.selectors[w];
                return this.selectors[w]
            }
        this.selectors[p] = new svgedit.select.Selector(p, b);
        this.selectorParentGroup.appendChild(this.selectors[p].selectorGroup);
        this.selectorMap[b.id] = this.selectors[p];
        return this.selectors[p]
    };
    svgedit.select.SelectorManager.prototype.releaseSelector =
        function(b) {
            if (b != null)
                for (var p = this.selectors.length, w = this.selectorMap[b.id], c = 0; c < p; ++c)
                    if (this.selectors[c] && this.selectors[c] == w) {
                        w.locked == false && console.log("WARNING! selector was released but was already unlocked");
                        delete this.selectorMap[b.id];
                        w.locked = false;
                        w.selectedElement = null;
                        w.showGrips(false);
                        try {
                            w.selectorGroup.setAttribute("display", "none")
                        } catch (f) {}
                        break
                    }
        };
    svgedit.select.SelectorManager.prototype.getRubberBandBox = function() {
        if (!this.rubberBandBox) this.rubberBandBox = this.selectorParentGroup.appendChild(a.createSVGElement({
            element: "rect",
            attr: {
                id: "selectorRubberBand",
                fill: "none",
                stroke: "#666",
                "stroke-width": 1,
                "stroke-dasharray": "3,2",
                display: "none",
                style: "pointer-events:none"
            }
        }));
        return this.rubberBandBox
    };
    svgedit.select.init = function(b, p) {
        s = b;
        a = p;
        g = new svgedit.select.SelectorManager;
        a.createSVGElement({
            element: "g",
            attr: {
                id: "hover_group"
            }
        })
    };
    svgedit.select.getSelectorManager = function() {
        return g
    }
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.draw) svgedit.draw = {};
    var a = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use".split(","),
        s = {
            LET_DOCUMENT_DECIDE: 0,
            ALWAYS_RANDOMIZE: 1,
            NEVER_RANDOMIZE: 2
        },
        g = s.LET_DOCUMENT_DECIDE;
    svgedit.draw.Layer = function(b, p) {
        this.name_ = b;
        this.group_ = p
    };
    svgedit.draw.Layer.prototype.getName = function() {
        return this.name_
    };
    svgedit.draw.Layer.prototype.getGroup = function() {
        return this.group_
    };
    svgedit.draw.randomizeIds = function(b, p) {
        g = b == false ? s.NEVER_RANDOMIZE :
            s.ALWAYS_RANDOMIZE;
        if (g == s.ALWAYS_RANDOMIZE && !p.getNonce()) p.setNonce(Math.floor(Math.random() * 100001));
        else g == s.NEVER_RANDOMIZE && p.getNonce() && p.clearNonce()
    };
    svgedit.draw.Drawing = function(b, p) {
        if (!b || !b.tagName || !b.namespaceURI || b.tagName != "svg" || b.namespaceURI != "http://www.w3.org/2000/svg") throw "Error: svgedit.draw.Drawing instance initialized without a <svg> element";
        this.svgElem_ = b;
        this.obj_num = 0;
        this.idPrefix = p || "svg_";
        this.releasedNums = [];
        this.all_layers = [];
        this.current_layer = null;
        this.nonce_ =
            "";
        var w = this.svgElem_.getAttributeNS("http://svg-edit.googlecode.com", "nonce");
        if (w && g != s.NEVER_RANDOMIZE) this.nonce_ = w;
        else g == s.ALWAYS_RANDOMIZE && this.setNonce(Math.floor(Math.random() * 100001))
    };
    svgedit.draw.Drawing.prototype.getElem_ = function(b) {
        return this.svgElem_.querySelector ? this.svgElem_.querySelector("#" + b) : $(this.svgElem_).find("[id=" + b + "]")[0]
    };
    svgedit.draw.Drawing.prototype.getSvgElem = function() {
        return this.svgElem_
    };
    svgedit.draw.Drawing.prototype.getNonce = function() {
        return this.nonce_
    };
    svgedit.draw.Drawing.prototype.setNonce = function(b) {
        this.svgElem_.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:se", "http://svg-edit.googlecode.com");
        this.svgElem_.setAttributeNS("http://svg-edit.googlecode.com", "se:nonce", b);
        this.nonce_ = b
    };
    svgedit.draw.Drawing.prototype.clearNonce = function() {
        this.nonce_ = ""
    };
    svgedit.draw.Drawing.prototype.getId = function() {
        return this.nonce_ ? this.idPrefix + this.nonce_ + "_" + this.obj_num : this.idPrefix + this.obj_num
    };
    svgedit.draw.Drawing.prototype.getNextId = function() {
        var b =
            this.obj_num,
            p = false;
        if (this.releasedNums.length > 0) {
            this.obj_num = this.releasedNums.pop();
            p = true
        } else this.obj_num++;
        for (var w = this.getId(); this.getElem_(w);) {
            if (p) {
                this.obj_num = b;
                p = false
            }
            this.obj_num++;
            w = this.getId()
        }
        if (p) this.obj_num = b;
        return w
    };
    svgedit.draw.Drawing.prototype.releaseId = function(b) {
        var p = this.idPrefix + (this.nonce_ ? this.nonce_ + "_" : "");
        if (typeof b != "string" || b.indexOf(p) != 0) return false;
        b = parseInt(b.substr(p.length));
        if (typeof b != "number" || b <= 0 || this.releasedNums.indexOf(b) != -1) return false;
        this.releasedNums.push(b);
        return true
    };
    svgedit.draw.Drawing.prototype.getNumLayers = function() {
        return this.all_layers.length
    };
    svgedit.draw.Drawing.prototype.hasLayer = function(b) {
        for (var p = 0; p < this.getNumLayers(); p++)
            if (this.all_layers[p][0] == b) return true;
        return false
    };
    svgedit.draw.Drawing.prototype.getLayerName = function(b) {
        if (b >= 0 && b < this.getNumLayers()) return this.all_layers[b][0];
        return ""
    };
    svgedit.draw.Drawing.prototype.getCurrentLayer = function() {
        return this.current_layer
    };
    svgedit.draw.Drawing.prototype.getCurrentLayerName =
        function() {
            for (var b = 0; b < this.getNumLayers(); ++b)
                if (this.all_layers[b][1] == this.current_layer) return this.getLayerName(b);
            return ""
        };
    svgedit.draw.Drawing.prototype.setCurrentLayer = function(b) {
        for (var p = 0; p < this.getNumLayers(); ++p)
            if (b == this.getLayerName(p)) {
                if (this.current_layer != this.all_layers[p][1]) {
                    this.current_layer.setAttribute("style", "pointer-events:none");
                    this.current_layer = this.all_layers[p][1];
                    this.current_layer.setAttribute("style", "pointer-events:all")
                }
                return true
            }
        return false
    };
    svgedit.draw.Drawing.prototype.deleteCurrentLayer =
        function() {
            if (this.current_layer && this.getNumLayers() > 1) {
                var b = this.current_layer.parentNode.removeChild(this.current_layer);
                this.identifyLayers();
                return b
            }
            return null
        };
    svgedit.draw.Drawing.prototype.identifyLayers = function() {
        this.all_layers = [];
        for (var b = this.svgElem_.childNodes.length, p = [], w = [], c = null, f = false, d = 0; d < b; ++d) {
            var n = this.svgElem_.childNodes.item(d);
            if (n && n.nodeType == 1)
                if (n.tagName == "g") {
                    f = true;
                    var v = $("title", n).text();
                    if (!v && svgedit.browser.isOpera() && n.querySelectorAll) v = $(n.querySelectorAll("title")).text();
                    if (v) {
                        w.push(v);
                        this.all_layers.push([v, n]);
                        c = n;
                        svgedit.utilities.walkTree(n, function(B) {
                            B.setAttribute("style", "pointer-events:inherit")
                        });
                        c.setAttribute("style", "pointer-events:none")
                    } else p.push(n)
                } else if (~a.indexOf(n.nodeName)) {
                svgedit.utilities.getBBox(n);
                p.push(n)
            }
        }
        b = this.svgElem_.ownerDocument;
        if (p.length > 0 || !f) {
            for (d = 1; w.indexOf("Layer " + d) >= 0;) d++;
            w = "Layer " + d;
            c = b.createElementNS("http://www.w3.org/2000/svg", "g");
            f = b.createElementNS("http://www.w3.org/2000/svg", "title");
            f.textContent = w;
            c.appendChild(f);
            for (f = 0; f < p.length; ++f) c.appendChild(p[f]);
            this.svgElem_.appendChild(c);
            this.all_layers.push([w, c])
        }
        svgedit.utilities.walkTree(c, function(B) {
            B.setAttribute("style", "pointer-events:inherit")
        });
        this.current_layer = c.getAttribute("data-locked") === "true" ? this.all_layers.slice(-2)[0][1] : c;
        this.current_layer.setAttribute("style", "pointer-events:all")
    };
    svgedit.draw.Drawing.prototype.createLayer = function(b) {
        var p = this.svgElem_.ownerDocument,
            w = p.createElementNS("http://www.w3.org/2000/svg",
                "g");
        p = p.createElementNS("http://www.w3.org/2000/svg", "title");
        p.textContent = b;
        w.appendChild(p);
        this.svgElem_.appendChild(w);
        this.identifyLayers();
        return w
    };
    svgedit.draw.Drawing.prototype.getLayerVisibility = function(b) {
        for (var p = null, w = 0; w < this.getNumLayers(); ++w)
            if (this.getLayerName(w) == b) {
                p = this.all_layers[w][1];
                break
            }
        if (!p) return false;
        return p.getAttribute("display") != "none"
    };
    svgedit.draw.Drawing.prototype.setLayerVisibility = function(b, p) {
        if (typeof p != "boolean") return null;
        for (var w = null, c = 0; c <
            this.getNumLayers(); ++c)
            if (this.getLayerName(c) == b) {
                w = this.all_layers[c][1];
                break
            }
        if (!w) return null;
        w.getAttribute("display");
        w.setAttribute("display", p ? "inline" : "none");
        return w
    };
    svgedit.draw.Drawing.prototype.getLayerOpacity = function(b) {
        for (var p = 0; p < this.getNumLayers(); ++p)
            if (this.getLayerName(p) == b) {
                (b = this.all_layers[p][1].getAttribute("opacity")) || (b = "1.0");
                return parseFloat(b)
            }
        return null
    };
    svgedit.draw.Drawing.prototype.setLayerOpacity = function(b, p) {
        if (!(typeof p != "number" || p < 0 || p > 1))
            for (var w =
                    0; w < this.getNumLayers(); ++w)
                if (this.getLayerName(w) == b) {
                    this.all_layers[w][1].setAttribute("opacity", p);
                    break
                }
    }
})();
svgedit = svgedit || {};
(function() {
    if (!svgedit.path) svgedit.path = {};
    var a = {
            pathNodeTooltip: "Drag node to move it. Double-click node to change segment type",
            pathCtrlPtTooltip: "Drag control point to adjust curve properties"
        },
        s = {
            2: ["x", "y"],
            4: ["x", "y"],
            6: ["x", "y", "x1", "y1", "x2", "y2"],
            8: ["x", "y", "x1", "y1"],
            10: ["x", "y", "r1", "r2", "angle", "largeArcFlag", "sweepFlag"],
            12: ["x"],
            14: ["y"],
            16: ["x", "y", "x2", "y2"],
            18: ["x", "y"]
        },
        g = [],
        b = false,
        p = {};
    svgedit.path.setLinkControlPoints = function(f) {
        b = f
    };
    var w = svgedit.path.path = null;
    svgedit.path.init =
        function(f) {
            w = f;
            g = [0, "ClosePath"];
            $.each(["Moveto", "Lineto", "CurvetoCubic", "CurvetoQuadratic", "Arc", "LinetoHorizontal", "LinetoVertical", "CurvetoCubicSmooth", "CurvetoQuadraticSmooth"], function(d, n) {
                g.push(n + "Abs");
                g.push(n + "Rel")
            })
        };
    svgedit.path.insertItemBefore = function(f, d, n) {
        f = f.pathSegList;
        if (svgedit.browser.supportsPathInsertItemBefore()) f.insertItemBefore(d, n);
        else {
            for (var v = f.numberOfItems, B = [], q = 0; q < v; q++) {
                var L = f.getItem(q);
                B.push(L)
            }
            f.clear();
            for (q = 0; q < v; q++) {
                q == n && f.appendItem(d);
                f.appendItem(B[q])
            }
        }
    };
    svgedit.path.ptObjToArr = function(f, d) {
        for (var n = s[f], v = n.length, B = Array(v), q = 0; q < v; q++) B[q] = d[n[q]];
        return B
    };
    svgedit.path.getGripPt = function(f, d) {
        var n = {
                x: d ? d.x : f.item.x,
                y: d ? d.y : f.item.y
            },
            v = f.path;
        if (v.matrix) n = svgedit.math.transformPoint(n.x, n.y, v.matrix);
        n.x *= w.getCurrentZoom();
        n.y *= w.getCurrentZoom();
        return n
    };
    svgedit.path.getPointFromGrip = function(f, d) {
        var n = {
            x: f.x,
            y: f.y
        };
        if (d.matrix) {
            f = svgedit.math.transformPoint(n.x, n.y, d.imatrix);
            n.x = f.x;
            n.y = f.y
        }
        n.x /= w.getCurrentZoom();
        n.y /= w.getCurrentZoom();
        return n
    };
    svgedit.path.addPointGrip = function(f, d, n) {
        var v = svgedit.path.getGripContainer(),
            B = svgedit.utilities.getElem("pathpointgrip_" + f);
        if (!B) {
            B = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            svgedit.utilities.assignAttributes(B, {
                id: "pathpointgrip_" + f,
                display: "none",
                width: svgedit.browser.isTouch() ? 30 : 5,
                height: svgedit.browser.isTouch() ? 30 : 5,
                fill: "#fff",
                stroke: "#4F80FF",
                "shape-rendering": "crispEdges",
                "stroke-width": 1,
                cursor: "move",
                style: "pointer-events:all",
                "xlink:title": a.pathNodeTooltip
            });
            B = v.appendChild(B);
            $("#pathpointgrip_" + f).dblclick(function() {
                svgedit.path.path && svgedit.path.path.setSegType()
            })
        }
        if (d && n) svgedit.utilities.assignAttributes(B, {
            x: d - (svgedit.browser.isTouch() ? 15 : 2.5),
            y: n - (svgedit.browser.isTouch() ? 15 : 2.5),
            display: "inline"
        });
        return B
    };
    svgedit.path.getGripContainer = function() {
        var f = svgedit.utilities.getElem("pathpointgrip_container");
        if (!f) {
            f = svgedit.utilities.getElem("selectorParentGroup").appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
            f.id =
                "pathpointgrip_container"
        }
        return f
    };
    svgedit.path.addCtrlGrip = function(f) {
        var d = svgedit.utilities.getElem("ctrlpointgrip_" + f);
        if (d) return d;
        d = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgedit.utilities.assignAttributes(d, {
            id: "ctrlpointgrip_" + f,
            display: "none",
            r: svgedit.browser.isTouch() ? 15 : 3,
            fill: "#4F80FF",
            stroke: "#4F80FF",
            "stroke-opacity": 0,
            "stroke-width": "3",
            cursor: "move",
            style: "pointer-events:all",
            "xlink:title": a.pathCtrlPtTooltip
        });
        svgedit.path.getGripContainer().appendChild(d);
        return d
    };
    svgedit.path.getCtrlLine = function(f) {
        var d = svgedit.utilities.getElem("ctrlLine_" + f);
        if (d) return d;
        d = document.createElementNS("http://www.w3.org/2000/svg", "line");
        svgedit.utilities.assignAttributes(d, {
            id: "ctrlLine_" + f,
            stroke: "#4F80FF",
            "stroke-width": 1,
            style: "pointer-events:none"
        });
        svgedit.path.getGripContainer().appendChild(d);
        return d
    };
    svgedit.path.getPointGrip = function(f, d) {
        var n = svgedit.path.addPointGrip(f.index);
        if (d) {
            var v = svgedit.path.getGripPt(f);
            svgedit.utilities.assignAttributes(n, {
                x: v.x - (svgedit.browser.isTouch() ? 15 : 2.5),
                y: v.y - (svgedit.browser.isTouch() ? 15 : 2.5),
                display: "inline"
            })
        }
        return n
    };
    svgedit.path.getControlPoints = function(f) {
        var d = f.item,
            n = f.index;
        if (!d || !("x1" in d) || !("x2" in d)) return null;
        var v = {};
        svgedit.path.getGripContainer();
        for (var B = [svgedit.path.path.segs[n - 1].item, d], q = 1; q < 3; q++) {
            var L = n + "c" + q,
                Q = v["c" + q + "_line"] = svgedit.path.getCtrlLine(L),
                K = svgedit.path.getGripPt(f, {
                    x: d["x" + q],
                    y: d["y" + q]
                }),
                I = svgedit.path.getGripPt(f, {
                    x: B[q - 1].x,
                    y: B[q - 1].y
                });
            svgedit.utilities.assignAttributes(Q, {
                x1: K.x,
                y1: K.y,
                x2: I.x,
                y2: I.y,
                display: "inline"
            });
            v["c" + q + "_line"] = Q;
            pointGrip = v["c" + q] = svgedit.path.addCtrlGrip(L);
            svgedit.utilities.assignAttributes(pointGrip, {
                cx: K.x,
                cy: K.y,
                display: "inline"
            });
            v["c" + q] = pointGrip
        }
        return v
    };
    svgedit.path.replacePathSeg = function(f, d, n, v) {
        v = v || svgedit.path.path.elem;
        f = v["createSVGPathSeg" + g[f]].apply(v, n);
        if (svgedit.browser.supportsPathReplaceItem()) v.pathSegList.replaceItem(f, d);
        else {
            n = v.pathSegList;
            v = n.numberOfItems;
            for (var B = [], q = 0; q < v; q++) {
                var L = n.getItem(q);
                B.push(L)
            }
            n.clear();
            for (q = 0; q < v; q++) q == d ? n.appendItem(f) : n.appendItem(B[q])
        }
    };
    svgedit.path.getSegSelector = function(f, d) {
        var n = f.index,
            v = svgedit.utilities.getElem("segline_" + n);
        if (!v) {
            var B = svgedit.path.getGripContainer();
            v = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svgedit.utilities.assignAttributes(v, {
                id: "segline_" + n,
                display: "none",
                fill: "none",
                stroke: "#0ff",
                "stroke-opacity": 1,
                "shape-rendering": "crispEdges",
                "stroke-width": 2,
                style: "pointer-events:none",
                d: "M0,0 0,0"
            });
            B.appendChild(v)
        }
        if (d) {
            n = f.prev;
            if (!n) {
                v.setAttribute("display", "none");
                return v
            }
            n = svgedit.path.getGripPt(n);
            svgedit.path.replacePathSeg(2, 0, [n.x, n.y], v);
            B = svgedit.path.ptObjToArr(f.type, f.item, true);
            for (var q = 0; q < B.length; q += 2) {
                n = svgedit.path.getGripPt(f, {
                    x: B[q],
                    y: B[q + 1]
                });
                B[q] = n.x;
                B[q + 1] = n.y
            }
            svgedit.path.replacePathSeg(f.type, 1, B, v)
        }
        return v
    };
    svgedit.path.smoothControlPoints = this.smoothControlPoints = function(f, d, n) {
        var v = f.x - n.x,
            B = f.y - n.y,
            q = d.x - n.x,
            L = d.y - n.y;
        if ((v != 0 || B != 0) && (q != 0 || L != 0)) {
            f = Math.atan2(B, v);
            d = Math.atan2(L, q);
            v =
                Math.sqrt(v * v + B * B);
            q = Math.sqrt(q * q + L * L);
            B = w.getSVGRoot().createSVGPoint();
            L = w.getSVGRoot().createSVGPoint();
            if (f < 0) f += 2 * Math.PI;
            if (d < 0) d += 2 * Math.PI;
            var Q = Math.abs(f - d),
                K = Math.abs(Math.PI - Q) / 2;
            if (f - d > 0) {
                f = Q < Math.PI ? f + K : f - K;
                d = Q < Math.PI ? d - K : d + K
            } else {
                f = Q < Math.PI ? f - K : f + K;
                d = Q < Math.PI ? d + K : d - K
            }
            B.x = v * Math.cos(f) + n.x;
            B.y = v * Math.sin(f) + n.y;
            L.x = q * Math.cos(d) + n.x;
            L.y = q * Math.sin(d) + n.y;
            return [B, L]
        }
    };
    svgedit.path.Segment = function(f, d) {
        this.selected = false;
        this.index = f;
        this.item = d;
        this.type = d.pathSegType;
        this.ctrlpts = [];
        this.segsel = this.ptgrip = null
    };
    svgedit.path.Segment.prototype.showCtrlPts = function(f) {
        for (var d in this.ctrlpts) this.ctrlpts[d].setAttribute("display", f ? "inline" : "none")
    };
    svgedit.path.Segment.prototype.selectCtrls = function() {
        $("#ctrlpointgrip_" + this.index + "c1, #ctrlpointgrip_" + this.index + "c2").attr("fill", "#4F80FF")
    };
    svgedit.path.Segment.prototype.show = function(f) {
        if (this.ptgrip) {
            this.ptgrip.setAttribute("display", f ? "inline" : "none");
            this.segsel.setAttribute("display", f ? "inline" : "none");
            this.showCtrlPts(f)
        }
    };
    svgedit.path.Segment.prototype.select = function(f) {
        if (this.ptgrip) {
            this.ptgrip.setAttribute("stroke", f ? "#4F80FF" : "#4F80FF");
            this.ptgrip.setAttribute("fill", f ? "#4F80FF" : "#fff");
            this.segsel.setAttribute("display", f ? "inline" : "none");
            this.ctrlpts && this.selectCtrls(f);
            this.selected = f
        }
    };
    svgedit.path.Segment.prototype.addGrip = function() {
        this.ptgrip = svgedit.path.getPointGrip(this, true);
        this.ctrlpts = svgedit.path.getControlPoints(this, true);
        this.segsel = svgedit.path.getSegSelector(this, true)
    };
    svgedit.path.Segment.prototype.update =
        function(f) {
            if (this.ptgrip) {
                var d = svgedit.path.getGripPt(this),
                    n = svgedit.browser.isTouch() ? 15 : 2.5;
                svgedit.utilities.assignAttributes(this.ptgrip, this.ptgrip.nodeName == "rect" ? {
                    x: d.x - n,
                    y: d.y - n
                } : {
                    cx: d.x,
                    cy: d.y
                });
                svgedit.path.getSegSelector(this, true);
                if (this.ctrlpts) {
                    if (f) {
                        this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
                        this.type = this.item.pathSegType
                    }
                    svgedit.path.getControlPoints(this)
                }
            }
        };
    svgedit.path.Segment.prototype.move = function(f, d) {
        var n = this.item;
        n = this.ctrlpts ? [n.x += f, n.y +=
            d, n.x1, n.y1, n.x2 += f, n.y2 += d
        ] : [n.x += f, n.y += d];
        svgedit.path.replacePathSeg(this.type, this.index, n);
        if (this.next && this.next.ctrlpts) {
            n = this.next.item;
            n = [n.x, n.y, n.x1 += f, n.y1 += d, n.x2, n.y2];
            svgedit.path.replacePathSeg(this.next.type, this.next.index, n)
        }
        if (this.mate) {
            n = this.mate.item;
            n = [n.x += f, n.y += d];
            svgedit.path.replacePathSeg(this.mate.type, this.mate.index, n)
        }
        this.update(true);
        this.next && this.next.update(true)
    };
    svgedit.path.Segment.prototype.setLinked = function(f) {
        var d, n, v;
        if (f == 2) {
            n = 1;
            d = this.next;
            if (!d) return;
            v = this.item
        } else {
            n = 2;
            d = this.prev;
            if (!d) return;
            v = d.item
        }
        var B = d.item;
        B["x" + n] = v.x + v.x - this.item["x" + f];
        B["y" + n] = v.y + v.y - this.item["y" + f];
        svgedit.path.replacePathSeg(d.type, d.index, [B.x, B.y, B.x1, B.y1, B.x2, B.y2]);
        d.update(true)
    };
    svgedit.path.Segment.prototype.moveCtrl = function(f, d, n) {
        var v = this.item;
        v["x" + f] += d;
        v["y" + f] += n;
        svgedit.path.replacePathSeg(this.type, this.index, [v.x, v.y, v.x1, v.y1, v.x2, v.y2]);
        this.update(true)
    };
    svgedit.path.Segment.prototype.setType = function(f, d) {
        svgedit.path.replacePathSeg(f,
            this.index, d);
        this.type = f;
        this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
        this.showCtrlPts(f === 6);
        this.ctrlpts = svgedit.path.getControlPoints(this);
        this.update(true)
    };
    svgedit.path.Path = function(f) {
        if (!f || f.tagName !== "path") throw "svgedit.path.Path constructed without a <path> element";
        this.elem = f;
        this.segs = [];
        this.selected_pts = [];
        svgedit.path.path = this;
        this.init()
    };
    svgedit.path.Path.prototype.init = function() {
        $(svgedit.path.getGripContainer()).find("*").attr("display", "none");
        var f =
            this.elem.pathSegList,
            d = f.numberOfItems;
        this.segs = [];
        this.selected_pts = [];
        this.first_seg = null;
        for (var n = 0; n < d; n++) {
            var v = f.getItem(n);
            v = new svgedit.path.Segment(n, v);
            v.path = this;
            this.segs.push(v)
        }
        f = this.segs;
        v = null;
        for (n = 0; n < d; n++) {
            var B = f[n],
                q = n + 1 >= d ? null : f[n + 1],
                L = n - 1 < 0 ? null : f[n - 1];
            if (B.type === 2) {
                if (L && L.type !== 1) {
                    q = f[v];
                    q.next = f[v + 1];
                    q.next.prev = q;
                    q.addGrip()
                }
                v = n
            } else if (q && q.type === 1) {
                B.next = f[v + 1];
                B.next.prev = B;
                B.mate = f[v];
                B.addGrip();
                if (this.first_seg == null) this.first_seg = B
            } else if (q) {
                if (B.type !==
                    1) {
                    B.addGrip();
                    if (q && q.type !== 2) {
                        B.next = q;
                        B.next.prev = B
                    }
                }
            } else if (B.type !== 1) {
                q = f[v];
                q.next = f[v + 1];
                q.next.prev = q;
                q.addGrip();
                B.addGrip();
                if (!this.first_seg) this.first_seg = f[v]
            }
        }
        return this
    };
    svgedit.path.Path.prototype.eachSeg = function(f) {
        for (var d = this.segs.length, n = 0; n < d; n++)
            if (f.call(this.segs[n], n) === false) break
    };
    svgedit.path.Path.prototype.addSeg = function(f) {
        var d = this.segs[f];
        if (d.prev) {
            var n = d.prev,
                v;
            switch (d.item.pathSegType) {
                case 4:
                    var B = (d.item.x + n.item.x) / 2,
                        q = (d.item.y + n.item.y) / 2;
                    v = this.elem.createSVGPathSegLinetoAbs(B,
                        q);
                    break;
                case 6:
                    v = (n.item.x + d.item.x1) / 2;
                    var L = (d.item.x1 + d.item.x2) / 2,
                        Q = (d.item.x2 + d.item.x) / 2,
                        K = (v + L) / 2;
                    L = (L + Q) / 2;
                    B = (K + L) / 2;
                    var I = (n.item.y + d.item.y1) / 2,
                        S = (d.item.y1 + d.item.y2) / 2;
                    n = (d.item.y2 + d.item.y) / 2;
                    var R = (I + S) / 2;
                    S = (S + n) / 2;
                    q = (R + S) / 2;
                    v = this.elem.createSVGPathSegCurvetoCubicAbs(B, q, v, I, K, R);
                    svgedit.path.replacePathSeg(d.type, f, [d.item.x, d.item.y, L, S, Q, n])
            }
            svgedit.path.insertItemBefore(this.elem, v, f)
        }
    };
    svgedit.path.Path.prototype.deleteSeg = function(f) {
        var d = this.segs[f],
            n = this.elem.pathSegList;
        d.show(false);
        var v = d.next;
        if (d.mate) {
            var B = [v.item.x, v.item.y];
            svgedit.path.replacePathSeg(2, v.index, B);
            svgedit.path.replacePathSeg(4, d.index, B);
            n.removeItem(d.mate.index)
        } else {
            if (!d.prev) {
                B = [v.item.x, v.item.y];
                svgedit.path.replacePathSeg(2, d.next.index, B)
            }
            n.removeItem(f)
        }
    };
    svgedit.path.Path.prototype.subpathIsClosed = function(f) {
        var d = false;
        svgedit.path.path.eachSeg(function(n) {
            if (n <= f) return true;
            if (this.type === 2) return false;
            else if (this.type === 1) {
                d = true;
                return false
            }
        });
        return d
    };
    svgedit.path.Path.prototype.removePtFromSelection =
        function(f) {
            var d = this.selected_pts.indexOf(f);
            if (d != -1) {
                this.segs[f].select(false);
                this.selected_pts.splice(d, 1)
            }
        };
    svgedit.path.Path.prototype.clearSelection = function() {
        this.eachSeg(function() {
            this.select(false)
        });
        this.selected_pts = []
    };
    svgedit.path.Path.prototype.storeD = function() {
        this.last_d = this.elem.getAttribute("d")
    };
    svgedit.path.Path.prototype.show = function(f) {
        this.eachSeg(function() {
            this.show(f)
        });
        f && this.selectPt(this.first_seg.index);
        return this
    };
    svgedit.path.Path.prototype.movePts = function(f,
        d) {
        for (var n = this.selected_pts.length; n--;) this.segs[this.selected_pts[n]].move(f, d)
    };
    svgedit.path.Path.prototype.moveCtrl = function(f, d) {
        var n = this.segs[this.selected_pts[0]];
        n.moveCtrl(this.dragctrl, f, d);
        b && n.setLinked(this.dragctrl)
    };
    svgedit.path.Path.prototype.setSegType = function(f) {
        this.storeD();
        for (var d = this.selected_pts.length, n; d--;) {
            var v = this.segs[this.selected_pts[d]],
                B = v.prev;
            if (B) {
                if (!f) {
                    n = "Toggle Path Segment Type";
                    f = v.type == 6 ? 4 : 6
                }
                f -= 0;
                var q = v.item.x,
                    L = v.item.y,
                    Q = B.item.x;
                B = B.item.y;
                var K;
                switch (f) {
                    case 6:
                        if (v.olditem) {
                            Q = v.olditem;
                            K = [q, L, Q.x1, Q.y1, Q.x2, Q.y2]
                        } else {
                            K = q - Q;
                            var I = L - B;
                            K = [q, L, Q + K / 3, B + I / 3, q - K / 3, L - I / 3]
                        }
                        break;
                    case 4:
                        K = [q, L];
                        v.olditem = v.item
                }
                v.setType(f, K)
            }
        }
        svgedit.path.path.endChanges(n)
    };
    svgedit.path.Path.prototype.selectPt = function(f, d) {
        this.clearSelection();
        f == null && this.eachSeg(function(n) {
            if (this.prev) f = n
        });
        this.addPtsToSelection(f);
        if (d) {
            this.dragctrl = d;
            b && this.segs[f].setLinked(d)
        }
    };
    svgedit.path.Path.prototype.update = function() {
        var f = this.elem;
        if (svgedit.utilities.getRotationAngle(f)) {
            this.matrix =
                svgedit.math.getMatrix(f);
            this.imatrix = this.matrix.inverse()
        } else this.imatrix = this.matrix = null;
        this.eachSeg(function(d) {
            this.item = f.pathSegList.getItem(d);
            this.update()
        });
        return this
    };
    svgedit.path.getPath_ = function(f) {
        var d = p[f.id];
        d || (d = p[f.id] = new svgedit.path.Path(f));
        return d
    };
    svgedit.path.removePath_ = function(f) {
        f in p && delete p[f]
    };
    var c = function(f, d, n, v, B, q, L) {
        dx = f - n;
        dy = d - v;
        r = Math.sqrt(dx * dx + dy * dy);
        theta = Math.atan2(dy, dx) + L;
        dx = r * Math.cos(theta) + n;
        dy = r * Math.sin(theta) + v;
        dx -= B;
        dy -= q;
        r = Math.sqrt(dx *
            dx + dy * dy);
        theta = Math.atan2(dy, dx) - L;
        return {
            x: (r * Math.cos(theta) + B) / 1,
            y: (r * Math.sin(theta) + q) / 1
        }
    };
    svgedit.path.recalcRotatedPath = function() {
        var f = svgedit.path.path.elem,
            d = svgedit.utilities.getRotationAngle(f, true);
        if (d) {
            var n = svgedit.utilities.getBBox(f),
                v = svgedit.path.path.oldbbox,
                B = v.x + v.width / 2;
            v = v.y + v.height / 2;
            var q = n.x + n.width / 2;
            n = n.y + n.height / 2;
            q = q - B;
            var L = n - v;
            n = Math.sqrt(q * q + L * L);
            L = Math.atan2(L, q) + d;
            q = n * Math.cos(L) + B;
            n = n * Math.sin(L) + v;
            L = f.pathSegList;
            for (var Q = L.numberOfItems; Q;) {
                Q -= 1;
                var K =
                    L.getItem(Q),
                    I = K.pathSegType;
                if (I != 1) {
                    var S = c(K.x, K.y, B, v, q, n, d);
                    S = [S.x, S.y];
                    if (K.x1 != null && K.x2 != null) {
                        c_vals1 = c(K.x1, K.y1, B, v, q, n, d);
                        c_vals2 = c(K.x2, K.y2, B, v, q, n, d);
                        S.splice(S.length, 0, c_vals1.x, c_vals1.y, c_vals2.x, c_vals2.y)
                    }
                    svgedit.path.replacePathSeg(I, Q, S)
                }
            }
            svgedit.utilities.getBBox(f);
            B = svgroot.createSVGTransform();
            f = svgedit.transformlist.getTransformList(f);
            B.setRotate(d * 180 / Math.PI, q, n);
            f.replaceItem(B, 0)
        }
    };
    svgedit.path.clearData = function() {
        p = {}
    }
})();
if (!window.console) {
    window.console = {};
    window.console.log = function() {};
    window.console.dir = function() {}
}
if (window.opera) {
    window.console.log = function(a) {
        opera.postError(a)
    };
    window.console.dir = function() {}
}
(function() {
    var a = jQuery.fn.attr;
    jQuery.fn.attr = function(s, g) {
        var b = this.length;
        if (!b) return a.apply(this, arguments);
        for (var p = 0; p < b; p++) {
            var w = this[p];
            if (w.namespaceURI === "http://www.w3.org/2000/svg")
                if (g !== undefined) w.setAttribute(s, g);
                else if ($.isArray(s)) {
                b = s.length;
                for (p = {}; b--;) {
                    var c = s[b],
                        f = w.getAttribute(c);
                    if (f || f === "0") f = isNaN(f) ? f : f - 0;
                    p[c] = f
                }
                return p
            } else if (typeof s === "object")
                for (c in s) w.setAttribute(c, s[c]);
            else {
                if ((f = w.getAttribute(s)) || f === "0") f = isNaN(f) ? f : f - 0;
                return f
            } else return a.apply(this,
                arguments)
        }
        return this
    }
})();
$.SvgCanvas = function(a, s) {
    function g(e, k) {
        for (var l = svgedit.utilities.getBBox(e), C = 0; C < 2; C++) {
            var A = C === 0 ? "fill" : "stroke",
                G = e.getAttribute(A);
            if (G && G.indexOf("url(") === 0) {
                G = P(G);
                if (G.tagName === "linearGradient") {
                    var D = G.getAttribute("x1") || 0,
                        z = G.getAttribute("y1") || 0,
                        F = G.getAttribute("x2") || 1,
                        h = G.getAttribute("y2") || 0;
                    D = l.width * D + l.x;
                    z = l.height * z + l.y;
                    F = l.width * F + l.x;
                    h = l.height * h + l.y;
                    D = N(D, z, k);
                    h = N(F, h, k);
                    F = {};
                    F.x1 = (D.x - l.x) / l.width;
                    F.y1 = (D.y - l.y) / l.height;
                    F.x2 = (h.x - l.x) / l.width;
                    F.y2 = (h.y - l.y) / l.height;
                    G = G.cloneNode(true);
                    $(G).attr(F);
                    G.id = ka();
                    gb().appendChild(G);
                    e.setAttribute(A, "url(#" + G.id + ")")
                }
            }
        }
    }
    var b = "http://www.w3.org/2000/svg",
        p = {
            show_outside_canvas: true,
            selectNew: true,
            dimensions: [640, 480]
        };
    s && $.extend(p, s);
    var w = p.dimensions,
        c = this,
        f = a.ownerDocument,
        d = f.importNode(svgedit.utilities.text2xml('<svg id="svgroot" xmlns="' + b + '" xlinkns="http://www.w3.org/1999/xlink" width="' + w[0] + '" height="' + w[1] + '" x="' + w[0] + '" y="' + w[1] + '" overflow="visible"><defs><filter id="canvashadow" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/><feOffset in="blur" dx="5" dy="5" result="offsetBlur"/><feMerge><feMergeNode in="offsetBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>').documentElement,
            true);
    a.appendChild(d);
    var n = f.createElementNS(b, "svg");
    (c.clearSvgContentElement = function() {
        for (; n.firstChild;) n.removeChild(n.firstChild);
        $(n).attr({
            id: "svgcontent",
            width: w[0],
            height: w[1],
            x: w[0],
            y: w[1],
            overflow: p.show_outside_canvas ? "visible" : "hidden",
            xmlns: b,
            "xmlns:se": "http://svg-edit.googlecode.com",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
        }).appendTo(d);
        var e = f.createComment(" Created with Method Draw - http://github.com/duopixel/Method-Draw/ ");
        n.appendChild(e)
    })();
    var v = "svg_";
    c.setIdPrefix =
        function(e) {
            v = e
        };
    c.current_drawing_ = new svgedit.draw.Drawing(n, v);
    var B = c.getCurrentDrawing = function() {
            return c.current_drawing_
        },
        q = 1,
        L = null,
        Q = {
            shape: {
                fill: (p.initFill.color == "none" ? "" : "#") + p.initFill.color,
                fill_paint: null,
                fill_opacity: p.initFill.opacity,
                stroke: "#" + p.initStroke.color,
                stroke_paint: null,
                stroke_opacity: p.initStroke.opacity,
                stroke_width: p.initStroke.width,
                stroke_dasharray: "none",
                opacity: p.initOpacity
            }
        };
    Q.text = $.extend(true, {}, Q.shape);
    $.extend(Q.text, {
        fill: "#000000",
        stroke_width: 0,
        font_size: 24,
        font_family: "Helvetica, Arial, sans-serif"
    });
    var K = Q.shape,
        I = Array(1),
        S = this.addSvgElementFromJson = function(e) {
            var k = svgedit.utilities.getElem(e.attr.id),
                l = B().getCurrentLayer();
            if (k && e.element != k.tagName) {
                l.removeChild(k);
                k = null
            }
            if (!k) {
                k = f.createElementNS(b, e.element);
                if (l)(L || l).appendChild(k)
            }
            e.curStyles && svgedit.utilities.assignAttributes(k, {
                fill: K.fill,
                stroke: K.stroke,
                "stroke-width": K.stroke_width,
                "stroke-dasharray": K.stroke_dasharray,
                "stroke-opacity": K.stroke_opacity,
                "fill-opacity": K.fill_opacity,
                opacity: K.opacity / 2,
                style: "pointer-events:inherit"
            }, 100);
            svgedit.utilities.assignAttributes(k, e.attr, 100);
            svgedit.utilities.cleanupElement(k);
            return k
        },
        R = c.getTransformList = svgedit.transformlist.getTransformList,
        N = svgedit.math.transformPoint,
        ga = c.matrixMultiply = svgedit.math.matrixMultiply,
        oa = c.hasMatrixTransform = svgedit.math.hasMatrixTransform,
        Y = c.transformListToTransform = svgedit.math.transformListToTransform,
        V = svgedit.math.snapToAngle,
        ea = svgedit.math.getMatrix;
    svgedit.units.init({
        getBaseUnit: function() {
            return p.baseUnit
        },
        getElement: svgedit.utilities.getElem,
        getHeight: function() {
            return n.getAttribute("height") / q
        },
        getWidth: function() {
            return n.getAttribute("width") / q
        },
        getRoundDigits: function() {
            return $a.round_digits
        }
    });
    var Ba = c.convertToNum = svgedit.units.convertToNum;
    svgedit.utilities.init({
        getDOMDocument: function() {
            return f
        },
        getDOMContainer: function() {
            return a
        },
        getSVGRoot: function() {
            return d
        },
        getSelectedElements: function() {
            return I
        },
        getSVGContent: function() {
            return n
        }
    });
    var ja = c.getUrlFromAttr = svgedit.utilities.getUrlFromAttr,
        ca = c.getHref = svgedit.utilities.getHref,
        U = c.setHref = svgedit.utilities.setHref,
        Z = svgedit.utilities.getPathBBox;
    c.getBBox = svgedit.utilities.getBBox;
    var na = c.getRotationAngle = svgedit.utilities.getRotationAngle,
        pa = c.getElem = svgedit.utilities.getElem,
        ma = c.assignAttributes = svgedit.utilities.assignAttributes,
        la = this.cleanupElement = svgedit.utilities.cleanupElement,
        ya = svgedit.sanitize.getNSMap(),
        za = c.sanitizeSvg = svgedit.sanitize.sanitizeSvg,
        Ja = svgedit.history.MoveElementCommand,
        Ia = svgedit.history.InsertElementCommand,
        Fa = svgedit.history.RemoveElementCommand,
        Ma = svgedit.history.ChangeElementCommand,
        Da = svgedit.history.BatchCommand;
    c.undoMgr = new svgedit.history.UndoManager({
        handleHistoryEvent: function(e, k) {
            var l = svgedit.history.HistoryEventTypes;
            if (e == l.BEFORE_UNAPPLY || e == l.BEFORE_APPLY) c.clearSelection();
            else if (e == l.AFTER_APPLY || e == l.AFTER_UNAPPLY) {
                var C = k.elements();
                c.pathActions.clear();
                M("changed", C);
                C = k.type();
                l = e == l.AFTER_APPLY;
                if (C == Ja.type())(l ? k.newParent : k.oldParent) == n && c.identifyLayers();
                else if (C == Ia.type() ||
                    C == Fa.type()) {
                    k.parent == n && c.identifyLayers();
                    if (C == Ia.type()) l && Ta(k.elem);
                    else l || Ta(k.elem);
                    k.elem.tagName === "use" && Gb(k.elem)
                } else if (C == Ma.type()) {
                    k.elem.tagName == "title" && k.elem.parentNode.parentNode == n && c.identifyLayers();
                    l = l ? k.newValues : k.oldValues;
                    l.stdDeviation && c.setBlurOffsets(k.elem.parentNode, l.stdDeviation)
                }
            }
        }
    });
    var wa = function(e) {
        c.undoMgr.addCommandToHistory(e)
    };
    svgedit.select.init(p, {
        createSVGElement: function(e) {
            return c.addSvgElementFromJson(e)
        },
        svgRoot: function() {
            return d
        },
        svgContent: function() {
            return n
        },
        currentZoom: function() {
            return q
        },
        getStrokedBBox: function(e) {
            return c.getStrokedBBox([e])
        }
    });
    var ra = this.selectorManager = svgedit.select.getSelectorManager();
    svgedit.path.init({
        getCurrentZoom: function() {
            return q
        },
        getSVGRoot: function() {
            return d
        }
    });
    svgedit.utilities.snapToGrid = function(e) {
        var k = p.snappingStep,
            l = p.baseUnit;
        if (l !== "px") k *= svgedit.units.getTypeMap()[l];
        return e = Math.round(e / k) * k
    };
    var va = svgedit.utilities.snapToGrid,
        kb = {
            exportNoBlur: "Blurred elements will appear as un-blurred",
            exportNoforeignObject: "foreignObject elements will not appear",
            exportNoDashArray: "Strokes will appear filled",
            exportNoText: "Text may not appear as expected"
        },
        vb = ["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start", "mask", "stroke"],
        cb = $.data,
        Ta = function(e) {
            var k = $(e).attr(vb),
                l;
            for (l in k) {
                var C = k[l];
                if (C && C.indexOf("url(") === 0) {
                    C = ja(C).substr(1);
                    if (!pa(C)) {
                        gb().appendChild(sb[C]);
                        delete sb[C]
                    }
                }
            }
            e = e.getElementsByTagName("*");
            if (e.length) {
                k = 0;
                for (l = e.length; k < l; k++) Ta(e[k])
            }
        },
        Va = {},
        Ga = p.imgPath + "logo.png",
        ta = [],
        $a = {
            round_digits: 5
        },
        Ka = false,
        Sa =
        null,
        Ha = "select",
        db = "none",
        lb = {},
        Ua = Q.text,
        Xa = K,
        wb = null,
        sa = null,
        hb = [],
        eb = {},
        sb = {};
    c.clipBoard = [];
    var ib = this.runExtensions = function(e, k, l) {
        var C = false;
        if (l) C = [];
        $.each(eb, function(A, G) {
            if (e in G)
                if (l) C.push(G[e](k));
                else C = G[e](k)
        });
        return C
    };
    this.addExtension = function(e, k) {
        if (e in eb) console.log('Cannot add extension "' + e + '", an extension by that name already exists"');
        else {
            var l = $.isFunction(k) ? k($.extend(c.getPrivateMethods(), {
                svgroot: d,
                svgcontent: n,
                nonce: B().getNonce(),
                selectorManager: ra
            })) : k;
            eb[e] = l;
            M("extension_added", l)
        }
    };
    var ab = this.round = function(e) {
            return parseInt(e * q) / q
        },
        ob = this.getIntersectionList = function(e) {
            if (sa == null) return null;
            var k = L || B().getCurrentLayer();
            hb.length || (hb = fb(k));
            var l = null;
            try {
                l = k.getIntersectionList(e, null)
            } catch (C) {}
            if (l == null || typeof l.item != "function") {
                l = [];
                if (e) e = e;
                else {
                    e = sa.getBBox();
                    k = {};
                    for (var A in e) k[A] = e[A] / q;
                    e = k
                }
                for (A = hb.length; A--;) e.width && e.width && svgedit.math.rectsIntersect(e, hb[A].bbox) && l.push(hb[A].elem)
            }
            return l
        };
    getStrokedBBox = this.getStrokedBBox =
        function(e) {
            e || (e = pb());
            if (!e.length) return false;
            var k = function(h) {
                    try {
                        var m = svgedit.utilities.getBBox(h),
                            o = svgedit.utilities.getRotationAngle(h);
                        if (o && o % 90 || svgedit.math.hasMatrixTransform(svgedit.transformlist.getTransformList(h))) {
                            o = false;
                            if (["ellipse", "path", "line", "polyline", "polygon"].indexOf(h.tagName) >= 0) m = o = c.convertToPath(h, true);
                            else if (h.tagName == "rect") {
                                var u = h.getAttribute("rx"),
                                    E = h.getAttribute("ry");
                                if (u || E) m = o = c.convertToPath(h, true)
                            }
                            if (!o) {
                                var H = h.cloneNode(true),
                                    J = document.createElementNS(b,
                                        "g"),
                                    O = h.parentNode;
                                O.appendChild(J);
                                J.appendChild(H);
                                m = svgedit.utilities.bboxToObj(J.getBBox());
                                O.removeChild(J)
                            }
                        }
                        return m
                    } catch (X) {
                        console.log(h, X)
                    }
                },
                l;
            $.each(e, function() {
                if (!l)
                    if (this.parentNode) l = k(this)
            });
            if (l == null) return null;
            var C = l.x + l.width,
                A = l.y + l.height,
                G = l.x,
                D = l.y,
                z = function(h) {
                    var m = h.getAttribute("stroke-width"),
                        o = 0;
                    if (h.getAttribute("stroke") != "none" && !isNaN(m)) o += m / 2;
                    return o
                },
                F = [];
            $.each(e, function(h, m) {
                var o = k(m);
                if (o) {
                    var u = z(m);
                    G = Math.min(G, o.x - u);
                    D = Math.min(D, o.y - u);
                    F.push(o)
                }
            });
            l.x = G;
            l.y = D;
            $.each(e, function(h, m) {
                var o = F[h];
                if (o && m.nodeType == 1) {
                    var u = z(m);
                    C = Math.max(C, o.x + o.width + u);
                    A = Math.max(A, o.y + o.height + u)
                }
            });
            l.width = C - G;
            l.height = A - D;
            return l
        };
    var pb = this.getVisibleElements = function(e) {
            e || (e = $(n).children());
            e.find("#canvas_background").length && e.splice(0, 1);
            var k = [];
            $(e).children().each(function(l, C) {
                try {
                    C.getBBox() && k.push(C)
                } catch (A) {}
            });
            return k.reverse()
        },
        fb = this.getVisibleElementsAndBBoxes = function(e) {
            e || (e = $(n).children());
            var k = [];
            $(e).children().each(function(l,
                C) {
                try {
                    C.getBBox() && k.push({
                        elem: C,
                        bbox: getStrokedBBox([C])
                    })
                } catch (A) {}
            });
            return k.reverse()
        },
        tb = this.groupSvgElem = function(e) {
            var k = document.createElementNS(b, "g");
            e.parentNode.replaceChild(k, e);
            $(k).append(e).data("gsvg", e)[0].id = ka()
        },
        ia = function(e) {
            var k = document.createElementNS(e.namespaceURI, e.nodeName);
            k.removeAttribute("id");
            $.each(e.attributes, function(C, A) {
                A.localName != "-moz-math-font-style" && k.setAttributeNS(A.namespaceURI, A.nodeName, A.nodeValue)
            });
            if (svgedit.browser.isWebkit() && e.nodeName ==
                "path") {
                var l = La.convertPath(e);
                k.setAttribute("d", l)
            }
            $.each(e.childNodes, function(C, A) {
                switch (A.nodeType) {
                    case 1:
                        k.appendChild(ia(A));
                        break;
                    case 3:
                        k.textContent = A.nodeValue
                }
            });
            if ($(e).data("gsvg")) $(k).data("gsvg", k.firstChild);
            else if ($(e).data("symbol")) {
                e = $(e).data("symbol");
                $(k).data("ref", e).data("symbol", e)
            } else k.tagName == "image" && Fb(k);
            k.id = ka();
            return k
        },
        aa, ka, M;
    (function(e) {
        var k = {};
        aa = e.getId = function() {
            return B().getId()
        };
        ka = e.getNextId = function() {
            return B().getNextId()
        };
        M = e.call = function(l,
            C) {
            if (k[l]) return k[l](this, C)
        };
        e.bind = function(l, C) {
            var A = k[l];
            k[l] = C;
            return A
        }
    })(c);
    this.prepareSvg = function(e) {
        this.sanitizeSvg(e.documentElement);
        e = e.getElementsByTagNameNS(b, "path");
        for (var k = 0, l = e.length; k < l; ++k) {
            var C = e[k];
            C.setAttribute("d", La.convertPath(C));
            La.fixEnd(C)
        }
    };
    var P = this.getRefElem = function(e) {
            return pa(ja(e).substr(1))
        },
        da = function(e) {
            if (!svgedit.browser.isGecko()) return e;
            var k = e.cloneNode(true);
            e.parentNode.insertBefore(k, e);
            e.parentNode.removeChild(e);
            ra.releaseSelector(e);
            I[0] = k;
            ra.requestSelector(k).showGrips(true);
            return k
        };
    this.setRotationAngle = function(e, k) {
        e = parseFloat(e);
        var l = I[0];
        if (l) {
            var C = l.getAttribute("transform"),
                A = svgedit.utilities.getBBox(l),
                G = A.x + A.width / 2,
                D = A.y + A.height / 2;
            A = R(l);
            A.numberOfItems > 0 && A.getItem(0).type == 4 && A.removeItem(0);
            if (e != 0) {
                G = N(G, D, Y(A).matrix);
                D = d.createSVGTransform();
                D.setRotate(e, G.x, G.y);
                A.numberOfItems ? A.insertItemBefore(D, 0) : A.appendItem(D)
            } else A.numberOfItems == 0 && l.removeAttribute("transform");
            if (!k) {
                A = l.getAttribute("transform");
                l.setAttribute("transform", C);
                Ya("transform", A, I);
                M("changed", I)
            }
            pa("pathpointgrip_container");
            l = ra.requestSelector(I[0]);
            l.resize();
            l.updateGripCursors(e)
        }
    };
    var Ea = this.recalculateAllSelectedDimensions = function() {
            for (var e = new Da(db == "none" ? "position" : "size"), k = I.length; k--;) {
                var l = Ra(I[k]);
                l && e.addSubCommand(l)
            }
            if (!e.isEmpty()) {
                wa(e);
                M("changed", I)
            }
        },
        Oa = [0, "z", "M", "m", "L", "l", "C", "c", "Q", "q", "A", "a", "H", "h", "V", "v", "S", "s", "T", "t"],
        Wa = function(e) {
            console.log([e.a, e.b, e.c, e.d, e.e, e.f])
        },
        Za = this.remapElement =
        function(e, k, l) {
            var C = p.gridSnapping && e.parentNode.parentNode.localName === "svg",
                A = function() {
                    if (C)
                        for (var o in k) k[o] = va(k[o]);
                    ma(e, k, 1E3, true)
                };
            box = svgedit.utilities.getBBox(e);
            for (var G = 0; G < 2; G++) {
                var D = G === 0 ? "fill" : "stroke",
                    z = e.getAttribute(D);
                if (z && z.indexOf("url(") === 0)
                    if (l.a < 0 || l.d < 0) {
                        z = P(z).cloneNode(true);
                        if (l.a < 0) {
                            var F = z.getAttribute("x1"),
                                h = z.getAttribute("x2");
                            z.setAttribute("x1", -(F - 1));
                            z.setAttribute("x2", -(h - 1))
                        }
                        if (l.d < 0) {
                            F = z.getAttribute("y1");
                            h = z.getAttribute("y2");
                            z.setAttribute("y1", -(F - 1));
                            z.setAttribute("y2", -(h - 1))
                        }
                        z.id = ka();
                        gb().appendChild(z);
                        e.setAttribute(D, "url(#" + z.id + ")")
                    }
            }
            G = e.tagName;
            if (G === "g" || G === "text" || G === "use")
                if (l.a == 1 && l.b == 0 && l.c == 0 && l.d == 1 && (l.e != 0 || l.f != 0)) {
                    D = Y(e).matrix;
                    D = ga(D.inverse(), l, D);
                    k.x = parseFloat(k.x) + D.e;
                    k.y = parseFloat(k.y) + D.f
                } else {
                    D = R(e);
                    z = d.createSVGTransform();
                    z.setMatrix(ga(Y(D).matrix, l));
                    D.clear();
                    D.appendItem(z)
                }
            switch (G) {
                case "foreignObject":
                case "rect":
                case "image":
                    if (G === "image" && (l.a < 0 || l.d < 0)) {
                        D = R(e);
                        z = d.createSVGTransform();
                        z.setMatrix(ga(Y(D).matrix,
                            l));
                        D.clear();
                        D.appendItem(z)
                    } else {
                        D = N(k.x, k.y, l);
                        k.width = l.a * k.width;
                        k.height = l.d * k.height;
                        k.x = D.x + Math.min(0, k.width);
                        k.y = D.y + Math.min(0, k.height);
                        k.width = Math.abs(k.width);
                        k.height = Math.abs(k.height)
                    }
                    A();
                    break;
                case "ellipse":
                    G = N(k.cx, k.cy, l);
                    k.cx = G.x;
                    k.cy = G.y;
                    k.rx = l.a * k.rx;
                    k.ry = l.d * k.ry;
                    k.rx = Math.abs(k.rx);
                    k.ry = Math.abs(k.ry);
                    A();
                    break;
                case "circle":
                    G = N(k.cx, k.cy, l);
                    k.cx = G.x;
                    k.cy = G.y;
                    G = svgedit.math.transformBox(box.x, box.y, box.width, box.height, l);
                    k.r = Math.min((G.tr.x - G.tl.x) / 2, (G.bl.y - G.tl.y) /
                        2);
                    if (k.r) k.r = Math.abs(k.r);
                    A();
                    break;
                case "line":
                    D = N(k.x1, k.y1, l);
                    F = N(k.x2, k.y2, l);
                    k.x1 = D.x;
                    k.y1 = D.y;
                    k.x2 = F.x;
                    k.y2 = F.y;
                case "text":
                    l = e.querySelectorAll("tspan");
                    for (G = l.length; G--;) {
                        D = Ba("x", e.getAttribute("x"));
                        z = Ba("x", l[G].getAttribute("x"));
                        F = Ba("y", e.getAttribute("y"));
                        h = Ba("y", l[G].getAttribute("y"));
                        var m = {};
                        if (!isNaN(D) && !isNaN(z) && D != 0 && z != 0 && k.x) m.x = k.x - (D - z);
                        if (!isNaN(F) && !isNaN(h) && F != 0 && h != 0 && k.y) m.y = k.y - (F - h);
                        if (m.x || m.y) ma(l[G], m, 1E3, true)
                    }
                    A();
                    break;
                case "use":
                    A();
                    break;
                case "g":
                    (A =
                        $(e).data("gsvg")) && ma(A, k, 1E3, true);
                    break;
                case "polyline":
                case "polygon":
                    A = k.points.length;
                    for (G = 0; G < A; ++G) {
                        h = k.points[G];
                        h = N(h.x, h.y, l);
                        k.points[G].x = h.x;
                        k.points[G].y = h.y
                    }
                    A = k.points.length;
                    l = "";
                    for (G = 0; G < A; ++G) {
                        h = k.points[G];
                        l += h.x + "," + h.y + " "
                    }
                    e.setAttribute("points", l);
                    break;
                case "path":
                    D = e.pathSegList;
                    A = D.numberOfItems;
                    k.d = Array(A);
                    for (G = 0; G < A; ++G) {
                        z = D.getItem(G);
                        k.d[G] = {
                            type: z.pathSegType,
                            x: z.x,
                            y: z.y,
                            x1: z.x1,
                            y1: z.y1,
                            x2: z.x2,
                            y2: z.y2,
                            r1: z.r1,
                            r2: z.r2,
                            angle: z.angle,
                            largeArcFlag: z.largeArcFlag,
                            sweepFlag: z.sweepFlag
                        }
                    }
                    A =
                        k.d.length;
                    G = k.d[0];
                    m = N(G.x, G.y, l);
                    k.d[0].x = m.x;
                    k.d[0].y = m.y;
                    for (G = 1; G < A; ++G) {
                        z = k.d[G];
                        D = z.type;
                        if (D % 2 == 0) {
                            h = N(z.x != undefined ? z.x : m.x, z.y != undefined ? z.y : m.y, l);
                            D = N(z.x1, z.y1, l);
                            F = N(z.x2, z.y2, l);
                            z.x = h.x;
                            z.y = h.y;
                            z.x1 = D.x;
                            z.y1 = D.y;
                            z.x2 = F.x;
                            z.y2 = F.y
                        } else {
                            z.x = l.a * z.x;
                            z.y = l.d * z.y;
                            z.x1 = l.a * z.x1;
                            z.y1 = l.d * z.y1;
                            z.x2 = l.a * z.x2;
                            z.y2 = l.d * z.y2
                        }
                        z.r1 = l.a * z.r1;
                        z.r2 = l.d * z.r2
                    }
                    l = "";
                    A = k.d.length;
                    for (G = 0; G < A; ++G) {
                        z = k.d[G];
                        D = z.type;
                        l += Oa[D];
                        switch (D) {
                            case 13:
                            case 12:
                                l += z.x + " ";
                                break;
                            case 15:
                            case 14:
                                l += z.y + " ";
                                break;
                            case 3:
                            case 5:
                            case 19:
                            case 2:
                            case 4:
                            case 18:
                                l +=
                                    z.x + "," + z.y + " ";
                                break;
                            case 7:
                            case 6:
                                l += z.x1 + "," + z.y1 + " " + z.x2 + "," + z.y2 + " " + z.x + "," + z.y + " ";
                                break;
                            case 9:
                            case 8:
                                l += z.x1 + "," + z.y1 + " " + z.x + "," + z.y + " ";
                                break;
                            case 11:
                            case 10:
                                l += z.r1 + "," + z.r2 + " " + z.angle + " " + +z.largeArcFlag + " " + +z.sweepFlag + " " + z.x + "," + z.y + " ";
                                break;
                            case 17:
                            case 16:
                                l += z.x2 + "," + z.y2 + " " + z.x + "," + z.y + " "
                        }
                    }
                    e.setAttribute("d", l)
            }
        },
        nb = function(e, k, l) {
            e = P(e).firstChild;
            var C = R(e),
                A = d.createSVGTransform();
            A.setTranslate(k, l);
            C.appendItem(A);
            Ra(e)
        },
        Ra = this.recalculateDimensions = function(e) {
            if (e ==
                null) return null;
            var k = R(e);
            if (k && k.numberOfItems > 0) {
                for (var l = k.numberOfItems; l--;) {
                    var C = k.getItem(l);
                    if (C.type === 0) k.removeItem(l);
                    else if (C.type === 1) svgedit.math.isIdentity(C.matrix) && k.removeItem(l);
                    else C.type === 4 && C.angle === 0 && k.removeItem(l)
                }
                if (k.numberOfItems === 1 && na(e)) return null
            }
            if (!k || k.numberOfItems == 0) {
                e.removeAttribute("transform");
                return null
            }
            if (k) {
                l = k.numberOfItems;
                for (var A = []; l--;) {
                    C = k.getItem(l);
                    if (C.type === 1) A.push([C.matrix, l]);
                    else if (A.length) A = []
                }
                if (A.length === 2) {
                    l = d.createSVGTransformFromMatrix(ga(A[1][0],
                        A[0][0]));
                    k.removeItem(A[0][1]);
                    k.removeItem(A[1][1]);
                    k.insertItemBefore(l, A[1][1])
                }
                l = k.numberOfItems;
                if (l >= 2 && k.getItem(l - 2).type === 1 && k.getItem(l - 1).type === 2) {
                    A = d.createSVGTransform();
                    C = ga(k.getItem(l - 2).matrix, k.getItem(l - 1).matrix);
                    A.setMatrix(C);
                    k.removeItem(l - 2);
                    k.removeItem(l - 2);
                    k.appendItem(A)
                }
            }
            switch (e.tagName) {
                case "line":
                case "polyline":
                case "polygon":
                case "path":
                    break;
                default:
                    if (k.numberOfItems === 1 && k.getItem(0).type === 1 || k.numberOfItems === 2 && k.getItem(0).type === 1 && k.getItem(0).type ===
                        4) return null
            }
            var G = $(e).data("gsvg");
            l = new Da("Transform");
            var D = {},
                z = null;
            C = [];
            switch (e.tagName) {
                case "line":
                    C = ["x1", "y1", "x2", "y2"];
                    break;
                case "circle":
                    C = ["cx", "cy", "r"];
                    break;
                case "ellipse":
                    C = ["cx", "cy", "rx", "ry"];
                    break;
                case "foreignObject":
                case "rect":
                case "image":
                    C = ["width", "height", "x", "y"];
                    break;
                case "use":
                case "text":
                case "tspan":
                    C = ["x", "y"];
                    break;
                case "polygon":
                case "polyline":
                    z = {};
                    z.points = e.getAttribute("points");
                    A = e.points;
                    var F = A.numberOfItems;
                    D.points = Array(F);
                    for (var h = 0; h < F; ++h) {
                        var m =
                            A.getItem(h);
                        D.points[h] = {
                            x: m.x,
                            y: m.y
                        }
                    }
                    break;
                case "path":
                    z = {};
                    z.d = e.getAttribute("d");
                    D.d = e.getAttribute("d")
            }
            if (C.length) {
                D = $(e).attr(C);
                $.each(D, function(Ca, Pa) {
                    D[Ca] = Ba(Ca, Pa)
                })
            } else if (G) D = {
                x: $(G).attr("x") || 0,
                y: $(G).attr("y") || 0
            };
            if (z == null) {
                z = $.extend(true, {}, D);
                $.each(z, function(Ca, Pa) {
                    z[Ca] = Ba(Ca, Pa)
                })
            }
            z.transform = Sa ? Sa : "";
            if (e.tagName == "g" && !G || e.tagName == "a") {
                A = svgedit.utilities.getBBox(e);
                var o = {
                        x: A.x + A.width / 2,
                        y: A.y + A.height / 2
                    },
                    u = N(A.x + A.width / 2, A.y + A.height / 2, Y(k).matrix);
                C = d.createSVGMatrix();
                if (A = na(e)) {
                    h = A * Math.PI / 180;
                    F = Math.abs(h) > 1.0E-10 ? Math.sin(h) / (1 - Math.cos(h)) : 2 / h;
                    for (h = 0; h < k.numberOfItems; ++h) {
                        C = k.getItem(h);
                        if (C.type == 4) {
                            C = C.matrix;
                            o.y = (F * C.e + C.f) / 2;
                            o.x = (C.e - F * C.f) / 2;
                            k.removeItem(h);
                            break
                        }
                    }
                }
                h = C = G = 0;
                var E = k.numberOfItems;
                if (E) var H = k.getItem(0).matrix;
                if (E >= 3 && k.getItem(E - 2).type == 3 && k.getItem(E - 3).type == 2 && k.getItem(E - 1).type == 2) {
                    h = 3;
                    var J = k.getItem(E - 3).matrix,
                        O = k.getItem(E - 2).matrix,
                        X = k.getItem(E - 1).matrix;
                    F = e.childNodes;
                    for (m = F.length; m--;) {
                        var ba = F.item(m);
                        C = G = 0;
                        if (ba.nodeType ==
                            1) {
                            var T = R(ba);
                            if (T) {
                                C = Y(T).matrix;
                                G = na(ba);
                                var fa = Sa,
                                    ha = [];
                                Sa = ba.getAttribute("transform");
                                if (G || oa(T)) {
                                    var W = d.createSVGTransform();
                                    W.setMatrix(ga(J, O, X, C));
                                    T.clear();
                                    T.appendItem(W);
                                    ha.push(W)
                                } else {
                                    G = ga(C.inverse(), X, C);
                                    W = d.createSVGMatrix();
                                    W.e = -G.e;
                                    W.f = -G.f;
                                    C = ga(W.inverse(), C.inverse(), J, O, X, C, G.inverse());
                                    var qa = d.createSVGTransform(),
                                        ua = d.createSVGTransform(),
                                        Aa = d.createSVGTransform();
                                    qa.setTranslate(G.e, G.f);
                                    ua.setScale(C.a, C.d);
                                    Aa.setTranslate(W.e, W.f);
                                    T.appendItem(Aa);
                                    T.appendItem(ua);
                                    T.appendItem(qa);
                                    ha.push(Aa);
                                    ha.push(ua);
                                    ha.push(qa)
                                }
                                l.addSubCommand(Ra(ba));
                                Sa = fa
                            }
                        }
                    }
                    k.removeItem(E - 1);
                    k.removeItem(E - 2);
                    k.removeItem(E - 3)
                } else if (E >= 3 && k.getItem(E - 1).type == 1) {
                    h = 3;
                    C = Y(k).matrix;
                    W = d.createSVGTransform();
                    W.setMatrix(C);
                    k.clear();
                    k.appendItem(W)
                } else if ((E == 1 || E > 1 && k.getItem(1).type != 3) && k.getItem(0).type == 2) {
                    h = 2;
                    G = Y(k).matrix;
                    k.removeItem(0);
                    C = Y(k).matrix.inverse();
                    C = ga(C, G);
                    G = C.e;
                    C = C.f;
                    if (G != 0 || C != 0) {
                        F = e.childNodes;
                        m = F.length;
                        for (E = []; m--;) {
                            ba = F.item(m);
                            if (ba.nodeType == 1) {
                                if (ba.getAttribute("clip-path")) {
                                    fa =
                                        ba.getAttribute("clip-path");
                                    if (E.indexOf(fa) === -1) {
                                        nb(fa, G, C);
                                        E.push(fa)
                                    }
                                }
                                fa = Sa;
                                Sa = ba.getAttribute("transform");
                                if (T = R(ba)) {
                                    J = d.createSVGTransform();
                                    J.setTranslate(G, C);
                                    T.numberOfItems ? T.insertItemBefore(J, 0) : T.appendItem(J);
                                    l.addSubCommand(Ra(ba));
                                    T = e.getElementsByTagNameNS(b, "use");
                                    ba = "#" + ba.id;
                                    for (J = T.length; J--;) {
                                        O = T.item(J);
                                        if (ba == ca(O)) {
                                            X = d.createSVGTransform();
                                            X.setTranslate(-G, -C);
                                            R(O).insertItemBefore(X, 0);
                                            l.addSubCommand(Ra(O))
                                        }
                                    }
                                    Sa = fa
                                }
                            }
                        }
                        E = [];
                        Sa = fa
                    }
                } else if (E == 1 && k.getItem(0).type == 1 && !A) {
                    h =
                        1;
                    C = k.getItem(0).matrix;
                    F = e.childNodes;
                    for (m = F.length; m--;) {
                        ba = F.item(m);
                        if (ba.nodeType == 1) {
                            fa = Sa;
                            Sa = ba.getAttribute("transform");
                            if (T = R(ba)) {
                                G = ga(C, Y(T).matrix);
                                E = d.createSVGTransform();
                                E.setMatrix(G);
                                T.clear();
                                T.appendItem(E, 0);
                                l.addSubCommand(Ra(ba));
                                Sa = fa;
                                fa = ba.getAttribute("stroke-width");
                                ba.getAttribute("stroke") !== "none" && !isNaN(fa) && ba.setAttribute("stroke-width", fa * ((Math.abs(G.a) + Math.abs(G.d)) / 2))
                            }
                        }
                    }
                    k.clear()
                } else {
                    if (A) {
                        o = d.createSVGTransform();
                        o.setRotate(A, u.x, u.y);
                        k.numberOfItems ? k.insertItemBefore(o,
                            0) : k.appendItem(o)
                    }
                    k.numberOfItems == 0 && e.removeAttribute("transform");
                    return null
                }
                if (h == 2) {
                    if (A) {
                        u = {
                            x: o.x + H.e,
                            y: o.y + H.f
                        };
                        o = d.createSVGTransform();
                        o.setRotate(A, u.x, u.y);
                        k.numberOfItems ? k.insertItemBefore(o, 0) : k.appendItem(o)
                    }
                } else if (h == 3) {
                    C = Y(k).matrix;
                    H = d.createSVGTransform();
                    H.setRotate(A, o.x, o.y);
                    H = H.matrix;
                    o = d.createSVGTransform();
                    o.setRotate(A, u.x, u.y);
                    u = o.matrix.inverse();
                    fa = C.inverse();
                    u = ga(fa, u, H, C);
                    G = u.e;
                    C = u.f;
                    if (G != 0 || C != 0) {
                        F = e.childNodes;
                        for (m = F.length; m--;) {
                            ba = F.item(m);
                            if (ba.nodeType ==
                                1) {
                                fa = Sa;
                                Sa = ba.getAttribute("transform");
                                T = R(ba);
                                J = d.createSVGTransform();
                                J.setTranslate(G, C);
                                T.numberOfItems ? T.insertItemBefore(J, 0) : T.appendItem(J);
                                l.addSubCommand(Ra(ba));
                                Sa = fa
                            }
                        }
                    }
                    if (A) k.numberOfItems ? k.insertItemBefore(o, 0) : k.appendItem(o)
                }
            } else {
                A = svgedit.utilities.getBBox(e);
                if (!A && e.tagName != "path") return null;
                C = d.createSVGMatrix();
                if (G = na(e)) {
                    o = {
                        x: A.x + A.width / 2,
                        y: A.y + A.height / 2
                    };
                    u = N(A.x + A.width / 2, A.y + A.height / 2, Y(k).matrix);
                    h = G * Math.PI / 180;
                    F = Math.abs(h) > 1.0E-10 ? Math.sin(h) / (1 - Math.cos(h)) : 2 /
                        h;
                    for (h = 0; h < k.numberOfItems; ++h) {
                        C = k.getItem(h);
                        if (C.type == 4) {
                            C = C.matrix;
                            o.y = (F * C.e + C.f) / 2;
                            o.x = (C.e - F * C.f) / 2;
                            k.removeItem(h);
                            break
                        }
                    }
                }
                h = 0;
                E = k.numberOfItems;
                if (!svgedit.browser.isWebkit())
                    if ((H = e.getAttribute("fill")) && H.indexOf("url(") === 0) {
                        H = P(H);
                        fa = "pattern";
                        if (H.tagName !== fa) fa = "gradient";
                        if (H.getAttribute(fa + "Units") === "userSpaceOnUse") {
                            C = Y(k).matrix;
                            A = R(H);
                            A = Y(A).matrix;
                            C = ga(C, A);
                            A = "matrix(" + [C.a, C.b, C.c, C.d, C.e, C.f].join(",") + ")";
                            H.setAttribute(fa + "Transform", A)
                        }
                    }
                if (E >= 3 && k.getItem(E - 2).type ==
                    3 && k.getItem(E - 3).type == 2 && k.getItem(E - 1).type == 2) {
                    h = 3;
                    C = Y(k, E - 3, E - 1).matrix;
                    k.removeItem(E - 1);
                    k.removeItem(E - 2);
                    k.removeItem(E - 3)
                } else if (E == 4 && k.getItem(E - 1).type == 1) {
                    h = 3;
                    C = Y(k).matrix;
                    W = d.createSVGTransform();
                    W.setMatrix(C);
                    k.clear();
                    k.appendItem(W);
                    C = d.createSVGMatrix()
                } else if ((E == 1 || E > 1 && k.getItem(1).type != 3) && k.getItem(0).type == 2) {
                    h = 2;
                    H = k.getItem(0).matrix;
                    fa = Y(k, 1).matrix;
                    A = fa.inverse();
                    C = ga(A, H, fa);
                    k.removeItem(0)
                } else if (E == 1 && k.getItem(0).type == 1 && !G) {
                    C = Y(k).matrix;
                    switch (e.tagName) {
                        case "line":
                            D =
                                $(e).attr(["x1", "y1", "x2", "y2"]);
                        case "polyline":
                        case "polygon":
                            D.points = e.getAttribute("points");
                            if (D.points) {
                                A = e.points;
                                F = A.numberOfItems;
                                D.points = Array(F);
                                for (h = 0; h < F; ++h) {
                                    m = A.getItem(h);
                                    D.points[h] = {
                                        x: m.x,
                                        y: m.y
                                    }
                                }
                            }
                        case "path":
                            D.d = e.getAttribute("d");
                            h = 1;
                            k.clear()
                    }
                } else {
                    h = 4;
                    if (G) {
                        o = d.createSVGTransform();
                        o.setRotate(G, u.x, u.y);
                        k.numberOfItems ? k.insertItemBefore(o, 0) : k.appendItem(o)
                    }
                    k.numberOfItems == 0 && e.removeAttribute("transform");
                    return null
                }
                if (h == 1 || h == 2 || h == 3) Za(e, D, C);
                if (h == 2) {
                    if (G) {
                        oa(k) ||
                            (u = {
                                x: o.x + C.e,
                                y: o.y + C.f
                            });
                        o = d.createSVGTransform();
                        o.setRotate(G, u.x, u.y);
                        k.numberOfItems ? k.insertItemBefore(o, 0) : k.appendItem(o)
                    }
                } else if (h == 3 && G) {
                    C = Y(k).matrix;
                    H = d.createSVGTransform();
                    H.setRotate(G, o.x, o.y);
                    H = H.matrix;
                    o = d.createSVGTransform();
                    o.setRotate(G, u.x, u.y);
                    u = o.matrix.inverse();
                    fa = C.inverse();
                    u = ga(fa, u, H, C);
                    Za(e, D, u);
                    if (G) k.numberOfItems ? k.insertItemBefore(o, 0) : k.appendItem(o)
                }
            }
            k.numberOfItems == 0 && e.removeAttribute("transform");
            l.addSubCommand(new Ma(e, z));
            return l
        },
        mb = null,
        xa = this.clearSelection =
        function(e) {
            if (I[0] != null)
                for (var k = I.length, l = 0; l < k; ++l) {
                    var C = I[l];
                    if (C == null) break;
                    ra.releaseSelector(C);
                    I[l] = null
                }
            e || M("selected", I)
        },
        qb = this.addToSelection = function(e, k) {
            if (e.length != 0) {
                for (var l = 0; l < I.length;) {
                    if (I[l] == null) break;
                    ++l
                }
                for (var C = e.length; C--;) {
                    var A = e[C];
                    if (A && svgedit.utilities.getBBox(A)) {
                        if (A.tagName === "a" && A.childNodes.length === 1) A = A.firstChild;
                        if (I.indexOf(A) == -1) {
                            I[l] = A;
                            l++;
                            A = ra.requestSelector(A);
                            I.length > 1 && A.showGrips(false)
                        }
                    }
                }
                M("selected", I);
                k || I.length == 1 ? ra.requestSelector(I[0]).showGrips(true) :
                    ra.requestSelector(I[0]).showGrips(false);
                for (I.sort(function(G, D) {
                        if (G && D && G.compareDocumentPosition) return 3 - (D.compareDocumentPosition(G) & 6);
                        else if (G == null) return 1
                    }); I[0] == null;) I.shift(0)
            }
        },
        rb = this.selectOnly = function(e, k) {
            xa(true);
            qb(e, k)
        };
    this.removeFromSelection = function(e) {
        if (I[0] != null)
            if (e.length != 0) {
                var k = Array(I.length);
                j = 0;
                len = I.length;
                for (var l = 0; l < len; ++l) {
                    var C = I[l];
                    if (C)
                        if (e.indexOf(C) == -1) {
                            k[j] = C;
                            j++
                        } else ra.releaseSelector(C)
                }
                I = k
            }
    };
    this.selectAllInCurrentLayer = function() {
        var e =
            B().getCurrentLayer();
        if (e) {
            Ha = "select";
            rb($(L || e).children())
        }
    };
    var Bb = this.getMouseTarget = function(e) {
        if (e == null || e.target == null) return null;
        e = e.target;
        if (e.correspondingUseElement) e = e.correspondingUseElement;
        if (["http://www.w3.org/1998/Math/MathML", "http://www.w3.org/1999/xhtml"].indexOf(e.namespaceURI) >= 0 && e.id != "svgcanvas")
            for (; e.nodeName != "foreignObject";) {
                e = e.parentNode;
                if (!e) return d
            }
        var k = B().getCurrentLayer();
        if ([d, a, n, k].indexOf(e) >= 0) return d;
        if ($(e).closest("#selectorParentGroup").length) return ra.selectorParentGroup;
        for (; e.parentNode && e.parentNode !== (L || k);) e = e.parentNode;
        return e
    };
    (function() {
        var e = null,
            k = null,
            l = null,
            C = null,
            A = null,
            G = {},
            D = {
                minx: null,
                miny: null,
                maxx: null,
                maxy: null
            };
        $(a).mousedown(function(z) {
            if (!c.spaceKey) {
                var F = z.button === 2;
                mb = n.getScreenCTM().inverse();
                isBotchedZoom = svgedit.browser.isGecko();
                var h = N(z.pageX, z.pageY, mb),
                    m = h.x * (isBotchedZoom ? 1 : q);
                h = h.y * (isBotchedZoom ? 1 : q);
                z.preventDefault();
                if (F) Ha = "select";
                m = m / q;
                h = h / q;
                var o = Bb(z);
                if (o.tagName === "a" && o.childNodes.length === 1) o = o.firstChild;
                var u =
                    C = k = m,
                    E = A = l = h;
                if (p.gridSnapping) {
                    m = va(m);
                    h = va(h);
                    k = va(k);
                    l = va(l)
                }
                if (o == ra.selectorParentGroup && I[0] != null) {
                    o = z.target;
                    var H = cb(o, "type");
                    if (H == "rotate") {
                        Ha = "rotate";
                        current_rotate_mode = cb(o, "dir")
                    } else if (H == "resize") {
                        Ha = "resize";
                        db = cb(o, "dir")
                    }
                    o = I[0]
                }
                Sa = o.getAttribute("transform");
                H = R(o);
                switch (Ha) {
                    case "select":
                        Ka = true;
                        db = "none";
                        if (F) Ka = false;
                        if (o != d) {
                            if (I.indexOf(o) == -1) {
                                z.shiftKey || xa(true);
                                qb([o]);
                                wb = o;
                                La.clear()
                            }
                            if (!F)
                                for (F = 0; F < I.length; ++F)
                                    if (I[F] != null) {
                                        var J = R(I[F]);
                                        J.numberOfItems ? J.insertItemBefore(d.createSVGTransform(),
                                            0) : J.appendItem(d.createSVGTransform())
                                    }
                        } else if (!F) {
                            xa();
                            Ha = "multiselect";
                            if (sa == null) sa = ra.getRubberBandBox();
                            C *= q;
                            A *= q;
                            ma(sa, {
                                x: C,
                                y: A,
                                width: 0,
                                height: 0,
                                display: "inline"
                            }, 100)
                        }
                        break;
                    case "zoom":
                        Ka = true;
                        if (sa == null) sa = ra.getRubberBandBox();
                        ma(sa, {
                            x: u * q,
                            y: u * q,
                            width: 0,
                            height: 0,
                            display: "inline"
                        }, 100);
                        break;
                    case "resize":
                        Ka = true;
                        k = m;
                        l = h;
                        G = svgedit.utilities.getBBox($("#selectedBox0")[0]);
                        var O = {};
                        $.each(G, function(X, ba) {
                            O[X] = ba / q
                        });
                        G = O;
                        F = na(o) ? 1 : 0;
                        if (oa(H)) {
                            H.insertItemBefore(d.createSVGTransform(), F);
                            H.insertItemBefore(d.createSVGTransform(), F);
                            H.insertItemBefore(d.createSVGTransform(), F)
                        } else {
                            H.appendItem(d.createSVGTransform());
                            H.appendItem(d.createSVGTransform());
                            H.appendItem(d.createSVGTransform());
                            if (svgedit.browser.supportsNonScalingStroke()) {
                                if (m = svgedit.browser.isWebkit()) J = function(X) {
                                    var ba = X.getAttributeNS(null, "stroke");
                                    X.removeAttributeNS(null, "stroke");
                                    setTimeout(function() {
                                        X.setAttributeNS(null, "stroke", ba)
                                    }, 0)
                                };
                                o.style.vectorEffect = "non-scaling-stroke";
                                m && J(o);
                                h = o.getElementsByTagName("*");
                                u = h.length;
                                for (F = 0; F < u; F++) {
                                    h[F].style.vectorEffect = "non-scaling-stroke";
                                    m && J(h[F])
                                }
                            }
                        }
                        break;
                    case "fhellipse":
                    case "fhrect":
                    case "fhpath":
                        Ka = true;
                        e = u + "," + E + " ";
                        J = K.stroke_width == 0 ? 1 : K.stroke_width;
                        S({
                            element: "polyline",
                            curStyles: true,
                            attr: {
                                points: e,
                                id: ka(),
                                fill: "none",
                                opacity: K.opacity / 2,
                                "stroke-linecap": "round",
                                style: "pointer-events:none"
                            }
                        });
                        D.minx = u;
                        D.maxx = u;
                        D.miny = E;
                        D.maxy = E;
                        break;
                    case "image":
                        Ka = true;
                        J = S({
                            element: "image",
                            attr: {
                                x: m,
                                y: h,
                                width: 0,
                                height: 0,
                                id: ka(),
                                opacity: K.opacity / 2,
                                style: "pointer-events:inherit"
                            }
                        });
                        U(J, Ga);
                        Fb(J);
                        break;
                    case "square":
                    case "rect":
                        Ka = true;
                        k = m;
                        l = h;
                        S({
                            element: "rect",
                            curStyles: true,
                            attr: {
                                x: m,
                                y: h,
                                width: 0,
                                height: 0,
                                id: ka(),
                                opacity: K.opacity / 2
                            }
                        });
                        break;
                    case "line":
                        Ka = true;
                        J = K.stroke_width == 0 ? 1 : K.stroke_width;
                        S({
                            element: "line",
                            curStyles: true,
                            attr: {
                                x1: m,
                                y1: h,
                                x2: m,
                                y2: h,
                                id: ka(),
                                stroke: K.stroke,
                                "stroke-width": J,
                                "stroke-dasharray": K.stroke_dasharray,
                                "stroke-linejoin": K.stroke_linejoin,
                                "stroke-linecap": K.stroke_linecap,
                                "stroke-opacity": K.stroke_opacity,
                                fill: "none",
                                opacity: K.opacity / 2,
                                style: "pointer-events:none"
                            }
                        });
                        break;
                    case "circle":
                        Ka = true;
                        S({
                            element: "circle",
                            curStyles: true,
                            attr: {
                                cx: m,
                                cy: h,
                                r: 0,
                                id: ka(),
                                opacity: K.opacity / 2
                            }
                        });
                        break;
                    case "ellipse":
                        Ka = true;
                        S({
                            element: "ellipse",
                            curStyles: true,
                            attr: {
                                cx: m,
                                cy: h,
                                rx: 0,
                                ry: 0,
                                id: ka(),
                                opacity: K.opacity / 2
                            }
                        });
                        break;
                    case "text":
                        Ka = true;
                        S({
                            element: "text",
                            curStyles: true,
                            attr: {
                                x: m,
                                y: h,
                                id: ka(),
                                fill: Ua.fill,
                                "stroke-width": Ua.stroke_width,
                                "font-size": Ua.font_size,
                                "font-family": Ua.font_family,
                                "text-anchor": "left",
                                "xml:space": "preserve",
                                opacity: K.opacity
                            }
                        });
                        break;
                    case "path":
                    case "pathedit":
                        k *=
                            q;
                        l *= q;
                        La.mouseDown(z, o, k, l);
                        Ka = true;
                        break;
                    case "textedit":
                        k *= q;
                        l *= q;
                        bb.mouseDown(z, o, k, l);
                        Ka = true;
                        break;
                    case "rotate":
                        Ka = true;
                        c.undoMgr.beginUndoableChange("transform", I);
                        document.getElementById("workarea").className = "rotate"
                }
                J = ib("mouseDown", {
                    event: z,
                    start_x: k,
                    start_y: l,
                    selectedElements: I
                }, true);
                $.each(J, function(X, ba) {
                    if (ba && ba.started) Ka = true
                });
                if (Ha) document.getElementById("workarea").className = Ha == "resize" ? z.target.style.cursor : Ha
            }
        }).mousemove(function(z) {
            if (!(z.originalEvent.touches && z.originalEvent.touches.length >
                    1))
                if (Ka)
                    if (!(z.button === 1 || c.spaceKey)) {
                        var F = I[0],
                            h = N(z.pageX, z.pageY, mb),
                            m = h.x * (isBotchedZoom ? 1 : q);
                        h = h.y * (isBotchedZoom ? 1 : q);
                        var o = pa(aa()),
                            u = x = m / q,
                            E = y = h / q;
                        if (p.gridSnapping) {
                            x = va(x);
                            y = va(y)
                        }
                        z.preventDefault();
                        switch (Ha) {
                            case "select":
                                if (I[0] !== null) {
                                    u = x - k;
                                    var H = y - l;
                                    if (p.gridSnapping) {
                                        u = va(u);
                                        H = va(H)
                                    }
                                    if (z.shiftKey) {
                                        var J = V(k, l, x, y);
                                        x = J.x;
                                        y = J.y
                                    }
                                    if (u != 0 || H != 0) {
                                        E = I.length;
                                        for (var O = 0; O < E; ++O) {
                                            F = I[O];
                                            if (F == null) break;
                                            var X = d.createSVGTransform();
                                            o = R(F);
                                            if (J) {
                                                u = J.x - k;
                                                H = J.y - l
                                            }
                                            X.setTranslate(u, H);
                                            o.numberOfItems ?
                                                o.replaceItem(X, 0) : o.appendItem(X);
                                            ra.requestSelector(F).resize()
                                        }
                                        if (z.altKey)
                                            if (!c.addClones) {
                                                c.addClones = c.cloneSelectedElements(0, 0, X);
                                                c.removeClones = function() {
                                                    c.addClones && c.addClones.forEach(function(ua) {
                                                        ua.parentNode && ua.parentNode.removeChild(ua);
                                                        c.addClones = false
                                                    })
                                                };
                                                window.addEventListener("keyup", c.removeClones)
                                            }
                                        M("transition", I)
                                    }
                                }
                                break;
                            case "multiselect":
                                u *= q;
                                E *= q;
                                ma(sa, {
                                    x: Math.min(C, u),
                                    y: Math.min(A, E),
                                    width: Math.abs(u - C),
                                    height: Math.abs(E - A)
                                }, 100);
                                o = [];
                                u = [];
                                J = ob();
                                E = I.length;
                                for (O = 0; O <
                                    E; ++O) {
                                    H = J.indexOf(I[O]);
                                    if (H == -1) o.push(I[O]);
                                    else J[H] = null
                                }
                                E = J.length;
                                for (O = 0; O < E; ++O) J[O] && u.push(J[O]);
                                o.length > 0 && c.removeFromSelection(o);
                                u.length > 0 && qb(u);
                                break;
                            case "resize":
                                o = R(F);
                                u = (J = oa(o)) ? G : svgedit.utilities.getBBox(F);
                                E = u.x;
                                O = u.y;
                                var ba = u.width,
                                    T = u.height;
                                u = x - k;
                                H = y - l;
                                if (p.gridSnapping) {
                                    u = va(u);
                                    H = va(H);
                                    T = va(T);
                                    ba = va(ba)
                                }
                                if (X = na(F)) {
                                    var fa = Math.sqrt(u * u + H * H);
                                    H = Math.atan2(H, u) - X * Math.PI / 180;
                                    u = fa * Math.cos(H);
                                    H = fa * Math.sin(H)
                                }
                                if (db.indexOf("n") == -1 && db.indexOf("s") == -1) H = 0;
                                if (db.indexOf("e") ==
                                    -1 && db.indexOf("w") == -1) u = 0;
                                var ha = fa = 0,
                                    W = T ? (T + H) / T : 1,
                                    qa = ba ? (ba + u) / ba : 1;
                                if (db.indexOf("n") >= 0) {
                                    W = T ? (T - H) / T : 1;
                                    ha = T
                                }
                                if (db.indexOf("w") >= 0) {
                                    qa = ba ? (ba - u) / ba : 1;
                                    fa = ba
                                }
                                u = d.createSVGTransform();
                                H = d.createSVGTransform();
                                ba = d.createSVGTransform();
                                if (p.gridSnapping) {
                                    E = va(E);
                                    fa = va(fa);
                                    O = va(O);
                                    ha = va(ha)
                                }
                                u.setTranslate(-(E + fa), -(O + ha));
                                if (z.shiftKey)
                                    if (qa == 1) qa = W;
                                    else W = qa;
                                H.setScale(qa, W);
                                ba.setTranslate(E + fa, O + ha);
                                if (J) {
                                    J = X ? 1 : 0;
                                    o.replaceItem(u, 2 + J);
                                    o.replaceItem(H, 1 + J);
                                    o.replaceItem(ba, 0 + J)
                                } else {
                                    J = o.numberOfItems;
                                    o.replaceItem(ba, J - 3);
                                    o.replaceItem(H, J - 2);
                                    o.replaceItem(u, J - 1)
                                }
                                ra.requestSelector(F).resize();
                                M("transition", I);
                                break;
                            case "zoom":
                                u *= q;
                                E *= q;
                                ma(sa, {
                                    x: Math.min(C * q, u),
                                    y: Math.min(A * q, E),
                                    width: Math.abs(u - C * q),
                                    height: Math.abs(E - A * q)
                                }, 100);
                                break;
                            case "text":
                                ma(o, {
                                    x: x,
                                    y: y
                                }, 1E3);
                                break;
                            case "line":
                                u = null;
                                window.opera || d.suspendRedraw(1E3);
                                if (p.gridSnapping) {
                                    x = va(x);
                                    y = va(y)
                                }
                                E = x;
                                J = y;
                                if (z.shiftKey) {
                                    J = V(k, l, E, J);
                                    E = J.x;
                                    J = J.y
                                }
                                o.setAttributeNS(null, "x2", E);
                                o.setAttributeNS(null, "y2", J);
                                window.opera || d.unsuspendRedraw(u);
                                break;
                            case "foreignObject":
                            case "square":
                            case "rect":
                            case "image":
                                u = Math.abs(x - k);
                                J = Math.abs(y - l);
                                if (Ha == "square" || z.shiftKey) {
                                    u = J = Math.max(u, J);
                                    E = k < x ? k : k - u;
                                    O = l < y ? l : l - J
                                } else {
                                    E = Math.min(k, x);
                                    O = Math.min(l, y)
                                }
                                if (z.altKey) {
                                    u *= 2;
                                    J *= 2;
                                    E = k - u / 2;
                                    O = l - J / 2
                                }
                                if (p.gridSnapping) {
                                    u = va(u);
                                    J = va(J);
                                    E = va(E);
                                    O = va(O)
                                }
                                ma(o, {
                                    width: u,
                                    height: J,
                                    x: E,
                                    y: O
                                }, 1E3);
                                break;
                            case "circle":
                                u = $(o).attr(["cx", "cy"]);
                                J = u.cx;
                                E = u.cy;
                                u = Math.sqrt((x - J) * (x - J) + (y - E) * (y - E));
                                if (p.gridSnapping) u = va(u);
                                o.setAttributeNS(null, "r", u);
                                break;
                            case "ellipse":
                                u =
                                    $(o).attr(["cx", "cy"]);
                                J = Math.abs(k + (x - k) / 2);
                                E = Math.abs(l + (y - l) / 2);
                                u = null;
                                window.opera || d.suspendRedraw(1E3);
                                if (p.gridSnapping) {
                                    x = va(x);
                                    J = va(J);
                                    y = va(y);
                                    E = va(E)
                                }
                                O = Math.abs(k - J);
                                H = Math.abs(l - E);
                                if (z.shiftKey) {
                                    H = O;
                                    E = y > l ? l + O : l - O
                                }
                                if (z.altKey) {
                                    J = k;
                                    E = l;
                                    O = Math.abs(x - J);
                                    H = z.shiftKey ? O : Math.abs(y - E)
                                }
                                o.setAttributeNS(null, "rx", O);
                                o.setAttributeNS(null, "ry", H);
                                o.setAttributeNS(null, "cx", J);
                                o.setAttributeNS(null, "cy", E);
                                window.opera || d.unsuspendRedraw(u);
                                break;
                            case "fhellipse":
                            case "fhrect":
                                D.minx = Math.min(u,
                                    D.minx);
                                D.maxx = Math.max(u, D.maxx);
                                D.miny = Math.min(E, D.miny);
                                D.maxy = Math.max(E, D.maxy);
                            case "fhpath":
                                e += +u + "," + E + " ";
                                o.setAttributeNS(null, "points", e);
                                break;
                            case "path":
                            case "pathedit":
                                x *= q;
                                y *= q;
                                if (p.gridSnapping) {
                                    x = va(x);
                                    y = va(y);
                                    k = va(k);
                                    l = va(l)
                                }
                                if (z.shiftKey) {
                                    if (J = svgedit.path.path) {
                                        o = J.dragging ? J.dragging[0] : k;
                                        J = J.dragging ? J.dragging[1] : l
                                    } else {
                                        o = k;
                                        J = l
                                    }
                                    J = V(o, J, x, y);
                                    x = J.x;
                                    y = J.y
                                }
                                if (sa && sa.getAttribute("display") !== "none") {
                                    u *= q;
                                    E *= q;
                                    ma(sa, {
                                        x: Math.min(C * q, u),
                                        y: Math.min(A * q, E),
                                        width: Math.abs(u - C * q),
                                        height: Math.abs(E -
                                            A * q)
                                    }, 100)
                                }
                                La.mouseMove(z, x, y);
                                break;
                            case "textedit":
                                x *= q;
                                y *= q;
                                bb.mouseMove(m, h);
                                break;
                            case "rotate":
                                u = svgedit.utilities.getBBox(F);
                                J = u.x + u.width / 2;
                                E = u.y + u.height / 2;
                                o = ea(F);
                                o = N(J, E, o);
                                J = o.x;
                                E = o.y;
                                o = u.x;
                                O = u.y;
                                if (current_rotate_mode == "nw") o = u.x + u.width;
                                if (current_rotate_mode == "se") O = u.y + u.height;
                                if (current_rotate_mode == "sw") {
                                    o = u.x + u.width;
                                    O = u.y + u.height
                                }
                                compensation_angle = (Math.atan2(E - O, J - o) * (180 / Math.PI) - 90) % 360;
                                X = (Math.atan2(E - y, J - x) * (180 / Math.PI) - 90) % 360;
                                X += compensation_angle;
                                if (p.gridSnapping) X =
                                    va(X);
                                if (z.shiftKey) X = Math.round(X / 45) * 45;
                                c.setRotationAngle(X < -180 ? 360 + X : X, true);
                                M("transition", I)
                        }
                        ib("mouseMove", {
                            event: z,
                            mouse_x: m,
                            mouse_y: h,
                            selected: F
                        })
                    }
        }).click(function(z) {
            z.preventDefault();
            return false
        }).dblclick(function(z) {
            var F = z.target.parentNode,
                h = Bb(z),
                m = h.tagName;
            if (F !== L) {
                if (m === "text" && Ha !== "textedit") {
                    z = N(z.pageX, z.pageY, mb);
                    bb.select(h, z.x, z.y)
                }
                if ((m === "g" || m === "a") && na(h)) {
                    Db(h);
                    h = I[0];
                    xa(true)
                }
                L && Eb();
                F.tagName !== "g" && F.tagName !== "a" || F === B().getCurrentLayer() || h === ra.selectorParentGroup ||
                    Kb(h)
            }
        }).mouseup(function(z) {
            c.addClones = false;
            window.removeEventListener("keyup", c.removeClones);
            I = I.filter(Boolean);
            if (z.button !== 2) {
                var F = wb;
                wb = null;
                if (Ka) {
                    var h = N(z.pageX, z.pageY, mb),
                        m = h.x * q;
                    h = h.y * q;
                    var o = m / q,
                        u = h / q,
                        E = pa(aa()),
                        H = false;
                    Ka = false;
                    switch (Ha) {
                        case "resize":
                        case "multiselect":
                            if (sa != null) {
                                sa.setAttribute("display", "none");
                                hb = []
                            }
                            Ha = "select";
                        case "select":
                            if (I[0] != null) {
                                if (I.length == 1) {
                                    m = I[0];
                                    switch (m.tagName) {
                                        case "g":
                                        case "use":
                                        case "image":
                                        case "foreignObject":
                                            break;
                                        default:
                                            Xa.fill =
                                                m.getAttribute("fill");
                                            Xa.fill_opacity = m.getAttribute("fill-opacity");
                                            Xa.stroke = m.getAttribute("stroke");
                                            Xa.stroke_opacity = m.getAttribute("stroke-opacity");
                                            Xa.stroke_width = m.getAttribute("stroke-width");
                                            Xa.stroke_dasharray = m.getAttribute("stroke-dasharray");
                                            Xa.stroke_linejoin = m.getAttribute("stroke-linejoin");
                                            Xa.stroke_linecap = m.getAttribute("stroke-linecap")
                                    }
                                    if (m.tagName == "text") {
                                        Ua.font_size = m.getAttribute("font-size");
                                        Ua.font_family = m.getAttribute("font-family")
                                    }
                                    ra.requestSelector(m).showGrips(true)
                                }
                                Ea();
                                C = (m = svgedit.browser.isGecko()) ? C * q : C;
                                A = m ? A * q : A;
                                m = Math.abs(u - A);
                                if (m > 1 || m > 1) {
                                    z = I.length;
                                    for (m = 0; m < z; ++m) {
                                        if (I[m] == null) break;
                                        I[m].firstChild || ra.requestSelector(I[m]).resize()
                                    }
                                } else {
                                    m = z.target;
                                    if (I[0].nodeName === "path" && I[1] == null) La.select(I[0]);
                                    else z.shiftKey && F != m && c.removeFromSelection([m])
                                }
                                if (svgedit.browser.supportsNonScalingStroke())
                                    if (z = I[0]) {
                                        z.removeAttribute("style");
                                        svgedit.utilities.walkTree(z, function(X) {
                                            X.removeAttribute("style")
                                        })
                                    }
                            }
                            return;
                        case "zoom":
                            sa != null && sa.setAttribute("display",
                                "none");
                            M("zoomed", {
                                x: Math.min(C, o),
                                y: Math.min(A, u),
                                width: Math.abs(o - C),
                                height: Math.abs(u - A),
                                factor: z.altKey ? 0.5 : 2
                            });
                            return;
                        case "fhpath":
                            F = E.getAttribute("points");
                            u = F.indexOf(",");
                            if (H = u >= 0 ? F.indexOf(",", u + 1) >= 0 : F.indexOf(" ", F.indexOf(" ") + 1) >= 0) E = La.smoothPolylineIntoPath(E);
                            break;
                        case "line":
                            F = $(E).attr(["x1", "x2", "y1", "y2"]);
                            H = F.x1 != F.x2 || F.y1 != F.y2;
                            break;
                        case "foreignObject":
                        case "square":
                        case "rect":
                        case "image":
                            F = $(E).attr(["width", "height"]);
                            H = F.width != 0 || F.height != 0 || Ha === "image";
                            break;
                        case "circle":
                            H = E.getAttribute("r") != 0;
                            break;
                        case "ellipse":
                            F = $(E).attr(["rx", "ry"]);
                            H = F.rx != null || F.ry != null;
                            break;
                        case "fhellipse":
                            if (D.maxx - D.minx > 0 && D.maxy - D.miny > 0) {
                                E = S({
                                    element: "ellipse",
                                    curStyles: true,
                                    attr: {
                                        cx: (D.minx + D.maxx) / 2,
                                        cy: (D.miny + D.maxy) / 2,
                                        rx: (D.maxx - D.minx) / 2,
                                        ry: (D.maxy - D.miny) / 2,
                                        id: aa()
                                    }
                                });
                                M("changed", [E]);
                                H = true
                            }
                            break;
                        case "fhrect":
                            if (D.maxx - D.minx > 0 && D.maxy - D.miny > 0) {
                                E = S({
                                    element: "rect",
                                    curStyles: true,
                                    attr: {
                                        x: D.minx,
                                        y: D.miny,
                                        width: D.maxx - D.minx,
                                        height: D.maxy - D.miny,
                                        id: aa()
                                    }
                                });
                                M("changed", [E]);
                                H = true
                            }
                            break;
                        case "text":
                            H = true;
                            rb([E]);
                            bb.start(E);
                            break;
                        case "path":
                            E = null;
                            Ka = true;
                            F = La.mouseUp(z, E, m, h);
                            E = F.element;
                            H = F.keep;
                            break;
                        case "pathedit":
                            H = true;
                            E = null;
                            La.mouseUp(z);
                            break;
                        case "textedit":
                            H = false;
                            E = null;
                            bb.mouseUp(z, m, h);
                            break;
                        case "rotate":
                            H = true;
                            E = null;
                            Ha = "select";
                            F = c.undoMgr.finishUndoableChange();
                            F.isEmpty() || wa(F);
                            Ea();
                            M("changed", I)
                    }
                    m = ib("mouseUp", {
                        event: z,
                        mouse_x: m,
                        mouse_y: h
                    }, true);
                    $.each(m, function(X, ba) {
                        if (ba) {
                            H = ba.keep || H;
                            E = ba.element;
                            Ka = ba.started || Ka
                        }
                    });
                    if (!H &&
                        E != null) {
                        B().releaseId(aa());
                        E.parentNode.removeChild(E);
                        E = null;
                        for (m = z.target; m.parentNode.parentNode.tagName == "g";) m = m.parentNode;
                        if ((Ha != "path" || !drawn_path) && m.parentNode.id != "selectorParentGroup" && m.id != "svgcanvas" && m.id != "svgroot") {
                            c.setMode("select");
                            rb([m], true)
                        }
                    } else if (E != null) {
                        c.addedNew = true;
                        z = 0.2;
                        var J;
                        if (false.beginElement && E.getAttribute("opacity") != K.opacity) {
                            J = $(false).clone().attr({
                                to: K.opacity,
                                dur: z
                            }).appendTo(E);
                            try {
                                J[0].beginElement()
                            } catch (O) {}
                        } else z = 0;
                        setTimeout(function() {
                            J &&
                                J.remove();
                            E.setAttribute("opacity", K.opacity);
                            E.setAttribute("style", "pointer-events:inherit");
                            la(E);
                            if (Ha === "path") La.toEditMode(E);
                            else p.selectNew && rb([E], true);
                            wa(new Ia(E));
                            M("changed", [E])
                        }, z * 1E3)
                    }
                    Sa = null
                }
            }
        });
        $(a).bind("mousewheel DOMMouseScroll", function(z) {
            if (z.shiftKey) {
                z.preventDefault();
                mb = n.getScreenCTM().inverse();
                var F = N(z.pageX, z.pageY, mb);
                F = {
                    x: F.x,
                    y: F.y,
                    width: 0,
                    height: 0
                };
                if (z.wheelDelta)
                    if (z.wheelDelta >= 120) F.factor = 2;
                    else {
                        if (z.wheelDelta <= -120) F.factor = 0.5
                    } else if (z.detail)
                    if (z.detail >
                        0) F.factor = 0.5;
                    else if (z.detail < 0) F.factor = 2;
                F.factor && M("zoomed", F)
            }
        })
    })();
    var Fb = function(e) {
            $(e).click(function(k) {
                k.preventDefault()
            })
        },
        bb = c.textActions = function() {
            function e(T) {
                var fa = h.value === "";
                $(h).focus();
                if (!arguments.length)
                    if (fa) T = 0;
                    else {
                        if (h.selectionEnd !== h.selectionStart) return;
                        T = h.selectionEnd
                    }
                var ha;
                ha = E[T];
                fa || h.setSelectionRange(T, T);
                m = pa("text_cursor");
                if (!m) {
                    m = document.createElementNS(b, "line");
                    ma(m, {
                        id: "text_cursor",
                        stroke: "#333",
                        "stroke-width": 1
                    });
                    m = pa("selectorParentGroup").appendChild(m)
                }
                u ||
                    (u = setInterval(function() {
                        var W = m.getAttribute("display") === "none";
                        m.setAttribute("display", W ? "inline" : "none")
                    }, 600));
                fa = G(ha.x, H.y);
                ha = G(ha.x, H.y + H.height);
                ma(m, {
                    x1: fa.x,
                    y1: fa.y,
                    x2: ha.x,
                    y2: ha.y,
                    visibility: "visible",
                    display: "inline"
                });
                o && o.setAttribute("d", "M 0 0")
            }

            function k(T, fa, ha) {
                if (T === fa) e(fa);
                else {
                    ha || h.setSelectionRange(T, fa);
                    o = pa("text_selectblock");
                    if (!o) {
                        o = document.createElementNS(b, "path");
                        ma(o, {
                            id: "text_selectblock",
                            fill: "green",
                            opacity: 0.5,
                            style: "pointer-events:none"
                        });
                        pa("selectorParentGroup").appendChild(o)
                    }
                    T =
                        E[T];
                    var W = E[fa];
                    m.setAttribute("visibility", "hidden");
                    fa = G(T.x, H.y);
                    ha = G(T.x + (W.x - T.x), H.y);
                    var qa = G(T.x, H.y + H.height);
                    T = G(T.x + (W.x - T.x), H.y + H.height);
                    ma(o, {
                        d: "M" + fa.x + "," + fa.y + " L" + ha.x + "," + ha.y + " " + T.x + "," + T.y + " " + qa.x + "," + qa.y + "z",
                        display: "inline"
                    })
                }
            }

            function l(T, fa) {
                var ha = d.createSVGPoint();
                ha.x = T;
                ha.y = fa;
                if (E.length == 1) return 0;
                ha = F.getCharNumAtPosition(ha);
                if (ha < 0) {
                    ha = E.length - 2;
                    if (T <= E[0].x) ha = 0
                } else if (ha >= E.length - 2) ha = E.length - 2;
                var W = E[ha];
                T > W.x + W.width / 2 && ha++;
                return ha
            }

            function C(T,
                fa, ha) {
                var W = h.selectionStart;
                T = l(T, fa);
                k(Math.min(W, T), Math.max(W, T), !ha)
            }

            function A(T, fa) {
                var ha = {
                    x: T,
                    y: fa
                };
                ha.x /= q;
                ha.y /= q;
                if (J) {
                    var W = N(ha.x, ha.y, J.inverse());
                    ha.x = W.x;
                    ha.y = W.y
                }
                return ha
            }

            function G(T, fa) {
                var ha = {
                    x: T,
                    y: fa
                };
                if (J) {
                    var W = N(ha.x, ha.y, J);
                    ha.x = W.x;
                    ha.y = W.y
                }
                ha.x *= q;
                ha.y *= q;
                return ha
            }

            function D(T) {
                k(0, F.textContent.length);
                $(this).unbind(T)
            }

            function z(T) {
                if (ba && F) {
                    var fa = N(T.pageX, T.pageY, mb);
                    fa = A(fa.x * q, fa.y * q);
                    fa = l(fa.x, fa.y);
                    var ha = F.textContent,
                        W = ha.substr(0, fa).replace(/[a-z0-9]+$/i,
                            "").length;
                    ha = ha.substr(fa).match(/^[a-z0-9]+/i);
                    k(W, (ha ? ha[0].length : 0) + fa);
                    $(T.target).click(D);
                    setTimeout(function() {
                        $(T.target).unbind("click", D)
                    }, 300)
                }
            }
            var F, h, m, o, u, E = [],
                H, J, O, X, ba;
            return {
                select: function(T, fa, ha) {
                    F = T;
                    bb.toEditMode(fa, ha)
                },
                start: function(T) {
                    F = T;
                    bb.toEditMode()
                },
                mouseDown: function(T, fa, ha, W) {
                    T = A(ha, W);
                    h.focus();
                    e(l(T.x, T.y));
                    O = ha;
                    X = W
                },
                mouseMove: function(T, fa) {
                    var ha = A(T, fa);
                    C(ha.x, ha.y)
                },
                mouseUp: function(T, fa, ha) {
                    var W = A(fa, ha);
                    C(W.x, W.y, true);
                    T.target !== F && fa < O + 2 && fa > O - 2 && ha <
                        X + 2 && ha > X - 2 && bb.toSelectMode(true)
                },
                setCursor: e,
                toEditMode: function(T, fa) {
                    rb([F], false);
                    ba = false;
                    Ha = "textedit";
                    ra.requestSelector(F).showGrips(false);
                    ra.requestSelector(F);
                    bb.init();
                    $(F).css("cursor", "text");
                    if (arguments.length) {
                        var ha = A(T, fa);
                        e(l(ha.x, ha.y))
                    } else e();
                    setTimeout(function() {
                        ba = true
                    }, 300)
                },
                toSelectMode: function(T) {
                    Ha = "select";
                    clearInterval(u);
                    u = null;
                    o && $(o).attr("display", "none");
                    m && $(m).attr("visibility", "hidden");
                    $(F).css("cursor", "move");
                    if (T) {
                        xa();
                        $(F).css("cursor", "move");
                        M("selected", [F]);
                        qb([F], true)
                    }
                    F && !F.textContent.length && c.deleteSelectedElements();
                    $(h).blur();
                    F = false
                },
                setInputElem: function(T) {
                    h = T
                },
                clear: function() {
                    Ha == "textedit" && bb.toSelectMode()
                },
                init: function() {
                    if (F) {
                        if (!F.parentNode) {
                            F = I[0];
                            ra.requestSelector(F).showGrips(false)
                        }
                        var T = F.textContent.length,
                            fa = F.getAttribute("transform");
                        H = svgedit.utilities.getBBox(F);
                        J = fa ? ea(F) : null;
                        E = Array(T);
                        h.focus();
                        $(F).unbind("dblclick", z).dblclick(z);
                        if (!T) var ha = {
                            x: H.x + H.width / 2,
                            width: 0
                        };
                        for (fa = 0; fa < T; fa++) {
                            var W = F.getStartPositionOfChar(fa);
                            ha = F.getEndPositionOfChar(fa);
                            if (!svgedit.browser.supportsGoodTextCharPos()) {
                                var qa = c.contentW * q;
                                W.x -= qa;
                                ha.x -= qa;
                                W.x /= q;
                                ha.x /= q
                            }
                            E[fa] = {
                                x: W.x,
                                y: H.y,
                                width: ha.x - W.x,
                                height: H.height
                            }
                        }
                        E.push({
                            x: ha.x,
                            width: 0
                        });
                        k(h.selectionStart, h.selectionEnd, true)
                    }
                }
            }
        }(),
        La = c.pathActions = function() {
            var e = false,
                k, l, C;
            svgedit.path.Path.prototype.endChanges = function(D) {
                if (svgedit.browser.isWebkit()) {
                    var z = this.elem;
                    z.setAttribute("d", La.convertPath(z))
                }
                D = new Ma(this.elem, {
                    d: this.last_d
                }, D);
                wa(D);
                M("changed", [this.elem])
            };
            svgedit.path.Path.prototype.addPtsToSelection = function(D) {
                $.isArray(D) || (D = [D]);
                for (var z = 0; z < D.length; z++) {
                    var F = D[z],
                        h = this.segs[F];
                    h.ptgrip && this.selected_pts.indexOf(F) == -1 && F >= 0 && this.selected_pts.push(F)
                }
                this.selected_pts.sort();
                z = this.selected_pts.length;
                for (D = Array(z); z--;) {
                    h = this.segs[this.selected_pts[z]];
                    h.select(true);
                    D[z] = h.ptgrip
                }
                La.canDeleteNodes = true;
                La.closed_subpath = this.subpathIsClosed(this.selected_pts[0]);
                M("selected", D)
            };
            var A = k = null,
                G = false;
            this.lastCtrlPoint = [0, 0];
            return {
                mouseDown: function(D,
                    z, F, h) {
                    if (Ha === "path") {
                        mouse_x = F;
                        mouse_y = h;
                        F = mouse_x / q;
                        z = mouse_y / q;
                        h = pa("path_stretch_line");
                        l = [F, z];
                        if (p.gridSnapping) {
                            F = va(F);
                            z = va(z);
                            mouse_x = va(mouse_x);
                            mouse_y = va(mouse_y)
                        }
                        if (!h) {
                            h = document.createElementNS(b, "path");
                            ma(h, {
                                id: "path_stretch_line",
                                stroke: "#22C",
                                "stroke-width": "0.5",
                                fill: "none"
                            });
                            h = pa("selectorParentGroup").appendChild(h)
                        }
                        h.setAttribute("display", "inline");
                        this.stretchy = h;
                        var m = null;
                        if (A) {
                            m = A.pathSegList;
                            for (var o = m.numberOfItems, u = 6 / q, E = false; o;) {
                                o--;
                                var H = m.getItem(o),
                                    J = H.x;
                                H = H.y;
                                if (F >= J - u && F <= J + u && z >= H - u && z <= H + u) {
                                    E = true;
                                    break
                                }
                            }
                            u = aa();
                            svgedit.path.removePath_(u);
                            u = pa(u);
                            J = m.numberOfItems;
                            if (E) {
                                if (o <= 1 && J >= 2) {
                                    F = m.getItem(0).x;
                                    z = m.getItem(0).y;
                                    o = svgedit.path.first_grip ? svgedit.path.first_grip[0] / q : m.getItem(0).x;
                                    E = svgedit.path.first_grip ? svgedit.path.first_grip[1] / q : m.getItem(0).y;
                                    D = h.pathSegList.getItem(1);
                                    D = D.pathSegType === 4 ? A.createSVGPathSegLinetoAbs(F, z) : A.createSVGPathSegCurvetoCubicAbs(F, z, D.x1 / q, D.y1 / q, o, E);
                                    F = A.createSVGPathSegClosePath();
                                    m.appendItem(D);
                                    m.appendItem(F)
                                } else if (J <
                                    3) return m = false;
                                $(h).remove();
                                element = u;
                                A = null;
                                Ka = false;
                                if (e) {
                                    svgedit.path.path.matrix && Za(u, {}, svgedit.path.path.matrix.inverse());
                                    F = u.getAttribute("d");
                                    h = $(svgedit.path.path.elem).attr("d");
                                    $(svgedit.path.path.elem).attr("d", h + F);
                                    $(u).remove();
                                    svgedit.path.path.matrix && svgedit.path.recalcRotatedPath();
                                    svgedit.path.path.init();
                                    La.toEditMode(svgedit.path.path.elem);
                                    svgedit.path.path.selectPt();
                                    return false
                                }
                            } else {
                                if (!$.contains(a, Bb(D))) {
                                    console.log("Clicked outside canvas");
                                    return false
                                }
                                m = A.pathSegList.numberOfItems;
                                o = A.pathSegList.getItem(m - 1);
                                u = o.x;
                                o = o.y;
                                if (D.shiftKey) {
                                    z = V(u, o, F, z);
                                    F = z.x;
                                    z = z.y
                                }
                                D = h.pathSegList.getItem(1);
                                D = D.pathSegType === 4 ? A.createSVGPathSegLinetoAbs(ab(F), ab(z)) : A.createSVGPathSegCurvetoCubicAbs(ab(F), ab(z), D.x1 / q, D.y1 / q, D.x2 / q, D.y2 / q);
                                A.pathSegList.appendItem(D);
                                F *= q;
                                z *= q;
                                h.setAttribute("d", ["M", F, z, F, z].join(" "));
                                h = svgedit.path.addCtrlGrip("1c1");
                                D = svgedit.path.addCtrlGrip("0c2");
                                u = svgedit.path.getCtrlLine(1);
                                o = svgedit.path.getCtrlLine(2);
                                h.setAttribute("cx", F);
                                h.setAttribute("cy", z);
                                D.setAttribute("cx",
                                    F);
                                D.setAttribute("cy", z);
                                u.setAttribute("x1", F);
                                u.setAttribute("x2", F);
                                u.setAttribute("y1", z);
                                u.setAttribute("y2", z);
                                o.setAttribute("x1", F);
                                o.setAttribute("x2", F);
                                o.setAttribute("y1", z);
                                o.setAttribute("y2", z);
                                h = m;
                                if (e) h += svgedit.path.path.segs.length;
                                svgedit.path.addPointGrip(h, F, z)
                            }
                            m = true
                        } else {
                            d_attr = "M" + F + "," + z + " ";
                            A = S({
                                element: "path",
                                curStyles: true,
                                attr: {
                                    d: d_attr,
                                    id: ka(),
                                    opacity: K.opacity / 2
                                }
                            });
                            h.setAttribute("d", ["M", mouse_x, mouse_y, mouse_x, mouse_y].join(" "));
                            h = e ? svgedit.path.path.segs.length :
                                0;
                            svgedit.path.addPointGrip(h, mouse_x, mouse_y);
                            svgedit.path.first_grip = null
                        }
                    } else if (svgedit.path.path) {
                        svgedit.path.path.storeD();
                        u = D.target.id;
                        if (u.substr(0, 14) == "pathpointgrip_") {
                            z = svgedit.path.path.cur_pt = parseInt(u.substr(14));
                            svgedit.path.path.dragging = [F, h];
                            u = svgedit.path.path.segs[z];
                            if (D.shiftKey) u.selected ? svgedit.path.path.removePtFromSelection(z) : svgedit.path.path.addPtsToSelection(z);
                            else {
                                if (svgedit.path.path.selected_pts.length <= 1 || !u.selected) svgedit.path.path.clearSelection();
                                svgedit.path.path.addPtsToSelection(z)
                            }
                        } else if (u.indexOf("ctrlpointgrip_") ==
                            0) {
                            svgedit.path.path.dragging = [F, h];
                            D = u.split("_")[1].split("c");
                            z = D[0] - 0;
                            m = D = D[1] - 0;
                            o = svgedit.path.path.segs[z];
                            svgedit.path.path.selectPt(z, D);
                            if (m == 2) {
                                E = 1;
                                u = o.next
                            } else {
                                E = 2;
                                u = o.prev
                            }
                            if (!u) return;
                            D = function(O, X) {
                                return Math.sqrt(Math.pow(O.x - X.x, 2) + Math.pow(O.y - X.y, 2))
                            };
                            z = {
                                x: o.item["x" + m],
                                y: o.item["y" + m]
                            };
                            m = m == 2 ? {
                                x: o.item.x,
                                y: o.item.y
                            } : {
                                x: u.item.x,
                                y: u.item.y
                            };
                            o = {
                                x: u.item["x" + E],
                                y: u.item["y" + E]
                            };
                            u = D(z, m);
                            D = D(o, m);
                            z = Math.abs(Math.round(Math.atan2(z.y - m.y, z.x - m.x) * (180 / Math.PI), 0) - Math.round(Math.atan2(o.y -
                                m.y, o.x - m.x) * (180 / Math.PI), 0)) == 180;
                            if (Math.abs(u - D) < 5 && z) {
                                svgedit.path.setLinkControlPoints(true);
                                svgedit.path.is_linked = true
                            } else {
                                svgedit.path.setLinkControlPoints(false);
                                svgedit.path.is_linked = false
                            }
                        }
                        if (!svgedit.path.path.dragging) {
                            if (sa == null) sa = ra.getRubberBandBox();
                            ma(sa, {
                                x: F * q,
                                y: h * q,
                                width: 0,
                                height: 0,
                                display: "inline"
                            }, 100)
                        }
                    }
                },
                mouseMove: function(D, z, F) {
                    G = true;
                    var h = !D.altKey;
                    if (Ha === "path") {
                        if (A) {
                            var m = A.pathSegList,
                                o = m.numberOfItems - 1,
                                u = svgedit.path.addCtrlGrip("1c1"),
                                E = svgedit.path.addCtrlGrip("0c2");
                            if (l) {
                                var H = E.getAttribute("cx") / q || 0,
                                    J = E.getAttribute("cy") / q || 0;
                                u.setAttribute("cx", z);
                                u.setAttribute("cy", F);
                                u.setAttribute("display", "inline");
                                D = l[0];
                                u = l[1];
                                m.getItem(o);
                                var O = z / q,
                                    X = F / q;
                                H = h ? D + (D - O) : H;
                                h = h ? u + (u - X) : J;
                                E.setAttribute("cx", H * q);
                                E.setAttribute("cy", h * q);
                                E.setAttribute("display", "inline");
                                E = svgedit.path.getCtrlLine(1);
                                J = svgedit.path.getCtrlLine(2);
                                ma(E, {
                                    x1: z,
                                    y1: F,
                                    x2: D * q,
                                    y2: u * q,
                                    display: "inline"
                                });
                                ma(J, {
                                    x1: H * q,
                                    y1: h * q,
                                    x2: D * q,
                                    y2: u * q,
                                    display: "inline"
                                });
                                if (o === 0) C = [z, F];
                                else {
                                    m = m.getItem(o -
                                        1);
                                    z = m.x;
                                    F = m.y;
                                    if (m.pathSegType === 6) {
                                        z += z - m.x2;
                                        F += F - m.y2
                                    } else if (C) {
                                        z = C[0] / q;
                                        F = C[1] / q
                                    }
                                    svgedit.path.replacePathSeg(6, o, [D, u, this.lastCtrlPoint[0] / q, this.lastCtrlPoint[1] / q, H, h], A)
                                }
                            } else if (h = this.stretchy) {
                                o = m.getItem(o);
                                m = z;
                                u = F;
                                if (D.target.id === "pathpointgrip_0" && svgedit.path.first_grip) {
                                    m = svgedit.path.first_grip[0];
                                    u = svgedit.path.first_grip[1]
                                }
                                if (o.pathSegType === 6) svgedit.path.replacePathSeg(6, 1, [z, F, (this.lastCtrlPoint[0] / q || o.x + (o.x - o.x2)) * q, (this.lastCtrlPoint[1] / q || o.y + (o.y - o.y2)) * q, m, u], h);
                                else C ? svgedit.path.replacePathSeg(6, 1, [z, F, C[0], C[1], z, F], h) : svgedit.path.replacePathSeg(4, 1, [z, F], h)
                            }
                        }
                    } else if (svgedit.path.path.dragging) {
                        m = svgedit.path.getPointFromGrip({
                            x: svgedit.path.path.dragging[0],
                            y: svgedit.path.path.dragging[1]
                        }, svgedit.path.path);
                        D = svgedit.path.getPointFromGrip({
                            x: z,
                            y: F
                        }, svgedit.path.path);
                        o = D.x - m.x;
                        m = D.y - m.y;
                        svgedit.path.path.dragging = [z, F];
                        !h || !svgedit.path.is_linked ? svgedit.path.setLinkControlPoints(false) : svgedit.path.setLinkControlPoints(true);
                        svgedit.path.path.dragctrl ?
                            svgedit.path.path.moveCtrl(o, m) : svgedit.path.path.movePts(o, m)
                    } else {
                        svgedit.path.path.selected_pts = [];
                        svgedit.path.path.eachSeg(function() {
                            if (this.next || this.prev) {
                                var ba = sa.getBBox(),
                                    T = svgedit.path.getGripPt(this);
                                ba = svgedit.math.rectsIntersect(ba, {
                                    x: T.x,
                                    y: T.y,
                                    width: 0,
                                    height: 0
                                });
                                this.select(ba);
                                ba && svgedit.path.path.selected_pts.push(this.index)
                            }
                        })
                    }
                },
                mouseUp: function(D, z, F, h) {
                    var m = pa("ctrlpointgrip_1c1"),
                        o = pa("ctrlpointgrip_0c2");
                    this.lastCtrlPoint = m ? [m.getAttribute("cx"), m.getAttribute("cy")] : [F, h];
                    if (!svgedit.path.first_grip && o) svgedit.path.first_grip = [o.getAttribute("cx"), o.getAttribute("cy")];
                    if (Ha === "path") {
                        l = null;
                        if (!A) {
                            z = pa(aa());
                            Ka = false;
                            C = null
                        }
                        return {
                            keep: true,
                            element: z
                        }
                    }
                    if (svgedit.path.path.dragging) {
                        z = svgedit.path.path.cur_pt;
                        svgedit.path.path.dragging = false;
                        svgedit.path.path.dragctrl = false;
                        svgedit.path.path.update();
                        G && svgedit.path.path.endChanges("Move path point(s)");
                        !D.shiftKey && !G && svgedit.path.path.selectPt(z)
                    } else if (sa && sa.getAttribute("display") != "none") {
                        sa.setAttribute("display",
                            "none");
                        sa.getAttribute("width") <= 2 && sa.getAttribute("height") <= 2 && La.toSelectMode(D.target)
                    } else La.toSelectMode(D.target);
                    G = false
                },
                toEditMode: function(D) {
                    svgedit.path.path = svgedit.path.getPath_(D);
                    Ha = "pathedit";
                    xa();
                    svgedit.path.path.show(true).update();
                    svgedit.path.path.oldbbox = svgedit.utilities.getBBox(svgedit.path.path.elem);
                    e = false
                },
                toSelectMode: function(D) {
                    var z = D == svgedit.path.path.elem;
                    Ha = "select";
                    svgedit.path.path.show(false);
                    k = false;
                    xa();
                    svgedit.path.path.matrix && svgedit.path.recalcRotatedPath();
                    if (z) {
                        M("selected", [D]);
                        qb([D], true)
                    }
                },
                addSubPath: function(D) {
                    if (D) {
                        Ha = "path";
                        e = true
                    } else {
                        La.clear(true);
                        La.toEditMode(svgedit.path.path.elem)
                    }
                },
                select: function(D) {
                    if (k === D) {
                        La.toEditMode(D);
                        Ha = "pathedit"
                    } else k = D
                },
                reorient: function() {
                    var D = I[0];
                    if (D)
                        if (na(D) != 0) {
                            var z = new Da("Reorient path"),
                                F = {
                                    d: D.getAttribute("d"),
                                    transform: D.getAttribute("transform")
                                };
                            z.addSubCommand(new Ma(D, F));
                            xa();
                            this.resetOrientation(D);
                            wa(z);
                            svgedit.path.getPath_(D).show(false).matrix = null;
                            this.clear();
                            qb([D], true);
                            M("changed",
                                I)
                        }
                },
                clear: function(D) {
                    k = null;
                    if (A) {
                        var z = pa(aa());
                        $(pa("path_stretch_line")).remove();
                        D && $(z).remove();
                        $(pa("pathpointgrip_container")).find("*").attr("display", "none");
                        A = C = null;
                        Ka = false
                    } else Ha == "pathedit" && this.toSelectMode();
                    svgedit.path.path && svgedit.path.path.init().show(false)
                },
                resetOrientation: function(D) {
                    if (D == null || D.nodeName != "path") return false;
                    var z = R(D),
                        F = Y(z).matrix;
                    z.clear();
                    D.removeAttribute("transform");
                    z = D.pathSegList;
                    for (var h = z.numberOfItems, m = 0; m < h; ++m) {
                        var o = z.getItem(m),
                            u =
                            o.pathSegType;
                        if (u != 1) {
                            var E = [];
                            $.each(["", 1, 2], function(H, J) {
                                var O = o["x" + J],
                                    X = o["y" + J];
                                if (O !== undefined && X !== undefined) {
                                    O = N(O, X, F);
                                    E.splice(E.length, 0, O.x, O.y)
                                }
                            });
                            svgedit.path.replacePathSeg(u, m, E, D)
                        }
                    }
                    g(D, F)
                },
                zoomChange: function() {
                    Ha == "pathedit" && svgedit.path.path.update()
                },
                getNodePoint: function() {
                    if (svgedit.path.path) {
                        var D = svgedit.path.path.segs[svgedit.path.path.selected_pts.length ? svgedit.path.path.selected_pts[0] : 1];
                        return {
                            x: D.item.x,
                            y: D.item.y,
                            type: D.type
                        }
                    }
                },
                linkControlPoints: function(D) {
                    svgedit.path.setLinkControlPoints(D)
                },
                clonePathNode: function() {
                    svgedit.path.path.storeD();
                    for (var D = svgedit.path.path.selected_pts, z = D.length, F = []; z--;) {
                        var h = D[z];
                        svgedit.path.path.addSeg(h);
                        F.push(h + z);
                        F.push(h + z + 1)
                    }
                    svgedit.path.path.init().addPtsToSelection(F);
                    svgedit.path.path.endChanges("Clone path node(s)")
                },
                opencloseSubPath: function() {
                    var D = svgedit.path.path.selected_pts;
                    if (D.length === 1) {
                        var z = svgedit.path.path.elem,
                            F = z.pathSegList,
                            h = D[0],
                            m = null,
                            o = null;
                        svgedit.path.path.eachSeg(function(J) {
                            if (this.type === 2 && J <= h) o = this.item;
                            if (J <=
                                h) return true;
                            if (this.type === 2) {
                                m = J;
                                return false
                            } else if (this.type === 1) return m = false
                        });
                        if (m == null) m = svgedit.path.path.segs.length - 1;
                        if (m !== false) {
                            var u = z.createSVGPathSegLinetoAbs(o.x, o.y),
                                E = z.createSVGPathSegClosePath();
                            if (m == svgedit.path.path.segs.length) {
                                F.appendItem(u);
                                F.appendItem(E)
                            } else {
                                svgedit.path.insertItemBefore(z, E, m);
                                svgedit.path.insertItemBefore(z, u, m)
                            }
                            svgedit.path.path.init().selectPt(m + 1)
                        } else if (svgedit.path.path.segs[h].mate) {
                            F.removeItem(h);
                            F.removeItem(h);
                            svgedit.path.path.init().selectPt(h -
                                1)
                        } else {
                            for (D = 0; D < F.numberOfItems; D++) {
                                var H = F.getItem(D);
                                if (H.pathSegType === 2) u = D;
                                else if (D === h) F.removeItem(u);
                                else if (H.pathSegType === 1 && h < D) {
                                    E = D - 1;
                                    F.removeItem(D);
                                    break
                                }
                            }
                            for (D = h - u - 1; D--;) svgedit.path.insertItemBefore(z, F.getItem(u), E);
                            z = F.getItem(u);
                            svgedit.path.replacePathSeg(2, u, [z.x, z.y]);
                            D = h;
                            svgedit.path.path.init().selectPt(0)
                        }
                    }
                },
                deletePathNode: function() {
                    if (La.canDeleteNodes) {
                        svgedit.path.path.storeD();
                        for (var D = svgedit.path.path.selected_pts, z = D.length; z--;) svgedit.path.path.deleteSeg(D[z]);
                        var F = function() {
                            var h = svgedit.path.path.elem.pathSegList,
                                m = h.numberOfItems,
                                o = function(H, J) {
                                    for (; J--;) h.removeItem(H)
                                };
                            if (m <= 1) return true;
                            for (; m--;) {
                                var u = h.getItem(m);
                                if (u.pathSegType === 1) {
                                    u = h.getItem(m - 1);
                                    var E = h.getItem(m - 2);
                                    if (u.pathSegType === 2) {
                                        o(m - 1, 2);
                                        F();
                                        break
                                    } else if (E.pathSegType === 2) {
                                        o(m - 2, 3);
                                        F();
                                        break
                                    }
                                } else if (u.pathSegType === 2)
                                    if (m > 0) {
                                        u = h.getItem(m - 1).pathSegType;
                                        if (u === 2) {
                                            o(m - 1, 1);
                                            F();
                                            break
                                        } else if (u === 1 && h.numberOfItems - 1 === m) {
                                            o(m, 1);
                                            F();
                                            break
                                        }
                                    }
                            }
                            return false
                        };
                        F();
                        if (svgedit.path.path.elem.pathSegList.numberOfItems <=
                            1) {
                            c.setMode("select");
                            c.deleteSelectedElements()
                        } else {
                            svgedit.path.path.init();
                            svgedit.path.path.clearSelection();
                            if (window.opera) {
                                D = $(svgedit.path.path.elem);
                                D.attr("d", D.attr("d"))
                            }
                            svgedit.path.path.endChanges("Delete path node(s)")
                        }
                    }
                },
                smoothPolylineIntoPath: function(D) {
                    var z = D.points,
                        F = z.numberOfItems;
                    if (F >= 4) {
                        var h = z.getItem(0),
                            m = null;
                        D = [];
                        D.push(["M", h.x, ",", h.y, " C"].join(""));
                        for (var o = 1; o <= F - 4; o += 3) {
                            var u = z.getItem(o),
                                E = z.getItem(o + 1),
                                H = z.getItem(o + 2);
                            if (m)
                                if ((h = svgedit.path.smoothControlPoints(m,
                                        u, h)) && h.length == 2) {
                                    u = D[D.length - 1].split(",");
                                    u[2] = h[0].x;
                                    u[3] = h[0].y;
                                    D[D.length - 1] = u.join(",");
                                    u = h[1]
                                }
                            D.push([u.x, u.y, E.x, E.y, H.x, H.y].join(","));
                            h = H;
                            m = E
                        }
                        for (D.push("L"); o < F; ++o) {
                            E = z.getItem(o);
                            D.push([E.x, E.y].join(","))
                        }
                        D = D.join(" ");
                        D = S({
                            element: "path",
                            curStyles: true,
                            attr: {
                                id: aa(),
                                d: D,
                                fill: "none"
                            }
                        })
                    }
                    return D
                },
                setSegType: function(D) {
                    svgedit.path.path.setSegType(D)
                },
                moveNode: function(D, z) {
                    var F = svgedit.path.path.selected_pts;
                    if (F.length) {
                        svgedit.path.path.storeD();
                        F = svgedit.path.path.segs[F[0]];
                        var h = {
                            x: 0,
                            y: 0
                        };
                        h[D] = z - F.item[D];
                        F.move(h.x, h.y);
                        svgedit.path.path.endChanges("Move path point")
                    }
                },
                fixEnd: function(D) {
                    for (var z = D.pathSegList, F = z.numberOfItems, h, m = 0; m < F; ++m) {
                        var o = z.getItem(m);
                        if (o.pathSegType === 2) h = o;
                        if (o.pathSegType === 1) {
                            o = z.getItem(m - 1);
                            if (o.x != h.x || o.y != h.y) {
                                z = D.createSVGPathSegLinetoAbs(h.x, h.y);
                                svgedit.path.insertItemBefore(D, z, m);
                                La.fixEnd(D);
                                break
                            }
                        }
                    }
                    svgedit.browser.isWebkit() && D.setAttribute("d", La.convertPath(D))
                },
                convertPath: function(D, z) {
                    for (var F = D.pathSegList, h = F.numberOfItems,
                            m = 0, o = 0, u = "", E = null, H = 0; H < h; ++H) {
                        var J = F.getItem(H),
                            O = J.x || 0,
                            X = J.y || 0,
                            ba = J.x1 || 0,
                            T = J.y1 || 0,
                            fa = J.x2 || 0,
                            ha = J.y2 || 0,
                            W = J.pathSegType,
                            qa = Oa[W]["to" + (z ? "Lower" : "Upper") + "Case"](),
                            ua = function(Aa, Ca, Pa) {
                                Ca = Ca ? " " + Ca.join(" ") : "";
                                Pa = Pa ? " " + svgedit.units.shortFloat(Pa) : "";
                                $.each(Aa, function(Qa, Na) {
                                    Aa[Qa] = svgedit.units.shortFloat(Na)
                                });
                                u += qa + Aa.join(" ") + Ca + Pa
                            };
                        switch (W) {
                            case 1:
                                u += "z";
                                break;
                            case 12:
                                O -= m;
                            case 13:
                                if (z) {
                                    m += O;
                                    qa = "l"
                                } else {
                                    O += m;
                                    m = O;
                                    qa = "L"
                                }
                                ua([
                                    [O, o]
                                ]);
                                break;
                            case 14:
                                X -= o;
                            case 15:
                                if (z) {
                                    o += X;
                                    qa = "l"
                                } else {
                                    X +=
                                        o;
                                    o = X;
                                    qa = "L"
                                }
                                ua([
                                    [m, X]
                                ]);
                                break;
                            case 2:
                            case 4:
                            case 18:
                                O -= m;
                                X -= o;
                            case 5:
                            case 3:
                                if (E && F.getItem(H - 1).pathSegType === 1 && !z) {
                                    m = E[0];
                                    o = E[1]
                                }
                            case 19:
                                if (z) {
                                    m += O;
                                    o += X
                                } else {
                                    O += m;
                                    X += o;
                                    m = O;
                                    o = X
                                }
                                if (W === 3) E = [m, o];
                                ua([
                                    [O, X]
                                ]);
                                break;
                            case 6:
                                O -= m;
                                ba -= m;
                                fa -= m;
                                X -= o;
                                T -= o;
                                ha -= o;
                            case 7:
                                if (z) {
                                    m += O;
                                    o += X
                                } else {
                                    O += m;
                                    ba += m;
                                    fa += m;
                                    X += o;
                                    T += o;
                                    ha += o;
                                    m = O;
                                    o = X
                                }
                                ua([
                                    [ba, T],
                                    [fa, ha],
                                    [O, X]
                                ]);
                                break;
                            case 8:
                                O -= m;
                                ba -= m;
                                X -= o;
                                T -= o;
                            case 9:
                                if (z) {
                                    m += O;
                                    o += X
                                } else {
                                    O += m;
                                    ba += m;
                                    X += o;
                                    T += o;
                                    m = O;
                                    o = X
                                }
                                ua([
                                    [ba, T],
                                    [O, X]
                                ]);
                                break;
                            case 10:
                                O -= m;
                                X -= o;
                            case 11:
                                if (z) {
                                    m +=
                                        O;
                                    o += X
                                } else {
                                    O += m;
                                    X += o;
                                    m = O;
                                    o = X
                                }
                                ua([
                                    [J.r1, J.r2]
                                ], [J.angle, J.largeArcFlag ? 1 : 0, J.sweepFlag ? 1 : 0], [O, X]);
                                break;
                            case 16:
                                O -= m;
                                fa -= m;
                                X -= o;
                                ha -= o;
                            case 17:
                                if (z) {
                                    m += O;
                                    o += X
                                } else {
                                    O += m;
                                    fa += m;
                                    X += o;
                                    ha += o;
                                    m = O;
                                    o = X
                                }
                                ua([
                                    [fa, ha],
                                    [O, X]
                                ])
                        }
                    }
                    return u
                }
            }
        }(),
        yb = this.removeUnusedDefElems = function() {
            var e = n.getElementsByTagNameNS(b, "defs");
            if (!e || !e.length) return 0;
            for (var k = [], l = 0, C = ["fill", "stroke", "filter", "marker-start", "marker-mid", "marker-end"], A = C.length, G = n.getElementsByTagNameNS(b, "*"), D = G.length, z = 0; z < D; z++) {
                for (var F =
                        G[z], h = 0; h < A; h++)
                    if (F) {
                        var m = ja(F.getAttribute(C[h]));
                        m && k.push(m.substr(1))
                    }(F = ca(F)) && F.indexOf("#") === 0 && k.push(F.substr(1))
            }
            e = $(e).find("linearGradient, radialGradient, filter, marker, svg, symbol");
            defelem_ids = [];
            for (z = e.length; z--;) {
                C = e[z];
                A = C.id;
                if (k.indexOf(A) < 0) {
                    sb[A] = C;
                    C.parentNode.removeChild(C);
                    l++
                }
            }
            return l
        };
    this.svgCanvasToString = function() {
        for (; yb() > 0;);
        La.clear(true);
        $.each(n.childNodes, function(l, C) {
            l && C.nodeType === 8 && C.data.indexOf("Created with") >= 0 && n.insertBefore(C, n.firstChild)
        });
        if (L) {
            Eb();
            rb([L])
        }
        $("#canvasGrid").attr("display", "none");
        var e = [];
        $(n).find("g:data(gsvg)").each(function() {
            for (var l = this.attributes, C = l.length, A = 0; A < C; A++)
                if (l[A].nodeName == "id" || l[A].nodeName == "style") C--;
            if (C <= 0) {
                l = this.firstChild;
                e.push(l);
                $(this).replaceWith(l)
            }
        });
        var k = this.svgToString(n, 0);
        e.length && $(e).each(function() {
            tb(this)
        });
        return k
    };
    this.svgToString = function(e, k) {
        var l = [],
            C = svgedit.utilities.toXml,
            A = p.baseUnit,
            G = RegExp("^-?[\\d\\.]+" + A + "$");
        if (e) {
            la(e);
            var D = e.attributes,
                z, F, h = e.childNodes;
            for (F = 0; F < k; F++) l.push(" ");
            l.push("<");
            l.push(e.nodeName);
            if (e.id === "svgcontent") {
                F = zb();
                if (A !== "px") {
                    F.w = svgedit.units.convertUnit(F.w, A) + A;
                    F.h = svgedit.units.convertUnit(F.h, A) + A
                }
                l.push(' width="' + F.w + '" height="' + F.h + '" xmlns="' + b + '"');
                var m = {};
                $(e).find("*").andSelf().each(function() {
                    $.each(this.attributes, function(H, J) {
                        var O = J.namespaceURI;
                        if (O && !m[O] && ya[O] !== "xmlns" && ya[O] !== "xml") {
                            m[O] = true;
                            l.push(" xmlns:" + ya[O] + '="' + O + '"')
                        }
                    })
                });
                F = D.length;
                for (A = ["width", "height", "xmlns", "x", "y", "viewBox",
                        "id", "overflow"
                    ]; F--;) {
                    z = D.item(F);
                    var o = C(z.nodeValue);
                    if (z.nodeName.indexOf("xmlns:") !== 0)
                        if (o != "" && A.indexOf(z.localName) == -1)
                            if (!z.namespaceURI || ya[z.namespaceURI]) {
                                l.push(" ");
                                l.push(z.nodeName);
                                l.push('="');
                                l.push(o);
                                l.push('"')
                            }
                }
            } else {
                if (e.nodeName === "defs" && !e.firstChild) return;
                var u = ["-moz-math-font-style", "_moz-math-font-style"];
                for (F = D.length - 1; F >= 0; F--) {
                    z = D.item(F);
                    o = C(z.nodeValue);
                    if (!(u.indexOf(z.localName) >= 0))
                        if (o != "")
                            if (o.indexOf("pointer-events") !== 0)
                                if (!(z.localName === "class" &&
                                        o.indexOf("se_") === 0)) {
                                    l.push(" ");
                                    if (z.localName === "d") o = La.convertPath(e, true);
                                    if (isNaN(o)) {
                                        if (G.test(o)) o = svgedit.units.shortFloat(o) + A
                                    } else o = svgedit.units.shortFloat(o);
                                    if ($a.apply && e.nodeName === "image" && z.localName === "href" && $a.images && $a.images === "embed") {
                                        var E = Va[o];
                                        if (E) o = E
                                    }
                                    if (!z.namespaceURI || z.namespaceURI == b || ya[z.namespaceURI]) {
                                        l.push(z.nodeName);
                                        l.push('="');
                                        l.push(o);
                                        l.push('"')
                                    }
                                }
                }
            }
            if (e.hasChildNodes()) {
                l.push(">");
                k++;
                D = false;
                for (F = 0; F < h.length; F++) {
                    A = h.item(F);
                    switch (A.nodeType) {
                        case 1:
                            l.push("\n");
                            l.push(this.svgToString(h.item(F), k));
                            break;
                        case 3:
                            A = A.nodeValue.replace(/^\s+|\s+$/g, "");
                            if (A != "") {
                                D = true;
                                l.push(C(A) + "")
                            }
                            break;
                        case 4:
                            l.push("\n");
                            l.push(Array(k + 1).join(" "));
                            l.push("<![CDATA[");
                            l.push(A.nodeValue);
                            l.push("]]\>");
                            break;
                        case 8:
                            l.push("\n");
                            l.push(Array(k + 1).join(" "));
                            l.push("<!--");
                            l.push(A.data);
                            l.push("--\>")
                    }
                }
                k--;
                if (!D) {
                    l.push("\n");
                    for (F = 0; F < k; F++) l.push(" ")
                }
                l.push("</");
                l.push(e.nodeName);
                l.push(">")
            } else l.push("/>")
        }
        return l.join("")
    };
    this.embedImage = function(e, k) {
        $(new Image).load(function() {
            var l =
                document.createElement("canvas");
            l.width = this.width;
            l.height = this.height;
            l.getContext("2d").drawImage(this, 0, 0);
            try {
                var C = ";svgedit_url=" + encodeURIComponent(e);
                C = l.toDataURL().replace(";base64", C + ";base64");
                Va[e] = C
            } catch (A) {
                Va[e] = false
            }
            Ga = e;
            k && k(Va[e])
        }).attr("src", e)
    };
    this.setGoodImage = function(e) {
        Ga = e
    };
    this.open = function() {};
    this.save = function(e) {
        xa();
        e && $.extend($a, e);
        $a.apply = true;
        e = this.svgCanvasToString();
        M("saved", e)
    };
    this.rasterExport = function() {
        xa();
        var e = [],
            k = {
                feGaussianBlur: kb.exportNoBlur,
                foreignObject: kb.exportNoforeignObject,
                "[stroke-dasharray]": kb.exportNoDashArray
            },
            l = $(n);
        if (!("font" in $("<canvas>")[0].getContext("2d"))) k.text = kb.exportNoText;
        $.each(k, function(C, A) {
            l.find(C).length && e.push(A)
        });
        k = this.svgCanvasToString();
        M("exported", {
            svg: k,
            issues: e
        })
    };
    this.getSvgString = function() {
        $a.apply = false;
        return this.svgCanvasToString()
    };
    this.randomizeIds = function() {
        arguments.length > 0 && arguments[0] == false ? svgedit.draw.randomizeIds(false, B()) : svgedit.draw.randomizeIds(true, B())
    };
    var Hb = this.uniquifyElems =
        function(e) {
            var k = {},
                l = ["filter", "linearGradient", "pattern", "radialGradient", "symbol", "textPath", "use"];
            svgedit.utilities.walkTree(e, function(z) {
                if (z.nodeType == 1) {
                    if (z.id) {
                        z.id in k || (k[z.id] = {
                            elem: null,
                            attrs: [],
                            hrefs: []
                        });
                        k[z.id].elem = z
                    }
                    $.each(vb, function(h, m) {
                        var o = z.getAttributeNode(m);
                        if (o) {
                            var u = svgedit.utilities.getUrlFromAttr(o.value);
                            if (u = u ? u.substr(1) : null) {
                                u in k || (k[u] = {
                                    elem: null,
                                    attrs: [],
                                    hrefs: []
                                });
                                k[u].attrs.push(o)
                            }
                        }
                    });
                    var F = svgedit.utilities.getHref(z);
                    if (F && l.indexOf(z.nodeName) >=
                        0)
                        if (F = F.substr(1)) {
                            F in k || (k[F] = {
                                elem: null,
                                attrs: [],
                                hrefs: []
                            });
                            k[F].hrefs.push(z)
                        }
                }
            });
            for (var C in k)
                if (C) {
                    var A = k[C].elem;
                    if (A) {
                        e = ka();
                        A.id = e;
                        A = k[C].attrs;
                        for (var G = A.length; G--;) {
                            var D = A[G];
                            D.ownerElement.setAttribute(D.name, "url(#" + e + ")")
                        }
                        A = k[C].hrefs;
                        for (G = A.length; G--;) svgedit.utilities.setHref(A[G], "#" + e)
                    }
                }
        },
        Gb = this.setUseData = function(e) {
            var k = $(e);
            if (e.tagName !== "use") k = k.find("use");
            k.each(function() {
                var l = ca(this).substr(1);
                if (l = pa(l)) {
                    $(this).data("ref", l);
                    if (l.tagName == "symbol" || l.tagName ==
                        "svg") $(this).data("symbol", l).data("ref", l)
                }
            })
        },
        Ib = this.convertGradients = function(e) {
            var k = $(e).find("linearGradient, radialGradient");
            if (!k.length && svgedit.browser.isWebkit()) k = $(e).find("*").filter(function() {
                return this.tagName.indexOf("Gradient") >= 0
            });
            k.each(function() {
                if ($(this).attr("gradientUnits") === "userSpaceOnUse") {
                    var l = $(n).find('[fill="url(#' + this.id + ')"],[stroke="url(#' + this.id + ')"]');
                    if (l.length)
                        if (l = svgedit.utilities.getBBox(l[0]))
                            if (this.tagName === "linearGradient") {
                                var C = $(this).attr(["x1",
                                        "y1", "x2", "y2"
                                    ]),
                                    A = this.gradientTransform.baseVal;
                                if (A && A.numberOfItems > 0) {
                                    var G = Y(A).matrix;
                                    A = N(C.x1, C.y1, G);
                                    G = N(C.x2, C.y2, G);
                                    C.x1 = A.x;
                                    C.y1 = A.y;
                                    C.x2 = G.x;
                                    C.y2 = G.y;
                                    this.removeAttribute("gradientTransform")
                                }
                                $(this).attr({
                                    x1: (C.x1 - l.x) / l.width,
                                    y1: (C.y1 - l.y) / l.height,
                                    x2: (C.x2 - l.x) / l.width,
                                    y2: (C.y2 - l.y) / l.height
                                });
                                this.removeAttribute("gradientUnits")
                            }
                }
            })
        },
        Lb = this.convertToGroup = function(e) {
            e || (e = I[0]);
            var k = $(e),
                l = new Da,
                C;
            if (k.data("gsvg")) {
                l = $(e.firstChild).attr(["x", "y"]);
                $(e.firstChild.firstChild).unwrap();
                $(e).removeData("gsvg");
                C = R(e);
                var A = d.createSVGTransform();
                A.setTranslate(l.x, l.y);
                C.appendItem(A);
                Ra(e);
                M("selected", [e])
            } else if (k.data("symbol")) {
                e = k.data("symbol");
                C = k.attr("transform");
                A = k.attr(["x", "y"]);
                var G = e.getAttribute("viewBox");
                if (G) {
                    G = G.split(" ");
                    A.x -= +G[0];
                    A.y -= +G[1]
                }
                C += " translate(" + (A.x || 0) + "," + (A.y || 0) + ")";
                A = k.prev();
                l.addSubCommand(new Fa(k[0], k[0].nextSibling, k[0].parentNode));
                k.remove();
                G = $(n).find("use:data(symbol)").length;
                k = f.createElementNS(b, "g");
                for (var D = e.childNodes,
                        z = 0; z < D.length; z++) k.appendChild(D[z].cloneNode(true));
                if (svgedit.browser.isGecko()) {
                    D = $(gb()).children("linearGradient,radialGradient,pattern").clone();
                    $(k).append(D)
                }
                C && k.setAttribute("transform", C);
                C = e.parentNode;
                Hb(k);
                svgedit.browser.isGecko() && $(gb()).append($(k).find("linearGradient,radialGradient,pattern"));
                k.id = ka();
                A.after(k);
                if (C) {
                    if (!G) {
                        A = e.nextSibling;
                        C.removeChild(e);
                        l.addSubCommand(new Fa(e, A, C))
                    }
                    l.addSubCommand(new Ia(k))
                }
                Gb(k);
                svgedit.browser.isGecko() ? Ib(gb()) : Ib(k);
                svgedit.utilities.walkTreePost(k,
                    function(F) {
                        try {
                            Ra(F)
                        } catch (h) {
                            console.log(h)
                        }
                    });
                $(k).find("a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use").each(function() {
                    if (!this.id) this.id = ka()
                });
                rb([k]);
                (e = Db(k, true)) && l.addSubCommand(e);
                wa(l)
            } else console.log("Unexpected element to ungroup:", e)
        };
    this.setSvgString = function(e) {
        try {
            var k = svgedit.utilities.text2xml(e);
            this.prepareSvg(k);
            var l = new Da("Change Source"),
                C = n.nextSibling,
                A = d.removeChild(n);
            l.addSubCommand(new Fa(A, C, d));
            n = f.adoptNode ? f.adoptNode(k.documentElement) :
                f.importNode(k.documentElement, true);
            d.appendChild(n);
            var G = $(n);
            c.current_drawing_ = new svgedit.draw.Drawing(n, v);
            var D = B().getNonce();
            D ? M("setnonce", D) : M("unsetnonce");
            G.find("image").each(function() {
                var J = this;
                Fb(J);
                var O = ca(this);
                if (O.indexOf("data:") === 0) {
                    var X = O.match(/svgedit_url=(.*?);/);
                    if (X) {
                        var ba = decodeURIComponent(X[1]);
                        $(new Image).load(function() {
                            J.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", ba)
                        }).attr("src", ba)
                    }
                }
                c.embedImage(O)
            });
            G.find("svg").each(function() {
                if (!$(this).closest("defs").length) {
                    Hb(this);
                    var J = this.parentNode;
                    if (J.childNodes.length === 1 && J.nodeName === "g") {
                        $(J).data("gsvg", this);
                        J.id = J.id || ka()
                    } else tb(this)
                }
            });
            G.find("linearGradient, radialGradient, pattern").appendTo(gb());
            Gb(G);
            Ib(G[0]);
            svgedit.utilities.walkTreePost(n, function(J) {
                try {
                    Ra(J)
                } catch (O) {
                    console.log(O)
                }
            });
            var z = {
                    id: "svgcontent",
                    overflow: p.show_outside_canvas ? "visible" : "hidden"
                },
                F = false;
            if (G.attr("viewBox")) {
                var h = G.attr("viewBox").split(" ");
                z.width = h[2];
                z.height = h[3]
            } else $.each(["width", "height"], function(J, O) {
                var X =
                    G.attr(O);
                X || (X = "100%");
                if ((X + "").substr(-1) === "%") F = true;
                else z[O] = Ba(O, X)
            });
            xb();
            G.children().find("a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use").each(function() {
                if (!this.id) this.id = ka()
            });
            if (F) {
                var m = getStrokedBBox();
                z.width = m.width + m.x;
                z.height = m.height + m.y
            }
            if (z.width <= 0) z.width = 200;
            if (z.height <= 0) z.height = 200;
            G.attr(z);
            this.contentW = z.width;
            this.contentH = z.height;
            $("#canvas_width").val(this.contentW);
            $("#canvas_height").val(this.contentH);
            var o = $("#canvas_background");
            if (o.length) {
                var u = o.attr("fill-opacity");
                u = u ? parseInt(u) * 100 : 100;
                fill = this.getPaint(o.attr("fill"), u, "canvas")
            } else fill = this.getPaint("none", 100, "canvas");
            methodDraw.paintBox.canvas.setPaint(fill);
            l.addSubCommand(new Ia(n));
            var E = G.attr(["width", "height"]);
            l.addSubCommand(new Ma(d, E));
            q = 1;
            svgedit.transformlist.resetListMap();
            xa();
            svgedit.path.clearData();
            d.appendChild(ra.selectorParentGroup);
            wa(l);
            M("changed", [n])
        } catch (H) {
            console.log(H);
            return false
        }
        return true
    };
    this.getPaint = function(e, k, l) {
        var C =
            null;
        if (e.indexOf("url(#") === 0) {
            e = (e = svgCanvas.getRefElem(e)) ? e.cloneNode(true) : $("#" + l + "_color defs *")[0];
            C = {
                alpha: k
            };
            C[e.tagName] = e
        } else C = e.indexOf("#") === 0 ? {
            alpha: k,
            solidColor: e.substr(1)
        } : {
            alpha: k,
            solidColor: "none"
        };
        return new $.jGraduate.Paint(C)
    };
    this.importSvgString = function(e) {
        try {
            var k = svgedit.utilities.encode64(e.length + e).substr(0, 32),
                l = false;
            if (lb[k])
                if ($(lb[k].symbol).parents("#svgroot").length) l = true;
            var C = new Da("Import SVG");
            if (l) var A = lb[k].symbol,
                G = lb[k].xform;
            else {
                var D = svgedit.utilities.text2xml(e);
                this.prepareSvg(D);
                var z;
                z = f.adoptNode ? f.adoptNode(D.documentElement) : f.importNode(D.documentElement, true);
                Hb(z);
                var F = Ba("width", z.getAttribute("width")),
                    h = Ba("height", z.getAttribute("height")),
                    m = z.getAttribute("viewBox"),
                    o = m ? m.split(" ") : [0, 0, F, h];
                for (e = 0; e < 4; ++e) o[e] = +o[e];
                n.getAttribute("width");
                var u = +n.getAttribute("height");
                G = h > F ? "scale(" + u / 3 / o[3] + ")" : "scale(" + u / 3 / o[2] + ")";
                G = "translate(0) " + G + " translate(0)";
                A = f.createElementNS(b, "symbol");
                var E = gb();
                for (svgedit.browser.isGecko() && $(z).find("linearGradient, radialGradient, pattern").appendTo(E); z.firstChild;) A.appendChild(z.firstChild);
                var H = z.attributes;
                for (z = 0; z < H.length; z++) {
                    var J = H[z];
                    A.setAttribute(J.nodeName, J.nodeValue)
                }
                A.id = ka();
                lb[k] = {
                    symbol: A,
                    xform: G
                };
                gb().appendChild(A);
                C.addSubCommand(new Ia(A))
            }
            var O = f.createElementNS(b, "use");
            O.id = ka();
            U(O, "#" + A.id);
            (L || B().getCurrentLayer()).appendChild(O);
            C.addSubCommand(new Ia(O));
            xa();
            O.setAttribute("transform", G);
            Ra(O);
            $(O).data("symbol", A).data("ref", A);
            qb([O]);
            wa(C);
            M("changed", [n])
        } catch (X) {
            console.log(X);
            return false
        }
        return true
    };
    var xb = c.identifyLayers = function() {
        Eb();
        B().identifyLayers()
    };
    this.createLayer = function(e) {
        var k = new Da("Create Layer");
        e = B().createLayer(e);
        k.addSubCommand(new Ia(e));
        wa(k);
        xa();
        M("changed", [e])
    };
    this.cloneLayer = function(e) {
        var k = new Da("Duplicate Layer"),
            l = f.createElementNS(b, "g"),
            C = f.createElementNS(b, "title");
        C.textContent = e;
        l.appendChild(C);
        C = B().getCurrentLayer();
        $(C).after(l);
        C = C.childNodes;
        for (var A = 0; A < C.length; A++) {
            var G = C[A];
            G.localName != "title" && l.appendChild(ia(G))
        }
        xa();
        xb();
        k.addSubCommand(new Ia(l));
        wa(k);
        c.setCurrentLayer(e);
        M("changed", [l])
    };
    this.deleteCurrentLayer = function() {
        var e = B().getCurrentLayer(),
            k = e.nextSibling,
            l = e.parentNode;
        if (e = B().deleteCurrentLayer()) {
            var C = new Da("Delete Layer");
            C.addSubCommand(new Fa(e, k, l));
            wa(C);
            xa();
            M("changed", [l]);
            return true
        }
        return false
    };
    this.setCurrentLayer = function(e) {
        (e = B().setCurrentLayer(svgedit.utilities.toXml(e))) && xa();
        return e
    };
    this.renameCurrentLayer = function(e) {
        var k = B();
        if (k.current_layer) {
            var l = k.current_layer;
            if (!c.setCurrentLayer(e)) {
                for (var C = new Da("Rename Layer"), A = 0; A < k.getNumLayers(); ++A)
                    if (k.all_layers[A][1] ==
                        l) break;
                var G = k.getLayerName(A);
                k.all_layers[A][0] = svgedit.utilities.toXml(e);
                var D = l.childNodes.length;
                for (A = 0; A < D; ++A) {
                    var z = l.childNodes.item(A);
                    if (z && z.tagName == "title") {
                        for (; z.firstChild;) z.removeChild(z.firstChild);
                        z.textContent = e;
                        C.addSubCommand(new Ma(z, {
                            "#text": G
                        }));
                        wa(C);
                        M("changed", [l]);
                        return true
                    }
                }
            }
            k.current_layer = l
        }
        return false
    };
    this.setCurrentLayerPosition = function(e) {
        var k = B();
        if (k.current_layer && e >= 0 && e < k.getNumLayers()) {
            for (var l = 0; l < k.getNumLayers(); ++l)
                if (k.all_layers[l][1] == k.current_layer) break;
            if (l == k.getNumLayers()) return false;
            if (l != e) {
                var C = null,
                    A = k.current_layer.nextSibling;
                if (e > l) {
                    if (e < k.getNumLayers() - 1) C = k.all_layers[e + 1][1]
                } else C = k.all_layers[e][1];
                n.insertBefore(k.current_layer, C);
                wa(new Ja(k.current_layer, A, n));
                xb();
                c.setCurrentLayer(k.getLayerName(e));
                return true
            }
        }
        return false
    };
    this.setLayerVisibility = function(e, k) {
        var l = B(),
            C = l.getLayerVisibility(e),
            A = l.setLayerVisibility(e, k);
        if (A) wa(new Ma(A, {
            display: C ? "inline" : "none"
        }, "Layer Visibility"));
        else return false;
        if (A == l.getCurrentLayer()) {
            xa();
            La.clear()
        }
        return true
    };
    this.moveSelectedToLayer = function(e) {
        for (var k = null, l = B(), C = 0; C < l.getNumLayers(); ++C)
            if (l.getLayerName(C) == e) {
                k = l.all_layers[C][1];
                break
            }
        if (!k) return false;
        e = new Da("Move Elements to Layer");
        l = I;
        for (C = l.length; C--;) {
            var A = l[C];
            if (A) {
                var G = A.nextSibling,
                    D = A.parentNode;
                k.appendChild(A);
                e.addSubCommand(new Ja(A, G, D))
            }
        }
        wa(e);
        return true
    };
    this.mergeLayer = function(e) {
        var k = new Da("Merge Layer"),
            l = B(),
            C = $(l.current_layer).prev()[0];
        if (C) {
            for (k.addSubCommand(new Fa(l.current_layer,
                    l.current_layer.nextSibling, n)); l.current_layer.firstChild;) {
                var A = l.current_layer.firstChild;
                if (A.localName == "title") {
                    k.addSubCommand(new Fa(A, A.nextSibling, l.current_layer));
                    l.current_layer.removeChild(A)
                } else {
                    var G = A.nextSibling;
                    C.appendChild(A);
                    k.addSubCommand(new Ja(A, G, l.current_layer))
                }
            }
            n.removeChild(l.current_layer);
            if (!e) {
                xa();
                xb();
                M("changed", [n]);
                wa(k)
            }
            l.current_layer = C;
            return k
        }
    };
    this.mergeAllLayers = function() {
        var e = new Da("Merge all Layers"),
            k = B();
        for (k.current_layer = k.all_layers[k.getNumLayers() -
                1][1]; $(n).children("g").length > 1;) e.addSubCommand(c.mergeLayer(true));
        xa();
        xb();
        M("changed", [n]);
        wa(e)
    };
    var Eb = this.leaveContext = function() {
            var e = ta.length;
            if (e) {
                for (var k = 0; k < e; k++) {
                    var l = ta[k],
                        C = cb(l, "orig_opac");
                    C !== 1 ? l.setAttribute("opacity", C) : l.removeAttribute("opacity");
                    l.setAttribute("style", "pointer-events: inherit")
                }
                ta = [];
                xa(true);
                M("contextset", null)
            }
            L = null
        },
        Kb = this.setContext = function(e) {
            Eb();
            if (typeof e === "string") e = pa(e);
            L = e;
            $(e).parentsUntil("#svgcontent").andSelf().siblings().each(function() {
                var k =
                    this.getAttribute("opacity") || 1;
                cb(this, "orig_opac", k);
                this.setAttribute("opacity", k * 0.33);
                this.setAttribute("style", "pointer-events: none");
                ta.push(this)
            });
            xa();
            M("contextset", L)
        };
    this.clear = function() {
        La.clear();
        xa();
        c.clearSvgContentElement();
        c.current_drawing_ = new svgedit.draw.Drawing(n);
        c.createLayer("Layer 1");
        c.undoMgr.resetUndoStack();
        ra.initGroup();
        sa = ra.getRubberBandBox();
        M("cleared")
    };
    this.linkControlPoints = La.linkControlPoints;
    this.getContentElem = function() {
        return n
    };
    this.getRootElem =
        function() {
            return d
        };
    this.getSelectedElems = function() {
        return I
    };
    var zb = this.getResolution = function() {
        var e = n.getAttribute("width") / q,
            k = n.getAttribute("height") / q;
        return {
            w: e,
            h: k,
            zoom: q
        }
    };
    this.getZoom = function() {
        return q
    };
    this.getVersion = function() {
        return "svgcanvas.js ($Rev: 2082 $)"
    };
    this.setUiStrings = function(e) {
        $.extend(kb, e.notification)
    };
    this.setConfig = function(e) {
        $.extend(p, e)
    };
    this.getTitle = function(e) {
        if (e = e || I[0]) {
            e = $(e).data("gsvg") || $(e).data("symbol") || e;
            e = e.childNodes;
            for (var k = 0; k < e.length; k++)
                if (e[k].nodeName ==
                    "title") return e[k].textContent;
            return ""
        }
    };
    this.setGroupTitle = function(e) {
        var k = I[0];
        k = $(k).data("gsvg") || k;
        var l = $(k).children("title"),
            C = new Da("Set Label");
        if (e.length)
            if (l.length) {
                l = l[0];
                C.addSubCommand(new Ma(l, {
                    "#text": l.textContent
                }));
                l.textContent = e
            } else {
                l = f.createElementNS(b, "title");
                l.textContent = e;
                $(k).prepend(l);
                C.addSubCommand(new Ia(l))
            } else {
            C.addSubCommand(new Fa(l[0], l.nextSibling, k));
            l.remove()
        }
        wa(C)
    };
    this.getDocumentTitle = function() {
        return c.getTitle(n)
    };
    this.setDocumentTitle = function(e) {
        for (var k =
                n.childNodes, l = false, C = "", A = new Da("Change Image Title"), G = 0; G < k.length; G++)
            if (k[G].nodeName == "title") {
                l = k[G];
                C = l.textContent;
                break
            }
        if (!l) {
            l = f.createElementNS(b, "title");
            n.insertBefore(l, n.firstChild)
        }
        if (e.length) l.textContent = e;
        else l.parentNode.removeChild(l);
        A.addSubCommand(new Ma(l, {
            "#text": C
        }));
        wa(A)
    };
    this.getEditorNS = function(e) {
        e && n.setAttribute("xmlns:se", "http://svg-edit.googlecode.com");
        return "http://svg-edit.googlecode.com"
    };
    this.setResolution = function(e, k) {
        var l = zb(),
            C = l.w;
        l = l.h;
        var A;
        if (e == "fit") {
            var G = getStrokedBBox();
            if (G) {
                A = new Da("Fit Canvas to Content");
                var D = pb();
                qb(D);
                var z = [],
                    F = [];
                $.each(D, function() {
                    z.push(G.x * -1);
                    F.push(G.y * -1)
                });
                D = c.moveSelectedElements(z, F, true);
                A.addSubCommand(D);
                xa();
                e = Math.round(G.width);
                k = Math.round(G.height)
            } else return false
        }
        if (e != C || k != l) {
            D = d.suspendRedraw(1E3);
            A || (A = new Da("Change Image Dimensions"));
            e = Ba("width", e);
            k = Ba("height", k);
            n.setAttribute("width", e);
            n.setAttribute("height", k);
            this.contentW = e;
            this.contentH = k;
            A.addSubCommand(new Ma(n, {
                width: C,
                height: l
            }));
            n.setAttribute("viewBox", [0, 0, e / q, k / q].join(" "));
            A.addSubCommand(new Ma(n, {
                viewBox: ["0 0", C, l].join(" ")
            }));
            wa(A);
            d.unsuspendRedraw(D);
            if (background = document.getElementById("canvas_background")) {
                background.setAttribute("x", -1);
                background.setAttribute("y", -1);
                background.setAttribute("width", e + 2);
                background.setAttribute("height", k + 2)
            }
            M("changed", [n])
        }
        return [e, k]
    };
    this.getOffset = function() {
        return $(n).attr(["x", "y"])
    };
    this.setBBoxZoom = function(e, k, l) {
        var C = 0.85,
            A = function(G) {
                if (!G) return false;
                var D = Math.min(Math.round(k / G.width * 100 * C) / 100, Math.round(l / G.height * 100 * C) / 100);
                c.setZoom(D);
                return {
                    zoom: D,
                    bbox: G
                }
            };
        if (typeof e == "object") {
            e = e;
            if (e.width == 0 || e.height == 0) {
                c.setZoom(e.zoom ? e.zoom : q * e.factor);
                return {
                    zoom: q,
                    bbox: e
                }
            }
            return A(e)
        }
        switch (e) {
            case "selection":
                if (!I[0]) return;
                e = $.map(I, function(G) {
                    if (G) return G
                });
                e = getStrokedBBox(e);
                break;
            case "canvas":
                e = zb();
                C = 0.95;
                e = {
                    width: e.w,
                    height: e.h,
                    x: 0,
                    y: 0
                };
                break;
            case "content":
                e = getStrokedBBox();
                break;
            case "layer":
                e = getStrokedBBox(pb(B().getCurrentLayer()));
                break;
            default:
                return
        }
        return A(e)
    };
    this.setZoom = function(e) {
        var k = zb();
        n.setAttribute("viewBox", "0 0 " + k.w / e + " " + k.h / e);
        q = e;
        $.each(I, function(l, C) {
            C && ra.requestSelector(C).resize()
        });
        La.zoomChange();
        ib("zoomChanged", e)
    };
    this.getMode = function() {
        return Ha
    };
    this.setMode = function(e) {
        La.clear();
        bb.clear();
        $("#workarea").attr("class", e);
        Xa = I[0] && I[0].nodeName == "text" ? Ua : K;
        Ha = e
    };
    this.getColor = function(e) {
        return Xa[e]
    };
    this.setColor = function(e, k, l) {
        K[e] = k;
        Xa[e + "_paint"] = {
            type: "solidColor"
        };
        for (var C = [], A =
                I.length; A--;) {
            var G = I[A];
            if (G)
                if (G.tagName == "g") svgedit.utilities.walkTree(G, function(D) {
                    D.nodeName != "g" && C.push(D)
                });
                else if (e == "fill") G.tagName != "polyline" && G.tagName != "line" && C.push(G);
            else C.push(G)
        }
        if (C.length > 0)
            if (l) Ab(e, k, C);
            else {
                Ya(e, k, C);
                M("changed", C)
            }
    };
    var gb = function() {
            var e = n.getElementsByTagNameNS(b, "defs");
            if (e.length > 0) e = e[0];
            else {
                e = f.createElementNS(b, "defs");
                n.firstChild ? n.insertBefore(e, n.firstChild.nextSibling) : n.appendChild(e)
            }
            return e
        },
        Nb = this.setGradient = function(e) {
            if (!(!Xa[e +
                    "_paint"] || Xa[e + "_paint"].type == "solidColor")) {
                var k = c[e + "Grad"],
                    l = Mb(k),
                    C = gb();
                if (l) k = l;
                else {
                    k = C.appendChild(f.importNode(k, true));
                    k.id = ka()
                }
                c.setColor(e, "url(#" + k.id + ")");
                if (e == "canvas")(e = document.getElementById("canvas_background")) && e.setAttribute("fill", "url(#" + k.id + ")")
            }
        },
        Mb = function(e) {
            var k = gb();
            k = $(k).find("linearGradient, radialGradient");
            for (var l = k.length, C = ["r", "cx", "cy", "fx", "fy"]; l--;) {
                var A = k[l];
                if (e.tagName == "linearGradient") {
                    if (e.getAttribute("x1") != A.getAttribute("x1") || e.getAttribute("y1") !=
                        A.getAttribute("y1") || e.getAttribute("x2") != A.getAttribute("x2") || e.getAttribute("y2") != A.getAttribute("y2")) continue
                } else {
                    var G = $(e).attr(C),
                        D = $(A).attr(C),
                        z = false;
                    $.each(C, function(E, H) {
                        if (G[H] != D[H]) z = true
                    });
                    if (z) continue
                }
                var F = e.getElementsByTagNameNS(b, "stop"),
                    h = A.getElementsByTagNameNS(b, "stop");
                if (F.length == h.length) {
                    for (var m = F.length; m--;) {
                        var o = F[m],
                            u = h[m];
                        if (o.getAttribute("offset") != u.getAttribute("offset") || o.getAttribute("stop-opacity") != u.getAttribute("stop-opacity") || o.getAttribute("stop-color") !=
                            u.getAttribute("stop-color")) break
                    }
                    if (m == -1) return A
                }
            }
            return null
        };
    this.setPaint = function(e, k) {
        var l = new $.jGraduate.Paint(k);
        this.setPaintOpacity(e, l.alpha / 100, true);
        Xa[e + "_paint"] = l;
        switch (l.type) {
            case "solidColor":
                if (l.solidColor != "none" && l.solidColor != "#none") this.setColor(e, "#" + l.solidColor);
                else {
                    this.setColor(e, "none");
                    document.querySelector(e == "fill" ? "#fill_color rect" : "#stroke_color rect").setAttribute("fill", "none")
                }
                break;
            case "linearGradient":
            case "radialGradient":
                c[e + "Grad"] = l[l.type];
                Nb(e)
        }
    };
    this.getStrokeWidth = function() {
        return Xa.stroke_width
    };
    this.setStrokeWidth = function(e) {
        if (e == 0 && ["line", "path"].indexOf(Ha) >= 0) c.setStrokeWidth(1);
        else {
            Xa.stroke_width = e;
            for (var k = [], l = I.length; l--;) {
                var C = I[l];
                if (C) C.tagName == "g" ? svgedit.utilities.walkTree(C, function(A) {
                    A.nodeName != "g" && k.push(A)
                }) : k.push(C)
            }
            if (k.length > 0) {
                Ya("stroke-width", e, k);
                M("changed", I)
            }
        }
    };
    this.setStrokeAttr = function(e, k) {
        K[e.replace("-", "_")] = k;
        for (var l = [], C = I.length; C--;) {
            var A = I[C];
            if (A) A.tagName == "g" ? svgedit.utilities.walkTree(A,
                function(G) {
                    G.nodeName != "g" && l.push(G)
                }) : l.push(A)
        }
        if (l.length > 0) {
            Ya(e, k, l);
            M("changed", I)
        }
    };
    this.getStyle = function() {
        return K
    };
    this.getOpacity = function() {
        return K.opacity
    };
    this.setOpacity = function(e) {
        K.opacity = e;
        Ya("opacity", e)
    };
    this.getFillOpacity = function() {
        return K.fill_opacity
    };
    this.getStrokeOpacity = function() {
        return K.stroke_opacity
    };
    this.setPaintOpacity = function(e, k, l) {
        K[e + "_opacity"] = k;
        l ? Ab(e + "-opacity", k) : Ya(e + "-opacity", k)
    };
    this.getBlur = function(e) {
        var k = 0;
        if (e)
            if (e.getAttribute("filter"))
                if (e =
                    pa(e.id + "_blur")) k = e.firstChild.getAttribute("stdDeviation");
        return k
    };
    (function() {
        function e() {
            var A = c.undoMgr.finishUndoableChange();
            k.addSubCommand(A);
            wa(k);
            l = k = null
        }
        var k = null,
            l = null,
            C = false;
        c.setBlurNoUndo = function(A) {
            if (l)
                if (A === 0) {
                    Ab("filter", "");
                    C = true
                } else {
                    var G = I[0];
                    C && Ab("filter", "url(#" + G.id + "_blur)");
                    if (svgedit.browser.isWebkit()) {
                        G.removeAttribute("filter");
                        G.setAttribute("filter", "url(#" + G.id + "_blur)")
                    }
                    Ab("stdDeviation", A, [l.firstChild]);
                    c.setBlurOffsets(l, A)
                } else c.setBlur(A)
        };
        c.setBlurOffsets =
            function(A, G) {
                if (G > 3) ma(A, {
                    x: "-50%",
                    y: "-50%",
                    width: "200%",
                    height: "200%"
                }, 100);
                else if (!svgedit.browser.isWebkit()) {
                    A.removeAttribute("x");
                    A.removeAttribute("y");
                    A.removeAttribute("width");
                    A.removeAttribute("height")
                }
            };
        c.setBlur = function(A, G) {
            if (k) e();
            else {
                var D = I[0],
                    z = D.id;
                l = pa(z + "_blur");
                A -= 0;
                var F = new Da;
                if (l) {
                    if (A === 0) l = null
                } else {
                    var h = S({
                        element: "feGaussianBlur",
                        attr: {
                            "in": "SourceGraphic",
                            stdDeviation: A
                        }
                    });
                    l = S({
                        element: "filter",
                        attr: {
                            id: z + "_blur"
                        }
                    });
                    l.appendChild(h);
                    gb().appendChild(l);
                    F.addSubCommand(new Ia(l))
                }
                h = {
                    filter: D.getAttribute("filter")
                };
                if (A === 0) {
                    D.removeAttribute("filter");
                    F.addSubCommand(new Ma(D, h))
                } else {
                    Ya("filter", "url(#" + z + "_blur)");
                    F.addSubCommand(new Ma(D, h));
                    c.setBlurOffsets(l, A);
                    k = F;
                    c.undoMgr.beginUndoableChange("stdDeviation", [l ? l.firstChild : null]);
                    if (G) {
                        c.setBlurNoUndo(A);
                        e()
                    }
                }
            }
        }
    })();
    this.getBold = function() {
        var e = true;
        I.filter(Boolean).forEach(function(k) {
            if (k.getAttribute("font-weight") != "bold") e = false
        });
        return e
    };
    this.setBold = function(e) {
        var k = I.filter(Boolean);
        k.forEach(function(l) {
            if (l !=
                null && l.tagName == "text") Ya("font-weight", e ? "bold" : "normal")
        });
        k[0].textContent || bb.setCursor()
    };
    this.getItalic = function() {
        var e = true;
        I.filter(Boolean).forEach(function(k) {
            if (k.getAttribute("font-style") != "italic") e = false
        });
        return e
    };
    this.setItalic = function(e) {
        var k = I.filter(Boolean);
        k.forEach(function(l) {
            if (l != null && l.tagName == "text") Ya("font-style", e ? "italic" : "normal")
        });
        k[0].textContent || bb.setCursor()
    };
    this.getFontFamily = function() {
        return Ua.font_family
    };
    this.setFontFamily = function(e) {
        Ua.font_family =
            e;
        Ya("font-family", e);
        I[0] && !I[0].textContent && bb.setCursor()
    };
    this.setFontColor = function(e) {
        Ua.fill = e;
        Ya("fill", e)
    };
    this.getFontSize = function() {
        return Ua.fill
    };
    this.getFontSize = function() {
        return Ua.font_size
    };
    this.setFontSize = function(e) {
        Ua.font_size = e;
        Ya("font-size", e);
        I[0].textContent || bb.setCursor()
    };
    this.getText = function() {
        var e = I[0];
        if (e == null) return "";
        return e.textContent
    };
    this.setTextContent = function(e) {
        Ya("#text", e);
        bb.init(e);
        bb.setCursor()
    };
    this.setImageURL = function(e) {
        var k = I[0];
        if (k) {
            var l =
                $(k).attr(["width", "height"]);
            l = !l.width || !l.height;
            var C = ca(k);
            if (C !== e) l = true;
            else if (!l) return;
            var A = new Da("Change Image URL");
            U(k, e);
            A.addSubCommand(new Ma(k, {
                "#href": C
            }));
            l ? $(new Image).load(function() {
                var G = $(k).attr(["width", "height"]);
                $(k).attr({
                    width: this.width,
                    height: this.height
                });
                ra.requestSelector(k).resize();
                A.addSubCommand(new Ma(k, G));
                wa(A);
                M("changed", [k])
            }).attr("src", e) : wa(A)
        }
    };
    this.setLinkURL = function(e) {
        var k = I[0];
        if (k) {
            if (k.tagName !== "a") {
                k = $(k).parents("a");
                if (k.length) k = k[0];
                else return
            }
            var l = ca(k);
            if (l !== e) {
                var C = new Da("Change Link URL");
                U(k, e);
                C.addSubCommand(new Ma(k, {
                    "#href": l
                }));
                wa(C)
            }
        }
    };
    this.elementsAreSame = function(e) {
        return !e.length || e[0] == null ? null : I.every(function(k) {
            return k && I[0] ? k.nodeName == I[0].nodeName : null
        })
    };
    this.setRectRadius = function(e) {
        c.elementsAreSame(I) && I[0].tagName == "rect" && I.forEach(function(k) {
            var l = k.getAttribute("rx");
            if (l != e) {
                k.setAttribute("rx", e);
                k.setAttribute("ry", e);
                wa(new Ma(k, {
                    rx: l,
                    ry: l
                }, "Radius"));
                M("changed", [k])
            }
        })
    };
    this.makeHyperlink =
        function(e) {
            c.groupSelectedElements("a", e)
        };
    this.removeHyperlink = function() {
        c.ungroupSelectedElement()
    };
    this.setSegType = function(e) {
        La.setSegType(e)
    };
    this.convertToPath = function(e, k) {
        if (e == null) $.each(I, function(ba, T) {
            T && c.convertToPath(T)
        });
        else {
            if (!k) var l = new Da("Convert element to Path");
            var C = k ? {} : {
                fill: K.fill,
                "fill-opacity": K.fill_opacity,
                stroke: K.stroke,
                "stroke-width": K.stroke_width,
                "stroke-dasharray": K.stroke_dasharray,
                "stroke-linejoin": K.stroke_linejoin,
                "stroke-linecap": K.stroke_linecap,
                "stroke-opacity": K.stroke_opacity,
                opacity: K.opacity,
                visibility: "hidden"
            };
            $.each(["marker-start", "marker-end", "marker-mid", "filter", "clip-path"], function() {
                if (e.getAttribute(this)) C[this] = e.getAttribute(this)
            });
            var A = S({
                    element: "path",
                    attr: C
                }),
                G = e.getAttribute("transform");
            G && A.setAttribute("transform", G);
            var D = e.id,
                z = e.parentNode;
            e.nextSibling ? z.insertBefore(A, e) : z.appendChild(A);
            var F = "",
                h = function(ba) {
                    $.each(ba, function(T, fa) {
                        var ha = fa[1];
                        F += fa[0];
                        for (var W = 0; W < ha.length; W += 2) F += ha[W] + "," + ha[W +
                            1] + " "
                    })
                },
                m = 1.81;
            switch (e.tagName) {
                case "ellipse":
                case "circle":
                    var o = $(e).attr(["rx", "ry", "cx", "cy"]),
                        u = o.cx,
                        E = o.cy,
                        H = o.rx;
                    o = o.ry;
                    if (e.tagName == "circle") H = o = $(e).attr("r");
                    h([
                        ["M", [u - H, E]],
                        ["C", [u - H, E - o / m, u - H / m, E - o, u, E - o]],
                        ["C", [u + H / m, E - o, u + H, E - o / m, u + H, E]],
                        ["C", [u + H, E + o / m, u + H / m, E + o, u, E + o]],
                        ["C", [u - H / m, E + o, u - H, E + o / m, u - H, E]],
                        ["Z", []]
                    ]);
                    break;
                case "path":
                    F = e.getAttribute("d");
                    break;
                case "line":
                    o = $(e).attr(["x1", "y1", "x2", "y2"]);
                    F = "M" + o.x1 + "," + o.y1 + "L" + o.x2 + "," + o.y2;
                    break;
                case "polyline":
                case "polygon":
                    F =
                        "M" + e.getAttribute("points");
                    break;
                case "rect":
                    o = $(e).attr(["rx", "ry"]);
                    H = o.rx;
                    o = o.ry;
                    var J = e.getBBox();
                    u = J.x;
                    E = J.y;
                    var O = J.width;
                    J = J.height;
                    m = 4 - m;
                    if (!H && !o) h([
                        ["M", [u, E]],
                        ["L", [u + O, E]],
                        ["L", [u + O, E + J]],
                        ["L", [u, E + J]],
                        ["L", [u, E]],
                        ["Z", []]
                    ]);
                    else {
                        o || (o = H);
                        h([
                            ["M", [u, E + o]],
                            ["C", [u, E + o / m, u + H / m, E, u + H, E]],
                            ["L", [u + O - H, E]],
                            ["C", [u + O - H / m, E, u + O, E + o / m, u + O, E + o]],
                            ["L", [u + O, E + J - o]],
                            ["C", [u + O, E + J - o / m, u + O - H / m, E + J, u + O - H, E + J]],
                            ["L", [u + H, E + J]],
                            ["C", [u + H / m, E + J, u, E + J - o / m, u, E + J - o]],
                            ["L", [u, E + o]],
                            ["Z", []]
                        ])
                    }
                    break;
                default:
                    A.parentNode.removeChild(A)
            }
            F &&
                A.setAttribute("d", F);
            if (k) {
                La.resetOrientation(A);
                l = false;
                try {
                    l = A.getBBox()
                } catch (X) {}
                A.parentNode.removeChild(A);
                return l
            } else {
                if (G) {
                    G = R(A);
                    oa(G) && La.resetOrientation(A)
                }
                l.addSubCommand(new Fa(e, e.nextSibling, z));
                l.addSubCommand(new Ia(A));
                xa();
                e.parentNode.removeChild(e);
                A.setAttribute("id", D);
                A.removeAttribute("visibility");
                qb([A], true);
                wa(l)
            }
        }
    };
    var Ab = this.changeSelectedAttributeNoUndo = function(e, k, l) {
            var C = d.suspendRedraw(1E3);
            Ha == "pathedit" && La.moveNode(e, k);
            l = l || I;
            for (var A = l.length, G = ["g",
                    "polyline", "path"
                ]; A--;) {
                var D = l[A];
                if (D != null) {
                    Ha === "textedit" && e !== "#text" && D.textContent.length && bb.toSelectMode(D);
                    if ((e === "x" || e === "y") && G.indexOf(D.tagName) >= 0) {
                        var z = getStrokedBBox([D]);
                        c.moveSelectedElements((e === "x" ? k - z.x : 0) * q, (e === "y" ? k - z.y : 0) * q, true)
                    } else {
                        z = e === "#text" ? D.textContent : D.getAttribute(e);
                        if (z == null) z = "";
                        if (z !== String(k)) {
                            if (e == "#text") {
                                svgedit.utilities.getBBox(D);
                                D.textContent = k
                            } else e == "#href" ? U(D, k) : D.setAttribute(e, k);
                            I.indexOf(D) >= 0 && setTimeout(function() {
                                D.parentNode &&
                                    ra.requestSelector(D).resize()
                            }, 0);
                            z = na(D);
                            if (z != 0 && e != "transform")
                                for (var F = R(D), h = F.numberOfItems; h--;)
                                    if (F.getItem(h).type == 4) {
                                        F.removeItem(h);
                                        var m = svgedit.utilities.getBBox(D),
                                            o = N(m.x + m.width / 2, m.y + m.height / 2, Y(F).matrix);
                                        m = o.x;
                                        o = o.y;
                                        var u = d.createSVGTransform();
                                        u.setRotate(z, m, o);
                                        F.insertItemBefore(u, h);
                                        break
                                    }
                        }
                    }
                }
            }
            d.unsuspendRedraw(C)
        },
        Ya = this.changeSelectedAttribute = function(e, k, l) {
            l = l || I;
            c.undoMgr.beginUndoableChange(e, l);
            Ab(e, k, l);
            e = c.undoMgr.finishUndoableChange();
            e.isEmpty() || wa(e)
        };
    this.deleteSelectedElements =
        function() {
            for (var e = new Da("Delete Elements"), k = I.length, l = [], C = 0; C < k; ++C) {
                var A = I[C];
                if (A == null) break;
                var G = A.parentNode,
                    D = A;
                ra.releaseSelector(D);
                svgedit.path.removePath_(D.id);
                if (G.tagName === "a" && G.childNodes.length === 1) {
                    D = G;
                    G = G.parentNode
                }
                var z = D.nextSibling;
                D = G.removeChild(D);
                l.push(A);
                I[C] = null;
                e.addSubCommand(new Fa(D, z, G))
            }
            e.isEmpty() || wa(e);
            M("changed", l);
            xa()
        };
    this.cutSelectedElements = function() {
        for (var e = new Da("Cut Elements"), k = I.length, l = [], C = 0; C < k; ++C) {
            var A = I[C];
            if (A == null) break;
            var G =
                A.parentNode,
                D = A;
            ra.releaseSelector(D);
            svgedit.path.removePath_(D.id);
            var z = D.nextSibling;
            D = G.removeChild(D);
            l.push(A);
            I[C] = null;
            e.addSubCommand(new Fa(D, z, G))
        }
        e.isEmpty() || wa(e);
        M("changed", l);
        xa();
        c.clipBoard = l
    };
    this.copySelectedElements = function() {
        c.clipBoard = $.merge([], I)
    };
    this.pasteElements = function() {
        var e = c.clipBoard,
            k = e.length;
        if (k) {
            for (var l = [], C = new Da("Paste elements"); k--;) {
                var A = e[k];
                if (A) {
                    var G = ia(A);
                    if (!pa(A.id)) G.id = A.id;
                    l.push(G);
                    (L || B().getCurrentLayer()).appendChild(G);
                    C.addSubCommand(new Ia(G))
                }
            }
            svgCanvas.clearSelection();
            setTimeout(function() {
                rb(l)
            }, 100);
            wa(C);
            M("changed", l)
        }
    };
    this.groupSelectedElements = function(e) {
        e || (e = "g");
        var k = "";
        switch (e) {
            case "a":
                k = "Make hyperlink";
                var l = "";
                if (arguments.length > 1) l = arguments[1];
                break;
            default:
                e = "g";
                k = "Group Elements"
        }
        k = new Da(k);
        var C = S({
            element: e,
            attr: {
                id: ka()
            }
        });
        e === "a" && U(C, l);
        k.addSubCommand(new Ia(C));
        for (l = I.length; l--;) {
            var A = I[l];
            if (A != null) {
                if (A.parentNode.tagName === "a" && A.parentNode.childNodes.length === 1) A = A.parentNode;
                var G = A.nextSibling,
                    D = A.parentNode;
                C.appendChild(A);
                k.addSubCommand(new Ja(A, G, D))
            }
        }
        k.isEmpty() || wa(k);
        rb([C], true)
    };
    var Db = this.pushGroupProperties = function(e, k) {
        var l = e.childNodes,
            C = l.length,
            A = e.getAttribute("transform"),
            G = R(e),
            D = Y(G).matrix,
            z = new Da("Push group properties"),
            F = 0,
            h = na(e),
            m = $(e).attr(["filter", "opacity"]),
            o, u;
        for (F = 0; F < C; F++) {
            var E = l[F];
            if (E.nodeType === 1) {
                if (m.opacity !== null && m.opacity !== 1) {
                    E.getAttribute("opacity");
                    var H = Math.round((E.getAttribute("opacity") || 1) * m.opacity * 100) / 100;
                    Ya("opacity", H, [E])
                }
                if (m.filter) {
                    var J = H = this.getBlur(E);
                    u || (u = this.getBlur(e));
                    if (H) H = u - 0 + (H - 0);
                    else if (H === 0) H = u;
                    if (J) o = P(E.getAttribute("filter"));
                    else if (o) {
                        o = ia(o);
                        gb().appendChild(o)
                    } else o = P(m.filter);
                    o.id = E.id + "_" + (o.firstChild.tagName === "feGaussianBlur" ? "blur" : "filter");
                    Ya("filter", "url(#" + o.id + ")", [E]);
                    if (H) {
                        Ya("stdDeviation", H, [o.firstChild]);
                        c.setBlurOffsets(o, H)
                    }
                }
                H = R(E);
                if (~E.tagName.indexOf("Gradient")) H = null;
                if (H)
                    if (E.tagName !== "defs")
                        if (G.numberOfItems) {
                            if (h && G.numberOfItems == 1) {
                                var O = G.getItem(0).matrix,
                                    X = d.createSVGMatrix();
                                if (J = na(E)) X =
                                    H.getItem(0).matrix;
                                var ba = svgedit.utilities.getBBox(E),
                                    T = Y(H).matrix,
                                    fa = N(ba.x + ba.width / 2, ba.y + ba.height / 2, T);
                                ba = h + J;
                                T = d.createSVGTransform();
                                T.setRotate(ba, fa.x, fa.y);
                                O = ga(O, X, T.matrix.inverse());
                                J && H.removeItem(0);
                                if (ba) H.numberOfItems ? H.insertItemBefore(T, 0) : H.appendItem(T);
                                if (O.e || O.f) {
                                    J = d.createSVGTransform();
                                    J.setTranslate(O.e, O.f);
                                    H.numberOfItems ? H.insertItemBefore(J, 0) : H.appendItem(J)
                                }
                            } else {
                                J = E.getAttribute("transform");
                                O = {};
                                O.transform = J ? J : "";
                                J = d.createSVGTransform();
                                O = Y(H).matrix;
                                X = O.inverse();
                                O = ga(X, D, O);
                                J.setMatrix(O);
                                H.appendItem(J)
                            }(E = Ra(E)) && z.addSubCommand(E)
                        }
            }
        }
        if (A) {
            O = {};
            O.transform = A;
            e.setAttribute("transform", "");
            e.removeAttribute("transform");
            z.addSubCommand(new Ma(e, O))
        }
        if (k && !z.isEmpty()) return z
    };
    this.ungroupSelectedElement = function() {
        var e = I[0];
        if ($(e).data("gsvg") || $(e).data("symbol")) Lb(e);
        else if (e.tagName === "use") {
            var k = pa(ca(e).substr(1));
            $(e).data("symbol", k).data("ref", k);
            Lb(e)
        } else {
            k = $(e).parents("a");
            if (k.length) e = k[0];
            if (e.tagName === "g" || e.tagName === "a") {
                k = new Da("Ungroup Elements");
                var l = Db(e, true);
                l && k.addSubCommand(l);
                l = e.parentNode;
                for (var C = e.nextSibling, A = Array(e.childNodes.length), G = 0; e.firstChild;) {
                    var D = e.firstChild,
                        z = D.nextSibling,
                        F = D.parentNode;
                    if (D.tagName === "title") {
                        k.addSubCommand(new Fa(D, D.nextSibling, F));
                        F.removeChild(D)
                    } else {
                        A[G++] = D = l.insertBefore(D, C);
                        k.addSubCommand(new Ja(D, z, F))
                    }
                }
                xa();
                C = e.nextSibling;
                e = l.removeChild(e);
                k.addSubCommand(new Fa(e, C, l));
                k.isEmpty() || wa(k);
                qb(A)
            }
        }
    };
    this.moveToTopSelectedElement = function() {
        var e = I.filter(Boolean).reverse(),
            k =
            new Da("Move to top");
        e.forEach(function(l) {
            l = l;
            var C = l.parentNode,
                A = l.nextSibling;
            l = l.parentNode.appendChild(l);
            if (A != l.nextSibling) {
                k.addSubCommand(new Ja(l, A, C, "top"));
                M("changed", [l])
            }
            k.isEmpty() || wa(k)
        })
    };
    this.moveToBottomSelectedElement = function() {
        var e = I.filter(Boolean).reverse(),
            k = new Da("Move to top");
        e.forEach(function(l) {
            l = l;
            var C = l.parentNode,
                A = l.nextSibling,
                G = l.parentNode.firstChild;
            if (G.tagName == "title") G = G.nextSibling;
            if (G.tagName == "defs") G = G.nextSibling;
            l = l.parentNode.insertBefore(l,
                G);
            if (A != l.nextSibling) {
                k.addSubCommand(new Ja(l, A, C, "bottom"));
                M("changed", [l])
            }
        });
        k.isEmpty() || wa(k)
    };
    this.moveUpDownSelected = function(e) {
        var k = I.filter(Boolean);
        e == "Down" && k.reverse();
        var l = new Da("Move " + e);
        k.forEach(function(C) {
            hb = [];
            var A, G, D = $(ob(getStrokedBBox([C]))).toArray();
            e == "Down" && D.reverse();
            $.each(D, function() {
                if (G) {
                    A = this;
                    return false
                } else if (this == C) G = true
            });
            if (A) {
                D = C.parentNode;
                var z = C.nextSibling;
                $(A)[e == "Down" ? "before" : "after"](C);
                if (z != C.nextSibling) {
                    l.addSubCommand(new Ja(C,
                        z, D, "Move " + e));
                    M("changed", [C])
                }
            }
        });
        l.isEmpty() || wa(l)
    };
    this.moveSelectedElements = function(e, k, l) {
        if (e.constructor != Array) {
            e /= q;
            k /= q
        }
        l = l || true;
        for (var C = new Da("position"), A = I.length; A--;) {
            var G = I[A];
            if (G != null) {
                var D = d.createSVGTransform(),
                    z = R(G);
                e.constructor == Array ? D.setTranslate(e[A], k[A]) : D.setTranslate(e, k);
                z.numberOfItems ? z.insertItemBefore(D, 0) : z.appendItem(D);
                (D = Ra(G)) && C.addSubCommand(D);
                ra.requestSelector(G).resize()
            }
        }
        if (!C.isEmpty()) {
            l && wa(C);
            M("changed", I);
            return C
        }
    };
    this.cloneSelectedElements =
        function(e, k, l) {
            for (var C = new Da("Clone Elements"), A = I.length, G = 0; G < A; ++G) {
                var D = I[G];
                if (D == null) break
            }
            A = I.slice(0, G);
            this.clearSelection(true);
            G = A.length;
            for (clones = []; G--;) {
                D = A[G];
                var z = ia(A[G]),
                    F = L || B().getCurrentLayer();
                if (l) {
                    tlist = R(z);
                    tlist.removeItem(l);
                    Ra(z);
                    F.insertBefore(z, D)
                } else F.appendChild(z);
                clones.push(z);
                C.addSubCommand(new Ia(z))
            }
            if (!C.isEmpty()) {
                qb(A.reverse());
                l || this.moveSelectedElements(e, k, false);
                wa(C)
            }
            return clones
        };
    this.alignSelectedElements = function(e, k) {
        var l = [],
            C = Number.MAX_VALUE,
            A = Number.MIN_VALUE,
            G = Number.MAX_VALUE,
            D = Number.MIN_VALUE,
            z = Number.MIN_VALUE,
            F = Number.MIN_VALUE,
            h = I.length;
        if (h) {
            for (var m = 0; m < h; ++m) {
                if (I[m] == null) break;
                l[m] = getStrokedBBox([I[m]]);
                switch (k) {
                    case "smallest":
                        if ((e == "l" || e == "c" || e == "r") && (z == Number.MIN_VALUE || z > l[m].width) || (e == "t" || e == "m" || e == "b") && (F == Number.MIN_VALUE || F > l[m].height)) {
                            C = l[m].x;
                            G = l[m].y;
                            A = l[m].x + l[m].width;
                            D = l[m].y + l[m].height;
                            z = l[m].width;
                            F = l[m].height
                        }
                        break;
                    case "largest":
                        if ((e == "l" || e == "c" || e == "r") && (z == Number.MIN_VALUE || z < l[m].width) ||
                            (e == "t" || e == "m" || e == "b") && (F == Number.MIN_VALUE || F < l[m].height)) {
                            C = l[m].x;
                            G = l[m].y;
                            A = l[m].x + l[m].width;
                            D = l[m].y + l[m].height;
                            z = l[m].width;
                            F = l[m].height
                        }
                        break;
                    default:
                        if (l[m].x < C) C = l[m].x;
                        if (l[m].y < G) G = l[m].y;
                        if (l[m].x + l[m].width > A) A = l[m].x + l[m].width;
                        if (l[m].y + l[m].height > D) D = l[m].y + l[m].height
                }
            }
            if (k == "page") {
                G = C = 0;
                A = c.contentW;
                D = c.contentH
            }
            z = Array(h);
            F = Array(h);
            for (m = 0; m < h; ++m) {
                if (I[m] == null) break;
                var o = l[m];
                z[m] = 0;
                F[m] = 0;
                switch (e) {
                    case "l":
                        z[m] = C - o.x;
                        break;
                    case "c":
                        z[m] = (C + A) / 2 - (o.x + o.width / 2);
                        break;
                    case "r":
                        z[m] = A - (o.x + o.width);
                        break;
                    case "t":
                        F[m] = G - o.y;
                        break;
                    case "m":
                        F[m] = (G + D) / 2 - (o.y + o.height / 2);
                        break;
                    case "b":
                        F[m] = D - (o.y + o.height)
                }
            }
            this.moveSelectedElements(z, F)
        }
    };
    this.contentW = zb().w;
    this.contentH = zb().h;
    this.updateCanvas = function(e, k) {
        d.setAttribute("width", e);
        d.setAttribute("height", k);
        var l = $("#canvasBackground")[0],
            C = n.getAttribute("x"),
            A = n.getAttribute("y"),
            G = e / 2 - this.contentW * q / 2,
            D = k / 2 - this.contentH * q / 2;
        ma(n, {
            width: this.contentW * q,
            height: this.contentH * q,
            x: G,
            y: D,
            viewBox: "0 0 " + this.contentW +
                " " + this.contentH
        });
        ma(l, {
            width: n.getAttribute("width"),
            height: n.getAttribute("height"),
            x: G,
            y: D
        });
        (l = pa("background_image")) && ma(l, {
            width: "100%",
            height: "100%"
        });
        ra.selectorParentGroup.setAttribute("transform", "translate(" + G + "," + D + ")");
        return {
            x: G,
            y: D,
            old_x: C,
            old_y: A,
            d_x: G - C,
            d_y: D - A
        }
    };
    this.setBackground = function(e, k) {
        var l = pa("canvasBackground"),
            C = $(l).find("rect")[0],
            A = pa("background_image");
        C.setAttribute("fill", e);
        if (k) {
            if (!A) {
                A = f.createElementNS(b, "image");
                ma(A, {
                    id: "background_image",
                    width: "100%",
                    height: "100%",
                    preserveAspectRatio: "xMinYMin",
                    style: "pointer-events:none"
                })
            }
            U(A, k);
            l.appendChild(A)
        } else A && A.parentNode.removeChild(A)
    };
    this.cycleElement = function(e) {
        var k = I[0],
            l = false,
            C = pb(L || B().getCurrentLayer());
        if (C.length) {
            if (k == null) {
                e = e ? C.length - 1 : 0;
                l = C[e]
            } else
                for (var A = C.length; A--;)
                    if (C[A] == k) {
                        e = e ? A - 1 : A + 1;
                        if (e >= C.length) e = 0;
                        else if (e < 0) e = C.length - 1;
                        l = C[e];
                        break
                    }
            rb([l], true);
            M("selected", I)
        }
    };
    this.clear();
    this.getPrivateMethods = function() {
        return {
            addCommandToHistory: wa,
            setGradient: Nb,
            addSvgElementFromJson: S,
            assignAttributes: ma,
            BatchCommand: Da,
            call: M,
            ChangeElementCommand: Ma,
            copyElem: ia,
            ffClone: da,
            findDefs: gb,
            findDuplicateGradient: Mb,
            getElem: pa,
            getId: aa,
            getIntersectionList: ob,
            getMouseTarget: Bb,
            getNextId: ka,
            getPathBBox: Z,
            getUrlFromAttr: ja,
            hasMatrixTransform: oa,
            identifyLayers: xb,
            InsertElementCommand: Ia,
            isIdentity: svgedit.math.isIdentity,
            logMatrix: Wa,
            matrixMultiply: ga,
            MoveElementCommand: Ja,
            preventClickDefault: Fb,
            recalculateAllSelectedDimensions: Ea,
            recalculateDimensions: Ra,
            remapElement: Za,
            RemoveElementCommand: Fa,
            removeUnusedDefElems: yb,
            round: ab,
            runExtensions: ib,
            sanitizeSvg: za,
            SVGEditTransformList: svgedit.transformlist.SVGTransformList,
            toString: toString,
            transformBox: svgedit.math.transformBox,
            transformListToTransform: Y,
            transformPoint: N,
            walkTree: svgedit.utilities.walkTree
        }
    }
};
(function() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
    if (!window.methodDraw) window.methodDraw = function(a) {
        function s(d, n) {
            var v = g.setSvgString(d) !== false;
            n = n || a.noop;
            v ? n(true) : a.alert(uiStrings.notification.errorLoadingSVG, function() {
                n(false)
            })
        }
        var g, b = {},
            p = false;
        curConfig = {
            canvas_expansion: 1,
            dimensions: [580, 400],
            initFill: {
                color: "fff",
                opacity: 1
            },
            initStroke: {
                width: 1.5,
                color: "000",
                opacity: 1
            },
            initOpacity: 1,
            imgPath: "images/",
            extPath: "extensions/",
            jGraduatePath: "jgraduate/images/",
            extensions: [],
            initTool: "select",
            wireframe: false,
            colorPickerCSS: false,
            gridSnapping: false,
            gridColor: "#000",
            baseUnit: "px",
            snappingStep: 10,
            showRulers: svgedit.browser.isTouch() ? false : true,
            show_outside_canvas: false,
            no_save_warning: true,
            initFont: "Helvetica, Arial, sans-serif"
        };
        uiStrings = b.uiStrings = {
            common: {
                ok: "OK",
                cancel: "Cancel",
                key_up: "Up",
                key_down: "Down",
                key_backspace: "Backspace",
                key_del: "Del"
            },
            layers: {
                layer: "Layer"
            },
            notification: {
                invalidAttrValGiven: "Invalid value given",
                noContentToFitTo: "No content to fit to",
                dupeLayerName: "There is already a layer named that!",
                enterUniqueLayerName: "Please enter a unique layer name",
                enterNewLayerName: "Please enter the new layer name",
                layerHasThatName: "Layer already has that name",
                QmoveElemsToLayer: 'Move selected elements to layer "%s"?',
                QwantToClear: "<strong>Do you want to clear the drawing?</strong>\nThis will also erase your undo history",
                QwantToOpen: "Do you want to open a new file?\nThis will also erase your undo history",
                QerrorsRevertToSource: "There were parsing errors in your SVG source.\nRevert back to original SVG source?",
                QignoreSourceChanges: "Ignore changes made to SVG source?",
                featNotSupported: "Feature not supported",
                enterNewImgURL: "Enter the new image URL",
                defsFailOnSave: "NOTE: Due to a bug in your browser, this image may appear wrong (missing gradients or elements). It will however appear correct once actually saved.",
                loadingImage: "Loading image, please wait...",
                saveFromBrowser: 'Select "Save As..." in your browser to save this image as a %s file.',
                noteTheseIssues: "Also note the following issues: ",
                unsavedChanges: "There are unsaved changes.",
                enterNewLinkURL: "Enter the new hyperlink URL",
                errorLoadingSVG: "Error: Unable to load SVG data",
                URLloadFail: "Unable to load from URL",
                retrieving: 'Retrieving "%s" ...'
            }
        };
        var w = {},
            c = {};
        b.curConfig = curConfig;
        b.tool_scale = 1;
        b.setConfig = function(d) {
            a.extend(true, curConfig, d);
            if (d.extensions) curConfig.extensions = d.extensions
        };
        b.setCustomHandlers = function(d) {
            b.ready(function() {
                if (d.open) {
                    a('#tool_open > input[type="file"]').remove();
                    a("#tool_open").show();
                    g.open = d.open
                }
                if (d.save) {
                    b.show_save_warning = false;
                    g.bind("saved", d.save)
                }
                d.pngsave && g.bind("exported", d.pngsave);
                c = d
            })
        };
        b.randomizeIds = function() {
            g.randomizeIds(arguments)
        };
        b.init = function() {
            (function() {
                var h = window.opener;
                if (h) try {
                    var m = h.document.createEvent("Event");
                    m.initEvent("methodDrawReady", true, true);
                    h.document.documentElement.dispatchEvent(m)
                } catch (o) {}
            })();
            (function() {
                a("body").toggleClass("touch", svgedit.browser.isTouch());
                var h = a.deparam.querystring(true);
                if (!a.isEmptyObject(h)) {
                    if (h.dimensions) h.dimensions = h.dimensions.split(",");
                    if (h.extensions) h.extensions = h.extensions.split(",");
                    if (h.bkgd_color) h.bkgd_color = "#" + h.bkgd_color;
                    methodDraw.setConfig(h);
                    var m = h.source,
                        o = a.param.querystring();
                    if (!m)
                        if (o.indexOf("source=data:") >= 0) m = o.match(/source=(data:[^&]*)/)[1];
                    if (m)
                        if (m.indexOf("data:") === 0) {
                            m = m.replace(/ /g, "+");
                            b.loadFromDataURI(m)
                        } else b.loadFromString(m);
                    else if (o.indexOf("paramurl=") !== -1) methodDraw.loadFromURL(o.substr(9));
                    else h.url && methodDraw.loadFromURL(h.url)
                }
            })();
            a("#canvas_width").val(curConfig.dimensions[0]);
            a("#canvas_height").val(curConfig.dimensions[1]);
            var d = function() {
                a.each(curConfig.extensions, function() {
                    var h = this;
                    a.getScript(curConfig.extPath + h, function(m) {
                        if (!m) {
                            m = document.createElement("script");
                            m.src = curConfig.extPath + h;
                            document.querySelector("head").appendChild(m)
                        }
                    })
                })
            };
            document.location.protocol === "file:" ? setTimeout(d, 100) :
                d();
            a.svgIcons(curConfig.imgPath + "svg_edit_icons.svg", {
                w: 27,
                h: 27,
                id_match: false,
                no_img: true,
                fallback_path: curConfig.imgPath,
                fallback: {
                    logo: "logo.png",
                    select: "select.png",
                    select_node: "select_node.png",
                    pencil: "pencil.png",
                    pen: "line.png",
                    rect: "square.png",
                    ellipse: "ellipse.png",
                    path: "path.png",
                    text: "text.png",
                    image: "image.png",
                    zoom: "zoom.png",
                    "delete": "delete.png",
                    spapelib: "shapelib.png",
                    node_delete: "node_delete.png",
                    align_left: "align-left.png",
                    align_center: "align-center.png",
                    align_right: "align-right.png",
                    align_top: "align-top.png",
                    align_middle: "align-middle.png",
                    align_bottom: "align-bottom.png",
                    arrow_right: "flyouth.png",
                    arrow_down: "dropdown.gif"
                },
                placement: {
                    "#logo": "logo",
                    "#tool_select": "select",
                    "#tool_fhpath": "pencil",
                    "#tool_line": "pen",
                    "#tool_rect,#tools_rect_show": "rect",
                    "#tool_ellipse,#tools_ellipse_show": "ellipse",
                    "#tool_path": "path",
                    "#tool_text,#layer_rename": "text",
                    "#tool_image": "image",
                    "#tool_zoom": "zoom",
                    "#tool_node_clone": "node_clone",
                    "#tool_node_delete": "node_delete",
                    "#tool_add_subpath": "add_subpath",
                    "#tool_openclose_path": "open_path",
                    "#tool_alignleft, #tool_posleft": "align_left",
                    "#tool_aligncenter, #tool_poscenter": "align_center",
                    "#tool_alignright, #tool_posright": "align_right",
                    "#tool_aligntop, #tool_postop": "align_top",
                    "#tool_alignmiddle, #tool_posmiddle": "align_middle",
                    "#tool_alignbottom, #tool_posbottom": "align_bottom",
                    "#cur_position": "align",
                    "#zoomLabel": "zoom"
                },
                resize: {
                    "#logo .svg_icon": 15,
                    ".flyout_arrow_horiz .svg_icon": 5,
                    "#fill_bg .svg_icon, #stroke_bg .svg_icon": svgedit.browser.isTouch() ?
                        24 : 24,
                    ".palette_item:first .svg_icon": svgedit.browser.isTouch() ? 30 : 16,
                    "#zoomLabel .svg_icon": 16,
                    "#zoom_dropdown .svg_icon": 7
                },
                callback: function() {
                    a(".toolbar_button button > svg, .toolbar_button button > img").each(function() {
                        a(this).parent().prepend(this)
                    });
                    a(".tool_button, .tool_button_current").addClass("loaded");
                    var h = a("#tools_left");
                    if (h.length != 0) {
                        h.offset();
                        h.outerHeight()
                    }
                    a(".tools_flyout").each(function() {
                        var m = a("#" + this.id + "_show"),
                            o = m.attr("data-curopt");
                        if (!m.children("svg, img").length) {
                            o =
                                a(o).children().clone();
                            if (o.length) {
                                o[0].removeAttribute("style");
                                m.append(o)
                            }
                        }
                    });
                    methodDraw.runCallbacks();
                    setTimeout(function() {
                        a(".flyout_arrow_horiz:empty").each(function() {
                            a(this).append(a.getSvgIcon("arrow_right").width(5).height(5))
                        })
                    }, 1)
                }
            });
            a("#rulers").on("dblclick", function(h) {
                a("#base_unit_container").css({
                    top: h.pageY - 10,
                    left: h.pageX - 50,
                    display: "block"
                })
            });
            a("#base_unit_container").on("mouseleave mouseenter", function() {
                t = setTimeout(function() {
                    a("#base_unit_container").fadeOut(500)
                }, 200);
                event.type == "mouseover" && clearTimeout(t)
            });
            a("#base_unit").on("change", function() {
                savePreferences()
            });
            b.canvas = g = new a.SvgCanvas(document.getElementById("svgcanvas"), curConfig);
            b.show_save_warning = false;
            b.paintBox = {
                fill: null,
                stroke: null,
                canvas: null
            };
            d = navigator.platform.indexOf("Mac") >= 0;
            var n = navigator.userAgent.indexOf("AppleWebKit") >= 0,
                v = d ? "meta+" : "ctrl+",
                B = g.pathActions,
                q = g.undoMgr,
                L = svgedit.utilities,
                Q = curConfig.imgPath + "placeholder.svg",
                K = a("#workarea"),
                I = a("#cmenu_canvas"),
                S = null,
                R = 1,
                N = "toolbars",
                ga = "";
            d || a(".shortcut").each(function() {
                var h = a(this).text();
                a(this).text(h.split("\u2318").join("Ctrl+"))
            });
            (function() {
                a("#dialog_container").draggable({
                    cancel: "#dialog_content, #dialog_buttons *",
                    containment: "window"
                });
                var h = a("#dialog_box"),
                    m = a("#dialog_buttons"),
                    o = function(u, E, H, J) {
                        a("#dialog_content").html("<p>" + E.replace(/\n/g, "</p><p>") + "</p>").toggleClass("prompt", u == "prompt");
                        m.empty();
                        var O = a('<input type="button" value="' + uiStrings.common.ok + '">').appendTo(m);
                        u != "alert" && a('<input type="button" value="' +
                            uiStrings.common.cancel + '">').appendTo(m).on("click touchstart", function() {
                            h.hide();
                            H(false)
                        });
                        if (u == "prompt") {
                            var X = a('<input type="text">').prependTo(m);
                            X.val(J || "");
                            X.bind("keydown", "return", function() {
                                O.trigger("click touchstart")
                            })
                        }
                        u == "process" && O.hide();
                        h.show();
                        O.on("click touchstart", function() {
                            h.hide();
                            var ba = u == "prompt" ? X.val() : true;
                            H && H(ba)
                        }).focus();
                        u == "prompt" && X.focus()
                    };
                a.alert = function(u, E) {
                    o("alert", u, E)
                };
                a.confirm = function(u, E) {
                    o("confirm", u, E)
                };
                a.process_cancel = function(u, E) {
                    o("process",
                        u, E)
                };
                a.prompt = function(u, E, H) {
                    o("prompt", u, H, E)
                }
            })();
            var oa = function() {
                    var h = a(".tool_button_current");
                    if (h.length && h[0].id !== "tool_select") {
                        h.removeClass("tool_button_current").addClass("tool_button");
                        a("#tool_select").addClass("tool_button_current").removeClass("tool_button")
                    }
                    g.setMode("select")
                },
                Y = null,
                V = false,
                ea = false,
                Ba = "",
                ja = function(h, m) {
                    var o = g.getResolution(),
                        u = K;
                    a("#svgcanvas").position();
                    if (u = g.setBBoxZoom(m, u.width() - 15, u.height() - 15)) {
                        var E = u.zoom;
                        u = u.bbox;
                        if (E < 0.0010) wa({
                            value: 0.1
                        });
                        else {
                            typeof animatedZoom != "undefined" && h.cancelAnimationFrame(animatedZoom);
                            var H = Date.now(),
                                J = E - o.zoom;
                            a("#zoom");
                            var O = o.zoom,
                                X = function() {
                                    var ba = (Date.now() - H) / 500;
                                    ba = Math.pow(ba - 1, 3) + 1;
                                    g.setZoom(O + J * ba);
                                    G();
                                    if (ba < 1 && ba > -0.9) h.animatedZoom = requestAnimationFrame(X);
                                    else {
                                        a("#zoom").val(parseInt(E * 100));
                                        a("option", "#zoom_select").removeAttr("selected");
                                        a("option[value=" + parseInt(E * 100) + "]", "#zoom_select").attr("selected", "selected")
                                    }
                                };
                            X();
                            g.getMode() == "zoom" && u.width && oa();
                            xb()
                        }
                    }
                };
            a("#cur_context_panel").delegate("a",
                "click",
                function() {
                    var h = a(this);
                    h.attr("data-root") ? g.leaveContext() : g.setContext(h.text());
                    g.clearSelection();
                    return false
                });
            var ca = function() {
                    b.paintBox.fill.prep();
                    b.paintBox.stroke.prep()
                },
                U = {},
                Z = function(h) {
                    a.each(h, function(m, o) {
                        var u = a(m).children(),
                            E = m + "_show",
                            H = a(E),
                            J = false;
                        u.addClass("tool_button").unbind("click mousedown mouseup").each(function(ba) {
                            var T = o[ba];
                            U[T.sel] = T.fn;
                            if (T.isDefault) J = ba;
                            ba = function(fa) {
                                var ha = T;
                                if (fa.type === "keydown") {
                                    var W = a(ha.parent + "_show").hasClass("tool_button_current"),
                                        qa = a(ha.parent + "_show").attr("data-curopt");
                                    a.each(h[T.parent], function(Aa, Ca) {
                                        if (Ca.sel == qa) ha = !fa.shiftKey || !W ? Ca : h[T.parent][Aa + 1] || h[T.parent][0]
                                    })
                                }
                                if (a(this).hasClass("disabled")) return false;
                                ra(E) && ha.fn();
                                var ua = ha.icon ? a.getSvgIcon(ha.icon, true) : a(ha.sel).children().eq(0).clone();
                                ua[0].setAttribute("width", H.width());
                                ua[0].setAttribute("height", H.height());
                                H.children(":not(.flyout_arrow_horiz)").remove();
                                H.append(ua).attr("data-curopt", ha.sel)
                            };
                            a(this).mouseup(ba);
                            T.key && a(document).bind("keydown",
                                T.key[0] + " shift+" + T.key[0], ba)
                        });
                        if (J) H.attr("data-curopt", o[J].sel);
                        else H.attr("data-curopt") || H.attr("data-curopt", o[0].sel);
                        var O, X = a(E).position();
                        a(m).css({
                            left: X.left + 34,
                            top: X.top + 77
                        });
                        H.mousedown(function(ba) {
                            a("#workarea").one("mousedown", function() {
                                a("#tools_shapelib").hide()
                            });
                            a("#tools_shapelib").is(":visible") && ra(E, false);
                            if (H.hasClass("disabled")) return false;
                            var T = a(m),
                                fa = X.left + 34,
                                ha = T.width() * -1,
                                W = T.data("shown_popop") ? 200 : 0;
                            O = setTimeout(function() {
                                H.data("isLibrary") ? T.css("left",
                                    fa).show() : T.css("left", ha).show().animate({
                                    left: fa
                                }, 50);
                                T.data("shown_popop", true)
                            }, W);
                            ba.preventDefault()
                        }).mouseup(function() {
                            clearTimeout(O);
                            var ba = a(this).attr("data-curopt");
                            if (H.data("isLibrary") && a(E.replace("_show", "")).is(":visible")) ra(E, true);
                            else ra(E) && ba in U && U[ba]()
                        })
                    });
                    ma()
                },
                na = function(h, m) {
                    return a("<div>", {
                        "class": "tools_flyout",
                        id: h
                    }).appendTo("#svg_editor").append(m)
                },
                pa = function() {
                    a(".tools_flyout").each(function() {
                        var h = a("#" + this.id + "_show"),
                            m = h.offset();
                        h = h.outerWidth();
                        a(this).css({
                            left: (m.left + h) * R,
                            top: m.top
                        })
                    })
                },
                ma = function() {
                    a(".tools_flyout").each(function() {
                        var h = a("#" + this.id + "_show");
                        if (!h.data("isLibrary")) {
                            var m = [];
                            a(this).children().each(function() {
                                m.push(this.title)
                            });
                            h[0].title = m.join(" / ")
                        }
                    })
                },
                la, ya = function(h, m, o) {
                    var u = null;
                    if (h.indexOf("url(#") === 0) {
                        h = (h = g.getRefElem(h)) ? h.cloneNode(true) : a("#" + o + "_color defs *")[0];
                        u = {
                            alpha: m
                        };
                        u[h.tagName] = h
                    } else u = h.indexOf("#") === 0 ? {
                        alpha: m,
                        solidColor: h.substr(1)
                    } : {
                        alpha: m,
                        solidColor: "none"
                    };
                    return new a.jGraduate.Paint(u)
                },
                za = g.getResolution();
            if (curConfig.baseUnit !== "px") {
                za.w = svgedit.units.convertUnit(za.w) + curConfig.baseUnit;
                za.h = svgedit.units.convertUnit(za.h) + curConfig.baseUnit
            }
            var Ja = function(h) {
                g.createLayer("background");
                cur_shape = g.addSvgElementFromJson({
                    element: "rect",
                    attr: {
                        x: -1,
                        y: -1,
                        width: za.w + 2,
                        height: za.h + 2,
                        stroke: "none",
                        id: "canvas_background",
                        opacity: 1,
                        fill: h || "#fff",
                        style: "pointer-events:none"
                    }
                });
                g.setCurrentLayer("Layer 1");
                g.setCurrentLayerPosition("1")
            };
            document.getElementById("canvas_background") ||
                Ja();
            document.getElementById("canvas_background").getAttribute("fill");
            var Ia = b.setImageURL = function(h) {
                    h || (h = Q);
                    g.setImageURL(h);
                    a("#image_url").val(h)
                },
                Fa = function() {
                    var h = Y;
                    if (h != null && !h.parentNode) h = null;
                    if (V && V[0] != null && !V[0].parentNode) V = false;
                    var m = g.getCurrentDrawing().getCurrentLayerName(),
                        o = g.getMode(),
                        u = curConfig.baseUnit !== "px" ? curConfig.baseUnit : null,
                        E = o == "pathedit";
                    if (E) {
                        a(".context_panel").hide();
                        a("#path_node_panel").show();
                        a("#stroke_panel").hide();
                        m = B.getNodePoint();
                        a("#tool_add_subpath").removeClass("push_button_pressed").addClass("tool_button");
                        a("#tool_node_delete").toggleClass("disabled", !B.canDeleteNodes);
                        zb("#tool_openclose_path", B.closed_subpath ? "open_path" : "close_path");
                        if (m) {
                            E = a("#seg_type");
                            if (u) {
                                m.x = svgedit.units.convertUnit(m.x);
                                m.y = svgedit.units.convertUnit(m.y)
                            }
                            a("#path_node_x").val(Math.round(m.x));
                            a("#path_node_y").val(Math.round(m.y));
                            if (m.type) {
                                E.val(m.type).removeAttr("disabled");
                                a("#seg_type_label").html(m.type == 4 ? "Straight" : "Curve")
                            } else E.val(4).attr("disabled", "disabled")
                        }
                        a("#tools_top").removeClass("multiselected");
                        a("#stroke_panel").hide();
                        a("#canvas_panel").hide()
                    } else {
                        var H = a("#cmenu_canvas li");
                        a(".context_panel").hide();
                        a(".menu_item", "#edit_menu").addClass("disabled");
                        a(".menu_item", "#object_menu").addClass("disabled");
                        if (V) {
                            V = V.filter(Boolean);
                            (h = g.elementsAreSame(V) ? V[0] : null) && a("#tools_top").addClass("multiselected")
                        }
                        if (!h && !V) {
                            a("#tools_top").removeClass("multiselected");
                            a("#stroke_panel").hide();
                            a("#canvas_panel").show()
                        }
                        if (h != null) {
                            a("#stroke_panel").show();
                            var J = h.nodeName,
                                O = g.getRotationAngle(h);
                            a("#angle").val(Math.round(O));
                            O = g.getBlur(h);
                            a("#blur").val(O);
                            if (!E && o != "pathedit") {
                                a("#selected_panel").show();
                                a(".action_selected").removeClass("disabled");
                                var X, ba;
                                if (["g", "polyline", "path"].indexOf(J) >= 0)
                                    if (o = g.getStrokedBBox([h])) {
                                        X = o.x;
                                        ba = o.y
                                    }
                                if (u) {
                                    X = svgedit.units.convertUnit(X);
                                    ba = svgedit.units.convertUnit(ba)
                                }
                                a("#" + J + "_x").val(Math.round(X));
                                a("#" + J + "_y").val(Math.round(ba));
                                if (J === "polyline") {
                                    a("#path_x").val(Math.round(X));
                                    a("#path_y").val(Math.round(ba))
                                }["image", "text", "path", "g", "use"].indexOf(J) ==
                                    -1 && a(".action_path_convert_selected").removeClass("disabled");
                                J === "path" && a(".action_path_selected").removeClass("disabled")
                            }
                            u = null;
                            if (T === "a") {
                                u = g.getHref(h);
                                a("#g_panel").show()
                            }
                            if (h.parentNode.tagName === "a")
                                if (!a(h).siblings().length) {
                                    a("#a_panel").show();
                                    u = g.getHref(h.parentNode)
                                }
                            a("#tool_make_link, #tool_make_link").toggle(!u);
                            u && a("#link_url").val(u);
                            u = {
                                g: [],
                                a: [],
                                rect: ["rx", "width", "height", "x", "y"],
                                image: ["width", "height", "x", "y"],
                                circle: ["cx", "cy", "r"],
                                ellipse: ["cx", "cy", "rx", "ry"],
                                line: ["x1",
                                    "y1", "x2", "y2"
                                ],
                                text: ["x", "y"],
                                use: [],
                                path: []
                            };
                            var T = h.tagName;
                            a(h).data("gsvg") && a("#g_panel").show();
                            if (T == "path" || T == "polyline") a("#path_panel").show();
                            if (u[T]) {
                                u = u[T];
                                a("#" + T + "_panel").show();
                                T == "rect" ? a("#cornerRadiusLabel").show() : a("#cornerRadiusLabel").hide();
                                a.each(u, function(fa, ha) {
                                    var W = h.getAttribute(ha);
                                    if (curConfig.baseUnit !== "px" && h[ha]) W = svgedit.units.convertUnit(h[ha].baseVal.value);
                                    var qa = document.getElementById(T + "_" + ha);
                                    qa.value = Math.round(W) || 0;
                                    qa.getAttribute("data-cursor") ===
                                        "true" && a.fn.dragInput.updateCursor(qa)
                                });
                                if (T == "text") {
                                    u = h.getAttribute("font-family");
                                    document.getElementById("font_family_dropdown").selectedIndex = 3;
                                    a("#text_panel").css("display", "inline");
                                    a("#tool_italic").toggleClass("active", g.getItalic());
                                    a("#tool_bold").toggleClass("active", g.getBold());
                                    a("#font_family").val(u);
                                    a("#font_size").val(h.getAttribute("font-size"));
                                    a("#text").val(h.textContent);
                                    a("#preview_font").text(u.split(",")[0].replace(/'/g, "")).css("font-family", u);
                                    g.addedNew && setTimeout(function() {
                                            a("#text").focus().select()
                                        },
                                        100)
                                } else if (T == "image") Ia(g.getHref(h));
                                else if (T === "g" || T === "use") {
                                    a("#container_panel").show();
                                    a(".action_group_selected").removeClass("disabled");
                                    g.getTitle()
                                }
                            }
                            H[(T === "g" ? "en" : "dis") + "ableContextMenuItems"]("#ungroup");
                            H[(T === "g" || !V ? "dis" : "en") + "ableContextMenuItems"]("#group")
                        }
                        if (V) {
                            a("#multiselected_panel").show();
                            a(".action_multi_selected").removeClass("disabled");
                            H.enableContextMenuItems("#group").disableContextMenuItems("#ungroup")
                        }
                        h || H.disableContextMenuItems("#delete,#cut,#copy,#group,#ungroup,#move_front,#move_up,#move_down,#move_back");
                        q.getUndoStackSize() > 0 ? a("#tool_undo").removeClass("disabled") : a("#tool_undo").addClass("disabled");
                        q.getRedoStackSize() > 0 ? a("#tool_redo").removeClass("disabled") : a("#tool_redo").addClass("disabled");
                        g.addedNew = false;
                        if (h && !E || V) {
                            a("#selLayerNames").removeAttr("disabled").val(m);
                            I.enableContextMenuItems("#delete,#cut,#copy,#move_front,#move_up,#move_down,#move_back")
                        }
                    }
                };
            a("#text").on("focus", function() {});
            a("#text").on("blur", function() {});
            g.bind("selected", function(h, m) {
                var o = g.getMode();
                o === "select" &&
                    oa();
                if (o === "pathedit") return Fa();
                Y = m.length == 1 || m[1] == null ? m[0] : null;
                m = m.filter(Boolean);
                V = m.length >= 2 ? m : false;
                if (g.elementsAreSame(V)) Y = V[0];
                if (Y != null) {
                    a("#multiselected_panel").hide();
                    if (Y != null) switch (Y.tagName) {
                        case "use":
                            a(".context_panel").hide();
                            a("#use_panel").show();
                            break;
                        case "image":
                            a(".context_panel").hide();
                            a("#image_panel").show();
                            break;
                        case "foreignObject":
                            a(".context_panel").hide();
                            break;
                        case "g":
                        case "a":
                            o = null;
                            for (var u = Y.getElementsByTagName("*"), E = 0, H = u.length; E < H; E++) {
                                var J =
                                    u[E].getAttribute("stroke-width");
                                if (E === 0) o = J;
                                else if (o !== J) o = null
                            }
                            a("#stroke_width").val(o === null ? "0" : o);
                            Fa();
                            break;
                        default:
                            a("#stroke_width").val(Y.getAttribute("stroke-width") || 0);
                            o = Y.getAttribute("stroke-dasharray") || "none";
                            a("option", "#stroke_style").removeAttr("selected");
                            a('#stroke_style option[value="' + o + '"]').attr("selected", "selected");
                            a("#stroke_style").trigger("change");
                            a.fn.dragInput.updateCursor(a("#stroke_width")[0]);
                            a.fn.dragInput.updateCursor(a("#blur")[0])
                    }
                    if (Y != null) {
                        o = (Y.getAttribute("opacity") ||
                            1) * 100;
                        a("#group_opacity").val(o);
                        a.fn.dragInput.updateCursor(a("#group_opacity")[0])
                    }
                    V.length && a("#tools_top").addClass("multiselected")
                } else if (V.length) {
                    a(".context_panel").hide();
                    a("#tools_top").removeClass("multiselected");
                    a("#multiselected_panel").show()
                } else {
                    a(".context_panel").hide();
                    a("#canvas_panel").show();
                    a("#tools_top").removeClass("multiselected")
                }
                g.runExtensions("selectedChanged", {
                    elems: m,
                    selectedElement: Y,
                    multiselected: V
                })
            });
            g.bind("transition", function(h, m) {
                var o = g.getMode(),
                    u = m[0];
                if (u) {
                    V = m.length >= 2 && m[1] != null ? m : null;
                    if (!V) switch (o) {
                        case "rotate":
                            o = g.getRotationAngle(u);
                            a("#angle").val(Math.round(o));
                            rotateCursor(o);
                            a("#tool_reorient").toggleClass("disabled", o == 0)
                    }
                    g.runExtensions("elementTransition", {
                        elems: m
                    })
                }
            });
            g.bind("changed", function(h, m) {
                var o = g.getMode();
                o === "select" && oa();
                for (var u = 0; u < m.length; ++u) {
                    var E = m[u];
                    if (E && E.tagName === "svg") G();
                    else if (E && Y && Y.parentNode == null) Y = E
                }
                b.show_save_warning = true;
                Fa();
                if (Y && o === "select") {
                    b.paintBox.fill.update();
                    b.paintBox.stroke.update()
                }
                g.runExtensions("elementChanged", {
                    elems: m
                })
            });
            g.bind("saved", function(h, m) {
                b.show_save_warning = false;
                m = '<?xml version="1.0"?>\n' + m;
                var o = navigator.userAgent;
                if (~o.indexOf("MSIE")) Eb(0, true);
                else {
                    var u = h.open("data:image/svg+xml;base64," + L.encode64(m)),
                        E = a.pref("save_notice_done");
                    if (E !== "all") {
                        var H = uiStrings.notification.saveFromBrowser.replace("%s", "SVG");
                        if (o.indexOf("Gecko/") !== -1)
                            if (m.indexOf("<defs") !== -1) {
                                H += "\n\n" + uiStrings.notification.defsFailOnSave;
                                a.pref("save_notice_done", "all");
                                E = "all"
                            } else a.pref("save_notice_done",
                                "part");
                        else a.pref("save_notice_done", "all");
                        E !== "part" && u.alert(H)
                    }
                }
            });
            g.bind("exported", function(h, m) {
                var o = m.issues;
                a("#export_canvas").length || a("<canvas>", {
                    id: "export_canvas"
                }).hide().appendTo("body");
                var u = a("#export_canvas")[0];
                u.width = g.contentW;
                u.height = g.contentH;
                canvg(u, m.svg, {
                    renderCallback: function() {
                        var E = u.toDataURL("image/png");
                        S.location.href = E;
                        if (a.pref("export_notice_done") !== "all") {
                            E = uiStrings.notification.saveFromBrowser.replace("%s", "PNG");
                            if (o.length) E += "\n\n" + uiStrings.notification.noteTheseIssues +
                                "\n \u2022 " + o.join("\n \u2022 ");
                            a.pref("export_notice_done", "all");
                            S.alert(E)
                        }
                    }
                })
            });
            g.bind("zoomed", ja);
            g.bind("contextset", function(h, m) {
                var o = "";
                if (m) {
                    var u = "";
                    o = '<a href="#" data-root="y">' + g.getCurrentDrawing().getCurrentLayerName() + "</a>";
                    a(m).parentsUntil("#svgcontent > g").andSelf().each(function() {
                        if (this.id) {
                            u += " > " + this.id;
                            o += this !== m ? ' > <a href="#">' + this.id + "</a>" : " > " + this.id
                        }
                    });
                    Ba = u
                } else Ba = null;
                a("#cur_context_panel").toggle(!!m).html(o)
            });
            g.bind("extension_added", function(h, m) {
                function o() {
                    if (la) {
                        clearTimeout(la);
                        la = null
                    }
                    E || (la = setTimeout(function() {
                        E = true;
                        Mb(w.iconsize)
                    }, 50))
                }
                var u = false,
                    E = false,
                    H = true,
                    J = function() {
                        if (m.callback && !u && H) {
                            u = true;
                            m.callback()
                        }
                    },
                    O = [];
                m.context_tools && a.each(m.context_tools, function(ha, W) {
                    var qa = W.container_id ? ' id="' + W.container_id + '"' : "",
                        ua = a("#" + W.panel);
                    ua.length || (ua = a("<div>", {
                        id: W.panel
                    }).appendTo("#tools_top").hide());
                    switch (W.type) {
                        case "tool_button":
                            var Aa = '<div class="tool_button">' + W.id + "</div>",
                                Ca = a(Aa).appendTo(ua);
                            W.events && a.each(W.events, function(Na, jb) {
                                a(Ca).bind(Na,
                                    jb)
                            });
                            break;
                        case "select":
                            Aa = "<label" + qa + '><select id="' + W.id + '">';
                            a.each(W.options, function(Na, jb) {
                                Aa += '<option value="' + Na + '"' + (Na == W.defval ? " selected" : "") + ">" + jb + "</option>"
                            });
                            Aa += "</select></label>";
                            var Pa = a(Aa).appendTo(ua).find("select");
                            a.each(W.events, function(Na, jb) {
                                a(Pa).bind(Na, jb)
                            });
                            break;
                        case "button-select":
                            Aa = '<div id="' + W.id + '" class="dropdown toolset" title="' + W.title + '"><div id="cur_' + W.id + '" class="icon_label"></div><button></button></div>';
                            qa = a('<ul id="' + W.id + '_opts"></ul>').appendTo("#option_lists");
                            W.colnum && qa.addClass("optcols" + W.colnum);
                            a(Aa).appendTo(ua).children();
                            O.push({
                                elem: "#" + W.id,
                                list: "#" + W.id + "_opts",
                                title: W.title,
                                callback: W.events.change,
                                cur: "#cur_" + W.id
                            });
                            break;
                        case "input":
                            Aa = "<label" + qa + '><span id="' + W.id + '_label">' + W.label + ':</span><input id="' + W.id + '" title="' + W.title + '" size="' + (W.size || "4") + '" value="' + (W.defval || "") + '" type="text"/></label>';
                            var Qa = a(Aa).appendTo(ua).find("input");
                            W.spindata && Qa.SpinButton(W.spindata);
                            W.events && a.each(W.events, function(Na, jb) {
                                Qa.bind(Na,
                                    jb)
                            })
                    }
                });
                if (m.buttons) {
                    var X = {},
                        ba = {},
                        T = m.svgicons,
                        fa = {};
                    a.each(m.buttons, function(ha, W) {
                        for (var qa, ua = W.id, Aa = ha; a("#" + ua).length;) ua = W.id + "_" + ++Aa;
                        if (T) {
                            X[ua] = W.icon;
                            Aa = W.svgicon ? W.svgicon : W.id;
                            if (W.type == "app_menu") ba["#" + ua + " > div"] = Aa;
                            else ba["#" + ua] = Aa
                        } else qa = W.type == "menu" ? "" : a('<img src="' + W.icon + '">');
                        var Ca, Pa;
                        switch (W.type) {
                            case "mode_flyout":
                            case "mode":
                                Ca = "tool_button";
                                if (W.cls) Ca += " " + W.cls;
                                Pa = "#tools_left";
                                break;
                            case "context":
                                Ca = "tool_button";
                                Pa = "#" + W.panel;
                                a(Pa).length || a("<div>", {
                                    id: W.panel
                                }).appendTo("#tools_top");
                                break;
                            case "menu":
                                Ca = "menu_item tool_button";
                                Pa = "#" + (W.after || W.panel);
                                break;
                            case "app_menu":
                                Ca = "";
                                Pa = W.parent || "#main_menu ul";
                                a(Pa).length || a("<div>", {
                                    id: W.panel
                                }).appendTo("#tools_top")
                        }
                        var Qa = a(W.list || W.type == "app_menu" ? "<li/>" : "<div/>").attr("id", ua).attr("title", W.title).addClass(Ca);
                        if (!W.includeWith && !W.list) {
                            if ("position" in W) a(Pa).children().eq(W.position).before(Qa);
                            else W.type != "menu" || !W.after ? Qa.appendTo(Pa) : a(Pa).after(Qa);
                            if (W.type == "mode_flyout") {
                                Aa =
                                    a(Qa);
                                Ca = Aa.parent();
                                if (!Aa.parent().hasClass("tools_flyout")) {
                                    var Na = Aa[0].id.replace("tool_", "tools_"),
                                        jb = Aa.clone().attr("id", Na + "_show").append(a("<div>", {
                                            "class": "flyout_arrow_horiz"
                                        }));
                                    Aa.before(jb);
                                    Ca = na(Na, Aa);
                                    Ca.data("isLibrary", true);
                                    jb.data("isLibrary", true)
                                }
                                ba["#" + Na + "_show"] = W.id;
                                ua = fa["#" + Ca[0].id] = [{
                                    sel: "#" + ua,
                                    fn: W.events.click,
                                    icon: W.id,
                                    isDefault: true
                                }, ub]
                            } else if (W.type == "app_menu" || W.type == "menu") Qa.append(W.title)
                        } else if (W.list) {
                            Qa.addClass("push_button");
                            a("#" + W.list + "_opts").append(Qa);
                            if (W.isDefault) {
                                a("#cur_" + W.list).append(Qa.children().clone());
                                Aa = W.svgicon ? W.svgicon : W.id;
                                ba["#cur_" + W.list] = Aa
                            }
                        } else if (W.includeWith) {
                            Pa = W.includeWith;
                            Aa = a(Pa.button);
                            Ca = Aa.parent();
                            if (!Aa.parent().hasClass("tools_flyout")) {
                                Na = Aa[0].id.replace("tool_", "tools_");
                                jb = Aa.clone().attr("id", Na + "_show").append(a("<div>", {
                                    "class": "flyout_arrow_horiz"
                                }));
                                Aa.before(jb);
                                Ca = na(Na, Aa)
                            }
                            var ub = C.getButtonData(Pa.button);
                            if (Pa.isDefault) ba["#" + Na + "_show"] = W.id;
                            ua = fa["#" + Ca[0].id] = [{
                                sel: "#" + ua,
                                fn: W.events.click,
                                icon: W.id,
                                key: W.key,
                                isDefault: W.includeWith ? W.includeWith.isDefault : 0
                            }, ub];
                            Na = "position" in Pa ? Pa.position : "last";
                            ub = Ca.children().length;
                            if (!isNaN(Na) && Na >= 0 && Na < ub) Ca.children().eq(Na).before(Qa);
                            else {
                                Ca.append(Qa);
                                ua.reverse()
                            }
                        }
                        T || Qa.append(qa);
                        W.list || a.each(W.events, function(Cb, Jb) {
                            if (Cb == "click")
                                if (W.type == "mode") {
                                    W.includeWith ? Qa.bind(Cb, Jb) : Qa.bind(Cb, function() {
                                        ra(Qa) && Jb()
                                    });
                                    if (W.key) {
                                        a(document).bind("keydown", W.key, Jb);
                                        W.title && Qa.attr("title", W.title + " [" + W.key + "]")
                                    }
                                } else Qa.bind(Cb, Jb);
                            else Qa.bind(Cb, Jb)
                        });
                        Z(fa)
                    });
                    a.each(O, function() {
                        vb(this.elem, this.list, this.callback, {
                            seticon: true
                        })
                    });
                    if (T) H = false;
                    a.svgIcons(T, {
                        w: 27,
                        h: 27,
                        id_match: false,
                        no_img: !n,
                        fallback: X,
                        placement: ba,
                        callback: function() {
                            w.iconsize && w.iconsize != "m" && o();
                            H = true;
                            J()
                        }
                    })
                }
                J()
            });
            g.textActions.setInputElem(a("#text")[0]);
            var Ma = '<div class="palette_item transparent" data-rgb="none"></div>\t\t\t\t\t\t\t\t<div class="palette_item black" data-rgb="#000000"></div>\t\t\t\t\t\t\t\t<div class="palette_item white" data-rgb="#ffffff"></div>';
            ["#444444", "#482816", "#422C10", "#3B2F0E", "#32320F", "#293414", "#1F361B", "#153723", "#0C372C", "#083734", "#0E353B", "#1A333F", "#273141", "#332D40", "#3E2A3C", "#462735", "#4B252D", "#4D2425", "#4C261D", "#666666", "#845335", "#7B572D", "#6F5C2A", "#62612C", "#546433", "#46673D", "#396849", "#306856", "#2D6862", "#33666C", "#426373", "#535F75", "#645A73", "#74556D", "#805064", "#884D58", "#8B4D4B", "#894F3F", "#999999", "#C48157", "#B8874D", "#A98E49", "#97944B", "#849854", "#729C62", "#619E73", "#559E84", "#529D94", "#5B9BA2", "#6D97AB",
                "#8391AE", "#9A8AAB", "#AF84A3", "#BF7E96", "#C97A86", "#CE7975", "#CC7C65", "#BBBBBB", "#FFB27C", "#FABA6F", "#E6C36A", "#CFCA6D", "#B8D078", "#A0D58A", "#8CD79F", "#7DD8B5", "#7AD6CA", "#84D3DB", "#9ACEE6", "#B6C7EA", "#D3BEE7", "#EDB6DC", "#FFAFCC", "#FFAAB8", "#FFA9A2", "#FFAC8D", "#DDDDDD", "#FFE7A2", "#FFF093", "#FFFA8D", "#FFFF91", "#EEFF9F", "#D1FFB4", "#B9FFCE", "#A8FFE9", "#A4FFFF", "#B1FFFF", "#CBFFFF", "#EDFFFF", "#FFF5FF", "#FFEBFF", "#FFE2FF", "#FFDCEC", "#FFDBD2", "#FFDFB8"
            ].forEach(function(h) {
                Ma += '<div class="palette_item" style="background-color: ' +
                    h + ';" data-rgb="' + h + '"></div>'
            });
            a("#palette").append(Ma);
            var Da = a("#tool_angle_indicator");
            a("#tool_reorient");
            rotateCursor = function(h) {
                h = "rotate(" + h + "deg)";
                Da.css({
                    "-webkit-transform": h,
                    "-moz-transform": h,
                    "-o-transform": h,
                    "-ms-transform": h,
                    transform: h
                })
            };
            var wa = function(h) {
                var m = h.value / 100;
                if (m < 0.0010) h.value = 0.1;
                else {
                    h = g.getZoom();
                    var o = K;
                    ja(window, {
                        width: 0,
                        height: 0,
                        x: (o[0].scrollLeft + o.width() / 2) / h,
                        y: (o[0].scrollTop + o.height() / 2) / h,
                        zoom: m
                    }, true)
                }
            };
            a("#stroke_style").change(function() {
                g.setStrokeAttr("stroke-dasharray",
                    a(this).val());
                a("#stroke_style_label").html(this.options[this.selectedIndex].text);
                window.opera && a("<p/>").hide().appendTo("body").remove()
            });
            a("#seg_type").change(function() {
                g.setSegType(a(this).val());
                a("#seg_type_label").html(this.options[this.selectedIndex].text)
            });
            a("select").change(function() {
                a(this).blur()
            });
            a("#font_family").change(function() {
                g.setFontFamily(this.value)
            });
            a("#text").keyup(function() {
                g.setTextContent(this.value)
            });
            changeAttribute = function(h) {
                var m = h.getAttribute("data-attr"),
                    o = h.getAttribute("data-multiplier") || 1;
                o = parseFloat(o);
                o = h.value * o;
                if (!svgedit.units.isValidUnit(m, o, Y)) {
                    a.alert(uiStrings.notification.invalidAttrValGiven);
                    h.value = Y.getAttribute(m);
                    return false
                }
                g.changeSelectedAttributeNoUndo(m, o)
            };
            picking = false;
            a(document).on("mouseup", function() {
                picking = false
            });
            a("#palette").on("mousemove mousedown touchstart touchmove", ".palette_item", function(h) {
                h.preventDefault();
                if (h.type == "mousedown") picking = true;
                if (picking) {
                    var m = a("#tool_stroke").hasClass("active"),
                        o = m ?
                        "stroke" : "fill",
                        u = a(this).attr("data-rgb"),
                        E = null,
                        H = true;
                    if (h.type == "mousedown") H = false;
                    if (u === "transparent" || u === "initial" || u === "#none") {
                        u = "none";
                        E = new a.jGraduate.Paint
                    } else E = new a.jGraduate.Paint({
                        alpha: 100,
                        solidColor: u.substr(1)
                    });
                    b.paintBox[o].setPaint(E);
                    if (m) {
                        g.setColor("stroke", u, H);
                        u != "none" && g.getStrokeOpacity() != 1 && g.setPaintOpacity("stroke", 1)
                    } else {
                        g.setColor("fill", u, H);
                        u != "none" && g.getFillOpacity() != 1 && g.setPaintOpacity("fill", 1)
                    }
                }
            }).bind("contextmenu", function(h) {
                h.preventDefault()
            });
            a("#toggle_stroke_tools").toggle(function() {
                a(".stroke_tool").css("display", "table-cell");
                a(this).addClass("expanded");
                Db()
            }, function() {
                a(".stroke_tool").css("display", "none");
                a(this).removeClass("expanded");
                Db()
            });
            var ra = function(h, m) {
                if (a(h).hasClass("disabled")) return false;
                if (a(h).parent().hasClass("tools_flyout")) return true;
                var o = o || "normal";
                m || a(".tools_flyout").fadeOut(o);
                a("#styleoverrides").text("");
                a(".tool_button_current").removeClass("tool_button_current").addClass("tool_button");
                a(h).addClass("tool_button_current").removeClass("tool_button");
                return true
            };
            (function() {
                var h = null,
                    m = null,
                    o = K[0],
                    u = false,
                    E = false;
                a("#svgcanvas").on("mousemove mouseup touchend", function(H) {
                    if (u !== false) {
                        o.scrollLeft -= H.clientX - h;
                        o.scrollTop -= H.clientY - m;
                        h = H.clientX;
                        m = H.clientY;
                        if (H.type === "mouseup" || H.type === "touchend") u = false;
                        return false
                    }
                }).on("mousedown touchmove", function(H) {
                    if (H.button === 1 || E === true || H.originalEvent.touches && H.originalEvent.touches.length >= 2) {
                        u = true;
                        h = H.clientX;
                        m = H.clientY;
                        return false
                    }
                });
                a(window).mouseup(function() {
                    u = false
                });
                a(document).bind("keydown",
                    "space",
                    function(H) {
                        H.preventDefault();
                        g.spaceKey = E = true
                    }).bind("keyup", "space", function(H) {
                    H.preventDefault();
                    g.spaceKey = E = false
                }).bind("keydown", "alt", function() {
                    g.getMode() === "zoom" && K.addClass("out")
                }).bind("keyup", "alt", function() {
                    g.getMode() === "zoom" && K.removeClass("out")
                })
            })();
            var va = a(".menu"),
                kb = function(h) {
                    h.target.style.background = "#fff";
                    setTimeout(function() {
                        h.target.style.background = "#ddd"
                    }, 50);
                    setTimeout(function() {
                        h.target.style.background = "#fff"
                    }, 150);
                    setTimeout(function() {
                        h.target.style.background =
                            "#ddd"
                    }, 200);
                    setTimeout(function() {
                        h.target.style.background = ""
                    }, 200);
                    setTimeout(function() {
                        a("#menu_bar").removeClass("active")
                    }, 220);
                    return false
                };
            a(".menu_item").on("mousedown touchstart", function(h) {
                kb(h)
            });
            a("svg, body").on("mousedown  touchstart", function(h) {
                if (!(h.target.nodeName && h.target.nodeName.toLowerCase() === "input"))
                    if (!a(h.target).hasClass("menu_title") && !a(h.target).parent().hasClass("menu_title")) !a(h.target).hasClass("disabled") && a(h.target).hasClass("menu_item") ? kb(h) : a("#menu_bar").removeClass("active")
            });
            a("#workarea").on("mousewheel", function(h, m, o, u) {
                if (h.altKey) {
                    h.preventDefault();
                    zoom = parseInt(a("#zoom").val());
                    a("#zoom").val(parseInt(zoom + u * 10)).change()
                }
            });
            a(".menu_title").on("mousedown", function() {
                a("#tools_shapelib").hide();
                a("#menu_bar").toggleClass("active");
                va.removeClass("open");
                a(this).parent().addClass("open")
            }).on("mouseover", function() {
                va.removeClass("open");
                a(this).parent().addClass("open")
            });
            b.addDropDown = function(h, m, o) {
                if (a(h).length != 0) {
                    var u = a(h).find("button"),
                        E = a(h).find("ul").attr("id",
                            a(h)[0].id + "-list");
                    o || a("#option_lists").append(E);
                    var H = false;
                    o && a(h).addClass("dropup");
                    E.find("li").bind("mouseup", m);
                    a(window).mouseup(function() {
                        if (!H) {
                            u.removeClass("down");
                            E.hide()
                        }
                        H = false
                    });
                    u.bind("mousedown", function() {
                        if (u.hasClass("down")) {
                            u.removeClass("down");
                            E.hide()
                        } else {
                            u.addClass("down");
                            if (!o) {
                                var J = a(h).offset();
                                E.css({
                                    top: J.top,
                                    left: J.left - 110
                                })
                            }
                            E.show();
                            H = true
                        }
                    }).hover(function() {
                        H = true
                    }).mouseout(function() {
                        H = false
                    })
                }
            };
            var vb = function(h, m, o, u) {
                var E = a(h);
                m = a(m);
                var H = false,
                    J = u.dropUp;
                J && a(h).addClass("dropup");
                m.find("li").bind("mouseup", function() {
                    if (u.seticon) {
                        zb("#cur_" + E[0].id, a(this).children());
                        a(this).addClass("current").siblings().removeClass("current")
                    }
                    o.apply(this, arguments)
                });
                a(window).mouseup(function() {
                    if (!H) {
                        E.removeClass("down");
                        m.hide();
                        m.css({
                            top: 0,
                            left: 0
                        })
                    }
                    H = false
                });
                m.height();
                a(h).bind("mousedown", function() {
                    var O = a(h).offset();
                    if (J) {
                        O.top -= m.height();
                        O.left += 8
                    } else O.top += a(h).height();
                    a(m).offset(O);
                    if (E.hasClass("down")) {
                        E.removeClass("down");
                        m.hide();
                        m.css({
                            top: 0,
                            left: 0
                        })
                    } else {
                        E.addClass("down");
                        m.show();
                        H = true;
                        return false
                    }
                }).hover(function() {
                    H = true
                }).mouseout(function() {
                    H = false
                });
                u.multiclick && m.mousedown(function() {
                    H = true
                })
            };
            a("#font_family_dropdown").change(function() {
                var h = this.options[this.selectedIndex].value,
                    m = this.options[this.selectedIndex].text;
                a("#preview_font").html(m).css("font-family", h);
                a("#font_family").val(h).change()
            });
            a("div", "#position_opts").each(function() {
                this.addEventListener("mouseup", function() {
                    var h = this.id.replace("tool_pos",
                        "").charAt(0);
                    g.alignSelectedElements(h, "page")
                })
            });
            (function() {
                var h, m = function() {
                    a(h).blur()
                };
                a("#svg_editor").find("button, select, input:not(#text)").focus(function() {
                    h = this;
                    N = "toolbars";
                    K.mousedown(m)
                }).blur(function() {
                    N = "canvas";
                    K.unbind("mousedown", m);
                    g.getMode() == "textedit" && a("#text").focus()
                })
            })();
            var cb = function() {
                    ra("#tool_select") && g.setMode("select")
                },
                Ta = function() {
                    ra("#tool_fhpath") && g.setMode("fhpath")
                },
                Va = function() {
                    ra("#tool_line") && g.setMode("line")
                },
                Ga = function() {
                    ra("#tool_rect") &&
                        g.setMode("rect")
                },
                ta = function() {
                    ra("#tool_ellipse") && g.setMode("ellipse")
                },
                $a = function() {
                    ra("#tool_image") && g.setMode("image")
                },
                Ka = function() {
                    ra("#tool_zoom") && g.setMode("zoom")
                },
                Sa = function() {
                    if (ra("#tool_zoom")) {
                        yb();
                        oa()
                    }
                },
                Ha = function() {
                    ra("#tool_text") && g.setMode("text")
                },
                db = function() {
                    ra("#tool_path") && g.setMode("path")
                },
                lb = function() {
                    if (Y != null || V) g.deleteSelectedElements();
                    B.getNodePoint() && B.deletePathNode()
                },
                Ua = function() {
                    if (Y != null || V) {
                        xa(a("#edit_menu"));
                        g.cutSelectedElements()
                    }
                },
                Xa = function() {
                    if (Y !=
                        null || V) {
                        xa(a("#edit_menu"));
                        g.copySelectedElements()
                    }
                },
                wb = function() {
                    xa(a("#edit_menu"));
                    var h = g.getZoom(),
                        m = (K[0].scrollLeft + K.width() / 2) / h - g.contentW;
                    h = (K[0].scrollTop + K.height() / 2) / h - g.contentH;
                    g.pasteElements("point", m, h)
                },
                sa = function() {
                    if (Y != null) {
                        xa(a("#object_menu"));
                        g.moveToTopSelectedElement()
                    }
                },
                hb = function() {
                    if (Y != null) {
                        xa(a("#object_menu"));
                        g.moveToBottomSelectedElement()
                    }
                },
                eb = function() {
                    if (Y != null) {
                        xa(a("#object_menu"));
                        g.moveUpDownSelected("Up")
                    }
                },
                sb = function() {
                    if (Y != null) {
                        xa(a("#object_menu"));
                        g.moveUpDownSelected("Down")
                    }
                },
                ib = function(h) {
                    if (Y != null) {
                        xa(a("#object_menu"));
                        g.moveUpDownSelected(h)
                    }
                },
                ab = function() {
                    if (Y != null) {
                        g.convertToPath();
                        var h = g.getSelectedElems();
                        g.selectorManager.requestSelector(h[0]).reset(h[0]);
                        g.selectorManager.requestSelector(h[0]).selectorRect.setAttribute("display", "none");
                        g.setMode("pathedit");
                        B.toEditMode(h[0]);
                        g.clearSelection();
                        Fa()
                    }
                },
                ob = function() {
                    Y != null && B.reorient()
                },
                pb = function() {
                    if (Y != null || V) a.prompt(uiStrings.notification.enterNewLinkURL, "http://",
                        function(h) {
                            h && g.makeHyperlink(h)
                        })
                },
                fb = function(h, m) {
                    if (Y != null || V) {
                        if (curConfig.gridSnapping) {
                            var o = g.getZoom() * curConfig.snappingStep;
                            h *= o;
                            m *= o
                        }
                        a("input").blur();
                        g.moveSelectedElements(h, m)
                    }
                },
                tb = function() {},
                ia = function() {
                    B.getNodePoint() && B.clonePathNode()
                },
                aa = function() {
                    B.getNodePoint() && B.deletePathNode()
                },
                ka = function() {
                    var h = a("#tool_add_subpath"),
                        m = !h.hasClass("push_button_pressed");
                    m ? h.addClass("push_button_pressed").removeClass("tool_button") : h.removeClass("push_button_pressed").addClass("tool_button");
                    B.addSubPath(m)
                },
                M = function() {
                    B.opencloseSubPath()
                },
                P = function() {
                    g.cycleElement(1)
                },
                da = function() {
                    g.cycleElement(0)
                },
                Ea = function(h, m) {
                    if (!(Y == null || V)) {
                        h || (m *= -1);
                        var o = a("#angle").val() * 1 + m;
                        g.setRotationAngle(o);
                        Fa()
                    }
                },
                Oa = function() {
                    var h = curConfig.dimensions;
                    a.confirm(uiStrings.notification.QwantToClear, function(m) {
                        if (m) {
                            oa();
                            g.clear();
                            g.setResolution(h[0], h[1]);
                            G(true);
                            yb();
                            Fa();
                            ca();
                            g.runExtensions("onNewDocument")
                        }
                    })
                },
                Wa = function() {
                    g.setBold(!g.getBold());
                    Fa()
                },
                Za = function() {
                    g.setItalic(!g.getItalic());
                    Fa()
                },
                nb = function() {
                    if (!c.pngsave) {
                        var h = uiStrings.notification.loadingImage;
                        S = window.open("data:text/html;charset=utf-8,<title>" + h + "</title><h1>" + h + "</h1>")
                    }
                    window.canvg ? g.rasterExport() : a.getScript("canvg/rgbcolor.js", function() {
                        a.getScript("canvg/canvg.js", function() {
                            g.rasterExport()
                        })
                    })
                },
                Ra = function() {
                    g.open()
                },
                mb = function() {},
                xa = function(h) {
                    var m = h.prev();
                    m.css({
                        background: "white",
                        color: "black"
                    });
                    setTimeout(function() {
                        m.removeAttr("style")
                    }, 200)
                },
                qb = function() {
                    if (q.getUndoStackSize() > 0) {
                        xa(a("#edit_menu"));
                        q.undo()
                    }
                },
                rb = function() {
                    if (q.getRedoStackSize() > 0) {
                        xa(a("#edit_menu"));
                        q.redo()
                    }
                },
                Bb = function() {
                    if (V) {
                        xa(a("#object_menu"));
                        g.groupSelectedElements()
                    } else if (Y) {
                        xa(a("#object_menu"));
                        g.ungroupSelectedElement()
                    }
                },
                Fb = function() {
                    xa(a("#edit_menu"));
                    g.cloneSelectedElements(20, 20)
                },
                bb = function() {
                    var h = this.id.replace("tool_align", "").charAt(0);
                    g.alignSelectedElements(h, a("#align_relative_to").val())
                },
                La = function() {
                    var h = document.querySelector("#tool_stroke rect");
                    a("#tool_stroke").toggleClass("active");
                    a("#tool_fill").toggleClass("active");
                    var m = document.querySelector("#tool_fill rect"),
                        o = m.getAttribute("fill"),
                        u = h.getAttribute("fill");
                    h = parseFloat(h.getAttribute("stroke-opacity"));
                    if (isNaN(h)) h = 100;
                    m = parseFloat(m.getAttribute("fill-opacity"));
                    if (isNaN(m)) m = 100;
                    u = ya(u, h, "stroke");
                    o = ya(o, m, "fill");
                    b.paintBox.fill.setPaint(u, true);
                    b.paintBox.stroke.setPaint(o, true)
                },
                yb = function(h) {
                    var m = g.getResolution();
                    h = h ? m.zoom * h : 1;
                    a("#zoom").val(h * 100);
                    g.setZoom(h);
                    xb();
                    G(true)
                },
                Hb = function() {
                    xa(a("#view_menu"));
                    !a("#tool_wireframe").hasClass("push_button_pressed") ? a("#tool_wireframe").addClass("push_button_pressed") : a("#tool_wireframe").removeClass("push_button_pressed");
                    K.toggleClass("wireframe");
                    if (!k) {
                        var h = a("#wireframe_rules");
                        h.length ? h.empty() : a('<style id="wireframe_rules"></style>').appendTo("head");
                        xb()
                    }
                },
                Gb = function() {
                    xa(a("#view_menu"));
                    var h = !a("#tool_snap").hasClass("push_button_pressed");
                    h ? a("#tool_snap").addClass("push_button_pressed") : a("#tool_snap").removeClass("push_button_pressed");
                    curConfig.gridSnapping =
                        h
                },
                Ib = function() {
                    window.self != window.top && top.exit_fullscreen()
                },
                Lb = function() {
                    xa(a("#view_menu"));
                    if (a("#tool_rulers").hasClass("push_button_pressed")) {
                        a("#tool_rulers").removeClass("push_button_pressed");
                        a("#show_rulers").attr("checked", false);
                        curConfig.showRulers = false
                    } else {
                        a("#tool_rulers").addClass("push_button_pressed");
                        a("#show_rulers").attr("checked", true);
                        curConfig.showRulers = true
                    }
                    a("#rulers").toggle(!!curConfig.showRulers)
                },
                xb = function() {
                    if (!k) {
                        var h = "#workarea.wireframe #svgcontent * { stroke-width: " +
                            1 / g.getZoom() + "px; }";
                        a("#wireframe_rules").text(K.hasClass("wireframe") ? h : "")
                    }
                },
                Eb = function(h, m) {
                    if (!ea) {
                        xa(a("#view_menu"));
                        ea = true;
                        a("#save_output_btns").toggle(!!m);
                        a("#tool_source_back").toggle(!m);
                        var o = ga = g.getSvgString();
                        a("#svg_source_textarea").val(o);
                        a("#svg_source_editor").fadeIn();
                        a("#svg_source_textarea").focus().select()
                    }
                },
                Kb = function() {
                    if (ea) {
                        if (g.setSvgString(a("#svg_source_textarea").val())) {
                            g.clearSelection();
                            Ya();
                            yb();
                            ca()
                        } else a.confirm(uiStrings.notification.QerrorsRevertToSource,
                            function(h) {
                                if (!h) return false;
                                g.clearSelection();
                                Ya();
                                yb();
                                ca()
                            });
                        oa()
                    }
                },
                zb = b.setIcon = function(h, m) {
                    var o = typeof m === "string" ? a.getSvgIcon(m, true) : m.clone();
                    o ? a(h).find("img").replaceWith(o) : console.log("NOTE: Icon image missing: " + m)
                },
                gb;
            gb = function() {
                var h = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                    m = document.getElementsByTagName("script")[0],
                    o;
                for (o in m.style)
                    if (h.test(o)) return o.match(h)[0];
                if ("WebkitOpacity" in m.style) return "Webkit";
                if ("KhtmlOpacity" in m.style) return "Khtml";
                return ""
            }();
            var Nb =
                function(h, m) {
                    gb.toLowerCase();
                    var o = ["top", "left", "bottom", "right"];
                    h.each(function() {
                        for (var u = a(this), E = u.outerWidth() * (m - 1), H = u.outerHeight() * (m - 1), J = 0; J < 4; J++) {
                            var O = o[J],
                                X = u.data("orig_margin-" + O);
                            if (X == null) {
                                X = parseInt(u.css("margin-" + O));
                                u.data("orig_margin-" + O, X)
                            }
                            X = X * m;
                            if (O === "right") X += E;
                            else if (O === "bottom") X += H;
                            u.css("margin-" + O, X)
                        }
                    })
                },
                Mb = b.setIconSize = function(h, m) {
                    if (!(h == w.size && !m)) {
                        var o = a("#tools_top .toolset, #editor_panel > *, #history_panel > *,\t\t\t\t#main_button, #tools_left > *, #path_node_panel > *, #multiselected_panel > *,\t\t\t\t#g_panel > *, #tool_font_size > *, .tools_flyout"),
                            u = 1;
                        u = typeof h == "number" ? h : {
                            s: 0.75,
                            m: 1,
                            l: 1.25,
                            xl: 1.5
                        }[h];
                        b.tool_scale = R = u;
                        pa();
                        var E = o.parents(":hidden");
                        E.css("visibility", "hidden").show();
                        Nb(o, u);
                        E.css("visibility", "visible").hide();
                        o = a("#tool_size_rules");
                        if (o.length) o.empty();
                        else o = a('<style id="tool_size_rules"></style>').appendTo("head");
                        if (h != "m") {
                            var H = "";
                            a.each(cssResizeRules, function(J, O) {
                                J = "#svg_editor " + J.replace(/,/g, ", #svg_editor");
                                H += J + "{";
                                a.each(O, function(X, ba) {
                                    if (typeof ba === "number") var T = ba * u + "px";
                                    else if (ba[h] || ba.all) T =
                                        ba[h] || ba.all;
                                    H += X + ":" + T + ";"
                                });
                                H += "}"
                            });
                            E = "-" + gb.toLowerCase() + "-";
                            H += "#tools_top .toolset, #editor_panel > *, #history_panel > *,\t\t\t\t#main_button, #tools_left > *, #path_node_panel > *, #multiselected_panel > *,\t\t\t\t#g_panel > *, #tool_font_size > *, .tools_flyout{" + E + "transform: scale(" + u + ");} #svg_editor div.toolset .toolset {" + E + "transform: scale(1); margin: 1px !important;} #svg_editor .ui-slider {" + E + "transform: scale(" + 1 / u + ");}";
                            o.text(H)
                        }
                        pa()
                    }
                },
                Ab = function() {
                    a("#dialog_box").hide();
                    if (ea) {
                        if (ea) ga !== a("#svg_source_textarea").val() ? a.confirm(uiStrings.notification.QignoreSourceChanges, function(h) {
                            h && Ya()
                        }) : Ya();
                        Db()
                    } else Ba && g.leaveContext()
                },
                Ya = function() {
                    a("#svg_source_editor").hide();
                    ea = false;
                    a("#svg_source_textarea").blur()
                };
            a(window).width();
            a(window).height();
            var Db = a.noop;
            a(window).resize(function() {
                G()
            });
            (function() {
                K.scroll(function() {
                    if (a("#ruler_x").length != 0) a("#ruler_x")[0].scrollLeft = K[0].scrollLeft;
                    if (a("#ruler_y").length != 0) a("#ruler_y")[0].scrollTop = K[0].scrollTop
                })
            })();
            a("#url_notice").click(function() {
                a.alert(this.title)
            });
            a("#change_image_url").click(function() {
                var h = g.getHref(Y);
                h = h.indexOf("data:") === 0 ? "" : h;
                a.prompt(uiStrings.notification.enterNewImgURL, h, function(m) {
                    m && Ia(m)
                })
            });
            var e = function(h) {
                var m = h[0].id == "stroke_color" ? "stroke" : "fill",
                    o = h[0].id == "canvas_color";
                if (o) m = "canvas";
                var u = b.paintBox[m].paint;
                h = m == "stroke" ? "Pick a Stroke Paint and Opacity" : "Pick a Fill Paint and Opacity";
                o = o ? {
                    right: 175,
                    top: 50
                } : {
                    left: 50,
                    bottom: 50
                };
                a("#color_picker").draggable({
                    cancel: ".jGraduate_tabs, .jGraduate_colPick, .jGraduate_gradPick, .jPicker",
                    containment: "window"
                }).removeAttr("style").css(o).jGraduate({
                    paint: u,
                    window: {
                        pickerTitle: h
                    },
                    images: {
                        clientPath: curConfig.jGraduatePath
                    },
                    newstop: "inverse"
                }, function(E) {
                    u = new a.jGraduate.Paint(E);
                    b.paintBox[m].setPaint(u);
                    g.setPaint(m, u);
                    a("#color_picker").hide()
                }, function() {
                    a("#color_picker").hide()
                })
            };
            d = function(h, m) {
                var o = document.getElementById("canvas_background"),
                    u = {
                        color: "fff",
                        opacity: 1
                    };
                if (m == "stroke") u = curConfig.initStroke;
                if (m == "fill") u = curConfig.initFill;
                if (m == "canvas" && o)
                    if (o = o.getAttribute("fill").match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) u = {
                        color: ("0" + parseInt(o[1], 10).toString(16)).slice(-2) + ("0" + parseInt(o[2], 10).toString(16)).slice(-2) + ("0" + parseInt(o[3], 10).toString(16)).slice(-2),
                        opacity: 1
                    };
                o = (new DOMParser).parseFromString('<svg xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%"\t\t\t\t\tfill="#' + u.color + '" opacity="' + u.opacity + '"/>\t\t\t\t\t<defs><linearGradient id="gradbox_"/></defs></svg>', "text/xml").documentElement;
                o = a(h)[0].appendChild(document.importNode(o, true));
                m === "canvas" ? o.setAttribute("width", 60.5) :
                    o.setAttribute("width", "100%");
                this.rect = o.firstChild;
                this.defs = o.getElementsByTagName("defs")[0];
                this.grad = this.defs.firstChild;
                this.paint = new a.jGraduate.Paint({
                    solidColor: u.color
                });
                this.type = m;
                this.setPaint = function(E, H) {
                    this.paint = E;
                    var J = "none",
                        O = E.type,
                        X = E.alpha / 100;
                    switch (O) {
                        case "solidColor":
                            J = E[O] == "none" || E[O] == "one" ? "none" : "#" + E[O];
                            break;
                        case "linearGradient":
                        case "radialGradient":
                            this.defs.removeChild(this.grad);
                            this.grad = this.defs.appendChild(E[O]);
                            J = "url(#" + (this.grad.id = "gradbox_" +
                                this.type) + ")"
                    }
                    this.rect.setAttribute("fill", J);
                    this.rect.setAttribute("opacity", X);
                    if (this.type == "canvas")
                        if (O = document.getElementById("canvas_background")) {
                            za = g.getResolution();
                            O.setAttribute("x", -1);
                            O.setAttribute("y", -1);
                            O.setAttribute("width", za.w + 2);
                            O.setAttribute("height", za.h + 2);
                            J.indexOf("url") == -1 && O.setAttribute("fill", J)
                        } else Ja(J);
                    if (H) {
                        g.setColor(this.type, J, true);
                        g.setPaintOpacity(this.type, X, true)
                    }
                };
                this.update = function(E) {
                    if (Y) {
                        var H = this.type;
                        switch (Y.tagName) {
                            case "use":
                            case "image":
                            case "foreignObject":
                                return;
                            case "g":
                            case "a":
                                for (var J = null, O = Y.getElementsByTagName("*"), X = 0, ba = O.length; X < ba; X++) {
                                    var T = O[X].getAttribute(H);
                                    if (X === 0) J = T;
                                    else if (J !== T) {
                                        J = null;
                                        break
                                    }
                                }
                                if (J === null) {
                                    O = null;
                                    return
                                }
                                O = J;
                                J = 1;
                                break;
                            default:
                                J = parseFloat(Y.getAttribute(H + "-opacity"));
                                if (isNaN(J)) J = 1;
                                O = H === "fill" ? "black" : "none";
                                O = Y.getAttribute(H) || O
                        }
                        if (E) {
                            g.setColor(H, O, true);
                            g.setPaintOpacity(H, J, true)
                        }
                        J *= 100;
                        this.setPaint(ya(O, J, H))
                    }
                };
                this.prep = function() {
                    switch (this.paint.type) {
                        case "linearGradient":
                        case "radialGradient":
                            var E =
                                new a.jGraduate.Paint({
                                    copy: this.paint
                                });
                            g.setPaint(m, E)
                    }
                }
            };
            b.paintBox.fill = new d("#fill_color", "fill");
            b.paintBox.stroke = new d("#stroke_color", "stroke");
            b.paintBox.canvas = new d("#canvas_color", "canvas");
            a("#stroke_width").val(curConfig.initStroke.width);
            a("#group_opacity").val(curConfig.initOpacity * 100);
            d = b.paintBox.fill.rect.cloneNode(false);
            d.setAttribute("style", "vector-effect:non-scaling-stroke");
            var k = d.style.vectorEffect === "non-scaling-stroke";
            d.removeAttribute("style");
            d = b.paintBox.fill.rect.ownerDocument.createElementNS("http://www.w3.org/2000/svg",
                "feGaussianBlur");
            typeof d.stdDeviationX === "undefined" && a("#tool_blur").hide();
            a(d).remove();
            setTimeout(function() {
                g.embedImage("images/placeholder.svg", function(h) {
                    if (!h) {
                        a("#image_save_opts [value=embed]").attr("disabled", "disabled");
                        a("#image_save_opts input").val(["ref"]);
                        w.img_save = "ref";
                        a("#image_opt_embed").css("color", "#666").attr("title", uiStrings.notification.featNotSupported)
                    }
                })
            }, 1E3);
            a("#tool_fill").click(function() {
                if (a("#tool_fill").hasClass("active")) e(a("#fill_color"));
                else {
                    a("#tool_fill").addClass("active");
                    a("#tool_stroke").removeClass("active")
                }
            });
            a("#tool_stroke").on("click", function() {
                if (a("#tool_stroke").hasClass("active")) e(a("#stroke_color"));
                else {
                    a("#tool_stroke").addClass("active");
                    a("#tool_fill").removeClass("active")
                }
            });
            a("#tool_canvas").on("click touchstart", function() {
                e(a("#canvas_color"))
            });
            a("#tool_stroke").on("touchstart", function() {
                a("#tool_stroke").addClass("active");
                a("#tool_fill").removeClass("active");
                e(a("#stroke_color"))
            });
            a("#tool_fill").on("touchstart", function() {
                a("#tool_fill").addClass("active");
                a("#tool_stroke").removeClass("active");
                e(a("#fill_color"))
            });
            a("#zoom_select").on("change", function() {
                var h = this.options[this.selectedIndex].text;
                h = h.split("%")[0];
                a("#zoom").val(h).trigger("change")
            });
            a(".push_button").mousedown(function() {
                a(this).hasClass("disabled") || a(this).addClass("push_button_pressed").removeClass("push_button")
            }).mouseout(function() {
                a(this).removeClass("push_button_pressed").addClass("push_button")
            }).mouseup(function() {
                a(this).removeClass("push_button_pressed").addClass("push_button")
            });
            a(window).bind("load resize", function() {
                K.css("line-height", K.height() + "px")
            });
            var l = function() {
                var h = a("#canvas_width"),
                    m = a("#canvas_height"),
                    o = h.val(),
                    u = m.val();
                if (o != "fit" && !svgedit.units.isValidUnit("width", o)) {
                    a.alert(uiStrings.notification.invalidAttrValGiven);
                    h.parent().addClass("error");
                    return false
                }
                h.parent().removeClass("error");
                if (u != "fit" && !svgedit.units.isValidUnit("height", u)) {
                    a.alert(uiStrings.notification.invalidAttrValGiven);
                    m.parent().addClass("error");
                    return false
                }
                m.parent().removeClass("error");
                if (!g.setResolution(o, u)) {
                    a.alert(uiStrings.notification.noContentToFitTo);
                    o = g.getResolution();
                    h.val(o.w);
                    m.val(o.h);
                    return false
                }
                G()
            };
            a("#resolution").change(function() {
                var h = a("#canvas_width")[0],
                    m = a("#canvas_height")[0];
                if (this.selectedIndex)
                    if (this.value == "content") {
                        h.value = "fit";
                        m.value = "fit";
                        l();
                        var o = g.getResolution();
                        h.value = o.w;
                        m.value = o.h
                    } else {
                        var u = this.value.split("x");
                        u[0] = parseInt(u[0]);
                        u[1] = parseInt(u[1]);
                        var E = u[0] - h.value,
                            H = u[1] - m.value,
                            J = Date.now(),
                            O = function() {
                                var X = (Date.now() -
                                    J) / 1E3;
                                X = Math.pow(X - 1, 3) + 1;
                                h.value = (u[0] - E + X * E).toFixed(0);
                                m.value = (u[1] - H + X * H).toFixed(0);
                                l();
                                if (X >= 1) {
                                    X = g.getResolution();
                                    a("#canvas_width").val(X.w.toFixed());
                                    a("#canvas_height").val(X.h.toFixed());
                                    a("#resolution_label").html("<div class='pull'>" + X.w + "<span>\u00d7</span></br>" + X.h + "</div>")
                                } else requestAnimationFrame(O)
                            };
                        O()
                    } else {
                    a("#resolution_label").html("Custom");
                    h.removeAttribute("readonly");
                    h.focus();
                    h.select();
                    if (h.value == "fit") {
                        h.value = 100;
                        m.value = 100
                    }
                }
            });
            a("#zoom").change(function() {
                wa(this)
            });
            a("input,select").attr("autocomplete", "off");
            var C = function() {
                var h = [{
                        sel: "#tool_select",
                        fn: cb,
                        evt: "click",
                        key: ["V", true]
                    }, {
                        sel: "#tool_fhpath",
                        fn: Ta,
                        evt: "click",
                        key: ["Q", true]
                    }, {
                        sel: "#tool_line",
                        fn: Va,
                        evt: "click",
                        key: ["L", true]
                    }, {
                        sel: "#tool_rect",
                        fn: Ga,
                        evt: "click",
                        key: ["R", true],
                        icon: "rect"
                    }, {
                        sel: "#tool_ellipse",
                        fn: ta,
                        evt: "mouseup",
                        key: ["C", true],
                        icon: "ellipse"
                    }, {
                        sel: "#tool_path",
                        fn: db,
                        evt: "click",
                        key: ["P", true]
                    }, {
                        sel: "#tool_text",
                        fn: Ha,
                        evt: "click",
                        key: ["T", true]
                    }, {
                        sel: "#tool_image",
                        fn: $a,
                        evt: "mouseup"
                    }, {
                        sel: "#tool_zoom",
                        fn: Ka,
                        evt: "mouseup",
                        key: ["Z", true]
                    }, {
                        sel: "#tool_clear",
                        fn: Oa,
                        evt: "mouseup",
                        key: [v + "N", true]
                    }, {
                        sel: "#tool_save",
                        fn: function() {
                            if (ea) Kb();
                            else {
                                xa(a("#file_menu"));
                                g.save({
                                    images: w.img_save,
                                    round_digits: 6
                                })
                            }
                        },
                        evt: "mouseup",
                        key: [v + "S", true]
                    }, {
                        sel: "#tool_export",
                        fn: nb,
                        evt: "mouseup"
                    }, {
                        sel: "#tool_open",
                        fn: Ra,
                        evt: "mouseup"
                    }, {
                        sel: "#tool_import",
                        fn: mb,
                        evt: "mouseup"
                    }, {
                        sel: "#tool_source",
                        fn: Eb,
                        evt: "click",
                        key: [v + "U", true]
                    }, {
                        sel: "#tool_wireframe",
                        fn: Hb,
                        evt: "click"
                    }, {
                        sel: "#tool_snap",
                        fn: Gb,
                        evt: "click"
                    }, {
                        sel: "#tool_rulers",
                        fn: Lb,
                        evt: "click"
                    }, {
                        sel: "#tool_source_cancel,#svg_source_overlay,#tool_docprops_cancel,#tool_prefs_cancel",
                        fn: Ab,
                        evt: "click",
                        key: ["esc", false, false],
                        hidekey: true
                    }, {
                        sel: "#tool_source_save",
                        fn: Kb,
                        evt: "click"
                    }, {
                        sel: "#tool_delete,#tool_delete_multi",
                        fn: lb,
                        evt: "click",
                        key: ["del/backspace", true]
                    }, {
                        sel: "#tool_reorient",
                        fn: ob,
                        evt: "click"
                    }, {
                        sel: "#tool_node_link",
                        fn: tb,
                        evt: "change"
                    }, {
                        sel: "#tool_node_clone",
                        fn: ia,
                        evt: "click"
                    }, {
                        sel: "#tool_node_delete",
                        fn: aa,
                        evt: "click"
                    }, {
                        sel: "#tool_openclose_path",
                        fn: M,
                        evt: "click"
                    }, {
                        sel: "#tool_add_subpath",
                        fn: ka,
                        evt: "click"
                    }, {
                        sel: "#tool_move_top",
                        fn: sa,
                        evt: "click",
                        key: v + "shift+up"
                    }, {
                        sel: "#tool_move_bottom",
                        fn: hb,
                        evt: "click",
                        key: v + "shift+down"
                    }, {
                        sel: "#tool_move_up",
                        fn: eb,
                        evt: "click",
                        key: [v + "up", true]
                    }, {
                        sel: "#tool_move_down",
                        fn: sb,
                        evt: "click",
                        key: [v + "down", true]
                    }, {
                        sel: "#tool_topath",
                        fn: ab,
                        evt: "click"
                    }, {
                        sel: "#tool_make_link,#tool_make_link_multi",
                        fn: pb,
                        evt: "click"
                    }, {
                        sel: "#tool_clone,#tool_clone_multi",
                        fn: Fb,
                        evt: "click",
                        key: [v + "D", true]
                    }, {
                        sel: "#tool_group",
                        fn: Bb,
                        evt: "click",
                        key: [v + "G", true]
                    }, {
                        sel: "#tool_ungroup",
                        fn: Bb,
                        evt: "click",
                        key: v + "shift+G"
                    }, {
                        sel: "#tool_unlink_use",
                        fn: Bb,
                        evt: "click"
                    }, {
                        sel: "[id^=tool_align]",
                        fn: bb,
                        evt: "click"
                    }, {
                        sel: "#tool_undo",
                        fn: qb,
                        evt: "click",
                        key: v + "z"
                    }, {
                        sel: "#tool_redo",
                        fn: rb,
                        evt: "click",
                        key: ["y", true]
                    }, {
                        sel: "#tool_cut",
                        fn: Ua,
                        evt: "click",
                        key: [v + "x", true]
                    }, {
                        sel: "#tool_copy",
                        fn: Xa,
                        evt: "click",
                        key: v + "c"
                    }, {
                        sel: "#tool_paste",
                        fn: wb,
                        evt: "click",
                        key: v + "v"
                    }, {
                        sel: "#tool_switch",
                        fn: La,
                        evt: "click",
                        key: ["x", true]
                    }, {
                        sel: "#tool_bold",
                        fn: Wa,
                        evt: "mousedown",
                        key: [v + "B", true]
                    }, {
                        sel: "#tool_italic",
                        fn: Za,
                        evt: "mousedown",
                        key: [v + "I", true]
                    }, {
                        sel: "#copy_save_done",
                        fn: Ab,
                        evt: "click"
                    }, {
                        key: "ctrl+left",
                        fn: function() {
                            Ea(0, 1)
                        }
                    }, {
                        key: "ctrl+right",
                        fn: function() {
                            Ea(1, 1)
                        }
                    }, {
                        key: "ctrl+shift+left",
                        fn: function() {
                            Ea(0, 5)
                        }
                    }, {
                        key: "ctrl+shift+right",
                        fn: function() {
                            Ea(1, 5)
                        }
                    }, {
                        key: "shift+O",
                        fn: da
                    }, {
                        key: "shift+P",
                        fn: P
                    }, {
                        key: [v + "+", true],
                        fn: function() {
                            yb(2)
                        }
                    }, {
                        key: [v + "-", true],
                        fn: function() {
                            yb(0.5)
                        }
                    }, {
                        key: ["up", true],
                        fn: function() {
                            fb(0, -1)
                        }
                    }, {
                        key: ["down", true],
                        fn: function() {
                            fb(0,
                                1)
                        }
                    }, {
                        key: ["left", true],
                        fn: function() {
                            fb(-1, 0)
                        }
                    }, {
                        key: ["right", true],
                        fn: function() {
                            fb(1, 0)
                        }
                    }, {
                        key: "shift+up",
                        fn: function() {
                            fb(0, -10)
                        }
                    }, {
                        key: "shift+down",
                        fn: function() {
                            fb(0, 10)
                        }
                    }, {
                        key: "shift+left",
                        fn: function() {
                            fb(-10, 0)
                        }
                    }, {
                        key: "shift+right",
                        fn: function() {
                            fb(10, 0)
                        }
                    }, {
                        key: ["alt+up", true],
                        fn: function() {
                            g.cloneSelectedElements(0, -1)
                        }
                    }, {
                        key: ["alt+down", true],
                        fn: function() {
                            g.cloneSelectedElements(0, 1)
                        }
                    }, {
                        key: ["alt+left", true],
                        fn: function() {
                            g.cloneSelectedElements(-1, 0)
                        }
                    }, {
                        key: ["alt+right", true],
                        fn: function() {
                            g.cloneSelectedElements(1,
                                0)
                        }
                    }, {
                        key: ["alt+shift+up", true],
                        fn: function() {
                            g.cloneSelectedElements(0, -10)
                        }
                    }, {
                        key: ["alt+shift+down", true],
                        fn: function() {
                            g.cloneSelectedElements(0, 10)
                        }
                    }, {
                        key: ["alt+shift+left", true],
                        fn: function() {
                            g.cloneSelectedElements(-10, 0)
                        }
                    }, {
                        key: ["alt+shift+right", true],
                        fn: function() {
                            g.cloneSelectedElements(10, 0)
                        }
                    }, {
                        key: v + "A",
                        fn: function() {
                            g.selectAllInCurrentLayer()
                        }
                    }, {
                        key: "I",
                        fn: function() {
                            var o = a(".tool_button_current");
                            if (o.length && o[0].id !== "tool_eyedropper") {
                                o.removeClass("tool_button_current").addClass("tool_button");
                                a("#tool_eyedropper").addClass("tool_button_current").removeClass("tool_button")
                            }
                            g.setMode("eyedropper")
                        }
                    }, {
                        key: v + "shift+z",
                        fn: rb
                    }, {
                        key: "esc",
                        fn: Ib
                    }],
                    m = {
                        "4/Shift+4": "#tools_rect_show",
                        "5/Shift+5": "#tools_ellipse_show"
                    };
                return {
                    setAll: function() {
                        var o = {};
                        a.each(h, function(u, E) {
                            if (E.sel) {
                                var H = a(E.sel);
                                if (H.length == 0) return true;
                                if (E.evt) {
                                    if (svgedit.browser.isTouch() && E.evt === "click") E.evt = "mousedown";
                                    H[E.evt](E.fn)
                                }
                                if (E.parent && a(E.parent + "_show").length != 0) {
                                    var J = a(E.parent);
                                    J.length || (J = na(E.parent.substr(1)));
                                    J.append(H);
                                    a.isArray(o[E.parent]) || (o[E.parent] = []);
                                    o[E.parent].push(E)
                                }
                            }
                            if (E.key) {
                                var O = E.fn,
                                    X = false;
                                if (a.isArray(E.key)) {
                                    J = E.key[0];
                                    if (E.key.length > 1) X = E.key[1]
                                } else J = E.key;
                                J += "";
                                svgedit.browser.isMac && J.indexOf("+") != -1 && J.split("+")[0] == "ctrl" && J.replace("ctrl", "cmd");
                                a.each(J.split("/"), function(T, fa) {
                                    a(document).bind("keydown", fa, function(ha) {
                                        O();
                                        X && ha.preventDefault();
                                        return false
                                    })
                                });
                                if (E.sel && !E.hidekey && H.attr("title")) {
                                    var ba = H.attr("title").split("[")[0] + " (" + J + ")";
                                    m[J] = E.sel;
                                    H.parents("#main_menu").length ||
                                        H.attr("title", ba)
                                }
                            }
                        });
                        Z(o);
                        a(window).bind("keydown", "tab", function(u) {
                            if (N === "canvas") {
                                u.preventDefault();
                                P()
                            }
                        }).bind("keydown", "shift+tab", function(u) {
                            if (N === "canvas") {
                                u.preventDefault();
                                da()
                            }
                        });
                        a("#tool_zoom").dblclick(Sa)
                    },
                    setTitles: function() {
                        a.each(m, function(o, u) {
                            var E = a(u).parents("#main_menu").length;
                            a(u).each(function() {
                                var H = E ? a(this).text().split(" [")[0] : this.title.split(" [")[0],
                                    J = "";
                                a.each(o.split("/"), function(O, X) {
                                    var ba = X.split("+"),
                                        T = "";
                                    if (ba.length > 1) {
                                        T = ba[0] + "+";
                                        X = ba[1]
                                    }
                                    J += (O ?
                                        "/" : "") + T + (uiStrings["key_" + X] || X)
                                });
                                if (E) this.lastChild.textContent = H + " [" + J + "]";
                                else this.title = H + " [" + J + "]"
                            })
                        })
                    },
                    getButtonData: function(o) {
                        var u;
                        a.each(h, function(E, H) {
                            if (H.sel === o) u = H
                        });
                        return u
                    }
                }
            }();
            C.setAll();
            b.ready(function() {
                var h = curConfig.initTool,
                    m = a("#tools_left, #svg_editor .tools_flyout"),
                    o = m.find("#tool_" + h);
                h = m.find("#" + h);
                (o.length ? o : h.length ? h : a("#tool_select")).click().mouseup();
                curConfig.wireframe && a("#tool_wireframe").click();
                curConfig.showlayers && toggleSidePanel();
                a("#rulers").toggle(!!curConfig.showRulers)
            });
            a("#canvas_height").dragInput({
                min: 10,
                max: null,
                step: 10,
                callback: l,
                cursor: false,
                dragAdjust: 0.1
            });
            a("#canvas_width").dragInput({
                min: 10,
                max: null,
                step: 10,
                callback: l,
                cursor: false,
                dragAdjust: 0.1
            });
            a("#rect_width").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#rect_height").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#ellipse_cx").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#ellipse_cy").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#ellipse_rx").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#ellipse_ry").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#image_height").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#circle_cx").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#circle_cy").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#circle_r").dragInput({
                min: 1,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#image_height").dragInput({
                min: 0,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#selected_x").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#selected_y").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#path_node_x").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#path_node_y").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#image_width").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#line_x1").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#line_x2").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#line_y1").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#line_y2").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#path_x").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#path_y").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#rect_x").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#rect_y").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#g_x").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#g_y").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#image_x").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#text_y").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#text_x").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#image_y").dragInput({
                min: null,
                max: null,
                step: 1,
                callback: changeAttribute,
                cursor: false
            });
            a("#rect_rx").dragInput({
                min: 0,
                max: 100,
                step: 1,
                callback: changeAttribute,
                cursor: true
            });
            a("#stroke_width").dragInput({
                min: 0,
                max: 99,
                step: 1,
                callback: function(h) {
                    var m = h.value;
                    if (m == 0 &&
                        Y && ["line", "polyline"].indexOf(Y.nodeName) >= 0) m = h.value = 1;
                    g.setStrokeWidth(m)
                },
                cursor: true,
                smallStep: 0.1,
                start: 1.5
            });
            a("#angle").dragInput({
                min: -180,
                max: 180,
                step: 1,
                callback: function(h) {
                    g.setRotationAngle(h.value, true);
                    rotateCursor(h.value);
                    a("#tool_reorient").toggleClass("disabled", h.value == 0)
                },
                cursor: false,
                dragAdjust: 0.5
            });
            a("#font_size").dragInput({
                min: 1,
                max: 250,
                step: 1,
                callback: function(h) {
                    g.setFontSize(h.value)
                },
                cursor: true,
                stepfunc: function(h, m) {
                    var o = h.value - 0,
                        u = o + m,
                        E = u >= o;
                    if (m === 0) return o;
                    return o >= 24 ? E ? Math.round(o * 1.1) : Math.round(o / 1.1) : o <= 1 ? E ? o * 2 : o / 2 : u
                },
                dragAdjust: 0.15
            });
            a("#group_opacity").dragInput({
                min: 0,
                max: 100,
                step: 5,
                callback: changeAttribute,
                cursor: true,
                start: 100
            });
            a("#blur").dragInput({
                min: 0,
                max: 10,
                step: 0.1,
                callback: function(h, m) {
                    val = h.value;
                    a("#blur").val(val);
                    m ? g.setBlur(val, true) : g.setBlurNoUndo(val)
                },
                cursor: true,
                start: 0
            });
            a("#zoom").val(g.getZoom() * 100);
            a("#workarea").contextMenu({
                menu: "cmenu_canvas",
                inSpeed: 0
            }, function(h) {
                switch (h) {
                    case "delete":
                        lb();
                        break;
                    case "cut":
                        Ua();
                        break;
                    case "copy":
                        Xa();
                        break;
                    case "paste":
                        g.pasteElements();
                        break;
                    case "paste_in_place":
                        g.pasteElements("in_place");
                        break;
                    case "group":
                        g.groupSelectedElements();
                        break;
                    case "ungroup":
                        g.ungroupSelectedElement();
                        break;
                    case "move_front":
                        sa();
                        break;
                    case "move_up":
                        ib("Up");
                        break;
                    case "move_down":
                        ib("Down");
                        break;
                    case "move_back":
                        hb();
                        break;
                    default:
                        svgedit.contextmenu && svgedit.contextmenu.hasCustomHandler(h) && svgedit.contextmenu.getCustomHandler(h).call()
                }
            });
            a(".contextMenu li").mousedown(function(h) {
                h.preventDefault()
            });
            a("#cmenu_canvas li").disableContextMenu();
            I.enableContextMenuItems("#delete,#cut,#copy");
            window.onbeforeunload = function() {
                if (q.getUndoStackSize() === 0) b.show_save_warning = false;
                if (!curConfig.no_save_warning && b.show_save_warning) return uiStrings.notification.unsavedChanges
            };
            b.openPrep = function(h) {
                a("#main_menu").hide();
                q.getUndoStackSize() === 0 ? h(true) : a.confirm(uiStrings.notification.QwantToOpen, h)
            };
            if (window.FileReader) {
                d = function(h) {
                    h.stopPropagation();
                    h.preventDefault();
                    a("#workarea").removeAttr("style");
                    a("#main_menu").hide();
                    var m = null;
                    if (m = h.type == "drop" ? h.dataTransfer.files[0] : this.files[0])
                        if (m.type.indexOf("image") != -1)
                            if (m.type.indexOf("svg") != -1) {
                                h = new FileReader;
                                h.onloadend = function(o) {
                                    g.importSvgString(o.target.result, true);
                                    g.ungroupSelectedElement();
                                    g.ungroupSelectedElement();
                                    g.groupSelectedElements();
                                    g.alignSelectedElements("m", "page");
                                    g.alignSelectedElements("c", "page")
                                };
                                h.readAsText(m)
                            } else {
                                h = new FileReader;
                                h.onloadend = function(o) {
                                    insertNewImage = function(J, O) {
                                        var X = g.addSvgElementFromJson({
                                            element: "image",
                                            attr: {
                                                x: 0,
                                                y: 0,
                                                width: J,
                                                height: O,
                                                id: g.getNextId(),
                                                style: "pointer-events:inherit"
                                            }
                                        });
                                        g.setHref(X, o.target.result);
                                        g.selectOnly([X]);
                                        g.alignSelectedElements("m", "page");
                                        g.alignSelectedElements("c", "page");
                                        Fa()
                                    };
                                    var u = 100,
                                        E = 100,
                                        H = new Image;
                                    H.src = o.target.result;
                                    document.body.appendChild(H);
                                    H.onload = function() {
                                        u = H.offsetWidth;
                                        E = H.offsetHeight;
                                        insertNewImage(u, E);
                                        document.body.removeChild(H)
                                    }
                                };
                                h.readAsDataURL(m)
                            }
                };
                K = a("#workarea");
                K[0].addEventListener("dragenter", function(h) {
                    h.stopPropagation();
                    h.preventDefault();
                    K.css({
                        "-webkit-transform": "scale3d(1.1,1.1,1)",
                        "-moz-transform": "scale3d(1.1,1.1,1)",
                        "-o-transform": "scale(1.1)",
                        "-ms-transform": "scale3d(1.1,1.1,1)",
                        transform: "scale3d(1.1,1.1,1)"
                    })
                }, false);
                K[0].addEventListener("dragover", function(h) {
                    h.stopPropagation();
                    h.preventDefault()
                }, false);
                K[0].addEventListener("dragleave", function(h) {
                    K.removeAttr("style");
                    h.stopPropagation();
                    h.preventDefault()
                }, false);
                K[0].addEventListener("drop", d, false);
                var A = a('<input type="file">').change(function() {
                    var h = this;
                    b.openPrep(function(m) {
                        if (m) {
                            g.clear();
                            if (h.files.length == 1) {
                                m = new FileReader;
                                m.onloadend = function(o) {
                                    s(o.target.result);
                                    G()
                                };
                                m.readAsText(h.files[0])
                            }
                        }
                    })
                });
                a("#tool_open").show().prepend(A);
                d = a('<input type="file">').change(d);
                a("#tool_import").show().prepend(d)
            }
            var G = b.updateCanvas = function(h, m) {
                    var o = K.width(),
                        u = K.height(),
                        E = o,
                        H = u,
                        J = g.getZoom(),
                        O = K,
                        X = a("#svgcanvas"),
                        ba = {
                            x: O[0].scrollLeft + E / 2,
                            y: O[0].scrollTop + H / 2
                        },
                        T = curConfig.canvas_expansion;
                    o = Math.max(E, g.contentW * J * T);
                    u = Math.max(H, g.contentH * J * T);
                    o == E && u == H ? K.css("overflow", "hidden") :
                        K.css("overflow", "scroll");
                    T = X.height() / 2;
                    var fa = X.width() / 2;
                    X.width(o).height(u);
                    var ha = u / 2,
                        W = o / 2,
                        qa = g.updateCanvas(o, u),
                        ua = W / fa;
                    o = o / 2 - E / 2;
                    u = u / 2 - H / 2;
                    if (m) {
                        m.x += qa.x;
                        m.y += qa.y
                    } else m = {
                        x: W + (ba.x - fa) * ua,
                        y: ha + (ba.y - T) * ua
                    };
                    if (h)
                        if (g.contentW > O.width()) {
                            K[0].scrollLeft = qa.x - 10;
                            K[0].scrollTop = qa.y - 10
                        } else {
                            O[0].scrollLeft = o;
                            O[0].scrollTop = u
                        } else {
                        O[0].scrollLeft = m.x - E / 2;
                        O[0].scrollTop = m.y - H / 2
                    }
                    if (curConfig.showRulers) {
                        E = X;
                        J = J;
                        document.getElementById("workarea");
                        document.getElementById("title_show");
                        J || (J =
                            g.getZoom());
                        E || (E = a("#svgcanvas"));
                        H = g.getContentElem();
                        O = svgedit.units.getTypeMap()[curConfig.baseUnit];
                        for (X = 0; X < 2; X++) {
                            fa = (ba = X === 0) ? "x" : "y";
                            ua = ba ? "width" : "height";
                            T = H.getAttribute(fa) - 0;
                            fa = a("#ruler_" + fa + " canvas:first");
                            $hcanv = fa.clone();
                            fa.replaceWith($hcanv);
                            o = $hcanv[0];
                            ha = fa = E[ua]() * 2;
                            o.parentNode.style[ua] = ha + "px";
                            W = 0;
                            var Aa;
                            qa = o.getContext("2d");
                            qa.fillStyle = "rgb(200,0,0)";
                            qa.fillRect(0, 0, o.width, o.height);
                            $hcanv.siblings().remove();
                            if (fa >= 3E4) {
                                var Ca = parseInt(fa / 3E4) + 1;
                                Aa = Array(Ca);
                                Aa[0] =
                                    qa;
                                for (u = 1; u < Ca; u++) {
                                    o[ua] = 3E4;
                                    var Pa = o.cloneNode(true);
                                    o.parentNode.appendChild(Pa);
                                    Aa[u] = Pa.getContext("2d")
                                }
                                Pa[ua] = fa % 3E4;
                                fa = 3E4
                            }
                            o[ua] = fa;
                            ua = O * J;
                            var Qa = 50 / ua;
                            o = 1;
                            for (u = 0; u < D.length; u++) {
                                o = Ca = D[u];
                                if (Qa <= Ca) break
                            }
                            Qa = o * ua;
                            qa.font = "normal 9px 'Lucida Grande', sans-serif";
                            qa.fillStyle = "#777";
                            for (var Na = T / ua % o * ua, jb = Na - Qa; Na < ha; Na += Qa) {
                                jb += Qa;
                                u = Math.round(Na) + 0.5;
                                if (ba) {
                                    qa.moveTo(u, 15);
                                    qa.lineTo(u, 0)
                                } else {
                                    qa.moveTo(15, u);
                                    qa.lineTo(0, u)
                                }
                                Ca = (jb - T) / ua;
                                if (o >= 1) u = Math.round(Ca);
                                else {
                                    u = (o + "").split(".")[1].length;
                                    u = Ca.toFixed(u) - 0
                                }
                                if (u !== 0 && u !== 1E3 && u % 1E3 === 0) u = u / 1E3 + "K";
                                if (ba) {
                                    qa.fillText(u, Na + 2, 8);
                                    qa.fillStyle = "#777"
                                } else {
                                    Ca = (u + "").split("");
                                    for (u = 0; u < Ca.length; u++) {
                                        qa.fillText(Ca[u], 1, Na + 9 + u * 9);
                                        qa.fillStyle = "#777"
                                    }
                                }
                                Ca = Qa / 10;
                                for (u = 1; u < 10; u++) {
                                    var ub = Math.round(Na + Ca * u) + 0.5;
                                    if (Aa && ub > fa) {
                                        W++;
                                        qa.stroke();
                                        if (W >= Aa.length) {
                                            u = 10;
                                            Na = ha;
                                            continue
                                        }
                                        qa = Aa[W];
                                        Na -= 3E4;
                                        ub = Math.round(Na + Ca * u) + 0.5
                                    }
                                    var Cb = u % 2 ? 12 : 10;
                                    if (ba) {
                                        qa.moveTo(ub, 15);
                                        qa.lineTo(ub, Cb)
                                    } else {
                                        qa.moveTo(15, ub);
                                        qa.lineTo(Cb, ub)
                                    }
                                }
                            }
                            qa.strokeStyle = "#666";
                            qa.stroke()
                        }
                        K.scroll()
                    }
                },
                D = [];
            for (d = 0.1; d < 1E5; d *= 10) {
                D.push(1 * d);
                D.push(2 * d);
                D.push(5 * d)
            }
            G(true);
            try {
                var z = function(h) {
                    if (window.JSON && JSON.stringify) return JSON.stringify(h);
                    var m = arguments.callee;
                    if (typeof h == "boolean" || typeof h == "number") return h + "";
                    else if (typeof h == "string") return '"' + h.replace(/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, function(E) {
                        return "\\u" + ("0000" + E.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"';
                    else if (h.length) {
                        for (var o =
                                0; o < h.length; o++) h[o] = m(h[o]);
                        return "[" + h.join(",") + "]"
                    } else {
                        o = [];
                        for (var u in h) o.push(m(u) + ":" + m(h[u]));
                        return "{" + o.join(",") + "}"
                    }
                };
                window.addEventListener("message", function(h) {
                    var m = parseInt(h.data.substr(0, h.data.indexOf(";")));
                    try {
                        h.source.postMessage("SVGe" + m + ";" + z(eval(h.data)), "*")
                    } catch (o) {
                        h.source.postMessage("SVGe" + m + ";error:" + o.message, "*")
                    }
                }, false)
            } catch (F) {
                window.embed_error = F
            }
            a(function() {
                window.svgCanvas = g;
                g.ready = methodDraw.ready
            });
            b.setLang = function(h, m) {
                a.pref("lang", h);
                a("#lang_select").val(h);
                if (m) {
                    g.runExtensions("langChanged", h);
                    ma();
                    a.each({
                        "#stroke_color": "#tool_stroke .icon_label, #tool_stroke .color_block",
                        "#fill_color": "#tool_fill label, #tool_fill .color_block",
                        "#linejoin_miter": "#cur_linejoin",
                        "#linecap_butt": "#cur_linecap"
                    }, function(o, u) {
                        a(u).attr("title", a(o)[0].title)
                    });
                    a("#multiselected_panel div[id^=tool_align]").each(function() {
                        a("#tool_pos" + this.id.substr(10))[0].title = this.title
                    })
                }
            }
        };
        var f = [];
        b.ready = function(d) {
            p ? d() : f.push(d)
        };
        b.runCallbacks = function() {
            a.each(f, function() {
                this()
            });
            p = true
        };
        b.loadFromString = function(d) {
            b.ready(function() {
                s(d)
            })
        };
        b.loadFromURL = function(d, n) {
            n || (n = {});
            var v = n.cache,
                B = n.callback;
            b.ready(function() {
                a.ajax({
                    url: d,
                    dataType: "text",
                    cache: !!v,
                    success: function(q) {
                        s(q, B)
                    },
                    error: function(q, L, Q) {
                        q.status != 404 && q.responseText ? s(q.responseText, B) : a.alert(uiStrings.notification.URLloadFail + ": \n" + Q + "", B)
                    }
                })
            })
        };
        b.loadFromDataURI = function(d) {
            b.ready(function() {
                var n = d.substring(26);
                s(svgedit.utilities.decode64(n))
            })
        };
        b.addExtension = function() {
            var d = arguments;
            a(function() {
                g && g.addExtension.apply(this, d)
            })
        };
        return b
    }(jQuery);
    $(methodDraw.init)
})();
$.fn.dragInput = function(a) {
    return this.each(function() {
        this.repeating = false;
        this.dragCfg = {
            min: a && !isNaN(parseFloat(a.min)) ? Number(a.min) : null,
            max: a && !isNaN(parseFloat(a.max)) ? Number(a.max) : null,
            step: a && Number(a.step) ? a.step : 1,
            stepfunc: a && a.stepfunc ? a.stepfunc : false,
            dragAdjust: a && a.dragAdjust ? a.dragAdjust : 1,
            height: 70,
            cursor: a && a.cursor ? Boolean(a.cursor) : false,
            start: a && a.start ? Number(a.start) : 0,
            _btn_width: 20,
            _direction: null,
            _delay: null,
            _repeat: null,
            callback: a && a.callback ? a.callback : null
        };
        this.dragCfg.smallStep =
            a && a.smallStep ? a.smallStep : this.dragCfg.step / 2;
        var s = this.dragCfg.dragAdjust,
            g = $(this).parent(),
            b = $(this),
            p = this.dragCfg.height,
            w = this.dragCfg.min,
            c = this.dragCfg.max,
            f = this.dragCfg.step,
            d = c - w > 0 ? (c - w) / f : 200,
            n = d / p * f,
            v = 0,
            B = this.getAttribute("data-attr"),
            q = methodDraw.canvas,
            L = svgedit.browser.isTouch(),
            Q = true,
            K = d && this.dragCfg.cursor ? $("<div class='draginput_cursor' />").appendTo(g) : false;
        b.attr("readonly", "readonly");
        K && !isNaN(this.dragCfg.start) && K.css("top", this.dragCfg.start * -1 / n + p);
        this.adjustValue =
            function(I, S) {
                var R;
                I = parseFloat(I);
                R = isNaN(this.value) ? this.dragCfg.reset : $.isFunction(this.dragCfg.stepfunc) ? this.dragCfg.stepfunc(this, I) : Number((Number(this.value) + Number(I)).toFixed(5));
                if (c !== null) R = Math.min(R, c);
                if (w !== null) R = Math.max(R, w);
                K && this.updateCursor(R);
                this.value = R;
                g.attr("data-value", R);
                $.isFunction(this.dragCfg.callback) && this.dragCfg.callback(this, S)
            };
        g.toggleClass("draginput", g.is("label"));
        this.move = function(I, S, R) {
            if (L) I = I.originalEvent.touches[0];
            if (v === 0) v = S;
            S = (I.pageY - v) *
                -1;
            v = I.pageY;
            R = S * n * s;
            this.adjustValue(R.toFixed(f < 1 ? 1 : 0))
        };
        this.stop = function() {
            var I = q.getSelectedElems();
            $("body").removeClass("dragging");
            g.removeClass("active");
            Q = true;
            $(window).unbind("mousemove.draginput touchmove.draginput mouseup.draginput touchend.draginput");
            v = 0;
            if (I[0]) {
                I = q.undoMgr.finishUndoableChange();
                I.isEmpty() || q.undoMgr.addCommandToHistory(I)
            }
            this.adjustValue(0, Q)
        };
        this.updateCursor = function() {
            var I = parseFloat(this.value) * -1 / n + p;
            K.css("top", I)
        };
        this.launch = function(I) {
            var S = q.getSelectedElems();
            if (L) I = I.originalEvent.touches[0];
            var R = I.pageY,
                N = this.value,
                ga = this;
            q.undoMgr.beginUndoableChange(B, S);
            $("body").addClass("dragging");
            g.addClass("active");
            $(window).bind("mousemove.draginput touchmove.draginput", function(oa) {
                ga.move(oa, R, parseFloat(N))
            });
            $(window).bind("mouseup.draginput touchend.draginput", function() {
                ga.stop()
            })
        };
        $(this).attr("readonly", "readonly").attr("data-scale", n).attr("data-domain", p).attr("data-cursor", K != false).bind("mousedown touchstart", function(I) {
            this.blur();
            this.launch(I)
        }).bind("dblclick taphold",
            function() {
                this.removeAttribute("readonly", "readonly");
                this.focus();
                this.select()
            }).keydown(function(I) {
            switch (I.keyCode) {
                case 13:
                    this.adjustValue(0);
                    this.blur()
            }
        }).focus(function() {
            this.getAttribute("readonly") === "readonly" && this.blur()
        }).blur(function() {
            this.setAttribute("readonly", "readonly")
        }).bind("mousewheel", function(I, S, R, N) {
            S = q.getSelectedElems();
            Q && q.undoMgr.beginUndoableChange(B, S);
            Q = false;
            clearTimeout(window.undoTimeout);
            window.undoTimeout = setTimeout(function() {
                ga.stop()
            }, 200);
            var ga =
                this;
            if (N > 0) this.adjustValue(this.dragCfg.step);
            else N < 0 && this.adjustValue(-this.dragCfg.step);
            I.preventDefault()
        })
    })
};
$.fn.dragInput.updateCursor = function(a) {
    var s = parseFloat(a.value),
        g = parseFloat(a.getAttribute("data-scale")),
        b = parseFloat(a.getAttribute("data-domain"));
    s = s * -1 / g + b + "px";
    a = a.parentNode.lastChild;
    if (a.className == "draginput_cursor") a.style.top = s
};
svgedit = svgedit || {};
(function() {
    var a = this;
    if (!svgedit.contextmenu) svgedit.contextmenu = {};
    a.contextMenuExtensions = {};
    methodDraw.ready(function() {
        for (menuItem in contextMenuExtensions) {
            var s = contextMenuExtensions[menuItem];
            Object.keys(a.contextMenuExtensions).length == 0 && $("#cmenu_canvas").append("<li class='separator'>");
            var g = s.shortcut || "";
            $("#cmenu_canvas").append("<li class='disabled'><a href='#" + s.id + "'>" + s.label + "<span class='shortcut'>" + g + "</span></a></li>")
        }
    });
    svgedit.contextmenu.resetCustomMenus = function() {
        a.contextMenuExtensions = {}
    };
    svgedit.contextmenu.add = function(s) {
        if (s && s.id && s.label && s.action && typeof s.action == "function")
            if (s.id in a.contextMenuExtensions) console.error('Cannot add extension "' + s.id + '", an extension by that name already exists"');
            else {
                console.log("Registed contextmenu item: {id:" + s.id + ", label:" + s.label + "}");
                a.contextMenuExtensions[s.id] = s
            } else console.error("Menu items must be defined and have at least properties: id, label, action, where action must be a function")
    };
    svgedit.contextmenu.hasCustomHandler =
        function(s) {
            return a.contextMenuExtensions[s] && true
        };
    svgedit.contextmenu.getCustomHandler = function(s) {
        return a.contextMenuExtensions[s].action
    }
})();
(function(a, s) {
    function g(p) {
        return !a(p).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }

    function b(p, w) {
        var c = p.nodeName.toLowerCase();
        if ("area" === c) {
            c = p.parentNode;
            var f = c.name;
            if (!p.href || !f || c.nodeName.toLowerCase() !== "map") return false;
            c = a("img[usemap=#" + f + "]")[0];
            return !!c && g(c)
        }
        return (/input|select|textarea|button|object/.test(c) ? !p.disabled : "a" == c ? p.href || w : w) && g(p)
    }
    a.ui = a.ui || {};
    a.ui.version || (a.extend(a.ui, {
        version: "1.8.17",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), a.fn.extend({
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function(p, w) {
            return typeof p == "number" ? this.each(function() {
                var c =
                    this;
                setTimeout(function() {
                    a(c).focus();
                    w && w.call(c)
                }, p)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var p;
            a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? p = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : p = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.curCSS(this,
                    "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0);
            return /fixed/.test(this.css("position")) || !p.length ? a(document) : p
        },
        zIndex: function(p) {
            if (p !== s) return this.css("zIndex", p);
            if (this.length) {
                p = a(this[0]);
                for (var w; p.length && p[0] !== document;) {
                    w = p.css("position");
                    if (w === "absolute" || w === "relative" || w === "fixed") {
                        w = parseInt(p.css("zIndex"), 10);
                        if (!isNaN(w) && w !== 0) return w
                    }
                    p = p.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" :
                "mousedown") + ".ui-disableSelection", function(p) {
                p.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), a.each(["Width", "Height"], function(p, w) {
        function c(v, B, q, L) {
            a.each(f, function() {
                B -= parseFloat(a.curCSS(v, "padding" + this, true)) || 0;
                q && (B -= parseFloat(a.curCSS(v, "border" + this + "Width", true)) || 0);
                L && (B -= parseFloat(a.curCSS(v, "margin" + this, true)) || 0)
            });
            return B
        }
        var f = w === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            d = w.toLowerCase(),
            n = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + w] = function(v) {
            if (v === s) return n["inner" + w].call(this);
            return this.each(function() {
                a(this).css(d, c(this, v) + "px")
            })
        };
        a.fn["outer" + w] = function(v, B) {
            if (typeof v != "number") return n["outer" + w].call(this, v);
            return this.each(function() {
                a(this).css(d, c(this, v, true, B) + "px")
            })
        }
    }), a.extend(a.expr[":"], {
        data: function(p, w, c) {
            return !!a.data(p, c[3])
        },
        focusable: function(p) {
            return b(p, !isNaN(a.attr(p, "tabindex")))
        },
        tabbable: function(p) {
            var w = a.attr(p,
                    "tabindex"),
                c = isNaN(w);
            return (c || w >= 0) && b(p, !c)
        }
    }), a(function() {
        var p = document.body,
            w = p.appendChild(w = document.createElement("div"));
        a.extend(w.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });
        a.support.minHeight = w.offsetHeight === 100;
        a.support.selectstart = "onselectstart" in w;
        p.removeChild(w).style.display = "none"
    }), a.extend(a.ui, {
        plugin: {
            add: function(p, w, c) {
                p = a.ui[p].prototype;
                for (var f in c) {
                    p.plugins[f] = p.plugins[f] || [];
                    p.plugins[f].push([w, c[f]])
                }
            },
            call: function(p, w, c) {
                if ((w = p.plugins[w]) &&
                    p.element[0].parentNode)
                    for (var f = 0; f < w.length; f++) p.options[w[f][0]] && w[f][1].apply(p.element, c)
            }
        },
        contains: function(p, w) {
            return document.compareDocumentPosition ? p.compareDocumentPosition(w) & 16 : p !== w && p.contains(w)
        },
        hasScroll: function(p, w) {
            if (a(p).css("overflow") === "hidden") return false;
            var c = w && w === "left" ? "scrollLeft" : "scrollTop",
                f = false;
            if (p[c] > 0) return true;
            p[c] = 1;
            f = p[c] > 0;
            p[c] = 0;
            return f
        },
        isOverAxis: function(p, w, c) {
            return p > w && p < w + c
        },
        isOver: function(p, w, c, f, d, n) {
            return a.ui.isOverAxis(p, c, d) &&
                a.ui.isOverAxis(w, f, n)
        }
    }))
})(jQuery);
(function(a, s) {
    if (a.cleanData) {
        var g = a.cleanData;
        a.cleanData = function(p) {
            for (var w = 0, c;
                (c = p[w]) != null; w++) try {
                a(c).triggerHandler("remove")
            } catch (f) {}
            g(p)
        }
    } else {
        var b = a.fn.remove;
        a.fn.remove = function(p, w) {
            return this.each(function() {
                w || (!p || a.filter(p, [this]).length) && a("*", this).add([this]).each(function() {
                    try {
                        a(this).triggerHandler("remove")
                    } catch (c) {}
                });
                return b.call(a(this), p, w)
            })
        }
    }
    a.widget = function(p, w, c) {
        var f = p.split(".")[0],
            d;
        p = p.split(".")[1];
        d = f + "-" + p;
        c || (c = w, w = a.Widget);
        a.expr[":"][d] =
            function(n) {
                return !!a.data(n, p)
            };
        a[f] = a[f] || {};
        a[f][p] = function(n, v) {
            arguments.length && this._createWidget(n, v)
        };
        w = new w;
        w.options = a.extend(true, {}, w.options);
        a[f][p].prototype = a.extend(true, w, {
            namespace: f,
            widgetName: p,
            widgetEventPrefix: a[f][p].prototype.widgetEventPrefix || p,
            widgetBaseClass: d
        }, c);
        a.widget.bridge(p, a[f][p])
    };
    a.widget.bridge = function(p, w) {
        a.fn[p] = function(c) {
            var f = typeof c == "string",
                d = Array.prototype.slice.call(arguments, 1),
                n = this;
            c = !f && d.length ? a.extend.apply(null, [true, c].concat(d)) :
                c;
            if (f && c.charAt(0) === "_") return n;
            f ? this.each(function() {
                var v = a.data(this, p),
                    B = v && a.isFunction(v[c]) ? v[c].apply(v, d) : v;
                if (B !== v && B !== s) {
                    n = B;
                    return false
                }
            }) : this.each(function() {
                var v = a.data(this, p);
                v ? v.option(c || {})._init() : a.data(this, p, new w(c, this))
            });
            return n
        }
    };
    a.Widget = function(p, w) {
        arguments.length && this._createWidget(p, w)
    };
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(p, w) {
            a.data(w, this.widgetName, this);
            this.element = a(w);
            this.options =
                a.extend(true, {}, this.options, this._getCreateOptions(), p);
            var c = this;
            this.element.bind("remove." + this.widgetName, function() {
                c.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function() {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass +
                "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(p, w) {
            var c = p;
            if (arguments.length === 0) return a.extend({}, this.options);
            if (typeof p == "string") {
                if (w === s) return this.options[p];
                c = {};
                c[p] = w
            }
            this._setOptions(c);
            return this
        },
        _setOptions: function(p) {
            var w = this;
            a.each(p, function(c, f) {
                w._setOption(c, f)
            });
            return this
        },
        _setOption: function(p, w) {
            this.options[p] = w;
            p === "disabled" && this.widget()[w ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled",
                w);
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _trigger: function(p, w, c) {
            var f, d = this.options[p];
            c = c || {};
            w = a.Event(w);
            w.type = (p === this.widgetEventPrefix ? p : this.widgetEventPrefix + p).toLowerCase();
            w.target = this.element[0];
            if (p = w.originalEvent)
                for (f in p) f in w || (w[f] = p[f]);
            this.element.trigger(w, c);
            return !(a.isFunction(d) && d.call(this.element[0], w, c) === false || w.isDefaultPrevented())
        }
    }
})(jQuery);
(function(a) {
    var s = false;
    a(document).mouseup(function() {
        s = false
    });
    a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var g = this;
            this.element.bind("mousedown." + this.widgetName, function(b) {
                return g._mouseDown(b)
            }).bind("click." + this.widgetName, function(b) {
                if (true === a.data(b.target, g.widgetName + ".preventClickEvent")) {
                    a.removeData(b.target, g.widgetName + ".preventClickEvent");
                    b.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." +
                this.widgetName)
        },
        _mouseDown: function(g) {
            if (!s) {
                this._mouseStarted && this._mouseUp(g);
                this._mouseDownEvent = g;
                var b = this,
                    p = g.which == 1,
                    w = typeof this.options.cancel == "string" && g.target.nodeName ? a(g.target).closest(this.options.cancel).length : false;
                if (!p || w || !this._mouseCapture(g)) return true;
                (this.mouseDelayMet = !this.options.delay) || (this._mouseDelayTimer = setTimeout(function() {
                    b.mouseDelayMet = true
                }, this.options.delay));
                if (this._mouseDistanceMet(g) && this._mouseDelayMet(g)) {
                    this._mouseStarted = this._mouseStart(g) !==
                        false;
                    if (!this._mouseStarted) {
                        g.preventDefault();
                        return true
                    }
                }
                true === a.data(g.target, this.widgetName + ".preventClickEvent") && a.removeData(g.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(c) {
                    return b._mouseMove(c)
                };
                this._mouseUpDelegate = function(c) {
                    return b._mouseUp(c)
                };
                a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                g.preventDefault();
                return s = true
            }
        },
        _mouseMove: function(g) {
            if (a.browser.msie &&
                !(document.documentMode >= 9) && !g.button) return this._mouseUp(g);
            if (this._mouseStarted) {
                this._mouseDrag(g);
                return g.preventDefault()
            }
            this._mouseDistanceMet(g) && this._mouseDelayMet(g) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, g) !== false, this._mouseStarted ? this._mouseDrag(g) : this._mouseUp(g));
            return !this._mouseStarted
        },
        _mouseUp: function(g) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            this._mouseStarted &&
                (this._mouseStarted = false, g.target == this._mouseDownEvent.target && a.data(g.target, this.widgetName + ".preventClickEvent", true), this._mouseStop(g));
            return false
        },
        _mouseDistanceMet: function(g) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - g.pageX), Math.abs(this._mouseDownEvent.pageY - g.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    })
})(jQuery);
(function(a) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function() {
            this.options.helper == "original" &&
                !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative");
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function() {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function(s) {
            var g = this.options;
            if (this.helper || g.disabled || a(s.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(s);
            if (!this.handle) return false;
            g.iframeFix && a(g.iframeFix === true ? "iframe" : g.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(a(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function(s) {
            var g = this.options;
            this.helper =
                this._createHelper(s);
            this._cacheHelperProportions();
            a.ui.ddmanager && (a.ui.ddmanager.current = this);
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: s.pageX - this.offset.left,
                    top: s.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(s);
            this.originalPageX = s.pageX;
            this.originalPageY = s.pageY;
            g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt);
            g.containment && this._setContainment();
            if (this._trigger("start", s) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, s);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(s, true);
            a.ui.ddmanager && a.ui.ddmanager.dragStart(this, s);
            return true
        },
        _mouseDrag: function(s, g) {
            this.position = this._generatePosition(s);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!g) {
                var b = this._uiHash();
                if (this._trigger("drag", s, b) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = b.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            a.ui.ddmanager && a.ui.ddmanager.drag(this, s);
            return false
        },
        _mouseStop: function(s) {
            var g =
                false;
            a.ui.ddmanager && !this.options.dropBehaviour && (g = a.ui.ddmanager.drop(this, s));
            this.dropped && (g = this.dropped, this.dropped = false);
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !g || this.options.revert == "valid" && g || this.options.revert === true || a.isFunction(this.options.revert) && this.options.revert.call(this.element, g)) {
                var b = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
                    function() {
                        b._trigger("stop", s) !== false && b._clear()
                    })
            } else this._trigger("stop", s) !== false && this._clear();
            return false
        },
        _mouseUp: function(s) {
            this.options.iframeFix === true && a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            });
            a.ui.ddmanager && a.ui.ddmanager.dragStop(this, s);
            return a.ui.mouse.prototype._mouseUp.call(this, s)
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function(s) {
            var g = !this.options.handle ||
                !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == s.target && (g = true)
            });
            return g
        },
        _createHelper: function(s) {
            var g = this.options;
            s = a.isFunction(g.helper) ? a(g.helper.apply(this.element[0], [s])) : g.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            s.parents("body").length || s.appendTo(g.appendTo == "parent" ? this.element[0].parentNode : g.appendTo);
            s[0] != this.element[0] && !/(fixed|absolute)/.test(s.css("position")) &&
                s.css("position", "absolute");
            return s
        },
        _adjustOffsetFromHelper: function(s) {
            typeof s == "string" && (s = s.split(" "));
            a.isArray(s) && (s = {
                left: +s[0],
                top: +s[1] || 0
            });
            "left" in s && (this.offset.click.left = s.left + this.margins.left);
            "right" in s && (this.offset.click.left = this.helperProportions.width - s.right + this.margins.left);
            "top" in s && (this.offset.click.top = s.top + this.margins.top);
            "bottom" in s && (this.offset.click.top = this.helperProportions.height - s.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent =
                this.helper.offsetParent();
            var s = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (s.left += this.scrollParent.scrollLeft(), s.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) s = {
                top: 0,
                left: 0
            };
            return {
                top: s.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: s.left + (parseInt(this.offsetParent.css("borderLeftWidth"),
                    10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var s = this.element.position();
                return {
                    top: s.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: s.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"),
                    10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var s = this.options;
            s.containment == "parent" && (s.containment = this.helper[0].parentNode);
            if (s.containment == "document" || s.containment == "window") this.containment = [s.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, s.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (s.containment == "document" ? 0 : a(window).scrollLeft()) + a(s.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (s.containment == "document" ? 0 : a(window).scrollTop()) + (a(s.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(s.containment) && s.containment.constructor != Array) {
                s = a(s.containment);
                var g = s[0];
                if (g) {
                    s.offset();
                    var b = a(g).css("overflow") !=
                        "hidden";
                    this.containment = [(parseInt(a(g).css("borderLeftWidth"), 10) || 0) + (parseInt(a(g).css("paddingLeft"), 10) || 0), (parseInt(a(g).css("borderTopWidth"), 10) || 0) + (parseInt(a(g).css("paddingTop"), 10) || 0), (b ? Math.max(g.scrollWidth, g.offsetWidth) : g.offsetWidth) - (parseInt(a(g).css("borderLeftWidth"), 10) || 0) - (parseInt(a(g).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(g.scrollHeight, g.offsetHeight) : g.offsetHeight) - (parseInt(a(g).css("borderTopWidth"),
                        10) || 0) - (parseInt(a(g).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                    this.relative_container = s
                }
            } else s.containment.constructor == Array && (this.containment = s.containment)
        },
        _convertPositionTo: function(s, g) {
            g || (g = this.position);
            var b = s == "absolute" ? 1 : -1,
                p = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                w = /(html|body)/i.test(p[0].tagName);
            return {
                top: g.top +
                    this.offset.relative.top * b + this.offset.parent.top * b - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : w ? 0 : p.scrollTop()) * b),
                left: g.left + this.offset.relative.left * b + this.offset.parent.left * b - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : w ? 0 : p.scrollLeft()) * b)
            }
        },
        _generatePosition: function(s) {
            var g = this.options,
                b = this.cssPosition == "absolute" &&
                (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                p = /(html|body)/i.test(b[0].tagName),
                w = s.pageX,
                c = s.pageY;
            if (this.originalPosition) {
                var f;
                if (this.containment) {
                    if (this.relative_container) {
                        f = this.relative_container.offset();
                        f = [this.containment[0] + f.left, this.containment[1] + f.top, this.containment[2] + f.left, this.containment[3] + f.top]
                    } else f = this.containment;
                    s.pageX - this.offset.click.left < f[0] && (w = f[0] + this.offset.click.left);
                    s.pageY - this.offset.click.top < f[1] && (c = f[1] + this.offset.click.top);
                    s.pageX - this.offset.click.left > f[2] && (w = f[2] + this.offset.click.left);
                    s.pageY - this.offset.click.top > f[3] && (c = f[3] + this.offset.click.top)
                }
                if (g.grid) {
                    c = g.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY;
                    c = f ? c - this.offset.click.top < f[1] || c - this.offset.click.top > f[3] ? c - this.offset.click.top < f[1] ? c + g.grid[1] : c - g.grid[1] : c : c;
                    w = g.grid[0] ? this.originalPageX + Math.round((w - this.originalPageX) /
                        g.grid[0]) * g.grid[0] : this.originalPageX;
                    w = f ? w - this.offset.click.left < f[0] || w - this.offset.click.left > f[2] ? w - this.offset.click.left < f[0] ? w + g.grid[0] : w - g.grid[0] : w : w
                }
            }
            return {
                top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : p ? 0 : b.scrollTop()),
                left: w - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version <
                    526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : p ? 0 : b.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(s, g, b) {
            b = b || this._uiHash();
            a.ui.plugin.call(this, s, [g, b]);
            s == "drag" && (this.positionAbs = this._convertPositionTo("absolute"));
            return a.Widget.prototype._trigger.call(this, s, g,
                b)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    a.extend(a.ui.draggable, {
        version: "1.8.17"
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(s, g) {
            var b = a(this).data("draggable"),
                p = b.options,
                w = a.extend({}, g, {
                    item: b.element
                });
            b.sortables = [];
            a(p.connectToSortable).each(function() {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (b.sortables.push({
                        instance: c,
                        shouldRevert: c.options.revert
                    }),
                    c.refreshPositions(), c._trigger("activate", s, w))
            })
        },
        stop: function(s, g) {
            var b = a(this).data("draggable"),
                p = a.extend({}, g, {
                    item: b.element
                });
            a.each(b.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, b.cancelHelperRemoval = true, this.instance.cancelHelperRemoval = false, this.shouldRevert && (this.instance.options.revert = true), this.instance._mouseStop(s), this.instance.options.helper = this.instance.options._helper, b.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) :
                    (this.instance.cancelHelperRemoval = false, this.instance._trigger("deactivate", s, p))
            })
        },
        drag: function(s, g) {
            var b = a(this).data("draggable"),
                p = this;
            a.each(b.sortables, function() {
                this.instance.positionAbs = b.positionAbs;
                this.instance.helperProportions = b.helperProportions;
                this.instance.offset.click = b.offset.click;
                this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(p).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",
                        true), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                        return g.helper[0]
                    }, s.target = this.instance.currentItem[0], this.instance._mouseCapture(s, true), this.instance._mouseStart(s, true, true), this.instance.offset.click.top = b.offset.click.top, this.instance.offset.click.left = b.offset.click.left, this.instance.offset.parent.left -= b.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= b.offset.parent.top - this.instance.offset.parent.top,
                    b._trigger("toSortable", s), b.dropped = this.instance.element, b.currentItem = b.element, this.instance.fromOutside = b), this.instance.currentItem && this.instance._mouseDrag(s)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = true, this.instance.options.revert = false, this.instance._trigger("out", s, this.instance._uiHash(this.instance)), this.instance._mouseStop(s, true), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder &&
                    this.instance.placeholder.remove(), b._trigger("fromSortable", s), b.dropped = false)
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var s = a("body"),
                g = a(this).data("draggable").options;
            s.css("cursor") && (g._cursor = s.css("cursor"));
            s.css("cursor", g.cursor)
        },
        stop: function() {
            var s = a(this).data("draggable").options;
            s._cursor && a("body").css("cursor", s._cursor)
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function(s, g) {
            var b = a(g.helper),
                p = a(this).data("draggable").options;
            b.css("opacity") && (p._opacity =
                b.css("opacity"));
            b.css("opacity", p.opacity)
        },
        stop: function(s, g) {
            var b = a(this).data("draggable").options;
            b._opacity && a(g.helper).css("opacity", b._opacity)
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var s = a(this).data("draggable");
            s.scrollParent[0] != document && s.scrollParent[0].tagName != "HTML" && (s.overflowOffset = s.scrollParent.offset())
        },
        drag: function(s) {
            var g = a(this).data("draggable"),
                b = g.options,
                p = false;
            if (g.scrollParent[0] != document && g.scrollParent[0].tagName != "HTML") {
                if (!b.axis ||
                    b.axis != "x") g.overflowOffset.top + g.scrollParent[0].offsetHeight - s.pageY < b.scrollSensitivity ? g.scrollParent[0].scrollTop = p = g.scrollParent[0].scrollTop + b.scrollSpeed : s.pageY - g.overflowOffset.top < b.scrollSensitivity && (g.scrollParent[0].scrollTop = p = g.scrollParent[0].scrollTop - b.scrollSpeed);
                if (!b.axis || b.axis != "y") g.overflowOffset.left + g.scrollParent[0].offsetWidth - s.pageX < b.scrollSensitivity ? g.scrollParent[0].scrollLeft = p = g.scrollParent[0].scrollLeft + b.scrollSpeed : s.pageX - g.overflowOffset.left < b.scrollSensitivity &&
                    (g.scrollParent[0].scrollLeft = p = g.scrollParent[0].scrollLeft - b.scrollSpeed)
            } else {
                if (!b.axis || b.axis != "x") s.pageY - a(document).scrollTop() < b.scrollSensitivity ? p = a(document).scrollTop(a(document).scrollTop() - b.scrollSpeed) : a(window).height() - (s.pageY - a(document).scrollTop()) < b.scrollSensitivity && (p = a(document).scrollTop(a(document).scrollTop() + b.scrollSpeed));
                if (!b.axis || b.axis != "y") s.pageX - a(document).scrollLeft() < b.scrollSensitivity ? p = a(document).scrollLeft(a(document).scrollLeft() - b.scrollSpeed) :
                    a(window).width() - (s.pageX - a(document).scrollLeft()) < b.scrollSensitivity && (p = a(document).scrollLeft(a(document).scrollLeft() + b.scrollSpeed))
            }
            p !== false && a.ui.ddmanager && !b.dropBehaviour && a.ui.ddmanager.prepareOffsets(g, s)
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function() {
            var s = a(this).data("draggable"),
                g = s.options;
            s.snapElements = [];
            a(g.snap.constructor != String ? g.snap.items || ":data(draggable)" : g.snap).each(function() {
                var b = a(this),
                    p = b.offset();
                this != s.element[0] && s.snapElements.push({
                    item: this,
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: p.top,
                    left: p.left
                })
            })
        },
        drag: function(s, g) {
            for (var b = a(this).data("draggable"), p = b.options, w = p.snapTolerance, c = g.offset.left, f = c + b.helperProportions.width, d = g.offset.top, n = d + b.helperProportions.height, v = b.snapElements.length - 1; v >= 0; v--) {
                var B = b.snapElements[v].left,
                    q = B + b.snapElements[v].width,
                    L = b.snapElements[v].top,
                    Q = L + b.snapElements[v].height;
                if (B - w < c && c < q + w && L - w < d && d < Q + w || B - w < c && c < q + w && L - w < n && n < Q + w || B - w < f && f < q + w && L - w < d && d < Q + w || B - w < f && f < q + w && L - w < n &&
                    n < Q + w) {
                    if (p.snapMode != "inner") {
                        var K = Math.abs(L - n) <= w,
                            I = Math.abs(Q - d) <= w,
                            S = Math.abs(B - f) <= w,
                            R = Math.abs(q - c) <= w;
                        K && (g.position.top = b._convertPositionTo("relative", {
                            top: L - b.helperProportions.height,
                            left: 0
                        }).top - b.margins.top);
                        I && (g.position.top = b._convertPositionTo("relative", {
                            top: Q,
                            left: 0
                        }).top - b.margins.top);
                        S && (g.position.left = b._convertPositionTo("relative", {
                            top: 0,
                            left: B - b.helperProportions.width
                        }).left - b.margins.left);
                        R && (g.position.left = b._convertPositionTo("relative", {
                            top: 0,
                            left: q
                        }).left - b.margins.left)
                    }
                    var N =
                        K || I || S || R;
                    if (p.snapMode != "outer") {
                        K = Math.abs(L - d) <= w;
                        I = Math.abs(Q - n) <= w;
                        S = Math.abs(B - c) <= w;
                        R = Math.abs(q - f) <= w;
                        K && (g.position.top = b._convertPositionTo("relative", {
                            top: L,
                            left: 0
                        }).top - b.margins.top);
                        I && (g.position.top = b._convertPositionTo("relative", {
                            top: Q - b.helperProportions.height,
                            left: 0
                        }).top - b.margins.top);
                        S && (g.position.left = b._convertPositionTo("relative", {
                            top: 0,
                            left: B
                        }).left - b.margins.left);
                        R && (g.position.left = b._convertPositionTo("relative", {
                            top: 0,
                            left: q - b.helperProportions.width
                        }).left - b.margins.left)
                    }!b.snapElements[v].snapping &&
                        (K || I || S || R || N) && b.options.snap.snap && b.options.snap.snap.call(b.element, s, a.extend(b._uiHash(), {
                            snapItem: b.snapElements[v].item
                        }));
                    b.snapElements[v].snapping = K || I || S || R || N
                } else {
                    b.snapElements[v].snapping && b.options.snap.release && b.options.snap.release.call(b.element, s, a.extend(b._uiHash(), {
                        snapItem: b.snapElements[v].item
                    }));
                    b.snapElements[v].snapping = false
                }
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function() {
            var s = a(this).data("draggable").options;
            s = a.makeArray(a(s.stack)).sort(function(b,
                p) {
                return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(p).css("zIndex"), 10) || 0)
            });
            if (s.length) {
                var g = parseInt(s[0].style.zIndex) || 0;
                a(s).each(function(b) {
                    this.style.zIndex = g + b
                });
                this[0].style.zIndex = g + s.length
            }
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(s, g) {
            var b = a(g.helper),
                p = a(this).data("draggable").options;
            b.css("zIndex") && (p._zIndex = b.css("zIndex"));
            b.css("zIndex", p.zIndex)
        },
        stop: function(s, g) {
            var b = a(this).data("draggable").options;
            b._zIndex && a(g.helper).css("zIndex", b._zIndex)
        }
    })
})(jQuery);
(function(a) {
    a.widget("ui.slider", a.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var s = this,
                g = this.options,
                b = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                p = g.values && g.values.length || 1,
                w = [];
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" +
                this.orientation + " ui-widget ui-widget-content ui-corner-all" + (g.disabled ? " ui-slider-disabled ui-disabled" : ""));
            this.range = a([]);
            g.range && (g.range === true && (g.values || (g.values = [this._valueMin(), this._valueMin()]), g.values.length && g.values.length !== 2 && (g.values = [g.values[0], g.values[0]])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (g.range === "min" || g.range === "max" ? " ui-slider-range-" + g.range : "")));
            for (var c = b.length; c < p; c += 1) w.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
            this.handles = b.add(a(w.join("")).appendTo(s.element));
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(f) {
                f.preventDefault()
            }).hover(function() {
                g.disabled || a(this).addClass("ui-state-hover")
            }, function() {
                a(this).removeClass("ui-state-hover")
            }).focus(function() {
                g.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"))
            }).blur(function() {
                a(this).removeClass("ui-state-focus")
            });
            this.handles.each(function(f) {
                a(this).data("index.ui-slider-handle",
                    f)
            });
            this.handles.keydown(function(f) {
                var d = true,
                    n = a(this).data("index.ui-slider-handle"),
                    v, B, q;
                if (!s.options.disabled) {
                    switch (f.keyCode) {
                        case a.ui.keyCode.HOME:
                        case a.ui.keyCode.END:
                        case a.ui.keyCode.PAGE_UP:
                        case a.ui.keyCode.PAGE_DOWN:
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            d = false;
                            if (!s._keySliding) {
                                s._keySliding = true;
                                a(this).addClass("ui-state-active");
                                v = s._start(f, n);
                                if (v === false) return
                            }
                    }
                    v = s.options.step;
                    s.options.values && s.options.values.length ?
                        B = q = s.values(n) : B = q = s.value();
                    switch (f.keyCode) {
                        case a.ui.keyCode.HOME:
                            q = s._valueMin();
                            break;
                        case a.ui.keyCode.END:
                            q = s._valueMax();
                            break;
                        case a.ui.keyCode.PAGE_UP:
                            q = s._trimAlignValue(B + (s._valueMax() - s._valueMin()) / 5);
                            break;
                        case a.ui.keyCode.PAGE_DOWN:
                            q = s._trimAlignValue(B - (s._valueMax() - s._valueMin()) / 5);
                            break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                            if (B === s._valueMax()) return;
                            q = s._trimAlignValue(B + v);
                            break;
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (B === s._valueMin()) return;
                            q = s._trimAlignValue(B -
                                v)
                    }
                    s._slide(f, n, q);
                    return d
                }
            }).keyup(function(f) {
                var d = a(this).data("index.ui-slider-handle");
                s._keySliding && (s._keySliding = false, s._stop(f, d), s._change(f, d), a(this).removeClass("ui-state-active"))
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(s) {
            var g = this.options,
                b, p, w, c, f;
            if (g.disabled) return false;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            b = this._normValueFromMouse({
                x: s.pageX,
                y: s.pageY
            });
            p = this._valueMax() - this._valueMin() + 1;
            c = this;
            this.handles.each(function(d) {
                var n = Math.abs(b - c.values(d));
                p > n && (p = n, w = a(this), f = d)
            });
            g.range === true && this.values(1) === g.min && (f += 1, w = a(this.handles[f]));
            if (this._start(s, f) === false) return false;
            this._mouseSliding = true;
            c._handleIndex = f;
            w.addClass("ui-state-active").focus();
            g = w.offset();
            this._clickOffset = !a(s.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: s.pageX - g.left - w.width() / 2,
                top: s.pageY - g.top - w.height() / 2 - (parseInt(w.css("borderTopWidth"), 10) || 0) - (parseInt(w.css("borderBottomWidth"), 10) || 0) + (parseInt(w.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(s, f, b);
            return this._animateOff = true
        },
        _mouseStart: function() {
            return true
        },
        _mouseDrag: function(s) {
            var g =
                this._normValueFromMouse({
                    x: s.pageX,
                    y: s.pageY
                });
            this._slide(s, this._handleIndex, g);
            return false
        },
        _mouseStop: function(s) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(s, this._handleIndex);
            this._change(s, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(s) {
            var g, b;
            this.orientation === "horizontal" ?
                (g = this.elementSize.width, b = s.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (g = this.elementSize.height, b = s.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0));
            s = b / g;
            s > 1 && (s = 1);
            s < 0 && (s = 0);
            this.orientation === "vertical" && (s = 1 - s);
            g = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + s * g)
        },
        _start: function(s, g) {
            var b = {
                handle: this.handles[g],
                value: this.value()
            };
            this.options.values && this.options.values.length && (b.value = this.values(g),
                b.values = this.values());
            return this._trigger("start", s, b)
        },
        _slide: function(s, g, b) {
            var p, w, c;
            this.options.values && this.options.values.length ? (p = this.values(g ? 0 : 1), this.options.values.length === 2 && this.options.range === true && (g === 0 && b > p || g === 1 && b < p) && (b = p), b !== this.values(g) && (w = this.values(), w[g] = b, c = this._trigger("slide", s, {
                handle: this.handles[g],
                value: b,
                values: w
            }), this.values(g ? 0 : 1), c !== false && this.values(g, b, true))) : b !== this.value() && (c = this._trigger("slide", s, {
                    handle: this.handles[g],
                    value: b
                }), c !==
                false && this.value(b))
        },
        _stop: function(s, g) {
            var b = {
                handle: this.handles[g],
                value: this.value()
            };
            this.options.values && this.options.values.length && (b.value = this.values(g), b.values = this.values());
            this._trigger("stop", s, b)
        },
        _change: function(s, g) {
            if (!this._keySliding && !this._mouseSliding) {
                var b = {
                    handle: this.handles[g],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (b.value = this.values(g), b.values = this.values());
                this._trigger("change", s, b)
            }
        },
        value: function(s) {
            if (arguments.length) {
                this.options.value =
                    this._trimAlignValue(s);
                this._refreshValue();
                this._change(null, 0)
            } else return this._value()
        },
        values: function(s, g) {
            var b, p, w;
            if (arguments.length > 1) {
                this.options.values[s] = this._trimAlignValue(g);
                this._refreshValue();
                this._change(null, s)
            } else {
                if (!arguments.length) return this._values();
                if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(s) : this.value();
                b = this.options.values;
                p = arguments[0];
                for (w = 0; w < b.length; w += 1) {
                    b[w] = this._trimAlignValue(p[w]);
                    this._change(null,
                        w)
                }
                this._refreshValue()
            }
        },
        _setOption: function(s, g) {
            var b, p = 0;
            a.isArray(this.options.values) && (p = this.options.values.length);
            a.Widget.prototype._setOption.apply(this, arguments);
            switch (s) {
                case "disabled":
                    g ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", true), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", false), this.element.removeClass("ui-disabled"));
                    break;
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case "value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case "values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (b = 0; b < p; b += 1) this._change(null, b);
                    this._animateOff = false
            }
        },
        _value: function() {
            var s = this.options.value;
            return s = this._trimAlignValue(s)
        },
        _values: function(s) {
            var g, b;
            if (arguments.length) {
                g = this.options.values[s];
                return g = this._trimAlignValue(g)
            }
            g = this.options.values.slice();
            for (b = 0; b < g.length; b += 1) g[b] = this._trimAlignValue(g[b]);
            return g
        },
        _trimAlignValue: function(s) {
            if (s <= this._valueMin()) return this._valueMin();
            if (s >= this._valueMax()) return this._valueMax();
            var g = this.options.step > 0 ? this.options.step : 1,
                b = (s - this._valueMin()) % g;
            s = s - b;
            Math.abs(b) * 2 >= g && (s += b > 0 ? g : -g);
            return parseFloat(s.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var s =
                this.options.range,
                g = this.options,
                b = this,
                p = this._animateOff ? false : g.animate,
                w, c = {},
                f, d, n, v;
            this.options.values && this.options.values.length ? this.handles.each(function(B) {
                w = (b.values(B) - b._valueMin()) / (b._valueMax() - b._valueMin()) * 100;
                c[b.orientation === "horizontal" ? "left" : "bottom"] = w + "%";
                a(this).stop(1, 1)[p ? "animate" : "css"](c, g.animate);
                b.options.range === true && (b.orientation === "horizontal" ? (B === 0 && b.range.stop(1, 1)[p ? "animate" : "css"]({
                    left: w + "%"
                }, g.animate), B === 1 && b.range[p ? "animate" : "css"]({
                    width: w -
                        f + "%"
                }, {
                    queue: false,
                    duration: g.animate
                })) : (B === 0 && b.range.stop(1, 1)[p ? "animate" : "css"]({
                    bottom: w + "%"
                }, g.animate), B === 1 && b.range[p ? "animate" : "css"]({
                    height: w - f + "%"
                }, {
                    queue: false,
                    duration: g.animate
                })));
                f = w
            }) : (d = this.value(), n = this._valueMin(), v = this._valueMax(), w = v !== n ? (d - n) / (v - n) * 100 : 0, c[b.orientation === "horizontal" ? "left" : "bottom"] = w + "%", this.handle.stop(1, 1)[p ? "animate" : "css"](c, g.animate), s === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[p ? "animate" : "css"]({
                    width: w + "%"
                }, g.animate),
                s === "max" && this.orientation === "horizontal" && this.range[p ? "animate" : "css"]({
                    width: 100 - w + "%"
                }, {
                    queue: false,
                    duration: g.animate
                }), s === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[p ? "animate" : "css"]({
                    height: w + "%"
                }, g.animate), s === "max" && this.orientation === "vertical" && this.range[p ? "animate" : "css"]({
                    height: 100 - w + "%"
                }, {
                    queue: false,
                    duration: g.animate
                }))
        }
    });
    a.extend(a.ui.slider, {
        version: "1.8.17"
    })
})(jQuery);
(function(a) {
    Math.precision = function(c, f) {
        if (f === undefined) f = 0;
        return Math.round(c * Math.pow(10, f)) / Math.pow(10, f)
    };
    var s = function(c, f) {
            var d = this,
                n = c.find("img:first"),
                v = 0,
                B = 100,
                q = 100,
                L = 0,
                Q = 100,
                K = 100,
                I = 0,
                S = 0,
                R, N, ga = [],
                oa = function(U) {
                    for (var Z = 0; Z < ga.length; Z++) ga[Z].call(d, d, U)
                },
                Y = function(U) {
                    var Z = c.offset();
                    R = {
                        l: Z.left | 0,
                        t: Z.top | 0
                    };
                    clearTimeout(N);
                    N = setTimeout(function() {
                        Ba.call(d, U)
                    }, 0);
                    a(document).bind("mousemove", V).bind("mouseup", ea);
                    U.preventDefault()
                },
                V = function(U) {
                    clearTimeout(N);
                    N = setTimeout(function() {
                        Ba.call(d,
                            U)
                    }, 0);
                    U.stopPropagation();
                    U.preventDefault();
                    return false
                },
                ea = function(U) {
                    a(document).unbind("mouseup", ea).unbind("mousemove", V);
                    U.stopPropagation();
                    U.preventDefault();
                    return false
                },
                Ba = function(U) {
                    var Z = U.pageX - R.l;
                    U = U.pageY - R.t;
                    var na = c.w,
                        pa = c.h;
                    if (Z < 0) Z = 0;
                    else if (Z > na) Z = na;
                    if (U < 0) U = 0;
                    else if (U > pa) U = pa;
                    ja.call(d, "xy", {
                        x: Z / na * q + v,
                        y: U / pa * K + L
                    })
                },
                ja = function(U, Z, na) {
                    if (Z === undefined) {
                        if (U === undefined || U == null) U = "xy";
                        switch (U.toLowerCase()) {
                            case "x":
                                return I;
                            case "y":
                                return S;
                            default:
                                return {
                                    x: I,
                                    y: S
                                }
                        }
                    }
                    if (!(na !=
                            null && na == d)) {
                        var pa = false,
                            ma, la;
                        if (U == null) U = "xy";
                        switch (U.toLowerCase()) {
                            case "x":
                                ma = Z && (Z.x && Z.x | 0 || Z | 0) || 0;
                                break;
                            case "y":
                                la = Z && (Z.y && Z.y | 0 || Z | 0) || 0;
                                break;
                            default:
                                ma = Z && Z.x && Z.x | 0 || 0;
                                la = Z && Z.y && Z.y | 0 || 0
                        }
                        if (ma != null) {
                            if (ma < v) ma = v;
                            else if (ma > B) ma = B;
                            if (I != ma) {
                                I = ma;
                                pa = true
                            }
                        }
                        if (la != null) {
                            if (la < L) la = L;
                            else if (la > Q) la = Q;
                            if (S != la) {
                                S = la;
                                pa = true
                            }
                        }
                        pa && oa.call(d, na || d)
                    }
                },
                ca = function(U) {
                    a.isFunction(U) && ga.push(U)
                };
            a.extend(true, d, {
                val: ja,
                range: function(U, Z) {
                    if (Z === undefined) {
                        if (U === undefined || U == null) U = "all";
                        switch (U.toLowerCase()) {
                            case "minx":
                                return v;
                            case "maxx":
                                return B;
                            case "rangex":
                                return {
                                    minX: v,
                                    maxX: B,
                                    rangeX: q
                                };
                            case "miny":
                                return L;
                            case "maxy":
                                return Q;
                            case "rangey":
                                return {
                                    minY: L,
                                    maxY: Q,
                                    rangeY: K
                                };
                            default:
                                return {
                                    minX: v,
                                    maxX: B,
                                    rangeX: q,
                                    minY: L,
                                    maxY: Q,
                                    rangeY: K
                                }
                        }
                    }
                    var na, pa, ma, la;
                    if (U == null) U = "all";
                    switch (U.toLowerCase()) {
                        case "minx":
                            na = Z && (Z.minX && Z.minX | 0 || Z | 0) || 0;
                            break;
                        case "maxx":
                            pa = Z && (Z.maxX && Z.maxX | 0 || Z | 0) || 0;
                            break;
                        case "rangex":
                            na = Z && Z.minX && Z.minX | 0 || 0;
                            pa = Z && Z.maxX && Z.maxX | 0 || 0;
                            break;
                        case "miny":
                            ma =
                                Z && (Z.minY && Z.minY | 0 || Z | 0) || 0;
                            break;
                        case "maxy":
                            la = Z && (Z.maxY && Z.maxY | 0 || Z | 0) || 0;
                            break;
                        case "rangey":
                            ma = Z && Z.minY && Z.minY | 0 || 0;
                            la = Z && Z.maxY && Z.maxY | 0 || 0;
                            break;
                        default:
                            na = Z && Z.minX && Z.minX | 0 || 0;
                            pa = Z && Z.maxX && Z.maxX | 0 || 0;
                            ma = Z && Z.minY && Z.minY | 0 || 0;
                            la = Z && Z.maxY && Z.maxY | 0 || 0
                    }
                    if (na != null && v != na) {
                        v = na;
                        q = B - v
                    }
                    if (pa != null && B != pa) {
                        B = pa;
                        q = B - v
                    }
                    if (ma != null && L != ma) {
                        L = ma;
                        K = Q - L
                    }
                    if (la != null && Q != la) {
                        Q = la;
                        K = Q - L
                    }
                },
                bind: ca,
                unbind: function(U) {
                    if (a.isFunction(U))
                        for (var Z;
                            (Z = a.inArray(U, ga)) != -1;) ga.splice(Z, 1)
                },
                destroy: function() {
                    a(document).unbind("mouseup",
                        ea).unbind("mousemove", V);
                    c.unbind("mousedown", Y);
                    ga = n = c = null
                }
            });
            n.src = f.arrow && f.arrow.image;
            n.w = f.arrow && f.arrow.width || n.width();
            n.h = f.arrow && f.arrow.height || n.height();
            c.w = f.map && f.map.width || c.width();
            c.h = f.map && f.map.height || c.height();
            c.bind("mousedown", Y);
            ca.call(d, function() {
                var U = 0,
                    Z = 0,
                    na = c.w,
                    pa = c.h,
                    ma = n.w,
                    la = n.h;
                setTimeout(function() {
                    if (q > 0) U = I == B ? na : I / q * na | 0;
                    if (K > 0) Z = S == Q ? pa : S / K * pa | 0;
                    if (ma >= na) U = (na >> 1) - (ma >> 1);
                    else U -= ma >> 1;
                    if (la >= pa) Z = (pa >> 1) - (la >> 1);
                    else Z -= la >> 1;
                    n.css({
                        left: U + "px",
                        top: Z + "px"
                    })
                }, 0)
            })
        },
        g = function(c, f, d, n) {
            var v = this;
            c = c.find("td.Text input");
            var B = c.eq(3),
                q = c.eq(4),
                L = c.eq(5),
                Q = c.length > 7 ? c.eq(6) : null,
                K = c.eq(0),
                I = c.eq(1),
                S = c.eq(2),
                R = c.eq(c.length > 7 ? 7 : 6),
                N = c.length > 7 ? c.eq(8) : null,
                ga = function(ja) {
                    if (!(ja.target.value == "" && ja.target != R.get(0) && (d != null && ja.target != d.get(0) || d == null))) {
                        if (!V(ja)) return ja;
                        switch (ja.target) {
                            case B.get(0):
                                switch (ja.keyCode) {
                                    case 38:
                                        B.val(ea.call(v, (B.val() << 0) + 1, 0, 255));
                                        f.val("r", B.val(), ja.target);
                                        return false;
                                    case 40:
                                        B.val(ea.call(v, (B.val() << 0) - 1, 0, 255));
                                        f.val("r", B.val(), ja.target);
                                        return false
                                }
                                break;
                            case q.get(0):
                                switch (ja.keyCode) {
                                    case 38:
                                        q.val(ea.call(v, (q.val() << 0) + 1, 0, 255));
                                        f.val("g", q.val(), ja.target);
                                        return false;
                                    case 40:
                                        q.val(ea.call(v, (q.val() << 0) - 1, 0, 255));
                                        f.val("g", q.val(), ja.target);
                                        return false
                                }
                                break;
                            case L.get(0):
                                switch (ja.keyCode) {
                                    case 38:
                                        L.val(ea.call(v, (L.val() << 0) + 1, 0, 255));
                                        f.val("b", L.val(), ja.target);
                                        return false;
                                    case 40:
                                        L.val(ea.call(v, (L.val() << 0) - 1, 0, 255));
                                        f.val("b", L.val(), ja.target);
                                        return false
                                }
                                break;
                            case Q && Q.get(0):
                                switch (ja.keyCode) {
                                    case 38:
                                        Q.val(ea.call(v, parseFloat(Q.val()) + 1, 0, 100));
                                        f.val("a", Math.precision(Q.val() * 255 / 100, n), ja.target);
                                        return false;
                                    case 40:
                                        Q.val(ea.call(v, parseFloat(Q.val()) - 1, 0, 100));
                                        f.val("a", Math.precision(Q.val() * 255 / 100, n), ja.target);
                                        return false
                                }
                                break;
                            case K.get(0):
                                switch (ja.keyCode) {
                                    case 38:
                                        K.val(ea.call(v, (K.val() << 0) + 1, 0, 360));
                                        f.val("h", K.val(), ja.target);
                                        return false;
                                    case 40:
                                        K.val(ea.call(v, (K.val() << 0) - 1, 0, 360));
                                        f.val("h", K.val(), ja.target);
                                        return false
                                }
                                break;
                            case I.get(0):
                                switch (ja.keyCode) {
                                    case 38:
                                        I.val(ea.call(v, (I.val() << 0) + 1, 0, 100));
                                        f.val("s", I.val(), ja.target);
                                        return false;
                                    case 40:
                                        I.val(ea.call(v, (I.val() << 0) - 1, 0, 100));
                                        f.val("s", I.val(), ja.target);
                                        return false
                                }
                                break;
                            case S.get(0):
                                switch (ja.keyCode) {
                                    case 38:
                                        S.val(ea.call(v, (S.val() << 0) + 1, 0, 100));
                                        f.val("v", S.val(), ja.target);
                                        return false;
                                    case 40:
                                        S.val(ea.call(v, (S.val() << 0) - 1, 0, 100));
                                        f.val("v", S.val(), ja.target);
                                        return false
                                }
                        }
                    }
                },
                oa = function(ja) {
                    if (!(ja.target.value == "" && ja.target != R.get(0) && (d != null &&
                            ja.target != d.get(0) || d == null))) {
                        if (!V(ja)) return ja;
                        switch (ja.target) {
                            case B.get(0):
                                B.val(ea.call(v, B.val(), 0, 255));
                                f.val("r", B.val(), ja.target);
                                break;
                            case q.get(0):
                                q.val(ea.call(v, q.val(), 0, 255));
                                f.val("g", q.val(), ja.target);
                                break;
                            case L.get(0):
                                L.val(ea.call(v, L.val(), 0, 255));
                                f.val("b", L.val(), ja.target);
                                break;
                            case Q && Q.get(0):
                                Q.val(ea.call(v, Q.val(), 0, 100));
                                f.val("a", Math.precision(Q.val() * 255 / 100, n), ja.target);
                                break;
                            case K.get(0):
                                K.val(ea.call(v, K.val(), 0, 360));
                                f.val("h", K.val(), ja.target);
                                break;
                            case I.get(0):
                                I.val(ea.call(v, I.val(), 0, 100));
                                f.val("s", I.val(), ja.target);
                                break;
                            case S.get(0):
                                S.val(ea.call(v, S.val(), 0, 100));
                                f.val("v", S.val(), ja.target);
                                break;
                            case R.get(0):
                                R.val(R.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 6));
                                d && d.val(R.val());
                                f.val("hex", R.val() != "" ? R.val() : null, ja.target);
                                break;
                            case d && d.get(0):
                                d.val(d.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 6));
                                R.val(d.val());
                                f.val("hex", d.val() != "" ? d.val() : null, ja.target);
                                break;
                            case N && N.get(0):
                                N.val(N.val().replace(/[^a-fA-F0-9]/g,
                                    "").toLowerCase().substring(0, 2));
                                f.val("a", N.val() != null ? parseInt(N.val(), 16) : null, ja.target)
                        }
                    }
                },
                Y = function(ja) {
                    if (f.val() != null) switch (ja.target) {
                        case B.get(0):
                            B.val(f.val("r"));
                            break;
                        case q.get(0):
                            q.val(f.val("g"));
                            break;
                        case L.get(0):
                            L.val(f.val("b"));
                            break;
                        case Q && Q.get(0):
                            Q.val(Math.precision(f.val("a") * 100 / 255, n));
                            break;
                        case K.get(0):
                            K.val(f.val("h"));
                            break;
                        case I.get(0):
                            I.val(f.val("s"));
                            break;
                        case S.get(0):
                            S.val(f.val("v"));
                            break;
                        case R.get(0):
                        case d && d.get(0):
                            R.val(f.val("hex"));
                            d && d.val(f.val("hex"));
                            break;
                        case N && N.get(0):
                            N.val(f.val("ahex").substring(6))
                    }
                },
                V = function(ja) {
                    switch (ja.keyCode) {
                        case 9:
                        case 16:
                        case 29:
                        case 37:
                        case 39:
                            return false;
                        case "c".charCodeAt():
                        case "v".charCodeAt():
                            if (ja.ctrlKey) return false
                    }
                    return true
                },
                ea = function(ja, ca, U) {
                    if (ja == "" || isNaN(ja)) return ca;
                    if (ja > U) return U;
                    if (ja < ca) return ca;
                    return ja
                },
                Ba = function(ja, ca) {
                    var U = ja.val("all");
                    if (ca != B.get(0)) B.val(U != null ? U.r : "");
                    if (ca != q.get(0)) q.val(U != null ? U.g : "");
                    if (ca != L.get(0)) L.val(U != null ? U.b : "");
                    if (Q && ca != Q.get(0)) Q.val(U !=
                        null ? Math.precision(U.a * 100 / 255, n) : "");
                    if (ca != K.get(0)) K.val(U != null ? U.h : "");
                    if (ca != I.get(0)) I.val(U != null ? U.s : "");
                    if (ca != S.get(0)) S.val(U != null ? U.v : "");
                    if (ca != R.get(0) && (d && ca != d.get(0) || !d)) R.val(U != null ? U.hex : "");
                    if (d && ca != d.get(0) && ca != R.get(0)) d.val(U != null ? U.hex : "");
                    if (N && ca != N.get(0)) N.val(U != null ? U.ahex.substring(6) : "")
                };
            a.extend(true, v, {
                destroy: function() {
                    B.add(q).add(L).add(Q).add(K).add(I).add(S).add(R).add(d).add(N).unbind("keyup", oa).unbind("blur", Y);
                    B.add(q).add(L).add(Q).add(K).add(I).add(S).unbind("keydown",
                        ga);
                    f.unbind(Ba);
                    N = R = S = I = K = Q = L = q = B = null
                }
            });
            B.add(q).add(L).add(Q).add(K).add(I).add(S).add(R).add(d).add(N).bind("keyup", oa).bind("blur", Y);
            B.add(q).add(L).add(Q).add(K).add(I).add(S).bind("keydown", ga);
            f.bind(Ba)
        };
    a.jPicker = {
        List: [],
        Color: function(c) {
            var f = this,
                d, n, v, B, q, L, Q, K = [],
                I = function(R) {
                    for (var N = 0; N < K.length; N++) K[N].call(f, f, R)
                },
                S = function(R, N, ga) {
                    if (N === undefined) {
                        if (R === undefined || R == null || R == "") R = "all";
                        if (d == null) return null;
                        switch (R.toLowerCase()) {
                            case "ahex":
                                return w.rgbaToHex({
                                    r: d,
                                    g: n,
                                    b: v,
                                    a: B
                                });
                            case "hex":
                                return S("ahex").substring(0, 6);
                            case "all":
                                return {
                                    r: d,
                                    g: n,
                                    b: v,
                                    a: B,
                                    h: q,
                                    s: L,
                                    v: Q,
                                    hex: S.call(f, "hex"),
                                    ahex: S.call(f, "ahex")
                                };
                            default:
                                N = {};
                                for (var oa = 0; oa < R.length; oa++) switch (R.charAt(oa)) {
                                    case "r":
                                        if (R.length == 1) N = d;
                                        else N.r = d;
                                        break;
                                    case "g":
                                        if (R.length == 1) N = n;
                                        else N.g = n;
                                        break;
                                    case "b":
                                        if (R.length == 1) N = v;
                                        else N.b = v;
                                        break;
                                    case "a":
                                        if (R.length == 1) N = B;
                                        else N.a = B;
                                        break;
                                    case "h":
                                        if (R.length == 1) N = q;
                                        else N.h = q;
                                        break;
                                    case "s":
                                        if (R.length == 1) N = L;
                                        else N.s = L;
                                        break;
                                    case "v":
                                        if (R.length ==
                                            1) N = Q;
                                        else N.v = Q
                                }
                                return N == {} ? S.call(f, "all") : N
                        }
                    }
                    if (!(ga != null && ga == f)) {
                        var Y = false;
                        if (R == null) R = "";
                        if (N == null) {
                            if (d != null) {
                                d = null;
                                Y = true
                            }
                            if (n != null) {
                                n = null;
                                Y = true
                            }
                            if (v != null) {
                                v = null;
                                Y = true
                            }
                            if (B != null) {
                                B = null;
                                Y = true
                            }
                            if (q != null) {
                                q = null;
                                Y = true
                            }
                            if (L != null) {
                                L = null;
                                Y = true
                            }
                            if (Q != null) {
                                Q = null;
                                Y = true
                            }
                            Y && I.call(f, ga || f)
                        } else switch (R.toLowerCase()) {
                            case "ahex":
                            case "hex":
                                N = w.hexToRgba(N && (N.ahex || N.hex) || N || "00000000");
                                S.call(f, "rgba", {
                                    r: N.r,
                                    g: N.g,
                                    b: N.b,
                                    a: R == "ahex" ? N.a : B != null ? B : 255
                                }, ga);
                                break;
                            default:
                                if (N &&
                                    (N.ahex != null || N.hex != null)) {
                                    S.call(f, "ahex", N.ahex || N.hex || "00000000", ga);
                                    break
                                }
                                var V = {},
                                    ea = false,
                                    Ba = false;
                                if (N.r !== undefined && !R.indexOf("r") == -1) R += "r";
                                if (N.g !== undefined && !R.indexOf("g") == -1) R += "g";
                                if (N.b !== undefined && !R.indexOf("b") == -1) R += "b";
                                if (N.a !== undefined && !R.indexOf("a") == -1) R += "a";
                                if (N.h !== undefined && !R.indexOf("h") == -1) R += "h";
                                if (N.s !== undefined && !R.indexOf("s") == -1) R += "s";
                                if (N.v !== undefined && !R.indexOf("v") == -1) R += "v";
                                for (oa = 0; oa < R.length; oa++) switch (R.charAt(oa)) {
                                    case "r":
                                        if (Ba) continue;
                                        ea = true;
                                        V.r = N && N.r && N.r | 0 || N && N | 0 || 0;
                                        if (V.r < 0) V.r = 0;
                                        else if (V.r > 255) V.r = 255;
                                        if (d != V.r) {
                                            d = V.r;
                                            Y = true
                                        }
                                        break;
                                    case "g":
                                        if (Ba) continue;
                                        ea = true;
                                        V.g = N && N.g && N.g | 0 || N && N | 0 || 0;
                                        if (V.g < 0) V.g = 0;
                                        else if (V.g > 255) V.g = 255;
                                        if (n != V.g) {
                                            n = V.g;
                                            Y = true
                                        }
                                        break;
                                    case "b":
                                        if (Ba) continue;
                                        ea = true;
                                        V.b = N && N.b && N.b | 0 || N && N | 0 || 0;
                                        if (V.b < 0) V.b = 0;
                                        else if (V.b > 255) V.b = 255;
                                        if (v != V.b) {
                                            v = V.b;
                                            Y = true
                                        }
                                        break;
                                    case "a":
                                        V.a = N && N.a != null ? N.a | 0 : N != null ? N | 0 : 255;
                                        if (V.a < 0) V.a = 0;
                                        else if (V.a > 255) V.a = 255;
                                        if (B != V.a) {
                                            B = V.a;
                                            Y = true
                                        }
                                        break;
                                    case "h":
                                        if (ea) continue;
                                        Ba = true;
                                        V.h = N && N.h && N.h | 0 || N && N | 0 || 0;
                                        if (V.h < 0) V.h = 0;
                                        else if (V.h > 360) V.h = 360;
                                        if (q != V.h) {
                                            q = V.h;
                                            Y = true
                                        }
                                        break;
                                    case "s":
                                        if (ea) continue;
                                        Ba = true;
                                        V.s = N && N.s != null ? N.s | 0 : N != null ? N | 0 : 100;
                                        if (V.s < 0) V.s = 0;
                                        else if (V.s > 100) V.s = 100;
                                        if (L != V.s) {
                                            L = V.s;
                                            Y = true
                                        }
                                        break;
                                    case "v":
                                        if (ea) continue;
                                        Ba = true;
                                        V.v = N && N.v != null ? N.v | 0 : N != null ? N | 0 : 100;
                                        if (V.v < 0) V.v = 0;
                                        else if (V.v > 100) V.v = 100;
                                        if (Q != V.v) {
                                            Q = V.v;
                                            Y = true
                                        }
                                }
                                if (Y) {
                                    if (ea) {
                                        d = d || 0;
                                        n = n || 0;
                                        v = v || 0;
                                        N = w.rgbToHsv({
                                            r: d,
                                            g: n,
                                            b: v
                                        });
                                        q = N.h;
                                        L = N.s;
                                        Q = N.v
                                    } else if (Ba) {
                                        q = q || 0;
                                        L = L != null ? L : 100;
                                        Q = Q !=
                                            null ? Q : 100;
                                        N = w.hsvToRgb({
                                            h: q,
                                            s: L,
                                            v: Q
                                        });
                                        d = N.r;
                                        n = N.g;
                                        v = N.b
                                    }
                                    B = B != null ? B : 255;
                                    I.call(f, ga || f)
                                }
                        }
                    }
                };
            a.extend(true, f, {
                val: S,
                bind: function(R) {
                    a.isFunction(R) && K.push(R)
                },
                unbind: function(R) {
                    if (a.isFunction(R))
                        for (var N;
                            (N = a.inArray(R, K)) != -1;) K.splice(N, 1)
                },
                destroy: function() {
                    K = null
                }
            });
            if (c)
                if (c.ahex != null) S("ahex", c);
                else if (c.hex != null) S((c.a != null ? "a" : "") + "hex", c.a != null ? {
                ahex: c.hex + w.intToHex(c.a)
            } : c);
            else if (c.r != null && c.g != null && c.b != null) S("rgb" + (c.a != null ? "a" : ""), c);
            else if (c.h != null && c.s != null && c.v !=
                null) S("hsv" + (c.a != null ? "a" : ""), c)
        },
        ColorMethods: {
            hexToRgba: function(c) {
                c = this.validateHex(c);
                if (c == "") return {
                    r: null,
                    g: null,
                    b: null,
                    a: null
                };
                var f = "00",
                    d = "00",
                    n = "00",
                    v = "255";
                if (c.length == 6) c += "ff";
                if (c.length > 6) {
                    f = c.substring(0, 2);
                    d = c.substring(2, 4);
                    n = c.substring(4, 6);
                    v = c.substring(6, c.length)
                } else {
                    if (c.length > 4) {
                        f = c.substring(4, c.length);
                        c = c.substring(0, 4)
                    }
                    if (c.length > 2) {
                        d = c.substring(2, c.length);
                        c = c.substring(0, 2)
                    }
                    if (c.length > 0) n = c.substring(0, c.length)
                }
                return {
                    r: this.hexToInt(f),
                    g: this.hexToInt(d),
                    b: this.hexToInt(n),
                    a: this.hexToInt(v)
                }
            },
            validateHex: function(c) {
                if (typeof c == "object") return "";
                c = c.toLowerCase().replace(/[^a-f0-9]/g, "");
                if (c.length > 8) c = c.substring(0, 8);
                return c
            },
            rgbaToHex: function(c) {
                return this.intToHex(c.r) + this.intToHex(c.g) + this.intToHex(c.b) + this.intToHex(c.a)
            },
            intToHex: function(c) {
                c = (c | 0).toString(16);
                if (c.length == 1) c = "0" + c;
                return c.toLowerCase()
            },
            hexToInt: function(c) {
                return parseInt(c, 16)
            },
            rgbToHsv: function(c) {
                var f = c.r / 255,
                    d = c.g / 255;
                c = c.b / 255;
                var n = {
                        h: 0,
                        s: 0,
                        v: 0
                    },
                    v = 0,
                    B =
                    0;
                if (f >= d && f >= c) {
                    B = f;
                    v = d > c ? c : d
                } else if (d >= c && d >= f) {
                    B = d;
                    v = f > c ? c : f
                } else {
                    B = c;
                    v = d > f ? f : d
                }
                n.v = B;
                n.s = B ? (B - v) / B : 0;
                if (n.s) {
                    v = B - v;
                    n.h = f == B ? (d - c) / v : d == B ? 2 + (c - f) / v : 4 + (f - d) / v;
                    n.h = parseInt(n.h * 60);
                    if (n.h < 0) n.h += 360
                } else n.h = 0;
                n.s = n.s * 100 | 0;
                n.v = n.v * 100 | 0;
                return n
            },
            hsvToRgb: function(c) {
                var f = {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 100
                    },
                    d = c.h,
                    n = c.s;
                c = c.v;
                if (n == 0) f.r = c == 0 ? f.g = f.b = 0 : f.g = f.b = c * 255 / 100 | 0;
                else {
                    if (d == 360) d = 0;
                    d /= 60;
                    n /= 100;
                    c /= 100;
                    var v = d | 0,
                        B = d - v;
                    d = c * (1 - n);
                    var q = c * (1 - n * B);
                    n = c * (1 - n * (1 - B));
                    switch (v) {
                        case 0:
                            f.r = c;
                            f.g = n;
                            f.b = d;
                            break;
                        case 1:
                            f.r =
                                q;
                            f.g = c;
                            f.b = d;
                            break;
                        case 2:
                            f.r = d;
                            f.g = c;
                            f.b = n;
                            break;
                        case 3:
                            f.r = d;
                            f.g = q;
                            f.b = c;
                            break;
                        case 4:
                            f.r = n;
                            f.g = d;
                            f.b = c;
                            break;
                        case 5:
                            f.r = c;
                            f.g = d;
                            f.b = q
                    }
                    f.r = f.r * 255 | 0;
                    f.g = f.g * 255 | 0;
                    f.b = f.b * 255 | 0
                }
                return f
            }
        }
    };
    var b = a.jPicker.Color,
        p = a.jPicker.List,
        w = a.jPicker.ColorMethods;
    a.fn.jPicker = function(c) {
        var f = arguments;
        return this.each(function() {
            var d = this,
                n = a.extend(true, {}, a.fn.jPicker.defaults, c);
            if (a(d).get(0).nodeName.toLowerCase() == "input") {
                a.extend(true, n, {
                    window: {
                        bindToInput: true,
                        expandable: true,
                        input: a(d)
                    }
                });
                if (a(d).val() ==
                    "") {
                    n.color.active = new b({
                        hex: null
                    });
                    n.color.current = new b({
                        hex: null
                    })
                } else if (w.validateHex(a(d).val())) {
                    n.color.active = new b({
                        hex: a(d).val(),
                        a: n.color.active.val("a")
                    });
                    n.color.current = new b({
                        hex: a(d).val(),
                        a: n.color.active.val("a")
                    })
                }
            }
            if (n.window.expandable) a(d).after('<span class="jPicker"><span class="Icon"><span class="Color">&nbsp;</span><span class="Alpha">&nbsp;</span><span class="Image" title="Click To Open Color Picker">&nbsp;</span><span class="Container">&nbsp;</span></span></span>');
            else n.window.liveUpdate = false;
            var v = parseFloat(navigator.appVersion.split("MSIE")[1]) < 7 && document.body.filters,
                B = null,
                q = null,
                L = null,
                Q = null,
                K = null,
                I = null,
                S = null,
                R = null,
                N = null,
                ga = null,
                oa = null,
                Y = null,
                V = null,
                ea = null,
                Ba = null,
                ja = null,
                ca = null,
                U = null,
                Z = null,
                na = null,
                pa = null,
                ma = null,
                la = null,
                ya = null,
                za = null,
                Ja = null,
                Ia = null,
                Fa = null,
                Ma = function(M) {
                    var P = ka.active,
                        da = P.val("hex"),
                        Ea, Oa;
                    n.color.mode = M;
                    switch (M) {
                        case "h":
                            setTimeout(function() {
                                Ta.call(d, q, "transparent");
                                Ga.call(d, Q, 0);
                                ta.call(d, Q, 100);
                                Ga.call(d,
                                    K, 260);
                                ta.call(d, K, 100);
                                Ta.call(d, L, "transparent");
                                Ga.call(d, S, 0);
                                ta.call(d, S, 100);
                                Ga.call(d, R, 260);
                                ta.call(d, R, 100);
                                Ga.call(d, N, 260);
                                ta.call(d, N, 100);
                                Ga.call(d, ga, 260);
                                ta.call(d, ga, 100);
                                Ga.call(d, Y, 260);
                                ta.call(d, Y, 100)
                            }, 0);
                            V.range("all", {
                                minX: 0,
                                maxX: 100,
                                minY: 0,
                                maxY: 100
                            });
                            ea.range("rangeY", {
                                minY: 0,
                                maxY: 360
                            });
                            if (P.val("ahex") == null) break;
                            V.val("xy", {
                                x: P.val("s"),
                                y: 100 - P.val("v")
                            }, V);
                            ea.val("y", 360 - P.val("h"), ea);
                            break;
                        case "s":
                            setTimeout(function() {
                                Ta.call(d, q, "transparent");
                                Ga.call(d, Q, -260);
                                Ga.call(d,
                                    K, -520);
                                Ga.call(d, S, -260);
                                Ga.call(d, R, -520);
                                Ga.call(d, Y, 260);
                                ta.call(d, Y, 100)
                            }, 0);
                            V.range("all", {
                                minX: 0,
                                maxX: 360,
                                minY: 0,
                                maxY: 100
                            });
                            ea.range("rangeY", {
                                minY: 0,
                                maxY: 100
                            });
                            if (P.val("ahex") == null) break;
                            V.val("xy", {
                                x: P.val("h"),
                                y: 100 - P.val("v")
                            }, V);
                            ea.val("y", 100 - P.val("s"), ea);
                            break;
                        case "v":
                            setTimeout(function() {
                                Ta.call(d, q, "000000");
                                Ga.call(d, Q, -780);
                                Ga.call(d, K, 260);
                                Ta.call(d, L, da);
                                Ga.call(d, S, -520);
                                Ga.call(d, R, 260);
                                ta.call(d, R, 100);
                                Ga.call(d, Y, 260);
                                ta.call(d, Y, 100)
                            }, 0);
                            V.range("all", {
                                minX: 0,
                                maxX: 360,
                                minY: 0,
                                maxY: 100
                            });
                            ea.range("rangeY", {
                                minY: 0,
                                maxY: 100
                            });
                            if (P.val("ahex") == null) break;
                            V.val("xy", {
                                x: P.val("h"),
                                y: 100 - P.val("s")
                            }, V);
                            ea.val("y", 100 - P.val("v"), ea);
                            break;
                        case "r":
                            Ea = -1040;
                            Oa = -780;
                            V.range("all", {
                                minX: 0,
                                maxX: 255,
                                minY: 0,
                                maxY: 255
                            });
                            ea.range("rangeY", {
                                minY: 0,
                                maxY: 255
                            });
                            if (P.val("ahex") == null) break;
                            V.val("xy", {
                                x: P.val("b"),
                                y: 255 - P.val("g")
                            }, V);
                            ea.val("y", 255 - P.val("r"), ea);
                            break;
                        case "g":
                            Ea = -1560;
                            Oa = -1820;
                            V.range("all", {
                                minX: 0,
                                maxX: 255,
                                minY: 0,
                                maxY: 255
                            });
                            ea.range("rangeY", {
                                minY: 0,
                                maxY: 255
                            });
                            if (P.val("ahex") == null) break;
                            V.val("xy", {
                                x: P.val("b"),
                                y: 255 - P.val("r")
                            }, V);
                            ea.val("y", 255 - P.val("g"), ea);
                            break;
                        case "b":
                            Ea = -2080;
                            Oa = -2860;
                            V.range("all", {
                                minX: 0,
                                maxX: 255,
                                minY: 0,
                                maxY: 255
                            });
                            ea.range("rangeY", {
                                minY: 0,
                                maxY: 255
                            });
                            if (P.val("ahex") == null) break;
                            V.val("xy", {
                                x: P.val("r"),
                                y: 255 - P.val("g")
                            }, V);
                            ea.val("y", 255 - P.val("b"), ea);
                            break;
                        case "a":
                            setTimeout(function() {
                                Ta.call(d, q, "transparent");
                                Ga.call(d, Q, -260);
                                Ga.call(d, K, -520);
                                Ga.call(d, S, 260);
                                Ga.call(d, R, 260);
                                ta.call(d, R, 100);
                                Ga.call(d, Y, 0);
                                ta.call(d,
                                    Y, 100)
                            }, 0);
                            V.range("all", {
                                minX: 0,
                                maxX: 360,
                                minY: 0,
                                maxY: 100
                            });
                            ea.range("rangeY", {
                                minY: 0,
                                maxY: 255
                            });
                            if (P.val("ahex") == null) break;
                            V.val("xy", {
                                x: P.val("h"),
                                y: 100 - P.val("v")
                            }, V);
                            ea.val("y", 255 - P.val("a"), ea);
                            break;
                        default:
                            throw "Invalid Mode";
                    }
                    switch (M) {
                        case "s":
                        case "v":
                        case "a":
                            setTimeout(function() {
                                ta.call(d, Q, 100);
                                ta.call(d, S, 100);
                                Ga.call(d, N, 260);
                                ta.call(d, N, 100);
                                Ga.call(d, ga, 260);
                                ta.call(d, ga, 100)
                            }, 0);
                            break;
                        case "r":
                        case "g":
                        case "b":
                            setTimeout(function() {
                                Ta.call(d, q, "transparent");
                                Ta.call(d, L, "transparent");
                                ta.call(d, S, 100);
                                ta.call(d, Q, 100);
                                Ga.call(d, Q, Ea);
                                Ga.call(d, K, Ea - 260);
                                Ga.call(d, S, Oa - 780);
                                Ga.call(d, R, Oa - 520);
                                Ga.call(d, N, Oa);
                                Ga.call(d, ga, Oa - 260);
                                Ga.call(d, Y, 260);
                                ta.call(d, Y, 100)
                            }, 0)
                    }
                    P.val("ahex") != null && Da.call(d, P)
                },
                Da = function(M, P) {
                    if (P == null || P != ea && P != V) va.call(d, M, P);
                    setTimeout(function() {
                        kb.call(d, M);
                        vb.call(d, M);
                        cb.call(d, M)
                    }, 0)
                },
                wa = function(M, P) {
                    var da = ka.active;
                    if (!(P != V && da.val() == null)) {
                        var Ea = M.val("all");
                        switch (n.color.mode) {
                            case "h":
                                da.val("sv", {
                                    s: Ea.x,
                                    v: 100 - Ea.y
                                }, P);
                                break;
                            case "s":
                            case "a":
                                da.val("hv", {
                                    h: Ea.x,
                                    v: 100 - Ea.y
                                }, P);
                                break;
                            case "v":
                                da.val("hs", {
                                    h: Ea.x,
                                    s: 100 - Ea.y
                                }, P);
                                break;
                            case "r":
                                da.val("gb", {
                                    g: 255 - Ea.y,
                                    b: Ea.x
                                }, P);
                                break;
                            case "g":
                                da.val("rb", {
                                    r: 255 - Ea.y,
                                    b: Ea.x
                                }, P);
                                break;
                            case "b":
                                da.val("rg", {
                                    r: Ea.x,
                                    g: 255 - Ea.y
                                }, P)
                        }
                    }
                },
                ra = function(M, P) {
                    var da = ka.active;
                    if (!(P != ea && da.val() == null)) switch (n.color.mode) {
                        case "h":
                            da.val("h", {
                                h: 360 - M.val("y")
                            }, P);
                            break;
                        case "s":
                            da.val("s", {
                                s: 100 - M.val("y")
                            }, P);
                            break;
                        case "v":
                            da.val("v", {
                                v: 100 - M.val("y")
                            }, P);
                            break;
                        case "r":
                            da.val("r", {
                                r: 255 - M.val("y")
                            }, P);
                            break;
                        case "g":
                            da.val("g", {
                                g: 255 - M.val("y")
                            }, P);
                            break;
                        case "b":
                            da.val("b", {
                                b: 255 - M.val("y")
                            }, P);
                            break;
                        case "a":
                            da.val("a", 255 - M.val("y"), P)
                    }
                },
                va = function(M, P) {
                    if (P != V) switch (n.color.mode) {
                        case "h":
                            var da = M.val("sv");
                            V.val("xy", {
                                x: da != null ? da.s : 100,
                                y: 100 - (da != null ? da.v : 100)
                            }, P);
                            break;
                        case "s":
                        case "a":
                            da = M.val("hv");
                            V.val("xy", {
                                x: da && da.h || 0,
                                y: 100 - (da != null ? da.v : 100)
                            }, P);
                            break;
                        case "v":
                            da = M.val("hs");
                            V.val("xy", {
                                x: da && da.h || 0,
                                y: 100 - (da != null ? da.s : 100)
                            }, P);
                            break;
                        case "r":
                            da = M.val("bg");
                            V.val("xy", {
                                x: da &&
                                    da.b || 0,
                                y: 255 - (da && da.g || 0)
                            }, P);
                            break;
                        case "g":
                            da = M.val("br");
                            V.val("xy", {
                                x: da && da.b || 0,
                                y: 255 - (da && da.r || 0)
                            }, P);
                            break;
                        case "b":
                            da = M.val("rg");
                            V.val("xy", {
                                x: da && da.r || 0,
                                y: 255 - (da && da.g || 0)
                            }, P)
                    }
                    if (P != ea) switch (n.color.mode) {
                        case "h":
                            ea.val("y", 360 - (M.val("h") || 0), P);
                            break;
                        case "s":
                            da = M.val("s");
                            ea.val("y", 100 - (da != null ? da : 100), P);
                            break;
                        case "v":
                            da = M.val("v");
                            ea.val("y", 100 - (da != null ? da : 100), P);
                            break;
                        case "r":
                            ea.val("y", 255 - (M.val("r") || 0), P);
                            break;
                        case "g":
                            ea.val("y", 255 - (M.val("g") || 0), P);
                            break;
                        case "b":
                            ea.val("y",
                                255 - (M.val("b") || 0), P);
                            break;
                        case "a":
                            da = M.val("a");
                            ea.val("y", 255 - (da != null ? da : 255), P)
                    }
                },
                kb = function(M) {
                    try {
                        var P = M.val("all");
                        na.css({
                            backgroundColor: P && "#" + P.hex || "transparent"
                        });
                        ta.call(d, na, P && Math.precision(P.a * 100 / 255, 4) || 0)
                    } catch (da) {}
                },
                vb = function(M) {
                    switch (n.color.mode) {
                        case "h":
                            Ta.call(d, q, (new b({
                                h: M.val("h") || 0,
                                s: 100,
                                v: 100
                            })).val("hex"));
                            break;
                        case "s":
                        case "a":
                            var P = M.val("s");
                            ta.call(d, K, 100 - (P != null ? P : 100));
                            break;
                        case "v":
                            P = M.val("v");
                            ta.call(d, Q, P != null ? P : 100);
                            break;
                        case "r":
                            ta.call(d,
                                K, Math.precision((M.val("r") || 0) / 255 * 100, 4));
                            break;
                        case "g":
                            ta.call(d, K, Math.precision((M.val("g") || 0) / 255 * 100, 4));
                            break;
                        case "b":
                            ta.call(d, K, Math.precision((M.val("b") || 0) / 255 * 100))
                    }
                    M = M.val("a");
                    ta.call(d, I, Math.precision((255 - (M || 0)) * 100 / 255, 4))
                },
                cb = function(M) {
                    switch (n.color.mode) {
                        case "h":
                            var P = M.val("a");
                            ta.call(d, oa, Math.precision((255 - (P || 0)) * 100 / 255, 4));
                            break;
                        case "s":
                            P = M.val("hva");
                            var da = new b({
                                h: P && P.h || 0,
                                s: 100,
                                v: P != null ? P.v : 100
                            });
                            Ta.call(d, L, da.val("hex"));
                            ta.call(d, R, 100 - (P != null ? P.v :
                                100));
                            ta.call(d, oa, Math.precision((255 - (P && P.a || 0)) * 100 / 255, 4));
                            break;
                        case "v":
                            P = M.val("hsa");
                            da = new b({
                                h: P && P.h || 0,
                                s: P != null ? P.s : 100,
                                v: 100
                            });
                            Ta.call(d, L, da.val("hex"));
                            ta.call(d, oa, Math.precision((255 - (P && P.a || 0)) * 100 / 255, 4));
                            break;
                        case "r":
                        case "g":
                        case "b":
                            da = P = 0;
                            M = M.val("rgba");
                            if (n.color.mode == "r") {
                                P = M && M.b || 0;
                                da = M && M.g || 0
                            } else if (n.color.mode == "g") {
                                P = M && M.b || 0;
                                da = M && M.r || 0
                            } else if (n.color.mode == "b") {
                                P = M && M.r || 0;
                                da = M && M.g || 0
                            }
                            var Ea = da > P ? P : da;
                            ta.call(d, R, P > da ? Math.precision((P - da) / (255 - da) * 100,
                                4) : 0);
                            ta.call(d, N, da > P ? Math.precision((da - P) / (255 - P) * 100, 4) : 0);
                            ta.call(d, ga, Math.precision(Ea / 255 * 100, 4));
                            ta.call(d, oa, Math.precision((255 - (M && M.a || 0)) * 100 / 255, 4));
                            break;
                        case "a":
                            P = M.val("a");
                            Ta.call(d, L, M.val("hex") || "000000");
                            ta.call(d, oa, P != null ? 0 : 100);
                            ta.call(d, Y, P != null ? 100 : 0)
                    }
                },
                Ta = function(M, P) {
                    M.css({
                        backgroundColor: P && P.length == 6 && "#" + P || "transparent"
                    })
                },
                Va = function(M, P) {
                    if (v && (P.indexOf("AlphaBar.png") != -1 || P.indexOf("Bars.png") != -1 || P.indexOf("Maps.png") != -1)) {
                        M.attr("pngSrc", P);
                        M.css({
                            backgroundImage: "none",
                            filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + P + "', sizingMethod='scale')"
                        })
                    } else M.css({
                        backgroundImage: "url('" + P + "')"
                    })
                },
                Ga = function(M, P) {
                    M.css({
                        top: P + "px"
                    })
                },
                ta = function(M, P) {
                    M.css({
                        visibility: P > 0 ? "visible" : "hidden"
                    });
                    if (P > 0 && P < 100)
                        if (v) {
                            var da = M.attr("pngSrc");
                            da != null && (da.indexOf("AlphaBar.png") != -1 || da.indexOf("Bars.png") != -1 || da.indexOf("Maps.png") != -1) ? M.css({
                                filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + da + "', sizingMethod='scale') progid:DXImageTransform.Microsoft.Alpha(opacity=" +
                                    P + ")"
                            }) : M.css({
                                opacity: Math.precision(P / 100, 4)
                            })
                        } else M.css({
                            opacity: Math.precision(P / 100, 4)
                        });
                    else if (P == 0 || P == 100)
                        if (v) {
                            da = M.attr("pngSrc");
                            da != null && (da.indexOf("AlphaBar.png") != -1 || da.indexOf("Bars.png") != -1 || da.indexOf("Maps.png") != -1) ? M.css({
                                filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + da + "', sizingMethod='scale')"
                            }) : M.css({
                                opacity: ""
                            })
                        } else M.css({
                            opacity: ""
                        })
                },
                $a = function() {
                    ka.active.val("ahex", ka.current.val("ahex"))
                },
                Ka = function() {
                    ka.current.val("ahex", ka.active.val("ahex"))
                },
                Sa = function(M) {
                    a(this).parents("tbody:first").find('input:radio[value!="' + M.target.value + '"]').removeAttr("checked");
                    Ma.call(d, M.target.value)
                },
                Ha = function() {
                    $a.call(d)
                },
                db = function() {
                    $a.call(d);
                    n.window.expandable && fb.call(d);
                    a.isFunction(ob) && ob.call(d, ka.active, la)
                },
                lb = function() {
                    Ka.call(d);
                    n.window.expandable && fb.call(d);
                    a.isFunction(ib) && ib.call(d, ka.active, ma)
                },
                Ua = function() {
                    pb.call(d)
                },
                Xa = function(M) {
                    var P = M.val("hex");
                    pa.css({
                        backgroundColor: P && "#" + P || "transparent"
                    });
                    ta.call(d, pa, Math.precision((M.val("a") ||
                        0) * 100 / 255, 4))
                },
                wb = function(M) {
                    var P = M.val("hex");
                    M = M.val("va");
                    za.css({
                        backgroundColor: P && "#" + P || "transparent"
                    });
                    ta.call(d, Ja, Math.precision((255 - (M && M.a || 0)) * 100 / 255, 4));
                    if (n.window.bindToInput && n.window.updateInputColor) n.window.input.css({
                        backgroundColor: P && "#" + P || "transparent",
                        color: M == null || M.v > 75 ? "#000000" : "#ffffff"
                    })
                },
                sa = function(M) {
                    ja = parseInt(B.css("left"));
                    ca = parseInt(B.css("top"));
                    U = M.pageX;
                    Z = M.pageY;
                    a(document).bind("mousemove", hb).bind("mouseup", eb);
                    M.preventDefault()
                },
                hb = function(M) {
                    B.css({
                        left: ja -
                            (U - M.pageX) + "px",
                        top: ca - (Z - M.pageY) + "px"
                    });
                    n.window.expandable && !a.support.boxModel && B.prev().css({
                        left: B.css("left"),
                        top: B.css("top")
                    });
                    M.stopPropagation();
                    M.preventDefault();
                    return false
                },
                eb = function(M) {
                    a(document).unbind("mousemove", hb).unbind("mouseup", eb);
                    M.stopPropagation();
                    M.preventDefault();
                    return false
                },
                sb = function(M) {
                    M.preventDefault();
                    M.stopPropagation();
                    ka.active.val("ahex", a(this).attr("title") || null, M.target);
                    return false
                },
                ib = a.isFunction(f[1]) && f[1] || null,
                ab = a.isFunction(f[2]) && f[2] ||
                null,
                ob = a.isFunction(f[3]) && f[3] || null,
                pb = function() {
                    ka.current.val("ahex", ka.active.val("ahex"));
                    var M = function() {
                        if (!(!n.window.expandable || a.support.boxModel)) {
                            var P = B.find("table:first");
                            B.before("<iframe/>");
                            B.prev().css({
                                width: P.width(),
                                height: B.height(),
                                opacity: 0,
                                position: "absolute",
                                left: B.css("left"),
                                top: B.css("top")
                            })
                        }
                    };
                    if (n.window.expandable) {
                        a(document.body).children("div.jPicker.Container").css({
                            zIndex: 10
                        });
                        B.css({
                            zIndex: 20
                        })
                    }
                    switch (n.window.effects.type) {
                        case "fade":
                            B.fadeIn(n.window.effects.speed.show,
                                M);
                            break;
                        case "slide":
                            B.slideDown(n.window.effects.speed.show, M);
                            break;
                        default:
                            B.show(n.window.effects.speed.show, M)
                    }
                },
                fb = function() {
                    var M = function() {
                        n.window.expandable && B.css({
                            zIndex: 10
                        });
                        !n.window.expandable || a.support.boxModel || B.prev().remove()
                    };
                    switch (n.window.effects.type) {
                        case "fade":
                            B.fadeOut(n.window.effects.speed.hide, M);
                            break;
                        case "slide":
                            B.slideUp(n.window.effects.speed.hide, M);
                            break;
                        default:
                            B.hide(n.window.effects.speed.hide, M)
                    }
                },
                tb = function() {
                    var M = n.window,
                        P = M.expandable ? a(d).next().find(".Container:first") :
                        null;
                    B = M.expandable ? a("<div/>") : a(d);
                    B.addClass("jPicker Container");
                    M.expandable && B.hide();
                    B.get(0).onselectstart = function(xa) {
                        if (xa.target.nodeName.toLowerCase() !== "input") return false
                    };
                    var da = ka.active.val("all");
                    if (M.alphaPrecision < 0) M.alphaPrecision = 0;
                    else if (M.alphaPrecision > 2) M.alphaPrecision = 2;
                    var Ea = '<table class="jPicker" cellpadding="0" cellspacing="0"><tbody>' + (M.expandable ? '<tr><td class="Move" colspan="5">&nbsp;</td></tr>' : "") + '<tr><td rowspan="9"><h2 class="Title">' + (M.title || aa.text.title) +
                        '</h2><div class="Map"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><img src="' + ia.clientPath + ia.colorMap.arrow.file + '" class="Arrow"/></div></td><td rowspan="9"><div class="Bar"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><span class="Map4">&nbsp;</span><span class="Map5">&nbsp;</span><span class="Map6">&nbsp;</span><img src="' + ia.clientPath + ia.colorBar.arrow.file + '" class="Arrow"/></div></td><td colspan="2" class="Preview"><div class="prev_div">' +
                        aa.text.newColor + '<div class="color_preview"><span class="Active" title="' + aa.tooltips.colors.newColor + '">&nbsp;</span><span class="Current" title="' + aa.tooltips.colors.currentColor + '">&nbsp;</span></div></div>' + aa.text.currentColor + '</td><td rowspan="9" class="Button"><input type="button" class="Ok" value="' + aa.text.ok + '" title="' + aa.tooltips.buttons.ok + '"/><input type="button" class="Cancel" value="' + aa.text.cancel + '" title="' + aa.tooltips.buttons.cancel + '"/><div class="Grid">&nbsp;</div></td></tr><tr class="Hue"><td class="Radio"><label title="' +
                        aa.tooltips.hue.radio + '"><input type="radio" value="h"' + (n.color.mode == "h" ? ' checked="checked"' : "") + '/>H:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (da != null ? da.h : "") + '" title="' + aa.tooltips.hue.textbox + '"/>&nbsp;\u00ba</td></tr><tr class="Saturation"><td class="Radio"><label title="' + aa.tooltips.saturation.radio + '"><input type="radio" value="s"' + (n.color.mode == "s" ? ' checked="checked"' : "") + '/>S:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (da !=
                            null ? da.s : "") + '" title="' + aa.tooltips.saturation.textbox + '"/>&nbsp;%</td></tr><tr class="Value"><td class="Radio"><label title="' + aa.tooltips.value.radio + '"><input type="radio" value="v"' + (n.color.mode == "v" ? ' checked="checked"' : "") + '/>V:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (da != null ? da.v : "") + '" title="' + aa.tooltips.value.textbox + '"/>&nbsp;%<br/><br/></td></tr><tr class="Red"><td class="Radio"><label title="' + aa.tooltips.red.radio + '"><input type="radio" value="r"' +
                        (n.color.mode == "r" ? ' checked="checked"' : "") + '/>R:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (da != null ? da.r : "") + '" title="' + aa.tooltips.red.textbox + '"/></td></tr><tr class="Green"><td class="Radio"><label title="' + aa.tooltips.green.radio + '"><input type="radio" value="g"' + (n.color.mode == "g" ? ' checked="checked"' : "") + '/>G:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (da != null ? da.g : "") + '" title="' + aa.tooltips.green.textbox + '"/></td></tr><tr class="Blue"><td class="Radio"><label title="' +
                        aa.tooltips.blue.radio + '"><input type="radio" value="b"' + (n.color.mode == "b" ? ' checked="checked"' : "") + '/>B:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (da != null ? da.b : "") + '" title="' + aa.tooltips.blue.textbox + '"/></td></tr><tr class="Alpha"><td class="Radio">' + (M.alphaSupport ? '<label title="' + aa.tooltips.alpha.radio + '"><input type="radio" value="a"' + (n.color.mode == "a" ? ' checked="checked"' : "") + "/>A:</label>" : "&nbsp;") + '</td><td class="Text">' + (M.alphaSupport ? '<input type="text" maxlength="' +
                            (3 + M.alphaPrecision) + '" value="' + (da != null ? Math.precision(da.a * 100 / 255, M.alphaPrecision) : "") + '" title="' + aa.tooltips.alpha.textbox + '"/>&nbsp;%' : "&nbsp;") + '</td></tr><tr class="Hex"><td colspan="2" class="Text"><label title="' + aa.tooltips.hex.textbox + '">#:<input type="text" maxlength="6" class="Hex" value="' + (da != null ? da.hex : "") + '"/></label>' + (M.alphaSupport ? '<input type="text" maxlength="2" class="AHex" value="' + (da != null ? da.ahex.substring(6) : "") + '" title="' + aa.tooltips.hex.alpha + '"/></td>' : "&nbsp;") +
                        "</tr></tbody></table>";
                    if (M.expandable) {
                        B.html(Ea);
                        a(document.body).children("div.jPicker.Container").length == 0 ? a(document.body).prepend(B) : a(document.body).children("div.jPicker.Container:last").after(B);
                        B.mousedown(function() {
                            a(document.body).children("div.jPicker.Container").css({
                                zIndex: 10
                            });
                            B.css({
                                zIndex: 20
                            })
                        });
                        B.css({
                            left: M.position.x == "left" ? P.offset().left - 530 - (M.position.y == "center" ? 25 : 0) + "px" : M.position.x == "center" ? P.offset().left - 260 + "px" : M.position.x == "right" ? P.offset().left - 10 + (M.position.y ==
                                "center" ? 25 : 0) + "px" : M.position.x == "screenCenter" ? (a(document).width() >> 1) - 260 + "px" : P.offset().left + parseInt(M.position.x) + "px",
                            position: "absolute",
                            top: M.position.y == "top" ? P.offset().top - 312 + "px" : M.position.y == "center" ? P.offset().top - 156 + "px" : M.position.y == "bottom" ? P.offset().top + 25 + "px" : P.offset().top + parseInt(M.position.y) + "px"
                        })
                    } else {
                        B = a(d);
                        B.html(Ea)
                    }
                    Ea = B.find("tbody:first");
                    q = Ea.find("div.Map:first");
                    L = Ea.find("div.Bar:first");
                    var Oa = q.find("span"),
                        Wa = L.find("span");
                    Q = Oa.filter(".Map1:first");
                    K = Oa.filter(".Map2:first");
                    I = Oa.filter(".Map3:first");
                    S = Wa.filter(".Map1:first");
                    R = Wa.filter(".Map2:first");
                    N = Wa.filter(".Map3:first");
                    ga = Wa.filter(".Map4:first");
                    oa = Wa.filter(".Map5:first");
                    Y = Wa.filter(".Map6:first");
                    V = new s(q, {
                        map: {
                            width: ia.colorMap.width,
                            height: ia.colorMap.height
                        },
                        arrow: {
                            image: ia.clientPath + ia.colorMap.arrow.file,
                            width: ia.colorMap.arrow.width,
                            height: ia.colorMap.arrow.height
                        }
                    });
                    V.bind(wa);
                    ea = new s(L, {
                        map: {
                            width: ia.colorBar.width,
                            height: ia.colorBar.height
                        },
                        arrow: {
                            image: ia.clientPath +
                                ia.colorBar.arrow.file,
                            width: ia.colorBar.arrow.width,
                            height: ia.colorBar.arrow.height
                        }
                    });
                    ea.bind(ra);
                    Ba = new g(Ea, ka.active, M.expandable && M.bindToInput ? M.input : null, M.alphaPrecision);
                    Oa = da != null ? da.hex : null;
                    var Za = Ea.find(".Preview");
                    Wa = Ea.find(".Button");
                    na = Za.find(".Active:first").css({
                        backgroundColor: Oa && "#" + Oa || "transparent"
                    });
                    pa = Za.find(".Current:first").css({
                        backgroundColor: Oa && "#" + Oa || "transparent"
                    }).bind("click", Ha);
                    ta.call(d, pa, Math.precision(ka.current.val("a") * 100) / 255, 4);
                    ma = Wa.find(".Ok:first").bind("click touchstart",
                        lb);
                    la = Wa.find(".Cancel:first").bind("click touchstart", db);
                    ya = Wa.find(".Grid:first");
                    setTimeout(function() {
                        Va.call(d, Q, ia.clientPath + "Maps.png");
                        Va.call(d, K, ia.clientPath + "Maps.png");
                        Va.call(d, I, ia.clientPath + "map-opacity.png");
                        Va.call(d, S, ia.clientPath + "Bars.png");
                        Va.call(d, R, ia.clientPath + "Bars.png");
                        Va.call(d, N, ia.clientPath + "Bars.png");
                        Va.call(d, ga, ia.clientPath + "Bars.png");
                        Va.call(d, oa, ia.clientPath + "bar-opacity.png");
                        Va.call(d, Y, ia.clientPath + "AlphaBar.png");
                        Va.call(d, Za.find("div:last"), ia.clientPath +
                            "preview-opacity.png")
                    }, 0);
                    Ea.find("td.Radio input").bind("click  touchstart", Sa);
                    if (ka.quickList && ka.quickList.length > 0) {
                        Wa = "";
                        for (i = 0; i < ka.quickList.length; i++) {
                            if ((typeof ka.quickList[i]).toString().toLowerCase() == "string") ka.quickList[i] = new b({
                                hex: ka.quickList[i]
                            });
                            var nb = ka.quickList[i].val("a"),
                                Ra = ka.quickList[i].val("ahex");
                            if (!M.alphaSupport && Ra) Ra = Ra.substring(0, 6) + "ff";
                            var mb = ka.quickList[i].val("hex");
                            Wa += '<span class="QuickColor"' + (Ra && ' title="#' + Ra + '"' || "") + ' style="background-color:' +
                                (mb && "#" + mb || "") + ";" + (mb ? "" : "background-image:url(" + ia.clientPath + "NoColor.png)") + (M.alphaSupport && nb && nb < 255 ? ";opacity:" + Math.precision(nb / 255, 4) + ";filter:Alpha(opacity=" + Math.precision(nb / 2.55, 4) + ")" : "") + '">&nbsp;</span>'
                        }
                        Va.call(d, ya, ia.clientPath + "bar-opacity.png");
                        ya.html(Wa);
                        ya.find(".QuickColor").click(sb)
                    }
                    Ma.call(d, n.color.mode);
                    ka.active.bind(Da);
                    a.isFunction(ab) && ka.active.bind(ab);
                    ka.current.bind(Xa);
                    if (M.expandable) {
                        d.icon = P.parents(".Icon:first");
                        za = d.icon.find(".Color:first").css({
                            backgroundColor: Oa &&
                                "#" + Oa || "transparent"
                        });
                        Ja = d.icon.find(".Alpha:first");
                        Va.call(d, Ja, ia.clientPath + "bar-opacity.png");
                        ta.call(d, Ja, Math.precision((255 - (da != null ? da.a : 0)) * 100 / 255, 4));
                        Ia = d.icon.find(".Image:first").css({
                            backgroundImage: "url('" + ia.clientPath + ia.picker.file + "')"
                        }).bind("click", Ua);
                        if (M.bindToInput && M.updateInputColor) M.input.css({
                            backgroundColor: Oa && "#" + Oa || "transparent",
                            color: da == null || da.v > 75 ? "#000000" : "#ffffff"
                        });
                        Fa = Ea.find(".Move:first").bind("mousedown", sa);
                        ka.active.bind(wb)
                    } else pb.call(d)
                },
                ia =
                n.images,
                aa = n.localization,
                ka = {
                    active: (typeof n.color.active).toString().toLowerCase() == "string" ? new b({
                        ahex: !n.window.alphaSupport && n.color.active ? n.color.active.substring(0, 6) + "ff" : n.color.active
                    }) : new b({
                        ahex: !n.window.alphaSupport && n.color.active.val("ahex") ? n.color.active.val("ahex").substring(0, 6) + "ff" : n.color.active.val("ahex")
                    }),
                    current: (typeof n.color.active).toString().toLowerCase() == "string" ? new b({
                        ahex: !n.window.alphaSupport && n.color.active ? n.color.active.substring(0, 6) + "ff" : n.color.active
                    }) : new b({
                        ahex: !n.window.alphaSupport && n.color.active.val("ahex") ? n.color.active.val("ahex").substring(0, 6) + "ff" : n.color.active.val("ahex")
                    }),
                    quickList: n.color.quickList
                };
            a.extend(true, d, {
                commitCallback: ib,
                liveCallback: ab,
                cancelCallback: ob,
                color: ka,
                show: pb,
                hide: fb,
                destroy: function() {
                    B.find("td.Radio input  touchstart").unbind("click", Sa);
                    pa.unbind("click  touchstart", Ha);
                    la.unbind("click  touchstart", db);
                    ma.unbind("click  touchstart", lb);
                    if (n.window.expandable) {
                        Ia.unbind("click", Ua);
                        Fa.unbind("mousedown",
                            sa);
                        d.icon = null
                    }
                    B.find(".QuickColor").unbind("click", sb);
                    Y = oa = ga = N = R = S = I = K = Q = L = q = null;
                    V.destroy();
                    V = null;
                    ea.destroy();
                    ea = null;
                    Ba.destroy();
                    ab = ob = ib = ya = la = ma = pa = na = Ba = null;
                    B.html("");
                    for (i = 0; i < p.length; i++) p[i] == d && p.splice(i, 1)
                }
            });
            p.push(d);
            setTimeout(function() {
                tb.call(d)
            }, 0)
        })
    };
    a.fn.jPicker.defaults = {
        window: {
            title: null,
            effects: {
                type: "slide",
                speed: {
                    show: "slow",
                    hide: "fast"
                }
            },
            position: {
                x: "screenCenter",
                y: "top"
            },
            expandable: false,
            liveUpdate: true,
            alphaSupport: false,
            alphaPrecision: 0,
            updateInputColor: true
        },
        color: {
            mode: "h",
            active: new b({
                ahex: "#ffcc00ff"
            }),
            quickList: [new b({
                    h: 360,
                    s: 33,
                    v: 100
                }), new b({
                    h: 360,
                    s: 66,
                    v: 100
                }), new b({
                    h: 360,
                    s: 100,
                    v: 100
                }), new b({
                    h: 360,
                    s: 100,
                    v: 75
                }), new b({
                    h: 360,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 100
                }), new b({
                    h: 30,
                    s: 33,
                    v: 100
                }), new b({
                    h: 30,
                    s: 66,
                    v: 100
                }), new b({
                    h: 30,
                    s: 100,
                    v: 100
                }), new b({
                    h: 30,
                    s: 100,
                    v: 75
                }), new b({
                    h: 30,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 90
                }), new b({
                    h: 60,
                    s: 33,
                    v: 100
                }), new b({
                    h: 60,
                    s: 66,
                    v: 100
                }), new b({
                    h: 60,
                    s: 100,
                    v: 100
                }), new b({
                    h: 60,
                    s: 100,
                    v: 75
                }), new b({
                    h: 60,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 80
                }), new b({
                    h: 90,
                    s: 33,
                    v: 100
                }), new b({
                    h: 90,
                    s: 66,
                    v: 100
                }), new b({
                    h: 90,
                    s: 100,
                    v: 100
                }), new b({
                    h: 90,
                    s: 100,
                    v: 75
                }), new b({
                    h: 90,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 70
                }), new b({
                    h: 120,
                    s: 33,
                    v: 100
                }), new b({
                    h: 120,
                    s: 66,
                    v: 100
                }), new b({
                    h: 120,
                    s: 100,
                    v: 100
                }), new b({
                    h: 120,
                    s: 100,
                    v: 75
                }), new b({
                    h: 120,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 60
                }), new b({
                    h: 150,
                    s: 33,
                    v: 100
                }), new b({
                    h: 150,
                    s: 66,
                    v: 100
                }), new b({
                    h: 150,
                    s: 100,
                    v: 100
                }), new b({
                    h: 150,
                    s: 100,
                    v: 75
                }), new b({
                    h: 150,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 50
                }), new b({
                    h: 180,
                    s: 33,
                    v: 100
                }), new b({
                    h: 180,
                    s: 66,
                    v: 100
                }), new b({
                    h: 180,
                    s: 100,
                    v: 100
                }), new b({
                    h: 180,
                    s: 100,
                    v: 75
                }), new b({
                    h: 180,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 40
                }), new b({
                    h: 210,
                    s: 33,
                    v: 100
                }), new b({
                    h: 210,
                    s: 66,
                    v: 100
                }), new b({
                    h: 210,
                    s: 100,
                    v: 100
                }), new b({
                    h: 210,
                    s: 100,
                    v: 75
                }), new b({
                    h: 210,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 30
                }), new b({
                    h: 240,
                    s: 33,
                    v: 100
                }), new b({
                    h: 240,
                    s: 66,
                    v: 100
                }), new b({
                    h: 240,
                    s: 100,
                    v: 100
                }), new b({
                    h: 240,
                    s: 100,
                    v: 75
                }), new b({
                    h: 240,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 20
                }), new b({
                    h: 270,
                    s: 33,
                    v: 100
                }), new b({
                    h: 270,
                    s: 66,
                    v: 100
                }), new b({
                    h: 270,
                    s: 100,
                    v: 100
                }),
                new b({
                    h: 270,
                    s: 100,
                    v: 75
                }), new b({
                    h: 270,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 10
                }), new b({
                    h: 300,
                    s: 33,
                    v: 100
                }), new b({
                    h: 300,
                    s: 66,
                    v: 100
                }), new b({
                    h: 300,
                    s: 100,
                    v: 100
                }), new b({
                    h: 300,
                    s: 100,
                    v: 75
                }), new b({
                    h: 300,
                    s: 100,
                    v: 50
                }), new b({
                    h: 180,
                    s: 0,
                    v: 0
                }), new b({
                    h: 330,
                    s: 33,
                    v: 100
                }), new b({
                    h: 330,
                    s: 66,
                    v: 100
                }), new b({
                    h: 330,
                    s: 100,
                    v: 100
                }), new b({
                    h: 330,
                    s: 100,
                    v: 75
                }), new b({
                    h: 330,
                    s: 100,
                    v: 50
                }), new b
            ]
        },
        images: {
            clientPath: "/jPicker/images/",
            colorMap: {
                width: 256,
                height: 256,
                arrow: {
                    file: "mappoint.gif",
                    width: 15,
                    height: 15
                }
            },
            colorBar: {
                width: 20,
                height: 256,
                arrow: {
                    file: "rangearrows.gif",
                    width: 20,
                    height: 7
                }
            },
            picker: {
                file: "picker.gif",
                width: 25,
                height: 24
            }
        },
        localization: {
            text: {
                title: "Drag Markers To Pick A Color",
                newColor: "new",
                currentColor: "current",
                ok: "OK",
                cancel: "Cancel"
            },
            tooltips: {
                colors: {
                    newColor: "New Color - Press &ldquo;OK&rdquo; To Commit",
                    currentColor: "Click To Revert To Original Color"
                },
                buttons: {
                    ok: "Commit To This Color Selection",
                    cancel: "Cancel And Revert To Original Color"
                },
                hue: {
                    radio: "Set To &ldquo;Hue&rdquo; Color Mode",
                    textbox: "Enter A &ldquo;Hue&rdquo; Value (0-360&deg;)"
                },
                saturation: {
                    radio: "Set To &ldquo;Saturation&rdquo; Color Mode",
                    textbox: "Enter A &ldquo;Saturation&rdquo; Value (0-100%)"
                },
                value: {
                    radio: "Set To &ldquo;Value&rdquo; Color Mode",
                    textbox: "Enter A &ldquo;Value&rdquo; Value (0-100%)"
                },
                red: {
                    radio: "Set To &ldquo;Red&rdquo; Color Mode",
                    textbox: "Enter A &ldquo;Red&rdquo; Value (0-255)"
                },
                green: {
                    radio: "Set To &ldquo;Green&rdquo; Color Mode",
                    textbox: "Enter A &ldquo;Green&rdquo; Value (0-255)"
                },
                blue: {
                    radio: "Set To &ldquo;Blue&rdquo; Color Mode",
                    textbox: "Enter A &ldquo;Blue&rdquo; Value (0-255)"
                },
                alpha: {
                    radio: "Set To &ldquo;Alpha&rdquo; Color Mode",
                    textbox: "Enter A &ldquo;Alpha&rdquo; Value (0-100)"
                },
                hex: {
                    textbox: "Enter A &ldquo;Hex&rdquo; Color Value (#000000-#ffffff)",
                    alpha: "Enter A &ldquo;Alpha&rdquo; Value (#00-#ff)"
                }
            }
        }
    }
})(jQuery, "1.1.6");
(function(a) {
    function s(p) {
        var w = p || window.event,
            c = [].slice.call(arguments, 1),
            f = 0,
            d = 0,
            n = 0;
        p = a.event.fix(w);
        p.type = "mousewheel";
        if (w.wheelDelta) f = w.wheelDelta / 120;
        if (w.detail) f = -w.detail / 3;
        n = f;
        if (w.axis !== undefined && w.axis === w.HORIZONTAL_AXIS) {
            n = 0;
            d = -1 * f
        }
        if (w.wheelDeltaY !== undefined) n = w.wheelDeltaY / 120;
        if (w.wheelDeltaX !== undefined) d = -1 * w.wheelDeltaX / 120;
        c.unshift(p, f, d, n);
        return (a.event.dispatch || a.event.handle).apply(this, c)
    }
    var g = ["DOMMouseScroll", "mousewheel"];
    if (a.event.fixHooks)
        for (var b = g.length; b;) a.event.fixHooks[g[--b]] =
            a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var p = g.length; p;) this.addEventListener(g[--p], s, false);
            else this.onmousewheel = s
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var p = g.length; p;) this.removeEventListener(g[--p], s, false);
            else this.onmousewheel = null
        }
    };
    a.fn.extend({
        mousewheel: function(p) {
            return p ? this.bind("mousewheel", p) : this.trigger("mousewheel")
        },
        unmousewheel: function(p) {
            return this.unbind("mousewheel", p)
        }
    })
})(jQuery);
methodDraw.addExtension("eyedropper", function(a) {
    var s = methodDraw.canvas,
        g = svgedit.history.ChangeElementCommand,
        b = {
            fillPaint: "red",
            fillOpacity: 1,
            strokePaint: "black",
            strokeOpacity: 1,
            strokeWidth: 5,
            strokeDashArray: null,
            opacity: 1,
            strokeLinecap: "butt",
            strokeLinejoin: "miter"
        },
        p = function(w, c, f) {
            var d = null;
            if (w.indexOf("url(#") === 0) {
                w = (w = s.getRefElem(w)) ? w.cloneNode(true) : $("#" + f + "_color defs *")[0];
                d = {
                    alpha: c
                };
                d[w.tagName] = w
            } else d = w.indexOf("#") === 0 ? {
                alpha: c,
                solidColor: w.substr(1)
            } : {
                alpha: c,
                solidColor: "none"
            };
            return new $.jGraduate.Paint(d)
        };
    return {
        name: "eyedropper",
        svgicons: "extensions/eyedropper-icon.xml",
        buttons: [{
            id: "tool_eyedropper",
            type: "mode",
            title: "Eye Dropper Tool",
            position: 8,
            key: "I",
            icon: "extensions/eyedropper.png",
            events: {
                click: function() {
                    s.setMode("eyedropper")
                }
            }
        }],
        mouseDown: function(w) {
            var c = s.getMode(),
                f = w.event;
            f = f.target.id === "svgroot" ? document.getElementById("canvas_background") : f.target;
            if (c == "eyedropper" && f) {
                b.fillPaint = f.getAttribute("fill") || "white";
                b.fillOpacity = f.getAttribute("fill-opacity") ||
                    1;
                b.strokePaint = f.getAttribute("stroke") || "none";
                b.strokeOpacity = f.getAttribute("stroke-opacity") || 1;
                b.strokeWidth = f.getAttribute("stroke-width");
                b.strokeDashArray = f.getAttribute("stroke-dasharray");
                b.strokeLinecap = f.getAttribute("stroke-linecap");
                b.strokeLinejoin = f.getAttribute("stroke-linejoin");
                b.opacity = f.getAttribute("opacity") || 1;
                w.selectedElements = w.selectedElements.filter(Boolean);
                if (w.selectedElements.length) {
                    if ($.inArray(w.selectedElements.nodeName, ["g", "use"]) == -1) {
                        var d = {},
                            n = function(B,
                                q, L) {
                                d[q] = B.getAttribute(q);
                                B.setAttribute(q, L)
                            },
                            v = new a.BatchCommand;
                        w.selectedElements.forEach(function(B) {
                            b.fillPaint && n(B, "fill", b.fillPaint);
                            b.fillOpacity && n(B, "fill-opacity", b.fillOpacity);
                            b.strokePaint && n(B, "stroke", b.strokePaint);
                            b.strokeOpacity && n(B, "stroke-opacity", b.strokeOpacity);
                            b.strokeWidth && n(B, "stroke-width", b.strokeWidth);
                            b.strokeDashArray && n(B, "stroke-dasharray", b.strokeDashArray);
                            b.opacity && n(B, "opacity", b.opacity);
                            b.strokeLinecap && n(B, "stroke-linecap", b.strokeLinecap);
                            b.strokeLinejoin &&
                                n(B, "stroke-linejoin", b.strokeLinejoin);
                            v.addSubCommand(new g(B, d));
                            d = {}
                        });
                        w = p(b.fillPaint, b.fillOpacity * 100, "fill");
                        c = p(b.strokePaint, b.strokeOpacity * 100, "stroke");
                        methodDraw.paintBox.fill.update(true);
                        methodDraw.paintBox.stroke.update(true);
                        s.undoMgr.addCommandToHistory(v)
                    }
                } else {
                    w = p(b.fillPaint, b.fillOpacity * 100, "fill");
                    c = p(b.strokePaint, b.strokeOpacity * 100, "stroke");
                    methodDraw.paintBox.fill.setPaint(w);
                    methodDraw.paintBox.stroke.setPaint(c)
                }
            }
        }
    }
});
methodDraw.addExtension("view_grid", function(a) {
    function s(n) {
        f.attr("width");
        f.attr("height");
        var v = svgedit.units.getTypeMap()[methodDraw.curConfig.baseUnit],
            B = [0.01, 0.1, 1, 10, 100, 1E3];
        b.getContentElem().getAttribute("x");
        var q = w;
        v = v * n;
        var L = 100 / v,
            Q = 1;
        for (n = 0; n < B.length; n++) {
            var K = B[n];
            Q = K;
            if (L <= K) break
        }
        B = Q * v;
        q.width = B;
        q.height = B;
        v = q.getContext("2d");
        L = B / 10;
        v.globalAlpha = 0.2;
        v.strokeStyle = "#000";
        for (n = 1; n < 10; n++) {
            Q = Math.round(L * n) + 0.5;
            v.moveTo(Q, B);
            v.lineTo(Q, 0);
            v.moveTo(B, Q);
            v.lineTo(0, Q)
        }
        v.stroke();
        v.beginPath();
        v.globalAlpha = 0.5;
        v.moveTo(0.5, B);
        v.lineTo(0.5, 0);
        v.moveTo(B, 0.5);
        v.lineTo(0, 0.5);
        v.stroke();
        q = q.toDataURL("image/png");
        d.setAttribute("width", B);
        d.setAttribute("height", B);
        d.parentNode.setAttribute("width", B);
        d.parentNode.setAttribute("height", B);
        b.setHref(d, q)
    }
    if (!document.getElementById("canvasGrid")) {
        var g = document.getElementById("svgcanvas").ownerDocument,
            b = methodDraw.canvas,
            p = false;
        a = a.assignAttributes;
        var w = document.createElement("canvas");
        $(w).hide().appendTo("body");
        var c = g.createElementNS("http://www.w3.org/2000/svg",
            "g");
        a(c, {
            id: "canvasGrid",
            width: "100%",
            height: "100%",
            x: 0,
            y: 0,
            overflow: "visible",
            display: "none"
        });
        var f = $("#canvas_background");
        f.after(c);
        c = g.createElementNS("http://www.w3.org/2000/svg", "pattern");
        a(c, {
            id: "gridpattern",
            patternUnits: "userSpaceOnUse",
            x: 0,
            y: 0,
            width: 100,
            height: 100
        });
        var d = g.createElementNS("http://www.w3.org/2000/svg", "image");
        a(d, {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        });
        c.appendChild(d);
        $("#svgroot defs").append(c);
        g = g.createElementNS("http://www.w3.org/2000/svg", "rect");
        a(g, {
            width: "100%",
            height: "100%",
            x: 0,
            y: 0,
            "stroke-width": 0,
            stroke: "none",
            fill: "url(#gridpattern)",
            style: "pointer-events: none; display:visible;"
        });
        $("#canvasGrid").append(g)
    }
    return {
        name: "view_grid",
        zoomChanged: function(n) {
            p && s(n)
        },
        buttons: [{
            id: "view_grid",
            type: "menu",
            after: "tool_wireframe",
            panel: "view_menu",
            title: "View Grid",
            events: {
                click: function() {
                    if ($("#view_grid").hasClass("push_button_pressed")) {
                        methodDraw.curConfig.showGrid = p = false;
                        $("#view_grid").removeClass("push_button_pressed");
                        $("#canvasGrid").attr("display", "none")
                    } else {
                        methodDraw.curConfig.showGrid =
                            p = true;
                        $("#view_grid").addClass("push_button_pressed");
                        $("#canvasGrid").attr("display", "inline");
                        s(b.getZoom())
                    }
                }
            }
        }]
    }
});
methodDraw.addExtension("shapes", function() {
    function a() {
        $("#shape_buttons").empty();
        $("#shape_buttons").append(L.buttons)
    }

    function s(K) {
        var I = q[K];
        if (I) {
            L = I;
            I.buttons.length || g(K, I);
            a()
        } else {
            $("#shape_buttons").html("Loading...");
            $.getJSON("extensions/shapelib/" + K + ".json", function(S) {
                L = q[K] = {
                    data: S.data,
                    size: S.size,
                    fill: S.fill
                };
                g(K, S);
                a()
            })
        }
    }

    function g(K, I) {
        var S = L.size || 300,
            R = L.fill || false,
            N = S * 0.05;
        N = [-N, -N, S + N * 2, S + N * 2].join(" ");
        S = R ? 0 : S / 30;
        S = (new DOMParser).parseFromString('<svg xmlns="http://www.w3.org/2000/svg"><svg viewBox="' +
            N + '"><path fill="#333" stroke="transparent" stroke-width="' + S + '" /></svg></svg>', "text/xml");
        S.documentElement.setAttribute("width", 40);
        S.documentElement.setAttribute("height", 40);
        S = $(document.importNode(S.documentElement, true));
        R = I.data;
        L.buttons = [];
        for (var ga in R) {
            N = R[ga];
            var oa = S.clone();
            oa.find("path").attr("d", N);
            N = oa.wrap('<div class="tool_button">').parent().attr({
                id: Q + "_" + ga,
                title: ga
            });
            L.buttons.push(N[0])
        }
    }
    var b, p, w = methodDraw.canvas,
        c, f, d, n = w.getRootElem(),
        v = {},
        B = {
            basic: "Basic",
            object: "Objects",
            symbol: "Symbols",
            arrow: "Arrows",
            flowchart: "Flowchart",
            nature: "Nature",
            game: "Cards & Chess",
            dialog_balloon: "Dialog balloons",
            music: "Music",
            weather: "Weather &amp; Time",
            ui: "User Interface",
            social: "Social Web"
        },
        q = {
            basic: {
                data: {
                    star_points_5: "m1,116.58409l113.82668,0l35.17332,-108.13487l35.17334,108.13487l113.82666,0l-92.08755,66.83026l35.17514,108.13487l-92.08759,-66.83208l-92.08757,66.83208l35.17515,-108.13487l-92.08758,-66.83026z",
                    donut: "m1,150l0,0c0,-82.29042 66.70958,-149 149,-149l0,0c39.51724,0 77.41599,15.69816 105.35889,43.64108c27.94293,27.94293 43.64111,65.84165 43.64111,105.35892l0,0c0,82.29041 -66.70958,149 -149,149l0,0c-82.29041,0 -149,-66.70959 -149,-149zm74.5,0l0,0c0,41.1452 33.35481,74.5 74.5,74.5c41.14522,0 74.5,-33.3548 74.5,-74.5c0,-41.1452 -33.3548,-74.5 -74.5,-74.5l0,0c-41.14519,0 -74.5,33.35481 -74.5,74.5z",
                    triangle: "m1,280.375l149,-260.75l149,260.75z",
                    right_triangle: "m1,299l0,-298l298,298z",
                    diamond: "m1,150l149,-149l149,149l-149,149l-149,-149z",
                    pentagon: "m1.00035,116.97758l148.99963,-108.4053l148.99998,108.4053l-56.91267,175.4042l-184.1741,0l-56.91284,-175.4042z",
                    hexagon: "m1,149.99944l63.85715,-127.71428l170.28572,0l63.85713,127.71428l-63.85713,127.71428l-170.28572,0l-63.85715,-127.71428z",
                    septagon1: "m0.99917,191.06511l29.51249,-127.7108l119.48833,-56.83673l119.48836,56.83673l29.51303,127.7108l-82.69087,102.41679l-132.62103,0l-82.69031,-102.41679z",
                    heptagon: "m1,88.28171l87.28172,-87.28171l123.43653,0l87.28172,87.28171l0,123.43654l-87.28172,87.28172l-123.43653,0l-87.28172,-87.28172l0,-123.43654z",
                    decagon: "m1,150.00093l28.45646,-88.40318l74.49956,-54.63682l92.08794,0l74.50002,54.63682l28.45599,88.40318l-28.45599,88.40318l-74.50002,54.63681l-92.08794,0l-74.49956,-54.63681l-28.45646,-88.40318z",
                    dodecagon: "m1,110.07421l39.92579,-69.14842l69.14842,-39.92579l79.85159,0l69.14842,39.92579l39.92578,69.14842l0,79.85159l-39.92578,69.14842l-69.14842,39.92578l-79.85159,0l-69.14842,-39.92578l-39.92579,-69.14842l0,-79.85159z",
                    trapezoid: "m1,299l55.875,-298l186.25001,0l55.87498,298z",
                    dialog_balloon_1: "m0.99786,35.96579l0,0c0,-19.31077 15.28761,-34.96524 34.14583,-34.96524l15.52084,0l0,0l74.50001,0l139.68748,0c9.05606,0 17.74118,3.68382 24.14478,10.24108c6.40356,6.55726 10.00107,15.45081 10.00107,24.72416l0,87.41311l0,0l0,52.44785l0,0c0,19.31078 -15.2876,34.96524 -34.14584,34.96524l-139.68748,0l-97.32507,88.90848l22.82506,-88.90848l-15.52084,0c-18.85822,0 -34.14583,-15.65446 -34.14583,-34.96524l0,0l0,-52.44785l0,0z",
                    heart: "m150,73c61,-175 300,0 0,225c-300,-225 -61,-400 0,-225z",
                    cylinder: "m299.0007,83.77844c0,18.28676 -66.70958,33.11111 -149.00002,33.11111m149.00002,-33.11111l0,0c0,18.28676 -66.70958,33.11111 -149.00002,33.11111c-82.29041,0 -148.99997,-14.82432 -148.99997,-33.11111m0,0l0,0c0,-18.28674 66.70956,-33.1111 148.99997,-33.1111c82.29044,0 149.00002,14.82436 149.00002,33.1111l0,132.44449c0,18.28674 -66.70958,33.11105 -149.00002,33.11105c-82.29041,0 -148.99997,-14.82431 -148.99997,-33.11105z",
                    arrow_up: "m1.49805,149.64304l148.50121,-148.00241l148.50121,148.00241l-74.25061,0l0,148.71457l-148.5012,0l0,-148.71457z",
                    arrow_u_turn: "m1.00059,299.00055l0,-167.62497l0,0c0,-72.00411 58.37087,-130.37499 130.375,-130.37499l0,0l0,0c34.57759,0 67.73898,13.7359 92.18906,38.18595c24.45006,24.45005 38.18593,57.61144 38.18593,92.18904l0,18.625l37.24997,0l-74.49995,74.50002l-74.50002,-74.50002l37.25,0l0,-18.625c0,-30.8589 -25.0161,-55.87498 -55.87498,-55.87498l0,0l0,0c-30.85892,0 -55.875,25.01608 -55.875,55.87498l0,167.62497z",
                    arrow_left_up: "m0.99865,224.5l74.50004,-74.5l0,37.25l111.74991,0l0,-111.75l-37.25,0l74.5,-74.5l74.5,74.5l-37.25,0l0,186.25l-186.24989,0l0,37.25l-74.50005,-74.5z",
                    plaque: "m-0.00197,49.94376l0,0c27.5829,0 49.94327,-22.36036 49.94327,-49.94327l199.76709,0l0,0c0,27.5829 22.36037,49.94327 49.94325,49.94327l0,199.7671l0,0c-27.58289,0 -49.94325,22.36034 -49.94325,49.94325l-199.76709,0c0,-27.58292 -22.36037,-49.94325 -49.94327,-49.94325z",
                    page: "m249.3298,298.99744l9.9335,-39.73413l39.73413,-9.93355l-49.66763,49.66768l-248.33237,0l0,-298.00001l298.00001,0l0,248.33234",
                    cross: "m0.99844,99.71339l98.71494,0l0,-98.71495l101.26279,0l0,98.71495l98.71495,0l0,101.2628l-98.71495,0l0,98.71494l-101.26279,0l0,-98.71494l-98.71494,0z",
                    divide: "m150,0.99785l0,0c25.17819,0 45.58916,20.41097 45.58916,45.58916c0,25.17821 -20.41096,45.58916 -45.58916,45.58916c-25.17822,0 -45.58916,-20.41093 -45.58916,-45.58916c0,-25.1782 20.41093,-45.58916 45.58916,-45.58916zm0,296.25203c-25.17822,0 -45.58916,-20.41095 -45.58916,-45.58917c0,-25.17819 20.41093,-45.58916 45.58916,-45.58916c25.17819,0 45.58916,20.41096 45.58916,45.58916c0,25.17822 -20.41096,45.58917 -45.58916,45.58917zm-134.06754,-193.71518l268.13507,0l0,91.17833l-268.13507,0z",
                    minus: "m0.99887,102.39503l297.49445,0l0,95.2112l-297.49445,0z",
                    times: "m1.00089,73.36786l72.36697,-72.36697l76.87431,76.87368l76.87431,-76.87368l72.36765,72.36697l-76.87433,76.87431l76.87433,76.87431l-72.36765,72.36765l-76.87431,-76.87433l-76.87431,76.87433l-72.36697,-72.36765l76.87368,-76.87431l-76.87368,-76.87431z"
                },
                buttons: []
            }
        },
        L = q.basic,
        Q = "shapelib";
    return {
        svgicons: "extensions/ext-shapes.xml",
        buttons: [{
            id: "tool_shapelib",
            type: "mode_flyout",
            position: 6,
            title: "Shape library",
            icon: "extensions/ext-shapes.png",
            events: {
                click: function() {
                    w.setMode(Q)
                }
            }
        }],
        callback: function() {
            var K =
                $('<div id="shape_buttons">');
            $("#tools_shapelib > *").wrapAll(K);
            var I = $("#tools_shapelib_show");
            s("basic");
            $("#shape_buttons").mouseup(function(R) {
                R = $(R.target).closest("div.tool_button");
                if (R.length) {
                    var N = R.children().clone().attr({
                        width: 24,
                        height: 24
                    });
                    I.children(":not(.flyout_arrow_horiz)").remove();
                    I.append(N).attr("data-curopt", "#" + R[0].id).mouseup();
                    w.setMode(Q);
                    p = R[0].id.substr((Q + "_").length);
                    b = L.data[p];
                    $(".tools_flyout").fadeOut()
                }
            });
            K = $('<div id="shape_cats">');
            var S = "";
            $.each(B, function(R,
                N) {
                S += "<div data-cat=" + R + ">" + N + "</div>"
            });
            K.html(S).children().bind("mouseup", function() {
                var R = $(this);
                R.siblings().removeClass("current");
                R.addClass("current");
                s(R.attr("data-cat"));
                return false
            });
            K.children().eq(0).addClass("current");
            $("#tools_shapelib").prepend(K);
            I.mouseup(function() {
                w.setMode(b ? Q : "select")
            });
            $("#tool_shapelib").remove();
            K = $("#tools_shapelib").height();
            $("#tools_shapelib").css({
                "margin-top": -(K / 2),
                "margin-left": 3
            })
        },
        mouseDown: function(K) {
            if (w.getMode() === Q) {
                var I = f = K.start_x;
                K = d = K.start_y;
                var S = w.getStyle();
                c = w.addSvgElementFromJson({
                    element: "path",
                    curStyles: true,
                    attr: {
                        d: b,
                        id: w.getNextId(),
                        opacity: S.opacity / 2,
                        style: "pointer-events:none"
                    }
                });
                c.setAttribute("d", b);
                if (/[a-z]/.test(b)) {
                    b = L.data[p] = w.pathActions.convertPath(c);
                    c.setAttribute("d", b);
                    w.pathActions.fixEnd(c)
                }
                c.setAttribute("transform", "translate(" + I + "," + K + ") scale(0.005) translate(" + -I + "," + -K + ")");
                w.recalculateDimensions(c);
                w.getTransformList(c);
                v = c.getBBox();
                totalScale = {
                    sx: 1,
                    sy: 1
                };
                return {
                    started: true
                }
            }
        },
        mouseMove: function(K) {
            if (w.getMode() ===
                Q) {
                var I = w.getZoom(),
                    S = K.event,
                    R = K.mouse_x / I,
                    N = K.mouse_y / I;
                K = w.getTransformList(c);
                var ga = c.getBBox();
                I = ga.x;
                var oa = ga.y,
                    Y = ga.width,
                    V = ga.height,
                    ea = R - f,
                    Ba = N - d,
                    ja = {
                        x: Math.min(f, R),
                        y: Math.min(d, N),
                        width: Math.abs(R - f),
                        height: Math.abs(N - d)
                    },
                    ca = ga = 0;
                V = V ? (V + Ba) / V : 1;
                Y = Y ? (Y + ea) / Y : 1;
                Y = ja.width / v.width;
                V = ja.height / v.height;
                Y = Y || 1;
                V = V || 1;
                if (R < f) ga = v.width;
                if (N < d) ca = v.height;
                R = n.createSVGTransform();
                N = n.createSVGTransform();
                ja = n.createSVGTransform();
                R.setTranslate(-(I + ga), -(oa + ca));
                if (S.shiftKey) {
                    replaced = true;
                    S = Math.min(Math.abs(Y), Math.abs(V));
                    Y = S * (Y < 0 ? -1 : 1);
                    V = S * (V < 0 ? -1 : 1);
                    if (totalScale.sx != totalScale.sy) {
                        S = totalScale.sx > totalScale.sy ? 1 : totalScale.sx / totalScale.sy;
                        Y *= totalScale.sy > totalScale.sx ? 1 : totalScale.sy / totalScale.sx;
                        V *= S
                    }
                }
                totalScale.sx *= Y;
                totalScale.sy *= V;
                N.setScale(Y, V);
                ja.setTranslate(I + ga, oa + ca);
                K.appendItem(ja);
                K.appendItem(N);
                K.appendItem(R);
                w.recalculateDimensions(c);
                v = c.getBBox()
            }
        },
        mouseUp: function(K) {
            if (w.getMode() === Q) {
                if (K.mouse_x == f && K.mouse_y == d) return {
                    keep: false,
                    element: c,
                    started: false
                };
                w.setMode("select");
                return {
                    keep: true,
                    element: c,
                    started: false
                }
            }
        }
    }
});
(function() {
    for (var a = 0, s = ["ms", "moz", "webkit", "o"], g = 0; g < s.length && !window.requestAnimationFrame; ++g) {
        window.requestAnimationFrame = window[s[g] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[s[g] + "CancelAnimationFrame"] || window[s[g] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(b) {
        var p = (new Date).getTime(),
            w = Math.max(0, 16 - (p - a)),
            c = window.setTimeout(function() {
                b(p + w)
            }, w);
        a = p + w;
        return c
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame =
        function(b) {
            clearTimeout(b)
        }
})();
(function(a) {
    function s(q) {
        var L = q.originalEvent;
        if (!L.touches || L.targetTouches.length === 1 && L.touches.length === 1) {
            c.call(this, q);
            q = a(this);
            q.bind(v, g);
            q.bind(n, b)
        } else {
            clearTimeout(B);
            w.call(this)
        }
    }

    function g(q) {
        if (B != null) {
            var L = q.originalEvent;
            q = L.changedTouches ? L.changedTouches[0].pageX : L.pageX;
            L = L.changedTouches ? L.changedTouches[0].pageY : L.pageY;
            var Q = a(this).data("taphold.point");
            q = q - Q.x;
            L = L - Q.y;
            if (Math.sqrt(q * q + L * L) > d) {
                clearTimeout(B);
                w.call(this)
            }
        }
    }

    function b() {
        clearTimeout(B);
        w.call(this)
    }

    function p(q) {
        w.call(this);
        a(this).data("taphold.handler").call(this, q)
    }

    function w() {
        B = null;
        a(this).unbind(v, g);
        a(this).unbind(n, b)
    }

    function c(q) {
        if (B == null) {
            var L = this;
            B = setTimeout(function() {
                p.call(L, q)
            }, f);
            var Q = q.originalEvent,
                K = {};
            K.x = Q.changedTouches ? Q.changedTouches[0].pageX : Q.pageX;
            K.y = Q.changedTouches ? Q.changedTouches[0].pageY : Q.pageY;
            a(this).data("taphold.point", K)
        }
    }
    var f = 1E3,
        d = 5,
        n = "touchend",
        v = "touchmove",
        B = null;
    a.event.special.taphold = {
        setup: function() {},
        add: function(q) {
            a(this).data("taphold.handler",
                q.handler);
            q.data ? a(this).bind("touchstart", q.data, s) : a(this).bind("touchstart", s)
        },
        remove: function(q) {
            clearTimeout(B);
            w.call(this);
            q.data ? a(this).unbind("touchstart", q.data, s) : a(this).unbind("touchstart", s)
        },
        teardown: function() {}
    }
})(jQuery);
