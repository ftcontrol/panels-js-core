var d7 = "5"
if (typeof window !== "undefined")
  ((window.__svelte ??= {}).v ??= new Set()).add(d7)
var LQ = !1,
  UQ = !1
function p7() {
  LQ = !0
}
p7()
var _7 = 1,
  c7 = 2,
  l7 = 4,
  i7 = 8,
  o7 = 16
var s7 = 1,
  r7 = 2
var xQ = "[",
  gQ = "[!",
  oQ = "]",
  OQ = {}
var D = Symbol(),
  ZQ = Symbol("filename"),
  a7 = Symbol("hmr")
var U = !0
var zQ = Array.isArray,
  n7 = Array.prototype.indexOf,
  K7 = Array.from,
  X7 = Object.keys,
  T = Object.defineProperty,
  JQ = Object.getOwnPropertyDescriptor,
  W7 = Object.getOwnPropertyDescriptors,
  Z7 = Object.prototype,
  t7 = Array.prototype,
  sQ = Object.getPrototypeOf,
  z7 = Object.isExtensible
function e7(Q) {
  return Q()
}
function yQ(Q) {
  for (var J = 0; J < Q.length; J++) Q[J]()
}
var g = 2,
  j0 = 4,
  X0 = 8,
  vQ = 16,
  KQ = 32,
  qQ = 64,
  rQ = 128,
  b = 256,
  W0 = 512,
  w = 1024,
  y = 2048,
  f = 4096,
  VQ = 8192,
  Z0 = 16384,
  z0 = 32768,
  GQ = 65536,
  G7 = 131072,
  E0 = 262144,
  B7 = 524288,
  x0 = 1048576,
  b0 = 2097152,
  u = Symbol("$state"),
  G0 = Symbol("legacy props"),
  o9 = Symbol(""),
  k0 = Symbol("proxy path")
