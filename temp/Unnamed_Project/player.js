/*
 * Copyright © 2011-2015 by Animatron.
 * All rights are reserved.
 * 
 * Animatron Player is licensed under the MIT License.
 * 
 * v1.4, built at Thu Dec 29 2016 03:00:10 GMT+0000 (UTC) / 2016-12-29T03:00:10.676Z
 */
var $jscomp = {
    scope: {},
    checkStringArgs: function (c, v, n) {
        if (null == c) throw new TypeError("The 'this' value for String.prototype." + n + " must not be null or undefined");
        if (v instanceof RegExp) throw new TypeError("First argument to String.prototype." + n + " must not be a regular expression");
        return c + ""
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (c, v, n) {
    if (n.get || n.set) throw new TypeError("ES3 does not support getters and setters.");
    c != Array.prototype && c != Object.prototype && (c[v] = n.value)
};
$jscomp.getGlobal = function (c) {
    return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (c, v, n, b) {
    if (v) {
        n = $jscomp.global;
        c = c.split(".");
        for (b = 0; b < c.length - 1; b++) {
            var e = c[b];
            e in n || (n[e] = {});
            n = n[e]
        }
        c = c[c.length - 1];
        b = n[c];
        v = v(b);
        v != b && null != v && $jscomp.defineProperty(n, c, {
            configurable: !0,
            writable: !0,
            value: v
        })
    }
};
$jscomp.polyfill("String.prototype.repeat", function (c) {
    return c ? c : function (c) {
        var n = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > c || 1342177279 < c) throw new RangeError("Invalid count value");
        c |= 0;
        for (var b = ""; c;)
            if (c & 1 && (b += n), c >>>= 1) n += n;
        return b
    }
}, "es6-impl", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var c = $jscomp.global.Symbol.iterator;
    c || (c = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[c] && $jscomp.defineProperty(Array.prototype, c, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {}
};
$jscomp.arrayIterator = function (c) {
    var v = 0;
    return $jscomp.iteratorPrototype(function () {
        return v < c.length ? {
            done: !1,
            value: c[v++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function (c) {
    $jscomp.initSymbolIterator();
    c = {
        next: c
    };
    c[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return c
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function (c, v) {
    $jscomp.initSymbolIterator();
    c instanceof String && (c += "");
    var n = 0,
        b = {
            next: function () {
                if (n < c.length) {
                    var e = n++;
                    return {
                        value: v(e, c[e]),
                        done: !1
                    }
                }
                b.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return b.next()
            }
        };
    b[Symbol.iterator] = function () {
        return b
    };
    return b
};
$jscomp.polyfill("Array.prototype.keys", function (c) {
    return c ? c : function () {
        return $jscomp.iteratorFromArray(this, function (c) {
            return c
        })
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function (c) {
    return c ? c : function (c, n, b) {
        var e = this.length || 0;
        0 > n && (n = Math.max(0, e + n));
        if (null == b || b > e) b = e;
        b = Number(b);
        0 > b && (b = Math.max(0, e + b));
        for (n = Number(n || 0); n < b; n++) this[n] = c;
        return this
    }
}, "es6-impl", "es3");
$jscomp.findInternal = function (c, v, n) {
    c instanceof String && (c = String(c));
    for (var b = c.length, e = 0; e < b; e++) {
        var a = c[e];
        if (v.call(n, a, e, c)) return {
            i: e,
            v: a
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.polyfill("Array.prototype.find", function (c) {
    return c ? c : function (c, n) {
        return $jscomp.findInternal(this, c, n).v
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.values", function (c) {
    return c ? c : function () {
        return $jscomp.iteratorFromArray(this, function (c, n) {
            return n
        })
    }
}, "es6", "es3");
(function e$jscomp$0(v, n, b) {
    function e(d, g) {
        if (!n[d]) {
            if (!v[d]) {
                var k = "function" == typeof require && require;
                if (!g && k) return k(d, !0);
                if (a) return a(d, !0);
                k = Error("Cannot find module '" + d + "'");
                throw k.code = "MODULE_NOT_FOUND", k;
            }
            k = n[d] = {
                exports: {}
            };
            v[d][0].call(k.exports, function (a) {
                var b = v[d][1][a];
                return e(b ? b : a)
            }, k, k.exports, e$jscomp$0, v, n, b)
        }
        return n[d].exports
    }
    for (var a = "function" == typeof require && require, g = 0; g < b.length; g++) e(b[g]);
    return e
})({
    1: [function (c, v, n) {
        var b = [],
            e = function (a, c) {
                var d = document.head ||
                    document.getElementsByTagName("head")[0],
                    e = b[b.length - 1];
                c = c || {};
                c.insertAt = c.insertAt || "bottom";
                if ("top" === c.insertAt) e ? e.nextSibling ? d.insertBefore(a, e.nextSibling) : d.appendChild(a) : d.insertBefore(a, d.firstChild), b.push(a);
                else if ("bottom" === c.insertAt) d.appendChild(a);
                else throw Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            };
        v.exports = {
            createLink: function (a, b) {
                var d = document.head || document.getElementsByTagName("head")[0],
                    c = document.createElement("link");
                c.href = a;
                c.rel = "stylesheet";
                for (var k in b) b.hasOwnProperty(k) && c.setAttribute("data-" + k, b[k]);
                d.appendChild(c)
            },
            createStyle: function (a, b, d) {
                d = d || {};
                var c = document.createElement("style");
                c.type = "text/css";
                for (var k in b) b.hasOwnProperty(k) && c.setAttribute("data-" + k, b[k]);
                c.sheet ? (c.innerHTML = a, c.sheet.cssText = a, e(c, {
                    insertAt: d.insertAt
                })) : c.styleSheet ? (e(c, {
                    insertAt: d.insertAt
                }), c.styleSheet.cssText = a) : (c.appendChild(document.createTextNode(a)), e(c, {
                    insertAt: d.insertAt
                }))
            }
        }
    }, {}],
    2: [function (c, v, n) {
        c("browserify-css").createStyle(".anm-wrapper {\n  position: relative;\n}\n.anm-controls {\n  position: absolute;\n  left: 0;\n  top: 0;\n  vertical-align: top;\n  z-index: 100;\n  cursor: pointer;\n  background-color: rgba(0,0,0,0);\n}\n#anm-text-measurer-container {\n  position: absolute;\n  visibility: hidden;\n  left: -10000px;\n  top: -10000px;\n}\n", {
            href: "res/player.css"
        }, {
            insertAt: "bottom"
        });
        v.exports = ".anm-wrapper {\n  position: relative;\n}\n.anm-controls {\n  position: absolute;\n  left: 0;\n  top: 0;\n  vertical-align: top;\n  z-index: 100;\n  cursor: pointer;\n  background-color: rgba(0,0,0,0);\n}\n#anm-text-measurer-container {\n  position: absolute;\n  visibility: hidden;\n  left: -10000px;\n  top: -10000px;\n}\n"
    }, {
        "browserify-css": 1
    }],
    3: [function (c, v, n) {
        function b() {
            this.id = e.guid();
            this.tree = [];
            this.hash = {};
            this.name = "";
            this.duration =
                void 0;
            this.bgfill = null;
            this.height = this.width = void 0;
            this.factor = this.speed = this.zoom = 1;
            this.repeat = !1;
            this.meta = {};
            this.targets = {};
            this.$prefix = null;
            this.__informEnabled = !0;
            this.__lastOverElm = null;
            this._laters = [];
            this._initHandlers()
        }
        var e = c("../utils.js"),
            a = e.is,
            g = e.iter;
        n = c("../constants.js");
        var d = c("engine"),
            p = c("../resource_manager.js"),
            k = c("../../vendor/font_detector.js"),
            u = c("./element.js"),
            t = c("../graphics/brush.js"),
            q = c("../events.js"),
            y = q.provideEvents,
            w = c("../errors.js"),
            z = c("../loc.js").Errors,
            A = c("./search.js"),
            r = {
                click: n.X_MCLICK,
                dblclick: n.X_MDCLICK,
                mouseup: n.X_MUP,
                mousedown: n.X_MDOWN,
                mousemove: n.X_MMOVE,
                mouseover: n.X_MOVER,
                mouseout: n.X_MOUT,
                keypress: n.X_KPRESS,
                keyup: n.X_KUP,
                keydown: n.X_KDOWN
            };
        b.DEFAULT_DURATION = 10;
        y(b, [n.A_START, n.A_PAUSE, n.A_STOP, n.X_MCLICK, n.X_MDCLICK, n.X_MUP, n.X_MDOWN, n.X_MMOVE, n.X_MOVER, n.X_MOUT, n.X_KPRESS, n.X_KUP, n.X_KDOWN, n.X_ERROR]);
        b.prototype.add = function (b, d, c) {
            d ? (b = new u(b, d), c && b.changeTransform(c), this.addToTree(b)) : a.arr(b) ? ((new u).add(b), this.addToTree(_clip)) :
                this.addToTree(b);
            return this
        };
        b.prototype.remove = function (a) {
            a.parent ? a.parent.remove(a) : this._unregister(a);
            return this
        };
        b.prototype.traverse = function (a, b) {
            e.keys(this.hash, function (d, c) {
                return a(c, b)
            });
            return this
        };
        b.prototype.each = function (a, b) {
            for (var d = 0, c = this.tree.length; d < c && !1 !== a(this.tree[d], b); d++);
            return this
        };
        b.prototype.reverseEach = function (a, b) {
            for (var d = this.tree.length; d-- && !1 !== a(this.tree[d], b););
            return this
        };
        b.prototype.iter = function (a, b) {
            g(this.tree).each(a, b);
            return this
        };
        b.prototype.render = function (a, b, d) {
            a.save();
            this.time = b;
            var c = this.zoom;
            1 != c && a.scale(c, c);
            this.bgfill && (this.bgfill instanceof t || (this.bgfill = t.fill(this.bgfill)), this.bgfill.apply(a), a.fillRect(0, 0, this.width, this.height));
            b = this.$prefix ? this.$prefix(b, a) : b;
            this.each(function (m) {
                m.render(a, b, d)
            });
            a.restore()
        };
        b.prototype.jump = function (a) {
            this.jumping || (this.jumping = !0, e.keys(this.targets, function (b, d) {
                d && d.seek(a)
            }), this.jumping = !1)
        };
        b.prototype.jumpTo = function (b) {
            (b = a.str(b) ? this.find(b) : b) &&
            this.jump(b.gband[0])
        };
        b.prototype.getFittingDuration = function () {
            var a = -Infinity;
            this.each(function (b) {
                b = b._max_tpos();
                b > a && (a = b)
            });
            return a
        };
        b.prototype.reset = function () {
            this.__informEnabled = !0;
            this.time = null;
            this.each(function (a) {
                a.reset()
            });
            return this
        };
        b.prototype.playedIn = function (a) {
            this.targets[a.id] = a;
            return this
        };
        b.prototype.dispose = function (a) {
            a && (this.targets[a.id] = null);
            this.disposeHandlers();
            var b = this;
            this.iter(function (a) {
                b._unregister_no_rm(a);
                a.dispose();
                return !1
            });
            return this
        };
        b.prototype.isEmpty =
            function () {
                return 0 === this.tree.length
            };
        b.prototype.toString = function () {
            return "[ Animation " + (this.name ? "'" + this.name + "'" : "") + "]"
        };
        b.prototype.subscribeEvents = function (a) {
            d.subscribeAnimationToEvents(a, this, r)
        };
        b.prototype.unsubscribeEvents = function (a) {
            d.unsubscribeAnimationFromEvents(a, this)
        };
        b.prototype.filterEvent = function (b, d) {
            function c(h, f) {
                return h.firstParent(function (h) {
                    return h.subscribedTo(f)
                })
            }
            var k = this;
            if (q.mouse(b)) {
                var m = k.adapt(d.pos.x, d.pos.y),
                    f = !1;
                k.reverseEach(function (h) {
                    h.inside(m,
                        function (h) {
                            return a.defined(h.cur_t) && h.fits(h.cur_t)
                        },
                        function (h, a) {
                            f = !0;
                            if ("mousemove" !== b) {
                                var B = c(h, b);
                                B && B.fire(b, d)
                            } else if (B = c(h, "mousemove"), k.__lastOverElm)
                                if (h.id === k.__lastOverElm.id) B && B.fire(b, d);
                                else {
                                    q = c(h, "mouseover");
                                    if (k.__lastOverElm) {
                                        var m = c(k.__lastOverElm, "mouseout");
                                        m && m.fire("mouseout", d);
                                        k.__lastOverElm = null
                                    }
                                    k.__lastOverElm = h;
                                    q && q.fire("mouseover", d);
                                    B && B.fire("mousemove", d)
                                }
                            else {
                                k.__lastOverElm = h;
                                var q = c(h, "mouseover");
                                q && q.fire("mouseover", d);
                                B && B.fire("mousemove", d)
                            }
                            return !1
                        });
                    if (f) return !1
                });
                if ("mousemove" === b && !f && k.__lastOverElm) {
                    var h = !1;
                    k.__lastOverElm.inside(m, null, function () {
                        h = !0
                    });
                    if (!h) {
                        var B = c(k.__lastOverElm, "mouseout");
                        k.__lastOverElm = null;
                        B && B.fire("mouseout", d)
                    }
                }
                return !1
            }
            return !0
        };
        b.prototype.addToTree = function (a) {
            if (!a.children) throw w.animation(z.A.OBJECT_IS_NOT_ELEMENT, this);
            this._register(a);
            this.tree.push(a)
        };
        b.prototype.handlePause = function () {
            this.traverse(function (a) {
                a.__resetBandEvents()
            })
        };
        b.prototype._register = function (a) {
            if (this.hash[a.id]) throw w.animation(z.A.ELEMENT_IS_REGISTERED,
                this);
            a.registered = !0;
            a.anim = this;
            this.hash[a.id] = a;
            var b = this;
            a.each(function (a) {
                b._register(a)
            })
        };
        b.prototype._unregister_no_rm = function (a) {
            this._unregister(a, !0)
        };
        b.prototype._unregister = function (a, b) {
            if (!a.registered) throw w.animation(z.A.ELEMENT_IS_NOT_REGISTERED, this);
            var d = this;
            a.each(function (a) {
                d._unregister(a)
            });
            var c = -1;
            if (!b)
                for (; 0 <= (c = this.tree.indexOf(a));) this.tree.splice(c, 1);
            delete this.hash[a.id];
            a.registered = !1;
            a.anim = null
        };
        b.prototype._collectRemoteResources = function (a) {
            var b = [],
                d = this;
            this.traverse(function (c) {
                c._hasRemoteResources(d, a) && (b = b.concat(c._collectRemoteResources(d, a)))
            });
            this.fonts && this.fonts.length && (b = b.concat(this.fonts.map(function (a) {
                return a.url
            })));
            return b
        };
        b.prototype._loadRemoteResources = function (a) {
            var b = this;
            this.traverse(function (d) {
                d._hasRemoteResources(b, a) && d._loadRemoteResources(b, a)
            });
            b.loadFonts(a)
        };
        b.prototype.find = function (a, b) {
            return A.one(a).over(b ? b.children : this.tree)
        };
        b.prototype.findAll = function (a, b) {
            return A.all(a).over(b ? b.children :
                this.tree)
        };
        b.prototype.findById = function (a) {
            return this.hash[a]
        };
        b.prototype.prefix = function (a) {
            this.$prefix = a
        };
        b.prototype.adapt = function (a, b) {
            return {
                x: a / this.factor,
                y: b / this.factor
            }
        };
        b.prototype.invokeAllLaters = function () {
            for (var a = 0; a < this._laters.length; a++) this._laters[a].call(this)
        };
        b.prototype.clearAllLaters = function () {
            this._laters = []
        };
        b.prototype.invokeLater = function (a) {
            this._laters.push(a)
        };
        b.prototype.loadFonts = function (a) {
            if (this.fonts && this.fonts.length) {
                for (var b = this.fonts, c = d.getWebfontStyleObject(),
                        q = "", m = [], f = new k, h = 0; h < b.length; h++) {
                    var B = b[h];
                    if (B.url && B.face) {
                        var z = d.checkMediaUrl(B.url),
                            e = d.checkMediaUrl(B.woff);
                        m.push(B);
                        q += '@font-face {\nfont-family: "' + B.face + '";\nsrc:' + (e ? ' url("' + e + '") format("woff"),\n' : "") + ' url("' + z + '") format("truetype");\n' + (B.style ? "font-style: " + B.style + ";\n" : "") + (B.weight ? "font-weight: " + B.weight + ";\n" : "") + "}\n"
                    }
                }
                if (0 !== m.length)
                    for (c.innerHTML += q, b = function (h) {
                            var a = m[h];
                            return function (h) {
                                var b = 0,
                                    d;
                                d = setInterval(function () {
                                    b += 100;
                                    if (f.detect(a) || 1E4 < b) clearInterval(d),
                                        h()
                                }, 100)
                            }
                        }, h = 0; h < m.length; h++) p.loadOrGet(a.id, m[h].url, b(h))
            }
        };
        v.exports = b
    }, {
        "../../vendor/font_detector.js": 42,
        "../constants.js": 12,
        "../errors.js": 13,
        "../events.js": 14,
        "../graphics/brush.js": 17,
        "../loc.js": 27,
        "../resource_manager.js": 35,
        "../utils.js": 39,
        "./element.js": 6,
        "./search.js": 9,
        engine: 40
    }],
    4: [function (c, v, n) {
        var b = {
            recalc: function (c, a) {
                a = a || (c.parent ? c.parent.gband : [0, 0]);
                c.gband = [a[0] + c.lband[0], a[0] + c.lband[1]];
                c.each(function (a) {
                    b.recalc(a, c.gband)
                })
            },
            wrap: function (b, a) {
                return b ? [b[0] +
                    a[0], b[0] + a[1] <= b[1] ? b[0] + a[1] : b[1]
                ] : a
            },
            expand: function (b, a) {
                return b ? [a[0] < b[0] ? a[0] : b[0], a[1] > b[1] ? a[1] : b[1]] : a
            },
            reduce: function (b, a) {
                return b ? [a[0] > b[0] ? a[0] : b[0], a[1] < b[1] ? a[1] : b[1]] : a
            }
        };
        v.exports = b
    }, {}],
    5: [function (c, v, n) {
        function b(a, b) {
            g["E_" + a] = a;
            var c = new d(b),
                q = function (a) {
                    return c.atT([0, 0], a)[1]
                };
            k[a] = q;
            p[a] = function () {
                return q
            }
        }

        function e(a) {
            for (var b = 1, d = 0, c = 0, k; 100 >= c; c++) k = a(c / 100), b = Math.min(b, k), d = Math.max(d, k);
            return [b, d]
        }

        function a(a) {
            var b = e(a);
            return function (d) {
                return (a(d) -
                    b[0]) / (b[1] - b[0])
            }
        }
        var g = c("../constants.js"),
            d = c("../graphics/segments.js").CSeg,
            p = {};
        p[g.E_PATH] = function (a) {
            return function (b) {
                return a.pointAt(b)[1]
            }
        };
        p[g.E_FUNC] = function (a) {
            return a
        };
        p[g.E_CSEG] = function (a) {
            return function (b) {
                return a.atT([0, 0], b)[1]
            }
        };
        p[g.E_STDF] = function (a) {
            return u[a]
        };
        var k = {};
        b("default", [.25, .1, .25, 1, 1, 1]);
        b("in", [.42, 0, 1, 1, 1, 1]);
        b("out", [0, 0, .58, 1, 1, 1]);
        b("inout", [.42, 0, .58, 1, 1, 1]);
        b("sinein", [.47, 0, .745, .715, 1, 1]);
        b("sineout", [.39, .575, .565, 1, 1, 1]);
        b("sineinout", [.445,
            .05, .55, .95, 1, 1
        ]);
        b("quadin", [.55, .085, .68, .53, 1, 1]);
        b("quadout", [.25, .46, .45, .94, 1, 1]);
        b("quadinout", [.455, .03, .515, .955, 1, 1]);
        b("cubicin", [.55, .055, .675, .19, 1, 1]);
        b("cubicout", [.215, .61, .355, 1, 1, 1]);
        b("cubicinout", [.645, .045, .355, 1, 1, 1]);
        b("quartin", [.895, .03, .685, .22, 1, 1]);
        b("quartout", [.165, .84, .44, 1, 1, 1]);
        b("quartinout", [.77, 0, .175, 1, 1, 1]);
        b("quintin", [.755, .05, .855, .06, 1, 1]);
        b("quintout", [.23, 1, .32, 1, 1, 1]);
        b("quintinout", [.86, 0, .07, 1, 1, 1]);
        b("expoin", [.95, .05, .795, .035, 1, 1]);
        b("expoout", [.19,
            1, .22, 1, 1, 1
        ]);
        b("expoinout", [1, 0, 0, 1, 1, 1]);
        b("circin", [.6, .04, .98, .335, 1, 1]);
        b("circout", [.075, .82, .165, 1, 1, 1]);
        b("circinout", [.785, .135, .15, .86, 1, 1]);
        b("backin", [.6, -.28, .735, .045, 1, 1]);
        b("backout", [.175, .885, .32, 1.275, 1, 1]);
        b("backinout", [.68, -.55, .265, 1.55, 1, 1]);
        var u = [function (a) {
                return k["default"](a)
            }, function (a) {
                return k["in"](a)
            }, function (a) {
                return k.out(a)
            }, function (a) {
                return k.inout(a)
            }, function (a) {
                return a * a
            }, function (a) {
                return a * (2 - a)
            }, function (a) {
                if (.5 > a) return 2 * a * a;
                a = 2 * (a - .5);
                return -(a *
                    (a - 2) - 1) / 2
            }, function (a) {
                return a * a * a
            }, function (a) {
                --a;
                return a * a * a + 1
            }, function (a) {
                if (.5 > a) return a *= 2, a * a * a / 2;
                a = 2 * (a - .5) - 1;
                return (a * a * a + 2) / 2
            }, function (a) {
                return 1 - Math.cos(Math.PI / 2 * a)
            }, function (a) {
                return Math.sin(Math.PI / 2 * a)
            }, function (a) {
                return -(Math.cos(Math.PI * a) - 1) / 2
            }, function (a) {
                return 0 >= a ? 0 : Math.pow(2, 10 * (a - 1))
            }, function (a) {
                return 1 <= a ? 1 : -Math.pow(2, -10 * a) + 1
            }, function (a) {
                return 0 >= a ? 0 : 1 <= a ? 1 : .5 > a ? Math.pow(2, 10 * (2 * a - 1)) / 2 : (-Math.pow(2, -20 * (a - .5)) + 2) / 2
            }, function (a) {
                return 1 - Math.sqrt(1 - a * a)
            },
            function (a) {
                --a;
                return Math.sqrt(1 - a * a)
            },
            function (a) {
                return 1 > (a *= 2) ? -(Math.sqrt(1 - a * a) - 1) / 2 : (Math.sqrt(1 - (a -= 2) * a) + 1) / 2
            },
            a(function (a) {
                return a * a * (2.70158 * a - 1.70158)
            }),
            function (a) {
                return function (b) {
                    return (a(b) - -.2) / 1.4
                }
            }(function (a) {
                return --a * a * (2.70158 * a + 1.70158) + 1
            }), a(function (a) {
                var b = 1.70158;
                return 1 > (a *= 2) ? a * a * (((b *= 1.525) + 1) * a - b) / 2 : ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2) / 2
            }),
            function (a) {
                return 1 - u[23](1 - a)
            },
            a(function (a) {
                return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ?
                    7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
            }),
            function (a) {
                return .5 > a ? .5 * u[22](2 * a) : .5 * u[23](2 * a - 1) + .5
            },
            function (a) {
                return 0
            },
            function (a) {
                return 1
            },
            function (a) {
                return .5 > a ? 0 : 1
            }
        ];
        v.exports = p
    }, {
        "../constants.js": 12,
        "../graphics/segments.js": 20
    }],
    6: [function (c, v, n) {
        function b(h) {
            return g.roundTo(h, 9)
        }

        function e(h, a) {
            return b(h) > b(a) ? 1 : b(h) < b(a) ? -1 : 0
        }

        function a(h, a, f) {
            this.id = g.guid();
            this.name = h || "";
            this.type = t.ET_EMPTY;
            this.children = [];
            this.parent = null;
            this.level = 0;
            this.anim = null;
            this.disabled = !1;
            this.affectsChildren = this.visible = !0;
            this.$data = null;
            this.rendering = this.registered = this.shown = !1;
            this.initState();
            this.initVisuals();
            this.initTime();
            this.initEvents();
            this.$modifiers = {};
            this.$painters = {};
            f && this.modify(f);
            a && this.paint(a);
            this.__painting = this.__modifying = null;
            this.__modifiers_hash = {};
            this.__painters_hash = {};
            this.__detachQueue = [];
            this.__frameProcessors = [];
            this._initHandlers();
            var b = this,
                c = this.on;
            this.on = function (h, a) {
                return c.call(b, h, a)
            };
            this.addSysModifiers();
            this.addSysPainters();
            d.liveDebug && this.addDebugRender()
        }
        c("../log.js");
        var g = c("../utils.js"),
            d = c("../global_opts.js"),
            p = g.iter,
            k = g.is,
            u = c("engine"),
            t = c("../constants.js");
        n = c("../events.js");
        var q = n.provideEvents,
            y = n.EventState,
            w = c("../../vendor/transform.js"),
            z = c("../render.js"),
            A = c("../graphics/brush.js"),
            r = c("../graphics/color.js"),
            C = c("../graphics/bounds.js"),
            D = c("./modifier.js"),
            E = c("./painter.js"),
            x = c("./band.js"),
            m = c("../errors.js"),
            f = c("../loc.js").Errors;
        a.DEFAULT_PVT = [.5, .5];
        a.DEFAULT_REG = [0, 0];
        a._$ = function (h,
            f, b) {
            return new a(h, f, b)
        };
        a.NO_TIME = null;
        a.NO_BAND = null;
        a.DEFAULT_LEN = Infinity;
        a._customImporters = [];
        q(a, [t.X_MCLICK, t.X_MDCLICK, t.X_MUP, t.X_MDOWN, t.X_MMOVE, t.X_MOVER, t.X_MOUT, t.X_START, t.X_STOP]);
        a.prototype.is = function (h) {
            return this.type == h
        };
        a.prototype.initState = function () {
            this.y = this.x = 0;
            this.sy = this.sx = 1;
            this.angle = this.hy = this.hx = 0;
            this.alpha = 1;
            this.matrix ? this.matrix.reset() : this.matrix = new w;
            this._y = this._x = 0;
            this._hy = this._hx = this._sy = this._sx = 1;
            this._angle = 0;
            this._alpha = 1;
            this._matrix ?
                this._matrix.reset() : this._matrix = new w;
            this.$reg = a.DEFAULT_REG;
            this.$pivot = a.DEFAULT_PVT;
            return this
        };
        a.prototype.resetState = a.prototype.initState;
        a.prototype.initVisuals = function () {
            this.$video = this.$audio = this.$my_bounds = this.lastBoundsSavedAt = this.$bounds = this.$mpath = this.$mask = this.composite_op = this.$image = this.$text = this.$path = this.$shadow = this.$stroke = this.$fill = null;
            return this
        };
        a.prototype.resetVisuals = a.prototype.initVisuals;
        a.prototype.initTime = function () {
            this.mode = t.R_ONCE;
            this.nrep = Infinity;
            this.lband = [0, a.DEFAULT_LEN];
            this.gband = [0, a.DEFAULT_LEN];
            this.keys = {};
            this["switch"] = this.rt = this.t = this.key = this.tf = null;
            this.__resetTimeCache();
            this.__resetBandEvents();
            return this
        };
        a.prototype.resetTime = a.prototype.initTime;
        a.prototype.__resetTimeCache = function () {
            this.__lastJump = this.cur_rt = this.cur_t = null;
            this.__jumpLock = !1
        };
        a.prototype.__resetBandEvents = function () {
            this.__firedStop = this.__firedStart = !1;
            this.__lastRender = null
        };
        a.prototype.initEvents = function () {
            this.evts = {};
            this.__evt_st = new y;
            this.__evtCache = [];
            return this
        };
        a.prototype.resetEvents = a.prototype.initEvents;
        a.prototype.path = function (h) {
            return h ? (this.invalidate(), this.type = t.ET_PATH, this.$path = k.str(h) ? new Path(h) : h, this) : this.$path
        };
        a.prototype.text = function (h) {
            return h ? (this.invalidate(), this.type = t.ET_TEXT, this.$text = k.str(h) || k.arr(h) ? new Text(h) : h, this) : this.$text
        };
        a.prototype.image = function (h, a) {
            return h ? (this.invalidate(), this.type = t.ET_SHEET, this.$image = k.str(h) ? new Image(h, a) : h, this) : this.$image
        };
        a.prototype.fill =
            function (h) {
                return h ? (this.$fill = h instanceof A ? h : A.fill(h), this) : this.$fill
            };
        a.prototype.noFill = function () {
            this.$fill = r.TRANSPARENT;
            return this
        };
        a.prototype.stroke = function (h, a) {
            return h ? (h instanceof A ? (this.$stroke = h, k.defined(a) && (this.$stroke.width = a)) : this.$stroke = A.stroke(h, a), this) : this.$stroke
        };
        a.prototype.noStroke = function () {
            this.$stroke = null;
            return this
        };
        a.prototype.shadow = function (h, a, f, b) {
            return h ? (this.$shadow = h instanceof A ? h : A.shadow(h, a, f, b), this) : this.$shadow
        };
        a.prototype.modifiers =
            function (h, f, b) {
                b = b || D.ALL_MODIFIERS;
                f = f || 0;
                this.applyPrevState(this);
                this.cur_t = h;
                this.cur_rt = h / (this.lband[1] - this.lband[0]);
                k.num(this.__appliedAt) && (this._t = this.__appliedAt, this._rt = this.__appliedAt / (this.lband[1] - this.lband[0]));
                this.__loadEvents();
                for (var d = this.$modifiers, c, B, m, q, z = 0, g = b.length; z < g; z++) {
                    this.__modifying = c = b[z];
                    this.__mbefore(c);
                    if (B = d[c])
                        for (var e = 0, x = B.length; e < x; e++)
                            if (m = B[e], q = this.__adaptModTime(m, h), null !== q && (!1 === q || !1 === m.apply(this, q[0], f, q[1]))) return this.__mafter(h,
                                this.__modifying, !1), this.__modifying = null, !1;
                    this.__mafter(h, c, !0)
                }
                this.matrix = a.getMatrixOf(this, this.matrix);
                this.__modifying = null;
                this.__appliedAt = h;
                this.resetEvents();
                return !0
            };
        a.prototype.painters = function (h, a) {
            for (var f = a || E.ALL_PAINTERS, b = this.$painters, d, c, B, m = 0, k = f.length; m < k; m++) {
                this.__painting = d = f[m];
                this.__pbefore(h, d);
                if (c = b[d])
                    for (var q = 0, z = c.length; q < z; q++) B = c[q], B.apply(this, h);
                this.__pafter(h, d)
            }
            this.__painting = null
        };
        a.prototype.forAllModifiers = function (h) {
            for (var a = D.ALL_MODIFIERS,
                    f = this.$modifiers, b, d, c = 0, m = a.length; c < m; c++)
                if (b = a[c], d = f[b])
                    for (var q = 0, k = d.length; q < k; q++) h(d[q], b)
        };
        a.prototype.forAllPainters = function (h) {
            for (var a = E.ALL_PAINTERS, f = this.$painters, b, d, c = 0, m = a.length; c < m; c++)
                if (b = a[c], d = f[b])
                    for (var q = 0, k = d.length; q < k; q++) h(d[q], b)
        };
        a.prototype.draw = a.prototype.painters;
        a.prototype.transform = function (h) {
            h.globalAlpha *= this.alpha;
            this.matrix.apply(h);
            return this.matrix
        };
        a.prototype.invTransform = function (h) {
            var f = a.getIMatrixOf(this);
            h.globalAlpha *= this.alpha;
            f.apply(h);
            return f
        };
        a.prototype.render = function (h, f, b) {
            if (!this.disabled) {
                this.rendering = !0;
                var d = !1,
                    c = this.ltime(f);
                if (c !== a.NO_TIME) {
                    this.cur_rt = this.cur_t = null;
                    d = this.__preRender(f, c, h);
                    this.anim && this.anim.__informEnabled && this.inform(f, c);
                    d && (d = this.fits(c) && this.modifiers(c, b) && this.visible);
                    if (d) {
                        h.save();
                        f = this.affectsChildren ? this.gtime(c) : f;
                        var m = this.$mask,
                            B = !1,
                            q, k;
                        m && (q = m.ltime(c), k = m.gtime(q), B = m.fits(q) && m.modifiers(q, b) && m.visible);
                        if (B) {
                            m.ensureHasMaskCanvas();
                            var c = m.__maskCvs,
                                z = m.__maskCtx,
                                B = m.__backCvs,
                                g = m.__backCtx,
                                e = m.bounds(q).toPoints(),
                                x = Number.MAX_VALUE;
                            q = Number.MAX_VALUE;
                            for (var r = Number.MIN_VALUE, w = Number.MIN_VALUE, y, p = 0, G = e.length; p < G; p++) y = e[p], y.x < x && (x = y.x), y.y < q && (q = y.y), y.x > r && (r = y.x), y.y > w && (w = y.y);
                            e = u.PX_RATIO;
                            y = x;
                            p = q;
                            x = Math.round(r - x);
                            q = Math.round(w - q);
                            w = this._maskCvsSize || u.getCanvasSize(c);
                            w[0] < x || w[1] < q ? (this._maskCvsSize = u.setCanvasSize(c, x, q), u.setCanvasSize(B, x, q)) : this._maskCvsSize = w;
                            g.clearRect(0, 0, x * e, q * e);
                            z.clearRect(0, 0, x * e, q * e);
                            g.save();
                            z.save();
                            g.setTransform(e,
                                0, 0, e, -y * e, -p * e);
                            z.setTransform(e, 0, 0, e, -y * e, -p * e);
                            this.transform(g);
                            this.painters(g);
                            this.each(function (h) {
                                h.render(g, f, b)
                            });
                            m.transform(z);
                            m.painters(z);
                            m.each(function (h) {
                                h.render(z, k, b)
                            });
                            g.globalCompositeOperation = "destination-in";
                            g.setTransform(1, 0, 0, 1, 0, 0);
                            g.drawImage(c, 0, 0);
                            h.drawImage(B, 0, 0, Math.floor(x * e), Math.floor(q * e), y, p, x, q);
                            z.restore();
                            g.restore()
                        } else this.transform(h), this.painters(h), this.each(function (a) {
                            a.render(h, f, b)
                        });
                        h.restore()
                    }
                    this.shown = d;
                    this.__postRender();
                    this.rendering = !1;
                    return this
                }
            }
        };
        a.prototype.pivot = function (h, a) {
            this.$pivot = [h, a];
            return this
        };
        a.prototype.reg = function (h, a) {
            this.$reg = [h, a];
            return this
        };
        a.prototype.move = function (h, a) {
            this.x = h;
            this.y = a;
            return this
        };
        a.prototype.rotate = function (h) {
            this.angle = h;
            return this
        };
        a.prototype.rotateInDeg = function (h) {
            return this.rotate(h / 180 * Math.PI)
        };
        a.prototype.scale = function (h, a) {
            this.sx = h;
            this.sy = a;
            return this
        };
        a.prototype.skew = function (h, a) {
            this.hx = h;
            this.hy = a;
            return this
        };
        a.prototype.repeat = function (h, a) {
            this.mode =
                h;
            this.nrep = k.num(a) ? a : Infinity;
            return this
        };
        a.prototype.once = function () {
            this.mode = t.R_ONCE;
            this.nrep = Infinity;
            return this
        };
        a.prototype.stay = function () {
            this.mode = t.R_STAY;
            this.nrep = Infinity;
            return this
        };
        a.prototype.loop = function (h) {
            this.mode = t.R_LOOP;
            this.nrep = k.num(h) ? h : Infinity;
            return this
        };
        a.prototype.bounce = function (h) {
            this.mode = t.R_BOUNCE;
            this.nrep = k.num(h) ? h : Infinity;
            return this
        };
        a.prototype.jump = function (h) {
            k.defined(this.pausedAt) && (this.pausedAt = h);
            this.t = h;
            return this
        };
        a.prototype.jumpTo =
            function (h) {
                if (h = k.str(selector) ? this.find(selector) : selector) return this.anim ? this.anim.jump(h.gband[0]) : this.jump(h.lband[0]), this
            };
        a.prototype.play = function () {
            if (this.paused) return this.paused = !1, this.t = null, this.pausedAt = void 0, this.__m_stop && this.removeModifier(this.__m_stop), this
        };
        a.prototype.stop = function () {
            if (this.paused) return this;
            this.paused = !0;
            this.__m_stop = new D(function (h) {
                this.paused && (k.defined(this.pausedAt) ? this.t = this.pausedAt : this.pausedAt = h)
            });
            this.modify(this.__m_stop);
            return this
        };
        a.prototype.at = function (h, a) {
            return this.modify((new D(a)).time(h))
        };
        a.prototype.modify = function (h, a) {
            k.arr(h) || (a = h, h = null);
            if (!a) throw m.element("No modifier was passed to .modify() method", this);
            if (!k.modifier(a) && k.fun(a)) a = new D(a, t.MOD_USER);
            else if (!k.modifier(a)) throw m.element("Modifier should be either a function or a Modifier instance", this);
            if (!a.type) throw m.element("Modifier should have a type defined", this);
            h && (a.$band = h);
            if (a.__applied_to && a.__applied_to[this.id]) throw m.element("This modifier is already applied to this Element",
                this);
            this.$modifiers[a.type] || (this.$modifiers[a.type] = []);
            this.$modifiers[a.type].push(a);
            this.__modifiers_hash[a.id] = a;
            a.__applied_to || (a.__applied_to = {});
            a.__applied_to[this.id] = this.$modifiers[a.type].length;
            return this
        };
        a.prototype.removeModifier = function (a) {
            if (!k.modifier(a)) throw m.element("Please pass Modifier instance to removeModifier", this);
            if (!this.__modifiers_hash[a.id]) throw m.element("Modifier wasn't applied to this element", this);
            if (!a.__applied_to || !a.__applied_to[this.id]) throw m.element(f.A.MODIFIER_NOT_ATTACHED,
                this);
            g.removeElement(this.__modifiers_hash, a.id);
            g.removeElement(this.$modifiers[a.type], a);
            g.removeElement(a.__applied_to, this.id);
            return this
        };
        a.prototype.paint = function (a) {
            if (!a) throw m.element("No painter was passed to .paint() method", this);
            if (!k.painter(a) && k.fun(a)) a = new E(a, t.MOD_USER);
            else if (!k.painter(a)) throw m.element("Painter should be either a function or a Painter instance", this);
            if (!a.type) throw m.element("Painter should have a type defined", this);
            if (a.__applied_to && a.__applied_to[this.id]) throw m.element("This painter is already applied to this Element",
                this);
            this.$painters[a.type] || (this.$painters[a.type] = []);
            this.$painters[a.type].push(a);
            this.__painters_hash[a.id] = a;
            a.__applied_to || (a.__applied_to = {});
            a.__applied_to[this.id] = this.$painters[a.type].length;
            return this
        };
        a.prototype.removePainter = function (a) {
            if (!k.painter(a)) throw m.element("Please pass Painter instance to removePainter", this);
            if (!this.__painters_hash[a.id]) throw m.element("Painter wasn't applied to this element", this);
            if (!a.__applied_to || !a.__applied_to[this.id]) throw m.element(f.A.PAINTER_NOT_ATTACHED,
                this);
            g.removeElement(this.__painters_hash, a.id);
            g.removeElement(this.$painters[a.type], a);
            g.removeElement(a.__applied_to, this.id);
            return this
        };
        a.prototype.tween = function (a) {
            if (!k.tween(a)) throw m.element("Please pass Tween instance to .tween() method", this);
            return this.modify(a)
        };
        a.prototype.removeTween = function (a) {
            if (!k.tween(a)) throw m.element("Please pass Tween instance to .removeTween() method", this);
            return this.removeModifier(a)
        };
        a.prototype.add = function (h, f, b) {
            if (f) h = new a(h, f), b && h.changeTransform(b),
                this._addChild(h);
            else if (k.arr(h))
                for (b = 0, h = elms.length; b < h; b++) this._addChild(elms[b]);
            else this._addChild(h);
            this.invalidate();
            return this
        };
        a.prototype.remove = function (a) {
            if (!a) throw m.element(f.A.NO_ELEMENT_TO_REMOVE);
            if (0 === this.__safeDetach(a)) throw m.element(f.A.NO_ELEMENT);
            this.invalidate();
            return this
        };
        a.prototype._unbind = function () {
            if (this.parent.__unsafeToRemove || this.__unsafeToRemove) throw m.element(f.A.UNSAFE_TO_REMOVE);
            this.parent = null;
            this.anim && this.anim._unregister(this)
        };
        a.prototype.detach =
            function () {
                if (0 === this.parent.__safeDetach(this)) throw m.element(f.A.ELEMENT_NOT_ATTACHED, this);
            };
        a.prototype.makeBandFit = function () {
            var a = this.findWrapBand();
            this.gband = a;
            this.lband[1] = a[1] - a[0]
        };
        a.prototype.fits = function (h) {
            return 0 > h || h === a.NO_TIME ? !1 : 0 >= e(h, this.lband[1] - this.lband[0])
        };
        a.prototype.gtime = function (a) {
            return this.gband[0] + a
        };
        a.prototype.ltime = function (h) {
            return this.__checkJump(a.checkRepeatMode(this.__checkSwitcher(h), this.gband, this.mode, this.nrep))
        };
        a.prototype.inform = function (a,
            f) {
            var h = this.lband[1] - this.lband[0];
            0 > e(f, 0) || (k.defined(this.__lastRender) ? k.defined(this.__lastRender) && 0 < e(f, h) ? (this.__firedStop || (this.modifiers(h, h - this.__lastRender), this.fire(t.X_STOP, f, h), this.traverse(function (h) {
                h.inform(h.ltime(a), a)
            }), this.__firedStop = !0), this.__lastRender = void 0) : this.__lastRender = f : (this.__lastRender = f, this.__firedStart || (this.fire(t.X_START, f, h), this.__firedStart = !0)))
        };
        a.prototype.band = function (a, f) {
            if (!k.defined(a)) return this.lband;
            k.arr(a) && (a = a[0], f = a[1]);
            k.defined(f) ||
                (f = Infinity);
            this.lband = [a, f];
            if (this.parent) {
                var h = this.parent;
                this.gband = [h.gband[0] + a, h.gband[0] + f]
            }
            return this
        };
        a.prototype.duration = function (a) {
            if (!k.defined(a)) return this.lband[1] - this.lband[0];
            this.gband = [this.gband[0], this.gband[0] + a];
            this.lband = [this.lband[0], this.lband[0] + a];
            return this
        };
        a.prototype._max_tpos = function () {
            return 0 <= this.gband[1] ? this.gband[1] : 0
        };
        a.prototype.m_on = function (a, f) {
            this.modify(new D(function (h) {
                if (this.__evt_st.check(a))
                    for (var b = this.evts[a], d = 0, c = b.length; d <
                        c; d++)
                        if (!1 === f.call(this, b[d], h)) return !1
            }, t.MOD_EVENT))
        };
        a.prototype.findWrapBand = function () {
            if (0 === this.children.length) return this.gband;
            var a = [Infinity, 0];
            this.each(function (h) {
                a = x.expand(a, h.gband)
            });
            return Infinity !== a[0] ? a : null
        };
        a.prototype.dispose = function () {
            this.disposeHandlers();
            this.disposeVisuals();
            this.each(function (a) {
                a.dispose()
            })
        };
        a.prototype.disposeVisuals = function () {
            this.$path && this.$path.dispose();
            this.$text && this.$text.dispose();
            this.$image && this.$image.dispose();
            this.$video &&
                this.$video.dispose();
            this.$mpath && this.$mpath.dispose()
        };
        a.prototype.reset = function () {
            this.resetEvents();
            this.__resetTimeCache();
            this.__resetBandEvents();
            var a = this;
            this.forAllModifiers(function (h) {
                h.__wasCalled && (h.__wasCalled[a.id] = !1);
                k.defined(h.__wasCalledAt) && (h.__wasCalledAt[a.id] = -1)
            });
            this.each(function (a) {
                a.reset()
            })
        };
        a.prototype.each = function (a) {
            var h = this.children;
            this.__unsafeToRemove = !0;
            for (var f = 0, b = h.length; f < b && !1 !== a(h[f]); f++);
            this.__unsafeToRemove = !1;
            return this
        };
        a.prototype.reverseEach =
            function (a) {
                var h = this.children;
                this.__unsafeToRemove = !0;
                for (var f = h.length; f-- && !1 !== a(h[f]););
                this.__unsafeToRemove = !1;
                return this
            };
        a.prototype.firstParent = function (a) {
            if (a(this)) return this;
            for (var h = this.parent; h && !a(h);) h = h.parent;
            return h
        };
        a.prototype.traverse = function (a) {
            var h = this.children;
            this.__unsafeToRemove = !0;
            for (var f = 0, b = h.length; f < b; f++) {
                var d = h[f];
                if (!1 === a(d)) break;
                d.traverse(a)
            }
            this.__unsafeToRemove = !1;
            return this
        };
        a.prototype.iter = function (a, f) {
            this.__unsafeToRemove = !0;
            p(this.children).each(a,
                f);
            this.__unsafeToRemove = !1;
            return this
        };
        a.prototype.hasChildren = function () {
            return 0 < this.children.length
        };
        a.prototype.deepIterateChildren = function (a, f) {
            this.__unsafeToRemove = !0;
            p(this.children).each(function (h) {
                h.deepIterateChildren(a, f);
                return a(h)
            }, f);
            this.__unsafeToRemove = !1
        };
        a.prototype.__performDetach = function () {
            var a = this.children;
            p(this.__detachQueue).each(function (h) {
                0 <= (idx = a.indexOf(h)) && (a.splice(idx, 1), h._unbind())
            });
            this.__detachQueue = []
        };
        a.prototype.clear = function () {
            if (this.__unsafeToRemove) throw m.element(f.A.UNSAFE_TO_REMOVE,
                this);
            if (this.rendering) this.__detachQueue = this.__detachQueue.concat(this.children);
            else {
                var a = this.children;
                this.children = [];
                p(a).each(function (a) {
                    a._unbind()
                })
            }
            return this
        };
        a.prototype.lock = function () {
            this.__jumpLock = !0;
            this.__state = this.extractState();
            this.__pstate = this.extractPrevState()
        };
        a.prototype.unlock = function (a) {
            a = a ? this.extractState() : void 0;
            this.applyState(this.__state);
            this.applyPrevState(this.__pstate);
            this.__pstate = this.__state = null;
            this.__jumpLock = !1;
            return a
        };
        a.prototype.extractState =
            function () {
                return {
                    x: this.x,
                    y: this.y,
                    sx: this.sx,
                    sy: this.sy,
                    hx: this.hx,
                    hy: this.hy,
                    angle: this.angle,
                    alpha: this.alpha,
                    t: this.t,
                    rt: this.rt,
                    key: this.key
                }
            };
        a.prototype.extractPrevState = function () {
            return {
                x: this._x,
                y: this._y,
                sx: this._sx,
                sy: this._sy,
                hx: this._hx,
                hy: this._hy,
                angle: this._angle,
                alpha: this._alpha,
                t: this._t,
                rt: this._rt,
                key: this._key
            }
        };
        a.prototype.applyState = function (a) {
            this.x = a.x;
            this.y = a.y;
            this.sx = a.sx;
            this.sy = a.sy;
            this.hx = a.hx;
            this.hy = a.hy;
            this.angle = a.angle;
            this.alpha = a.alpha;
            this.t = a.t;
            this.rt =
                a.rt;
            this.key = a.key
        };
        a.prototype.applyPrevState = function (a) {
            this._x = a.x;
            this._y = a.y;
            this._sx = a.sx;
            this._sy = a.sy;
            this._hx = a.hx;
            this._hy = a.hy;
            this._angle = a.angle;
            this._alpha = a.alpha;
            this._t = a.t;
            this._rt = a.rt;
            this._key = a.key
        };
        a.prototype.stateAt = function (h) {
            this.lock();
            return this.unlock(this.modifiers(h, 0, a.NOEVT_MODIFIERS))
        };
        a.prototype.pos = function (a, f) {
            return k.defined(a) ? this.move(a, f) : {
                x: this.x,
                y: this.y
            }
        };
        a.prototype.offset = function () {
            for (var a = 0, f = 0, b = this.parent; b;) a += b.x, f += b.y, b = b.parent;
            return [a,
                f
            ]
        };
        a.prototype.invalidate = function () {
            this.lastBoundsSavedAt = this.$bounds = this.$my_bounds = null;
            this.parent && this.parent.invalidate();
            return this
        };
        a.prototype.invalidateVisuals = function () {
            var a = this.$path || this.$text || this.$image || this.$video;
            a && a.invalidate()
        };
        a.prototype.bounds = function (a) {
            if (k.defined(this.lastBoundsSavedAt) && 0 == e(this.lastBoundsSavedAt, a)) return this.$bounds;
            var h = this.myBounds();
            this.children.length && (h = h.clone(), this.each(function (f) {
                h.add(f.bounds(a))
            }));
            h = this.adaptBounds(h);
            this.lastBoundsSavedAt = a;
            return this.$bounds = h
        };
        a.prototype.myBounds = function () {
            if (this.$my_bounds) return this.$my_bounds;
            var a = this.$path || this.$text || this.$image || this.$video;
            return a ? this.$my_bounds = a.bounds() : this.$my_bounds = C.NONE
        };
        a.prototype.inside = function (a, f, b) {
            if (!f || f(this)) {
                var h = this.adapt(a.x, a.y);
                if (this.myBounds().inside(h) && (a = this.$path || this.$text || this.$image || this.$video) && a.inside(h)) return b(this, h);
                this.reverseEach(function (a) {
                    return a.inside(h, f, b)
                })
            }
        };
        a.prototype.adapt =
            function (a, f) {
                return this.matrix.transformPointInverse(a, f)
            };
        a.prototype.adaptBounds = function (a) {
            var h = this.matrix,
                f = h.transformPoint(a.x, a.y),
                b = h.transformPoint(a.x + a.width, a.y),
                d = h.transformPoint(a.x + a.width, a.y + a.height);
            a = h.transformPoint(a.x, a.y + a.height);
            var h = Math.min(f.x, b.x, a.x, d.x),
                c = Math.min(f.y, b.y, a.y, d.y);
            return new C(h, c, Math.max(f.x, b.x, a.x, d.x) - h, Math.max(f.y, b.y, a.y, d.y) - c)
        };
        a.prototype.inverseAdaptBounds = function (a) {
            var f = this.matrix,
                h = f.transformPointInverse(a.x, a.y),
                b = f.transformPointInverse(a.x +
                    a.width, a.y),
                d = f.transformPointInverse(a.x + a.width, a.y + a.height);
            a = f.transformPointInverse(a.x, a.y + a.height);
            var f = Math.min(h.x, b.x, a.x, d.x),
                c = Math.min(h.y, b.y, a.y, d.y);
            return new C(f, c, Math.max(h.x, b.x, a.x, d.x) - f, Math.max(h.y, b.y, a.y, d.y) - c)
        };
        a.prototype.isEmpty = function () {
            var a = this.myBounds();
            return 0 === a.width && 0 === a.height
        };
        a.prototype.applyVisuals = function (a) {
            var f = this.$path || this.$text || this.$image || this.$video;
            f && f.apply(a, this.$fill, this.$stroke, this.$shadow)
        };
        a.prototype.applyBrushes = function (a) {
            this.$shadow &&
                this.$shadow.apply(a);
            this.$fill && (this.$fill.apply(a), a.fill());
            this.$shadow && A.clearShadow(a);
            this.$stroke && (this.$stroke.apply(a), a.stroke())
        };
        a.prototype.applyAComp = function (a) {
            this.composite_op && (a.globalCompositeOperation = t.AC_NAMES[this.composite_op])
        };
        a.prototype.mask = function (a) {
            if (!a) return this.$mask;
            this.$mask = a;
            return this
        };
        a.prototype.noMask = function () {
            this.$mask = null;
            return this
        };
        a.prototype.ensureHasMaskCanvas = function (a) {
            this.__maskCvs && this.__backCvs || (this.__maskCvs = u.createCanvas(1,
                1), this.__maskCtx = u.getContext(this.__maskCvs, "2d"), this.__backCvs = u.createCanvas(1, 1), this.__backCtx = u.getContext(this.__backCvs, "2d"))
        };
        a.prototype.removeMaskCanvases = function () {
            this.__maskCvs && u.disposeElement(this.__maskCvs);
            this.__backCvs && u.disposeElement(this.__backCvs);
            this.__backCtx = this.__maskCtx = null
        };
        a.prototype.data = function (a) {
            if (!k.defined(a)) return this.$data;
            this.$data = a;
            return this
        };
        a.prototype.toString = function () {
            var a = ["[ Element "];
            a.push("'" + (this.name || this.id) + "' ");
            a.push("]");
            return a.join("")
        };
        a.prototype.find = function (a) {
            return this.anim.find(a, this)
        };
        a.prototype.findAll = function (a) {
            return this.anim.findAll(a, this)
        };
        a.prototype.clone = function () {
            var f = new a;
            f.name = this.name;
            f.children = [].concat(this.children);
            f.$modifiers = [].concat(this.$modifiers);
            f.$painters = [].concat(this.$painters);
            f.level = this.level;
            a.transferState(this, f);
            a.transferVisuals(this, f);
            a.transferTime(this, f);
            f.__u_data = this.__u_data;
            return f
        };
        a.prototype.shallow = function () {
            var a = this.clone();
            a.children = [];
            for (var f = this.children, b = a.children, d = 0, c = f.length; d < c; d++) {
                var m = f[d].shallow();
                m.parent = a;
                b.push(m)
            }
            a.$modifiers = {};
            this.forAllModifiers(function (f, b) {
                a.modify(f)
            });
            a.$painters = {};
            this.forAllPainters(function (f, b) {
                a.paint(f)
            });
            a.__u_data = g.obj_clone(this.__u_data);
            return a
        };
        a.prototype.asClip = function (a, f, b) {
            if (f != t.R_ONCE) return this.clip_band = a, this.clip_mode = f, this.clip_nrep = b, this
        };
        a.prototype._addChild = function (a) {
            a.parent = this;
            a.level = this.level + 1;
            this.children.push(a);
            this.anim && this.anim._register(a);
            x.recalc(this)
        };
        a.prototype._stateStr = function () {
            return "x: " + this.x + " y: " + this.y + "\nsx: " + this.sx + " sy: " + this.sy + "\nangle: " + this.angle + " alpha: " + this.alpha + "\np: " + this.p + " t: " + this.t + " key: " + this.key + "\n"
        };
        a.prototype.__mbefore = function (a, f) {};
        a.prototype.__mafter = function (a, f, b) {};
        a.prototype.__adaptModTime = function (f, d) {
            var h = this.lband[1] - this.lband[0],
                c = f.$easing,
                m = f.$band || f.$time,
                q = f.$relative,
                z = f.is_tween;
            if (this.clip_band && (d = a.checkRepeatMode(d, this.clip_band, this.clip_mode || t.R_ONCE,
                    this.clip_nrep), 0 > d)) return !1;
            if (null === m) m = d;
            else if (k.arr(m)) {
                if (q && (m = [m[0] * h, m[1] * h]), h = m[1] - m[0], m = d - m[0], 0 > e(m, 0) || 0 < e(m, h)) return null
            } else {
                if (k.num(m)) {
                    if (f.__wasCalled && f.__wasCalled[this.id] || !(0 <= e(d, q ? m * h : m))) return null;
                    f.__wasCalled || (f.__wasCalled = {});
                    f.__wasCalledAt || (f.__wasCalledAt = {});
                    f.__wasCalled[this.id] = !0;
                    f.__wasCalledAt[this.id] = d
                }
                m = d
            }
            q || z ? k.finite(h) && (m = b(m) / b(h), h = b(h)) : (m = b(m), h = b(h));
            return c ? [c(m, h), h] : [m, h]
        };
        a.prototype.__pbefore = function (a, f) {};
        a.prototype.__pafter =
            function (a, f) {};
        a.prototype.__checkJump = function (f) {
            if (f === a.NO_TIME) return a.NO_TIME;
            if (this.tf) return this.tf(f);
            var b, h = this.lband[1] - this.lband[0];
            b = k.defined(this.p) ? this.p : null;
            b = null === b && null !== this.t ? this.t : b;
            b = null === b && null !== this.rt && k.finite(h) ? this.rt * h : b;
            b = null === b && k.defined(this.key) ? this.keys[this.key] : b;
            if (null !== b) {
                if (0 > b || b > h) throw m.element("Failed to calculate jump", this);
                if (!this.__jumpLock) return this.__lastJump = [f, b], this.key = this.t = this.p = null, b
            }
            b = null !== b ? b : f;
            return k.defined(this.__lastJump) ?
                (k.finite(this.__lastJump[1]) ? this.__lastJump[1] : 0) + (b - this.__lastJump[0]) : null !== b ? b : a.NO_TIME
        };
        a.prototype.__checkSwitcher = function (f) {
            if (!this.parent || !this.parent["switch"]) return f;
            var b = this.parent;
            return b["switch"] === t.SWITCH_OFF ? a.NO_TIME : b["switch"] === this.name && b.switch_band ? f === a.NO_TIME ? a.NO_TIME : f - b.switch_band[0] : a.NO_TIME
        };
        a.prototype.filterEvent = function (a, f) {
            if (a != t.X_START && a != t.X_STOP)
                if (this.shown) this.__saveEvt(a, f);
                else return a === t.X_STOP && this.__resetBandEvents(), !1;
            return !0
        };
        a.prototype.__saveEvt = function (a, f) {
            this.__evtCache.push([a, f])
        };
        a.prototype.__loadEvents = function () {
            var a = this.__evtCache,
                f = a.length;
            this.resetEvents();
            if (0 < f) {
                for (var b, d, c, m = 0; m < f; m++) b = a[m], d = b[0], this.__evt_st.save(d), c = this.evts, c[d] || (c[d] = []), c[d].push(b[1]);
                this.__evtCache = []
            }
        };
        a.prototype.__preRender = function (a, f, b) {
            for (var h = this.__frameProcessors, d = 0, c = h.length; d < c; d++)
                if (!1 === h[d].call(this, a, f, b)) return !1;
            return !0
        };
        a.prototype.__safeDetach = function (a, b) {
            var h = -1,
                d = b || 0,
                c = this.children;
            if (0 <= (h = c.indexOf(a))) {
                if (this.rendering || a.rendering) this.__detachQueue.push(a);
                else {
                    if (this.__unsafeToRemove) throw m.element(f.A.UNSAFE_TO_REMOVE, this);
                    a._unbind();
                    c.splice(h, 1)
                }
                return 1
            }
            this.each(function (f) {
                d += f.__safeDetach(a, d)
            });
            return d
        };
        a.prototype.__postRender = function () {
            this.__performDetach()
        };
        a.prototype._hasRemoteResources = function (a, f) {
            return f.imagesEnabled && this.$image || this.is(t.ET_AUDIO) && f.audioEnabled || this.is(t.ET_VIDEO) && f.videoEnabled ? !0 : this.$mask ? this.$mask._hasRemoteResources(a,
                f) : !1
        };
        a.prototype._collectRemoteResources = function (a, f) {
            var b = [];
            f.imagesEnabled && this.$image && b.push(this.$image.src);
            f.audioEnabled && this.is(t.ET_AUDIO) && b.push(this.$audio.url);
            f.videoEnabled && this.is(t.ET_VIDEO) && b.push(this.$video.url);
            this.$mask && (b = b.concat(this.$mask._collectRemoteResources(a, f)));
            return b
        };
        a.prototype._loadRemoteResources = function (a, f) {
            f.imagesEnabled && this.$image && this.$image.load(this.id, f);
            this.is(t.ET_AUDIO) && f.audioEnabled && this.$audio.load(this.id, f);
            this.is(t.ET_VIDEO) &&
                f.videoEnabled && this.$video.load(this.id, f);
            this.$mask && this.$mask._loadRemoteResources(this, f)
        };
        a.mergeStates = function (a, f, b) {
            b.x = a.x + f.x;
            b.y = a.y + f.y;
            b.sx = a.sx * f.sx;
            b.sy = a.sy * f.sy;
            b.hx = a.hx + f.hx;
            b.hy = a.hy + f.hy;
            b.angle = a.angle + f.angle;
            b.alpha = a.alpha + f.alpha
        };
        a.transferState = function (a, f) {
            f.x = a.x;
            f.y = a.y;
            f.sx = a.sx;
            f.sy = a.sy;
            f.hx = a.hx;
            f.hy = a.hy;
            f.angle = a.angle;
            f.alpha = a.alpha;
            f.$reg = [].concat(a.$reg);
            f.$pivot = [].concat(a.$pivot)
        };
        a.transferVisuals = function (a, f) {
            f.$fill = A.clone(a.$fill);
            f.$stroke = A.clone(a.$stroke);
            f.$shadow = A.clone(a.$shadow);
            f.$path = a.$path ? a.$path.clone() : null;
            f.$text = a.$text ? a.$text.clone() : null;
            f.$image = a.$image ? a.$image.clone() : null;
            f.$audio = a.$audio ? a.$audio.clone() : null;
            f.$video = a.$video ? a.$video.clone() : null;
            f.$mask = a.$mask ? a.$mask : null;
            f.$mpath = a.$mpath ? a.$mpath.clone() : null;
            f.composite_op = a.composite_op
        };
        a.transferTime = function (a, f) {
            f.mode = a.mode;
            f.nrep = a.nrep;
            f.lband = [].concat(a.lband);
            f.gband = [].concat(a.gband);
            f.keys = [].concat(a.keys);
            f.tf = a.tf
        };
        a.getMatrixOf = function (a, f) {
            var b =
                f ? (f.reset(), f) : new w,
                d = a.getTranslate();
            b.translate(d.x, d.y);
            b.rotate(a.getRotate());
            b.shear(a.hx, a.hy);
            b.scale(a.sx, a.sy);
            b.translate(-a.$reg[0], -a.$reg[1]);
            d = a.$pivot;
            if (0 === d[0] && 0 === d[1]) return b;
            var h = a.myBounds();
            if (!h || h === C.NONE) return b;
            b.translate(-(d[0] * (h.width || 0)), -(d[1] * (h.height || 0)));
            return b
        };
        a.prototype.getTranslate = function () {
            if (this.parent && this.parent.layer2Bone) {
                for (var a = this.bonePath(), f = {
                        x: 0,
                        y: 0
                    }, b = 0, d = null, c = 0; c < a.length; c++) d = a[c], b += d.bonerotate, f.x += d.bonelength * Math.cos(b),
                    f.y += d.bonelength * Math.sin(b);
                a = d ? this.parent.children[a[0].$from] : this;
                f.x += a.x;
                f.y += a.y;
                return f
            }
            return this
        };
        a.prototype.getRotate = function () {
            if (this.parent && this.parent.layer2Bone) {
                this.$bonePath = this.$bonePath || a.bonePath(this);
                for (var f = 0, b = this.$bonePath.length; b--;) f += this.$bonePath[b].bonerotate;
                return f + this.angle
            }
            return this.angle
        };
        a.prototype.bonePath = function () {
            if (!this.$bonePath) {
                for (var a = this.parent.layer2Bone, f = [], b = a[this.parent.children.indexOf(this)]; b;) f.push(b), b = a[b.$from];
                this.$bonePath = f.reverse()
            }
            return this.$bonePath
        };
        a.getIMatrixOf = function (f, b) {
            var d = a.getMatrixOf(f, b);
            d.invert();
            return d
        };
        a.checkRepeatMode = function (f, b, d, c) {
            if (f === a.NO_TIME) return a.NO_TIME;
            if (!k.finite(b[1])) return f - b[0];
            var h, m;
            switch (d) {
                case t.R_ONCE:
                    return f - b[0];
                case t.R_STAY:
                    return 0 >= e(f, b[1]) ? f - b[0] : b[1] - b[0];
                case t.R_LOOP:
                    d = b[1] - b[0];
                    if (0 > d) return -1;
                    h = (f - b[0]) / d;
                    m = Math.floor(h);
                    return 0 > m || h > c ? -1 : f = f - b[0] - m * d;
                case t.R_BOUNCE:
                    d = b[1] - b[0];
                    if (0 > d) return -1;
                    h = (f - b[0]) / d;
                    m = Math.floor(h);
                    if (0 > m || h > c) return -1;
                    f = f - b[0] - m * d;
                    return 0 === m % 2 ? f : d - f
            }
        };
        a.prototype.addSysModifiers = function () {};
        a.prototype.addSysPainters = function () {
            this.paint(z.p_applyAComp);
            this.paint(z.p_drawVisuals)
        };
        a.prototype.addDebugRender = function () {
            this.paint(z.p_drawPivot);
            this.paint(z.p_drawBounds);
            this.paint(z.p_drawReg);
            this.paint(z.p_drawName);
            this.paint(z.p_drawMPath)
        };
        v.exports = a
    }, {
        "../../vendor/transform.js": 43,
        "../constants.js": 12,
        "../errors.js": 13,
        "../events.js": 14,
        "../global_opts.js": 15,
        "../graphics/bounds.js": 16,
        "../graphics/brush.js": 17,
        "../graphics/color.js": 18,
        "../loc.js": 27,
        "../log.js": 28,
        "../render.js": 34,
        "../utils.js": 39,
        "./band.js": 4,
        "./modifier.js": 7,
        "./painter.js": 8,
        engine: 40
    }],
    7: [function (c, v, n) {
            function b(a, b) {
                this.id = g();
                this.type = b || e.MOD_USER;
                this.func = a;
                this.$easing = this.$data = this.$time = this.$band = null;
                this.$relative = !1;
                this.is_tween = b == e.MOD_TWEEN
            }
            var e = c("../constants.js");
            n = c("../utils.js");
            var a = n.is,
                g = n.guid,
                d = c("./easing.js");
            b.ORDER = [e.MOD_SYSTEM, e.MOD_TWEEN, e.MOD_USER, e.MOD_EVENT];
            b.FIRST_MOD = e.MOD_SYSTEM;
            b.LAST_MOD = e.MOD_EVENT;
            b.ALL_MODIFIERS = [e.MOD_SYSTEM, e.MOD_TWEEN, e.MOD_USER, e.MOD_EVENT];
            b.NOEVT_MODIFIERS = [e.MOD_SYSTEM, e.MOD_TWEEN, e.MOD_USER];
            b.prototype.band = function (b, d) {
                if (!a.defined(b)) return this.$band;
                a.arr(b) && (d = b[1], b = b[0]);
                a.defined(d) || (d = Infinity);
                this.$band = [b, d];
                return this
            };
            b.prototype.start = function (b) {
                if (!a.defined(b)) return this.$band[0];
                this.$band = this.$band ? [b, this.$band[1]] : [b, Infinity];
                return this
            };
            b.prototype.stop = function (b) {
                if (!a.defined(b)) return this.$band[1];
                this.$band = this.$band ? [this.$band[0], b] : [0, b];
                return this
            };
            b.prototype.time = function (b) {
                if (!a.num(b)) return this.$time;
                this.$time = b;
                return this
            };
            b.prototype.relative = function (b) {
                if (!a.defined(b)) return this.$relative;
                this.$relative = b;
                return this
            };
            b.prototype.easing = function (a, b) {
                if (!a) return this.$easing;
                this.$easing = p(a, b, this.$relative || this.is_tween);
                return this
            };
            b.prototype.clone = function () {
                var a = new b(this.$func, this.$type);
                a.$time = this.$time;
                a.$band = this.$band;
                a.$data = this.$data;
                a.$easing = this.$easing;
                a.$relative = this.$relative;
                a.is_tween = this.is_tween;
                return a
            };
            b.prototype.apply = function (a, b, d, c) {
                return this.func.call(a, b, d, c)
            };
            b.prototype.data = function (a) {
                this.$data = a
            };
            var p = function (b, c, e) {
                if (!b) return null;
                var q;
                if (a.str(b)) {
                    if (!d[b]) throw Error("Unknown easing: " + b);
                    q = d[b](c);
                    return e ? q : function (a, b) {
                        return q(a / b, b) * b
                    }
                }
                if (a.fun(b) && !c) return b;
                if (a.fun(b) && c) return b(c);
                if (b.type) return q = d[b.type](b.data || c), e ? q : function (a, b) {
                    return q(a / b, b) * b
                };
                if (b.f) return b.f(b.data || c)
            };
            v.exports = b
        },
        {
            "../constants.js": 12,
            "../utils.js": 39,
            "./easing.js": 5
        }
    ],
    8: [function (c, v, n) {
        function b(b, d) {
            this.id = a();
            this.func = b;
            this.type = d || e.PNT_USER
        }
        var e = c("../constants.js"),
            a = c("../utils.js").guid;
        b.ORDER = [e.PNT_SYSTEM, e.PNT_USER, e.PNT_DEBUG];
        b.FIRST_PNT = e.PNT_SYSTEM;
        b.LAST_PNT = e.PNT_DEBUG;
        b.ALL_PAINTERS = [e.PNT_SYSTEM, e.PNT_USER, e.PNT_DEBUG];
        b.NODBG_PAINTERS = [e.PNT_SYSTEM, e.PNT_USER];
        b.prototype.apply = function (a, b) {
            return this.func.call(a, b)
        };
        v.exports = b
    }, {
        "../constants.js": 12,
        "../utils.js": 39
    }],
    9: [function (c,
        v, n) {
        function b(a) {
            this.selector = a.selector;
            this.multiple = a.multiple;
            this.anywhere = "/" !== a.selector[0];
            this.tokens = "/" === a.selector[0] ? a.selector.split("/").slice(1) : [a.selector]
        }

        function e(a, b, d) {
            return ":" === b[0] && d === parseInt(b.slice(1)) || b === a.name
        }

        function a(b, d) {
            for (var c = 0; c < b.length; c++) {
                if (e(b[c], d, c)) return b[c];
                var q = a(b[c].children, d);
                if (q) return q
            }
            return null
        }

        function g(a, b, d) {
            for (var c = 0; c < b.length; c++) e(b[c], d, c) && a.push(b[c]), g(a, b[c].children, d);
            return a
        }

        function d(a, b, c) {
            c = c || 0;
            if (0 ===
                b.length || c >= b.length) return null;
            for (var q = b[c], g = c === b.length - 1, k = 0; k < a.length; k++)
                if (e(a[k], q, k)) {
                    if (g) return a[k];
                    var z = d(a[k].children, b, c + 1);
                    if (z) return z
                }
            return null
        }

        function p(a, b, d, c) {
            c = c || 0;
            if (0 === d.length || c >= d.length) return a;
            for (var q = d[c], g = c === d.length - 1, z = 0; z < b.length; z++) e(b[z], q, z) && (g ? a.push(b[z]) : p(a, b[z].children, d, c + 1));
            return a
        }
        b.prototype.over = function (b) {
            if (!this.multiple && this.anywhere) return a(b, this.tokens[0]);
            if (this.multiple && this.anywhere) return g([], b, this.tokens[0]);
            if (!this.multiple && !this.anywhere) return d(b, this.tokens);
            if (this.multiple && !this.anywhere) return p([], b, this.tokens)
        };
        b.one = function (a) {
            return new b({
                selector: a,
                multiple: !1
            })
        };
        b.all = function (a) {
            return new b({
                selector: a,
                multiple: !0
            })
        };
        v.exports = b
    }, {}],
    10: [function (c, v, n) {
        function b(b, d) {
            var c = new g(null, a.MOD_TWEEN),
                q = t[b];
            c.def = q;
            c.func = function (a, b, d) {
                c.$tween && c.$tween.call(this, a, b, d)
            };
            c.is_tween = !0;
            c.tween_type = b;
            k.defined(d) ? c.value(d) : q.from === e && q.to === e && (c.$tween = q.func(void 0, c));
            return c
        }

        function e() {}
        var a = c("../constants.js"),
            g = c("./modifier.js"),
            d = c("../graphics/brush.js"),
            p = c("../graphics/path.js"),
            k = c("../utils.js").is;
        c("../errors.js");
        var u = g,
            t = {};
        u.DEFAULT_FROM = function (a, b) {
            return k.defined(b) ? [a, b[1]] : [a, null]
        };
        u.DEFAULT_TO = function (a, b) {
            return k.defined(a) ? [b[0], a] : [null, a]
        };
        u.register = function (a, d) {
            d = k.fun(d) ? {
                func: d
            } : d;
            d.from = d.from || u.DEFAULT_FROM;
            d.to = d.to || u.DEFAULT_TO;
            t[a] = d;
            u[a] = function (d) {
                return b(a, d)
            }
        };
        u._$ = b;
        u.prototype.values = function (a, b) {
            if (!k.defined(a) &&
                this.$value) return this.$value;
            this.$value = this.def.to(b, this.def.from(a, null));
            this.$tween = this.def.func(this.$value, this);
            return this
        };
        u.prototype.value = function (a) {
            if (!k.defined(a) && this.$value) return this.$value;
            this.$value = a;
            this.$tween = this.def.func(this.$value, this);
            return this
        };
        u.prototype.from = function (a, b) {
            this.$value = this.def.from(k.defined(b) ? [a, b] : a, this.$value);
            this.$tween = this.def.func(this.$value, this);
            return this
        };
        u.prototype.to = function (a, b) {
            this.$value = this.def.to(k.defined(b) ? [a, b] : a, this.$value);
            this.$tween = this.def.func(this.$value, this);
            return this
        };
        u.register(a.T_TRANSLATE, {
            func: function (a) {
                return function (b) {
                    var d = a.pointAt(b);
                    d && (this.x = d[0], this.y = d[1], this.$mpath_t = b, this.$mpath = 0 < a.length() ? a : null)
                }
            },
            from: function (a, b) {
                return b ? b.line(a[0], a[1]) : (new p).move(a[0], a[1])
            },
            to: function (a, b) {
                return b ? b.line(a[0], a[1]) : (new p).move(a[0], a[1])
            }
        });
        u.register(a.T_SCALE, {
            func: function (a) {
                var b = a[0],
                    d = a[1];
                return function (a) {
                    this.sx = b[0] * (1 - a) + d[0] * a;
                    this.sy = b[1] * (1 - a) +
                        d[1] * a
                }
            },
            from: function (a, b) {
                a = a.length ? a : [a, a];
                return b ? [a, b[1]] : [a, [1, 1]]
            },
            to: function (a, b) {
                a = a.length ? a : [a, a];
                return b ? [b[0], a] : [
                    [1, 1], a
                ]
            }
        });
        u.register(a.T_ROTATE, function (a) {
            var b = a[0],
                d = a[1];
            return function (a) {
                this.angle = b * (1 - a) + d * a
            }
        });
        u.register(a.T_BONE_ROTATE, function (a) {
            var b = a[0],
                d = a[1];
            return function (a) {
                this.bonerotate = b * (1 - a) + d * a
            }
        });
        u.register(a.T_BONE_LENGTH, function (a) {
            var b = a[0],
                d = a[1];
            return function (a) {
                this.bonelength = b * (1 - a) + d * a
            }
        });
        u.register(a.T_ROT_TO_PATH, {
            func: function () {
                return function (a) {
                    if (a =
                        this.$mpath) this.angle += a.tangentAt(this.$mpath_t || .001)
                }
            },
            from: e,
            to: e
        });
        u.register(a.T_ALPHA, function (a) {
            var b = a[0],
                d = a[1];
            return function (a) {
                this.alpha = b * (1 - a) + d * a
            }
        });
        u.register(a.T_SHEAR, {
            func: function (a) {
                var b = a[0],
                    d = a[1];
                return function (a) {
                    this.hx = b[0] * (1 - a) + d[0] * a;
                    this.hy = b[1] * (1 - a) + d[1] * a
                }
            },
            from: function (a, b) {
                a = a.length ? a : [a, a];
                return b ? [a, b[1]] : [a, [1, 1]]
            },
            to: function (a, b) {
                a = a.length ? a : [a, a];
                return b ? [b[0], a] : [
                    [1, 1], a
                ]
            }
        });
        u.register(a.T_FILL, function (a) {
            var b = d.interpolateBrushes(a[0], a[1]);
            return function (a) {
                this.$fill = b(a)
            }
        });
        u.register(a.T_STROKE, function (a) {
            var b = d.interpolateBrushes(a[0], a[1]);
            return function (a) {
                this.$stroke = b(a)
            }
        });
        u.register(a.T_SHADOW, function (a) {
            var b = d.interpolateBrushes(a[0], a[1]);
            return function (a) {
                this.$shadow = b(a)
            }
        });
        u.register(a.T_VOLUME, function (a) {
            var b = a[0],
                d = a[1];
            return function (a) {
                this.$audio && this.$audio.ready && this.$audio.setVolume(b * (1 - a) + d * a)
            }
        });
        u.register(a.T_DISPLAY, {
            func: function (a) {
                return function (b) {
                    this.visible = a
                }
            },
            from: function (a, b) {
                return a
            },
            to: function (a, b) {
                return a
            }
        });
        u.register(a.T_SWITCH, {
            func: function (a, b) {
                return function (d) {
                    this.switch_band = b.$band;
                    this["switch"] = a
                }
            },
            from: e,
            to: e
        });
        v.exports = u
    }, {
        "../constants.js": 12,
        "../errors.js": 13,
        "../graphics/brush.js": 17,
        "../graphics/path.js": 19,
        "../utils.js": 39,
        "./modifier.js": 7
    }],
    11: [function (c, v, n) {
        n = "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {};
        c = c("./constants.js");
        c = n.__anm_conf || {
            logImport: !1,
            logResMan: !1,
            logEvents: !1,
            logLevel: c.L_ERROR |
                c.L_WARN | c.L_INFO,
            doNotLoadAudio: !1,
            doNotLoadImages: !1,
            doNotRenderShadows: !1,
            engine: null
        };
        n.__anm_conf = c;
        v.exports = c
    }, {
        "./constants.js": 12
    }],
    12: [function (c, v, n) {
        c = {
            L_DEBUG: 1,
            L_INFO: 2,
            L_WARN: 4,
            L_ERROR: 8,
            NOTHING: -1,
            STOPPED: 0,
            PLAYING: 1,
            PAUSED: 2,
            LOADING: 3,
            RES_LOADING: 4,
            ERROR: 5,
            M_CONTROLS_ENABLED: 1,
            M_CONTROLS_DISABLED: 2,
            M_INFO_ENABLED: 4,
            M_INFO_DISABLED: 8,
            M_HANDLE_EVENTS: 16,
            M_DO_NOT_HANDLE_EVENTS: 32,
            M_DRAW_STILL: 64,
            M_DO_NOT_DRAW_STILL: 128,
            M_INFINITE_DURATION: 256,
            M_FINITE_DURATION: 512
        };
        c.M_PREVIEW = c.M_CONTROLS_DISABLED |
            c.M_INFO_DISABLED | c.M_DO_NOT_HANDLE_EVENTS | c.M_DRAW_STILL | c.M_FINITE_DURATION;
        c.M_DYNAMIC = c.M_CONTROLS_DISABLED | c.M_INFO_DISABLED | c.M_HANDLE_EVENTS | c.M_DO_NOT_DRAW_STILL | c.M_INFINITE_DURATION;
        c.M_VIDEO = c.M_CONTROLS_ENABLED | c.M_INFO_DISABLED | c.M_DO_NOT_HANDLE_EVENTS | c.M_DRAW_STILL | c.M_FINITE_DURATION;
        c.M_SANDBOX = c.M_CONTROLS_DISABLED | c.M_INFO_DISABLED | c.M_DO_NOT_HANDLE_EVENTS | c.M_DO_NOT_DRAW_STILL | c.M_FINITE_DURATION;
        c.LT_ANIMATION = 1;
        c.LT_ELEMENTS = 2;
        c.LT_IMPORT = 3;
        c.LT_URL = 4;
        c.LM_ONREQUEST = "onrequest";
        c.LM_ONPLAY = "onplay";
        c.LM_DEFAULT = c.LM_ONREQUEST;
        c.ET_EMPTY = "empty";
        c.ET_PATH = "path";
        c.ET_TEXT = "text";
        c.ET_SHEET = "image";
        c.ET_AUDIO = "audio";
        c.ET_VIDEO = "video";
        c.R_ONCE = 0;
        c.R_STAY = 1;
        c.R_LOOP = 2;
        c.R_BOUNCE = 3;
        c.C_SRC_OVER = 1;
        c.C_SRC_ATOP = 2;
        c.C_SRC_IN = 3;
        c.C_SRC_OUT = 4;
        c.C_DST_OVER = 5;
        c.C_DST_ATOP = 6;
        c.C_DST_IN = 7;
        c.C_DST_OUT = 8;
        c.C_LIGHTER = 9;
        c.C_DARKER = 10;
        c.C_COPY = 11;
        c.C_XOR = 12;
        c.AC_NAMES = [];
        c.AC_NAMES[c.C_SRC_OVER] = "source-over";
        c.AC_NAMES[c.C_SRC_ATOP] = "source-atop";
        c.AC_NAMES[c.C_SRC_IN] = "source-in";
        c.AC_NAMES[c.C_SRC_OUT] =
            "source-out";
        c.AC_NAMES[c.C_DST_OVER] = "destination-over";
        c.AC_NAMES[c.C_DST_ATOP] = "destination-atop";
        c.AC_NAMES[c.C_DST_IN] = "destination-in";
        c.AC_NAMES[c.C_DST_OUT] = "destination-out";
        c.AC_NAMES[c.C_LIGHTER] = "lighter";
        c.AC_NAMES[c.C_DARKER] = "darker";
        c.AC_NAMES[c.C_COPY] = "copy";
        c.AC_NAMES[c.C_XOR] = "xor";
        c.BT_NONE = "none";
        c.BT_FILL = "fill";
        c.BT_STROKE = "stroke";
        c.BT_SHADOW = "shadow";
        c.TA_LEFT = "left";
        c.TA_CENTER = "center";
        c.TA_RIGHT = "right";
        c.BL_TOP = "top";
        c.BL_MIDDLE = "middle";
        c.BL_BOTTOM = "bottom";
        c.BL_ALPHABETIC =
            "alphabetic";
        c.BL_HANGING = "hanging";
        c.BL_IDEOGRAPHIC = "ideographic";
        c.PC_ROUND = "round";
        c.PC_BUTT = "butt";
        c.PC_MITER = "miter";
        c.PC_SQUARE = "square";
        c.PC_BEVEL = "bevel";
        c.E_PATH = "path";
        c.E_FUNC = "function";
        c.E_CSEG = "segment";
        c.E_STDF = "standard";
        c.T_TRANSLATE = "translate";
        c.T_SCALE = "scale";
        c.T_ROTATE = "rotate";
        c.T_ROT_TO_PATH = "rotatetopath";
        c.T_ALPHA = "alpha";
        c.T_SHEAR = "shear";
        c.T_FILL = "fill";
        c.T_STROKE = "stroke";
        c.T_SHADOW = "shadow";
        c.T_VOLUME = "volume";
        c.T_DISPLAY = "display";
        c.T_SWITCH = "switch";
        c.T_BONE_ROTATE =
            "bonerotate";
        c.T_BONE_LENGTH = "bonelength";
        c.MOD_SYSTEM = "system";
        c.MOD_TWEEN = "tween";
        c.MOD_USER = "user";
        c.MOD_EVENT = "event";
        c.PNT_SYSTEM = "system";
        c.PNT_USER = "user";
        c.PNT_DEBUG = "debug";
        c.SWITCH_OFF = "[None]";
        v.exports = c
    }, {}],
    13: [function (c, v, n) {
        function b(a) {
            return function (b) {
                Error.captureStackTrace && Error.captureStackTrace(this, this);
                b = Error(b || "");
                b.name = a;
                return b
            }
        }
        var e = c("./constants.js"),
            a = b("SystemError"),
            g = b("PlayerError"),
            d = b("AnimationError");
        v.exports = {
            system: function (b, d) {
                var c = new a(b);
                d && d.fire(e.S_ERROR, c);
                return c
            },
            player: function (a, b) {
                var d = new g(a);
                b && b.fire(e.S_ERROR, d);
                return d
            },
            animation: function (a, b) {
                var c = new d(a);
                b && b.fire(e.X_ERROR, c);
                return c
            },
            element: function (a, b) {
                var c = new d(a);
                b && b.anim && b.anim.fire(e.X_ERROR, c);
                return c
            },
            SystemError: a,
            PlayerError: g,
            AnimationError: d
        }
    }, {
        "./constants.js": 12
    }],
    14: [function (c, v, n) {
        function b(a) {
            return 0 === a.indexOf("mouse")
        }

        function e(a) {
            return 0 === a.indexOf("key")
        }

        function a() {
            this.reset()
        }
        var g = c("./constants.js"),
            d = c("./errors.js");
        g.S_NEW_PLAYER = "new";
        g.S_PLAYER_DETACH = "detach";
        g.X_MCLICK = "mouseclick";
        g.X_MDCLICK = "mousedoubleclick";
        g.X_MUP = "mouseup";
        g.X_MDOWN = "mousedown";
        g.X_MMOVE = "mousemove";
        g.X_MOVER = "mouseover";
        g.X_MOUT = "mouseout";
        g.X_KPRESS = "keypress";
        g.X_KUP = "keyup";
        g.X_KDOWN = "keydown";
        g.X_START = "bandstart";
        g.X_STOP = "bandstop";
        g.X_ERROR = "error";
        g.A_START = "animationstart";
        g.A_STOP = "animationstop";
        g.A_PAUSE = "animationpause";
        g.S_CHANGE_STATE = "statechange";
        g.S_PLAY = "play";
        g.S_PAUSE = "pause";
        g.S_STOP = "stop";
        g.S_COMPLETE = "complete";
        g.S_REPEAT = "repeat";
        g.S_IMPORT = "import";
        g.S_LOAD = "load";
        g.S_RES_LOAD = "loadresources";
        g.S_LOADING_PROGRESS = "loadprogress";
        g.S_TIME_UPDATE = "timeupdate";
        g.S_REPORT_STATS = "reportstats";
        g.S_INTERACTIVITY = "interactivity";
        g.S_ERROR = "error";
        var p = {
            mouseclick: 1,
            mousedoubleclick: 2,
            mouseup: 4,
            mousedown: 8,
            mousemove: 16,
            mouseover: 32,
            mouseout: 64,
            keypress: 128,
            keyup: 256,
            keydown: 512
        };
        a.prototype.reset = function () {
            this.state = 0
        };
        a.prototype.save = function (a) {
            this.state |= p[a]
        };
        a.prototype.check = function (a) {
            return this.state &
                p[a]
        };
        v.exports = {
            mouse: b,
            keyboard: e,
            mouseOrKeyboard: function (a) {
                return b(a) || e(a)
            },
            registerEvent: function (a, b) {
                g[a] = b
            },
            provideEvents: function (a, b) {
                a.prototype._initHandlers = function (a) {
                    return function () {
                        var b = {};
                        this.handlers = b;
                        for (var d = 0, c = a.length; d < c; d++) b[a[d]] = []
                    }
                }(b);
                a.prototype.on = function (a, b) {
                    if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
                    if (!this.provides(a)) throw d.system("Event '" + a + "' is not provided by " + this);
                    if (b) return this.handlers[a].push(b),
                        this.handlers[a].length - 1
                };
                a.prototype.subscribedTo = function (a) {
                    return this.handlers && this.handlers[a] && this.handlers[a].length
                };
                a.prototype.fire = function (a) {
                    if (!this.disabled) {
                        if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
                        if (!this.provides(a)) throw d.system("Event '" + a + "' is not provided by " + this);
                        if (!this.filterEvent || this.filterEvent.apply(this, arguments))
                            if (this["handle_" + a] || this.handlers[a].length) {
                                for (var b = Array(arguments.length -
                                        1), c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
                                this["handle_" + a] && this["handle_" + a].apply(this, b);
                                for (var c = this.handlers[a], e = 0, g = c.length; e < g; e++) c[e].apply(this, b)
                            }
                    }
                };
                a.prototype.provides = function (a) {
                    return function (b) {
                        if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
                        return b ? this.handlers.hasOwnProperty(b) : a
                    }
                }(b);
                a.prototype.unbind = function (a, b) {
                    if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
                    this.provides(a) && this.handlers[a][b] && this.handlers[a].splice(b, 1)
                };
                a.prototype.disposeHandlers = function () {
                    if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
                    var a = this.handlers,
                        b;
                    for (b in a) a.hasOwnProperty(b) && (a[b] = [])
                };
                for (var c = function (a) {
                        return function (b) {
                            this.fire(a, b)
                        }
                    }, e = 0, g = b.length; e < g; e++) a.prototype["e_" + b[e]] = c(b[e])
            },
            EventState: a
        }
    }, {
        "./constants.js": 12,
        "./errors.js": 13
    }],
    15: [function (c, v, n) {
        v.exports = {
            liveDebug: !1,
            autoFocus: !0,
            setTabindex: !0
        }
    }, {}],
    16: [function (c, v, n) {
        function b(a, b, d, c) {
            this.x = a;
            this.y = b;
            this.width = d;
            this.height = c
        }
        var e = c("../utils.js").is;
        b.prototype.load = function (a) {
            this.x = a.x;
            this.y = a.y;
            this.width = a.width;
            this.height = a.height
        };
        b.prototype.loadDiag = function (a, b, d, c) {
            var e;
            d < a && (e = a, a = d, d = e);
            c < b && (e = b, b = c, c = e);
            this.x = a;
            this.y = b;
            this.width = d - a;
            this.height = c - b
        };
        b.prototype.minX = function () {
            return this.x
        };
        b.prototype.minY = function () {
            return this.y
        };
        b.prototype.maxX = function () {
            return this.x + this.width
        };
        b.prototype.maxY = function () {
            return this.y + this.height
        };
        b.prototype.add = function (a) {
            a.exist() && (this.exist() ? this.loadDiag(Math.min(this.minX(), a.minX()), Math.min(this.minY(), a.minY()), Math.max(this.maxX(), a.maxX()), Math.max(this.maxY(), a.maxY())) : this.load(a))
        };
        b.prototype.addPoint = function (a) {
            this.loadDiag(Math.min(this.minX(), a.x), Math.min(this.minY(), a.y), Math.max(this.maxX(), a.x), Math.max(this.maxY(), a.y))
        };
        b.prototype.toPoints = function () {
            return [{
                    x: this.x,
                    y: this.y
                }, {
                    x: this.x + this.width,
                    y: this.y
                },
                {
                    x: this.x + this.width,
                    y: this.y + this.height
                }, {
                    x: this.x,
                    y: this.y + this.height
                }
            ]
        };
        b.prototype.exist = function () {
            return !e.nan(this.x)
        };
        b.prototype.inside = function (a) {
            return this.exist() ? a.x >= this.x && a.x - this.x <= this.width && a.y >= this.y && a.y - this.y <= this.height : !1
        };
        b.prototype.clone = function () {
            return new b(this.x, this.y, this.width, this.height)
        };
        b.NONE = new b(NaN, NaN, NaN, NaN);
        v.exports = b
    }, {
        "../utils.js": 39
    }],
    17: [function (c, v, n) {
        function b(d) {
            this.type = a.BT_NONE;
            d && b.value(d, this)
        }

        function e() {
            this.$radial = !1;
            this.$stops = {};
            this.$radius = null;
            this.$bounds = [0, 0, 1, 1];
            this.$direction = [
                [.5, 0],
                [.5, 1]
            ]
        }
        var a = c("../constants.js"),
            g = c("../conf.js"),
            d = c("../utils.js"),
            p = d.is,
            k = c("engine"),
            u = c("../errors.js"),
            t = c("./color.js");
        b.DEFAULT_CAP = a.PC_ROUND;
        b.DEFAULT_JOIN = a.PC_ROUND;
        b.DEFAULT_FILL = "#ffbc05";
        b.DEFAULT_STROKE = t.TRANSPARENT;
        b.DEFAULT_SHADOW = t.TRANSPARENT;
        b.prototype.apply = function (d) {
            if (this.type != a.BT_NONE) {
                var c = this._style || (this._style = this.adapt(d));
                if (this.type == a.BT_FILL) d.fillStyle = c;
                else if (this.type ==
                    a.BT_STROKE) 0 < this.width ? (d.lineWidth = this.width, d.strokeStyle = c || b.DEFAULT_STROKE, d.lineCap = this.cap || b.DEFAULT_CAP, d.lineJoin = this.join || b.DEFAULT_JOIN) : b.clearStroke(d);
                else if (this.type == a.BT_SHADOW && !g.doNotRenderShadows) {
                    var e = k.getAnmProps(d);
                    e.skip_shadows || (e = k.PX_RATIO * (e.factor || 1), d.shadowColor = c, d.shadowBlur = this.blurRadius * e || 0, d.shadowOffsetX = this.offsetX * e || 0, d.shadowOffsetY = this.offsetY * e || 0)
                }
            }
        };
        b.prototype.invalidate = function () {
            this._converted = !1;
            this._style = null
        };
        b.prototype.convertColorsToRgba =
            function () {
                if (!this._converted) {
                    if (this.color && p.str(this.color)) this.color = t.fromStr(this.color);
                    else if (this.grad)
                        for (var a = this.grad.stops, b = 0, d = a.length; b < d; b++) p.str(a[b][1]) && (a[b][1] = t.from(a[b][1]));
                    this._converted = !0
                }
            };
        b.prototype.adapt = function (a) {
            if (this.color && p.str(this.color)) return this.color;
            if (this.color) return t.toRgbaStr(this.color);
            if (this.grad) {
                var b = this.grad,
                    d = b.stops,
                    c = b.dir || [
                        [.5, 0],
                        [.5, 1]
                    ],
                    e = b.r || [1, 1];
                bounds = b.bounds || [0, 0, 1, 1];
                a = p.defined(b.r) ? bounds ? a.createRadialGradient(bounds[0] +
                    c[0][0] * bounds[2], bounds[1] + c[0][1] * bounds[3], Math.max(bounds[2], bounds[3]) * e[0], bounds[0] + c[1][0] * bounds[2], bounds[1] + c[1][1] * bounds[3], Math.max(bounds[2], bounds[3]) * e[1]) : a.createRadialGradient(c[0][0], c[0][1], e[0], c[1][0], c[1][1], e[1]) : bounds ? a.createLinearGradient(bounds[0] + c[0][0] * bounds[2], bounds[1] + c[0][1] * bounds[3], bounds[0] + c[1][0] * bounds[2], bounds[1] + c[1][1] * bounds[3]) : a.createLinearGradient(c[0][0], c[0][1], c[1][0], c[1][1]);
                b = 0;
                for (c = d.length; b < c; b++) e = d[b], a.addColorStop(e[0], t.adapt(e[1]));
                return a
            }
            return this.pattern ? (d = this.pattern.elm, b = k.createCanvas(this.pattern.w, this.pattern.h, null, 1), c = b.getContext("2d"), d.pivot(0, 0), d.disabled = !1, d.render(c, 0, 0), d.disabled = !0, a.createPattern(b, this.pattern.repeat)) : null
        };
        b.prototype.clone = function () {
            var a = new b;
            a.type = this.type;
            this.color && p.str(this.color) ? a.color = this.color : this.color && (a.color = {
                r: this.color.r,
                g: this.color.g,
                b: this.color.b,
                a: this.color.a || 1
            });
            if (this.grad) {
                var d = this.grad,
                    c = {
                        stops: []
                    };
                for (i = 0; i < d.stops.length; i++) c.stops[i] = [].concat(d.stops[i]);
                c.dir = [];
                for (i = 0; i < d.dir.length; i++) c.dir[i] = [].concat(d.dir[i]);
                d.r && (c.r = [].concat(d.r));
                a.grad = c
            }
            this.hasOwnProperty("width") && (a.width = this.width);
            this.hasOwnProperty("cap") && (a.cap = this.cap);
            this.hasOwnProperty("join") && (a.join = this.join);
            this.hasOwnProperty("blurRadius") && (a.blurRadius = this.blurRadius);
            this.hasOwnProperty("offsetX") && (a.offsetX = this.offsetX);
            this.hasOwnProperty("offsetY") && (a.offsetY = this.offsetY);
            return a
        };
        b.fill = function (d) {
            var c = new b;
            c.type = a.BT_FILL;
            p.obj(d) ? d instanceof e ? c.grad = d.get() : d.stops ? c.grad = d : d.elm && (c.pattern = d) : c.color = d;
            return c
        };
        b.stroke = function (d, c, e, g, k) {
            d = d && d instanceof b ? d.clone() : b.fill(d);
            d.type = a.BT_STROKE;
            d.width = c || 0;
            d.cap = e || b.DEFAULT_CAP;
            d.join = g || b.DEFAULT_JOIN;
            d.mitter = k;
            return d
        };
        b.shadow = function (d, c, e, g) {
            d = b.fill(d);
            d.type = a.BT_SHADOW;
            d.blurRadius = c || 0;
            d.offsetX = e || 0;
            d.offsetY = g || 0;
            return d
        };
        b.value = function (d, c) {
            var g = c || new b;
            if (d)
                if (p.str(d)) g.type = a.BT_FILL, g.color = d;
                else if (p.obj(d))
                if (d = d instanceof e ?
                    d.get() : d, p.defined(d.r) && p.defined(d.g) && p.defined(d.b)) g.type = a.BT_FILL, g.color = d;
                else if (d.color || d.grad) {
                p.defined(d.width) ? g.type = a.BT_STROKE : p.defined(d.blurRadius) || p.defined(d.offsetX) ? g.type = a.BT_SHADOW : g.type = a.BT_FILL;
                for (var z in d) d.hasOwnProperty(z) && (g[z] = d[z])
            } else throw u.element("Unknown type of brush");
            else throw u.element("Use Brush.fill, Brush.stroke or Brush.shadow to create brush from values");
            else g.type = a.BT_NONE
        };
        b.gradient = function () {
            return new e
        };
        b.qfill = function (a, b) {
            a.fillStyle =
                b
        };
        b.qstroke = function (a, d, c) {
            a.lineWidth = c || 1;
            a.strokeStyle = d;
            a.lineCap = b.DEFAULT_CAP;
            a.lineJoin = b.DEFAULT_JOIN
        };
        b.clearFill = function (a) {
            a.fillStyle = b.DEFAULT_FILL
        };
        b.clearStroke = function (a) {
            a.strokeStyle = b.DEFAULT_STROKE;
            a.lineWidth = 0;
            a.lineCap = b.DEFAULT_CAP;
            a.lineJoin = b.DEFAULT_JOIN
        };
        b.clearShadow = function (a) {
            a.shadowColor = b.DEFAULT_SHADOW;
            a.shadowBlur = 0;
            a.shadowOffsetX = 0;
            a.shadowOffsetY = 0
        };
        b.interpolateBrushes = function (c, e) {
            var g = p.equal(c, e);
            c = c instanceof b ? c : b.value(c);
            c._converted || c.convertColorsToRgba();
            if (g) return function () {
                return c
            };
            e = e instanceof b ? e : b.value(e);
            e._converted || e.convertColorsToRgba();
            var z = c.clone();
            return function (b) {
                p.defined(c.width) && p.defined(e.width) && (z.width = d.interpolateFloat(c.width, e.width, b));
                c.type === a.BT_SHADOW && (z.offsetX = d.interpolateFloat(c.offsetX, e.offsetX, b), z.offsetY = d.interpolateFloat(c.offsetY, e.offsetY, b), z.blurRadius = d.interpolateFloat(c.blurRadius, e.blurRadius, b));
                if (c.color) z.grad = null, z.color = t.toRgbaStr(t.interpolate(c.color, e.color, b));
                else if (c.grad) {
                    z.color =
                        null;
                    z.grad || (z.grad = {});
                    var g = z.grad,
                        k = c.grad,
                        w = e.grad,
                        u;
                    for (u = 0; u < k.dir.length; u++) g.dir[u] || (g.dir[u] = []), g.dir[u][0] = d.interpolateFloat(k.dir[u][0], w.dir[u][0], b), g.dir[u][1] = d.interpolateFloat(k.dir[u][1], w.dir[u][1], b);
                    g.stops && g.stops.length === k.stops.length || (g.stops = []);
                    for (u = 0; u < k.stops.length; u++) g.stops[u] || (g.stops[u] = []), g.stops[u][0] = d.interpolateFloat(k.stops[u][0], w.stops[u][0], b), g.stops[u][1] = t.toRgbaStr(t.interpolate(k.stops[u][1], w.stops[u][1], b));
                    k.r ? (g.r || (g.r = []), g.r[0] = d.interpolateFloat(k.r[0],
                        w.r[0], b), g.r[1] = d.interpolateFloat(k.r[1], w.r[1], b)) : g.r = null
                }
                z.invalidate();
                return z
            }
        };
        e.prototype.stops = function (a) {
            if (p.defined(a)) {
                var b = [],
                    d;
                for (d in a) b.push([parseFloat(d), a[d]]);
                this.$stops = b;
                return this
            }
            a = {};
            b = this.$stops;
            for (d = 0; d < b.length; d++) a[b[d][0]] = b[d][1];
            return a
        };
        e.prototype.radial = function () {
            this.$radial = !0;
            return this
        };
        e.prototype.radius = function (a) {
            if (!p.defined(a)) return this.$radius;
            this.$radial = !0;
            this.$radius = a;
            return this
        };
        e.prototype.start = function (a, b) {
            if (!p.defined(a)) return [this.$bounds[0],
                this.$bounds[1]
            ];
            this.$bounds[0] = a;
            this.$bounds[1] = b;
            return this
        };
        e.prototype.size = function (a, b) {
            if (!p.defined(a)) return [this.$bounds[2], this.$bounds[3]];
            this.$bounds[2] = a;
            this.$bounds[3] = b;
            return this
        };
        e.prototype.from = function (a, b) {
            if (!p.defined(a)) return this.$direction[0];
            this.$direction[0][0] = a;
            this.$direction[0][1] = b;
            return this
        };
        e.prototype.to = function (a, b) {
            if (!p.defined(a)) return this.$direction[1];
            this.$direction[1][0] = a;
            this.$direction[1][1] = b;
            return this
        };
        e.prototype.get = function () {
            return {
                r: this.$radial ?
                    this.$radius || [1, 1] : null,
                stops: this.$stops,
                bounds: this.$bounds,
                dir: this.$direction
            }
        };
        v.exports = b
    }, {
        "../conf.js": 11,
        "../constants.js": 12,
        "../errors.js": 13,
        "../utils.js": 39,
        "./color.js": 18,
        engine: 40
    }],
    18: [function (c, v, n) {
        var b = c("../utils.js"),
            e = b.is,
            a = {
                TRANSPARENT: "transparent",
                HEX_RE: /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i,
                HEX_SHORT_RE: /^#?([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])$/i,
                RGB_RE: /^rgb\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/i,
                RGBA_RE: /^rgba\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*(\d*[.]?\d+)\s*\)$/i,
                HSL_RE: /^hsl\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*%\s*,\s*([0-9]{1,3})\s*%\s*\)$/i,
                HSLA_RE: /^hsla\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*%\s*,\s*([0-9]{1,3})\s*%\s*,\s*(\d*[.]?\d+)\s*\)$/i,
                from: function (b) {
                    return e.str(b) ? a.fromStr(b) : b.r && b
                },
                fromStr: function (b) {
                    return a.fromHex(b) || a.fromRgb(b) || a.fromRgba(b) || a.fromHsl(b) || {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0
                    }
                },
                fromHex: function (b) {
                    if ("#" !== b[0]) return null;
                    var d = a.HEX_RE.exec(b);
                    return d ? {
                        r: parseInt(d[1], 16),
                        g: parseInt(d[2], 16),
                        b: parseInt(d[3], 16),
                        a: 1
                    } : (d = a.HEX_SHORT_RE.exec(b)) ? {
                        r: parseInt(d[1] + d[1], 16),
                        g: parseInt(d[2] + d[2], 16),
                        b: parseInt(d[3] + d[3], 16),
                        a: 1
                    } : null
                },
                fromRgb: function (b) {
                    return 0 !== b.indexOf("rgb(") ? null : (b = a.RGB_RE.exec(b)) ? {
                        r: parseInt(b[1]),
                        g: parseInt(b[2]),
                        b: parseInt(b[3]),
                        a: 1
                    } : null
                },
                fromRgba: function (b) {
                    return 0 !== b.indexOf("rgba(") ? null : (b = a.RGBA_RE.exec(b)) ? {
                        r: parseInt(b[1]),
                        g: parseInt(b[2]),
                        b: parseInt(b[3]),
                        a: parseFloat(b[4])
                    } : null
                },
                fromHsl: function (b) {
                    return 0 !== b.indexOf("hsl(") ? null : (b = a.HSL_RE.exec(b)) ? a.fromHslVal(parseInt(b[1]) / 180 * Math.PI, parseInt(b[2]) /
                        100, parseInt(b[3]) / 100) : null
                },
                fromHsla: function (b) {
                    if (0 !== b.indexOf("hsla(")) return null;
                    b = a.HSLA_RE.exec(hsl);
                    if (!b) return null;
                    b = a.fromHslVal(parseInt(b[1]) / 180 * Math.PI, parseInt(b[2]) / 100, parseInt(b[3]) / 100);
                    b.a = parseFloat(b[4]);
                    return b
                },
                fromHslVal: function (b, d, c) {
                    var e = a.hueToRgb;
                    d = .5 >= c ? c * (d + 1) : c + d - c * d;
                    c = 2 * c - d;
                    return {
                        r: e(c, d, b + 2),
                        g: e(c, d, b),
                        b: e(c, d, b - 2),
                        a: 1
                    }
                },
                hueToRgb: function (a, b, c) {
                    0 > c && (c += 6);
                    6 <= c && (c -= 6);
                    return 1 > c ? (b - a) * c + a : 3 > c ? b : 4 > c ? (b - a) * (4 - c) + a : a
                },
                rgb: function (a, b, c) {
                    return "rgb(" + a + "," +
                        b + "," + c + ")"
                },
                rgba: function (a, b, c, k) {
                    return "rgba(" + a + "," + b + "," + c + "," + (e.defined(k) ? k.toFixed(2) : 1) + ")"
                },
                hsl: function (b, d, c) {
                    return a.dhsl(b / Math.PI * 180, d, c)
                },
                dhsl: function (a, b, c) {
                    return "hsl(" + Math.floor(a) + "," + Math.floor(100 * b) + "%," + Math.floor(100 * c) + "%)"
                },
                hsla: function (b, d, c, e) {
                    return a.dhsla(b / Math.PI * 180, d, c, e)
                },
                dhsla: function (a, b, c, k) {
                    return "hsla(" + Math.floor(a) + "," + Math.floor(100 * b) + "%," + Math.floor(100 * c) + "%," + (e.defined(k) ? k.toFixed(2) : 1) + ")"
                },
                adapt: function (b) {
                    if (!b) return null;
                    if (e.str(b)) return b;
                    if (e.defined(b.g)) return a.toRgbaStr(b);
                    if (e.defined(b.h)) return a.toHslaStr(b)
                },
                toRgbaStr: function (b) {
                    return a.rgba(b.r, b.g, b.b, b.a)
                },
                toHslaStr: function (b) {
                    return a.hsla(b.h, b.s, b.l, b.a)
                },
                interpolate: function (a, d, c) {
                    return {
                        r: Math.round(b.interpolateFloat(a.r, d.r, c)),
                        g: Math.round(b.interpolateFloat(a.g, d.g, c)),
                        b: Math.round(b.interpolateFloat(a.b, d.b, c)),
                        a: b.interpolateFloat(a.a, d.a, c)
                    }
                }
            };
        v.exports = a
    }, {
        "../utils.js": 39
    }],
    19: [function (c, v, n) {
        function b(b) {
            this.segs = [];
            this.closed = !1;
            a.str(b) ? (this.parse(b),
                this.updatePath2D(b)) : a.arr(b) && (this.segs = b);
            this.cached_hits = {}
        }
        c("../constants.js");
        var e = c("../utils.js"),
            a = e.is;
        n = c("./segments.js");
        var g = n.MSeg,
            d = n.LSeg,
            p = n.CSeg,
            k = n.Crossings,
            u = c("engine"),
            t = !!u.Path2D && !u.isIEorEdge,
            q = c("./brush.js"),
            y = c("./bounds.js");
        b.prototype.visit = function (a, b) {
            for (var d = this.segs, c = 0, e = d.length; c < e; c++) a(d[c], b);
            return this
        };
        b.prototype.length = function () {
            if (a.defined(this.cached_len)) return this.cached_len;
            var b = 0,
                d = this.start();
            this.visit(function (a) {
                b += a.length(d);
                d = a.last()
            });
            return this.cached_len = b
        };
        b.prototype.add = function (a) {
            this.segs.push(a);
            this._p2dCurrent = !1;
            return this
        };
        b.prototype.move = function (a, b) {
            return this.add(new g([a, b]))
        };
        b.prototype.line = function (a, b) {
            return this.add(new d([a, b]))
        };
        b.prototype.curve = function (a, b, d, c, e, g) {
            return this.add(new p([a, b, d, c, e, g]))
        };
        b.prototype.close = function () {
            this.closed = !0;
            return this
        };
        b.prototype.apply = function (a, b, d, c) {
            if (t) return this.updatePath2D(), c && c.apply(a), b && (b.apply(a), a.fill(this.path2d)), c && q.clearShadow(a),
                d && (d.apply(a), a.stroke(this.path2d)), this;
            a.beginPath();
            for (var e = this.segs, g = 0, x = e.length; g < x; g++) e[g].draw(a);
            this.closed && a.closePath();
            c && c.apply(a);
            b && (b.apply(a), a.fill());
            c && q.clearShadow(a);
            d && (d.apply(a), a.stroke());
            return this
        };
        b.prototype.parse = function (a) {
            a && b.parse(a, this);
            return this
        };
        b.prototype.hitAt = function (b) {
            if (a.defined(this.cached_hits[b])) return this.cached_hits[b];
            var d = this.length();
            if (0 === d || 0 > b || 1 < b) return null;
            var c = this.start(),
                g = e.roundTo(b, 3);
            if (0 === b) return this.cached_hits[g] = {
                seg: this.segs[0],
                start: c,
                slen: 0,
                segt: 0
            };
            var k = this.segs.length;
            if (0 === k) return null;
            b *= d;
            for (var z = 0, x, m = 0; m < k; m++) {
                d = this.segs[m];
                x = d.length(c);
                if (b <= z + x) return k = b - z, this.cached_hits[g] = {
                    seg: d,
                    start: c,
                    slen: x,
                    segt: 0 != x ? d.findT(c, k) : 0
                };
                z += x;
                c = d.last()
            }
            return null
        };
        b.prototype.pointAt = function (a) {
            return (a = this.hitAt(a)) ? a.seg.atT(a.start, a.segt) : this.start()
        };
        b.prototype.inside = function (a) {
            var b = a.x;
            a = a.y;
            var d = this.segs.length;
            if (2 > d) return !1;
            for (var c = this.start(), e = c, g = 0, x = 0; x < d; x++) var m = this.segs[x],
                g = g + m.crossings(e, b, a),
                e = m.last();
            c !== e && (g += k.line(b, a, e[0], e[1], c[0], c[1]));
            return 0 !== (g & -1)
        };
        b.prototype.tangentAt = function (a) {
            return (a = this.hitAt(a)) ? a.seg.tangentAt(a.start, a.segt) : 0
        };
        b.prototype.start = function () {
            return 1 > this.segs.length ? null : [this.segs[0].pts[0], this.segs[0].pts[1]]
        };
        b.prototype.end = function () {
            return 1 > this.segs.length ? null : this.segs[this.segs.length - 1].last()
        };
        b.prototype.bounds = function () {
            if (this.$bounds) return this.$bounds;
            if (0 >= this.segs.length) return y.NONE;
            var a = this.segs[0].pts[0],
                b = this.segs[0].pts[0],
                d = this.segs[0].pts[1],
                c = this.segs[0].pts[1];
            this.visit(function (e) {
                e = e.pts;
                var g = e.length,
                    x;
                for (x = 0; x < g; x += 2) a = Math.min(a, e[x]), b = Math.max(b, e[x]);
                for (x = 1; x < g; x += 2) d = Math.min(d, e[x]), c = Math.max(c, e[x])
            });
            return this.$bounds = new y(a, d, b - a, c - d)
        };
        b.prototype.vpoints = function (a) {
            this.visit(function (b) {
                b = b.pts;
                for (var d = b.length, c = 0; c < d; c += 2) {
                    var e = a(b[c], b[c + 1]);
                    e && (b[c] = e[0], b[c + 1] = e[1])
                }
            })
        };
        b.prototype.shift = function (a) {
            this.vpoints(function (b, d) {
                return [b + a[0], d + a[1]]
            });
            return this
        };
        b.prototype.zoom = function (a) {
            this.vpoints(function (b, d) {
                return [b * a[0], d * a[1]]
            });
            return this
        };
        b.prototype.normalize = function () {
            var a = this.bounds(),
                b = Math.floor(a.width / 2),
                d = Math.floor(a.height / 2),
                c = a.x,
                e = a.y;
            this.vpoints(function (a, x) {
                return [a - c - b, x - e - d]
            });
            return [b, d]
        };
        b.prototype.getPoints = function () {
            var a = [];
            this.visit(function (b) {
                a = a.concat(b.pts)
            });
            return a
        };
        b.prototype.toString = function () {
            return "[ Path '" + b.toSVGString(this) + "' ]"
        };
        b.prototype.clone = function () {
            var a = new b;
            this.visit(function (b) {
                a.add(b.clone())
            });
            clone.closed = this.closed;
            return a
        };
        b.prototype.invalidate = function () {
            this.cached_len = void 0;
            this.cached_hits = {};
            this.$bounds = null
        };
        b.prototype.reset = function () {
            this.segs = [];
            this.closed = !1
        };
        b.prototype.dispose = function () {};
        b.prototype.updatePath2D = function (a) {
            t && !this._p2dCurrent && (a = a || b.toSVGString(this), this.path2d = new u.Path2D(a), this._p2dCurrent = !0)
        };
        b.toSVGString = function (a) {
            var b = [];
            a.visit(w, b);
            b.push("Z");
            return b.join(" ")
        };
        var w = function (a, b) {
            b.push(a.toString())
        };
        b.parse = function (a, d) {
            d =
                d || new b;
            d.segs = [];
            for (var c = a.match(/[a-z][^a-z]*/ig), e = 0; e < c.length; e++) {
                var g = b.parseSegment(c[e]);
                g && d.segs.push(g)
            }
            d.str = a;
            return d
        };
        b.parseSegment = function (a) {
            a = a.toUpperCase();
            var b = a.substring(1).trim().replace(/,/g, " ").split(" ").map(function (a) {
                return parseFloat(a)
            });
            switch (a[0]) {
                case "M":
                    return new g(b);
                case "L":
                    return new d(b);
                case "C":
                    return new p(b);
                default:
                    return null
            }
        };
        v.exports = b
    }, {
        "../constants.js": 12,
        "../utils.js": 39,
        "./bounds.js": 16,
        "./brush.js": 17,
        "./segments.js": 20,
        engine: 40
    }],
    20: [function (c, v, n) {
        function b(a) {
            this.pts = a
        }

        function e(a) {
            this.pts = a
        }

        function a(a) {
            this.pts = a;
            this._cachedStart = null;
            this._length = 0
        }
        c("../constants.js");
        b.prototype.draw = function (a) {
            a.moveTo(this.pts[0], this.pts[1])
        };
        b.prototype.length = function (a) {
            return 0
        };
        b.prototype.findT = function (a, b) {
            return 0
        };
        b.prototype.atDist = function (a, b) {
            return this.atT(a, null)
        };
        b.prototype.atT = function (a, b) {
            return [this.pts[0], this.pts[1]]
        };
        b.prototype.tangentAt = function (a, b) {
            return 0
        };
        b.prototype.crossings = function (a,
            b, c) {
            return 0
        };
        b.prototype.last = function () {
            return [this.pts[0], this.pts[1]]
        };
        b.prototype.toString = function () {
            return "M" + this.pts.join(" ")
        };
        b.prototype.clone = function () {
            return new b(this.pts)
        };
        e.prototype.draw = function (a) {
            a.lineTo(this.pts[0], this.pts[1])
        };
        e.prototype.length = function (a) {
            var b = this.pts[0] - a[0];
            a = this.pts[1] - a[1];
            return Math.sqrt(b * b + a * a)
        };
        e.prototype.findT = function (a, b) {
            if (0 >= b) return 0;
            var d = this.length(a);
            return b >= d ? 1 : b / d
        };
        e.prototype.atDist = function (a, b) {
            return this.atT(a, this.findT(a,
                b))
        };
        e.prototype.atT = function (a, b) {
            var d = a[0],
                c = a[1];
            return [d + (this.pts[0] - d) * b, c + (this.pts[1] - c) * b]
        };
        e.prototype.tangentAt = function (a, b) {
            return Math.atan2(this.pts[1] - a[1], this.pts[0] - a[0])
        };
        e.prototype.crossings = function (a, b, c) {
            return g.line(b, c, a[0], a[1], this.pts[0], this.pts[1])
        };
        e.prototype.last = function () {
            return [this.pts[0], this.pts[1]]
        };
        e.prototype.toString = function () {
            return "L" + this.pts.join(" ")
        };
        e.prototype.clone = function () {
            return new e(this.pts)
        };
        a.prototype.draw = function (a) {
            a.bezierCurveTo(this.pts[0],
                this.pts[1], this.pts[2], this.pts[3], this.pts[4], this.pts[5])
        };
        a.prototype.length = function (a) {
            if (this._cachedStart && this._cachedStart[0] === a[0] && this._cachedStart[1] === a[1]) return this._length;
            this._cachedStart = a;
            return this._length = this.findLengthAndT(a, Number.MAX_VALUE)[0]
        };
        a.prototype.findT = function (a, b) {
            return this.findLengthAndT(a, b)[1]
        };
        a.prototype.findLengthAndT = function (a, b) {
            for (var d = this.pts, c = a[0], e = a[1], g = d[0], p = d[1], w = d[2], z = d[3], A = d[4], r = d[5], d = Math.sqrt(Math.pow(g - c, 2) + Math.pow(p - e,
                    2)) + Math.sqrt(Math.pow(w - g, 2) + Math.pow(z - p, 2)) + Math.sqrt(Math.pow(A - w, 2) + Math.pow(r - z, 2)) + 1, C = 1 / d, D = 3 * C, n = D * C, x = C * C * C, m = 2 * n, f = 6 * x, h = c - 2 * g + w, B = e - 2 * p + z, A = 3 * (g - w) - c + A, r = 3 * (p - z) - e + r, z = c, w = e, c = (g - c) * D + h * n + x * A, e = (p - e) * D + B * n + x * r, p = h * m + A * f, m = B * m + r * f, B = A * f, f = r * f, A = h = 0; A < d; A++)
                if (g = z, D = w, z += c, w += e, c += p, e += m, p += B, m += f, h += Math.sqrt((z - g) * (z - g) + (w - D) * (w - D)), h >= b) return [h, C * A];
            return [h, 1]
        };
        a.prototype.atDist = function (a, b) {
            return this.atT(a, this.findT(a, b))
        };
        a.prototype.atT = function (a, b) {
            var d = b * b,
                c = d * b,
                e = 1 - b,
                g =
                e * e,
                p = g * e,
                g = 3 * b * g,
                d = 3 * d * e;
            return [a[0] * p + this.pts[0] * g + this.pts[2] * d + this.pts[4] * c, a[1] * p + this.pts[1] * g + this.pts[3] * d + this.pts[5] * c]
        };
        a.prototype.tangentAt = function (a, b) {
            0 > b && (b = 0);
            1 < b && (b = 1);
            var d = 3 * (1 - b) * (1 - b),
                c = 6 * (1 - b) * b,
                e = 3 * b * b;
            return Math.atan2(d * (this.pts[1] - a[1]) + c * (this.pts[3] - this.pts[1]) + e * (this.pts[5] - this.pts[3]), d * (this.pts[0] - a[0]) + c * (this.pts[2] - this.pts[0]) + e * (this.pts[4] - this.pts[2]))
        };
        a.prototype.crossings = function (a, b, c) {
            var d = this.pts;
            return g.curve(b, c, a[0], a[1], d[0], d[1], d[2],
                d[3], d[4], d[5], 0)
        };
        a.prototype.last = function () {
            return [this.pts[4], this.pts[5]]
        };
        a.prototype._ensure_params = function (a) {
            this._lstart && this._lstart[0] === a[0] && this._lstart[1] === a[1] || (this._lstart = a, this._params = this._calc_params(a))
        };
        a.prototype._calc_params = function (a) {
            var b = this.pts,
                c = [],
                d = a[0];
            a = a[1];
            var e = b[0],
                g = b[1],
                y = b[2],
                w = b[3],
                z = b[5];
            c[0] = b[4] - 3 * y + 3 * e - d;
            c[1] = 3 * y - 6 * e + 3 * d;
            c[2] = 3 * e - 3 * d;
            c[3] = d;
            c[4] = z - 3 * w + 3 * g - a;
            c[5] = 3 * w - 6 * g + 3 * a;
            c[6] = 3 * g - 3 * a;
            c[7] = a;
            return c
        };
        a.prototype.clone = function () {
            return new a(this.pts)
        };
        a.prototype.toString = function () {
            return "C" + this.pts.join(" ")
        };
        var g = {
            curve: function (a, b, c, e, t, q, y, w, z, A, r) {
                if (b < e && b < q && b < w && b < A || b >= e && b >= q && b >= w && b >= A || a >= c && a >= t && a >= y && a >= z) return 0;
                if (a < c && a < t && a < y && a < z) {
                    if (b >= e) {
                        if (b < A) return 1
                    } else if (b >= A) return -1;
                    return 0
                }
                if (52 < r) return g.line(a, b, c, e, z, A);
                var d = (t + y) / 2,
                    k = (q + w) / 2;
                t = (c + t) / 2;
                q = (e + q) / 2;
                y = (y + z) / 2;
                w = (w + A) / 2;
                var u = (t + d) / 2,
                    x = (q + k) / 2,
                    m = (d + y) / 2,
                    f = (k + w) / 2,
                    d = (u + m) / 2,
                    k = (x + f) / 2;
                return isNaN(d) || isNaN(k) ? 0 : g.curve(a, b, c, e, t, q, u, x, d, k, r + 1) + g.curve(a, b,
                    d, k, m, f, y, w, z, A, r + 1)
            },
            line: function (a, b, c, e, g, q) {
                return b < e && b < q || b >= e && b >= q || a >= c && a >= g ? 0 : a < c && a < g ? e < q ? 1 : -1 : a >= c + (b - e) * (g - c) / (q - e) ? 0 : e < q ? 1 : -1
            }
        };
        v.exports = {
            MSeg: b,
            LSeg: e,
            CSeg: a,
            Crossings: g
        }
    }, {
        "../constants.js": 12
    }],
    21: [function (c, v, n) {
        n = c("../animation/element.js");
        var b = c("./path.js");
        c = c("./segments.js");
        var e = c.MSeg,
            a = c.LSeg;
        n.prototype.dot = function () {
            var a = this;
            this.paint(function (b) {
                b.beginPath();
                b.arc(0, 0, 3, 0, 2 * Math.PI, !1);
                b.closePath();
                a.applyBrushes(b)
            });
            return this
        };
        n.prototype.rect = function (c,
            d) {
            d = d || c;
            var g = new b;
            g.add(new e([0, 0]));
            g.add(new a([0 + c, 0]));
            g.add(new a([0 + c, 0 + d]));
            g.add(new a([0, 0 + d]));
            g.add(new a([0, 0]));
            this.path(g);
            return this
        };
        n.prototype.oval = function (a, b) {
            var c = this,
                d = a / 2,
                e = b ? b / 2 : d;
            this.paint(function (a) {
                a.ellipse && (a.beginPath(), a.ellipse(0, 0, d, e, 0, 0, 2 * Math.PI, !1), a.closePath(), c.applyBrushes(a))
            });
            return this
        };
        n.prototype.triangle = function (c, d) {
            d = d || c;
            var g = c / 2,
                k = new b;
            k.add(new e([0 + g, 0]));
            k.add(new a([0 + c, 0 + d]));
            k.add(new a([0, 0 + d]));
            k.add(new a([0 + g, 0]));
            this.path(k);
            return this
        };
        v.exports = {}
    }, {
        "../animation/element.js": 6,
        "./path.js": 19,
        "./segments.js": 20
    }],
    22: [function (c, v, n) {
        function b(a, c, d) {
            this.id = b.instances++;
            this.src = a;
            this._dimen = [0, 0];
            this.regions = [
                [0, 0, 1, 1]
            ];
            this.regions_f = null;
            this.cur_region = d || 0;
            this.wasError = this.ready = !1;
            this._image = null;
            this._callback = c;
            this._thumbnail = !1
        }
        var e = c("../conf.js"),
            a = c("../log.js"),
            g = c("engine"),
            d = c("../resource_manager.js"),
            p = c("../errors.js"),
            k = c("./bounds.js");
        b.instances = 0;
        b.MISSED_SIDE = 50;
        b.prototype.load = function (b,
            c, k, y) {
            k = k || this._callback;
            if (this._image) throw p.element("Image already loaded", b);
            var w = this;
            w.src ? d.loadOrGet(b, w.src, function (a, b, c) {
                c = g.checkMediaUrl(w.src);
                if (!w._thumbnail && e.doNotLoadImages) b("Loading images is turned off");
                else {
                    var d = new Image,
                        r = g.getAnmProps(d);
                    d.onload = d.onreadystatechange = function () {
                        r.ready || (this.readyState && "complete" !== this.readyState && b(this.readyState), r.ready = !0, d.isReady = !0, a(d))
                    };
                    d.onerror = b;
                    d.addEventListener("error", b, !1);
                    try {
                        d.src = c
                    } catch (E) {
                        b(E)
                    }
                }
            }, function (a) {
                w._image =
                    a;
                w._dimen = [a.width, a.height];
                w.ready = !0;
                k && k.call(w, a)
            }, function (b) {
                a.error(b.srcElement || b.path, b.message || b);
                w.ready = !0;
                var c = w.wasError = !0;
                y && (c = !y.call(w, b));
                if (c) throw p.element(b ? b.message : "Unknown", elm);
            }) : (a.error("Empty source URL for image"), w.ready = !0, w.wasError = !0, y && y.call(w, "Empty source"))
        };
        b.prototype.updateRegion = function () {
            if (!(0 > this.cur_region)) {
                var a;
                if (this.region_f) a = this.region_f(this.cur_region);
                else {
                    a = this.regions[this.cur_region];
                    var b = this._dimen;
                    a = [a[0] * b[0], a[1] * b[1],
                        a[2] * b[0], a[3] * b[1]
                    ]
                }
                this.region = a
            }
        };
        b.prototype.apply = function (a) {
            if (this.ready)
                if (this.wasError) this.applyMissed(a);
                else {
                    this.updateRegion();
                    var b = this.region;
                    a.drawImage(this._image, b[0], b[1], b[2], b[3], 0, 0, b[2], b[3])
                }
        };
        b.prototype.applyMissed = function (a) {
            a.save();
            a.strokeStyle = "#900";
            a.lineWidth = 1;
            a.beginPath();
            var c = b.MISSED_SIDE;
            a.moveTo(0, 0);
            a.lineTo(c, 0);
            a.lineTo(0, c);
            a.lineTo(c, c);
            a.lineTo(0, 0);
            a.lineTo(0, c);
            a.lineTo(c, 0);
            a.lineTo(c, c);
            a.stroke();
            a.restore()
        };
        b.MISSED_BOUNDS = new k(0, 0, b.MISSED_SIDE,
            b.MISSED_SIDE);
        b.prototype.bounds = function () {
            if (this.wasError) return b.MISSED_BOUNDS;
            if (!this.ready) return k.NONE;
            this.region || this.updateRegion();
            var a = this.region;
            return new k(0, 0, a[2], a[3])
        };
        b.prototype.inside = function (a) {
            return !0
        };
        b.prototype.clone = function () {
            return new b(this.src)
        };
        b.prototype.invalidate = function () {};
        b.prototype.reset = function () {};
        b.prototype.dispose = function () {};
        v.exports = b
    }, {
        "../conf.js": 11,
        "../errors.js": 13,
        "../log.js": 28,
        "../resource_manager.js": 35,
        "./bounds.js": 16,
        engine: 40
    }],
    23: [function (c, v, n) {
        function b(c, d, e, g, y) {
            this.lines = c;
            this.$font = d || b.DEFAULT_FONT;
            this.$align = e || b.DEFAULT_ALIGN;
            this.baseline = g || b.DEFAULT_BASELINE;
            this.underlined = a.defined(y) ? y : b.DEFAULT_UNDERLINE;
            this.size = -1;
            this.$bounds = null
        }
        var e = c("../constants.js"),
            a = c("../utils.js").is,
            g = c("../errors.js");
        n = c("engine");
        var d = c("./brush.js"),
            p = c("./bounds.js");
        b.DEFAULT_FFACE = "sans-serif";
        b.DEFAULT_FSIZE = 24;
        b.DEFAULT_FONT = b.DEFAULT_FSIZE + "px " + b.DEFAULT_FFACE;
        b.DEFAULT_ALIGN = e.TA_LEFT;
        b.DEFAULT_BASELINE =
            e.BL_MIDDLE;
        b.DEFAULT_UNDERLINE = !1;
        b.__measuring_f = n.createTextMeasurer();
        b.prototype.apply = function (a, c, e, g) {
            var k = this.bounds(),
                w = k.height / this.lineCount(),
                z = this.underlined;
            a.font = this.$font;
            a.textBaseline = this.baseline || b.DEFAULT_BASELINE;
            a.textAlign = this.$align || b.DEFAULT_ALIGN;
            var p = this.ascent(w, a.textBaseline),
                r = this.xOffset(k.width, a.textAlign),
                q;
            g ? g.apply(a) : d.clearShadow(a);
            c ? (c.apply(a), q = 0, this.visitLines(function (b) {
                a.fillText(b, r, q + p);
                q += w
            })) : d.clearFill(a);
            g && d.clearShadow(a);
            e ? (e.apply(a),
                q = 0, this.visitLines(function (b) {
                    a.strokeText(b, r, q + p);
                    q += w
                })) : d.clearStroke(a);
            if (z && c) {
                q = 0;
                e = d.stroke(c, 1);
                e.apply(a);
                var u = null,
                    t = 0,
                    x = this;
                this.visitLines(function (c) {
                    u = b.bounds(x, c);
                    t = u.width;
                    a.beginPath();
                    a.moveTo(r, q + w);
                    a.lineTo(t, q + w);
                    a.stroke();
                    q += w
                })
            }
        };
        b.prototype.font = function (a) {
            if (!a) return this.$font;
            this.$font = a;
            return this
        };
        b.prototype.align = function (a) {
            if (!a) return this.$align;
            this.$align = a;
            return this
        };
        b.prototype.bounds = function () {
            return this.$bounds ? this.$bounds : this.$bounds = b.bounds(this,
                this.lines)
        };
        b.prototype.inside = function (a) {
            return !0
        };
        b.prototype.ascent = function (a, b) {
            return b == e.BL_MIDDLE ? a / 2 : a
        };
        b.prototype.xOffset = function (a, b) {
            return b == e.TA_LEFT ? 0 : b == e.TA_CENTER ? a / 2 : b == e.TA_RIGHT ? a : 0
        };
        b.prototype.lineCount = function () {
            var b = this.lines;
            return a.arr(b) ? b.length : 1
        };
        b.prototype.visitLines = function (b, c) {
            var d = this.lines;
            if (a.arr(d))
                for (var e, g = 0, k = d.length; g < k; g++) e = d[g], b(e);
            else b(d.toString())
        };
        b.prototype.clone = function () {
            var a = new b(this.lines, this.$font);
            this.lines && Array.isArray(this.lines) &&
                (a.lines = [].concat(this.lines));
            return a
        };
        b.prototype.invalidate = function () {
            this.$bounds = null
        };
        b.prototype.reset = function () {};
        b.prototype.dispose = function () {};
        b.bounds = function (a, c) {
            if (!b.__measuring_f) throw g.system("no Text buffer, bounds call failed");
            var d = b.__measuring_f(a, c);
            return new p(0, 0, d[0], d[1])
        };
        v.exports = b
    }, {
        "../constants.js": 12,
        "../errors.js": 13,
        "../utils.js": 39,
        "./bounds.js": 16,
        "./brush.js": 17,
        engine: 40
    }],
    24: [function (c, v, n) {
        var b = c("./errors.js"),
            e = {
                register: function (a, c) {
                    if (e[a]) throw b.system("Importer " +
                        a + " is already registered!");
                    e[a] = c
                },
                get: function (a) {
                    if (!e[a]) throw b.system("Importer " + a + " is not registered!");
                    return e[a]
                },
                create: function (a) {
                    if (!e[a]) throw b.system("Importer " + a + " is not registered!");
                    return new e[a]
                },
                isAccessible: function (a) {
                    return "undefined" !== typeof e[a]
                }
            };
        v.exports = e
    }, {
        "./errors.js": 13
    }],
    25: [function (c, v, n) {
        var b = c("engine"),
            e = c("../constants.js"),
            a = {
                play: function () {
                    this.play()
                },
                pause: function () {
                    this.pause()
                },
                getPaused: function () {
                    return this.state.happens === e.PAUSED
                },
                mute: function () {
                    this.mute()
                },
                unmute: function () {
                    this.unmute()
                },
                isMuted: function () {
                    return this.muted
                },
                setVolume: function (a) {
                    w.volume(a.value / 100)
                },
                getVolume: function () {
                    return 100 * w.volume()
                },
                getDuration: function () {
                    return w.state.duration
                },
                setCurrentTime: function (a) {
                    a = a.value;
                    this.pause().play(a)
                },
                getCurrentTime: function () {
                    return this.state.time
                },
                setLoop: function (a) {
                    this.repeat = a.value
                },
                getLoop: function () {
                    return this.repeat
                },
                addEventListener: function (a) {
                    var b = a.value;
                    a = a.listener;
                    if (g[b] && -1 === g[b].indexOf(a)) return g[b].push(a), {}
                },
                removeEventListener: function (a) {
                    var b = a.value;
                    a = a.listener;
                    g[b] && (a ? (a = g[b].indexOf(a), -1 !== a && g[b].splice(a, 1)) : g[b] = [])
                }
            },
            g = {
                progress: [],
                timeupdate: [],
                play: [],
                pause: [],
                ended: []
            },
            d = ["ready"],
            p;
        for (p in g) d.push(p);
        var k = [],
            u;
        for (u in a) k.push(u);
        var t = b.getIframeOrigin();
        c = function (c) {
            var d;
            try {
                d = JSON.parse(c.data)
            } catch (r) {
                d = {}
            }
            c.origin === t && "player.js" === d.context && a[d.method] && w && (c = a[d.method].call(w, d), b.postToContentWindow({
                context: "player.js",
                version: "0.0.10",
                event: d.method,
                listener: d.listener,
                value: c
            }))
        };
        b.isInIframe() && b.addMessageListener(c);
        var q = function (a, c, d) {
                c = {
                    context: "player.js",
                    version: "0.0.10",
                    event: a,
                    value: c || {}
                };
                if (d) b.postToContentWindow(c);
                else if (g[a] && 0 !== g[a].length)
                    for (d = 0; d < g[a].length; d++) c.listener = g[a][d], b.postToContentWindow(c)
            },
            y = function (a) {
                b.isInIframe() && (a.on(e.S_LOAD, function () {
                    q("ready", {
                        src: b.getIframeSrc(),
                        events: d,
                        methods: k
                    }, !0)
                }), a.on(e.S_LOADING_PROGRESS, function (a) {
                    q("progress", {
                        percent: 100 * a
                    })
                }), a.on(e.S_PLAY, function () {
                    q("play")
                }), a.on(e.S_PAUSE,
                    function () {
                        q("pause")
                    }), a.on(e.S_COMPLETE, function () {
                    q("ended")
                }), a.on(e.S_TIME_UPDATE, function (b) {
                    q("timeupdate", {
                        seconds: b,
                        duration: a.state ? a.state.duration : b
                    })
                }))
            },
            w;
        v.exports = {
            setPlayer: function (a) {
                w = a;
                y(a)
            }
        }
    }, {
        "../constants.js": 12,
        engine: 40
    }],
    26: [function (c, v, n) {
        var b = c("./utils.js"),
            e = b.is,
            a = c("./loc.js").Errors,
            g = c("./errors.js"),
            d = c("./constants.js"),
            p = c("./global_opts.js"),
            k = c("engine"),
            u = c("./animation/animation.js"),
            t = {
                loadAnimation: function (a, b, c) {
                    a.anim && a.anim.dispose(a);
                    b.playedIn(a);
                    a.debug && !p.liveDebug && b.traverse(function (a) {
                        a.addDebugRender()
                    });
                    b.width && b.height ? a.forceAnimationSize && a._resize(b.width, b.height) : (b.width = a.width, b.height = a.height);
                    a.anim = b;
                    b.actions && t.applyActions(a, b, b.actions);
                    c && c.call(a, b);
                    a._checkOpts()
                },
                loadFromUrl: function (c, d, e, p) {
                    if (!JSON) throw g.system(a.S.NO_JSON_PARSER, c);
                    e = e || anm.importers.create("animatron");
                    var r = d.split("?");
                    d = r[0];
                    var w = (r = r[1]) && 0 < r.length ? b.paramsToObj(r) : {};
                    if (r = q(w)) c._addOpts(r), c._checkOpts();
                    var z = function (c) {
                            throw g.system(b.strf(a.P.SNAPSHOT_LOADING_FAILED, [c ? c.message || c : "\u00bfPor qu\u00e9?"]));
                        },
                        r = k.getCookie("_animatronauth");
                    k.ajax(d, function (a) {
                        try {
                            t.loadFromObj(c, JSON.parse(a.responseText), e, function (a) {
                                p && p.call(c, a);
                                c._applyUrlParamsToAnimation(w)
                            })
                        } catch (x) {
                            z(x)
                        }
                    }, z, "GET", r ? {
                        "Animatron-Security-Token": r
                    } : null)
                },
                loadFromObj: function (b, c, e, k) {
                    if (!e) throw g.player(a.P.NO_IMPORTER_TO_LOAD_WITH, b);
                    var r = e.load(c);
                    b.fire(d.S_IMPORT, e, r, c);
                    t.loadAnimation(b, r, k)
                },
                loadElements: function (a, b, c) {
                    var d = new u;
                    d.add(b);
                    t.loadAnimation(a, d, c)
                },
                applyActions: function (a,
                    b, c) {
                    eval("(function(p, a){" + c + ";actions.call(p,a);})")(a, b);
                    a.handleEvents = !0
                }
            },
            q = function (a) {
                function b(a) {
                    if (!a || 0 === a || "0" == a) return !1;
                    if (1 == a) return !0;
                    if ("false" == a) return !1;
                    if ("true" == a) return !0;
                    if ("off" == a) return !1;
                    if ("on" == a) return !0;
                    if ("no" == a) return !1;
                    if ("yes" == a) return !0
                }

                function c() {
                    for (var c = arguments, d = 0; d < c.length; d++)
                        if (e.defined(a[c[d]])) return b(a[c[d]])
                }
                var d = {};
                d.debug = e.defined(a.debug) ? b(a.debug) : void 0;
                d.muteErrors = c("me", "muterrors");
                d.repeat = c("r", "repeat");
                d.autoPlay = c("a",
                    "auto", "autoplay");
                d.mode = a.m || a.mode || void 0;
                d.zoom = a.z || a.zoom;
                d.speed = a.v || a.speed;
                d.width = a.w || a.width;
                d.height = a.h || a.height;
                d.infiniteDuration = c("i", "inf", "infinite");
                d.audioEnabled = c("s", "snd", "sound", "audio");
                d.handleEvents = c("he", "events");
                d.controlsEnabled = c("c", "controls");
                d.controlsInvisible = c("controlsInvisible");
                d.infoEnabled = c("info");
                d.loadingMode = a.lm || a.lmode || a.loadingmode || void 0;
                d.thumbnail = a.th || a.thumb || void 0;
                d.bgColor = a.bg || a.bgcolor;
                d.ribbonsColor = a.rc || a.ribbons || a.ribcolor;
                return d
            };
        v.exports = t
    }, {
        "./animation/animation.js": 3,
        "./constants.js": 12,
        "./errors.js": 13,
        "./global_opts.js": 15,
        "./loc.js": 27,
        "./utils.js": 39,
        engine: 40
    }],
    27: [function (c, v, n) {
        c = {
            S: {},
            P: {},
            A: {}
        };
        c.S.CANVAS_NOT_SUPPORTED = "Your browser does not support HTML5 canvas, so we cannot play anything for you.";
        c.S.SAD_SMILEY_HTML = '<span style="font-size: 4em;">:(</span><br>' + c.S.CANVAS_NOT_SUPPORTED;
        c.S.NO_JSON_PARSER = "JSON parser is not accessible";
        c.S.ERROR_HANDLING_FAILED = "Error-handling mechanics were broken with error {0}";
        c.S.NO_METHOD_FOR_PLAYER = "No method '{0}' exist for player";
        c.P.NO_IMPORTER_TO_LOAD_WITH = "Cannot load this project without importer. Please define it";
        c.P.NO_WRAPPER_WITH_ID = "No element found with given id: {0}";
        c.P.NO_WRAPPER_WAS_PASSED = "No element was passed to player initializer";
        c.P.CANVAS_NOT_VERIFIED = "Canvas is not verified by the provider";
        c.P.CANVAS_NOT_PREPARED = "Canvas is not prepared, don't forget to call 'init' method";
        c.P.ALREADY_PLAYING = "Player is already in playing mode, please call 'stop' or 'pause' before playing again";
        c.P.PAUSING_WHEN_STOPPED = "Player is stopped, so it is not allowed to pause";
        c.P.NO_ANIMATION_PASSED = "No animation passed to load method";
        c.P.NO_STATE = "There's no player state defined, nowhere to draw, please load something in player before calling its playing-related methods";
        c.P.NO_ANIMATION = "There's nothing at all to manage with, please load something in player before calling its playing-related methods";
        c.P.COULD_NOT_LOAD_WHILE_PLAYING = "Could not load any animation while playing or paused, please stop player before loading";
        c.P.LOAD_WAS_ALREADY_POSTPONED = "Load was called while loading process was already in progress";
        c.P.NO_LOAD_CALL_BEFORE_PLAY = "No animation was loaded into player before the request to play";
        c.P.BEFOREFRAME_BEFORE_PLAY = "Please assign beforeFrame callback before calling play()";
        c.P.AFTERFRAME_BEFORE_PLAY = "Please assign afterFrame callback before calling play()";
        c.P.BEFORERENDER_BEFORE_PLAY = "Please assign beforeRender callback before calling play()";
        c.P.AFTERRENDER_BEFORE_PLAY = "Please assign afterRender callback before calling play()";
        c.P.PASSED_TIME_VALUE_IS_NO_TIME = "Given time is not allowed, it is treated as no-time";
        c.P.PASSED_TIME_NOT_IN_RANGE = "Passed time ({0}) is not in animation range";
        c.P.DURATION_IS_NOT_KNOWN = "Duration is not known";
        c.P.ALREADY_ATTACHED = "Player is already attached to this canvas, please use another one";
        c.P.INIT_TWICE = "Initialization was called twice";
        c.P.INIT_AFTER_LOAD = "Initialization was called after loading a animation";
        c.P.SNAPSHOT_LOADING_FAILED = "Snapshot failed to load ({0})";
        c.P.IMPORTER_CONSTRUCTOR_PASSED =
            "You've passed importer constructor to snapshot loader, but not an instance! Probably you used anm.importers.get instead of anm.importers.create.";
        c.P.DOM_NOT_READY = "Document in not yet ready, please consider moving your initialization script to the bottom of your web page";
        c.A.OBJECT_IS_NOT_ELEMENT = "It appears that you've passed not an instance of anm.Element";
        c.A.ELEMENT_IS_REGISTERED = "This element is already registered in animation";
        c.A.ELEMENT_IS_NOT_REGISTERED = "There is no such element registered in animation";
        c.A.UNSAFE_TO_REMOVE = "Unsafe to remove, please use iterator-based looping (with returning false from iterating function) to remove safely";
        c.A.NO_ELEMENT_TO_REMOVE = "Please pass some element or use detach() method";
        c.A.NO_ELEMENT = "No such element found";
        c.A.ELEMENT_NOT_ATTACHED = "Element is not attached to something at all";
        c.A.MODIFIER_NOT_ATTACHED = "Modifier wasn't applied to anything";
        c.A.NO_MODIFIER_PASSED = "No modifier was passed";
        c.A.NO_PAINTER_PASSED = "No painter was passed";
        c.A.MODIFIER_REGISTERED =
            "Modifier was already added to this element";
        c.A.PAINTER_REGISTERED = "Painter was already added to this element";
        c.A.RESOURCES_FAILED_TO_LOAD = "Some of resources required to play this animation were failed to load";
        c.A.MASK_SHOULD_BE_ATTACHED_TO_ANIMATION = "Element to be masked should be attached to animation when rendering";
        v.exports = {
            Strings: {
                COPYRIGHT: "Animatron Player",
                LOADING: "Loading...",
                LOADING_ANIMATION: "Loading {0}..."
            },
            Errors: c
        }
    }, {}],
    28: [function (c, v, n) {
        (function (b) {
            var e, a, g, d, p = c("./conf.js"),
                k = c("./constants.js"),
                u = function () {},
                t = b.console || {
                    log: u,
                    info: u,
                    warn: u,
                    error: u
                };
            b.console && (e = t.debug || t.log, a = t.info || t.log, g = t.warn || t.log, d = t.error || t.log, t.log.apply || (e = Function.prototype.bind.call(e, t), a = Function.prototype.bind.call(a, t), g = Function.prototype.bind.call(g, t), d = Function.prototype.bind.call(e, t)));
            v.exports = {
                debug: function () {
                    p.logLevel & k.L_DEBUG && e.apply(t, arguments)
                },
                info: function () {
                    p.logLevel & k.L_INFO && a.apply(t, arguments)
                },
                warn: function () {
                    p.logLevel & k.L_WARN && g.apply(t, arguments)
                },
                error: function () {
                    p.logLevel & k.L_ERROR && d.apply(t, arguments)
                }
            }
        }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
    }, {
        "./conf.js": 11,
        "./constants.js": 12
    }],
    29: [function (c, v, n) {
        (function (b) {
            function e(a) {
                this.url = /\.\w+$/i.test(a) ? a : a + t;
                this.canPlay = this.playing = this.ready = !1;
                this.volume = 1;
                this.audio = null
            }

            function a(a, b) {
                return function (c) {
                    b(Error("Failed to load audio file from " + a + " with error code: " + (c && c.currentTarget && c.currentTarget.error) ?
                        c.currentTarget.error.code : "Unknown"))
                }
            }
            c("../conf.js");
            var g = c("../log.js");
            c("../utils.js");
            var d = c("../constants.js");
            c("../errors.js");
            var p = c("engine"),
                k = c("../resource_manager.js"),
                u = p.createAudio(),
                t = u.canPlayType && u.canPlayType("audio/ogg;").replace(/no/, "") ? ".ogg" : ".mp3",
                q = function () {
                    if (p.isLocal) return null;
                    var a = b.AudioContext || b.webkitAudioContext;
                    if (!a) return null;
                    if (b.anmAudioContext) return b.anmAudioContext;
                    try {
                        var c = new a;
                        return b.anmAudioContext = c
                    } catch (z) {
                        return null
                    }
                }();
            e.prototype.load =
                function (b, c) {
                    var d = this;
                    k.loadOrGet(b, d.url, function (b, c, e) {
                        var g = p.checkMediaUrl(d.url);
                        if (anm.conf.doNotLoadAudio) c("Loading audio is turned off");
                        else if (q) {
                            var r = {},
                                x = function (a, f) {
                                    try {
                                        q.decodeAudioData(a.buf, function (a) {
                                            b(a)
                                        }, function (b) {
                                            var c = new Uint8Array(a.buf);
                                            c.indexOf = Array.prototype.indexOf;
                                            for (b = a.sync;;) {
                                                a.retry++;
                                                b = c.indexOf(255, b);
                                                if (-1 == b || c[b + 1] & 1) break;
                                                b++
                                            } - 1 != b ? (c = a.buf.slice(b), delete a.buf, a.buf = c, a.sync = b, b = !0) : b = !1;
                                            b && x(a, f)
                                        })
                                    } catch (I) {
                                        c("Unable to load audio " + f + ": " + I.message)
                                    }
                                };
                            r.xhr = new XMLHttpRequest;
                            r.xhr.open("GET", g, !0);
                            r.xhr.responseType = "arraybuffer";
                            r.xhr.addEventListener("load", function (a) {
                                a = a.target;
                                200 == a.status ? (r.buf = a.response, r.sync = 0, r.retry = 0, x(r)) : c("Unable to load audio " + g + ": " + a.statusText)
                            }, !1);
                            r.xhr.addEventListener("error", a(g, c), !1);
                            r.xhr.send()
                        } else {
                            var m = p.createAudio();
                            m.setAttribute("preload", "auto");
                            var f = function (a) {
                                    a = m.buffered;
                                    1 == a.length ? 4 === m.readyState || 3 === m.readyState ? (p.unsubscribeElementEvents(m, {
                                            progress: k,
                                            loadedmetadata: h,
                                            canplay: w
                                        }),
                                        b(m), e(1)) : d.canPlay && window.chrome && (m.volume = 0, m.currentTime = a.end(0), m.play(), m.pause()) : d.canPlay && 1 != a.length && (p.unsubscribeElementEvents(m, {
                                        progress: k,
                                        loadedmetadata: h,
                                        canplay: w
                                    }), b(m), e(1))
                                },
                                h = function (a) {
                                    a = [];
                                    for (var b = 0; b < m.buffered.length; b++) a.push([m.buffered.start(b), m.buffered.end(b)]);
                                    for (progress = b = 0; b < m.buffered.length; b++) progress += 1 / m.duration * (a[b][1] - a[b][0]);
                                    e(progress)
                                },
                                k = function (a) {
                                    f(a);
                                    h(a)
                                },
                                w = function (a) {
                                    d.canPlay = !0;
                                    f(a)
                                };
                            p.subscribeElementEvents(m, {
                                progress: k,
                                loadedmetadata: h,
                                canplay: w,
                                error: a(g, c)
                            });
                            var H = function (a, b, f) {
                                var d = p.createSource();
                                d.addEventListener("error", c, !1);
                                d.type = f;
                                d.src = b;
                                a.appendChild(d)
                            };
                            try {
                                var u = d.url.substring(d.url.lastIndexOf(".") + 1);
                                H(m, g, "ogg" === u ? "audio/ogg" : "audio/mp3");
                                p.appendToBody(m)
                            } catch (F) {
                                c(F)
                            }
                        }
                    }, function (a) {
                        d.audio = a;
                        d.ready = !0;
                        d.shouldPlayWhenReady && (d.play(d.shouldPlayParams.ltime, d.shouldPlayParams.duration), d.shouldPlayWhenReady = !1);
                        c.muted && d.mute()
                    }, function (a) {
                        g.error(a ? a.message || a : "Unknown error")
                    })
                };
            e.prototype.play =
                function (a, b) {
                    if (this.playing) return !1;
                    if (this.ready) {
                        this.playing = !0;
                        var c = this.offset + a;
                        q ? c > this.audio.duration ? this._audio_is_playing = !1 : (this._source = q.createBufferSource(), this._source.buffer = this.audio, this._gain = q.createGain(), this._source.connect(this._gain), this._gain.connect(q.destination), this._gain.gain.value = this.volume, this._source.play ? this._source.play(0, c) : this._source.start ? this._source.start(0, c, this._source.buffer.duration - c) : this._source.noteGrainOn(0, c, this._source.buffer.duration -
                            c)) : (this.audio.currentTime = c, this.audio.volume = this.volume, this.audio.play())
                    } else this.shouldPlayWhenReady = !0, this.shouldPlayParams = {
                        ltime: a,
                        duration: b
                    }
                };
            e.prototype.stop = function () {
                if (this.playing) {
                    try {
                        q ? (this._source.stop ? this._source.stop(0) : this._source.noteOff(0), this._source = null) : (this.audio.pause(), this.audio.volume = 0)
                    } catch (y) {}
                    this.playing = !1
                }
            };
            e.prototype.stopIfNotMaster = function () {
                this.master || this.stop()
            };
            e.prototype.setVolume = function (a) {
                if (this.muted) this.unmuteVolume = a;
                else return this.volume =
                    a, this._gain ? this._gain.gain.value = a : this.audio && (this.audio.volume = a), this
            };
            e.prototype.mute = function () {
                this.muted || (this.unmuteVolume = this.volume, this.setVolume(0), this.muted = !0)
            };
            e.prototype.unmute = function () {
                this.muted && (this.muted = !1, this.setVolume(this.unmuteVolume))
            };
            e.prototype.toggleMute = function () {
                this.muted ? this.unmute() : this.mute()
            };
            e.prototype.connect = function (a, b) {
                var c = this;
                a.on(d.X_START, function () {
                    c.play.apply(c, arguments)
                });
                a.on(d.X_STOP, function () {
                    c.stopIfNotMaster()
                });
                var e = function () {
                    c.stop()
                };
                b.on(d.A_STOP, e);
                b.on(d.A_PAUSE, e)
            };
            e.prototype.clone = function () {
                var a = new e("");
                a.url = this.url;
                a.offset = this.offset;
                return a
            };
            v.exports = e
        }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
    }, {
        "../conf.js": 11,
        "../constants.js": 12,
        "../errors.js": 13,
        "../log.js": 28,
        "../resource_manager.js": 35,
        "../utils.js": 39,
        engine: 40
    }],
    30: [function (c, v, n) {
        function b(a, b, c) {
            this.url = a;
            this.formats = b;
            this.size = c;
            this.playing = this.ready = !1
        }

        function e(a,
            b) {
            return function (c) {
                b(Error("Failed to load video file from " + a + " with error code: " + (c && c.currentTarget && c.currentTarget.error) ? c.currentTarget.error.code : "Unknown"))
            }
        }
        c("../conf.js");
        var a = c("../log.js"),
            g = c("../constants.js");
        c("../errors.js");
        var d = c("engine"),
            p = c("../resource_manager.js"),
            k = c("../graphics/bounds.js");
        b.prototype.connect = function (a, b) {
            var c = this;
            a.on(g.X_START, function () {
                c.play.apply(c, arguments)
            });
            var d = function () {
                c.stop()
            };
            a.on(g.X_STOP, d);
            b.on(g.A_STOP, d);
            b.on(g.A_PAUSE,
                d)
        };
        b.prototype.load = function (b, c) {
            var g = this;
            p.loadOrGet(b, g.url, function (a, b, c) {
                var k = d.checkMediaUrl(g.url),
                    r = g.formats,
                    w = d.createVideo(g.size[0], g.size[1]);
                w.setAttribute("preload", "auto");
                w.style.display = "none";
                var p = function (b) {
                        1 == w.buffered.length && 4 === w.readyState && (d.unsubscribeElementEvents(w, {
                            progress: x,
                            loadedmetadata: q,
                            canplay: m
                        }), a(w), c(1))
                    },
                    q = function (a) {
                        a = [];
                        for (var b = 0; b < w.buffered.length; b++) a.push([w.buffered.start(b), w.buffered.end(b)]);
                        for (var f = b = 0; b < w.buffered.length; b++) f +=
                            1 / w.duration * (a[b][1] - a[b][0]);
                        c(f)
                    },
                    x = function (a) {
                        p(a);
                        q(a)
                    },
                    m = function (a) {
                        g.canPlay = !0;
                        p(a)
                    };
                d.subscribeElementEvents(w, {
                    progress: x,
                    loadedmetadata: q,
                    canplay: m,
                    error: e(k, b)
                });
                var f = function (a, c, f) {
                    var h = d.createSource();
                    h.addEventListener("error", b, !1);
                    h.type = f;
                    h.src = c;
                    a.appendChild(h)
                };
                try {
                    r ? r.length && r.forEach(function (a) {
                        f(w, d.checkMediaUrl(a[0]), a[1])
                    }) : f(w, k, "video/mp4"), d.appendToBody(w)
                } catch (h) {
                    b(h)
                }
            }, function (a) {
                g.video = a;
                g.ready = !0;
                g.size || (g.size = [a.width, a.height])
            }, function (b) {
                a.error(b ?
                    b.message || b : "Unknown error")
            })
        };
        b.prototype.apply = function (a) {
            this.video && a.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, 0, 0, this.size[0], this.size[1])
        };
        b.prototype.bounds = function () {
            return this.$bounds ? this.$bounds : this.video ? this.$bounds = new k(0, 0, this.video.width, this.video.height) : k.NONE
        };
        b.prototype.inside = function (a) {
            return !0
        };
        b.prototype.play = function (a, b) {
            if (!this.ready || this.playing) return !1;
            this.playing = !0;
            this.video.currentTime = (this.offset || 0) + a;
            this.video.play()
        };
        b.prototype.stop = function () {
            this.playing && (this.video.pause(), this.playing = !1)
        };
        b.prototype.invalidate = function () {
            this.$bounds = null
        };
        b.prototype.dispose = function () {};
        b.prototype.clone = function () {
            var a = new b(this.url);
            a.offset = this.offset;
            return a
        };
        v.exports = b
    }, {
        "../conf.js": 11,
        "../constants.js": 12,
        "../errors.js": 13,
        "../graphics/bounds.js": 16,
        "../log.js": 28,
        "../resource_manager.js": 35,
        engine: 40
    }],
    31: [function (c, v, n) {
        var b = c("./errors.js"),
            e = {
                register: function (a, c) {
                    if (e[a]) throw b.system("Module " +
                        a + " is already registered!");
                    e[a] = c
                },
                get: function (a) {
                    return e[a]
                },
                isAccessible: function (a) {
                    return "undefined" !== typeof e[a]
                }
            };
        v.exports = e
    }, {
        "./errors.js": 13
    }],
    32: [function (c, v, n) {
        function b() {
            this.id = "";
            this.controls = this.ctx = this.canvas = this.anim = this.state = null;
            this.__canvasPrepared = !1;
            this.__instanceNum = ++b.__instances;
            this.muted = !1
        }
        var e = c("./constants.js"),
            a = c("./utils.js"),
            g = a.is,
            d = c("./global_opts.js");
        c("./conf.js");
        var p = c("./log.js");
        n = c("./events.js").provideEvents;
        var k = c("./loc.js"),
            u =
            k.Strings,
            t = k.Errors,
            q = c("./errors.js"),
            y = c("engine"),
            w = c("./resource_manager.js"),
            z = c("./player_manager.js"),
            A = c("./loader.js"),
            r = c("./ui/controls.js"),
            C = c("./animation/animation.js"),
            D = c("./animation/element.js"),
            E = c("./render.js"),
            x = c("./graphics/sheet.js");
        b.__instances = 0;
        b.PREVIEW_POS = 0;
        b.PEFF = 0;
        b.NO_TIME = -1;
        b.DEFAULT_CONFIGURATION = {
            debug: !1,
            repeat: void 0,
            autoPlay: !1,
            mode: e.M_VIDEO,
            zoom: 1,
            speed: 1,
            width: void 0,
            height: void 0,
            infiniteDuration: void 0,
            drawStill: void 0,
            audioEnabled: !0,
            volume: 1,
            imagesEnabled: !0,
            videoEnabled: !0,
            shadowsEnabled: !0,
            handleEvents: void 0,
            controlsEnabled: void 0,
            controlsInvisible: void 0,
            infoEnabled: void 0,
            loadingMode: e.LM_DEFAULT,
            thumbnail: void 0,
            bgColor: void 0,
            ribbonsColor: void 0,
            forceAnimationSize: !1,
            stretchToCanvas: !1,
            muteErrors: !1
        };
        b.EMPTY_BG = "rgba(0,0,0,.05)";
        b.prototype.init = function (c, d) {
            this.viewId = a.getObjectId();
            y.isDocReady() || p.warn(t.P.DOM_NOT_READY);
            this._initHandlers();
            this.on(e.S_ERROR, this.__onerror());
            if (this.canvas || this.wrapper) throw q.player(t.P.INIT_TWICE, this);
            if (this.anim) throw q.player(t.P.INIT_AFTER_LOAD, this);
            this._prepare(c);
            this._addOpts(b.DEFAULT_CONFIGURATION);
            this._addOpts(y.extractUserOptions(this.canvas));
            this._addOpts(y.extractUserOptions(this.wrapper));
            try {
                window && window.frameElement && this._addOpts(y.extractUserOptions(window.frameElement))
            } catch (B) {}
            this._addOpts(d || {});
            this._postInit();
            this._checkOpts();
            z.fire(e.S_NEW_PLAYER, this);
            return this
        };
        b.prototype.load = function (b, c, d, m) {
            var f = this,
                h = f.state;
            if (h.happens === e.PLAYING || h.happens === e.PAUSED) throw q.player(t.P.COULD_NOT_LOAD_WHILE_PLAYING,
                f);
            var x, r, k;
            if (b && b.id && f.anim && f.anim.id == b.id) p.info("Animation with ID=" + b.id + " is already loaded in player, skipping the call");
            else {
                var B = !1;
                if (c && c.IMPORTER_ID || d && d.IMPORTER_ID) throw q.player(t.P.IMPORTER_CONSTRUCTOR_PASSED, f);
                g.fun(c) ? k = c : g.num(c) || !c ? (g.num(c) && (x = c, B = !0), g.obj(d) ? (r = d, k = m) : g.fun(d) && (k = d)) : g.obj(c) && (r = c, k = d);
                if (f.loadingMode != e.LM_ONPLAY || f._playLock) {
                    if (!b) throw f.anim = null, f._reset(), f.stop(), q.player(t.P.NO_ANIMATION_PASSED, f);
                    if (!f.__canvasPrepared) throw q.player(t.P.CANVAS_NOT_PREPARED,
                        f);
                    f._reset();
                    h.happens = e.LOADING;
                    f.fire(e.S_CHANGE_STATE, e.LOADING);
                    c = function (b) {
                        var c = f.anim;
                        f.__subscribePlayingEvents(c);
                        f.handleEvents && f.__subscribeDynamicEvents(c);
                        var d = c._collectRemoteResources(f);
                        d.length ? (h.happens = e.RES_LOADING, f.fire(e.S_CHANGE_STATE, e.RES_LOADING), f.fire(e.S_RES_LOAD, d), w.subscribe(f.id, d, [function (c, d) {
                            f.anim === b && a.postpone(function () {
                                f.state.happens = e.LOADING;
                                f.fire(e.S_CHANGE_STATE, e.LOADING);
                                f.fire(e.S_LOAD, b);
                                f._updateMediaVolumes();
                                f.handleEvents || f.stop();
                                f._callPostpones();
                                k && k.call(f, b);
                                f._applyTimeOptionsIfSet()
                            })
                        }], function (a, b, c, d) {
                            f.fire(e.S_LOADING_PROGRESS, b);
                            f.controlsEnabled && f.controls && (f.controls.loadingProgress = c, f.controls.loadingErrors = d)
                        }), c._loadRemoteResources(f)) : (f.fire(e.S_LOAD, b), f.handleEvents || f.stop(), k && k.call(f, b), f._applyTimeOptionsIfSet())
                    };
                    f.anim && (f.__unsubscribePlayingEvents(f.anim), f.__unsubscribeDynamicEvents(f.anim), f.anim.traverse(function (a) {
                        a.removeMaskCanvases()
                    }));
                    b ? b instanceof C ? (f._loadTarget = e.LT_ANIMATION, A.loadAnimation(f,
                        b, c)) : g.arr(b) || b instanceof D ? (f._loadTarget = e.LT_ELEMENTS, A.loadElements(f, b, c)) : g.str(b) ? (f._loadTarget = e.LT_URL, f._loadSrc = b, A.loadFromUrl(f, b, r, c)) : (f._loadTarget = e.LT_IMPORT, A.loadFromObj(f, b, r, c)) : (f._loadTarget = e.LT_ANIMATION, f.anim = new C, c(f.anim));
                    B && (f.anim.duration = x);
                    return f
                }
                if (f._postponedLoad) throw q.player(t.P.LOAD_WAS_ALREADY_POSTPONED, f);
                f._lastReceivedAnimationId = null;
                f._postponedLoad = [b, x, r, k];
                f.stop()
            }
        };
        y.getRequestFrameFunc();
        var m = y.getCancelFrameFunc();
        b.prototype.play = function (a,
            c, d) {
            var f = this;
            f._ensureHasState();
            var h = f.state;
            if (h.happens !== e.PLAYING || !f.infiniteDuration)
                if (f.loadingMode !== e.LM_ONPLAY || f._lastReceivedAnimationId)
                    if (f.loadingMode === e.LM_ONREQUEST && h.happens === e.RES_LOADING) f._postpone("play", arguments);
                    else {
                        f._ensureHasAnim();
                        var m = f.anim;
                        h.happens === e.STOPPED && m.reset();
                        h.__lastPlayConf = [a, c, d];
                        h.from = a || 0;
                        h.time = b.NO_TIME;
                        h.speed = (c || 1) * (f.speed || 1) * (m.speed || 1);
                        h.stop = "undefined" !== typeof d ? d : h.stop;
                        h.duration = f.infiniteDuration ? Infinity : m.duration ||
                            (m.isEmpty() ? 0 : C.DEFAULT_DURATION);
                        if (void 0 === h.duration) throw q.player(t.P.DURATION_IS_NOT_KNOWN, f);
                        h.__startTime = Date.now();
                        h.__redraws = 0;
                        h.__rsec = 0;
                        h.__prevt = 0;
                        h.happens !== e.STOPPED || f.repeating || f.fire(e.S_REPORT_STATS);
                        y.getAnmProps(f.ctx).factor = this.factor();
                        h.happens = e.PLAYING;
                        h.__lastReq = E.loop(f.ctx, f, m, f.__beforeFrame(m), f.__afterFrame(m), f.__userBeforeRender, f.__userAfterRender);
                        f.fire(e.S_CHANGE_STATE, e.PLAYING);
                        f.fire(e.S_PLAY, h.from);
                        return f
                    }
            else if (!f._playLock) {
                f._playLock = !0;
                var h =
                    f._postponedLoad,
                    g = arguments;
                if (!h) throw q.player(t.P.NO_LOAD_CALL_BEFORE_PLAY, f);
                var x = h[3];
                h[3] = function () {
                    x && x.apply(f, arguments);
                    f._postponedLoad = null;
                    f._playLock = !1;
                    f._lastReceivedAnimationId = f.anim.id;
                    b.prototype.play.apply(f, g)
                };
                b.prototype.load.apply(f, h)
            }
        };
        b.prototype.stop = function () {
            this._ensureHasState();
            var a = this.state;
            if (a.happens === e.RES_LOADING && this.loadingMode === e.LM_ONREQUEST) this._postpone("stop", arguments);
            else {
                a.happens !== e.PLAYING && a.happens !== e.PAUSED || m(a.__lastReq);
                a.time =
                    b.NO_TIME;
                a.from = 0;
                a.stop = b.NO_TIME;
                var c = this.anim;
                c || this.loadingMode == e.LM_ONPLAY && this._postponedLoad ? (a.happens = e.STOPPED, this._drawStill(), this.fire(e.S_CHANGE_STATE, e.STOPPED)) : a.happens !== e.ERROR && (a.happens = e.NOTHING, this.controls || this._drawSplash(), this.fire(e.S_CHANGE_STATE, e.NOTHING));
                this.fire(e.S_STOP);
                c && c.reset();
                return this
            }
        };
        b.prototype.pause = function () {
            if (this.state.happens === e.RES_LOADING && this.loadingMode === e.LM_ONREQUEST) return this._postpone("pause", arguments), this;
            this._ensureHasState();
            this._ensureHasAnim();
            var a = this.state;
            if (a.happens === e.STOPPED) return this.anim.reset(), this;
            a.happens === e.PLAYING && (m(a.__lastReq), this.anim.handlePause());
            a.time > a.duration && (a.time = a.duration);
            a.from = a.time;
            a.happens = e.PAUSED;
            a.time !== b.NO_TIME && this.drawAt(a.time);
            this.fire(e.S_CHANGE_STATE, e.PAUSED);
            this.fire(e.S_PAUSE, a.time);
            return this
        };
        b.prototype.seek = function (a) {
            return this.state.happens === e.PAUSED ? this.play(a).pause() : this.pause().play(a)
        };
        b.prototype.onerror = function (a) {
            this.__err_handler =
                a;
            return this
        };
        n(b, [e.S_IMPORT, e.S_CHANGE_STATE, e.S_LOAD, e.S_RES_LOAD, e.S_PLAY, e.S_PAUSE, e.S_STOP, e.S_COMPLETE, e.S_REPEAT, e.S_ERROR, e.S_LOADING_PROGRESS, e.S_TIME_UPDATE, e.S_INTERACTIVITY, e.S_REPORT_STATS]);
        b.prototype._prepare = function (c) {
            if (!c) throw q.player(t.P.NO_WRAPPER_PASSED, this);
            var f;
            if (g.str(c)) {
                if (f = y.getElementById(c), !c) throw q.player(a.strf(t.P.NO_WRAPPER_WITH_ID, [c]), this);
            } else c.id || (c.id = "anm-player-" + b.__instances), f = c;
            c = y.assignPlayerToWrapper(f, this, "anm-player-" + b.__instances);
            this.id = c.id;
            this.wrapper = c.wrapper;
            this.canvas = c.canvas;
            if (!y.checkPlayerCanvas(this.canvas)) throw q.player(t.P.CANVAS_NOT_VERIFIED, this);
            this.ctx = y.getContext(this.canvas, "2d");
            this.state = b.createState(this);
            this.fire(e.S_CHANGE_STATE, e.NOTHING);
            this.subscribeEvents(this.canvas);
            this.__canvasPrepared = !0
        };
        b.prototype._addOpts = function (a) {
            this.debug = g.defined(a.debug) ? a.debug : this.debug;
            this.repeat = g.defined(a.repeat) ? a.repeat : this.repeat;
            this.autoPlay = g.defined(a.autoPlay) ? a.autoPlay : this.autoPlay;
            this.startFrom = g.defined(a.startFrom) ? a.startFrom : this.startFrom;
            this.stopAt = g.defined(a.stopAt) ? a.stopAt : this.stopAt;
            this.zoom = a.zoom || this.zoom;
            this.speed = a.speed || this.speed;
            this.bgColor = a.bgColor || this.bgColor;
            this.width = a.width || this.width;
            this.height = a.height || this.height;
            this.ribbonsColor = a.ribbonsColor || this.ribbonsColor;
            this.thumbnailSrc = a.thumbnail || this.thumbnailSrc;
            this.loadingMode = g.defined(a.loadingMode) ? a.loadingMode : this.loadingMode;
            this.audioEnabled = g.defined(a.audioEnabled) ? a.audioEnabled :
                this.audioEnabled;
            this.globalVolume = g.defined(a.volume) ? a.volume : this.globalVolume;
            this.imagesEnabled = g.defined(a.imagesEnabled) ? a.imagesEnabled : this.imagesEnabled;
            this.videoEnabled = g.defined(a.videoEnabled) ? a.videoEnabled : this.videoEnabled;
            this.shadowsEnabled = g.defined(a.shadowsEnabled) ? a.shadowsEnabled : this.shadowsEnabled;
            this.controlsEnabled = g.defined(a.controlsEnabled) ? a.controlsEnabled : this.controlsEnabled;
            this.controlsInvisible = g.defined(a.controlsInvisible) ? a.controlsInvisible : this.controlsInvisible;
            this.infoEnabled = g.defined(a.infoEnabled) ? a.infoEnabled : this.infoEnabled;
            this.handleEvents = g.defined(a.handleEvents) ? a.handleEvents : this.handleEvents;
            this.drawStill = g.defined(a.drawStill) ? a.drawStill : this.drawStill;
            this.infiniteDuration = g.defined(a.infiniteDuration) ? a.infiniteDuration : this.infiniteDuration;
            this.forceAnimationSize = g.defined(a.forceAnimationSize) ? a.forceAnimationSize : this.forceAnimationSize;
            this.stretchToCanvas = g.defined(a.stretchToCanvas) ? a.stretchToCanvas : this.stretchToCanvas;
            this.muteErrors =
                g.defined(a.muteErrors) ? a.muteErrors : this.muteErrors;
            g.defined(a.mode) && this.mode(a.mode)
        };
        b.prototype._checkOpts = function () {
            if (this.canvas) {
                if (!this.width || !this.height) {
                    var a = y.getCanvasSize(this.canvas);
                    this.width = a[0];
                    this.height = a[1]
                }
                this._resize(this.width, this.height);
                this.bgColor && y.setCanvasBackground(this.canvas, this.bgColor);
                this.anim && this.handleEvents && this.__subscribeDynamicEvents(this.anim);
                this.controlsEnabled && !this.controls ? (this._enableControls(), this.infoEnabled ? this._enableInfo() :
                    this._disableInfo()) : !this.controlsEnabled && this.controls && (this._disableInfo(), this._disableControls());
                this.ctx && (y.getAnmProps(this.ctx).skip_shadows = !this.shadowsEnabled);
                this.thumbnailSrc && this.thumbnail(this.thumbnailSrc)
            }
        };
        b.prototype._postInit = function () {
            this.stop();
            var a = y.hasUrlToLoad(this.wrapper);
            a.url || (a = y.hasUrlToLoad(this.canvas));
            if (a.url) {
                var b = null;
                a.importer_id && anm.importers.isAccessible(a.importer_id) && (b = anm.importers.create(a.importer_id));
                this.load(a.url, b)
            }
        };
        b.prototype.mode =
            function (a) {
                this.infiniteDuration = a & e.M_INFINITE_DURATION || void 0;
                this.handleEvents = a & e.M_HANDLE_EVENTS || void 0;
                this.controlsEnabled = a & e.M_CONTROLS_ENABLED || void 0;
                this.infoEnabled = a & e.M_INFO_ENABLED || void 0;
                this.drawStill = a & e.M_DRAW_STILL || void 0;
                return this
            };
        b.prototype.rect = function (a) {
            if (!a) return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
            this.x = a.x;
            this.y = a.y;
            this.width = a.width;
            this.height = a.height;
            this._moveTo(a.x, a.y);
            this._resize(a.width, a.height);
            return this
        };
        b.prototype.forceRedraw =
            function () {
                switch (this.state.happens) {
                    case e.STOPPED:
                        this.stop();
                        break;
                    case e.PAUSED:
                        this.anim && this.drawAt(this.state.time);
                        break;
                    case e.PLAYING:
                        this.anim && this._stopAndContinue();
                        break;
                    case e.NOTHING:
                        this.controls || this._drawSplash()
                }
            };
        b.prototype.drawAt = function (c) {
            if (c === b.NO_TIME) throw q.player(t.P.PASSED_TIME_VALUE_IS_NO_TIME, this);
            if (this.state.happens === e.RES_LOADING && this.loadingMode === e.LM_ONREQUEST) this._postpone("drawAt", arguments);
            else {
                if (0 > c || !this.infiniteDuration && c > this.anim.duration) throw q.player(a.strf(t.P.PASSED_TIME_NOT_IN_RANGE, [c]), this);
                var d = this.anim,
                    f = this.__userBeforeRender,
                    m = this.__userAfterRender;
                y.getAnmProps(this.ctx).factor = this.factor();
                d.__informEnabled = !1;
                E.at(c, 0, this.ctx, this.anim, this.width, this.height, this.zoom, this.ribbonsColor, this.stretchToCanvas, f, function (a, b) {
                    m && m(a, b);
                    d.reset();
                    d.__informEnabled = !0
                });
                return this
            }
        };
        b.prototype.size = function (a, b) {
            if (!g.defined(a)) return [this.width, this.height];
            this.__userSize = [a, b];
            this._resize();
            return this
        };
        b.prototype.factor = function () {
            if (this.anim) return this.anim.width ===
                this.width && this.anim.height === this.height ? 1 : Math.min(this.width / this.anim.width, this.height / this.anim.height)
        };
        b.prototype.factorData = function () {
            if (this.anim) {
                var b = a.fit_rects(this.width, this.height, this.anim.width, this.anim.height);
                return {
                    factor: b[0],
                    anim_rect: b[1],
                    ribbon_one: b[2] || null,
                    ribbon_two: b[3] || null
                }
            }
        };
        b.prototype.thumbnail = function (b, c, d) {
            if (!b) return this.thumbnailSrc;
            var f = this;
            if (!(f.__thumbLoading || f.__thumb && f.__thumb.src == b)) {
                if (f.ctx) {
                    var h = y.PX_RATIO,
                        m = f.ctx;
                    m.save();
                    m.clearRect(0,
                        0, f.width * h, f.height * h);
                    m.restore()
                }
                var g = new x(b);
                f.__thumbLoading = !0;
                g.load(a.guid(), f, function () {
                    f.__thumbLoading = !1;
                    f.__thumb = g;
                    if (c || d) f.__thumbSize = [c, d];
                    f.state.happens !== e.PLAYING && f.state.happens !== e.PAUSED && f._drawStill()
                }, function () {
                    return !0
                })
            }
        };
        b.prototype.detach = function () {
            y.playerAttachedTo(this.wrapper, this) && (z.fire(e.S_PLAYER_DETACH, this), this.stop(), this.controls && this.controls.detach(this.wrapper), y.detachPlayer(this), this.ctx && y.clearAnmProps(this.ctx), this._reset(), w.cancel(this.id))
        };
        b.prototype.attachedTo = function (a) {
            return y.playerAttachedTo(a, this)
        };
        b.prototype.isAttached = function () {
            return y.playerAttachedTo(this.wrapper, this)
        };
        b.attachedTo = function (a, b) {
            return y.playerAttachedTo(a, b)
        };
        b.prototype.invalidate = function () {
            this.controls && this.controls.update(this.canvas)
        };
        b.__invalidate = function (a) {
            return function (b) {
                a.invalidate()
            }
        };
        b.prototype.beforeFrame = function (a) {
            if (this.state.happens === e.PLAYING) throw q.player(t.P.BEFOREFRAME_BEFORE_PLAY, this);
            this.__userBeforeFrame = a
        };
        b.prototype.afterFrame = function (a) {
            if (this.state.happens === e.PLAYING) throw q.player(t.P.AFTERFRAME_BEFORE_PLAY, this);
            this.__userAfterFrame = a
        };
        b.prototype.beforeRender = function (a) {
            if (this.state.happens === e.PLAYING) throw q.player(t.P.BEFORENDER_BEFORE_PLAY, this);
            this.__userBeforeRender = a
        };
        b.prototype.afterRender = function (a) {
            if (this.state.happens === e.PLAYING) throw q.player(t.P.AFTERRENDER_BEFORE_PLAY, this);
            this.__userAfterRender = a
        };
        b.prototype.subscribeEvents = function (a) {
            var c = b.__invalidate(this);
            y.subscribeWindowEvents({
                load: c
            });
            y.subscribeCanvasEvents(a, {
                mouseover: function (a) {
                    return function (b) {
                        d.autoFocus && a.handleEvents && a.canvas && a.canvas.focus();
                        return !0
                    }
                }(this),
                mouseout: function (a) {
                    return function (b) {
                        d.autoFocus && a.handleEvents && a.canvas && a.canvas.blur();
                        return !0
                    }
                }(this)
            })
        };
        b.prototype.mute = function () {
            this.muted || this.toggleMute()
        };
        b.prototype.unmute = function () {
            this.muted && this.toggleMute()
        };
        b.prototype.toggleMute = function () {
            this.muted = !this.muted;
            this.anim && this.anim.traverse(function (a) {
                a.$audio && a.$audio.toggleMute()
            })
        };
        b.prototype.volume = function (a) {
            if ("undefined" === typeof a) return this.globalVolume;
            this.globalVolume = a;
            this._updateMediaVolumes()
        };
        b.prototype._updateMediaVolumes = function () {
            var a = this;
            a.anim && a.anim.traverse(function (b) {
                b.$audio && b.$audio.setVolume(a.globalVolume)
            })
        };
        b.prototype._drawEmpty = function () {
            var a = this.ctx,
                c = this.width,
                d = this.height;
            a.save();
            var m = y.PX_RATIO;
            a.fillStyle = b.EMPTY_BG;
            a.fillRect(0, 0, c * m, d * m);
            a.restore()
        };
        b.prototype._drawStill = function () {
            var a = this.state,
                c = this.anim;
            this.drawStill ?
                this.__thumb ? this._drawThumbnail() : c && (!this.infiniteDuration && g.finite(c.duration) ? this.drawAt(c.duration * b.PREVIEW_POS) : this.drawAt(a.from)) : this._drawEmpty()
        };
        b.prototype._drawThumbnail = function () {
            var b = this.__thumbSize || this.__thumb.bounds(),
                c = b.width,
                d = b.height,
                m = this.width,
                e = this.height,
                g = y.PX_RATIO,
                b = this.ctx;
            b.save();
            1 != g && b.scale(g, g);
            if (c != m || d != e) {
                e = a.fit_rects(m, e, c, d);
                c = e[0];
                d = e[1];
                m = e[2];
                e = e[3];
                if (m || e) b.fillStyle = this.ribbonsColor || "#000", m && b.fillRect(m[0], m[1], m[2], m[3]), e && b.fillRect(e[0],
                    e[1], e[2], e[3]);
                d && (b.beginPath(), b.rect(d[0], d[1], d[2], d[3]), b.clip(), b.translate(d[0], d[1]));
                1 != c && b.scale(c, c)
            }
            this.__thumb.apply(b);
            b.restore()
        };
        b.prototype._drawSplash = function () {
            this.controls || this.__thumbLoading || this.__thumb && this.drawStill && this._drawThumbnail()
        };
        b.prototype._drawLoadingSplash = function (a) {
            if (!this.controls) {
                this._drawSplash();
                var b = this.ctx;
                b.save();
                b.setTransform(1, 0, 0, 1, 0, 0);
                b.fillStyle = "#006";
                b.font = "12px sans-serif";
                b.fillText(a || u.LOADING, 20, 25);
                b.restore()
            }
        };
        b.prototype._drawErrorSplash =
            function (a) {
                if (this.canvas && this.ctx && !this.controls) {
                    this._drawSplash();
                    var b = this.ctx;
                    b.save();
                    b.setTransform(1, 0, 0, 1, 0, 0);
                    b.fillStyle = "#006";
                    b.font = "14px sans-serif";
                    b.fillText(u.ERROR + (a ? ": " + (a.message || typeof Error) : "") + ".", 20, 25);
                    b.restore()
                }
            };
        b.prototype.toString = function () {
            return "[ Player '" + this.id + "' ]"
        };
        b.prototype._reset = function () {
            var a = this.state;
            this.loadingMode === e.LM_ONREQUEST && a.happens === e.RES_LOADING && (this._clearPostpones(), w.cancel(this.id));
            a.happens = e.NOTHING;
            a.from = 0;
            a.time =
                b.NO_TIME;
            a.duration = void 0;
            this.fire(e.S_CHANGE_STATE, e.NOTHING);
            this.controls && this.controls.reset();
            this.ctx.clearRect(0, 0, this.width * y.PX_RATIO, this.height * y.PX_RATIO)
        };
        b.prototype._stopAndContinue = function () {
            var a = this.state,
                b = a.__lastPlayConf,
                a = a.time;
            this.stop();
            this.play(a, b[1], b[2])
        };
        b.prototype._moveTo = function (a, b) {
            y.setCanvasPosition(this.canvas, a, b)
        };
        b.prototype._resize = function (a, b) {
            var c = this.canvas,
                d = this.__userSize || [a, b],
                f = y.getCanvasParameters(c);
            if (!f || f[0] !== d[0] || f[1] !== d[1]) return d[0] &&
                d[1] || (d = f), y.setWrapperSize(this.wrapper, d[0], d[1]), y.setCanvasSize(c, d[0], d[1]), this.width = d[0], this.height = d[1], y.updateCanvasOverlays(c), this.ctx && (y.getAnmProps(this.ctx).factor = this.factor()), this.controls && this.controls.handleAreaChange(), this.forceRedraw(), d
        };
        b.prototype._restyle = function (a) {
            y.setCanvasBackground(this.canvas, a);
            this.forceRedraw()
        };
        b.prototype._enableControls = function () {
            this.controls || (this.controls = new r(this));
            this.controls.enable()
        };
        b.prototype._disableControls = function () {
            this.controls &&
                (this.controls.disable(), this.controls = null)
        };
        b.prototype._enableInfo = function () {
            this.controls && this.controls.enableInfo()
        };
        b.prototype._disableInfo = function () {
            this.controls && this.controls.disableInfo()
        };
        b.prototype.__subscribePlayingEvents = function (a) {
            if (!this.__anim_handlers || !this.__anim_handlers[a.id]) {
                var b = {};
                b[e.A_START] = this.on(e.S_PLAY, function () {
                    a.fire(e.A_START)
                });
                b[e.A_PAUSE] = this.on(e.S_PAUSE, function () {
                    a.fire(e.A_PAUSE)
                });
                b[e.A_STOP] = this.on(e.S_STOP, function () {
                    a.fire(e.A_STOP)
                });
                this.__anim_handlers ||
                    (this.__anim_handlers = {});
                this.__anim_handlers[a.id] = b
            }
        };
        b.prototype.__unsubscribePlayingEvents = function (a) {
            if (this.__anim_handlers) {
                var b = this.__anim_handlers[a.id];
                b && (this.unbind(e.S_PLAY, b[e.A_START]), this.unbind(e.S_PAUSE, b[e.A_PAUSE]), this.unbind(e.S_STOP, b[e.STOP]), this.__anim_handlers[a.id] = null)
            }
        };
        b.prototype.__subscribeDynamicEvents = function (a) {
            d.setTabindex && y.setTabIndex(this.canvas, this.__instanceNum);
            if (a) {
                var b = !1;
                if (this.__boundTo)
                    for (var c = 0, f = this.__boundTo, m = f.length; c < m; c++) a.id ===
                        f[c][0] && this.canvas === f[c][1] && (b = !0);
                else this.__boundTo = [];
                b || (this.__boundTo.push([a.id, this.canvas]), a.on(e.X_ERROR, this.__onerror()), a.subscribeEvents(this.canvas))
            }
        };
        b.prototype.__unsubscribeDynamicEvents = function (a) {
            d.setTabindex && y.setTabIndex(this.canvas, void 0);
            if (a && this.__boundTo) {
                for (var b = -1, c = 0, f = this.__boundTo, m = f.length; c < m; c++) a.id === f[c][0] && (b = c, a.unsubscribeEvents(f[c][1]));
                0 <= b && this.__boundTo.splice(b, 1)
            }
        };
        b.prototype._ensureHasState = function () {
            if (!this.state) throw q.player(t.P.NO_STATE,
                this);
        };
        b.prototype._ensureHasAnim = function () {
            if (!this.anim) throw q.player(t.P.NO_ANIMATION, this);
        };
        b.prototype.__beforeFrame = function (a) {
            return function (a, c, d, f) {
                return function (m) {
                    d.clearAllLaters();
                    if (c.happens !== e.PLAYING) return !1;
                    if (c.stop !== b.NO_TIME && m >= c.from + c.stop || g.finite(c.duration) && m > c.duration + b.PEFF) return a.fire(e.S_COMPLETE), c.time = 0, a.stop(), a.repeat || !g.defined(a.repeat) && d.repeat ? (a.repeating = !0, a.play(), a.fire(e.S_REPEAT)) : !a.infiniteDuration && g.finite(c.duration) && a.drawAt(c.duration), !1;
                    f && f(m, a.ctx);
                    return !0
                }
            }(this, this.state, a, this.__userBeforeFrame)
        };
        b.prototype.__afterFrame = function (a) {
            return function (a, b, c, d) {
                return function (a) {
                    d && d(a);
                    c.invokeAllLaters();
                    return !0
                }
            }(this, this.state, a, this.__userAfterFrame)
        };
        b.prototype.__onerror = function () {
            var a = this;
            return function (b) {
                return a.__onerror_f(b)
            }
        };
        b.prototype.__onerror_f = function (a) {
            var b = this.muteErrors,
                b = b && !(a instanceof q.SystemError);
            try {
                this.state && (this.state.happens = e.ERROR), this.__lastError = a, this.fire(e.S_CHANGE_STATE,
                    e.ERROR), this.anim = null
            } catch (B) {
                throw B;
            }
            try {
                !this.state || this.state.happens == e.NOTHING && this.state.happens == e.STOPPED || this.__unsafe_stop()
            } catch (B) {}
            b = this.__err_handler && this.__err_handler(a) || b;
            if (!b) {
                try {
                    this._drawErrorSplash(a)
                } catch (B) {}
                throw a;
            }
        };
        b.prototype._clearPostpones = function () {
            this._queue = []
        };
        b.prototype._postpone = function (a, b) {
            this._queue || (this._queue = []);
            this._queue.push([a, b])
        };
        b.prototype._callPostpones = function () {
            if (this._queue && this._queue.length)
                for (var a = this._queue, b, c =
                        0, d = a.length; c < d; c++) b = a[c], this[b[0]].apply(this, b[1]);
            this._queue = []
        };
        b.createState = function (a) {
            return {
                happens: e.NOTHING,
                time: b.NO_TIME,
                from: 0,
                stop: b.NO_TIME,
                afps: 0,
                speed: 1,
                duration: void 0,
                __startTime: -1,
                __redraws: 0,
                __rsec: 0
            }
        };
        b.forSnapshot = function (a, c, d, m, e) {
            var f = new b;
            f.init(a, e);
            f.load(c, d, m);
            return f
        };
        b.prototype._applyUrlParamsToAnimation = function (a) {
            g.defined(a.t) ? (this.state.happens === e.PLAYING && this.stop(), this.play(a.t / 100)) : g.defined(a.from) ? (this.state.happens === e.PLAYING && this.stop(),
                this.play(a.from / 100)) : g.defined(a.p) ? (this.state.happens === e.PLAYING && this.stop(), this.play(a.p / 100).pause()) : g.defined(a.at) && (this.state.happens === e.PLAYING && this.stop(), this.play(a.at / 100).pause())
        };
        b.prototype._applyTimeOptionsIfSet = function () {
            this.autoPlay ? (this.state.happens === e.PLAYING && this.stop(), this.play(this.startFrom || this.state.from || 0)) : this.startFrom ? (this.state.happens === e.PLAYING && this.stop(), this.play(this.startFrom)) : this.stopAt && this.pause(this.stopAt)
        };
        v.exports = b
    }, {
        "./animation/animation.js": 3,
        "./animation/element.js": 6,
        "./conf.js": 11,
        "./constants.js": 12,
        "./errors.js": 13,
        "./events.js": 14,
        "./global_opts.js": 15,
        "./graphics/sheet.js": 22,
        "./loader.js": 26,
        "./loc.js": 27,
        "./log.js": 28,
        "./player_manager.js": 33,
        "./render.js": 34,
        "./resource_manager.js": 35,
        "./ui/controls.js": 36,
        "./utils.js": 39,
        engine: 40
    }],
    33: [function (c, v, n) {
        function b() {
            this.hash = {};
            this.instances = [];
            this._initHandlers()
        }
        n = c("./events.js");
        var e = c("./constants.js");
        c = c("engine");
        n.provideEvents(b, [e.S_NEW_PLAYER, e.S_PLAYER_DETACH]);
        b.prototype.filterEvent = function (a, b) {
            a == e.S_NEW_PLAYER && (this.hash[b.id] = b, this.instances.push(b));
            return !0
        };
        b.prototype.getPlayer = function (a) {
            return this.hash[a]
        };
        b.prototype.handleDocumentHiddenChange = function (a) {
            var b, c;
            for (b = 0; b < this.instances.length; b++) c = this.instances[b], a && c.state.happens === e.PLAYING ? (c._pausedViaHidden = !0, c.pause()) : !a && c._pausedViaHidden && (c._pausedViaHidden = !1, c.play(c.state.from))
        };
        var a = new b;
        c.onDocumentHiddenChange(function (b) {
            a.handleDocumentHiddenChange(b)
        });
        v.exports =
            a
    }, {
        "./constants.js": 12,
        "./events.js": 14,
        engine: 40
    }],
    34: [function (c, v, n) {
        function b(a, c, k, r, p, q, u) {
            "undefined" === typeof y[c.id] && (y[c.id] = 0);
            var x = c.state;
            if (x.happens === d.PLAYING) {
                var m = Date.now() - x.__startTime,
                    f = m / 1E3 * x.speed + x.from,
                    h = f - x.__prevt;
                x.time = f;
                x.__dt = h;
                x.__prevt = f;
                if (!r || r(f))
                    if (0 === x.__rsec && (x.__rsec = m), 1E3 <= m - x.__rsec && (x.afps = x.__redraws, x.__rsec = m, x.__redraws = 0), x.__redraws++, e(f, h, a, k, c.width, c.height, c.zoom, c.ribbonsColor, c.stretchToCanvas, q, u), c.debug && g(a, x.afps, f), !p || p(f)) return y[c.id] +=
                        h, 1 <= y[c.id] && (c.fire(d.S_TIME_UPDATE, f), y[c.id] = 0), x.__lastReq = t(function () {
                            b(a, c, k, r, p, q, u)
                        })
            }
        }

        function e(b, c, d, e, g, k, p, x, m, f, h) {
            d.save();
            var r = u.PX_RATIO;
            1 !== r && d.scale(r, r);
            g |= 0;
            k |= 0;
            r = g != e.width || k != e.height;
            e.factor = 1 * (p || 1) * (e.zoom || 1);
            var w = m ? g / e.width * p : p,
                q = m ? k / e.height * p : p;
            !r || m ? (d.clearRect(0, 0, e.width, e.height), f && f(b, d), 1 == w && 1 == q || d.scale(w, q), e.render(d, b, c), h && h(b, d), d.restore()) : a(d, e, g, k, e.width, e.height, x, function (a) {
                d.clearRect(0, 0, e.width, e.height);
                f && f(b, d);
                1 == w && 1 == q || d.scale(w,
                    q);
                e.render(d, b, c);
                h && h(b, d);
                d.restore()
            })
        }

        function a(a, b, c, d, e, g, k, x) {
            g = q(c, d, e, g);
            c = g[0];
            d = g[1];
            e = g[2];
            g = g[3];
            a.save();
            if (e || g) a.save(), a.fillStyle = k || "#000", e && (a.clearRect(e[0], e[1], e[2], e[3]), a.fillRect(e[0], e[1], e[2], e[3])), g && (a.clearRect(g[0], g[1], g[2], g[3]), a.fillRect(g[0], g[1], g[2], g[3])), a.restore();
            d && (a.beginPath(), u.isIE10 && (d[0] = Math.floor(d[0]), d[1] = Math.floor(d[1]), d[2] = Math.ceil(d[2]), d[3] = Math.ceil(d[3])), a.rect(d[0], d[1], d[2], d[3]), a.clip(), a.translate(d[0], d[1]));
            b.factor *= c;
            1 != c && a.scale(c, c);
            x(c);
            a.restore()
        }

        function g(a, b, c) {
            a.fillStyle = "#999";
            a.font = "20px sans-serif";
            a.fillText(Math.floor(b), 8, 20);
            a.font = "10px sans-serif";
            a.fillText(Math.floor(1E3 * c) / 1E3, 8, 35)
        }
        var d = c("./constants.js");
        n = c("./animation/painter.js");
        var p = c("./animation/modifier.js"),
            k = c("./graphics/brush.js"),
            u = c("engine"),
            t = u.getRequestFrameFunc(),
            q = c("./utils.js").fit_rects;
        c = {};
        var y = {};
        c.loop = b;
        c.at = e;
        c.drawFPS = g;
        c.p_drawVisuals = new n(function (a) {
            this.applyVisuals(a)
        }, d.PNT_SYSTEM);
        c.p_applyAComp =
            new n(function (a) {
                this.applyAComp(a)
            }, d.PNT_SYSTEM);
        c.p_drawBounds = new n(function (a, b) {
            var c = this.myBounds();
            if (c && !this.isEmpty()) {
                var d = this.isEmpty() ? "#f00" : "#600",
                    e = c.width,
                    c = c.height;
                a.save();
                a.beginPath();
                a.lineWidth = 1;
                a.strokeStyle = d;
                a.moveTo(0, 0);
                a.lineTo(e, 0);
                a.lineTo(e, c);
                a.lineTo(0, c);
                a.lineTo(0, 0);
                a.closePath();
                a.stroke();
                a.restore()
            }
        }, d.PNT_DEBUG);
        c.p_drawPivot = new n(function (a, b) {
            if (b = b || this.$pivot) {
                var c = this.myBounds(),
                    d = this.isEmpty() ? "#600" : "#f00";
                a.save();
                c && a.translate(b[0] * c.width,
                    b[1] * c.height);
                a.beginPath();
                a.lineWidth = 1;
                a.strokeStyle = d;
                a.moveTo(0, -10);
                a.lineTo(0, 0);
                a.moveTo(3, 0);
                a.arc(0, 0, 3, 0, 2 * Math.PI, !0);
                a.closePath();
                a.stroke();
                a.restore()
            }
        }, d.PNT_DEBUG);
        c.p_drawReg = new n(function (a, b) {
            if (b = b || this.$reg) a.save(), a.lineWidth = 1, a.strokeStyle = "#00f", a.fillStyle = "rgba(0,0,255,.3)", a.translate(b[0], b[1]), a.beginPath(), a.moveTo(-4, -4), a.lineTo(4, -4), a.lineTo(4, 4), a.lineTo(-4, 4), a.lineTo(-4, -4), a.closePath(), a.stroke(), a.beginPath(), a.moveTo(0, -10), a.lineTo(0, 0), a.moveTo(3,
                0), a.closePath(), a.stroke(), a.restore()
        }, d.PNT_DEBUG);
        c.p_drawName = new n(function (a, b) {
            if (b = b || this.name) a.save(), a.fillStyle = "#666", a.font = "12px sans-serif", a.fillText(b, 0, 10), a.restore()
        }, d.PNT_DEBUG);
        c.p_drawMPath = new n(function (a, b) {
            if (b = b || this.$mpath) a.save(), k.qstroke(a, "#600", 2), a.beginPath(), b.apply(a), a.closePath(), a.stroke(), a.restore()
        }, d.PNT_DEBUG);
        c.m_checkBand = new p(function (a, b, c) {
            if (c[0] > b * a || c[1] < b * a) return !1
        }, d.MOD_SYSTEM);
        v.exports = c
    }, {
        "./animation/modifier.js": 7,
        "./animation/painter.js": 8,
        "./constants.js": 12,
        "./graphics/brush.js": 17,
        "./utils.js": 39,
        engine: 40
    }],
    35: [function (c, v, n) {
            function b(b) {
                a.logResMan && g.debug(b)
            }

            function e() {
                this._cache = {};
                this._errors = {};
                this._waiting = {};
                this._subscriptions = {};
                this._onprogress = {};
                this._url_to_subjects = {}
            }
            var a = c("./conf.js"),
                g = c("./log.js"),
                d = c("./utils.js").is,
                p = c("./errors.js");
            e.prototype.subscribe = function (a, c, e, g) {
                if (!a) throw p.system("Subject ID is empty");
                if (!this._subscriptions[a]) {
                    var k = [];
                    b("subscribing " + e.length + " to " + c.length + " urls: " +
                        c);
                    for (var q = {}, t = 0; t < c.length; t++) c[t] && !q[c[t]] && (q[c[t]] = !0, k.push(c[t]), this._url_to_subjects[c[t]] || (this._url_to_subjects[c[t]] = []), this._url_to_subjects[c[t]].push(a));
                    b("filtered from " + c.length + " to " + k.length);
                    this._subscriptions[a] = [k, d.arr(e) ? e : [e]];
                    g && (this._onprogress[a] = function (a) {
                        var b = {},
                            c = 1 / a.length,
                            d = 0,
                            e = 0;
                        return function (a, m) {
                            var f = b[a] || 0; - 1 !== m ? (d += (m - f) * c, b[a] = m) : (d -= f, e += f);
                            g(a, m, d, e)
                        }
                    }(k))
                }
            };
            e.prototype.loadOrGet = function (a, c, d, e, g) {
                var k = this;
                if (!a) throw p.system("Subject ID is empty");
                if (!c) throw p.system("Given URL is empty");
                var q = k._onprogress[a];
                b("request to load " + c);
                k._cache[c] ? (b("> already received, trigerring success"), a = k._cache[c], e && e(a), k.trigger(c, a), q && q(c, 1)) : k._errors[c] ? (b("> failed to load before, notifying with error"), g && g(k._errors[c]), q && q(c, -1)) : k._waiting[a] && k._waiting[a] && k._waiting[a][c] ? (b("> someone is already waiting for it, subscribing"), d = a, k._subscriptions[a] && k._onprogress[a] && (d = a + "-" + Math.floor((new Date).getTime() + 1E3 * Math.random()), k._onprogress[d] =
                    k._onprogress[a]), k.subscribe(d, [c], function (a) {
                    a[0] ? (e(a[0]), q && q(c, 1)) : (g(a[0]), q && q(c, -1))
                })) : (b("> not cached, requesting"), k._waiting[a] || (k._waiting[a] = {}), k._waiting[a][c] = d, d(function (a) {
                    a = a || !0;
                    b("file at " + c + " succeeded to load, triggering success");
                    k.trigger(c, a);
                    e && e(a);
                    q && q(c, 1);
                    k.check()
                }, function (a) {
                    b("file at " + c + " failed to load, triggering error");
                    k.error(c, a);
                    g && g(a);
                    q && q(c, -1);
                    k.check()
                }, q ? function (a) {
                    q(c, a)
                } : function () {}))
            };
            e.prototype.trigger = function (a, c) {
                if (this._cache[a] ||
                    this._errors[a]) this.check();
                else {
                    b("triggering success for url " + a);
                    var d = this._url_to_subjects[a];
                    if (d)
                        for (var e = 0, g = d.length; e < g; e++) this._waiting[d[e]] && delete this._waiting[d[e]][a];
                    this._cache[a] = c
                }
            };
            e.prototype.error = function (a, c) {
                if (this._cache[a] || this._errors[a]) this.check();
                else {
                    b("triggering error for url " + a);
                    var d = this._url_to_subjects[a];
                    if (d)
                        for (var e = 0, g = d.length; e < g; e++) this._waiting[d[e]] && delete this._waiting[d[e]][a];
                    this._errors[a] = c
                }
            };
            e.prototype.has = function (a) {
                return "undefined" !==
                    typeof this._cache[a]
            };
            e.prototype.check = function () {
                b("checking subscriptions");
                var a = this._subscriptions,
                    c = this._cache,
                    d = this._errors,
                    e = null,
                    g;
                for (g in a) {
                    b("subscription group '" + g + "'");
                    var p = a[g][0],
                        n = a[g][1],
                        v = 0,
                        r = 0,
                        C;
                    C = 0;
                    for (ul = p.length; C < ul; C++) d[p[C]] && v++, c[p[C]] && r++;
                    b("success: " + r + ", errors: " + v + ", ready: " + (r + v === p.length));
                    if (r + v === p.length) {
                        r = [];
                        C = 0;
                        for (ul = p.length; C < ul; C++) r.push(c[p[C]] || d[p[C]]);
                        b("notifying subscribers that " + p + " are all ready");
                        p = 0;
                        for (C = n.length; p < C; p++) n[p](r,
                            v);
                        e || (e = []);
                        e.push(g)
                    }
                }
                if (e)
                    for (c = 0, d = e.length; c < d; c++) b("removing notified subscribers for subject '" + e[c] + "' from queue"), delete a[e[c]]
            };
            e.prototype.cancel = function (a) {
                if (!a) throw p.system("Subject ID is empty");
                if (this._waiting[a]) {
                    var b = this._subscriptions[a][0];
                    if (b)
                        for (var c = 0, d = b.length; c < d; c++) delete this._waiting[a][b[c]]
                }
                delete this._subscriptions[a]
            };
            e.prototype.clear = function () {
                this._cache = {};
                this._errors = {};
                this._waiting = {};
                this._loaders = {};
                this._subscriptions = {}
            };
            v.exports = new e
        },
        {
            "./conf.js": 11,
            "./errors.js": 13,
            "./log.js": 28,
            "./utils.js": 39
        }
    ],
    36: [function (c, v, n) {
        function b(b) {
            this.player = b;
            this.ctx = this.canvas = null;
            this.bounds = [];
            this.info = this.theme = null;
            this.invisible = b.controlsInvisible;
            this.state = {
                happens: a.NOTHING,
                mpos: {
                    x: 0,
                    y: 0
                },
                alpha: 1,
                click: !1,
                changed: !0,
                time: 0,
                gtime: 0,
                fadeTimer: 0,
                fadeMode: 0,
                mouseInteractedAt: 0
            }
        }
        var e = c("../utils.js"),
            a = c("../constants.js");
        c("../loc.js");
        var g = c("engine");
        c("./infoblock.js");
        var d = b.DEFAULT_THEME = c("./controls_theme.json");
        b.THEME =
            b.DEFAULT_THEME;
        b.LAST_ID = 0;
        b.prototype.update = function (a) {
            var c = this.canvas;
            c ? g.updateOverlay(a, c) : (c = g.addCanvasOverlay("ctrls-" + b.LAST_ID, a, [0, 0, 1, 1], function (b) {
                g.registerAsControlsElement(b, a)
            }), b.LAST_ID++, this.id = c.id, this.canvas = c, this.ctx = g.getContext(c, "2d"), this.subscribeEvents(c), this.changeTheme(b.THEME), this.setupRenderLoop());
            this.handleAreaChange();
            this.info && this.info.update(a)
        };
        b.prototype.subscribeEvents = function () {
            var b = this;
            b.player.on(a.S_CHANGE_STATE, function (a) {
                b.state.happens =
                    a;
                b.state.changed = !0
            });
            g.subscribeCanvasEvents(b.canvas, {
                mouseenter: function (a) {
                    b.handleMouseEnter(a)
                },
                mousemove: function (a) {
                    b.handleMouseMove(a)
                },
                mouseleave: function (a) {
                    b.handleMouseLeave()
                },
                mousedown: function (a) {
                    b.handleClick();
                    g.preventDefault(a)
                },
                click: g.preventDefault,
                dblclick: g.preventDefault
            })
        };
        b.prototype.checkMouseTimeout = function (c) {
            this.state.mouseInteracted ? (this.state.mouseInteractedAt = c, this.state.mouseInteracted = !1, this.state.autoHidden = !1, this.show()) : this.state.autoHidden || !(c - this.state.mouseInteractedAt >
                this.theme.fadeTimes.idle) || this.state.happens !== a.PLAYING && this.state.happens !== a.PAUSED || b.isInProgressArea(this.state.mpos, this.bounds[2], this.bounds[3]) || (this.hide(), this.state.autoHidden = !0)
        };
        b.prototype.checkFade = function (a) {
            var b = this.state,
                c = b.fadeMode,
                e = !1;
            0 !== c && (e = !0, b.fadeTimer -= a, a = 1 === c ? Math.min(1, 1 - b.fadeTimer / d.fadeTimes.fadein) : Math.max(0, b.fadeTimer / d.fadeTimes.fadeout), b.alpha = a, 0 >= b.fadeTimer && (b.fadeTimer = 0, b.fadeMode = 0));
            return e
        };
        b.prototype.render = function (b) {
            this.checkMouseTimeout(b);
            var c = b - this.state.gtime;
            this.state.gtime = b;
            this.state.time = this.player.state.time;
            if (!this.invisible && this.bounds && this.state.changed) {
                this.rendering = !0;
                b = this.checkFade(c);
                var c = this.state,
                    k = this.player,
                    r = c.happens,
                    x = c.mpos,
                    m = c.time,
                    f = this.ctx,
                    h = this.theme,
                    p = this.player.state.duration,
                    n = m / (0 !== p ? p : 1),
                    u = this.bounds[2],
                    v = this.bounds[3],
                    F = g.PX_RATIO;
                f.save();
                f.setTransform(1, 0, 0, 1, 0, 0);
                1 != F && f.scale(F, F);
                f.clearRect(0, 0, u, v);
                f.globalAlpha = c.alpha;
                if (r === a.PLAYING) p && (q(f, h, u, v, n), f.save(), F = v - d.bottomControls.height,
                    f.fillStyle = d.button.color, f.fillRect(9, F + 3, 3, 9), f.fillRect(15, F + 3, 3, 9), f.restore(), z(f, h, u, v, m, p, n, x), w(f, u, v, k.muted));
                else if (r === a.STOPPED) t(f, h, u, v), y(f, h, u, v, this.focused), c.changed = !1;
                else if (r === a.PAUSED) p && (q(f, h, u, v, n), f.save(), F = v - d.bottomControls.height, f.strokeStyle = "transparent", f.fillStyle = d.button.color, f.beginPath(), f.moveTo(9, F + 3), f.lineTo(18, F + 7), f.lineTo(9, F + 11), f.lineTo(9, F + 3), f.closePath(), f.fill(), f.restore(), z(f, h, u, v, m, p, n, x), w(f, u, v, k.muted)), t(f, h, u, v), y(f, h, u, v, this.focused),
                    c.changed = !1;
                else if (r === a.NOTHING) c.changed = !1;
                else if (r === a.LOADING || r === a.RES_LOADING) {
                    if (h = this.loadingProgress, k = this.loadingErrors, h || k) f.translate(0, v - d.loading.factorLineWidth), f.strokeStyle = d.loading.factorBackColor, f.lineWidth = d.loading.factorLineWidth, f.beginPath(), f.moveTo(0, 0), f.lineTo(u, 0), f.stroke(), f.strokeStyle = d.loading.factorDoneColor, f.beginPath(), f.moveTo(0, 0), f.lineTo(u * h, 0), f.stroke(), k && (f.strokeStyle = d.loading.factorErrorColor, f.moveTo(u * h, 0), f.lineTo(u * k, 0), f.stroke())
                } else r ===
                    a.ERROR && (t(f, h, u, v), k = k.__lastError, f.save(), f.translate(u / 2, v / 2), f.rotate(Math.PI / 4), f.strokeStyle = "transparent", f.fillStyle = h.button.color, f.fillRect(-25, -3, 50, 6), f.fillRect(-3, -25, 6, 50), f.restore(), A(f, h, u / 2, v / 2 * (1 + h.circle.radius), 1.2 * h.font.statussize, k && k.message ? e.ell_text(k.message, h.error.statuslimit) : k, h.error.color), c.changed = !1);
                f.restore();
                this.info && (r !== a.NOTHING ? (this._infoShown = !0, this.info.render()) : this._infoShown = !1);
                c.changed |= b;
                this.rendering = !1
            }
        };
        b.prototype.react = function () {
            if (!this.hidden) {
                var c =
                    this.player,
                    g = this.state.happens,
                    k = d.progress.buttonWidth;
                if (g !== a.NOTHING && g !== a.LOADING && g !== a.ERROR) {
                    var p = this.state.mpos,
                        x = this.bounds[2],
                        m = this.bounds[3];
                    if (!this.invisible && b.isInProgressArea(p, x, m)) {
                        if (p.x > k && p.x < x - k) {
                            time = e.roundTo(c.state.duration * (p.x - k) / (x - 2 * k), 1);
                            time > c.anim.duration && (time = c.anim.duration);
                            c.seek(time);
                            this.state.time = time;
                            return
                        }
                        if (p.x > x - k) {
                            c.toggleMute();
                            return
                        }
                    }
                    g === a.STOPPED ? c.play(0) : g === a.PAUSED ? c.play(this.state.time) : g === a.PLAYING && c.pause()
                }
            }
        };
        b.prototype.handleAreaChange =
            function () {
                this.player && this.player.canvas && (this.bounds = g.getCanvasBounds(this.canvas))
            };
        b.prototype.handleMouseMove = function (c) {
            this.state.mouseInteracted = !0;
            c = g.getEventPosition(c, this.canvas);
            this.state.mpos.x = c.x;
            this.state.mpos.y = c.y;
            if (this.state.happens === a.PLAYING || this.state.happens === a.PAUSED) b.isInProgressArea(this.state.mpos, this.bounds[2], this.bounds[3]) ? (this.state.changed = !0, this.state.mouseInProgressArea = !0) : (this.state.mouseInProgressArea && (this.state.changed = !0), this.state.mouseInProgressArea = !1)
        };
        b.prototype.handleClick = function () {
            this.state.changed = !0;
            this.state.mouseInteracted = !0;
            this.show();
            this.react()
        };
        b.prototype.handleMouseEnter = function () {
            this.show();
            this.forceNextRedraw()
        };
        b.prototype.handleMouseLeave = function () {
            this.state.happens !== a.PLAYING && this.state.happens !== a.PAUSED || this.hide()
        };
        b.prototype.hide = function () {
            0 !== this.state.alpha && 2 !== this.state.fadeMode && (this.state.fadeMode = 2, this.state.fadeTimer = d.fadeTimes.fadeout - this.state.fadeTimer, this.state.changed = !0)
        };
        b.prototype.show =
            function () {
                1 !== this.state.alpha && 1 !== this.state.fadeMode && (this.state.fadeMode = 1, this.state.fadeTimer = d.fadeTimes.fadein - this.state.fadeTimer, this.state.changed = !0)
            };
        b.prototype.reset = function () {
            this.info && this.info.reset()
        };
        b.prototype.detach = function (a) {
            this.stopRenderLoop();
            g.detachElement(a, this.canvas);
            this.info && this.info.detach(a);
            this.ctx && g.clearAnmProps(this.ctx)
        };
        b.prototype.changeTheme = function (a) {
            this.theme = a;
            this.state.changed = !0
        };
        b.prototype.forceNextRedraw = function () {
            this.state.changed = !0
        };
        b.prototype.enable = function () {
            this.update(this.player.canvas)
        };
        b.prototype.disable = function () {
            this.hide();
            this.detach(this.player.wrapper)
        };
        b.prototype.enableInfo = function () {};
        b.prototype.disableInfo = function () {};
        var p = g.getRequestFrameFunc(),
            k = g.getCancelFrameFunc(),
            u = null;
        b.prototype.setupRenderLoop = function () {
            var a = this,
                b = function (c) {
                    a.render.call(a, c);
                    u = p(b)
                };
            u = p(b)
        };
        b.prototype.stopRenderLoop = function () {
            u && k(u)
        };
        b.isInProgressArea = function (a, b, c) {
            return a.y <= c && a.y >= c - d.bottomControls.height
        };
        var t = function (a, b, c, d, e) {
                a.save();
                c /= 2;
                d /= 2;
                a.beginPath();
                a.fillStyle = b.circle.color;
                a.arc(c, d, b.circle.radius, 0, 2 * Math.PI);
                a.fill();
                a.restore()
            },
            q = function (a, b, c, d, e) {
                a.save();
                var m = b.progress.buttonWidth,
                    f = b.bottomControls.height;
                a.fillStyle = b.progress.backColor;
                a.fillRect(0, d - f, c, f);
                a.fillStyle = b.progress.inactiveColor;
                a.fillRect(m, d - 10, c - 2 * m, 5);
                c = Math.round(e * (c - 2 * m));
                a.fillStyle = b.progress.activeColor;
                a.fillRect(m, d - 10, c, 5);
                a.restore()
            },
            y = function (a, b, c, d, e) {
                a.save();
                c /= 2;
                d /= 2;
                a.strokeStyle =
                    "transparent";
                a.fillStyle = b.button.color;
                a.beginPath();
                a.moveTo(c - 12, d - 20);
                a.lineTo(c - 12, d + 20);
                a.lineTo(c + 18, d);
                a.lineTo(c - 12, d - 20);
                a.closePath();
                a.fill();
                a.restore()
            },
            w = function (a, b, c, e) {
                a.save();
                b -= d.progress.buttonWidth;
                c -= d.bottomControls.height;
                a.strokeStyle = "transparent";
                a.lineWidth = 1;
                a.fillStyle = d.button.color;
                a.beginPath();
                a.translate(b, c);
                a.moveTo(3, 6);
                a.lineTo(6, 6);
                a.lineTo(12, 3);
                a.lineTo(12, 12);
                a.lineTo(6, 9);
                a.lineTo(3, 9);
                a.lineTo(3, 6);
                a.closePath();
                a.fill();
                a.lineWidth = 1;
                a.strokeStyle =
                    d.button.color;
                a.beginPath();
                if (e) a.moveTo(15, 5), a.lineTo(21, 10), a.moveTo(15, 10), a.lineTo(21, 5), a.stroke();
                else
                    for (e = 0; 3 > e; e++) a.beginPath(), a.moveTo(15 + 3 * e, 3), a.bezierCurveTo(18 + 3 * e, 7, 18 + 3 * e, 8, 15 + 3 * e, 12), a.stroke();
                a.restore()
            },
            z = function (a, c, d, g, x, m, f, h) {
                var k = c.progress.buttonWidth;
                b.isInProgressArea(h, d, g) && h.x > k && h.x < d - k && (f = (h.x - k) / (d - 2 * k), x = Math.round(m * f));
                m = k + Math.round(f * (d - 2 * k));
                a.beginPath();
                a.fillStyle = c.progress.backColor;
                a.strokeStyle = "transparent";
                a.clearRect(0, g - 40, d, 20);
                d = Math.min(Math.max(1,
                    m - 17), d - 35);
                m = g - 40;
                f = d + 34;
                h = m + 20;
                a.moveTo(d + 3, m);
                a.lineTo(f - 3, m);
                a.quadraticCurveTo(f, m, f, m + 3);
                a.lineTo(f, m + 20 - 3);
                a.quadraticCurveTo(f, h, f - 3, h);
                a.lineTo(d + 3, h);
                a.quadraticCurveTo(d, h, d, h - 3);
                a.lineTo(d, m + 3);
                a.quadraticCurveTo(d, m, d + 3, m);
                a.moveTo(d + 17 - 3, m + 20);
                a.lineTo(d + 17, m + 20 + 3);
                a.lineTo(d + 17 + 3, m + 20);
                a.closePath();
                a.fill();
                A(a, c, d + 17, g - 30, 8, e.fmt_time(x))
            },
            A = function (a, b, c, d, e, m, f, h) {
                a.save();
                a.font = b.font.weight + " " + Math.floor(e || 15) + "pt " + b.font.face;
                a.textAlign = h || "center";
                a.textBaseline = "middle";
                a.fillStyle = f || b.font.color;
                a.fillText(m, c, d);
                a.restore()
            };
        v.exports = b
    }, {
        "../constants.js": 12,
        "../loc.js": 27,
        "../utils.js": 39,
        "./controls_theme.json": 37,
        "./infoblock.js": 38,
        engine: 40
    }],
    37: [function (c, v, n) {
        v.exports = {
            font: {
                face: "Arial, sans-serif",
                weight: "bold",
                timesize: 13.5,
                statussize: 8.5,
                infosize_a: 10,
                infosize_b: 8,
                color: "white"
            },
            circle: {
                radius: 40,
                color: "rgba(0,0,0,0.7)"
            },
            bottomControls: {
                height: 15
            },
            progress: {
                backColor: "rgba(0,0,0,0.7)",
                activeColor: "white",
                inactiveColor: "rgba(255,255,255,0.5)",
                buttonWidth: 27
            },
            button: {
                color: "white"
            },
            loading: {
                factorBackColor: "rgba(0,0,0,0.7)",
                factorDoneColor: "rgba(255,255,255,0.8)",
                factorErrorColor: "rgba(255,0,0,0.8)",
                factorLineWidth: 14
            },
            fadeTimes: {
                fadein: 300,
                fadeout: 300,
                idle: 2500
            },
            error: {
                statusLimit: 40,
                color: "darkred"
            }
        }
    }, {}],
    38: [function (c, v, n) {
        v.exports = function (b, c) {}
    }, {}],
    39: [function (c, v, n) {
        (function (b) {
            function e() {}
            c("./constants.js");
            c("./errors.js");
            var a = {
                defined: function (a) {
                    return !("undefined" === typeof a || null === a || void 0 === a)
                }
            };
            a.finite = b.isFinite;
            a.nan = b.isNaN;
            a.arr = Array.isArray;
            a.integer = function (b) {
                return a.num(b) && Math.floor(b) == b
            };
            a.num = function (c) {
                c = b.parseFloat(c);
                return !a.nan(c) && a.finite(c)
            };
            a.fun = function (a) {
                return "function" === typeof a
            };
            a.obj = function (a) {
                return "object" === typeof a
            };
            a.str = function (a) {
                return "string" === typeof a
            };
            a.not_empty = function (a) {
                return Object.keys ? 0 < Object.keys(a).length : 0 < Object.getOwnPropertyNames(a).length
            };
            a.modifier = function (a) {
                return a instanceof anm.Modifier
            };
            a.painter = function (a) {
                return a instanceof anm.Painter
            };
            a.tween =
                function (b) {
                    return a.modifier(b) && b.is_tween
                };
            a.equal = function (b, c) {
                if (b === c) return !0;
                if (!(b instanceof Object && c instanceof Object) || b.constructor !== c.constructor) return !1;
                for (var d in b)
                    if (b.hasOwnProperty(d) && (!c.hasOwnProperty(d) || b[d] !== c[d] && ("object" !== typeof b[d] || !a.equal(b[d], c[d])))) return !1;
                for (d in c)
                    if (c.hasOwnProperty(d) && !b.hasOwnProperty(d)) return !1;
                return !0
            };
            v.exports = {
                fmt_time: function (b) {
                    if (!a.finite(b)) return "\u221e";
                    var c = Math.abs(b),
                        e = Math.floor(c / 3600),
                        g = Math.floor((c - 3600 *
                            e) / 60),
                        c = Math.floor(c - 3600 * e - 60 * g);
                    return (0 > b ? "-" : "") + (0 < e ? (10 > e ? "0" + e : e) + ":" : "") + (10 > g ? "0" + g : g) + ":" + (10 > c ? "0" + c : c)
                },
                ell_text: function (a, b) {
                    if (!a) return "";
                    var c = a.length;
                    if (c <= b) return a;
                    var d = Math.floor(c / 2) - 2;
                    return a.slice(0, d) + "..." + a.slice(c - d)
                },
                compareFloat: function (a, b, c) {
                    0 !== c && (c = c || 2);
                    c = Math.pow(10, c);
                    return Math.round(a * c) == Math.round(b * c)
                },
                roundTo: function (a, b) {
                    if (!b) return Math.round(a);
                    var c = Math.pow(10, b);
                    return Math.round(a * c) / c
                },
                interpolateFloat: function (a, b, c) {
                    return a * (1 - c) + b * c
                },
                paramsToObj: function (a) {
                    var b = {};
                    a = a.split("&");
                    for (var c = a.length, e; c--;) e = a[c].split("="), b[e[0]] = e[1];
                    return b
                },
                obj_clone: function (a) {
                    var b = {},
                        c;
                    for (c in a) b[c] = a[c];
                    return b
                },
                mrg_obj: function (b, c, e) {
                    if (!c) return b;
                    e = e || {};
                    for (var d in c) e[d] = a.defined(b[d]) ? b[d] : c[d];
                    return e
                },
                strf: function (b, c) {
                    return b.replace(/{(\d+)}/g, function (b, d) {
                        return a.defined(c[d]) ? c[d] : b
                    })
                },
                guid: function () {
                    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
                },
                fit_rects: function (a,
                    b, c, e) {
                    var d = a / c,
                        g = b / e,
                        k = Math.min(d, g);
                    a = (a - c * k) / 2;
                    var p = (b - e * k) / 2,
                        n = c * k,
                        v = e * k;
                    return 1 != d || 1 != g ? (e = [a, p, n, v], 0 !== a ? [k, e, [0, 0, a, b],
                        [a + n, 0, a, b]
                    ] : 0 !== p ? [k, e, [0, 0, c, p],
                        [0, p + v, c, p]
                    ] : [k, e]) : [1, [0, 0, c, e]]
                },
                is: a,
                iter: function (a) {
                    if (a.__iter) return a.__iter.reset(), a.__iter;
                    var b = 0,
                        c = a.length;
                    return a.__iter = {
                        next: function () {
                            if (b < c) return a[b++];
                            b = 0;
                            throw new e;
                        },
                        hasNext: function () {
                            return b < c
                        },
                        remove: function () {
                            c--;
                            return a.splice(--b, 1)
                        },
                        reset: function () {
                            b = 0;
                            c = a.length
                        },
                        get: function () {
                            return a[b]
                        },
                        each: function (a,
                            b) {
                            for (this.reset(); this.hasNext();) !1 === a(this.next()) && (b ? b(this.remove()) : this.remove())
                        }
                    }
                },
                keys: function (a, b) {
                    if (Object.keys)
                        for (var c = Object.keys(a), d = 0; d < c.length && !1 !== b(c[d], a[c[d]]); d++);
                    else
                        for (c in a)
                            if (!1 === b(c, a[c])) break
                },
                removeElement: function (b, c) {
                    if (a.arr(b)) {
                        var d = b.indexOf(c); - 1 < d && b.splice(d, 1)
                    } else b[c] = null
                },
                postpone: function (a) {
                    setTimeout(a, 0)
                },
                makeApiUrl: function (a, b, c) {
                    var d = "//" + a + ".animatron.com" + b;
                    a = "//" + a + ".animatron-test.com" + b;
                    var e = b = !1;
                    "string" === typeof c ? (b = -1 !==
                        c.indexOf("animatron-test.com"), e = -1 !== c.indexOf("animatron.com")) : window && window.location && (c = window.location.hostname, b = -1 !== c.indexOf("animatron-test.com"), e = -1 !== c.indexOf("animatron.com"));
                    if (b) return a;
                    if (e) return d
                },
                getObjectId: function () {
                    return ((new Date).getTime() / 1E3 | 0).toString(16) + "xxxxxxxxxxxxxxxx".replace(/[x]/g, function () {
                        return (16 * Math.random() | 0).toString(16)
                    }).toLowerCase()
                }
            }
        }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ?
            window : {})
    }, {
        "./constants.js": 12,
        "./errors.js": 13
    }],
    40: [function (c, v, n) {
        (function (b) {
            for (var e = "undefined" !== typeof window ? window : {}, a = "undefined" !== typeof window ? window.document : {}, g = "undefined" !== typeof b ? b : {}, d = {}, p = g.requestAnimationFrame, k = g.cancelAnimationFrame, n = 0, t = ["ms", "moz", "webkit", "o"], q = 0; q < t.length && !g.requestAnimationFrame; ++q) p = g[t[q] + "RequestAnimationFrame"], k = g[t[q] + "CancelAnimationFrame"] || g[t[q] + "CancelRequestAnimationFrame"];
            p || (p = function (a, b) {
                var c = (new Date).getTime(),
                    d = Math.max(0,
                        16 - (c - n)),
                    m = e.setTimeout(function () {
                        a(c + d)
                    }, d);
                n = c + d;
                return m
            });
            k || (k = function (a) {
                clearTimeout(a)
            });
            d.getRequestFrameFunc = function () {
                return p
            };
            d.getCancelFrameFunc = function () {
                return k
            };
            d.PX_RATIO = e.devicePixelRatio || 1;
            d.ajax = function (a, b, c, h, g, k, q) {
                var f;
                q = "boolean" === typeof q ? q : !0;
                f = d.isIE9 ? new e.XDomainRequest : new e.XMLHttpRequest;
                if (!f) throw Error("Failed to create XMLHttp instance");
                f.onreadystatechange = function () {
                    if (4 == f.readyState)
                        if (200 == f.status) b && b(f);
                        else {
                            var d = Error("AJAX request for " +
                                a + " returned " + f.status + " instead of 200");
                            if (c) c(d, f);
                            else throw d;
                        }
                };
                d.isIE9 && (f.onload = function () {
                    b(f)
                }, f.onerror = function () {
                    c && c(Error("XDomainRequest Error"), f)
                });
                f.open(h || "GET", a, q);
                if (g && !d.isIE9)
                    for (var m in g) f.setRequestHeader(m, g[m]);
                f.send(k)
            };
            d.getCookie = function (b) {
                var c = a.cookie,
                    d;
                if (c)
                    for (d = 0, c = c.split("; "); d < c.length; d++)
                        if (c[d] = c[d].split("=", 2), unescape(c[d][0]) == b) return unescape(c[d][1]);
                return null
            };
            d.onDocReady = function (b) {
                if (d.isDocReady()) b();
                else {
                    var c;
                    a.addEventListener ?
                        c = a.addEventListener("DOMContentLoaded", function () {
                            a.removeEventListener("DOMContentLoaded", c, !1);
                            b()
                        }, !1) : a.attachEvent && (c = function () {
                            "complete" === a.readyState && (a.detachEvent("onreadystatechange", c), b())
                        }, a.attachEvent("onreadystatechange", c))
                }
            };
            d.isDocReady = function () {
                return "complete" === a.readyState || "interactive" === a.readyState
            };
            d.__stylesTag = null;
            d.WRAPPER_CLASS = "anm-wrapper";
            d.WRAPPER_INSTANCE_CLASS_PREFIX = "anm-wrapper-";
            d.PLAYER_CLASS = "anm-player";
            d.PLAYER_INSTANCE_CLASS_PREFIX = "anm-player-";
            d.CONTROLS_CLASS = "anm-controls";
            d.CONTROLS_INSTANCE_CLASS_PREFIX = "anm-controls-";
            d.INFO_CLASS = "anm-controls";
            d.INFO_INSTANCE_CLASS_PREFIX = "anm-controls-";
            d.ensureGlobalStylesInjected = function () {
                if (!d.__stylesTag) {
                    var b = a.getElementById("anm-player-styles");
                    if (!b) {
                        b = a.createElement("style");
                        b.id = "anm-player-styles";
                        var e = c("../../res/player.css");
                        b.innerHTML = e;
                        a.head.appendChild(b)
                    }
                    d.__stylesTag = b
                }
            };
            d.injectElementStyles = function (a, b, c) {
                a.classList ? (a.classList.add(b), a.classList.add(c)) : a.className =
                    a.className ? a.className + (b + " " + c) : b + " " + c;
                a = d.getAnmProps(a);
                a.gen_class = b;
                a.inst_class = c
            };
            d.__textBuf = a.getElementById("anm-text-measurer");
            d.createTextMeasurer = function () {
                var b = d.__textBuf;
                if (!b) d.onDocReady(function () {
                    var c = a.createElement("div"),
                        f = a.createElement("span");
                    f.id = "anm-text-measurer";
                    c.id = "anm-text-measurer-container";
                    c.appendChild(f);
                    a.body.appendChild(c);
                    d.__textBuf = f;
                    b = d.__textBuf
                });
                return function (a, c) {
                    var d = "undefined" !== typeof c ? c : a.lines;
                    b.style.font = a.$font;
                    b.style.whiteSpace =
                        "pre";
                    if (anm.utils.is.arr(d)) {
                        for (var f = 0, e = 0, m = 0, g = d.length; m < g; m++) b.textContent = d[m] || " ", f = Math.max(b.offsetWidth, f), e += b.offsetHeight;
                        return [f, e]
                    }
                    b.textContent = d.toString() || "";
                    return [b.offsetWidth, b.offsetHeight]
                }
            };
            d.getElementById = function (b) {
                return a.getElementById(b)
            };
            d.findElementPosition = function (a) {
                if (a.getBoundingClientRect) return a = a.getBoundingClientRect(), [a.left, a.top];
                var b = 0,
                    c = 0;
                do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
                return [b, c]
            };
            d.findScrollAwarePosition = function (b) {
                var c =
                    0,
                    d = 0;
                if (b.getBoundingClientRect) {
                    var e = b.getBoundingClientRect();
                    do c += b !== a.body ? b.scrollLeft : a.documentElement.scrollLeft, d += b !== a.body ? b.scrollTop : a.documentElement.scrollTop; while (b = b.offsetParent);
                    return [e.left - c, e.top - d]
                }
                do c += b.offsetLeft - (b !== a.body ? b.scrollLeft : a.documentElement.scrollLeft), d += b.offsetTop - (b !== a.body ? b.scrollTop : a.documentElement.scrollTop); while (b = b.offsetParent);
                return [c, d]
            };
            d.moveElementTo = function (a, b, c) {
                var f = d.hasAnmProps(a);
                (f && f.inst_rule || a).style.left = 0 === b ? "0" :
                    b + "px";
                (f && f.inst_rule || a).style.top = 0 === c ? "0" : c + "px"
            };
            d.__trashBin = null;
            d.disposeElement = function (b) {
                var c = d.__trashBin;
                c || (c = a.createElement("div"), c.id = "trash-bin", c.style.display = "none", a.body.appendChild(c), d.__trashBin = c);
                c.appendChild(b);
                c.innerHTML = ""
            };
            d.detachElement = function (a, b) {
                (a || b.parentNode).removeChild(b)
            };
            d.showElement = function (a) {
                a.style.visibility = "visible"
            };
            d.hideElement = function (a) {
                a.style.visibility = "hidden"
            };
            d.clearChildren = function (a) {
                for (; a.firstChild;) a.removeChild(a.firstChild)
            };
            d.newCanvas = function () {
                var b = a.createElement("canvas");
                b.style.outline = "none";
                return b
            };
            d.createCanvas = function (a, b, c, e) {
                var f = d.newCanvas();
                d.setCanvasSize(f, a, b, e);
                c && d.setCanvasBackground(f, c);
                return f
            };
            d.assignPlayerToWrapper = function (b, c, f) {
                if (!b) throw Error("Element passed to anm.Player initializer does not exist.");
                anm.utils.is.str(b) && (b = a.getElementById(b));
                var m = "canvas" == b.tagName || "CANVAS" == b.tagName;
                m && e.console && console.warn("NB: A <canvas> tag was passed to the anm.Player as an element to attach to. This is not a recommended way since version 1.2; this <canvas> will be moved inside a <div>-wrapper because of it, so it may break document flow and/or CSS styles. Please pass any container such as <div> to a Player instead of <canvas> to fix it.");
                var g = b.cloneNode(!1);
                f = m ? b : d.newCanvas();
                b = m ? a.createElement("div") : b;
                if (b.getAttribute("anm-player")) throw Error("Player is already attached to element '" + (b.id || f.id) + "'.");
                b.setAttribute("anm-player", !0);
                b.hasAttribute("anm-player-target") && b.removeAttribute("anm-player-target");
                f.hasAttribute("anm-player-target") && f.removeAttribute("anm-player-target");
                var x = f.id;
                f.id = "";
                b.id || (b.id = x);
                f.id = b.id + "-cvs";
                x = d.getAnmProps(f);
                x.wrapper = b;
                x.was_before = g;
                g = b.id;
                x.id = g;
                if (m)
                    if (m = f.parentNode || a.body) m.replaceChild(b,
                        f), b.appendChild(f);
                    else throw Error("Provided canvas tag has no parent");
                else b.appendChild(f);
                d.ensureGlobalStylesInjected();
                d.injectElementStyles(b, d.WRAPPER_CLASS, d.WRAPPER_INSTANCE_CLASS_PREFIX + (g || "no-id"));
                d.injectElementStyles(f, d.PLAYER_CLASS, d.PLAYER_INSTANCE_CLASS_PREFIX + (g || "no-id"));
                d.subscribeWrapperToStateChanges(b, c);
                return {
                    wrapper: b,
                    canvas: f,
                    id: g
                }
            };
            d.playerAttachedTo = function (a, b) {
                if (d.hasAnmProps(a)) {
                    var c = d.getAnmProps(a);
                    if (c.wrapper) return c.wrapper.hasAttribute("anm-player")
                }
                return a.hasAttribute("anm-player")
            };
            d.findPotentialPlayers = function () {
                return a.querySelectorAll("[anm-player-target]")
            };
            d.hasAnmProps = function (a) {
                return a.__anm
            };
            d.getAnmProps = function (a) {
                a.__anm || (a.__anm = {});
                return a.__anm
            };
            d.clearAnmProps = function (a) {
                a && a.__anm && delete a.__anm
            };
            d.detachPlayer = function (b) {
                var c = b.canvas,
                    f = b.wrapper;
                f && f.removeAttribute("anm-player");
                var e = f.parentNode || a.body,
                    g = f.nextSibling,
                    x = d.getAnmProps(c);
                d.clearChildren(f);
                x.was_before && (e.removeChild(f), e.insertBefore(x.was_before, g));
                d.clearAnmProps(f);
                d.clearAnmProps(c);
                b.controls && (d.clearAnmProps(b.controls.canvas), b.controls.info && d.clearAnmProps(b.controls.info.canvas));
                b.statImg && d.detachElement(null, b.statImg)
            };
            d.getContext = function (a, b) {
                return a.getContext(b)
            };
            d.extractUserOptions = function (a) {
                function b(a) {
                    if ("undefined" !== typeof a) {
                        if (null === a) return null;
                        if ("0" == a) return !1;
                        if ("1" == a) return !0;
                        if ("false" == a) return !1;
                        if ("true" == a) return !0;
                        if ("off" == a) return !1;
                        if ("on" == a) return !0;
                        if ("no" == a) return !1;
                        if ("yes" == a) return !0
                    }
                }

                function c(a) {
                    if ("undefined" !== typeof a) return null ===
                        a ? null : a ? Number.parseFloat(a) / 100 : 0
                }
                var e = d.PX_RATIO,
                    g = a.getAttribute("anm-width");
                g || (g = a.hasAttribute("width") ? a.getAttribute("width") / e : void 0);
                var k = a.getAttribute("anm-height");
                k || (k = a.hasAttribute("height") ? a.getAttribute("height") / e : void 0);
                return {
                    debug: b(a.getAttribute("anm-debug")),
                    mode: a.getAttribute("anm-mode"),
                    repeat: b(a.getAttribute("anm-repeat")),
                    zoom: a.getAttribute("anm-zoom"),
                    speed: a.getAttribute("anm-speed"),
                    width: g,
                    height: k,
                    autoPlay: b(a.getAttribute("anm-autoplay") || a.getAttribute("anm-auto-play")),
                    startFrom: c(a.getAttribute("anm-start-from")),
                    stopAt: c(a.getAttribute("anm-stop-at")),
                    bgColor: a.getAttribute("anm-bgcolor") || a.getAttribute("anm-bg-color"),
                    ribbonsColor: a.getAttribute("anm-ribbons") || a.getAttribute("anm-ribcolor") || a.getAttribute("anm-rib-color"),
                    drawStill: b(a.getAttribute("anm-draw-still") || a.getAttribute("anm-draw-thumbnail") || a.getAttribute("anm-draw-thumb")),
                    imagesEnabled: b(a.getAttribute("anm-images") || a.getAttribute("anm-images-enabled")),
                    shadowsEnabled: b(a.getAttribute("anm-shadows") ||
                        a.getAttribute("anm-shadows-enabled")),
                    audioEnabled: b(a.getAttribute("anm-audio") || a.getAttribute("anm-audio-enabled")),
                    controlsEnabled: b(a.getAttribute("anm-controls") || a.getAttribute("anm-controls-enabled")),
                    infoEnabled: b(a.getAttribute("anm-info") || a.getAttribute("anm-info-enabled")),
                    handleEvents: b(a.getAttribute("anm-events") || a.getAttribute("anm-handle-events")),
                    infiniteDuration: b(a.getAttribute("anm-infinite") || a.getAttribute("anm-infinite-duration")),
                    forceSceneSize: b(a.getAttribute("anm-scene-size") ||
                        a.getAttribute("anm-force-scene-size")),
                    inParent: void 0,
                    muteErrors: b(a.getAttribute("anm-mute-errors")),
                    loadingMode: a.getAttribute("anm-loading-mode"),
                    thumbnail: a.getAttribute("anm-thumbnail")
                }
            };
            d.checkPlayerCanvas = function (a) {
                return !0
            };
            d.hasUrlToLoad = function (a) {
                return {
                    url: a.getAttribute("anm-url") || a.getAttribute("anm-src"),
                    importer_id: a.getAttribute("anm-importer")
                }
            };
            d.setTabIndex = function (a, b) {
                a.setAttribute("tabindex", b)
            };
            d.getCanvasParameters = function (a) {
                if (!d.hasAnmProps(a)) return null;
                a = d.getAnmProps(a);
                return a.width && a.height ? [a.width, a.height, d.PX_RATIO] : null
            };
            d.getCanvasSize = function (a) {
                return a.getBoundingClientRect ? (a = a.getBoundingClientRect(), [a.width, a.height]) : [a.getAttribute("clientWidth") || a.clientWidth, a.getAttribute("clientHeight") || a.clientHeight]
            };
            d.getCanvasPosition = function (a) {
                return d.findScrollAwarePosition(a)
            };
            d.getCanvasBounds = function (a) {
                var b = d.getCanvasParameters(a);
                if (!b) return null;
                a = d.getCanvasPosition(a);
                return [a[0], a[1], b[0], b[1], b[2]]
            };
            d.setCanvasSize = function (a, b, c,
                e) {
                e = e || d.PX_RATIO;
                b |= 0;
                c |= 0;
                var f = d.getAnmProps(a);
                f.ratio = e;
                f.width = b;
                f.height = c;
                a.style.width = b + "px";
                a.style.height = c + "px";
                a.setAttribute("width", b * (e || 1));
                a.setAttribute("height", c * (e || 1));
                d._saveCanvasPos(a);
                return [b, c]
            };
            d.setCanvasPosition = function (a, b, c) {
                var f = d.getAnmProps(a);
                f.usr_x = b;
                f.usr_y = c;
                d._saveCanvasPos(a)
            };
            d.setCanvasBackground = function (a, b) {
                a.style.backgroundColor = b
            };
            d._saveCanvasPos = function (b) {
                var c = a.defaultView && a.defaultView.getComputedStyle,
                    f = c ? parseInt(c(b, null).paddingLeft,
                        10) || 0 : 0,
                    e = c ? parseInt(c(b, null).paddingTop, 10) || 0 : 0,
                    g = c ? parseInt(c(b, null).borderLeftWidth, 10) || 0 : 0,
                    c = c ? parseInt(c(b, null).borderTopWidth, 10) || 0 : 0,
                    k = a.body.parentNode,
                    x = k.offsetLeft,
                    q = k.offsetTop,
                    p = b,
                    k = f + g + x,
                    r = e + c + q;
                if (void 0 !== p.offsetParent) {
                    do k += p.offsetLeft, r += p.offsetTop; while (p = p.offsetParent)
                }
                k += f + g + x;
                r += e + c + q;
                b = d.getAnmProps(b);
                b.offset_left = k || b.usr_x;
                b.offset_top = r || b.usr_y
            };
            d.setWrapperSize = function (a, b, c) {
                b |= 0;
                c |= 0;
                var f = d.getAnmProps(a);
                f.width = b;
                f.height = c;
                a.style.width = b + "px";
                a.style.height =
                    c + "px";
                return [b, c]
            };
            d.addCanvasOverlay = function (b, c, f, h) {
                var m = d.getAnmProps(c),
                    g = m.wrapper || c.parentNode || a.body,
                    k = f[0],
                    q = f[1],
                    x = f[2],
                    p = f[3];
                f = d.getCanvasSize(c);
                var r = f[0],
                    n = f[1],
                    t = e.getComputedStyle ? e.getComputedStyle(c) : c.currentStyle;
                f = parseFloat(t.getPropertyValue("border-left-width"));
                t = parseFloat(t.getPropertyValue("border-top-width"));
                x *= r;
                p *= n;
                r = d.newCanvas();
                r.id = m.id ? "__" + m.id + "_" + b : "__anm_" + b;
                b = d.getAnmProps(r);
                h && h(r, c);
                d.setCanvasSize(r, x, p);
                d.moveElementTo(r, k * x + f, q * p - t);
                (g || a.body).insertBefore(r,
                    c.nextSibling);
                b.ref_canvas = c;
                m.overlays || (m.overlays = []);
                m.overlays.push(r);
                return r
            };
            d.updateCanvasOverlays = function (a) {
                var b = d.getAnmProps(a),
                    c = b.overlays;
                if (c)
                    for (var e = 0, g = c.length; e < g; e++) d.updateOverlay(a, c[e], b)
            };
            d.updateOverlay = function (a, b, c) {
                c = c || d.getAnmProps(a);
                d.setCanvasSize(b, c.width, c.height)
            };
            d.registerAsControlsElement = function (a, b) {
                d.injectElementStyles(a, d.CONTROLS_CLASS, d.CONTROLS_INSTANCE_CLASS_PREFIX + (b.id || "no-id"))
            };
            d.registerAsInfoElement = function (a, b) {
                d.injectElementStyles(a,
                    d.INFO_CLASS, d.INFO_INSTANCE_CLASS_PREFIX + (b.id || "no-id"))
            };
            d.getEventPosition = function (a, b) {
                if (b) {
                    var c = d.findElementPosition(b);
                    return {
                        x: a.clientX - c[0],
                        y: a.clientY - c[1]
                    }
                }
                return {
                    x: a.x,
                    y: a.y
                }
            };
            d.subscribeElementEvents = function (a, b) {
                for (var c in b) a.addEventListener(c, b[c], !1)
            };
            d.unsubscribeElementEvents = function (a, b) {
                for (var c in b) a.removeEventListener(c, b[c], !1)
            };
            d.subscribeWindowEvents = function (a) {
                d.subscribeElementEvents(e, a)
            };
            d.subscribeCanvasEvents = d.subscribeElementEvents;
            d.unsubscribeCanvasEvents =
                d.unsubscribeElementEvents;
            d.keyEvent = function (a) {
                return {
                    key: null !== a.keyCode ? a.keyCode : a.which,
                    ch: a.charCode
                }
            };
            d.mouseEvent = function (a, b) {
                return {
                    pos: d.getEventPosition(a, b)
                }
            };
            d.preventDefault = function (a) {
                a.stopPropagation();
                a.preventDefault()
            };
            var y = d.keyEvent,
                w = d.mouseEvent;
            d.subscribeAnimationToEvents = function (a, b, c) {
                if (!a.__anm.subscribed || !a.__anm.subscribed[b.id]) {
                    a.__anm.handlers || (a.__anm.handlers = {});
                    a.__anm.subscribed || (a.__anm.subscribed = {});
                    var f = a.__anm.subscribed[b.id] || {
                        click: function (d) {
                            b.fire(c.click,
                                w(d, a))
                        },
                        dblclick: function (d) {
                            b.fire(c.dblclick, w(d, a))
                        },
                        mouseup: function (d) {
                            b.fire(c.mouseup, w(d, a))
                        },
                        mousedown: function (d) {
                            b.fire(c.mousedown, w(d, a))
                        },
                        mousemove: function (d) {
                            b.fire(c.mousemove, w(d, a))
                        },
                        keypress: function (a) {
                            b.fire(c.keypress, y(a))
                        },
                        keyup: function (a) {
                            b.fire(c.keyup, y(a))
                        },
                        keydown: function (a) {
                            b.fire(c.keydown, y(a))
                        }
                    };
                    a.__anm.handlers[b.id] = f;
                    a.__anm.subscribed[b.id] = !0;
                    d.subscribeCanvasEvents(a, f)
                }
            };
            d.unsubscribeAnimationFromEvents = function (a, b) {
                if (a.__anm.handlers && a.__anm.subscribed &&
                    a.__anm.subscribed[b.id]) {
                    var c = a.__anm.handlers[b.id];
                    c && d.unsubscribeCanvasEvents(a, c)
                }
            };
            d.subscribeWrapperToStateChanges = function (a, b) {
                if (a.classList) {
                    var c = anm.constants;
                    b.on(c.S_CHANGE_STATE, function (d) {
                        var f = [];
                        switch (d) {
                            case c.NOTHING:
                                f = ["anm-state-nothing"];
                                break;
                            case c.STOPPED:
                                f = ["anm-state-stopped"];
                                break;
                            case c.PLAYING:
                                f = ["anm-state-playing"];
                                break;
                            case c.PAUSED:
                                f = ["anm-state-paused"];
                                break;
                            case c.LOADING:
                                f = ["anm-state-loading"];
                                break;
                            case c.RES_LOADING:
                                f = ["anm-state-loading", "anm-state-resources-loading"];
                                break;
                            case c.ERROR:
                                f = ["anm-state-error"]
                        }
                        if (f.length) {
                            d = a.classList;
                            var e, m;
                            if (b.__prev_classes && b.__prev_classes.length) {
                                var h = b.__prev_classes;
                                e = 0;
                                for (m = h.length; e < m; e++) d.remove(h[e])
                            } else d.contains("anm-state-nothing") && d.remove("anm-state-nothing");
                            e = 0;
                            for (m = f.length; e < m; e++) d.add(f[e]);
                            b.__prev_classes = f
                        }
                    })
                }
            };
            d.createStatImg = function () {
                var b = a.createElement("img");
                b.style.position = "absolute";
                b.style.top = "-9999px";
                b.style.left = "-9999px";
                b.style.visibility = "hidden";
                a.body.appendChild(b);
                return b
            };
            d.getWebfontStyleObject = function () {
                var b = document.getElementById("anm-webfonts");
                if (b) return b;
                b = a.createElement("style");
                b.type = "text/css";
                b.id = "anm-webfonts";
                b.innerHTML = "";
                document.body.appendChild(b);
                return b
            };
            d.createAudio = function () {
                return a.createElement("audio")
            };
            d.createVideo = function (b, c) {
                var d = a.createElement("video");
                d.width = b;
                d.height = c;
                return d
            };
            d.createSource = function () {
                return a.createElement("source")
            };
            d.appendToBody = function (b) {
                a.body.appendChild(b)
            };
            t = a.createElement ? d.newCanvas() : {};
            d.canvasSupported = !(!t.getContext || !t.getContext("2d"));
            d.isHttps = e.location && "https:" === e.location.protocol;
            var z = e.location && "file:" === e.location.protocol;
            d.isLocal = z;
            d.checkMediaUrl = function (a) {
                return z && "//" === a.substring(0, 2) ? (d.isHttps ? "https:" : "http:") + a : d.isHttps ? a.replace("http:", "https:") : a
            };
            t = (new Function("/*@cc_on return @_jscript_version; @*/"))();
            d.isIE9 = 9 == t;
            d.isIE10 = 10 == t;
            d.isIEorEdge = !!window.StyleMedia;
            var A, r;
            "undefined" !== typeof a.hidden ? (A = "hidden", r = "visibilitychange") : "undefined" !==
                typeof a.mozHidden ? (A = "mozHidden", r = "mozvisibilitychange") : "undefined" !== typeof a.msHidden ? (A = "msHidden", r = "msvisibilitychange") : "undefined" !== typeof a.webkitHidden && (A = "webkitHidden", r = "webkitvisibilitychange");
            "undefined" === typeof a[A] && "undefined" === typeof a.addEventListener || a.addEventListener(r, function () {
                C && C(a[A])
            }, !1);
            var C = null;
            d.onDocumentHiddenChange = function (a) {
                C = a
            };
            d.Path2D = g.Path2D;
            d.isInIframe = function () {
                return g.self !== g.top
            };
            var D = d.isInIframe() ? b : null,
                E = D ? D.document.referrer.split("/",
                    3).join("/") : "*";
            d.getIframeOrigin = function () {
                return E
            };
            d.getIframeSrc = function () {
                return D ? D.location.href : null
            };
            d.addMessageListener = function (a) {
                g.addEventListener && g.addEventListener("message", a, !1)
            };
            d.postToContentWindow = function (a) {
                D && D.top.postMessage(JSON.stringify(a), E || "*")
            };
            return v.exports = d
        }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
    }, {
        "../../res/player.css": 2
    }],
    41: [function (c, v, n) {
        (function (b) {
            var e = c("./anm/constants.js"),
                a = c("engine"),
                g = c("./anm/player.js");
            a.onDocReady(function () {
                for (var b = a.findPotentialPlayers(), c = 0, d = b.length; c < d; c++) n.createPlayer(b[c])
            });
            var d = c("./anm/animation/element.js"),
                p = c("./anm/graphics/sheet.js"),
                k = c("./anm/graphics/segments.js"),
                n = {
                    global: b,
                    constants: e,
                    C: e,
                    loc: c("./anm/loc.js"),
                    errors: c("./anm/errors.js"),
                    utils: c("./anm/utils.js"),
                    conf: c("./anm/conf.js"),
                    log: c("./anm/log.js"),
                    modules: c("./anm/modules.js"),
                    importers: c("./anm/importers.js"),
                    engine: a,
                    events: c("./anm/events.js"),
                    resource_manager: c("./anm/resource_manager.js"),
                    player_manager: c("./anm/player_manager.js"),
                    Player: g,
                    Animation: c("./anm/animation/animation.js"),
                    Element: d,
                    Clip: d,
                    Modifier: c("./anm/animation/modifier.js"),
                    Tween: c("./anm/animation/tween.js"),
                    Painter: c("./anm/animation/painter.js"),
                    Brush: c("./anm/graphics/brush.js"),
                    Color: c("./anm/graphics/color.js"),
                    Path: c("./anm/graphics/path.js"),
                    MSeg: k.MSeg,
                    LSeg: k.LSeg,
                    CSeg: k.CSeg,
                    Text: c("./anm/graphics/text.js"),
                    Sheet: p,
                    Image: p,
                    shapes: c("./anm/graphics/shapes.js"),
                    Audio: c("./anm/media/audio.js"),
                    Video: c("./anm/media/video.js"),
                    interop: {
                        playerjs: c("./anm/interop/playerjs-io.js")
                    },
                    createPlayer: function (b, c) {
                        if (!a.canvasSupported) return document.getElementById(b).innerHTML = n.loc.Errors.S.SAD_SMILEY_HTML, null;
                        var d = new g;
                        d.init(b, c);
                        return d
                    },
                    createImporter: function (a) {
                        window.console && console.warn("anm.createImporter is deprecated and will be removed soon. Please use anm.importers.create instead");
                        return n.importers.create(a)
                    }
                };
            b.anm = n;
            v.exports = n
        }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self :
            "undefined" !== typeof window ? window : {})
    }, {
        "./anm/animation/animation.js": 3,
        "./anm/animation/element.js": 6,
        "./anm/animation/modifier.js": 7,
        "./anm/animation/painter.js": 8,
        "./anm/animation/tween.js": 10,
        "./anm/conf.js": 11,
        "./anm/constants.js": 12,
        "./anm/errors.js": 13,
        "./anm/events.js": 14,
        "./anm/graphics/brush.js": 17,
        "./anm/graphics/color.js": 18,
        "./anm/graphics/path.js": 19,
        "./anm/graphics/segments.js": 20,
        "./anm/graphics/shapes.js": 21,
        "./anm/graphics/sheet.js": 22,
        "./anm/graphics/text.js": 23,
        "./anm/importers.js": 24,
        "./anm/interop/playerjs-io.js": 25,
        "./anm/loc.js": 27,
        "./anm/log.js": 28,
        "./anm/media/audio.js": 29,
        "./anm/media/video.js": 30,
        "./anm/modules.js": 31,
        "./anm/player.js": 32,
        "./anm/player_manager.js": 33,
        "./anm/resource_manager.js": 35,
        "./anm/utils.js": 39,
        engine: 40
    }],
    42: [function (c, v, n) {
        "undefined" !== typeof v && (v.exports = function () {
            var b = ["monospace", "sans-serif", "serif"],
                c = document.getElementsByTagName("body")[0],
                a = document.createElement("span");
            a.style.fontSize = "72px";
            a.style.position = "absolute";
            a.style.top =
                "-9999px";
            a.style.left = "-9999px";
            a.innerHTML = "mmmmmmmmmmlli";
            var g = {},
                d = {},
                p;
            for (p in b) a.style.fontFamily = b[p], c.appendChild(a), g[b[p]] = a.offsetWidth, d[b[p]] = a.offsetHeight, c.removeChild(a);
            this.detect = function (e) {
                var k = !1,
                    p;
                for (p in b) {
                    a.style.fontFamily = e.face + "," + b[p];
                    a.style.fontStyle = e.style;
                    a.style.fontWeight = e.weight;
                    c.appendChild(a);
                    var q = a.offsetWidth != g[b[p]] || a.offsetHeight != d[b[p]];
                    c.removeChild(a);
                    k = k || q
                }
                return k
            }
        })
    }, {}],
    43: [function (c, v, n) {
        function b() {
            this.m = [1, 0, 0, 1, 0, 0]
        }
        b.prototype.reset =
            function () {
                this.m = [1, 0, 0, 1, 0, 0]
            };
        b.prototype.multiply = function (b) {
            var a = this.m[1] * b.m[0] + this.m[3] * b.m[1],
                c = this.m[0] * b.m[2] + this.m[2] * b.m[3],
                d = this.m[1] * b.m[2] + this.m[3] * b.m[3],
                e = this.m[0] * b.m[4] + this.m[2] * b.m[5] + this.m[4],
                k = this.m[1] * b.m[4] + this.m[3] * b.m[5] + this.m[5];
            this.m[0] = this.m[0] * b.m[0] + this.m[2] * b.m[1];
            this.m[1] = a;
            this.m[2] = c;
            this.m[3] = d;
            this.m[4] = e;
            this.m[5] = k
        };
        b.prototype.invert = function () {
            var b = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
                a = -this.m[1] * b,
                c = -this.m[2] * b,
                d = this.m[0] * b,
                p =
                b * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
                k = b * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
            this.m[0] = this.m[3] * b;
            this.m[1] = a;
            this.m[2] = c;
            this.m[3] = d;
            this.m[4] = p;
            this.m[5] = k
        };
        b.prototype.rotate = function (b) {
            var a = Math.cos(b);
            b = Math.sin(b);
            var c = this.m[1] * a + this.m[3] * b,
                d = this.m[0] * -b + this.m[2] * a,
                e = this.m[1] * -b + this.m[3] * a;
            this.m[0] = this.m[0] * a + this.m[2] * b;
            this.m[1] = c;
            this.m[2] = d;
            this.m[3] = e
        };
        b.prototype.rotateDegrees = function (b) {
            var a = b * Math.PI / 180;
            b = Math.cos(a);
            var a = Math.sin(a),
                c = this.m[1] * b + this.m[3] *
                a,
                d = this.m[0] * -a + this.m[2] * b,
                e = this.m[1] * -a + this.m[3] * b;
            this.m[0] = this.m[0] * b + this.m[2] * a;
            this.m[1] = c;
            this.m[2] = d;
            this.m[3] = e
        };
        b.prototype.translate = function (b, a) {
            this.m[4] += this.m[0] * b + this.m[2] * a;
            this.m[5] += this.m[1] * b + this.m[3] * a
        };
        b.prototype.scale = function (b, a) {
            this.m[0] *= b;
            this.m[1] *= b;
            this.m[2] *= a;
            this.m[3] *= a
        };
        b.prototype.transformPoint = function (b, a) {
            return {
                x: b * this.m[0] + a * this.m[2] + this.m[4],
                y: b * this.m[1] + a * this.m[3] + this.m[5]
            }
        };
        b.prototype.transformPointInverse = function (b, a) {
            this.invert();
            var c = this.transformPoint(b, a);
            this.invert();
            return c
        };
        b.prototype.shear = function (b, a) {
            var c = this.m[1] + this.m[3] * a,
                d = this.m[0] * b + this.m[2],
                e = this.m[1] * b + this.m[3];
            this.m[0] += this.m[2] * a;
            this.m[1] = c;
            this.m[2] = d;
            this.m[3] = e
        };
        b.prototype.apply = function (b) {
            var a = this.m;
            b.transform(a[0], a[1], a[2], a[3], a[4], a[5])
        };
        b.prototype.clone = function () {
            var c = new b;
            c.m[0] = this.m[0];
            c.m[1] = this.m[1];
            c.m[2] = this.m[2];
            c.m[3] = this.m[3];
            c.m[4] = this.m[4];
            c.m[5] = this.m[5];
            return c
        };
        b.prototype.inverted = function () {
            var b =
                this.clone();
            b.invert();
            return b
        };
        "undefined" !== typeof v && (v.exports = b)
    }, {}]
}, {}, [41]);
var AnimatronImporter = function () {
    function c(a) {
        A.error(a)
    }

    function v(a) {
        this.buf = a;
        this.bitsBuf = this.bitPos = this.pos = 0
    }

    function n() {}

    function b() {
        this.hash2val = {}
    }

    function e() {}
    var a = anm.constants,
        g = anm.Animation,
        d = anm.Element,
        p = anm.Path,
        k = anm.Text,
        u = anm.Brush,
        t = anm.Tween,
        q = anm.Audio,
        y = anm.Video,
        w = anm.utils.is,
        z = anm.utils.roundTo,
        A = anm.log,
        r = {},
        C;
    r._find = function (a, b) {
        b[a] || c("Element with index " + a + " was not found" + (b ? " among " + b.length + " elements." : "."));
        return b[a]
    };
    r._type = function (a) {
        return a[0]
    };
    r.project = function (a) {
        anm.conf.logImport && A.debug(a);
        C = anm.utils.guid();
        anm.lastImportedProject = a;
        anm.lastImportId = C;
        var d = a.anim.scenes;
        d.length || c("No scenes found in given project");
        var e = new g,
            m = a.anim.elements,
            k = [0, 0];
        e.__import_id = C;
        e.meta = r.meta(a);
        e.fonts = r.fonts(a);
        r.root = e;
        r._paths = a.anim.paths || [];
        r._path_cache = new b;
        r.anim(a, e);
        a.meta.duration && (e.duration = a.meta.duration);
        var q;
        a = function (a) {
            var b = a.gband;
            a.gband = [k[1] + b[0], k[1] + b[1]]
        };
        for (var p = 0, n = d.length; p < n; p++) {
            q = r._find(d[p], m);
            r._type(q) != D && c("Given Scene ID " + d[p] + " points to something else");
            q = r.node(q, null, m, null, e);
            if (0 < p) {
                var t = q.gband;
                q.gband = [k[1] + t[0], k[1] + t[1]];
                q.lband = q.gband;
                q.traverse(a)
            }
            k = q.gband;
            e.add(q)
        }
        0 < d.length && (q.gband = [k[0], Infinity], q.lband = q.gband);
        r._paths = void 0;
        r._path_cache = void 0;
        return e
    };
    r.meta = function (a) {
        a = a.meta;
        return {
            title: a.name,
            author: a.author,
            copyright: a.copyright,
            version: a.version,
            description: a.description,
            duration: a.duration,
            created: a.created,
            modified: a.modified,
            _anm_id: a.id
        }
    };
    r.fonts =
        function (a) {
            return a.anim.fonts
        };
    r.anim = function (a, b) {
        var c = a.anim;
        b.fps = c.framerate;
        b.width = c.dimension ? Math.floor(c.dimension[0]) : void 0;
        b.height = c.dimension ? Math.floor(c.dimension[1]) : void 0;
        b.bgfill = c.background ? r.fill(c.background) : void 0;
        b.zoom = c.zoom || 1;
        b.speed = c.speed || 1;
        !c.loop || !0 !== c.loop && "true" !== c.loop || (b.repeat = !0);
        a.anim.script && (b.actions = a.anim.script)
    };
    var D = 2;
    r.node = function (a, b, c, d, e) {
        var f = r._type(a),
            m = null;
        1 == f || f == D || 9 == f || 28 == f || 29 == f ? m = r.branch(f, a, b, c, e) : 0 != f && (m = r.leaf(f,
            a, b, d, e));
        m && (m._anm_type = f, r.callCustom(m, a, f));
        return m
    };
    L_VISIBLE = 4;
    r.branch = function (b, f, e, g, k) {
        var m = new d;
        m.name = f[1];
        var h = b == D ? f[3] : f[2],
            q = [];
        b === D ? (m.gband = [0, f[2]], m.lband = [0, f[2]]) : (m.gband = [0, Infinity], m.lband = [0, Infinity]);
        for (f = h.length; f--;) {
            var p = h[f],
                n = r._find(p[0], g);
            if (n && (n = r.node(n, p, g, m, k))) {
                n.name = p[1];
                var v = p[6];
                n.disabled = !(v & L_VISIBLE);
                var u = 9 === b && e && e[2] ? e[2] : [0, 0],
                    w = r.band(p[2]);
                n.lband = [w[0] - u[0], w[1] - u[0]];
                n.gband = w;
                n.$pivot = [0, 0];
                n.$reg = p[4] || [0, 0];
                if (p[7]) {
                    for (var u =
                            0, w = Infinity, x = 0, y = p[7], z = 0, B = y.length; z < B; z++) {
                        var A = r.tween(y[z]);
                        A && (v & 1 && A.tween_type === a.T_ROTATE && (w = Math.min(w, A.$band[0]), x = Math.max(x, A.$band[1]), u++), n.tween(A))
                    }
                    v & 1 && (u ? (0 < w && Infinity > w && n.tween(t.rotate().start(0).stop(w).from(0).to(0)), 0 < x && Infinity > x && n.tween(t.rotate().start(x).stop(n.lband[1] - n.lband[0]).from(0).to(0))) : n.tween(t.rotate().start(0).stop(Infinity).from(0).to(0)), n.tween(t.rotatetopath().start(0).stop(Infinity)))
                }
                p[5] ? (n.mode = r.mode(p[5][0]), 1 < p[5].length && (n.nrep = p[5][1] ||
                    Infinity)) : n.mode = r.mode(null);
                1 === n._anm_type && n.mode !== a.R_ONCE && (n.asClip([0, n.lband[1] - n.lband[0]], n.mode, n.nrep), n.lband = [n.lband[0], Infinity], n.gband = [n.gband[0], Infinity], n.mode = a.R_STAY, n.nrep = Infinity);
                if (p[3])
                    for (v = n, u = p[3], w = q.length, u > w && (c("No layers collected to apply mask, expected " + u + ", got " + w), u = w); u;) q[w - u].mask(v), u--;
                else m.add(n), q.push(n);
                r.callCustom(n, p, 255);
                n.$audio && n.$audio.master && (n.lband = [n.lband[0], Infinity], n.gband = [n.gband[0], Infinity], m.remove(n), k.add(n))
            }
        }
        if (28 ===
            b)
            for (m.layer2Bone = Array(h.length), b = m.children.length, e = m.children[b - 1], f = e.children.length; f--;) e.children[f].$from = b - e.children[f].$from - 1, e.children[f].$to = b - e.children[f].$to - 1, m.layer2Bone[e.children[f].$to] = e.children[f];
        return m
    };
    r.leaf = function (b, c, e, g, k) {
        e = new d;
        if (!c[1] && (8 === b || 14 === b || 26 === b)) return null;
        8 == b ? e.$image = r.sheet(c) : 4 == b ? e.$text = r.text(c) : 14 == b ? (e.type = a.ET_AUDIO, e.$audio = r.audio(c), e.$audio.connect(e, k)) : 26 == b ? (e.type = a.ET_VIDEO, e.$video = r.video(c), e.$video.connect(e, k)) :
            30 == b ? (e.$from = c[1], e.$to = c[2]) : e.$path = r.path(c);
        if (e.$path || e.$text) e.$fill = r.fill(c[1]), e.$stroke = r.stroke(c[2]), e.$shadow = r.shadow(c[3]);
        return e
    };
    r.callCustom = function (a, b, c) {
        if (d._customImporters && d._customImporters.length)
            for (var f = d._customImporters, e = 0, m = f.length; e < m; e++) f[e].call(a, b, c, "ANM", C)
    };
    r.band = function (a) {
        if (!a || !a.length) return [0, Infinity];
        if (1 == a.length) return [a[0], Infinity];
        if (2 == a.length) return a;
        c("Unknown format of band: " + a)
    };
    r.path = function (a) {
        if (a = r._pathDecode(a[4])) return new p(a)
    };
    r._pathDecode = function (a) {
        if (w.str(a)) return a;
        if (!w.num(a) || -1 == a) return null;
        a = r._paths[a];
        if (!a) return null;
        var b = r._path_cache.get(a);
        if (!b) {
            b = r._decodeBinaryPath(a);
            if (!b) return null;
            r._path_cache.put(a, b)
        }
        return b
    };
    r._decodeBinaryPath = function (a) {
        var b = "";
        if (a) {
            a = a.replace(/\s/g, "");
            try {
                var d = n.decode(a),
                    e = new v(d),
                    d = [0, 0];
                if (e)
                    for (var g = !0; g;) {
                        var m;
                        switch (e.readBits(2)) {
                            case 0:
                                d = m = r._pathReadPoint(e, d);
                                b += " M " + m.join(",");
                                break;
                            case 1:
                                d = m = r._pathReadPoint(e, d);
                                b += " L " + m.join(",");
                                break;
                            case 2:
                                var k = " C";
                                m = d;
                                for (var p = 0; 3 > p; p++) m = r._pathReadPoint(e, m), k += " " + m.join(",");
                                d = m;
                                b += k;
                                break;
                            default:
                                g = !1
                        }
                    } else return c('Unable to decode Path "' + a + '"'), null
            } catch (J) {
                return c('Unable to decode Path "' + a + '"'), null
            }
        }
        return b
    };
    r._pathReadPoint = function (a, b) {
        b = b || [0, 0];
        var c = a.readBits(5);
        if (0 >= c) throw Error("Failed to decode path, wrong length (<= 0)");
        var d = a.readSBits(c),
            c = a.readSBits(c);
        return [z(b[0] + d / 1E3, 2), z(b[1] + c / 1E3, 2)]
    };
    r.text = function (a) {
        var b = w.arr(a[6]) ? a : a[6].split("\n");
        return new k(1 <
            b.length ? b : b[0], a[4], a[5], a[7] & 2 ? "middle" : "bottom", a[7] & 1 ? !0 : !1)
    };
    r.sheet = function (a) {
        var b = new anm.Sheet(a[1]);
        a[2] && (b._dimen = a[2]);
        return b
    };
    r.tween = function (a) {
        var b = r.tweentype(a[0]);
        if (!b) return null;
        b = t[b](r.tweendata(b, a[3])).band(r.band(a[1]));
        (a = r.easing(a[2])) && b.easing(a);
        return b
    };
    r.tweentype = function (b) {
        if (0 === b) return a.T_ALPHA;
        if (1 === b) return a.T_ROTATE;
        if (2 === b) return a.T_SCALE;
        if (3 === b) return a.T_SHEAR;
        if (4 === b) return a.T_TRANSLATE;
        if (7 === b) return a.T_VOLUME;
        if (9 === b) return a.T_FILL;
        if (10 === b) return a.T_STROKE;
        if (11 === b) return a.T_SHADOW;
        if (12 === b) return a.T_SWITCH;
        if (13 === b) return a.T_BONE_ROTATE;
        if (14 === b) return a.T_BONE_LENGTH
    };
    r.tweendata = function (b, c) {
        if (null === c) return null;
        if (b === a.T_TRANSLATE) return r.pathval(c);
        if (b === a.T_ROTATE || b === a.T_ALPHA || b === a.T_BONE_ROTATE || b === a.T_BONE_LENGTH) {
            if (2 == c.length) return c;
            if (1 == c.length) return [c[0], c[0]]
        }
        if (b === a.T_SCALE || b === a.T_SHEAR) {
            if (4 == c.length) return [
                [c[0], c[1]],
                [c[2], c[3]]
            ];
            if (2 == c.length) return [
                [c[0], c[1]],
                [c[0], c[1]]
            ];
            if (1 == c.length) return [
                [c[0], c[0]],
                [c[0], c[0]]
            ]
        }
        if (b === a.T_FILL) return [r.fill(c[0]), r.fill(c[1])];
        if (b === a.T_STROKE) return [r.stroke(c[0]), r.stroke(c[1])];
        if (b === a.T_SHADOW) return [r.shadow(c[0]), r.shadow(c[1])];
        if (b === a.T_VOLUME) {
            if (2 == c.length) return c;
            if (1 == c.length) return [c[0], c[0]]
        }
        if (b === a.T_SWITCH) return c
    };
    r.easing = function (b) {
        if (!b) return null;
        if (w.str(b)) return {
            type: a.E_PATH,
            data: r.pathval("M0 0 " + b + " Z")
        };
        if (w.num(b)) return {
            type: a.E_STDF,
            data: b
        }
    };
    r.mode = function (b) {
        if (!b || 0 === b) return a.R_ONCE;
        if (1 === b) return a.R_LOOP;
        if (2 === b) return a.R_BOUNCE;
        if (3 === b) return a.R_STAY
    };
    r.fill = function (a) {
        if (!a) return u.fill("transparent");
        if (w.str(a)) return u.fill(a);
        if (w.arr(a)) return w.arr(a[0]) ? u.fill(r.grad(a)) : u.fill(r.pattern(a));
        c("Unknown type of brush")
    };
    r.stroke = function (b) {
        if (!b) return null;
        var c;
        w.str(b[1]) ? c = b[1] : w.arr(b[1]) && (c = w.arr(b[1][0]) ? r.grad(b[1]) : r.pattern(b[1]));
        return u.stroke(c, b[0], b[2] || a.PC_ROUND, b[3] || a.PC_ROUND, b[4])
    };
    r.shadow = function (a) {
        return a ? u.shadow(a[3], a[2], a[0],
            a[1]) : null
    };
    r.grad = function (a) {
        var b = a[0],
            d = a[1];
        a = a[2];
        d.length != a.length && c("Number of colors do not corresponds to number of offsets in gradient");
        for (var e = [], g = 0; g < a.length; g++) e.push([a[g], d[g]]);
        if (4 == b.length) return {
            dir: [
                [b[0], b[1]],
                [b[2], b[3]]
            ],
            stops: e
        };
        if (6 == b.length) return {
            r: [b[2], b[5]],
            dir: [
                [b[0], b[1]],
                [b[3], b[4]]
            ],
            stops: e
        };
        c("Unknown type of gradient with " + b.length + " points")
    };
    var E = ["no-repeat", "repeat", "repeat-x", "repeat-y"];
    r.pattern = function (a) {
        var b = anm.lastImportedProject.anim.elements[a[0]];
        if (b = r.leaf(r._type(b), b)) return b.alpha = a[5], b.disabled = !0, r.root.add(b), {
            elm: b,
            repeat: E[a[1]],
            w: a[2],
            h: a[3],
            bounds: a[4]
        }
    };
    r.pathval = function (a) {
        return new p(r._pathDecode(a))
    };
    r.audio = function (a) {
        var b = new q(a[1]);
        b.offset = a[2];
        b.master = a[3];
        return b
    };
    r.video = function (a) {
        var b = new y(a[1], a[3], a[4]);
        b.offset = a[2];
        return b
    };
    v.prototype.readBits = function (a) {
        for (var b = 0;;) {
            var c = a - this.bitPos;
            if (0 < c) b |= this.bitBuf << c, a -= this.bitPos, this.bitBuf = this.readUByte(), this.bitPos = 8;
            else return c = -c, b |= this.bitBuf >>
                c, this.bitPos = c, this.bitBuf &= (1 << c) - 1, b
        }
    };
    v.prototype.readUByte = function () {
        return this.buf[this.pos++] & 255
    };
    v.prototype.readSBits = function (a) {
        var b = this.readBits(a);
        0 !== (b & 1 << a - 1) && (b |= -1 << a);
        return b
    };
    n.decode = function (a) {
        return n.str2ab(n._decode(a))
    };
    var x = window.Int8Array || Array;
    n.str2ab = function (a) {
        for (var b = new x(a.length), c = 0, d = a.length; c < d; c++) b[c] = a.charCodeAt(c);
        return b
    };
    n._decode = function (a) {
        if (window.atob) return atob(a);
        var b, c, d, e, g, k = 0,
            m = 0,
            n = [];
        if (!a) return a;
        a += "";
        do b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)),
            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), d = b << 18 | c << 12 | e << 6 | g, b = d >> 16 & 255, c = d >> 8 & 255, d &= 255, 64 == e ? n[m++] = String.fromCharCode(b) : 64 == g ? n[m++] = String.fromCharCode(b, c) : n[m++] = String.fromCharCode(b, c, d); while (k < a.length);
        return n.join("")
    };
    b.prototype.put = function (a,
        b) {
        this.hash2val[this.hash(a)] = b
    };
    b.prototype.get = function (a) {
        return this.hash2val[this.hash(a)]
    };
    b.prototype.hash = function (a) {
        var b = 0,
            c, d;
        if (0 === a.length) return b;
        c = 0;
        for (l = a.length; c < l; c++) d = a.charCodeAt(c), b = (b << 5) - b + d, b |= 0;
        return b
    };
    e.prototype.load = r.project;
    e.Import = r;
    e.IMPORTER_ID = "ANM";
    return e
}();
anm.importers.register("animatron", AnimatronImporter);