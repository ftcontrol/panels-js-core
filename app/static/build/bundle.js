var At = Array.isArray, Ct = Array.prototype.indexOf, Dt = Array.from, Rt = Object.defineProperty, tt = Object.getOwnPropertyDescriptor, nt = Object.isExtensible;
const D = 2, it = 4, ft = 8, Ot = 16, k = 32, M = 64, z = 128, F = 256, q = 512, g = 1024, W = 2048, P = 4096, B = 8192, J = 16384, st = 32768, It = 65536, Mt = 1 << 18, Pt = 1 << 19, rt = 1 << 20, _t = 1 << 21, ct = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Lt(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Vt() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ut(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function qt() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
const Bt = 2;
function Yt(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let p = null;
function et(t) {
  p = t;
}
function vt(t, n = !1, r) {
  var e = p = {
    p,
    c: null,
    d: !1,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  };
  tn(() => {
    e.d = !0;
  });
}
function dt(t) {
  const n = p;
  if (n !== null) {
    const a = n.e;
    if (a !== null) {
      var r = s, e = v;
      n.e = null;
      try {
        for (var u = 0; u < a.length; u++) {
          var l = a[u];
          O(l.effect), R(l.reaction), gt(l.fn);
        }
      } finally {
        O(r), R(e);
      }
    }
    p = n.p, n.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function Ht() {
  return !0;
}
function pt(t) {
  var n = t.effects;
  if (n !== null) {
    t.effects = null;
    for (var r = 0; r < n.length; r += 1)
      S(
        /** @type {Effect} */
        n[r]
      );
  }
}
function jt(t) {
  for (var n = t.parent; n !== null; ) {
    if ((n.f & D) === 0)
      return (
        /** @type {Effect} */
        n
      );
    n = n.parent;
  }
  return null;
}
function Wt(t) {
  var n, r = s;
  O(jt(t));
  try {
    pt(t), n = Nt(t);
  } finally {
    O(r);
  }
  return n;
}
function Kt(t) {
  var n = Wt(t);
  if (t.equals(n) || (t.v = n, t.wv = sn()), !G) {
    var r = (b || (t.f & F) !== 0) && t.deps !== null ? P : g;
    x(t, r);
  }
}
const Gt = /* @__PURE__ */ new Map();
var lt, ht, wt, Et;
function $t() {
  if (lt === void 0) {
    lt = window, ht = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, n = Node.prototype, r = Text.prototype;
    wt = tt(n, "firstChild").get, Et = tt(n, "nextSibling").get, nt(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), nt(r) && (r.__t = void 0);
  }
}
function zt(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Jt(t) {
  return wt.call(t);
}
// @__NO_SIDE_EFFECTS__
function Qt(t) {
  return Et.call(t);
}
function Xt(t) {
  s === null && v === null && Ut(), v !== null && (v.f & F) !== 0 && s === null && Vt(), G && Lt();
}
function Zt(t, n) {
  var r = n.last;
  r === null ? n.last = n.first = t : (r.next = t, t.prev = r, n.last = t);
}
function K(t, n, r, e = !0) {
  var u = s, l = {
    ctx: p,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | W,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: u,
    b: u && u.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      X(l), l.f |= st;
    } catch (d) {
      throw S(l), d;
    }
  else n !== null && Z(l);
  var a = r && l.deps === null && l.first === null && l.nodes_start === null && l.teardown === null && (l.f & (Pt | z)) === 0;
  if (!a && e && (u !== null && Zt(l, u), v !== null && (v.f & D) !== 0)) {
    var f = (
      /** @type {Derived} */
      v
    );
    (f.effects ??= []).push(l);
  }
  return l;
}
function tn(t) {
  const n = K(ft, null, !1);
  return x(n, g), n.teardown = t, n;
}
function nn(t) {
  Xt();
  var n = s !== null && (s.f & k) !== 0 && p !== null && !p.m;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      p
    );
    (r.e ??= []).push({
      fn: t,
      effect: s,
      reaction: v
    });
  } else
    return gt(t);
}
function gt(t) {
  return K(it | _t, t, !1);
}
function rn(t) {
  const n = K(M, t, !0);
  return (r = {}) => new Promise((e) => {
    r.outro ? on(n, () => {
      S(n), e(void 0);
    }) : (S(n), e(void 0));
  });
}
function en(t, n = !0) {
  return K(ft | k, t, !0, n);
}
function mt(t) {
  var n = t.teardown;
  if (n !== null) {
    const r = G, e = v;
    ut(!0), R(null);
    try {
      n.call(null);
    } finally {
      ut(r), R(e);
    }
  }
}
function yt(t, n = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    r.ac?.abort(ct);
    var e = r.next;
    (r.f & M) !== 0 ? r.parent = null : S(r, n), r = e;
  }
}
function ln(t) {
  for (var n = t.first; n !== null; ) {
    var r = n.next;
    (n.f & k) === 0 && S(n), n = r;
  }
}
function S(t, n = !0) {
  var r = !1;
  (n || (t.f & Mt) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (un(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), r = !0), yt(t, n && !r), j(t, 0), x(t, J);
  var e = t.transitions;
  if (e !== null)
    for (const l of e)
      l.stop();
  mt(t);
  var u = t.parent;
  u !== null && u.first !== null && xt(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function un(t, n) {
  for (; t !== null; ) {
    var r = t === n ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Qt(t)
    );
    t.remove(), t = r;
  }
}
function xt(t) {
  var n = t.parent, r = t.prev, e = t.next;
  r !== null && (r.next = e), e !== null && (e.prev = r), n !== null && (n.first === t && (n.first = e), n.last === t && (n.last = r));
}
function on(t, n) {
  var r = [];
  Tt(t, r, !0), an(r, () => {
    S(t), n && n();
  });
}
function an(t, n) {
  var r = t.length;
  if (r > 0) {
    var e = () => --r || n();
    for (var u of t)
      u.out(e);
  } else
    n();
}
function Tt(t, n, r) {
  if ((t.f & B) === 0) {
    if (t.f ^= B, t.transitions !== null)
      for (const a of t.transitions)
        (a.is_global || r) && n.push(a);
    for (var e = t.first; e !== null; ) {
      var u = e.next, l = (e.f & It) !== 0 || (e.f & k) !== 0;
      Tt(e, n, l ? r : !1), e = u;
    }
  }
}
function fn(t) {
  var n = (
    /** @type {Effect} */
    s
  );
  if ((n.f & st) === 0) {
    if ((n.f & z) === 0)
      throw t;
    n.fn(t);
  } else
    bt(t, n);
}
function bt(t, n) {
  for (; n !== null; ) {
    if ((n.f & z) !== 0)
      try {
        n.b.error(t);
        return;
      } catch {
      }
    n = n.parent;
  }
  throw t;
}
let $ = !1, Y = null, N = !1, G = !1;
function ut(t) {
  G = t;
}
let U = [];
let v = null, y = !1;
function R(t) {
  v = t;
}
let s = null;
function O(t) {
  s = t;
}
let I = null, w = null, h = 0, E = null, H = 1, ot = 0, b = !1;
function sn() {
  return ++H;
}
function Q(t) {
  var n = t.f;
  if ((n & W) !== 0)
    return !0;
  if ((n & P) !== 0) {
    var r = t.deps, e = (n & F) !== 0;
    if (r !== null) {
      var u, l, a = (n & q) !== 0, f = e && s !== null && !b, d = r.length;
      if (a || f) {
        var _ = (
          /** @type {Derived} */
          t
        ), m = _.parent;
        for (u = 0; u < d; u++)
          l = r[u], (a || !l?.reactions?.includes(_)) && (l.reactions ??= []).push(_);
        a && (_.f ^= q), f && m !== null && (m.f & F) === 0 && (_.f ^= F);
      }
      for (u = 0; u < d; u++)
        if (l = r[u], Q(
          /** @type {Derived} */
          l
        ) && Kt(
          /** @type {Derived} */
          l
        ), l.wv > t.wv)
          return !0;
    }
    (!e || s !== null && !b) && x(t, g);
  }
  return !1;
}
function Ft(t, n, r = !0) {
  var e = t.reactions;
  if (e !== null)
    for (var u = 0; u < e.length; u++) {
      var l = e[u];
      I?.reaction === v && I.sources.includes(t) || ((l.f & D) !== 0 ? Ft(
        /** @type {Derived} */
        l,
        n,
        !1
      ) : n === l && (r ? x(l, W) : (l.f & g) !== 0 && x(l, P), Z(
        /** @type {Effect} */
        l
      )));
    }
}
function Nt(t) {
  var n = w, r = h, e = E, u = v, l = b, a = I, f = p, d = y, _ = t.f;
  w = /** @type {null | Value[]} */
  null, h = 0, E = null, b = (_ & F) !== 0 && (y || !N || v === null), v = (_ & (k | M)) === 0 ? t : null, I = null, et(t.ctx), y = !1, ot++, t.f |= rt, t.ac !== null && (t.ac.abort(ct), t.ac = null);
  try {
    var m = (
      /** @type {Function} */
      (0, t.fn)()
    ), i = t.deps;
    if (w !== null) {
      var o;
      if (j(t, h), i !== null && h > 0)
        for (i.length = h + w.length, o = 0; o < w.length; o++)
          i[h + o] = w[o];
      else
        t.deps = i = w;
      if (!b || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (_ & D) !== 0 && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (o = h; o < i.length; o++)
          (i[o].reactions ??= []).push(t);
    } else i !== null && h < i.length && (j(t, h), i.length = h);
    if (Ht() && E !== null && !y && i !== null && (t.f & (D | P | W)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      E.length; o++)
        Ft(
          E[o],
          /** @type {Effect} */
          t
        );
    return u !== null && u !== t && (ot++, E !== null && (e === null ? e = E : e.push(.../** @type {Source[]} */
    E))), m;
  } catch (c) {
    fn(c);
  } finally {
    w = n, h = r, E = e, v = u, b = l, I = a, et(f), y = d, t.f ^= rt;
  }
}
function _n(t, n) {
  let r = n.reactions;
  if (r !== null) {
    var e = Ct.call(r, t);
    if (e !== -1) {
      var u = r.length - 1;
      u === 0 ? r = n.reactions = null : (r[e] = r[u], r.pop());
    }
  }
  r === null && (n.f & D) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (w === null || !w.includes(n)) && (x(n, P), (n.f & (F | q)) === 0 && (n.f ^= q), pt(
    /** @type {Derived} **/
    n
  ), j(
    /** @type {Derived} **/
    n,
    0
  ));
}
function j(t, n) {
  var r = t.deps;
  if (r !== null)
    for (var e = n; e < r.length; e++)
      _n(t, r[e]);
}
function X(t) {
  var n = t.f;
  if ((n & J) === 0) {
    x(t, g);
    var r = s, e = N;
    s = t, N = !0;
    try {
      (n & Ot) !== 0 ? ln(t) : yt(t), mt(t);
      var u = Nt(t);
      t.teardown = typeof u == "function" ? u : null, t.wv = H;
      var l;
    } finally {
      N = e, s = r;
    }
  }
}
function cn() {
  try {
    qt();
  } catch (t) {
    if (Y !== null)
      bt(t, Y);
    else
      throw t;
  }
}
function vn() {
  var t = N;
  try {
    var n = 0;
    for (N = !0; U.length > 0; ) {
      n++ > 1e3 && cn();
      var r = U, e = r.length;
      U = [];
      for (var u = 0; u < e; u++) {
        var l = pn(r[u]);
        dn(l);
      }
      Gt.clear();
    }
  } finally {
    $ = !1, N = t, Y = null;
  }
}
function dn(t) {
  var n = t.length;
  if (n !== 0) {
    for (var r = 0; r < n; r++) {
      var e = t[r];
      if ((e.f & (J | B)) === 0 && Q(e)) {
        var u = H;
        if (X(e), e.deps === null && e.first === null && e.nodes_start === null && (e.teardown === null ? xt(e) : e.fn = null), H > u && (e.f & _t) !== 0)
          break;
      }
    }
    for (; r < n; r += 1)
      Z(t[r]);
  }
}
function Z(t) {
  $ || ($ = !0, queueMicrotask(vn));
  for (var n = Y = t; n.parent !== null; ) {
    n = n.parent;
    var r = n.f;
    if ((r & (M | k)) !== 0) {
      if ((r & g) === 0) return;
      n.f ^= g;
    }
  }
  U.push(n);
}
function pn(t) {
  for (var n = [], r = t; r !== null; ) {
    var e = r.f, u = (e & (k | M)) !== 0, l = u && (e & g) !== 0;
    if (!l && (e & B) === 0) {
      (e & it) !== 0 ? n.push(r) : u ? r.f ^= g : Q(r) && X(r);
      var a = r.first;
      if (a !== null) {
        r = a;
        continue;
      }
    }
    var f = r.parent;
    for (r = r.next; r === null && f !== null; )
      r = f.next, f = f.parent;
  }
  return n;
}
function hn(t) {
  var n = y;
  try {
    return y = !0, t();
  } finally {
    y = n;
  }
}
const wn = -7169;
function x(t, n) {
  t.f = t.f & wn | n;
}
const En = ["touchstart", "touchmove"];
function gn(t) {
  return En.includes(t);
}
const mn = /* @__PURE__ */ new Set(), at = /* @__PURE__ */ new Set();
function V(t) {
  var n = this, r = (
    /** @type {Node} */
    n.ownerDocument
  ), e = t.type, u = t.composedPath?.() || [], l = (
    /** @type {null | Element} */
    u[0] || t.target
  ), a = 0, f = t.__root;
  if (f) {
    var d = u.indexOf(f);
    if (d !== -1 && (n === document || n === /** @type {any} */
    window)) {
      t.__root = n;
      return;
    }
    var _ = u.indexOf(n);
    if (_ === -1)
      return;
    d <= _ && (a = d);
  }
  if (l = /** @type {Element} */
  u[a] || t.target, l !== n) {
    Rt(t, "currentTarget", {
      configurable: !0,
      get() {
        return l || r;
      }
    });
    var m = v, i = s;
    R(null), O(null);
    try {
      for (var o, c = []; l !== null; ) {
        var A = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var T = l["__" + e];
          if (T != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === l))
            if (At(T)) {
              var [St, ...kt] = T;
              St.apply(l, [t, ...kt]);
            } else
              T.call(l, t);
        } catch (L) {
          o ? c.push(L) : o = L;
        }
        if (t.cancelBubble || A === n || A === null)
          break;
        l = A;
      }
      if (o) {
        for (let L of c)
          queueMicrotask(() => {
            throw L;
          });
        throw o;
      }
    } finally {
      t.__root = n, delete t.currentTarget, R(m), O(i);
    }
  }
}
function yn(t) {
  var n = document.createElement("template");
  return n.innerHTML = t.replaceAll("<!>", "<!---->"), n.content;
}
function xn(t, n) {
  var r = (
    /** @type {Effect} */
    s
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function Tn(t, n) {
  var r = (n & Bt) !== 0, e, u = !t.startsWith("<!>");
  return () => {
    e === void 0 && (e = yn(u ? t : "<!>" + t), e = /** @type {Node} */
    /* @__PURE__ */ Jt(e));
    var l = (
      /** @type {TemplateNode} */
      r || ht ? document.importNode(e, !0) : e.cloneNode(!0)
    );
    return xn(l, l), l;
  };
}
function bn(t, n) {
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
function Fn(t, n) {
  return Nn(t, n);
}
const C = /* @__PURE__ */ new Map();
function Nn(t, { target: n, anchor: r, props: e = {}, events: u, context: l, intro: a = !0 }) {
  $t();
  var f = /* @__PURE__ */ new Set(), d = (i) => {
    for (var o = 0; o < i.length; o++) {
      var c = i[o];
      if (!f.has(c)) {
        f.add(c);
        var A = gn(c);
        n.addEventListener(c, V, { passive: A });
        var T = C.get(c);
        T === void 0 ? (document.addEventListener(c, V, { passive: A }), C.set(c, 1)) : C.set(c, T + 1);
      }
    }
  };
  d(Dt(mn)), at.add(d);
  var _ = void 0, m = rn(() => {
    var i = r ?? n.appendChild(zt());
    return en(() => {
      if (l) {
        vt({});
        var o = (
          /** @type {ComponentContext} */
          p
        );
        o.c = l;
      }
      u && (e.$$events = u), _ = t(i, e) || {}, l && dt();
    }), () => {
      for (var o of f) {
        n.removeEventListener(o, V);
        var c = (
          /** @type {number} */
          C.get(o)
        );
        --c === 0 ? (document.removeEventListener(o, V), C.delete(o)) : C.set(o, c);
      }
      at.delete(d), i !== r && i.parentNode?.removeChild(i);
    };
  });
  return Sn.set(_, m), _;
}
let Sn = /* @__PURE__ */ new WeakMap();
function kn(t) {
  p === null && Yt(), nn(() => {
    const n = hn(t);
    if (typeof n == "function") return (
      /** @type {() => void} */
      n
    );
  });
}
const An = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(An);
var Cn = /* @__PURE__ */ Tn("<h1>Hi!</h1>");
function Dn(t, n) {
  vt(n, !0), kn(() => {
    n.socket.addMessageHandler("time", (e) => {
      console.log("Data form plugin", e);
    });
  });
  var r = Cn();
  bn(t, r), dt();
}
function On(t, n) {
  return Fn(Dn, {
    target: t,
    props: n
  });
}
export {
  On as default
};