function h0(Q) {
  return Q === this.v
}
function g0(Q, J) {
  return Q != Q
    ? J == J
    : Q !== J ||
        (Q !== null && typeof Q === "object") ||
        typeof Q === "function"
}
function aQ(Q) {
  return !g0(Q, this.v)
}
function Q9() {
  if (U) {
    let Q = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`)
    throw ((Q.name = "Svelte error"), Q)
  } else throw new Error("https://svelte.dev/e/derived_references_self")
}
function J9(Q) {
  if (U) {
    let J = new Error(`effect_in_teardown
\`${Q}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`)
    throw ((J.name = "Svelte error"), J)
  } else throw new Error("https://svelte.dev/e/effect_in_teardown")
}
function K9() {
  if (U) {
    let Q = new Error(
      "effect_in_unowned_derived\nEffect cannot be created inside a `$derived` value that was not itself created inside an effect\nhttps://svelte.dev/e/effect_in_unowned_derived"
    )
    throw ((Q.name = "Svelte error"), Q)
  } else throw new Error("https://svelte.dev/e/effect_in_unowned_derived")
}
function X9(Q) {
  if (U) {
    let J = new Error(`effect_orphan
\`${Q}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`)
    throw ((J.name = "Svelte error"), J)
  } else throw new Error("https://svelte.dev/e/effect_orphan")
}
function W9() {
  if (U) {
    let Q = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
https://svelte.dev/e/effect_update_depth_exceeded`)
    throw ((Q.name = "Svelte error"), Q)
  } else throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")
}
function Z9() {
  if (U) {
    let Q = new Error(`hydration_failed
Failed to hydrate the application
https://svelte.dev/e/hydration_failed`)
    throw ((Q.name = "Svelte error"), Q)
  } else throw new Error("https://svelte.dev/e/hydration_failed")
}
function z9(Q) {
  if (U) {
    let J = new Error(`props_invalid_value
Cannot do \`bind:${Q}={undefined}\` when \`${Q}\` has a fallback value
https://svelte.dev/e/props_invalid_value`)
    throw ((J.name = "Svelte error"), J)
  } else throw new Error("https://svelte.dev/e/props_invalid_value")
}
function G9(Q) {
  if (U) {
    let J = new Error(`rune_outside_svelte
The \`${Q}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`)
    throw ((J.name = "Svelte error"), J)
  } else throw new Error("https://svelte.dev/e/rune_outside_svelte")
}
function B9() {
  if (U) {
    let Q = new Error(
      "state_descriptors_fixed\nProperty descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.\nhttps://svelte.dev/e/state_descriptors_fixed"
    )
    throw ((Q.name = "Svelte error"), Q)
  } else throw new Error("https://svelte.dev/e/state_descriptors_fixed")
}
function U9() {
  if (U) {
    let Q = new Error(
      "state_prototype_fixed\nCannot set prototype of `$state` object\nhttps://svelte.dev/e/state_prototype_fixed"
    )
    throw ((Q.name = "Svelte error"), Q)
  } else throw new Error("https://svelte.dev/e/state_prototype_fixed")
}
function q9() {
  if (U) {
    let Q = new Error(
      "state_unsafe_mutation\nUpdating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without `$state`\nhttps://svelte.dev/e/state_unsafe_mutation"
    )
    throw ((Q.name = "Svelte error"), Q)
  } else throw new Error("https://svelte.dev/e/state_unsafe_mutation")
}
var B0 = null
function CQ(Q) {
  let J = Error(),
    K = J.stack
  if (K) {
    let X = K.split(`
`),
      Z = [
        `
`,
      ]
    for (let W = 0; W < X.length; W++) {
      let z = X[W]
      if (z === "Error") continue
      if (z.includes("validate_each_keys")) return null
      if (z.includes("svelte/src/internal")) continue
      Z.push(z)
    }
    if (Z.length === 1) return null
    T(J, "stack", {
      value: Z.join(`
`),
    }),
      T(J, "name", { value: `${Q}Error` })
  }
  return J
}
function HQ(Q, J) {
  return (Q.label = J), v0(Q.v, J), Q
}
function v0(Q, J) {
  return Q?.[k0]?.(J), Q
}
var C = null
function q0(Q) {
  C = Q
}
var BQ = null
function H0(Q) {
  BQ = Q
}
function U7(Q, J = !1, K) {
  var X = (C = { p: C, c: null, d: !1, e: null, m: !1, s: Q, x: null, l: null })
  if (LQ && !J) C.l = { s: null, u: null, r1: [], r2: RQ(!1) }
  if (
    (d(() => {
      X.d = !0
    }),
    U)
  )
    (C.function = K), (BQ = K)
}
function q7(Q) {
  let J = C
  if (J !== null) {
    if (Q !== void 0) J.x = Q
    let z = J.e
    if (z !== null) {
      var K = $,
        X = L
      J.e = null
      try {
        for (var Z = 0; Z < z.length; Z++) {
          var W = z[Z]
          k(W.effect), j(W.reaction), WQ(W.fn)
        }
      } finally {
        k(K), j(X)
      }
    }
    if (((C = J.p), U)) BQ = J.p?.function ?? null
    J.m = !0
  }
  return Q || {}
}
function SQ() {
  return !LQ || (C !== null && C.l === null)
}
var a9 = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/
function NQ(Q) {
  if (typeof Q !== "object" || Q === null || u in Q) return Q
  let J = sQ(Q)
  if (J !== Z7 && J !== t7) return Q
  var K = new Map(),
    X = zQ(Q),
    Z = PQ(0),
    W = U && UQ ? CQ("CreatedAt") : null,
    z = L,
    q = (Y) => {
      var B = L
      j(z)
      var G = Y()
      return j(B), G
    }
  if (X) K.set("length", PQ(Q.length, W))
  var P = ""
  function M(Y) {
    ;(P = Y), HQ(Z, `${P} version`)
    for (let [B, G] of K) HQ(G, mQ(P, B))
  }
  return new Proxy(Q, {
    defineProperty(Y, B, G) {
      if (
        !("value" in G) ||
        G.configurable === !1 ||
        G.enumerable === !1 ||
        G.writable === !1
      )
        B9()
      return (
        q(() => {
          var H = K.get(B)
          if (H === void 0) {
            if (((H = PQ(G.value, W)), K.set(B, H), U && typeof B === "string"))
              HQ(H, mQ(P, B))
          } else I(H, G.value, !0)
        }),
        !0
      )
    },
    deleteProperty(Y, B) {
      var G = K.get(B)
      if (G === void 0) {
        if (B in Y) {
          let V = q(() => PQ(D, W))
          if ((K.set(B, V), H7(Z), U)) HQ(V, mQ(P, B))
        }
      } else {
        if (X && typeof B === "string") {
          var H = K.get("length"),
            F = Number(B)
          if (Number.isInteger(F) && F < H.v) I(H, F)
        }
        I(G, D), H7(Z)
      }
      return !0
    },
    get(Y, B, G) {
      if (B === u) return Q
      if (U && B === k0) return M
      var H = K.get(B),
        F = B in Y
      if (H === void 0 && (!F || JQ(Y, B)?.writable))
        (H = q(() => {
          var N = NQ(F ? Y[B] : D),
            o = PQ(N, W)
          if (U) HQ(o, mQ(P, B))
          return o
        })),
          K.set(B, H)
      if (H !== void 0) {
        var V = S(H)
        return V === D ? void 0 : V
      }
      return Reflect.get(Y, B, G)
    },
    getOwnPropertyDescriptor(Y, B) {
      var G = Reflect.getOwnPropertyDescriptor(Y, B)
      if (G && "value" in G) {
        var H = K.get(B)
        if (H) G.value = S(H)
      } else if (G === void 0) {
        var F = K.get(B),
          V = F?.v
        if (F !== void 0 && V !== D)
          return { enumerable: !0, configurable: !0, value: V, writable: !0 }
      }
      return G
    },
    has(Y, B) {
      if (B === u) return !0
      var G = K.get(B),
        H = (G !== void 0 && G.v !== D) || Reflect.has(Y, B)
      if (G !== void 0 || ($ !== null && (!H || JQ(Y, B)?.writable))) {
        if (G === void 0)
          (G = q(() => {
            var V = H ? NQ(Y[B]) : D,
              N = PQ(V, W)
            if (U) HQ(N, mQ(P, B))
            return N
          })),
            K.set(B, G)
        var F = S(G)
        if (F === D) return !1
      }
      return H
    },
    set(Y, B, G, H) {
      var F = K.get(B),
        V = B in Y
      if (X && B === "length")
        for (var N = G; N < F.v; N += 1) {
          var o = K.get(N + "")
          if (o !== void 0) I(o, D)
          else if (N in Y) {
            if (((o = q(() => PQ(D, W))), K.set(N + "", o), U)) HQ(o, mQ(P, N))
          }
        }
      if (F === void 0) {
        if (!V || JQ(Y, B)?.writable) {
          if (
            ((F = q(() => {
              var QQ = PQ(void 0, W)
              return I(QQ, NQ(G)), QQ
            })),
            K.set(B, F),
            U)
          )
            HQ(F, mQ(P, B))
        }
      } else {
        V = F.v !== D
        var jQ = q(() => NQ(G))
        I(F, jQ)
      }
      var hQ = Reflect.getOwnPropertyDescriptor(Y, B)
      if (hQ?.set) hQ.set.call(H, G)
      if (!V) {
        if (X && typeof B === "string") {
          var lQ = K.get("length"),
            EQ = Number(B)
          if (Number.isInteger(EQ) && EQ >= lQ.v) I(lQ, EQ + 1)
        }
        H7(Z)
      }
      return !0
    },
    ownKeys(Y) {
      S(Z)
      var B = Reflect.ownKeys(Y).filter((F) => {
        var V = K.get(F)
        return V === void 0 || V.v !== D
      })
      for (var [G, H] of K) if (H.v !== D && !(G in Y)) B.push(G)
      return B
    },
    setPrototypeOf() {
      U9()
    },
  })
}
function mQ(Q, J) {
  if (typeof J === "symbol") return `${Q}[Symbol(${J.description ?? ""})]`
  if (a9.test(J)) return `${Q}.${J}`
  return /^\d+$/.test(J) ? `${Q}[${J}]` : `${Q}['${J}']`
}
function H7(Q, J = 1) {
  I(Q, Q.v + J)
}
function m0(Q) {
  try {
    if (Q !== null && typeof Q === "object" && u in Q) return Q[u]
  } catch {}
  return Q
}
function AQ(Q) {
  var J = g | y,
    K = L !== null && (L.f & g) !== 0 ? L : null
  if ($ === null || (K !== null && (K.f & b) !== 0)) J |= b
  else $.f |= x0
  let X = {
    ctx: C,
    deps: null,
    effects: null,
    equals: h0,
    f: J,
    fn: Q,
    reactions: null,
    rv: 0,
    v: null,
    wv: 0,
    parent: K ?? $,
  }
  if (U && UQ) X.created = CQ("CreatedAt")
  return X
}
function d0(Q) {
  let J = AQ(Q)
  return (J.equals = aQ), J
}
function f0(Q) {
  var J = Q.effects
  if (J !== null) {
    Q.effects = null
    for (var K = 0; K < J.length; K += 1) v(J[K])
  }
}
var P7 = []
function n9(Q) {
  var J = Q.parent
  while (J !== null) {
    if ((J.f & g) === 0) return J
    J = J.parent
  }
  return null
}
function $7(Q) {
  var J,
    K = $
  if ((k(n9(Q)), U)) {
    let X = fQ
    Y7(new Set())
    try {
      if (P7.includes(Q)) Q9()
      P7.push(Q), f0(Q), (J = u0(Q))
    } finally {
      k(K), Y7(X), P7.pop()
    }
  } else
    try {
      f0(Q), (J = u0(Q))
    } finally {
      k(K)
    }
  return J
}
function M7(Q) {
  var J = $7(Q)
  if (!Q.equals(J)) (Q.v = J), (Q.wv = P0())
  if (IQ) return
  var K = (wQ || (Q.f & b) !== 0) && Q.deps !== null ? f : w
  h(Q, K)
}
var fQ = new Set(),
  nQ = new Map()
function Y7(Q) {
  fQ = Q
}
function RQ(Q, J) {
  var K = { f: 0, v: Q, reactions: null, equals: h0, rv: 0, wv: 0 }
  if (U && UQ)
    (K.created = J ?? CQ("CreatedAt")),
      (K.updated = null),
      (K.set_during_effect = !1),
      (K.trace = null)
  return K
}
function PQ(Q, J) {
  let K = RQ(Q, J)
  return F7(K), K
}
function YQ(Q, J = !1) {
  let K = RQ(Q)
  if (!J) K.equals = aQ
  if (LQ && C !== null && C.l !== null) (C.l.s ??= []).push(K)
  return K
}
function I(Q, J, K = !1) {
  if (L !== null && !r && SQ() && (L.f & (g | vQ)) !== 0 && !$Q?.includes(Q))
    q9()
  let X = K ? NQ(J) : J
  if (U) v0(X, Q.label)
  return p0(Q, X)
}
function p0(Q, J) {
  if (!Q.equals(J)) {
    var K = Q.v
    if (IQ) nQ.set(Q, J)
    else nQ.set(Q, K)
    if (((Q.v = J), U && UQ)) {
      if (((Q.updated = CQ("UpdatedAt")), $ !== null)) Q.set_during_effect = !0
    }
    if ((Q.f & g) !== 0) {
      if ((Q.f & y) !== 0) $7(Q)
      h(Q, (Q.f & b) === 0 ? w : f)
    }
    if (
      ((Q.wv = P0()),
      Y9(Q, y),
      SQ() && $ !== null && ($.f & w) !== 0 && ($.f & (KQ | qQ)) === 0)
    )
      if (s === null) $9([Q])
      else s.push(Q)
    if (U && fQ.size > 0) {
      let X = Array.from(fQ)
      for (let Z of X) {
        if ((Z.f & w) !== 0) h(Z, f)
        if (DQ(Z)) uQ(Z)
      }
      fQ.clear()
    }
  }
  return J
}
function Y9(Q, J) {
  var K = Q.reactions
  if (K === null) return
  var X = SQ(),
    Z = K.length
  for (var W = 0; W < Z; W++) {
    var z = K[W],
      q = z.f
    if ((q & y) !== 0) continue
    if (!X && z === $) continue
    if (U && (q & E0) !== 0) {
      fQ.add(z)
      continue
    }
    if ((h(z, J), (q & (w | b)) !== 0))
      if ((q & g) !== 0) Y9(z, f)
      else tQ(z)
  }
}
var L7 = "font-weight: bold",
  O7 = "font-weight: normal"
