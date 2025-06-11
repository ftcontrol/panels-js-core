;(function (K) {
  typeof define == "function" && define.amd ? define(K) : K()
})(function () {
  "use strict"
  var Tt
  var bt = Array.isArray,
    Dt = Array.prototype.indexOf,
    Ft = Array.from,
    Nt = Object.defineProperty,
    tt = Object.getOwnPropertyDescriptor,
    nt = Object.isExtensible
  const R = 2,
    rt = 4,
    et = 8,
    Ct = 16,
    N = 32,
    I = 64,
    W = 128,
    C = 256,
    U = 512,
    E = 1024,
    $ = 2048,
    M = 4096,
    V = 8192,
    G = 16384,
    lt = 32768,
    kt = 65536,
    At = 1 << 19,
    St = 1 << 20,
    ut = 1 << 21
  function Ot() {
    throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")
  }
  let En = !1,
    m = null
  function ot(t) {
    m = t
  }
  function Rt(t, n = !1, r) {
    var e = (m = {
      p: m,
      c: null,
      d: !1,
      e: null,
      m: !1,
      s: t,
      x: null,
      l: null,
    })
    jt(() => {
      e.d = !0
    })
  }
  function It(t) {
    const n = m
    if (n !== null) {
      const s = n.e
      if (s !== null) {
        var r = p,
          e = v
        n.e = null
        try {
          for (var u = 0; u < s.length; u++) {
            var l = s[u]
            A(l.effect), k(l.reaction), Kt(l.fn)
          }
        } finally {
          A(r), k(e)
        }
      }
      ;(m = n.p), (n.m = !0)
    }
    return {}
  }
  function Mt() {
    return !0
  }
  function it(t) {
    var n = t.effects
    if (n !== null) {
      t.effects = null
      for (var r = 0; r < n.length; r += 1) y(n[r])
    }
  }
  function Pt(t) {
    for (var n = t.parent; n !== null; ) {
      if ((n.f & R) === 0) return n
      n = n.parent
    }
    return null
  }
  function Ut(t) {
    var n,
      r = p
    A(Pt(t))
    try {
      it(t), (n = wt(t))
    } finally {
      A(r)
    }
    return n
  }
  function $t(t) {
    var n = Ut(t)
    if ((t.equals(n) || ((t.v = n), (t.wv = Zt())), !J)) {
      var r = (D || (t.f & C) !== 0) && t.deps !== null ? M : E
      x(t, r)
    }
  }
  const Vt = new Map()
  var st, at
  function qt() {
    if (st === void 0) {
      st = window
      var t = Element.prototype,
        n = Node.prototype,
        r = Text.prototype
      tt(n, "firstChild").get,
        (at = tt(n, "nextSibling").get),
        nt(t) &&
          ((t.__click = void 0),
          (t.__className = void 0),
          (t.__attributes = null),
          (t.__style = void 0),
          (t.__e = void 0)),
        nt(r) && (r.__t = void 0)
    }
  }
  function Bt(t = "") {
    return document.createTextNode(t)
  }
  function Lt(t) {
    return at.call(t)
  }
  function Yt(t, n) {
    var r = n.last
    r === null
      ? (n.last = n.first = t)
      : ((r.next = t), (t.prev = r), (n.last = t))
  }
  function q(t, n, r, e = !0) {
    var u = p,
      l = {
        ctx: m,
        deps: null,
        nodes_start: null,
        nodes_end: null,
        f: t | $,
        first: null,
        fn: n,
        last: null,
        next: null,
        parent: u,
        prev: null,
        teardown: null,
        transitions: null,
        wv: 0,
      }
    if (r)
      try {
        X(l), (l.f |= lt)
      } catch (c) {
        throw (y(l), c)
      }
    else n !== null && mt(l)
    var s =
      r &&
      l.deps === null &&
      l.first === null &&
      l.nodes_start === null &&
      l.teardown === null &&
      (l.f & (St | W)) === 0
    if (!s && e && (u !== null && Yt(l, u), v !== null && (v.f & R) !== 0)) {
      var a = v
      ;(a.effects ?? (a.effects = [])).push(l)
    }
    return l
  }
  function jt(t) {
    const n = q(et, null, !1)
    return x(n, E), (n.teardown = t), n
  }
  function Ht(t) {
    const n = q(I, t, !0)
    return (r = {}) =>
      new Promise((e) => {
        r.outro
          ? Jt(n, () => {
              y(n), e(void 0)
            })
          : (y(n), e(void 0))
      })
  }
  function Kt(t) {
    return q(rt, t, !1)
  }
  function Wt(t, n = !0) {
    return q(et | N, t, !0, n)
  }
  function ft(t) {
    var n = t.teardown
    if (n !== null) {
      const r = J,
        e = v
      dt(!0), k(null)
      try {
        n.call(null)
      } finally {
        dt(r), k(e)
      }
    }
  }
  function _t(t, n = !1) {
    var r = t.first
    for (t.first = t.last = null; r !== null; ) {
      var e = r.next
      ;(r.f & I) !== 0 ? (r.parent = null) : y(r, n), (r = e)
    }
  }
  function Gt(t) {
    for (var n = t.first; n !== null; ) {
      var r = n.next
      ;(n.f & N) === 0 && y(n), (n = r)
    }
  }
  function y(t, n = !0) {
    var r = !1
    ;(n || (t.f & At) !== 0) &&
      t.nodes_start !== null &&
      t.nodes_end !== null &&
      (zt(t.nodes_start, t.nodes_end), (r = !0)),
      _t(t, n && !r),
      Y(t, 0),
      x(t, G)
    var e = t.transitions
    if (e !== null) for (const l of e) l.stop()
    ft(t)
    var u = t.parent
    u !== null && u.first !== null && ct(t),
      (t.next =
        t.prev =
        t.teardown =
        t.ctx =
        t.deps =
        t.fn =
        t.nodes_start =
        t.nodes_end =
          null)
  }
  function zt(t, n) {
    for (; t !== null; ) {
      var r = t === n ? null : Lt(t)
      t.remove(), (t = r)
    }
  }
  function ct(t) {
    var n = t.parent,
      r = t.prev,
      e = t.next
    r !== null && (r.next = e),
      e !== null && (e.prev = r),
      n !== null &&
        (n.first === t && (n.first = e), n.last === t && (n.last = r))
  }
  function Jt(t, n) {
    var r = []
    vt(t, r, !0),
      Qt(r, () => {
        y(t), n && n()
      })
  }
  function Qt(t, n) {
    var r = t.length
    if (r > 0) {
      var e = () => --r || n()
      for (var u of t) u.out(e)
    } else n()
  }
  function vt(t, n, r) {
    if ((t.f & V) === 0) {
      if (((t.f ^= V), t.transitions !== null))
        for (const s of t.transitions) (s.is_global || r) && n.push(s)
      for (var e = t.first; e !== null; ) {
        var u = e.next,
          l = (e.f & kt) !== 0 || (e.f & N) !== 0
        vt(e, n, l ? r : !1), (e = u)
      }
    }
  }
  function Xt(t) {
    var n = p
    if ((n.f & lt) === 0) {
      if ((n.f & W) === 0) throw t
      n.fn(t)
    } else pt(t, n)
  }
  function pt(t, n) {
    for (; n !== null; ) {
      if ((n.f & W) !== 0)
        try {
          n.fn(t)
          return
        } catch {}
      n = n.parent
    }
    throw t
  }
  let z = !1,
    B = null,
    b = !1,
    J = !1
  function dt(t) {
    J = t
  }
  let L = [],
    wn = [],
    v = null,
    P = !1
  function k(t) {
    v = t
  }
  let p = null
  function A(t) {
    p = t
  }
  let S = null,
    g = null,
    d = 0,
    w = null,
    ht = 1,
    gt = 0,
    D = !1
  function Zt() {
    return ++ht
  }
  function Q(t) {
    var i
    var n = t.f
    if ((n & $) !== 0) return !0
    if ((n & M) !== 0) {
      var r = t.deps,
        e = (n & C) !== 0
      if (r !== null) {
        var u,
          l,
          s = (n & U) !== 0,
          a = e && p !== null && !D,
          c = r.length
        if (s || a) {
          var _ = t,
            T = _.parent
          for (u = 0; u < c; u++)
            (l = r[u]),
              (s ||
                !(
                  (i = l == null ? void 0 : l.reactions) != null &&
                  i.includes(_)
                )) &&
                (l.reactions ?? (l.reactions = [])).push(_)
          s && (_.f ^= U), a && T !== null && (T.f & C) === 0 && (_.f ^= C)
        }
        for (u = 0; u < c; u++)
          if (((l = r[u]), Q(l) && $t(l), l.wv > t.wv)) return !0
      }
      ;(!e || (p !== null && !D)) && x(t, E)
    }
    return !1
  }
  function Et(t, n, r = !0) {
    var e = t.reactions
    if (e !== null)
      for (var u = 0; u < e.length; u++) {
        var l = e[u]
        ;(S != null && S.includes(t)) ||
          ((l.f & R) !== 0
            ? Et(l, n, !1)
            : n === l && (r ? x(l, $) : (l.f & E) !== 0 && x(l, M), mt(l)))
      }
  }
  function wt(t) {
    var f
    var n = g,
      r = d,
      e = w,
      u = v,
      l = D,
      s = S,
      a = m,
      c = P,
      _ = t.f
    ;(g = null),
      (d = 0),
      (w = null),
      (D = (_ & C) !== 0 && (P || !b || v === null)),
      (v = (_ & (N | I)) === 0 ? t : null),
      (S = null),
      ot(t.ctx),
      (P = !1),
      gt++,
      (t.f |= ut)
    try {
      var T = (0, t.fn)(),
        i = t.deps
      if (g !== null) {
        var o
        if ((Y(t, d), i !== null && d > 0))
          for (i.length = d + g.length, o = 0; o < g.length; o++)
            i[d + o] = g[o]
        else t.deps = i = g
        if (!D)
          for (o = d; o < i.length; o++)
            ((f = i[o]).reactions ?? (f.reactions = [])).push(t)
      } else i !== null && d < i.length && (Y(t, d), (i.length = d))
      if (Mt() && w !== null && !P && i !== null && (t.f & (R | M | $)) === 0)
        for (o = 0; o < w.length; o++) Et(w[o], t)
      return (
        u !== null &&
          u !== t &&
          (gt++, w !== null && (e === null ? (e = w) : e.push(...w))),
        T
      )
    } catch (h) {
      Xt(h)
    } finally {
      ;(g = n),
        (d = r),
        (w = e),
        (v = u),
        (D = l),
        (S = s),
        ot(a),
        (P = c),
        (t.f ^= ut)
    }
  }
  function tn(t, n) {
    let r = n.reactions
    if (r !== null) {
      var e = Dt.call(r, t)
      if (e !== -1) {
        var u = r.length - 1
        u === 0 ? (r = n.reactions = null) : ((r[e] = r[u]), r.pop())
      }
    }
    r === null &&
      (n.f & R) !== 0 &&
      (g === null || !g.includes(n)) &&
      (x(n, M), (n.f & (C | U)) === 0 && (n.f ^= U), it(n), Y(n, 0))
  }
  function Y(t, n) {
    var r = t.deps
    if (r !== null) for (var e = n; e < r.length; e++) tn(t, r[e])
  }
  function X(t) {
    var n = t.f
    if ((n & G) === 0) {
      x(t, E)
      var r = p,
        e = b
      ;(p = t), (b = !0)
      try {
        ;(n & Ct) !== 0 ? Gt(t) : _t(t), ft(t)
        var u = wt(t)
        ;(t.teardown = typeof u == "function" ? u : null), (t.wv = ht)
        var l = t.deps,
          s
      } finally {
        ;(b = e), (p = r)
      }
    }
  }
  function nn() {
    try {
      Ot()
    } catch (t) {
      if (B !== null) pt(t, B)
      else throw t
    }
  }
  function rn() {
    var t = b
    try {
      var n = 0
      for (b = !0; L.length > 0; ) {
        n++ > 1e3 && nn()
        var r = L,
          e = r.length
        L = []
        for (var u = 0; u < e; u++) {
          var l = ln(r[u])
          en(l)
        }
        Vt.clear()
      }
    } finally {
      ;(z = !1), (b = t), (B = null)
    }
  }
  function en(t) {
    var n = t.length
    if (n !== 0)
      for (var r = 0; r < n; r++) {
        var e = t[r]
        ;(e.f & (G | V)) === 0 &&
          Q(e) &&
          (X(e),
          e.deps === null &&
            e.first === null &&
            e.nodes_start === null &&
            (e.teardown === null ? ct(e) : (e.fn = null)))
      }
  }
  function mt(t) {
    z || ((z = !0), queueMicrotask(rn))
    for (var n = (B = t); n.parent !== null; ) {
      n = n.parent
      var r = n.f
      if ((r & (I | N)) !== 0) {
        if ((r & E) === 0) return
        n.f ^= E
      }
    }
    L.push(n)
  }
  function ln(t) {
    for (var n = [], r = t; r !== null; ) {
      var e = r.f,
        u = (e & (N | I)) !== 0,
        l = u && (e & E) !== 0
      if (!l && (e & V) === 0) {
        ;(e & rt) !== 0 ? n.push(r) : u ? (r.f ^= E) : Q(r) && X(r)
        var s = r.first
        if (s !== null) {
          r = s
          continue
        }
      }
      var a = r.parent
      for (r = r.next; r === null && a !== null; ) (r = a.next), (a = a.parent)
    }
    return n
  }
  const un = -7169
  function x(t, n) {
    t.f = (t.f & un) | n
  }
  const on = ["touchstart", "touchmove"]
  function sn(t) {
    return on.includes(t)
  }
  const an = new Set(),
    xt = new Set()
  function j(t) {
    var yt
    var n = this,
      r = n.ownerDocument,
      e = t.type,
      u = ((yt = t.composedPath) == null ? void 0 : yt.call(t)) || [],
      l = u[0] || t.target,
      s = 0,
      a = t.__root
    if (a) {
      var c = u.indexOf(a)
      if (c !== -1 && (n === document || n === window)) {
        t.__root = n
        return
      }
      var _ = u.indexOf(n)
      if (_ === -1) return
      c <= _ && (s = c)
    }
    if (((l = u[s] || t.target), l !== n)) {
      Nt(t, "currentTarget", {
        configurable: !0,
        get() {
          return l || r
        },
      })
      var T = v,
        i = p
      k(null), A(null)
      try {
        for (var o, f = []; l !== null; ) {
          var h = l.assignedSlot || l.parentNode || l.host || null
          try {
            var F = l["__" + e]
            if (F != null && (!l.disabled || t.target === l))
              if (bt(F)) {
                var [hn, ...gn] = F
                hn.apply(l, [t, ...gn])
              } else F.call(l, t)
          } catch (H) {
            o ? f.push(H) : (o = H)
          }
          if (t.cancelBubble || h === n || h === null) break
          l = h
        }
        if (o) {
          for (let H of f)
            queueMicrotask(() => {
              throw H
            })
          throw o
        }
      } finally {
        ;(t.__root = n), delete t.currentTarget, k(T), A(i)
      }
    }
  }
  function fn(t, n) {
    return _n(t, n)
  }
  const O = new Map()
  function _n(
    t,
    {
      target: n,
      anchor: r,
      props: e = {},
      events: u,
      context: l,
      intro: s = !0,
    }
  ) {
    qt()
    var a = new Set(),
      c = (i) => {
        for (var o = 0; o < i.length; o++) {
          var f = i[o]
          if (!a.has(f)) {
            a.add(f)
            var h = sn(f)
            n.addEventListener(f, j, { passive: h })
            var F = O.get(f)
            F === void 0
              ? (document.addEventListener(f, j, { passive: h }), O.set(f, 1))
              : O.set(f, F + 1)
          }
        }
      }
    c(Ft(an)), xt.add(c)
    var _ = void 0,
      T = Ht(() => {
        var i = r ?? n.appendChild(Bt())
        return (
          Wt(() => {
            if (l) {
              Rt({})
              var o = m
              o.c = l
            }
            u && (e.$$events = u), (_ = t(i, e) || {}), l && It()
          }),
          () => {
            var h
            for (var o of a) {
              n.removeEventListener(o, j)
              var f = O.get(o)
              --f === 0
                ? (document.removeEventListener(o, j), O.delete(o))
                : O.set(o, f)
            }
            xt.delete(c),
              i !== r && ((h = i.parentNode) == null || h.removeChild(i))
          }
        )
      })
    return Z.set(_, T), _
  }
  let Z = new WeakMap()
  function cn(t, n) {
    const r = Z.get(t)
    return r ? (Z.delete(t), r(n)) : Promise.resolve()
  }
  function vn(t, n) {
    window[n] = {
      start: (r, e) => {
        const u = fn(t, {
          target: document.getElementById(e) ?? document.body,
          props: r,
        })
        return { stop: () => cn(u) }
      },
    }
  }
  const pn = Object.assign({})
  function dn(t) {
    return `${t}-${Math.random().toString(36).substring(2, 9)}`
  }
  for (const [t, n] of Object.entries(pn))
    try {
      const r =
          ((Tt = t.split("/").pop()) == null
            ? void 0
            : Tt.replace(".svelte", "")) || "component",
        e = n.default
      if (e) {
        const u = dn(r)
        vn(e, u), console.log(`Embedded component: ${r} with UUID: ${u}`)
      }
    } catch (r) {
      console.error(`Error embedding component from ${t}:`, r)
    }
})
