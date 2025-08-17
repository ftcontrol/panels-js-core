var Je = Object.defineProperty;
var ue = (t) => {
  throw TypeError(t);
};
var Qe = (t, e, n) => e in t ? Je(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var gt = (t, e, n) => Qe(t, typeof e != "symbol" ? e + "" : e, n), Yt = (t, e, n) => e.has(t) || ue("Cannot " + n);
var h = (t, e, n) => (Yt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), x = (t, e, n) => e.has(t) ? ue("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), S = (t, e, n, r) => (Yt(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), G = (t, e, n) => (Yt(t, e, "access private method"), n);
var ge, we, me;
typeof window != "undefined" && ((me = (we = (ge = window.__svelte) != null ? ge : window.__svelte = {}).v) != null ? me : we.v = /* @__PURE__ */ new Set()).add("5");
const Xe = 2, b = Symbol(), be = !1;
var Ee = Array.isArray, tn = Array.prototype.indexOf, en = Array.from, Ht = Object.defineProperty, bt = Object.getOwnPropertyDescriptor, nn = Object.prototype, rn = Array.prototype, ln = Object.getPrototypeOf, ae = Object.isExtensible;
function sn() {
  var t, e, n = new Promise((r, l) => {
    t = r, e = l;
  });
  return { promise: n, resolve: t, reject: e };
}
const j = 2, te = 4, un = 8, Mt = 16, rt = 32, lt = 64, ye = 128, A = 256, Ct = 512, k = 1024, z = 2048, K = 4096, _t = 8192, ht = 16384, xe = 32768, an = 65536, fe = 1 << 17, fn = 1 << 18, ee = 1 << 19, ke = 1 << 20, Gt = 1 << 21, ne = 1 << 22, X = 1 << 23, Kt = Symbol("$state"), re = new class extends Error {
  constructor() {
    super(...arguments);
    gt(this, "name", "StaleReactionError");
    gt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function on() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
}
function cn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function vn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _n() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function dn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function hn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Te(t) {
  return t === this.v;
}
let pn = !1, F = null;
function zt(t) {
  F = t;
}
function gn(t, e = !1, n) {
  F = {
    p: F,
    c: null,
    e: null,
    s: t,
    x: null,
    l: null
  };
}
function wn(t) {
  var e = (
    /** @type {ComponentContext} */
    F
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var r of n)
      Cn(r);
  }
  return F = e.p, /** @type {T} */
  {};
}
function je() {
  return !0;
}
const mn = /* @__PURE__ */ new WeakMap();
function bn(t) {
  var e = g;
  if (e === null)
    return p.f |= X, t;
  if ((e.f & xe) === 0) {
    if ((e.f & ye) === 0)
      throw !e.parent && t instanceof Error && Se(t), t;
    e.b.error(t);
  } else
    le(t, e);
}
function le(t, e) {
  for (; e !== null; ) {
    if ((e.f & ye) !== 0)
      try {
        e.b.error(t);
        return;
      } catch (n) {
        t = n;
      }
    e = e.parent;
  }
  throw t instanceof Error && Se(t), t;
}
function Se(t) {
  const e = mn.get(t);
  e && (Ht(t, "message", {
    value: e.message
  }), Ht(t, "stack", {
    value: e.stack
  }));
}
function En() {
  for (var t = (
    /** @type {Effect} */
    g.b
  ); t !== null && !t.has_pending_snippet(); )
    t = t.parent;
  return t === null && on(), t;
}
// @__NO_SIDE_EFFECTS__
function yn(t) {
  var e = j | z, n = p !== null && (p.f & j) !== 0 ? (
    /** @type {Derived} */
    p
  ) : null;
  return g === null || n !== null && (n.f & A) !== 0 ? e |= A : g.f |= ee, {
    ctx: F,
    deps: null,
    effects: null,
    equals: Te,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      b
    ),
    wv: 0,
    parent: n != null ? n : g,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function xn(t, e) {
  let n = (
    /** @type {Effect | null} */
    g
  );
  n === null && cn();
  var r = (
    /** @type {Boundary} */
    n.b
  ), l = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ze(
    /** @type {V} */
    b
  ), u = null, f = !p;
  return Fn(() => {
    var _;
    try {
      var i = t();
    } catch (d) {
      i = Promise.reject(d);
    }
    var a = () => i;
    l = (_ = u == null ? void 0 : u.then(a, a)) != null ? _ : Promise.resolve(i), u = l;
    var o = (
      /** @type {Batch} */
      m
    ), c = r.pending;
    f && (r.update_pending_count(1), c || o.increment());
    const v = (d, w = void 0) => {
      u = null, c || o.activate(), w ? w !== re && (s.f |= X, Qt(s, w)) : ((s.f & X) !== 0 && (s.f ^= X), Qt(s, d)), f && (r.update_pending_count(-1), c || o.decrement()), Oe();
    };
    if (l.then(v, (d) => v(null, d || "unknown")), o)
      return () => {
        queueMicrotask(() => o.neuter());
      };
  }), new Promise((i) => {
    function a(o) {
      function c() {
        o === l ? i(s) : a(l);
      }
      o.then(c, c);
    }
    a(l);
  });
}
function Ne(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      nt(
        /** @type {Effect} */
        e[n]
      );
  }
}
function kn(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & j) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function se(t) {
  var e, n = g;
  Y(kn(t));
  try {
    Ne(t), e = He(t);
  } finally {
    Y(n);
  }
  return e;
}
function Re(t) {
  var e = se(t);
  if (t.equals(e) || (t.v = e, t.wv = Ke()), !Rt)
    if (q !== null)
      q.set(t, t.v);
    else {
      var n = (U || (t.f & A) !== 0) && t.deps !== null ? K : k;
      O(t, n);
    }
}
function Tn(t, e, n) {
  const r = yn;
  if (e.length === 0) {
    n(t.map(r));
    return;
  }
  var l = m, s = (
    /** @type {Effect} */
    g
  ), u = jn(), f = En();
  Promise.all(e.map((i) => /* @__PURE__ */ xn(i))).then((i) => {
    l == null || l.activate(), u();
    try {
      n([...t.map(r), ...i]);
    } catch (a) {
      (s.f & ht) === 0 && le(a, s);
    }
    l == null || l.deactivate(), Oe();
  }).catch((i) => {
    f.error(i);
  });
}
function jn() {
  var t = g, e = p, n = F;
  return function() {
    Y(t), D(e), zt(n);
  };
}
function Oe() {
  Y(null), D(null), zt(null);
}
const wt = /* @__PURE__ */ new Set();
let m = null, q = null, oe = /* @__PURE__ */ new Set(), Pt = [];
function Ae() {
  const t = (
    /** @type {() => void} */
    Pt.shift()
  );
  Pt.length > 0 && queueMicrotask(Ae), t();
}
let yt = [], ie = null, Zt = !1;
var ft, ot, $, Tt, jt, J, ct, Q, L, vt, St, Nt, C, Ce, At, Jt;
const Dt = class Dt {
  constructor() {
    x(this, C);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    gt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    x(this, ft, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    x(this, ot, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    x(this, $, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    x(this, Tt, null);
    /**
     * True if an async effect inside this batch resolved and
     * its parent branch was already deleted
     */
    x(this, jt, !1);
    /**
     * Async effects (created inside `async_derived`) encountered during processing.
     * These run after the rest of the batch has updated, since they should
     * always have the latest values
     * @type {Effect[]}
     */
    x(this, J, []);
    /**
     * The same as `#async_effects`, but for effects inside a newly-created
     * `<svelte:boundary>` — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    x(this, ct, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    x(this, Q, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    x(this, L, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    x(this, vt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    x(this, St, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    x(this, Nt, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    gt(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    var s;
    yt = [];
    var n = null;
    if (wt.size > 1) {
      n = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Map();
      for (const [u, f] of this.current)
        n.set(u, { v: u.v, wv: u.wv }), u.v = f;
      for (const u of wt)
        if (u !== this)
          for (const [f, i] of h(u, ft))
            n.has(f) || (n.set(f, { v: f.v, wv: f.wv }), f.v = i);
    }
    for (const u of e)
      G(this, C, Ce).call(this, u);
    if (h(this, J).length === 0 && h(this, $) === 0) {
      G(this, C, Jt).call(this);
      var r = h(this, Q), l = h(this, L);
      S(this, Q, []), S(this, L, []), S(this, vt, []), m = null, ce(r), ce(l), m === null ? m = this : wt.delete(this), (s = h(this, Tt)) == null || s.resolve();
    } else
      G(this, C, At).call(this, h(this, Q)), G(this, C, At).call(this, h(this, L)), G(this, C, At).call(this, h(this, vt));
    if (n) {
      for (const [u, { v: f, wv: i }] of n)
        u.wv <= i && (u.v = f);
      q = null;
    }
    for (const u of h(this, J))
      Et(u);
    for (const u of h(this, ct))
      Et(u);
    S(this, J, []), S(this, ct, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, n) {
    h(this, ft).has(e) || h(this, ft).set(e, n), this.current.set(e, e.v);
  }
  activate() {
    m = this;
  }
  deactivate() {
    m = null;
    for (const e of oe)
      if (oe.delete(e), e(), m !== null)
        break;
  }
  neuter() {
    S(this, jt, !0);
  }
  flush() {
    yt.length > 0 ? Sn() : G(this, C, Jt).call(this), m === this && (h(this, $) === 0 && wt.delete(this), this.deactivate());
  }
  increment() {
    S(this, $, h(this, $) + 1);
  }
  decrement() {
    if (S(this, $, h(this, $) - 1), h(this, $) === 0) {
      for (const e of h(this, St))
        O(e, z), dt(e);
      for (const e of h(this, Nt))
        O(e, K), dt(e);
      S(this, Q, []), S(this, L, []), this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    h(this, ot).add(e);
  }
  settled() {
    var e;
    return ((e = h(this, Tt)) != null ? e : S(this, Tt, sn())).promise;
  }
  static ensure() {
    if (m === null) {
      const e = m = new Dt();
      wt.add(m), Dt.enqueue(() => {
        m === e && e.flush();
      });
    }
    return m;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    Pt.length === 0 && queueMicrotask(Ae), Pt.unshift(e);
  }
};
ft = new WeakMap(), ot = new WeakMap(), $ = new WeakMap(), Tt = new WeakMap(), jt = new WeakMap(), J = new WeakMap(), ct = new WeakMap(), Q = new WeakMap(), L = new WeakMap(), vt = new WeakMap(), St = new WeakMap(), Nt = new WeakMap(), C = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
Ce = function(e) {
  var o;
  e.f ^= k;
  for (var n = e.first; n !== null; ) {
    var r = n.f, l = (r & (rt | lt)) !== 0, s = l && (r & k) !== 0, u = s || (r & _t) !== 0 || this.skipped_effects.has(n);
    if (!u && n.fn !== null) {
      if (l)
        n.f ^= k;
      else if ((r & k) === 0)
        if ((r & te) !== 0)
          h(this, L).push(n);
        else if ((r & ne) !== 0) {
          var f = (o = n.b) != null && o.pending ? h(this, ct) : h(this, J);
          f.push(n);
        } else $t(n) && ((n.f & Mt) !== 0 && h(this, vt).push(n), Et(n));
      var i = n.first;
      if (i !== null) {
        n = i;
        continue;
      }
    }
    var a = n.parent;
    for (n = n.next; n === null && a !== null; )
      n = a.next, a = a.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
At = function(e) {
  for (const n of e)
    ((n.f & z) !== 0 ? h(this, St) : h(this, Nt)).push(n), O(n, k);
  e.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
Jt = function() {
  if (!h(this, jt))
    for (const e of h(this, ot))
      e();
  h(this, ot).clear();
};
let xt = Dt;
function Sn() {
  var t = at;
  Zt = !0;
  try {
    var e = 0;
    for (_e(!0); yt.length > 0; ) {
      var n = xt.ensure();
      if (e++ > 1e3) {
        var r, l;
        Nn();
      }
      n.process(yt), tt.clear();
    }
  } finally {
    Zt = !1, _e(t), ie = null;
  }
}
function Nn() {
  try {
    vn();
  } catch (t) {
    le(t, ie);
  }
}
function ce(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (ht | _t)) === 0 && $t(r)) {
        var l = m ? m.current.size : 0;
        if (Et(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Ve(r) : r.fn = null), m !== null && m.current.size > l && (r.f & ke) !== 0)
          break;
      }
    }
    for (; n < e; )
      dt(t[n++]);
  }
}
function dt(t) {
  for (var e = ie = t; e.parent !== null; ) {
    e = e.parent;
    var n = e.f;
    if (Zt && e === g && (n & Mt) !== 0)
      return;
    if ((n & (lt | rt)) !== 0) {
      if ((n & k) === 0) return;
      e.f ^= k;
    }
  }
  yt.push(e);
}
const tt = /* @__PURE__ */ new Map();
function ze(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Te,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function R(t, e) {
  const n = ze(t);
  return qn(n), n;
}
function I(t, e, n = !1) {
  p !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Z || (p.f & fe) !== 0) && je() && (p.f & (j | Mt | ne | fe)) !== 0 && !(y != null && y.includes(t)) && hn();
  let r = n ? mt(e) : e;
  return Qt(t, r);
}
function Qt(t, e) {
  if (!t.equals(e)) {
    var n = t.v;
    Rt ? tt.set(t, e) : tt.set(t, n), t.v = e;
    var r = xt.ensure();
    r.capture(t, n), (t.f & j) !== 0 && ((t.f & z) !== 0 && se(
      /** @type {Derived} */
      t
    ), O(t, (t.f & A) === 0 ? k : K)), t.wv = Ke(), Pe(t, z), g !== null && (g.f & k) !== 0 && (g.f & (rt | lt)) === 0 && (N === null ? Un([t]) : N.push(t));
  }
  return e;
}
function W(t, e = 1) {
  var n = P(t), r = e === 1 ? n++ : n--;
  return I(t, n), r;
}
function Wt(t) {
  I(t, t.v + 1);
}
function Pe(t, e) {
  var n = t.reactions;
  if (n !== null)
    for (var r = n.length, l = 0; l < r; l++) {
      var s = n[l], u = s.f, f = (u & z) === 0;
      f && O(s, e), (u & j) !== 0 ? Pe(
        /** @type {Derived} */
        s,
        K
      ) : f && dt(
        /** @type {Effect} */
        s
      );
    }
}
function mt(t) {
  if (typeof t != "object" || t === null || Kt in t)
    return t;
  const e = ln(t);
  if (e !== nn && e !== rn)
    return t;
  var n = /* @__PURE__ */ new Map(), r = Ee(t), l = /* @__PURE__ */ R(0), s = et, u = (f) => {
    if (et === s)
      return f();
    var i = p, a = et;
    D(null), he(s);
    var o = f();
    return D(i), he(a), o;
  };
  return r && n.set("length", /* @__PURE__ */ R(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(f, i, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && _n();
        var o = n.get(i);
        return o === void 0 ? o = u(() => {
          var c = /* @__PURE__ */ R(a.value);
          return n.set(i, c), c;
        }) : I(o, a.value, !0), !0;
      },
      deleteProperty(f, i) {
        var a = n.get(i);
        if (a === void 0) {
          if (i in f) {
            const o = u(() => /* @__PURE__ */ R(b));
            n.set(i, o), Wt(l);
          }
        } else
          I(a, b), Wt(l);
        return !0;
      },
      get(f, i, a) {
        var _;
        if (i === Kt)
          return t;
        var o = n.get(i), c = i in f;
        if (o === void 0 && (!c || (_ = bt(f, i)) != null && _.writable) && (o = u(() => {
          var d = mt(c ? f[i] : b), w = /* @__PURE__ */ R(d);
          return w;
        }), n.set(i, o)), o !== void 0) {
          var v = P(o);
          return v === b ? void 0 : v;
        }
        return Reflect.get(f, i, a);
      },
      getOwnPropertyDescriptor(f, i) {
        var a = Reflect.getOwnPropertyDescriptor(f, i);
        if (a && "value" in a) {
          var o = n.get(i);
          o && (a.value = P(o));
        } else if (a === void 0) {
          var c = n.get(i), v = c == null ? void 0 : c.v;
          if (c !== void 0 && v !== b)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return a;
      },
      has(f, i) {
        var v;
        if (i === Kt)
          return !0;
        var a = n.get(i), o = a !== void 0 && a.v !== b || Reflect.has(f, i);
        if (a !== void 0 || g !== null && (!o || (v = bt(f, i)) != null && v.writable)) {
          a === void 0 && (a = u(() => {
            var _ = o ? mt(f[i]) : b, d = /* @__PURE__ */ R(_);
            return d;
          }), n.set(i, a));
          var c = P(a);
          if (c === b)
            return !1;
        }
        return o;
      },
      set(f, i, a, o) {
        var H;
        var c = n.get(i), v = i in f;
        if (r && i === "length")
          for (var _ = a; _ < /** @type {Source<number>} */
          c.v; _ += 1) {
            var d = n.get(_ + "");
            d !== void 0 ? I(d, b) : _ in f && (d = u(() => /* @__PURE__ */ R(b)), n.set(_ + "", d));
          }
        if (c === void 0)
          (!v || (H = bt(f, i)) != null && H.writable) && (c = u(() => /* @__PURE__ */ R(void 0)), I(c, mt(a)), n.set(i, c));
        else {
          v = c.v !== b;
          var w = u(() => mt(a));
          I(c, w);
        }
        var M = Reflect.getOwnPropertyDescriptor(f, i);
        if (M != null && M.set && M.set.call(o, a), !v) {
          if (r && typeof i == "string") {
            var st = (
              /** @type {Source<number>} */
              n.get("length")
            ), it = Number(i);
            Number.isInteger(it) && it >= st.v && I(st, it + 1);
          }
          Wt(l);
        }
        return !0;
      },
      ownKeys(f) {
        P(l);
        var i = Reflect.ownKeys(f).filter((c) => {
          var v = n.get(c);
          return v === void 0 || v.v !== b;
        });
        for (var [a, o] of n)
          o.v !== b && !(a in f) && i.push(a);
        return i;
      },
      setPrototypeOf() {
        dn();
      }
    }
  );
}
var ve, Fe, De, Me;
function Rn() {
  if (ve === void 0) {
    ve = window, Fe = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    De = bt(e, "firstChild").get, Me = bt(e, "nextSibling").get, ae(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), ae(n) && (n.__t = void 0);
  }
}
function On(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Ie(t) {
  return De.call(t);
}
// @__NO_SIDE_EFFECTS__
function $e(t) {
  return Me.call(t);
}
function V(t, e) {
  return /* @__PURE__ */ Ie(t);
}
function B(t, e = 1, n = !1) {
  let r = t;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ $e(r);
  return r;
}
function Le(t) {
  var e = p, n = g;
  D(null), Y(null);
  try {
    return t();
  } finally {
    D(e), Y(n);
  }
}
function An(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function pt(t, e, n, r = !0) {
  var i;
  var l = g;
  l !== null && (l.f & _t) !== 0 && (t |= _t);
  var s = {
    ctx: F,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | z,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: l,
    b: l && l.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      Et(s), s.f |= xe;
    } catch (a) {
      throw nt(s), a;
    }
  else e !== null && dt(s);
  var u = n && s.deps === null && s.first === null && s.nodes_start === null && s.teardown === null && (s.f & ee) === 0;
  if (!u && r && (l !== null && An(s, l), p !== null && (p.f & j) !== 0 && (t & lt) === 0)) {
    var f = (
      /** @type {Derived} */
      p
    );
    ((i = f.effects) != null ? i : f.effects = []).push(s);
  }
  return s;
}
function Cn(t) {
  return pt(te | ke, t, !1);
}
function zn(t) {
  xt.ensure();
  const e = pt(lt, t, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? $n(e, () => {
      nt(e), r(void 0);
    }) : (nt(e), r(void 0));
  });
}
function Pn(t) {
  return pt(te, t, !1);
}
function Fn(t) {
  return pt(ne | ee, t, !0);
}
function It(t, e = [], n = []) {
  Tn(e, n, (r) => {
    pt(un, () => t(...r.map(P)), !0);
  });
}
function Dn(t, e = !0) {
  return pt(rt, t, !0, e);
}
function qe(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = Rt, r = p;
    de(!0), D(null);
    try {
      e.call(null);
    } finally {
      de(n), D(r);
    }
  }
}
function Ue(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const l = n.ac;
    l !== null && Le(() => {
      l.abort(re);
    });
    var r = n.next;
    (n.f & lt) !== 0 ? n.parent = null : nt(n, e), n = r;
  }
}
function Mn(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & rt) === 0 && nt(e), e = n;
  }
}
function nt(t, e = !0) {
  var n = !1;
  (e || (t.f & fn) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (In(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), n = !0), Ue(t, e && !n), Ft(t, 0), O(t, ht);
  var r = t.transitions;
  if (r !== null)
    for (const s of r)
      s.stop();
  qe(t);
  var l = t.parent;
  l !== null && l.first !== null && Ve(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function In(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ $e(t)
    );
    t.remove(), t = n;
  }
}
function Ve(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function $n(t, e) {
  var n = [];
  Be(t, n, !0), Ln(n, () => {
    nt(t), e && e();
  });
}
function Ln(t, e) {
  var n = t.length;
  if (n > 0) {
    var r = () => --n || e();
    for (var l of t)
      l.out(r);
  } else
    e();
}
function Be(t, e, n) {
  if ((t.f & _t) === 0) {
    if (t.f ^= _t, t.transitions !== null)
      for (const u of t.transitions)
        (u.is_global || n) && e.push(u);
    for (var r = t.first; r !== null; ) {
      var l = r.next, s = (r.f & an) !== 0 || (r.f & rt) !== 0;
      Be(r, e, s ? n : !1), r = l;
    }
  }
}
let at = !1;
function _e(t) {
  at = t;
}
let Rt = !1;
function de(t) {
  Rt = t;
}
let p = null, Z = !1;
function D(t) {
  p = t;
}
let g = null;
function Y(t) {
  g = t;
}
let y = null;
function qn(t) {
  p !== null && (y === null ? y = [t] : y.push(t));
}
let E = null, T = 0, N = null;
function Un(t) {
  N = t;
}
let Ye = 1, kt = 0, et = kt;
function he(t) {
  et = t;
}
let U = !1;
function Ke() {
  return ++Ye;
}
function $t(t) {
  var c, v;
  var e = t.f;
  if ((e & z) !== 0)
    return !0;
  if ((e & K) !== 0) {
    var n = t.deps, r = (e & A) !== 0;
    if (n !== null) {
      var l, s, u = (e & Ct) !== 0, f = r && g !== null && !U, i = n.length;
      if ((u || f) && (g === null || (g.f & ht) === 0)) {
        var a = (
          /** @type {Derived} */
          t
        ), o = a.parent;
        for (l = 0; l < i; l++)
          s = n[l], (u || !((c = s == null ? void 0 : s.reactions) != null && c.includes(a))) && ((v = s.reactions) != null ? v : s.reactions = []).push(a);
        u && (a.f ^= Ct), f && o !== null && (o.f & A) === 0 && (a.f ^= A);
      }
      for (l = 0; l < i; l++)
        if (s = n[l], $t(
          /** @type {Derived} */
          s
        ) && Re(
          /** @type {Derived} */
          s
        ), s.wv > t.wv)
          return !0;
    }
    (!r || g !== null && !U) && O(t, k);
  }
  return !1;
}
function We(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(y != null && y.includes(t)))
    for (var l = 0; l < r.length; l++) {
      var s = r[l];
      (s.f & j) !== 0 ? We(
        /** @type {Derived} */
        s,
        e,
        !1
      ) : e === s && (n ? O(s, z) : (s.f & k) !== 0 && O(s, K), dt(
        /** @type {Effect} */
        s
      ));
    }
}
function He(t) {
  var w, M;
  var e = E, n = T, r = N, l = p, s = U, u = y, f = F, i = Z, a = et, o = t.f;
  E = /** @type {null | Value[]} */
  null, T = 0, N = null, U = (o & A) !== 0 && (Z || !at || p === null), p = (o & (rt | lt)) === 0 ? t : null, y = null, zt(t.ctx), Z = !1, et = ++kt, t.ac !== null && (Le(() => {
    t.ac.abort(re);
  }), t.ac = null);
  try {
    t.f |= Gt;
    var c = (
      /** @type {Function} */
      t.fn
    ), v = c(), _ = t.deps;
    if (E !== null) {
      var d;
      if (Ft(t, T), _ !== null && T > 0)
        for (_.length = T + E.length, d = 0; d < E.length; d++)
          _[T + d] = E[d];
      else
        t.deps = _ = E;
      if (!U || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (o & j) !== 0 && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (d = T; d < _.length; d++)
          ((M = (w = _[d]).reactions) != null ? M : w.reactions = []).push(t);
    } else _ !== null && T < _.length && (Ft(t, T), _.length = T);
    if (je() && N !== null && !Z && _ !== null && (t.f & (j | K | z)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      N.length; d++)
        We(
          N[d],
          /** @type {Effect} */
          t
        );
    return l !== null && l !== t && (kt++, N !== null && (r === null ? r = N : r.push(.../** @type {Source[]} */
    N))), (t.f & X) !== 0 && (t.f ^= X), v;
  } catch (st) {
    return bn(st);
  } finally {
    t.f ^= Gt, E = e, T = n, N = r, p = l, U = s, y = u, zt(f), Z = i, et = a;
  }
}
function Vn(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = tn.call(n, t);
    if (r !== -1) {
      var l = n.length - 1;
      l === 0 ? n = e.reactions = null : (n[r] = n[l], n.pop());
    }
  }
  n === null && (e.f & j) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (E === null || !E.includes(e)) && (O(e, K), (e.f & (A | Ct)) === 0 && (e.f ^= Ct), Ne(
    /** @type {Derived} **/
    e
  ), Ft(
    /** @type {Derived} **/
    e,
    0
  ));
}
function Ft(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      Vn(t, n[r]);
}
function Et(t) {
  var e = t.f;
  if ((e & ht) === 0) {
    O(t, k);
    var n = g, r = at;
    g = t, at = !0;
    try {
      (e & Mt) !== 0 ? Mn(t) : Ue(t), qe(t);
      var l = He(t);
      t.teardown = typeof l == "function" ? l : null, t.wv = Ye;
      var s;
      be && pn && (t.f & z) !== 0 && t.deps;
    } finally {
      at = r, g = n;
    }
  }
}
function P(t) {
  var a;
  var e = t.f, n = (e & j) !== 0;
  if (p !== null && !Z) {
    var r = g !== null && (g.f & ht) !== 0;
    if (!r && !(y != null && y.includes(t))) {
      var l = p.deps;
      if ((p.f & Gt) !== 0)
        t.rv < kt && (t.rv = kt, E === null && l !== null && l[T] === t ? T++ : E === null ? E = [t] : (!U || !E.includes(t)) && E.push(t));
      else {
        ((a = p.deps) != null ? a : p.deps = []).push(t);
        var s = t.reactions;
        s === null ? t.reactions = [p] : s.includes(p) || s.push(p);
      }
    }
  } else if (n && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var u = (
      /** @type {Derived} */
      t
    ), f = u.parent;
    f !== null && (f.f & A) === 0 && (u.f ^= A);
  }
  if (Rt) {
    if (tt.has(t))
      return tt.get(t);
    if (n) {
      u = /** @type {Derived} */
      t;
      var i = u.v;
      return ((u.f & k) === 0 && u.reactions !== null || Ge(u)) && (i = se(u)), tt.set(u, i), i;
    }
  } else if (n) {
    if (u = /** @type {Derived} */
    t, q != null && q.has(u))
      return q.get(u);
    $t(u) && Re(u);
  }
  if ((t.f & X) !== 0)
    throw t.v;
  return t.v;
}
function Ge(t) {
  if (t.v === b) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (tt.has(e) || (e.f & j) !== 0 && Ge(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
const Bn = -7169;
function O(t, e) {
  t.f = t.f & Bn | e;
}
const Ze = /* @__PURE__ */ new Set(), Xt = /* @__PURE__ */ new Set();
function Lt(t) {
  for (var e = 0; e < t.length; e++)
    Ze.add(t[e]);
  for (var n of Xt)
    n(t);
}
let pe = null;
function Ot(t) {
  var it;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, l = ((it = t.composedPath) == null ? void 0 : it.call(t)) || [], s = (
    /** @type {null | Element} */
    l[0] || t.target
  );
  pe = t;
  var u = 0, f = pe === t && t.__root;
  if (f) {
    var i = l.indexOf(f);
    if (i !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var a = l.indexOf(e);
    if (a === -1)
      return;
    i <= a && (u = i);
  }
  if (s = /** @type {Element} */
  l[u] || t.target, s !== e) {
    Ht(t, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var o = p, c = g;
    D(null), Y(null);
    try {
      for (var v, _ = []; s !== null; ) {
        var d = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var w = s["__" + r];
          if (w != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === s))
            if (Ee(w)) {
              var [M, ...st] = w;
              M.apply(s, [t, ...st]);
            } else
              w.call(s, t);
        } catch (H) {
          v ? _.push(H) : v = H;
        }
        if (t.cancelBubble || d === e || d === null)
          break;
        s = d;
      }
      if (v) {
        for (let H of _)
          queueMicrotask(() => {
            throw H;
          });
        throw v;
      }
    } finally {
      t.__root = e, delete t.currentTarget, D(o), Y(c);
    }
  }
}
function Yn(t) {
  var e = document.createElement("template");
  return e.innerHTML = t.replaceAll("<!>", "<!---->"), e.content;
}
function Kn(t, e) {
  var n = (
    /** @type {Effect} */
    g
  );
  n.nodes_start === null && (n.nodes_start = t, n.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function qt(t, e) {
  var n = (e & Xe) !== 0, r, l = !t.startsWith("<!>");
  return () => {
    r === void 0 && (r = Yn(l ? t : "<!>" + t), r = /** @type {Node} */
    /* @__PURE__ */ Ie(r));
    var s = (
      /** @type {TemplateNode} */
      n || Fe ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return Kn(s, s), s;
  };
}
function Ut(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
const Wn = ["touchstart", "touchmove"];
function Hn(t) {
  return Wn.includes(t);
}
function Vt(t, e) {
  var r;
  var n = e == null ? "" : typeof e == "object" ? e + "" : e;
  n !== ((r = t.__t) != null ? r : t.__t = t.nodeValue) && (t.__t = n, t.nodeValue = n + "");
}
function Gn(t, e) {
  return Zn(t, e);
}
const ut = /* @__PURE__ */ new Map();
function Zn(t, { target: e, anchor: n, props: r = {}, events: l, context: s, intro: u = !0 }) {
  Rn();
  var f = /* @__PURE__ */ new Set(), i = (c) => {
    for (var v = 0; v < c.length; v++) {
      var _ = c[v];
      if (!f.has(_)) {
        f.add(_);
        var d = Hn(_);
        e.addEventListener(_, Ot, { passive: d });
        var w = ut.get(_);
        w === void 0 ? (document.addEventListener(_, Ot, { passive: d }), ut.set(_, 1)) : ut.set(_, w + 1);
      }
    }
  };
  i(en(Ze)), Xt.add(i);
  var a = void 0, o = zn(() => {
    var c = n != null ? n : e.appendChild(On());
    return Dn(() => {
      if (s) {
        gn({});
        var v = (
          /** @type {ComponentContext} */
          F
        );
        v.c = s;
      }
      l && (r.$$events = l), a = t(c, r) || {}, s && wn();
    }), () => {
      var d;
      for (var v of f) {
        e.removeEventListener(v, Ot);
        var _ = (
          /** @type {number} */
          ut.get(v)
        );
        --_ === 0 ? (document.removeEventListener(v, Ot), ut.delete(v)) : ut.set(v, _);
      }
      Xt.delete(i), c !== n && ((d = c.parentNode) == null || d.removeChild(c));
    };
  });
  return Jn.set(a, o), a;
}
let Jn = /* @__PURE__ */ new WeakMap();
function Bt(t, e) {
  Pn(() => {
    var l;
    var n = t.getRootNode(), r = (
      /** @type {ShadowRoot} */
      n.host ? (
        /** @type {ShadowRoot} */
        n
      ) : (
        /** @type {Document} */
        (l = n.head) != null ? l : (
          /** @type {Document} */
          n.ownerDocument.head
        )
      )
    );
    if (!r.querySelector("#" + e.hash)) {
      const s = document.createElement("style");
      s.id = e.hash, s.textContent = e.code, r.appendChild(s);
    }
  });
}
var Qn = (t, e) => W(e, -1), Xn = (t, e) => W(e), tr = /* @__PURE__ */ qt('<div class="svelte-9z6hjs"><button class="svelte-9z6hjs">–</button> <strong> </strong> <button class="svelte-9z6hjs">+</button></div>');
const er = {
  hash: "svelte-9z6hjs",
  code: "div.svelte-9z6hjs {display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;}button.svelte-9z6hjs {cursor:pointer;border:0;padding:0.5rem 0.75rem;border-radius:8px;}"
};
function nr(t) {
  Bt(t, er);
  let e = /* @__PURE__ */ R(0);
  var n = tr(), r = V(n);
  r.__click = [Qn, e];
  var l = B(r, 2), s = V(l), u = B(l, 2);
  u.__click = [Xn, e], It(() => Vt(s, P(e))), Ut(t, n);
}
Lt(["click"]);
var rr = (t, e) => W(e, -1), lr = (t, e) => W(e), sr = /* @__PURE__ */ qt('<div class="svelte-9z6hjs"><button class="svelte-9z6hjs">–</button> <strong> </strong> <button class="svelte-9z6hjs">+</button></div>');
const ir = {
  hash: "svelte-9z6hjs",
  code: "div.svelte-9z6hjs {display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;}button.svelte-9z6hjs {cursor:pointer;border:0;padding:0.5rem 0.75rem;border-radius:8px;}"
};
function ur(t) {
  Bt(t, ir);
  let e = /* @__PURE__ */ R(0);
  var n = sr(), r = V(n);
  r.__click = [rr, e];
  var l = B(r, 2), s = V(l), u = B(l, 2);
  u.__click = [lr, e], It(() => Vt(s, P(e))), Ut(t, n);
}
Lt(["click"]);
var ar = (t, e) => W(e, -1), fr = (t, e) => W(e), or = /* @__PURE__ */ qt('<div class="svelte-9z6hjs"><button class="svelte-9z6hjs">–</button> <strong> </strong> <button class="svelte-9z6hjs">+</button></div>');
const cr = {
  hash: "svelte-9z6hjs",
  code: "div.svelte-9z6hjs {display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;}button.svelte-9z6hjs {cursor:pointer;border:0;padding:0.5rem 0.75rem;border-radius:8px;}"
};
function vr(t) {
  Bt(t, cr);
  let e = /* @__PURE__ */ R(0);
  var n = or(), r = V(n);
  r.__click = [ar, e];
  var l = B(r, 2), s = V(l), u = B(l, 2);
  u.__click = [fr, e], It(() => Vt(s, P(e))), Ut(t, n);
}
Lt(["click"]);
var _r = (t, e) => W(e, -1), dr = (t, e) => W(e), hr = /* @__PURE__ */ qt('<div class="svelte-9z6hjs"><button class="svelte-9z6hjs">–</button> <strong> </strong> <button class="svelte-9z6hjs">+</button></div>');
const pr = {
  hash: "svelte-9z6hjs",
  code: "div.svelte-9z6hjs {display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;}button.svelte-9z6hjs {cursor:pointer;border:0;padding:0.5rem 0.75rem;border-radius:8px;}"
};
function gr(t) {
  Bt(t, pr);
  let e = /* @__PURE__ */ R(0);
  var n = hr(), r = V(n);
  r.__click = [_r, e];
  var l = B(r, 2), s = V(l), u = B(l, 2);
  u.__click = [dr, e], It(() => Vt(s, P(e))), Ut(t, n);
}
Lt(["click"]);
class br {
  constructor() {
    this.mappings = [nr, ur, vr, gr];
  }
  load(e, n, r) {
    return Gn(this.mappings[e], {
      target: n,
      props: r
    });
  }
  loadDocs() {
    console.log("Test");
  }
}
export {
  br as default
};