function dQ(Q) {
  if (U)
    console.warn(
      `%c[svelte] hydration_mismatch
%c${
        Q
          ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${Q}`
          : "Hydration failed because the initial UI does not match what was rendered on the server"
      }
https://svelte.dev/e/hydration_mismatch`,
      L7,
      O7
    )
  else console.warn("https://svelte.dev/e/hydration_mismatch")
}
function M9() {
  if (U)
    console.warn(
      `%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`,
      L7,
      O7
    )
  else console.warn("https://svelte.dev/e/lifecycle_double_unmount")
}
function _0(Q) {
  if (U)
    console.warn(
      `%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${Q}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`,
      L7,
      O7
    )
  else console.warn("https://svelte.dev/e/state_proxy_equality_mismatch")
}
var O = !1
function n(Q) {
  O = Q
}
var R
function E(Q) {
  if (Q === null) throw (dQ(), OQ)
  return (R = Q)
}
function p() {
  return E(t(R))
}
function Y0(Q) {
  if (!O) return
  if (t(R) !== null) throw (dQ(), OQ)
  R = Q
}
function $0() {
  var Q = 0,
    J = R
  while (!0) {
    if (J.nodeType === 8) {
      var K = J.data
      if (K === oQ) {
        if (Q === 0) return J
        Q -= 1
      } else if (K === xQ || K === gQ) Q += 1
    }
    var X = t(J)
    J.remove(), (J = X)
  }
}
function V7(Q) {
  if (!Q || Q.nodeType !== 8) throw (dQ(), OQ)
  return Q.data
}
function F9() {
  let { prototype: Q, __svelte_cleanup: J } = Array
  if (J) J()
  let { indexOf: K, lastIndexOf: X, includes: Z } = Q
  ;(Q.indexOf = function (W, z) {
    let q = K.call(this, W, z)
    if (q === -1) {
      for (let P = z ?? 0; P < this.length; P += 1)
        if (m0(this[P]) === W) {
          _0("array.indexOf(...)")
          break
        }
    }
    return q
  }),
    (Q.lastIndexOf = function (W, z) {
      let q = X.call(this, W, z ?? this.length - 1)
      if (q === -1) {
        for (let P = 0; P <= (z ?? this.length - 1); P += 1)
          if (m0(this[P]) === W) {
            _0("array.lastIndexOf(...)")
            break
          }
      }
      return q
    }),
    (Q.includes = function (W, z) {
      let q = Z.call(this, W, z)
      if (!q) {
        for (let P = 0; P < this.length; P += 1)
          if (m0(this[P]) === W) {
            _0("array.includes(...)")
            break
          }
      }
      return q
    }),
    (Array.__svelte_cleanup = () => {
      ;(Q.indexOf = K), (Q.lastIndexOf = X), (Q.includes = Z)
    })
}
var C7, L9, M0, O9, V9
function c0() {
  if (C7 !== void 0) return
  ;(C7 = window), (L9 = document), (M0 = /Firefox/.test(navigator.userAgent))
  var Q = Element.prototype,
    J = Node.prototype,
    K = Text.prototype
  if (((O9 = JQ(J, "firstChild").get), (V9 = JQ(J, "nextSibling").get), z7(Q)))
    (Q.__click = void 0),
      (Q.__className = void 0),
      (Q.__attributes = null),
      (Q.__style = void 0),
      (Q.__e = void 0)
  if (z7(K)) K.__t = void 0
  if (U) (Q.__svelte_meta = null), F9()
}
function TQ(Q = "") {
  return document.createTextNode(Q)
}
function i(Q) {
  return O9.call(Q)
}
function t(Q) {
  return V9.call(Q)
}
function F0(Q, J) {
  if (!O) return i(Q)
  var K = i(R)
  if (K === null) K = R.appendChild(TQ())
  else if (J && K.nodeType !== 3) {
    var X = TQ()
    return K?.before(X), E(X), X
  }
  return E(K), K
}
function L0(Q, J = 1, K = !1) {
  let X = O ? R : Q
  var Z
  while (J--) (Z = X), (X = t(X))
  if (!O) return X
  var W = X?.nodeType
  if (K && W !== 3) {
    var z = TQ()
    if (X === null) Z?.after(z)
    else X.before(z)
    return E(z), z
  }
  return E(X), X
}
function l0(Q) {
  Q.textContent = ""
}
function R7(Q) {
  if ($ === null && L === null) X9(Q)
  if (L !== null && (L.f & b) !== 0 && $ === null) K9()
  if (IQ) J9(Q)
}
function t9(Q, J) {
  var K = J.last
  if (K === null) J.last = J.first = Q
  else (K.next = Q), (Q.prev = K), (J.last = Q)
}
function pQ(Q, J, K, X = !0) {
  var Z = $
  if (U) while (Z !== null && (Z.f & E0) !== 0) Z = Z.parent
  var W = {
    ctx: C,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: Q | y,
    first: null,
    fn: J,
    last: null,
    next: null,
    parent: Z,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
  }
  if (U) W.component_function = BQ
  if (K)
    try {
      uQ(W), (W.f |= z0)
    } catch (P) {
      throw (v(W), P)
    }
  else if (J !== null) tQ(W)
  var z =
    K &&
    W.deps === null &&
    W.first === null &&
    W.nodes_start === null &&
    W.teardown === null &&
    (W.f & (x0 | rQ)) === 0
  if (!z && X) {
    if (Z !== null) t9(W, Z)
    if (L !== null && (L.f & g) !== 0) {
      var q = L
      ;(q.effects ??= []).push(W)
    }
  }
  return W
}
function d(Q) {
  let J = pQ(X0, null, !1)
  return h(J, w), (J.teardown = Q), J
}
function O0(Q) {
  R7("$effect")
  var J = $ !== null && ($.f & KQ) !== 0 && C !== null && !C.m
  if (U) T(Q, "name", { value: "$effect" })
  if (J) {
    var K = C
    ;(K.e ??= []).push({ fn: Q, effect: $, reaction: L })
  } else {
    var X = WQ(Q)
    return X
  }
}
function V0(Q) {
  if ((R7("$effect.pre"), U)) T(Q, "name", { value: "$effect.pre" })
  return m(Q)
}
function N7(Q) {
  let J = pQ(qQ, Q, !0)
  return () => {
    v(J)
  }
}
function C9(Q) {
  let J = pQ(qQ, Q, !0)
  return (K = {}) => {
    return new Promise((X) => {
      if (K.outro)
        MQ(J, () => {
          v(J), X(void 0)
        })
      else v(J), X(void 0)
    })
  }
}
function WQ(Q) {
  return pQ(j0, Q, !1)
}
function e9(Q, J) {
  var K = C,
    X = { effect: null, ran: !1 }
  K.l.r1.push(X),
    (X.effect = m(() => {
      if ((Q(), X.ran)) return
      ;(X.ran = !0), I(K.l.r2, !0), A(J)
    }))
}
function QJ() {
  var Q = C
  m(() => {
    if (!S(Q.l.r2)) return
    for (var J of Q.l.r1) {
      var K = J.effect
      if ((K.f & w) !== 0) h(K, f)
      if (DQ(K)) uQ(K)
      J.ran = !1
    }
    Q.l.r2.v = !1
  })
}
function m(Q) {
  return pQ(X0, Q, !0)
}
function i0(Q, J = [], K = AQ) {
  if (U)
    return m(() => {
      var Z = $,
        W = () => Q(...z.map(S))
      T(Z.fn, "name", { value: "{expression}" }),
        T(W, "name", { value: "{expression}" })
      let z = J.map(K)
      _(W)
    })
  let X = J.map(K)
  return _(() => Q(...X.map(S)))
}
function _(Q, J = 0) {
  return pQ(X0 | vQ | J, Q, !0)
}
function c(Q, J = !0) {
  return pQ(X0 | KQ, Q, !0, J)
}
function A7(Q) {
  var J = Q.teardown
  if (J !== null) {
    let K = IQ,
      X = L
    S7(!0), j(null)
    try {
      J.call(null)
    } finally {
      S7(K), j(X)
    }
  }
}
function I7(Q, J = !1) {
  var K = Q.first
  Q.first = Q.last = null
  while (K !== null) {
    var X = K.next
    if ((K.f & qQ) !== 0) K.parent = null
    else v(K, J)
    K = X
  }
}
function S9(Q) {
  var J = Q.first
  while (J !== null) {
    var K = J.next
    if ((J.f & KQ) === 0) v(J)
    J = K
  }
}
function v(Q, J = !0) {
  var K = !1
  if ((J || (Q.f & B7) !== 0) && Q.nodes_start !== null && Q.nodes_end !== null)
    R9(Q.nodes_start, Q.nodes_end), (K = !0)
  I7(Q, J && !K), C0(Q, 0), h(Q, Z0)
  var X = Q.transitions
  if (X !== null) for (let W of X) W.stop()
  A7(Q)
  var Z = Q.parent
  if (Z !== null && Z.first !== null) w7(Q)
  if (U) Q.component_function = null
  Q.next =
    Q.prev =
    Q.teardown =
    Q.ctx =
    Q.deps =
    Q.fn =
    Q.nodes_start =
    Q.nodes_end =
      null
}
function R9(Q, J) {
  while (Q !== null) {
    var K = Q === J ? null : t(Q)
    Q.remove(), (Q = K)
  }
}
function w7(Q) {
  var { parent: J, prev: K, next: X } = Q
  if (K !== null) K.next = X
  if (X !== null) X.prev = K
  if (J !== null) {
    if (J.first === Q) J.first = X
    if (J.last === Q) J.last = K
  }
}
function MQ(Q, J) {
  var K = []
  D7(Q, K, !0),
    N9(K, () => {
      if ((v(Q), J)) J()
    })
}
function N9(Q, J) {
  var K = Q.length
  if (K > 0) {
    var X = () => --K || J()
    for (var Z of Q) Z.out(X)
  } else J()
}
function D7(Q, J, K) {
  if ((Q.f & VQ) !== 0) return
  if (((Q.f ^= VQ), Q.transitions !== null)) {
    for (let z of Q.transitions) if (z.is_global || K) J.push(z)
  }
  var X = Q.first
  while (X !== null) {
    var Z = X.next,
      W = (X.f & GQ) !== 0 || (X.f & KQ) !== 0
    D7(X, J, W ? K : !1), (X = Z)
  }
}
function eQ(Q) {
  A9(Q, !0)
}
function A9(Q, J) {
  if ((Q.f & VQ) === 0) return
  if (((Q.f ^= VQ), (Q.f & w) === 0)) Q.f ^= w
  if (DQ(Q)) h(Q, y), tQ(Q)
  var K = Q.first
  while (K !== null) {
    var X = K.next,
      Z = (K.f & GQ) !== 0 || (K.f & KQ) !== 0
    A9(K, Z ? J : !1), (K = X)
  }
  if (Q.transitions !== null) {
    for (let W of Q.transitions) if (W.is_global || J) W.in()
  }
}
var S0 = [],
  T7 = []
