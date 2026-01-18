import Oe, { createContext as dr, useReducer as vr, useContext as pr } from "react";
var V = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xe;
function yr() {
  if (xe) return $;
  xe = 1;
  var c = Oe, y = Symbol.for("react.element"), f = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, x = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, T = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(s, d, S) {
    var R, C = {}, O = null, Y = null;
    S !== void 0 && (O = "" + S), d.key !== void 0 && (O = "" + d.key), d.ref !== void 0 && (Y = d.ref);
    for (R in d) h.call(d, R) && !T.hasOwnProperty(R) && (C[R] = d[R]);
    if (s && s.defaultProps) for (R in d = s.defaultProps, d) C[R] === void 0 && (C[R] = d[R]);
    return { $$typeof: y, type: s, key: O, ref: Y, props: C, _owner: x.current };
  }
  return $.Fragment = f, $.jsx = b, $.jsxs = b, $;
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
var Te;
function hr() {
  return Te || (Te = 1, process.env.NODE_ENV !== "production" && (function() {
    var c = Oe, y = Symbol.for("react.element"), f = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), s = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Z = Symbol.iterator, Pe = "@@iterator";
    function Se(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Z && e[Z] || e[Pe];
      return typeof r == "function" ? r : null;
    }
    var k = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(e) {
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
    var De = !1, Ae = !1, Fe = !1, Ie = !1, $e = !1, Q;
    Q = Symbol.for("react.module.reference");
    function Me(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === T || $e || e === x || e === S || e === R || Ie || e === Y || De || Ae || Fe || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === C || e.$$typeof === b || e.$$typeof === s || e.$$typeof === d || // This needs to include all possible module reference object
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
    function j(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case f:
          return "Portal";
        case T:
          return "Profiler";
        case x:
          return "StrictMode";
        case S:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case s:
            var r = e;
            return ee(r) + ".Consumer";
          case b:
            var t = e;
            return ee(t._context) + ".Provider";
          case d:
            return Ye(e, e.render, "ForwardRef");
          case C:
            var n = e.displayName || null;
            return n !== null ? n : j(e.type) || "Memo";
          case O: {
            var o = e, u = o._payload, i = o._init;
            try {
              return j(i(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var w = Object.assign, F = 0, re, te, ne, ae, ie, oe, se;
    function ue() {
    }
    ue.__reactDisabledLog = !0;
    function We() {
      {
        if (F === 0) {
          re = console.log, te = console.info, ne = console.warn, ae = console.error, ie = console.group, oe = console.groupCollapsed, se = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ue,
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
        F++;
      }
    }
    function qe() {
      {
        if (F--, F === 0) {
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
              value: se
            })
          });
        }
        F < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
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
      var Ne = typeof WeakMap == "function" ? WeakMap : Map;
      q = new Ne();
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
            } catch (g) {
              n = g;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (g) {
              n = g;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (g) {
            n = g;
          }
          e();
        }
      } catch (g) {
        if (g && n && typeof g.stack == "string") {
          for (var a = g.stack.split(`
`), E = n.stack.split(`
`), l = a.length - 1, v = E.length - 1; l >= 1 && v >= 0 && a[l] !== E[v]; )
            v--;
          for (; l >= 1 && v >= 0; l--, v--)
            if (a[l] !== E[v]) {
              if (l !== 1 || v !== 1)
                do
                  if (l--, v--, v < 0 || a[l] !== E[v]) {
                    var _ = `
` + a[l].replace(" at new ", " at ");
                    return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), typeof e == "function" && q.set(e, _), _;
                  }
                while (l >= 1 && v >= 0);
              break;
            }
        }
      } finally {
        B = !1, U.current = u, qe(), Error.prepareStackTrace = o;
      }
      var A = e ? e.displayName || e.name : "", P = A ? W(A) : "";
      return typeof e == "function" && q.set(e, P), P;
    }
    function Le(e, r, t) {
      return le(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function N(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return le(e, Ve(e));
      if (typeof e == "string")
        return W(e);
      switch (e) {
        case S:
          return W("Suspense");
        case R:
          return W("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Le(e.render);
          case C:
            return N(e.type, r, t);
          case O: {
            var n = e, o = n._payload, u = n._init;
            try {
              return N(u(o), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var I = Object.prototype.hasOwnProperty, ce = {}, fe = k.ReactDebugCurrentFrame;
    function L(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        fe.setExtraStackFrame(t);
      } else
        fe.setExtraStackFrame(null);
    }
    function Ue(e, r, t, n, o) {
      {
        var u = Function.call.bind(I);
        for (var i in e)
          if (u(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var E = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (l) {
              a = l;
            }
            a && !(a instanceof Error) && (L(o), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), L(null)), a instanceof Error && !(a.message in ce) && (ce[a.message] = !0, L(o), m("Failed %s type: %s", t, a.message), L(null));
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
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), de(e);
    }
    var pe = k.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ye, he;
    function ze(e) {
      if (I.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (I.call(e, "key")) {
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
          ye || (ye = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
          he || (he = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
        $$typeof: y,
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
        var u, i = {}, a = null, E = null;
        t !== void 0 && (ve(t), a = "" + t), Xe(r) && (ve(r.key), a = "" + r.key), ze(r) && (E = r.ref, He(r, o));
        for (u in r)
          I.call(r, u) && !Ge.hasOwnProperty(u) && (i[u] = r[u]);
        if (e && e.defaultProps) {
          var l = e.defaultProps;
          for (u in l)
            i[u] === void 0 && (i[u] = l[u]);
        }
        if (a || E) {
          var v = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Ze(i, v), E && Qe(i, v);
        }
        return er(e, a, E, o, n, pe.current, i);
      }
    }
    var G = k.ReactCurrentOwner, me = k.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        me.setExtraStackFrame(t);
      } else
        me.setExtraStackFrame(null);
    }
    var z;
    z = !1;
    function X(e) {
      return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    function Ee() {
      {
        if (G.current) {
          var e = j(G.current.type);
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
    var ge = {};
    function nr(e) {
      {
        var r = Ee();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Re(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (ge[t])
          return;
        ge[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + j(e._owner.type) + "."), D(e), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), D(null);
      }
    }
    function _e(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            X(n) && Re(n, r);
          }
        else if (X(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var o = Se(e);
          if (typeof o == "function" && o !== e.entries)
            for (var u = o.call(e), i; !(i = u.next()).done; )
              X(i.value) && Re(i.value, r);
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
        else if (typeof r == "object" && (r.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = j(r);
          Ue(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !z) {
          z = !0;
          var o = j(r);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            D(e), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), D(null);
            break;
          }
        }
        e.ref !== null && (D(e), m("Invalid attribute `ref` supplied to `React.Fragment`."), D(null));
      }
    }
    var be = {};
    function Ce(e, r, t, n, o, u) {
      {
        var i = Me(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = tr();
          E ? a += E : a += Ee();
          var l;
          e === null ? l = "null" : K(e) ? l = "array" : e !== void 0 && e.$$typeof === y ? (l = "<" + (j(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : l = typeof e, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", l, a);
        }
        var v = rr(e, r, t, o, u);
        if (v == null)
          return v;
        if (i) {
          var _ = r.children;
          if (_ !== void 0)
            if (n)
              if (K(_)) {
                for (var A = 0; A < _.length; A++)
                  _e(_[A], e);
                Object.freeze && Object.freeze(_);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _e(_, e);
        }
        if (I.call(r, "key")) {
          var P = j(e), g = Object.keys(r).filter(function(fr) {
            return fr !== "key";
          }), H = g.length > 0 ? "{key: someKey, " + g.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!be[P + H]) {
            var cr = g.length > 0 ? "{" + g.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, H, P, cr, P), be[P + H] = !0;
          }
        }
        return e === h ? ir(v) : ar(v), v;
      }
    }
    function or(e, r, t) {
      return Ce(e, r, t, !0);
    }
    function sr(e, r, t) {
      return Ce(e, r, t, !1);
    }
    var ur = sr, lr = or;
    M.Fragment = h, M.jsx = ur, M.jsxs = lr;
  })()), M;
}
var je;
function mr() {
  return je || (je = 1, process.env.NODE_ENV === "production" ? V.exports = yr() : V.exports = hr()), V.exports;
}
var p = mr();
const we = dr(void 0);
function Er(c, y) {
  switch (y.type) {
    case "ADD_ITEM":
      return c.items.find((h) => h.id === y.payload.id) ? {
        items: c.items.map(
          (h) => h.id === y.payload.id ? { ...h, quantity: h.quantity + y.payload.quantity } : h
        )
      } : { items: [...c.items, y.payload] };
    case "REMOVE_ITEM":
      return { items: c.items.filter((f) => f.id !== y.payload) };
    case "DECREASE_ITEM":
      return {
        items: c.items.map((f) => f.id === y.payload ? { ...f, quantity: f.quantity - 1 } : f).filter((f) => f.quantity > 0)
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return c;
  }
}
const br = ({ children: c }) => {
  const [y, f] = vr(Er, { items: [] }), h = (s) => f({ type: "ADD_ITEM", payload: s }), x = (s) => f({ type: "REMOVE_ITEM", payload: s }), T = (s) => f({ type: "DECREASE_ITEM", payload: s }), b = () => f({ type: "CLEAR_CART" });
  return /* @__PURE__ */ p.jsx(
    we.Provider,
    {
      value: { cart: y.items, addItem: h, removeItem: x, decreaseItem: T, clearCart: b },
      children: c
    }
  );
}, gr = () => {
  const c = pr(we);
  if (!c) throw new Error("useCartContext must be used inside a CartProvider");
  return c;
}, Rr = () => gr(), Cr = () => {
  const { cart: c, removeItem: y, decreaseItem: f, addItem: h, clearCart: x } = Rr(), T = c.reduce((s, d) => s + d.quantity, 0), b = c.reduce((s, d) => s + d.price * d.quantity, 0);
  return /* @__PURE__ */ p.jsxs("aside", { className: "cart-drawer", children: [
    /* @__PURE__ */ p.jsxs("h3", { children: [
      "Your Cart (",
      T,
      ")"
    ] }),
    /* @__PURE__ */ p.jsx("ul", { children: c.map((s) => /* @__PURE__ */ p.jsxs("li", { children: [
      /* @__PURE__ */ p.jsx("img", { src: s.image, alt: s.name, width: 40, height: 40 }),
      /* @__PURE__ */ p.jsxs("div", { className: "item-details", children: [
        /* @__PURE__ */ p.jsx("span", { className: "item-name", children: s.name }),
        /* @__PURE__ */ p.jsxs("span", { className: "item-price", children: [
          "$",
          s.price.toFixed(2),
          " each"
        ] }),
        /* @__PURE__ */ p.jsxs("span", { className: "item-subtotal", children: [
          "$",
          (s.price * s.quantity).toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "qty-controls", children: [
        /* @__PURE__ */ p.jsx("button", { onClick: () => f(s.id), children: "-" }),
        /* @__PURE__ */ p.jsx("span", { children: s.quantity }),
        /* @__PURE__ */ p.jsx("button", { onClick: () => h({ ...s, quantity: 1 }), children: "+" })
      ] }),
      /* @__PURE__ */ p.jsx("button", { onClick: () => y(s.id), children: "×" })
    ] }, s.id)) }),
    c.length > 0 && /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsx("div", { className: "cart-total", children: /* @__PURE__ */ p.jsxs("strong", { children: [
        "Total: $",
        b.toFixed(2)
      ] }) }),
      /* @__PURE__ */ p.jsx("button", { onClick: x, className: "clear-btn", children: "Clear Cart" })
    ] })
  ] });
};
export {
  Cr as CartDrawer,
  br as CartProvider,
  Rr as useCart,
  gr as useCartContext
};
