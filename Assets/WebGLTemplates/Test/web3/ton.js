! function(t) {
    var e = {};

    function r(n) {
        if (e[n]) return e[n].exports;
        var i = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    r.m = t, r.c = e, r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function(t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) r.d(n, i, function(e) {
                return t[e]
            }.bind(null, i));
        return n
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 0)
}([function(t, e, r) {
    const n = r(1),
        i = r(19).default;
    n.Address = i;
    const o = r(20),
        s = r(23),
        u = r(25).default,
        {
            Contract: h
        } = r(24),
        a = r(27).default,
        c = r(28).default,
        l = r(84).default,
        f = r(85).default;
    class d {
        constructor(t) {
            this.version = "0.0.25", this.utils = n, this.Address = i, this.boc = o, this.Contract = h, this.provider = t || new u, this.wallet = new a(this.provider)
        }
        async getTransactions(t, e = 20, r, n, i) {
            return this.provider.getTransactions(t.toString(), e, r, n, i)
        }
        async getBalance(t) {
            return this.provider.getBalance(t.toString())
        }
        async sendBoc(t) {
            return this.provider.sendBoc(n.bytesToBase64(t))
        }
        async call(t, e, r = []) {
            return this.provider.call(t.toString(), e, r)
        }
    }
    d.version = "0.0.25", d.utils = n, d.Address = i, d.boc = o, d.HttpProvider = u, d.Contract = h, d.Wallets = a, d.ledger = {
        TransportWebUSB: c,
        TransportWebHID: l,
        BluetoothTransport: f,
        AppTon: s
    }, "undefined" != typeof window && (window.TonWeb = d), t.exports = d
}, function(t, e, r) {
    (function(e) {
        const n = r(7),
            i = r(10),
            o = r(12);
        let s = null;
        "undefined" == typeof window && (s = r(18));
        const u = [],
            h = {};
        for (let t = 0; t <= 255; t++) {
            let e = t.toString(16);
            e.length < 2 && (e = "0" + e), u.push(e), h[e] = t
        }
        const a = (() => {
            const t = [],
                e = "A".charCodeAt(0),
                r = "a".charCodeAt(0),
                n = "0".charCodeAt(0);
            for (let r = 0; r < 26; ++r) t.push(String.fromCharCode(e + r));
            for (let e = 0; e < 26; ++e) t.push(String.fromCharCode(r + e));
            for (let e = 0; e < 10; ++e) t.push(String.fromCharCode(n + e));
            return t.push("+"), t.push("/"), t
        })();

        function c(t) {
            return "undefined" == typeof window ? e.from(t, "base64").toString("binary") : atob(t)
        }
        t.exports = {
            BN: n,
            nacl: i,
            sha256: function(t) {
                return "undefined" == typeof window ? s.createHash("sha256").update(t).digest() : crypto.subtle.digest("SHA-256", t)
            },
            fromNano: function(t) {
                return o.fromWei(t, "gwei")
            },
            toNano: function(t) {
                return o.toWei(t, "gwei")
            },
            bytesToHex: function(t) {
                const e = [];
                for (let r = 0; r < t.byteLength; r++) e.push(u[t[r]]);
                return e.join("")
            },
            hexToBytes: function(t) {
                const e = (t = t.toLowerCase()).length;
                if (e % 2 != 0) throw "hex string must have length a multiple of 2";
                const r = e / 2,
                    n = new Uint8Array(r);
                for (let e = 0; e < r; e++) {
                    const r = 2 * e,
                        i = t.substring(r, r + 2);
                    if (!h.hasOwnProperty(i)) throw new Error("invalid hex character " + i);
                    n[e] = h[i]
                }
                return n
            },
            stringToBytes: function(t, e = 1) {
                let r, n;
                1 === e && (r = new ArrayBuffer(t.length), n = new Uint8Array(r)), 2 === e && (r = new ArrayBuffer(2 * t.length), n = new Uint16Array(r)), 4 === e && (r = new ArrayBuffer(4 * t.length), n = new Uint32Array(r));
                for (let e = 0, r = t.length; e < r; e++) n[e] = t.charCodeAt(e);
                return new Uint8Array(n.buffer)
            },
            crc32c: function(t) {
                const e = function(t, e) {
                        const r = 2197175160;
                        t ^= 4294967295;
                        for (let n = 0; n < e.length; n++) t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t ^= e[n]) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1;
                        return 4294967295 ^ t
                    }(0, t),
                    r = new ArrayBuffer(4);
                return new DataView(r).setUint32(0, e, !1), new Uint8Array(r).reverse()
            },
            crc16: function(t) {
                let e = 0;
                const r = new Uint8Array(t.length + 2);
                r.set(t);
                for (let t of r) {
                    let r = 128;
                    for (; r > 0;) e <<= 1, t & r && (e += 1), r >>= 1, e > 65535 && (e &= 65535, e ^= 4129)
                }
                return new Uint8Array([Math.floor(e / 256), e % 256])
            },
            concatBytes: function(t, e) {
                const r = new Uint8Array(t.length + e.length);
                return r.set(t), r.set(e, t.length), r
            },
            bytesToBase64: function(t) {
                let e, r = "";
                const n = t.length;
                for (e = 2; e < n; e += 3) r += a[t[e - 2] >> 2], r += a[(3 & t[e - 2]) << 4 | t[e - 1] >> 4], r += a[(15 & t[e - 1]) << 2 | t[e] >> 6], r += a[63 & t[e]];
                return e === n + 1 && (r += a[t[e - 2] >> 2], r += a[(3 & t[e - 2]) << 4], r += "=="), e === n && (r += a[t[e - 2] >> 2], r += a[(3 & t[e - 2]) << 4 | t[e - 1] >> 4], r += a[(15 & t[e - 1]) << 2], r += "="), r
            },
            base64ToBytes: function(t) {
                const e = c(t),
                    r = e.length,
                    n = new Uint8Array(r);
                for (let t = 0; t < r; t++) n[t] = e.charCodeAt(t);
                return n
            },
            base64toString: c,
            stringToBase64: function(t) {
                return "undefined" == typeof window ? e.from(t, "binary").toString("base64") : btoa(t)
            },
            compareBytes: function(t, e) {
                return t.toString() === e.toString()
            },
            readNBytesUIntFromArray: function(t, e) {
                let r = 0;
                for (let n = 0; n < t; n++) r *= 256, r += e[n];
                return r
            }
        }
    }).call(this, r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    (function(t) {
        window.wallet = {
            connection: "",
            connect,
            accountIdtt: "1",
            balancesd: 0,
            buyKey,
            buyMistery,
            ans: false,
        };
        async function connect() {
            window.wallet.ans = false;
            if (!window.tonProtocolVersion || window.tonProtocolVersion < 1) {
                window.alert('Please update your TON Wallet Extension');
                return;
            }
            window.wallet.connection = window.ton;
            window.wallet.accountIdtt = (await window.wallet.connection.send('ton_requestAccounts'))[0];
            const signature = await window.wallet.connection.send(
                'ton_rawSign',
                [{
                    data: 'ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789'
                }]
            );
            window.wallet.balancesd = Math.floor(parseInt(await window.wallet.connection.send('ton_getBalance'))/1000000000);
            if (!isEmpty(signature)) {
                window.wallet.ans = true;
            }
        }
        async function buyKey() {
            window.wallet.ans = false;
            const signature = await window.wallet.connection.send(
                'ton_sendTransaction',
                [{
                    to: 'kQAxHsboYqn9MkiWkGbk0DcY6xgjz94TYncZynBPftgl6-7k',
                    value: '1000000000',
                    data: 'buy key',
                    dataType: 'text'
                }]
            );            
            window.wallet.balancesd = Math.floor(parseInt(await window.wallet.connection.send('ton_getBalance'))/1000000000);
            if (signature) {
                window.wallet.ans = true;           
            }
        }
        async function buyMistery() {
            window.wallet.ans = false;
            const signature = await window.wallet.connection.send(
                'ton_sendTransaction',
                [{
                    to: 'EQCPEA0jpiiA3ORsn_IEjzdsQKIzN_7KhvC-zgh-lEF-qKSg',
                    value: '44000000000',
                    data: 'buy mistery box',
                    dataType: 'text'
                }]
            );
            window.wallet.balancesd = Math.floor(parseInt(await window.wallet.connection.send('ton_getBalance'))/1000000000);
            if (signature) {
                window.wallet.ans = true;
            }
        }
        var n = r(4),
            i = r(5),
            o = r(6);

        function s() {
            return h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function u(t, e) {
            if (s() < e) throw new RangeError("Invalid typed array length");
            return h.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = h.prototype : (null === t && (t = new h(e)), t.length = e), t
        }

        function h(t, e, r) {
            if (!(h.TYPED_ARRAY_SUPPORT || this instanceof h)) return new h(t, e, r);
            if ("number" == typeof t) {
                if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                return l(this, t)
            }
            return a(this, t, e, r)
        }

        function a(t, e, r, n) {
            if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, n) {
                if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n);
                h.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = h.prototype : t = f(t, e);
                return t
            }(t, e, r, n) : "string" == typeof e ? function(t, e, r) {
                "string" == typeof r && "" !== r || (r = "utf8");
                if (!h.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                var n = 0 | p(e, r),
                    i = (t = u(t, n)).write(e, r);
                i !== n && (t = t.slice(0, i));
                return t
            }(t, e, r) : function(t, e) {
                if (h.isBuffer(e)) {
                    var r = 0 | d(e.length);
                    return 0 === (t = u(t, r)).length || e.copy(t, 0, 0, r), t
                }
                if (e) {
                    if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (n = e.length) != n ? u(t, 0) : f(t, e);
                    if ("Buffer" === e.type && o(e.data)) return f(t, e.data)
                }
                var n;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(t, e)
        }

        function c(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
            if (t < 0) throw new RangeError('"size" argument must not be negative')
        }

        function l(t, e) {
            if (c(e), t = u(t, e < 0 ? 0 : 0 | d(e)), !h.TYPED_ARRAY_SUPPORT)
                for (var r = 0; r < e; ++r) t[r] = 0;
            return t
        }

        function f(t, e) {
            var r = e.length < 0 ? 0 : 0 | d(e.length);
            t = u(t, r);
            for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
            return t
        }

        function d(t) {
            if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | t
        }

        function p(t, e) {
            if (h.isBuffer(t)) return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var r = t.length;
            if (0 === r) return 0;
            for (var n = !1;;) switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return r;
                case "utf8":
                case "utf-8":
                case void 0:
                    return F(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * r;
                case "hex":
                    return r >>> 1;
                case "base64":
                    return $(t).length;
                default:
                    if (n) return F(t).length;
                    e = ("" + e).toLowerCase(), n = !0
            }
        }

        function m(t, e, r) {
            var n = !1;
            if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
            if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
            if ((r >>>= 0) <= (e >>>= 0)) return "";
            for (t || (t = "utf8");;) switch (t) {
                case "hex":
                    return T(this, e, r);
                case "utf8":
                case "utf-8":
                    return A(this, e, r);
                case "ascii":
                    return O(this, e, r);
                case "latin1":
                case "binary":
                    return I(this, e, r);
                case "base64":
                    return x(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return N(this, e, r);
                default:
                    if (n) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), n = !0
            }
        }

        function v(t, e, r) {
            var n = t[e];
            t[e] = t[r], t[r] = n
        }

        function b(t, e, r, n, i) {
            if (0 === t.length) return -1;
            if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                if (i) return -1;
                r = t.length - 1
            } else if (r < 0) {
                if (!i) return -1;
                r = 0
            }
            if ("string" == typeof e && (e = h.from(e, n)), h.isBuffer(e)) return 0 === e.length ? -1 : y(t, e, r, n, i);
            if ("number" == typeof e) return e &= 255, h.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : y(t, [e], r, n, i);
            throw new TypeError("val must be string, number or Buffer")
        }

        function y(t, e, r, n, i) {
            var o, s = 1,
                u = t.length,
                h = e.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || e.length < 2) return -1;
                s = 2, u /= 2, h /= 2, r /= 2
            }

            function a(t, e) {
                return 1 === s ? t[e] : t.readUInt16BE(e * s)
            }
            if (i) {
                var c = -1;
                for (o = r; o < u; o++)
                    if (a(t, o) === a(e, -1 === c ? 0 : o - c)) {
                        if (-1 === c && (c = o), o - c + 1 === h) return c * s
                    } else - 1 !== c && (o -= o - c), c = -1
            } else
                for (r + h > u && (r = u - h), o = r; o >= 0; o--) {
                    for (var l = !0, f = 0; f < h; f++)
                        if (a(t, o + f) !== a(e, f)) {
                            l = !1;
                            break
                        } if (l) return o
                }
            return -1
        }

        function g(t, e, r, n) {
            r = Number(r) || 0;
            var i = t.length - r;
            n ? (n = Number(n)) > i && (n = i) : n = i;
            var o = e.length;
            if (o % 2 != 0) throw new TypeError("Invalid hex string");
            n > o / 2 && (n = o / 2);
            for (var s = 0; s < n; ++s) {
                var u = parseInt(e.substr(2 * s, 2), 16);
                if (isNaN(u)) return s;
                t[r + s] = u
            }
            return s
        }

        function w(t, e, r, n) {
            return V(F(e, t.length - r), t, r, n)
        }

        function M(t, e, r, n) {
            return V(function(t) {
                for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                return e
            }(e), t, r, n)
        }

        function _(t, e, r, n) {
            return M(t, e, r, n)
        }

        function S(t, e, r, n) {
            return V($(e), t, r, n)
        }

        function E(t, e, r, n) {
            return V(function(t, e) {
                for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = t.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
                return o
            }(e, t.length - r), t, r, n)
        }

        function x(t, e, r) {
            return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r))
        }

        function A(t, e, r) {
            r = Math.min(t.length, r);
            for (var n = [], i = e; i < r;) {
                var o, s, u, h, a = t[i],
                    c = null,
                    l = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
                if (i + l <= r) switch (l) {
                    case 1:
                        a < 128 && (c = a);
                        break;
                    case 2:
                        128 == (192 & (o = t[i + 1])) && (h = (31 & a) << 6 | 63 & o) > 127 && (c = h);
                        break;
                    case 3:
                        o = t[i + 1], s = t[i + 2], 128 == (192 & o) && 128 == (192 & s) && (h = (15 & a) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (h < 55296 || h > 57343) && (c = h);
                        break;
                    case 4:
                        o = t[i + 1], s = t[i + 2], u = t[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & u) && (h = (15 & a) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & u) > 65535 && h < 1114112 && (c = h)
                }
                null === c ? (c = 65533, l = 1) : c > 65535 && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), i += l
            }
            return function(t) {
                var e = t.length;
                if (e <= 4096) return String.fromCharCode.apply(String, t);
                var r = "",
                    n = 0;
                for (; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += 4096));
                return r
            }(n)
        }
        e.Buffer = h, e.SlowBuffer = function(t) {
            +t != t && (t = 0);
            return h.alloc(+t)
        }, e.INSPECT_MAX_BYTES = 50, h.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }(), e.kMaxLength = s(), h.poolSize = 8192, h._augment = function(t) {
            return t.__proto__ = h.prototype, t
        }, h.from = function(t, e, r) {
            return a(null, t, e, r)
        }, h.TYPED_ARRAY_SUPPORT && (h.prototype.__proto__ = Uint8Array.prototype, h.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, {
            value: null,
            configurable: !0
        })), h.alloc = function(t, e, r) {
            return function(t, e, r, n) {
                return c(e), e <= 0 ? u(t, e) : void 0 !== r ? "string" == typeof n ? u(t, e).fill(r, n) : u(t, e).fill(r) : u(t, e)
            }(null, t, e, r)
        }, h.allocUnsafe = function(t) {
            return l(null, t)
        }, h.allocUnsafeSlow = function(t) {
            return l(null, t)
        }, h.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }, h.compare = function(t, e) {
            if (!h.isBuffer(t) || !h.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
            if (t === e) return 0;
            for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
                if (t[i] !== e[i]) {
                    r = t[i], n = e[i];
                    break
                } return r < n ? -1 : n < r ? 1 : 0
        }, h.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, h.concat = function(t, e) {
            if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return h.alloc(0);
            var r;
            if (void 0 === e)
                for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            var n = h.allocUnsafe(e),
                i = 0;
            for (r = 0; r < t.length; ++r) {
                var s = t[r];
                if (!h.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(n, i), i += s.length
            }
            return n
        }, h.byteLength = p, h.prototype._isBuffer = !0, h.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) v(this, e, e + 1);
            return this
        }, h.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4) v(this, e, e + 3), v(this, e + 1, e + 2);
            return this
        }, h.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8) v(this, e, e + 7), v(this, e + 1, e + 6), v(this, e + 2, e + 5), v(this, e + 3, e + 4);
            return this
        }, h.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : m.apply(this, arguments)
        }, h.prototype.equals = function(t) {
            if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === h.compare(this, t)
        }, h.prototype.inspect = function() {
            var t = "",
                r = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">"
        }, h.prototype.compare = function(t, e, r, n, i) {
            if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
            if (n >= i && e >= r) return 0;
            if (n >= i) return -1;
            if (e >= r) return 1;
            if (this === t) return 0;
            for (var o = (i >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (e >>>= 0), u = Math.min(o, s), a = this.slice(n, i), c = t.slice(e, r), l = 0; l < u; ++l)
                if (a[l] !== c[l]) {
                    o = a[l], s = c[l];
                    break
                } return o < s ? -1 : s < o ? 1 : 0
        }, h.prototype.includes = function(t, e, r) {
            return -1 !== this.indexOf(t, e, r)
        }, h.prototype.indexOf = function(t, e, r) {
            return b(this, t, e, r, !0)
        }, h.prototype.lastIndexOf = function(t, e, r) {
            return b(this, t, e, r, !1)
        }, h.prototype.write = function(t, e, r, n) {
            if (void 0 === e) n = "utf8", r = this.length, e = 0;
            else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
            else {
                if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
            }
            var i = this.length - e;
            if ((void 0 === r || r > i) && (r = i), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1;;) switch (n) {
                case "hex":
                    return g(this, t, e, r);
                case "utf8":
                case "utf-8":
                    return w(this, t, e, r);
                case "ascii":
                    return M(this, t, e, r);
                case "latin1":
                case "binary":
                    return _(this, t, e, r);
                case "base64":
                    return S(this, t, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return E(this, t, e, r);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(), o = !0
            }
        }, h.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };

        function O(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
            return n
        }

        function I(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
            return n
        }

        function T(t, e, r) {
            var n = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
            for (var i = "", o = e; o < r; ++o) i += P(t[o]);
            return i
        }

        function N(t, e, r) {
            for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }

        function R(t, e, r) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
        }

        function B(t, e, r, n, i, o) {
            if (!h.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length) throw new RangeError("Index out of range")
        }

        function j(t, e, r, n) {
            e < 0 && (e = 65535 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i) t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
        }

        function C(t, e, r, n) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i) t[r + i] = e >>> 8 * (n ? i : 3 - i) & 255
        }

        function D(t, e, r, n, i, o) {
            if (r + n > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range")
        }

        function U(t, e, r, n, o) {
            return o || D(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4
        }

        function L(t, e, r, n, o) {
            return o || D(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8
        }
        h.prototype.slice = function(t, e) {
            var r, n = this.length;
            if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t), h.TYPED_ARRAY_SUPPORT)(r = this.subarray(t, e)).__proto__ = h.prototype;
            else {
                var i = e - t;
                r = new h(i, void 0);
                for (var o = 0; o < i; ++o) r[o] = this[o + t]
            }
            return r
        }, h.prototype.readUIntLE = function(t, e, r) {
            t |= 0, e |= 0, r || R(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
            return n
        }, h.prototype.readUIntBE = function(t, e, r) {
            t |= 0, e |= 0, r || R(t, e, this.length);
            for (var n = this[t + --e], i = 1; e > 0 && (i *= 256);) n += this[t + --e] * i;
            return n
        }, h.prototype.readUInt8 = function(t, e) {
            return e || R(t, 1, this.length), this[t]
        }, h.prototype.readUInt16LE = function(t, e) {
            return e || R(t, 2, this.length), this[t] | this[t + 1] << 8
        }, h.prototype.readUInt16BE = function(t, e) {
            return e || R(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, h.prototype.readUInt32LE = function(t, e) {
            return e || R(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, h.prototype.readUInt32BE = function(t, e) {
            return e || R(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, h.prototype.readIntLE = function(t, e, r) {
            t |= 0, e |= 0, r || R(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n
        }, h.prototype.readIntBE = function(t, e, r) {
            t |= 0, e |= 0, r || R(t, e, this.length);
            for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o
        }, h.prototype.readInt8 = function(t, e) {
            return e || R(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, h.prototype.readInt16LE = function(t, e) {
            e || R(t, 2, this.length);
            var r = this[t] | this[t + 1] << 8;
            return 32768 & r ? 4294901760 | r : r
        }, h.prototype.readInt16BE = function(t, e) {
            e || R(t, 2, this.length);
            var r = this[t + 1] | this[t] << 8;
            return 32768 & r ? 4294901760 | r : r
        }, h.prototype.readInt32LE = function(t, e) {
            return e || R(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, h.prototype.readInt32BE = function(t, e) {
            return e || R(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, h.prototype.readFloatLE = function(t, e) {
            return e || R(t, 4, this.length), i.read(this, t, !0, 23, 4)
        }, h.prototype.readFloatBE = function(t, e) {
            return e || R(t, 4, this.length), i.read(this, t, !1, 23, 4)
        }, h.prototype.readDoubleLE = function(t, e) {
            return e || R(t, 8, this.length), i.read(this, t, !0, 52, 8)
        }, h.prototype.readDoubleBE = function(t, e) {
            return e || R(t, 8, this.length), i.read(this, t, !1, 52, 8)
        }, h.prototype.writeUIntLE = function(t, e, r, n) {
            (t = +t, e |= 0, r |= 0, n) || B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = 1,
                o = 0;
            for (this[e] = 255 & t; ++o < r && (i *= 256);) this[e + o] = t / i & 255;
            return e + r
        }, h.prototype.writeUIntBE = function(t, e, r, n) {
            (t = +t, e |= 0, r |= 0, n) || B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = r - 1,
                o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
            return e + r
        }, h.prototype.writeUInt8 = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 1, 255, 0), h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
        }, h.prototype.writeUInt16LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : j(this, t, e, !0), e + 2
        }, h.prototype.writeUInt16BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : j(this, t, e, !1), e + 2
        }, h.prototype.writeUInt32LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : C(this, t, e, !0), e + 4
        }, h.prototype.writeUInt32BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : C(this, t, e, !1), e + 4
        }, h.prototype.writeIntLE = function(t, e, r, n) {
            if (t = +t, e |= 0, !n) {
                var i = Math.pow(2, 8 * r - 1);
                B(this, t, e, r, i - 1, -i)
            }
            var o = 0,
                s = 1,
                u = 0;
            for (this[e] = 255 & t; ++o < r && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + o - 1] && (u = 1), this[e + o] = (t / s >> 0) - u & 255;
            return e + r
        }, h.prototype.writeIntBE = function(t, e, r, n) {
            if (t = +t, e |= 0, !n) {
                var i = Math.pow(2, 8 * r - 1);
                B(this, t, e, r, i - 1, -i)
            }
            var o = r - 1,
                s = 1,
                u = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + o + 1] && (u = 1), this[e + o] = (t / s >> 0) - u & 255;
            return e + r
        }, h.prototype.writeInt8 = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 1, 127, -128), h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, h.prototype.writeInt16LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : j(this, t, e, !0), e + 2
        }, h.prototype.writeInt16BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : j(this, t, e, !1), e + 2
        }, h.prototype.writeInt32LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 2147483647, -2147483648), h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : C(this, t, e, !0), e + 4
        }, h.prototype.writeInt32BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : C(this, t, e, !1), e + 4
        }, h.prototype.writeFloatLE = function(t, e, r) {
            return U(this, t, e, !0, r)
        }, h.prototype.writeFloatBE = function(t, e, r) {
            return U(this, t, e, !1, r)
        }, h.prototype.writeDoubleLE = function(t, e, r) {
            return L(this, t, e, !0, r)
        }, h.prototype.writeDoubleBE = function(t, e, r) {
            return L(this, t, e, !1, r)
        }, h.prototype.copy = function(t, e, r, n) {
            if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            var i, o = n - r;
            if (this === t && r < e && e < n)
                for (i = o - 1; i >= 0; --i) t[i + e] = this[i + r];
            else if (o < 1e3 || !h.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < o; ++i) t[i + e] = this[i + r];
            else Uint8Array.prototype.set.call(t, this.subarray(r, r + o), e);
            return o
        }, h.prototype.fill = function(t, e, r, n) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i)
                }
                if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !h.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
            } else "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
            if (r <= e) return this;
            var o;
            if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
                for (o = e; o < r; ++o) this[o] = t;
            else {
                var s = h.isBuffer(t) ? t : F(new h(t, n).toString()),
                    u = s.length;
                for (o = 0; o < r - e; ++o) this[o + e] = s[o % u]
            }
            return this
        };
        var k = /[^+\/0-9A-Za-z-_]/g;

        function P(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }

        function F(t, e) {
            var r;
            e = e || 1 / 0;
            for (var n = t.length, i = null, o = [], s = 0; s < n; ++s) {
                if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                    if (!i) {
                        if (r > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === n) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        (e -= 3) > -1 && o.push(239, 191, 189), i = r;
                        continue
                    }
                    r = 65536 + (i - 55296 << 10 | r - 56320)
                } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                if (i = null, r < 128) {
                    if ((e -= 1) < 0) break;
                    o.push(r)
                } else if (r < 2048) {
                    if ((e -= 2) < 0) break;
                    o.push(r >> 6 | 192, 63 & r | 128)
                } else if (r < 65536) {
                    if ((e -= 3) < 0) break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                } else {
                    if (!(r < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                }
            }
            return o
        }

        function $(t) {
            return n.toByteArray(function(t) {
                if ((t = function(t) {
                        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                    }(t).replace(k, "")).length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }(t))
        }

        function V(t, e, r, n) {
            for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
            return i
        }
    }).call(this, r(3))
}, function(t, e) {
    var r;
    r = function() {
        return this
    }();
    try {
        r = r || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (r = window)
    }
    t.exports = r
}, function(t, e, r) {
    "use strict";
    e.byteLength = function(t) {
        var e = a(t),
            r = e[0],
            n = e[1];
        return 3 * (r + n) / 4 - n
    }, e.toByteArray = function(t) {
        var e, r, n = a(t),
            s = n[0],
            u = n[1],
            h = new o(function(t, e, r) {
                return 3 * (e + r) / 4 - r
            }(0, s, u)),
            c = 0,
            l = u > 0 ? s - 4 : s;
        for (r = 0; r < l; r += 4) e = i[t.charCodeAt(r)] << 18 | i[t.charCodeAt(r + 1)] << 12 | i[t.charCodeAt(r + 2)] << 6 | i[t.charCodeAt(r + 3)], h[c++] = e >> 16 & 255, h[c++] = e >> 8 & 255, h[c++] = 255 & e;
        2 === u && (e = i[t.charCodeAt(r)] << 2 | i[t.charCodeAt(r + 1)] >> 4, h[c++] = 255 & e);
        1 === u && (e = i[t.charCodeAt(r)] << 10 | i[t.charCodeAt(r + 1)] << 4 | i[t.charCodeAt(r + 2)] >> 2, h[c++] = e >> 8 & 255, h[c++] = 255 & e);
        return h
    }, e.fromByteArray = function(t) {
        for (var e, r = t.length, i = r % 3, o = [], s = 0, u = r - i; s < u; s += 16383) o.push(c(t, s, s + 16383 > u ? u : s + 16383));
        1 === i ? (e = t[r - 1], o.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1], o.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
        return o.join("")
    };
    for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, h = s.length; u < h; ++u) n[u] = s[u], i[s.charCodeAt(u)] = u;

    function a(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = t.indexOf("=");
        return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4]
    }

    function c(t, e, r) {
        for (var i, o, s = [], u = e; u < r; u += 3) i = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
        return s.join("")
    }
    i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
}, function(t, e) {
    e.read = function(t, e, r, n, i) {
        var o, s, u = 8 * i - n - 1,
            h = (1 << u) - 1,
            a = h >> 1,
            c = -7,
            l = r ? i - 1 : 0,
            f = r ? -1 : 1,
            d = t[e + l];
        for (l += f, o = d & (1 << -c) - 1, d >>= -c, c += u; c > 0; o = 256 * o + t[e + l], l += f, c -= 8);
        for (s = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; s = 256 * s + t[e + l], l += f, c -= 8);
        if (0 === o) o = 1 - a;
        else {
            if (o === h) return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, n), o -= a
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - n)
    }, e.write = function(t, e, r, n, i, o) {
        var s, u, h, a = 8 * o - i - 1,
            c = (1 << a) - 1,
            l = c >> 1,
            f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            d = n ? 0 : o - 1,
            p = n ? 1 : -1,
            m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = c) : (s = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -s)) < 1 && (s--, h *= 2), (e += s + l >= 1 ? f / h : f * Math.pow(2, 1 - l)) * h >= 2 && (s++, h /= 2), s + l >= c ? (u = 0, s = c) : s + l >= 1 ? (u = (e * h - 1) * Math.pow(2, i), s += l) : (u = e * Math.pow(2, l - 1) * Math.pow(2, i), s = 0)); i >= 8; t[r + d] = 255 & u, d += p, u /= 256, i -= 8);
        for (s = s << i | u, a += i; a > 0; t[r + d] = 255 & s, d += p, s /= 256, a -= 8);
        t[r + d - p] |= 128 * m
    }
}, function(t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == r.call(t)
    }
}, function(t, e, r) {
    (function(t) {
        ! function(t, e) {
            "use strict";

            function n(t, e) {
                if (!t) throw new Error(e || "Assertion failed")
            }

            function i(t, e) {
                t.super_ = e;
                var r = function() {};
                r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
            }

            function o(t, e, r) {
                if (o.isBN(t)) return t;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
            }
            var s;
            "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
            try {
                s = r(9).Buffer
            } catch (t) {}

            function u(t, e, r) {
                for (var i = 0, o = Math.min(t.length, r), s = 0, u = e; u < o; u++) {
                    var h, a = t.charCodeAt(u) - 48;
                    i <<= 4, i |= h = a >= 49 && a <= 54 ? a - 49 + 10 : a >= 17 && a <= 22 ? a - 17 + 10 : a, s |= h
                }
                return n(!(240 & s), "Invalid character in " + t), i
            }

            function h(t, e, r, i) {
                for (var o = 0, s = 0, u = Math.min(t.length, r), h = e; h < u; h++) {
                    var a = t.charCodeAt(h) - 48;
                    o *= i, s = a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a, n(a >= 0 && s < i, "Invalid character"), o += s
                }
                return o
            }

            function a(t, e) {
                t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red
            }

            function c() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            }
            o.isBN = function(t) {
                return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
            }, o.max = function(t, e) {
                return t.cmp(e) > 0 ? t : e
            }, o.min = function(t, e) {
                return t.cmp(e) < 0 ? t : e
            }, o.prototype._init = function(t, e, r) {
                if ("number" == typeof t) return this._initNumber(t, e, r);
                if ("object" == typeof t) return this._initArray(t, e, r);
                "hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
                var i = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && i++, 16 === e ? this._parseHex(t, i) : this._parseBase(t, e, i), "-" === t[0] && (this.negative = 1), this._strip(), "le" === r && this._initArray(this.toArray(), e, r)
            }, o.prototype._initNumber = function(t, e, r) {
                t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (n(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
            }, o.prototype._initArray = function(t, e, r) {
                if (n("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var o, s, u = 0;
                if ("be" === r)
                    for (i = t.length - 1, o = 0; i >= 0; i -= 3) s = t[i] | t[i - 1] << 8 | t[i - 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);
                else if ("le" === r)
                    for (i = 0, o = 0; i < t.length; i += 3) s = t[i] | t[i + 1] << 8 | t[i + 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);
                return this._strip()
            }, o.prototype._parseHex = function(t, e) {
                this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                for (var r = 0; r < this.length; r++) this.words[r] = 0;
                var n, i, o = 0;
                for (r = t.length - 6, n = 0; r >= e; r -= 6) i = u(t, r, r + 6), this.words[n] |= i << o & 67108863, this.words[n + 1] |= i >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, n++);
                r + 6 !== e && (i = u(t, e, r + 6), this.words[n] |= i << o & 67108863, this.words[n + 1] |= i >>> 26 - o & 4194303), this._strip()
            }, o.prototype._parseBase = function(t, e, r) {
                this.words = [0], this.length = 1;
                for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
                n--, i = i / e | 0;
                for (var o = t.length - r, s = o % n, u = Math.min(o, o - s) + r, a = 0, c = r; c < u; c += n) a = h(t, c, c + n, e), this.imuln(i), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
                if (0 !== s) {
                    var l = 1;
                    for (a = h(t, c, t.length, e), c = 0; c < s; c++) l *= e;
                    this.imuln(l), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a)
                }
            }, o.prototype.copy = function(t) {
                t.words = new Array(this.length);
                for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                t.length = this.length, t.negative = this.negative, t.red = this.red
            }, o.prototype._move = function(t) {
                a(t, this)
            }, o.prototype.clone = function() {
                var t = new o(null);
                return this.copy(t), t
            }, o.prototype._expand = function(t) {
                for (; this.length < t;) this.words[this.length++] = 0;
                return this
            }, o.prototype._strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, o.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, "undefined" != typeof Symbol && "function" == typeof Symbol.for ? o.prototype[Symbol.for("nodejs.util.inspect.custom")] = c : o.prototype.inspect = c;
            var l = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                d = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
            o.prototype.toString = function(t, e) {
                var r;
                if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                    r = "";
                    for (var i = 0, o = 0, s = 0; s < this.length; s++) {
                        var u = this.words[s],
                            h = (16777215 & (u << i | o)).toString(16);
                        r = 0 !== (o = u >>> 24 - i & 16777215) || s !== this.length - 1 ? l[6 - h.length] + h + r : h + r, (i += 2) >= 26 && (i -= 26, s--)
                    }
                    for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                if (t === (0 | t) && t >= 2 && t <= 36) {
                    var a = f[t],
                        c = d[t];
                    r = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var m = p.modrn(c).toString(t);
                        r = (p = p.idivn(c)).isZero() ? m + r : l[a - m.length] + m + r
                    }
                    for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                n(!1, "Base should be between 2 and 36")
            }, o.prototype.toNumber = function() {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
            }, o.prototype.toJSON = function() {
                return this.toString(16, 2)
            }, s && (o.prototype.toBuffer = function(t, e) {
                return this.toArrayLike(s, t, e)
            }), o.prototype.toArray = function(t, e) {
                return this.toArrayLike(Array, t, e)
            };

            function p(t, e, r) {
                r.negative = e.negative ^ t.negative;
                var n = t.length + e.length | 0;
                r.length = n, n = n - 1 | 0;
                var i = 0 | t.words[0],
                    o = 0 | e.words[0],
                    s = i * o,
                    u = 67108863 & s,
                    h = s / 67108864 | 0;
                r.words[0] = u;
                for (var a = 1; a < n; a++) {
                    for (var c = h >>> 26, l = 67108863 & h, f = Math.min(a, e.length - 1), d = Math.max(0, a - t.length + 1); d <= f; d++) {
                        var p = a - d | 0;
                        c += (s = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + l) / 67108864 | 0, l = 67108863 & s
                    }
                    r.words[a] = 0 | l, h = 0 | c
                }
                return 0 !== h ? r.words[a] = 0 | h : r.length--, r._strip()
            }
            o.prototype.toArrayLike = function(t, e, r) {
                this._strip();
                var i = this.byteLength(),
                    o = r || Math.max(1, i);
                n(i <= o, "byte array longer than desired length"), n(o > 0, "Requested array length <= 0");
                var s = function(t, e) {
                    return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
                }(t, o);
                return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, i), s
            }, o.prototype._toArrayLikeLE = function(t, e) {
                for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
                    var s = this.words[i] << o | n;
                    t[r++] = 255 & s, r < t.length && (t[r++] = s >> 8 & 255), r < t.length && (t[r++] = s >> 16 & 255), 6 === o ? (r < t.length && (t[r++] = s >> 24 & 255), n = 0, o = 0) : (n = s >>> 24, o += 2)
                }
                if (r < t.length)
                    for (t[r++] = n; r < t.length;) t[r++] = 0
            }, o.prototype._toArrayLikeBE = function(t, e) {
                for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
                    var s = this.words[i] << o | n;
                    t[r--] = 255 & s, r >= 0 && (t[r--] = s >> 8 & 255), r >= 0 && (t[r--] = s >> 16 & 255), 6 === o ? (r >= 0 && (t[r--] = s >> 24 & 255), n = 0, o = 0) : (n = s >>> 24, o += 2)
                }
                if (r >= 0)
                    for (t[r--] = n; r >= 0;) t[r--] = 0
            }, Math.clz32 ? o.prototype._countBits = function(t) {
                return 32 - Math.clz32(t)
            } : o.prototype._countBits = function(t) {
                var e = t,
                    r = 0;
                return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
            }, o.prototype._zeroBits = function(t) {
                if (0 === t) return 26;
                var e = t,
                    r = 0;
                return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7), 0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 & e) && r++, r
            }, o.prototype.bitLength = function() {
                var t = this.words[this.length - 1],
                    e = this._countBits(t);
                return 26 * (this.length - 1) + e
            }, o.prototype.zeroBits = function() {
                if (this.isZero()) return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                    var r = this._zeroBits(this.words[e]);
                    if (t += r, 26 !== r) break
                }
                return t
            }, o.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }, o.prototype.toTwos = function(t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }, o.prototype.fromTwos = function(t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }, o.prototype.isNeg = function() {
                return 0 !== this.negative
            }, o.prototype.neg = function() {
                return this.clone().ineg()
            }, o.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1), this
            }, o.prototype.iuor = function(t) {
                for (; this.length < t.length;) this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                return this._strip()
            }, o.prototype.ior = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuor(t)
            }, o.prototype.or = function(t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }, o.prototype.uor = function(t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }, o.prototype.iuand = function(t) {
                var e;
                e = this.length > t.length ? t : this;
                for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                return this.length = e.length, this._strip()
            }, o.prototype.iand = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuand(t)
            }, o.prototype.and = function(t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }, o.prototype.uand = function(t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }, o.prototype.iuxor = function(t) {
                var e, r;
                this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
                if (this !== e)
                    for (; n < e.length; n++) this.words[n] = e.words[n];
                return this.length = e.length, this._strip()
            }, o.prototype.ixor = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuxor(t)
            }, o.prototype.xor = function(t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }, o.prototype.uxor = function(t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }, o.prototype.inotn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = 0 | Math.ceil(t / 26),
                    r = t % 26;
                this._expand(e), r > 0 && e--;
                for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
                return r > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - r), this._strip()
            }, o.prototype.notn = function(t) {
                return this.clone().inotn(t)
            }, o.prototype.setn = function(t, e) {
                n("number" == typeof t && t >= 0);
                var r = t / 26 | 0,
                    i = t % 26;
                return this._expand(r + 1), this.words[r] = e ? this.words[r] | 1 << i : this.words[r] & ~(1 << i), this._strip()
            }, o.prototype.iadd = function(t) {
                var e, r, n;
                if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                this.length > t.length ? (r = this, n = t) : (r = t, n = this);
                for (var i = 0, o = 0; o < n.length; o++) e = (0 | r.words[o]) + (0 | n.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                for (; 0 !== i && o < r.length; o++) e = (0 | r.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                if (this.length = r.length, 0 !== i) this.words[this.length] = i, this.length++;
                else if (r !== this)
                    for (; o < r.length; o++) this.words[o] = r.words[o];
                return this
            }, o.prototype.add = function(t) {
                var e;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }, o.prototype.isub = function(t) {
                if (0 !== t.negative) {
                    t.negative = 0;
                    var e = this.iadd(t);
                    return t.negative = 1, e._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                var r, n, i = this.cmp(t);
                if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                i > 0 ? (r = this, n = t) : (r = t, n = this);
                for (var o = 0, s = 0; s < n.length; s++) o = (e = (0 | r.words[s]) - (0 | n.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                for (; 0 !== o && s < r.length; s++) o = (e = (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                if (0 === o && s < r.length && r !== this)
                    for (; s < r.length; s++) this.words[s] = r.words[s];
                return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this._strip()
            }, o.prototype.sub = function(t) {
                return this.clone().isub(t)
            };
            var m = function(t, e, r) {
                var n, i, o, s = t.words,
                    u = e.words,
                    h = r.words,
                    a = 0,
                    c = 0 | s[0],
                    l = 8191 & c,
                    f = c >>> 13,
                    d = 0 | s[1],
                    p = 8191 & d,
                    m = d >>> 13,
                    v = 0 | s[2],
                    b = 8191 & v,
                    y = v >>> 13,
                    g = 0 | s[3],
                    w = 8191 & g,
                    M = g >>> 13,
                    _ = 0 | s[4],
                    S = 8191 & _,
                    E = _ >>> 13,
                    x = 0 | s[5],
                    A = 8191 & x,
                    O = x >>> 13,
                    I = 0 | s[6],
                    T = 8191 & I,
                    N = I >>> 13,
                    R = 0 | s[7],
                    B = 8191 & R,
                    j = R >>> 13,
                    C = 0 | s[8],
                    D = 8191 & C,
                    U = C >>> 13,
                    L = 0 | s[9],
                    k = 8191 & L,
                    P = L >>> 13,
                    F = 0 | u[0],
                    $ = 8191 & F,
                    V = F >>> 13,
                    q = 0 | u[1],
                    z = 8191 & q,
                    Y = q >>> 13,
                    W = 0 | u[2],
                    G = 8191 & W,
                    Z = W >>> 13,
                    H = 0 | u[3],
                    K = 8191 & H,
                    X = H >>> 13,
                    Q = 0 | u[4],
                    J = 8191 & Q,
                    tt = Q >>> 13,
                    et = 0 | u[5],
                    rt = 8191 & et,
                    nt = et >>> 13,
                    it = 0 | u[6],
                    ot = 8191 & it,
                    st = it >>> 13,
                    ut = 0 | u[7],
                    ht = 8191 & ut,
                    at = ut >>> 13,
                    ct = 0 | u[8],
                    lt = 8191 & ct,
                    ft = ct >>> 13,
                    dt = 0 | u[9],
                    pt = 8191 & dt,
                    mt = dt >>> 13;
                r.negative = t.negative ^ e.negative, r.length = 19;
                var vt = (a + (n = Math.imul(l, $)) | 0) + ((8191 & (i = (i = Math.imul(l, V)) + Math.imul(f, $) | 0)) << 13) | 0;
                a = ((o = Math.imul(f, V)) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, n = Math.imul(p, $), i = (i = Math.imul(p, V)) + Math.imul(m, $) | 0, o = Math.imul(m, V);
                var bt = (a + (n = n + Math.imul(l, z) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, Y) | 0) + Math.imul(f, z) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, Y) | 0) + (i >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, n = Math.imul(b, $), i = (i = Math.imul(b, V)) + Math.imul(y, $) | 0, o = Math.imul(y, V), n = n + Math.imul(p, z) | 0, i = (i = i + Math.imul(p, Y) | 0) + Math.imul(m, z) | 0, o = o + Math.imul(m, Y) | 0;
                var yt = (a + (n = n + Math.imul(l, G) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, Z) | 0) + Math.imul(f, G) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, Z) | 0) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, n = Math.imul(w, $), i = (i = Math.imul(w, V)) + Math.imul(M, $) | 0, o = Math.imul(M, V), n = n + Math.imul(b, z) | 0, i = (i = i + Math.imul(b, Y) | 0) + Math.imul(y, z) | 0, o = o + Math.imul(y, Y) | 0, n = n + Math.imul(p, G) | 0, i = (i = i + Math.imul(p, Z) | 0) + Math.imul(m, G) | 0, o = o + Math.imul(m, Z) | 0;
                var gt = (a + (n = n + Math.imul(l, K) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, X) | 0) + Math.imul(f, K) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, X) | 0) + (i >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, n = Math.imul(S, $), i = (i = Math.imul(S, V)) + Math.imul(E, $) | 0, o = Math.imul(E, V), n = n + Math.imul(w, z) | 0, i = (i = i + Math.imul(w, Y) | 0) + Math.imul(M, z) | 0, o = o + Math.imul(M, Y) | 0, n = n + Math.imul(b, G) | 0, i = (i = i + Math.imul(b, Z) | 0) + Math.imul(y, G) | 0, o = o + Math.imul(y, Z) | 0, n = n + Math.imul(p, K) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(m, K) | 0, o = o + Math.imul(m, X) | 0;
                var wt = (a + (n = n + Math.imul(l, J) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, tt) | 0) + Math.imul(f, J) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, tt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, n = Math.imul(A, $), i = (i = Math.imul(A, V)) + Math.imul(O, $) | 0, o = Math.imul(O, V), n = n + Math.imul(S, z) | 0, i = (i = i + Math.imul(S, Y) | 0) + Math.imul(E, z) | 0, o = o + Math.imul(E, Y) | 0, n = n + Math.imul(w, G) | 0, i = (i = i + Math.imul(w, Z) | 0) + Math.imul(M, G) | 0, o = o + Math.imul(M, Z) | 0, n = n + Math.imul(b, K) | 0, i = (i = i + Math.imul(b, X) | 0) + Math.imul(y, K) | 0, o = o + Math.imul(y, X) | 0, n = n + Math.imul(p, J) | 0, i = (i = i + Math.imul(p, tt) | 0) + Math.imul(m, J) | 0, o = o + Math.imul(m, tt) | 0;
                var Mt = (a + (n = n + Math.imul(l, rt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, nt) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, nt) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, n = Math.imul(T, $), i = (i = Math.imul(T, V)) + Math.imul(N, $) | 0, o = Math.imul(N, V), n = n + Math.imul(A, z) | 0, i = (i = i + Math.imul(A, Y) | 0) + Math.imul(O, z) | 0, o = o + Math.imul(O, Y) | 0, n = n + Math.imul(S, G) | 0, i = (i = i + Math.imul(S, Z) | 0) + Math.imul(E, G) | 0, o = o + Math.imul(E, Z) | 0, n = n + Math.imul(w, K) | 0, i = (i = i + Math.imul(w, X) | 0) + Math.imul(M, K) | 0, o = o + Math.imul(M, X) | 0, n = n + Math.imul(b, J) | 0, i = (i = i + Math.imul(b, tt) | 0) + Math.imul(y, J) | 0, o = o + Math.imul(y, tt) | 0, n = n + Math.imul(p, rt) | 0, i = (i = i + Math.imul(p, nt) | 0) + Math.imul(m, rt) | 0, o = o + Math.imul(m, nt) | 0;
                var _t = (a + (n = n + Math.imul(l, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, st) | 0) + Math.imul(f, ot) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, st) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, n = Math.imul(B, $), i = (i = Math.imul(B, V)) + Math.imul(j, $) | 0, o = Math.imul(j, V), n = n + Math.imul(T, z) | 0, i = (i = i + Math.imul(T, Y) | 0) + Math.imul(N, z) | 0, o = o + Math.imul(N, Y) | 0, n = n + Math.imul(A, G) | 0, i = (i = i + Math.imul(A, Z) | 0) + Math.imul(O, G) | 0, o = o + Math.imul(O, Z) | 0, n = n + Math.imul(S, K) | 0, i = (i = i + Math.imul(S, X) | 0) + Math.imul(E, K) | 0, o = o + Math.imul(E, X) | 0, n = n + Math.imul(w, J) | 0, i = (i = i + Math.imul(w, tt) | 0) + Math.imul(M, J) | 0, o = o + Math.imul(M, tt) | 0, n = n + Math.imul(b, rt) | 0, i = (i = i + Math.imul(b, nt) | 0) + Math.imul(y, rt) | 0, o = o + Math.imul(y, nt) | 0, n = n + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, st) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, st) | 0;
                var St = (a + (n = n + Math.imul(l, ht) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, at) | 0) + Math.imul(f, ht) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, at) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, n = Math.imul(D, $), i = (i = Math.imul(D, V)) + Math.imul(U, $) | 0, o = Math.imul(U, V), n = n + Math.imul(B, z) | 0, i = (i = i + Math.imul(B, Y) | 0) + Math.imul(j, z) | 0, o = o + Math.imul(j, Y) | 0, n = n + Math.imul(T, G) | 0, i = (i = i + Math.imul(T, Z) | 0) + Math.imul(N, G) | 0, o = o + Math.imul(N, Z) | 0, n = n + Math.imul(A, K) | 0, i = (i = i + Math.imul(A, X) | 0) + Math.imul(O, K) | 0, o = o + Math.imul(O, X) | 0, n = n + Math.imul(S, J) | 0, i = (i = i + Math.imul(S, tt) | 0) + Math.imul(E, J) | 0, o = o + Math.imul(E, tt) | 0, n = n + Math.imul(w, rt) | 0, i = (i = i + Math.imul(w, nt) | 0) + Math.imul(M, rt) | 0, o = o + Math.imul(M, nt) | 0, n = n + Math.imul(b, ot) | 0, i = (i = i + Math.imul(b, st) | 0) + Math.imul(y, ot) | 0, o = o + Math.imul(y, st) | 0, n = n + Math.imul(p, ht) | 0, i = (i = i + Math.imul(p, at) | 0) + Math.imul(m, ht) | 0, o = o + Math.imul(m, at) | 0;
                var Et = (a + (n = n + Math.imul(l, lt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ft) | 0) + Math.imul(f, lt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, ft) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, n = Math.imul(k, $), i = (i = Math.imul(k, V)) + Math.imul(P, $) | 0, o = Math.imul(P, V), n = n + Math.imul(D, z) | 0, i = (i = i + Math.imul(D, Y) | 0) + Math.imul(U, z) | 0, o = o + Math.imul(U, Y) | 0, n = n + Math.imul(B, G) | 0, i = (i = i + Math.imul(B, Z) | 0) + Math.imul(j, G) | 0, o = o + Math.imul(j, Z) | 0, n = n + Math.imul(T, K) | 0, i = (i = i + Math.imul(T, X) | 0) + Math.imul(N, K) | 0, o = o + Math.imul(N, X) | 0, n = n + Math.imul(A, J) | 0, i = (i = i + Math.imul(A, tt) | 0) + Math.imul(O, J) | 0, o = o + Math.imul(O, tt) | 0, n = n + Math.imul(S, rt) | 0, i = (i = i + Math.imul(S, nt) | 0) + Math.imul(E, rt) | 0, o = o + Math.imul(E, nt) | 0, n = n + Math.imul(w, ot) | 0, i = (i = i + Math.imul(w, st) | 0) + Math.imul(M, ot) | 0, o = o + Math.imul(M, st) | 0, n = n + Math.imul(b, ht) | 0, i = (i = i + Math.imul(b, at) | 0) + Math.imul(y, ht) | 0, o = o + Math.imul(y, at) | 0, n = n + Math.imul(p, lt) | 0, i = (i = i + Math.imul(p, ft) | 0) + Math.imul(m, lt) | 0, o = o + Math.imul(m, ft) | 0;
                var xt = (a + (n = n + Math.imul(l, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, mt) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, n = Math.imul(k, z), i = (i = Math.imul(k, Y)) + Math.imul(P, z) | 0, o = Math.imul(P, Y), n = n + Math.imul(D, G) | 0, i = (i = i + Math.imul(D, Z) | 0) + Math.imul(U, G) | 0, o = o + Math.imul(U, Z) | 0, n = n + Math.imul(B, K) | 0, i = (i = i + Math.imul(B, X) | 0) + Math.imul(j, K) | 0, o = o + Math.imul(j, X) | 0, n = n + Math.imul(T, J) | 0, i = (i = i + Math.imul(T, tt) | 0) + Math.imul(N, J) | 0, o = o + Math.imul(N, tt) | 0, n = n + Math.imul(A, rt) | 0, i = (i = i + Math.imul(A, nt) | 0) + Math.imul(O, rt) | 0, o = o + Math.imul(O, nt) | 0, n = n + Math.imul(S, ot) | 0, i = (i = i + Math.imul(S, st) | 0) + Math.imul(E, ot) | 0, o = o + Math.imul(E, st) | 0, n = n + Math.imul(w, ht) | 0, i = (i = i + Math.imul(w, at) | 0) + Math.imul(M, ht) | 0, o = o + Math.imul(M, at) | 0, n = n + Math.imul(b, lt) | 0, i = (i = i + Math.imul(b, ft) | 0) + Math.imul(y, lt) | 0, o = o + Math.imul(y, ft) | 0;
                var At = (a + (n = n + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(m, mt) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, n = Math.imul(k, G), i = (i = Math.imul(k, Z)) + Math.imul(P, G) | 0, o = Math.imul(P, Z), n = n + Math.imul(D, K) | 0, i = (i = i + Math.imul(D, X) | 0) + Math.imul(U, K) | 0, o = o + Math.imul(U, X) | 0, n = n + Math.imul(B, J) | 0, i = (i = i + Math.imul(B, tt) | 0) + Math.imul(j, J) | 0, o = o + Math.imul(j, tt) | 0, n = n + Math.imul(T, rt) | 0, i = (i = i + Math.imul(T, nt) | 0) + Math.imul(N, rt) | 0, o = o + Math.imul(N, nt) | 0, n = n + Math.imul(A, ot) | 0, i = (i = i + Math.imul(A, st) | 0) + Math.imul(O, ot) | 0, o = o + Math.imul(O, st) | 0, n = n + Math.imul(S, ht) | 0, i = (i = i + Math.imul(S, at) | 0) + Math.imul(E, ht) | 0, o = o + Math.imul(E, at) | 0, n = n + Math.imul(w, lt) | 0, i = (i = i + Math.imul(w, ft) | 0) + Math.imul(M, lt) | 0, o = o + Math.imul(M, ft) | 0;
                var Ot = (a + (n = n + Math.imul(b, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(b, mt) | 0) + Math.imul(y, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(y, mt) | 0) + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, n = Math.imul(k, K), i = (i = Math.imul(k, X)) + Math.imul(P, K) | 0, o = Math.imul(P, X), n = n + Math.imul(D, J) | 0, i = (i = i + Math.imul(D, tt) | 0) + Math.imul(U, J) | 0, o = o + Math.imul(U, tt) | 0, n = n + Math.imul(B, rt) | 0, i = (i = i + Math.imul(B, nt) | 0) + Math.imul(j, rt) | 0, o = o + Math.imul(j, nt) | 0, n = n + Math.imul(T, ot) | 0, i = (i = i + Math.imul(T, st) | 0) + Math.imul(N, ot) | 0, o = o + Math.imul(N, st) | 0, n = n + Math.imul(A, ht) | 0, i = (i = i + Math.imul(A, at) | 0) + Math.imul(O, ht) | 0, o = o + Math.imul(O, at) | 0, n = n + Math.imul(S, lt) | 0, i = (i = i + Math.imul(S, ft) | 0) + Math.imul(E, lt) | 0, o = o + Math.imul(E, ft) | 0;
                var It = (a + (n = n + Math.imul(w, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w, mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(M, mt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, n = Math.imul(k, J), i = (i = Math.imul(k, tt)) + Math.imul(P, J) | 0, o = Math.imul(P, tt), n = n + Math.imul(D, rt) | 0, i = (i = i + Math.imul(D, nt) | 0) + Math.imul(U, rt) | 0, o = o + Math.imul(U, nt) | 0, n = n + Math.imul(B, ot) | 0, i = (i = i + Math.imul(B, st) | 0) + Math.imul(j, ot) | 0, o = o + Math.imul(j, st) | 0, n = n + Math.imul(T, ht) | 0, i = (i = i + Math.imul(T, at) | 0) + Math.imul(N, ht) | 0, o = o + Math.imul(N, at) | 0, n = n + Math.imul(A, lt) | 0, i = (i = i + Math.imul(A, ft) | 0) + Math.imul(O, lt) | 0, o = o + Math.imul(O, ft) | 0;
                var Tt = (a + (n = n + Math.imul(S, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(S, mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(E, mt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, n = Math.imul(k, rt), i = (i = Math.imul(k, nt)) + Math.imul(P, rt) | 0, o = Math.imul(P, nt), n = n + Math.imul(D, ot) | 0, i = (i = i + Math.imul(D, st) | 0) + Math.imul(U, ot) | 0, o = o + Math.imul(U, st) | 0, n = n + Math.imul(B, ht) | 0, i = (i = i + Math.imul(B, at) | 0) + Math.imul(j, ht) | 0, o = o + Math.imul(j, at) | 0, n = n + Math.imul(T, lt) | 0, i = (i = i + Math.imul(T, ft) | 0) + Math.imul(N, lt) | 0, o = o + Math.imul(N, ft) | 0;
                var Nt = (a + (n = n + Math.imul(A, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(A, mt) | 0) + Math.imul(O, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(O, mt) | 0) + (i >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, n = Math.imul(k, ot), i = (i = Math.imul(k, st)) + Math.imul(P, ot) | 0, o = Math.imul(P, st), n = n + Math.imul(D, ht) | 0, i = (i = i + Math.imul(D, at) | 0) + Math.imul(U, ht) | 0, o = o + Math.imul(U, at) | 0, n = n + Math.imul(B, lt) | 0, i = (i = i + Math.imul(B, ft) | 0) + Math.imul(j, lt) | 0, o = o + Math.imul(j, ft) | 0;
                var Rt = (a + (n = n + Math.imul(T, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(T, mt) | 0) + Math.imul(N, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(N, mt) | 0) + (i >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, n = Math.imul(k, ht), i = (i = Math.imul(k, at)) + Math.imul(P, ht) | 0, o = Math.imul(P, at), n = n + Math.imul(D, lt) | 0, i = (i = i + Math.imul(D, ft) | 0) + Math.imul(U, lt) | 0, o = o + Math.imul(U, ft) | 0;
                var Bt = (a + (n = n + Math.imul(B, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(B, mt) | 0) + Math.imul(j, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(j, mt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, n = Math.imul(k, lt), i = (i = Math.imul(k, ft)) + Math.imul(P, lt) | 0, o = Math.imul(P, ft);
                var jt = (a + (n = n + Math.imul(D, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(D, mt) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(U, mt) | 0) + (i >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863;
                var Ct = (a + (n = Math.imul(k, pt)) | 0) + ((8191 & (i = (i = Math.imul(k, mt)) + Math.imul(P, pt) | 0)) << 13) | 0;
                return a = ((o = Math.imul(P, mt)) + (i >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, h[0] = vt, h[1] = bt, h[2] = yt, h[3] = gt, h[4] = wt, h[5] = Mt, h[6] = _t, h[7] = St, h[8] = Et, h[9] = xt, h[10] = At, h[11] = Ot, h[12] = It, h[13] = Tt, h[14] = Nt, h[15] = Rt, h[16] = Bt, h[17] = jt, h[18] = Ct, 0 !== a && (h[19] = a, r.length++), r
            };

            function v(t, e, r) {
                r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
                    var s = i;
                    i = 0;
                    for (var u = 67108863 & n, h = Math.min(o, e.length - 1), a = Math.max(0, o - t.length + 1); a <= h; a++) {
                        var c = o - a,
                            l = (0 | t.words[c]) * (0 | e.words[a]),
                            f = 67108863 & l;
                        u = 67108863 & (f = f + u | 0), i += (s = (s = s + (l / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, s &= 67108863
                    }
                    r.words[o] = u, n = s, s = i
                }
                return 0 !== n ? r.words[o] = n : r.length--, r._strip()
            }

            function b(t, e, r) {
                return v(t, e, r)
            }

            function y(t, e) {
                this.x = t, this.y = e
            }
            Math.imul || (m = p), o.prototype.mulTo = function(t, e) {
                var r = this.length + t.length;
                return 10 === this.length && 10 === t.length ? m(this, t, e) : r < 63 ? p(this, t, e) : r < 1024 ? v(this, t, e) : b(this, t, e)
            }, y.prototype.makeRBT = function(t) {
                for (var e = new Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++) e[n] = this.revBin(n, r, t);
                return e
            }, y.prototype.revBin = function(t, e, r) {
                if (0 === t || t === r - 1) return t;
                for (var n = 0, i = 0; i < e; i++) n |= (1 & t) << e - i - 1, t >>= 1;
                return n
            }, y.prototype.permute = function(t, e, r, n, i, o) {
                for (var s = 0; s < o; s++) n[s] = e[t[s]], i[s] = r[t[s]]
            }, y.prototype.transform = function(t, e, r, n, i, o) {
                this.permute(o, t, e, r, n, i);
                for (var s = 1; s < i; s <<= 1)
                    for (var u = s << 1, h = Math.cos(2 * Math.PI / u), a = Math.sin(2 * Math.PI / u), c = 0; c < i; c += u)
                        for (var l = h, f = a, d = 0; d < s; d++) {
                            var p = r[c + d],
                                m = n[c + d],
                                v = r[c + d + s],
                                b = n[c + d + s],
                                y = l * v - f * b;
                            b = l * b + f * v, v = y, r[c + d] = p + v, n[c + d] = m + b, r[c + d + s] = p - v, n[c + d + s] = m - b, d !== u && (y = h * l - a * f, f = h * f + a * l, l = y)
                        }
            }, y.prototype.guessLen13b = function(t, e) {
                var r = 1 | Math.max(e, t),
                    n = 1 & r,
                    i = 0;
                for (r = r / 2 | 0; r; r >>>= 1) i++;
                return 1 << i + 1 + n
            }, y.prototype.conjugate = function(t, e, r) {
                if (!(r <= 1))
                    for (var n = 0; n < r / 2; n++) {
                        var i = t[n];
                        t[n] = t[r - n - 1], t[r - n - 1] = i, i = e[n], e[n] = -e[r - n - 1], e[r - n - 1] = -i
                    }
            }, y.prototype.normalize13b = function(t, e) {
                for (var r = 0, n = 0; n < e / 2; n++) {
                    var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                    t[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0
                }
                return t
            }, y.prototype.convert13b = function(t, e, r, i) {
                for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                for (s = 2 * e; s < i; ++s) r[s] = 0;
                n(0 === o), n(0 == (-8192 & o))
            }, y.prototype.stub = function(t) {
                for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
                return e
            }, y.prototype.mulp = function(t, e, r) {
                var n = 2 * this.guessLen13b(t.length, e.length),
                    i = this.makeRBT(n),
                    o = this.stub(n),
                    s = new Array(n),
                    u = new Array(n),
                    h = new Array(n),
                    a = new Array(n),
                    c = new Array(n),
                    l = new Array(n),
                    f = r.words;
                f.length = n, this.convert13b(t.words, t.length, s, n), this.convert13b(e.words, e.length, a, n), this.transform(s, o, u, h, n, i), this.transform(a, o, c, l, n, i);
                for (var d = 0; d < n; d++) {
                    var p = u[d] * c[d] - h[d] * l[d];
                    h[d] = u[d] * l[d] + h[d] * c[d], u[d] = p
                }
                return this.conjugate(u, h, n), this.transform(u, h, f, o, n, i), this.conjugate(f, o, n), this.normalize13b(f, n), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r._strip()
            }, o.prototype.mul = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), this.mulTo(t, e)
            }, o.prototype.mulf = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), b(this, t, e)
            }, o.prototype.imul = function(t) {
                return this.clone().mulTo(t, this)
            }, o.prototype.imuln = function(t) {
                var e = t < 0;
                e && (t = -t), n("number" == typeof t), n(t < 67108864);
                for (var r = 0, i = 0; i < this.length; i++) {
                    var o = (0 | this.words[i]) * t,
                        s = (67108863 & o) + (67108863 & r);
                    r >>= 26, r += o / 67108864 | 0, r += s >>> 26, this.words[i] = 67108863 & s
                }
                return 0 !== r && (this.words[i] = r, this.length++), e ? this.ineg() : this
            }, o.prototype.muln = function(t) {
                return this.clone().imuln(t)
            }, o.prototype.sqr = function() {
                return this.mul(this)
            }, o.prototype.isqr = function() {
                return this.imul(this.clone())
            }, o.prototype.pow = function(t) {
                var e = function(t) {
                    for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                        var n = r / 26 | 0,
                            i = r % 26;
                        e[r] = t.words[n] >>> i & 1
                    }
                    return e
                }(t);
                if (0 === e.length) return new o(1);
                for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
                if (++n < e.length)
                    for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
                return r
            }, o.prototype.iushln = function(t) {
                n("number" == typeof t && t >= 0);
                var e, r = t % 26,
                    i = (t - r) / 26,
                    o = 67108863 >>> 26 - r << 26 - r;
                if (0 !== r) {
                    var s = 0;
                    for (e = 0; e < this.length; e++) {
                        var u = this.words[e] & o,
                            h = (0 | this.words[e]) - u << r;
                        this.words[e] = h | s, s = u >>> 26 - r
                    }
                    s && (this.words[e] = s, this.length++)
                }
                if (0 !== i) {
                    for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                    for (e = 0; e < i; e++) this.words[e] = 0;
                    this.length += i
                }
                return this._strip()
            }, o.prototype.ishln = function(t) {
                return n(0 === this.negative), this.iushln(t)
            }, o.prototype.iushrn = function(t, e, r) {
                var i;
                n("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
                var o = t % 26,
                    s = Math.min((t - o) / 26, this.length),
                    u = 67108863 ^ 67108863 >>> o << o,
                    h = r;
                if (i -= s, i = Math.max(0, i), h) {
                    for (var a = 0; a < s; a++) h.words[a] = this.words[a];
                    h.length = s
                }
                if (0 === s);
                else if (this.length > s)
                    for (this.length -= s, a = 0; a < this.length; a++) this.words[a] = this.words[a + s];
                else this.words[0] = 0, this.length = 1;
                var c = 0;
                for (a = this.length - 1; a >= 0 && (0 !== c || a >= i); a--) {
                    var l = 0 | this.words[a];
                    this.words[a] = c << 26 - o | l >>> o, c = l & u
                }
                return h && 0 !== c && (h.words[h.length++] = c), 0 === this.length && (this.words[0] = 0, this.length = 1), this._strip()
            }, o.prototype.ishrn = function(t, e, r) {
                return n(0 === this.negative), this.iushrn(t, e, r)
            }, o.prototype.shln = function(t) {
                return this.clone().ishln(t)
            }, o.prototype.ushln = function(t) {
                return this.clone().iushln(t)
            }, o.prototype.shrn = function(t) {
                return this.clone().ishrn(t)
            }, o.prototype.ushrn = function(t) {
                return this.clone().iushrn(t)
            }, o.prototype.testn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                    r = (t - e) / 26,
                    i = 1 << e;
                return !(this.length <= r) && !!(this.words[r] & i)
            }, o.prototype.imaskn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                    r = (t - e) / 26;
                if (n(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) return this;
                if (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e) {
                    var i = 67108863 ^ 67108863 >>> e << e;
                    this.words[this.length - 1] &= i
                }
                return this._strip()
            }, o.prototype.maskn = function(t) {
                return this.clone().imaskn(t)
            }, o.prototype.iaddn = function(t) {
                return n("number" == typeof t), n(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
            }, o.prototype._iaddn = function(t) {
                this.words[0] += t;
                for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                return this.length = Math.max(this.length, e + 1), this
            }, o.prototype.isubn = function(t) {
                if (n("number" == typeof t), n(t < 67108864), t < 0) return this.iaddn(-t);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                else
                    for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                return this._strip()
            }, o.prototype.addn = function(t) {
                return this.clone().iaddn(t)
            }, o.prototype.subn = function(t) {
                return this.clone().isubn(t)
            }, o.prototype.iabs = function() {
                return this.negative = 0, this
            }, o.prototype.abs = function() {
                return this.clone().iabs()
            }, o.prototype._ishlnsubmul = function(t, e, r) {
                var i, o, s = t.length + r;
                this._expand(s);
                var u = 0;
                for (i = 0; i < t.length; i++) {
                    o = (0 | this.words[i + r]) + u;
                    var h = (0 | t.words[i]) * e;
                    u = ((o -= 67108863 & h) >> 26) - (h / 67108864 | 0), this.words[i + r] = 67108863 & o
                }
                for (; i < this.length - r; i++) u = (o = (0 | this.words[i + r]) + u) >> 26, this.words[i + r] = 67108863 & o;
                if (0 === u) return this._strip();
                for (n(-1 === u), u = 0, i = 0; i < this.length; i++) u = (o = -(0 | this.words[i]) + u) >> 26, this.words[i] = 67108863 & o;
                return this.negative = 1, this._strip()
            }, o.prototype._wordDiv = function(t, e) {
                var r = (this.length, t.length),
                    n = this.clone(),
                    i = t,
                    s = 0 | i.words[i.length - 1];
                0 !== (r = 26 - this._countBits(s)) && (i = i.ushln(r), n.iushln(r), s = 0 | i.words[i.length - 1]);
                var u, h = n.length - i.length;
                if ("mod" !== e) {
                    (u = new o(null)).length = h + 1, u.words = new Array(u.length);
                    for (var a = 0; a < u.length; a++) u.words[a] = 0
                }
                var c = n.clone()._ishlnsubmul(i, 1, h);
                0 === c.negative && (n = c, u && (u.words[h] = 1));
                for (var l = h - 1; l >= 0; l--) {
                    var f = 67108864 * (0 | n.words[i.length + l]) + (0 | n.words[i.length + l - 1]);
                    for (f = Math.min(f / s | 0, 67108863), n._ishlnsubmul(i, f, l); 0 !== n.negative;) f--, n.negative = 0, n._ishlnsubmul(i, 1, l), n.isZero() || (n.negative ^= 1);
                    u && (u.words[l] = f)
                }
                return u && u._strip(), n._strip(), "div" !== e && 0 !== r && n.iushrn(r), {
                    div: u || null,
                    mod: n
                }
            }, o.prototype.divmod = function(t, e, r) {
                return n(!t.isZero()), this.isZero() ? {
                    div: new o(0),
                    mod: new o(0)
                } : 0 !== this.negative && 0 === t.negative ? (u = this.neg().divmod(t, e), "mod" !== e && (i = u.div.neg()), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                    div: i,
                    mod: s
                }) : 0 === this.negative && 0 !== t.negative ? (u = this.divmod(t.neg(), e), "mod" !== e && (i = u.div.neg()), {
                    div: i,
                    mod: u.mod
                }) : 0 != (this.negative & t.negative) ? (u = this.neg().divmod(t.neg(), e), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                    div: u.div,
                    mod: s
                }) : t.length > this.length || this.cmp(t) < 0 ? {
                    div: new o(0),
                    mod: this
                } : 1 === t.length ? "div" === e ? {
                    div: this.divn(t.words[0]),
                    mod: null
                } : "mod" === e ? {
                    div: null,
                    mod: new o(this.modrn(t.words[0]))
                } : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modrn(t.words[0]))
                } : this._wordDiv(t, e);
                var i, s, u
            }, o.prototype.div = function(t) {
                return this.divmod(t, "div", !1).div
            }, o.prototype.mod = function(t) {
                return this.divmod(t, "mod", !1).mod
            }, o.prototype.umod = function(t) {
                return this.divmod(t, "mod", !0).mod
            }, o.prototype.divRound = function(t) {
                var e = this.divmod(t);
                if (e.mod.isZero()) return e.div;
                var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                    n = t.ushrn(1),
                    i = t.andln(1),
                    o = r.cmp(n);
                return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
            }, o.prototype.modrn = function(t) {
                var e = t < 0;
                e && (t = -t), n(t <= 67108863);
                for (var r = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--) i = (r * i + (0 | this.words[o])) % t;
                return e ? -i : i
            }, o.prototype.modn = function(t) {
                return this.modrn(t)
            }, o.prototype.idivn = function(t) {
                var e = t < 0;
                e && (t = -t), n(t <= 67108863);
                for (var r = 0, i = this.length - 1; i >= 0; i--) {
                    var o = (0 | this.words[i]) + 67108864 * r;
                    this.words[i] = o / t | 0, r = o % t
                }
                return this._strip(), e ? this.ineg() : this
            }, o.prototype.divn = function(t) {
                return this.clone().idivn(t)
            }, o.prototype.egcd = function(t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                    r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++a;
                for (var c = r.clone(), l = e.clone(); !e.isZero();) {
                    for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);
                    if (f > 0)
                        for (e.iushrn(f); f-- > 0;)(i.isOdd() || s.isOdd()) && (i.iadd(c), s.isub(l)), i.iushrn(1), s.iushrn(1);
                    for (var p = 0, m = 1; 0 == (r.words[0] & m) && p < 26; ++p, m <<= 1);
                    if (p > 0)
                        for (r.iushrn(p); p-- > 0;)(u.isOdd() || h.isOdd()) && (u.iadd(c), h.isub(l)), u.iushrn(1), h.iushrn(1);
                    e.cmp(r) >= 0 ? (e.isub(r), i.isub(u), s.isub(h)) : (r.isub(e), u.isub(i), h.isub(s))
                }
                return {
                    a: u,
                    b: h,
                    gcd: r.iushln(a)
                }
            }, o.prototype._invmp = function(t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                    r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i, s = new o(1), u = new o(0), h = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0;) {
                    for (var a = 0, c = 1; 0 == (e.words[0] & c) && a < 26; ++a, c <<= 1);
                    if (a > 0)
                        for (e.iushrn(a); a-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                    for (var l = 0, f = 1; 0 == (r.words[0] & f) && l < 26; ++l, f <<= 1);
                    if (l > 0)
                        for (r.iushrn(l); l-- > 0;) u.isOdd() && u.iadd(h), u.iushrn(1);
                    e.cmp(r) >= 0 ? (e.isub(r), s.isub(u)) : (r.isub(e), u.isub(s))
                }
                return (i = 0 === e.cmpn(1) ? s : u).cmpn(0) < 0 && i.iadd(t), i
            }, o.prototype.gcd = function(t) {
                if (this.isZero()) return t.abs();
                if (t.isZero()) return this.abs();
                var e = this.clone(),
                    r = t.clone();
                e.negative = 0, r.negative = 0;
                for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
                for (;;) {
                    for (; e.isEven();) e.iushrn(1);
                    for (; r.isEven();) r.iushrn(1);
                    var i = e.cmp(r);
                    if (i < 0) {
                        var o = e;
                        e = r, r = o
                    } else if (0 === i || 0 === r.cmpn(1)) break;
                    e.isub(r)
                }
                return r.iushln(n)
            }, o.prototype.invm = function(t) {
                return this.egcd(t).a.umod(t)
            }, o.prototype.isEven = function() {
                return 0 == (1 & this.words[0])
            }, o.prototype.isOdd = function() {
                return 1 == (1 & this.words[0])
            }, o.prototype.andln = function(t) {
                return this.words[0] & t
            }, o.prototype.bincn = function(t) {
                n("number" == typeof t);
                var e = t % 26,
                    r = (t - e) / 26,
                    i = 1 << e;
                if (this.length <= r) return this._expand(r + 1), this.words[r] |= i, this;
                for (var o = i, s = r; 0 !== o && s < this.length; s++) {
                    var u = 0 | this.words[s];
                    o = (u += o) >>> 26, u &= 67108863, this.words[s] = u
                }
                return 0 !== o && (this.words[s] = o, this.length++), this
            }, o.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0]
            }, o.prototype.cmpn = function(t) {
                var e, r = t < 0;
                if (0 !== this.negative && !r) return -1;
                if (0 === this.negative && r) return 1;
                if (this._strip(), this.length > 1) e = 1;
                else {
                    r && (t = -t), n(t <= 67108863, "Number is too big");
                    var i = 0 | this.words[0];
                    e = i === t ? 0 : i < t ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.cmp = function(t) {
                if (0 !== this.negative && 0 === t.negative) return -1;
                if (0 === this.negative && 0 !== t.negative) return 1;
                var e = this.ucmp(t);
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.ucmp = function(t) {
                if (this.length > t.length) return 1;
                if (this.length < t.length) return -1;
                for (var e = 0, r = this.length - 1; r >= 0; r--) {
                    var n = 0 | this.words[r],
                        i = 0 | t.words[r];
                    if (n !== i) {
                        n < i ? e = -1 : n > i && (e = 1);
                        break
                    }
                }
                return e
            }, o.prototype.gtn = function(t) {
                return 1 === this.cmpn(t)
            }, o.prototype.gt = function(t) {
                return 1 === this.cmp(t)
            }, o.prototype.gten = function(t) {
                return this.cmpn(t) >= 0
            }, o.prototype.gte = function(t) {
                return this.cmp(t) >= 0
            }, o.prototype.ltn = function(t) {
                return -1 === this.cmpn(t)
            }, o.prototype.lt = function(t) {
                return -1 === this.cmp(t)
            }, o.prototype.lten = function(t) {
                return this.cmpn(t) <= 0
            }, o.prototype.lte = function(t) {
                return this.cmp(t) <= 0
            }, o.prototype.eqn = function(t) {
                return 0 === this.cmpn(t)
            }, o.prototype.eq = function(t) {
                return 0 === this.cmp(t)
            }, o.red = function(t) {
                return new x(t)
            }, o.prototype.toRed = function(t) {
                return n(!this.red, "Already a number in reduction context"), n(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
            }, o.prototype.fromRed = function() {
                return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, o.prototype._forceRed = function(t) {
                return this.red = t, this
            }, o.prototype.forceRed = function(t) {
                return n(!this.red, "Already a number in reduction context"), this._forceRed(t)
            }, o.prototype.redAdd = function(t) {
                return n(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
            }, o.prototype.redIAdd = function(t) {
                return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
            }, o.prototype.redSub = function(t) {
                return n(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
            }, o.prototype.redISub = function(t) {
                return n(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
            }, o.prototype.redShl = function(t) {
                return n(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
            }, o.prototype.redMul = function(t) {
                return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
            }, o.prototype.redIMul = function(t) {
                return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
            }, o.prototype.redSqr = function() {
                return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, o.prototype.redISqr = function() {
                return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, o.prototype.redSqrt = function() {
                return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, o.prototype.redInvm = function() {
                return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, o.prototype.redNeg = function() {
                return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, o.prototype.redPow = function(t) {
                return n(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
            };
            var g = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };

            function w(t, e) {
                this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function M() {
                w.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function _() {
                w.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function S() {
                w.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function E() {
                w.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function x(t) {
                if ("string" == typeof t) {
                    var e = o._prime(t);
                    this.m = e.p, this.prime = e
                } else n(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
            }

            function A(t) {
                x.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }
            w.prototype._tmp = function() {
                var t = new o(null);
                return t.words = new Array(Math.ceil(this.n / 13)), t
            }, w.prototype.ireduce = function(t) {
                var e, r = t;
                do {
                    this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                } while (e > this.n);
                var n = e < this.n ? -1 : r.ucmp(this.p);
                return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : r._strip(), r
            }, w.prototype.split = function(t, e) {
                t.iushrn(this.n, 0, e)
            }, w.prototype.imulK = function(t) {
                return t.imul(this.k)
            }, i(M, w), M.prototype.split = function(t, e) {
                for (var r = Math.min(t.length, 9), n = 0; n < r; n++) e.words[n] = t.words[n];
                if (e.length = r, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                var i = t.words[9];
                for (e.words[e.length++] = 4194303 & i, n = 10; n < t.length; n++) {
                    var o = 0 | t.words[n];
                    t.words[n - 10] = (4194303 & o) << 4 | i >>> 22, i = o
                }
                i >>>= 22, t.words[n - 10] = i, 0 === i && t.length > 10 ? t.length -= 10 : t.length -= 9
            }, M.prototype.imulK = function(t) {
                t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = 0 | t.words[r];
                    e += 977 * n, t.words[r] = 67108863 & e, e = 64 * n + (e / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
            }, i(_, w), i(S, w), i(E, w), E.prototype.imulK = function(t) {
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = 19 * (0 | t.words[r]) + e,
                        i = 67108863 & n;
                    n >>>= 26, t.words[r] = i, e = n
                }
                return 0 !== e && (t.words[t.length++] = e), t
            }, o._prime = function(t) {
                if (g[t]) return g[t];
                var e;
                if ("k256" === t) e = new M;
                else if ("p224" === t) e = new _;
                else if ("p192" === t) e = new S;
                else {
                    if ("p25519" !== t) throw new Error("Unknown prime " + t);
                    e = new E
                }
                return g[t] = e, e
            }, x.prototype._verify1 = function(t) {
                n(0 === t.negative, "red works only with positives"), n(t.red, "red works only with red numbers")
            }, x.prototype._verify2 = function(t, e) {
                n(0 == (t.negative | e.negative), "red works only with positives"), n(t.red && t.red === e.red, "red works only with red numbers")
            }, x.prototype.imod = function(t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : (a(t, t.umod(this.m)._forceRed(this)), t)
            }, x.prototype.neg = function(t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }, x.prototype.add = function(t, e) {
                this._verify2(t, e);
                var r = t.add(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }, x.prototype.iadd = function(t, e) {
                this._verify2(t, e);
                var r = t.iadd(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }, x.prototype.sub = function(t, e) {
                this._verify2(t, e);
                var r = t.sub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }, x.prototype.isub = function(t, e) {
                this._verify2(t, e);
                var r = t.isub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r
            }, x.prototype.shl = function(t, e) {
                return this._verify1(t), this.imod(t.ushln(e))
            }, x.prototype.imul = function(t, e) {
                return this._verify2(t, e), this.imod(t.imul(e))
            }, x.prototype.mul = function(t, e) {
                return this._verify2(t, e), this.imod(t.mul(e))
            }, x.prototype.isqr = function(t) {
                return this.imul(t, t.clone())
            }, x.prototype.sqr = function(t) {
                return this.mul(t, t)
            }, x.prototype.sqrt = function(t) {
                if (t.isZero()) return t.clone();
                var e = this.m.andln(3);
                if (n(e % 2 == 1), 3 === e) {
                    var r = this.m.add(new o(1)).iushrn(2);
                    return this.pow(t, r)
                }
                for (var i = this.m.subn(1), s = 0; !i.isZero() && 0 === i.andln(1);) s++, i.iushrn(1);
                n(!i.isZero());
                var u = new o(1).toRed(this),
                    h = u.redNeg(),
                    a = this.m.subn(1).iushrn(1),
                    c = this.m.bitLength();
                for (c = new o(2 * c * c).toRed(this); 0 !== this.pow(c, a).cmp(h);) c.redIAdd(h);
                for (var l = this.pow(c, i), f = this.pow(t, i.addn(1).iushrn(1)), d = this.pow(t, i), p = s; 0 !== d.cmp(u);) {
                    for (var m = d, v = 0; 0 !== m.cmp(u); v++) m = m.redSqr();
                    n(v < p);
                    var b = this.pow(l, new o(1).iushln(p - v - 1));
                    f = f.redMul(b), l = b.redSqr(), d = d.redMul(l), p = v
                }
                return f
            }, x.prototype.invm = function(t) {
                var e = t._invmp(this.m);
                return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
            }, x.prototype.pow = function(t, e) {
                if (e.isZero()) return new o(1).toRed(this);
                if (0 === e.cmpn(1)) return t.clone();
                var r = new Array(16);
                r[0] = new o(1).toRed(this), r[1] = t;
                for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
                var i = r[0],
                    s = 0,
                    u = 0,
                    h = e.bitLength() % 26;
                for (0 === h && (h = 26), n = e.length - 1; n >= 0; n--) {
                    for (var a = e.words[n], c = h - 1; c >= 0; c--) {
                        var l = a >> c & 1;
                        i !== r[0] && (i = this.sqr(i)), 0 !== l || 0 !== s ? (s <<= 1, s |= l, (4 === ++u || 0 === n && 0 === c) && (i = this.mul(i, r[s]), u = 0, s = 0)) : u = 0
                    }
                    h = 26
                }
                return i
            }, x.prototype.convertTo = function(t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e
            }, x.prototype.convertFrom = function(t) {
                var e = t.clone();
                return e.red = null, e
            }, o.mont = function(t) {
                return new A(t)
            }, i(A, x), A.prototype.convertTo = function(t) {
                return this.imod(t.ushln(this.shift))
            }, A.prototype.convertFrom = function(t) {
                var e = this.imod(t.mul(this.rinv));
                return e.red = null, e
            }, A.prototype.imul = function(t, e) {
                if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                var r = t.imul(e),
                    n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = r.isub(n).iushrn(this.shift),
                    o = i;
                return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
            }, A.prototype.mul = function(t, e) {
                if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                var r = t.mul(e),
                    n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = r.isub(n).iushrn(this.shift),
                    s = i;
                return i.cmp(this.m) >= 0 ? s = i.isub(this.m) : i.cmpn(0) < 0 && (s = i.iadd(this.m)), s._forceRed(this)
            }, A.prototype.invm = function(t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(t, this)
    }).call(this, r(8)(t))
}, function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function() {
                return t.l
            }
        }), Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function() {
                return t.i
            }
        }), t.webpackPolyfill = 1), t
    }
}, function(t, e) {}, function(t, e, r) {
    ! function(t) {
        "use strict";
        var e = function(t) {
                var e, r = new Float64Array(16);
                if (t)
                    for (e = 0; e < t.length; e++) r[e] = t[e];
                return r
            },
            n = function() {
                throw new Error("no PRNG")
            },
            i = new Uint8Array(16),
            o = new Uint8Array(32);
        o[0] = 9;
        var s = e(),
            u = e([1]),
            h = e([56129, 1]),
            a = e([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
            c = e([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
            l = e([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
            f = e([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
            d = e([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

        function p(t, e, r, n) {
            t[e] = r >> 24 & 255, t[e + 1] = r >> 16 & 255, t[e + 2] = r >> 8 & 255, t[e + 3] = 255 & r, t[e + 4] = n >> 24 & 255, t[e + 5] = n >> 16 & 255, t[e + 6] = n >> 8 & 255, t[e + 7] = 255 & n
        }

        function m(t, e, r, n, i) {
            var o, s = 0;
            for (o = 0; o < i; o++) s |= t[e + o] ^ r[n + o];
            return (1 & s - 1 >>> 8) - 1
        }

        function v(t, e, r, n) {
            return m(t, e, r, n, 16)
        }

        function b(t, e, r, n) {
            return m(t, e, r, n, 32)
        }

        function y(t, e, r, n) {
            ! function(t, e, r, n) {
                for (var i, o = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, s = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, u = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, h = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, a = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, c = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, l = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, f = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, d = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, p = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, m = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, v = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, b = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, y = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, g = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, w = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, M = o, _ = s, S = u, E = h, x = a, A = c, O = l, I = f, T = d, N = p, R = m, B = v, j = b, C = y, D = g, U = w, L = 0; L < 20; L += 2) M ^= (i = (j ^= (i = (T ^= (i = (x ^= (i = M + j | 0) << 7 | i >>> 25) + M | 0) << 9 | i >>> 23) + x | 0) << 13 | i >>> 19) + T | 0) << 18 | i >>> 14, A ^= (i = (_ ^= (i = (C ^= (i = (N ^= (i = A + _ | 0) << 7 | i >>> 25) + A | 0) << 9 | i >>> 23) + N | 0) << 13 | i >>> 19) + C | 0) << 18 | i >>> 14, R ^= (i = (O ^= (i = (S ^= (i = (D ^= (i = R + O | 0) << 7 | i >>> 25) + R | 0) << 9 | i >>> 23) + D | 0) << 13 | i >>> 19) + S | 0) << 18 | i >>> 14, U ^= (i = (B ^= (i = (I ^= (i = (E ^= (i = U + B | 0) << 7 | i >>> 25) + U | 0) << 9 | i >>> 23) + E | 0) << 13 | i >>> 19) + I | 0) << 18 | i >>> 14, M ^= (i = (E ^= (i = (S ^= (i = (_ ^= (i = M + E | 0) << 7 | i >>> 25) + M | 0) << 9 | i >>> 23) + _ | 0) << 13 | i >>> 19) + S | 0) << 18 | i >>> 14, A ^= (i = (x ^= (i = (I ^= (i = (O ^= (i = A + x | 0) << 7 | i >>> 25) + A | 0) << 9 | i >>> 23) + O | 0) << 13 | i >>> 19) + I | 0) << 18 | i >>> 14, R ^= (i = (N ^= (i = (T ^= (i = (B ^= (i = R + N | 0) << 7 | i >>> 25) + R | 0) << 9 | i >>> 23) + B | 0) << 13 | i >>> 19) + T | 0) << 18 | i >>> 14, U ^= (i = (D ^= (i = (C ^= (i = (j ^= (i = U + D | 0) << 7 | i >>> 25) + U | 0) << 9 | i >>> 23) + j | 0) << 13 | i >>> 19) + C | 0) << 18 | i >>> 14;
                M = M + o | 0, _ = _ + s | 0, S = S + u | 0, E = E + h | 0, x = x + a | 0, A = A + c | 0, O = O + l | 0, I = I + f | 0, T = T + d | 0, N = N + p | 0, R = R + m | 0, B = B + v | 0, j = j + b | 0, C = C + y | 0, D = D + g | 0, U = U + w | 0, t[0] = M >>> 0 & 255, t[1] = M >>> 8 & 255, t[2] = M >>> 16 & 255, t[3] = M >>> 24 & 255, t[4] = _ >>> 0 & 255, t[5] = _ >>> 8 & 255, t[6] = _ >>> 16 & 255, t[7] = _ >>> 24 & 255, t[8] = S >>> 0 & 255, t[9] = S >>> 8 & 255, t[10] = S >>> 16 & 255, t[11] = S >>> 24 & 255, t[12] = E >>> 0 & 255, t[13] = E >>> 8 & 255, t[14] = E >>> 16 & 255, t[15] = E >>> 24 & 255, t[16] = x >>> 0 & 255, t[17] = x >>> 8 & 255, t[18] = x >>> 16 & 255, t[19] = x >>> 24 & 255, t[20] = A >>> 0 & 255, t[21] = A >>> 8 & 255, t[22] = A >>> 16 & 255, t[23] = A >>> 24 & 255, t[24] = O >>> 0 & 255, t[25] = O >>> 8 & 255, t[26] = O >>> 16 & 255, t[27] = O >>> 24 & 255, t[28] = I >>> 0 & 255, t[29] = I >>> 8 & 255, t[30] = I >>> 16 & 255, t[31] = I >>> 24 & 255, t[32] = T >>> 0 & 255, t[33] = T >>> 8 & 255, t[34] = T >>> 16 & 255, t[35] = T >>> 24 & 255, t[36] = N >>> 0 & 255, t[37] = N >>> 8 & 255, t[38] = N >>> 16 & 255, t[39] = N >>> 24 & 255, t[40] = R >>> 0 & 255, t[41] = R >>> 8 & 255, t[42] = R >>> 16 & 255, t[43] = R >>> 24 & 255, t[44] = B >>> 0 & 255, t[45] = B >>> 8 & 255, t[46] = B >>> 16 & 255, t[47] = B >>> 24 & 255, t[48] = j >>> 0 & 255, t[49] = j >>> 8 & 255, t[50] = j >>> 16 & 255, t[51] = j >>> 24 & 255, t[52] = C >>> 0 & 255, t[53] = C >>> 8 & 255, t[54] = C >>> 16 & 255, t[55] = C >>> 24 & 255, t[56] = D >>> 0 & 255, t[57] = D >>> 8 & 255, t[58] = D >>> 16 & 255, t[59] = D >>> 24 & 255, t[60] = U >>> 0 & 255, t[61] = U >>> 8 & 255, t[62] = U >>> 16 & 255, t[63] = U >>> 24 & 255
            }(t, e, r, n)
        }

        function g(t, e, r, n) {
            ! function(t, e, r, n) {
                for (var i, o = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, s = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, u = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, h = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, a = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, c = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, l = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, f = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, d = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, p = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, m = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, v = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, b = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, y = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, g = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, w = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, M = 0; M < 20; M += 2) o ^= (i = (b ^= (i = (d ^= (i = (a ^= (i = o + b | 0) << 7 | i >>> 25) + o | 0) << 9 | i >>> 23) + a | 0) << 13 | i >>> 19) + d | 0) << 18 | i >>> 14, c ^= (i = (s ^= (i = (y ^= (i = (p ^= (i = c + s | 0) << 7 | i >>> 25) + c | 0) << 9 | i >>> 23) + p | 0) << 13 | i >>> 19) + y | 0) << 18 | i >>> 14, m ^= (i = (l ^= (i = (u ^= (i = (g ^= (i = m + l | 0) << 7 | i >>> 25) + m | 0) << 9 | i >>> 23) + g | 0) << 13 | i >>> 19) + u | 0) << 18 | i >>> 14, w ^= (i = (v ^= (i = (f ^= (i = (h ^= (i = w + v | 0) << 7 | i >>> 25) + w | 0) << 9 | i >>> 23) + h | 0) << 13 | i >>> 19) + f | 0) << 18 | i >>> 14, o ^= (i = (h ^= (i = (u ^= (i = (s ^= (i = o + h | 0) << 7 | i >>> 25) + o | 0) << 9 | i >>> 23) + s | 0) << 13 | i >>> 19) + u | 0) << 18 | i >>> 14, c ^= (i = (a ^= (i = (f ^= (i = (l ^= (i = c + a | 0) << 7 | i >>> 25) + c | 0) << 9 | i >>> 23) + l | 0) << 13 | i >>> 19) + f | 0) << 18 | i >>> 14, m ^= (i = (p ^= (i = (d ^= (i = (v ^= (i = m + p | 0) << 7 | i >>> 25) + m | 0) << 9 | i >>> 23) + v | 0) << 13 | i >>> 19) + d | 0) << 18 | i >>> 14, w ^= (i = (g ^= (i = (y ^= (i = (b ^= (i = w + g | 0) << 7 | i >>> 25) + w | 0) << 9 | i >>> 23) + b | 0) << 13 | i >>> 19) + y | 0) << 18 | i >>> 14;
                t[0] = o >>> 0 & 255, t[1] = o >>> 8 & 255, t[2] = o >>> 16 & 255, t[3] = o >>> 24 & 255, t[4] = c >>> 0 & 255, t[5] = c >>> 8 & 255, t[6] = c >>> 16 & 255, t[7] = c >>> 24 & 255, t[8] = m >>> 0 & 255, t[9] = m >>> 8 & 255, t[10] = m >>> 16 & 255, t[11] = m >>> 24 & 255, t[12] = w >>> 0 & 255, t[13] = w >>> 8 & 255, t[14] = w >>> 16 & 255, t[15] = w >>> 24 & 255, t[16] = l >>> 0 & 255, t[17] = l >>> 8 & 255, t[18] = l >>> 16 & 255, t[19] = l >>> 24 & 255, t[20] = f >>> 0 & 255, t[21] = f >>> 8 & 255, t[22] = f >>> 16 & 255, t[23] = f >>> 24 & 255, t[24] = d >>> 0 & 255, t[25] = d >>> 8 & 255, t[26] = d >>> 16 & 255, t[27] = d >>> 24 & 255, t[28] = p >>> 0 & 255, t[29] = p >>> 8 & 255, t[30] = p >>> 16 & 255, t[31] = p >>> 24 & 255
            }(t, e, r, n)
        }
        var w = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);

        function M(t, e, r, n, i, o, s) {
            var u, h, a = new Uint8Array(16),
                c = new Uint8Array(64);
            for (h = 0; h < 16; h++) a[h] = 0;
            for (h = 0; h < 8; h++) a[h] = o[h];
            for (; i >= 64;) {
                for (y(c, a, s, w), h = 0; h < 64; h++) t[e + h] = r[n + h] ^ c[h];
                for (u = 1, h = 8; h < 16; h++) u = u + (255 & a[h]) | 0, a[h] = 255 & u, u >>>= 8;
                i -= 64, e += 64, n += 64
            }
            if (i > 0)
                for (y(c, a, s, w), h = 0; h < i; h++) t[e + h] = r[n + h] ^ c[h];
            return 0
        }

        function _(t, e, r, n, i) {
            var o, s, u = new Uint8Array(16),
                h = new Uint8Array(64);
            for (s = 0; s < 16; s++) u[s] = 0;
            for (s = 0; s < 8; s++) u[s] = n[s];
            for (; r >= 64;) {
                for (y(h, u, i, w), s = 0; s < 64; s++) t[e + s] = h[s];
                for (o = 1, s = 8; s < 16; s++) o = o + (255 & u[s]) | 0, u[s] = 255 & o, o >>>= 8;
                r -= 64, e += 64
            }
            if (r > 0)
                for (y(h, u, i, w), s = 0; s < r; s++) t[e + s] = h[s];
            return 0
        }

        function S(t, e, r, n, i) {
            var o = new Uint8Array(32);
            g(o, n, i, w);
            for (var s = new Uint8Array(8), u = 0; u < 8; u++) s[u] = n[u + 16];
            return _(t, e, r, s, o)
        }

        function E(t, e, r, n, i, o, s) {
            var u = new Uint8Array(32);
            g(u, o, s, w);
            for (var h = new Uint8Array(8), a = 0; a < 8; a++) h[a] = o[a + 16];
            return M(t, e, r, n, i, h, u)
        }
        var x = function(t) {
            var e, r, n, i, o, s, u, h;
            this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0, e = 255 & t[0] | (255 & t[1]) << 8, this.r[0] = 8191 & e, r = 255 & t[2] | (255 & t[3]) << 8, this.r[1] = 8191 & (e >>> 13 | r << 3), n = 255 & t[4] | (255 & t[5]) << 8, this.r[2] = 7939 & (r >>> 10 | n << 6), i = 255 & t[6] | (255 & t[7]) << 8, this.r[3] = 8191 & (n >>> 7 | i << 9), o = 255 & t[8] | (255 & t[9]) << 8, this.r[4] = 255 & (i >>> 4 | o << 12), this.r[5] = o >>> 1 & 8190, s = 255 & t[10] | (255 & t[11]) << 8, this.r[6] = 8191 & (o >>> 14 | s << 2), u = 255 & t[12] | (255 & t[13]) << 8, this.r[7] = 8065 & (s >>> 11 | u << 5), h = 255 & t[14] | (255 & t[15]) << 8, this.r[8] = 8191 & (u >>> 8 | h << 8), this.r[9] = h >>> 5 & 127, this.pad[0] = 255 & t[16] | (255 & t[17]) << 8, this.pad[1] = 255 & t[18] | (255 & t[19]) << 8, this.pad[2] = 255 & t[20] | (255 & t[21]) << 8, this.pad[3] = 255 & t[22] | (255 & t[23]) << 8, this.pad[4] = 255 & t[24] | (255 & t[25]) << 8, this.pad[5] = 255 & t[26] | (255 & t[27]) << 8, this.pad[6] = 255 & t[28] | (255 & t[29]) << 8, this.pad[7] = 255 & t[30] | (255 & t[31]) << 8
        };

        function A(t, e, r, n, i, o) {
            var s = new x(o);
            return s.update(r, n, i), s.finish(t, e), 0
        }

        function O(t, e, r, n, i, o) {
            var s = new Uint8Array(16);
            return A(s, 0, r, n, i, o), v(t, e, s, 0)
        }

        function I(t, e, r, n, i) {
            var o;
            if (r < 32) return -1;
            for (E(t, 0, e, 0, r, n, i), A(t, 16, t, 32, r - 32, t), o = 0; o < 16; o++) t[o] = 0;
            return 0
        }

        function T(t, e, r, n, i) {
            var o, s = new Uint8Array(32);
            if (r < 32) return -1;
            if (S(s, 0, 32, n, i), 0 !== O(e, 16, e, 32, r - 32, s)) return -1;
            for (E(t, 0, e, 0, r, n, i), o = 0; o < 32; o++) t[o] = 0;
            return 0
        }

        function N(t, e) {
            var r;
            for (r = 0; r < 16; r++) t[r] = 0 | e[r]
        }

        function R(t) {
            var e, r, n = 1;
            for (e = 0; e < 16; e++) r = t[e] + n + 65535, n = Math.floor(r / 65536), t[e] = r - 65536 * n;
            t[0] += n - 1 + 37 * (n - 1)
        }

        function B(t, e, r) {
            for (var n, i = ~(r - 1), o = 0; o < 16; o++) n = i & (t[o] ^ e[o]), t[o] ^= n, e[o] ^= n
        }

        function j(t, r) {
            var n, i, o, s = e(),
                u = e();
            for (n = 0; n < 16; n++) u[n] = r[n];
            for (R(u), R(u), R(u), i = 0; i < 2; i++) {
                for (s[0] = u[0] - 65517, n = 1; n < 15; n++) s[n] = u[n] - 65535 - (s[n - 1] >> 16 & 1), s[n - 1] &= 65535;
                s[15] = u[15] - 32767 - (s[14] >> 16 & 1), o = s[15] >> 16 & 1, s[14] &= 65535, B(u, s, 1 - o)
            }
            for (n = 0; n < 16; n++) t[2 * n] = 255 & u[n], t[2 * n + 1] = u[n] >> 8
        }

        function C(t, e) {
            var r = new Uint8Array(32),
                n = new Uint8Array(32);
            return j(r, t), j(n, e), b(r, 0, n, 0)
        }

        function D(t) {
            var e = new Uint8Array(32);
            return j(e, t), 1 & e[0]
        }

        function U(t, e) {
            var r;
            for (r = 0; r < 16; r++) t[r] = e[2 * r] + (e[2 * r + 1] << 8);
            t[15] &= 32767
        }

        function L(t, e, r) {
            for (var n = 0; n < 16; n++) t[n] = e[n] + r[n]
        }

        function k(t, e, r) {
            for (var n = 0; n < 16; n++) t[n] = e[n] - r[n]
        }

        function P(t, e, r) {
            var n, i, o = 0,
                s = 0,
                u = 0,
                h = 0,
                a = 0,
                c = 0,
                l = 0,
                f = 0,
                d = 0,
                p = 0,
                m = 0,
                v = 0,
                b = 0,
                y = 0,
                g = 0,
                w = 0,
                M = 0,
                _ = 0,
                S = 0,
                E = 0,
                x = 0,
                A = 0,
                O = 0,
                I = 0,
                T = 0,
                N = 0,
                R = 0,
                B = 0,
                j = 0,
                C = 0,
                D = 0,
                U = r[0],
                L = r[1],
                k = r[2],
                P = r[3],
                F = r[4],
                $ = r[5],
                V = r[6],
                q = r[7],
                z = r[8],
                Y = r[9],
                W = r[10],
                G = r[11],
                Z = r[12],
                H = r[13],
                K = r[14],
                X = r[15];
            o += (n = e[0]) * U, s += n * L, u += n * k, h += n * P, a += n * F, c += n * $, l += n * V, f += n * q, d += n * z, p += n * Y, m += n * W, v += n * G, b += n * Z, y += n * H, g += n * K, w += n * X, s += (n = e[1]) * U, u += n * L, h += n * k, a += n * P, c += n * F, l += n * $, f += n * V, d += n * q, p += n * z, m += n * Y, v += n * W, b += n * G, y += n * Z, g += n * H, w += n * K, M += n * X, u += (n = e[2]) * U, h += n * L, a += n * k, c += n * P, l += n * F, f += n * $, d += n * V, p += n * q, m += n * z, v += n * Y, b += n * W, y += n * G, g += n * Z, w += n * H, M += n * K, _ += n * X, h += (n = e[3]) * U, a += n * L, c += n * k, l += n * P, f += n * F, d += n * $, p += n * V, m += n * q, v += n * z, b += n * Y, y += n * W, g += n * G, w += n * Z, M += n * H, _ += n * K, S += n * X, a += (n = e[4]) * U, c += n * L, l += n * k, f += n * P, d += n * F, p += n * $, m += n * V, v += n * q, b += n * z, y += n * Y, g += n * W, w += n * G, M += n * Z, _ += n * H, S += n * K, E += n * X, c += (n = e[5]) * U, l += n * L, f += n * k, d += n * P, p += n * F, m += n * $, v += n * V, b += n * q, y += n * z, g += n * Y, w += n * W, M += n * G, _ += n * Z, S += n * H, E += n * K, x += n * X, l += (n = e[6]) * U, f += n * L, d += n * k, p += n * P, m += n * F, v += n * $, b += n * V, y += n * q, g += n * z, w += n * Y, M += n * W, _ += n * G, S += n * Z, E += n * H, x += n * K, A += n * X, f += (n = e[7]) * U, d += n * L, p += n * k, m += n * P, v += n * F, b += n * $, y += n * V, g += n * q, w += n * z, M += n * Y, _ += n * W, S += n * G, E += n * Z, x += n * H, A += n * K, O += n * X, d += (n = e[8]) * U, p += n * L, m += n * k, v += n * P, b += n * F, y += n * $, g += n * V, w += n * q, M += n * z, _ += n * Y, S += n * W, E += n * G, x += n * Z, A += n * H, O += n * K, I += n * X, p += (n = e[9]) * U, m += n * L, v += n * k, b += n * P, y += n * F, g += n * $, w += n * V, M += n * q, _ += n * z, S += n * Y, E += n * W, x += n * G, A += n * Z, O += n * H, I += n * K, T += n * X, m += (n = e[10]) * U, v += n * L, b += n * k, y += n * P, g += n * F, w += n * $, M += n * V, _ += n * q, S += n * z, E += n * Y, x += n * W, A += n * G, O += n * Z, I += n * H, T += n * K, N += n * X, v += (n = e[11]) * U, b += n * L, y += n * k, g += n * P, w += n * F, M += n * $, _ += n * V, S += n * q, E += n * z, x += n * Y, A += n * W, O += n * G, I += n * Z, T += n * H, N += n * K, R += n * X, b += (n = e[12]) * U, y += n * L, g += n * k, w += n * P, M += n * F, _ += n * $, S += n * V, E += n * q, x += n * z, A += n * Y, O += n * W, I += n * G, T += n * Z, N += n * H, R += n * K, B += n * X, y += (n = e[13]) * U, g += n * L, w += n * k, M += n * P, _ += n * F, S += n * $, E += n * V, x += n * q, A += n * z, O += n * Y, I += n * W, T += n * G, N += n * Z, R += n * H, B += n * K, j += n * X, g += (n = e[14]) * U, w += n * L, M += n * k, _ += n * P, S += n * F, E += n * $, x += n * V, A += n * q, O += n * z, I += n * Y, T += n * W, N += n * G, R += n * Z, B += n * H, j += n * K, C += n * X, w += (n = e[15]) * U, s += 38 * (_ += n * k), u += 38 * (S += n * P), h += 38 * (E += n * F), a += 38 * (x += n * $), c += 38 * (A += n * V), l += 38 * (O += n * q), f += 38 * (I += n * z), d += 38 * (T += n * Y), p += 38 * (N += n * W), m += 38 * (R += n * G), v += 38 * (B += n * Z), b += 38 * (j += n * H), y += 38 * (C += n * K), g += 38 * (D += n * X), o = (n = (o += 38 * (M += n * L)) + (i = 1) + 65535) - 65536 * (i = Math.floor(n / 65536)), s = (n = s + i + 65535) - 65536 * (i = Math.floor(n / 65536)), u = (n = u + i + 65535) - 65536 * (i = Math.floor(n / 65536)), h = (n = h + i + 65535) - 65536 * (i = Math.floor(n / 65536)), a = (n = a + i + 65535) - 65536 * (i = Math.floor(n / 65536)), c = (n = c + i + 65535) - 65536 * (i = Math.floor(n / 65536)), l = (n = l + i + 65535) - 65536 * (i = Math.floor(n / 65536)), f = (n = f + i + 65535) - 65536 * (i = Math.floor(n / 65536)), d = (n = d + i + 65535) - 65536 * (i = Math.floor(n / 65536)), p = (n = p + i + 65535) - 65536 * (i = Math.floor(n / 65536)), m = (n = m + i + 65535) - 65536 * (i = Math.floor(n / 65536)), v = (n = v + i + 65535) - 65536 * (i = Math.floor(n / 65536)), b = (n = b + i + 65535) - 65536 * (i = Math.floor(n / 65536)), y = (n = y + i + 65535) - 65536 * (i = Math.floor(n / 65536)), g = (n = g + i + 65535) - 65536 * (i = Math.floor(n / 65536)), w = (n = w + i + 65535) - 65536 * (i = Math.floor(n / 65536)), o = (n = (o += i - 1 + 37 * (i - 1)) + (i = 1) + 65535) - 65536 * (i = Math.floor(n / 65536)), s = (n = s + i + 65535) - 65536 * (i = Math.floor(n / 65536)), u = (n = u + i + 65535) - 65536 * (i = Math.floor(n / 65536)), h = (n = h + i + 65535) - 65536 * (i = Math.floor(n / 65536)), a = (n = a + i + 65535) - 65536 * (i = Math.floor(n / 65536)), c = (n = c + i + 65535) - 65536 * (i = Math.floor(n / 65536)), l = (n = l + i + 65535) - 65536 * (i = Math.floor(n / 65536)), f = (n = f + i + 65535) - 65536 * (i = Math.floor(n / 65536)), d = (n = d + i + 65535) - 65536 * (i = Math.floor(n / 65536)), p = (n = p + i + 65535) - 65536 * (i = Math.floor(n / 65536)), m = (n = m + i + 65535) - 65536 * (i = Math.floor(n / 65536)), v = (n = v + i + 65535) - 65536 * (i = Math.floor(n / 65536)), b = (n = b + i + 65535) - 65536 * (i = Math.floor(n / 65536)), y = (n = y + i + 65535) - 65536 * (i = Math.floor(n / 65536)), g = (n = g + i + 65535) - 65536 * (i = Math.floor(n / 65536)), w = (n = w + i + 65535) - 65536 * (i = Math.floor(n / 65536)), o += i - 1 + 37 * (i - 1), t[0] = o, t[1] = s, t[2] = u, t[3] = h, t[4] = a, t[5] = c, t[6] = l, t[7] = f, t[8] = d, t[9] = p, t[10] = m, t[11] = v, t[12] = b, t[13] = y, t[14] = g, t[15] = w
        }

        function F(t, e) {
            P(t, e, e)
        }

        function $(t, r) {
            var n, i = e();
            for (n = 0; n < 16; n++) i[n] = r[n];
            for (n = 253; n >= 0; n--) F(i, i), 2 !== n && 4 !== n && P(i, i, r);
            for (n = 0; n < 16; n++) t[n] = i[n]
        }

        function V(t, r) {
            var n, i = e();
            for (n = 0; n < 16; n++) i[n] = r[n];
            for (n = 250; n >= 0; n--) F(i, i), 1 !== n && P(i, i, r);
            for (n = 0; n < 16; n++) t[n] = i[n]
        }

        function q(t, r, n) {
            var i, o, s = new Uint8Array(32),
                u = new Float64Array(80),
                a = e(),
                c = e(),
                l = e(),
                f = e(),
                d = e(),
                p = e();
            for (o = 0; o < 31; o++) s[o] = r[o];
            for (s[31] = 127 & r[31] | 64, s[0] &= 248, U(u, n), o = 0; o < 16; o++) c[o] = u[o], f[o] = a[o] = l[o] = 0;
            for (a[0] = f[0] = 1, o = 254; o >= 0; --o) B(a, c, i = s[o >>> 3] >>> (7 & o) & 1), B(l, f, i), L(d, a, l), k(a, a, l), L(l, c, f), k(c, c, f), F(f, d), F(p, a), P(a, l, a), P(l, c, d), L(d, a, l), k(a, a, l), F(c, a), k(l, f, p), P(a, l, h), L(a, a, f), P(l, l, a), P(a, f, p), P(f, c, u), F(c, d), B(a, c, i), B(l, f, i);
            for (o = 0; o < 16; o++) u[o + 16] = a[o], u[o + 32] = l[o], u[o + 48] = c[o], u[o + 64] = f[o];
            var m = u.subarray(32),
                v = u.subarray(16);
            return $(m, m), P(v, v, m), j(t, v), 0
        }

        function z(t, e) {
            return q(t, e, o)
        }

        function Y(t, e) {
            return n(e, 32), z(t, e)
        }

        function W(t, e, r) {
            var n = new Uint8Array(32);
            return q(n, r, e), g(t, i, n, w)
        }
        x.prototype.blocks = function(t, e, r) {
            for (var n, i, o, s, u, h, a, c, l, f, d, p, m, v, b, y, g, w, M, _ = this.fin ? 0 : 2048, S = this.h[0], E = this.h[1], x = this.h[2], A = this.h[3], O = this.h[4], I = this.h[5], T = this.h[6], N = this.h[7], R = this.h[8], B = this.h[9], j = this.r[0], C = this.r[1], D = this.r[2], U = this.r[3], L = this.r[4], k = this.r[5], P = this.r[6], F = this.r[7], $ = this.r[8], V = this.r[9]; r >= 16;) f = l = 0, f += (S += 8191 & (n = 255 & t[e + 0] | (255 & t[e + 1]) << 8)) * j, f += (E += 8191 & (n >>> 13 | (i = 255 & t[e + 2] | (255 & t[e + 3]) << 8) << 3)) * (5 * V), f += (x += 8191 & (i >>> 10 | (o = 255 & t[e + 4] | (255 & t[e + 5]) << 8) << 6)) * (5 * $), f += (A += 8191 & (o >>> 7 | (s = 255 & t[e + 6] | (255 & t[e + 7]) << 8) << 9)) * (5 * F), l = (f += (O += 8191 & (s >>> 4 | (u = 255 & t[e + 8] | (255 & t[e + 9]) << 8) << 12)) * (5 * P)) >>> 13, f &= 8191, f += (I += u >>> 1 & 8191) * (5 * k), f += (T += 8191 & (u >>> 14 | (h = 255 & t[e + 10] | (255 & t[e + 11]) << 8) << 2)) * (5 * L), f += (N += 8191 & (h >>> 11 | (a = 255 & t[e + 12] | (255 & t[e + 13]) << 8) << 5)) * (5 * U), f += (R += 8191 & (a >>> 8 | (c = 255 & t[e + 14] | (255 & t[e + 15]) << 8) << 8)) * (5 * D), d = l += (f += (B += c >>> 5 | _) * (5 * C)) >>> 13, d += S * C, d += E * j, d += x * (5 * V), d += A * (5 * $), l = (d += O * (5 * F)) >>> 13, d &= 8191, d += I * (5 * P), d += T * (5 * k), d += N * (5 * L), d += R * (5 * U), l += (d += B * (5 * D)) >>> 13, d &= 8191, p = l, p += S * D, p += E * C, p += x * j, p += A * (5 * V), l = (p += O * (5 * $)) >>> 13, p &= 8191, p += I * (5 * F), p += T * (5 * P), p += N * (5 * k), p += R * (5 * L), m = l += (p += B * (5 * U)) >>> 13, m += S * U, m += E * D, m += x * C, m += A * j, l = (m += O * (5 * V)) >>> 13, m &= 8191, m += I * (5 * $), m += T * (5 * F), m += N * (5 * P), m += R * (5 * k), v = l += (m += B * (5 * L)) >>> 13, v += S * L, v += E * U, v += x * D, v += A * C, l = (v += O * j) >>> 13, v &= 8191, v += I * (5 * V), v += T * (5 * $), v += N * (5 * F), v += R * (5 * P), b = l += (v += B * (5 * k)) >>> 13, b += S * k, b += E * L, b += x * U, b += A * D, l = (b += O * C) >>> 13, b &= 8191, b += I * j, b += T * (5 * V), b += N * (5 * $), b += R * (5 * F), y = l += (b += B * (5 * P)) >>> 13, y += S * P, y += E * k, y += x * L, y += A * U, l = (y += O * D) >>> 13, y &= 8191, y += I * C, y += T * j, y += N * (5 * V), y += R * (5 * $), g = l += (y += B * (5 * F)) >>> 13, g += S * F, g += E * P, g += x * k, g += A * L, l = (g += O * U) >>> 13, g &= 8191, g += I * D, g += T * C, g += N * j, g += R * (5 * V), w = l += (g += B * (5 * $)) >>> 13, w += S * $, w += E * F, w += x * P, w += A * k, l = (w += O * L) >>> 13, w &= 8191, w += I * U, w += T * D, w += N * C, w += R * j, M = l += (w += B * (5 * V)) >>> 13, M += S * V, M += E * $, M += x * F, M += A * P, l = (M += O * k) >>> 13, M &= 8191, M += I * L, M += T * U, M += N * D, M += R * C, S = f = 8191 & (l = (l = ((l += (M += B * j) >>> 13) << 2) + l | 0) + (f &= 8191) | 0), E = d += l >>>= 13, x = p &= 8191, A = m &= 8191, O = v &= 8191, I = b &= 8191, T = y &= 8191, N = g &= 8191, R = w &= 8191, B = M &= 8191, e += 16, r -= 16;
            this.h[0] = S, this.h[1] = E, this.h[2] = x, this.h[3] = A, this.h[4] = O, this.h[5] = I, this.h[6] = T, this.h[7] = N, this.h[8] = R, this.h[9] = B
        }, x.prototype.finish = function(t, e) {
            var r, n, i, o, s = new Uint16Array(10);
            if (this.leftover) {
                for (o = this.leftover, this.buffer[o++] = 1; o < 16; o++) this.buffer[o] = 0;
                this.fin = 1, this.blocks(this.buffer, 0, 16)
            }
            for (r = this.h[1] >>> 13, this.h[1] &= 8191, o = 2; o < 10; o++) this.h[o] += r, r = this.h[o] >>> 13, this.h[o] &= 8191;
            for (this.h[0] += 5 * r, r = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += r, r = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += r, s[0] = this.h[0] + 5, r = s[0] >>> 13, s[0] &= 8191, o = 1; o < 10; o++) s[o] = this.h[o] + r, r = s[o] >>> 13, s[o] &= 8191;
            for (s[9] -= 8192, n = (1 ^ r) - 1, o = 0; o < 10; o++) s[o] &= n;
            for (n = ~n, o = 0; o < 10; o++) this.h[o] = this.h[o] & n | s[o];
            for (this.h[0] = 65535 & (this.h[0] | this.h[1] << 13), this.h[1] = 65535 & (this.h[1] >>> 3 | this.h[2] << 10), this.h[2] = 65535 & (this.h[2] >>> 6 | this.h[3] << 7), this.h[3] = 65535 & (this.h[3] >>> 9 | this.h[4] << 4), this.h[4] = 65535 & (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14), this.h[5] = 65535 & (this.h[6] >>> 2 | this.h[7] << 11), this.h[6] = 65535 & (this.h[7] >>> 5 | this.h[8] << 8), this.h[7] = 65535 & (this.h[8] >>> 8 | this.h[9] << 5), i = this.h[0] + this.pad[0], this.h[0] = 65535 & i, o = 1; o < 8; o++) i = (this.h[o] + this.pad[o] | 0) + (i >>> 16) | 0, this.h[o] = 65535 & i;
            t[e + 0] = this.h[0] >>> 0 & 255, t[e + 1] = this.h[0] >>> 8 & 255, t[e + 2] = this.h[1] >>> 0 & 255, t[e + 3] = this.h[1] >>> 8 & 255, t[e + 4] = this.h[2] >>> 0 & 255, t[e + 5] = this.h[2] >>> 8 & 255, t[e + 6] = this.h[3] >>> 0 & 255, t[e + 7] = this.h[3] >>> 8 & 255, t[e + 8] = this.h[4] >>> 0 & 255, t[e + 9] = this.h[4] >>> 8 & 255, t[e + 10] = this.h[5] >>> 0 & 255, t[e + 11] = this.h[5] >>> 8 & 255, t[e + 12] = this.h[6] >>> 0 & 255, t[e + 13] = this.h[6] >>> 8 & 255, t[e + 14] = this.h[7] >>> 0 & 255, t[e + 15] = this.h[7] >>> 8 & 255
        }, x.prototype.update = function(t, e, r) {
            var n, i;
            if (this.leftover) {
                for ((i = 16 - this.leftover) > r && (i = r), n = 0; n < i; n++) this.buffer[this.leftover + n] = t[e + n];
                if (r -= i, e += i, this.leftover += i, this.leftover < 16) return;
                this.blocks(this.buffer, 0, 16), this.leftover = 0
            }
            if (r >= 16 && (i = r - r % 16, this.blocks(t, e, i), e += i, r -= i), r) {
                for (n = 0; n < r; n++) this.buffer[this.leftover + n] = t[e + n];
                this.leftover += r
            }
        };
        var G = I,
            Z = T;
        var H = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

        function K(t, e, r, n) {
            for (var i, o, s, u, h, a, c, l, f, d, p, m, v, b, y, g, w, M, _, S, E, x, A, O, I, T, N = new Int32Array(16), R = new Int32Array(16), B = t[0], j = t[1], C = t[2], D = t[3], U = t[4], L = t[5], k = t[6], P = t[7], F = e[0], $ = e[1], V = e[2], q = e[3], z = e[4], Y = e[5], W = e[6], G = e[7], Z = 0; n >= 128;) {
                for (_ = 0; _ < 16; _++) S = 8 * _ + Z, N[_] = r[S + 0] << 24 | r[S + 1] << 16 | r[S + 2] << 8 | r[S + 3], R[_] = r[S + 4] << 24 | r[S + 5] << 16 | r[S + 6] << 8 | r[S + 7];
                for (_ = 0; _ < 80; _++)
                    if (i = B, o = j, s = C, u = D, h = U, a = L, c = k, P, f = F, d = $, p = V, m = q, v = z, b = Y, y = W, G, A = 65535 & (x = G), O = x >>> 16, I = 65535 & (E = P), T = E >>> 16, A += 65535 & (x = (z >>> 14 | U << 18) ^ (z >>> 18 | U << 14) ^ (U >>> 9 | z << 23)), O += x >>> 16, I += 65535 & (E = (U >>> 14 | z << 18) ^ (U >>> 18 | z << 14) ^ (z >>> 9 | U << 23)), T += E >>> 16, A += 65535 & (x = z & Y ^ ~z & W), O += x >>> 16, I += 65535 & (E = U & L ^ ~U & k), T += E >>> 16, A += 65535 & (x = H[2 * _ + 1]), O += x >>> 16, I += 65535 & (E = H[2 * _]), T += E >>> 16, E = N[_ % 16], O += (x = R[_ % 16]) >>> 16, I += 65535 & E, T += E >>> 16, I += (O += (A += 65535 & x) >>> 16) >>> 16, A = 65535 & (x = M = 65535 & A | O << 16), O = x >>> 16, I = 65535 & (E = w = 65535 & I | (T += I >>> 16) << 16), T = E >>> 16, A += 65535 & (x = (F >>> 28 | B << 4) ^ (B >>> 2 | F << 30) ^ (B >>> 7 | F << 25)), O += x >>> 16, I += 65535 & (E = (B >>> 28 | F << 4) ^ (F >>> 2 | B << 30) ^ (F >>> 7 | B << 25)), T += E >>> 16, O += (x = F & $ ^ F & V ^ $ & V) >>> 16, I += 65535 & (E = B & j ^ B & C ^ j & C), T += E >>> 16, l = 65535 & (I += (O += (A += 65535 & x) >>> 16) >>> 16) | (T += I >>> 16) << 16, g = 65535 & A | O << 16, A = 65535 & (x = m), O = x >>> 16, I = 65535 & (E = u), T = E >>> 16, O += (x = M) >>> 16, I += 65535 & (E = w), T += E >>> 16, j = i, C = o, D = s, U = u = 65535 & (I += (O += (A += 65535 & x) >>> 16) >>> 16) | (T += I >>> 16) << 16, L = h, k = a, P = c, B = l, $ = f, V = d, q = p, z = m = 65535 & A | O << 16, Y = v, W = b, G = y, F = g, _ % 16 == 15)
                        for (S = 0; S < 16; S++) E = N[S], A = 65535 & (x = R[S]), O = x >>> 16, I = 65535 & E, T = E >>> 16, E = N[(S + 9) % 16], A += 65535 & (x = R[(S + 9) % 16]), O += x >>> 16, I += 65535 & E, T += E >>> 16, w = N[(S + 1) % 16], A += 65535 & (x = ((M = R[(S + 1) % 16]) >>> 1 | w << 31) ^ (M >>> 8 | w << 24) ^ (M >>> 7 | w << 25)), O += x >>> 16, I += 65535 & (E = (w >>> 1 | M << 31) ^ (w >>> 8 | M << 24) ^ w >>> 7), T += E >>> 16, w = N[(S + 14) % 16], O += (x = ((M = R[(S + 14) % 16]) >>> 19 | w << 13) ^ (w >>> 29 | M << 3) ^ (M >>> 6 | w << 26)) >>> 16, I += 65535 & (E = (w >>> 19 | M << 13) ^ (M >>> 29 | w << 3) ^ w >>> 6), T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, N[S] = 65535 & I | T << 16, R[S] = 65535 & A | O << 16;
                A = 65535 & (x = F), O = x >>> 16, I = 65535 & (E = B), T = E >>> 16, E = t[0], O += (x = e[0]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[0] = B = 65535 & I | T << 16, e[0] = F = 65535 & A | O << 16, A = 65535 & (x = $), O = x >>> 16, I = 65535 & (E = j), T = E >>> 16, E = t[1], O += (x = e[1]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[1] = j = 65535 & I | T << 16, e[1] = $ = 65535 & A | O << 16, A = 65535 & (x = V), O = x >>> 16, I = 65535 & (E = C), T = E >>> 16, E = t[2], O += (x = e[2]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[2] = C = 65535 & I | T << 16, e[2] = V = 65535 & A | O << 16, A = 65535 & (x = q), O = x >>> 16, I = 65535 & (E = D), T = E >>> 16, E = t[3], O += (x = e[3]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[3] = D = 65535 & I | T << 16, e[3] = q = 65535 & A | O << 16, A = 65535 & (x = z), O = x >>> 16, I = 65535 & (E = U), T = E >>> 16, E = t[4], O += (x = e[4]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[4] = U = 65535 & I | T << 16, e[4] = z = 65535 & A | O << 16, A = 65535 & (x = Y), O = x >>> 16, I = 65535 & (E = L), T = E >>> 16, E = t[5], O += (x = e[5]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[5] = L = 65535 & I | T << 16, e[5] = Y = 65535 & A | O << 16, A = 65535 & (x = W), O = x >>> 16, I = 65535 & (E = k), T = E >>> 16, E = t[6], O += (x = e[6]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[6] = k = 65535 & I | T << 16, e[6] = W = 65535 & A | O << 16, A = 65535 & (x = G), O = x >>> 16, I = 65535 & (E = P), T = E >>> 16, E = t[7], O += (x = e[7]) >>> 16, I += 65535 & E, T += E >>> 16, T += (I += (O += (A += 65535 & x) >>> 16) >>> 16) >>> 16, t[7] = P = 65535 & I | T << 16, e[7] = G = 65535 & A | O << 16, Z += 128, n -= 128
            }
            return n
        }

        function X(t, e, r) {
            var n, i = new Int32Array(8),
                o = new Int32Array(8),
                s = new Uint8Array(256),
                u = r;
            for (i[0] = 1779033703, i[1] = 3144134277, i[2] = 1013904242, i[3] = 2773480762, i[4] = 1359893119, i[5] = 2600822924, i[6] = 528734635, i[7] = 1541459225, o[0] = 4089235720, o[1] = 2227873595, o[2] = 4271175723, o[3] = 1595750129, o[4] = 2917565137, o[5] = 725511199, o[6] = 4215389547, o[7] = 327033209, K(i, o, e, r), r %= 128, n = 0; n < r; n++) s[n] = e[u - r + n];
            for (s[r] = 128, s[(r = 256 - 128 * (r < 112 ? 1 : 0)) - 9] = 0, p(s, r - 8, u / 536870912 | 0, u << 3), K(i, o, s, r), n = 0; n < 8; n++) p(t, 8 * n, i[n], o[n]);
            return 0
        }

        function Q(t, r) {
            var n = e(),
                i = e(),
                o = e(),
                s = e(),
                u = e(),
                h = e(),
                a = e(),
                l = e(),
                f = e();
            k(n, t[1], t[0]), k(f, r[1], r[0]), P(n, n, f), L(i, t[0], t[1]), L(f, r[0], r[1]), P(i, i, f), P(o, t[3], r[3]), P(o, o, c), P(s, t[2], r[2]), L(s, s, s), k(u, i, n), k(h, s, o), L(a, s, o), L(l, i, n), P(t[0], u, h), P(t[1], l, a), P(t[2], a, h), P(t[3], u, l)
        }

        function J(t, e, r) {
            var n;
            for (n = 0; n < 4; n++) B(t[n], e[n], r)
        }

        function tt(t, r) {
            var n = e(),
                i = e(),
                o = e();
            $(o, r[2]), P(n, r[0], o), P(i, r[1], o), j(t, i), t[31] ^= D(n) << 7
        }

        function et(t, e, r) {
            var n, i;
            for (N(t[0], s), N(t[1], u), N(t[2], u), N(t[3], s), i = 255; i >= 0; --i) J(t, e, n = r[i / 8 | 0] >> (7 & i) & 1), Q(e, t), Q(t, t), J(t, e, n)
        }

        function rt(t, r) {
            var n = [e(), e(), e(), e()];
            N(n[0], l), N(n[1], f), N(n[2], u), P(n[3], l, f), et(t, n, r)
        }

        function nt(t, r, i) {
            var o, s = new Uint8Array(64),
                u = [e(), e(), e(), e()];
            for (i || n(r, 32), X(s, r, 32), s[0] &= 248, s[31] &= 127, s[31] |= 64, rt(u, s), tt(t, u), o = 0; o < 32; o++) r[o + 32] = t[o];
            return 0
        }
        var it = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);

        function ot(t, e) {
            var r, n, i, o;
            for (n = 63; n >= 32; --n) {
                for (r = 0, i = n - 32, o = n - 12; i < o; ++i) e[i] += r - 16 * e[n] * it[i - (n - 32)], r = Math.floor((e[i] + 128) / 256), e[i] -= 256 * r;
                e[i] += r, e[n] = 0
            }
            for (r = 0, i = 0; i < 32; i++) e[i] += r - (e[31] >> 4) * it[i], r = e[i] >> 8, e[i] &= 255;
            for (i = 0; i < 32; i++) e[i] -= r * it[i];
            for (n = 0; n < 32; n++) e[n + 1] += e[n] >> 8, t[n] = 255 & e[n]
        }

        function st(t) {
            var e, r = new Float64Array(64);
            for (e = 0; e < 64; e++) r[e] = t[e];
            for (e = 0; e < 64; e++) t[e] = 0;
            ot(t, r)
        }

        function ut(t, r, n, i) {
            var o, s, u = new Uint8Array(64),
                h = new Uint8Array(64),
                a = new Uint8Array(64),
                c = new Float64Array(64),
                l = [e(), e(), e(), e()];
            X(u, i, 32), u[0] &= 248, u[31] &= 127, u[31] |= 64;
            var f = n + 64;
            for (o = 0; o < n; o++) t[64 + o] = r[o];
            for (o = 0; o < 32; o++) t[32 + o] = u[32 + o];
            for (X(a, t.subarray(32), n + 32), st(a), rt(l, a), tt(t, l), o = 32; o < 64; o++) t[o] = i[o];
            for (X(h, t, n + 64), st(h), o = 0; o < 64; o++) c[o] = 0;
            for (o = 0; o < 32; o++) c[o] = a[o];
            for (o = 0; o < 32; o++)
                for (s = 0; s < 32; s++) c[o + s] += h[o] * u[s];
            return ot(t.subarray(32), c), f
        }

        function ht(t, r, n, i) {
            var o, h = new Uint8Array(32),
                c = new Uint8Array(64),
                l = [e(), e(), e(), e()],
                f = [e(), e(), e(), e()];
            if (n < 64) return -1;
            if (function(t, r) {
                    var n = e(),
                        i = e(),
                        o = e(),
                        h = e(),
                        c = e(),
                        l = e(),
                        f = e();
                    return N(t[2], u), U(t[1], r), F(o, t[1]), P(h, o, a), k(o, o, t[2]), L(h, t[2], h), F(c, h), F(l, c), P(f, l, c), P(n, f, o), P(n, n, h), V(n, n), P(n, n, o), P(n, n, h), P(n, n, h), P(t[0], n, h), F(i, t[0]), P(i, i, h), C(i, o) && P(t[0], t[0], d), F(i, t[0]), P(i, i, h), C(i, o) ? -1 : (D(t[0]) === r[31] >> 7 && k(t[0], s, t[0]), P(t[3], t[0], t[1]), 0)
                }(f, i)) return -1;
            for (o = 0; o < n; o++) t[o] = r[o];
            for (o = 0; o < 32; o++) t[o + 32] = i[o];
            if (X(c, t, n), st(c), et(l, f, c), rt(f, r.subarray(32)), Q(l, f), tt(h, l), n -= 64, b(r, 0, h, 0)) {
                for (o = 0; o < n; o++) t[o] = 0;
                return -1
            }
            for (o = 0; o < n; o++) t[o] = r[o + 64];
            return n
        }

        function at(t, e) {
            if (32 !== t.length) throw new Error("bad key size");
            if (24 !== e.length) throw new Error("bad nonce size")
        }

        function ct() {
            for (var t = 0; t < arguments.length; t++)
                if (!(arguments[t] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array")
        }

        function lt(t) {
            for (var e = 0; e < t.length; e++) t[e] = 0
        }
        t.lowlevel = {
                crypto_core_hsalsa20: g,
                crypto_stream_xor: E,
                crypto_stream: S,
                crypto_stream_salsa20_xor: M,
                crypto_stream_salsa20: _,
                crypto_onetimeauth: A,
                crypto_onetimeauth_verify: O,
                crypto_verify_16: v,
                crypto_verify_32: b,
                crypto_secretbox: I,
                crypto_secretbox_open: T,
                crypto_scalarmult: q,
                crypto_scalarmult_base: z,
                crypto_box_beforenm: W,
                crypto_box_afternm: G,
                crypto_box: function(t, e, r, n, i, o) {
                    var s = new Uint8Array(32);
                    return W(s, i, o), G(t, e, r, n, s)
                },
                crypto_box_open: function(t, e, r, n, i, o) {
                    var s = new Uint8Array(32);
                    return W(s, i, o), Z(t, e, r, n, s)
                },
                crypto_box_keypair: Y,
                crypto_hash: X,
                crypto_sign: ut,
                crypto_sign_keypair: nt,
                crypto_sign_open: ht,
                crypto_secretbox_KEYBYTES: 32,
                crypto_secretbox_NONCEBYTES: 24,
                crypto_secretbox_ZEROBYTES: 32,
                crypto_secretbox_BOXZEROBYTES: 16,
                crypto_scalarmult_BYTES: 32,
                crypto_scalarmult_SCALARBYTES: 32,
                crypto_box_PUBLICKEYBYTES: 32,
                crypto_box_SECRETKEYBYTES: 32,
                crypto_box_BEFORENMBYTES: 32,
                crypto_box_NONCEBYTES: 24,
                crypto_box_ZEROBYTES: 32,
                crypto_box_BOXZEROBYTES: 16,
                crypto_sign_BYTES: 64,
                crypto_sign_PUBLICKEYBYTES: 32,
                crypto_sign_SECRETKEYBYTES: 64,
                crypto_sign_SEEDBYTES: 32,
                crypto_hash_BYTES: 64,
                gf: e,
                D: a,
                L: it,
                pack25519: j,
                unpack25519: U,
                M: P,
                A: L,
                S: F,
                Z: k,
                pow2523: V,
                add: Q,
                set25519: N,
                modL: ot,
                scalarmult: et,
                scalarbase: rt
            }, t.randomBytes = function(t) {
                var e = new Uint8Array(t);
                return n(e, t), e
            }, t.secretbox = function(t, e, r) {
                ct(t, e, r), at(r, e);
                for (var n = new Uint8Array(32 + t.length), i = new Uint8Array(n.length), o = 0; o < t.length; o++) n[o + 32] = t[o];
                return I(i, n, n.length, e, r), i.subarray(16)
            }, t.secretbox.open = function(t, e, r) {
                ct(t, e, r), at(r, e);
                for (var n = new Uint8Array(16 + t.length), i = new Uint8Array(n.length), o = 0; o < t.length; o++) n[o + 16] = t[o];
                return n.length < 32 || 0 !== T(i, n, n.length, e, r) ? null : i.subarray(32)
            }, t.secretbox.keyLength = 32, t.secretbox.nonceLength = 24, t.secretbox.overheadLength = 16, t.scalarMult = function(t, e) {
                if (ct(t, e), 32 !== t.length) throw new Error("bad n size");
                if (32 !== e.length) throw new Error("bad p size");
                var r = new Uint8Array(32);
                return q(r, t, e), r
            }, t.scalarMult.base = function(t) {
                if (ct(t), 32 !== t.length) throw new Error("bad n size");
                var e = new Uint8Array(32);
                return z(e, t), e
            }, t.scalarMult.scalarLength = 32, t.scalarMult.groupElementLength = 32, t.box = function(e, r, n, i) {
                var o = t.box.before(n, i);
                return t.secretbox(e, r, o)
            }, t.box.before = function(t, e) {
                ct(t, e),
                    function(t, e) {
                        if (32 !== t.length) throw new Error("bad public key size");
                        if (32 !== e.length) throw new Error("bad secret key size")
                    }(t, e);
                var r = new Uint8Array(32);
                return W(r, t, e), r
            }, t.box.after = t.secretbox, t.box.open = function(e, r, n, i) {
                var o = t.box.before(n, i);
                return t.secretbox.open(e, r, o)
            }, t.box.open.after = t.secretbox.open, t.box.keyPair = function() {
                var t = new Uint8Array(32),
                    e = new Uint8Array(32);
                return Y(t, e), {
                    publicKey: t,
                    secretKey: e
                }
            }, t.box.keyPair.fromSecretKey = function(t) {
                if (ct(t), 32 !== t.length) throw new Error("bad secret key size");
                var e = new Uint8Array(32);
                return z(e, t), {
                    publicKey: e,
                    secretKey: new Uint8Array(t)
                }
            }, t.box.publicKeyLength = 32, t.box.secretKeyLength = 32, t.box.sharedKeyLength = 32, t.box.nonceLength = 24, t.box.overheadLength = t.secretbox.overheadLength, t.sign = function(t, e) {
                if (ct(t, e), 64 !== e.length) throw new Error("bad secret key size");
                var r = new Uint8Array(64 + t.length);
                return ut(r, t, t.length, e), r
            }, t.sign.open = function(t, e) {
                if (ct(t, e), 32 !== e.length) throw new Error("bad public key size");
                var r = new Uint8Array(t.length),
                    n = ht(r, t, t.length, e);
                if (n < 0) return null;
                for (var i = new Uint8Array(n), o = 0; o < i.length; o++) i[o] = r[o];
                return i
            }, t.sign.detached = function(e, r) {
                for (var n = t.sign(e, r), i = new Uint8Array(64), o = 0; o < i.length; o++) i[o] = n[o];
                return i
            }, t.sign.detached.verify = function(t, e, r) {
                if (ct(t, e, r), 64 !== e.length) throw new Error("bad signature size");
                if (32 !== r.length) throw new Error("bad public key size");
                var n, i = new Uint8Array(64 + t.length),
                    o = new Uint8Array(64 + t.length);
                for (n = 0; n < 64; n++) i[n] = e[n];
                for (n = 0; n < t.length; n++) i[n + 64] = t[n];
                return ht(o, i, i.length, r) >= 0
            }, t.sign.keyPair = function() {
                var t = new Uint8Array(32),
                    e = new Uint8Array(64);
                return nt(t, e), {
                    publicKey: t,
                    secretKey: e
                }
            }, t.sign.keyPair.fromSecretKey = function(t) {
                if (ct(t), 64 !== t.length) throw new Error("bad secret key size");
                for (var e = new Uint8Array(32), r = 0; r < e.length; r++) e[r] = t[32 + r];
                return {
                    publicKey: e,
                    secretKey: new Uint8Array(t)
                }
            }, t.sign.keyPair.fromSeed = function(t) {
                if (ct(t), 32 !== t.length) throw new Error("bad seed size");
                for (var e = new Uint8Array(32), r = new Uint8Array(64), n = 0; n < 32; n++) r[n] = t[n];
                return nt(e, r, !0), {
                    publicKey: e,
                    secretKey: r
                }
            }, t.sign.publicKeyLength = 32, t.sign.secretKeyLength = 64, t.sign.seedLength = 32, t.sign.signatureLength = 64, t.hash = function(t) {
                ct(t);
                var e = new Uint8Array(64);
                return X(e, t, t.length), e
            }, t.hash.hashLength = 64, t.verify = function(t, e) {
                return ct(t, e), 0 !== t.length && 0 !== e.length && (t.length === e.length && 0 === m(t, 0, e, 0, t.length))
            }, t.setPRNG = function(t) {
                n = t
            },
            function() {
                var e = "undefined" != typeof self ? self.crypto || self.msCrypto : null;
                if (e && e.getRandomValues) {
                    t.setPRNG((function(t, r) {
                        var n, i = new Uint8Array(r);
                        for (n = 0; n < r; n += 65536) e.getRandomValues(i.subarray(n, n + Math.min(r - n, 65536)));
                        for (n = 0; n < r; n++) t[n] = i[n];
                        lt(i)
                    }))
                } else(e = r(11)) && e.randomBytes && t.setPRNG((function(t, r) {
                    var n, i = e.randomBytes(r);
                    for (n = 0; n < r; n++) t[n] = i[n];
                    lt(i)
                }))
            }()
    }(t.exports ? t.exports : self.nacl = self.nacl || {})
}, function(t, e) {}, function(t, e, r) {
    "use strict";
    var n = r(13),
        i = r(14),
        o = new n(0),
        s = new n(-1),
        u = {
            noether: "0",
            wei: "1",
            kwei: "1000",
            Kwei: "1000",
            babbage: "1000",
            femtoether: "1000",
            mwei: "1000000",
            Mwei: "1000000",
            lovelace: "1000000",
            picoether: "1000000",
            gwei: "1000000000",
            Gwei: "1000000000",
            shannon: "1000000000",
            nanoether: "1000000000",
            nano: "1000000000",
            szabo: "1000000000000",
            microether: "1000000000000",
            micro: "1000000000000",
            finney: "1000000000000000",
            milliether: "1000000000000000",
            milli: "1000000000000000",
            ether: "1000000000000000000",
            kether: "1000000000000000000000",
            grand: "1000000000000000000000",
            mether: "1000000000000000000000000",
            gether: "1000000000000000000000000000",
            tether: "1000000000000000000000000000000"
        };

    function h(t) {
        var e = t ? t.toLowerCase() : "ether",
            r = u[e];
        if ("string" != typeof r) throw new Error("[ethjs-unit] the unit provided " + t + " doesn't exists, please use the one of the following units " + JSON.stringify(u, null, 2));
        return new n(r, 10)
    }

    function a(t) {
        if ("string" == typeof t) {
            if (!t.match(/^-?[0-9.]+$/)) throw new Error("while converting number to string, invalid number value '" + t + "', should be a number matching (^-?[0-9.]+).");
            return t
        }
        if ("number" == typeof t) return String(t);
        if ("object" == typeof t && t.toString && (t.toTwos || t.dividedToIntegerBy)) return t.toPrecision ? String(t.toPrecision()) : t.toString(10);
        throw new Error("while converting number to string, invalid number value '" + t + "' type " + typeof t + ".")
    }
    t.exports = {
        unitMap: u,
        numberToString: a,
        getValueOfUnit: h,
        fromWei: function(t, e, r) {
            var n = i(t),
                a = n.lt(o),
                c = h(e),
                l = u[e].length - 1 || 1,
                f = r || {};
            a && (n = n.mul(s));
            for (var d = n.mod(c).toString(10); d.length < l;) d = "0" + d;
            f.pad || (d = d.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
            var p = n.div(c).toString(10);
            f.commify && (p = p.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            var m = p + ("0" == d ? "" : "." + d);
            return a && (m = "-" + m), m
        },
        toWei: function(t, e) {
            var r = a(t),
                i = h(e),
                o = u[e].length - 1 || 1,
                c = "-" === r.substring(0, 1);
            if (c && (r = r.substring(1)), "." === r) throw new Error("[ethjs-unit] while converting number " + t + " to wei, invalid value");
            var l = r.split(".");
            if (l.length > 2) throw new Error("[ethjs-unit] while converting number " + t + " to wei,  too many decimal points");
            var f = l[0],
                d = l[1];
            if (f || (f = "0"), d || (d = "0"), d.length > o) throw new Error("[ethjs-unit] while converting number " + t + " to wei, too many decimal places");
            for (; d.length < o;) d += "0";
            f = new n(f), d = new n(d);
            var p = f.mul(i).add(d);
            return c && (p = p.mul(s)), new n(p.toString(10), 10)
        }
    }
}, function(t, e, r) {
    (function(t) {
        ! function(t, e) {
            "use strict";

            function n(t, e) {
                if (!t) throw new Error(e || "Assertion failed")
            }

            function i(t, e) {
                t.super_ = e;
                var r = function() {};
                r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
            }

            function o(t, e, r) {
                if (o.isBN(t)) return t;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
            }
            var s;
            "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
            try {
                s = r(2).Buffer
            } catch (t) {}

            function u(t, e, r) {
                for (var n = 0, i = Math.min(t.length, r), o = e; o < i; o++) {
                    var s = t.charCodeAt(o) - 48;
                    n <<= 4, n |= s >= 49 && s <= 54 ? s - 49 + 10 : s >= 17 && s <= 22 ? s - 17 + 10 : 15 & s
                }
                return n
            }

            function h(t, e, r, n) {
                for (var i = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
                    var u = t.charCodeAt(s) - 48;
                    i *= n, i += u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u
                }
                return i
            }
            o.isBN = function(t) {
                return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
            }, o.max = function(t, e) {
                return t.cmp(e) > 0 ? t : e
            }, o.min = function(t, e) {
                return t.cmp(e) < 0 ? t : e
            }, o.prototype._init = function(t, e, r) {
                if ("number" == typeof t) return this._initNumber(t, e, r);
                if ("object" == typeof t) return this._initArray(t, e, r);
                "hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
                var i = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && i++, 16 === e ? this._parseHex(t, i) : this._parseBase(t, e, i), "-" === t[0] && (this.negative = 1), this.strip(), "le" === r && this._initArray(this.toArray(), e, r)
            }, o.prototype._initNumber = function(t, e, r) {
                t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (n(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
            }, o.prototype._initArray = function(t, e, r) {
                if (n("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var o, s, u = 0;
                if ("be" === r)
                    for (i = t.length - 1, o = 0; i >= 0; i -= 3) s = t[i] | t[i - 1] << 8 | t[i - 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);
                else if ("le" === r)
                    for (i = 0, o = 0; i < t.length; i += 3) s = t[i] | t[i + 1] << 8 | t[i + 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);
                return this.strip()
            }, o.prototype._parseHex = function(t, e) {
                this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                for (var r = 0; r < this.length; r++) this.words[r] = 0;
                var n, i, o = 0;
                for (r = t.length - 6, n = 0; r >= e; r -= 6) i = u(t, r, r + 6), this.words[n] |= i << o & 67108863, this.words[n + 1] |= i >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, n++);
                r + 6 !== e && (i = u(t, e, r + 6), this.words[n] |= i << o & 67108863, this.words[n + 1] |= i >>> 26 - o & 4194303), this.strip()
            }, o.prototype._parseBase = function(t, e, r) {
                this.words = [0], this.length = 1;
                for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
                n--, i = i / e | 0;
                for (var o = t.length - r, s = o % n, u = Math.min(o, o - s) + r, a = 0, c = r; c < u; c += n) a = h(t, c, c + n, e), this.imuln(i), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
                if (0 !== s) {
                    var l = 1;
                    for (a = h(t, c, t.length, e), c = 0; c < s; c++) l *= e;
                    this.imuln(l), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a)
                }
            }, o.prototype.copy = function(t) {
                t.words = new Array(this.length);
                for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                t.length = this.length, t.negative = this.negative, t.red = this.red
            }, o.prototype.clone = function() {
                var t = new o(null);
                return this.copy(t), t
            }, o.prototype._expand = function(t) {
                for (; this.length < t;) this.words[this.length++] = 0;
                return this
            }, o.prototype.strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, o.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, o.prototype.inspect = function() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var a = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                c = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                l = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function f(t, e, r) {
                r.negative = e.negative ^ t.negative;
                var n = t.length + e.length | 0;
                r.length = n, n = n - 1 | 0;
                var i = 0 | t.words[0],
                    o = 0 | e.words[0],
                    s = i * o,
                    u = 67108863 & s,
                    h = s / 67108864 | 0;
                r.words[0] = u;
                for (var a = 1; a < n; a++) {
                    for (var c = h >>> 26, l = 67108863 & h, f = Math.min(a, e.length - 1), d = Math.max(0, a - t.length + 1); d <= f; d++) {
                        var p = a - d | 0;
                        c += (s = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + l) / 67108864 | 0, l = 67108863 & s
                    }
                    r.words[a] = 0 | l, h = 0 | c
                }
                return 0 !== h ? r.words[a] = 0 | h : r.length--, r.strip()
            }
            o.prototype.toString = function(t, e) {
                var r;
                if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                    r = "";
                    for (var i = 0, o = 0, s = 0; s < this.length; s++) {
                        var u = this.words[s],
                            h = (16777215 & (u << i | o)).toString(16);
                        r = 0 !== (o = u >>> 24 - i & 16777215) || s !== this.length - 1 ? a[6 - h.length] + h + r : h + r, (i += 2) >= 26 && (i -= 26, s--)
                    }
                    for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                if (t === (0 | t) && t >= 2 && t <= 36) {
                    var f = c[t],
                        d = l[t];
                    r = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var m = p.modn(d).toString(t);
                        r = (p = p.idivn(d)).isZero() ? m + r : a[f - m.length] + m + r
                    }
                    for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                n(!1, "Base should be between 2 and 36")
            }, o.prototype.toNumber = function() {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
            }, o.prototype.toJSON = function() {
                return this.toString(16)
            }, o.prototype.toBuffer = function(t, e) {
                return n(void 0 !== s), this.toArrayLike(s, t, e)
            }, o.prototype.toArray = function(t, e) {
                return this.toArrayLike(Array, t, e)
            }, o.prototype.toArrayLike = function(t, e, r) {
                var i = this.byteLength(),
                    o = r || Math.max(1, i);
                n(i <= o, "byte array longer than desired length"), n(o > 0, "Requested array length <= 0"), this.strip();
                var s, u, h = "le" === e,
                    a = new t(o),
                    c = this.clone();
                if (h) {
                    for (u = 0; !c.isZero(); u++) s = c.andln(255), c.iushrn(8), a[u] = s;
                    for (; u < o; u++) a[u] = 0
                } else {
                    for (u = 0; u < o - i; u++) a[u] = 0;
                    for (u = 0; !c.isZero(); u++) s = c.andln(255), c.iushrn(8), a[o - u - 1] = s
                }
                return a
            }, Math.clz32 ? o.prototype._countBits = function(t) {
                return 32 - Math.clz32(t)
            } : o.prototype._countBits = function(t) {
                var e = t,
                    r = 0;
                return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
            }, o.prototype._zeroBits = function(t) {
                if (0 === t) return 26;
                var e = t,
                    r = 0;
                return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7), 0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 & e) && r++, r
            }, o.prototype.bitLength = function() {
                var t = this.words[this.length - 1],
                    e = this._countBits(t);
                return 26 * (this.length - 1) + e
            }, o.prototype.zeroBits = function() {
                if (this.isZero()) return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                    var r = this._zeroBits(this.words[e]);
                    if (t += r, 26 !== r) break
                }
                return t
            }, o.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }, o.prototype.toTwos = function(t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }, o.prototype.fromTwos = function(t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }, o.prototype.isNeg = function() {
                return 0 !== this.negative
            }, o.prototype.neg = function() {
                return this.clone().ineg()
            }, o.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1), this
            }, o.prototype.iuor = function(t) {
                for (; this.length < t.length;) this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                return this.strip()
            }, o.prototype.ior = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuor(t)
            }, o.prototype.or = function(t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }, o.prototype.uor = function(t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }, o.prototype.iuand = function(t) {
                var e;
                e = this.length > t.length ? t : this;
                for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                return this.length = e.length, this.strip()
            }, o.prototype.iand = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuand(t)
            }, o.prototype.and = function(t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }, o.prototype.uand = function(t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }, o.prototype.iuxor = function(t) {
                var e, r;
                this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
                if (this !== e)
                    for (; n < e.length; n++) this.words[n] = e.words[n];
                return this.length = e.length, this.strip()
            }, o.prototype.ixor = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuxor(t)
            }, o.prototype.xor = function(t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }, o.prototype.uxor = function(t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }, o.prototype.inotn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = 0 | Math.ceil(t / 26),
                    r = t % 26;
                this._expand(e), r > 0 && e--;
                for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
                return r > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - r), this.strip()
            }, o.prototype.notn = function(t) {
                return this.clone().inotn(t)
            }, o.prototype.setn = function(t, e) {
                n("number" == typeof t && t >= 0);
                var r = t / 26 | 0,
                    i = t % 26;
                return this._expand(r + 1), this.words[r] = e ? this.words[r] | 1 << i : this.words[r] & ~(1 << i), this.strip()
            }, o.prototype.iadd = function(t) {
                var e, r, n;
                if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                this.length > t.length ? (r = this, n = t) : (r = t, n = this);
                for (var i = 0, o = 0; o < n.length; o++) e = (0 | r.words[o]) + (0 | n.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                for (; 0 !== i && o < r.length; o++) e = (0 | r.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                if (this.length = r.length, 0 !== i) this.words[this.length] = i, this.length++;
                else if (r !== this)
                    for (; o < r.length; o++) this.words[o] = r.words[o];
                return this
            }, o.prototype.add = function(t) {
                var e;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }, o.prototype.isub = function(t) {
                if (0 !== t.negative) {
                    t.negative = 0;
                    var e = this.iadd(t);
                    return t.negative = 1, e._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                var r, n, i = this.cmp(t);
                if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                i > 0 ? (r = this, n = t) : (r = t, n = this);
                for (var o = 0, s = 0; s < n.length; s++) o = (e = (0 | r.words[s]) - (0 | n.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                for (; 0 !== o && s < r.length; s++) o = (e = (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                if (0 === o && s < r.length && r !== this)
                    for (; s < r.length; s++) this.words[s] = r.words[s];
                return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this.strip()
            }, o.prototype.sub = function(t) {
                return this.clone().isub(t)
            };
            var d = function(t, e, r) {
                var n, i, o, s = t.words,
                    u = e.words,
                    h = r.words,
                    a = 0,
                    c = 0 | s[0],
                    l = 8191 & c,
                    f = c >>> 13,
                    d = 0 | s[1],
                    p = 8191 & d,
                    m = d >>> 13,
                    v = 0 | s[2],
                    b = 8191 & v,
                    y = v >>> 13,
                    g = 0 | s[3],
                    w = 8191 & g,
                    M = g >>> 13,
                    _ = 0 | s[4],
                    S = 8191 & _,
                    E = _ >>> 13,
                    x = 0 | s[5],
                    A = 8191 & x,
                    O = x >>> 13,
                    I = 0 | s[6],
                    T = 8191 & I,
                    N = I >>> 13,
                    R = 0 | s[7],
                    B = 8191 & R,
                    j = R >>> 13,
                    C = 0 | s[8],
                    D = 8191 & C,
                    U = C >>> 13,
                    L = 0 | s[9],
                    k = 8191 & L,
                    P = L >>> 13,
                    F = 0 | u[0],
                    $ = 8191 & F,
                    V = F >>> 13,
                    q = 0 | u[1],
                    z = 8191 & q,
                    Y = q >>> 13,
                    W = 0 | u[2],
                    G = 8191 & W,
                    Z = W >>> 13,
                    H = 0 | u[3],
                    K = 8191 & H,
                    X = H >>> 13,
                    Q = 0 | u[4],
                    J = 8191 & Q,
                    tt = Q >>> 13,
                    et = 0 | u[5],
                    rt = 8191 & et,
                    nt = et >>> 13,
                    it = 0 | u[6],
                    ot = 8191 & it,
                    st = it >>> 13,
                    ut = 0 | u[7],
                    ht = 8191 & ut,
                    at = ut >>> 13,
                    ct = 0 | u[8],
                    lt = 8191 & ct,
                    ft = ct >>> 13,
                    dt = 0 | u[9],
                    pt = 8191 & dt,
                    mt = dt >>> 13;
                r.negative = t.negative ^ e.negative, r.length = 19;
                var vt = (a + (n = Math.imul(l, $)) | 0) + ((8191 & (i = (i = Math.imul(l, V)) + Math.imul(f, $) | 0)) << 13) | 0;
                a = ((o = Math.imul(f, V)) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, n = Math.imul(p, $), i = (i = Math.imul(p, V)) + Math.imul(m, $) | 0, o = Math.imul(m, V);
                var bt = (a + (n = n + Math.imul(l, z) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, Y) | 0) + Math.imul(f, z) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, Y) | 0) + (i >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, n = Math.imul(b, $), i = (i = Math.imul(b, V)) + Math.imul(y, $) | 0, o = Math.imul(y, V), n = n + Math.imul(p, z) | 0, i = (i = i + Math.imul(p, Y) | 0) + Math.imul(m, z) | 0, o = o + Math.imul(m, Y) | 0;
                var yt = (a + (n = n + Math.imul(l, G) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, Z) | 0) + Math.imul(f, G) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, Z) | 0) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, n = Math.imul(w, $), i = (i = Math.imul(w, V)) + Math.imul(M, $) | 0, o = Math.imul(M, V), n = n + Math.imul(b, z) | 0, i = (i = i + Math.imul(b, Y) | 0) + Math.imul(y, z) | 0, o = o + Math.imul(y, Y) | 0, n = n + Math.imul(p, G) | 0, i = (i = i + Math.imul(p, Z) | 0) + Math.imul(m, G) | 0, o = o + Math.imul(m, Z) | 0;
                var gt = (a + (n = n + Math.imul(l, K) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, X) | 0) + Math.imul(f, K) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, X) | 0) + (i >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, n = Math.imul(S, $), i = (i = Math.imul(S, V)) + Math.imul(E, $) | 0, o = Math.imul(E, V), n = n + Math.imul(w, z) | 0, i = (i = i + Math.imul(w, Y) | 0) + Math.imul(M, z) | 0, o = o + Math.imul(M, Y) | 0, n = n + Math.imul(b, G) | 0, i = (i = i + Math.imul(b, Z) | 0) + Math.imul(y, G) | 0, o = o + Math.imul(y, Z) | 0, n = n + Math.imul(p, K) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(m, K) | 0, o = o + Math.imul(m, X) | 0;
                var wt = (a + (n = n + Math.imul(l, J) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, tt) | 0) + Math.imul(f, J) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, tt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, n = Math.imul(A, $), i = (i = Math.imul(A, V)) + Math.imul(O, $) | 0, o = Math.imul(O, V), n = n + Math.imul(S, z) | 0, i = (i = i + Math.imul(S, Y) | 0) + Math.imul(E, z) | 0, o = o + Math.imul(E, Y) | 0, n = n + Math.imul(w, G) | 0, i = (i = i + Math.imul(w, Z) | 0) + Math.imul(M, G) | 0, o = o + Math.imul(M, Z) | 0, n = n + Math.imul(b, K) | 0, i = (i = i + Math.imul(b, X) | 0) + Math.imul(y, K) | 0, o = o + Math.imul(y, X) | 0, n = n + Math.imul(p, J) | 0, i = (i = i + Math.imul(p, tt) | 0) + Math.imul(m, J) | 0, o = o + Math.imul(m, tt) | 0;
                var Mt = (a + (n = n + Math.imul(l, rt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, nt) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, nt) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, n = Math.imul(T, $), i = (i = Math.imul(T, V)) + Math.imul(N, $) | 0, o = Math.imul(N, V), n = n + Math.imul(A, z) | 0, i = (i = i + Math.imul(A, Y) | 0) + Math.imul(O, z) | 0, o = o + Math.imul(O, Y) | 0, n = n + Math.imul(S, G) | 0, i = (i = i + Math.imul(S, Z) | 0) + Math.imul(E, G) | 0, o = o + Math.imul(E, Z) | 0, n = n + Math.imul(w, K) | 0, i = (i = i + Math.imul(w, X) | 0) + Math.imul(M, K) | 0, o = o + Math.imul(M, X) | 0, n = n + Math.imul(b, J) | 0, i = (i = i + Math.imul(b, tt) | 0) + Math.imul(y, J) | 0, o = o + Math.imul(y, tt) | 0, n = n + Math.imul(p, rt) | 0, i = (i = i + Math.imul(p, nt) | 0) + Math.imul(m, rt) | 0, o = o + Math.imul(m, nt) | 0;
                var _t = (a + (n = n + Math.imul(l, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, st) | 0) + Math.imul(f, ot) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, st) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, n = Math.imul(B, $), i = (i = Math.imul(B, V)) + Math.imul(j, $) | 0, o = Math.imul(j, V), n = n + Math.imul(T, z) | 0, i = (i = i + Math.imul(T, Y) | 0) + Math.imul(N, z) | 0, o = o + Math.imul(N, Y) | 0, n = n + Math.imul(A, G) | 0, i = (i = i + Math.imul(A, Z) | 0) + Math.imul(O, G) | 0, o = o + Math.imul(O, Z) | 0, n = n + Math.imul(S, K) | 0, i = (i = i + Math.imul(S, X) | 0) + Math.imul(E, K) | 0, o = o + Math.imul(E, X) | 0, n = n + Math.imul(w, J) | 0, i = (i = i + Math.imul(w, tt) | 0) + Math.imul(M, J) | 0, o = o + Math.imul(M, tt) | 0, n = n + Math.imul(b, rt) | 0, i = (i = i + Math.imul(b, nt) | 0) + Math.imul(y, rt) | 0, o = o + Math.imul(y, nt) | 0, n = n + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, st) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, st) | 0;
                var St = (a + (n = n + Math.imul(l, ht) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, at) | 0) + Math.imul(f, ht) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, at) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, n = Math.imul(D, $), i = (i = Math.imul(D, V)) + Math.imul(U, $) | 0, o = Math.imul(U, V), n = n + Math.imul(B, z) | 0, i = (i = i + Math.imul(B, Y) | 0) + Math.imul(j, z) | 0, o = o + Math.imul(j, Y) | 0, n = n + Math.imul(T, G) | 0, i = (i = i + Math.imul(T, Z) | 0) + Math.imul(N, G) | 0, o = o + Math.imul(N, Z) | 0, n = n + Math.imul(A, K) | 0, i = (i = i + Math.imul(A, X) | 0) + Math.imul(O, K) | 0, o = o + Math.imul(O, X) | 0, n = n + Math.imul(S, J) | 0, i = (i = i + Math.imul(S, tt) | 0) + Math.imul(E, J) | 0, o = o + Math.imul(E, tt) | 0, n = n + Math.imul(w, rt) | 0, i = (i = i + Math.imul(w, nt) | 0) + Math.imul(M, rt) | 0, o = o + Math.imul(M, nt) | 0, n = n + Math.imul(b, ot) | 0, i = (i = i + Math.imul(b, st) | 0) + Math.imul(y, ot) | 0, o = o + Math.imul(y, st) | 0, n = n + Math.imul(p, ht) | 0, i = (i = i + Math.imul(p, at) | 0) + Math.imul(m, ht) | 0, o = o + Math.imul(m, at) | 0;
                var Et = (a + (n = n + Math.imul(l, lt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ft) | 0) + Math.imul(f, lt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, ft) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, n = Math.imul(k, $), i = (i = Math.imul(k, V)) + Math.imul(P, $) | 0, o = Math.imul(P, V), n = n + Math.imul(D, z) | 0, i = (i = i + Math.imul(D, Y) | 0) + Math.imul(U, z) | 0, o = o + Math.imul(U, Y) | 0, n = n + Math.imul(B, G) | 0, i = (i = i + Math.imul(B, Z) | 0) + Math.imul(j, G) | 0, o = o + Math.imul(j, Z) | 0, n = n + Math.imul(T, K) | 0, i = (i = i + Math.imul(T, X) | 0) + Math.imul(N, K) | 0, o = o + Math.imul(N, X) | 0, n = n + Math.imul(A, J) | 0, i = (i = i + Math.imul(A, tt) | 0) + Math.imul(O, J) | 0, o = o + Math.imul(O, tt) | 0, n = n + Math.imul(S, rt) | 0, i = (i = i + Math.imul(S, nt) | 0) + Math.imul(E, rt) | 0, o = o + Math.imul(E, nt) | 0, n = n + Math.imul(w, ot) | 0, i = (i = i + Math.imul(w, st) | 0) + Math.imul(M, ot) | 0, o = o + Math.imul(M, st) | 0, n = n + Math.imul(b, ht) | 0, i = (i = i + Math.imul(b, at) | 0) + Math.imul(y, ht) | 0, o = o + Math.imul(y, at) | 0, n = n + Math.imul(p, lt) | 0, i = (i = i + Math.imul(p, ft) | 0) + Math.imul(m, lt) | 0, o = o + Math.imul(m, ft) | 0;
                var xt = (a + (n = n + Math.imul(l, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, mt) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, n = Math.imul(k, z), i = (i = Math.imul(k, Y)) + Math.imul(P, z) | 0, o = Math.imul(P, Y), n = n + Math.imul(D, G) | 0, i = (i = i + Math.imul(D, Z) | 0) + Math.imul(U, G) | 0, o = o + Math.imul(U, Z) | 0, n = n + Math.imul(B, K) | 0, i = (i = i + Math.imul(B, X) | 0) + Math.imul(j, K) | 0, o = o + Math.imul(j, X) | 0, n = n + Math.imul(T, J) | 0, i = (i = i + Math.imul(T, tt) | 0) + Math.imul(N, J) | 0, o = o + Math.imul(N, tt) | 0, n = n + Math.imul(A, rt) | 0, i = (i = i + Math.imul(A, nt) | 0) + Math.imul(O, rt) | 0, o = o + Math.imul(O, nt) | 0, n = n + Math.imul(S, ot) | 0, i = (i = i + Math.imul(S, st) | 0) + Math.imul(E, ot) | 0, o = o + Math.imul(E, st) | 0, n = n + Math.imul(w, ht) | 0, i = (i = i + Math.imul(w, at) | 0) + Math.imul(M, ht) | 0, o = o + Math.imul(M, at) | 0, n = n + Math.imul(b, lt) | 0, i = (i = i + Math.imul(b, ft) | 0) + Math.imul(y, lt) | 0, o = o + Math.imul(y, ft) | 0;
                var At = (a + (n = n + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(m, mt) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, n = Math.imul(k, G), i = (i = Math.imul(k, Z)) + Math.imul(P, G) | 0, o = Math.imul(P, Z), n = n + Math.imul(D, K) | 0, i = (i = i + Math.imul(D, X) | 0) + Math.imul(U, K) | 0, o = o + Math.imul(U, X) | 0, n = n + Math.imul(B, J) | 0, i = (i = i + Math.imul(B, tt) | 0) + Math.imul(j, J) | 0, o = o + Math.imul(j, tt) | 0, n = n + Math.imul(T, rt) | 0, i = (i = i + Math.imul(T, nt) | 0) + Math.imul(N, rt) | 0, o = o + Math.imul(N, nt) | 0, n = n + Math.imul(A, ot) | 0, i = (i = i + Math.imul(A, st) | 0) + Math.imul(O, ot) | 0, o = o + Math.imul(O, st) | 0, n = n + Math.imul(S, ht) | 0, i = (i = i + Math.imul(S, at) | 0) + Math.imul(E, ht) | 0, o = o + Math.imul(E, at) | 0, n = n + Math.imul(w, lt) | 0, i = (i = i + Math.imul(w, ft) | 0) + Math.imul(M, lt) | 0, o = o + Math.imul(M, ft) | 0;
                var Ot = (a + (n = n + Math.imul(b, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(b, mt) | 0) + Math.imul(y, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(y, mt) | 0) + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, n = Math.imul(k, K), i = (i = Math.imul(k, X)) + Math.imul(P, K) | 0, o = Math.imul(P, X), n = n + Math.imul(D, J) | 0, i = (i = i + Math.imul(D, tt) | 0) + Math.imul(U, J) | 0, o = o + Math.imul(U, tt) | 0, n = n + Math.imul(B, rt) | 0, i = (i = i + Math.imul(B, nt) | 0) + Math.imul(j, rt) | 0, o = o + Math.imul(j, nt) | 0, n = n + Math.imul(T, ot) | 0, i = (i = i + Math.imul(T, st) | 0) + Math.imul(N, ot) | 0, o = o + Math.imul(N, st) | 0, n = n + Math.imul(A, ht) | 0, i = (i = i + Math.imul(A, at) | 0) + Math.imul(O, ht) | 0, o = o + Math.imul(O, at) | 0, n = n + Math.imul(S, lt) | 0, i = (i = i + Math.imul(S, ft) | 0) + Math.imul(E, lt) | 0, o = o + Math.imul(E, ft) | 0;
                var It = (a + (n = n + Math.imul(w, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w, mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(M, mt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, n = Math.imul(k, J), i = (i = Math.imul(k, tt)) + Math.imul(P, J) | 0, o = Math.imul(P, tt), n = n + Math.imul(D, rt) | 0, i = (i = i + Math.imul(D, nt) | 0) + Math.imul(U, rt) | 0, o = o + Math.imul(U, nt) | 0, n = n + Math.imul(B, ot) | 0, i = (i = i + Math.imul(B, st) | 0) + Math.imul(j, ot) | 0, o = o + Math.imul(j, st) | 0, n = n + Math.imul(T, ht) | 0, i = (i = i + Math.imul(T, at) | 0) + Math.imul(N, ht) | 0, o = o + Math.imul(N, at) | 0, n = n + Math.imul(A, lt) | 0, i = (i = i + Math.imul(A, ft) | 0) + Math.imul(O, lt) | 0, o = o + Math.imul(O, ft) | 0;
                var Tt = (a + (n = n + Math.imul(S, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(S, mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(E, mt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, n = Math.imul(k, rt), i = (i = Math.imul(k, nt)) + Math.imul(P, rt) | 0, o = Math.imul(P, nt), n = n + Math.imul(D, ot) | 0, i = (i = i + Math.imul(D, st) | 0) + Math.imul(U, ot) | 0, o = o + Math.imul(U, st) | 0, n = n + Math.imul(B, ht) | 0, i = (i = i + Math.imul(B, at) | 0) + Math.imul(j, ht) | 0, o = o + Math.imul(j, at) | 0, n = n + Math.imul(T, lt) | 0, i = (i = i + Math.imul(T, ft) | 0) + Math.imul(N, lt) | 0, o = o + Math.imul(N, ft) | 0;
                var Nt = (a + (n = n + Math.imul(A, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(A, mt) | 0) + Math.imul(O, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(O, mt) | 0) + (i >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, n = Math.imul(k, ot), i = (i = Math.imul(k, st)) + Math.imul(P, ot) | 0, o = Math.imul(P, st), n = n + Math.imul(D, ht) | 0, i = (i = i + Math.imul(D, at) | 0) + Math.imul(U, ht) | 0, o = o + Math.imul(U, at) | 0, n = n + Math.imul(B, lt) | 0, i = (i = i + Math.imul(B, ft) | 0) + Math.imul(j, lt) | 0, o = o + Math.imul(j, ft) | 0;
                var Rt = (a + (n = n + Math.imul(T, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(T, mt) | 0) + Math.imul(N, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(N, mt) | 0) + (i >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, n = Math.imul(k, ht), i = (i = Math.imul(k, at)) + Math.imul(P, ht) | 0, o = Math.imul(P, at), n = n + Math.imul(D, lt) | 0, i = (i = i + Math.imul(D, ft) | 0) + Math.imul(U, lt) | 0, o = o + Math.imul(U, ft) | 0;
                var Bt = (a + (n = n + Math.imul(B, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(B, mt) | 0) + Math.imul(j, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(j, mt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, n = Math.imul(k, lt), i = (i = Math.imul(k, ft)) + Math.imul(P, lt) | 0, o = Math.imul(P, ft);
                var jt = (a + (n = n + Math.imul(D, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(D, mt) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(U, mt) | 0) + (i >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863;
                var Ct = (a + (n = Math.imul(k, pt)) | 0) + ((8191 & (i = (i = Math.imul(k, mt)) + Math.imul(P, pt) | 0)) << 13) | 0;
                return a = ((o = Math.imul(P, mt)) + (i >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, h[0] = vt, h[1] = bt, h[2] = yt, h[3] = gt, h[4] = wt, h[5] = Mt, h[6] = _t, h[7] = St, h[8] = Et, h[9] = xt, h[10] = At, h[11] = Ot, h[12] = It, h[13] = Tt, h[14] = Nt, h[15] = Rt, h[16] = Bt, h[17] = jt, h[18] = Ct, 0 !== a && (h[19] = a, r.length++), r
            };

            function p(t, e, r) {
                return (new m).mulp(t, e, r)
            }

            function m(t, e) {
                this.x = t, this.y = e
            }
            Math.imul || (d = f), o.prototype.mulTo = function(t, e) {
                var r = this.length + t.length;
                return 10 === this.length && 10 === t.length ? d(this, t, e) : r < 63 ? f(this, t, e) : r < 1024 ? function(t, e, r) {
                    r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                    for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
                        var s = i;
                        i = 0;
                        for (var u = 67108863 & n, h = Math.min(o, e.length - 1), a = Math.max(0, o - t.length + 1); a <= h; a++) {
                            var c = o - a,
                                l = (0 | t.words[c]) * (0 | e.words[a]),
                                f = 67108863 & l;
                            u = 67108863 & (f = f + u | 0), i += (s = (s = s + (l / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, s &= 67108863
                        }
                        r.words[o] = u, n = s, s = i
                    }
                    return 0 !== n ? r.words[o] = n : r.length--, r.strip()
                }(this, t, e) : p(this, t, e)
            }, m.prototype.makeRBT = function(t) {
                for (var e = new Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++) e[n] = this.revBin(n, r, t);
                return e
            }, m.prototype.revBin = function(t, e, r) {
                if (0 === t || t === r - 1) return t;
                for (var n = 0, i = 0; i < e; i++) n |= (1 & t) << e - i - 1, t >>= 1;
                return n
            }, m.prototype.permute = function(t, e, r, n, i, o) {
                for (var s = 0; s < o; s++) n[s] = e[t[s]], i[s] = r[t[s]]
            }, m.prototype.transform = function(t, e, r, n, i, o) {
                this.permute(o, t, e, r, n, i);
                for (var s = 1; s < i; s <<= 1)
                    for (var u = s << 1, h = Math.cos(2 * Math.PI / u), a = Math.sin(2 * Math.PI / u), c = 0; c < i; c += u)
                        for (var l = h, f = a, d = 0; d < s; d++) {
                            var p = r[c + d],
                                m = n[c + d],
                                v = r[c + d + s],
                                b = n[c + d + s],
                                y = l * v - f * b;
                            b = l * b + f * v, v = y, r[c + d] = p + v, n[c + d] = m + b, r[c + d + s] = p - v, n[c + d + s] = m - b, d !== u && (y = h * l - a * f, f = h * f + a * l, l = y)
                        }
            }, m.prototype.guessLen13b = function(t, e) {
                var r = 1 | Math.max(e, t),
                    n = 1 & r,
                    i = 0;
                for (r = r / 2 | 0; r; r >>>= 1) i++;
                return 1 << i + 1 + n
            }, m.prototype.conjugate = function(t, e, r) {
                if (!(r <= 1))
                    for (var n = 0; n < r / 2; n++) {
                        var i = t[n];
                        t[n] = t[r - n - 1], t[r - n - 1] = i, i = e[n], e[n] = -e[r - n - 1], e[r - n - 1] = -i
                    }
            }, m.prototype.normalize13b = function(t, e) {
                for (var r = 0, n = 0; n < e / 2; n++) {
                    var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                    t[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0
                }
                return t
            }, m.prototype.convert13b = function(t, e, r, i) {
                for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                for (s = 2 * e; s < i; ++s) r[s] = 0;
                n(0 === o), n(0 == (-8192 & o))
            }, m.prototype.stub = function(t) {
                for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
                return e
            }, m.prototype.mulp = function(t, e, r) {
                var n = 2 * this.guessLen13b(t.length, e.length),
                    i = this.makeRBT(n),
                    o = this.stub(n),
                    s = new Array(n),
                    u = new Array(n),
                    h = new Array(n),
                    a = new Array(n),
                    c = new Array(n),
                    l = new Array(n),
                    f = r.words;
                f.length = n, this.convert13b(t.words, t.length, s, n), this.convert13b(e.words, e.length, a, n), this.transform(s, o, u, h, n, i), this.transform(a, o, c, l, n, i);
                for (var d = 0; d < n; d++) {
                    var p = u[d] * c[d] - h[d] * l[d];
                    h[d] = u[d] * l[d] + h[d] * c[d], u[d] = p
                }
                return this.conjugate(u, h, n), this.transform(u, h, f, o, n, i), this.conjugate(f, o, n), this.normalize13b(f, n), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r.strip()
            }, o.prototype.mul = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), this.mulTo(t, e)
            }, o.prototype.mulf = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), p(this, t, e)
            }, o.prototype.imul = function(t) {
                return this.clone().mulTo(t, this)
            }, o.prototype.imuln = function(t) {
                n("number" == typeof t), n(t < 67108864);
                for (var e = 0, r = 0; r < this.length; r++) {
                    var i = (0 | this.words[r]) * t,
                        o = (67108863 & i) + (67108863 & e);
                    e >>= 26, e += i / 67108864 | 0, e += o >>> 26, this.words[r] = 67108863 & o
                }
                return 0 !== e && (this.words[r] = e, this.length++), this
            }, o.prototype.muln = function(t) {
                return this.clone().imuln(t)
            }, o.prototype.sqr = function() {
                return this.mul(this)
            }, o.prototype.isqr = function() {
                return this.imul(this.clone())
            }, o.prototype.pow = function(t) {
                var e = function(t) {
                    for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                        var n = r / 26 | 0,
                            i = r % 26;
                        e[r] = (t.words[n] & 1 << i) >>> i
                    }
                    return e
                }(t);
                if (0 === e.length) return new o(1);
                for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
                if (++n < e.length)
                    for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
                return r
            }, o.prototype.iushln = function(t) {
                n("number" == typeof t && t >= 0);
                var e, r = t % 26,
                    i = (t - r) / 26,
                    o = 67108863 >>> 26 - r << 26 - r;
                if (0 !== r) {
                    var s = 0;
                    for (e = 0; e < this.length; e++) {
                        var u = this.words[e] & o,
                            h = (0 | this.words[e]) - u << r;
                        this.words[e] = h | s, s = u >>> 26 - r
                    }
                    s && (this.words[e] = s, this.length++)
                }
                if (0 !== i) {
                    for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                    for (e = 0; e < i; e++) this.words[e] = 0;
                    this.length += i
                }
                return this.strip()
            }, o.prototype.ishln = function(t) {
                return n(0 === this.negative), this.iushln(t)
            }, o.prototype.iushrn = function(t, e, r) {
                var i;
                n("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
                var o = t % 26,
                    s = Math.min((t - o) / 26, this.length),
                    u = 67108863 ^ 67108863 >>> o << o,
                    h = r;
                if (i -= s, i = Math.max(0, i), h) {
                    for (var a = 0; a < s; a++) h.words[a] = this.words[a];
                    h.length = s
                }
                if (0 === s);
                else if (this.length > s)
                    for (this.length -= s, a = 0; a < this.length; a++) this.words[a] = this.words[a + s];
                else this.words[0] = 0, this.length = 1;
                var c = 0;
                for (a = this.length - 1; a >= 0 && (0 !== c || a >= i); a--) {
                    var l = 0 | this.words[a];
                    this.words[a] = c << 26 - o | l >>> o, c = l & u
                }
                return h && 0 !== c && (h.words[h.length++] = c), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
            }, o.prototype.ishrn = function(t, e, r) {
                return n(0 === this.negative), this.iushrn(t, e, r)
            }, o.prototype.shln = function(t) {
                return this.clone().ishln(t)
            }, o.prototype.ushln = function(t) {
                return this.clone().iushln(t)
            }, o.prototype.shrn = function(t) {
                return this.clone().ishrn(t)
            }, o.prototype.ushrn = function(t) {
                return this.clone().iushrn(t)
            }, o.prototype.testn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                    r = (t - e) / 26,
                    i = 1 << e;
                return !(this.length <= r) && !!(this.words[r] & i)
            }, o.prototype.imaskn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                    r = (t - e) / 26;
                if (n(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) return this;
                if (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e) {
                    var i = 67108863 ^ 67108863 >>> e << e;
                    this.words[this.length - 1] &= i
                }
                return this.strip()
            }, o.prototype.maskn = function(t) {
                return this.clone().imaskn(t)
            }, o.prototype.iaddn = function(t) {
                return n("number" == typeof t), n(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
            }, o.prototype._iaddn = function(t) {
                this.words[0] += t;
                for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                return this.length = Math.max(this.length, e + 1), this
            }, o.prototype.isubn = function(t) {
                if (n("number" == typeof t), n(t < 67108864), t < 0) return this.iaddn(-t);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                else
                    for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                return this.strip()
            }, o.prototype.addn = function(t) {
                return this.clone().iaddn(t)
            }, o.prototype.subn = function(t) {
                return this.clone().isubn(t)
            }, o.prototype.iabs = function() {
                return this.negative = 0, this
            }, o.prototype.abs = function() {
                return this.clone().iabs()
            }, o.prototype._ishlnsubmul = function(t, e, r) {
                var i, o, s = t.length + r;
                this._expand(s);
                var u = 0;
                for (i = 0; i < t.length; i++) {
                    o = (0 | this.words[i + r]) + u;
                    var h = (0 | t.words[i]) * e;
                    u = ((o -= 67108863 & h) >> 26) - (h / 67108864 | 0), this.words[i + r] = 67108863 & o
                }
                for (; i < this.length - r; i++) u = (o = (0 | this.words[i + r]) + u) >> 26, this.words[i + r] = 67108863 & o;
                if (0 === u) return this.strip();
                for (n(-1 === u), u = 0, i = 0; i < this.length; i++) u = (o = -(0 | this.words[i]) + u) >> 26, this.words[i] = 67108863 & o;
                return this.negative = 1, this.strip()
            }, o.prototype._wordDiv = function(t, e) {
                var r = (this.length, t.length),
                    n = this.clone(),
                    i = t,
                    s = 0 | i.words[i.length - 1];
                0 !== (r = 26 - this._countBits(s)) && (i = i.ushln(r), n.iushln(r), s = 0 | i.words[i.length - 1]);
                var u, h = n.length - i.length;
                if ("mod" !== e) {
                    (u = new o(null)).length = h + 1, u.words = new Array(u.length);
                    for (var a = 0; a < u.length; a++) u.words[a] = 0
                }
                var c = n.clone()._ishlnsubmul(i, 1, h);
                0 === c.negative && (n = c, u && (u.words[h] = 1));
                for (var l = h - 1; l >= 0; l--) {
                    var f = 67108864 * (0 | n.words[i.length + l]) + (0 | n.words[i.length + l - 1]);
                    for (f = Math.min(f / s | 0, 67108863), n._ishlnsubmul(i, f, l); 0 !== n.negative;) f--, n.negative = 0, n._ishlnsubmul(i, 1, l), n.isZero() || (n.negative ^= 1);
                    u && (u.words[l] = f)
                }
                return u && u.strip(), n.strip(), "div" !== e && 0 !== r && n.iushrn(r), {
                    div: u || null,
                    mod: n
                }
            }, o.prototype.divmod = function(t, e, r) {
                return n(!t.isZero()), this.isZero() ? {
                    div: new o(0),
                    mod: new o(0)
                } : 0 !== this.negative && 0 === t.negative ? (u = this.neg().divmod(t, e), "mod" !== e && (i = u.div.neg()), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                    div: i,
                    mod: s
                }) : 0 === this.negative && 0 !== t.negative ? (u = this.divmod(t.neg(), e), "mod" !== e && (i = u.div.neg()), {
                    div: i,
                    mod: u.mod
                }) : 0 != (this.negative & t.negative) ? (u = this.neg().divmod(t.neg(), e), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                    div: u.div,
                    mod: s
                }) : t.length > this.length || this.cmp(t) < 0 ? {
                    div: new o(0),
                    mod: this
                } : 1 === t.length ? "div" === e ? {
                    div: this.divn(t.words[0]),
                    mod: null
                } : "mod" === e ? {
                    div: null,
                    mod: new o(this.modn(t.words[0]))
                } : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modn(t.words[0]))
                } : this._wordDiv(t, e);
                var i, s, u
            }, o.prototype.div = function(t) {
                return this.divmod(t, "div", !1).div
            }, o.prototype.mod = function(t) {
                return this.divmod(t, "mod", !1).mod
            }, o.prototype.umod = function(t) {
                return this.divmod(t, "mod", !0).mod
            }, o.prototype.divRound = function(t) {
                var e = this.divmod(t);
                if (e.mod.isZero()) return e.div;
                var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                    n = t.ushrn(1),
                    i = t.andln(1),
                    o = r.cmp(n);
                return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
            }, o.prototype.modn = function(t) {
                n(t <= 67108863);
                for (var e = (1 << 26) % t, r = 0, i = this.length - 1; i >= 0; i--) r = (e * r + (0 | this.words[i])) % t;
                return r
            }, o.prototype.idivn = function(t) {
                n(t <= 67108863);
                for (var e = 0, r = this.length - 1; r >= 0; r--) {
                    var i = (0 | this.words[r]) + 67108864 * e;
                    this.words[r] = i / t | 0, e = i % t
                }
                return this.strip()
            }, o.prototype.divn = function(t) {
                return this.clone().idivn(t)
            }, o.prototype.egcd = function(t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                    r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++a;
                for (var c = r.clone(), l = e.clone(); !e.isZero();) {
                    for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);
                    if (f > 0)
                        for (e.iushrn(f); f-- > 0;)(i.isOdd() || s.isOdd()) && (i.iadd(c), s.isub(l)), i.iushrn(1), s.iushrn(1);
                    for (var p = 0, m = 1; 0 == (r.words[0] & m) && p < 26; ++p, m <<= 1);
                    if (p > 0)
                        for (r.iushrn(p); p-- > 0;)(u.isOdd() || h.isOdd()) && (u.iadd(c), h.isub(l)), u.iushrn(1), h.iushrn(1);
                    e.cmp(r) >= 0 ? (e.isub(r), i.isub(u), s.isub(h)) : (r.isub(e), u.isub(i), h.isub(s))
                }
                return {
                    a: u,
                    b: h,
                    gcd: r.iushln(a)
                }
            }, o.prototype._invmp = function(t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                    r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i, s = new o(1), u = new o(0), h = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0;) {
                    for (var a = 0, c = 1; 0 == (e.words[0] & c) && a < 26; ++a, c <<= 1);
                    if (a > 0)
                        for (e.iushrn(a); a-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                    for (var l = 0, f = 1; 0 == (r.words[0] & f) && l < 26; ++l, f <<= 1);
                    if (l > 0)
                        for (r.iushrn(l); l-- > 0;) u.isOdd() && u.iadd(h), u.iushrn(1);
                    e.cmp(r) >= 0 ? (e.isub(r), s.isub(u)) : (r.isub(e), u.isub(s))
                }
                return (i = 0 === e.cmpn(1) ? s : u).cmpn(0) < 0 && i.iadd(t), i
            }, o.prototype.gcd = function(t) {
                if (this.isZero()) return t.abs();
                if (t.isZero()) return this.abs();
                var e = this.clone(),
                    r = t.clone();
                e.negative = 0, r.negative = 0;
                for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
                for (;;) {
                    for (; e.isEven();) e.iushrn(1);
                    for (; r.isEven();) r.iushrn(1);
                    var i = e.cmp(r);
                    if (i < 0) {
                        var o = e;
                        e = r, r = o
                    } else if (0 === i || 0 === r.cmpn(1)) break;
                    e.isub(r)
                }
                return r.iushln(n)
            }, o.prototype.invm = function(t) {
                return this.egcd(t).a.umod(t)
            }, o.prototype.isEven = function() {
                return 0 == (1 & this.words[0])
            }, o.prototype.isOdd = function() {
                return 1 == (1 & this.words[0])
            }, o.prototype.andln = function(t) {
                return this.words[0] & t
            }, o.prototype.bincn = function(t) {
                n("number" == typeof t);
                var e = t % 26,
                    r = (t - e) / 26,
                    i = 1 << e;
                if (this.length <= r) return this._expand(r + 1), this.words[r] |= i, this;
                for (var o = i, s = r; 0 !== o && s < this.length; s++) {
                    var u = 0 | this.words[s];
                    o = (u += o) >>> 26, u &= 67108863, this.words[s] = u
                }
                return 0 !== o && (this.words[s] = o, this.length++), this
            }, o.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0]
            }, o.prototype.cmpn = function(t) {
                var e, r = t < 0;
                if (0 !== this.negative && !r) return -1;
                if (0 === this.negative && r) return 1;
                if (this.strip(), this.length > 1) e = 1;
                else {
                    r && (t = -t), n(t <= 67108863, "Number is too big");
                    var i = 0 | this.words[0];
                    e = i === t ? 0 : i < t ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.cmp = function(t) {
                if (0 !== this.negative && 0 === t.negative) return -1;
                if (0 === this.negative && 0 !== t.negative) return 1;
                var e = this.ucmp(t);
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.ucmp = function(t) {
                if (this.length > t.length) return 1;
                if (this.length < t.length) return -1;
                for (var e = 0, r = this.length - 1; r >= 0; r--) {
                    var n = 0 | this.words[r],
                        i = 0 | t.words[r];
                    if (n !== i) {
                        n < i ? e = -1 : n > i && (e = 1);
                        break
                    }
                }
                return e
            }, o.prototype.gtn = function(t) {
                return 1 === this.cmpn(t)
            }, o.prototype.gt = function(t) {
                return 1 === this.cmp(t)
            }, o.prototype.gten = function(t) {
                return this.cmpn(t) >= 0
            }, o.prototype.gte = function(t) {
                return this.cmp(t) >= 0
            }, o.prototype.ltn = function(t) {
                return -1 === this.cmpn(t)
            }, o.prototype.lt = function(t) {
                return -1 === this.cmp(t)
            }, o.prototype.lten = function(t) {
                return this.cmpn(t) <= 0
            }, o.prototype.lte = function(t) {
                return this.cmp(t) <= 0
            }, o.prototype.eqn = function(t) {
                return 0 === this.cmpn(t)
            }, o.prototype.eq = function(t) {
                return 0 === this.cmp(t)
            }, o.red = function(t) {
                return new _(t)
            }, o.prototype.toRed = function(t) {
                return n(!this.red, "Already a number in reduction context"), n(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
            }, o.prototype.fromRed = function() {
                return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, o.prototype._forceRed = function(t) {
                return this.red = t, this
            }, o.prototype.forceRed = function(t) {
                return n(!this.red, "Already a number in reduction context"), this._forceRed(t)
            }, o.prototype.redAdd = function(t) {
                return n(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
            }, o.prototype.redIAdd = function(t) {
                return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
            }, o.prototype.redSub = function(t) {
                return n(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
            }, o.prototype.redISub = function(t) {
                return n(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
            }, o.prototype.redShl = function(t) {
                return n(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
            }, o.prototype.redMul = function(t) {
                return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
            }, o.prototype.redIMul = function(t) {
                return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
            }, o.prototype.redSqr = function() {
                return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, o.prototype.redISqr = function() {
                return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, o.prototype.redSqrt = function() {
                return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, o.prototype.redInvm = function() {
                return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, o.prototype.redNeg = function() {
                return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, o.prototype.redPow = function(t) {
                return n(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
            };
            var v = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };

            function b(t, e) {
                this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function y() {
                b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function g() {
                b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function w() {
                b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function M() {
                b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function _(t) {
                if ("string" == typeof t) {
                    var e = o._prime(t);
                    this.m = e.p, this.prime = e
                } else n(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
            }

            function S(t) {
                _.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }
            b.prototype._tmp = function() {
                var t = new o(null);
                return t.words = new Array(Math.ceil(this.n / 13)), t
            }, b.prototype.ireduce = function(t) {
                var e, r = t;
                do {
                    this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                } while (e > this.n);
                var n = e < this.n ? -1 : r.ucmp(this.p);
                return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : r.strip(), r
            }, b.prototype.split = function(t, e) {
                t.iushrn(this.n, 0, e)
            }, b.prototype.imulK = function(t) {
                return t.imul(this.k)
            }, i(y, b), y.prototype.split = function(t, e) {
                for (var r = Math.min(t.length, 9), n = 0; n < r; n++) e.words[n] = t.words[n];
                if (e.length = r, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                var i = t.words[9];
                for (e.words[e.length++] = 4194303 & i, n = 10; n < t.length; n++) {
                    var o = 0 | t.words[n];
                    t.words[n - 10] = (4194303 & o) << 4 | i >>> 22, i = o
                }
                i >>>= 22, t.words[n - 10] = i, 0 === i && t.length > 10 ? t.length -= 10 : t.length -= 9
            }, y.prototype.imulK = function(t) {
                t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = 0 | t.words[r];
                    e += 977 * n, t.words[r] = 67108863 & e, e = 64 * n + (e / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
            }, i(g, b), i(w, b), i(M, b), M.prototype.imulK = function(t) {
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = 19 * (0 | t.words[r]) + e,
                        i = 67108863 & n;
                    n >>>= 26, t.words[r] = i, e = n
                }
                return 0 !== e && (t.words[t.length++] = e), t
            }, o._prime = function(t) {
                if (v[t]) return v[t];
                var e;
                if ("k256" === t) e = new y;
                else if ("p224" === t) e = new g;
                else if ("p192" === t) e = new w;
                else {
                    if ("p25519" !== t) throw new Error("Unknown prime " + t);
                    e = new M
                }
                return v[t] = e, e
            }, _.prototype._verify1 = function(t) {
                n(0 === t.negative, "red works only with positives"), n(t.red, "red works only with red numbers")
            }, _.prototype._verify2 = function(t, e) {
                n(0 == (t.negative | e.negative), "red works only with positives"), n(t.red && t.red === e.red, "red works only with red numbers")
            }, _.prototype.imod = function(t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
            }, _.prototype.neg = function(t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }, _.prototype.add = function(t, e) {
                this._verify2(t, e);
                var r = t.add(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }, _.prototype.iadd = function(t, e) {
                this._verify2(t, e);
                var r = t.iadd(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }, _.prototype.sub = function(t, e) {
                this._verify2(t, e);
                var r = t.sub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }, _.prototype.isub = function(t, e) {
                this._verify2(t, e);
                var r = t.isub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r
            }, _.prototype.shl = function(t, e) {
                return this._verify1(t), this.imod(t.ushln(e))
            }, _.prototype.imul = function(t, e) {
                return this._verify2(t, e), this.imod(t.imul(e))
            }, _.prototype.mul = function(t, e) {
                return this._verify2(t, e), this.imod(t.mul(e))
            }, _.prototype.isqr = function(t) {
                return this.imul(t, t.clone())
            }, _.prototype.sqr = function(t) {
                return this.mul(t, t)
            }, _.prototype.sqrt = function(t) {
                if (t.isZero()) return t.clone();
                var e = this.m.andln(3);
                if (n(e % 2 == 1), 3 === e) {
                    var r = this.m.add(new o(1)).iushrn(2);
                    return this.pow(t, r)
                }
                for (var i = this.m.subn(1), s = 0; !i.isZero() && 0 === i.andln(1);) s++, i.iushrn(1);
                n(!i.isZero());
                var u = new o(1).toRed(this),
                    h = u.redNeg(),
                    a = this.m.subn(1).iushrn(1),
                    c = this.m.bitLength();
                for (c = new o(2 * c * c).toRed(this); 0 !== this.pow(c, a).cmp(h);) c.redIAdd(h);
                for (var l = this.pow(c, i), f = this.pow(t, i.addn(1).iushrn(1)), d = this.pow(t, i), p = s; 0 !== d.cmp(u);) {
                    for (var m = d, v = 0; 0 !== m.cmp(u); v++) m = m.redSqr();
                    n(v < p);
                    var b = this.pow(l, new o(1).iushln(p - v - 1));
                    f = f.redMul(b), l = b.redSqr(), d = d.redMul(l), p = v
                }
                return f
            }, _.prototype.invm = function(t) {
                var e = t._invmp(this.m);
                return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
            }, _.prototype.pow = function(t, e) {
                if (e.isZero()) return new o(1);
                if (0 === e.cmpn(1)) return t.clone();
                var r = new Array(16);
                r[0] = new o(1).toRed(this), r[1] = t;
                for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
                var i = r[0],
                    s = 0,
                    u = 0,
                    h = e.bitLength() % 26;
                for (0 === h && (h = 26), n = e.length - 1; n >= 0; n--) {
                    for (var a = e.words[n], c = h - 1; c >= 0; c--) {
                        var l = a >> c & 1;
                        i !== r[0] && (i = this.sqr(i)), 0 !== l || 0 !== s ? (s <<= 1, s |= l, (4 === ++u || 0 === n && 0 === c) && (i = this.mul(i, r[s]), u = 0, s = 0)) : u = 0
                    }
                    h = 26
                }
                return i
            }, _.prototype.convertTo = function(t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e
            }, _.prototype.convertFrom = function(t) {
                var e = t.clone();
                return e.red = null, e
            }, o.mont = function(t) {
                return new S(t)
            }, i(S, _), S.prototype.convertTo = function(t) {
                return this.imod(t.ushln(this.shift))
            }, S.prototype.convertFrom = function(t) {
                var e = this.imod(t.mul(this.rinv));
                return e.red = null, e
            }, S.prototype.imul = function(t, e) {
                if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                var r = t.imul(e),
                    n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = r.isub(n).iushrn(this.shift),
                    o = i;
                return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
            }, S.prototype.mul = function(t, e) {
                if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                var r = t.mul(e),
                    n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = r.isub(n).iushrn(this.shift),
                    s = i;
                return i.cmp(this.m) >= 0 ? s = i.isub(this.m) : i.cmpn(0) < 0 && (s = i.iadd(this.m)), s._forceRed(this)
            }, S.prototype.invm = function(t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(t, this)
    }).call(this, r(8)(t))
}, function(t, e, r) {
    var n = r(15),
        i = r(16);
    t.exports = function(t) {
        if ("string" == typeof t || "number" == typeof t) {
            var e = new n(1),
                r = String(t).toLowerCase().trim(),
                o = "0x" === r.substr(0, 2) || "-0x" === r.substr(0, 3),
                s = i(r);
            if ("-" === s.substr(0, 1) && (s = i(s.slice(1)), e = new n(-1, 10)), !(s = "" === s ? "0" : s).match(/^-?[0-9]+$/) && s.match(/^[0-9A-Fa-f]+$/) || s.match(/^[a-fA-F]+$/) || !0 === o && s.match(/^[0-9A-Fa-f]+$/)) return new n(s, 16).mul(e);
            if ((s.match(/^-?[0-9]+$/) || "" === s) && !1 === o) return new n(s, 10).mul(e)
        } else if ("object" == typeof t && t.toString && !t.pop && !t.push && t.toString(10).match(/^-?[0-9]+$/) && (t.mul || t.dividedToIntegerBy)) return new n(t.toString(10), 10);
        throw new Error("[number-to-bn] while converting number " + JSON.stringify(t) + " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.")
    }
}, function(t, e, r) {
    (function(t) {
        ! function(t, e) {
            "use strict";

            function n(t, e) {
                if (!t) throw new Error(e || "Assertion failed")
            }

            function i(t, e) {
                t.super_ = e;
                var r = function() {};
                r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
            }

            function o(t, e, r) {
                if (o.isBN(t)) return t;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
            }
            var s;
            "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
            try {
                s = r(2).Buffer
            } catch (t) {}

            function u(t, e, r) {
                for (var n = 0, i = Math.min(t.length, r), o = e; o < i; o++) {
                    var s = t.charCodeAt(o) - 48;
                    n <<= 4, n |= s >= 49 && s <= 54 ? s - 49 + 10 : s >= 17 && s <= 22 ? s - 17 + 10 : 15 & s
                }
                return n
            }

            function h(t, e, r, n) {
                for (var i = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
                    var u = t.charCodeAt(s) - 48;
                    i *= n, i += u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u
                }
                return i
            }
            o.isBN = function(t) {
                return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
            }, o.max = function(t, e) {
                return t.cmp(e) > 0 ? t : e
            }, o.min = function(t, e) {
                return t.cmp(e) < 0 ? t : e
            }, o.prototype._init = function(t, e, r) {
                if ("number" == typeof t) return this._initNumber(t, e, r);
                if ("object" == typeof t) return this._initArray(t, e, r);
                "hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
                var i = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && i++, 16 === e ? this._parseHex(t, i) : this._parseBase(t, e, i), "-" === t[0] && (this.negative = 1), this.strip(), "le" === r && this._initArray(this.toArray(), e, r)
            }, o.prototype._initNumber = function(t, e, r) {
                t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (n(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
            }, o.prototype._initArray = function(t, e, r) {
                if (n("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var o, s, u = 0;
                if ("be" === r)
                    for (i = t.length - 1, o = 0; i >= 0; i -= 3) s = t[i] | t[i - 1] << 8 | t[i - 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);
                else if ("le" === r)
                    for (i = 0, o = 0; i < t.length; i += 3) s = t[i] | t[i + 1] << 8 | t[i + 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);
                return this.strip()
            }, o.prototype._parseHex = function(t, e) {
                this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                for (var r = 0; r < this.length; r++) this.words[r] = 0;
                var n, i, o = 0;
                for (r = t.length - 6, n = 0; r >= e; r -= 6) i = u(t, r, r + 6), this.words[n] |= i << o & 67108863, this.words[n + 1] |= i >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, n++);
                r + 6 !== e && (i = u(t, e, r + 6), this.words[n] |= i << o & 67108863, this.words[n + 1] |= i >>> 26 - o & 4194303), this.strip()
            }, o.prototype._parseBase = function(t, e, r) {
                this.words = [0], this.length = 1;
                for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
                n--, i = i / e | 0;
                for (var o = t.length - r, s = o % n, u = Math.min(o, o - s) + r, a = 0, c = r; c < u; c += n) a = h(t, c, c + n, e), this.imuln(i), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
                if (0 !== s) {
                    var l = 1;
                    for (a = h(t, c, t.length, e), c = 0; c < s; c++) l *= e;
                    this.imuln(l), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a)
                }
            }, o.prototype.copy = function(t) {
                t.words = new Array(this.length);
                for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                t.length = this.length, t.negative = this.negative, t.red = this.red
            }, o.prototype.clone = function() {
                var t = new o(null);
                return this.copy(t), t
            }, o.prototype._expand = function(t) {
                for (; this.length < t;) this.words[this.length++] = 0;
                return this
            }, o.prototype.strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, o.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, o.prototype.inspect = function() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var a = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                c = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                l = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function f(t, e, r) {
                r.negative = e.negative ^ t.negative;
                var n = t.length + e.length | 0;
                r.length = n, n = n - 1 | 0;
                var i = 0 | t.words[0],
                    o = 0 | e.words[0],
                    s = i * o,
                    u = 67108863 & s,
                    h = s / 67108864 | 0;
                r.words[0] = u;
                for (var a = 1; a < n; a++) {
                    for (var c = h >>> 26, l = 67108863 & h, f = Math.min(a, e.length - 1), d = Math.max(0, a - t.length + 1); d <= f; d++) {
                        var p = a - d | 0;
                        c += (s = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + l) / 67108864 | 0, l = 67108863 & s
                    }
                    r.words[a] = 0 | l, h = 0 | c
                }
                return 0 !== h ? r.words[a] = 0 | h : r.length--, r.strip()
            }
            o.prototype.toString = function(t, e) {
                var r;
                if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                    r = "";
                    for (var i = 0, o = 0, s = 0; s < this.length; s++) {
                        var u = this.words[s],
                            h = (16777215 & (u << i | o)).toString(16);
                        r = 0 !== (o = u >>> 24 - i & 16777215) || s !== this.length - 1 ? a[6 - h.length] + h + r : h + r, (i += 2) >= 26 && (i -= 26, s--)
                    }
                    for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                if (t === (0 | t) && t >= 2 && t <= 36) {
                    var f = c[t],
                        d = l[t];
                    r = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var m = p.modn(d).toString(t);
                        r = (p = p.idivn(d)).isZero() ? m + r : a[f - m.length] + m + r
                    }
                    for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                n(!1, "Base should be between 2 and 36")
            }, o.prototype.toNumber = function() {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
            }, o.prototype.toJSON = function() {
                return this.toString(16)
            }, o.prototype.toBuffer = function(t, e) {
                return n(void 0 !== s), this.toArrayLike(s, t, e)
            }, o.prototype.toArray = function(t, e) {
                return this.toArrayLike(Array, t, e)
            }, o.prototype.toArrayLike = function(t, e, r) {
                var i = this.byteLength(),
                    o = r || Math.max(1, i);
                n(i <= o, "byte array longer than desired length"), n(o > 0, "Requested array length <= 0"), this.strip();
                var s, u, h = "le" === e,
                    a = new t(o),
                    c = this.clone();
                if (h) {
                    for (u = 0; !c.isZero(); u++) s = c.andln(255), c.iushrn(8), a[u] = s;
                    for (; u < o; u++) a[u] = 0
                } else {
                    for (u = 0; u < o - i; u++) a[u] = 0;
                    for (u = 0; !c.isZero(); u++) s = c.andln(255), c.iushrn(8), a[o - u - 1] = s
                }
                return a
            }, Math.clz32 ? o.prototype._countBits = function(t) {
                return 32 - Math.clz32(t)
            } : o.prototype._countBits = function(t) {
                var e = t,
                    r = 0;
                return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
            }, o.prototype._zeroBits = function(t) {
                if (0 === t) return 26;
                var e = t,
                    r = 0;
                return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7), 0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 & e) && r++, r
            }, o.prototype.bitLength = function() {
                var t = this.words[this.length - 1],
                    e = this._countBits(t);
                return 26 * (this.length - 1) + e
            }, o.prototype.zeroBits = function() {
                if (this.isZero()) return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                    var r = this._zeroBits(this.words[e]);
                    if (t += r, 26 !== r) break
                }
                return t
            }, o.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }, o.prototype.toTwos = function(t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }, o.prototype.fromTwos = function(t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }, o.prototype.isNeg = function() {
                return 0 !== this.negative
            }, o.prototype.neg = function() {
                return this.clone().ineg()
            }, o.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1), this
            }, o.prototype.iuor = function(t) {
                for (; this.length < t.length;) this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                return this.strip()
            }, o.prototype.ior = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuor(t)
            }, o.prototype.or = function(t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }, o.prototype.uor = function(t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }, o.prototype.iuand = function(t) {
                var e;
                e = this.length > t.length ? t : this;
                for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                return this.length = e.length, this.strip()
            }, o.prototype.iand = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuand(t)
            }, o.prototype.and = function(t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }, o.prototype.uand = function(t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }, o.prototype.iuxor = function(t) {
                var e, r;
                this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
                if (this !== e)
                    for (; n < e.length; n++) this.words[n] = e.words[n];
                return this.length = e.length, this.strip()
            }, o.prototype.ixor = function(t) {
                return n(0 == (this.negative | t.negative)), this.iuxor(t)
            }, o.prototype.xor = function(t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }, o.prototype.uxor = function(t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }, o.prototype.inotn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = 0 | Math.ceil(t / 26),
                    r = t % 26;
                this._expand(e), r > 0 && e--;
                for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
                return r > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - r), this.strip()
            }, o.prototype.notn = function(t) {
                return this.clone().inotn(t)
            }, o.prototype.setn = function(t, e) {
                n("number" == typeof t && t >= 0);
                var r = t / 26 | 0,
                    i = t % 26;
                return this._expand(r + 1), this.words[r] = e ? this.words[r] | 1 << i : this.words[r] & ~(1 << i), this.strip()
            }, o.prototype.iadd = function(t) {
                var e, r, n;
                if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                this.length > t.length ? (r = this, n = t) : (r = t, n = this);
                for (var i = 0, o = 0; o < n.length; o++) e = (0 | r.words[o]) + (0 | n.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                for (; 0 !== i && o < r.length; o++) e = (0 | r.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                if (this.length = r.length, 0 !== i) this.words[this.length] = i, this.length++;
                else if (r !== this)
                    for (; o < r.length; o++) this.words[o] = r.words[o];
                return this
            }, o.prototype.add = function(t) {
                var e;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }, o.prototype.isub = function(t) {
                if (0 !== t.negative) {
                    t.negative = 0;
                    var e = this.iadd(t);
                    return t.negative = 1, e._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                var r, n, i = this.cmp(t);
                if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                i > 0 ? (r = this, n = t) : (r = t, n = this);
                for (var o = 0, s = 0; s < n.length; s++) o = (e = (0 | r.words[s]) - (0 | n.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                for (; 0 !== o && s < r.length; s++) o = (e = (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                if (0 === o && s < r.length && r !== this)
                    for (; s < r.length; s++) this.words[s] = r.words[s];
                return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this.strip()
            }, o.prototype.sub = function(t) {
                return this.clone().isub(t)
            };
            var d = function(t, e, r) {
                var n, i, o, s = t.words,
                    u = e.words,
                    h = r.words,
                    a = 0,
                    c = 0 | s[0],
                    l = 8191 & c,
                    f = c >>> 13,
                    d = 0 | s[1],
                    p = 8191 & d,
                    m = d >>> 13,
                    v = 0 | s[2],
                    b = 8191 & v,
                    y = v >>> 13,
                    g = 0 | s[3],
                    w = 8191 & g,
                    M = g >>> 13,
                    _ = 0 | s[4],
                    S = 8191 & _,
                    E = _ >>> 13,
                    x = 0 | s[5],
                    A = 8191 & x,
                    O = x >>> 13,
                    I = 0 | s[6],
                    T = 8191 & I,
                    N = I >>> 13,
                    R = 0 | s[7],
                    B = 8191 & R,
                    j = R >>> 13,
                    C = 0 | s[8],
                    D = 8191 & C,
                    U = C >>> 13,
                    L = 0 | s[9],
                    k = 8191 & L,
                    P = L >>> 13,
                    F = 0 | u[0],
                    $ = 8191 & F,
                    V = F >>> 13,
                    q = 0 | u[1],
                    z = 8191 & q,
                    Y = q >>> 13,
                    W = 0 | u[2],
                    G = 8191 & W,
                    Z = W >>> 13,
                    H = 0 | u[3],
                    K = 8191 & H,
                    X = H >>> 13,
                    Q = 0 | u[4],
                    J = 8191 & Q,
                    tt = Q >>> 13,
                    et = 0 | u[5],
                    rt = 8191 & et,
                    nt = et >>> 13,
                    it = 0 | u[6],
                    ot = 8191 & it,
                    st = it >>> 13,
                    ut = 0 | u[7],
                    ht = 8191 & ut,
                    at = ut >>> 13,
                    ct = 0 | u[8],
                    lt = 8191 & ct,
                    ft = ct >>> 13,
                    dt = 0 | u[9],
                    pt = 8191 & dt,
                    mt = dt >>> 13;
                r.negative = t.negative ^ e.negative, r.length = 19;
                var vt = (a + (n = Math.imul(l, $)) | 0) + ((8191 & (i = (i = Math.imul(l, V)) + Math.imul(f, $) | 0)) << 13) | 0;
                a = ((o = Math.imul(f, V)) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, n = Math.imul(p, $), i = (i = Math.imul(p, V)) + Math.imul(m, $) | 0, o = Math.imul(m, V);
                var bt = (a + (n = n + Math.imul(l, z) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, Y) | 0) + Math.imul(f, z) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, Y) | 0) + (i >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, n = Math.imul(b, $), i = (i = Math.imul(b, V)) + Math.imul(y, $) | 0, o = Math.imul(y, V), n = n + Math.imul(p, z) | 0, i = (i = i + Math.imul(p, Y) | 0) + Math.imul(m, z) | 0, o = o + Math.imul(m, Y) | 0;
                var yt = (a + (n = n + Math.imul(l, G) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, Z) | 0) + Math.imul(f, G) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, Z) | 0) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, n = Math.imul(w, $), i = (i = Math.imul(w, V)) + Math.imul(M, $) | 0, o = Math.imul(M, V), n = n + Math.imul(b, z) | 0, i = (i = i + Math.imul(b, Y) | 0) + Math.imul(y, z) | 0, o = o + Math.imul(y, Y) | 0, n = n + Math.imul(p, G) | 0, i = (i = i + Math.imul(p, Z) | 0) + Math.imul(m, G) | 0, o = o + Math.imul(m, Z) | 0;
                var gt = (a + (n = n + Math.imul(l, K) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, X) | 0) + Math.imul(f, K) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, X) | 0) + (i >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, n = Math.imul(S, $), i = (i = Math.imul(S, V)) + Math.imul(E, $) | 0, o = Math.imul(E, V), n = n + Math.imul(w, z) | 0, i = (i = i + Math.imul(w, Y) | 0) + Math.imul(M, z) | 0, o = o + Math.imul(M, Y) | 0, n = n + Math.imul(b, G) | 0, i = (i = i + Math.imul(b, Z) | 0) + Math.imul(y, G) | 0, o = o + Math.imul(y, Z) | 0, n = n + Math.imul(p, K) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(m, K) | 0, o = o + Math.imul(m, X) | 0;
                var wt = (a + (n = n + Math.imul(l, J) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, tt) | 0) + Math.imul(f, J) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, tt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, n = Math.imul(A, $), i = (i = Math.imul(A, V)) + Math.imul(O, $) | 0, o = Math.imul(O, V), n = n + Math.imul(S, z) | 0, i = (i = i + Math.imul(S, Y) | 0) + Math.imul(E, z) | 0, o = o + Math.imul(E, Y) | 0, n = n + Math.imul(w, G) | 0, i = (i = i + Math.imul(w, Z) | 0) + Math.imul(M, G) | 0, o = o + Math.imul(M, Z) | 0, n = n + Math.imul(b, K) | 0, i = (i = i + Math.imul(b, X) | 0) + Math.imul(y, K) | 0, o = o + Math.imul(y, X) | 0, n = n + Math.imul(p, J) | 0, i = (i = i + Math.imul(p, tt) | 0) + Math.imul(m, J) | 0, o = o + Math.imul(m, tt) | 0;
                var Mt = (a + (n = n + Math.imul(l, rt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, nt) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, nt) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, n = Math.imul(T, $), i = (i = Math.imul(T, V)) + Math.imul(N, $) | 0, o = Math.imul(N, V), n = n + Math.imul(A, z) | 0, i = (i = i + Math.imul(A, Y) | 0) + Math.imul(O, z) | 0, o = o + Math.imul(O, Y) | 0, n = n + Math.imul(S, G) | 0, i = (i = i + Math.imul(S, Z) | 0) + Math.imul(E, G) | 0, o = o + Math.imul(E, Z) | 0, n = n + Math.imul(w, K) | 0, i = (i = i + Math.imul(w, X) | 0) + Math.imul(M, K) | 0, o = o + Math.imul(M, X) | 0, n = n + Math.imul(b, J) | 0, i = (i = i + Math.imul(b, tt) | 0) + Math.imul(y, J) | 0, o = o + Math.imul(y, tt) | 0, n = n + Math.imul(p, rt) | 0, i = (i = i + Math.imul(p, nt) | 0) + Math.imul(m, rt) | 0, o = o + Math.imul(m, nt) | 0;
                var _t = (a + (n = n + Math.imul(l, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, st) | 0) + Math.imul(f, ot) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, st) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, n = Math.imul(B, $), i = (i = Math.imul(B, V)) + Math.imul(j, $) | 0, o = Math.imul(j, V), n = n + Math.imul(T, z) | 0, i = (i = i + Math.imul(T, Y) | 0) + Math.imul(N, z) | 0, o = o + Math.imul(N, Y) | 0, n = n + Math.imul(A, G) | 0, i = (i = i + Math.imul(A, Z) | 0) + Math.imul(O, G) | 0, o = o + Math.imul(O, Z) | 0, n = n + Math.imul(S, K) | 0, i = (i = i + Math.imul(S, X) | 0) + Math.imul(E, K) | 0, o = o + Math.imul(E, X) | 0, n = n + Math.imul(w, J) | 0, i = (i = i + Math.imul(w, tt) | 0) + Math.imul(M, J) | 0, o = o + Math.imul(M, tt) | 0, n = n + Math.imul(b, rt) | 0, i = (i = i + Math.imul(b, nt) | 0) + Math.imul(y, rt) | 0, o = o + Math.imul(y, nt) | 0, n = n + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, st) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, st) | 0;
                var St = (a + (n = n + Math.imul(l, ht) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, at) | 0) + Math.imul(f, ht) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, at) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, n = Math.imul(D, $), i = (i = Math.imul(D, V)) + Math.imul(U, $) | 0, o = Math.imul(U, V), n = n + Math.imul(B, z) | 0, i = (i = i + Math.imul(B, Y) | 0) + Math.imul(j, z) | 0, o = o + Math.imul(j, Y) | 0, n = n + Math.imul(T, G) | 0, i = (i = i + Math.imul(T, Z) | 0) + Math.imul(N, G) | 0, o = o + Math.imul(N, Z) | 0, n = n + Math.imul(A, K) | 0, i = (i = i + Math.imul(A, X) | 0) + Math.imul(O, K) | 0, o = o + Math.imul(O, X) | 0, n = n + Math.imul(S, J) | 0, i = (i = i + Math.imul(S, tt) | 0) + Math.imul(E, J) | 0, o = o + Math.imul(E, tt) | 0, n = n + Math.imul(w, rt) | 0, i = (i = i + Math.imul(w, nt) | 0) + Math.imul(M, rt) | 0, o = o + Math.imul(M, nt) | 0, n = n + Math.imul(b, ot) | 0, i = (i = i + Math.imul(b, st) | 0) + Math.imul(y, ot) | 0, o = o + Math.imul(y, st) | 0, n = n + Math.imul(p, ht) | 0, i = (i = i + Math.imul(p, at) | 0) + Math.imul(m, ht) | 0, o = o + Math.imul(m, at) | 0;
                var Et = (a + (n = n + Math.imul(l, lt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ft) | 0) + Math.imul(f, lt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, ft) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, n = Math.imul(k, $), i = (i = Math.imul(k, V)) + Math.imul(P, $) | 0, o = Math.imul(P, V), n = n + Math.imul(D, z) | 0, i = (i = i + Math.imul(D, Y) | 0) + Math.imul(U, z) | 0, o = o + Math.imul(U, Y) | 0, n = n + Math.imul(B, G) | 0, i = (i = i + Math.imul(B, Z) | 0) + Math.imul(j, G) | 0, o = o + Math.imul(j, Z) | 0, n = n + Math.imul(T, K) | 0, i = (i = i + Math.imul(T, X) | 0) + Math.imul(N, K) | 0, o = o + Math.imul(N, X) | 0, n = n + Math.imul(A, J) | 0, i = (i = i + Math.imul(A, tt) | 0) + Math.imul(O, J) | 0, o = o + Math.imul(O, tt) | 0, n = n + Math.imul(S, rt) | 0, i = (i = i + Math.imul(S, nt) | 0) + Math.imul(E, rt) | 0, o = o + Math.imul(E, nt) | 0, n = n + Math.imul(w, ot) | 0, i = (i = i + Math.imul(w, st) | 0) + Math.imul(M, ot) | 0, o = o + Math.imul(M, st) | 0, n = n + Math.imul(b, ht) | 0, i = (i = i + Math.imul(b, at) | 0) + Math.imul(y, ht) | 0, o = o + Math.imul(y, at) | 0, n = n + Math.imul(p, lt) | 0, i = (i = i + Math.imul(p, ft) | 0) + Math.imul(m, lt) | 0, o = o + Math.imul(m, ft) | 0;
                var xt = (a + (n = n + Math.imul(l, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(f, mt) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, n = Math.imul(k, z), i = (i = Math.imul(k, Y)) + Math.imul(P, z) | 0, o = Math.imul(P, Y), n = n + Math.imul(D, G) | 0, i = (i = i + Math.imul(D, Z) | 0) + Math.imul(U, G) | 0, o = o + Math.imul(U, Z) | 0, n = n + Math.imul(B, K) | 0, i = (i = i + Math.imul(B, X) | 0) + Math.imul(j, K) | 0, o = o + Math.imul(j, X) | 0, n = n + Math.imul(T, J) | 0, i = (i = i + Math.imul(T, tt) | 0) + Math.imul(N, J) | 0, o = o + Math.imul(N, tt) | 0, n = n + Math.imul(A, rt) | 0, i = (i = i + Math.imul(A, nt) | 0) + Math.imul(O, rt) | 0, o = o + Math.imul(O, nt) | 0, n = n + Math.imul(S, ot) | 0, i = (i = i + Math.imul(S, st) | 0) + Math.imul(E, ot) | 0, o = o + Math.imul(E, st) | 0, n = n + Math.imul(w, ht) | 0, i = (i = i + Math.imul(w, at) | 0) + Math.imul(M, ht) | 0, o = o + Math.imul(M, at) | 0, n = n + Math.imul(b, lt) | 0, i = (i = i + Math.imul(b, ft) | 0) + Math.imul(y, lt) | 0, o = o + Math.imul(y, ft) | 0;
                var At = (a + (n = n + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(m, mt) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, n = Math.imul(k, G), i = (i = Math.imul(k, Z)) + Math.imul(P, G) | 0, o = Math.imul(P, Z), n = n + Math.imul(D, K) | 0, i = (i = i + Math.imul(D, X) | 0) + Math.imul(U, K) | 0, o = o + Math.imul(U, X) | 0, n = n + Math.imul(B, J) | 0, i = (i = i + Math.imul(B, tt) | 0) + Math.imul(j, J) | 0, o = o + Math.imul(j, tt) | 0, n = n + Math.imul(T, rt) | 0, i = (i = i + Math.imul(T, nt) | 0) + Math.imul(N, rt) | 0, o = o + Math.imul(N, nt) | 0, n = n + Math.imul(A, ot) | 0, i = (i = i + Math.imul(A, st) | 0) + Math.imul(O, ot) | 0, o = o + Math.imul(O, st) | 0, n = n + Math.imul(S, ht) | 0, i = (i = i + Math.imul(S, at) | 0) + Math.imul(E, ht) | 0, o = o + Math.imul(E, at) | 0, n = n + Math.imul(w, lt) | 0, i = (i = i + Math.imul(w, ft) | 0) + Math.imul(M, lt) | 0, o = o + Math.imul(M, ft) | 0;
                var Ot = (a + (n = n + Math.imul(b, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(b, mt) | 0) + Math.imul(y, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(y, mt) | 0) + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, n = Math.imul(k, K), i = (i = Math.imul(k, X)) + Math.imul(P, K) | 0, o = Math.imul(P, X), n = n + Math.imul(D, J) | 0, i = (i = i + Math.imul(D, tt) | 0) + Math.imul(U, J) | 0, o = o + Math.imul(U, tt) | 0, n = n + Math.imul(B, rt) | 0, i = (i = i + Math.imul(B, nt) | 0) + Math.imul(j, rt) | 0, o = o + Math.imul(j, nt) | 0, n = n + Math.imul(T, ot) | 0, i = (i = i + Math.imul(T, st) | 0) + Math.imul(N, ot) | 0, o = o + Math.imul(N, st) | 0, n = n + Math.imul(A, ht) | 0, i = (i = i + Math.imul(A, at) | 0) + Math.imul(O, ht) | 0, o = o + Math.imul(O, at) | 0, n = n + Math.imul(S, lt) | 0, i = (i = i + Math.imul(S, ft) | 0) + Math.imul(E, lt) | 0, o = o + Math.imul(E, ft) | 0;
                var It = (a + (n = n + Math.imul(w, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w, mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(M, mt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, n = Math.imul(k, J), i = (i = Math.imul(k, tt)) + Math.imul(P, J) | 0, o = Math.imul(P, tt), n = n + Math.imul(D, rt) | 0, i = (i = i + Math.imul(D, nt) | 0) + Math.imul(U, rt) | 0, o = o + Math.imul(U, nt) | 0, n = n + Math.imul(B, ot) | 0, i = (i = i + Math.imul(B, st) | 0) + Math.imul(j, ot) | 0, o = o + Math.imul(j, st) | 0, n = n + Math.imul(T, ht) | 0, i = (i = i + Math.imul(T, at) | 0) + Math.imul(N, ht) | 0, o = o + Math.imul(N, at) | 0, n = n + Math.imul(A, lt) | 0, i = (i = i + Math.imul(A, ft) | 0) + Math.imul(O, lt) | 0, o = o + Math.imul(O, ft) | 0;
                var Tt = (a + (n = n + Math.imul(S, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(S, mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(E, mt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, n = Math.imul(k, rt), i = (i = Math.imul(k, nt)) + Math.imul(P, rt) | 0, o = Math.imul(P, nt), n = n + Math.imul(D, ot) | 0, i = (i = i + Math.imul(D, st) | 0) + Math.imul(U, ot) | 0, o = o + Math.imul(U, st) | 0, n = n + Math.imul(B, ht) | 0, i = (i = i + Math.imul(B, at) | 0) + Math.imul(j, ht) | 0, o = o + Math.imul(j, at) | 0, n = n + Math.imul(T, lt) | 0, i = (i = i + Math.imul(T, ft) | 0) + Math.imul(N, lt) | 0, o = o + Math.imul(N, ft) | 0;
                var Nt = (a + (n = n + Math.imul(A, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(A, mt) | 0) + Math.imul(O, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(O, mt) | 0) + (i >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, n = Math.imul(k, ot), i = (i = Math.imul(k, st)) + Math.imul(P, ot) | 0, o = Math.imul(P, st), n = n + Math.imul(D, ht) | 0, i = (i = i + Math.imul(D, at) | 0) + Math.imul(U, ht) | 0, o = o + Math.imul(U, at) | 0, n = n + Math.imul(B, lt) | 0, i = (i = i + Math.imul(B, ft) | 0) + Math.imul(j, lt) | 0, o = o + Math.imul(j, ft) | 0;
                var Rt = (a + (n = n + Math.imul(T, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(T, mt) | 0) + Math.imul(N, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(N, mt) | 0) + (i >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, n = Math.imul(k, ht), i = (i = Math.imul(k, at)) + Math.imul(P, ht) | 0, o = Math.imul(P, at), n = n + Math.imul(D, lt) | 0, i = (i = i + Math.imul(D, ft) | 0) + Math.imul(U, lt) | 0, o = o + Math.imul(U, ft) | 0;
                var Bt = (a + (n = n + Math.imul(B, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(B, mt) | 0) + Math.imul(j, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(j, mt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, n = Math.imul(k, lt), i = (i = Math.imul(k, ft)) + Math.imul(P, lt) | 0, o = Math.imul(P, ft);
                var jt = (a + (n = n + Math.imul(D, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(D, mt) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                a = ((o = o + Math.imul(U, mt) | 0) + (i >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863;
                var Ct = (a + (n = Math.imul(k, pt)) | 0) + ((8191 & (i = (i = Math.imul(k, mt)) + Math.imul(P, pt) | 0)) << 13) | 0;
                return a = ((o = Math.imul(P, mt)) + (i >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, h[0] = vt, h[1] = bt, h[2] = yt, h[3] = gt, h[4] = wt, h[5] = Mt, h[6] = _t, h[7] = St, h[8] = Et, h[9] = xt, h[10] = At, h[11] = Ot, h[12] = It, h[13] = Tt, h[14] = Nt, h[15] = Rt, h[16] = Bt, h[17] = jt, h[18] = Ct, 0 !== a && (h[19] = a, r.length++), r
            };

            function p(t, e, r) {
                return (new m).mulp(t, e, r)
            }

            function m(t, e) {
                this.x = t, this.y = e
            }
            Math.imul || (d = f), o.prototype.mulTo = function(t, e) {
                var r = this.length + t.length;
                return 10 === this.length && 10 === t.length ? d(this, t, e) : r < 63 ? f(this, t, e) : r < 1024 ? function(t, e, r) {
                    r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                    for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
                        var s = i;
                        i = 0;
                        for (var u = 67108863 & n, h = Math.min(o, e.length - 1), a = Math.max(0, o - t.length + 1); a <= h; a++) {
                            var c = o - a,
                                l = (0 | t.words[c]) * (0 | e.words[a]),
                                f = 67108863 & l;
                            u = 67108863 & (f = f + u | 0), i += (s = (s = s + (l / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, s &= 67108863
                        }
                        r.words[o] = u, n = s, s = i
                    }
                    return 0 !== n ? r.words[o] = n : r.length--, r.strip()
                }(this, t, e) : p(this, t, e)
            }, m.prototype.makeRBT = function(t) {
                for (var e = new Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++) e[n] = this.revBin(n, r, t);
                return e
            }, m.prototype.revBin = function(t, e, r) {
                if (0 === t || t === r - 1) return t;
                for (var n = 0, i = 0; i < e; i++) n |= (1 & t) << e - i - 1, t >>= 1;
                return n
            }, m.prototype.permute = function(t, e, r, n, i, o) {
                for (var s = 0; s < o; s++) n[s] = e[t[s]], i[s] = r[t[s]]
            }, m.prototype.transform = function(t, e, r, n, i, o) {
                this.permute(o, t, e, r, n, i);
                for (var s = 1; s < i; s <<= 1)
                    for (var u = s << 1, h = Math.cos(2 * Math.PI / u), a = Math.sin(2 * Math.PI / u), c = 0; c < i; c += u)
                        for (var l = h, f = a, d = 0; d < s; d++) {
                            var p = r[c + d],
                                m = n[c + d],
                                v = r[c + d + s],
                                b = n[c + d + s],
                                y = l * v - f * b;
                            b = l * b + f * v, v = y, r[c + d] = p + v, n[c + d] = m + b, r[c + d + s] = p - v, n[c + d + s] = m - b, d !== u && (y = h * l - a * f, f = h * f + a * l, l = y)
                        }
            }, m.prototype.guessLen13b = function(t, e) {
                var r = 1 | Math.max(e, t),
                    n = 1 & r,
                    i = 0;
                for (r = r / 2 | 0; r; r >>>= 1) i++;
                return 1 << i + 1 + n
            }, m.prototype.conjugate = function(t, e, r) {
                if (!(r <= 1))
                    for (var n = 0; n < r / 2; n++) {
                        var i = t[n];
                        t[n] = t[r - n - 1], t[r - n - 1] = i, i = e[n], e[n] = -e[r - n - 1], e[r - n - 1] = -i
                    }
            }, m.prototype.normalize13b = function(t, e) {
                for (var r = 0, n = 0; n < e / 2; n++) {
                    var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                    t[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0
                }
                return t
            }, m.prototype.convert13b = function(t, e, r, i) {
                for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                for (s = 2 * e; s < i; ++s) r[s] = 0;
                n(0 === o), n(0 == (-8192 & o))
            }, m.prototype.stub = function(t) {
                for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
                return e
            }, m.prototype.mulp = function(t, e, r) {
                var n = 2 * this.guessLen13b(t.length, e.length),
                    i = this.makeRBT(n),
                    o = this.stub(n),
                    s = new Array(n),
                    u = new Array(n),
                    h = new Array(n),
                    a = new Array(n),
                    c = new Array(n),
                    l = new Array(n),
                    f = r.words;
                f.length = n, this.convert13b(t.words, t.length, s, n), this.convert13b(e.words, e.length, a, n), this.transform(s, o, u, h, n, i), this.transform(a, o, c, l, n, i);
                for (var d = 0; d < n; d++) {
                    var p = u[d] * c[d] - h[d] * l[d];
                    h[d] = u[d] * l[d] + h[d] * c[d], u[d] = p
                }
                return this.conjugate(u, h, n), this.transform(u, h, f, o, n, i), this.conjugate(f, o, n), this.normalize13b(f, n), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r.strip()
            }, o.prototype.mul = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), this.mulTo(t, e)
            }, o.prototype.mulf = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), p(this, t, e)
            }, o.prototype.imul = function(t) {
                return this.clone().mulTo(t, this)
            }, o.prototype.imuln = function(t) {
                n("number" == typeof t), n(t < 67108864);
                for (var e = 0, r = 0; r < this.length; r++) {
                    var i = (0 | this.words[r]) * t,
                        o = (67108863 & i) + (67108863 & e);
                    e >>= 26, e += i / 67108864 | 0, e += o >>> 26, this.words[r] = 67108863 & o
                }
                return 0 !== e && (this.words[r] = e, this.length++), this
            }, o.prototype.muln = function(t) {
                return this.clone().imuln(t)
            }, o.prototype.sqr = function() {
                return this.mul(this)
            }, o.prototype.isqr = function() {
                return this.imul(this.clone())
            }, o.prototype.pow = function(t) {
                var e = function(t) {
                    for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                        var n = r / 26 | 0,
                            i = r % 26;
                        e[r] = (t.words[n] & 1 << i) >>> i
                    }
                    return e
                }(t);
                if (0 === e.length) return new o(1);
                for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
                if (++n < e.length)
                    for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
                return r
            }, o.prototype.iushln = function(t) {
                n("number" == typeof t && t >= 0);
                var e, r = t % 26,
                    i = (t - r) / 26,
                    o = 67108863 >>> 26 - r << 26 - r;
                if (0 !== r) {
                    var s = 0;
                    for (e = 0; e < this.length; e++) {
                        var u = this.words[e] & o,
                            h = (0 | this.words[e]) - u << r;
                        this.words[e] = h | s, s = u >>> 26 - r
                    }
                    s && (this.words[e] = s, this.length++)
                }
                if (0 !== i) {
                    for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                    for (e = 0; e < i; e++) this.words[e] = 0;
                    this.length += i
                }
                return this.strip()
            }, o.prototype.ishln = function(t) {
                return n(0 === this.negative), this.iushln(t)
            }, o.prototype.iushrn = function(t, e, r) {
                var i;
                n("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
                var o = t % 26,
                    s = Math.min((t - o) / 26, this.length),
                    u = 67108863 ^ 67108863 >>> o << o,
                    h = r;
                if (i -= s, i = Math.max(0, i), h) {
                    for (var a = 0; a < s; a++) h.words[a] = this.words[a];
                    h.length = s
                }
                if (0 === s);
                else if (this.length > s)
                    for (this.length -= s, a = 0; a < this.length; a++) this.words[a] = this.words[a + s];
                else this.words[0] = 0, this.length = 1;
                var c = 0;
                for (a = this.length - 1; a >= 0 && (0 !== c || a >= i); a--) {
                    var l = 0 | this.words[a];
                    this.words[a] = c << 26 - o | l >>> o, c = l & u
                }
                return h && 0 !== c && (h.words[h.length++] = c), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
            }, o.prototype.ishrn = function(t, e, r) {
                return n(0 === this.negative), this.iushrn(t, e, r)
            }, o.prototype.shln = function(t) {
                return this.clone().ishln(t)
            }, o.prototype.ushln = function(t) {
                return this.clone().iushln(t)
            }, o.prototype.shrn = function(t) {
                return this.clone().ishrn(t)
            }, o.prototype.ushrn = function(t) {
                return this.clone().iushrn(t)
            }, o.prototype.testn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                    r = (t - e) / 26,
                    i = 1 << e;
                return !(this.length <= r) && !!(this.words[r] & i)
            }, o.prototype.imaskn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                    r = (t - e) / 26;
                if (n(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) return this;
                if (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e) {
                    var i = 67108863 ^ 67108863 >>> e << e;
                    this.words[this.length - 1] &= i
                }
                return this.strip()
            }, o.prototype.maskn = function(t) {
                return this.clone().imaskn(t)
            }, o.prototype.iaddn = function(t) {
                return n("number" == typeof t), n(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
            }, o.prototype._iaddn = function(t) {
                this.words[0] += t;
                for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                return this.length = Math.max(this.length, e + 1), this
            }, o.prototype.isubn = function(t) {
                if (n("number" == typeof t), n(t < 67108864), t < 0) return this.iaddn(-t);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                else
                    for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                return this.strip()
            }, o.prototype.addn = function(t) {
                return this.clone().iaddn(t)
            }, o.prototype.subn = function(t) {
                return this.clone().isubn(t)
            }, o.prototype.iabs = function() {
                return this.negative = 0, this
            }, o.prototype.abs = function() {
                return this.clone().iabs()
            }, o.prototype._ishlnsubmul = function(t, e, r) {
                var i, o, s = t.length + r;
                this._expand(s);
                var u = 0;
                for (i = 0; i < t.length; i++) {
                    o = (0 | this.words[i + r]) + u;
                    var h = (0 | t.words[i]) * e;
                    u = ((o -= 67108863 & h) >> 26) - (h / 67108864 | 0), this.words[i + r] = 67108863 & o
                }
                for (; i < this.length - r; i++) u = (o = (0 | this.words[i + r]) + u) >> 26, this.words[i + r] = 67108863 & o;
                if (0 === u) return this.strip();
                for (n(-1 === u), u = 0, i = 0; i < this.length; i++) u = (o = -(0 | this.words[i]) + u) >> 26, this.words[i] = 67108863 & o;
                return this.negative = 1, this.strip()
            }, o.prototype._wordDiv = function(t, e) {
                var r = (this.length, t.length),
                    n = this.clone(),
                    i = t,
                    s = 0 | i.words[i.length - 1];
                0 !== (r = 26 - this._countBits(s)) && (i = i.ushln(r), n.iushln(r), s = 0 | i.words[i.length - 1]);
                var u, h = n.length - i.length;
                if ("mod" !== e) {
                    (u = new o(null)).length = h + 1, u.words = new Array(u.length);
                    for (var a = 0; a < u.length; a++) u.words[a] = 0
                }
                var c = n.clone()._ishlnsubmul(i, 1, h);
                0 === c.negative && (n = c, u && (u.words[h] = 1));
                for (var l = h - 1; l >= 0; l--) {
                    var f = 67108864 * (0 | n.words[i.length + l]) + (0 | n.words[i.length + l - 1]);
                    for (f = Math.min(f / s | 0, 67108863), n._ishlnsubmul(i, f, l); 0 !== n.negative;) f--, n.negative = 0, n._ishlnsubmul(i, 1, l), n.isZero() || (n.negative ^= 1);
                    u && (u.words[l] = f)
                }
                return u && u.strip(), n.strip(), "div" !== e && 0 !== r && n.iushrn(r), {
                    div: u || null,
                    mod: n
                }
            }, o.prototype.divmod = function(t, e, r) {
                return n(!t.isZero()), this.isZero() ? {
                    div: new o(0),
                    mod: new o(0)
                } : 0 !== this.negative && 0 === t.negative ? (u = this.neg().divmod(t, e), "mod" !== e && (i = u.div.neg()), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                    div: i,
                    mod: s
                }) : 0 === this.negative && 0 !== t.negative ? (u = this.divmod(t.neg(), e), "mod" !== e && (i = u.div.neg()), {
                    div: i,
                    mod: u.mod
                }) : 0 != (this.negative & t.negative) ? (u = this.neg().divmod(t.neg(), e), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                    div: u.div,
                    mod: s
                }) : t.length > this.length || this.cmp(t) < 0 ? {
                    div: new o(0),
                    mod: this
                } : 1 === t.length ? "div" === e ? {
                    div: this.divn(t.words[0]),
                    mod: null
                } : "mod" === e ? {
                    div: null,
                    mod: new o(this.modn(t.words[0]))
                } : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modn(t.words[0]))
                } : this._wordDiv(t, e);
                var i, s, u
            }, o.prototype.div = function(t) {
                return this.divmod(t, "div", !1).div
            }, o.prototype.mod = function(t) {
                return this.divmod(t, "mod", !1).mod
            }, o.prototype.umod = function(t) {
                return this.divmod(t, "mod", !0).mod
            }, o.prototype.divRound = function(t) {
                var e = this.divmod(t);
                if (e.mod.isZero()) return e.div;
                var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                    n = t.ushrn(1),
                    i = t.andln(1),
                    o = r.cmp(n);
                return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
            }, o.prototype.modn = function(t) {
                n(t <= 67108863);
                for (var e = (1 << 26) % t, r = 0, i = this.length - 1; i >= 0; i--) r = (e * r + (0 | this.words[i])) % t;
                return r
            }, o.prototype.idivn = function(t) {
                n(t <= 67108863);
                for (var e = 0, r = this.length - 1; r >= 0; r--) {
                    var i = (0 | this.words[r]) + 67108864 * e;
                    this.words[r] = i / t | 0, e = i % t
                }
                return this.strip()
            }, o.prototype.divn = function(t) {
                return this.clone().idivn(t)
            }, o.prototype.egcd = function(t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                    r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++a;
                for (var c = r.clone(), l = e.clone(); !e.isZero();) {
                    for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);
                    if (f > 0)
                        for (e.iushrn(f); f-- > 0;)(i.isOdd() || s.isOdd()) && (i.iadd(c), s.isub(l)), i.iushrn(1), s.iushrn(1);
                    for (var p = 0, m = 1; 0 == (r.words[0] & m) && p < 26; ++p, m <<= 1);
                    if (p > 0)
                        for (r.iushrn(p); p-- > 0;)(u.isOdd() || h.isOdd()) && (u.iadd(c), h.isub(l)), u.iushrn(1), h.iushrn(1);
                    e.cmp(r) >= 0 ? (e.isub(r), i.isub(u), s.isub(h)) : (r.isub(e), u.isub(i), h.isub(s))
                }
                return {
                    a: u,
                    b: h,
                    gcd: r.iushln(a)
                }
            }, o.prototype._invmp = function(t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                    r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i, s = new o(1), u = new o(0), h = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0;) {
                    for (var a = 0, c = 1; 0 == (e.words[0] & c) && a < 26; ++a, c <<= 1);
                    if (a > 0)
                        for (e.iushrn(a); a-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                    for (var l = 0, f = 1; 0 == (r.words[0] & f) && l < 26; ++l, f <<= 1);
                    if (l > 0)
                        for (r.iushrn(l); l-- > 0;) u.isOdd() && u.iadd(h), u.iushrn(1);
                    e.cmp(r) >= 0 ? (e.isub(r), s.isub(u)) : (r.isub(e), u.isub(s))
                }
                return (i = 0 === e.cmpn(1) ? s : u).cmpn(0) < 0 && i.iadd(t), i
            }, o.prototype.gcd = function(t) {
                if (this.isZero()) return t.abs();
                if (t.isZero()) return this.abs();
                var e = this.clone(),
                    r = t.clone();
                e.negative = 0, r.negative = 0;
                for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
                for (;;) {
                    for (; e.isEven();) e.iushrn(1);
                    for (; r.isEven();) r.iushrn(1);
                    var i = e.cmp(r);
                    if (i < 0) {
                        var o = e;
                        e = r, r = o
                    } else if (0 === i || 0 === r.cmpn(1)) break;
                    e.isub(r)
                }
                return r.iushln(n)
            }, o.prototype.invm = function(t) {
                return this.egcd(t).a.umod(t)
            }, o.prototype.isEven = function() {
                return 0 == (1 & this.words[0])
            }, o.prototype.isOdd = function() {
                return 1 == (1 & this.words[0])
            }, o.prototype.andln = function(t) {
                return this.words[0] & t
            }, o.prototype.bincn = function(t) {
                n("number" == typeof t);
                var e = t % 26,
                    r = (t - e) / 26,
                    i = 1 << e;
                if (this.length <= r) return this._expand(r + 1), this.words[r] |= i, this;
                for (var o = i, s = r; 0 !== o && s < this.length; s++) {
                    var u = 0 | this.words[s];
                    o = (u += o) >>> 26, u &= 67108863, this.words[s] = u
                }
                return 0 !== o && (this.words[s] = o, this.length++), this
            }, o.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0]
            }, o.prototype.cmpn = function(t) {
                var e, r = t < 0;
                if (0 !== this.negative && !r) return -1;
                if (0 === this.negative && r) return 1;
                if (this.strip(), this.length > 1) e = 1;
                else {
                    r && (t = -t), n(t <= 67108863, "Number is too big");
                    var i = 0 | this.words[0];
                    e = i === t ? 0 : i < t ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.cmp = function(t) {
                if (0 !== this.negative && 0 === t.negative) return -1;
                if (0 === this.negative && 0 !== t.negative) return 1;
                var e = this.ucmp(t);
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.ucmp = function(t) {
                if (this.length > t.length) return 1;
                if (this.length < t.length) return -1;
                for (var e = 0, r = this.length - 1; r >= 0; r--) {
                    var n = 0 | this.words[r],
                        i = 0 | t.words[r];
                    if (n !== i) {
                        n < i ? e = -1 : n > i && (e = 1);
                        break
                    }
                }
                return e
            }, o.prototype.gtn = function(t) {
                return 1 === this.cmpn(t)
            }, o.prototype.gt = function(t) {
                return 1 === this.cmp(t)
            }, o.prototype.gten = function(t) {
                return this.cmpn(t) >= 0
            }, o.prototype.gte = function(t) {
                return this.cmp(t) >= 0
            }, o.prototype.ltn = function(t) {
                return -1 === this.cmpn(t)
            }, o.prototype.lt = function(t) {
                return -1 === this.cmp(t)
            }, o.prototype.lten = function(t) {
                return this.cmpn(t) <= 0
            }, o.prototype.lte = function(t) {
                return this.cmp(t) <= 0
            }, o.prototype.eqn = function(t) {
                return 0 === this.cmpn(t)
            }, o.prototype.eq = function(t) {
                return 0 === this.cmp(t)
            }, o.red = function(t) {
                return new _(t)
            }, o.prototype.toRed = function(t) {
                return n(!this.red, "Already a number in reduction context"), n(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
            }, o.prototype.fromRed = function() {
                return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, o.prototype._forceRed = function(t) {
                return this.red = t, this
            }, o.prototype.forceRed = function(t) {
                return n(!this.red, "Already a number in reduction context"), this._forceRed(t)
            }, o.prototype.redAdd = function(t) {
                return n(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
            }, o.prototype.redIAdd = function(t) {
                return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
            }, o.prototype.redSub = function(t) {
                return n(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
            }, o.prototype.redISub = function(t) {
                return n(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
            }, o.prototype.redShl = function(t) {
                return n(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
            }, o.prototype.redMul = function(t) {
                return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
            }, o.prototype.redIMul = function(t) {
                return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
            }, o.prototype.redSqr = function() {
                return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, o.prototype.redISqr = function() {
                return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, o.prototype.redSqrt = function() {
                return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, o.prototype.redInvm = function() {
                return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, o.prototype.redNeg = function() {
                return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, o.prototype.redPow = function(t) {
                return n(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
            };
            var v = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };

            function b(t, e) {
                this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function y() {
                b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function g() {
                b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function w() {
                b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function M() {
                b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function _(t) {
                if ("string" == typeof t) {
                    var e = o._prime(t);
                    this.m = e.p, this.prime = e
                } else n(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
            }

            function S(t) {
                _.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }
            b.prototype._tmp = function() {
                var t = new o(null);
                return t.words = new Array(Math.ceil(this.n / 13)), t
            }, b.prototype.ireduce = function(t) {
                var e, r = t;
                do {
                    this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                } while (e > this.n);
                var n = e < this.n ? -1 : r.ucmp(this.p);
                return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : r.strip(), r
            }, b.prototype.split = function(t, e) {
                t.iushrn(this.n, 0, e)
            }, b.prototype.imulK = function(t) {
                return t.imul(this.k)
            }, i(y, b), y.prototype.split = function(t, e) {
                for (var r = Math.min(t.length, 9), n = 0; n < r; n++) e.words[n] = t.words[n];
                if (e.length = r, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                var i = t.words[9];
                for (e.words[e.length++] = 4194303 & i, n = 10; n < t.length; n++) {
                    var o = 0 | t.words[n];
                    t.words[n - 10] = (4194303 & o) << 4 | i >>> 22, i = o
                }
                i >>>= 22, t.words[n - 10] = i, 0 === i && t.length > 10 ? t.length -= 10 : t.length -= 9
            }, y.prototype.imulK = function(t) {
                t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = 0 | t.words[r];
                    e += 977 * n, t.words[r] = 67108863 & e, e = 64 * n + (e / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
            }, i(g, b), i(w, b), i(M, b), M.prototype.imulK = function(t) {
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = 19 * (0 | t.words[r]) + e,
                        i = 67108863 & n;
                    n >>>= 26, t.words[r] = i, e = n
                }
                return 0 !== e && (t.words[t.length++] = e), t
            }, o._prime = function(t) {
                if (v[t]) return v[t];
                var e;
                if ("k256" === t) e = new y;
                else if ("p224" === t) e = new g;
                else if ("p192" === t) e = new w;
                else {
                    if ("p25519" !== t) throw new Error("Unknown prime " + t);
                    e = new M
                }
                return v[t] = e, e
            }, _.prototype._verify1 = function(t) {
                n(0 === t.negative, "red works only with positives"), n(t.red, "red works only with red numbers")
            }, _.prototype._verify2 = function(t, e) {
                n(0 == (t.negative | e.negative), "red works only with positives"), n(t.red && t.red === e.red, "red works only with red numbers")
            }, _.prototype.imod = function(t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
            }, _.prototype.neg = function(t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }, _.prototype.add = function(t, e) {
                this._verify2(t, e);
                var r = t.add(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }, _.prototype.iadd = function(t, e) {
                this._verify2(t, e);
                var r = t.iadd(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }, _.prototype.sub = function(t, e) {
                this._verify2(t, e);
                var r = t.sub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }, _.prototype.isub = function(t, e) {
                this._verify2(t, e);
                var r = t.isub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r
            }, _.prototype.shl = function(t, e) {
                return this._verify1(t), this.imod(t.ushln(e))
            }, _.prototype.imul = function(t, e) {
                return this._verify2(t, e), this.imod(t.imul(e))
            }, _.prototype.mul = function(t, e) {
                return this._verify2(t, e), this.imod(t.mul(e))
            }, _.prototype.isqr = function(t) {
                return this.imul(t, t.clone())
            }, _.prototype.sqr = function(t) {
                return this.mul(t, t)
            }, _.prototype.sqrt = function(t) {
                if (t.isZero()) return t.clone();
                var e = this.m.andln(3);
                if (n(e % 2 == 1), 3 === e) {
                    var r = this.m.add(new o(1)).iushrn(2);
                    return this.pow(t, r)
                }
                for (var i = this.m.subn(1), s = 0; !i.isZero() && 0 === i.andln(1);) s++, i.iushrn(1);
                n(!i.isZero());
                var u = new o(1).toRed(this),
                    h = u.redNeg(),
                    a = this.m.subn(1).iushrn(1),
                    c = this.m.bitLength();
                for (c = new o(2 * c * c).toRed(this); 0 !== this.pow(c, a).cmp(h);) c.redIAdd(h);
                for (var l = this.pow(c, i), f = this.pow(t, i.addn(1).iushrn(1)), d = this.pow(t, i), p = s; 0 !== d.cmp(u);) {
                    for (var m = d, v = 0; 0 !== m.cmp(u); v++) m = m.redSqr();
                    n(v < p);
                    var b = this.pow(l, new o(1).iushln(p - v - 1));
                    f = f.redMul(b), l = b.redSqr(), d = d.redMul(l), p = v
                }
                return f
            }, _.prototype.invm = function(t) {
                var e = t._invmp(this.m);
                return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
            }, _.prototype.pow = function(t, e) {
                if (e.isZero()) return new o(1);
                if (0 === e.cmpn(1)) return t.clone();
                var r = new Array(16);
                r[0] = new o(1).toRed(this), r[1] = t;
                for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
                var i = r[0],
                    s = 0,
                    u = 0,
                    h = e.bitLength() % 26;
                for (0 === h && (h = 26), n = e.length - 1; n >= 0; n--) {
                    for (var a = e.words[n], c = h - 1; c >= 0; c--) {
                        var l = a >> c & 1;
                        i !== r[0] && (i = this.sqr(i)), 0 !== l || 0 !== s ? (s <<= 1, s |= l, (4 === ++u || 0 === n && 0 === c) && (i = this.mul(i, r[s]), u = 0, s = 0)) : u = 0
                    }
                    h = 26
                }
                return i
            }, _.prototype.convertTo = function(t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e
            }, _.prototype.convertFrom = function(t) {
                var e = t.clone();
                return e.red = null, e
            }, o.mont = function(t) {
                return new S(t)
            }, i(S, _), S.prototype.convertTo = function(t) {
                return this.imod(t.ushln(this.shift))
            }, S.prototype.convertFrom = function(t) {
                var e = this.imod(t.mul(this.rinv));
                return e.red = null, e
            }, S.prototype.imul = function(t, e) {
                if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                var r = t.imul(e),
                    n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = r.isub(n).iushrn(this.shift),
                    o = i;
                return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
            }, S.prototype.mul = function(t, e) {
                if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                var r = t.mul(e),
                    n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = r.isub(n).iushrn(this.shift),
                    s = i;
                return i.cmp(this.m) >= 0 ? s = i.isub(this.m) : i.cmpn(0) < 0 && (s = i.iadd(this.m)), s._forceRed(this)
            }, S.prototype.invm = function(t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(t, this)
    }).call(this, r(8)(t))
}, function(t, e, r) {
    var n = r(17);
    t.exports = function(t) {
        return "string" != typeof t ? t : n(t) ? t.slice(2) : t
    }
}, function(t, e) {
    t.exports = function(t) {
        if ("string" != typeof t) throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof t + ", while checking isHexPrefixed.");
        return "0x" === t.slice(0, 2)
    }
}, function(t, e) {}, function(t, e, r) {
    const {
        crc16: n,
        hexToBytes: i,
        bytesToHex: o,
        stringToBytes: s,
        base64toString: u,
        stringToBase64: h
    } = r(1);
    class a {
        static isValid(t) {
            try {
                return new a(t), !0
            } catch (t) {
                return !1
            }
        }
        constructor(t) {
            if (null == t) throw "Invalid address";
            if (t instanceof a) return this.wc = t.wc, this.hashPart = t.hashPart, this.isTestOnly = t.isTestOnly, this.isUserFriendly = t.isUserFriendly, this.isBounceable = t.isBounceable, void(this.isUrlSafe = t.isUrlSafe);
            if (t.search(/\-/) > 0 || t.search(/_/) > 0 ? (this.isUrlSafe = !0, t = t.replace(/\-/g, "+").replace(/_/g, "/")) : this.isUrlSafe = !1, t.indexOf(":") > -1) {
                const e = t.split(":");
                if (2 !== e.length) throw new Error("Invalid address " + t);
                const r = parseInt(e[0]);
                if (0 !== r && -1 !== r) throw new Error("Invalid address wc " + t);
                const n = e[1];
                if (64 !== n.length) throw new Error("Invalid address hex " + t);
                this.isUserFriendly = !1, this.wc = r, this.hashPart = i(n), this.isTestOnly = !1, this.isBounceable = !1
            } else {
                this.isUserFriendly = !0;
                const e = function(t) {
                    const e = s(u(t));
                    if (36 !== e.length) throw "Unknown address type: byte length is not equal to 36";
                    const r = e.slice(0, 34),
                        i = e.slice(34, 36),
                        o = n(r);
                    if (o[0] !== i[0] || o[1] !== i[1]) throw "Wrong crc16 hashsum";
                    let h = r[0],
                        a = !1,
                        c = !1;
                    if (128 & h && (a = !0, h ^= 128), 17 !== h && 81 !== h) throw "Unknown address tag";
                    c = 17 === h;
                    let l = null;
                    if (l = 255 === r[1] ? -1 : r[1], 0 !== l && -1 !== l) throw new Error("Invalid address wc " + l);
                    return {
                        isTestOnly: a,
                        isBounceable: c,
                        workchain: l,
                        hashPart: r.slice(2, 34)
                    }
                }(t);
                this.wc = e.workchain, this.hashPart = e.hashPart, this.isTestOnly = e.isTestOnly, this.isBounceable = e.isBounceable
            }
        }
        toString(t, e, r, i) {
            if (void 0 === t && (t = this.isUserFriendly), void 0 === e && (e = this.isUrlSafe), void 0 === r && (r = this.isBounceable), void 0 === i && (i = this.isTestOnly), t) {
                let t = r ? 17 : 81;
                i && (t |= 128);
                const o = new Int8Array(34);
                o[0] = t, o[1] = this.wc, o.set(this.hashPart, 2);
                const s = new Uint8Array(36);
                s.set(o), s.set(n(o), 34);
                let u = h(String.fromCharCode.apply(null, new Uint8Array(s)));
                return e && (u = u.replace(/\+/g, "-").replace(/\//g, "_")), u
            }
            return this.wc + ":" + o(this.hashPart)
        }
    }
    t.exports.default = a
}, function(t, e, r) {
    const {
        BitString: n
    } = r(21), {
        Cell: i
    } = r(22);
    t.exports = {
        BitString: n,
        Cell: i
    }
}, function(t, e, r) {
    const {
        BN: n,
        bytesToHex: i
    } = r(1);
    class o {
        constructor(t) {
            this.array = Uint8Array.from({
                length: Math.ceil(t / 8)
            }, () => 0), this.cursor = 0, this.length = t
        }
        getFreeBits() {
            return this.length - this.cursor
        }
        getUsedBits() {
            return this.cursor
        }
        getUsedBytes() {
            return Math.ceil(this.cursor / 8)
        }
        get(t) {
            return (this.array[t / 8 | 0] & 1 << 7 - t % 8) > 0
        }
        checkRange(t) {
            if (t > this.length) throw Error("BitString overflow")
        }
        on(t) {
            this.checkRange(t), this.array[t / 8 | 0] |= 1 << 7 - t % 8
        }
        off(t) {
            this.checkRange(t), this.array[t / 8 | 0] &= ~(1 << 7 - t % 8)
        }
        toggle(t) {
            this.checkRange(t), this.array[t / 8 | 0] ^= 1 << 7 - t % 8
        }
        forEach(t) {
            const e = this.cursor;
            for (let r = 0; r < e; r++) t(this.get(r))
        }
        writeBit(t) {
            t && t > 0 ? this.on(this.cursor) : this.off(this.cursor), this.cursor = this.cursor + 1
        }
        writeBitArray(t) {
            for (let e = 0; e < t.length; e++) this.writeBit(t[e])
        }
        writeUint(t, e) {
            if (t = new n(t), 0 == e || t.toString(2).length > e) {
                if (0 == t) return;
                throw Error("bitLength is too small for number, got number=" + t + ",bitLength=" + e)
            }
            const r = t.toString(2, e);
            for (let t = 0; t < e; t++) this.writeBit(1 == r[t])
        }
        writeInt(t, e) {
            if (t = new n(t), 1 == e) {
                if (-1 == t) return void this.writeBit(!0);
                if (0 == t) return void this.writeBit(!1);
                throw Error("Bitlength is too small for number")
            }
            if (t.isNeg()) {
                this.writeBit(!0);
                const r = new n(2).pow(new n(e - 1));
                this.writeUint(r.add(t), e - 1)
            } else this.writeBit(!1), this.writeUint(t, e - 1)
        }
        writeUint8(t) {
            this.writeUint(t, 8)
        }
        writeBytes(t) {
            for (let e = 0; e < t.length; e++) this.writeUint8(t[e])
        }
        writeString(t) {
            for (let e = 0; e < t.length; e++) this.writeUint8(t.charCodeAt(e))
        }
        writeGrams(t) {
            if (0 == t) this.writeUint(0, 4);
            else {
                t = new n(t);
                const e = Math.ceil(t.toString(16).length / 2);
                this.writeUint(e, 4), this.writeUint(t, 8 * e)
            }
        }
        writeAddress(t) {
            null == t ? this.writeUint(0, 2) : (this.writeUint(2, 2), this.writeUint(0, 1), this.writeInt(t.wc, 8), this.writeBytes(t.hashPart))
        }
        writeBitString(t) {
            t.forEach(t => {
                this.writeBit(t)
            })
        }
        clone() {
            const t = new o(0);
            return t.array = this.array.slice(0), t.length = this.length, t.cursor = this.cursor, t
        }
        toString() {
            return this.toHex()
        }
        getTopUppedArray() {
            const t = this.clone();
            let e = 8 * Math.ceil(t.cursor / 8) - t.cursor;
            if (e > 0)
                for (e -= 1, t.writeBit(!0); e > 0;) e -= 1, t.writeBit(!1);
            return t.array = t.array.slice(0, Math.ceil(t.cursor / 8)), t.array
        }
        toHex() {
            if (this.cursor % 4 == 0) {
                const t = i(this.array.slice(0, Math.ceil(this.cursor / 8))).toUpperCase();
                return this.cursor % 8 == 0 ? t : t.substr(0, t.length - 1)
            } {
                const t = this.clone();
                for (t.writeBit(1); t.cursor % 4 != 0;) t.writeBit(0);
                return t.toHex().toUpperCase() + "_"
            }
        }
        setTopUppedArray(t, e = !0) {
            if (this.length = 8 * t.length, this.array = t, this.cursor = this.length, !e && this.length) {
                let r = !1;
                for (let t = 0; t < 7; t++)
                    if (this.cursor -= 1, this.get(this.cursor)) {
                        r = !0, this.off(this.cursor);
                        break
                    } if (!r) throw console.log(t, e), new Error("Incorrect TopUppedArray")
            }
        }
    }
    t.exports = {
        BitString: o
    }
}, function(t, e, r) {
    const {
        BitString: n
    } = r(21), {
        bytesToBase64: i,
        compareBytes: o,
        concatBytes: s,
        crc32c: u,
        hexToBytes: h,
        readNBytesUIntFromArray: a,
        sha256: c
    } = r(1), l = h("B5EE9C72"), f = h("68ff65f3"), d = h("acc3a728");
    class p {
        constructor() {
            this.bits = new n(1023), this.refs = [], this.isExotic = !1
        }
        static fromBoc(t) {
            return function(t) {
                "string" == typeof t && (t = h(t));
                const e = function(t) {
                    if (t.length < 5) throw "Not enough bytes for magic prefix";
                    const e = t,
                        r = t.slice(0, 4);
                    let n, i, s, h, c;
                    if (t = t.slice(4), o(r, l)) {
                        const e = t[0];
                        n = 128 & e, i = 64 & e, s = 32 & e, h = 2 * (16 & e) + (8 & e), c = e % 8
                    }
                    o(r, f) && (n = 1, i = 0, s = 0, h = 0, c = t[0]);
                    o(r, d) && (n = 1, i = 1, s = 0, h = 0, c = t[0]);
                    if ((t = t.slice(1)).length < 1 + 5 * c) throw "Not enough bytes for encoding cells counters";
                    const p = t[0];
                    t = t.slice(1);
                    const m = a(c, t);
                    t = t.slice(c);
                    const v = a(c, t);
                    t = t.slice(c);
                    const b = a(c, t);
                    t = t.slice(c);
                    const y = a(p, t);
                    if ((t = t.slice(p)).length < v * c) throw "Not enough bytes for encoding root cells hashes";
                    let g = [];
                    for (let e = 0; e < v; e++) g.push(a(c, t)), t = t.slice(c);
                    let w = !1;
                    if (n) {
                        if (w = [], t.length < p * m) throw "Not enough bytes for index encoding";
                        for (let e = 0; e < m; e++) w.push(a(p, t)), t = t.slice(p)
                    }
                    if (t.length < y) throw "Not enough bytes for cells data";
                    const M = t.slice(0, y);
                    if (t = t.slice(y), i) {
                        if (t.length < 4) throw "Not enough bytes for crc32c hashsum";
                        const r = e.length;
                        if (!o(u(e.slice(0, r - 4)), t.slice(0, 4))) throw "Crc32c hashsum mismatch";
                        t = t.slice(4)
                    }
                    if (t.length) throw "Too much bytes in BoC serialization";
                    return {
                        has_idx: n,
                        hash_crc32: i,
                        has_cache_bits: s,
                        flags: h,
                        size_bytes: c,
                        off_bytes: p,
                        cells_num: m,
                        roots_num: v,
                        absent_num: b,
                        tot_cells_size: y,
                        root_list: g,
                        index: w,
                        cells_data: M
                    }
                }(t);
                let r = e.cells_data,
                    n = [];
                for (let t = 0; t < e.cells_num; t++) {
                    let t = m(r, e.size_bytes);
                    r = t.residue, n.push(t.cell)
                }
                for (let t = e.cells_num - 1; t >= 0; t--) {
                    let e = n[t];
                    for (let r = 0; r < e.refs.length; r++) {
                        const i = e.refs[r];
                        if (i < t) throw "Topological order is broken";
                        e.refs[r] = n[i]
                    }
                }
                let i = [];
                for (let t of e.root_list) i.push(n[t]);
                return i
            }(t)
        }
        writeCell(t) {
            this.bits.writeBitString(t.bits), this.refs = this.refs.concat(t.refs)
        }
        getMaxLevel() {
            let t = 0;
            for (let e in this.refs) {
                const r = this.refs[e];
                r.getMaxLevel() > t && (t = r.getMaxLevel())
            }
            return t
        }
        isExplicitlyStoredHashes() {
            return 0
        }
        getMaxDepth() {
            let t = 0;
            if (this.refs.length > 0) {
                for (let e in this.refs) {
                    const r = this.refs[e];
                    r.getMaxDepth() > t && (t = r.getMaxDepth())
                }
                t += 1
            }
            return t
        }
        getMaxDepthAsArray() {
            const t = this.getMaxDepth(),
                e = Uint8Array.from({
                    length: 2
                }, () => 0);
            return e[1] = t % 256, e[0] = Math.floor(t / 256), e
        }
        getRefsDescriptor() {
            const t = Uint8Array.from({
                length: 1
            }, () => 0);
            return t[0] = this.refs.length + 8 * this.isExotic + 32 * this.getMaxLevel(), t
        }
        getBitsDescriptor() {
            const t = Uint8Array.from({
                length: 1
            }, () => 0);
            return t[0] = Math.ceil(this.bits.cursor / 8) + Math.floor(this.bits.cursor / 8), t
        }
        getDataWithDescriptors() {
            const t = this.getRefsDescriptor(),
                e = this.getBitsDescriptor(),
                r = this.bits.getTopUppedArray();
            return s(s(t, e), r)
        }
        async getRepr() {
            const t = [];
            t.push(this.getDataWithDescriptors());
            for (let e in this.refs) {
                const r = this.refs[e];
                t.push(r.getMaxDepthAsArray())
            }
            for (let e in this.refs) {
                const r = this.refs[e];
                t.push(await r.hash())
            }
            let e = new Uint8Array;
            for (let r in t) {
                const n = t[r];
                e = s(e, n)
            }
            return e
        }
        async hash() {
            return new Uint8Array(await c(await this.getRepr()))
        }
        toObject() {
            const t = {};
            t.data = {
                b64: i(this.bits.array.slice(0, Math.ceil(this.bits.cursor / 8))),
                len: this.bits.cursor
            }, t.refs = [];
            for (let e in this.refs) {
                const r = this.refs[e];
                t.refs.push(r.toObject())
            }
            return t
        }
        print(t) {
            let e = (t = t || "") + "x{" + this.bits.toHex() + "}\n";
            for (let r in this.refs) {
                e += this.refs[r].print(t + " ")
            }
            return e
        }
        async toBoc(t = !0, e = !0, r = !1, i = 0) {
            const o = await this.treeWalk(),
                h = o[0],
                a = o[1],
                c = h.length,
                f = c.toString(2).length,
                d = Math.min(Math.ceil(f / 8), 1);
            let p = 0,
                m = [];
            for (let t of h) m.push(p), p += await t[1].bocSerializationSize(a, d);
            const v = p.toString(2).length,
                b = Math.max(Math.ceil(v / 8), 1),
                y = new n(1247 * h.length);
            y.writeBytes(l), y.writeBitArray([t, e, r]), y.writeUint(i, 2), y.writeUint(d, 3), y.writeUint8(b), y.writeUint(c, 8 * d), y.writeUint(1, 8 * d), y.writeUint(0, 8 * d), y.writeUint(p, 8 * b), y.writeUint(0, 8 * d), t && h.forEach((t, e) => y.writeUint(m[e], 8 * b));
            for (let t of h) {
                const e = await t[1].serializeForBoc(a, d);
                y.writeBytes(e)
            }
            let g = y.getTopUppedArray();
            return e && (g = s(g, u(g))), g
        }
        async serializeForBoc(t, e) {
            const r = [];
            if (r.push(this.getDataWithDescriptors()), this.isExplicitlyStoredHashes()) throw new Error("Cell hashes explicit storing is not implemented");
            for (let e in this.refs) {
                const n = this.refs[e];
                let i = t[await n.hash()].toString(16);
                i.length % 2 && (i = "0" + i);
                const o = h(i);
                r.push(o)
            }
            let n = new Uint8Array;
            for (let t in r) {
                const e = r[t];
                n = s(n, e)
            }
            return n
        }
        async bocSerializationSize(t, e) {
            return (await this.serializeForBoc(t, e)).length
        }
        async treeWalk() {
            return async function t(e, r, n) {
                const i = await e.hash();
                if (i in n) return [r, n];
                n[i] = r.length, r.push([i, e]);
                for (let i of e.refs) {
                    const e = await t(i, r, n);
                    r = e[0], n = e[1]
                }
                return [r, n]
            }(this, [], {})
        }
    }

    function m(t, e) {
        if (t.length < 2) throw "Not enough bytes to encode cell descriptors";
        const r = t[0],
            n = t[1];
        t = t.slice(2);
        Math.floor(r / 32);
        const i = 8 & r,
            o = r % 8,
            s = Math.ceil(n / 2),
            u = !(n % 2);
        let h = new p;
        if (h.isExotic = i, t.length < s + e * o) throw "Not enough bytes to encode cell data";
        h.bits.setTopUppedArray(t.slice(0, s), u), t = t.slice(s);
        for (let r = 0; r < o; r++) h.refs.push(a(e, t)), t = t.slice(e);
        return {
            cell: h,
            residue: t
        }
    }
    t.exports = {
        Cell: p
    }
}, function(t, e, r) {
    (function(e) {
        const {
            Cell: n
        } = r(20), {
            Address: i,
            BN: o,
            toNano: s,
            bytesToHex: u,
            hexToBytes: h,
            nacl: a,
            stringToBytes: c,
            bytesToBase64: l
        } = r(1), {
            Contract: f
        } = r(24);
        t.exports = class {
            constructor(t, e) {
                this.transport = t, this.ton = e, this.ADDRESS_FORMAT_HEX = 0, this.ADDRESS_FORMAT_USER_FRIENDLY = 1, this.ADDRESS_FORMAT_URL_SAFE = 2, this.ADDRESS_FORMAT_BOUNCEABLE = 4, this.ADDRESS_FORMAT_TEST_ONLY = 8
            }
            async getAppConfiguration() {
                const t = await this.transport.send(224, 1, 0, 0);
                return {
                    version: t[0] + "." + t[1] + "." + t[2]
                }
            }
            async getPublicKey(t, r) {
                const n = e.alloc(4);
                n.writeInt32BE(t);
                const i = await this.transport.send(224, 2, r ? 1 : 0, 0, n),
                    o = i[0];
                return {
                    publicKey: new Uint8Array(i.slice(1, 1 + o))
                }
            }
            async getAddress(t, r, n) {
                const o = e.alloc(4);
                o.writeInt32BE(t);
                const s = await this.transport.send(224, 5, r ? 1 : 0, n, o),
                    h = s[0],
                    a = new Uint8Array(s.slice(1, 1 + h));
                return {
                    address: new i(wc + ":" + u(a))
                }
            }
            async sign(t, r) {
                const n = e.alloc(4);
                n.writeInt32BE(t);
                const i = e.concat([n, new e(r)]),
                    o = await this.transport.send(224, 3, 0, 0, i),
                    s = o[0];
                return {
                    signature: o.slice(1, 1 + s)
                }
            }
            async transfer(t, r, i, o, s, u) {
                const h = await r.createTransferMessage(null, i, o, s, null, 3, !0),
                    a = e.alloc(4);
                a.writeInt32BE(t);
                const c = e.concat([a, new e(await h.signingMessage.toBoc())]),
                    d = await this.transport.send(224, 4, u, 0, c),
                    p = d[0],
                    m = d.slice(1, 1 + p),
                    v = new Uint8Array(m),
                    b = new n;
                b.bits.writeBytes(v), b.writeCell(h.signingMessage);
                let y = null,
                    g = null,
                    w = null;
                if (0 === s) {
                    const t = await r.createStateInit();
                    y = t.stateInit, g = t.code, w = t.data
                }
                const M = await r.getAddress(),
                    _ = f.createExternalMessageHeader(M);
                return (async (t, e) => ({
                    getQuery: async () => t.message,
                    send: async () => {
                        const r = l(await t.message.toBoc(!1));
                        return e.sendBoc(r)
                    },
                    estimateFee: async () => {
                        const r = t.code ? {
                            address: t.address.toString(!0, !0, !1),
                            body: t.body.toObject(),
                            init_code: t.code.toObject(),
                            init_data: t.data.toObject()
                        } : {
                            address: t.address.toString(!0, !0, !0),
                            body: t.body.toObject()
                        };
                        return e.getEstimateFee(r)
                    }
                }))({
                    address: M,
                    message: f.createCommonMsgInfo(_, y, b),
                    body: b,
                    signature: v,
                    signingMessage: h.signingMessage,
                    stateInit: y,
                    code: g,
                    data: w
                }, this.ton.provider)
            }
        }
    }).call(this, r(2).Buffer)
}, function(t, e, r) {
    const {
        Cell: n
    } = r(20), {
        Address: i,
        bytesToBase64: o,
        bytesToHex: s,
        nacl: u
    } = r(1);
    class h {
        constructor(t, e) {
            this.provider = t, this.options = e, this.address = e.address ? new i(e.address) : null, e.wc || (e.wc = this.address ? this.address.wc : 0), this.methods = {}, this.deploy = e => {
                const r = (async () => {
                    const t = await this.createInitExternalMessage(e),
                        r = {
                            address: t.address.toString(!0, !0, !1),
                            body: t.body.toObject(),
                            init_code: t.code.toObject(),
                            init_data: t.data.toObject()
                        };
                    return {
                        query: t,
                        legacyQuery: r
                    }
                })();
                return {
                    getQuery: async () => (await r).query.message,
                    send: async () => {
                        const e = (await r).query,
                            n = o(await e.message.toBoc(!1));
                        return t.sendBoc(n)
                    },
                    estimateFee: async () => {
                        const e = (await r).legacyQuery;
                        return t.getEstimateFee(e)
                    }
                }
            }
        }
        async getAddress() {
            return this.address || (this.address = (await this.createStateInit()).address), this.address
        }
        createCodeCell() {
            if (!this.options.code) throw new Error("Contract: options.code is not defined");
            return this.options.code
        }
        createDataCell() {
            return new n
        }
        createSigningMessage(t) {
            return new n
        }
        async createStateInit() {
            const t = this.createCodeCell(),
                e = this.createDataCell(),
                r = h.createStateInit(t, e),
                n = await r.hash();
            return {
                stateInit: r,
                address: new i(this.options.wc + ":" + s(n)),
                code: t,
                data: e
            }
        }
        async createInitExternalMessage(t) {
            if (!this.options.publicKey) {
                const e = u.sign.keyPair.fromSecretKey(t);
                this.options.publicKey = e.publicKey
            }
            const {
                stateInit: e,
                address: r,
                code: i,
                data: o
            } = await this.createStateInit(), s = this.createSigningMessage(), a = u.sign.detached(await s.hash(), t), c = new n;
            c.bits.writeBytes(a), c.writeCell(s);
            const l = h.createExternalMessageHeader(r);
            return {
                address: r,
                message: h.createCommonMsgInfo(l, e, c),
                body: c,
                signingMessage: s,
                stateInit: e,
                code: i,
                data: o
            }
        }
        static createStateInit(t, e, r = null, i = null, o = null) {
            if (r) throw "Library in state init is not implemented";
            if (i) throw "Split depth in state init is not implemented";
            if (o) throw "Ticktock in state init is not implemented";
            const s = new n;
            return s.bits.writeBitArray([Boolean(i), Boolean(o), Boolean(t), Boolean(e), Boolean(r)]), t && s.refs.push(t), e && s.refs.push(e), r && s.refs.push(r), s
        }
        static createInternalMessageHeader(t, e = 0, r = !0, o = null, s = !1, u = null, h = null, a = 0, c = 0, l = 0, f = 0) {
            const d = new n;
            if (d.bits.writeBit(!1), d.bits.writeBit(r), null !== o ? d.bits.writeBit(o) : d.bits.writeBit(new i(t).isBounceable), d.bits.writeBit(s), d.bits.writeAddress(u ? new i(u) : null), d.bits.writeAddress(new i(t)), d.bits.writeGrams(e), h) throw "Currency collections are not implemented yet";
            return d.bits.writeBit(Boolean(h)), d.bits.writeGrams(a), d.bits.writeGrams(c), d.bits.writeUint(l, 64), d.bits.writeUint(f, 32), d
        }
        static createExternalMessageHeader(t, e = null, r = 0) {
            const o = new n;
            return o.bits.writeUint(2, 2), o.bits.writeAddress(e ? new i(e) : null), o.bits.writeAddress(new i(t)), o.bits.writeGrams(r), o
        }
        static createCommonMsgInfo(t, e = null, r = null) {
            const i = new n;
            return i.writeCell(t), e ? (i.bits.writeBit(!0), i.bits.getFreeBits() - 1 >= e.bits.getUsedBits() ? (i.bits.writeBit(!1), i.writeCell(e)) : (i.bits.writeBit(!0), i.refs.push(e))) : i.bits.writeBit(!1), r ? i.bits.getFreeBits() >= r.bits.getUsedBits() ? (i.bits.writeBit(!1), i.writeCell(r)) : (i.bits.writeBit(!0), i.refs.push(r)) : i.bits.writeBit(!1), i
        }
    }
    t.exports = {
        Contract: h
    }
}, function(t, e, r) {
    let n;
    n = "undefined" == typeof window ? r(26).XMLHttpRequest : window.XMLHttpRequest;
    t.exports.default = class {
        constructor(t) {
            this.host = t || "https://toncenter.com/api/test/v2/jsonRPC"
        }
        sendImpl(t, e) {
            return new Promise((function(r, i) {
                const o = new n;
                o.open("POST", t, !0), o.onload = function() {
                    if (200 == this.status) {
                        const t = JSON.parse(this.responseText);
                        "error" in t && i(t.error), r(t.result)
                    } else {
                        const t = new Error(this.statusText);
                        t.code = this.status, i(t)
                    }
                }, o.onerror = function() {
                    i(new Error("Network Error"))
                }, o.setRequestHeader("content-type", "application/json"), o.send(JSON.stringify(e))
            }))
        }
        send(t, e) {
            return this.sendImpl(this.host, {
                id: 1,
                jsonrpc: "2.0",
                method: t,
                params: e
            })
        }
        async getAddressInfo(t) {
            return this.send("getAddressInformation", {
                address: t
            })
        }
        async getExtendedAddressInfo(t) {
            return this.send("getExtendedAddressInformation", {
                address: t
            })
        }
        async getWalletInfo(t) {
            return this.send("getWalletInformation", {
                address: t
            })
        }
        async getTransactions(t, e = 20, r, n, i, o) {
            return this.send("getTransactions", {
                address: t,
                limit: e,
                lt: r,
                hash: n,
                to_lt: i,
                archival: o
            })
        }
        async getBalance(t) {
            return this.send("getAddressBalance", {
                address: t
            })
        }
        async sendBoc(t) {
            return this.send("sendBoc", {
                boc: t
            })
        }
        async sendQuery(t) {
            return this.send("sendQuerySimple", t)
        }
        async getEstimateFee(t) {
            return this.send("estimateFeeSimple", t)
        }
        async call(t, e, r = []) {
            return this.send("runGetMethod", {
                address: t,
                method: e,
                stack: r
            })
        }
    }
}, function(t, e) {}, function(t, e, r) {
    const {
        Cell: n
    } = r(20), {
        Address: i,
        BN: o,
        toNano: s,
        bytesToHex: u,
        hexToBytes: h,
        nacl: a,
        stringToBytes: c,
        bytesToBase64: l
    } = r(1), {
        Contract: f
    } = r(24);

    function d(t) {
        return n.fromBoc(h(t))[0]
    }
    class p extends f {
        constructor(t, e) {
            if (!e.publicKey && !e.address) throw new Error("WalletContract required publicKey or address in options");
            super(t, e), this.methods = {
                transfer: e => {
                    const r = (async () => {
                        const t = await this.createTransferMessage(e.secretKey, e.toAddress, e.amount, e.seqno, e.payload, e.sendMode, !Boolean(e.secretKey)),
                            r = t.code ? {
                                address: t.address.toString(!0, !0, !1),
                                body: t.body.toObject(),
                                init_code: t.code.toObject(),
                                init_data: t.data.toObject()
                            } : {
                                address: t.address.toString(!0, !0, !0),
                                body: t.body.toObject()
                            };
                        return {
                            query: t,
                            legacyQuery: r
                        }
                    })();
                    return {
                        getQuery: async () => (await r).query.message,
                        send: async () => {
                            const e = (await r).query,
                                n = l(await e.message.toBoc(!1));
                            return t.sendBoc(n)
                        },
                        estimateFee: async () => {
                            const e = (await r).legacyQuery;
                            return t.getEstimateFee(e)
                        }
                    }
                },
                seqno: () => ({
                    call: async () => {
                        const e = await this.getAddress(),
                            r = await t.call(e.toString(!1), "seqno", []);
                        let n = null;
                        try {
                            if (0 !== r.exit_code) throw new Error(r);
                            n = parseInt(r.stack[0][1], 16)
                        } catch (t) {}
                        return n
                    }
                })
            }
        }
        getName() {
            throw new Error("override me")
        }
        createDataCell() {
            const t = new n;
            return t.bits.writeUint(0, 32), t.bits.writeBytes(this.options.publicKey), t
        }
        createSigningMessage(t) {
            t = t || 0;
            const e = new n;
            return e.bits.writeUint(t, 32), e
        }
        async createTransferMessage(t, e, r, s, u = "", h = 3, l = !1) {
            let d = new n;
            u && (u.refs ? d = u : "string" == typeof u ? u.length > 0 && (d.bits.writeUint(0, 32), d.bits.writeBytes(c(u))) : d.bits.writeBytes(u));
            const p = f.createInternalMessageHeader(new i(e), new o(r)),
                m = f.createCommonMsgInfo(p, null, d),
                v = this.createSigningMessage(s);
            v.bits.writeUint8(h), v.refs.push(m);
            const b = l ? new Uint8Array(64) : a.sign.detached(await v.hash(), t),
                y = new n;
            y.bits.writeBytes(b), y.writeCell(v);
            let g = null,
                w = null,
                M = null;
            if (0 === s) {
                if (!this.options.publicKey) {
                    const e = a.sign.keyPair.fromSecretKey(t);
                    this.options.publicKey = e.publicKey
                }
                const e = await this.createStateInit();
                g = e.stateInit, w = e.code, M = e.data
            }
            const _ = await this.getAddress(),
                S = f.createExternalMessageHeader(_);
            return {
                address: _,
                message: f.createCommonMsgInfo(S, g, y),
                body: y,
                signature: b,
                signingMessage: v,
                stateInit: g,
                code: w,
                data: M
            }
        }
    }
    class m extends p {
        constructor(t, e) {
            e.code = d("B5EE9C72410101010044000084FF0020DDA4F260810200D71820D70B1FED44D0D31FD3FFD15112BAF2A122F901541044F910F2A2F80001D31F3120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED5441FDF089"), super(t, e)
        }
        getName() {
            return "simpleR1"
        }
    }
    class v extends p {
        constructor(t, e) {
            e.code = d("B5EE9C724101010100530000A2FF0020DD2082014C97BA9730ED44D0D70B1FE0A4F260810200D71820D70B1FED44D0D31FD3FFD15112BAF2A122F901541044F910F2A2F80001D31F3120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED54D0E2786F"), super(t, e)
        }
        getName() {
            return "simpleR2"
        }
    }
    class b extends p {
        constructor(t, e) {
            e.code = d("B5EE9C7241010101005F0000BAFF0020DD2082014C97BA218201339CBAB19C71B0ED44D0D31FD70BFFE304E0A4F260810200D71820D70B1FED44D0D31FD3FFD15112BAF2A122F901541044F910F2A2F80001D31F3120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED54B5B86E42"), super(t, e)
        }
        getName() {
            return "simpleR3"
        }
    }
    class y extends p {
        createSigningMessage(t) {
            t = t || 0;
            const e = new n;
            if (e.bits.writeUint(t, 32), 0 === t)
                for (let t = 0; t < 32; t++) e.bits.writeBit(1);
            else {
                const t = new Date,
                    r = Math.floor(t.getTime() / 1e3);
                e.bits.writeUint(r + 60, 32)
            }
            return e
        }
    }
    class g extends y {
        constructor(t, e) {
            e.code = d("B5EE9C724101010100570000AAFF0020DD2082014C97BA9730ED44D0D70B1FE0A4F2608308D71820D31FD31F01F823BBF263ED44D0D31FD3FFD15131BAF2A103F901541042F910F2A2F800029320D74A96D307D402FB00E8D1A4C8CB1FCBFFC9ED54A1370BB6"), super(t, e)
        }
        getName() {
            return "v2R1"
        }
    }
    class w extends y {
        constructor(t, e) {
            e.code = d("B5EE9C724101010100630000C2FF0020DD2082014C97BA218201339CBAB19C71B0ED44D0D31FD70BFFE304E0A4F2608308D71820D31FD31F01F823BBF263ED44D0D31FD3FFD15131BAF2A103F901541042F910F2A2F800029320D74A96D307D402FB00E8D1A4C8CB1FCBFFC9ED54044CD7A1"), super(t, e)
        }
        getName() {
            return "v2R2"
        }
    }
    class M extends p {
        createSigningMessage(t) {
            t = t || 0;
            const e = new n;
            if (e.bits.writeUint(this.options.walletId, 32), 0 === t)
                for (let t = 0; t < 32; t++) e.bits.writeBit(1);
            else {
                const t = new Date,
                    r = Math.floor(t.getTime() / 1e3);
                e.bits.writeUint(r + 60, 32)
            }
            return e.bits.writeUint(t, 32), e
        }
        createDataCell() {
            const t = new n;
            return t.bits.writeUint(0, 32), t.bits.writeUint(this.options.walletId, 32), t.bits.writeBytes(this.options.publicKey), t
        }
    }
    class _ extends M {
        constructor(t, e) {
            e.code = d("B5EE9C724101010100620000C0FF0020DD2082014C97BA9730ED44D0D70B1FE0A4F2608308D71820D31FD31FD31FF82313BBF263ED44D0D31FD31FD3FFD15132BAF2A15144BAF2A204F901541055F910F2A3F8009320D74A96D307D402FB00E8D101A4C8CB1FCB1FCBFFC9ED543FBE6EE0"), super(t, e), this.options.walletId || (this.options.walletId = 698983191 + this.options.wc)
        }
        getName() {
            return "v3R1"
        }
    }
    class S extends M {
        constructor(t, e) {
            e.code = d("B5EE9C724101010100710000DEFF0020DD2082014C97BA218201339CBAB19F71B0ED44D0D31FD31F31D70BFFE304E0A4F2608308D71820D31FD31FD31FF82313BBF263ED44D0D31FD31FD3FFD15132BAF2A15144BAF2A204F901541055F910F2A3F8009320D74A96D307D402FB00E8D101A4C8CB1FCB1FCBFFC9ED5410BD6DAD"), super(t, e), this.options.walletId || (this.options.walletId = 698983191 + this.options.wc)
        }
        getName() {
            return "v3R2"
        }
    }
    t.exports.default = class {
        constructor(t) {
            this.provider = t, this.all = {
                simpleR1: m,
                simpleR2: v,
                simpleR3: b,
                v2R1: g,
                v2R2: w,
                v3R1: _,
                v3R2: S
            }, this.list = [m, v, b, g, w, _, S], this.defaultVersion = "v3R1", this.default = this.all[this.defaultVersion]
        }
        create(t) {
            return new this.default(this.provider, t)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e),
        function(t) {
            r.d(e, "default", (function() {
                return c
            }));
            var n = r(29),
                i = r(32),
                o = r.n(i),
                s = r(33),
                u = r(82),
                h = r(31),
                a = r(83);
            class c extends n.default {
                constructor(e, r) {
                    super(), this.device = void 0, this.deviceModel = void 0, this.channel = Math.floor(65535 * Math.random()), this.packetSize = 64, this.interfaceNumber = void 0, this._disconnectEmitted = !1, this._emitDisconnect = t => {
                        this._disconnectEmitted || (this._disconnectEmitted = !0, this.emit("disconnect", t))
                    }, this.exchange = e => this.exchangeAtomicImpl(async () => {
                        const {
                            channel: r,
                            packetSize: n
                        } = this;
                        Object(u.log)("apdu", "=> " + e.toString("hex"));
                        const i = o()(r, n),
                            s = i.makeBlocks(e);
                        for (let t = 0; t < s.length; t++) await this.device.transferOut(3, s[t]);
                        let h, a;
                        for (; !(h = i.getReducedResult(a));) {
                            const e = await this.device.transferIn(3, n),
                                r = t.from(e.data.buffer);
                            a = i.reduceResponse(a, r)
                        }
                        return Object(u.log)("apdu", "<= " + h.toString("hex")), h
                    }).catch(t => {
                        if (t && t.message && t.message.includes("disconnected")) throw this._emitDisconnect(t), new h.DisconnectedDeviceDuringOperation(t.message);
                        throw t
                    }), this.device = e, this.interfaceNumber = r, this.deviceModel = Object(s.identifyUSBProductId)(e.productId)
                }
                static async request() {
                    const t = await Object(a.requestLedgerDevice)();
                    return c.open(t)
                }
                static async openConnected() {
                    const t = await Object(a.getLedgerDevices)();
                    return 0 === t.length ? null : c.open(t[0])
                }
                static async open(t) {
                    await t.open(), null === t.configuration && await t.selectConfiguration(1), await l(t);
                    const e = t.configurations[0].interfaces.find(({
                        alternates: t
                    }) => t.some(t => 255 === t.interfaceClass));
                    if (!e) throw new h.TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
                    const r = e.interfaceNumber;
                    try {
                        await t.claimInterface(r)
                    } catch (e) {
                        throw await t.close(), new h.TransportInterfaceNotAvailable(e.message)
                    }
                    const n = new c(t, r),
                        i = e => {
                            t === e.device && (navigator.usb.removeEventListener("disconnect", i), n._emitDisconnect(new h.DisconnectedDevice))
                        };
                    return navigator.usb.addEventListener("disconnect", i), n
                }
                async close() {
                    await this.exchangeBusyPromise, await this.device.releaseInterface(this.interfaceNumber), await l(this.device), await this.device.close()
                }
                setScrambleKey() {}
            }
            async function l(t) {
                try {
                    await t.reset()
                } catch (t) {
                    console.warn(t)
                }
            }
            c.isSupported = a.isSupported, c.list = a.getLedgerDevices, c.listen = t => {
                let e = !1;
                return Object(a.getFirstLedgerDevice)().then(r => {
                    if (!e) {
                        const e = Object(s.identifyUSBProductId)(r.productId);
                        t.next({
                            type: "add",
                            descriptor: r,
                            deviceModel: e
                        }), t.complete()
                    }
                }, e => {
                    window.DOMException && e instanceof window.DOMException && 18 === e.code ? t.error(new h.TransportWebUSBGestureRequired(e.message)) : t.error(new h.TransportOpenUserCancelled(e.message))
                }), {
                    unsubscribe: function() {
                        e = !0
                    }
                }
            }
        }.call(this, r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    r.r(e),
        function(t) {
            r.d(e, "default", (function() {
                return s
            }));
            var n = r(30),
                i = r.n(n),
                o = r(31);
            r.d(e, "TransportError", (function() {
                return o.TransportError
            })), r.d(e, "TransportStatusError", (function() {
                return o.TransportStatusError
            })), r.d(e, "StatusCodes", (function() {
                return o.StatusCodes
            })), r.d(e, "getAltStatusMessage", (function() {
                return o.getAltStatusMessage
            }));
            class s {
                constructor() {
                    this.exchangeTimeout = 3e4, this.unresponsiveTimeout = 15e3, this.deviceModel = null, this._events = new i.a, this.send = async (e, r, n, i, s = t.alloc(0), u = [o.StatusCodes.OK]) => {
                        if (s.length >= 256) throw new o.TransportError("data.length exceed 256 bytes limit. Got: " + s.length, "DataLengthTooBig");
                        const h = await this.exchange(t.concat([t.from([e, r, n, i]), t.from([s.length]), s])),
                            a = h.readUInt16BE(h.length - 2);
                        if (!u.some(t => t === a)) throw new o.TransportStatusError(a);
                        return h
                    }, this.exchangeBusyPromise = void 0, this.exchangeAtomicImpl = async t => {
                        if (this.exchangeBusyPromise) throw new o.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
                        let e;
                        const r = new Promise(t => {
                            e = t
                        });
                        this.exchangeBusyPromise = r;
                        let n = !1;
                        const i = setTimeout(() => {
                            n = !0, this.emit("unresponsive")
                        }, this.unresponsiveTimeout);
                        try {
                            const r = await t();
                            return n && this.emit("responsive"), r
                        } finally {
                            clearTimeout(i), e && e(), this.exchangeBusyPromise = null
                        }
                    }, this._appAPIlock = null
                }
                exchange(t) {
                    throw new Error("exchange not implemented")
                }
                setScrambleKey(t) {}
                close() {
                    return Promise.resolve()
                }
                on(t, e) {
                    this._events.on(t, e)
                }
                off(t, e) {
                    this._events.removeListener(t, e)
                }
                emit(t, ...e) {
                    this._events.emit(t, ...e)
                }
                setDebugMode() {
                    console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.")
                }
                setExchangeTimeout(t) {
                    this.exchangeTimeout = t
                }
                setExchangeUnresponsiveTimeout(t) {
                    this.unresponsiveTimeout = t
                }
                static create(t = 3e3, e) {
                    return new Promise((r, n) => {
                        let i = !1;
                        const s = this.listen({
                                next: e => {
                                    i = !0, s && s.unsubscribe(), u && clearTimeout(u), this.open(e.descriptor, t).then(r, n)
                                },
                                error: t => {
                                    u && clearTimeout(u), n(t)
                                },
                                complete: () => {
                                    u && clearTimeout(u), i || n(new o.TransportError(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"))
                                }
                            }),
                            u = e ? setTimeout(() => {
                                s.unsubscribe(), n(new o.TransportError(this.ErrorMessage_ListenTimeout, "ListenTimeout"))
                            }, e) : null
                    })
                }
                decorateAppAPIMethods(t, e, r) {
                    for (let n of e) t[n] = this.decorateAppAPIMethod(n, t[n], t, r)
                }
                decorateAppAPIMethod(t, e, r, n) {
                    return async (...i) => {
                        const {
                            _appAPIlock: s
                        } = this;
                        if (s) return Promise.reject(new o.TransportError("Ledger Device is busy (lock " + s + ")", "TransportLocked"));
                        try {
                            return this._appAPIlock = t, this.setScrambleKey(n), await e.apply(r, i)
                        } finally {
                            this._appAPIlock = null
                        }
                    }
                }
            }
            s.isSupported = void 0, s.list = void 0, s.listen = void 0, s.open = void 0, s.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)", s.ErrorMessage_NoDeviceFound = "No Ledger device found"
        }.call(this, r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    var n, i = "object" == typeof Reflect ? Reflect : null,
        o = i && "function" == typeof i.apply ? i.apply : function(t, e, r) {
            return Function.prototype.apply.call(t, e, r)
        };
    n = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function(t) {
        return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : function(t) {
        return Object.getOwnPropertyNames(t)
    };
    var s = Number.isNaN || function(t) {
        return t != t
    };

    function u() {
        u.init.call(this)
    }
    t.exports = u, u.EventEmitter = u, u.prototype._events = void 0, u.prototype._eventsCount = 0, u.prototype._maxListeners = void 0;
    var h = 10;

    function a(t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
    }

    function c(t) {
        return void 0 === t._maxListeners ? u.defaultMaxListeners : t._maxListeners
    }

    function l(t, e, r, n) {
        var i, o, s, u;
        if (a(r), void 0 === (o = t._events) ? (o = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== o.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), o = t._events), s = o[e]), void 0 === s) s = o[e] = r, ++t._eventsCount;
        else if ("function" == typeof s ? s = o[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), (i = c(t)) > 0 && s.length > i && !s.warned) {
            s.warned = !0;
            var h = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            h.name = "MaxListenersExceededWarning", h.emitter = t, h.type = e, h.count = s.length, u = h, console && console.warn && console.warn(u)
        }
        return t
    }

    function f() {
        if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function d(t, e, r) {
        var n = {
                fired: !1,
                wrapFn: void 0,
                target: t,
                type: e,
                listener: r
            },
            i = f.bind(n);
        return i.listener = r, n.wrapFn = i, i
    }

    function p(t, e, r) {
        var n = t._events;
        if (void 0 === n) return [];
        var i = n[e];
        return void 0 === i ? [] : "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function(t) {
            for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
            return e
        }(i) : v(i, i.length)
    }

    function m(t) {
        var e = this._events;
        if (void 0 !== e) {
            var r = e[t];
            if ("function" == typeof r) return 1;
            if (void 0 !== r) return r.length
        }
        return 0
    }

    function v(t, e) {
        for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
        return r
    }
    Object.defineProperty(u, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return h
        },
        set: function(t) {
            if ("number" != typeof t || t < 0 || s(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
            h = t
        }
    }), u.init = function() {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    }, u.prototype.setMaxListeners = function(t) {
        if ("number" != typeof t || t < 0 || s(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
        return this._maxListeners = t, this
    }, u.prototype.getMaxListeners = function() {
        return c(this)
    }, u.prototype.emit = function(t) {
        for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
        var n = "error" === t,
            i = this._events;
        if (void 0 !== i) n = n && void 0 === i.error;
        else if (!n) return !1;
        if (n) {
            var s;
            if (e.length > 0 && (s = e[0]), s instanceof Error) throw s;
            var u = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
            throw u.context = s, u
        }
        var h = i[t];
        if (void 0 === h) return !1;
        if ("function" == typeof h) o(h, this, e);
        else {
            var a = h.length,
                c = v(h, a);
            for (r = 0; r < a; ++r) o(c[r], this, e)
        }
        return !0
    }, u.prototype.addListener = function(t, e) {
        return l(this, t, e, !1)
    }, u.prototype.on = u.prototype.addListener, u.prototype.prependListener = function(t, e) {
        return l(this, t, e, !0)
    }, u.prototype.once = function(t, e) {
        return a(e), this.on(t, d(this, t, e)), this
    }, u.prototype.prependOnceListener = function(t, e) {
        return a(e), this.prependListener(t, d(this, t, e)), this
    }, u.prototype.removeListener = function(t, e) {
        var r, n, i, o, s;
        if (a(e), void 0 === (n = this._events)) return this;
        if (void 0 === (r = n[t])) return this;
        if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[t], n.removeListener && this.emit("removeListener", t, r.listener || e));
        else if ("function" != typeof r) {
            for (i = -1, o = r.length - 1; o >= 0; o--)
                if (r[o] === e || r[o].listener === e) {
                    s = r[o].listener, i = o;
                    break
                } if (i < 0) return this;
            0 === i ? r.shift() : function(t, e) {
                for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                t.pop()
            }(r, i), 1 === r.length && (n[t] = r[0]), void 0 !== n.removeListener && this.emit("removeListener", t, s || e)
        }
        return this
    }, u.prototype.off = u.prototype.removeListener, u.prototype.removeAllListeners = function(t) {
        var e, r, n;
        if (void 0 === (r = this._events)) return this;
        if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]), this;
        if (0 === arguments.length) {
            var i, o = Object.keys(r);
            for (n = 0; n < o.length; ++n) "removeListener" !== (i = o[n]) && this.removeAllListeners(i);
            return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
        }
        if ("function" == typeof(e = r[t])) this.removeListener(t, e);
        else if (void 0 !== e)
            for (n = e.length - 1; n >= 0; n--) this.removeListener(t, e[n]);
        return this
    }, u.prototype.listeners = function(t) {
        return p(this, t, !0)
    }, u.prototype.rawListeners = function(t) {
        return p(this, t, !1)
    }, u.listenerCount = function(t, e) {
        return "function" == typeof t.listenerCount ? t.listenerCount(e) : m.call(t, e)
    }, u.prototype.listenerCount = m, u.prototype.eventNames = function() {
        return this._eventsCount > 0 ? n(this._events) : []
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AccountNameRequiredError", (function() {
        return a
    })), r.d(e, "AccountNotSupported", (function() {
        return c
    })), r.d(e, "AmountRequired", (function() {
        return l
    })), r.d(e, "BluetoothRequired", (function() {
        return f
    })), r.d(e, "BtcUnmatchedApp", (function() {
        return d
    })), r.d(e, "CantOpenDevice", (function() {
        return p
    })), r.d(e, "CantScanQRCode", (function() {
        return Ut
    })), r.d(e, "CashAddrNotSupported", (function() {
        return m
    })), r.d(e, "CurrencyNotSupported", (function() {
        return v
    })), r.d(e, "DBNotReset", (function() {
        return Zt
    })), r.d(e, "DBWrongPassword", (function() {
        return Gt
    })), r.d(e, "DeviceAppVerifyNotSupported", (function() {
        return b
    })), r.d(e, "DeviceGenuineSocketEarlyClose", (function() {
        return y
    })), r.d(e, "DeviceHalted", (function() {
        return S
    })), r.d(e, "DeviceInOSUExpected", (function() {
        return _
    })), r.d(e, "DeviceNameInvalid", (function() {
        return E
    })), r.d(e, "DeviceNotGenuineError", (function() {
        return g
    })), r.d(e, "DeviceOnDashboardExpected", (function() {
        return w
    })), r.d(e, "DeviceOnDashboardUnexpected", (function() {
        return M
    })), r.d(e, "DeviceShouldStayInApp", (function() {
        return Nt
    })), r.d(e, "DeviceSocketFail", (function() {
        return x
    })), r.d(e, "DeviceSocketNoBulkStatus", (function() {
        return A
    })), r.d(e, "DisconnectedDevice", (function() {
        return O
    })), r.d(e, "DisconnectedDeviceDuringOperation", (function() {
        return I
    })), r.d(e, "ETHAddressNonEIP", (function() {
        return Dt
    })), r.d(e, "EnpointConfigError", (function() {
        return T
    })), r.d(e, "EthAppPleaseEnableContractData", (function() {
        return N
    })), r.d(e, "FeeEstimationFailed", (function() {
        return R
    })), r.d(e, "FeeNotLoaded", (function() {
        return Lt
    })), r.d(e, "FeeRequired", (function() {
        return kt
    })), r.d(e, "FeeTooHigh", (function() {
        return Pt
    })), r.d(e, "FirmwareNotRecognized", (function() {
        return B
    })), r.d(e, "FirmwareOrAppUpdateRequired", (function() {
        return Yt
    })), r.d(e, "GasLessThanEstimate", (function() {
        return st
    })), r.d(e, "GenuineCheckFailed", (function() {
        return Vt
    })), r.d(e, "HardResetFail", (function() {
        return j
    })), r.d(e, "InvalidAddress", (function() {
        return D
    })), r.d(e, "InvalidAddressBecauseDestinationIsAlsoSource", (function() {
        return U
    })), r.d(e, "InvalidXRPTag", (function() {
        return C
    })), r.d(e, "LatestMCUInstalledError", (function() {
        return L
    })), r.d(e, "LedgerAPI4xx", (function() {
        return qt
    })), r.d(e, "LedgerAPI5xx", (function() {
        return zt
    })), r.d(e, "LedgerAPIError", (function() {
        return P
    })), r.d(e, "LedgerAPIErrorWithMessage", (function() {
        return F
    })), r.d(e, "LedgerAPINotAvailable", (function() {
        return $
    })), r.d(e, "MCUNotGenuineToDashboard", (function() {
        return dt
    })), r.d(e, "ManagerAppAlreadyInstalledError", (function() {
        return V
    })), r.d(e, "ManagerAppDepInstallRequired", (function() {
        return z
    })), r.d(e, "ManagerAppDepUninstallRequired", (function() {
        return Y
    })), r.d(e, "ManagerAppRelyOnBTCError", (function() {
        return q
    })), r.d(e, "ManagerDeviceLockedError", (function() {
        return W
    })), r.d(e, "ManagerFirmwareNotEnoughSpaceError", (function() {
        return G
    })), r.d(e, "ManagerNotEnoughSpaceError", (function() {
        return Z
    })), r.d(e, "ManagerUninstallBTCDep", (function() {
        return H
    })), r.d(e, "NetworkDown", (function() {
        return K
    })), r.d(e, "NoAccessToCamera", (function() {
        return nt
    })), r.d(e, "NoAddressesFound", (function() {
        return X
    })), r.d(e, "NoDBPathGiven", (function() {
        return Wt
    })), r.d(e, "NotEnoughBalance", (function() {
        return Q
    })), r.d(e, "NotEnoughBalanceBecauseDestinationNotCreated", (function() {
        return rt
    })), r.d(e, "NotEnoughBalanceInParentAccount", (function() {
        return tt
    })), r.d(e, "NotEnoughBalanceToDelegate", (function() {
        return J
    })), r.d(e, "NotEnoughGas", (function() {
        return it
    })), r.d(e, "NotEnoughSpendableBalance", (function() {
        return et
    })), r.d(e, "NotSupportedLegacyAddress", (function() {
        return ot
    })), r.d(e, "PairingFailed", (function() {
        return $t
    })), r.d(e, "PasswordIncorrectError", (function() {
        return ht
    })), r.d(e, "PasswordsDontMatchError", (function() {
        return ut
    })), r.d(e, "RecipientRequired", (function() {
        return pt
    })), r.d(e, "RecommendSubAccountsToEmpty", (function() {
        return at
    })), r.d(e, "RecommendUndelegation", (function() {
        return ct
    })), r.d(e, "StatusCodes", (function() {
        return Kt
    })), r.d(e, "SyncError", (function() {
        return Ft
    })), r.d(e, "TimeoutTagged", (function() {
        return lt
    })), r.d(e, "TransportError", (function() {
        return Ht
    })), r.d(e, "TransportInterfaceNotAvailable", (function() {
        return Ot
    })), r.d(e, "TransportOpenUserCancelled", (function() {
        return At
    })), r.d(e, "TransportRaceCondition", (function() {
        return It
    })), r.d(e, "TransportStatusError", (function() {
        return Qt
    })), r.d(e, "TransportWebUSBGestureRequired", (function() {
        return Tt
    })), r.d(e, "UnavailableTezosOriginatedAccountReceive", (function() {
        return mt
    })), r.d(e, "UnavailableTezosOriginatedAccountSend", (function() {
        return vt
    })), r.d(e, "UnexpectedBootloader", (function() {
        return ft
    })), r.d(e, "UnknownMCU", (function() {
        return k
    })), r.d(e, "UpdateFetchFileFail", (function() {
        return bt
    })), r.d(e, "UpdateIncorrectHash", (function() {
        return yt
    })), r.d(e, "UpdateIncorrectSig", (function() {
        return gt
    })), r.d(e, "UpdateYourApp", (function() {
        return wt
    })), r.d(e, "UserRefusedAddress", (function() {
        return _t
    })), r.d(e, "UserRefusedAllowManager", (function() {
        return Et
    })), r.d(e, "UserRefusedDeviceNameChange", (function() {
        return Mt
    })), r.d(e, "UserRefusedFirmwareUpdate", (function() {
        return St
    })), r.d(e, "UserRefusedOnDevice", (function() {
        return xt
    })), r.d(e, "WebsocketConnectionError", (function() {
        return Rt
    })), r.d(e, "WebsocketConnectionFailed", (function() {
        return Bt
    })), r.d(e, "WrongAppForCurrency", (function() {
        return Ct
    })), r.d(e, "WrongDeviceForAccount", (function() {
        return jt
    })), r.d(e, "addCustomErrorDeserializer", (function() {
        return o
    })), r.d(e, "createCustomErrorClass", (function() {
        return s
    })), r.d(e, "deserializeError", (function() {
        return u
    })), r.d(e, "getAltStatusMessage", (function() {
        return Xt
    })), r.d(e, "serializeError", (function() {
        return h
    }));
    var n = {},
        i = {},
        o = function(t, e) {
            i[t] = e
        },
        s = function(t) {
            var e = function(e, r) {
                Object.assign(this, r), this.name = t, this.message = e || t, this.stack = (new Error).stack
            };
            return e.prototype = new Error, n[t] = e, e
        },
        u = function(t) {
            if ("object" == typeof t && t) {
                try {
                    var e = JSON.parse(t.message);
                    e.message && e.name && (t = e)
                } catch (t) {}
                var r = void 0;
                if ("string" == typeof t.name) {
                    var o = t.name,
                        h = i[o];
                    if (h) r = h(t);
                    else {
                        var a = "Error" === o ? Error : n[o];
                        a || (console.warn("deserializing an unknown class '" + o + "'"), a = s(o)), r = Object.create(a.prototype);
                        try {
                            for (var c in t) t.hasOwnProperty(c) && (r[c] = t[c])
                        } catch (t) {}
                    }
                } else r = new Error(t.message);
                return !r.stack && Error.captureStackTrace && Error.captureStackTrace(r, u), r
            }
            return new Error(String(t))
        },
        h = function(t) {
            return t ? "object" == typeof t ? function t(e, r) {
                var n = {};
                r.push(e);
                for (var i = 0, o = Object.keys(e); i < o.length; i++) {
                    var s = o[i],
                        u = e[s];
                    "function" != typeof u && (u && "object" == typeof u ? -1 !== r.indexOf(e[s]) ? n[s] = "[Circular]" : n[s] = t(e[s], r.slice(0)) : n[s] = u)
                }
                "string" == typeof e.name && (n.name = e.name);
                "string" == typeof e.message && (n.message = e.message);
                "string" == typeof e.stack && (n.stack = e.stack);
                return n
            }(t, []) : "function" == typeof t ? "[Function: " + (t.name || "anonymous") + "]" : t : t
        };
    var a = s("AccountNameRequired"),
        c = s("AccountNotSupported"),
        l = s("AmountRequired"),
        f = s("BluetoothRequired"),
        d = s("BtcUnmatchedApp"),
        p = s("CantOpenDevice"),
        m = s("CashAddrNotSupported"),
        v = s("CurrencyNotSupported"),
        b = s("DeviceAppVerifyNotSupported"),
        y = s("DeviceGenuineSocketEarlyClose"),
        g = s("DeviceNotGenuine"),
        w = s("DeviceOnDashboardExpected"),
        M = s("DeviceOnDashboardUnexpected"),
        _ = s("DeviceInOSUExpected"),
        S = s("DeviceHalted"),
        E = s("DeviceNameInvalid"),
        x = s("DeviceSocketFail"),
        A = s("DeviceSocketNoBulkStatus"),
        O = s("DisconnectedDevice"),
        I = s("DisconnectedDeviceDuringOperation"),
        T = s("EnpointConfig"),
        N = s("EthAppPleaseEnableContractData"),
        R = s("FeeEstimationFailed"),
        B = s("FirmwareNotRecognized"),
        j = s("HardResetFail"),
        C = s("InvalidXRPTag"),
        D = s("InvalidAddress"),
        U = s("InvalidAddressBecauseDestinationIsAlsoSource"),
        L = s("LatestMCUInstalledError"),
        k = s("UnknownMCU"),
        P = s("LedgerAPIError"),
        F = s("LedgerAPIErrorWithMessage"),
        $ = s("LedgerAPINotAvailable"),
        V = s("ManagerAppAlreadyInstalled"),
        q = s("ManagerAppRelyOnBTC"),
        z = s("ManagerAppDepInstallRequired"),
        Y = s("ManagerAppDepUninstallRequired"),
        W = s("ManagerDeviceLocked"),
        G = s("ManagerFirmwareNotEnoughSpace"),
        Z = s("ManagerNotEnoughSpace"),
        H = s("ManagerUninstallBTCDep"),
        K = s("NetworkDown"),
        X = s("NoAddressesFound"),
        Q = s("NotEnoughBalance"),
        J = s("NotEnoughBalanceToDelegate"),
        tt = s("NotEnoughBalanceInParentAccount"),
        et = s("NotEnoughSpendableBalance"),
        rt = s("NotEnoughBalanceBecauseDestinationNotCreated"),
        nt = s("NoAccessToCamera"),
        it = s("NotEnoughGas"),
        ot = s("NotSupportedLegacyAddress"),
        st = s("GasLessThanEstimate"),
        ut = s("PasswordsDontMatch"),
        ht = s("PasswordIncorrect"),
        at = s("RecommendSubAccountsToEmpty"),
        ct = s("RecommendUndelegation"),
        lt = s("TimeoutTagged"),
        ft = s("UnexpectedBootloader"),
        dt = s("MCUNotGenuineToDashboard"),
        pt = s("RecipientRequired"),
        mt = s("UnavailableTezosOriginatedAccountReceive"),
        vt = s("UnavailableTezosOriginatedAccountSend"),
        bt = s("UpdateFetchFileFail"),
        yt = s("UpdateIncorrectHash"),
        gt = s("UpdateIncorrectSig"),
        wt = s("UpdateYourApp"),
        Mt = s("UserRefusedDeviceNameChange"),
        _t = s("UserRefusedAddress"),
        St = s("UserRefusedFirmwareUpdate"),
        Et = s("UserRefusedAllowManager"),
        xt = s("UserRefusedOnDevice"),
        At = s("TransportOpenUserCancelled"),
        Ot = s("TransportInterfaceNotAvailable"),
        It = s("TransportRaceCondition"),
        Tt = s("TransportWebUSBGestureRequired"),
        Nt = s("DeviceShouldStayInApp"),
        Rt = s("WebsocketConnectionError"),
        Bt = s("WebsocketConnectionFailed"),
        jt = s("WrongDeviceForAccount"),
        Ct = s("WrongAppForCurrency"),
        Dt = s("ETHAddressNonEIP"),
        Ut = s("CantScanQRCode"),
        Lt = s("FeeNotLoaded"),
        kt = s("FeeRequired"),
        Pt = s("FeeTooHigh"),
        Ft = s("SyncError"),
        $t = s("PairingFailed"),
        Vt = s("GenuineCheckFailed"),
        qt = s("LedgerAPI4xx"),
        zt = s("LedgerAPI5xx"),
        Yt = s("FirmwareOrAppUpdateRequired"),
        Wt = s("NoDBPathGiven"),
        Gt = s("DBWrongPassword"),
        Zt = s("DBNotReset");

    function Ht(t, e) {
        this.name = "TransportError", this.message = t, this.stack = (new Error).stack, this.id = e
    }
    Ht.prototype = new Error, o("TransportError", (function(t) {
        return new Ht(t.message, t.id)
    }));
    var Kt = {
        PIN_REMAINING_ATTEMPTS: 25536,
        INCORRECT_LENGTH: 26368,
        MISSING_CRITICAL_PARAMETER: 26624,
        COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 27009,
        SECURITY_STATUS_NOT_SATISFIED: 27010,
        CONDITIONS_OF_USE_NOT_SATISFIED: 27013,
        INCORRECT_DATA: 27264,
        NOT_ENOUGH_MEMORY_SPACE: 27268,
        REFERENCED_DATA_NOT_FOUND: 27272,
        FILE_ALREADY_EXISTS: 27273,
        INCORRECT_P1_P2: 27392,
        INS_NOT_SUPPORTED: 27904,
        CLA_NOT_SUPPORTED: 28160,
        TECHNICAL_PROBLEM: 28416,
        OK: 36864,
        MEMORY_PROBLEM: 37440,
        NO_EF_SELECTED: 37888,
        INVALID_OFFSET: 37890,
        FILE_NOT_FOUND: 37892,
        INCONSISTENT_FILE: 37896,
        ALGORITHM_NOT_SUPPORTED: 38020,
        INVALID_KCV: 38021,
        CODE_NOT_INITIALIZED: 38914,
        ACCESS_CONDITION_NOT_FULFILLED: 38916,
        CONTRADICTION_SECRET_CODE_STATUS: 38920,
        CONTRADICTION_INVALIDATION: 38928,
        CODE_BLOCKED: 38976,
        MAX_VALUE_REACHED: 38992,
        GP_AUTH_FAILED: 25344,
        LICENSING: 28482,
        HALTED: 28586
    };

    function Xt(t) {
        switch (t) {
            case 26368:
                return "Incorrect length";
            case 26624:
                return "Missing critical parameter";
            case 27010:
                return "Security not satisfied (dongle locked or have invalid access rights)";
            case 27013:
                return "Condition of use not satisfied (denied by the user?)";
            case 27264:
                return "Invalid data received";
            case 27392:
                return "Invalid parameter received"
        }
        if (28416 <= t && t <= 28671) return "Internal error, please report"
    }

    function Qt(t) {
        this.name = "TransportStatusError";
        var e = Object.keys(Kt).find((function(e) {
                return Kt[e] === t
            })) || "UNKNOWN_ERROR",
            r = Xt(t) || e,
            n = t.toString(16);
        this.message = "Ledger device: " + r + " (0x" + n + ")", this.stack = (new Error).stack, this.statusCode = t, this.statusText = e
    }
    Qt.prototype = new Error, o("TransportStatusError", (function(t) {
        return new Qt(t.statusCode)
    }))
}, function(t, e, r) {
    "use strict";
    (function(t) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var n = r(31);

        function i(e) {
            const r = t.alloc(2);
            return r.writeUInt16BE(e, 0), r
        }
        const o = {
            data: t.alloc(0),
            dataLength: 0,
            sequence: 0
        };
        var s = (e, r) => ({
            makeBlocks(n) {
                let o = t.concat([i(n.length), n]);
                const s = r - 5,
                    u = Math.ceil(o.length / s);
                o = t.concat([o, t.alloc(u * s - o.length + 1).fill(0)]);
                const h = [];
                for (let r = 0; r < u; r++) {
                    const n = t.alloc(5);
                    n.writeUInt16BE(e, 0), n.writeUInt8(5, 2), n.writeUInt16BE(r, 3);
                    const i = o.slice(r * s, (r + 1) * s);
                    h.push(t.concat([n, i]))
                }
                return h
            },
            reduceResponse(r, i) {
                let {
                    data: s,
                    dataLength: u,
                    sequence: h
                } = r || o;
                if (i.readUInt16BE(0) !== e) throw new n.TransportError("Invalid channel", "InvalidChannel");
                if (5 !== i.readUInt8(2)) throw new n.TransportError("Invalid tag", "InvalidTag");
                if (i.readUInt16BE(3) !== h) throw new n.TransportError("Invalid sequence", "InvalidSequence");
                r || (u = i.readUInt16BE(5)), h++;
                const a = i.slice(r ? 5 : 7);
                return s = t.concat([s, a]), s.length > u && (s = s.slice(0, u)), {
                    data: s,
                    dataLength: u,
                    sequence: h
                }
            },
            getReducedResult(t) {
                if (t && t.dataLength === t.data.length) return t.data
            }
        });
        e.default = s
    }).call(this, r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "IIGenericHID", (function() {
        return o
    })), r.d(e, "IIKeyboardHID", (function() {
        return s
    })), r.d(e, "IIU2F", (function() {
        return u
    })), r.d(e, "IICCID", (function() {
        return h
    })), r.d(e, "IIWebUSB", (function() {
        return a
    })), r.d(e, "ledgerUSBVendorId", (function() {
        return d
    })), r.d(e, "getDeviceModel", (function() {
        return p
    })), r.d(e, "identifyUSBProductId", (function() {
        return m
    })), r.d(e, "identifyProductName", (function() {
        return v
    })), r.d(e, "getBluetoothServiceUuids", (function() {
        return g
    })), r.d(e, "getInfosForServiceUuid", (function() {
        return w
    }));
    var n = r(34),
        i = r.n(n);
    const o = 1,
        s = 2,
        u = 4,
        h = 8,
        a = 16,
        c = {
            blue: {
                id: "blue",
                productName: "Ledger Blue",
                productIdMM: 0,
                legacyUsbProductId: 0,
                usbOnly: !0,
                memorySize: 491520,
                blockSize: 4096,
                getBlockSize: t => 4096
            },
            nanoS: {
                id: "nanoS",
                productName: "Ledger Nano S",
                productIdMM: 16,
                legacyUsbProductId: 1,
                usbOnly: !0,
                memorySize: 327680,
                blockSize: 4096,
                getBlockSize: t => i.a.lt(i.a.coerce(t), "2.0.0") ? 4096 : 2048
            },
            nanoX: {
                id: "nanoX",
                productName: "Ledger Nano X",
                productIdMM: 64,
                legacyUsbProductId: 4,
                usbOnly: !1,
                memorySize: 2097152,
                blockSize: 4096,
                getBlockSize: t => 4096,
                bluetoothSpec: [{
                    serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
                    notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
                    writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66"
                }, {
                    serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
                    notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
                    writeUuid: "13d63400-2c97-0004-0002-4c6564676572"
                }]
            }
        },
        l = {
            Blue: "blue",
            "Nano S": "nanoS",
            "Nano X": "nanoX"
        },
        f = Object.values(c),
        d = 11415,
        p = t => {
            const e = c[t];
            if (!e) throw new Error("device '" + t + "' does not exist");
            return e
        },
        m = t => {
            const e = f.find(e => e.legacyUsbProductId === t);
            if (e) return e;
            const r = t >> 8;
            return f.find(t => t.productIdMM === r)
        },
        v = t => {
            const e = l[t];
            return f.find(t => t.id === e)
        },
        b = [],
        y = {};
    for (let t in c) {
        const e = c[t],
            {
                bluetoothSpec: r
            } = e;
        if (r)
            for (let t = 0; t < r.length; t++) {
                const n = r[t];
                b.push(n.serviceUuid), y[n.serviceUuid] = y[n.serviceUuid.replace(/-/g, "")] = {
                    deviceModel: e,
                    ...n
                }
            }
    }
    const g = () => b,
        w = t => y[t.toLowerCase()]
}, function(t, e, r) {
    const n = r(35);
    t.exports = {
        re: n.re,
        src: n.src,
        tokens: n.t,
        SEMVER_SPEC_VERSION: r(36).SEMVER_SPEC_VERSION,
        SemVer: r(39),
        compareIdentifiers: r(41).compareIdentifiers,
        rcompareIdentifiers: r(41).rcompareIdentifiers,
        parse: r(42),
        valid: r(43),
        clean: r(44),
        inc: r(45),
        diff: r(46),
        major: r(49),
        minor: r(50),
        patch: r(51),
        prerelease: r(52),
        compare: r(48),
        rcompare: r(53),
        compareLoose: r(54),
        compareBuild: r(55),
        sort: r(56),
        rsort: r(57),
        gt: r(58),
        lt: r(59),
        eq: r(47),
        neq: r(60),
        gte: r(61),
        lte: r(62),
        cmp: r(63),
        coerce: r(64),
        Comparator: r(65),
        Range: r(66),
        satisfies: r(70),
        toComparators: r(71),
        maxSatisfying: r(72),
        minSatisfying: r(73),
        minVersion: r(74),
        validRange: r(75),
        outside: r(76),
        gtr: r(77),
        ltr: r(78),
        intersects: r(79),
        simplifyRange: r(80),
        subset: r(81)
    }
}, function(t, e, r) {
    const {
        MAX_SAFE_COMPONENT_LENGTH: n
    } = r(36), i = r(37), o = (e = t.exports = {}).re = [], s = e.src = [], u = e.t = {};
    let h = 0;
    const a = (t, e, r) => {
        const n = h++;
        i(n, e), u[t] = n, s[n] = e, o[n] = new RegExp(e, r ? "g" : void 0)
    };
    a("NUMERICIDENTIFIER", "0|[1-9]\\d*"), a("NUMERICIDENTIFIERLOOSE", "[0-9]+"), a("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), a("MAINVERSION", `(${s[u.NUMERICIDENTIFIER]})\\.` + `(${s[u.NUMERICIDENTIFIER]})\\.` + `(${s[u.NUMERICIDENTIFIER]})`), a("MAINVERSIONLOOSE", `(${s[u.NUMERICIDENTIFIERLOOSE]})\\.` + `(${s[u.NUMERICIDENTIFIERLOOSE]})\\.` + `(${s[u.NUMERICIDENTIFIERLOOSE]})`), a("PRERELEASEIDENTIFIER", `(?:${s[u.NUMERICIDENTIFIER]}|${s[u.NONNUMERICIDENTIFIER]})`), a("PRERELEASEIDENTIFIERLOOSE", `(?:${s[u.NUMERICIDENTIFIERLOOSE]}|${s[u.NONNUMERICIDENTIFIER]})`), a("PRERELEASE", `(?:-(${s[u.PRERELEASEIDENTIFIER]}(?:\\.${s[u.PRERELEASEIDENTIFIER]})*))`), a("PRERELEASELOOSE", `(?:-?(${s[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${s[u.PRERELEASEIDENTIFIERLOOSE]})*))`), a("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), a("BUILD", `(?:\\+(${s[u.BUILDIDENTIFIER]}(?:\\.${s[u.BUILDIDENTIFIER]})*))`), a("FULLPLAIN", `v?${s[u.MAINVERSION]}${s[u.PRERELEASE]}?${s[u.BUILD]}?`), a("FULL", `^${s[u.FULLPLAIN]}$`), a("LOOSEPLAIN", `[v=\\s]*${s[u.MAINVERSIONLOOSE]}${s[u.PRERELEASELOOSE]}?${s[u.BUILD]}?`), a("LOOSE", `^${s[u.LOOSEPLAIN]}$`), a("GTLT", "((?:<|>)?=?)"), a("XRANGEIDENTIFIERLOOSE", `${s[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), a("XRANGEIDENTIFIER", `${s[u.NUMERICIDENTIFIER]}|x|X|\\*`), a("XRANGEPLAIN", `[v=\\s]*(${s[u.XRANGEIDENTIFIER]})` + `(?:\\.(${s[u.XRANGEIDENTIFIER]})` + `(?:\\.(${s[u.XRANGEIDENTIFIER]})` + `(?:${s[u.PRERELEASE]})?${s[u.BUILD]}?` + ")?)?"), a("XRANGEPLAINLOOSE", `[v=\\s]*(${s[u.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${s[u.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${s[u.XRANGEIDENTIFIERLOOSE]})` + `(?:${s[u.PRERELEASELOOSE]})?${s[u.BUILD]}?` + ")?)?"), a("XRANGE", `^${s[u.GTLT]}\\s*${s[u.XRANGEPLAIN]}$`), a("XRANGELOOSE", `^${s[u.GTLT]}\\s*${s[u.XRANGEPLAINLOOSE]}$`), a("COERCE", `(^|[^\\d])(\\d{1,${n}})` + `(?:\\.(\\d{1,${n}}))?` + `(?:\\.(\\d{1,${n}}))?` + "(?:$|[^\\d])"), a("COERCERTL", s[u.COERCE], !0), a("LONETILDE", "(?:~>?)"), a("TILDETRIM", `(\\s*)${s[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", a("TILDE", `^${s[u.LONETILDE]}${s[u.XRANGEPLAIN]}$`), a("TILDELOOSE", `^${s[u.LONETILDE]}${s[u.XRANGEPLAINLOOSE]}$`), a("LONECARET", "(?:\\^)"), a("CARETTRIM", `(\\s*)${s[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", a("CARET", `^${s[u.LONECARET]}${s[u.XRANGEPLAIN]}$`), a("CARETLOOSE", `^${s[u.LONECARET]}${s[u.XRANGEPLAINLOOSE]}$`), a("COMPARATORLOOSE", `^${s[u.GTLT]}\\s*(${s[u.LOOSEPLAIN]})$|^$`), a("COMPARATOR", `^${s[u.GTLT]}\\s*(${s[u.FULLPLAIN]})$|^$`), a("COMPARATORTRIM", `(\\s*)${s[u.GTLT]}\\s*(${s[u.LOOSEPLAIN]}|${s[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", a("HYPHENRANGE", `^\\s*(${s[u.XRANGEPLAIN]})` + "\\s+-\\s+" + `(${s[u.XRANGEPLAIN]})` + "\\s*$"), a("HYPHENRANGELOOSE", `^\\s*(${s[u.XRANGEPLAINLOOSE]})` + "\\s+-\\s+" + `(${s[u.XRANGEPLAINLOOSE]})` + "\\s*$"), a("STAR", "(<|>)?=?\\s*\\*"), a("GTE0", "^\\s*>=\\s*0.0.0\\s*$"), a("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$")
}, function(t, e) {
    const r = Number.MAX_SAFE_INTEGER || 9007199254740991;
    t.exports = {
        SEMVER_SPEC_VERSION: "2.0.0",
        MAX_LENGTH: 256,
        MAX_SAFE_INTEGER: r,
        MAX_SAFE_COMPONENT_LENGTH: 16
    }
}, function(t, e, r) {
    (function(e) {
        const r = "object" == typeof e && e.env && e.env.NODE_DEBUG && /\bsemver\b/i.test(e.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {};
        t.exports = r
    }).call(this, r(38))
}, function(t, e) {
    var r, n, i = t.exports = {};

    function o() {
        throw new Error("setTimeout has not been defined")
    }

    function s() {
        throw new Error("clearTimeout has not been defined")
    }

    function u(t) {
        if (r === setTimeout) return setTimeout(t, 0);
        if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(t, 0);
        try {
            return r(t, 0)
        } catch (e) {
            try {
                return r.call(null, t, 0)
            } catch (e) {
                return r.call(this, t, 0)
            }
        }
    }! function() {
        try {
            r = "function" == typeof setTimeout ? setTimeout : o
        } catch (t) {
            r = o
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (t) {
            n = s
        }
    }();
    var h, a = [],
        c = !1,
        l = -1;

    function f() {
        c && h && (c = !1, h.length ? a = h.concat(a) : l = -1, a.length && d())
    }

    function d() {
        if (!c) {
            var t = u(f);
            c = !0;
            for (var e = a.length; e;) {
                for (h = a, a = []; ++l < e;) h && h[l].run();
                l = -1, e = a.length
            }
            h = null, c = !1,
                function(t) {
                    if (n === clearTimeout) return clearTimeout(t);
                    if ((n === s || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);
                    try {
                        n(t)
                    } catch (e) {
                        try {
                            return n.call(null, t)
                        } catch (e) {
                            return n.call(this, t)
                        }
                    }
                }(t)
        }
    }

    function p(t, e) {
        this.fun = t, this.array = e
    }

    function m() {}
    i.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        a.push(new p(t, e)), 1 !== a.length || c || u(d)
    }, p.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = m, i.addListener = m, i.once = m, i.off = m, i.removeListener = m, i.removeAllListeners = m, i.emit = m, i.prependListener = m, i.prependOnceListener = m, i.listeners = function(t) {
        return []
    }, i.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
}, function(t, e, r) {
    const n = r(37),
        {
            MAX_LENGTH: i,
            MAX_SAFE_INTEGER: o
        } = r(36),
        {
            re: s,
            t: u
        } = r(35),
        h = r(40),
        {
            compareIdentifiers: a
        } = r(41);
    class c {
        constructor(t, e) {
            if (e = h(e), t instanceof c) {
                if (t.loose === !!e.loose && t.includePrerelease === !!e.includePrerelease) return t;
                t = t.version
            } else if ("string" != typeof t) throw new TypeError(`Invalid Version: ${t}`);
            if (t.length > i) throw new TypeError(`version is longer than ${i} characters`);
            n("SemVer", t, e), this.options = e, this.loose = !!e.loose, this.includePrerelease = !!e.includePrerelease;
            const r = t.trim().match(e.loose ? s[u.LOOSE] : s[u.FULL]);
            if (!r) throw new TypeError(`Invalid Version: ${t}`);
            if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > o || this.major < 0) throw new TypeError("Invalid major version");
            if (this.minor > o || this.minor < 0) throw new TypeError("Invalid minor version");
            if (this.patch > o || this.patch < 0) throw new TypeError("Invalid patch version");
            r[4] ? this.prerelease = r[4].split(".").map(t => {
                if (/^[0-9]+$/.test(t)) {
                    const e = +t;
                    if (e >= 0 && e < o) return e
                }
                return t
            }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format()
        }
        format() {
            return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version
        }
        toString() {
            return this.version
        }
        compare(t) {
            if (n("SemVer.compare", this.version, this.options, t), !(t instanceof c)) {
                if ("string" == typeof t && t === this.version) return 0;
                t = new c(t, this.options)
            }
            return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t)
        }
        compareMain(t) {
            return t instanceof c || (t = new c(t, this.options)), a(this.major, t.major) || a(this.minor, t.minor) || a(this.patch, t.patch)
        }
        comparePre(t) {
            if (t instanceof c || (t = new c(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
            if (!this.prerelease.length && t.prerelease.length) return 1;
            if (!this.prerelease.length && !t.prerelease.length) return 0;
            let e = 0;
            do {
                const r = this.prerelease[e],
                    i = t.prerelease[e];
                if (n("prerelease compare", e, r, i), void 0 === r && void 0 === i) return 0;
                if (void 0 === i) return 1;
                if (void 0 === r) return -1;
                if (r !== i) return a(r, i)
            } while (++e)
        }
        compareBuild(t) {
            t instanceof c || (t = new c(t, this.options));
            let e = 0;
            do {
                const r = this.build[e],
                    i = t.build[e];
                if (n("prerelease compare", e, r, i), void 0 === r && void 0 === i) return 0;
                if (void 0 === i) return 1;
                if (void 0 === r) return -1;
                if (r !== i) return a(r, i)
            } while (++e)
        }
        inc(t, e) {
            switch (t) {
                case "premajor":
                    this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", e);
                    break;
                case "preminor":
                    this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", e);
                    break;
                case "prepatch":
                    this.prerelease.length = 0, this.inc("patch", e), this.inc("pre", e);
                    break;
                case "prerelease":
                    0 === this.prerelease.length && this.inc("patch", e), this.inc("pre", e);
                    break;
                case "major":
                    0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
                    break;
                case "minor":
                    0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
                    break;
                case "patch":
                    0 === this.prerelease.length && this.patch++, this.prerelease = [];
                    break;
                case "pre":
                    if (0 === this.prerelease.length) this.prerelease = [0];
                    else {
                        let t = this.prerelease.length;
                        for (; --t >= 0;) "number" == typeof this.prerelease[t] && (this.prerelease[t]++, t = -2); - 1 === t && this.prerelease.push(0)
                    }
                    e && (this.prerelease[0] === e ? isNaN(this.prerelease[1]) && (this.prerelease = [e, 0]) : this.prerelease = [e, 0]);
                    break;
                default:
                    throw new Error(`invalid increment argument: ${t}`)
            }
            return this.format(), this.raw = this.version, this
        }
    }
    t.exports = c
}, function(t, e) {
    const r = ["includePrerelease", "loose", "rtl"];
    t.exports = t => t ? "object" != typeof t ? {
        loose: !0
    } : r.filter(e => t[e]).reduce((t, e) => (t[e] = !0, t), {}) : {}
}, function(t, e) {
    const r = /^[0-9]+$/,
        n = (t, e) => {
            const n = r.test(t),
                i = r.test(e);
            return n && i && (t = +t, e = +e), t === e ? 0 : n && !i ? -1 : i && !n ? 1 : t < e ? -1 : 1
        };
    t.exports = {
        compareIdentifiers: n,
        rcompareIdentifiers: (t, e) => n(e, t)
    }
}, function(t, e, r) {
    const {
        MAX_LENGTH: n
    } = r(36), {
        re: i,
        t: o
    } = r(35), s = r(39), u = r(40);
    t.exports = (t, e) => {
        if (e = u(e), t instanceof s) return t;
        if ("string" != typeof t) return null;
        if (t.length > n) return null;
        if (!(e.loose ? i[o.LOOSE] : i[o.FULL]).test(t)) return null;
        try {
            return new s(t, e)
        } catch (t) {
            return null
        }
    }
}, function(t, e, r) {
    const n = r(42);
    t.exports = (t, e) => {
        const r = n(t, e);
        return r ? r.version : null
    }
}, function(t, e, r) {
    const n = r(42);
    t.exports = (t, e) => {
        const r = n(t.trim().replace(/^[=v]+/, ""), e);
        return r ? r.version : null
    }
}, function(t, e, r) {
    const n = r(39);
    t.exports = (t, e, r, i) => {
        "string" == typeof r && (i = r, r = void 0);
        try {
            return new n(t, r).inc(e, i).version
        } catch (t) {
            return null
        }
    }
}, function(t, e, r) {
    const n = r(42),
        i = r(47);
    t.exports = (t, e) => {
        if (i(t, e)) return null; {
            const r = n(t),
                i = n(e),
                o = r.prerelease.length || i.prerelease.length,
                s = o ? "pre" : "",
                u = o ? "prerelease" : "";
            for (const t in r)
                if (("major" === t || "minor" === t || "patch" === t) && r[t] !== i[t]) return s + t;
            return u
        }
    }
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e, r) => 0 === n(t, e, r)
}, function(t, e, r) {
    const n = r(39);
    t.exports = (t, e, r) => new n(t, r).compare(new n(e, r))
}, function(t, e, r) {
    const n = r(39);
    t.exports = (t, e) => new n(t, e).major
}, function(t, e, r) {
    const n = r(39);
    t.exports = (t, e) => new n(t, e).minor
}, function(t, e, r) {
    const n = r(39);
    t.exports = (t, e) => new n(t, e).patch
}, function(t, e, r) {
    const n = r(42);
    t.exports = (t, e) => {
        const r = n(t, e);
        return r && r.prerelease.length ? r.prerelease : null
    }
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e, r) => n(e, t, r)
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e) => n(t, e, !0)
}, function(t, e, r) {
    const n = r(39);
    t.exports = (t, e, r) => {
        const i = new n(t, r),
            o = new n(e, r);
        return i.compare(o) || i.compareBuild(o)
    }
}, function(t, e, r) {
    const n = r(55);
    t.exports = (t, e) => t.sort((t, r) => n(t, r, e))
}, function(t, e, r) {
    const n = r(55);
    t.exports = (t, e) => t.sort((t, r) => n(r, t, e))
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e, r) => n(t, e, r) > 0
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e, r) => n(t, e, r) < 0
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e, r) => 0 !== n(t, e, r)
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e, r) => n(t, e, r) >= 0
}, function(t, e, r) {
    const n = r(48);
    t.exports = (t, e, r) => n(t, e, r) <= 0
}, function(t, e, r) {
    const n = r(47),
        i = r(60),
        o = r(58),
        s = r(61),
        u = r(59),
        h = r(62);
    t.exports = (t, e, r, a) => {
        switch (e) {
            case "===":
                return "object" == typeof t && (t = t.version), "object" == typeof r && (r = r.version), t === r;
            case "!==":
                return "object" == typeof t && (t = t.version), "object" == typeof r && (r = r.version), t !== r;
            case "":
            case "=":
            case "==":
                return n(t, r, a);
            case "!=":
                return i(t, r, a);
            case ">":
                return o(t, r, a);
            case ">=":
                return s(t, r, a);
            case "<":
                return u(t, r, a);
            case "<=":
                return h(t, r, a);
            default:
                throw new TypeError(`Invalid operator: ${e}`)
        }
    }
}, function(t, e, r) {
    const n = r(39),
        i = r(42),
        {
            re: o,
            t: s
        } = r(35);
    t.exports = (t, e) => {
        if (t instanceof n) return t;
        if ("number" == typeof t && (t = String(t)), "string" != typeof t) return null;
        let r = null;
        if ((e = e || {}).rtl) {
            let e;
            for (;
                (e = o[s.COERCERTL].exec(t)) && (!r || r.index + r[0].length !== t.length);) r && e.index + e[0].length === r.index + r[0].length || (r = e), o[s.COERCERTL].lastIndex = e.index + e[1].length + e[2].length;
            o[s.COERCERTL].lastIndex = -1
        } else r = t.match(o[s.COERCE]);
        return null === r ? null : i(`${r[2]}.${r[3]||"0"}.${r[4]||"0"}`, e)
    }
}, function(t, e, r) {
    const n = Symbol("SemVer ANY");
    class i {
        static get ANY() {
            return n
        }
        constructor(t, e) {
            if (e = o(e), t instanceof i) {
                if (t.loose === !!e.loose) return t;
                t = t.value
            }
            a("comparator", t, e), this.options = e, this.loose = !!e.loose, this.parse(t), this.semver === n ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this)
        }
        parse(t) {
            const e = this.options.loose ? s[u.COMPARATORLOOSE] : s[u.COMPARATOR],
                r = t.match(e);
            if (!r) throw new TypeError(`Invalid comparator: ${t}`);
            this.operator = void 0 !== r[1] ? r[1] : "", "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new c(r[2], this.options.loose) : this.semver = n
        }
        toString() {
            return this.value
        }
        test(t) {
            if (a("Comparator.test", t, this.options.loose), this.semver === n || t === n) return !0;
            if ("string" == typeof t) try {
                t = new c(t, this.options)
            } catch (t) {
                return !1
            }
            return h(t, this.operator, this.semver, this.options)
        }
        intersects(t, e) {
            if (!(t instanceof i)) throw new TypeError("a Comparator is required");
            if (e && "object" == typeof e || (e = {
                    loose: !!e,
                    includePrerelease: !1
                }), "" === this.operator) return "" === this.value || new l(t.value, e).test(this.value);
            if ("" === t.operator) return "" === t.value || new l(this.value, e).test(t.semver);
            const r = !(">=" !== this.operator && ">" !== this.operator || ">=" !== t.operator && ">" !== t.operator),
                n = !("<=" !== this.operator && "<" !== this.operator || "<=" !== t.operator && "<" !== t.operator),
                o = this.semver.version === t.semver.version,
                s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== t.operator && "<=" !== t.operator),
                u = h(this.semver, "<", t.semver, e) && (">=" === this.operator || ">" === this.operator) && ("<=" === t.operator || "<" === t.operator),
                a = h(this.semver, ">", t.semver, e) && ("<=" === this.operator || "<" === this.operator) && (">=" === t.operator || ">" === t.operator);
            return r || n || o && s || u || a
        }
    }
    t.exports = i;
    const o = r(40),
        {
            re: s,
            t: u
        } = r(35),
        h = r(63),
        a = r(37),
        c = r(39),
        l = r(66)
}, function(t, e, r) {
    class n {
        constructor(t, e) {
            if (e = o(e), t instanceof n) return t.loose === !!e.loose && t.includePrerelease === !!e.includePrerelease ? t : new n(t.raw, e);
            if (t instanceof s) return this.raw = t.value, this.set = [
                [t]
            ], this.format(), this;
            if (this.options = e, this.loose = !!e.loose, this.includePrerelease = !!e.includePrerelease, this.raw = t, this.set = t.split(/\s*\|\|\s*/).map(t => this.parseRange(t.trim())).filter(t => t.length), !this.set.length) throw new TypeError(`Invalid SemVer Range: ${t}`);
            if (this.set.length > 1) {
                const t = this.set[0];
                if (this.set = this.set.filter(t => !p(t[0])), 0 === this.set.length) this.set = [t];
                else if (this.set.length > 1)
                    for (const t of this.set)
                        if (1 === t.length && m(t[0])) {
                            this.set = [t];
                            break
                        }
            }
            this.format()
        }
        format() {
            return this.range = this.set.map(t => t.join(" ").trim()).join("||").trim(), this.range
        }
        toString() {
            return this.range
        }
        parseRange(t) {
            t = t.trim();
            const e = `parseRange:${Object.keys(this.options).join(",")}:${t}`,
                r = i.get(e);
            if (r) return r;
            const n = this.options.loose,
                o = n ? a[c.HYPHENRANGELOOSE] : a[c.HYPHENRANGE];
            t = t.replace(o, O(this.options.includePrerelease)), u("hyphen replace", t), t = t.replace(a[c.COMPARATORTRIM], l), u("comparator trim", t, a[c.COMPARATORTRIM]), t = (t = (t = t.replace(a[c.TILDETRIM], f)).replace(a[c.CARETTRIM], d)).split(/\s+/).join(" ");
            const h = n ? a[c.COMPARATORLOOSE] : a[c.COMPARATOR],
                m = t.split(" ").map(t => b(t, this.options)).join(" ").split(/\s+/).map(t => A(t, this.options)).filter(this.options.loose ? t => !!t.match(h) : () => !0).map(t => new s(t, this.options)),
                v = (m.length, new Map);
            for (const t of m) {
                if (p(t)) return [t];
                v.set(t.value, t)
            }
            v.size > 1 && v.has("") && v.delete("");
            const y = [...v.values()];
            return i.set(e, y), y
        }
        intersects(t, e) {
            if (!(t instanceof n)) throw new TypeError("a Range is required");
            return this.set.some(r => v(r, e) && t.set.some(t => v(t, e) && r.every(r => t.every(t => r.intersects(t, e)))))
        }
        test(t) {
            if (!t) return !1;
            if ("string" == typeof t) try {
                t = new h(t, this.options)
            } catch (t) {
                return !1
            }
            for (let e = 0; e < this.set.length; e++)
                if (I(this.set[e], t, this.options)) return !0;
            return !1
        }
    }
    t.exports = n;
    const i = new(r(67))({
            max: 1e3
        }),
        o = r(40),
        s = r(65),
        u = r(37),
        h = r(39),
        {
            re: a,
            t: c,
            comparatorTrimReplace: l,
            tildeTrimReplace: f,
            caretTrimReplace: d
        } = r(35),
        p = t => "<0.0.0-0" === t.value,
        m = t => "" === t.value,
        v = (t, e) => {
            let r = !0;
            const n = t.slice();
            let i = n.pop();
            for (; r && n.length;) r = n.every(t => i.intersects(t, e)), i = n.pop();
            return r
        },
        b = (t, e) => (u("comp", t, e), t = M(t, e), u("caret", t), t = g(t, e), u("tildes", t), t = S(t, e), u("xrange", t), t = x(t, e), u("stars", t), t),
        y = t => !t || "x" === t.toLowerCase() || "*" === t,
        g = (t, e) => t.trim().split(/\s+/).map(t => w(t, e)).join(" "),
        w = (t, e) => {
            const r = e.loose ? a[c.TILDELOOSE] : a[c.TILDE];
            return t.replace(r, (e, r, n, i, o) => {
                let s;
                return u("tilde", t, e, r, n, i, o), y(r) ? s = "" : y(n) ? s = `>=${r}.0.0 <${+r+1}.0.0-0` : y(i) ? s = `>=${r}.${n}.0 <${r}.${+n+1}.0-0` : o ? (u("replaceTilde pr", o), s = `>=${r}.${n}.${i}-${o} <${r}.${+n+1}.0-0`) : s = `>=${r}.${n}.${i} <${r}.${+n+1}.0-0`, u("tilde return", s), s
            })
        },
        M = (t, e) => t.trim().split(/\s+/).map(t => _(t, e)).join(" "),
        _ = (t, e) => {
            u("caret", t, e);
            const r = e.loose ? a[c.CARETLOOSE] : a[c.CARET],
                n = e.includePrerelease ? "-0" : "";
            return t.replace(r, (e, r, i, o, s) => {
                let h;
                return u("caret", t, e, r, i, o, s), y(r) ? h = "" : y(i) ? h = `>=${r}.0.0${n} <${+r+1}.0.0-0` : y(o) ? h = "0" === r ? `>=${r}.${i}.0${n} <${r}.${+i+1}.0-0` : `>=${r}.${i}.0${n} <${+r+1}.0.0-0` : s ? (u("replaceCaret pr", s), h = "0" === r ? "0" === i ? `>=${r}.${i}.${o}-${s} <${r}.${i}.${+o+1}-0` : `>=${r}.${i}.${o}-${s} <${r}.${+i+1}.0-0` : `>=${r}.${i}.${o}-${s} <${+r+1}.0.0-0`) : (u("no pr"), h = "0" === r ? "0" === i ? `>=${r}.${i}.${o}${n} <${r}.${i}.${+o+1}-0` : `>=${r}.${i}.${o}${n} <${r}.${+i+1}.0-0` : `>=${r}.${i}.${o} <${+r+1}.0.0-0`), u("caret return", h), h
            })
        },
        S = (t, e) => (u("replaceXRanges", t, e), t.split(/\s+/).map(t => E(t, e)).join(" ")),
        E = (t, e) => {
            t = t.trim();
            const r = e.loose ? a[c.XRANGELOOSE] : a[c.XRANGE];
            return t.replace(r, (r, n, i, o, s, h) => {
                u("xRange", t, r, n, i, o, s, h);
                const a = y(i),
                    c = a || y(o),
                    l = c || y(s),
                    f = l;
                return "=" === n && f && (n = ""), h = e.includePrerelease ? "-0" : "", a ? r = ">" === n || "<" === n ? "<0.0.0-0" : "*" : n && f ? (c && (o = 0), s = 0, ">" === n ? (n = ">=", c ? (i = +i + 1, o = 0, s = 0) : (o = +o + 1, s = 0)) : "<=" === n && (n = "<", c ? i = +i + 1 : o = +o + 1), "<" === n && (h = "-0"), r = `${n+i}.${o}.${s}${h}`) : c ? r = `>=${i}.0.0${h} <${+i+1}.0.0-0` : l && (r = `>=${i}.${o}.0${h} <${i}.${+o+1}.0-0`), u("xRange return", r), r
            })
        },
        x = (t, e) => (u("replaceStars", t, e), t.trim().replace(a[c.STAR], "")),
        A = (t, e) => (u("replaceGTE0", t, e), t.trim().replace(a[e.includePrerelease ? c.GTE0PRE : c.GTE0], "")),
        O = t => (e, r, n, i, o, s, u, h, a, c, l, f, d) => `${r=y(n)?"":y(i)?`>=${n}.0.0${t?"-0":""}`:y(o)?`>=${n}.${i}.0${t?"-0":""}`:s?`>=${r}`:`>=${r}${t?"-0":""}`} ${h=y(a)?"":y(c)?`<${+a+1}.0.0-0`:y(l)?`<${a}.${+c+1}.0-0`:f?`<=${a}.${c}.${l}-${f}`:t?`<${a}.${c}.${+l+1}-0`:`<=${h}`}`.trim(),
        I = (t, e, r) => {
            for (let r = 0; r < t.length; r++)
                if (!t[r].test(e)) return !1;
            if (e.prerelease.length && !r.includePrerelease) {
                for (let r = 0; r < t.length; r++)
                    if (u(t[r].semver), t[r].semver !== s.ANY && t[r].semver.prerelease.length > 0) {
                        const n = t[r].semver;
                        if (n.major === e.major && n.minor === e.minor && n.patch === e.patch) return !0
                    } return !1
            }
            return !0
        }
}, function(t, e, r) {
    "use strict";
    const n = r(68),
        i = Symbol("max"),
        o = Symbol("length"),
        s = Symbol("lengthCalculator"),
        u = Symbol("allowStale"),
        h = Symbol("maxAge"),
        a = Symbol("dispose"),
        c = Symbol("noDisposeOnSet"),
        l = Symbol("lruList"),
        f = Symbol("cache"),
        d = Symbol("updateAgeOnGet"),
        p = () => 1;
    const m = (t, e, r) => {
            const n = t[f].get(e);
            if (n) {
                const e = n.value;
                if (v(t, e)) {
                    if (y(t, n), !t[u]) return
                } else r && (t[d] && (n.value.now = Date.now()), t[l].unshiftNode(n));
                return e.value
            }
        },
        v = (t, e) => {
            if (!e || !e.maxAge && !t[h]) return !1;
            const r = Date.now() - e.now;
            return e.maxAge ? r > e.maxAge : t[h] && r > t[h]
        },
        b = t => {
            if (t[o] > t[i])
                for (let e = t[l].tail; t[o] > t[i] && null !== e;) {
                    const r = e.prev;
                    y(t, e), e = r
                }
        },
        y = (t, e) => {
            if (e) {
                const r = e.value;
                t[a] && t[a](r.key, r.value), t[o] -= r.length, t[f].delete(r.key), t[l].removeNode(e)
            }
        };
    class g {
        constructor(t, e, r, n, i) {
            this.key = t, this.value = e, this.length = r, this.now = n, this.maxAge = i || 0
        }
    }
    const w = (t, e, r, n) => {
        let i = r.value;
        v(t, i) && (y(t, r), t[u] || (i = void 0)), i && e.call(n, i.value, i.key, t)
    };
    t.exports = class {
        constructor(t) {
            if ("number" == typeof t && (t = {
                    max: t
                }), t || (t = {}), t.max && ("number" != typeof t.max || t.max < 0)) throw new TypeError("max must be a non-negative number");
            this[i] = t.max || 1 / 0;
            const e = t.length || p;
            if (this[s] = "function" != typeof e ? p : e, this[u] = t.stale || !1, t.maxAge && "number" != typeof t.maxAge) throw new TypeError("maxAge must be a number");
            this[h] = t.maxAge || 0, this[a] = t.dispose, this[c] = t.noDisposeOnSet || !1, this[d] = t.updateAgeOnGet || !1, this.reset()
        }
        set max(t) {
            if ("number" != typeof t || t < 0) throw new TypeError("max must be a non-negative number");
            this[i] = t || 1 / 0, b(this)
        }
        get max() {
            return this[i]
        }
        set allowStale(t) {
            this[u] = !!t
        }
        get allowStale() {
            return this[u]
        }
        set maxAge(t) {
            if ("number" != typeof t) throw new TypeError("maxAge must be a non-negative number");
            this[h] = t, b(this)
        }
        get maxAge() {
            return this[h]
        }
        set lengthCalculator(t) {
            "function" != typeof t && (t = p), t !== this[s] && (this[s] = t, this[o] = 0, this[l].forEach(t => {
                t.length = this[s](t.value, t.key), this[o] += t.length
            })), b(this)
        }
        get lengthCalculator() {
            return this[s]
        }
        get length() {
            return this[o]
        }
        get itemCount() {
            return this[l].length
        }
        rforEach(t, e) {
            e = e || this;
            for (let r = this[l].tail; null !== r;) {
                const n = r.prev;
                w(this, t, r, e), r = n
            }
        }
        forEach(t, e) {
            e = e || this;
            for (let r = this[l].head; null !== r;) {
                const n = r.next;
                w(this, t, r, e), r = n
            }
        }
        keys() {
            return this[l].toArray().map(t => t.key)
        }
        values() {
            return this[l].toArray().map(t => t.value)
        }
        reset() {
            this[a] && this[l] && this[l].length && this[l].forEach(t => this[a](t.key, t.value)), this[f] = new Map, this[l] = new n, this[o] = 0
        }
        dump() {
            return this[l].map(t => !v(this, t) && {
                k: t.key,
                v: t.value,
                e: t.now + (t.maxAge || 0)
            }).toArray().filter(t => t)
        }
        dumpLru() {
            return this[l]
        }
        set(t, e, r) {
            if ((r = r || this[h]) && "number" != typeof r) throw new TypeError("maxAge must be a number");
            const n = r ? Date.now() : 0,
                u = this[s](e, t);
            if (this[f].has(t)) {
                if (u > this[i]) return y(this, this[f].get(t)), !1;
                const s = this[f].get(t).value;
                return this[a] && (this[c] || this[a](t, s.value)), s.now = n, s.maxAge = r, s.value = e, this[o] += u - s.length, s.length = u, this.get(t), b(this), !0
            }
            const d = new g(t, e, u, n, r);
            return d.length > this[i] ? (this[a] && this[a](t, e), !1) : (this[o] += d.length, this[l].unshift(d), this[f].set(t, this[l].head), b(this), !0)
        }
        has(t) {
            if (!this[f].has(t)) return !1;
            const e = this[f].get(t).value;
            return !v(this, e)
        }
        get(t) {
            return m(this, t, !0)
        }
        peek(t) {
            return m(this, t, !1)
        }
        pop() {
            const t = this[l].tail;
            return t ? (y(this, t), t.value) : null
        }
        del(t) {
            y(this, this[f].get(t))
        }
        load(t) {
            this.reset();
            const e = Date.now();
            for (let r = t.length - 1; r >= 0; r--) {
                const n = t[r],
                    i = n.e || 0;
                if (0 === i) this.set(n.k, n.v);
                else {
                    const t = i - e;
                    t > 0 && this.set(n.k, n.v, t)
                }
            }
        }
        prune() {
            this[f].forEach((t, e) => m(this, e, !1))
        }
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        var e = this;
        if (e instanceof n || (e = new n), e.tail = null, e.head = null, e.length = 0, t && "function" == typeof t.forEach) t.forEach((function(t) {
            e.push(t)
        }));
        else if (arguments.length > 0)
            for (var r = 0, i = arguments.length; r < i; r++) e.push(arguments[r]);
        return e
    }

    function i(t, e, r) {
        var n = e === t.head ? new u(r, null, e, t) : new u(r, e, e.next, t);
        return null === n.next && (t.tail = n), null === n.prev && (t.head = n), t.length++, n
    }

    function o(t, e) {
        t.tail = new u(e, t.tail, null, t), t.head || (t.head = t.tail), t.length++
    }

    function s(t, e) {
        t.head = new u(e, null, t.head, t), t.tail || (t.tail = t.head), t.length++
    }

    function u(t, e, r, n) {
        if (!(this instanceof u)) return new u(t, e, r, n);
        this.list = n, this.value = t, e ? (e.next = this, this.prev = e) : this.prev = null, r ? (r.prev = this, this.next = r) : this.next = null
    }
    t.exports = n, n.Node = u, n.create = n, n.prototype.removeNode = function(t) {
        if (t.list !== this) throw new Error("removing node which does not belong to this list");
        var e = t.next,
            r = t.prev;
        return e && (e.prev = r), r && (r.next = e), t === this.head && (this.head = e), t === this.tail && (this.tail = r), t.list.length--, t.next = null, t.prev = null, t.list = null, e
    }, n.prototype.unshiftNode = function(t) {
        if (t !== this.head) {
            t.list && t.list.removeNode(t);
            var e = this.head;
            t.list = this, t.next = e, e && (e.prev = t), this.head = t, this.tail || (this.tail = t), this.length++
        }
    }, n.prototype.pushNode = function(t) {
        if (t !== this.tail) {
            t.list && t.list.removeNode(t);
            var e = this.tail;
            t.list = this, t.prev = e, e && (e.next = t), this.tail = t, this.head || (this.head = t), this.length++
        }
    }, n.prototype.push = function() {
        for (var t = 0, e = arguments.length; t < e; t++) o(this, arguments[t]);
        return this.length
    }, n.prototype.unshift = function() {
        for (var t = 0, e = arguments.length; t < e; t++) s(this, arguments[t]);
        return this.length
    }, n.prototype.pop = function() {
        if (this.tail) {
            var t = this.tail.value;
            return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, t
        }
    }, n.prototype.shift = function() {
        if (this.head) {
            var t = this.head.value;
            return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, t
        }
    }, n.prototype.forEach = function(t, e) {
        e = e || this;
        for (var r = this.head, n = 0; null !== r; n++) t.call(e, r.value, n, this), r = r.next
    }, n.prototype.forEachReverse = function(t, e) {
        e = e || this;
        for (var r = this.tail, n = this.length - 1; null !== r; n--) t.call(e, r.value, n, this), r = r.prev
    }, n.prototype.get = function(t) {
        for (var e = 0, r = this.head; null !== r && e < t; e++) r = r.next;
        if (e === t && null !== r) return r.value
    }, n.prototype.getReverse = function(t) {
        for (var e = 0, r = this.tail; null !== r && e < t; e++) r = r.prev;
        if (e === t && null !== r) return r.value
    }, n.prototype.map = function(t, e) {
        e = e || this;
        for (var r = new n, i = this.head; null !== i;) r.push(t.call(e, i.value, this)), i = i.next;
        return r
    }, n.prototype.mapReverse = function(t, e) {
        e = e || this;
        for (var r = new n, i = this.tail; null !== i;) r.push(t.call(e, i.value, this)), i = i.prev;
        return r
    }, n.prototype.reduce = function(t, e) {
        var r, n = this.head;
        if (arguments.length > 1) r = e;
        else {
            if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
            n = this.head.next, r = this.head.value
        }
        for (var i = 0; null !== n; i++) r = t(r, n.value, i), n = n.next;
        return r
    }, n.prototype.reduceReverse = function(t, e) {
        var r, n = this.tail;
        if (arguments.length > 1) r = e;
        else {
            if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
            n = this.tail.prev, r = this.tail.value
        }
        for (var i = this.length - 1; null !== n; i--) r = t(r, n.value, i), n = n.prev;
        return r
    }, n.prototype.toArray = function() {
        for (var t = new Array(this.length), e = 0, r = this.head; null !== r; e++) t[e] = r.value, r = r.next;
        return t
    }, n.prototype.toArrayReverse = function() {
        for (var t = new Array(this.length), e = 0, r = this.tail; null !== r; e++) t[e] = r.value, r = r.prev;
        return t
    }, n.prototype.slice = function(t, e) {
        (e = e || this.length) < 0 && (e += this.length), (t = t || 0) < 0 && (t += this.length);
        var r = new n;
        if (e < t || e < 0) return r;
        t < 0 && (t = 0), e > this.length && (e = this.length);
        for (var i = 0, o = this.head; null !== o && i < t; i++) o = o.next;
        for (; null !== o && i < e; i++, o = o.next) r.push(o.value);
        return r
    }, n.prototype.sliceReverse = function(t, e) {
        (e = e || this.length) < 0 && (e += this.length), (t = t || 0) < 0 && (t += this.length);
        var r = new n;
        if (e < t || e < 0) return r;
        t < 0 && (t = 0), e > this.length && (e = this.length);
        for (var i = this.length, o = this.tail; null !== o && i > e; i--) o = o.prev;
        for (; null !== o && i > t; i--, o = o.prev) r.push(o.value);
        return r
    }, n.prototype.splice = function(t, e, ...r) {
        t > this.length && (t = this.length - 1), t < 0 && (t = this.length + t);
        for (var n = 0, o = this.head; null !== o && n < t; n++) o = o.next;
        var s = [];
        for (n = 0; o && n < e; n++) s.push(o.value), o = this.removeNode(o);
        null === o && (o = this.tail), o !== this.head && o !== this.tail && (o = o.prev);
        for (n = 0; n < r.length; n++) o = i(this, o, r[n]);
        return s
    }, n.prototype.reverse = function() {
        for (var t = this.head, e = this.tail, r = t; null !== r; r = r.prev) {
            var n = r.prev;
            r.prev = r.next, r.next = n
        }
        return this.head = e, this.tail = t, this
    };
    try {
        r(69)(n)
    } catch (t) {}
}, function(t, e, r) {
    "use strict";
    t.exports = function(t) {
        t.prototype[Symbol.iterator] = function*() {
            for (let t = this.head; t; t = t.next) yield t.value
        }
    }
}, function(t, e, r) {
    const n = r(66);
    t.exports = (t, e, r) => {
        try {
            e = new n(e, r)
        } catch (t) {
            return !1
        }
        return e.test(t)
    }
}, function(t, e, r) {
    const n = r(66);
    t.exports = (t, e) => new n(t, e).set.map(t => t.map(t => t.value).join(" ").trim().split(" "))
}, function(t, e, r) {
    const n = r(39),
        i = r(66);
    t.exports = (t, e, r) => {
        let o = null,
            s = null,
            u = null;
        try {
            u = new i(e, r)
        } catch (t) {
            return null
        }
        return t.forEach(t => {
            u.test(t) && (o && -1 !== s.compare(t) || (o = t, s = new n(o, r)))
        }), o
    }
}, function(t, e, r) {
    const n = r(39),
        i = r(66);
    t.exports = (t, e, r) => {
        let o = null,
            s = null,
            u = null;
        try {
            u = new i(e, r)
        } catch (t) {
            return null
        }
        return t.forEach(t => {
            u.test(t) && (o && 1 !== s.compare(t) || (o = t, s = new n(o, r)))
        }), o
    }
}, function(t, e, r) {
    const n = r(39),
        i = r(66),
        o = r(58);
    t.exports = (t, e) => {
        t = new i(t, e);
        let r = new n("0.0.0");
        if (t.test(r)) return r;
        if (r = new n("0.0.0-0"), t.test(r)) return r;
        r = null;
        for (let e = 0; e < t.set.length; ++e) {
            const i = t.set[e];
            let s = null;
            i.forEach(t => {
                const e = new n(t.semver.version);
                switch (t.operator) {
                    case ">":
                        0 === e.prerelease.length ? e.patch++ : e.prerelease.push(0), e.raw = e.format();
                    case "":
                    case ">=":
                        s && !o(e, s) || (s = e);
                        break;
                    case "<":
                    case "<=":
                        break;
                    default:
                        throw new Error(`Unexpected operation: ${t.operator}`)
                }
            }), !s || r && !o(r, s) || (r = s)
        }
        return r && t.test(r) ? r : null
    }
}, function(t, e, r) {
    const n = r(66);
    t.exports = (t, e) => {
        try {
            return new n(t, e).range || "*"
        } catch (t) {
            return null
        }
    }
}, function(t, e, r) {
    const n = r(39),
        i = r(65),
        {
            ANY: o
        } = i,
        s = r(66),
        u = r(70),
        h = r(58),
        a = r(59),
        c = r(62),
        l = r(61);
    t.exports = (t, e, r, f) => {
        let d, p, m, v, b;
        switch (t = new n(t, f), e = new s(e, f), r) {
            case ">":
                d = h, p = c, m = a, v = ">", b = ">=";
                break;
            case "<":
                d = a, p = l, m = h, v = "<", b = "<=";
                break;
            default:
                throw new TypeError('Must provide a hilo val of "<" or ">"')
        }
        if (u(t, e, f)) return !1;
        for (let r = 0; r < e.set.length; ++r) {
            const n = e.set[r];
            let s = null,
                u = null;
            if (n.forEach(t => {
                    t.semver === o && (t = new i(">=0.0.0")), s = s || t, u = u || t, d(t.semver, s.semver, f) ? s = t : m(t.semver, u.semver, f) && (u = t)
                }), s.operator === v || s.operator === b) return !1;
            if ((!u.operator || u.operator === v) && p(t, u.semver)) return !1;
            if (u.operator === b && m(t, u.semver)) return !1
        }
        return !0
    }
}, function(t, e, r) {
    const n = r(76);
    t.exports = (t, e, r) => n(t, e, ">", r)
}, function(t, e, r) {
    const n = r(76);
    t.exports = (t, e, r) => n(t, e, "<", r)
}, function(t, e, r) {
    const n = r(66);
    t.exports = (t, e, r) => (t = new n(t, r), e = new n(e, r), t.intersects(e))
}, function(t, e, r) {
    const n = r(70),
        i = r(48);
    t.exports = (t, e, r) => {
        const o = [];
        let s = null,
            u = null;
        const h = t.sort((t, e) => i(t, e, r));
        for (const t of h) {
            n(t, e, r) ? (u = t, s || (s = t)) : (u && o.push([s, u]), u = null, s = null)
        }
        s && o.push([s, null]);
        const a = [];
        for (const [t, e] of o) t === e ? a.push(t) : e || t !== h[0] ? e ? t === h[0] ? a.push(`<=${e}`) : a.push(`${t} - ${e}`) : a.push(`>=${t}`) : a.push("*");
        const c = a.join(" || "),
            l = "string" == typeof e.raw ? e.raw : String(e);
        return c.length < l.length ? c : e
    }
}, function(t, e, r) {
    const n = r(66),
        i = r(65),
        {
            ANY: o
        } = i,
        s = r(70),
        u = r(48),
        h = (t, e, r) => {
            if (t === e) return !0;
            if (1 === t.length && t[0].semver === o) {
                if (1 === e.length && e[0].semver === o) return !0;
                t = r.includePrerelease ? [new i(">=0.0.0-0")] : [new i(">=0.0.0")]
            }
            if (1 === e.length && e[0].semver === o) {
                if (r.includePrerelease) return !0;
                e = [new i(">=0.0.0")]
            }
            const n = new Set;
            let h, l, f, d, p, m, v;
            for (const e of t) ">" === e.operator || ">=" === e.operator ? h = a(h, e, r) : "<" === e.operator || "<=" === e.operator ? l = c(l, e, r) : n.add(e.semver);
            if (n.size > 1) return null;
            if (h && l) {
                if (f = u(h.semver, l.semver, r), f > 0) return null;
                if (0 === f && (">=" !== h.operator || "<=" !== l.operator)) return null
            }
            for (const t of n) {
                if (h && !s(t, String(h), r)) return null;
                if (l && !s(t, String(l), r)) return null;
                for (const n of e)
                    if (!s(t, String(n), r)) return !1;
                return !0
            }
            let b = !(!l || r.includePrerelease || !l.semver.prerelease.length) && l.semver,
                y = !(!h || r.includePrerelease || !h.semver.prerelease.length) && h.semver;
            b && 1 === b.prerelease.length && "<" === l.operator && 0 === b.prerelease[0] && (b = !1);
            for (const t of e) {
                if (v = v || ">" === t.operator || ">=" === t.operator, m = m || "<" === t.operator || "<=" === t.operator, h)
                    if (y && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === y.major && t.semver.minor === y.minor && t.semver.patch === y.patch && (y = !1), ">" === t.operator || ">=" === t.operator) {
                        if (d = a(h, t, r), d === t && d !== h) return !1
                    } else if (">=" === h.operator && !s(h.semver, String(t), r)) return !1;
                if (l)
                    if (b && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === b.major && t.semver.minor === b.minor && t.semver.patch === b.patch && (b = !1), "<" === t.operator || "<=" === t.operator) {
                        if (p = c(l, t, r), p === t && p !== l) return !1
                    } else if ("<=" === l.operator && !s(l.semver, String(t), r)) return !1;
                if (!t.operator && (l || h) && 0 !== f) return !1
            }
            return !(h && m && !l && 0 !== f) && (!(l && v && !h && 0 !== f) && (!y && !b))
        },
        a = (t, e, r) => {
            if (!t) return e;
            const n = u(t.semver, e.semver, r);
            return n > 0 ? t : n < 0 || ">" === e.operator && ">=" === t.operator ? e : t
        },
        c = (t, e, r) => {
            if (!t) return e;
            const n = u(t.semver, e.semver, r);
            return n < 0 ? t : n > 0 || "<" === e.operator && "<=" === t.operator ? e : t
        };
    t.exports = (t, e, r = {}) => {
        if (t === e) return !0;
        t = new n(t, r), e = new n(e, r);
        let i = !1;
        t: for (const n of t.set) {
            for (const t of e.set) {
                const e = h(n, t, r);
                if (i = i || null !== e, e) continue t
            }
            if (i) return !1
        }
        return !0
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "log", (function() {
        return o
    })), r.d(e, "listen", (function() {
        return s
    }));
    let n = 0;
    const i = [],
        o = (t, e, r) => {
            const o = {
                type: t,
                id: String(++n),
                date: new Date
            };
            e && (o.message = e), r && (o.data = r),
                function(t) {
                    for (let e = 0; e < i.length; e++) try {
                        i[e](t)
                    } catch (t) {
                        console.error(t)
                    }
                }(o)
        },
        s = t => (i.push(t), () => {
            const e = i.indexOf(t); - 1 !== e && (i[e] = i[i.length - 1], i.pop())
        });
    "undefined" != typeof window && (window.__ledgerLogsListen = s)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "requestLedgerDevice", (function() {
        return o
    })), r.d(e, "getLedgerDevices", (function() {
        return s
    })), r.d(e, "getFirstLedgerDevice", (function() {
        return u
    })), r.d(e, "isSupported", (function() {
        return h
    }));
    var n = r(33);
    const i = [{
        vendorId: n.ledgerUSBVendorId
    }];
    async function o() {
        return await navigator.usb.requestDevice({
            filters: i
        })
    }
    async function s() {
        return (await navigator.usb.getDevices()).filter(t => t.vendorId === n.ledgerUSBVendorId)
    }
    async function u() {
        const t = await s();
        return t.length > 0 ? t[0] : o()
    }
    const h = () => Promise.resolve(!!navigator && !!navigator.usb && "function" == typeof navigator.usb.getDevices)
}, function(t, e, r) {
    "use strict";
    r.r(e),
        function(t, n) {
            r.d(e, "default", (function() {
                return p
            }));
            var i = r(29),
                o = r(32),
                s = r.n(o),
                u = r(33),
                h = r(82),
                a = r(31);
            const c = [{
                    vendorId: u.ledgerUSBVendorId
                }],
                l = () => {
                    const {
                        hid: t
                    } = navigator;
                    if (!t) throw new a.TransportError("navigator.hid is not supported", "HIDNotSupported");
                    return t
                };
            async function f() {
                const t = await l().requestDevice({
                    filters: c
                });
                return Array.isArray(t) ? t : [t]
            }
            async function d() {
                return (await l().getDevices()).filter(t => t.vendorId === u.ledgerUSBVendorId)
            }
            class p extends i.default {
                constructor(t) {
                    super(), this.device = void 0, this.deviceModel = void 0, this.channel = Math.floor(65535 * Math.random()), this.packetSize = 64, this.inputs = [], this.inputCallback = void 0, this.read = () => this.inputs.length ? Promise.resolve(this.inputs.shift()) : new Promise(t => {
                        this.inputCallback = t
                    }), this.onInputReport = t => {
                        const e = n.from(t.data.buffer);
                        this.inputCallback ? (this.inputCallback(e), this.inputCallback = null) : this.inputs.push(e)
                    }, this._disconnectEmitted = !1, this._emitDisconnect = t => {
                        this._disconnectEmitted || (this._disconnectEmitted = !0, this.emit("disconnect", t))
                    }, this.exchange = t => this.exchangeAtomicImpl(async () => {
                        const {
                            channel: e,
                            packetSize: r
                        } = this;
                        Object(h.log)("apdu", "=> " + t.toString("hex"));
                        const n = s()(e, r),
                            i = n.makeBlocks(t);
                        for (let t = 0; t < i.length; t++) await this.device.sendReport(0, i[t]);
                        let o, u;
                        for (; !(o = n.getReducedResult(u));) {
                            const t = await this.read();
                            u = n.reduceResponse(u, t)
                        }
                        return Object(h.log)("apdu", "<= " + o.toString("hex")), o
                    }).catch(t => {
                        if (t && t.message && t.message.includes("write")) throw this._emitDisconnect(t), new a.DisconnectedDeviceDuringOperation(t.message);
                        throw t
                    }), this.device = t, this.deviceModel = Object(u.identifyUSBProductId)(t.productId), t.addEventListener("inputreport", this.onInputReport)
                }
                static async request() {
                    const [t] = await f();
                    return p.open(t)
                }
                static async openConnected() {
                    const t = await d();
                    return 0 === t.length ? null : p.open(t[0])
                }
                static async open(t) {
                    await t.open();
                    const e = new p(t),
                        r = n => {
                            t === n.device && (l().removeEventListener("disconnect", r), e._emitDisconnect(new a.DisconnectedDevice))
                        };
                    return l().addEventListener("disconnect", r), e
                }
                async close() {
                    await this.exchangeBusyPromise, this.device.removeEventListener("inputreport", this.onInputReport), await this.device.close()
                }
                setScrambleKey() {}
            }
            p.isSupported = () => Promise.resolve(!(!t.navigator || !t.navigator.hid)), p.list = d, p.listen = t => {
                let e = !1;
                return async function() {
                    const t = await d();
                    return t.length > 0 ? t[0] : (await f())[0]
                }().then(r => {
                    if (r) {
                        if (!e) {
                            const e = Object(u.identifyUSBProductId)(r.productId);
                            t.next({
                                type: "add",
                                descriptor: r,
                                deviceModel: e
                            }), t.complete()
                        }
                    } else t.error(new a.TransportOpenUserCancelled("Access denied to use Ledger device"))
                }, e => {
                    t.error(new a.TransportOpenUserCancelled(e.message))
                }), {
                    unsubscribe: function() {
                        e = !0
                    }
                }
            }
        }.call(this, r(3), r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    r.r(e),
        function(t) {
            r.d(e, "default", (function() {
                return b
            }));
            var n = r(29),
                i = r(31),
                o = r(33),
                s = r(86),
                u = r(190),
                h = r(82),
                a = r(87),
                c = r(191),
                l = r(289);
            const f = () => {
                    const {
                        bluetooth: t
                    } = navigator;
                    if (void 0 === t) throw new Error("web bluetooth not supported");
                    return t
                },
                d = () => a.Observable.create(t => {
                    const e = f(),
                        r = e => {
                            t.next(e.value)
                        };
                    e.addEventListener("availabilitychanged", r);
                    let n = !1;
                    return e.getAvailability().then(e => {
                        n || t.next(e)
                    }), () => {
                        n = !0, e.removeEventListener("availabilitychanged", r)
                    }
                }),
                p = {},
                m = () => ({
                    filters: Object(o.getBluetoothServiceUuids)().map(t => ({
                        services: [t]
                    }))
                });
            async function v(t, e) {
                let r;
                if ("string" == typeof t) {
                    if (p[t]) return Object(h.log)("ble-verbose", "Transport in cache, using that."), p[t];
                    const e = f();
                    r = await e.requestDevice(m())
                } else r = t;
                r.gatt.connected || (Object(h.log)("ble-verbose", "not connected. connecting..."), await r.gatt.connect());
                const [n, s] = await (async t => {
                    if (!t.gatt) throw new Error("bluetooth gatt not found");
                    const [e] = await t.gatt.getPrimaryServices();
                    if (!e) throw new Error("bluetooth service not found");
                    const r = Object(o.getInfosForServiceUuid)(e.uuid);
                    if (!r) throw new Error("bluetooth service infos not found");
                    return [e, r]
                })(r), {
                    deviceModel: u,
                    writeUuid: a,
                    notifyUuid: d
                } = s, [y, g] = await Promise.all([n.getCharacteristic(a), n.getCharacteristic(d)]), w = Object(l.monitorCharacteristic)(g).pipe(Object(c.tap)(t => {
                    Object(h.log)("ble-frame", "<= " + t.toString("hex"))
                }), Object(c.share)()), M = w.subscribe(), _ = new b(r, y, w, u);
                if (!r.gatt.connected) throw new i.DisconnectedDevice;
                p[_.id] = _;
                const S = t => {
                    console.log("onDisconnect!", t), delete p[_.id], _.notYetDisconnected = !1, M.unsubscribe(), r.removeEventListener("gattserverdisconnected", S), Object(h.log)("ble-verbose", `BleTransport(${_.id}) disconnected`), _.emit("disconnect", t)
                };
                r.addEventListener("gattserverdisconnected", S);
                let E = Date.now();
                try {
                    await _.inferMTU()
                } finally {
                    Date.now() - E < 1e3 && (e = !1), e && (await r.gatt.disconnect(), await new Promise(t => setTimeout(t, 4e3)))
                }
                return e ? v(r, !1) : _
            }
            class b extends n.default {
                static listen(t) {
                    let e;
                    return Object(h.log)("ble-verbose", "listen..."), f().requestDevice(m()).then(async r => {
                        e || (t.next({
                            type: "add",
                            descriptor: r
                        }), t.complete())
                    }, e => {
                        t.error(new i.TransportOpenUserCancelled(e.message))
                    }), {
                        unsubscribe: function() {
                            e = !0
                        }
                    }
                }
                static async open(t) {
                    return v(t, !0)
                }
                constructor(t, e, r, n) {
                    super(), this.id = void 0, this.device = void 0, this.mtuSize = 20, this.writeCharacteristic = void 0, this.notifyObservable = void 0, this.notYetDisconnected = !0, this.deviceModel = void 0, this.exchange = t => this.exchangeAtomicImpl(async () => {
                        try {
                            const e = t.toString("hex");
                            Object(h.log)("apdu", `=> ${e}`);
                            const r = await Object(a.merge)(this.notifyObservable.pipe(u.receiveAPDU), Object(s.sendAPDU)(this.write, t, this.mtuSize)).toPromise(),
                                n = r.toString("hex");
                            return Object(h.log)("apdu", `<= ${n}`), r
                        } catch (t) {
                            throw Object(h.log)("ble-error", "exchange got " + String(t)), this.notYetDisconnected && this.device.gatt.disconnect(), t
                        }
                    }), this.write = async t => {
                        Object(h.log)("ble-frame", "=> " + t.toString("hex")), await this.writeCharacteristic.writeValue(t)
                    }, this.id = t.id, this.device = t, this.writeCharacteristic = e, this.notifyObservable = r, this.deviceModel = n, Object(h.log)("ble-verbose", `BleTransport(${String(this.id)}) new instance`)
                }
                async inferMTU() {
                    let e = 23;
                    if (await this.exchangeAtomicImpl(async () => {
                            try {
                                e = await Object(a.merge)(this.notifyObservable.pipe(Object(c.first)(t => 8 === t.readUInt8(0)), Object(c.map)(t => t.readUInt8(5))), Object(a.defer)(() => Object(a.from)(this.write(t.from([8, 0, 0, 0, 0])))).pipe(Object(c.ignoreElements)())).toPromise() + 3
                            } catch (t) {
                                throw Object(h.log)("ble-error", "inferMTU got " + String(t)), this.device.gatt.disconnect(), t
                            }
                        }), e > 23) {
                        const t = e - 3;
                        Object(h.log)("ble-verbose", `BleTransport(${String(this.id)}) mtu set to ${String(t)}`), this.mtuSize = t
                    }
                    return this.mtuSize
                }
                setScrambleKey() {}
                async close() {
                    this.exchangeBusyPromise && await this.exchangeBusyPromise
                }
            }
            b.isSupported = () => Promise.resolve().then(f).then(() => !0, () => !1), b.observeAvailability = t => d.subscribe(t), b.list = () => Promise.resolve([]), b.disconnect = async t => {
                Object(h.log)("ble-verbose", `user disconnect(${t})`);
                const e = p[t];
                e && e.device.gatt.disconnect()
            }
        }.call(this, r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    (function(t) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.sendAPDU = void 0;
        var n = r(87),
            i = r(82);
        e.sendAPDU = (e, r, o) => {
            const s = function(t, e) {
                const r = [];
                for (let n = 0, i = e(0); n < t.length; n += i, i = e(n)) r.push(t.slice(n, n + i));
                return r
            }(r, t => o - (0 === t ? 5 : 3)).map((e, n) => {
                const i = t.alloc(0 === n ? 5 : 3);
                return i.writeUInt8(5, 0), i.writeUInt16BE(n, 1), 0 === n && i.writeUInt16BE(r.length, 3), t.concat([i, e])
            });
            return n.Observable.create(t => {
                let r = !1;
                (async function() {
                    for (const t of s) {
                        if (r) return;
                        await e(t)
                    }
                })().then(() => {
                    r = !0, t.complete()
                }, e => {
                    r = !0, (0, i.log)("ble-error", "sendAPDU failure " + String(e)), t.error(e)
                });
                return () => {
                    r || ((0, i.log)("ble-verbose", "sendAPDU interruption"), r = !0)
                }
            })
        }
    }).call(this, r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    r.r(e);
    var n = r(88);
    r.d(e, "Observable", (function() {
        return n.Observable
    }));
    var i = r(105);
    r.d(e, "ConnectableObservable", (function() {
        return i.ConnectableObservable
    }));
    var o = r(110);
    r.d(e, "GroupedObservable", (function() {
        return o.GroupedObservable
    }));
    var s = r(102);
    r.d(e, "observable", (function() {
        return s.observable
    }));
    var u = r(106);
    r.d(e, "Subject", (function() {
        return u.Subject
    }));
    var h = r(111);
    r.d(e, "BehaviorSubject", (function() {
        return h.BehaviorSubject
    }));
    var a = r(112);
    r.d(e, "ReplaySubject", (function() {
        return a.ReplaySubject
    }));
    var c = r(129);
    r.d(e, "AsyncSubject", (function() {
        return c.AsyncSubject
    }));
    var l = r(130);
    r.d(e, "asap", (function() {
        return l.asap
    })), r.d(e, "asapScheduler", (function() {
        return l.asapScheduler
    }));
    var f = r(134);
    r.d(e, "async", (function() {
        return f.async
    })), r.d(e, "asyncScheduler", (function() {
        return f.asyncScheduler
    }));
    var d = r(113);
    r.d(e, "queue", (function() {
        return d.queue
    })), r.d(e, "queueScheduler", (function() {
        return d.queueScheduler
    }));
    var p = r(135);
    r.d(e, "animationFrame", (function() {
        return p.animationFrame
    })), r.d(e, "animationFrameScheduler", (function() {
        return p.animationFrameScheduler
    }));
    var m = r(138);
    r.d(e, "VirtualTimeScheduler", (function() {
        return m.VirtualTimeScheduler
    })), r.d(e, "VirtualAction", (function() {
        return m.VirtualAction
    }));
    var v = r(119);
    r.d(e, "Scheduler", (function() {
        return v.Scheduler
    }));
    var b = r(96);
    r.d(e, "Subscription", (function() {
        return b.Subscription
    }));
    var y = r(90);
    r.d(e, "Subscriber", (function() {
        return y.Subscriber
    }));
    var g = r(121);
    r.d(e, "Notification", (function() {
        return g.Notification
    })), r.d(e, "NotificationKind", (function() {
        return g.NotificationKind
    }));
    var w = r(103);
    r.d(e, "pipe", (function() {
        return w.pipe
    }));
    var M = r(139);
    r.d(e, "noop", (function() {
        return M.noop
    }));
    var _ = r(104);
    r.d(e, "identity", (function() {
        return _.identity
    }));
    var S = r(140);
    r.d(e, "isObservable", (function() {
        return S.isObservable
    }));
    var E = r(141);
    r.d(e, "ArgumentOutOfRangeError", (function() {
        return E.ArgumentOutOfRangeError
    }));
    var x = r(142);
    r.d(e, "EmptyError", (function() {
        return x.EmptyError
    }));
    var A = r(107);
    r.d(e, "ObjectUnsubscribedError", (function() {
        return A.ObjectUnsubscribedError
    }));
    var O = r(99);
    r.d(e, "UnsubscriptionError", (function() {
        return O.UnsubscriptionError
    }));
    var I = r(143);
    r.d(e, "TimeoutError", (function() {
        return I.TimeoutError
    }));
    var T = r(144);
    r.d(e, "bindCallback", (function() {
        return T.bindCallback
    }));
    var N = r(146);
    r.d(e, "bindNodeCallback", (function() {
        return N.bindNodeCallback
    }));
    var R = r(147);
    r.d(e, "combineLatest", (function() {
        return R.combineLatest
    }));
    var B = r(158);
    r.d(e, "concat", (function() {
        return B.concat
    }));
    var j = r(170);
    r.d(e, "defer", (function() {
        return j.defer
    }));
    var C = r(122);
    r.d(e, "empty", (function() {
        return C.empty
    }));
    var D = r(171);
    r.d(e, "forkJoin", (function() {
        return D.forkJoin
    }));
    var U = r(162);
    r.d(e, "from", (function() {
        return U.from
    }));
    var L = r(172);
    r.d(e, "fromEvent", (function() {
        return L.fromEvent
    }));
    var k = r(173);
    r.d(e, "fromEventPattern", (function() {
        return k.fromEventPattern
    }));
    var P = r(174);
    r.d(e, "generate", (function() {
        return P.generate
    }));
    var F = r(175);
    r.d(e, "iif", (function() {
        return F.iif
    }));
    var $ = r(176);
    r.d(e, "interval", (function() {
        return $.interval
    }));
    var V = r(178);
    r.d(e, "merge", (function() {
        return V.merge
    }));
    var q = r(179);
    r.d(e, "never", (function() {
        return q.never
    }));
    var z = r(123);
    r.d(e, "of", (function() {
        return z.of
    }));
    var Y = r(180);
    r.d(e, "onErrorResumeNext", (function() {
        return Y.onErrorResumeNext
    }));
    var W = r(181);
    r.d(e, "pairs", (function() {
        return W.pairs
    }));
    var G = r(182);
    r.d(e, "partition", (function() {
        return G.partition
    }));
    var Z = r(185);
    r.d(e, "race", (function() {
        return Z.race
    }));
    var H = r(186);
    r.d(e, "range", (function() {
        return H.range
    }));
    var K = r(128);
    r.d(e, "throwError", (function() {
        return K.throwError
    }));
    var X = r(187);
    r.d(e, "timer", (function() {
        return X.timer
    }));
    var Q = r(188);
    r.d(e, "using", (function() {
        return Q.using
    }));
    var J = r(189);
    r.d(e, "zip", (function() {
        return J.zip
    }));
    var tt = r(163);
    r.d(e, "scheduled", (function() {
        return tt.scheduled
    })), r.d(e, "EMPTY", (function() {
        return C.EMPTY
    })), r.d(e, "NEVER", (function() {
        return q.NEVER
    }));
    var et = r(94);
    r.d(e, "config", (function() {
        return et.config
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "Observable", (function() {
        return h
    }));
    var n = r(89),
        i = r(101),
        o = r(102),
        s = r(103),
        u = r(94),
        h = function() {
            function t(t) {
                this._isScalar = !1, t && (this._subscribe = t)
            }
            return t.prototype.lift = function(e) {
                var r = new t;
                return r.source = this, r.operator = e, r
            }, t.prototype.subscribe = function(t, e, r) {
                var n = this.operator,
                    o = Object(i.toSubscriber)(t, e, r);
                if (n ? o.add(n.call(o, this.source)) : o.add(this.source || u.config.useDeprecatedSynchronousErrorHandling && !o.syncErrorThrowable ? this._subscribe(o) : this._trySubscribe(o)), u.config.useDeprecatedSynchronousErrorHandling && o.syncErrorThrowable && (o.syncErrorThrowable = !1, o.syncErrorThrown)) throw o.syncErrorValue;
                return o
            }, t.prototype._trySubscribe = function(t) {
                try {
                    return this._subscribe(t)
                } catch (e) {
                    u.config.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e), Object(n.canReportError)(t) ? t.error(e) : console.warn(e)
                }
            }, t.prototype.forEach = function(t, e) {
                var r = this;
                return new(e = a(e))((function(e, n) {
                    var i;
                    i = r.subscribe((function(e) {
                        try {
                            t(e)
                        } catch (t) {
                            n(t), i && i.unsubscribe()
                        }
                    }), n, e)
                }))
            }, t.prototype._subscribe = function(t) {
                var e = this.source;
                return e && e.subscribe(t)
            }, t.prototype[o.observable] = function() {
                return this
            }, t.prototype.pipe = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return 0 === t.length ? this : Object(s.pipeFromArray)(t)(this)
            }, t.prototype.toPromise = function(t) {
                var e = this;
                return new(t = a(t))((function(t, r) {
                    var n;
                    e.subscribe((function(t) {
                        return n = t
                    }), (function(t) {
                        return r(t)
                    }), (function() {
                        return t(n)
                    }))
                }))
            }, t.create = function(e) {
                return new t(e)
            }, t
        }();

    function a(t) {
        if (t || (t = u.config.Promise || Promise), !t) throw new Error("no Promise impl found");
        return t
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "canReportError", (function() {
        return i
    }));
    var n = r(90);

    function i(t) {
        for (; t;) {
            var e = t,
                r = e.closed,
                i = e.destination,
                o = e.isStopped;
            if (r || o) return !1;
            t = i && i instanceof n.Subscriber ? i : null
        }
        return !0
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "Subscriber", (function() {
        return c
    })), r.d(e, "SafeSubscriber", (function() {
        return l
    }));
    var n = r(91),
        i = r(92),
        o = r(93),
        s = r(96),
        u = r(100),
        h = r(94),
        a = r(95),
        c = function(t) {
            function e(r, n, i) {
                var s = t.call(this) || this;
                switch (s.syncErrorValue = null, s.syncErrorThrown = !1, s.syncErrorThrowable = !1, s.isStopped = !1, arguments.length) {
                    case 0:
                        s.destination = o.empty;
                        break;
                    case 1:
                        if (!r) {
                            s.destination = o.empty;
                            break
                        }
                        if ("object" == typeof r) {
                            r instanceof e ? (s.syncErrorThrowable = r.syncErrorThrowable, s.destination = r, r.add(s)) : (s.syncErrorThrowable = !0, s.destination = new l(s, r));
                            break
                        }
                    default:
                        s.syncErrorThrowable = !0, s.destination = new l(s, r, n, i)
                }
                return s
            }
            return n.__extends(e, t), e.prototype[u.rxSubscriber] = function() {
                return this
            }, e.create = function(t, r, n) {
                var i = new e(t, r, n);
                return i.syncErrorThrowable = !1, i
            }, e.prototype.next = function(t) {
                this.isStopped || this._next(t)
            }, e.prototype.error = function(t) {
                this.isStopped || (this.isStopped = !0, this._error(t))
            }, e.prototype.complete = function() {
                this.isStopped || (this.isStopped = !0, this._complete())
            }, e.prototype.unsubscribe = function() {
                this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this))
            }, e.prototype._next = function(t) {
                this.destination.next(t)
            }, e.prototype._error = function(t) {
                this.destination.error(t), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.destination.complete(), this.unsubscribe()
            }, e.prototype._unsubscribeAndRecycle = function() {
                var t = this._parentOrParents;
                return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
            }, e
        }(s.Subscription),
        l = function(t) {
            function e(e, r, n, s) {
                var u, h = t.call(this) || this;
                h._parentSubscriber = e;
                var a = h;
                return Object(i.isFunction)(r) ? u = r : r && (u = r.next, n = r.error, s = r.complete, r !== o.empty && (a = Object.create(r), Object(i.isFunction)(a.unsubscribe) && h.add(a.unsubscribe.bind(a)), a.unsubscribe = h.unsubscribe.bind(h))), h._context = a, h._next = u, h._error = n, h._complete = s, h
            }
            return n.__extends(e, t), e.prototype.next = function(t) {
                if (!this.isStopped && this._next) {
                    var e = this._parentSubscriber;
                    h.config.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                }
            }, e.prototype.error = function(t) {
                if (!this.isStopped) {
                    var e = this._parentSubscriber,
                        r = h.config.useDeprecatedSynchronousErrorHandling;
                    if (this._error) r && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                    else if (e.syncErrorThrowable) r ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : Object(a.hostReportError)(t), this.unsubscribe();
                    else {
                        if (this.unsubscribe(), r) throw t;
                        Object(a.hostReportError)(t)
                    }
                }
            }, e.prototype.complete = function() {
                var t = this;
                if (!this.isStopped) {
                    var e = this._parentSubscriber;
                    if (this._complete) {
                        var r = function() {
                            return t._complete.call(t._context)
                        };
                        h.config.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, r), this.unsubscribe()) : (this.__tryOrUnsub(r), this.unsubscribe())
                    } else this.unsubscribe()
                }
            }, e.prototype.__tryOrUnsub = function(t, e) {
                try {
                    t.call(this._context, e)
                } catch (t) {
                    if (this.unsubscribe(), h.config.useDeprecatedSynchronousErrorHandling) throw t;
                    Object(a.hostReportError)(t)
                }
            }, e.prototype.__tryOrSetError = function(t, e, r) {
                if (!h.config.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                try {
                    e.call(this._context, r)
                } catch (e) {
                    return h.config.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = e, t.syncErrorThrown = !0, !0) : (Object(a.hostReportError)(e), !0)
                }
                return !1
            }, e.prototype._unsubscribe = function() {
                var t = this._parentSubscriber;
                this._context = null, this._parentSubscriber = null, t.unsubscribe()
            }, e
        }(c)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "__extends", (function() {
        return i
    })), r.d(e, "__assign", (function() {
        return o
    })), r.d(e, "__rest", (function() {
        return s
    })), r.d(e, "__decorate", (function() {
        return u
    })), r.d(e, "__param", (function() {
        return h
    })), r.d(e, "__metadata", (function() {
        return a
    })), r.d(e, "__awaiter", (function() {
        return c
    })), r.d(e, "__generator", (function() {
        return l
    })), r.d(e, "__exportStar", (function() {
        return f
    })), r.d(e, "__values", (function() {
        return d
    })), r.d(e, "__read", (function() {
        return p
    })), r.d(e, "__spread", (function() {
        return m
    })), r.d(e, "__spreadArrays", (function() {
        return v
    })), r.d(e, "__await", (function() {
        return b
    })), r.d(e, "__asyncGenerator", (function() {
        return y
    })), r.d(e, "__asyncDelegator", (function() {
        return g
    })), r.d(e, "__asyncValues", (function() {
        return w
    })), r.d(e, "__makeTemplateObject", (function() {
        return M
    })), r.d(e, "__importStar", (function() {
        return _
    })), r.d(e, "__importDefault", (function() {
        return S
    })), r.d(e, "__classPrivateFieldGet", (function() {
        return E
    })), r.d(e, "__classPrivateFieldSet", (function() {
        return x
    }));
    var n = function(t, e) {
        return (n = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
    };

    function i(t, e) {
        function r() {
            this.constructor = t
        }
        n(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }
    var o = function() {
        return (o = Object.assign || function(t) {
            for (var e, r = 1, n = arguments.length; r < n; r++)
                for (var i in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }).apply(this, arguments)
    };

    function s(t, e) {
        var r = {};
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (n = Object.getOwnPropertySymbols(t); i < n.length; i++) e.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[i]) && (r[n[i]] = t[n[i]])
        }
        return r
    }

    function u(t, e, r, n) {
        var i, o = arguments.length,
            s = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, n);
        else
            for (var u = t.length - 1; u >= 0; u--)(i = t[u]) && (s = (o < 3 ? i(s) : o > 3 ? i(e, r, s) : i(e, r)) || s);
        return o > 3 && s && Object.defineProperty(e, r, s), s
    }

    function h(t, e) {
        return function(r, n) {
            e(r, n, t)
        }
    }

    function a(t, e) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e)
    }

    function c(t, e, r, n) {
        return new(r || (r = Promise))((function(i, o) {
            function s(t) {
                try {
                    h(n.next(t))
                } catch (t) {
                    o(t)
                }
            }

            function u(t) {
                try {
                    h(n.throw(t))
                } catch (t) {
                    o(t)
                }
            }

            function h(t) {
                var e;
                t.done ? i(t.value) : (e = t.value, e instanceof r ? e : new r((function(t) {
                    t(e)
                }))).then(s, u)
            }
            h((n = n.apply(t, e || [])).next())
        }))
    }

    function l(t, e) {
        var r, n, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: u(0),
            throw: u(1),
            return: u(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }), o;

        function u(o) {
            return function(u) {
                return function(o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                        if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                        switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++, {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++, n = o[1], o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1], i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2], s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        o = e.call(t, s)
                    } catch (t) {
                        o = [6, t], n = 0
                    } finally {
                        r = i = 0
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, u])
            }
        }
    }

    function f(t, e) {
        for (var r in t) e.hasOwnProperty(r) || (e[r] = t[r])
    }

    function d(t) {
        var e = "function" == typeof Symbol && Symbol.iterator,
            r = e && t[e],
            n = 0;
        if (r) return r.call(t);
        if (t && "number" == typeof t.length) return {
            next: function() {
                return t && n >= t.length && (t = void 0), {
                    value: t && t[n++],
                    done: !t
                }
            }
        };
        throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }

    function p(t, e) {
        var r = "function" == typeof Symbol && t[Symbol.iterator];
        if (!r) return t;
        var n, i, o = r.call(t),
            s = [];
        try {
            for (;
                (void 0 === e || e-- > 0) && !(n = o.next()).done;) s.push(n.value)
        } catch (t) {
            i = {
                error: t
            }
        } finally {
            try {
                n && !n.done && (r = o.return) && r.call(o)
            } finally {
                if (i) throw i.error
            }
        }
        return s
    }

    function m() {
        for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(p(arguments[e]));
        return t
    }

    function v() {
        for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
        var n = Array(t),
            i = 0;
        for (e = 0; e < r; e++)
            for (var o = arguments[e], s = 0, u = o.length; s < u; s++, i++) n[i] = o[s];
        return n
    }

    function b(t) {
        return this instanceof b ? (this.v = t, this) : new b(t)
    }

    function y(t, e, r) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var n, i = r.apply(t, e || []),
            o = [];
        return n = {}, s("next"), s("throw"), s("return"), n[Symbol.asyncIterator] = function() {
            return this
        }, n;

        function s(t) {
            i[t] && (n[t] = function(e) {
                return new Promise((function(r, n) {
                    o.push([t, e, r, n]) > 1 || u(t, e)
                }))
            })
        }

        function u(t, e) {
            try {
                (r = i[t](e)).value instanceof b ? Promise.resolve(r.value.v).then(h, a) : c(o[0][2], r)
            } catch (t) {
                c(o[0][3], t)
            }
            var r
        }

        function h(t) {
            u("next", t)
        }

        function a(t) {
            u("throw", t)
        }

        function c(t, e) {
            t(e), o.shift(), o.length && u(o[0][0], o[0][1])
        }
    }

    function g(t) {
        var e, r;
        return e = {}, n("next"), n("throw", (function(t) {
            throw t
        })), n("return"), e[Symbol.iterator] = function() {
            return this
        }, e;

        function n(n, i) {
            e[n] = t[n] ? function(e) {
                return (r = !r) ? {
                    value: b(t[n](e)),
                    done: "return" === n
                } : i ? i(e) : e
            } : i
        }
    }

    function w(t) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var e, r = t[Symbol.asyncIterator];
        return r ? r.call(t) : (t = d(t), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
            return this
        }, e);

        function n(r) {
            e[r] = t[r] && function(e) {
                return new Promise((function(n, i) {
                    (function(t, e, r, n) {
                        Promise.resolve(n).then((function(e) {
                            t({
                                value: e,
                                done: r
                            })
                        }), e)
                    })(n, i, (e = t[r](e)).done, e.value)
                }))
            }
        }
    }

    function M(t, e) {
        return Object.defineProperty ? Object.defineProperty(t, "raw", {
            value: e
        }) : t.raw = e, t
    }

    function _(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e.default = t, e
    }

    function S(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function E(t, e) {
        if (!e.has(t)) throw new TypeError("attempted to get private field on non-instance");
        return e.get(t)
    }

    function x(t, e, r) {
        if (!e.has(t)) throw new TypeError("attempted to set private field on non-instance");
        return e.set(t, r), r
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return "function" == typeof t
    }
    r.r(e), r.d(e, "isFunction", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "empty", (function() {
        return o
    }));
    var n = r(94),
        i = r(95),
        o = {
            closed: !0,
            next: function(t) {},
            error: function(t) {
                if (n.config.useDeprecatedSynchronousErrorHandling) throw t;
                Object(i.hostReportError)(t)
            },
            complete: function() {}
        }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "config", (function() {
        return i
    }));
    var n = !1,
        i = {
            Promise: void 0,
            set useDeprecatedSynchronousErrorHandling(t) {
                t && (new Error).stack;
                n = t
            },
            get useDeprecatedSynchronousErrorHandling() {
                return n
            }
        }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        setTimeout((function() {
            throw t
        }), 0)
    }
    r.r(e), r.d(e, "hostReportError", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "Subscription", (function() {
        return u
    }));
    var n = r(97),
        i = r(98),
        o = r(92),
        s = r(99),
        u = function() {
            function t(t) {
                this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
            }
            var e;
            return t.prototype.unsubscribe = function() {
                var e;
                if (!this.closed) {
                    var r = this._parentOrParents,
                        u = this._ctorUnsubscribe,
                        a = this._unsubscribe,
                        c = this._subscriptions;
                    if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, r instanceof t) r.remove(this);
                    else if (null !== r)
                        for (var l = 0; l < r.length; ++l) {
                            r[l].remove(this)
                        }
                    if (Object(o.isFunction)(a)) {
                        u && (this._unsubscribe = void 0);
                        try {
                            a.call(this)
                        } catch (t) {
                            e = t instanceof s.UnsubscriptionError ? h(t.errors) : [t]
                        }
                    }
                    if (Object(n.isArray)(c)) {
                        l = -1;
                        for (var f = c.length; ++l < f;) {
                            var d = c[l];
                            if (Object(i.isObject)(d)) try {
                                d.unsubscribe()
                            } catch (t) {
                                e = e || [], t instanceof s.UnsubscriptionError ? e = e.concat(h(t.errors)) : e.push(t)
                            }
                        }
                    }
                    if (e) throw new s.UnsubscriptionError(e)
                }
            }, t.prototype.add = function(e) {
                var r = e;
                if (!e) return t.EMPTY;
                switch (typeof e) {
                    case "function":
                        r = new t(e);
                    case "object":
                        if (r === this || r.closed || "function" != typeof r.unsubscribe) return r;
                        if (this.closed) return r.unsubscribe(), r;
                        if (!(r instanceof t)) {
                            var n = r;
                            (r = new t)._subscriptions = [n]
                        }
                        break;
                    default:
                        throw new Error("unrecognized teardown " + e + " added to Subscription.")
                }
                var i = r._parentOrParents;
                if (null === i) r._parentOrParents = this;
                else if (i instanceof t) {
                    if (i === this) return r;
                    r._parentOrParents = [i, this]
                } else {
                    if (-1 !== i.indexOf(this)) return r;
                    i.push(this)
                }
                var o = this._subscriptions;
                return null === o ? this._subscriptions = [r] : o.push(r), r
            }, t.prototype.remove = function(t) {
                var e = this._subscriptions;
                if (e) {
                    var r = e.indexOf(t); - 1 !== r && e.splice(r, 1)
                }
            }, t.EMPTY = ((e = new t).closed = !0, e), t
        }();

    function h(t) {
        return t.reduce((function(t, e) {
            return t.concat(e instanceof s.UnsubscriptionError ? e.errors : e)
        }), [])
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "isArray", (function() {
        return n
    }));
    var n = function() {
        return Array.isArray || function(t) {
            return t && "number" == typeof t.length
        }
    }()
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return null !== t && "object" == typeof t
    }
    r.r(e), r.d(e, "isObject", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "UnsubscriptionError", (function() {
        return n
    }));
    var n = function() {
        function t(t) {
            return Error.call(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map((function(t, e) {
                return e + 1 + ") " + t.toString()
            })).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t, this
        }
        return t.prototype = Object.create(Error.prototype), t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "rxSubscriber", (function() {
        return n
    })), r.d(e, "$$rxSubscriber", (function() {
        return i
    }));
    var n = function() {
            return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random()
        }(),
        i = n
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "toSubscriber", (function() {
        return s
    }));
    var n = r(90),
        i = r(100),
        o = r(93);

    function s(t, e, r) {
        if (t) {
            if (t instanceof n.Subscriber) return t;
            if (t[i.rxSubscriber]) return t[i.rxSubscriber]()
        }
        return t || e || r ? new n.Subscriber(t, e, r) : new n.Subscriber(o.empty)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "observable", (function() {
        return n
    }));
    var n = function() {
        return "function" == typeof Symbol && Symbol.observable || "@@observable"
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "pipe", (function() {
        return i
    })), r.d(e, "pipeFromArray", (function() {
        return o
    }));
    var n = r(104);

    function i() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return o(t)
    }

    function o(t) {
        return 0 === t.length ? n.identity : 1 === t.length ? t[0] : function(e) {
            return t.reduce((function(t, e) {
                return e(t)
            }), e)
        }
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return t
    }
    r.r(e), r.d(e, "identity", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "ConnectableObservable", (function() {
        return a
    })), r.d(e, "connectableObservableDescriptor", (function() {
        return c
    }));
    var n = r(91),
        i = r(106),
        o = r(88),
        s = r(90),
        u = r(96),
        h = r(109),
        a = function(t) {
            function e(e, r) {
                var n = t.call(this) || this;
                return n.source = e, n.subjectFactory = r, n._refCount = 0, n._isComplete = !1, n
            }
            return n.__extends(e, t), e.prototype._subscribe = function(t) {
                return this.getSubject().subscribe(t)
            }, e.prototype.getSubject = function() {
                var t = this._subject;
                return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
            }, e.prototype.connect = function() {
                var t = this._connection;
                return t || (this._isComplete = !1, (t = this._connection = new u.Subscription).add(this.source.subscribe(new l(this.getSubject(), this))), t.closed && (this._connection = null, t = u.Subscription.EMPTY)), t
            }, e.prototype.refCount = function() {
                return Object(h.refCount)()(this)
            }, e
        }(o.Observable),
        c = function() {
            var t = a.prototype;
            return {
                operator: {
                    value: null
                },
                _refCount: {
                    value: 0,
                    writable: !0
                },
                _subject: {
                    value: null,
                    writable: !0
                },
                _connection: {
                    value: null,
                    writable: !0
                },
                _subscribe: {
                    value: t._subscribe
                },
                _isComplete: {
                    value: t._isComplete,
                    writable: !0
                },
                getSubject: {
                    value: t.getSubject
                },
                connect: {
                    value: t.connect
                },
                refCount: {
                    value: t.refCount
                }
            }
        }(),
        l = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.connectable = r, n
            }
            return n.__extends(e, t), e.prototype._error = function(e) {
                this._unsubscribe(), t.prototype._error.call(this, e)
            }, e.prototype._complete = function() {
                this.connectable._isComplete = !0, this._unsubscribe(), t.prototype._complete.call(this)
            }, e.prototype._unsubscribe = function() {
                var t = this.connectable;
                if (t) {
                    this.connectable = null;
                    var e = t._connection;
                    t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
                }
            }, e
        }(i.SubjectSubscriber);
    s.Subscriber
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "SubjectSubscriber", (function() {
        return c
    })), r.d(e, "Subject", (function() {
        return l
    })), r.d(e, "AnonymousSubject", (function() {
        return f
    }));
    var n = r(91),
        i = r(88),
        o = r(90),
        s = r(96),
        u = r(107),
        h = r(108),
        a = r(100),
        c = function(t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.destination = e, r
            }
            return n.__extends(e, t), e
        }(o.Subscriber),
        l = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.observers = [], e.closed = !1, e.isStopped = !1, e.hasError = !1, e.thrownError = null, e
            }
            return n.__extends(e, t), e.prototype[a.rxSubscriber] = function() {
                return new c(this)
            }, e.prototype.lift = function(t) {
                var e = new f(this, this);
                return e.operator = t, e
            }, e.prototype.next = function(t) {
                if (this.closed) throw new u.ObjectUnsubscribedError;
                if (!this.isStopped)
                    for (var e = this.observers, r = e.length, n = e.slice(), i = 0; i < r; i++) n[i].next(t)
            }, e.prototype.error = function(t) {
                if (this.closed) throw new u.ObjectUnsubscribedError;
                this.hasError = !0, this.thrownError = t, this.isStopped = !0;
                for (var e = this.observers, r = e.length, n = e.slice(), i = 0; i < r; i++) n[i].error(t);
                this.observers.length = 0
            }, e.prototype.complete = function() {
                if (this.closed) throw new u.ObjectUnsubscribedError;
                this.isStopped = !0;
                for (var t = this.observers, e = t.length, r = t.slice(), n = 0; n < e; n++) r[n].complete();
                this.observers.length = 0
            }, e.prototype.unsubscribe = function() {
                this.isStopped = !0, this.closed = !0, this.observers = null
            }, e.prototype._trySubscribe = function(e) {
                if (this.closed) throw new u.ObjectUnsubscribedError;
                return t.prototype._trySubscribe.call(this, e)
            }, e.prototype._subscribe = function(t) {
                if (this.closed) throw new u.ObjectUnsubscribedError;
                return this.hasError ? (t.error(this.thrownError), s.Subscription.EMPTY) : this.isStopped ? (t.complete(), s.Subscription.EMPTY) : (this.observers.push(t), new h.SubjectSubscription(this, t))
            }, e.prototype.asObservable = function() {
                var t = new i.Observable;
                return t.source = this, t
            }, e.create = function(t, e) {
                return new f(t, e)
            }, e
        }(i.Observable),
        f = function(t) {
            function e(e, r) {
                var n = t.call(this) || this;
                return n.destination = e, n.source = r, n
            }
            return n.__extends(e, t), e.prototype.next = function(t) {
                var e = this.destination;
                e && e.next && e.next(t)
            }, e.prototype.error = function(t) {
                var e = this.destination;
                e && e.error && this.destination.error(t)
            }, e.prototype.complete = function() {
                var t = this.destination;
                t && t.complete && this.destination.complete()
            }, e.prototype._subscribe = function(t) {
                return this.source ? this.source.subscribe(t) : s.Subscription.EMPTY
            }, e
        }(l)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "ObjectUnsubscribedError", (function() {
        return n
    }));
    var n = function() {
        function t() {
            return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "SubjectSubscription", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e(e, r) {
                var n = t.call(this) || this;
                return n.subject = e, n.subscriber = r, n.closed = !1, n
            }
            return n.__extends(e, t), e.prototype.unsubscribe = function() {
                if (!this.closed) {
                    this.closed = !0;
                    var t = this.subject,
                        e = t.observers;
                    if (this.subject = null, e && 0 !== e.length && !t.isStopped && !t.closed) {
                        var r = e.indexOf(this.subscriber); - 1 !== r && e.splice(r, 1)
                    }
                }
            }, e
        }(r(96).Subscription)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "refCount", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o() {
        return function(t) {
            return t.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.connectable = t
            }
            return t.prototype.call = function(t, e) {
                var r = this.connectable;
                r._refCount++;
                var n = new u(t, r),
                    i = e.subscribe(n);
                return n.closed || (n.connection = r.connect()), i
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.connectable = r, n
            }
            return n.__extends(e, t), e.prototype._unsubscribe = function() {
                var t = this.connectable;
                if (t) {
                    this.connectable = null;
                    var e = t._refCount;
                    if (e <= 0) this.connection = null;
                    else if (t._refCount = e - 1, e > 1) this.connection = null;
                    else {
                        var r = this.connection,
                            n = t._connection;
                        this.connection = null, !n || r && n !== r || n.unsubscribe()
                    }
                } else this.connection = null
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "groupBy", (function() {
        return h
    })), r.d(e, "GroupedObservable", (function() {
        return f
    }));
    var n = r(91),
        i = r(90),
        o = r(96),
        s = r(88),
        u = r(106);

    function h(t, e, r, n) {
        return function(i) {
            return i.lift(new a(t, e, r, n))
        }
    }
    var a = function() {
            function t(t, e, r, n) {
                this.keySelector = t, this.elementSelector = e, this.durationSelector = r, this.subjectSelector = n
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new c(t, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector))
            }, t
        }(),
        c = function(t) {
            function e(e, r, n, i, o) {
                var s = t.call(this, e) || this;
                return s.keySelector = r, s.elementSelector = n, s.durationSelector = i, s.subjectSelector = o, s.groups = null, s.attemptedToUnsubscribe = !1, s.count = 0, s
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e;
                try {
                    e = this.keySelector(t)
                } catch (t) {
                    return void this.error(t)
                }
                this._group(t, e)
            }, e.prototype._group = function(t, e) {
                var r = this.groups;
                r || (r = this.groups = new Map);
                var n, i = r.get(e);
                if (this.elementSelector) try {
                    n = this.elementSelector(t)
                } catch (t) {
                    this.error(t)
                } else n = t;
                if (!i) {
                    i = this.subjectSelector ? this.subjectSelector() : new u.Subject, r.set(e, i);
                    var o = new f(e, i, this);
                    if (this.destination.next(o), this.durationSelector) {
                        var s = void 0;
                        try {
                            s = this.durationSelector(new f(e, i))
                        } catch (t) {
                            return void this.error(t)
                        }
                        this.add(s.subscribe(new l(e, i, this)))
                    }
                }
                i.closed || i.next(n)
            }, e.prototype._error = function(t) {
                var e = this.groups;
                e && (e.forEach((function(e, r) {
                    e.error(t)
                })), e.clear()), this.destination.error(t)
            }, e.prototype._complete = function() {
                var t = this.groups;
                t && (t.forEach((function(t, e) {
                    t.complete()
                })), t.clear()), this.destination.complete()
            }, e.prototype.removeGroup = function(t) {
                this.groups.delete(t)
            }, e.prototype.unsubscribe = function() {
                this.closed || (this.attemptedToUnsubscribe = !0, 0 === this.count && t.prototype.unsubscribe.call(this))
            }, e
        }(i.Subscriber),
        l = function(t) {
            function e(e, r, n) {
                var i = t.call(this, r) || this;
                return i.key = e, i.group = r, i.parent = n, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.complete()
            }, e.prototype._unsubscribe = function() {
                var t = this.parent,
                    e = this.key;
                this.key = this.parent = null, t && t.removeGroup(e)
            }, e
        }(i.Subscriber),
        f = function(t) {
            function e(e, r, n) {
                var i = t.call(this) || this;
                return i.key = e, i.groupSubject = r, i.refCountSubscription = n, i
            }
            return n.__extends(e, t), e.prototype._subscribe = function(t) {
                var e = new o.Subscription,
                    r = this.refCountSubscription,
                    n = this.groupSubject;
                return r && !r.closed && e.add(new d(r)), e.add(n.subscribe(t)), e
            }, e
        }(s.Observable),
        d = function(t) {
            function e(e) {
                var r = t.call(this) || this;
                return r.parent = e, e.count++, r
            }
            return n.__extends(e, t), e.prototype.unsubscribe = function() {
                var e = this.parent;
                e.closed || this.closed || (t.prototype.unsubscribe.call(this), e.count -= 1, 0 === e.count && e.attemptedToUnsubscribe && e.unsubscribe())
            }, e
        }(o.Subscription)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "BehaviorSubject", (function() {
        return s
    }));
    var n = r(91),
        i = r(106),
        o = r(107),
        s = function(t) {
            function e(e) {
                var r = t.call(this) || this;
                return r._value = e, r
            }
            return n.__extends(e, t), Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this.getValue()
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype._subscribe = function(e) {
                var r = t.prototype._subscribe.call(this, e);
                return r && !r.closed && e.next(this._value), r
            }, e.prototype.getValue = function() {
                if (this.hasError) throw this.thrownError;
                if (this.closed) throw new o.ObjectUnsubscribedError;
                return this._value
            }, e.prototype.next = function(e) {
                t.prototype.next.call(this, this._value = e)
            }, e
        }(i.Subject)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "ReplaySubject", (function() {
        return c
    }));
    var n = r(91),
        i = r(106),
        o = r(113),
        s = r(96),
        u = r(120),
        h = r(107),
        a = r(108),
        c = function(t) {
            function e(e, r, n) {
                void 0 === e && (e = Number.POSITIVE_INFINITY), void 0 === r && (r = Number.POSITIVE_INFINITY);
                var i = t.call(this) || this;
                return i.scheduler = n, i._events = [], i._infiniteTimeWindow = !1, i._bufferSize = e < 1 ? 1 : e, i._windowTime = r < 1 ? 1 : r, r === Number.POSITIVE_INFINITY ? (i._infiniteTimeWindow = !0, i.next = i.nextInfiniteTimeWindow) : i.next = i.nextTimeWindow, i
            }
            return n.__extends(e, t), e.prototype.nextInfiniteTimeWindow = function(e) {
                if (!this.isStopped) {
                    var r = this._events;
                    r.push(e), r.length > this._bufferSize && r.shift()
                }
                t.prototype.next.call(this, e)
            }, e.prototype.nextTimeWindow = function(e) {
                this.isStopped || (this._events.push(new l(this._getNow(), e)), this._trimBufferThenGetEvents()), t.prototype.next.call(this, e)
            }, e.prototype._subscribe = function(t) {
                var e, r = this._infiniteTimeWindow,
                    n = r ? this._events : this._trimBufferThenGetEvents(),
                    i = this.scheduler,
                    o = n.length;
                if (this.closed) throw new h.ObjectUnsubscribedError;
                if (this.isStopped || this.hasError ? e = s.Subscription.EMPTY : (this.observers.push(t), e = new a.SubjectSubscription(this, t)), i && t.add(t = new u.ObserveOnSubscriber(t, i)), r)
                    for (var c = 0; c < o && !t.closed; c++) t.next(n[c]);
                else
                    for (c = 0; c < o && !t.closed; c++) t.next(n[c].value);
                return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), e
            }, e.prototype._getNow = function() {
                return (this.scheduler || o.queue).now()
            }, e.prototype._trimBufferThenGetEvents = function() {
                for (var t = this._getNow(), e = this._bufferSize, r = this._windowTime, n = this._events, i = n.length, o = 0; o < i && !(t - n[o].time < r);) o++;
                return i > e && (o = Math.max(o, i - e)), o > 0 && n.splice(0, o), n
            }, e
        }(i.Subject),
        l = function() {
            return function(t, e) {
                this.time = t, this.value = e
            }
        }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "queueScheduler", (function() {
        return i
    })), r.d(e, "queue", (function() {
        return o
    }));
    var n = r(114),
        i = new(r(117).QueueScheduler)(n.QueueAction),
        o = i
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "QueueAction", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e(e, r) {
                var n = t.call(this, e, r) || this;
                return n.scheduler = e, n.work = r, n
            }
            return n.__extends(e, t), e.prototype.schedule = function(e, r) {
                return void 0 === r && (r = 0), r > 0 ? t.prototype.schedule.call(this, e, r) : (this.delay = r, this.state = e, this.scheduler.flush(this), this)
            }, e.prototype.execute = function(e, r) {
                return r > 0 || this.closed ? t.prototype.execute.call(this, e, r) : this._execute(e, r)
            }, e.prototype.requestAsyncId = function(e, r, n) {
                return void 0 === n && (n = 0), null !== n && n > 0 || null === n && this.delay > 0 ? t.prototype.requestAsyncId.call(this, e, r, n) : e.flush(this)
            }, e
        }(r(115).AsyncAction)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AsyncAction", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e(e, r) {
                var n = t.call(this, e, r) || this;
                return n.scheduler = e, n.work = r, n.pending = !1, n
            }
            return n.__extends(e, t), e.prototype.schedule = function(t, e) {
                if (void 0 === e && (e = 0), this.closed) return this;
                this.state = t;
                var r = this.id,
                    n = this.scheduler;
                return null != r && (this.id = this.recycleAsyncId(n, r, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(n, this.id, e), this
            }, e.prototype.requestAsyncId = function(t, e, r) {
                return void 0 === r && (r = 0), setInterval(t.flush.bind(t, this), r)
            }, e.prototype.recycleAsyncId = function(t, e, r) {
                if (void 0 === r && (r = 0), null !== r && this.delay === r && !1 === this.pending) return e;
                clearInterval(e)
            }, e.prototype.execute = function(t, e) {
                if (this.closed) return new Error("executing a cancelled action");
                this.pending = !1;
                var r = this._execute(t, e);
                if (r) return r;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }, e.prototype._execute = function(t, e) {
                var r = !1,
                    n = void 0;
                try {
                    this.work(t)
                } catch (t) {
                    r = !0, n = !!t && t || new Error(t)
                }
                if (r) return this.unsubscribe(), n
            }, e.prototype._unsubscribe = function() {
                var t = this.id,
                    e = this.scheduler,
                    r = e.actions,
                    n = r.indexOf(this);
                this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== n && r.splice(n, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null
            }, e
        }(r(116).Action)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "Action", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e(e, r) {
                return t.call(this) || this
            }
            return n.__extends(e, t), e.prototype.schedule = function(t, e) {
                return void 0 === e && (e = 0), this
            }, e
        }(r(96).Subscription)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "QueueScheduler", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e
        }(r(118).AsyncScheduler)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AsyncScheduler", (function() {
        return o
    }));
    var n = r(91),
        i = r(119),
        o = function(t) {
            function e(r, n) {
                void 0 === n && (n = i.Scheduler.now);
                var o = t.call(this, r, (function() {
                    return e.delegate && e.delegate !== o ? e.delegate.now() : n()
                })) || this;
                return o.actions = [], o.active = !1, o.scheduled = void 0, o
            }
            return n.__extends(e, t), e.prototype.schedule = function(r, n, i) {
                return void 0 === n && (n = 0), e.delegate && e.delegate !== this ? e.delegate.schedule(r, n, i) : t.prototype.schedule.call(this, r, n, i)
            }, e.prototype.flush = function(t) {
                var e = this.actions;
                if (this.active) e.push(t);
                else {
                    var r;
                    this.active = !0;
                    do {
                        if (r = t.execute(t.state, t.delay)) break
                    } while (t = e.shift());
                    if (this.active = !1, r) {
                        for (; t = e.shift();) t.unsubscribe();
                        throw r
                    }
                }
            }, e
        }(i.Scheduler)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "Scheduler", (function() {
        return n
    }));
    var n = function() {
        function t(e, r) {
            void 0 === r && (r = t.now), this.SchedulerAction = e, this.now = r
        }
        return t.prototype.schedule = function(t, e, r) {
            return void 0 === e && (e = 0), new this.SchedulerAction(this, t).schedule(r, e)
        }, t.now = function() {
            return Date.now()
        }, t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "observeOn", (function() {
        return s
    })), r.d(e, "ObserveOnOperator", (function() {
        return u
    })), r.d(e, "ObserveOnSubscriber", (function() {
        return h
    })), r.d(e, "ObserveOnMessage", (function() {
        return a
    }));
    var n = r(91),
        i = r(90),
        o = r(121);

    function s(t, e) {
        return void 0 === e && (e = 0),
            function(r) {
                return r.lift(new u(t, e))
            }
    }
    var u = function() {
            function t(t, e) {
                void 0 === e && (e = 0), this.scheduler = t, this.delay = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.scheduler, this.delay))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                void 0 === n && (n = 0);
                var i = t.call(this, e) || this;
                return i.scheduler = r, i.delay = n, i
            }
            return n.__extends(e, t), e.dispatch = function(t) {
                var e = t.notification,
                    r = t.destination;
                e.observe(r), this.unsubscribe()
            }, e.prototype.scheduleMessage = function(t) {
                this.destination.add(this.scheduler.schedule(e.dispatch, this.delay, new a(t, this.destination)))
            }, e.prototype._next = function(t) {
                this.scheduleMessage(o.Notification.createNext(t))
            }, e.prototype._error = function(t) {
                this.scheduleMessage(o.Notification.createError(t)), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.scheduleMessage(o.Notification.createComplete()), this.unsubscribe()
            }, e
        }(i.Subscriber),
        a = function() {
            return function(t, e) {
                this.notification = t, this.destination = e
            }
        }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "NotificationKind", (function() {
        return n
    })), r.d(e, "Notification", (function() {
        return u
    }));
    var n, i = r(122),
        o = r(123),
        s = r(128);
    n || (n = {});
    var u = function() {
        function t(t, e, r) {
            this.kind = t, this.value = e, this.error = r, this.hasValue = "N" === t
        }
        return t.prototype.observe = function(t) {
            switch (this.kind) {
                case "N":
                    return t.next && t.next(this.value);
                case "E":
                    return t.error && t.error(this.error);
                case "C":
                    return t.complete && t.complete()
            }
        }, t.prototype.do = function(t, e, r) {
            switch (this.kind) {
                case "N":
                    return t && t(this.value);
                case "E":
                    return e && e(this.error);
                case "C":
                    return r && r()
            }
        }, t.prototype.accept = function(t, e, r) {
            return t && "function" == typeof t.next ? this.observe(t) : this.do(t, e, r)
        }, t.prototype.toObservable = function() {
            switch (this.kind) {
                case "N":
                    return Object(o.of)(this.value);
                case "E":
                    return Object(s.throwError)(this.error);
                case "C":
                    return Object(i.empty)()
            }
            throw new Error("unexpected notification kind value")
        }, t.createNext = function(e) {
            return void 0 !== e ? new t("N", e) : t.undefinedValueNotification
        }, t.createError = function(e) {
            return new t("E", void 0, e)
        }, t.createComplete = function() {
            return t.completeNotification
        }, t.completeNotification = new t("C"), t.undefinedValueNotification = new t("N", void 0), t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "EMPTY", (function() {
        return i
    })), r.d(e, "empty", (function() {
        return o
    }));
    var n = r(88),
        i = new n.Observable((function(t) {
            return t.complete()
        }));

    function o(t) {
        return t ? function(t) {
            return new n.Observable((function(e) {
                return t.schedule((function() {
                    return e.complete()
                }))
            }))
        }(t) : i
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "of", (function() {
        return s
    }));
    var n = r(124),
        i = r(125),
        o = r(127);

    function s() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t[t.length - 1];
        return Object(n.isScheduler)(r) ? (t.pop(), Object(o.scheduleArray)(t, r)) : Object(i.fromArray)(t)
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return t && "function" == typeof t.schedule
    }
    r.r(e), r.d(e, "isScheduler", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "fromArray", (function() {
        return s
    }));
    var n = r(88),
        i = r(126),
        o = r(127);

    function s(t, e) {
        return e ? Object(o.scheduleArray)(t, e) : new n.Observable(Object(i.subscribeToArray)(t))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "subscribeToArray", (function() {
        return n
    }));
    var n = function(t) {
        return function(e) {
            for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
            e.complete()
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "scheduleArray", (function() {
        return o
    }));
    var n = r(88),
        i = r(96);

    function o(t, e) {
        return new n.Observable((function(r) {
            var n = new i.Subscription,
                o = 0;
            return n.add(e.schedule((function() {
                o !== t.length ? (r.next(t[o++]), r.closed || n.add(this.schedule())) : r.complete()
            }))), n
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "throwError", (function() {
        return i
    }));
    var n = r(88);

    function i(t, e) {
        return e ? new n.Observable((function(r) {
            return e.schedule(o, 0, {
                error: t,
                subscriber: r
            })
        })) : new n.Observable((function(e) {
            return e.error(t)
        }))
    }

    function o(t) {
        var e = t.error;
        t.subscriber.error(e)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AsyncSubject", (function() {
        return s
    }));
    var n = r(91),
        i = r(106),
        o = r(96),
        s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.value = null, e.hasNext = !1, e.hasCompleted = !1, e
            }
            return n.__extends(e, t), e.prototype._subscribe = function(e) {
                return this.hasError ? (e.error(this.thrownError), o.Subscription.EMPTY) : this.hasCompleted && this.hasNext ? (e.next(this.value), e.complete(), o.Subscription.EMPTY) : t.prototype._subscribe.call(this, e)
            }, e.prototype.next = function(t) {
                this.hasCompleted || (this.value = t, this.hasNext = !0)
            }, e.prototype.error = function(e) {
                this.hasCompleted || t.prototype.error.call(this, e)
            }, e.prototype.complete = function() {
                this.hasCompleted = !0, this.hasNext && t.prototype.next.call(this, this.value), t.prototype.complete.call(this)
            }, e
        }(i.Subject)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "asapScheduler", (function() {
        return i
    })), r.d(e, "asap", (function() {
        return o
    }));
    var n = r(131),
        i = new(r(133).AsapScheduler)(n.AsapAction),
        o = i
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AsapAction", (function() {
        return o
    }));
    var n = r(91),
        i = r(132),
        o = function(t) {
            function e(e, r) {
                var n = t.call(this, e, r) || this;
                return n.scheduler = e, n.work = r, n
            }
            return n.__extends(e, t), e.prototype.requestAsyncId = function(e, r, n) {
                return void 0 === n && (n = 0), null !== n && n > 0 ? t.prototype.requestAsyncId.call(this, e, r, n) : (e.actions.push(this), e.scheduled || (e.scheduled = i.Immediate.setImmediate(e.flush.bind(e, null))))
            }, e.prototype.recycleAsyncId = function(e, r, n) {
                if (void 0 === n && (n = 0), null !== n && n > 0 || null === n && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, r, n);
                0 === e.actions.length && (i.Immediate.clearImmediate(r), e.scheduled = void 0)
            }, e
        }(r(115).AsyncAction)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "Immediate", (function() {
        return u
    })), r.d(e, "TestTools", (function() {
        return h
    }));
    var n = 1,
        i = function() {
            return Promise.resolve()
        }(),
        o = {};

    function s(t) {
        return t in o && (delete o[t], !0)
    }
    var u = {
            setImmediate: function(t) {
                var e = n++;
                return o[e] = !0, i.then((function() {
                    return s(e) && t()
                })), e
            },
            clearImmediate: function(t) {
                s(t)
            }
        },
        h = {
            pending: function() {
                return Object.keys(o).length
            }
        }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AsapScheduler", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.flush = function(t) {
                this.active = !0, this.scheduled = void 0;
                var e, r = this.actions,
                    n = -1,
                    i = r.length;
                t = t || r.shift();
                do {
                    if (e = t.execute(t.state, t.delay)) break
                } while (++n < i && (t = r.shift()));
                if (this.active = !1, e) {
                    for (; ++n < i && (t = r.shift());) t.unsubscribe();
                    throw e
                }
            }, e
        }(r(118).AsyncScheduler)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "asyncScheduler", (function() {
        return i
    })), r.d(e, "async", (function() {
        return o
    }));
    var n = r(115),
        i = new(r(118).AsyncScheduler)(n.AsyncAction),
        o = i
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "animationFrameScheduler", (function() {
        return i
    })), r.d(e, "animationFrame", (function() {
        return o
    }));
    var n = r(136),
        i = new(r(137).AnimationFrameScheduler)(n.AnimationFrameAction),
        o = i
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AnimationFrameAction", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e(e, r) {
                var n = t.call(this, e, r) || this;
                return n.scheduler = e, n.work = r, n
            }
            return n.__extends(e, t), e.prototype.requestAsyncId = function(e, r, n) {
                return void 0 === n && (n = 0), null !== n && n > 0 ? t.prototype.requestAsyncId.call(this, e, r, n) : (e.actions.push(this), e.scheduled || (e.scheduled = requestAnimationFrame((function() {
                    return e.flush(null)
                }))))
            }, e.prototype.recycleAsyncId = function(e, r, n) {
                if (void 0 === n && (n = 0), null !== n && n > 0 || null === n && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, r, n);
                0 === e.actions.length && (cancelAnimationFrame(r), e.scheduled = void 0)
            }, e
        }(r(115).AsyncAction)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "AnimationFrameScheduler", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.flush = function(t) {
                this.active = !0, this.scheduled = void 0;
                var e, r = this.actions,
                    n = -1,
                    i = r.length;
                t = t || r.shift();
                do {
                    if (e = t.execute(t.state, t.delay)) break
                } while (++n < i && (t = r.shift()));
                if (this.active = !1, e) {
                    for (; ++n < i && (t = r.shift());) t.unsubscribe();
                    throw e
                }
            }, e
        }(r(118).AsyncScheduler)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "VirtualTimeScheduler", (function() {
        return o
    })), r.d(e, "VirtualAction", (function() {
        return s
    }));
    var n = r(91),
        i = r(115),
        o = function(t) {
            function e(e, r) {
                void 0 === e && (e = s), void 0 === r && (r = Number.POSITIVE_INFINITY);
                var n = t.call(this, e, (function() {
                    return n.frame
                })) || this;
                return n.maxFrames = r, n.frame = 0, n.index = -1, n
            }
            return n.__extends(e, t), e.prototype.flush = function() {
                for (var t, e, r = this.actions, n = this.maxFrames;
                    (e = r[0]) && e.delay <= n && (r.shift(), this.frame = e.delay, !(t = e.execute(e.state, e.delay))););
                if (t) {
                    for (; e = r.shift();) e.unsubscribe();
                    throw t
                }
            }, e.frameTimeFactor = 10, e
        }(r(118).AsyncScheduler),
        s = function(t) {
            function e(e, r, n) {
                void 0 === n && (n = e.index += 1);
                var i = t.call(this, e, r) || this;
                return i.scheduler = e, i.work = r, i.index = n, i.active = !0, i.index = e.index = n, i
            }
            return n.__extends(e, t), e.prototype.schedule = function(r, n) {
                if (void 0 === n && (n = 0), !this.id) return t.prototype.schedule.call(this, r, n);
                this.active = !1;
                var i = new e(this.scheduler, this.work);
                return this.add(i), i.schedule(r, n)
            }, e.prototype.requestAsyncId = function(t, r, n) {
                void 0 === n && (n = 0), this.delay = t.frame + n;
                var i = t.actions;
                return i.push(this), i.sort(e.sortActions), !0
            }, e.prototype.recycleAsyncId = function(t, e, r) {
                void 0 === r && (r = 0)
            }, e.prototype._execute = function(e, r) {
                if (!0 === this.active) return t.prototype._execute.call(this, e, r)
            }, e.sortActions = function(t, e) {
                return t.delay === e.delay ? t.index === e.index ? 0 : t.index > e.index ? 1 : -1 : t.delay > e.delay ? 1 : -1
            }, e
        }(i.AsyncAction)
}, function(t, e, r) {
    "use strict";

    function n() {}
    r.r(e), r.d(e, "noop", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "isObservable", (function() {
        return i
    }));
    var n = r(88);

    function i(t) {
        return !!t && (t instanceof n.Observable || "function" == typeof t.lift && "function" == typeof t.subscribe)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "ArgumentOutOfRangeError", (function() {
        return n
    }));
    var n = function() {
        function t() {
            return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "EmptyError", (function() {
        return n
    }));
    var n = function() {
        function t() {
            return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "TimeoutError", (function() {
        return n
    }));
    var n = function() {
        function t() {
            return Error.call(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "bindCallback", (function() {
        return a
    }));
    var n = r(88),
        i = r(129),
        o = r(145),
        s = r(89),
        u = r(97),
        h = r(124);

    function a(t, e, r) {
        if (e) {
            if (!Object(h.isScheduler)(e)) return function() {
                for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                return a(t, r).apply(void 0, n).pipe(Object(o.map)((function(t) {
                    return Object(u.isArray)(t) ? e.apply(void 0, t) : e(t)
                })))
            };
            r = e
        }
        return function() {
            for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
            var u, h = this,
                a = {
                    context: h,
                    subject: u,
                    callbackFunc: t,
                    scheduler: r
                };
            return new n.Observable((function(n) {
                if (r) {
                    var o = {
                        args: e,
                        subscriber: n,
                        params: a
                    };
                    return r.schedule(c, 0, o)
                }
                if (!u) {
                    u = new i.AsyncSubject;
                    try {
                        t.apply(h, e.concat([function() {
                            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                            u.next(t.length <= 1 ? t[0] : t), u.complete()
                        }]))
                    } catch (t) {
                        Object(s.canReportError)(u) ? u.error(t) : console.warn(t)
                    }
                }
                return u.subscribe(n)
            }))
        }
    }

    function c(t) {
        var e = this,
            r = t.args,
            n = t.subscriber,
            o = t.params,
            s = o.callbackFunc,
            u = o.context,
            h = o.scheduler,
            a = o.subject;
        if (!a) {
            a = o.subject = new i.AsyncSubject;
            try {
                s.apply(u, r.concat([function() {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    var n = t.length <= 1 ? t[0] : t;
                    e.add(h.schedule(l, 0, {
                        value: n,
                        subject: a
                    }))
                }]))
            } catch (t) {
                a.error(t)
            }
        }
        this.add(a.subscribe(n))
    }

    function l(t) {
        var e = t.value,
            r = t.subject;
        r.next(e), r.complete()
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "map", (function() {
        return o
    })), r.d(e, "MapOperator", (function() {
        return s
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        return function(r) {
            if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
            return r.lift(new s(t, e))
        }
    }
    var s = function() {
            function t(t, e) {
                this.project = t, this.thisArg = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.project, this.thisArg))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.project = r, i.count = 0, i.thisArg = n || i, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e;
                try {
                    e = this.project.call(this.thisArg, t, this.count++)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.next(e)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "bindNodeCallback", (function() {
        return a
    }));
    var n = r(88),
        i = r(129),
        o = r(145),
        s = r(89),
        u = r(124),
        h = r(97);

    function a(t, e, r) {
        if (e) {
            if (!Object(u.isScheduler)(e)) return function() {
                for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                return a(t, r).apply(void 0, n).pipe(Object(o.map)((function(t) {
                    return Object(h.isArray)(t) ? e.apply(void 0, t) : e(t)
                })))
            };
            r = e
        }
        return function() {
            for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
            var u = {
                subject: void 0,
                args: e,
                callbackFunc: t,
                scheduler: r,
                context: this
            };
            return new n.Observable((function(n) {
                var o = u.context,
                    h = u.subject;
                if (r) return r.schedule(c, 0, {
                    params: u,
                    subscriber: n,
                    context: o
                });
                if (!h) {
                    h = u.subject = new i.AsyncSubject;
                    try {
                        t.apply(o, e.concat([function() {
                            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                            var r = t.shift();
                            r ? h.error(r) : (h.next(t.length <= 1 ? t[0] : t), h.complete())
                        }]))
                    } catch (t) {
                        Object(s.canReportError)(h) ? h.error(t) : console.warn(t)
                    }
                }
                return h.subscribe(n)
            }))
        }
    }

    function c(t) {
        var e = this,
            r = t.params,
            n = t.subscriber,
            o = t.context,
            s = r.callbackFunc,
            u = r.args,
            h = r.scheduler,
            a = r.subject;
        if (!a) {
            a = r.subject = new i.AsyncSubject;
            try {
                s.apply(o, u.concat([function() {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    var n = t.shift();
                    if (n) e.add(h.schedule(f, 0, {
                        err: n,
                        subject: a
                    }));
                    else {
                        var i = t.length <= 1 ? t[0] : t;
                        e.add(h.schedule(l, 0, {
                            value: i,
                            subject: a
                        }))
                    }
                }]))
            } catch (t) {
                this.add(h.schedule(f, 0, {
                    err: t,
                    subject: a
                }))
            }
        }
        this.add(a.subscribe(n))
    }

    function l(t) {
        var e = t.value,
            r = t.subject;
        r.next(e), r.complete()
    }

    function f(t) {
        var e = t.err;
        t.subject.error(e)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "combineLatest", (function() {
        return c
    })), r.d(e, "CombineLatestOperator", (function() {
        return l
    })), r.d(e, "CombineLatestSubscriber", (function() {
        return f
    }));
    var n = r(91),
        i = r(124),
        o = r(97),
        s = r(148),
        u = r(149),
        h = r(125),
        a = {};

    function c() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = void 0,
            n = void 0;
        return Object(i.isScheduler)(t[t.length - 1]) && (n = t.pop()), "function" == typeof t[t.length - 1] && (r = t.pop()), 1 === t.length && Object(o.isArray)(t[0]) && (t = t[0]), Object(h.fromArray)(t, n).lift(new l(r))
    }
    var l = function() {
            function t(t) {
                this.resultSelector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new f(t, this.resultSelector))
            }, t
        }(),
        f = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.resultSelector = r, n.active = 0, n.values = [], n.observables = [], n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.values.push(a), this.observables.push(t)
            }, e.prototype._complete = function() {
                var t = this.observables,
                    e = t.length;
                if (0 === e) this.destination.complete();
                else {
                    this.active = e, this.toRespond = e;
                    for (var r = 0; r < e; r++) {
                        var n = t[r];
                        this.add(Object(u.subscribeToResult)(this, n, void 0, r))
                    }
                }
            }, e.prototype.notifyComplete = function(t) {
                0 == (this.active -= 1) && this.destination.complete()
            }, e.prototype.notifyNext = function(t, e, r) {
                var n = this.values,
                    i = n[r],
                    o = this.toRespond ? i === a ? --this.toRespond : this.toRespond : 0;
                n[r] = e, 0 === o && (this.resultSelector ? this._tryResultSelector(n) : this.destination.next(n.slice()))
            }, e.prototype._tryResultSelector = function(t) {
                var e;
                try {
                    e = this.resultSelector.apply(this, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.next(e)
            }, e
        }(s.OuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "OuterSubscriber", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.notifyNext = function(t, e, r, n, i) {
                this.destination.next(e)
            }, e.prototype.notifyError = function(t, e) {
                this.destination.error(t)
            }, e.prototype.notifyComplete = function(t) {
                this.destination.complete()
            }, e
        }(r(90).Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "subscribeToResult", (function() {
        return s
    }));
    var n = r(150),
        i = r(151),
        o = r(88);

    function s(t, e, r, s, u) {
        if (void 0 === u && (u = new n.InnerSubscriber(t, r, s)), !u.closed) return e instanceof o.Observable ? e.subscribe(u) : Object(i.subscribeTo)(e)(u)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "InnerSubscriber", (function() {
        return i
    }));
    var n = r(91),
        i = function(t) {
            function e(e, r, n) {
                var i = t.call(this) || this;
                return i.parent = e, i.outerValue = r, i.outerIndex = n, i.index = 0, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
            }, e.prototype._error = function(t) {
                this.parent.notifyError(t, this), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.parent.notifyComplete(this), this.unsubscribe()
            }, e
        }(r(90).Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "subscribeTo", (function() {
        return f
    }));
    var n = r(126),
        i = r(152),
        o = r(153),
        s = r(155),
        u = r(156),
        h = r(157),
        a = r(98),
        c = r(154),
        l = r(102),
        f = function(t) {
            if (t && "function" == typeof t[l.observable]) return Object(s.subscribeToObservable)(t);
            if (Object(u.isArrayLike)(t)) return Object(n.subscribeToArray)(t);
            if (Object(h.isPromise)(t)) return Object(i.subscribeToPromise)(t);
            if (t && "function" == typeof t[c.iterator]) return Object(o.subscribeToIterable)(t);
            var e = Object(a.isObject)(t) ? "an invalid object" : "'" + t + "'";
            throw new TypeError("You provided " + e + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")
        }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "subscribeToPromise", (function() {
        return i
    }));
    var n = r(95),
        i = function(t) {
            return function(e) {
                return t.then((function(t) {
                    e.closed || (e.next(t), e.complete())
                }), (function(t) {
                    return e.error(t)
                })).then(null, n.hostReportError), e
            }
        }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "subscribeToIterable", (function() {
        return i
    }));
    var n = r(154),
        i = function(t) {
            return function(e) {
                for (var r = t[n.iterator]();;) {
                    var i = void 0;
                    try {
                        i = r.next()
                    } catch (t) {
                        return e.error(t), e
                    }
                    if (i.done) {
                        e.complete();
                        break
                    }
                    if (e.next(i.value), e.closed) break
                }
                return "function" == typeof r.return && e.add((function() {
                    r.return && r.return()
                })), e
            }
        }
}, function(t, e, r) {
    "use strict";

    function n() {
        return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
    }
    r.r(e), r.d(e, "getSymbolIterator", (function() {
        return n
    })), r.d(e, "iterator", (function() {
        return i
    })), r.d(e, "$$iterator", (function() {
        return o
    }));
    var i = n(),
        o = i
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "subscribeToObservable", (function() {
        return i
    }));
    var n = r(102),
        i = function(t) {
            return function(e) {
                var r = t[n.observable]();
                if ("function" != typeof r.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                return r.subscribe(e)
            }
        }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "isArrayLike", (function() {
        return n
    }));
    var n = function(t) {
        return t && "number" == typeof t.length && "function" != typeof t
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
    }
    r.r(e), r.d(e, "isPromise", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "concat", (function() {
        return o
    }));
    var n = r(123),
        i = r(159);

    function o() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return Object(i.concatAll)()(n.of.apply(void 0, t))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "concatAll", (function() {
        return i
    }));
    var n = r(160);

    function i() {
        return Object(n.mergeAll)(1)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "mergeAll", (function() {
        return o
    }));
    var n = r(161),
        i = r(104);

    function o(t) {
        return void 0 === t && (t = Number.POSITIVE_INFINITY), Object(n.mergeMap)(i.identity, t)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "mergeMap", (function() {
        return u
    })), r.d(e, "MergeMapOperator", (function() {
        return h
    })), r.d(e, "MergeMapSubscriber", (function() {
        return a
    })), r.d(e, "flatMap", (function() {
        return c
    }));
    var n = r(91),
        i = r(145),
        o = r(162),
        s = r(169);

    function u(t, e, r) {
        return void 0 === r && (r = Number.POSITIVE_INFINITY), "function" == typeof e ? function(n) {
            return n.pipe(u((function(r, n) {
                return Object(o.from)(t(r, n)).pipe(Object(i.map)((function(t, i) {
                    return e(r, t, n, i)
                })))
            }), r))
        } : ("number" == typeof e && (r = e), function(e) {
            return e.lift(new h(t, r))
        })
    }
    var h = function() {
            function t(t, e) {
                void 0 === e && (e = Number.POSITIVE_INFINITY), this.project = t, this.concurrent = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.project, this.concurrent))
            }, t
        }(),
        a = function(t) {
            function e(e, r, n) {
                void 0 === n && (n = Number.POSITIVE_INFINITY);
                var i = t.call(this, e) || this;
                return i.project = r, i.concurrent = n, i.hasCompleted = !1, i.buffer = [], i.active = 0, i.index = 0, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
            }, e.prototype._tryNext = function(t) {
                var e, r = this.index++;
                try {
                    e = this.project(t, r)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.active++, this._innerSub(e)
            }, e.prototype._innerSub = function(t) {
                var e = new s.SimpleInnerSubscriber(this),
                    r = this.destination;
                r.add(e);
                var n = Object(s.innerSubscribe)(t, e);
                n !== e && r.add(n)
            }, e.prototype._complete = function() {
                this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
            }, e.prototype.notifyNext = function(t) {
                this.destination.next(t)
            }, e.prototype.notifyComplete = function() {
                var t = this.buffer;
                this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
            }, e
        }(s.SimpleOuterSubscriber),
        c = u
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "from", (function() {
        return s
    }));
    var n = r(88),
        i = r(151),
        o = r(163);

    function s(t, e) {
        return e ? Object(o.scheduled)(t, e) : t instanceof n.Observable ? t : new n.Observable(Object(i.subscribeTo)(t))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "scheduled", (function() {
        return l
    }));
    var n = r(164),
        i = r(165),
        o = r(127),
        s = r(166),
        u = r(167),
        h = r(157),
        a = r(156),
        c = r(168);

    function l(t, e) {
        if (null != t) {
            if (Object(u.isInteropObservable)(t)) return Object(n.scheduleObservable)(t, e);
            if (Object(h.isPromise)(t)) return Object(i.schedulePromise)(t, e);
            if (Object(a.isArrayLike)(t)) return Object(o.scheduleArray)(t, e);
            if (Object(c.isIterable)(t) || "string" == typeof t) return Object(s.scheduleIterable)(t, e)
        }
        throw new TypeError((null !== t && typeof t || t) + " is not observable")
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "scheduleObservable", (function() {
        return s
    }));
    var n = r(88),
        i = r(96),
        o = r(102);

    function s(t, e) {
        return new n.Observable((function(r) {
            var n = new i.Subscription;
            return n.add(e.schedule((function() {
                var i = t[o.observable]();
                n.add(i.subscribe({
                    next: function(t) {
                        n.add(e.schedule((function() {
                            return r.next(t)
                        })))
                    },
                    error: function(t) {
                        n.add(e.schedule((function() {
                            return r.error(t)
                        })))
                    },
                    complete: function() {
                        n.add(e.schedule((function() {
                            return r.complete()
                        })))
                    }
                }))
            }))), n
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "schedulePromise", (function() {
        return o
    }));
    var n = r(88),
        i = r(96);

    function o(t, e) {
        return new n.Observable((function(r) {
            var n = new i.Subscription;
            return n.add(e.schedule((function() {
                return t.then((function(t) {
                    n.add(e.schedule((function() {
                        r.next(t), n.add(e.schedule((function() {
                            return r.complete()
                        })))
                    })))
                }), (function(t) {
                    n.add(e.schedule((function() {
                        return r.error(t)
                    })))
                }))
            }))), n
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "scheduleIterable", (function() {
        return s
    }));
    var n = r(88),
        i = r(96),
        o = r(154);

    function s(t, e) {
        if (!t) throw new Error("Iterable cannot be null");
        return new n.Observable((function(r) {
            var n, s = new i.Subscription;
            return s.add((function() {
                n && "function" == typeof n.return && n.return()
            })), s.add(e.schedule((function() {
                n = t[o.iterator](), s.add(e.schedule((function() {
                    if (!r.closed) {
                        var t, e;
                        try {
                            var i = n.next();
                            t = i.value, e = i.done
                        } catch (t) {
                            return void r.error(t)
                        }
                        e ? r.complete() : (r.next(t), this.schedule())
                    }
                })))
            }))), s
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "isInteropObservable", (function() {
        return i
    }));
    var n = r(102);

    function i(t) {
        return t && "function" == typeof t[n.observable]
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "isIterable", (function() {
        return i
    }));
    var n = r(154);

    function i(t) {
        return t && "function" == typeof t[n.iterator]
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "SimpleInnerSubscriber", (function() {
        return u
    })), r.d(e, "ComplexInnerSubscriber", (function() {
        return h
    })), r.d(e, "SimpleOuterSubscriber", (function() {
        return a
    })), r.d(e, "ComplexOuterSubscriber", (function() {
        return c
    })), r.d(e, "innerSubscribe", (function() {
        return l
    }));
    var n = r(91),
        i = r(90),
        o = r(88),
        s = r(151),
        u = function(t) {
            function e(e) {
                var r = t.call(this) || this;
                return r.parent = e, r
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.parent.notifyNext(t)
            }, e.prototype._error = function(t) {
                this.parent.notifyError(t), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.parent.notifyComplete(), this.unsubscribe()
            }, e
        }(i.Subscriber),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this) || this;
                return i.parent = e, i.outerValue = r, i.outerIndex = n, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.parent.notifyNext(this.outerValue, t, this.outerIndex, this)
            }, e.prototype._error = function(t) {
                this.parent.notifyError(t), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.parent.notifyComplete(this), this.unsubscribe()
            }, e
        }(i.Subscriber),
        a = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.notifyNext = function(t) {
                this.destination.next(t)
            }, e.prototype.notifyError = function(t) {
                this.destination.error(t)
            }, e.prototype.notifyComplete = function() {
                this.destination.complete()
            }, e
        }(i.Subscriber),
        c = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.notifyNext = function(t, e, r, n) {
                this.destination.next(e)
            }, e.prototype.notifyError = function(t) {
                this.destination.error(t)
            }, e.prototype.notifyComplete = function(t) {
                this.destination.complete()
            }, e
        }(i.Subscriber);

    function l(t, e) {
        if (!e.closed) {
            if (t instanceof o.Observable) return t.subscribe(e);
            var r;
            try {
                r = Object(s.subscribeTo)(t)(e)
            } catch (t) {
                e.error(t)
            }
            return r
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "defer", (function() {
        return s
    }));
    var n = r(88),
        i = r(162),
        o = r(122);

    function s(t) {
        return new n.Observable((function(e) {
            var r;
            try {
                r = t()
            } catch (t) {
                return void e.error(t)
            }
            return (r ? Object(i.from)(r) : Object(o.empty)()).subscribe(e)
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "forkJoin", (function() {
        return h
    }));
    var n = r(88),
        i = r(97),
        o = r(145),
        s = r(98),
        u = r(162);

    function h() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        if (1 === t.length) {
            var r = t[0];
            if (Object(i.isArray)(r)) return a(r, null);
            if (Object(s.isObject)(r) && Object.getPrototypeOf(r) === Object.prototype) {
                var n = Object.keys(r);
                return a(n.map((function(t) {
                    return r[t]
                })), n)
            }
        }
        if ("function" == typeof t[t.length - 1]) {
            var u = t.pop();
            return a(t = 1 === t.length && Object(i.isArray)(t[0]) ? t[0] : t, null).pipe(Object(o.map)((function(t) {
                return u.apply(void 0, t)
            })))
        }
        return a(t, null)
    }

    function a(t, e) {
        return new n.Observable((function(r) {
            var n = t.length;
            if (0 !== n)
                for (var i = new Array(n), o = 0, s = 0, h = function(h) {
                        var a = Object(u.from)(t[h]),
                            c = !1;
                        r.add(a.subscribe({
                            next: function(t) {
                                c || (c = !0, s++), i[h] = t
                            },
                            error: function(t) {
                                return r.error(t)
                            },
                            complete: function() {
                                ++o !== n && c || (s === n && r.next(e ? e.reduce((function(t, e, r) {
                                    return t[e] = i[r], t
                                }), {}) : i), r.complete())
                            }
                        }))
                    }, a = 0; a < n; a++) h(a);
            else r.complete()
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "fromEvent", (function() {
        return u
    }));
    var n = r(88),
        i = r(97),
        o = r(92),
        s = r(145);

    function u(t, e, r, h) {
        return Object(o.isFunction)(r) && (h = r, r = void 0), h ? u(t, e, r).pipe(Object(s.map)((function(t) {
            return Object(i.isArray)(t) ? h.apply(void 0, t) : h(t)
        }))) : new n.Observable((function(n) {
            ! function t(e, r, n, i, o) {
                var s;
                if (function(t) {
                        return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
                    }(e)) {
                    var u = e;
                    e.addEventListener(r, n, o), s = function() {
                        return u.removeEventListener(r, n, o)
                    }
                } else if (function(t) {
                        return t && "function" == typeof t.on && "function" == typeof t.off
                    }(e)) {
                    var h = e;
                    e.on(r, n), s = function() {
                        return h.off(r, n)
                    }
                } else if (function(t) {
                        return t && "function" == typeof t.addListener && "function" == typeof t.removeListener
                    }(e)) {
                    var a = e;
                    e.addListener(r, n), s = function() {
                        return a.removeListener(r, n)
                    }
                } else {
                    if (!e || !e.length) throw new TypeError("Invalid event target");
                    for (var c = 0, l = e.length; c < l; c++) t(e[c], r, n, i, o)
                }
                i.add(s)
            }(t, e, (function(t) {
                arguments.length > 1 ? n.next(Array.prototype.slice.call(arguments)) : n.next(t)
            }), n, r)
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "fromEventPattern", (function() {
        return u
    }));
    var n = r(88),
        i = r(97),
        o = r(92),
        s = r(145);

    function u(t, e, r) {
        return r ? u(t, e).pipe(Object(s.map)((function(t) {
            return Object(i.isArray)(t) ? r.apply(void 0, t) : r(t)
        }))) : new n.Observable((function(r) {
            var n, i = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return r.next(1 === t.length ? t[0] : t)
            };
            try {
                n = t(i)
            } catch (t) {
                return void r.error(t)
            }
            if (Object(o.isFunction)(e)) return function() {
                return e(i, n)
            }
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "generate", (function() {
        return s
    }));
    var n = r(88),
        i = r(104),
        o = r(124);

    function s(t, e, r, s, h) {
        var a, c;
        if (1 == arguments.length) {
            var l = t;
            c = l.initialState, e = l.condition, r = l.iterate, a = l.resultSelector || i.identity, h = l.scheduler
        } else void 0 === s || Object(o.isScheduler)(s) ? (c = t, a = i.identity, h = s) : (c = t, a = s);
        return new n.Observable((function(t) {
            var n = c;
            if (h) return h.schedule(u, 0, {
                subscriber: t,
                iterate: r,
                condition: e,
                resultSelector: a,
                state: n
            });
            for (;;) {
                if (e) {
                    var i = void 0;
                    try {
                        i = e(n)
                    } catch (e) {
                        return void t.error(e)
                    }
                    if (!i) {
                        t.complete();
                        break
                    }
                }
                var o = void 0;
                try {
                    o = a(n)
                } catch (e) {
                    return void t.error(e)
                }
                if (t.next(o), t.closed) break;
                try {
                    n = r(n)
                } catch (e) {
                    return void t.error(e)
                }
            }
        }))
    }

    function u(t) {
        var e = t.subscriber,
            r = t.condition;
        if (!e.closed) {
            if (t.needIterate) try {
                t.state = t.iterate(t.state)
            } catch (t) {
                return void e.error(t)
            } else t.needIterate = !0;
            if (r) {
                var n = void 0;
                try {
                    n = r(t.state)
                } catch (t) {
                    return void e.error(t)
                }
                if (!n) return void e.complete();
                if (e.closed) return
            }
            var i;
            try {
                i = t.resultSelector(t.state)
            } catch (t) {
                return void e.error(t)
            }
            if (!e.closed && (e.next(i), !e.closed)) return this.schedule(t)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "iif", (function() {
        return o
    }));
    var n = r(170),
        i = r(122);

    function o(t, e, r) {
        return void 0 === e && (e = i.EMPTY), void 0 === r && (r = i.EMPTY), Object(n.defer)((function() {
            return t() ? e : r
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "interval", (function() {
        return s
    }));
    var n = r(88),
        i = r(134),
        o = r(177);

    function s(t, e) {
        return void 0 === t && (t = 0), void 0 === e && (e = i.async), (!Object(o.isNumeric)(t) || t < 0) && (t = 0), e && "function" == typeof e.schedule || (e = i.async), new n.Observable((function(r) {
            return r.add(e.schedule(u, t, {
                subscriber: r,
                counter: 0,
                period: t
            })), r
        }))
    }

    function u(t) {
        var e = t.subscriber,
            r = t.counter,
            n = t.period;
        e.next(r), this.schedule({
            subscriber: e,
            counter: r + 1,
            period: n
        }, n)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "isNumeric", (function() {
        return i
    }));
    var n = r(97);

    function i(t) {
        return !Object(n.isArray)(t) && t - parseFloat(t) + 1 >= 0
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "merge", (function() {
        return u
    }));
    var n = r(88),
        i = r(124),
        o = r(160),
        s = r(125);

    function u() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = Number.POSITIVE_INFINITY,
            u = null,
            h = t[t.length - 1];
        return Object(i.isScheduler)(h) ? (u = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (r = t.pop())) : "number" == typeof h && (r = t.pop()), null === u && 1 === t.length && t[0] instanceof n.Observable ? t[0] : Object(o.mergeAll)(r)(Object(s.fromArray)(t, u))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "NEVER", (function() {
        return o
    })), r.d(e, "never", (function() {
        return s
    }));
    var n = r(88),
        i = r(139),
        o = new n.Observable(i.noop);

    function s() {
        return o
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "onErrorResumeNext", (function() {
        return u
    }));
    var n = r(88),
        i = r(162),
        o = r(97),
        s = r(122);

    function u() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        if (0 === t.length) return s.EMPTY;
        var r = t[0],
            h = t.slice(1);
        return 1 === t.length && Object(o.isArray)(r) ? u.apply(void 0, r) : new n.Observable((function(t) {
            var e = function() {
                return t.add(u.apply(void 0, h).subscribe(t))
            };
            return Object(i.from)(r).subscribe({
                next: function(e) {
                    t.next(e)
                },
                error: e,
                complete: e
            })
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "pairs", (function() {
        return o
    })), r.d(e, "dispatch", (function() {
        return s
    }));
    var n = r(88),
        i = r(96);

    function o(t, e) {
        return e ? new n.Observable((function(r) {
            var n = Object.keys(t),
                o = new i.Subscription;
            return o.add(e.schedule(s, 0, {
                keys: n,
                index: 0,
                subscriber: r,
                subscription: o,
                obj: t
            })), o
        })) : new n.Observable((function(e) {
            for (var r = Object.keys(t), n = 0; n < r.length && !e.closed; n++) {
                var i = r[n];
                t.hasOwnProperty(i) && e.next([i, t[i]])
            }
            e.complete()
        }))
    }

    function s(t) {
        var e = t.keys,
            r = t.index,
            n = t.subscriber,
            i = t.subscription,
            o = t.obj;
        if (!n.closed)
            if (r < e.length) {
                var s = e[r];
                n.next([s, o[s]]), i.add(this.schedule({
                    keys: e,
                    index: r + 1,
                    subscriber: n,
                    subscription: i,
                    obj: o
                }))
            } else n.complete()
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "partition", (function() {
        return u
    }));
    var n = r(183),
        i = r(151),
        o = r(184),
        s = r(88);

    function u(t, e, r) {
        return [Object(o.filter)(e, r)(new s.Observable(Object(i.subscribeTo)(t))), Object(o.filter)(Object(n.not)(e, r))(new s.Observable(Object(i.subscribeTo)(t)))]
    }
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        function r() {
            return !r.pred.apply(r.thisArg, arguments)
        }
        return r.pred = t, r.thisArg = e, r
    }
    r.r(e), r.d(e, "not", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "filter", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        return function(r) {
            return r.lift(new s(t, e))
        }
    }
    var s = function() {
            function t(t, e) {
                this.predicate = t, this.thisArg = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.predicate, this.thisArg))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.predicate = r, i.thisArg = n, i.count = 0, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e;
                try {
                    e = this.predicate.call(this.thisArg, t, this.count++)
                } catch (t) {
                    return void this.destination.error(t)
                }
                e && this.destination.next(t)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "race", (function() {
        return h
    })), r.d(e, "RaceOperator", (function() {
        return a
    })), r.d(e, "RaceSubscriber", (function() {
        return c
    }));
    var n = r(91),
        i = r(97),
        o = r(125),
        s = r(148),
        u = r(149);

    function h() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        if (1 === t.length) {
            if (!Object(i.isArray)(t[0])) return t[0];
            t = t[0]
        }
        return Object(o.fromArray)(t, void 0).lift(new a)
    }
    var a = function() {
            function t() {}
            return t.prototype.call = function(t, e) {
                return e.subscribe(new c(t))
            }, t
        }(),
        c = function(t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.hasFirst = !1, r.observables = [], r.subscriptions = [], r
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.observables.push(t)
            }, e.prototype._complete = function() {
                var t = this.observables,
                    e = t.length;
                if (0 === e) this.destination.complete();
                else {
                    for (var r = 0; r < e && !this.hasFirst; r++) {
                        var n = t[r],
                            i = Object(u.subscribeToResult)(this, n, void 0, r);
                        this.subscriptions && this.subscriptions.push(i), this.add(i)
                    }
                    this.observables = null
                }
            }, e.prototype.notifyNext = function(t, e, r) {
                if (!this.hasFirst) {
                    this.hasFirst = !0;
                    for (var n = 0; n < this.subscriptions.length; n++)
                        if (n !== r) {
                            var i = this.subscriptions[n];
                            i.unsubscribe(), this.remove(i)
                        } this.subscriptions = null
                }
                this.destination.next(e)
            }, e
        }(s.OuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "range", (function() {
        return i
    })), r.d(e, "dispatch", (function() {
        return o
    }));
    var n = r(88);

    function i(t, e, r) {
        return void 0 === t && (t = 0), new n.Observable((function(n) {
            void 0 === e && (e = t, t = 0);
            var i = 0,
                s = t;
            if (r) return r.schedule(o, 0, {
                index: i,
                count: e,
                start: t,
                subscriber: n
            });
            for (;;) {
                if (i++ >= e) {
                    n.complete();
                    break
                }
                if (n.next(s++), n.closed) break
            }
        }))
    }

    function o(t) {
        var e = t.start,
            r = t.index,
            n = t.count,
            i = t.subscriber;
        r >= n ? i.complete() : (i.next(e), i.closed || (t.index = r + 1, t.start = e + 1, this.schedule(t)))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "timer", (function() {
        return u
    }));
    var n = r(88),
        i = r(134),
        o = r(177),
        s = r(124);

    function u(t, e, r) {
        void 0 === t && (t = 0);
        var u = -1;
        return Object(o.isNumeric)(e) ? u = Number(e) < 1 ? 1 : Number(e) : Object(s.isScheduler)(e) && (r = e), Object(s.isScheduler)(r) || (r = i.async), new n.Observable((function(e) {
            var n = Object(o.isNumeric)(t) ? t : +t - r.now();
            return r.schedule(h, n, {
                index: 0,
                period: u,
                subscriber: e
            })
        }))
    }

    function h(t) {
        var e = t.index,
            r = t.period,
            n = t.subscriber;
        if (n.next(e), !n.closed) {
            if (-1 === r) return n.complete();
            t.index = e + 1, this.schedule(t, r)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "using", (function() {
        return s
    }));
    var n = r(88),
        i = r(162),
        o = r(122);

    function s(t, e) {
        return new n.Observable((function(r) {
            var n, s;
            try {
                n = t()
            } catch (t) {
                return void r.error(t)
            }
            try {
                s = e(n)
            } catch (t) {
                return void r.error(t)
            }
            var u = (s ? Object(i.from)(s) : o.EMPTY).subscribe(r);
            return function() {
                u.unsubscribe(), n && n.unsubscribe()
            }
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "zip", (function() {
        return a
    })), r.d(e, "ZipOperator", (function() {
        return c
    })), r.d(e, "ZipSubscriber", (function() {
        return l
    }));
    var n = r(91),
        i = r(125),
        o = r(97),
        s = r(90),
        u = r(154),
        h = r(169);

    function a() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t[t.length - 1];
        return "function" == typeof r && t.pop(), Object(i.fromArray)(t, void 0).lift(new c(r))
    }
    var c = function() {
            function t(t) {
                this.resultSelector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new l(t, this.resultSelector))
            }, t
        }(),
        l = function(t) {
            function e(e, r, n) {
                void 0 === n && (n = Object.create(null));
                var i = t.call(this, e) || this;
                return i.resultSelector = r, i.iterators = [], i.active = 0, i.resultSelector = "function" == typeof r ? r : void 0, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this.iterators;
                Object(o.isArray)(t) ? e.push(new d(t)) : "function" == typeof t[u.iterator] ? e.push(new f(t[u.iterator]())) : e.push(new p(this.destination, this, t))
            }, e.prototype._complete = function() {
                var t = this.iterators,
                    e = t.length;
                if (this.unsubscribe(), 0 !== e) {
                    this.active = e;
                    for (var r = 0; r < e; r++) {
                        var n = t[r];
                        if (n.stillUnsubscribed) this.destination.add(n.subscribe());
                        else this.active--
                    }
                } else this.destination.complete()
            }, e.prototype.notifyInactive = function() {
                this.active--, 0 === this.active && this.destination.complete()
            }, e.prototype.checkIterators = function() {
                for (var t = this.iterators, e = t.length, r = this.destination, n = 0; n < e; n++) {
                    if ("function" == typeof(s = t[n]).hasValue && !s.hasValue()) return
                }
                var i = !1,
                    o = [];
                for (n = 0; n < e; n++) {
                    var s, u = (s = t[n]).next();
                    if (s.hasCompleted() && (i = !0), u.done) return void r.complete();
                    o.push(u.value)
                }
                this.resultSelector ? this._tryresultSelector(o) : r.next(o), i && r.complete()
            }, e.prototype._tryresultSelector = function(t) {
                var e;
                try {
                    e = this.resultSelector.apply(this, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.next(e)
            }, e
        }(s.Subscriber),
        f = function() {
            function t(t) {
                this.iterator = t, this.nextResult = t.next()
            }
            return t.prototype.hasValue = function() {
                return !0
            }, t.prototype.next = function() {
                var t = this.nextResult;
                return this.nextResult = this.iterator.next(), t
            }, t.prototype.hasCompleted = function() {
                var t = this.nextResult;
                return Boolean(t && t.done)
            }, t
        }(),
        d = function() {
            function t(t) {
                this.array = t, this.index = 0, this.length = 0, this.length = t.length
            }
            return t.prototype[u.iterator] = function() {
                return this
            }, t.prototype.next = function(t) {
                var e = this.index++,
                    r = this.array;
                return e < this.length ? {
                    value: r[e],
                    done: !1
                } : {
                    value: null,
                    done: !0
                }
            }, t.prototype.hasValue = function() {
                return this.array.length > this.index
            }, t.prototype.hasCompleted = function() {
                return this.array.length === this.index
            }, t
        }(),
        p = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.parent = r, i.observable = n, i.stillUnsubscribed = !0, i.buffer = [], i.isComplete = !1, i
            }
            return n.__extends(e, t), e.prototype[u.iterator] = function() {
                return this
            }, e.prototype.next = function() {
                var t = this.buffer;
                return 0 === t.length && this.isComplete ? {
                    value: null,
                    done: !0
                } : {
                    value: t.shift(),
                    done: !1
                }
            }, e.prototype.hasValue = function() {
                return this.buffer.length > 0
            }, e.prototype.hasCompleted = function() {
                return 0 === this.buffer.length && this.isComplete
            }, e.prototype.notifyComplete = function() {
                this.buffer.length > 0 ? (this.isComplete = !0, this.parent.notifyInactive()) : this.destination.complete()
            }, e.prototype.notifyNext = function(t) {
                this.buffer.push(t), this.parent.checkIterators()
            }, e.prototype.subscribe = function() {
                return Object(h.innerSubscribe)(this.observable, new h.SimpleInnerSubscriber(this))
            }, e
        }(h.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    (function(t) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.receiveAPDU = void 0;
        var n = r(31),
            i = r(87),
            o = r(82);
        e.receiveAPDU = e => i.Observable.create(r => {
            let i = 0,
                s = 0,
                u = t.alloc(0);
            const h = e.subscribe({
                complete: () => {
                    r.error(new n.DisconnectedDevice), h.unsubscribe()
                },
                error: t => {
                    (0, o.log)("ble-error", "in receiveAPDU " + String(t)), r.error(t), h.unsubscribe()
                },
                next: e => {
                    const o = e.readUInt8(0),
                        a = e.readUInt16BE(1);
                    let c = e.slice(3);
                    5 === o ? i === a ? (0 === a && (s = c.readUInt16BE(0), c = c.slice(2)), i++, u = t.concat([u, c]), u.length > s ? r.error(new n.TransportError("BLE: received too much data. discontinued chunk. Received " + u.length + " but expected " + s, "BLETooMuchData")) : u.length === s && (r.next(u), r.complete(), h.unsubscribe())) : r.error(new n.TransportError("BLE: Invalid sequence number. discontinued chunk. Received " + a + " but expected " + i, "InvalidSequence")) : r.error(new n.TransportError("Invalid tag " + o.toString(16), "InvalidTag"))
                }
            });
            return () => {
                h.unsubscribe()
            }
        })
    }).call(this, r(2).Buffer)
}, function(t, e, r) {
    "use strict";
    r.r(e);
    var n = r(192);
    r.d(e, "audit", (function() {
        return n.audit
    }));
    var i = r(193);
    r.d(e, "auditTime", (function() {
        return i.auditTime
    }));
    var o = r(194);
    r.d(e, "buffer", (function() {
        return o.buffer
    }));
    var s = r(195);
    r.d(e, "bufferCount", (function() {
        return s.bufferCount
    }));
    var u = r(196);
    r.d(e, "bufferTime", (function() {
        return u.bufferTime
    }));
    var h = r(197);
    r.d(e, "bufferToggle", (function() {
        return h.bufferToggle
    }));
    var a = r(198);
    r.d(e, "bufferWhen", (function() {
        return a.bufferWhen
    }));
    var c = r(199);
    r.d(e, "catchError", (function() {
        return c.catchError
    }));
    var l = r(200);
    r.d(e, "combineAll", (function() {
        return l.combineAll
    }));
    var f = r(201);
    r.d(e, "combineLatest", (function() {
        return f.combineLatest
    }));
    var d = r(202);
    r.d(e, "concat", (function() {
        return d.concat
    }));
    var p = r(159);
    r.d(e, "concatAll", (function() {
        return p.concatAll
    }));
    var m = r(203);
    r.d(e, "concatMap", (function() {
        return m.concatMap
    }));
    var v = r(204);
    r.d(e, "concatMapTo", (function() {
        return v.concatMapTo
    }));
    var b = r(205);
    r.d(e, "count", (function() {
        return b.count
    }));
    var y = r(206);
    r.d(e, "debounce", (function() {
        return y.debounce
    }));
    var g = r(207);
    r.d(e, "debounceTime", (function() {
        return g.debounceTime
    }));
    var w = r(208);
    r.d(e, "defaultIfEmpty", (function() {
        return w.defaultIfEmpty
    }));
    var M = r(209);
    r.d(e, "delay", (function() {
        return M.delay
    }));
    var _ = r(211);
    r.d(e, "delayWhen", (function() {
        return _.delayWhen
    }));
    var S = r(212);
    r.d(e, "dematerialize", (function() {
        return S.dematerialize
    }));
    var E = r(213);
    r.d(e, "distinct", (function() {
        return E.distinct
    }));
    var x = r(214);
    r.d(e, "distinctUntilChanged", (function() {
        return x.distinctUntilChanged
    }));
    var A = r(215);
    r.d(e, "distinctUntilKeyChanged", (function() {
        return A.distinctUntilKeyChanged
    }));
    var O = r(216);
    r.d(e, "elementAt", (function() {
        return O.elementAt
    }));
    var I = r(219);
    r.d(e, "endWith", (function() {
        return I.endWith
    }));
    var T = r(220);
    r.d(e, "every", (function() {
        return T.every
    }));
    var N = r(221);
    r.d(e, "exhaust", (function() {
        return N.exhaust
    }));
    var R = r(222);
    r.d(e, "exhaustMap", (function() {
        return R.exhaustMap
    }));
    var B = r(223);
    r.d(e, "expand", (function() {
        return B.expand
    }));
    var j = r(184);
    r.d(e, "filter", (function() {
        return j.filter
    }));
    var C = r(224);
    r.d(e, "finalize", (function() {
        return C.finalize
    }));
    var D = r(225);
    r.d(e, "find", (function() {
        return D.find
    }));
    var U = r(226);
    r.d(e, "findIndex", (function() {
        return U.findIndex
    }));
    var L = r(227);
    r.d(e, "first", (function() {
        return L.first
    }));
    var k = r(110);
    r.d(e, "groupBy", (function() {
        return k.groupBy
    }));
    var P = r(228);
    r.d(e, "ignoreElements", (function() {
        return P.ignoreElements
    }));
    var F = r(229);
    r.d(e, "isEmpty", (function() {
        return F.isEmpty
    }));
    var $ = r(230);
    r.d(e, "last", (function() {
        return $.last
    }));
    var V = r(145);
    r.d(e, "map", (function() {
        return V.map
    }));
    var q = r(232);
    r.d(e, "mapTo", (function() {
        return q.mapTo
    }));
    var z = r(233);
    r.d(e, "materialize", (function() {
        return z.materialize
    }));
    var Y = r(234);
    r.d(e, "max", (function() {
        return Y.max
    }));
    var W = r(237);
    r.d(e, "merge", (function() {
        return W.merge
    }));
    var G = r(160);
    r.d(e, "mergeAll", (function() {
        return G.mergeAll
    }));
    var Z = r(161);
    r.d(e, "mergeMap", (function() {
        return Z.mergeMap
    })), r.d(e, "flatMap", (function() {
        return Z.flatMap
    }));
    var H = r(238);
    r.d(e, "mergeMapTo", (function() {
        return H.mergeMapTo
    }));
    var K = r(239);
    r.d(e, "mergeScan", (function() {
        return K.mergeScan
    }));
    var X = r(240);
    r.d(e, "min", (function() {
        return X.min
    }));
    var Q = r(241);
    r.d(e, "multicast", (function() {
        return Q.multicast
    }));
    var J = r(120);
    r.d(e, "observeOn", (function() {
        return J.observeOn
    }));
    var tt = r(242);
    r.d(e, "onErrorResumeNext", (function() {
        return tt.onErrorResumeNext
    }));
    var et = r(243);
    r.d(e, "pairwise", (function() {
        return et.pairwise
    }));
    var rt = r(244);
    r.d(e, "partition", (function() {
        return rt.partition
    }));
    var nt = r(245);
    r.d(e, "pluck", (function() {
        return nt.pluck
    }));
    var it = r(246);
    r.d(e, "publish", (function() {
        return it.publish
    }));
    var ot = r(247);
    r.d(e, "publishBehavior", (function() {
        return ot.publishBehavior
    }));
    var st = r(248);
    r.d(e, "publishLast", (function() {
        return st.publishLast
    }));
    var ut = r(249);
    r.d(e, "publishReplay", (function() {
        return ut.publishReplay
    }));
    var ht = r(250);
    r.d(e, "race", (function() {
        return ht.race
    }));
    var at = r(235);
    r.d(e, "reduce", (function() {
        return at.reduce
    }));
    var ct = r(251);
    r.d(e, "repeat", (function() {
        return ct.repeat
    }));
    var lt = r(252);
    r.d(e, "repeatWhen", (function() {
        return lt.repeatWhen
    }));
    var ft = r(253);
    r.d(e, "retry", (function() {
        return ft.retry
    }));
    var dt = r(254);
    r.d(e, "retryWhen", (function() {
        return dt.retryWhen
    }));
    var pt = r(109);
    r.d(e, "refCount", (function() {
        return pt.refCount
    }));
    var mt = r(255);
    r.d(e, "sample", (function() {
        return mt.sample
    }));
    var vt = r(256);
    r.d(e, "sampleTime", (function() {
        return vt.sampleTime
    }));
    var bt = r(236);
    r.d(e, "scan", (function() {
        return bt.scan
    }));
    var yt = r(257);
    r.d(e, "sequenceEqual", (function() {
        return yt.sequenceEqual
    }));
    var gt = r(258);
    r.d(e, "share", (function() {
        return gt.share
    }));
    var wt = r(259);
    r.d(e, "shareReplay", (function() {
        return wt.shareReplay
    }));
    var Mt = r(260);
    r.d(e, "single", (function() {
        return Mt.single
    }));
    var _t = r(261);
    r.d(e, "skip", (function() {
        return _t.skip
    }));
    var St = r(262);
    r.d(e, "skipLast", (function() {
        return St.skipLast
    }));
    var Et = r(263);
    r.d(e, "skipUntil", (function() {
        return Et.skipUntil
    }));
    var xt = r(264);
    r.d(e, "skipWhile", (function() {
        return xt.skipWhile
    }));
    var At = r(265);
    r.d(e, "startWith", (function() {
        return At.startWith
    }));
    var Ot = r(266);
    r.d(e, "subscribeOn", (function() {
        return Ot.subscribeOn
    }));
    var It = r(268);
    r.d(e, "switchAll", (function() {
        return It.switchAll
    }));
    var Tt = r(269);
    r.d(e, "switchMap", (function() {
        return Tt.switchMap
    }));
    var Nt = r(270);
    r.d(e, "switchMapTo", (function() {
        return Nt.switchMapTo
    }));
    var Rt = r(218);
    r.d(e, "take", (function() {
        return Rt.take
    }));
    var Bt = r(231);
    r.d(e, "takeLast", (function() {
        return Bt.takeLast
    }));
    var jt = r(271);
    r.d(e, "takeUntil", (function() {
        return jt.takeUntil
    }));
    var Ct = r(272);
    r.d(e, "takeWhile", (function() {
        return Ct.takeWhile
    }));
    var Dt = r(273);
    r.d(e, "tap", (function() {
        return Dt.tap
    }));
    var Ut = r(274);
    r.d(e, "throttle", (function() {
        return Ut.throttle
    }));
    var Lt = r(275);
    r.d(e, "throttleTime", (function() {
        return Lt.throttleTime
    }));
    var kt = r(217);
    r.d(e, "throwIfEmpty", (function() {
        return kt.throwIfEmpty
    }));
    var Pt = r(276);
    r.d(e, "timeInterval", (function() {
        return Pt.timeInterval
    }));
    var Ft = r(277);
    r.d(e, "timeout", (function() {
        return Ft.timeout
    }));
    var $t = r(278);
    r.d(e, "timeoutWith", (function() {
        return $t.timeoutWith
    }));
    var Vt = r(279);
    r.d(e, "timestamp", (function() {
        return Vt.timestamp
    }));
    var qt = r(280);
    r.d(e, "toArray", (function() {
        return qt.toArray
    }));
    var zt = r(281);
    r.d(e, "window", (function() {
        return zt.window
    }));
    var Yt = r(282);
    r.d(e, "windowCount", (function() {
        return Yt.windowCount
    }));
    var Wt = r(283);
    r.d(e, "windowTime", (function() {
        return Wt.windowTime
    }));
    var Gt = r(284);
    r.d(e, "windowToggle", (function() {
        return Gt.windowToggle
    }));
    var Zt = r(285);
    r.d(e, "windowWhen", (function() {
        return Zt.windowWhen
    }));
    var Ht = r(286);
    r.d(e, "withLatestFrom", (function() {
        return Ht.withLatestFrom
    }));
    var Kt = r(287);
    r.d(e, "zip", (function() {
        return Kt.zip
    }));
    var Xt = r(288);
    r.d(e, "zipAll", (function() {
        return Xt.zipAll
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "audit", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.durationSelector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.durationSelector))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.durationSelector = r, n.hasValue = !1, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                if (this.value = t, this.hasValue = !0, !this.throttled) {
                    var e = void 0;
                    try {
                        e = (0, this.durationSelector)(t)
                    } catch (t) {
                        return this.destination.error(t)
                    }
                    var r = Object(i.innerSubscribe)(e, new i.SimpleInnerSubscriber(this));
                    !r || r.closed ? this.clearThrottle() : this.add(this.throttled = r)
                }
            }, e.prototype.clearThrottle = function() {
                var t = this.value,
                    e = this.hasValue,
                    r = this.throttled;
                r && (this.remove(r), this.throttled = void 0, r.unsubscribe()), e && (this.value = void 0, this.hasValue = !1, this.destination.next(t))
            }, e.prototype.notifyNext = function() {
                this.clearThrottle()
            }, e.prototype.notifyComplete = function() {
                this.clearThrottle()
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "auditTime", (function() {
        return s
    }));
    var n = r(134),
        i = r(192),
        o = r(187);

    function s(t, e) {
        return void 0 === e && (e = n.async), Object(i.audit)((function() {
            return Object(o.timer)(t, e)
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "buffer", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.closingNotifier = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.closingNotifier))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.buffer = [], n.add(Object(i.innerSubscribe)(r, new i.SimpleInnerSubscriber(n))), n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.buffer.push(t)
            }, e.prototype.notifyNext = function() {
                var t = this.buffer;
                this.buffer = [], this.destination.next(t)
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "bufferCount", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        return void 0 === e && (e = null),
            function(r) {
                return r.lift(new s(t, e))
            }
    }
    var s = function() {
            function t(t, e) {
                this.bufferSize = t, this.startBufferEvery = e, this.subscriberClass = e && t !== e ? h : u
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new this.subscriberClass(t, this.bufferSize, this.startBufferEvery))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.bufferSize = r, n.buffer = [], n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this.buffer;
                e.push(t), e.length == this.bufferSize && (this.destination.next(e), this.buffer = [])
            }, e.prototype._complete = function() {
                var e = this.buffer;
                e.length > 0 && this.destination.next(e), t.prototype._complete.call(this)
            }, e
        }(i.Subscriber),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.bufferSize = r, i.startBufferEvery = n, i.buffers = [], i.count = 0, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this.bufferSize,
                    r = this.startBufferEvery,
                    n = this.buffers,
                    i = this.count;
                this.count++, i % r == 0 && n.push([]);
                for (var o = n.length; o--;) {
                    var s = n[o];
                    s.push(t), s.length === e && (n.splice(o, 1), this.destination.next(s))
                }
            }, e.prototype._complete = function() {
                for (var e = this.buffers, r = this.destination; e.length > 0;) {
                    var n = e.shift();
                    n.length > 0 && r.next(n)
                }
                t.prototype._complete.call(this)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "bufferTime", (function() {
        return u
    }));
    var n = r(91),
        i = r(134),
        o = r(90),
        s = r(124);

    function u(t) {
        var e = arguments.length,
            r = i.async;
        Object(s.isScheduler)(arguments[arguments.length - 1]) && (r = arguments[arguments.length - 1], e--);
        var n = null;
        e >= 2 && (n = arguments[1]);
        var o = Number.POSITIVE_INFINITY;
        return e >= 3 && (o = arguments[2]),
            function(e) {
                return e.lift(new h(t, n, o, r))
            }
    }
    var h = function() {
            function t(t, e, r, n) {
                this.bufferTimeSpan = t, this.bufferCreationInterval = e, this.maxBufferSize = r, this.scheduler = n
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new c(t, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler))
            }, t
        }(),
        a = function() {
            return function() {
                this.buffer = []
            }
        }(),
        c = function(t) {
            function e(e, r, n, i, o) {
                var s = t.call(this, e) || this;
                s.bufferTimeSpan = r, s.bufferCreationInterval = n, s.maxBufferSize = i, s.scheduler = o, s.contexts = [];
                var u = s.openContext();
                if (s.timespanOnly = null == n || n < 0, s.timespanOnly) {
                    var h = {
                        subscriber: s,
                        context: u,
                        bufferTimeSpan: r
                    };
                    s.add(u.closeAction = o.schedule(l, r, h))
                } else {
                    var a = {
                            subscriber: s,
                            context: u
                        },
                        c = {
                            bufferTimeSpan: r,
                            bufferCreationInterval: n,
                            subscriber: s,
                            scheduler: o
                        };
                    s.add(u.closeAction = o.schedule(d, r, a)), s.add(o.schedule(f, n, c))
                }
                return s
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                for (var e, r = this.contexts, n = r.length, i = 0; i < n; i++) {
                    var o = r[i],
                        s = o.buffer;
                    s.push(t), s.length == this.maxBufferSize && (e = o)
                }
                e && this.onBufferFull(e)
            }, e.prototype._error = function(e) {
                this.contexts.length = 0, t.prototype._error.call(this, e)
            }, e.prototype._complete = function() {
                for (var e = this.contexts, r = this.destination; e.length > 0;) {
                    var n = e.shift();
                    r.next(n.buffer)
                }
                t.prototype._complete.call(this)
            }, e.prototype._unsubscribe = function() {
                this.contexts = null
            }, e.prototype.onBufferFull = function(t) {
                this.closeContext(t);
                var e = t.closeAction;
                if (e.unsubscribe(), this.remove(e), !this.closed && this.timespanOnly) {
                    t = this.openContext();
                    var r = this.bufferTimeSpan,
                        n = {
                            subscriber: this,
                            context: t,
                            bufferTimeSpan: r
                        };
                    this.add(t.closeAction = this.scheduler.schedule(l, r, n))
                }
            }, e.prototype.openContext = function() {
                var t = new a;
                return this.contexts.push(t), t
            }, e.prototype.closeContext = function(t) {
                this.destination.next(t.buffer);
                var e = this.contexts;
                (e ? e.indexOf(t) : -1) >= 0 && e.splice(e.indexOf(t), 1)
            }, e
        }(o.Subscriber);

    function l(t) {
        var e = t.subscriber,
            r = t.context;
        r && e.closeContext(r), e.closed || (t.context = e.openContext(), t.context.closeAction = this.schedule(t, t.bufferTimeSpan))
    }

    function f(t) {
        var e = t.bufferCreationInterval,
            r = t.bufferTimeSpan,
            n = t.subscriber,
            i = t.scheduler,
            o = n.openContext();
        n.closed || (n.add(o.closeAction = i.schedule(d, r, {
            subscriber: n,
            context: o
        })), this.schedule(t, e))
    }

    function d(t) {
        var e = t.subscriber,
            r = t.context;
        e.closeContext(r)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "bufferToggle", (function() {
        return u
    }));
    var n = r(91),
        i = r(96),
        o = r(149),
        s = r(148);

    function u(t, e) {
        return function(r) {
            return r.lift(new h(t, e))
        }
    }
    var h = function() {
            function t(t, e) {
                this.openings = t, this.closingSelector = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.openings, this.closingSelector))
            }, t
        }(),
        a = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.closingSelector = n, i.contexts = [], i.add(Object(o.subscribeToResult)(i, r)), i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                for (var e = this.contexts, r = e.length, n = 0; n < r; n++) e[n].buffer.push(t)
            }, e.prototype._error = function(e) {
                for (var r = this.contexts; r.length > 0;) {
                    var n = r.shift();
                    n.subscription.unsubscribe(), n.buffer = null, n.subscription = null
                }
                this.contexts = null, t.prototype._error.call(this, e)
            }, e.prototype._complete = function() {
                for (var e = this.contexts; e.length > 0;) {
                    var r = e.shift();
                    this.destination.next(r.buffer), r.subscription.unsubscribe(), r.buffer = null, r.subscription = null
                }
                this.contexts = null, t.prototype._complete.call(this)
            }, e.prototype.notifyNext = function(t, e) {
                t ? this.closeBuffer(t) : this.openBuffer(e)
            }, e.prototype.notifyComplete = function(t) {
                this.closeBuffer(t.context)
            }, e.prototype.openBuffer = function(t) {
                try {
                    var e = this.closingSelector.call(this, t);
                    e && this.trySubscribe(e)
                } catch (t) {
                    this._error(t)
                }
            }, e.prototype.closeBuffer = function(t) {
                var e = this.contexts;
                if (e && t) {
                    var r = t.buffer,
                        n = t.subscription;
                    this.destination.next(r), e.splice(e.indexOf(t), 1), this.remove(n), n.unsubscribe()
                }
            }, e.prototype.trySubscribe = function(t) {
                var e = this.contexts,
                    r = new i.Subscription,
                    n = {
                        buffer: [],
                        subscription: r
                    };
                e.push(n);
                var s = Object(o.subscribeToResult)(this, t, n);
                !s || s.closed ? this.closeBuffer(n) : (s.context = n, this.add(s), r.add(s))
            }, e
        }(s.OuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "bufferWhen", (function() {
        return s
    }));
    var n = r(91),
        i = r(96),
        o = r(169);

    function s(t) {
        return function(e) {
            return e.lift(new u(t))
        }
    }
    var u = function() {
            function t(t) {
                this.closingSelector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.closingSelector))
            }, t
        }(),
        h = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.closingSelector = r, n.subscribing = !1, n.openBuffer(), n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.buffer.push(t)
            }, e.prototype._complete = function() {
                var e = this.buffer;
                e && this.destination.next(e), t.prototype._complete.call(this)
            }, e.prototype._unsubscribe = function() {
                this.buffer = void 0, this.subscribing = !1
            }, e.prototype.notifyNext = function() {
                this.openBuffer()
            }, e.prototype.notifyComplete = function() {
                this.subscribing ? this.complete() : this.openBuffer()
            }, e.prototype.openBuffer = function() {
                var t = this.closingSubscription;
                t && (this.remove(t), t.unsubscribe());
                var e, r = this.buffer;
                this.buffer && this.destination.next(r), this.buffer = [];
                try {
                    e = (0, this.closingSelector)()
                } catch (t) {
                    return this.error(t)
                }
                t = new i.Subscription, this.closingSubscription = t, this.add(t), this.subscribing = !0, t.add(Object(o.innerSubscribe)(e, new o.SimpleInnerSubscriber(this))), this.subscribing = !1
            }, e
        }(o.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "catchError", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o(t) {
        return function(e) {
            var r = new s(t),
                n = e.lift(r);
            return r.caught = n
        }
    }
    var s = function() {
            function t(t) {
                this.selector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.selector, this.caught))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.selector = r, i.caught = n, i
            }
            return n.__extends(e, t), e.prototype.error = function(e) {
                if (!this.isStopped) {
                    var r = void 0;
                    try {
                        r = this.selector(e, this.caught)
                    } catch (e) {
                        return void t.prototype.error.call(this, e)
                    }
                    this._unsubscribeAndRecycle();
                    var n = new i.SimpleInnerSubscriber(this);
                    this.add(n);
                    var o = Object(i.innerSubscribe)(r, n);
                    o !== n && this.add(o)
                }
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "combineAll", (function() {
        return i
    }));
    var n = r(147);

    function i(t) {
        return function(e) {
            return e.lift(new n.CombineLatestOperator(t))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "combineLatest", (function() {
        return s
    }));
    var n = r(97),
        i = r(147),
        o = r(162);

    function s() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = null;
        return "function" == typeof t[t.length - 1] && (r = t.pop()), 1 === t.length && Object(n.isArray)(t[0]) && (t = t[0].slice()),
            function(e) {
                return e.lift.call(Object(o.from)([e].concat(t)), new i.CombineLatestOperator(r))
            }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "concat", (function() {
        return i
    }));
    var n = r(158);

    function i() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function(e) {
            return e.lift.call(n.concat.apply(void 0, [e].concat(t)))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "concatMap", (function() {
        return i
    }));
    var n = r(161);

    function i(t, e) {
        return Object(n.mergeMap)(t, e, 1)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "concatMapTo", (function() {
        return i
    }));
    var n = r(203);

    function i(t, e) {
        return Object(n.concatMap)((function() {
            return t
        }), e)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "count", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t) {
        return function(e) {
            return e.lift(new s(t, e))
        }
    }
    var s = function() {
            function t(t, e) {
                this.predicate = t, this.source = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.predicate, this.source))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.predicate = r, i.source = n, i.count = 0, i.index = 0, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.predicate ? this._tryPredicate(t) : this.count++
            }, e.prototype._tryPredicate = function(t) {
                var e;
                try {
                    e = this.predicate(t, this.index++, this.source)
                } catch (t) {
                    return void this.destination.error(t)
                }
                e && this.count++
            }, e.prototype._complete = function() {
                this.destination.next(this.count), this.destination.complete()
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "debounce", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.durationSelector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.durationSelector))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.durationSelector = r, n.hasValue = !1, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                try {
                    var e = this.durationSelector.call(this, t);
                    e && this._tryNext(t, e)
                } catch (t) {
                    this.destination.error(t)
                }
            }, e.prototype._complete = function() {
                this.emitValue(), this.destination.complete()
            }, e.prototype._tryNext = function(t, e) {
                var r = this.durationSubscription;
                this.value = t, this.hasValue = !0, r && (r.unsubscribe(), this.remove(r)), (r = Object(i.innerSubscribe)(e, new i.SimpleInnerSubscriber(this))) && !r.closed && this.add(this.durationSubscription = r)
            }, e.prototype.notifyNext = function() {
                this.emitValue()
            }, e.prototype.notifyComplete = function() {
                this.emitValue()
            }, e.prototype.emitValue = function() {
                if (this.hasValue) {
                    var e = this.value,
                        r = this.durationSubscription;
                    r && (this.durationSubscription = void 0, r.unsubscribe(), this.remove(r)), this.value = void 0, this.hasValue = !1, t.prototype._next.call(this, e)
                }
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "debounceTime", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(134);

    function s(t, e) {
        return void 0 === e && (e = o.async),
            function(r) {
                return r.lift(new u(t, e))
            }
    }
    var u = function() {
            function t(t, e) {
                this.dueTime = t, this.scheduler = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.dueTime, this.scheduler))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.dueTime = r, i.scheduler = n, i.debouncedSubscription = null, i.lastValue = null, i.hasValue = !1, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.clearDebounce(), this.lastValue = t, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(a, this.dueTime, this))
            }, e.prototype._complete = function() {
                this.debouncedNext(), this.destination.complete()
            }, e.prototype.debouncedNext = function() {
                if (this.clearDebounce(), this.hasValue) {
                    var t = this.lastValue;
                    this.lastValue = null, this.hasValue = !1, this.destination.next(t)
                }
            }, e.prototype.clearDebounce = function() {
                var t = this.debouncedSubscription;
                null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null)
            }, e
        }(i.Subscriber);

    function a(t) {
        t.debouncedNext()
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "defaultIfEmpty", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t) {
        return void 0 === t && (t = null),
            function(e) {
                return e.lift(new s(t))
            }
    }
    var s = function() {
            function t(t) {
                this.defaultValue = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.defaultValue))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.defaultValue = r, n.isEmpty = !0, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.isEmpty = !1, this.destination.next(t)
            }, e.prototype._complete = function() {
                this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "delay", (function() {
        return h
    }));
    var n = r(91),
        i = r(134),
        o = r(210),
        s = r(90),
        u = r(121);

    function h(t, e) {
        void 0 === e && (e = i.async);
        var r = Object(o.isDate)(t) ? +t - e.now() : Math.abs(t);
        return function(t) {
            return t.lift(new a(r, e))
        }
    }
    var a = function() {
            function t(t, e) {
                this.delay = t, this.scheduler = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new c(t, this.delay, this.scheduler))
            }, t
        }(),
        c = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.delay = r, i.scheduler = n, i.queue = [], i.active = !1, i.errored = !1, i
            }
            return n.__extends(e, t), e.dispatch = function(t) {
                for (var e = t.source, r = e.queue, n = t.scheduler, i = t.destination; r.length > 0 && r[0].time - n.now() <= 0;) r.shift().notification.observe(i);
                if (r.length > 0) {
                    var o = Math.max(0, r[0].time - n.now());
                    this.schedule(t, o)
                } else this.unsubscribe(), e.active = !1
            }, e.prototype._schedule = function(t) {
                this.active = !0, this.destination.add(t.schedule(e.dispatch, this.delay, {
                    source: this,
                    destination: this.destination,
                    scheduler: t
                }))
            }, e.prototype.scheduleNotification = function(t) {
                if (!0 !== this.errored) {
                    var e = this.scheduler,
                        r = new l(e.now() + this.delay, t);
                    this.queue.push(r), !1 === this.active && this._schedule(e)
                }
            }, e.prototype._next = function(t) {
                this.scheduleNotification(u.Notification.createNext(t))
            }, e.prototype._error = function(t) {
                this.errored = !0, this.queue = [], this.destination.error(t), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.scheduleNotification(u.Notification.createComplete()), this.unsubscribe()
            }, e
        }(s.Subscriber),
        l = function() {
            return function(t, e) {
                this.time = t, this.notification = e
            }
        }()
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return t instanceof Date && !isNaN(+t)
    }
    r.r(e), r.d(e, "isDate", (function() {
        return n
    }))
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "delayWhen", (function() {
        return h
    }));
    var n = r(91),
        i = r(90),
        o = r(88),
        s = r(148),
        u = r(149);

    function h(t, e) {
        return e ? function(r) {
            return new l(r, e).lift(new a(t))
        } : function(e) {
            return e.lift(new a(t))
        }
    }
    var a = function() {
            function t(t) {
                this.delayDurationSelector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new c(t, this.delayDurationSelector))
            }, t
        }(),
        c = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.delayDurationSelector = r, n.completed = !1, n.delayNotifierSubscriptions = [], n.index = 0, n
            }
            return n.__extends(e, t), e.prototype.notifyNext = function(t, e, r, n, i) {
                this.destination.next(t), this.removeSubscription(i), this.tryComplete()
            }, e.prototype.notifyError = function(t, e) {
                this._error(t)
            }, e.prototype.notifyComplete = function(t) {
                var e = this.removeSubscription(t);
                e && this.destination.next(e), this.tryComplete()
            }, e.prototype._next = function(t) {
                var e = this.index++;
                try {
                    var r = this.delayDurationSelector(t, e);
                    r && this.tryDelay(r, t)
                } catch (t) {
                    this.destination.error(t)
                }
            }, e.prototype._complete = function() {
                this.completed = !0, this.tryComplete(), this.unsubscribe()
            }, e.prototype.removeSubscription = function(t) {
                t.unsubscribe();
                var e = this.delayNotifierSubscriptions.indexOf(t);
                return -1 !== e && this.delayNotifierSubscriptions.splice(e, 1), t.outerValue
            }, e.prototype.tryDelay = function(t, e) {
                var r = Object(u.subscribeToResult)(this, t, e);
                r && !r.closed && (this.destination.add(r), this.delayNotifierSubscriptions.push(r))
            }, e.prototype.tryComplete = function() {
                this.completed && 0 === this.delayNotifierSubscriptions.length && this.destination.complete()
            }, e
        }(s.OuterSubscriber),
        l = function(t) {
            function e(e, r) {
                var n = t.call(this) || this;
                return n.source = e, n.subscriptionDelay = r, n
            }
            return n.__extends(e, t), e.prototype._subscribe = function(t) {
                this.subscriptionDelay.subscribe(new f(t, this.source))
            }, e
        }(o.Observable),
        f = function(t) {
            function e(e, r) {
                var n = t.call(this) || this;
                return n.parent = e, n.source = r, n.sourceSubscribed = !1, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.subscribeToSource()
            }, e.prototype._error = function(t) {
                this.unsubscribe(), this.parent.error(t)
            }, e.prototype._complete = function() {
                this.unsubscribe(), this.subscribeToSource()
            }, e.prototype.subscribeToSource = function() {
                this.sourceSubscribed || (this.sourceSubscribed = !0, this.unsubscribe(), this.source.subscribe(this.parent))
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "dematerialize", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o() {
        return function(t) {
            return t.lift(new s)
        }
    }
    var s = function() {
            function t() {}
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t))
            }, t
        }(),
        u = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                t.observe(this.destination)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "distinct", (function() {
        return o
    })), r.d(e, "DistinctSubscriber", (function() {
        return u
    }));
    var n = r(91),
        i = r(169);

    function o(t, e) {
        return function(r) {
            return r.lift(new s(t, e))
        }
    }
    var s = function() {
            function t(t, e) {
                this.keySelector = t, this.flushes = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.keySelector, this.flushes))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var o = t.call(this, e) || this;
                return o.keySelector = r, o.values = new Set, n && o.add(Object(i.innerSubscribe)(n, new i.SimpleInnerSubscriber(o))), o
            }
            return n.__extends(e, t), e.prototype.notifyNext = function() {
                this.values.clear()
            }, e.prototype.notifyError = function(t) {
                this._error(t)
            }, e.prototype._next = function(t) {
                this.keySelector ? this._useKeySelector(t) : this._finalizeNext(t, t)
            }, e.prototype._useKeySelector = function(t) {
                var e, r = this.destination;
                try {
                    e = this.keySelector(t)
                } catch (t) {
                    return void r.error(t)
                }
                this._finalizeNext(e, t)
            }, e.prototype._finalizeNext = function(t, e) {
                var r = this.values;
                r.has(t) || (r.add(t), this.destination.next(e))
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "distinctUntilChanged", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        return function(r) {
            return r.lift(new s(t, e))
        }
    }
    var s = function() {
            function t(t, e) {
                this.compare = t, this.keySelector = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.compare, this.keySelector))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.keySelector = n, i.hasKey = !1, "function" == typeof r && (i.compare = r), i
            }
            return n.__extends(e, t), e.prototype.compare = function(t, e) {
                return t === e
            }, e.prototype._next = function(t) {
                var e;
                try {
                    var r = this.keySelector;
                    e = r ? r(t) : t
                } catch (t) {
                    return this.destination.error(t)
                }
                var n = !1;
                if (this.hasKey) try {
                    n = (0, this.compare)(this.key, e)
                } catch (t) {
                    return this.destination.error(t)
                } else this.hasKey = !0;
                n || (this.key = e, this.destination.next(t))
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "distinctUntilKeyChanged", (function() {
        return i
    }));
    var n = r(214);

    function i(t, e) {
        return Object(n.distinctUntilChanged)((function(r, n) {
            return e ? e(r[t], n[t]) : r[t] === n[t]
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "elementAt", (function() {
        return h
    }));
    var n = r(141),
        i = r(184),
        o = r(217),
        s = r(208),
        u = r(218);

    function h(t, e) {
        if (t < 0) throw new n.ArgumentOutOfRangeError;
        var r = arguments.length >= 2;
        return function(h) {
            return h.pipe(Object(i.filter)((function(e, r) {
                return r === t
            })), Object(u.take)(1), r ? Object(s.defaultIfEmpty)(e) : Object(o.throwIfEmpty)((function() {
                return new n.ArgumentOutOfRangeError
            })))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "throwIfEmpty", (function() {
        return s
    }));
    var n = r(91),
        i = r(142),
        o = r(90);

    function s(t) {
        return void 0 === t && (t = a),
            function(e) {
                return e.lift(new u(t))
            }
    }
    var u = function() {
            function t(t) {
                this.errorFactory = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.errorFactory))
            }, t
        }(),
        h = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.errorFactory = r, n.hasValue = !1, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.hasValue = !0, this.destination.next(t)
            }, e.prototype._complete = function() {
                if (this.hasValue) return this.destination.complete();
                var t = void 0;
                try {
                    t = this.errorFactory()
                } catch (e) {
                    t = e
                }
                this.destination.error(t)
            }, e
        }(o.Subscriber);

    function a() {
        return new i.EmptyError
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "take", (function() {
        return u
    }));
    var n = r(91),
        i = r(90),
        o = r(141),
        s = r(122);

    function u(t) {
        return function(e) {
            return 0 === t ? Object(s.empty)() : e.lift(new h(t))
        }
    }
    var h = function() {
            function t(t) {
                if (this.total = t, this.total < 0) throw new o.ArgumentOutOfRangeError
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.total))
            }, t
        }(),
        a = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.total = r, n.count = 0, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this.total,
                    r = ++this.count;
                r <= e && (this.destination.next(t), r === e && (this.destination.complete(), this.unsubscribe()))
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "endWith", (function() {
        return o
    }));
    var n = r(158),
        i = r(123);

    function o() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function(e) {
            return Object(n.concat)(e, i.of.apply(void 0, t))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "every", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        return function(r) {
            return r.lift(new s(t, e, r))
        }
    }
    var s = function() {
            function t(t, e, r) {
                this.predicate = t, this.thisArg = e, this.source = r
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.predicate, this.thisArg, this.source))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n, i) {
                var o = t.call(this, e) || this;
                return o.predicate = r, o.thisArg = n, o.source = i, o.index = 0, o.thisArg = n || o, o
            }
            return n.__extends(e, t), e.prototype.notifyComplete = function(t) {
                this.destination.next(t), this.destination.complete()
            }, e.prototype._next = function(t) {
                var e = !1;
                try {
                    e = this.predicate.call(this.thisArg, t, this.index++, this.source)
                } catch (t) {
                    return void this.destination.error(t)
                }
                e || this.notifyComplete(!1)
            }, e.prototype._complete = function() {
                this.notifyComplete(!0)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "exhaust", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o() {
        return function(t) {
            return t.lift(new s)
        }
    }
    var s = function() {
            function t() {}
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t))
            }, t
        }(),
        u = function(t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.hasCompleted = !1, r.hasSubscription = !1, r
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.hasSubscription || (this.hasSubscription = !0, this.add(Object(i.innerSubscribe)(t, new i.SimpleInnerSubscriber(this))))
            }, e.prototype._complete = function() {
                this.hasCompleted = !0, this.hasSubscription || this.destination.complete()
            }, e.prototype.notifyComplete = function() {
                this.hasSubscription = !1, this.hasCompleted && this.destination.complete()
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "exhaustMap", (function() {
        return u
    }));
    var n = r(91),
        i = r(145),
        o = r(162),
        s = r(169);

    function u(t, e) {
        return e ? function(r) {
            return r.pipe(u((function(r, n) {
                return Object(o.from)(t(r, n)).pipe(Object(i.map)((function(t, i) {
                    return e(r, t, n, i)
                })))
            })))
        } : function(e) {
            return e.lift(new h(t))
        }
    }
    var h = function() {
            function t(t) {
                this.project = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.project))
            }, t
        }(),
        a = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.project = r, n.hasSubscription = !1, n.hasCompleted = !1, n.index = 0, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.hasSubscription || this.tryNext(t)
            }, e.prototype.tryNext = function(t) {
                var e, r = this.index++;
                try {
                    e = this.project(t, r)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.hasSubscription = !0, this._innerSub(e)
            }, e.prototype._innerSub = function(t) {
                var e = new s.SimpleInnerSubscriber(this),
                    r = this.destination;
                r.add(e);
                var n = Object(s.innerSubscribe)(t, e);
                n !== e && r.add(n)
            }, e.prototype._complete = function() {
                this.hasCompleted = !0, this.hasSubscription || this.destination.complete(), this.unsubscribe()
            }, e.prototype.notifyNext = function(t) {
                this.destination.next(t)
            }, e.prototype.notifyError = function(t) {
                this.destination.error(t)
            }, e.prototype.notifyComplete = function() {
                this.hasSubscription = !1, this.hasCompleted && this.destination.complete()
            }, e
        }(s.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "expand", (function() {
        return o
    })), r.d(e, "ExpandOperator", (function() {
        return s
    })), r.d(e, "ExpandSubscriber", (function() {
        return u
    }));
    var n = r(91),
        i = r(169);

    function o(t, e, r) {
        return void 0 === e && (e = Number.POSITIVE_INFINITY), e = (e || 0) < 1 ? Number.POSITIVE_INFINITY : e,
            function(n) {
                return n.lift(new s(t, e, r))
            }
    }
    var s = function() {
            function t(t, e, r) {
                this.project = t, this.concurrent = e, this.scheduler = r
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.project, this.concurrent, this.scheduler))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n, i) {
                var o = t.call(this, e) || this;
                return o.project = r, o.concurrent = n, o.scheduler = i, o.index = 0, o.active = 0, o.hasCompleted = !1, n < Number.POSITIVE_INFINITY && (o.buffer = []), o
            }
            return n.__extends(e, t), e.dispatch = function(t) {
                var e = t.subscriber,
                    r = t.result,
                    n = t.value,
                    i = t.index;
                e.subscribeToProjection(r, n, i)
            }, e.prototype._next = function(t) {
                var r = this.destination;
                if (r.closed) this._complete();
                else {
                    var n = this.index++;
                    if (this.active < this.concurrent) {
                        r.next(t);
                        try {
                            var i = (0, this.project)(t, n);
                            if (this.scheduler) {
                                var o = {
                                    subscriber: this,
                                    result: i,
                                    value: t,
                                    index: n
                                };
                                this.destination.add(this.scheduler.schedule(e.dispatch, 0, o))
                            } else this.subscribeToProjection(i, t, n)
                        } catch (t) {
                            r.error(t)
                        }
                    } else this.buffer.push(t)
                }
            }, e.prototype.subscribeToProjection = function(t, e, r) {
                this.active++, this.destination.add(Object(i.innerSubscribe)(t, new i.SimpleInnerSubscriber(this)))
            }, e.prototype._complete = function() {
                this.hasCompleted = !0, this.hasCompleted && 0 === this.active && this.destination.complete(), this.unsubscribe()
            }, e.prototype.notifyNext = function(t) {
                this._next(t)
            }, e.prototype.notifyComplete = function() {
                var t = this.buffer;
                this.active--, t && t.length > 0 && this._next(t.shift()), this.hasCompleted && 0 === this.active && this.destination.complete()
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "finalize", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(96);

    function s(t) {
        return function(e) {
            return e.lift(new u(t))
        }
    }
    var u = function() {
            function t(t) {
                this.callback = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.callback))
            }, t
        }(),
        h = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.add(new o.Subscription(r)), n
            }
            return n.__extends(e, t), e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "find", (function() {
        return o
    })), r.d(e, "FindValueOperator", (function() {
        return s
    })), r.d(e, "FindValueSubscriber", (function() {
        return u
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        if ("function" != typeof t) throw new TypeError("predicate is not a function");
        return function(r) {
            return r.lift(new s(t, r, !1, e))
        }
    }
    var s = function() {
            function t(t, e, r, n) {
                this.predicate = t, this.source = e, this.yieldIndex = r, this.thisArg = n
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.predicate, this.source, this.yieldIndex, this.thisArg))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n, i, o) {
                var s = t.call(this, e) || this;
                return s.predicate = r, s.source = n, s.yieldIndex = i, s.thisArg = o, s.index = 0, s
            }
            return n.__extends(e, t), e.prototype.notifyComplete = function(t) {
                var e = this.destination;
                e.next(t), e.complete(), this.unsubscribe()
            }, e.prototype._next = function(t) {
                var e = this.predicate,
                    r = this.thisArg,
                    n = this.index++;
                try {
                    e.call(r || this, t, n, this.source) && this.notifyComplete(this.yieldIndex ? n : t)
                } catch (t) {
                    this.destination.error(t)
                }
            }, e.prototype._complete = function() {
                this.notifyComplete(this.yieldIndex ? -1 : void 0)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "findIndex", (function() {
        return i
    }));
    var n = r(225);

    function i(t, e) {
        return function(r) {
            return r.lift(new n.FindValueOperator(t, r, !0, e))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "first", (function() {
        return a
    }));
    var n = r(142),
        i = r(184),
        o = r(218),
        s = r(208),
        u = r(217),
        h = r(104);

    function a(t, e) {
        var r = arguments.length >= 2;
        return function(a) {
            return a.pipe(t ? Object(i.filter)((function(e, r) {
                return t(e, r, a)
            })) : h.identity, Object(o.take)(1), r ? Object(s.defaultIfEmpty)(e) : Object(u.throwIfEmpty)((function() {
                return new n.EmptyError
            })))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "ignoreElements", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o() {
        return function(t) {
            return t.lift(new s)
        }
    }
    var s = function() {
            function t() {}
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t))
            }, t
        }(),
        u = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype._next = function(t) {}, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "isEmpty", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o() {
        return function(t) {
            return t.lift(new s)
        }
    }
    var s = function() {
            function t() {}
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t))
            }, t
        }(),
        u = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return n.__extends(e, t), e.prototype.notifyComplete = function(t) {
                var e = this.destination;
                e.next(t), e.complete()
            }, e.prototype._next = function(t) {
                this.notifyComplete(!1)
            }, e.prototype._complete = function() {
                this.notifyComplete(!0)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "last", (function() {
        return a
    }));
    var n = r(142),
        i = r(184),
        o = r(231),
        s = r(217),
        u = r(208),
        h = r(104);

    function a(t, e) {
        var r = arguments.length >= 2;
        return function(a) {
            return a.pipe(t ? Object(i.filter)((function(e, r) {
                return t(e, r, a)
            })) : h.identity, Object(o.takeLast)(1), r ? Object(u.defaultIfEmpty)(e) : Object(s.throwIfEmpty)((function() {
                return new n.EmptyError
            })))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "takeLast", (function() {
        return u
    }));
    var n = r(91),
        i = r(90),
        o = r(141),
        s = r(122);

    function u(t) {
        return function(e) {
            return 0 === t ? Object(s.empty)() : e.lift(new h(t))
        }
    }
    var h = function() {
            function t(t) {
                if (this.total = t, this.total < 0) throw new o.ArgumentOutOfRangeError
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.total))
            }, t
        }(),
        a = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.total = r, n.ring = new Array, n.count = 0, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this.ring,
                    r = this.total,
                    n = this.count++;
                e.length < r ? e.push(t) : e[n % r] = t
            }, e.prototype._complete = function() {
                var t = this.destination,
                    e = this.count;
                if (e > 0)
                    for (var r = this.count >= this.total ? this.total : this.count, n = this.ring, i = 0; i < r; i++) {
                        var o = e++ % r;
                        t.next(n[o])
                    }
                t.complete()
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "mapTo", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.value = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.value))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.value = r, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.destination.next(this.value)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "materialize", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(121);

    function s() {
        return function(t) {
            return t.lift(new u)
        }
    }
    var u = function() {
            function t() {}
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t))
            }, t
        }(),
        h = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.destination.next(o.Notification.createNext(t))
            }, e.prototype._error = function(t) {
                var e = this.destination;
                e.next(o.Notification.createError(t)), e.complete()
            }, e.prototype._complete = function() {
                var t = this.destination;
                t.next(o.Notification.createComplete()), t.complete()
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "max", (function() {
        return i
    }));
    var n = r(235);

    function i(t) {
        var e = "function" == typeof t ? function(e, r) {
            return t(e, r) > 0 ? e : r
        } : function(t, e) {
            return t > e ? t : e
        };
        return Object(n.reduce)(e)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "reduce", (function() {
        return u
    }));
    var n = r(236),
        i = r(231),
        o = r(208),
        s = r(103);

    function u(t, e) {
        return arguments.length >= 2 ? function(r) {
            return Object(s.pipe)(Object(n.scan)(t, e), Object(i.takeLast)(1), Object(o.defaultIfEmpty)(e))(r)
        } : function(e) {
            return Object(s.pipe)(Object(n.scan)((function(e, r, n) {
                return t(e, r, n + 1)
            })), Object(i.takeLast)(1))(e)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "scan", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        var r = !1;
        return arguments.length >= 2 && (r = !0),
            function(n) {
                return n.lift(new s(t, e, r))
            }
    }
    var s = function() {
            function t(t, e, r) {
                void 0 === r && (r = !1), this.accumulator = t, this.seed = e, this.hasSeed = r
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.accumulator, this.seed, this.hasSeed))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n, i) {
                var o = t.call(this, e) || this;
                return o.accumulator = r, o._seed = n, o.hasSeed = i, o.index = 0, o
            }
            return n.__extends(e, t), Object.defineProperty(e.prototype, "seed", {
                get: function() {
                    return this._seed
                },
                set: function(t) {
                    this.hasSeed = !0, this._seed = t
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype._next = function(t) {
                if (this.hasSeed) return this._tryNext(t);
                this.seed = t, this.destination.next(t)
            }, e.prototype._tryNext = function(t) {
                var e, r = this.index++;
                try {
                    e = this.accumulator(this.seed, t, r)
                } catch (t) {
                    this.destination.error(t)
                }
                this.seed = e, this.destination.next(e)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "merge", (function() {
        return i
    }));
    var n = r(178);

    function i() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function(e) {
            return e.lift.call(n.merge.apply(void 0, [e].concat(t)))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "mergeMapTo", (function() {
        return i
    }));
    var n = r(161);

    function i(t, e, r) {
        return void 0 === r && (r = Number.POSITIVE_INFINITY), "function" == typeof e ? Object(n.mergeMap)((function() {
            return t
        }), e, r) : ("number" == typeof e && (r = e), Object(n.mergeMap)((function() {
            return t
        }), r))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "mergeScan", (function() {
        return o
    })), r.d(e, "MergeScanOperator", (function() {
        return s
    })), r.d(e, "MergeScanSubscriber", (function() {
        return u
    }));
    var n = r(91),
        i = r(169);

    function o(t, e, r) {
        return void 0 === r && (r = Number.POSITIVE_INFINITY),
            function(n) {
                return n.lift(new s(t, e, r))
            }
    }
    var s = function() {
            function t(t, e, r) {
                this.accumulator = t, this.seed = e, this.concurrent = r
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.accumulator, this.seed, this.concurrent))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n, i) {
                var o = t.call(this, e) || this;
                return o.accumulator = r, o.acc = n, o.concurrent = i, o.hasValue = !1, o.hasCompleted = !1, o.buffer = [], o.active = 0, o.index = 0, o
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                if (this.active < this.concurrent) {
                    var e = this.index++,
                        r = this.destination,
                        n = void 0;
                    try {
                        n = (0, this.accumulator)(this.acc, t, e)
                    } catch (t) {
                        return r.error(t)
                    }
                    this.active++, this._innerSub(n)
                } else this.buffer.push(t)
            }, e.prototype._innerSub = function(t) {
                var e = new i.SimpleInnerSubscriber(this),
                    r = this.destination;
                r.add(e);
                var n = Object(i.innerSubscribe)(t, e);
                n !== e && r.add(n)
            }, e.prototype._complete = function() {
                this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete()), this.unsubscribe()
            }, e.prototype.notifyNext = function(t) {
                var e = this.destination;
                this.acc = t, this.hasValue = !0, e.next(t)
            }, e.prototype.notifyComplete = function() {
                var t = this.buffer;
                this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete())
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "min", (function() {
        return i
    }));
    var n = r(235);

    function i(t) {
        var e = "function" == typeof t ? function(e, r) {
            return t(e, r) < 0 ? e : r
        } : function(t, e) {
            return t < e ? t : e
        };
        return Object(n.reduce)(e)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "multicast", (function() {
        return i
    })), r.d(e, "MulticastOperator", (function() {
        return o
    }));
    var n = r(105);

    function i(t, e) {
        return function(r) {
            var i;
            if (i = "function" == typeof t ? t : function() {
                    return t
                }, "function" == typeof e) return r.lift(new o(i, e));
            var s = Object.create(r, n.connectableObservableDescriptor);
            return s.source = r, s.subjectFactory = i, s
        }
    }
    var o = function() {
        function t(t, e) {
            this.subjectFactory = t, this.selector = e
        }
        return t.prototype.call = function(t, e) {
            var r = this.selector,
                n = this.subjectFactory(),
                i = r(n).subscribe(t);
            return i.add(e.subscribe(n)), i
        }, t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "onErrorResumeNext", (function() {
        return u
    })), r.d(e, "onErrorResumeNextStatic", (function() {
        return h
    }));
    var n = r(91),
        i = r(162),
        o = r(97),
        s = r(169);

    function u() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return 1 === t.length && Object(o.isArray)(t[0]) && (t = t[0]),
            function(e) {
                return e.lift(new a(t))
            }
    }

    function h() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = void 0;
        return 1 === t.length && Object(o.isArray)(t[0]) && (t = t[0]), r = t.shift(), Object(i.from)(r).lift(new a(t))
    }
    var a = function() {
            function t(t) {
                this.nextSources = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new c(t, this.nextSources))
            }, t
        }(),
        c = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.destination = e, n.nextSources = r, n
            }
            return n.__extends(e, t), e.prototype.notifyError = function() {
                this.subscribeToNextSource()
            }, e.prototype.notifyComplete = function() {
                this.subscribeToNextSource()
            }, e.prototype._error = function(t) {
                this.subscribeToNextSource(), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.subscribeToNextSource(), this.unsubscribe()
            }, e.prototype.subscribeToNextSource = function() {
                var t = this.nextSources.shift();
                if (t) {
                    var e = new s.SimpleInnerSubscriber(this),
                        r = this.destination;
                    r.add(e);
                    var n = Object(s.innerSubscribe)(t, e);
                    n !== e && r.add(n)
                } else this.destination.complete()
            }, e
        }(s.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "pairwise", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o() {
        return function(t) {
            return t.lift(new s)
        }
    }
    var s = function() {
            function t() {}
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t))
            }, t
        }(),
        u = function(t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.hasPrev = !1, r
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e;
                this.hasPrev ? e = [this.prev, t] : this.hasPrev = !0, this.prev = t, e && this.destination.next(e)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "partition", (function() {
        return o
    }));
    var n = r(183),
        i = r(184);

    function o(t, e) {
        return function(r) {
            return [Object(i.filter)(t, e)(r), Object(i.filter)(Object(n.not)(t, e))(r)]
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "pluck", (function() {
        return i
    }));
    var n = r(145);

    function i() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t.length;
        if (0 === r) throw new Error("list of properties cannot be empty.");
        return function(e) {
            return Object(n.map)(o(t, r))(e)
        }
    }

    function o(t, e) {
        return function(r) {
            for (var n = r, i = 0; i < e; i++) {
                var o = null != n ? n[t[i]] : void 0;
                if (void 0 === o) return;
                n = o
            }
            return n
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "publish", (function() {
        return o
    }));
    var n = r(106),
        i = r(241);

    function o(t) {
        return t ? Object(i.multicast)((function() {
            return new n.Subject
        }), t) : Object(i.multicast)(new n.Subject)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "publishBehavior", (function() {
        return o
    }));
    var n = r(111),
        i = r(241);

    function o(t) {
        return function(e) {
            return Object(i.multicast)(new n.BehaviorSubject(t))(e)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "publishLast", (function() {
        return o
    }));
    var n = r(129),
        i = r(241);

    function o() {
        return function(t) {
            return Object(i.multicast)(new n.AsyncSubject)(t)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "publishReplay", (function() {
        return o
    }));
    var n = r(112),
        i = r(241);

    function o(t, e, r, o) {
        r && "function" != typeof r && (o = r);
        var s = "function" == typeof r ? r : void 0,
            u = new n.ReplaySubject(t, e, o);
        return function(t) {
            return Object(i.multicast)((function() {
                return u
            }), s)(t)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "race", (function() {
        return o
    }));
    var n = r(97),
        i = r(185);

    function o() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function(e) {
            return 1 === t.length && Object(n.isArray)(t[0]) && (t = t[0]), e.lift.call(i.race.apply(void 0, [e].concat(t)))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "repeat", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(122);

    function s(t) {
        return void 0 === t && (t = -1),
            function(e) {
                return 0 === t ? Object(o.empty)() : t < 0 ? e.lift(new u(-1, e)) : e.lift(new u(t - 1, e))
            }
    }
    var u = function() {
            function t(t, e) {
                this.count = t, this.source = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.count, this.source))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.count = r, i.source = n, i
            }
            return n.__extends(e, t), e.prototype.complete = function() {
                if (!this.isStopped) {
                    var e = this.source,
                        r = this.count;
                    if (0 === r) return t.prototype.complete.call(this);
                    r > -1 && (this.count = r - 1), e.subscribe(this._unsubscribeAndRecycle())
                }
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "repeatWhen", (function() {
        return s
    }));
    var n = r(91),
        i = r(106),
        o = r(169);

    function s(t) {
        return function(e) {
            return e.lift(new u(t))
        }
    }
    var u = function() {
            function t(t) {
                this.notifier = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.notifier, e))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.notifier = r, i.source = n, i.sourceIsBeingSubscribedTo = !0, i
            }
            return n.__extends(e, t), e.prototype.notifyNext = function() {
                this.sourceIsBeingSubscribedTo = !0, this.source.subscribe(this)
            }, e.prototype.notifyComplete = function() {
                if (!1 === this.sourceIsBeingSubscribedTo) return t.prototype.complete.call(this)
            }, e.prototype.complete = function() {
                if (this.sourceIsBeingSubscribedTo = !1, !this.isStopped) {
                    if (this.retries || this.subscribeToRetries(), !this.retriesSubscription || this.retriesSubscription.closed) return t.prototype.complete.call(this);
                    this._unsubscribeAndRecycle(), this.notifications.next(void 0)
                }
            }, e.prototype._unsubscribe = function() {
                var t = this.notifications,
                    e = this.retriesSubscription;
                t && (t.unsubscribe(), this.notifications = void 0), e && (e.unsubscribe(), this.retriesSubscription = void 0), this.retries = void 0
            }, e.prototype._unsubscribeAndRecycle = function() {
                var e = this._unsubscribe;
                return this._unsubscribe = null, t.prototype._unsubscribeAndRecycle.call(this), this._unsubscribe = e, this
            }, e.prototype.subscribeToRetries = function() {
                var e;
                this.notifications = new i.Subject;
                try {
                    e = (0, this.notifier)(this.notifications)
                } catch (e) {
                    return t.prototype.complete.call(this)
                }
                this.retries = e, this.retriesSubscription = Object(o.innerSubscribe)(e, new o.SimpleInnerSubscriber(this))
            }, e
        }(o.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "retry", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t) {
        return void 0 === t && (t = -1),
            function(e) {
                return e.lift(new s(t, e))
            }
    }
    var s = function() {
            function t(t, e) {
                this.count = t, this.source = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.count, this.source))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.count = r, i.source = n, i
            }
            return n.__extends(e, t), e.prototype.error = function(e) {
                if (!this.isStopped) {
                    var r = this.source,
                        n = this.count;
                    if (0 === n) return t.prototype.error.call(this, e);
                    n > -1 && (this.count = n - 1), r.subscribe(this._unsubscribeAndRecycle())
                }
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "retryWhen", (function() {
        return s
    }));
    var n = r(91),
        i = r(106),
        o = r(169);

    function s(t) {
        return function(e) {
            return e.lift(new u(t, e))
        }
    }
    var u = function() {
            function t(t, e) {
                this.notifier = t, this.source = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.notifier, this.source))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.notifier = r, i.source = n, i
            }
            return n.__extends(e, t), e.prototype.error = function(e) {
                if (!this.isStopped) {
                    var r = this.errors,
                        n = this.retries,
                        s = this.retriesSubscription;
                    if (n) this.errors = void 0, this.retriesSubscription = void 0;
                    else {
                        r = new i.Subject;
                        try {
                            n = (0, this.notifier)(r)
                        } catch (e) {
                            return t.prototype.error.call(this, e)
                        }
                        s = Object(o.innerSubscribe)(n, new o.SimpleInnerSubscriber(this))
                    }
                    this._unsubscribeAndRecycle(), this.errors = r, this.retries = n, this.retriesSubscription = s, r.next(e)
                }
            }, e.prototype._unsubscribe = function() {
                var t = this.errors,
                    e = this.retriesSubscription;
                t && (t.unsubscribe(), this.errors = void 0), e && (e.unsubscribe(), this.retriesSubscription = void 0), this.retries = void 0
            }, e.prototype.notifyNext = function() {
                var t = this._unsubscribe;
                this._unsubscribe = null, this._unsubscribeAndRecycle(), this._unsubscribe = t, this.source.subscribe(this)
            }, e
        }(o.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "sample", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.notifier = t
            }
            return t.prototype.call = function(t, e) {
                var r = new u(t),
                    n = e.subscribe(r);
                return n.add(Object(i.innerSubscribe)(this.notifier, new i.SimpleInnerSubscriber(r))), n
            }, t
        }(),
        u = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.hasValue = !1, e
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.value = t, this.hasValue = !0
            }, e.prototype.notifyNext = function() {
                this.emitValue()
            }, e.prototype.notifyComplete = function() {
                this.emitValue()
            }, e.prototype.emitValue = function() {
                this.hasValue && (this.hasValue = !1, this.destination.next(this.value))
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "sampleTime", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(134);

    function s(t, e) {
        return void 0 === e && (e = o.async),
            function(r) {
                return r.lift(new u(t, e))
            }
    }
    var u = function() {
            function t(t, e) {
                this.period = t, this.scheduler = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.period, this.scheduler))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.period = r, i.scheduler = n, i.hasValue = !1, i.add(n.schedule(a, r, {
                    subscriber: i,
                    period: r
                })), i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.lastValue = t, this.hasValue = !0
            }, e.prototype.notifyNext = function() {
                this.hasValue && (this.hasValue = !1, this.destination.next(this.lastValue))
            }, e
        }(i.Subscriber);

    function a(t) {
        var e = t.subscriber,
            r = t.period;
        e.notifyNext(), this.schedule(t, r)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "sequenceEqual", (function() {
        return o
    })), r.d(e, "SequenceEqualOperator", (function() {
        return s
    })), r.d(e, "SequenceEqualSubscriber", (function() {
        return u
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        return function(r) {
            return r.lift(new s(t, e))
        }
    }
    var s = function() {
            function t(t, e) {
                this.compareTo = t, this.comparator = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.compareTo, this.comparator))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.compareTo = r, i.comparator = n, i._a = [], i._b = [], i._oneComplete = !1, i.destination.add(r.subscribe(new h(e, i))), i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this._oneComplete && 0 === this._b.length ? this.emit(!1) : (this._a.push(t), this.checkValues())
            }, e.prototype._complete = function() {
                this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : this._oneComplete = !0, this.unsubscribe()
            }, e.prototype.checkValues = function() {
                for (var t = this._a, e = this._b, r = this.comparator; t.length > 0 && e.length > 0;) {
                    var n = t.shift(),
                        i = e.shift(),
                        o = !1;
                    try {
                        o = r ? r(n, i) : n === i
                    } catch (t) {
                        this.destination.error(t)
                    }
                    o || this.emit(!1)
                }
            }, e.prototype.emit = function(t) {
                var e = this.destination;
                e.next(t), e.complete()
            }, e.prototype.nextB = function(t) {
                this._oneComplete && 0 === this._a.length ? this.emit(!1) : (this._b.push(t), this.checkValues())
            }, e.prototype.completeB = function() {
                this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : this._oneComplete = !0
            }, e
        }(i.Subscriber),
        h = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.parent = r, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.parent.nextB(t)
            }, e.prototype._error = function(t) {
                this.parent.error(t), this.unsubscribe()
            }, e.prototype._complete = function() {
                this.parent.completeB(), this.unsubscribe()
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "share", (function() {
        return u
    }));
    var n = r(241),
        i = r(109),
        o = r(106);

    function s() {
        return new o.Subject
    }

    function u() {
        return function(t) {
            return Object(i.refCount)()(Object(n.multicast)(s)(t))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "shareReplay", (function() {
        return i
    }));
    var n = r(112);

    function i(t, e, r) {
        var i;
        return i = t && "object" == typeof t ? t : {
                bufferSize: t,
                windowTime: e,
                refCount: !1,
                scheduler: r
            },
            function(t) {
                return t.lift(function(t) {
                    var e, r, i = t.bufferSize,
                        o = void 0 === i ? Number.POSITIVE_INFINITY : i,
                        s = t.windowTime,
                        u = void 0 === s ? Number.POSITIVE_INFINITY : s,
                        h = t.refCount,
                        a = t.scheduler,
                        c = 0,
                        l = !1,
                        f = !1;
                    return function(t) {
                        var i;
                        c++, !e || l ? (l = !1, e = new n.ReplaySubject(o, u, a), i = e.subscribe(this), r = t.subscribe({
                            next: function(t) {
                                e.next(t)
                            },
                            error: function(t) {
                                l = !0, e.error(t)
                            },
                            complete: function() {
                                f = !0, r = void 0, e.complete()
                            }
                        }), f && (r = void 0)) : i = e.subscribe(this), this.add((function() {
                            c--, i.unsubscribe(), i = void 0, r && !f && h && 0 === c && (r.unsubscribe(), r = void 0, e = void 0)
                        }))
                    }
                }(i))
            }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "single", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(142);

    function s(t) {
        return function(e) {
            return e.lift(new u(t, e))
        }
    }
    var u = function() {
            function t(t, e) {
                this.predicate = t, this.source = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.predicate, this.source))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.predicate = r, i.source = n, i.seenValue = !1, i.index = 0, i
            }
            return n.__extends(e, t), e.prototype.applySingleValue = function(t) {
                this.seenValue ? this.destination.error("Sequence contains more than one element") : (this.seenValue = !0, this.singleValue = t)
            }, e.prototype._next = function(t) {
                var e = this.index++;
                this.predicate ? this.tryNext(t, e) : this.applySingleValue(t)
            }, e.prototype.tryNext = function(t, e) {
                try {
                    this.predicate(t, e, this.source) && this.applySingleValue(t)
                } catch (t) {
                    this.destination.error(t)
                }
            }, e.prototype._complete = function() {
                var t = this.destination;
                this.index > 0 ? (t.next(this.seenValue ? this.singleValue : void 0), t.complete()) : t.error(new o.EmptyError)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "skip", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.total = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.total))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.total = r, n.count = 0, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                ++this.count > this.total && this.destination.next(t)
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "skipLast", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(141);

    function s(t) {
        return function(e) {
            return e.lift(new u(t))
        }
    }
    var u = function() {
            function t(t) {
                if (this._skipCount = t, this._skipCount < 0) throw new o.ArgumentOutOfRangeError
            }
            return t.prototype.call = function(t, e) {
                return 0 === this._skipCount ? e.subscribe(new i.Subscriber(t)) : e.subscribe(new h(t, this._skipCount))
            }, t
        }(),
        h = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n._skipCount = r, n._count = 0, n._ring = new Array(r), n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this._skipCount,
                    r = this._count++;
                if (r < e) this._ring[r] = t;
                else {
                    var n = r % e,
                        i = this._ring,
                        o = i[n];
                    i[n] = t, this.destination.next(o)
                }
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "skipUntil", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.notifier = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.notifier))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                n.hasValue = !1;
                var o = new i.SimpleInnerSubscriber(n);
                n.add(o), n.innerSubscription = o;
                var s = Object(i.innerSubscribe)(r, o);
                return s !== o && (n.add(s), n.innerSubscription = s), n
            }
            return n.__extends(e, t), e.prototype._next = function(e) {
                this.hasValue && t.prototype._next.call(this, e)
            }, e.prototype.notifyNext = function() {
                this.hasValue = !0, this.innerSubscription && this.innerSubscription.unsubscribe()
            }, e.prototype.notifyComplete = function() {}, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "skipWhile", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.predicate = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.predicate))
            }, t
        }(),
        u = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.predicate = r, n.skipping = !0, n.index = 0, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this.destination;
                this.skipping && this.tryCallPredicate(t), this.skipping || e.next(t)
            }, e.prototype.tryCallPredicate = function(t) {
                try {
                    var e = this.predicate(t, this.index++);
                    this.skipping = Boolean(e)
                } catch (t) {
                    this.destination.error(t)
                }
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "startWith", (function() {
        return o
    }));
    var n = r(158),
        i = r(124);

    function o() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t[t.length - 1];
        return Object(i.isScheduler)(r) ? (t.pop(), function(e) {
            return Object(n.concat)(t, e, r)
        }) : function(e) {
            return Object(n.concat)(t, e)
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "subscribeOn", (function() {
        return i
    }));
    var n = r(267);

    function i(t, e) {
        return void 0 === e && (e = 0),
            function(r) {
                return r.lift(new o(t, e))
            }
    }
    var o = function() {
        function t(t, e) {
            this.scheduler = t, this.delay = e
        }
        return t.prototype.call = function(t, e) {
            return new n.SubscribeOnObservable(e, this.delay, this.scheduler).subscribe(t)
        }, t
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "SubscribeOnObservable", (function() {
        return u
    }));
    var n = r(91),
        i = r(88),
        o = r(130),
        s = r(177),
        u = function(t) {
            function e(e, r, n) {
                void 0 === r && (r = 0), void 0 === n && (n = o.asap);
                var i = t.call(this) || this;
                return i.source = e, i.delayTime = r, i.scheduler = n, (!Object(s.isNumeric)(r) || r < 0) && (i.delayTime = 0), n && "function" == typeof n.schedule || (i.scheduler = o.asap), i
            }
            return n.__extends(e, t), e.create = function(t, r, n) {
                return void 0 === r && (r = 0), void 0 === n && (n = o.asap), new e(t, r, n)
            }, e.dispatch = function(t) {
                var e = t.source,
                    r = t.subscriber;
                return this.add(e.subscribe(r))
            }, e.prototype._subscribe = function(t) {
                var r = this.delayTime,
                    n = this.source;
                return this.scheduler.schedule(e.dispatch, r, {
                    source: n,
                    subscriber: t
                })
            }, e
        }(i.Observable)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "switchAll", (function() {
        return o
    }));
    var n = r(269),
        i = r(104);

    function o() {
        return Object(n.switchMap)(i.identity)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "switchMap", (function() {
        return u
    }));
    var n = r(91),
        i = r(145),
        o = r(162),
        s = r(169);

    function u(t, e) {
        return "function" == typeof e ? function(r) {
            return r.pipe(u((function(r, n) {
                return Object(o.from)(t(r, n)).pipe(Object(i.map)((function(t, i) {
                    return e(r, t, n, i)
                })))
            })))
        } : function(e) {
            return e.lift(new h(t))
        }
    }
    var h = function() {
            function t(t) {
                this.project = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.project))
            }, t
        }(),
        a = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.project = r, n.index = 0, n
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e, r = this.index++;
                try {
                    e = this.project(t, r)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this._innerSub(e)
            }, e.prototype._innerSub = function(t) {
                var e = this.innerSubscription;
                e && e.unsubscribe();
                var r = new s.SimpleInnerSubscriber(this),
                    n = this.destination;
                n.add(r), this.innerSubscription = Object(s.innerSubscribe)(t, r), this.innerSubscription !== r && n.add(this.innerSubscription)
            }, e.prototype._complete = function() {
                var e = this.innerSubscription;
                e && !e.closed || t.prototype._complete.call(this), this.unsubscribe()
            }, e.prototype._unsubscribe = function() {
                this.innerSubscription = void 0
            }, e.prototype.notifyComplete = function() {
                this.innerSubscription = void 0, this.isStopped && t.prototype._complete.call(this)
            }, e.prototype.notifyNext = function(t) {
                this.destination.next(t)
            }, e
        }(s.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "switchMapTo", (function() {
        return i
    }));
    var n = r(269);

    function i(t, e) {
        return e ? Object(n.switchMap)((function() {
            return t
        }), e) : Object(n.switchMap)((function() {
            return t
        }))
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "takeUntil", (function() {
        return o
    }));
    var n = r(91),
        i = r(169);

    function o(t) {
        return function(e) {
            return e.lift(new s(t))
        }
    }
    var s = function() {
            function t(t) {
                this.notifier = t
            }
            return t.prototype.call = function(t, e) {
                var r = new u(t),
                    n = Object(i.innerSubscribe)(this.notifier, new i.SimpleInnerSubscriber(r));
                return n && !r.seenValue ? (r.add(n), e.subscribe(r)) : r
            }, t
        }(),
        u = function(t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.seenValue = !1, r
            }
            return n.__extends(e, t), e.prototype.notifyNext = function() {
                this.seenValue = !0, this.complete()
            }, e.prototype.notifyComplete = function() {}, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "takeWhile", (function() {
        return o
    }));
    var n = r(91),
        i = r(90);

    function o(t, e) {
        return void 0 === e && (e = !1),
            function(r) {
                return r.lift(new s(t, e))
            }
    }
    var s = function() {
            function t(t, e) {
                this.predicate = t, this.inclusive = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new u(t, this.predicate, this.inclusive))
            }, t
        }(),
        u = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.predicate = r, i.inclusive = n, i.index = 0, i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e, r = this.destination;
                try {
                    e = this.predicate(t, this.index++)
                } catch (t) {
                    return void r.error(t)
                }
                this.nextOrComplete(t, e)
            }, e.prototype.nextOrComplete = function(t, e) {
                var r = this.destination;
                Boolean(e) ? r.next(t) : (this.inclusive && r.next(t), r.complete())
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "tap", (function() {
        return u
    }));
    var n = r(91),
        i = r(90),
        o = r(139),
        s = r(92);

    function u(t, e, r) {
        return function(n) {
            return n.lift(new h(t, e, r))
        }
    }
    var h = function() {
            function t(t, e, r) {
                this.nextOrObserver = t, this.error = e, this.complete = r
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.nextOrObserver, this.error, this.complete))
            }, t
        }(),
        a = function(t) {
            function e(e, r, n, i) {
                var u = t.call(this, e) || this;
                return u._tapNext = o.noop, u._tapError = o.noop, u._tapComplete = o.noop, u._tapError = n || o.noop, u._tapComplete = i || o.noop, Object(s.isFunction)(r) ? (u._context = u, u._tapNext = r) : r && (u._context = r, u._tapNext = r.next || o.noop, u._tapError = r.error || o.noop, u._tapComplete = r.complete || o.noop), u
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                try {
                    this._tapNext.call(this._context, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.next(t)
            }, e.prototype._error = function(t) {
                try {
                    this._tapError.call(this._context, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.error(t)
            }, e.prototype._complete = function() {
                try {
                    this._tapComplete.call(this._context)
                } catch (t) {
                    return void this.destination.error(t)
                }
                return this.destination.complete()
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "defaultThrottleConfig", (function() {
        return o
    })), r.d(e, "throttle", (function() {
        return s
    }));
    var n = r(91),
        i = r(169),
        o = {
            leading: !0,
            trailing: !1
        };

    function s(t, e) {
        return void 0 === e && (e = o),
            function(r) {
                return r.lift(new u(t, !!e.leading, !!e.trailing))
            }
    }
    var u = function() {
            function t(t, e, r) {
                this.durationSelector = t, this.leading = e, this.trailing = r
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.durationSelector, this.leading, this.trailing))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n, i) {
                var o = t.call(this, e) || this;
                return o.destination = e, o.durationSelector = r, o._leading = n, o._trailing = i, o._hasValue = !1, o
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this._hasValue = !0, this._sendValue = t, this._throttled || (this._leading ? this.send() : this.throttle(t))
            }, e.prototype.send = function() {
                var t = this._hasValue,
                    e = this._sendValue;
                t && (this.destination.next(e), this.throttle(e)), this._hasValue = !1, this._sendValue = void 0
            }, e.prototype.throttle = function(t) {
                var e = this.tryDurationSelector(t);
                e && this.add(this._throttled = Object(i.innerSubscribe)(e, new i.SimpleInnerSubscriber(this)))
            }, e.prototype.tryDurationSelector = function(t) {
                try {
                    return this.durationSelector(t)
                } catch (t) {
                    return this.destination.error(t), null
                }
            }, e.prototype.throttlingDone = function() {
                var t = this._throttled,
                    e = this._trailing;
                t && t.unsubscribe(), this._throttled = void 0, e && this.send()
            }, e.prototype.notifyNext = function() {
                this.throttlingDone()
            }, e.prototype.notifyComplete = function() {
                this.throttlingDone()
            }, e
        }(i.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "throttleTime", (function() {
        return u
    }));
    var n = r(91),
        i = r(90),
        o = r(134),
        s = r(274);

    function u(t, e, r) {
        return void 0 === e && (e = o.async), void 0 === r && (r = s.defaultThrottleConfig),
            function(n) {
                return n.lift(new h(t, e, r.leading, r.trailing))
            }
    }
    var h = function() {
            function t(t, e, r, n) {
                this.duration = t, this.scheduler = e, this.leading = r, this.trailing = n
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.duration, this.scheduler, this.leading, this.trailing))
            }, t
        }(),
        a = function(t) {
            function e(e, r, n, i, o) {
                var s = t.call(this, e) || this;
                return s.duration = r, s.scheduler = n, s.leading = i, s.trailing = o, s._hasTrailingValue = !1, s._trailingValue = null, s
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                this.throttled ? this.trailing && (this._trailingValue = t, this._hasTrailingValue = !0) : (this.add(this.throttled = this.scheduler.schedule(c, this.duration, {
                    subscriber: this
                })), this.leading ? this.destination.next(t) : this.trailing && (this._trailingValue = t, this._hasTrailingValue = !0))
            }, e.prototype._complete = function() {
                this._hasTrailingValue ? (this.destination.next(this._trailingValue), this.destination.complete()) : this.destination.complete()
            }, e.prototype.clearThrottle = function() {
                var t = this.throttled;
                t && (this.trailing && this._hasTrailingValue && (this.destination.next(this._trailingValue), this._trailingValue = null, this._hasTrailingValue = !1), t.unsubscribe(), this.remove(t), this.throttled = null)
            }, e
        }(i.Subscriber);

    function c(t) {
        t.subscriber.clearThrottle()
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "timeInterval", (function() {
        return u
    })), r.d(e, "TimeInterval", (function() {
        return h
    }));
    var n = r(134),
        i = r(236),
        o = r(170),
        s = r(145);

    function u(t) {
        return void 0 === t && (t = n.async),
            function(e) {
                return Object(o.defer)((function() {
                    return e.pipe(Object(i.scan)((function(e, r) {
                        var n = e.current;
                        return {
                            value: r,
                            current: t.now(),
                            last: n
                        }
                    }), {
                        current: t.now(),
                        value: void 0,
                        last: void 0
                    }), Object(s.map)((function(t) {
                        var e = t.current,
                            r = t.last,
                            n = t.value;
                        return new h(n, e - r)
                    })))
                }))
            }
    }
    var h = function() {
        return function(t, e) {
            this.value = t, this.interval = e
        }
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "timeout", (function() {
        return u
    }));
    var n = r(134),
        i = r(143),
        o = r(278),
        s = r(128);

    function u(t, e) {
        return void 0 === e && (e = n.async), Object(o.timeoutWith)(t, Object(s.throwError)(new i.TimeoutError), e)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "timeoutWith", (function() {
        return u
    }));
    var n = r(91),
        i = r(134),
        o = r(210),
        s = r(169);

    function u(t, e, r) {
        return void 0 === r && (r = i.async),
            function(n) {
                var i = Object(o.isDate)(t),
                    s = i ? +t - r.now() : Math.abs(t);
                return n.lift(new h(s, i, e, r))
            }
    }
    var h = function() {
            function t(t, e, r, n) {
                this.waitFor = t, this.absoluteTimeout = e, this.withObservable = r, this.scheduler = n
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler))
            }, t
        }(),
        a = function(t) {
            function e(e, r, n, i, o) {
                var s = t.call(this, e) || this;
                return s.absoluteTimeout = r, s.waitFor = n, s.withObservable = i, s.scheduler = o, s.scheduleTimeout(), s
            }
            return n.__extends(e, t), e.dispatchTimeout = function(t) {
                var e = t.withObservable;
                t._unsubscribeAndRecycle(), t.add(Object(s.innerSubscribe)(e, new s.SimpleInnerSubscriber(t)))
            }, e.prototype.scheduleTimeout = function() {
                var t = this.action;
                t ? this.action = t.schedule(this, this.waitFor) : this.add(this.action = this.scheduler.schedule(e.dispatchTimeout, this.waitFor, this))
            }, e.prototype._next = function(e) {
                this.absoluteTimeout || this.scheduleTimeout(), t.prototype._next.call(this, e)
            }, e.prototype._unsubscribe = function() {
                this.action = void 0, this.scheduler = null, this.withObservable = null
            }, e
        }(s.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "timestamp", (function() {
        return o
    })), r.d(e, "Timestamp", (function() {
        return s
    }));
    var n = r(134),
        i = r(145);

    function o(t) {
        return void 0 === t && (t = n.async), Object(i.map)((function(e) {
            return new s(e, t.now())
        }))
    }
    var s = function() {
        return function(t, e) {
            this.value = t, this.timestamp = e
        }
    }()
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "toArray", (function() {
        return o
    }));
    var n = r(235);

    function i(t, e, r) {
        return 0 === r ? [e] : (t.push(e), t)
    }

    function o() {
        return Object(n.reduce)(i, [])
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "window", (function() {
        return s
    }));
    var n = r(91),
        i = r(106),
        o = r(169);

    function s(t) {
        return function(e) {
            return e.lift(new u(t))
        }
    }
    var u = function() {
            function t(t) {
                this.windowBoundaries = t
            }
            return t.prototype.call = function(t, e) {
                var r = new h(t),
                    n = e.subscribe(r);
                return n.closed || r.add(Object(o.innerSubscribe)(this.windowBoundaries, new o.SimpleInnerSubscriber(r))), n
            }, t
        }(),
        h = function(t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.window = new i.Subject, e.next(r.window), r
            }
            return n.__extends(e, t), e.prototype.notifyNext = function() {
                this.openWindow()
            }, e.prototype.notifyError = function(t) {
                this._error(t)
            }, e.prototype.notifyComplete = function() {
                this._complete()
            }, e.prototype._next = function(t) {
                this.window.next(t)
            }, e.prototype._error = function(t) {
                this.window.error(t), this.destination.error(t)
            }, e.prototype._complete = function() {
                this.window.complete(), this.destination.complete()
            }, e.prototype._unsubscribe = function() {
                this.window = null
            }, e.prototype.openWindow = function() {
                var t = this.window;
                t && t.complete();
                var e = this.destination,
                    r = this.window = new i.Subject;
                e.next(r)
            }, e
        }(o.SimpleOuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "windowCount", (function() {
        return s
    }));
    var n = r(91),
        i = r(90),
        o = r(106);

    function s(t, e) {
        return void 0 === e && (e = 0),
            function(r) {
                return r.lift(new u(t, e))
            }
    }
    var u = function() {
            function t(t, e) {
                this.windowSize = t, this.startWindowEvery = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.windowSize, this.startWindowEvery))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.destination = e, i.windowSize = r, i.startWindowEvery = n, i.windows = [new o.Subject], i.count = 0, e.next(i.windows[0]), i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                for (var e = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize, r = this.destination, n = this.windowSize, i = this.windows, s = i.length, u = 0; u < s && !this.closed; u++) i[u].next(t);
                var h = this.count - n + 1;
                if (h >= 0 && h % e == 0 && !this.closed && i.shift().complete(), ++this.count % e == 0 && !this.closed) {
                    var a = new o.Subject;
                    i.push(a), r.next(a)
                }
            }, e.prototype._error = function(t) {
                var e = this.windows;
                if (e)
                    for (; e.length > 0 && !this.closed;) e.shift().error(t);
                this.destination.error(t)
            }, e.prototype._complete = function() {
                var t = this.windows;
                if (t)
                    for (; t.length > 0 && !this.closed;) t.shift().complete();
                this.destination.complete()
            }, e.prototype._unsubscribe = function() {
                this.count = 0, this.windows = null
            }, e
        }(i.Subscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "windowTime", (function() {
        return a
    }));
    var n = r(91),
        i = r(106),
        o = r(134),
        s = r(90),
        u = r(177),
        h = r(124);

    function a(t) {
        var e = o.async,
            r = null,
            n = Number.POSITIVE_INFINITY;
        return Object(h.isScheduler)(arguments[3]) && (e = arguments[3]), Object(h.isScheduler)(arguments[2]) ? e = arguments[2] : Object(u.isNumeric)(arguments[2]) && (n = Number(arguments[2])), Object(h.isScheduler)(arguments[1]) ? e = arguments[1] : Object(u.isNumeric)(arguments[1]) && (r = Number(arguments[1])),
            function(i) {
                return i.lift(new c(t, r, n, e))
            }
    }
    var c = function() {
            function t(t, e, r, n) {
                this.windowTimeSpan = t, this.windowCreationInterval = e, this.maxWindowSize = r, this.scheduler = n
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new f(t, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler))
            }, t
        }(),
        l = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._numberOfNextedValues = 0, e
            }
            return n.__extends(e, t), e.prototype.next = function(e) {
                this._numberOfNextedValues++, t.prototype.next.call(this, e)
            }, Object.defineProperty(e.prototype, "numberOfNextedValues", {
                get: function() {
                    return this._numberOfNextedValues
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(i.Subject),
        f = function(t) {
            function e(e, r, n, i, o) {
                var s = t.call(this, e) || this;
                s.destination = e, s.windowTimeSpan = r, s.windowCreationInterval = n, s.maxWindowSize = i, s.scheduler = o, s.windows = [];
                var u = s.openWindow();
                if (null !== n && n >= 0) {
                    var h = {
                            subscriber: s,
                            window: u,
                            context: null
                        },
                        a = {
                            windowTimeSpan: r,
                            windowCreationInterval: n,
                            subscriber: s,
                            scheduler: o
                        };
                    s.add(o.schedule(m, r, h)), s.add(o.schedule(p, n, a))
                } else {
                    var c = {
                        subscriber: s,
                        window: u,
                        windowTimeSpan: r
                    };
                    s.add(o.schedule(d, r, c))
                }
                return s
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                for (var e = this.windows, r = e.length, n = 0; n < r; n++) {
                    var i = e[n];
                    i.closed || (i.next(t), i.numberOfNextedValues >= this.maxWindowSize && this.closeWindow(i))
                }
            }, e.prototype._error = function(t) {
                for (var e = this.windows; e.length > 0;) e.shift().error(t);
                this.destination.error(t)
            }, e.prototype._complete = function() {
                for (var t = this.windows; t.length > 0;) {
                    var e = t.shift();
                    e.closed || e.complete()
                }
                this.destination.complete()
            }, e.prototype.openWindow = function() {
                var t = new l;
                return this.windows.push(t), this.destination.next(t), t
            }, e.prototype.closeWindow = function(t) {
                t.complete();
                var e = this.windows;
                e.splice(e.indexOf(t), 1)
            }, e
        }(s.Subscriber);

    function d(t) {
        var e = t.subscriber,
            r = t.windowTimeSpan,
            n = t.window;
        n && e.closeWindow(n), t.window = e.openWindow(), this.schedule(t, r)
    }

    function p(t) {
        var e = t.windowTimeSpan,
            r = t.subscriber,
            n = t.scheduler,
            i = t.windowCreationInterval,
            o = r.openWindow(),
            s = {
                action: this,
                subscription: null
            },
            u = {
                subscriber: r,
                window: o,
                context: s
            };
        s.subscription = n.schedule(m, e, u), this.add(s.subscription), this.schedule(t, i)
    }

    function m(t) {
        var e = t.subscriber,
            r = t.window,
            n = t.context;
        n && n.action && n.subscription && n.action.remove(n.subscription), e.closeWindow(r)
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "windowToggle", (function() {
        return h
    }));
    var n = r(91),
        i = r(106),
        o = r(96),
        s = r(148),
        u = r(149);

    function h(t, e) {
        return function(r) {
            return r.lift(new a(t, e))
        }
    }
    var a = function() {
            function t(t, e) {
                this.openings = t, this.closingSelector = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new c(t, this.openings, this.closingSelector))
            }, t
        }(),
        c = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                return i.openings = r, i.closingSelector = n, i.contexts = [], i.add(i.openSubscription = Object(u.subscribeToResult)(i, r, r)), i
            }
            return n.__extends(e, t), e.prototype._next = function(t) {
                var e = this.contexts;
                if (e)
                    for (var r = e.length, n = 0; n < r; n++) e[n].window.next(t)
            }, e.prototype._error = function(e) {
                var r = this.contexts;
                if (this.contexts = null, r)
                    for (var n = r.length, i = -1; ++i < n;) {
                        var o = r[i];
                        o.window.error(e), o.subscription.unsubscribe()
                    }
                t.prototype._error.call(this, e)
            }, e.prototype._complete = function() {
                var e = this.contexts;
                if (this.contexts = null, e)
                    for (var r = e.length, n = -1; ++n < r;) {
                        var i = e[n];
                        i.window.complete(), i.subscription.unsubscribe()
                    }
                t.prototype._complete.call(this)
            }, e.prototype._unsubscribe = function() {
                var t = this.contexts;
                if (this.contexts = null, t)
                    for (var e = t.length, r = -1; ++r < e;) {
                        var n = t[r];
                        n.window.unsubscribe(), n.subscription.unsubscribe()
                    }
            }, e.prototype.notifyNext = function(t, e, r, n, s) {
                if (t === this.openings) {
                    var h = void 0;
                    try {
                        h = (0, this.closingSelector)(e)
                    } catch (t) {
                        return this.error(t)
                    }
                    var a = new i.Subject,
                        c = new o.Subscription,
                        l = {
                            window: a,
                            subscription: c
                        };
                    this.contexts.push(l);
                    var f = Object(u.subscribeToResult)(this, h, l);
                    f.closed ? this.closeWindow(this.contexts.length - 1) : (f.context = l, c.add(f)), this.destination.next(a)
                } else this.closeWindow(this.contexts.indexOf(t))
            }, e.prototype.notifyError = function(t) {
                this.error(t)
            }, e.prototype.notifyComplete = function(t) {
                t !== this.openSubscription && this.closeWindow(this.contexts.indexOf(t.context))
            }, e.prototype.closeWindow = function(t) {
                if (-1 !== t) {
                    var e = this.contexts,
                        r = e[t],
                        n = r.window,
                        i = r.subscription;
                    e.splice(t, 1), n.complete(), i.unsubscribe()
                }
            }, e
        }(s.OuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "windowWhen", (function() {
        return u
    }));
    var n = r(91),
        i = r(106),
        o = r(148),
        s = r(149);

    function u(t) {
        return function(e) {
            return e.lift(new h(t))
        }
    }
    var h = function() {
            function t(t) {
                this.closingSelector = t
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new a(t, this.closingSelector))
            }, t
        }(),
        a = function(t) {
            function e(e, r) {
                var n = t.call(this, e) || this;
                return n.destination = e, n.closingSelector = r, n.openWindow(), n
            }
            return n.__extends(e, t), e.prototype.notifyNext = function(t, e, r, n, i) {
                this.openWindow(i)
            }, e.prototype.notifyError = function(t) {
                this._error(t)
            }, e.prototype.notifyComplete = function(t) {
                this.openWindow(t)
            }, e.prototype._next = function(t) {
                this.window.next(t)
            }, e.prototype._error = function(t) {
                this.window.error(t), this.destination.error(t), this.unsubscribeClosingNotification()
            }, e.prototype._complete = function() {
                this.window.complete(), this.destination.complete(), this.unsubscribeClosingNotification()
            }, e.prototype.unsubscribeClosingNotification = function() {
                this.closingNotification && this.closingNotification.unsubscribe()
            }, e.prototype.openWindow = function(t) {
                void 0 === t && (t = null), t && (this.remove(t), t.unsubscribe());
                var e = this.window;
                e && e.complete();
                var r, n = this.window = new i.Subject;
                this.destination.next(n);
                try {
                    r = (0, this.closingSelector)()
                } catch (t) {
                    return this.destination.error(t), void this.window.error(t)
                }
                this.add(this.closingNotification = Object(s.subscribeToResult)(this, r))
            }, e
        }(o.OuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "withLatestFrom", (function() {
        return s
    }));
    var n = r(91),
        i = r(148),
        o = r(149);

    function s() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function(e) {
            var r;
            "function" == typeof t[t.length - 1] && (r = t.pop());
            var n = t;
            return e.lift(new u(n, r))
        }
    }
    var u = function() {
            function t(t, e) {
                this.observables = t, this.project = e
            }
            return t.prototype.call = function(t, e) {
                return e.subscribe(new h(t, this.observables, this.project))
            }, t
        }(),
        h = function(t) {
            function e(e, r, n) {
                var i = t.call(this, e) || this;
                i.observables = r, i.project = n, i.toRespond = [];
                var s = r.length;
                i.values = new Array(s);
                for (var u = 0; u < s; u++) i.toRespond.push(u);
                for (u = 0; u < s; u++) {
                    var h = r[u];
                    i.add(Object(o.subscribeToResult)(i, h, void 0, u))
                }
                return i
            }
            return n.__extends(e, t), e.prototype.notifyNext = function(t, e, r) {
                this.values[r] = e;
                var n = this.toRespond;
                if (n.length > 0) {
                    var i = n.indexOf(r); - 1 !== i && n.splice(i, 1)
                }
            }, e.prototype.notifyComplete = function() {}, e.prototype._next = function(t) {
                if (0 === this.toRespond.length) {
                    var e = [t].concat(this.values);
                    this.project ? this._tryProject(e) : this.destination.next(e)
                }
            }, e.prototype._tryProject = function(t) {
                var e;
                try {
                    e = this.project.apply(this, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.next(e)
            }, e
        }(i.OuterSubscriber)
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "zip", (function() {
        return i
    }));
    var n = r(189);

    function i() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function(e) {
            return e.lift.call(n.zip.apply(void 0, [e].concat(t)))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "zipAll", (function() {
        return i
    }));
    var n = r(189);

    function i(t) {
        return function(e) {
            return e.lift(new n.ZipOperator(t))
        }
    }
}, function(t, e, r) {
    "use strict";
    r.r(e),
        function(t) {
            r.d(e, "monitorCharacteristic", (function() {
                return o
            }));
            var n = r(87),
                i = r(82);
            const o = e => n.Observable.create(r => {
                function n(e) {
                    const n = e.target;
                    n.value && r.next(t.from(n.value.buffer))
                }
                return Object(i.log)("ble-verbose", "start monitor " + e.uuid), e.startNotifications().then(() => {
                    e.addEventListener("characteristicvaluechanged", n)
                }), () => {
                    Object(i.log)("ble-verbose", "end monitor " + e.uuid), e.stopNotifications()
                }
            })
        }.call(this, r(2).Buffer)
}]);

function isEmpty(str) {
    if (str.trim() == '')
        return true;

    return false;
}