function I9() {
  var Q = S0
  ;(S0 = []), yQ(Q)
}
function JJ() {
  var Q = T7
  ;(T7 = []), yQ(Q)
}
function FQ(Q) {
  if (S0.length === 0) queueMicrotask(I9)
  S0.push(Q)
}
function w9() {
  if (S0.length > 0) I9()
  if (T7.length > 0) JJ()
}
function T9(Q) {
  var J = $
  if (U && Q instanceof Error) KJ(Q, J)
  if ((J.f & z0) === 0) {
    if ((J.f & rQ) === 0) throw Q
    J.fn(Q)
  } else R0(Q, J)
}
function R0(Q, J) {
  while (J !== null) {
    if ((J.f & rQ) !== 0)
      try {
        J.fn(Q)
        return
      } catch {}
    J = J.parent
  }
  throw Q
}
var D9 = new WeakSet()
function KJ(Q, J) {
  if (D9.has(Q)) return
  D9.add(Q)
  var K = M0 ? "  " : "\t",
    X = `
${K}in ${J.fn?.name || "<unknown>"}`,
    Z = J.ctx
  while (Z !== null)
    (X += `
${K}in ${Z.function?.[ZQ].split("/").pop()}`),
      (Z = Z.p)
  if (
    (T(Q, "message", {
      value:
        Q.message +
        `
${X}
`,
    }),
    Q.stack)
  )
    T(Q, "stack", {
      value: Q.stack
        .split(
          `
`
        )
        .filter((W) => !W.includes("svelte/src/internal")).join(`
`),
    })
}
var _Q = !1,
  Q0 = null,
  cQ = !1,
  IQ = !1
function S7(Q) {
  IQ = Q
}
var N0 = [],
  A0 = [],
  L = null,
  r = !1
function j(Q) {
  L = Q
}
var $ = null
function k(Q) {
  $ = Q
}
var $Q = null
function F7(Q) {
  if (L !== null && L.f & b0)
    if ($Q === null) $Q = [Q]
    else $Q.push(Q)
}
var l = null,
  e = 0,
  s = null
function $9(Q) {
  s = Q
}
var E9 = 1,
  o0 = 0,
  wQ = !1,
  U0 = null
