import je, { createContext as dr, useReducer as vr, useContext as pr } from "react";
var N = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Te;
function yr() {
  if (Te) return $;
  Te = 1;
  var f = je, v = Symbol.for("react.element"), l = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, T = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, x = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(y, E, S) {
    var g, C = {}, j = null, Y = null;
    S !== void 0 && (j = "" + S), E.key !== void 0 && (j = "" + E.key), E.ref !== void 0 && (Y = E.ref);
    for (g in E) p.call(E, g) && !x.hasOwnProperty(g) && (C[g] = E[g]);
    if (y && y.defaultProps) for (g in E = y.defaultProps, E) C[g] === void 0 && (C[g] = E[g]);
    return { $$typeof: v, type: y, key: j, ref: Y, props: C, _owner: T.current };
  }
  return $.Fragment = l, $.jsx = d, $.jsxs = d, $;
}
var M = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xe;
function Er() {
  return xe || (xe = 1, process.env.NODE_ENV !== "production" && (function() {
    var f = je, v = Symbol.for("react.element"), l = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), y = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Z = Symbol.iterator, Pe = "@@iterator";
    function Se(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Z && e[Z] || e[Pe];
      return typeof r == "function" ? r : null;
    }
    var k = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ke("error", e, t);
      }
    }
    function ke(e, r, t) {
      {
        var n = k.ReactDebugCurrentFrame, o = n.getStackAddendum();
        o !== "" && (r += "%s", t = t.concat([o]));
        var u = t.map(function(i) {
          return String(i);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var De = !1, Ae = !1, Ie = !1, Fe = !1, $e = !1, Q;
    Q = Symbol.for("react.module.reference");
    function Me(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === p || e === x || $e || e === T || e === S || e === g || Fe || e === Y || De || Ae || Ie || typeof e == "object" && e !== null && (e.$$typeof === j || e.$$typeof === C || e.$$typeof === d || e.$$typeof === y || e.$$typeof === E || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Q || e.getModuleId !== void 0));
    }
    function Ye(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var o = r.displayName || r.name || "";
      return o !== "" ? t + "(" + o + ")" : t;
    }
    function ee(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case p:
          return "Fragment";
        case l:
          return "Portal";
        case x:
          return "Profiler";
        case T:
          return "StrictMode";
        case S:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var r = e;
            return ee(r) + ".Consumer";
          case d:
            var t = e;
            return ee(t._context) + ".Provider";
          case E:
            return Ye(e, e.render, "ForwardRef");
          case C:
            var n = e.displayName || null;
            return n !== null ? n : O(e.type) || "Memo";
          case j: {
            var o = e, u = o._payload, i = o._init;
            try {
              return O(i(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var w = Object.assign, I = 0, re, te, ne, ae, ie, oe, ue;
    function se() {
    }
    se.__reactDisabledLog = !0;
    function We() {
      {
        if (I === 0) {
          re = console.log, te = console.info, ne = console.warn, ae = console.error, ie = console.group, oe = console.groupCollapsed, ue = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: se,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        I++;
      }
    }
    function qe() {
      {
        if (I--, I === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: w({}, e, {
              value: re
            }),
            info: w({}, e, {
              value: te
            }),
            warn: w({}, e, {
              value: ne
            }),
            error: w({}, e, {
              value: ae
            }),
            group: w({}, e, {
              value: ie
            }),
            groupCollapsed: w({}, e, {
              value: oe
            }),
            groupEnd: w({}, e, {
              value: ue
            })
          });
        }
        I < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var U = k.ReactCurrentDispatcher, J;
    function W(e, r, t) {
      {
        if (J === void 0)
          try {
            throw Error();
          } catch (o) {
            var n = o.stack.trim().match(/\n( *(at )?)/);
            J = n && n[1] || "";
          }
        return `
` + J + e;
      }
    }
    var B = !1, q;
    {
      var Le = typeof WeakMap == "function" ? WeakMap : Map;
      q = new Le();
    }
    function le(e, r) {
      if (!e || B)
        return "";
      {
        var t = q.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      B = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = U.current, U.current = null, We();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (R) {
              n = R;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (R) {
              n = R;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (R) {
            n = R;
          }
          e();
        }
      } catch (R) {
        if (R && n && typeof R.stack == "string") {
          for (var a = R.stack.split(`
`), m = n.stack.split(`
`), s = a.length - 1, c = m.length - 1; s >= 1 && c >= 0 && a[s] !== m[c]; )
            c--;
          for (; s >= 1 && c >= 0; s--, c--)
            if (a[s] !== m[c]) {
              if (s !== 1 || c !== 1)
                do
                  if (s--, c--, c < 0 || a[s] !== m[c]) {
                    var b = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && q.set(e, b), b;
                  }
                while (s >= 1 && c >= 0);
              break;
            }
        }
      } finally {
        B = !1, U.current = u, qe(), Error.prepareStackTrace = o;
      }
      var A = e ? e.displayName || e.name : "", P = A ? W(A) : "";
      return typeof e == "function" && q.set(e, P), P;
    }
    function Ve(e, r, t) {
      return le(e, !1);
    }
    function Ne(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function L(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return le(e, Ne(e));
      if (typeof e == "string")
        return W(e);
      switch (e) {
        case S:
          return W("Suspense");
        case g:
          return W("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            return Ve(e.render);
          case C:
            return L(e.type, r, t);
          case j: {
            var n = e, o = n._payload, u = n._init;
            try {
              return L(u(o), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var F = Object.prototype.hasOwnProperty, ce = {}, fe = k.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        fe.setExtraStackFrame(t);
      } else
        fe.setExtraStackFrame(null);
    }
    function Ue(e, r, t, n, o) {
      {
        var u = Function.call.bind(F);
        for (var i in e)
          if (u(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var m = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw m.name = "Invariant Violation", m;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (V(o), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), V(null)), a instanceof Error && !(a.message in ce) && (ce[a.message] = !0, V(o), h("Failed %s type: %s", t, a.message), V(null));
          }
      }
    }
    var Je = Array.isArray;
    function K(e) {
      return Je(e);
    }
    function Be(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ke(e) {
      try {
        return de(e), !1;
      } catch {
        return !0;
      }
    }
    function de(e) {
      return "" + e;
    }
    function ve(e) {
      if (Ke(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), de(e);
    }
    var pe = k.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ye, Ee;
    function ze(e) {
      if (F.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (F.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function He(e, r) {
      typeof e.ref == "string" && pe.current;
    }
    function Ze(e, r) {
      {
        var t = function() {
          ye || (ye = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          Ee || (Ee = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var er = function(e, r, t, n, o, u, i) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: v,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function rr(e, r, t, n, o) {
      {
        var u, i = {}, a = null, m = null;
        t !== void 0 && (ve(t), a = "" + t), Xe(r) && (ve(r.key), a = "" + r.key), ze(r) && (m = r.ref, He(r, o));
        for (u in r)
          F.call(r, u) && !Ge.hasOwnProperty(u) && (i[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            i[u] === void 0 && (i[u] = s[u]);
        }
        if (a || m) {
          var c = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Ze(i, c), m && Qe(i, c);
        }
        return er(e, a, m, o, n, pe.current, i);
      }
    }
    var G = k.ReactCurrentOwner, he = k.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        he.setExtraStackFrame(t);
      } else
        he.setExtraStackFrame(null);
    }
    var z;
    z = !1;
    function X(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    function me() {
      {
        if (G.current) {
          var e = O(G.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      return "";
    }
    var Re = {};
    function nr(e) {
      {
        var r = me();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function ge(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (Re[t])
          return;
        Re[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + O(e._owner.type) + "."), D(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), D(null);
      }
    }
    function _e(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            X(n) && ge(n, r);
          }
        else if (X(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var o = Se(e);
          if (typeof o == "function" && o !== e.entries)
            for (var u = o.call(e), i; !(i = u.next()).done; )
              X(i.value) && ge(i.value, r);
        }
      }
    }
    function ar(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === E || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = O(r);
          Ue(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !z) {
          z = !0;
          var o = O(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            D(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), D(null);
            break;
          }
        }
        e.ref !== null && (D(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), D(null));
      }
    }
    var be = {};
    function Ce(e, r, t, n, o, u) {
      {
        var i = Me(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var m = tr();
          m ? a += m : a += me();
          var s;
          e === null ? s = "null" : K(e) ? s = "array" : e !== void 0 && e.$$typeof === v ? (s = "<" + (O(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var c = rr(e, r, t, o, u);
        if (c == null)
          return c;
        if (i) {
          var b = r.children;
          if (b !== void 0)
            if (n)
              if (K(b)) {
                for (var A = 0; A < b.length; A++)
                  _e(b[A], e);
                Object.freeze && Object.freeze(b);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _e(b, e);
        }
        if (F.call(r, "key")) {
          var P = O(e), R = Object.keys(r).filter(function(fr) {
            return fr !== "key";
          }), H = R.length > 0 ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!be[P + H]) {
            var cr = R.length > 0 ? "{" + R.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, H, P, cr, P), be[P + H] = !0;
          }
        }
        return e === p ? ir(c) : ar(c), c;
      }
    }
    function or(e, r, t) {
      return Ce(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Ce(e, r, t, !1);
    }
    var sr = ur, lr = or;
    M.Fragment = p, M.jsx = sr, M.jsxs = lr;
  })()), M;
}
var Oe;
function hr() {
  return Oe || (Oe = 1, process.env.NODE_ENV === "production" ? N.exports = yr() : N.exports = Er()), N.exports;
}
var _ = hr();
const we = dr(void 0);
function mr(f, v) {
  switch (v.type) {
    case "ADD_ITEM":
      return f.items.find((p) => p.id === v.payload.id) ? {
        items: f.items.map(
          (p) => p.id === v.payload.id ? { ...p, quantity: p.quantity + v.payload.quantity } : p
        )
      } : { items: [...f.items, v.payload] };
    case "REMOVE_ITEM":
      return { items: f.items.filter((l) => l.id !== v.payload) };
    case "DECREASE_ITEM":
      return {
        items: f.items.map((l) => l.id === v.payload ? { ...l, quantity: l.quantity - 1 } : l).filter((l) => l.quantity > 0)
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return f;
  }
}
const br = ({ children: f }) => {
  const [v, l] = vr(mr, { items: [] }), p = (y) => l({ type: "ADD_ITEM", payload: y }), T = (y) => l({ type: "REMOVE_ITEM", payload: y }), x = (y) => l({ type: "DECREASE_ITEM", payload: y }), d = () => l({ type: "CLEAR_CART" });
  return /* @__PURE__ */ _.jsx(
    we.Provider,
    {
      value: { cart: v.items, addItem: p, removeItem: T, decreaseItem: x, clearCart: d },
      children: f
    }
  );
}, Rr = () => {
  const f = pr(we);
  if (!f) throw new Error("useCartContext must be used inside a CartProvider");
  return f;
}, gr = () => Rr(), Cr = () => {
  const { cart: f, removeItem: v, decreaseItem: l, addItem: p, clearCart: T } = gr(), x = f.reduce((d, y) => d + y.quantity, 0);
  return /* @__PURE__ */ _.jsxs("aside", { className: "cart-drawer", children: [
    /* @__PURE__ */ _.jsxs("h3", { children: [
      "Your Cart (",
      x,
      ")"
    ] }),
    /* @__PURE__ */ _.jsx("ul", { children: f.map((d) => /* @__PURE__ */ _.jsxs("li", { children: [
      /* @__PURE__ */ _.jsx("img", { src: d.image, alt: d.name, width: 40, height: 40 }),
      /* @__PURE__ */ _.jsx("span", { children: d.name }),
      /* @__PURE__ */ _.jsxs("div", { className: "qty-controls", children: [
        /* @__PURE__ */ _.jsx("button", { onClick: () => l(d.id), children: "-" }),
        /* @__PURE__ */ _.jsx("span", { children: d.quantity }),
        /* @__PURE__ */ _.jsx("button", { onClick: () => p({ ...d, quantity: 1 }), children: "+" })
      ] }),
      /* @__PURE__ */ _.jsx("button", { onClick: () => v(d.id), children: "×" })
    ] }, d.id)) }),
    f.length > 0 && /* @__PURE__ */ _.jsx("button", { onClick: T, className: "clear-btn", children: "Clear Cart" })
  ] });
};
export {
  Cr as CartDrawer,
  br as CartProvider,
  gr as useCart,
  Rr as useCartContext
};
