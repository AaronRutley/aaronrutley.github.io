!function(a, b) {
    var c = function(b, c) {
        var h = 1 === b.nodeType ? b : document.querySelector(b), i = [].filter.call(h.children, function(a) {
            return "SCRIPT" !== a.nodeName
        }), j = i[0], k = {}, l = function(a, b) {
            i[a] && (q("deactivate", r(j, b)), j = i[a], i.map(m), q("activate", r(j, b)), f(j, "active"), g(j, "inactive"))
        }, m = function(a, b) {
            var c = b - i.indexOf(j), d = c > 0 ? "after" : "before";
            ["before(-\\d+)?", "after(-\\d+)?", "active", "inactive"].map(g.bind(null, a)), a !== j && ["inactive", d, d + "-" + Math.abs(c)].map(f.bind(null, a))
        }, n = function(a, b) {
            return arguments.length ? void (q("slide", r(i[a], b)) && l(a, b)) : i.indexOf(j)
        }, o = function(a, b) {
            var c = i.indexOf(j) + a;
            q(a > 0 ? "next" : "prev", r(j, b)) && l(c, b)
        }, p = function(a, b) {
            return (k[a] || (k[a] = [])).push(b), function() {
                k[a] = k[a].filter(function(a) {
                    return a !== b
                })
            }
        }, q = function(a, b) {
            return (k[a] || []).reduce(function(a, c) {
                return a && c(b) !== !1
            }, !0)
        }, r = function(a, b) {
            return b = b || {}, b.index = i.indexOf(a), b.slide = a, b
        }, s = {on: p,fire: q,slide: n,next: o.bind(null, 1),prev: o.bind(null, -1),parent: h,slides: i};
        f(h, "parent"), i.map(function(a) {
            f(a, "slide")
        });
        for (var t in c) {
            if (!e[t])
                throw Error("Missing plugin: " + a + "-" + t);
            c[t] !== !1 && e[t](s, c[t])
        }
        return l(0), d.push(s), s
    }, d = [], e = {}, f = function(b, c) {
        b.classList.add(a + "-" + c)
    }, g = function(b, c) {
        b.className = b.className.replace(RegExp(a + "-" + c + "(\\s|$)", "g"), " ").trim()
    }, h = function(a) {
        return function() {
            var b = arguments;
            d.map(function(c) {
                c[a].apply(null, b)
            })
        }
    };
    b[a] = {from: c,slide: h("slide"),next: h("next"),prev: h("prev"),plugins: e}
}("bespoke", window), bespoke.plugins.keys = function(a, b) {
    var c = b === !0 || "horizontal" == b;
    document.addEventListener("keydown", function(b) {
        (34 == b.which || 32 == b.which || c && 39 == b.which || !c && 40 == b.which) && a.next(), (33 == b.which || c && 37 == b.which || !c && 38 == b.which) && a.prev()
    })
}, bespoke.plugins.touch = function(a, b) {
    var c, d, e = b === !0 || "horizontal" == b ? "X" : "Y";
    a.parent.addEventListener("touchstart", function(a) {
        1 == a.touches.length && (c = a.touches[0]["page" + e], d = 0)
    }), a.parent.addEventListener("touchmove", function(a) {
        1 == a.touches.length && (a.preventDefault(), d = a.touches[0]["page" + e] - c)
    }), a.parent.addEventListener("touchend", function() {
        Math.abs(d) > 50 && (d > 0 ? a.prev() : a.next())
    })
}, function(a) {
    a.plugins.bullets = function(a, b) {
        var c, d, e = a.slides.map(function(a) {
            return [].slice.call(a.querySelectorAll("string" == typeof b ? b : "[data-bespoke-bullet]"), 0)
        }), f = function() {
            var a = c + 1;
            return i(1) ? (h(c, d + 1), !1) : void (e[a] && h(a, 0))
        }, g = function() {
            var a = c - 1;
            return i(-1) ? (h(c, d - 1), !1) : void (e[a] && h(a, e[a].length - 1))
        }, h = function(a, b) {
            c = a, d = b, e.forEach(function(c, d) {
                c.forEach(function(c, e) {
                    c.classList.add("bespoke-bullet"), a > d || d === a && b >= e ? (c.classList.add("bespoke-bullet-active"), c.classList.remove("bespoke-bullet-inactive")) : (c.classList.add("bespoke-bullet-inactive"), c.classList.remove("bespoke-bullet-active"))
                })
            })
        }, i = function(a) {
            return void 0 !== e[c][d + a]
        };
        a.on("next", f), a.on("prev", g), a.on("slide", function(a) {
            h(a.index, 0)
        }), h(0, 0)
    }
}(bespoke), !function(a) {
    a.plugins.scale = function(a, b) {
        var c = a.parent, d = a.slides[0], e = d.offsetHeight, f = d.offsetWidth, g = "zoom" === b || "zoom" in c.style && "transform" !== b, h = function(a) {
            var b = document.createElement("div");
            return b.className = "bespoke-scale-parent", c.insertBefore(b, a), b.appendChild(a), b
        }, i = g ? a.slides : a.slides.map(h), j = function(a) {
            var b = "Moz Webkit O ms".split(" ");
            return b.reduce(function(b, d) {
                return d + a in c.style ? d + a : b
            }, a.toLowerCase())
        }("Transform"), k = g ? function(a, b) {
            b.style.zoom = a
        } : function(a, b) {
            b.style[j] = "scale(" + a + ")"
        }, l = function() {
            var a = c.offsetWidth / f, b = c.offsetHeight / e;
            i.forEach(k.bind(null, Math.min(a, b)))
        };
        window.addEventListener("resize", l), l()
    }
}(bespoke), function(a) {
    a.plugins.hash = function(a) {
        var b, c = function() {
            var b = window.location.hash.slice(1), c = parseInt(b, 10);
            b && (c ? d(c - 1) : a.slides.forEach(function(a, c) {
                a.getAttribute("data-bespoke-hash") === b && d(c)
            }))
        }, d = function(c) {
            c !== b && a.slide(c)
        };
        setTimeout(function() {
            c(), a.on("activate", function(a) {
                var c = a.slide.getAttribute("data-bespoke-hash");
                window.location.hash = c || a.index + 1, b = a.index
            }), window.addEventListener("hashchange", c)
        }, 0)
    }
}(bespoke), !function(a) {
    a.plugins.progress = function(a, b) {
        var c = document.createElement("div"), d = document.createElement("div"), e = "vertical" === b ? "height" : ["horizontal", !0].indexOf(b) + 1 ? "width" : void 0;
        e && (c.className = "bespoke-progress-parent", d.className = "bespoke-progress-bar", c.appendChild(d), a.parent.appendChild(c), a.on("activate", function(b) {
            d.style[e] = 100 * b.index / (a.slides.length - 1) + "%"
        }))
    }
}(bespoke), function(a) {
    a.plugins.state = function(a) {
        var b = function(b, c) {
            var d = c.slide.getAttribute("data-bespoke-state");
            d && d.split(" ").forEach(function(c) {
                c && a.parent.classList[b](c)
            })
        };
        a.on("activate", b.bind(null, "add")), a.on("deactivate", b.bind(null, "remove"))
    }
}(bespoke), function() {
    var a = /\blang(?:uage)?-(?!\*)(\w+)\b/i, b = self.Prism = {util: {type: function(a) {
                return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]
            },clone: function(a) {
                var c = b.util.type(a);
                switch (c) {
                    case "Object":
                        var d = {};
                        for (var e in a)
                            a.hasOwnProperty(e) && (d[e] = b.util.clone(a[e]));
                        return d;
                    case "Array":
                        return a.slice()
                }
                return a
            }},languages: {extend: function(a, c) {
                var d = b.util.clone(b.languages[a]);
                for (var e in c)
                    d[e] = c[e];
                return d
            },insertBefore: function(a, c, d, e) {
                e = e || b.languages;
                var f = e[a], g = {};
                for (var h in f)
                    if (f.hasOwnProperty(h)) {
                        if (h == c)
                            for (var i in d)
                                d.hasOwnProperty(i) && (g[i] = d[i]);
                        g[h] = f[h]
                    }
                return e[a] = g
            },DFS: function(a, c) {
                for (var d in a)
                    c.call(a, d, a[d]), "Object" === b.util.type(a) && b.languages.DFS(a[d], c)
            }},highlightAll: function(a, c) {
            for (var d, e = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), f = 0; d = e[f++]; )
                b.highlightElement(d, a === !0, c)
        },highlightElement: function(d, e, f) {
            for (var g, h, i = d; i && !a.test(i.className); )
                i = i.parentNode;
            if (i && (g = (i.className.match(a) || [, ""])[1], h = b.languages[g]), h) {
                d.className = d.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g, i = d.parentNode, /pre/i.test(i.nodeName) && (i.className = i.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g);
                var j = d.textContent;
                if (j) {
                    j = j.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
                    var k = {element: d,language: g,grammar: h,code: j};
                    if (b.hooks.run("before-highlight", k), e && self.Worker) {
                        var l = new Worker(b.filename);
                        l.onmessage = function(a) {
                            k.highlightedCode = c.stringify(JSON.parse(a.data), g), b.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(k.element), b.hooks.run("after-highlight", k)
                        }, l.postMessage(JSON.stringify({language: k.language,code: k.code}))
                    } else
                        k.highlightedCode = b.highlight(k.code, k.grammar, k.language), b.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(d), b.hooks.run("after-highlight", k)
                }
            }
        },highlight: function(a, d, e) {
            return c.stringify(b.tokenize(a, d), e)
        },tokenize: function(a, c) {
            var d = b.Token, e = [a], f = c.rest;
            if (f) {
                for (var g in f)
                    c[g] = f[g];
                delete c.rest
            }
            a: for (var g in c)
                if (c.hasOwnProperty(g) && c[g]) {
                    var h = c[g], i = h.inside, j = !!h.lookbehind, k = 0;
                    h = h.pattern || h;
                    for (var l = 0; l < e.length; l++) {
                        var m = e[l];
                        if (e.length > a.length)
                            break a;
                        if (!(m instanceof d)) {
                            h.lastIndex = 0;
                            var n = h.exec(m);
                            if (n) {
                                j && (k = n[1].length);
                                var o = n.index - 1 + k, n = n[0].slice(k), p = n.length, q = o + p, r = m.slice(0, o + 1), s = m.slice(q + 1), t = [l, 1];
                                r && t.push(r);
                                var u = new d(g, i ? b.tokenize(n, i) : n);
                                t.push(u), s && t.push(s), Array.prototype.splice.apply(e, t)
                            }
                        }
                    }
                }
            return e
        },hooks: {all: {},add: function(a, c) {
                var d = b.hooks.all;
                d[a] = d[a] || [], d[a].push(c)
            },run: function(a, c) {
                var d = b.hooks.all[a];
                if (d && d.length)
                    for (var e, f = 0; e = d[f++]; )
                        e(c)
            }}}, c = b.Token = function(a, b) {
        this.type = a, this.content = b
    };
    if (c.stringify = function(a, d, e) {
        if ("string" == typeof a)
            return a;
        if ("[object Array]" == Object.prototype.toString.call(a))
            return a.map(function(b) {
                return c.stringify(b, d, a)
            }).join("");
        var f = {type: a.type,content: c.stringify(a.content, d, e),tag: "span",classes: ["token", a.type],attributes: {},language: d,parent: e};
        "comment" == f.type && (f.attributes.spellcheck = "true"), b.hooks.run("wrap", f);
        var g = "";
        for (var h in f.attributes)
            g += h + '="' + (f.attributes[h] || "") + '"';
        return "<" + f.tag + ' class="' + f.classes.join(" ") + '" ' + g + ">" + f.content + "</" + f.tag + ">"
    }, !self.document)
        return void self.addEventListener("message", function(a) {
            var c = JSON.parse(a.data), d = c.language, e = c.code;
            self.postMessage(JSON.stringify(b.tokenize(e, b.languages[d]))), self.close()
        }, !1);
    var d = document.getElementsByTagName("script");
    d = d[d.length - 1], d && (b.filename = d.src, document.addEventListener && !d.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", b.highlightAll))
}(), Prism.languages.markup = {comment: /&lt;!--[\w\W]*?-->/g,prolog: /&lt;\?.+?\?>/,doctype: /&lt;!DOCTYPE.+?>/,cdata: /&lt;!\[CDATA\[[\w\W]*?]]>/i,tag: {pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside: {tag: {pattern: /^&lt;\/?[\w:-]+/i,inside: {punctuation: /^&lt;\/?/,namespace: /^[\w-]+?:/}},"attr-value": {pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside: {punctuation: /=|>|"/g}},punctuation: /\/?>/g,"attr-name": {pattern: /[\w:-]+/g,inside: {namespace: /^[\w-]+?:/}}}},entity: /&amp;#?[\da-z]{1,8};/gi}, Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.css = {comment: /\/\*[\w\W]*?\*\//g,atrule: {pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,inside: {punctuation: /[;:]/g}},url: /url\((["']?).*?\1\)/gi,selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,property: /(\b|\B)[\w-]+(?=\s*:)/gi,string: /("|')(\\?.)*?\1/g,important: /\B!important\b/gi,ignore: /&(lt|gt|amp);/gi,punctuation: /[\{\};:]/g}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {style: {pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/gi,inside: {tag: {pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/gi,inside: Prism.languages.markup.tag.inside},rest: Prism.languages.css}}}), Prism.languages.clike = {comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind: !0},string: /("|')(\\?.)*?\1/g,"class-name": {pattern: /((?:class|interface|extends|implements|trait|instanceof|new)\s+)[a-z0-9_\.\\]+/gi,lookbehind: !0,inside: {punctuation: /(\.|\\)/}},keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|catch|finally|null|break|continue)\b/g,"boolean": /\b(true|false)\b/g,"function": {pattern: /[a-z0-9_]+\(/gi,inside: {punctuation: /\(/}},number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator: /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore: /&(lt|gt|amp);/gi,punctuation: /[{}[\];(),.:]/g}, Prism.languages.javascript = Prism.languages.extend("clike", {keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}), Prism.languages.insertBefore("javascript", "keyword", {regex: {pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind: !0}}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {script: {pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,inside: {tag: {pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/gi,inside: Prism.languages.markup.tag.inside},rest: Prism.languages.javascript}}}), function() {
    if (self.Prism && self.document && document.querySelector) {
        var a = {js: "javascript",html: "markup",svg: "markup"};
        Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(b) {
            var c = b.getAttribute("data-src"), d = (c.match(/\.(\w+)$/) || [, ""])[1], e = a[d] || d, f = document.createElement("code");
            f.className = "language-" + e, b.textContent = "", f.textContent = "Loading…", b.appendChild(f);
            var g = new XMLHttpRequest;
            g.open("GET", c, !0), g.onreadystatechange = function() {
                4 == g.readyState && (g.status < 400 && g.responseText ? (f.textContent = g.responseText, Prism.highlightElement(f)) : f.textContent = g.status >= 400 ? "✖ Error " + g.status + " while fetching file: " + g.statusText : "✖ Error: File does not exist or is empty")
            }, g.send(null)
        })
    }
}(), bespoke.from("article", {keys: !0,touch: !0,bullets: "li, .bullet",scale: !0,hash: !0,progress: !0,state: !0}), function() {
    var a, b, c = function(a, b) {
        //[].slice.call(a, 0).forEach(b)
    };
    c(document.styleSheets, function(d) {
        c(d.rules, function(c) {
            c.style && c.style.backgroundImage && (a = c.style.backgroundImage.match(/url\((.*)\)/), a && (b = new Image, b.src = a[1]))
        })
    })
}();