function P0() {
  return ++E9
}
function DQ(Q) {
  var J = Q.f
  if ((J & y) !== 0) return !0
  if ((J & f) !== 0) {
    var K = Q.deps,
      X = (J & b) !== 0
    if (K !== null) {
      var Z,
        W,
        z = (J & W0) !== 0,
        q = X && $ !== null && !wQ,
        P = K.length
      if (z || q) {
        var M = Q,
          Y = M.parent
        for (Z = 0; Z < P; Z++)
          if (((W = K[Z]), z || !W?.reactions?.includes(M)))
            (W.reactions ??= []).push(M)
        if (z) M.f ^= W0
        if (q && Y !== null && (Y.f & b) === 0) M.f ^= b
      }
      for (Z = 0; Z < P; Z++) {
        if (((W = K[Z]), DQ(W))) M7(W)
        if (W.wv > Q.wv) return !0
      }
    }
    if (!X || ($ !== null && !wQ)) h(Q, w)
  }
  return !1
}
function x9(Q, J, K = !0) {
  var X = Q.reactions
  if (X === null) return
  for (var Z = 0; Z < X.length; Z++) {
    var W = X[Z]
    if ($Q?.includes(Q)) continue
    if ((W.f & g) !== 0) x9(W, J, !1)
    else if (J === W) {
      if (K) h(W, y)
      else if ((W.f & w) !== 0) h(W, f)
      tQ(W)
    }
  }
}
function u0(Q) {
  var J = l,
    K = e,
    X = s,
    Z = L,
    W = wQ,
    z = $Q,
    q = C,
    P = r,
    M = Q.f
  ;(l = null),
    (e = 0),
    (s = null),
    (wQ = (M & b) !== 0 && (r || !cQ || L === null)),
    (L = (M & (KQ | qQ)) === 0 ? Q : null),
    ($Q = null),
    q0(Q.ctx),
    (r = !1),
    o0++,
    (Q.f |= b0)
  try {
    var Y = Q.fn(),
      B = Q.deps
    if (l !== null) {
      var G
      if ((C0(Q, e), B !== null && e > 0)) {
        B.length = e + l.length
        for (G = 0; G < l.length; G++) B[e + G] = l[G]
      } else Q.deps = B = l
      if (!wQ) for (G = e; G < B.length; G++) (B[G].reactions ??= []).push(Q)
    } else if (B !== null && e < B.length) C0(Q, e), (B.length = e)
    if (SQ() && s !== null && !r && B !== null && (Q.f & (g | f | y)) === 0)
      for (G = 0; G < s.length; G++) x9(s[G], Q)
    if (Z !== null && Z !== Q) {
      if ((o0++, s !== null))
        if (X === null) X = s
        else X.push(...s)
    }
    return Y
  } catch (H) {
    T9(H)
  } finally {
    ;(l = J),
      (e = K),
      (s = X),
      (L = Z),
      (wQ = W),
      ($Q = z),
      q0(q),
      (r = P),
      (Q.f ^= b0)
  }
}
function XJ(Q, J) {
  let K = J.reactions
  if (K !== null) {
    var X = n7.call(K, Q)
    if (X !== -1) {
      var Z = K.length - 1
      if (Z === 0) K = J.reactions = null
      else (K[X] = K[Z]), K.pop()
    }
  }
  if (K === null && (J.f & g) !== 0 && (l === null || !l.includes(J))) {
    if ((h(J, f), (J.f & (b | W0)) === 0)) J.f ^= W0
    f0(J), C0(J, 0)
  }
}
function C0(Q, J) {
  var K = Q.deps
  if (K === null) return
  for (var X = J; X < K.length; X++) XJ(Q, K[X])
}
function uQ(Q) {
  var J = Q.f
  if ((J & Z0) !== 0) return
  h(Q, w)
  var K = $,
    X = cQ
  if ((($ = Q), (cQ = !0), U)) {
    var Z = BQ
    H0(Q.component_function)
  }
  try {
    if ((J & vQ) !== 0) S9(Q)
    else I7(Q)
    A7(Q)
    var W = u0(Q)
    if (
      ((Q.teardown = typeof W === "function" ? W : null),
      (Q.wv = E9),
      U && UQ && (Q.f & y) !== 0 && Q.deps !== null)
    ) {
      for (var z of Q.deps)
        if (z.set_during_effect) (z.wv = P0()), (z.set_during_effect = !1)
    }
    if (U) A0.push(Q)
  } finally {
    if (((cQ = X), ($ = K), U)) H0(Z)
  }
}
function j9() {
  console.error(
    "Last ten effects were: ",
    A0.slice(-10).map((Q) => Q.fn)
  ),
    (A0 = [])
}
function WJ() {
  try {
    W9()
  } catch (Q) {
    if (U) T(Q, "stack", { value: "" })
    if (Q0 !== null)
      if (U)
        try {
          R0(Q, Q0)
        } catch (J) {
          throw (j9(), J)
        }
      else R0(Q, Q0)
    else {
      if (U) j9()
      throw Q
    }
  }
}
function j7() {
  var Q = cQ
  try {
    var J = 0
    cQ = !0
    while (N0.length > 0) {
      if (J++ > 1000) WJ()
      var K = N0,
        X = K.length
      N0 = []
      for (var Z = 0; Z < X; Z++) {
        var W = zJ(K[Z])
        ZJ(W)
      }
      nQ.clear()
    }
  } finally {
    if (((_Q = !1), (cQ = Q), (Q0 = null), U)) A0 = []
  }
}
function ZJ(Q) {
  var J = Q.length
  if (J === 0) return
  for (var K = 0; K < J; K++) {
    var X = Q[K]
    if ((X.f & (Z0 | VQ)) === 0) {
      if (DQ(X)) {
        if (
          (uQ(X), X.deps === null && X.first === null && X.nodes_start === null)
        )
          if (X.teardown === null) w7(X)
          else X.fn = null
      }
    }
  }
}
function tQ(Q) {
  if (!_Q) (_Q = !0), queueMicrotask(j7)
  var J = (Q0 = Q)
  while (J.parent !== null) {
    J = J.parent
    var K = J.f
    if ((K & (qQ | KQ)) !== 0) {
      if ((K & w) === 0) return
      J.f ^= w
    }
  }
  N0.push(J)
}
function zJ(Q) {
  var J = [],
    K = Q
  while (K !== null) {
    var X = K.f,
      Z = (X & (KQ | qQ)) !== 0,
      W = Z && (X & w) !== 0
    if (!W && (X & VQ) === 0) {
      if ((X & j0) !== 0) J.push(K)
      else if (Z) K.f ^= w
      else if (DQ(K)) uQ(K)
      var z = K.first
      if (z !== null) {
        K = z
        continue
      }
    }
    var q = K.parent
    K = K.next
    while (K === null && q !== null) (K = q.next), (q = q.parent)
  }
  return J
}
function I0(Q) {
  var J
  if (Q) (_Q = !0), j7(), (_Q = !0), (J = Q())
  while (!0) {
    if ((w9(), N0.length === 0)) {
      if (((_Q = !1), (Q0 = null), U)) A0 = []
      return J
    }
    ;(_Q = !0), j7()
  }
}
function S(Q) {
  var J = Q.f,
    K = (J & g) !== 0
  if (U0 !== null) U0.add(Q)
  if (L !== null && !r) {
    if (!$Q?.includes(Q)) {
      var X = L.deps
      if (Q.rv < o0) {
        if (((Q.rv = o0), l === null && X !== null && X[e] === Q)) e++
        else if (l === null) l = [Q]
        else if (!wQ || !l.includes(Q)) l.push(Q)
      }
    }
  } else if (K && Q.deps === null && Q.effects === null) {
    var Z = Q,
      W = Z.parent
    if (W !== null && (W.f & b) === 0) Z.f ^= b
  }
  if (K) {
    if (((Z = Q), DQ(Z))) M7(Z)
  }
  if (U && UQ && !r && B0 !== null && L !== null && B0.reaction === L)
    if (Q.trace) Q.trace()
    else {
      var z = CQ("TracedAt")
      if (z) {
        var q = B0.entries.get(Q)
        if (q === void 0) (q = { traces: [] }), B0.entries.set(Q, q)
        var P = q.traces[q.traces.length - 1]
        if (z.stack !== P?.stack) q.traces.push(z)
      }
    }
  if (IQ && nQ.has(Q)) return nQ.get(Q)
  return Q.v
}
function A(Q) {
  var J = r
  try {
    return (r = !0), Q()
  } finally {
    r = J
  }
}
var GJ = ~(y | f | w)
function h(Q, J) {
  Q.f = (Q.f & GJ) | J
}
function r0(Q) {
  if (typeof Q !== "object" || !Q || Q instanceof EventTarget) return
  if (u in Q) s0(Q)
  else if (!Array.isArray(Q))
    for (let J in Q) {
      let K = Q[J]
      if (typeof K === "object" && K && u in K) s0(K)
    }
}
function s0(Q, J = new Set()) {
  if (
    typeof Q === "object" &&
    Q !== null &&
    !(Q instanceof EventTarget) &&
    !J.has(Q)
  ) {
    if ((J.add(Q), Q instanceof Date)) Q.getTime()
    for (let X in Q)
      try {
        s0(Q[X], J)
      } catch (Z) {}
    let K = sQ(Q)
    if (
      K !== Object.prototype &&
      K !== Array.prototype &&
      K !== Map.prototype &&
      K !== Set.prototype &&
      K !== Date.prototype
    ) {
      let X = W7(K)
      for (let Z in X) {
        let W = X[Z].get
        if (W)
          try {
            W.call(Q)
          } catch (z) {}
      }
    }
  }
}
function a0(Q) {
  var J = L,
    K = $
  j(null), k(null)
  try {
    return Q()
  } finally {
    j(J), k(K)
  }
}
var b9 = new Set(),
  E7 = new Set()
function k9(Q, J, K, X = {}) {
  function Z(W) {
    if (!X.capture) J0.call(J, W)
    if (!W.cancelBubble)
      return a0(() => {
        return K?.call(this, W)
      })
  }
  if (Q.startsWith("pointer") || Q.startsWith("touch") || Q === "wheel")
    FQ(() => {
      J.addEventListener(Q, Z, X)
    })
  else J.addEventListener(Q, Z, X)
  return Z
}
function w0(Q, J, K, X, Z) {
  var W = { capture: X, passive: Z },
    z = k9(Q, J, K, W)
  if (
    J === document.body ||
    J === window ||
    J === document ||
    J instanceof HTMLMediaElement
  )
    d(() => {
      J.removeEventListener(Q, z, W)
    })
}
function J0(Q) {
  var J = this,
    K = J.ownerDocument,
    X = Q.type,
    Z = Q.composedPath?.() || [],
    W = Z[0] || Q.target,
    z = 0,
    q = Q.__root
  if (q) {
    var P = Z.indexOf(q)
    if (P !== -1 && (J === document || J === window)) {
      Q.__root = J
      return
    }
    var M = Z.indexOf(J)
    if (M === -1) return
    if (P <= M) z = P
  }
  if (((W = Z[z] || Q.target), W === J)) return
  T(Q, "currentTarget", {
    configurable: !0,
    get() {
      return W || K
    },
  })
  var Y = L,
    B = $
  j(null), k(null)
  try {
    var G,
      H = []
    while (W !== null) {
      var F = W.assignedSlot || W.parentNode || W.host || null
      try {
        var V = W["__" + X]
        if (V != null && (!W.disabled || Q.target === W))
          if (zQ(V)) {
            var [N, ...o] = V
            N.apply(W, [Q, ...o])
          } else V.call(W, Q)
      } catch (jQ) {
        if (G) H.push(jQ)
        else G = jQ
      }
      if (Q.cancelBubble || F === J || F === null) break
      W = F
    }
    if (G) {
      for (let jQ of H)
        queueMicrotask(() => {
          throw jQ
        })
      throw G
    }
  } finally {
    ;(Q.__root = J), delete Q.currentTarget, j(Y), k(B)
  }
}
var UJ
function h9() {
  UJ = void 0
}
function n0(Q) {
  var J = document.createElement("template")
  return (J.innerHTML = Q.replaceAll("<!>", "<!---->")), J.content
}
function bQ(Q, J) {
  var K = $
  if (K.nodes_start === null) (K.nodes_start = Q), (K.nodes_end = J)
}
function x7(Q, J) {
  var K = (J & s7) !== 0,
    X = (J & r7) !== 0,
    Z,
    W = !Q.startsWith("<!>")
  return () => {
    if (O) return bQ(R, null), R
    if (Z === void 0) {
      if (((Z = n0(W ? Q : "<!>" + Q)), !K)) Z = i(Z)
    }
    var z = X || M0 ? document.importNode(Z, !0) : Z.cloneNode(!0)
    if (K) {
      var q = i(z),
        P = z.lastChild
      bQ(q, P)
    } else bQ(z, z)
    return z
  }
}
function D0(Q, J) {
  if (O) {
    ;($.nodes_end = R), p()
    return
  }
  if (Q === null) return
  Q.before(J)
}
var qJ = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "webkitdirectory",
  "defer",
  "disablepictureinpicture",
  "disableremoteplayback",
]
var x1 = [
  ...qJ,
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  "readOnly",
  "value",
  "volume",
  "defaultValue",
  "defaultChecked",
  "srcObject",
  "noValidate",
  "allowFullscreen",
  "disablePictureInPicture",
  "disableRemotePlayback",
]
var HJ = ["touchstart", "touchmove"]
function y9(Q) {
  return HJ.includes(Q)
}
var PJ = ["$state", "$state.raw", "$derived", "$derived.by"],
  b1 = [
    ...PJ,
    "$state.snapshot",
    "$props",
    "$props.id",
    "$bindable",
    "$effect",
    "$effect.pre",
    "$effect.tracking",
    "$effect.root",
    "$inspect",
    "$inspect().with",
    "$inspect.trace",
    "$host",
  ]
var b7 = !0
function h7(Q, J) {
  var K = J == null ? "" : typeof J === "object" ? J + "" : J
  if (K !== (Q.__t ??= Q.nodeValue)) (Q.__t = K), (Q.nodeValue = K + "")
}
function t0(Q, J) {
  return v9(Q, J)
}
function g7(Q, J) {
  c0(), (J.intro = J.intro ?? !1)
  let K = J.target,
    X = O,
    Z = R
  try {
    var W = i(K)
    while (W && (W.nodeType !== 8 || W.data !== xQ)) W = t(W)
    if (!W) throw OQ
    n(!0), E(W), p()
    let z = v9(Q, { ...J, anchor: W })
    if (R === null || R.nodeType !== 8 || R.data !== oQ) throw (dQ(), OQ)
    return n(!1), z
  } catch (z) {
    if (z === OQ) {
      if (J.recover === !1) Z9()
      return c0(), l0(K), n(!1), t0(Q, J)
    }
    throw z
  } finally {
    n(X), E(Z), h9()
  }
}
var K0 = new Map()
function v9(
  Q,
  { target: J, anchor: K, props: X = {}, events: Z, context: W, intro: z = !0 }
) {
  c0()
  var q = new Set(),
    P = (B) => {
      for (var G = 0; G < B.length; G++) {
        var H = B[G]
        if (q.has(H)) continue
        q.add(H)
        var F = y9(H)
        J.addEventListener(H, J0, { passive: F })
        var V = K0.get(H)
        if (V === void 0)
          document.addEventListener(H, J0, { passive: F }), K0.set(H, 1)
        else K0.set(H, V + 1)
      }
    }
  P(K7(b9)), E7.add(P)
  var M = void 0,
    Y = C9(() => {
      var B = K ?? J.appendChild(TQ())
      return (
        c(() => {
          if (W) {
            U7({})
            var G = C
            G.c = W
          }
          if (Z) X.$$events = Z
          if (O) bQ(B, null)
          if (((b7 = z), (M = Q(B, X) || {}), (b7 = !0), O)) $.nodes_end = R
          if (W) q7()
        }),
        () => {
          for (var G of q) {
            J.removeEventListener(G, J0)
            var H = K0.get(G)
            if (--H === 0) document.removeEventListener(G, J0), K0.delete(G)
            else K0.set(G, H)
          }
          if ((E7.delete(P), B !== K)) B.parentNode?.removeChild(B)
        }
      )
    })
  return k7.set(M, Y), M
}
var k7 = new WeakMap()
function y7(Q, J) {
  let K = k7.get(Q)
  if (K) return k7.delete(Q), K(J)
  if (U) M9()
  return Promise.resolve()
}
if (U) {
  let Q = function (J) {
    if (!(J in globalThis)) {
      let K
      Object.defineProperty(globalThis, J, {
        configurable: !0,
        get: () => {
          if (K !== void 0) return K
          G9(J)
        },
        set: (X) => {
          K = X
        },
      })
    }
  }
  Q("$state"),
    Q("$effect"),
    Q("$derived"),
    Q("$inspect"),
    Q("$props"),
    Q("$bindable")
}
function OJ(Q, J, [K, X] = [0, 0]) {
  if (O && K === 0) p()
  var Z = Q,
    W = null,
    z = null,
    q = D,
    P = K > 0 ? GQ : 0,
    M = !1
  let Y = (G, H = !0) => {
      ;(M = !0), B(H, G)
    },
    B = (G, H) => {
      if (q === (q = G)) return
      let F = !1
      if (O && X !== -1) {
        if (K === 0) {
          let N = V7(Z)
          if (N === xQ) X = 0
          else if (N === gQ) X = 1 / 0
          else if (((X = parseInt(N.substring(1))), X !== X)) X = q ? 1 / 0 : -1
        }
        let V = X > K
        if (!!q === V) (Z = $0()), E(Z), n(!1), (F = !0), (X = -1)
      }
      if (q) {
        if (W) eQ(W)
        else if (H) W = c(() => H(Z))
        if (z)
          MQ(z, () => {
            z = null
          })
      } else {
        if (z) eQ(z)
        else if (H) z = c(() => H(Z, [K + 1, X]))
        if (W)
          MQ(W, () => {
            W = null
          })
      }
      if (F) n(!0)
    }
  if (
    (_(() => {
      if (((M = !1), J(Y), !M)) B(null, null)
    }, P),
    O)
  )
    Z = R
}
var B2 = [
  ...` 	
\r\f \v\uFEFF`,
]
function f9(Q, J = !1) {
  var K = J ? " !important;" : ";",
    X = ""
  for (var Z in Q) {
    var W = Q[Z]
    if (W != null && W !== "") X += " " + Z + ": " + W + K
  }
  return X
}
function v7(Q) {
  if (Q[0] !== "-" || Q[1] !== "-") return Q.toLowerCase()
  return Q
}
function u9(Q, J) {
  if (J) {
    var K = "",
      X,
      Z
    if (Array.isArray(J)) (X = J[0]), (Z = J[1])
    else X = J
    if (Q) {
      Q = String(Q)
        .replaceAll(/\s*\/\*.*?\*\/\s*/g, "")
        .trim()
      var W = !1,
        z = 0,
        q = !1,
        P = []
      if (X) P.push(...Object.keys(X).map(v7))
      if (Z) P.push(...Object.keys(Z).map(v7))
      var M = 0,
        Y = -1
      let V = Q.length
      for (var B = 0; B < V; B++) {
        var G = Q[B]
        if (q) {
          if (G === "/" && Q[B - 1] === "*") q = !1
        } else if (W) {
          if (W === G) W = !1
        } else if (G === "/" && Q[B + 1] === "*") q = !0
        else if (G === '"' || G === "'") W = G
        else if (G === "(") z++
        else if (G === ")") z--
        if (!q && W === !1 && z === 0) {
          if (G === ":" && Y === -1) Y = B
          else if (G === ";" || B === V - 1) {
            if (Y !== -1) {
              var H = v7(Q.substring(M, Y).trim())
              if (!P.includes(H)) {
                if (G !== ";") B++
                var F = Q.substring(M, B).trim()
                K += " " + F + ";"
              }
            }
            ;(M = B + 1), (Y = -1)
          }
        }
      }
    }
    if (X) K += f9(X)
    if (Z) K += f9(Z, !0)
    return (K = K.trim()), K === "" ? null : K
  }
  return Q == null ? null : String(Q)
}
function m7(Q, J = {}, K, X) {
  for (var Z in K) {
    var W = K[Z]
    if (J[Z] !== W)
      if (K[Z] == null) Q.style.removeProperty(Z)
      else Q.style.setProperty(Z, W, X)
  }
}
function d9(Q, J, K, X) {
  var Z = Q.__style
  if (O || Z !== J) {
    var W = u9(J, X)
    if (!O || W !== Q.getAttribute("style"))
      if (W == null) Q.removeAttribute("style")
      else Q.style.cssText = W
    Q.__style = J
  } else if (X)
    if (Array.isArray(X)) m7(Q, K?.[0], X[0]), m7(Q, K?.[1], X[1], "important")
    else m7(Q, K, X)
  return X
}
var jJ = Symbol("class"),
  EJ = Symbol("style"),
  o2 = Symbol("is custom element"),
  s2 = Symbol("is html")
class p9 {
  #J = new WeakMap()
  #Q
  #K
  static entries = new WeakMap()
  constructor(Q) {
    this.#K = Q
  }
  observe(Q, J) {
    var K = this.#J.get(Q) || new Set()
    return (
      K.add(J),
      this.#J.set(Q, K),
      this.#X().observe(Q, this.#K),
      () => {
        var X = this.#J.get(Q)
        if ((X.delete(J), X.size === 0)) this.#J.delete(Q), this.#Q.unobserve(Q)
      }
    )
  }
  #X() {
    return (
      this.#Q ??
      (this.#Q = new ResizeObserver((Q) => {
        for (var J of Q) {
          p9.entries.set(J.target, J)
          for (var K of this.#J.get(J.target) || []) K(J)
        }
      }))
    )
  }
}
function kJ(Q = !1) {
  let J = C,
    K = J.l.u
  if (!K) return
  let X = () => r0(J.s)
  if (Q) {
    let Z = 0,
      W = {},
      z = AQ(() => {
        let q = !1,
          P = J.s
        for (let M in P) if (P[M] !== W[M]) (W[M] = P[M]), (q = !0)
        if (q) Z++
        return Z
      })
    X = () => S(z)
  }
  if (K.b.length)
    V0(() => {
      _9(J, X), yQ(K.b)
    })
  if (
    (O0(() => {
      let Z = A(() => K.m.map(e7))
      return () => {
        for (let W of Z) if (typeof W === "function") W()
      }
    }),
    K.a.length)
  )
    O0(() => {
      _9(J, X), yQ(K.a)
    })
}
function _9(Q, J) {
  if (Q.l.s) for (let K of Q.l.s) S(K)
  J()
}
var Q7 = !1,
  IW = Symbol()
function f7(Q) {
  var J = Q7
  try {
    return (Q7 = !1), [Q(), Q7]
  } finally {
    Q7 = J
  }
}
function c9(Q) {
  return Q.ctx?.d ?? !1
}
function T0(Q, J, K, X) {
  var Z = (K & _7) !== 0,
    W = !LQ || (K & c7) !== 0,
    z = (K & i7) !== 0,
    q = (K & o7) !== 0,
    P = !1,
    M
  if (z) [M, P] = f7(() => Q[J])
  else M = Q[J]
  var Y = u in Q || G0 in Q,
    B =
      (z && (JQ(Q, J)?.set ?? (Y && J in Q && ((x) => (Q[J] = x))))) || void 0,
    G = X,
    H = !0,
    F = !1,
    V = () => {
      if (((F = !0), H))
        if (((H = !1), q)) G = A(X)
        else G = X
      return G
    }
  if (M === void 0 && X !== void 0) {
    if (B && W) z9(J)
    if (((M = V()), B)) B(M)
  }
  var N
  if (W)
    N = () => {
      var x = Q[J]
      if (x === void 0) return V()
      return (H = !0), (F = !1), x
    }
  else {
    var o = (Z ? AQ : d0)(() => Q[J])
    ;(o.f |= G7),
      (N = () => {
        var x = S(o)
        if (x !== void 0) G = void 0
        return x === void 0 ? G : x
      })
  }
  if ((K & l7) === 0 && W) return N
  if (B) {
    var jQ = Q.$$legacy
    return function (x, iQ) {
      if (arguments.length > 0) {
        if (!W || !iQ || jQ || P) B(iQ ? N() : x)
        return x
      } else return N()
    }
  }
  var hQ = !1,
    lQ = !1,
    EQ = YQ(M),
    QQ = AQ(() => {
      var x = N(),
        iQ = S(EQ)
      if (hQ) return (hQ = !1), (lQ = !0), iQ
      return (lQ = !1), (EQ.v = x)
    })
  if (z) S(QQ)
  if (!Z) QQ.equals = aQ
  return function (x, iQ) {
    if (U0 !== null) (hQ = lQ), N(), S(EQ)
    if (arguments.length > 0) {
      let J7 = iQ ? S(QQ) : W && z ? NQ(x) : x
      if (!QQ.equals(J7)) {
        if (((hQ = !0), I(EQ, J7), F && G !== void 0)) G = J7
        if (c9(QQ)) return x
        A(() => S(QQ))
      }
      return x
    }
    if (c9(QQ)) return QQ.v
    return S(QQ)
  }
}
function l9(Q) {
  return new i9(Q)
}
class i9 {
  #J
  #Q
  constructor(Q) {
    var J = new Map(),
      K = (Z, W) => {
        var z = YQ(W)
        return J.set(Z, z), z
      }
    let X = new Proxy(
      { ...(Q.props || {}), $$events: {} },
      {
        get(Z, W) {
          return S(J.get(W) ?? K(W, Reflect.get(Z, W)))
        },
        has(Z, W) {
          if (W === G0) return !0
          return S(J.get(W) ?? K(W, Reflect.get(Z, W))), Reflect.has(Z, W)
        },
        set(Z, W, z) {
          return I(J.get(W) ?? K(W, z), z), Reflect.set(Z, W, z)
        },
      }
    )
    if (
      ((this.#Q = (Q.hydrate ? g7 : t0)(Q.component, {
        target: Q.target,
        anchor: Q.anchor,
        props: X,
        context: Q.context,
        intro: Q.intro ?? !1,
        recover: Q.recover,
      })),
      !Q?.props?.$$host || Q.sync === !1)
    )
      I0()
    this.#J = X.$$events
    for (let Z of Object.keys(this.#Q)) {
      if (Z === "$set" || Z === "$destroy" || Z === "$on") continue
      T(this, Z, {
        get() {
          return this.#Q[Z]
        },
        set(W) {
          this.#Q[Z] = W
        },
        enumerable: !0,
      })
    }
    ;(this.#Q.$set = (Z) => {
      Object.assign(X, Z)
    }),
      (this.#Q.$destroy = () => {
        y7(this.#Q)
      })
  }
  $set(Q) {
    this.#Q.$set(Q)
  }
  $on(Q, J) {
    this.#J[Q] = this.#J[Q] || []
    let K = (...X) => J.call(this, ...X)
    return (
      this.#J[Q].push(K),
      () => {
        this.#J[Q] = this.#J[Q].filter((X) => X !== K)
      }
    )
  }
  $destroy() {
    this.#Q.$destroy()
  }
}
var _J
if (typeof HTMLElement === "function")
  _J = class extends HTMLElement {
    $$ctor
    $$s
    $$c
    $$cn = !1
    $$d = {}
    $$r = !1
    $$p_d = {}
    $$l = {}
    $$l_u = new Map()
    $$me
    constructor(Q, J, K) {
      super()
      if (((this.$$ctor = Q), (this.$$s = J), K))
        this.attachShadow({ mode: "open" })
    }
    addEventListener(Q, J, K) {
      if (((this.$$l[Q] = this.$$l[Q] || []), this.$$l[Q].push(J), this.$$c)) {
        let X = this.$$c.$on(Q, J)
        this.$$l_u.set(J, X)
      }
      super.addEventListener(Q, J, K)
    }
    removeEventListener(Q, J, K) {
      if ((super.removeEventListener(Q, J, K), this.$$c)) {
        let X = this.$$l_u.get(J)
        if (X) X(), this.$$l_u.delete(J)
      }
    }
    async connectedCallback() {
      if (((this.$$cn = !0), !this.$$c)) {
        let Q = function (X) {
          return (Z) => {
            let W = document.createElement("slot")
            if (X !== "default") W.name = X
            D0(Z, W)
          }
        }
        if ((await Promise.resolve(), !this.$$cn || this.$$c)) return
        let J = {},
          K = cJ(this)
        for (let X of this.$$s)
          if (X in K)
            if (X === "default" && !this.$$d.children)
              (this.$$d.children = Q(X)), (J.default = !0)
            else J[X] = Q(X)
        for (let X of this.attributes) {
          let Z = this.$$g_p(X.name)
          if (!(Z in this.$$d))
            this.$$d[Z] = u7(Z, X.value, this.$$p_d, "toProp")
        }
        for (let X in this.$$p_d)
          if (!(X in this.$$d) && this[X] !== void 0)
            (this.$$d[X] = this[X]), delete this[X]
        ;(this.$$c = l9({
          component: this.$$ctor,
          target: this.shadowRoot || this,
          props: { ...this.$$d, $$slots: J, $$host: this },
        })),
          (this.$$me = N7(() => {
            m(() => {
              this.$$r = !0
              for (let X of X7(this.$$c)) {
                if (!this.$$p_d[X]?.reflect) continue
                this.$$d[X] = this.$$c[X]
                let Z = u7(X, this.$$d[X], this.$$p_d, "toAttribute")
                if (Z == null)
                  this.removeAttribute(this.$$p_d[X].attribute || X)
                else this.setAttribute(this.$$p_d[X].attribute || X, Z)
              }
              this.$$r = !1
            })
          }))
        for (let X in this.$$l)
          for (let Z of this.$$l[X]) {
            let W = this.$$c.$on(X, Z)
            this.$$l_u.set(Z, W)
          }
        this.$$l = {}
      }
    }
    attributeChangedCallback(Q, J, K) {
      if (this.$$r) return
      ;(Q = this.$$g_p(Q)),
        (this.$$d[Q] = u7(Q, K, this.$$p_d, "toProp")),
        this.$$c?.$set({ [Q]: this.$$d[Q] })
    }
    disconnectedCallback() {
      ;(this.$$cn = !1),
        Promise.resolve().then(() => {
          if (!this.$$cn && this.$$c)
            this.$$c.$destroy(), this.$$me(), (this.$$c = void 0)
        })
    }
    $$g_p(Q) {
      return (
        X7(this.$$p_d).find(
          (J) =>
            this.$$p_d[J].attribute === Q ||
            (!this.$$p_d[J].attribute && J.toLowerCase() === Q)
        ) || Q
      )
    }
  }
function u7(Q, J, K, X) {
  let Z = K[Q]?.type
  if (
    ((J = Z === "Boolean" && typeof J !== "boolean" ? J != null : J),
    !X || !K[Q])
  )
    return J
  else if (X === "toAttribute")
    switch (Z) {
      case "Object":
      case "Array":
        return J == null ? null : JSON.stringify(J)
      case "Boolean":
        return J ? "" : null
      case "Number":
        return J == null ? null : J
      default:
        return J
    }
  else
    switch (Z) {
      case "Object":
      case "Array":
        return J && JSON.parse(J)
      case "Boolean":
        return J
      case "Number":
        return J != null ? +J : J
      default:
        return J
    }
}
function cJ(Q) {
  let J = {}
  return (
    Q.childNodes.forEach((K) => {
      J[K.slot || "default"] = !0
    }),
    J
  )
}
var iJ = x7(
  '<div class="counter-widget svelte-fbbzv9"><h3 class="svelte-fbbzv9"> </h3> <div class="buttons svelte-fbbzv9"><button class="svelte-fbbzv9">-</button> <button class="svelte-fbbzv9">Reset</button> <button class="svelte-fbbzv9">+</button></div></div>'
)
function oJ(Q, J) {
  let K = T0(J, "initial", 8, 0),
    X = T0(J, "step", 8, 1),
    Z = T0(J, "label", 8, "Count"),
    W = YQ(K())
  function z() {
    I(W, S(W) + X())
  }
  function q() {
    I(W, S(W) - X())
  }
  function P() {
    I(W, K())
  }
  var M = iJ(),
    Y = F0(M),
    B = F0(Y)
  Y0(Y)
  var G = L0(Y, 2),
    H = F0(G),
    F = L0(H, 2),
    V = L0(F, 2)
  Y0(G),
    Y0(M),
    i0(() => h7(B, `${Z() ?? ""}: ${S(W) ?? ""}`)),
    w0("click", H, q),
    w0("click", F, P),
    w0("click", V, z),
    D0(Q, M)
}
export { oJ as default }
