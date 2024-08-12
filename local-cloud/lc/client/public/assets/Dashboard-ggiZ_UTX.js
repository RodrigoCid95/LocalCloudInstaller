import { f as RESET_HASH_PREFIX, m as murmur2, i as insertionFactory, u as useTextDirection, a as useRenderer, b as insertionFactory$1, c as reactExports, n as nativeFocus, K as KEYBORG_FOCUSIN, g as KEYBORG_FOCUSOUT, h as createKeyborg, k as disposeKeyborg, l as useFluent, o as useIsomorphicLayoutEffect, F as FOCUS_WITHIN_ATTR, p as useId, q as useMergedRefs, s as SLOT_RENDER_FUNCTION_SYMBOL, t as SLOT_ELEMENT_TYPE_SYMBOL, v as isHTMLElement$1, _ as __styles, w as useFocusVisible, x as useThemeClassName, d as mergeClasses, y as React, z as reactDomExports, A as jsx, B as always, C as getIntrinsicElementProps, e as useCustomStyleHook, D as __resetStyles, E as jsxs, G as optional, j as jsxRuntimeExports, S as Spinner } from "../app.js";
import { s as serialize, v as compile, w as middleware, x as globalPlugin, y as prefixerPlugin, z as stringify, A as isAtRuleElement, c as convertProperty, C as hyphenateProperty, b as compileKeyframeRule, d as convert, e as compileKeyframesCSS, i as isObject, f as isNestedSelector, D as normalizePseudoSelector, g as isMediaQuerySelector, h as isLayerSelector, j as isSupportQuerySelector, k as isContainerQuerySelector, m as useEventCallback, l as createFluentIcon, t as tokens, u as useControllableState, E as useARIAButtonProps, G as Escape, q as useButtonStyles_unstable, p as useButton_unstable, r as renderButton_unstable, H as Enter, o as mergeCallbacks, F as Field, I as Input, B as Button } from "./Input-CYceLVOy.js";
import { u as useText_unstable, a as useTextStyles_unstable, r as renderText_unstable, c as createPreset } from "./createPreset-BDkj3AUF.js";
function rulesheetPlugin(callback) {
  return function(element) {
    if (!element.root) {
      if (element.return) {
        callback(element, element.return);
      }
    }
  };
}
function compileResetCSSRules(cssRules) {
  const rules = [];
  const atRules = [];
  serialize(compile(cssRules), middleware([
    globalPlugin,
    prefixerPlugin,
    stringify,
    // 💡 we are using `.insertRule()` API for DOM operations, which does not support
    // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
    // individual rules to be used with this API
    rulesheetPlugin((element, rule) => {
      if (isAtRuleElement(element)) {
        atRules.push(rule);
        return;
      }
      rules.push(rule);
    })
  ]));
  return [rules, atRules];
}
function createStringFromStyles(styles) {
  let ltrCSS = "";
  let rtlCSS = "";
  for (const property in styles) {
    const value = styles[property];
    if (value == null) {
      continue;
    }
    if (typeof value === "string" || typeof value === "number") {
      const {
        key: rtlProperty,
        value: rtlValue
      } = convertProperty(property, value);
      ltrCSS += `${hyphenateProperty(property)}:${value};`;
      rtlCSS += `${hyphenateProperty(rtlProperty)}:${rtlValue};`;
      continue;
    }
    if (property === "animationName" && typeof value === "object") {
      const values = Array.isArray(value) ? value : [value];
      const ltrAnimationNames = [];
      const rtlAnimationNames = [];
      for (const keyframeObject of values) {
        const ltrKeyframeRule = compileKeyframeRule(keyframeObject);
        const rtlKeyframeRule = compileKeyframeRule(convert(keyframeObject));
        const ltrAnimationName = RESET_HASH_PREFIX + murmur2(ltrKeyframeRule);
        const rtlAnimationName = RESET_HASH_PREFIX + murmur2(rtlKeyframeRule);
        ltrAnimationNames.push(ltrAnimationName);
        rtlAnimationNames.push(rtlAnimationName);
        ltrCSS += compileKeyframesCSS(ltrAnimationName, ltrKeyframeRule).join("");
        if (ltrAnimationName !== rtlAnimationName) {
          rtlCSS += compileKeyframesCSS(rtlAnimationName, rtlKeyframeRule).join("");
        }
      }
      ltrCSS += `animation-name:${ltrAnimationNames.join(",")};`;
      rtlCSS += `animation-name:${rtlAnimationNames.join(",")};`;
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      const rtlDefinitions = value.map((v2) => convertProperty(property, v2));
      const rtlPropertyConsistent = !rtlDefinitions.some((v2) => v2.key !== rtlDefinitions[0].key);
      if (!rtlPropertyConsistent) {
        continue;
      }
      const rtlProperty = rtlDefinitions[0].key;
      ltrCSS += value.map((v2) => `${hyphenateProperty(property)}:${v2};`).join("");
      rtlCSS += rtlDefinitions.map((definition) => `${hyphenateProperty(rtlProperty)}:${definition.value};`).join("");
      continue;
    }
    if (isObject(value)) {
      if (isNestedSelector(property)) {
        const nestedSelector = normalizePseudoSelector(property);
        const [ltrNested, rtlNested] = createStringFromStyles(value);
        ltrCSS += `${nestedSelector}{${ltrNested}}`;
        rtlCSS += `${nestedSelector}{${rtlNested}}`;
        continue;
      }
      if (isMediaQuerySelector(property) || isLayerSelector(property) || isSupportQuerySelector(property) || isContainerQuerySelector(property)) {
        const [ltrNested, rtlNested] = createStringFromStyles(value);
        ltrCSS += `${property}{${ltrNested}}`;
        rtlCSS += `${property}{${rtlNested}}`;
        continue;
      }
    }
  }
  return [ltrCSS, rtlCSS];
}
function resolveResetStyleRules(styles, classNameHashSalt = "") {
  const [ltrRule, rtlRule] = createStringFromStyles(styles);
  const ltrClassName = RESET_HASH_PREFIX + murmur2(classNameHashSalt + ltrRule);
  const [ltrCSS, ltrCSSAtRules] = compileResetCSSRules(`.${ltrClassName}{${ltrRule}}`);
  const hasAtRules = ltrCSSAtRules.length > 0;
  if (ltrRule === rtlRule) {
    return [ltrClassName, null, hasAtRules ? {
      r: ltrCSS,
      s: ltrCSSAtRules
    } : ltrCSS];
  }
  const rtlClassName = RESET_HASH_PREFIX + murmur2(classNameHashSalt + rtlRule);
  const [rtlCSS, rtlCSSAtRules] = compileResetCSSRules(`.${rtlClassName}{${rtlRule}}`);
  return [ltrClassName, rtlClassName, hasAtRules ? {
    r: ltrCSS.concat(rtlCSS),
    s: ltrCSSAtRules.concat(rtlCSSAtRules)
  } : ltrCSS.concat(rtlCSS)];
}
function makeResetStyles$1(styles, factory = insertionFactory) {
  const insertStyles = factory();
  let ltrClassName = null;
  let rtlClassName = null;
  let cssRules = null;
  function computeClassName(options) {
    const {
      dir,
      renderer
    } = options;
    if (ltrClassName === null) {
      [ltrClassName, rtlClassName, cssRules] = resolveResetStyleRules(styles, renderer.classNameHashSalt);
    }
    insertStyles(renderer, Array.isArray(cssRules) ? {
      r: cssRules
    } : cssRules);
    const className = dir === "ltr" ? ltrClassName : rtlClassName || ltrClassName;
    return className;
  }
  return computeClassName;
}
function makeResetStyles(styles) {
  const getStyles = makeResetStyles$1(styles, insertionFactory$1);
  return function useClassName() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}
function isResolvedShorthand(shorthand) {
  return shorthand !== null && typeof shorthand === "object" && !Array.isArray(shorthand) && !reactExports.isValidElement(shorthand);
}
const PortalMountNodeContext = reactExports.createContext(void 0);
PortalMountNodeContext.Provider;
function usePortalMountNode$1() {
  return reactExports.useContext(PortalMountNodeContext);
}
function useFirstMount() {
  const isFirst = reactExports.useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
}
function useForceUpdate() {
  return reactExports.useReducer((x) => x + 1, 0)[1];
}
function isFluentTrigger(element) {
  return Boolean(element.type.isFluentTriggerComponent);
}
function applyTriggerPropsToChildren(children, triggerChildProps) {
  if (typeof children === "function") {
    return children(triggerChildProps);
  } else if (children) {
    return cloneTriggerTree(children, triggerChildProps);
  }
  return children || null;
}
function cloneTriggerTree(child, triggerProps) {
  if (!reactExports.isValidElement(child) || child.type === reactExports.Fragment) {
    throw new Error("A trigger element must be a single element for this component. Please ensure that you're not using React Fragments.");
  }
  if (isFluentTrigger(child)) {
    const grandchild = cloneTriggerTree(child.props.children, triggerProps);
    return reactExports.cloneElement(child, void 0, grandchild);
  } else {
    return reactExports.cloneElement(child, triggerProps);
  }
}
function getTriggerChild(children) {
  if (!reactExports.isValidElement(children)) {
    return null;
  }
  return isFluentTrigger(children) ? getTriggerChild(
    // FIXME: This casting should be unnecessary as isFluentTrigger is a guard type method,
    // but for some reason it's failing on build
    children.props.children
  ) : children;
}
function isVirtualElement(element) {
  return element && !!element._virtual;
}
function getVirtualParent(child) {
  return isVirtualElement(child) ? child._virtual.parent || null : null;
}
function getParent(child, options = {}) {
  if (!child) {
    return null;
  }
  if (!options.skipVirtual) {
    const virtualParent = getVirtualParent(child);
    if (virtualParent) {
      return virtualParent;
    }
  }
  const parent = child.parentNode;
  if (parent && parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return parent.host;
  }
  return parent;
}
function setVirtualParent(child, parent) {
  if (!child) {
    return;
  }
  const virtualChild = child;
  if (!virtualChild._virtual) {
    virtualChild._virtual = {};
  }
  virtualChild._virtual.parent = parent;
}
var reactIs = { exports: {} };
var reactIs_production_min = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g = 60109, h = 60110, k = 60112, l = 60113, m = 60120, n = 60115, p = 60116, q = 60121, r = 60122, u = 60117, v = 60129, w = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}
function y(a) {
  if ("object" === typeof a && null !== a) {
    var t = a.$$typeof;
    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;
              default:
                return t;
            }
        }
      case c:
        return t;
    }
  }
}
var z = g, A = b, B = k, C = d, D = p, E = n, F = c, G = f, H = e, I = l;
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = z;
reactIs_production_min.Element = A;
reactIs_production_min.ForwardRef = B;
reactIs_production_min.Fragment = C;
reactIs_production_min.Lazy = D;
reactIs_production_min.Memo = E;
reactIs_production_min.Portal = F;
reactIs_production_min.Profiler = G;
reactIs_production_min.StrictMode = H;
reactIs_production_min.Suspense = I;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a) {
  return y(a) === h;
};
reactIs_production_min.isContextProvider = function(a) {
  return y(a) === g;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function(a) {
  return y(a) === k;
};
reactIs_production_min.isFragment = function(a) {
  return y(a) === d;
};
reactIs_production_min.isLazy = function(a) {
  return y(a) === p;
};
reactIs_production_min.isMemo = function(a) {
  return y(a) === n;
};
reactIs_production_min.isPortal = function(a) {
  return y(a) === c;
};
reactIs_production_min.isProfiler = function(a) {
  return y(a) === f;
};
reactIs_production_min.isStrictMode = function(a) {
  return y(a) === e;
};
reactIs_production_min.isSuspense = function(a) {
  return y(a) === l;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e || a === l || a === m || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? true : false;
};
reactIs_production_min.typeOf = y;
{
  reactIs.exports = reactIs_production_min;
}
var reactIsExports = reactIs.exports;
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const TABSTER_ATTRIBUTE_NAME = "data-tabster";
const TABSTER_DUMMY_INPUT_ATTRIBUTE_NAME = "data-tabster-dummy";
const FOCUSABLE_SELECTOR = /* @__PURE__ */ ["a[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "*[tabindex]", "*[contenteditable]", "details > summary", "audio[controls]", "video[controls]"].join(", ");
const AsyncFocusSources = {
  EscapeGroupper: 1,
  Restorer: 2,
  Deloser: 3
};
const Visibilities = {
  Invisible: 0,
  PartiallyVisible: 1,
  Visible: 2
};
const RestorerTypes = {
  Source: 0,
  Target: 1
};
const MoverDirections = {
  Both: 0,
  Vertical: 1,
  Horizontal: 2,
  Grid: 3,
  GridLinear: 4
  // Two-dimentional movement depending on the visual placement. Allows linear movement.
};
const MoverKeys = {
  ArrowUp: 1,
  ArrowDown: 2,
  ArrowLeft: 3,
  ArrowRight: 4,
  PageUp: 5,
  PageDown: 6,
  Home: 7,
  End: 8
};
const GroupperTabbabilities = {
  Unlimited: 0,
  Limited: 1,
  LimitedTrapFocus: 2
  // The focus is limited as above, plus trapped when inside.
};
const GroupperMoveFocusActions = {
  Enter: 1,
  Escape: 2
};
const SysDummyInputsPositions = {
  Auto: 0,
  Inside: 1,
  Outside: 2
  // Tabster will always place dummy inputs outside of the container.
};
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function getTabsterOnElement(tabster, element) {
  var _a;
  return (_a = tabster.storageEntry(element)) === null || _a === void 0 ? void 0 : _a.tabster;
}
function updateTabsterByAttribute(tabster, element, dispose) {
  var _a, _b;
  const newAttrValue = dispose || tabster._noop ? void 0 : element.getAttribute(TABSTER_ATTRIBUTE_NAME);
  let entry = tabster.storageEntry(element);
  let newAttr;
  if (newAttrValue) {
    if (newAttrValue !== ((_a = entry === null || entry === void 0 ? void 0 : entry.attr) === null || _a === void 0 ? void 0 : _a.string)) {
      try {
        const newValue = JSON.parse(newAttrValue);
        if (typeof newValue !== "object") {
          throw new Error(`Value is not a JSON object, got '${newAttrValue}'.`);
        }
        newAttr = {
          string: newAttrValue,
          object: newValue
        };
      } catch (e2) {
      }
    } else {
      return;
    }
  } else if (!entry) {
    return;
  }
  if (!entry) {
    entry = tabster.storageEntry(element, true);
  }
  if (!entry.tabster) {
    entry.tabster = {};
  }
  const tabsterOnElement = entry.tabster || {};
  const oldTabsterProps = ((_b = entry.attr) === null || _b === void 0 ? void 0 : _b.object) || {};
  const newTabsterProps = (newAttr === null || newAttr === void 0 ? void 0 : newAttr.object) || {};
  for (const key of Object.keys(oldTabsterProps)) {
    if (!newTabsterProps[key]) {
      if (key === "root") {
        const root = tabsterOnElement[key];
        if (root) {
          tabster.root.onRoot(root, true);
        }
      }
      switch (key) {
        case "deloser":
        case "root":
        case "groupper":
        case "modalizer":
        case "restorer":
        case "mover":
          const part = tabsterOnElement[key];
          if (part) {
            part.dispose();
            delete tabsterOnElement[key];
          }
          break;
        case "observed":
          delete tabsterOnElement[key];
          if (tabster.observedElement) {
            tabster.observedElement.onObservedElementUpdate(element);
          }
          break;
        case "focusable":
        case "outline":
        case "uncontrolled":
        case "sys":
          delete tabsterOnElement[key];
          break;
      }
    }
  }
  for (const key of Object.keys(newTabsterProps)) {
    const sys = newTabsterProps.sys;
    switch (key) {
      case "deloser":
        if (tabsterOnElement.deloser) {
          tabsterOnElement.deloser.setProps(newTabsterProps.deloser);
        } else {
          if (tabster.deloser) {
            tabsterOnElement.deloser = tabster.deloser.createDeloser(element, newTabsterProps.deloser);
          }
        }
        break;
      case "root":
        if (tabsterOnElement.root) {
          tabsterOnElement.root.setProps(newTabsterProps.root);
        } else {
          tabsterOnElement.root = tabster.root.createRoot(element, newTabsterProps.root, sys);
        }
        tabster.root.onRoot(tabsterOnElement.root);
        break;
      case "modalizer":
        if (tabsterOnElement.modalizer) {
          tabsterOnElement.modalizer.setProps(newTabsterProps.modalizer);
        } else {
          if (tabster.modalizer) {
            tabsterOnElement.modalizer = tabster.modalizer.createModalizer(element, newTabsterProps.modalizer, sys);
          }
        }
        break;
      case "restorer":
        if (tabsterOnElement.restorer) {
          tabsterOnElement.restorer.setProps(newTabsterProps.restorer);
        } else {
          if (tabster.restorer) {
            if (newTabsterProps.restorer) {
              tabsterOnElement.restorer = tabster.restorer.createRestorer(element, newTabsterProps.restorer);
            }
          }
        }
        break;
      case "focusable":
        tabsterOnElement.focusable = newTabsterProps.focusable;
        break;
      case "groupper":
        if (tabsterOnElement.groupper) {
          tabsterOnElement.groupper.setProps(newTabsterProps.groupper);
        } else {
          if (tabster.groupper) {
            tabsterOnElement.groupper = tabster.groupper.createGroupper(element, newTabsterProps.groupper, sys);
          }
        }
        break;
      case "mover":
        if (tabsterOnElement.mover) {
          tabsterOnElement.mover.setProps(newTabsterProps.mover);
        } else {
          if (tabster.mover) {
            tabsterOnElement.mover = tabster.mover.createMover(element, newTabsterProps.mover, sys);
          }
        }
        break;
      case "observed":
        if (tabster.observedElement) {
          tabsterOnElement.observed = newTabsterProps.observed;
          tabster.observedElement.onObservedElementUpdate(element);
        }
        break;
      case "uncontrolled":
        tabsterOnElement.uncontrolled = newTabsterProps.uncontrolled;
        break;
      case "outline":
        if (tabster.outline) {
          tabsterOnElement.outline = newTabsterProps.outline;
        }
        break;
      case "sys":
        tabsterOnElement.sys = newTabsterProps.sys;
        break;
      default:
        console.error(`Unknown key '${key}' in data-tabster attribute value.`);
    }
  }
  if (newAttr) {
    entry.attr = newAttr;
  } else {
    if (Object.keys(tabsterOnElement).length === 0) {
      delete entry.tabster;
      delete entry.attr;
    }
    tabster.storageEntry(element, false);
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const TabsterFocusInEventName = "tabster:focusin";
const TabsterFocusOutEventName = "tabster:focusout";
const TabsterMoveFocusEventName = "tabster:movefocus";
const ModalizerActiveEventName = "tabster:modalizer:active";
const ModalizerInactiveEventName = "tabster:modalizer:inactive";
const MoverStateEventName = "tabster:mover:state";
const MoverMoveFocusEventName = "tabster:mover:movefocus";
const MoverMemorizedElementEventName = "tabster:mover:memorized-element";
const GroupperMoveFocusEventName = "tabster:groupper:movefocus";
const RestorerRestoreFocusEventName = "tabster:restorer:restore-focus";
const RootFocusEventName = "tabster:root:focus";
const RootBlurEventName = "tabster:root:blur";
const CustomEvent_ = typeof CustomEvent !== "undefined" ? CustomEvent : function() {
};
class TabsterCustomEvent extends CustomEvent_ {
  constructor(type, detail) {
    super(type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail
    });
    this.details = detail;
  }
}
class TabsterFocusInEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(TabsterFocusInEventName, detail);
  }
}
class TabsterFocusOutEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(TabsterFocusOutEventName, detail);
  }
}
class TabsterMoveFocusEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(TabsterMoveFocusEventName, detail);
  }
}
class MoverStateEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(MoverStateEventName, detail);
  }
}
class ModalizerActiveEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(ModalizerActiveEventName, detail);
  }
}
class ModalizerInactiveEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(ModalizerInactiveEventName, detail);
  }
}
class RestorerRestoreFocusEvent extends TabsterCustomEvent {
  constructor() {
    super(RestorerRestoreFocusEventName);
  }
}
class RootFocusEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(RootFocusEventName, detail);
  }
}
class RootBlurEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(RootBlurEventName, detail);
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const _createMutationObserver = (callback) => new MutationObserver(callback);
const _createTreeWalker = (doc, root, whatToShow, filter) => doc.createTreeWalker(root, whatToShow, filter);
const _getParentNode = (node) => node ? node.parentNode : null;
const _getParentElement = (element) => element ? element.parentElement : null;
const _nodeContains = (parent, child) => !!(child && (parent === null || parent === void 0 ? void 0 : parent.contains(child)));
const _getActiveElement = (doc) => doc.activeElement;
const _querySelector = (element, selector) => element.querySelector(selector);
const _querySelectorAll = (element, selector) => Array.prototype.slice.call(element.querySelectorAll(selector), 0);
const _getElementById = (doc, id) => doc.getElementById(id);
const _getFirstChild = (node) => (node === null || node === void 0 ? void 0 : node.firstChild) || null;
const _getLastChild = (node) => (node === null || node === void 0 ? void 0 : node.lastChild) || null;
const _getNextSibling = (node) => (node === null || node === void 0 ? void 0 : node.nextSibling) || null;
const _getPreviousSibling = (node) => (node === null || node === void 0 ? void 0 : node.previousSibling) || null;
const _getFirstElementChild = (element) => (element === null || element === void 0 ? void 0 : element.firstElementChild) || null;
const _getLastElementChild = (element) => (element === null || element === void 0 ? void 0 : element.lastElementChild) || null;
const _getNextElementSibling = (element) => (element === null || element === void 0 ? void 0 : element.nextElementSibling) || null;
const _getPreviousElementSibling = (element) => (element === null || element === void 0 ? void 0 : element.previousElementSibling) || null;
const _appendChild = (parent, child) => parent.appendChild(child);
const _insertBefore = (parent, child, referenceChild) => parent.insertBefore(child, referenceChild);
const _getSelection = (ref) => {
  var _a;
  return ((_a = ref.ownerDocument) === null || _a === void 0 ? void 0 : _a.getSelection()) || null;
};
const _getElementsByName = (referenceElement, name) => referenceElement.ownerDocument.getElementsByName(name);
const dom = {
  createMutationObserver: _createMutationObserver,
  createTreeWalker: _createTreeWalker,
  getParentNode: _getParentNode,
  getParentElement: _getParentElement,
  nodeContains: _nodeContains,
  getActiveElement: _getActiveElement,
  querySelector: _querySelector,
  querySelectorAll: _querySelectorAll,
  getElementById: _getElementById,
  getFirstChild: _getFirstChild,
  getLastChild: _getLastChild,
  getNextSibling: _getNextSibling,
  getPreviousSibling: _getPreviousSibling,
  getFirstElementChild: _getFirstElementChild,
  getLastElementChild: _getLastElementChild,
  getNextElementSibling: _getNextElementSibling,
  getPreviousElementSibling: _getPreviousElementSibling,
  appendChild: _appendChild,
  insertBefore: _insertBefore,
  getSelection: _getSelection,
  getElementsByName: _getElementsByName
};
function setDOMAPI(domapi) {
  for (const key of Object.keys(domapi)) {
    dom[key] = domapi[key];
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
let _isBrokenIE11;
const _DOMRect = typeof DOMRect !== "undefined" ? DOMRect : class {
  constructor(x, y2, width, height) {
    this.left = x || 0;
    this.top = y2 || 0;
    this.right = (x || 0) + (width || 0);
    this.bottom = (y2 || 0) + (height || 0);
  }
};
let _uidCounter = 0;
try {
  document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
  _isBrokenIE11 = false;
} catch (e2) {
  _isBrokenIE11 = true;
}
const _updateDummyInputsTimeout = 100;
function getInstanceContext(getWindow) {
  const win = getWindow();
  let ctx = win.__tabsterInstanceContext;
  if (!ctx) {
    ctx = {
      elementByUId: {},
      basics: {
        Promise: win.Promise || void 0,
        WeakRef: win.WeakRef || void 0
      },
      containerBoundingRectCache: {},
      lastContainerBoundingRectCacheId: 0,
      fakeWeakRefs: [],
      fakeWeakRefsStarted: false
    };
    win.__tabsterInstanceContext = ctx;
  }
  return ctx;
}
function disposeInstanceContext(win) {
  const ctx = win.__tabsterInstanceContext;
  if (ctx) {
    ctx.elementByUId = {};
    delete ctx.WeakRef;
    ctx.containerBoundingRectCache = {};
    if (ctx.containerBoundingRectCacheTimer) {
      win.clearTimeout(ctx.containerBoundingRectCacheTimer);
    }
    if (ctx.fakeWeakRefsTimer) {
      win.clearTimeout(ctx.fakeWeakRefsTimer);
    }
    ctx.fakeWeakRefs = [];
    delete win.__tabsterInstanceContext;
  }
}
function createWeakMap(win) {
  const ctx = win.__tabsterInstanceContext;
  return new ((ctx === null || ctx === void 0 ? void 0 : ctx.basics.WeakMap) || WeakMap)();
}
function hasSubFocusable(element) {
  return !!element.querySelector(FOCUSABLE_SELECTOR);
}
class FakeWeakRef {
  constructor(target) {
    this._target = target;
  }
  deref() {
    return this._target;
  }
  static cleanup(fwr, forceRemove) {
    if (!fwr._target) {
      return true;
    }
    if (forceRemove || !documentContains(fwr._target.ownerDocument, fwr._target)) {
      delete fwr._target;
      return true;
    }
    return false;
  }
}
class WeakHTMLElement {
  constructor(getWindow, element, data) {
    const context = getInstanceContext(getWindow);
    let ref;
    if (context.WeakRef) {
      ref = new context.WeakRef(element);
    } else {
      ref = new FakeWeakRef(element);
      context.fakeWeakRefs.push(ref);
    }
    this._ref = ref;
    this._data = data;
  }
  get() {
    const ref = this._ref;
    let element;
    if (ref) {
      element = ref.deref();
      if (!element) {
        delete this._ref;
      }
    }
    return element;
  }
  getData() {
    return this._data;
  }
}
function cleanupFakeWeakRefs(getWindow, forceRemove) {
  const context = getInstanceContext(getWindow);
  context.fakeWeakRefs = context.fakeWeakRefs.filter((e2) => !FakeWeakRef.cleanup(e2, forceRemove));
}
function startFakeWeakRefsCleanup(getWindow) {
  const context = getInstanceContext(getWindow);
  if (!context.fakeWeakRefsStarted) {
    context.fakeWeakRefsStarted = true;
    context.WeakRef = getWeakRef(context);
  }
  if (!context.fakeWeakRefsTimer) {
    context.fakeWeakRefsTimer = getWindow().setTimeout(() => {
      context.fakeWeakRefsTimer = void 0;
      cleanupFakeWeakRefs(getWindow);
      startFakeWeakRefsCleanup(getWindow);
    }, 2 * 60 * 1e3);
  }
}
function stopFakeWeakRefsCleanupAndClearStorage(getWindow) {
  const context = getInstanceContext(getWindow);
  context.fakeWeakRefsStarted = false;
  if (context.fakeWeakRefsTimer) {
    getWindow().clearTimeout(context.fakeWeakRefsTimer);
    context.fakeWeakRefsTimer = void 0;
    context.fakeWeakRefs = [];
  }
}
function createElementTreeWalker(doc, root, acceptNode) {
  if (root.nodeType !== Node.ELEMENT_NODE) {
    return void 0;
  }
  const filter = _isBrokenIE11 ? acceptNode : {
    acceptNode
  };
  return dom.createTreeWalker(
    doc,
    root,
    NodeFilter.SHOW_ELEMENT,
    filter,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: We still don't want to completely break IE11, so, entityReferenceExpansion argument is not optional.
    false
    /* Last argument is not optional for IE11! */
  );
}
function getBoundingRect(getWindow, element) {
  let cacheId = element.__tabsterCacheId;
  const context = getInstanceContext(getWindow);
  const cached = cacheId ? context.containerBoundingRectCache[cacheId] : void 0;
  if (cached) {
    return cached.rect;
  }
  const scrollingElement = element.ownerDocument && element.ownerDocument.documentElement;
  if (!scrollingElement) {
    return new _DOMRect();
  }
  let left = 0;
  let top = 0;
  let right = scrollingElement.clientWidth;
  let bottom = scrollingElement.clientHeight;
  if (element !== scrollingElement) {
    const r2 = element.getBoundingClientRect();
    left = Math.max(left, r2.left);
    top = Math.max(top, r2.top);
    right = Math.min(right, r2.right);
    bottom = Math.min(bottom, r2.bottom);
  }
  const rect = new _DOMRect(left < right ? left : -1, top < bottom ? top : -1, left < right ? right - left : 0, top < bottom ? bottom - top : 0);
  if (!cacheId) {
    cacheId = "r-" + ++context.lastContainerBoundingRectCacheId;
    element.__tabsterCacheId = cacheId;
  }
  context.containerBoundingRectCache[cacheId] = {
    rect,
    element
  };
  if (!context.containerBoundingRectCacheTimer) {
    context.containerBoundingRectCacheTimer = window.setTimeout(() => {
      context.containerBoundingRectCacheTimer = void 0;
      for (const cId of Object.keys(context.containerBoundingRectCache)) {
        delete context.containerBoundingRectCache[cId].element.__tabsterCacheId;
      }
      context.containerBoundingRectCache = {};
    }, 50);
  }
  return rect;
}
function isElementVerticallyVisibleInContainer(getWindow, element, tolerance) {
  const container = getScrollableContainer(element);
  if (!container) {
    return false;
  }
  const containerRect = getBoundingRect(getWindow, container);
  const elementRect = element.getBoundingClientRect();
  const intersectionTolerance = elementRect.height * (1 - tolerance);
  const topIntersection = Math.max(0, containerRect.top - elementRect.top);
  const bottomIntersection = Math.max(0, elementRect.bottom - containerRect.bottom);
  const totalIntersection = topIntersection + bottomIntersection;
  return totalIntersection === 0 || totalIntersection <= intersectionTolerance;
}
function scrollIntoView(getWindow, element, alignToTop) {
  const container = getScrollableContainer(element);
  if (container) {
    const containerRect = getBoundingRect(getWindow, container);
    const elementRect = element.getBoundingClientRect();
    if (alignToTop) {
      container.scrollTop += elementRect.top - containerRect.top;
    } else {
      container.scrollTop += elementRect.bottom - containerRect.bottom;
    }
  }
}
function getScrollableContainer(element) {
  const doc = element.ownerDocument;
  if (doc) {
    for (let el = dom.getParentElement(element); el; el = dom.getParentElement(el)) {
      if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
        return el;
      }
    }
    return doc.documentElement;
  }
  return null;
}
function makeFocusIgnored(element) {
  element.__shouldIgnoreFocus = true;
}
function shouldIgnoreFocus(element) {
  return !!element.__shouldIgnoreFocus;
}
function getUId(wnd) {
  const rnd = new Uint32Array(4);
  if (wnd.crypto && wnd.crypto.getRandomValues) {
    wnd.crypto.getRandomValues(rnd);
  } else if (wnd.msCrypto && wnd.msCrypto.getRandomValues) {
    wnd.msCrypto.getRandomValues(rnd);
  } else {
    for (let i = 0; i < rnd.length; i++) {
      rnd[i] = 4294967295 * Math.random();
    }
  }
  const srnd = [];
  for (let i = 0; i < rnd.length; i++) {
    srnd.push(rnd[i].toString(36));
  }
  srnd.push("|");
  srnd.push((++_uidCounter).toString(36));
  srnd.push("|");
  srnd.push(Date.now().toString(36));
  return srnd.join("");
}
function getElementUId(getWindow, element) {
  const context = getInstanceContext(getWindow);
  let uid = element.__tabsterElementUID;
  if (!uid) {
    uid = element.__tabsterElementUID = getUId(getWindow());
  }
  if (!context.elementByUId[uid] && documentContains(element.ownerDocument, element)) {
    context.elementByUId[uid] = new WeakHTMLElement(getWindow, element);
  }
  return uid;
}
function clearElementCache(getWindow, parent) {
  const context = getInstanceContext(getWindow);
  for (const key of Object.keys(context.elementByUId)) {
    const wel = context.elementByUId[key];
    const el = wel && wel.get();
    if (el && parent) {
      if (!dom.nodeContains(parent, el)) {
        continue;
      }
    }
    delete context.elementByUId[key];
  }
}
function documentContains(doc, element) {
  return dom.nodeContains(doc === null || doc === void 0 ? void 0 : doc.body, element);
}
function matchesSelector(element, selector) {
  const matches = element.matches || element.matchesSelector || element.msMatchesSelector || element.webkitMatchesSelector;
  return matches && matches.call(element, selector);
}
function getPromise(getWindow) {
  const context = getInstanceContext(getWindow);
  if (context.basics.Promise) {
    return context.basics.Promise;
  }
  throw new Error("No Promise defined.");
}
function getWeakRef(context) {
  return context.basics.WeakRef;
}
let _lastTabsterPartId = 0;
class TabsterPart {
  constructor(tabster, element, props) {
    const getWindow = tabster.getWindow;
    this._tabster = tabster;
    this._element = new WeakHTMLElement(getWindow, element);
    this._props = {
      ...props
    };
    this.id = "i" + ++_lastTabsterPartId;
  }
  getElement() {
    return this._element.get();
  }
  getProps() {
    return this._props;
  }
  setProps(props) {
    this._props = {
      ...props
    };
  }
}
class DummyInput {
  constructor(getWindow, isOutside, props, element, fixedTarget) {
    var _a;
    this._focusIn = (e2) => {
      if (this._fixedTarget) {
        const target = this._fixedTarget.get();
        if (target) {
          nativeFocus(target);
        }
        return;
      }
      const input2 = this.input;
      if (this.onFocusIn && input2) {
        const relatedTarget = e2.relatedTarget;
        this.onFocusIn(this, this._isBackward(true, input2, relatedTarget), relatedTarget);
      }
    };
    this._focusOut = (e2) => {
      if (this._fixedTarget) {
        return;
      }
      this.useDefaultAction = false;
      const input2 = this.input;
      if (this.onFocusOut && input2) {
        const relatedTarget = e2.relatedTarget;
        this.onFocusOut(this, this._isBackward(false, input2, relatedTarget), relatedTarget);
      }
    };
    const win = getWindow();
    const input = win.document.createElement("i");
    input.tabIndex = 0;
    input.setAttribute("role", "none");
    input.setAttribute(TABSTER_DUMMY_INPUT_ATTRIBUTE_NAME, "");
    input.setAttribute("aria-hidden", "true");
    const style = input.style;
    style.position = "fixed";
    style.width = style.height = "1px";
    style.opacity = "0.001";
    style.zIndex = "-1";
    style.setProperty("content-visibility", "hidden");
    makeFocusIgnored(input);
    this.input = input;
    this.isFirst = props.isFirst;
    this.isOutside = isOutside;
    this._isPhantom = (_a = props.isPhantom) !== null && _a !== void 0 ? _a : false;
    this._fixedTarget = fixedTarget;
    input.addEventListener("focusin", this._focusIn);
    input.addEventListener("focusout", this._focusOut);
    input.__tabsterDummyContainer = element;
    if (this._isPhantom) {
      this._disposeTimer = win.setTimeout(() => {
        delete this._disposeTimer;
        this.dispose();
      }, 0);
      this._clearDisposeTimeout = () => {
        if (this._disposeTimer) {
          win.clearTimeout(this._disposeTimer);
          delete this._disposeTimer;
        }
        delete this._clearDisposeTimeout;
      };
    }
  }
  dispose() {
    var _a;
    if (this._clearDisposeTimeout) {
      this._clearDisposeTimeout();
    }
    const input = this.input;
    if (!input) {
      return;
    }
    delete this._fixedTarget;
    delete this.onFocusIn;
    delete this.onFocusOut;
    delete this.input;
    input.removeEventListener("focusin", this._focusIn);
    input.removeEventListener("focusout", this._focusOut);
    delete input.__tabsterDummyContainer;
    (_a = dom.getParentNode(input)) === null || _a === void 0 ? void 0 : _a.removeChild(input);
  }
  setTopLeft(top, left) {
    var _a;
    const style = (_a = this.input) === null || _a === void 0 ? void 0 : _a.style;
    if (style) {
      style.top = `${top}px`;
      style.left = `${left}px`;
    }
  }
  _isBackward(isIn, current, previous) {
    return isIn && !previous ? !this.isFirst : !!(previous && current.compareDocumentPosition(previous) & Node.DOCUMENT_POSITION_FOLLOWING);
  }
}
const DummyInputManagerPriorities = {
  Root: 1,
  Modalizer: 2,
  Mover: 3,
  Groupper: 4
};
class DummyInputManager {
  constructor(tabster, element, priority, sys, outsideByDefault, callForDefaultAction) {
    this._element = element;
    this._instance = new DummyInputManagerCore(tabster, element, this, priority, sys, outsideByDefault, callForDefaultAction);
  }
  _setHandlers(onFocusIn, onFocusOut) {
    this._onFocusIn = onFocusIn;
    this._onFocusOut = onFocusOut;
  }
  moveOut(backwards) {
    var _a;
    (_a = this._instance) === null || _a === void 0 ? void 0 : _a.moveOut(backwards);
  }
  moveOutWithDefaultAction(backwards, relatedEvent) {
    var _a;
    (_a = this._instance) === null || _a === void 0 ? void 0 : _a.moveOutWithDefaultAction(backwards, relatedEvent);
  }
  getHandler(isIn) {
    return isIn ? this._onFocusIn : this._onFocusOut;
  }
  setTabbable(tabbable) {
    var _a;
    (_a = this._instance) === null || _a === void 0 ? void 0 : _a.setTabbable(this, tabbable);
  }
  dispose() {
    if (this._instance) {
      this._instance.dispose(this);
      delete this._instance;
    }
    delete this._onFocusIn;
    delete this._onFocusOut;
  }
  static moveWithPhantomDummy(tabster, element, moveOutOfElement, isBackward, relatedEvent) {
    const dummy = new DummyInput(tabster.getWindow, true, {
      isPhantom: true,
      isFirst: true
    });
    const input = dummy.input;
    if (input) {
      let parent;
      let insertBefore2;
      if (element.tagName === "BODY") {
        parent = element;
        insertBefore2 = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? dom.getFirstElementChild(element) : null;
      } else {
        if (moveOutOfElement && (!isBackward || isBackward && !tabster.focusable.isFocusable(element, false, true, true))) {
          parent = element;
          insertBefore2 = isBackward ? element.firstElementChild : null;
        } else {
          parent = dom.getParentElement(element);
          insertBefore2 = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? element : dom.getNextElementSibling(element);
        }
        let potentialDummy;
        let dummyFor;
        do {
          potentialDummy = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? dom.getPreviousElementSibling(insertBefore2) : insertBefore2;
          dummyFor = getDummyInputContainer(potentialDummy);
          if (dummyFor === element) {
            insertBefore2 = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? potentialDummy : dom.getNextElementSibling(potentialDummy);
          } else {
            dummyFor = null;
          }
        } while (dummyFor);
      }
      if (parent === null || parent === void 0 ? void 0 : parent.dispatchEvent(new TabsterMoveFocusEvent({
        by: "root",
        owner: parent,
        next: null,
        relatedEvent
      }))) {
        dom.insertBefore(parent, input, insertBefore2);
        nativeFocus(input);
      }
    }
  }
  static addPhantomDummyWithTarget(tabster, sourceElement, isBackward, targetElement) {
    const dummy = new DummyInput(tabster.getWindow, true, {
      isPhantom: true,
      isFirst: true
    }, void 0, new WeakHTMLElement(tabster.getWindow, targetElement));
    const input = dummy.input;
    if (input) {
      let dummyParent;
      let insertBefore2;
      if (hasSubFocusable(sourceElement) && !isBackward) {
        dummyParent = sourceElement;
        insertBefore2 = dom.getFirstElementChild(sourceElement);
      } else {
        dummyParent = dom.getParentElement(sourceElement);
        insertBefore2 = isBackward ? sourceElement : dom.getNextElementSibling(sourceElement);
      }
      if (dummyParent) {
        dom.insertBefore(dummyParent, input, insertBefore2);
      }
    }
  }
}
class DummyInputObserver {
  constructor(win) {
    this._updateQueue = /* @__PURE__ */ new Set();
    this._lastUpdateQueueTime = 0;
    this._changedParents = /* @__PURE__ */ new WeakSet();
    this._dummyElements = [];
    this._dummyCallbacks = /* @__PURE__ */ new WeakMap();
    this._domChanged = (parent) => {
      var _a;
      if (this._changedParents.has(parent)) {
        return;
      }
      this._changedParents.add(parent);
      if (this._updateDummyInputsTimer) {
        return;
      }
      this._updateDummyInputsTimer = (_a = this._win) === null || _a === void 0 ? void 0 : _a.call(this).setTimeout(() => {
        delete this._updateDummyInputsTimer;
        for (const ref of this._dummyElements) {
          const dummyElement = ref.get();
          if (dummyElement) {
            const callback = this._dummyCallbacks.get(dummyElement);
            if (callback) {
              const dummyParent = dom.getParentNode(dummyElement);
              if (!dummyParent || this._changedParents.has(dummyParent)) {
                callback();
              }
            }
          }
        }
        this._changedParents = /* @__PURE__ */ new WeakSet();
      }, _updateDummyInputsTimeout);
    };
    this._win = win;
  }
  add(dummy, callback) {
    if (!this._dummyCallbacks.has(dummy) && this._win) {
      this._dummyElements.push(new WeakHTMLElement(this._win, dummy));
      this._dummyCallbacks.set(dummy, callback);
      this.domChanged = this._domChanged;
    }
  }
  remove(dummy) {
    this._dummyElements = this._dummyElements.filter((ref) => {
      const element = ref.get();
      return element && element !== dummy;
    });
    this._dummyCallbacks.delete(dummy);
    if (this._dummyElements.length === 0) {
      delete this.domChanged;
    }
  }
  dispose() {
    var _a;
    const win = (_a = this._win) === null || _a === void 0 ? void 0 : _a.call(this);
    if (this._updateTimer) {
      win === null || win === void 0 ? void 0 : win.clearTimeout(this._updateTimer);
      delete this._updateTimer;
    }
    if (this._updateDummyInputsTimer) {
      win === null || win === void 0 ? void 0 : win.clearTimeout(this._updateDummyInputsTimer);
      delete this._updateDummyInputsTimer;
    }
    this._changedParents = /* @__PURE__ */ new WeakSet();
    this._dummyCallbacks = /* @__PURE__ */ new WeakMap();
    this._dummyElements = [];
    this._updateQueue.clear();
    delete this.domChanged;
    delete this._win;
  }
  updatePositions(compute) {
    if (!this._win) {
      return;
    }
    this._updateQueue.add(compute);
    this._lastUpdateQueueTime = Date.now();
    this._scheduledUpdatePositions();
  }
  _scheduledUpdatePositions() {
    var _a;
    if (this._updateTimer) {
      return;
    }
    this._updateTimer = (_a = this._win) === null || _a === void 0 ? void 0 : _a.call(this).setTimeout(() => {
      delete this._updateTimer;
      if (this._lastUpdateQueueTime + _updateDummyInputsTimeout <= Date.now()) {
        const scrollTopLeftCache = /* @__PURE__ */ new Map();
        const setTopLeftCallbacks = [];
        for (const compute of this._updateQueue) {
          setTopLeftCallbacks.push(compute(scrollTopLeftCache));
        }
        this._updateQueue.clear();
        for (const setTopLeft of setTopLeftCallbacks) {
          setTopLeft();
        }
        scrollTopLeftCache.clear();
      } else {
        this._scheduledUpdatePositions();
      }
    }, _updateDummyInputsTimeout);
  }
}
class DummyInputManagerCore {
  constructor(tabster, element, manager, priority, sys, outsideByDefault, callForDefaultAction) {
    this._wrappers = [];
    this._isOutside = false;
    this._transformElements = /* @__PURE__ */ new Set();
    this._onFocusIn = (dummyInput, isBackward, relatedTarget) => {
      this._onFocus(true, dummyInput, isBackward, relatedTarget);
    };
    this._onFocusOut = (dummyInput, isBackward, relatedTarget) => {
      this._onFocus(false, dummyInput, isBackward, relatedTarget);
    };
    this.moveOut = (backwards) => {
      var _a;
      const first = this._firstDummy;
      const last = this._lastDummy;
      if (first && last) {
        this._ensurePosition();
        const firstInput = first.input;
        const lastInput = last.input;
        const element2 = (_a = this._element) === null || _a === void 0 ? void 0 : _a.get();
        if (firstInput && lastInput && element2) {
          let toFocus;
          if (backwards) {
            firstInput.tabIndex = 0;
            toFocus = firstInput;
          } else {
            lastInput.tabIndex = 0;
            toFocus = lastInput;
          }
          if (toFocus) {
            nativeFocus(toFocus);
          }
        }
      }
    };
    this.moveOutWithDefaultAction = (backwards, relatedEvent) => {
      var _a;
      const first = this._firstDummy;
      const last = this._lastDummy;
      if (first && last) {
        this._ensurePosition();
        const firstInput = first.input;
        const lastInput = last.input;
        const element2 = (_a = this._element) === null || _a === void 0 ? void 0 : _a.get();
        if (firstInput && lastInput && element2) {
          let toFocus;
          if (backwards) {
            if (!first.isOutside && this._tabster.focusable.isFocusable(element2, true, true, true)) {
              toFocus = element2;
            } else {
              first.useDefaultAction = true;
              firstInput.tabIndex = 0;
              toFocus = firstInput;
            }
          } else {
            last.useDefaultAction = true;
            lastInput.tabIndex = 0;
            toFocus = lastInput;
          }
          if (toFocus && element2.dispatchEvent(new TabsterMoveFocusEvent({
            by: "root",
            owner: element2,
            next: null,
            relatedEvent
          }))) {
            nativeFocus(toFocus);
          }
        }
      }
    };
    this.setTabbable = (manager2, tabbable) => {
      var _a, _b;
      for (const w2 of this._wrappers) {
        if (w2.manager === manager2) {
          w2.tabbable = tabbable;
          break;
        }
      }
      const wrapper = this._getCurrent();
      if (wrapper) {
        const tabIndex = wrapper.tabbable ? 0 : -1;
        let input = (_a = this._firstDummy) === null || _a === void 0 ? void 0 : _a.input;
        if (input) {
          input.tabIndex = tabIndex;
        }
        input = (_b = this._lastDummy) === null || _b === void 0 ? void 0 : _b.input;
        if (input) {
          input.tabIndex = tabIndex;
        }
      }
    };
    this._addDummyInputs = () => {
      if (this._addTimer) {
        return;
      }
      this._addTimer = this._getWindow().setTimeout(() => {
        delete this._addTimer;
        this._ensurePosition();
        this._addTransformOffsets();
      }, 0);
    };
    this._addTransformOffsets = () => {
      this._tabster._dummyObserver.updatePositions(this._computeTransformOffsets);
    };
    this._computeTransformOffsets = (scrollTopLeftCache) => {
      var _a, _b;
      const from = ((_a = this._firstDummy) === null || _a === void 0 ? void 0 : _a.input) || ((_b = this._lastDummy) === null || _b === void 0 ? void 0 : _b.input);
      const transformElements = this._transformElements;
      const newTransformElements = /* @__PURE__ */ new Set();
      let scrollTop = 0;
      let scrollLeft = 0;
      const win = this._getWindow();
      for (let element2 = from; element2 && element2.nodeType === Node.ELEMENT_NODE; element2 = dom.getParentElement(element2)) {
        let scrollTopLeft = scrollTopLeftCache.get(element2);
        if (scrollTopLeft === void 0) {
          const transform = win.getComputedStyle(element2).transform;
          if (transform && transform !== "none") {
            scrollTopLeft = {
              scrollTop: element2.scrollTop,
              scrollLeft: element2.scrollLeft
            };
          }
          scrollTopLeftCache.set(element2, scrollTopLeft || null);
        }
        if (scrollTopLeft) {
          newTransformElements.add(element2);
          if (!transformElements.has(element2)) {
            element2.addEventListener("scroll", this._addTransformOffsets);
          }
          scrollTop += scrollTopLeft.scrollTop;
          scrollLeft += scrollTopLeft.scrollLeft;
        }
      }
      for (const el2 of transformElements) {
        if (!newTransformElements.has(el2)) {
          el2.removeEventListener("scroll", this._addTransformOffsets);
        }
      }
      this._transformElements = newTransformElements;
      return () => {
        var _a2, _b2;
        (_a2 = this._firstDummy) === null || _a2 === void 0 ? void 0 : _a2.setTopLeft(scrollTop, scrollLeft);
        (_b2 = this._lastDummy) === null || _b2 === void 0 ? void 0 : _b2.setTopLeft(scrollTop, scrollLeft);
      };
    };
    const el = element.get();
    if (!el) {
      throw new Error("No element");
    }
    this._tabster = tabster;
    this._getWindow = tabster.getWindow;
    this._callForDefaultAction = callForDefaultAction;
    const instance = el.__tabsterDummy;
    (instance || this)._wrappers.push({
      manager,
      priority,
      tabbable: true
    });
    if (instance) {
      return instance;
    }
    el.__tabsterDummy = this;
    const forcedDummyPosition = sys === null || sys === void 0 ? void 0 : sys.dummyInputsPosition;
    const tagName = el.tagName;
    this._isOutside = !forcedDummyPosition ? (outsideByDefault || tagName === "UL" || tagName === "OL" || tagName === "TABLE") && !(tagName === "LI" || tagName === "TD" || tagName === "TH") : forcedDummyPosition === SysDummyInputsPositions.Outside;
    this._firstDummy = new DummyInput(this._getWindow, this._isOutside, {
      isFirst: true
    }, element);
    this._lastDummy = new DummyInput(this._getWindow, this._isOutside, {
      isFirst: false
    }, element);
    const dummyElement = this._firstDummy.input;
    dummyElement && tabster._dummyObserver.add(dummyElement, this._addDummyInputs);
    this._firstDummy.onFocusIn = this._onFocusIn;
    this._firstDummy.onFocusOut = this._onFocusOut;
    this._lastDummy.onFocusIn = this._onFocusIn;
    this._lastDummy.onFocusOut = this._onFocusOut;
    this._element = element;
    this._addDummyInputs();
  }
  dispose(manager, force) {
    var _a, _b, _c, _d;
    const wrappers = this._wrappers = this._wrappers.filter((w2) => w2.manager !== manager && !force);
    if (wrappers.length === 0) {
      delete ((_a = this._element) === null || _a === void 0 ? void 0 : _a.get()).__tabsterDummy;
      for (const el of this._transformElements) {
        el.removeEventListener("scroll", this._addTransformOffsets);
      }
      this._transformElements.clear();
      const win = this._getWindow();
      if (this._addTimer) {
        win.clearTimeout(this._addTimer);
        delete this._addTimer;
      }
      const dummyElement = (_b = this._firstDummy) === null || _b === void 0 ? void 0 : _b.input;
      dummyElement && this._tabster._dummyObserver.remove(dummyElement);
      (_c = this._firstDummy) === null || _c === void 0 ? void 0 : _c.dispose();
      (_d = this._lastDummy) === null || _d === void 0 ? void 0 : _d.dispose();
    }
  }
  _onFocus(isIn, dummyInput, isBackward, relatedTarget) {
    var _a;
    const wrapper = this._getCurrent();
    if (wrapper && (!dummyInput.useDefaultAction || this._callForDefaultAction)) {
      (_a = wrapper.manager.getHandler(isIn)) === null || _a === void 0 ? void 0 : _a(dummyInput, isBackward, relatedTarget);
    }
  }
  _getCurrent() {
    this._wrappers.sort((a, b2) => {
      if (a.tabbable !== b2.tabbable) {
        return a.tabbable ? -1 : 1;
      }
      return a.priority - b2.priority;
    });
    return this._wrappers[0];
  }
  _ensurePosition() {
    var _a, _b, _c;
    const element = (_a = this._element) === null || _a === void 0 ? void 0 : _a.get();
    const firstDummyInput = (_b = this._firstDummy) === null || _b === void 0 ? void 0 : _b.input;
    const lastDummyInput = (_c = this._lastDummy) === null || _c === void 0 ? void 0 : _c.input;
    if (!element || !firstDummyInput || !lastDummyInput) {
      return;
    }
    if (this._isOutside) {
      const elementParent = dom.getParentNode(element);
      if (elementParent) {
        const nextSibling = dom.getNextSibling(element);
        if (nextSibling !== lastDummyInput) {
          dom.insertBefore(elementParent, lastDummyInput, nextSibling);
        }
        if (dom.getPreviousElementSibling(element) !== firstDummyInput) {
          dom.insertBefore(elementParent, firstDummyInput, element);
        }
      }
    } else {
      if (dom.getLastElementChild(element) !== lastDummyInput) {
        dom.appendChild(element, lastDummyInput);
      }
      const firstElementChild = dom.getFirstElementChild(element);
      if (firstElementChild && firstElementChild !== firstDummyInput && firstElementChild.parentNode) {
        dom.insertBefore(firstElementChild.parentNode, firstDummyInput, firstElementChild);
      }
    }
  }
}
function getLastChild$2(container) {
  let lastChild = null;
  for (let i = dom.getLastElementChild(container); i; i = dom.getLastElementChild(i)) {
    lastChild = i;
  }
  return lastChild || void 0;
}
function getAdjacentElement(from, prev) {
  let cur = from;
  let adjacent = null;
  while (cur && !adjacent) {
    adjacent = prev ? dom.getPreviousElementSibling(cur) : dom.getNextElementSibling(cur);
    cur = dom.getParentElement(cur);
  }
  return adjacent || void 0;
}
function augmentAttribute(tabster, element, name, value) {
  const entry = tabster.storageEntry(element, true);
  let ret = false;
  if (!entry.aug) {
    if (value === void 0) {
      return ret;
    }
    entry.aug = {};
  }
  if (value === void 0) {
    if (name in entry.aug) {
      const origVal = entry.aug[name];
      delete entry.aug[name];
      if (origVal === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, origVal);
      }
      ret = true;
    }
  } else {
    let origValue;
    if (!(name in entry.aug)) {
      origValue = element.getAttribute(name);
    }
    if (origValue !== void 0 && origValue !== value) {
      entry.aug[name] = origValue;
      if (value === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value);
      }
      ret = true;
    }
  }
  if (value === void 0 && Object.keys(entry.aug).length === 0) {
    delete entry.aug;
    tabster.storageEntry(element, false);
  }
  return ret;
}
function isDisplayNone(element) {
  var _a, _b;
  const elementDocument = element.ownerDocument;
  const computedStyle = (_a = elementDocument.defaultView) === null || _a === void 0 ? void 0 : _a.getComputedStyle(element);
  if (element.offsetParent === null && elementDocument.body !== element && (computedStyle === null || computedStyle === void 0 ? void 0 : computedStyle.position) !== "fixed") {
    return true;
  }
  if ((computedStyle === null || computedStyle === void 0 ? void 0 : computedStyle.visibility) === "hidden") {
    return true;
  }
  if ((computedStyle === null || computedStyle === void 0 ? void 0 : computedStyle.position) === "fixed") {
    if (computedStyle.display === "none") {
      return true;
    }
    if (((_b = element.parentElement) === null || _b === void 0 ? void 0 : _b.offsetParent) === null && elementDocument.body !== element.parentElement) {
      return true;
    }
  }
  return false;
}
function isRadio(element) {
  return element.tagName === "INPUT" && !!element.name && element.type === "radio";
}
function getRadioButtonGroup(element) {
  if (!isRadio(element)) {
    return;
  }
  const name = element.name;
  let radioButtons = Array.from(dom.getElementsByName(element, name));
  let checked;
  radioButtons = radioButtons.filter((el) => {
    if (isRadio(el)) {
      if (el.checked) {
        checked = el;
      }
      return true;
    }
    return false;
  });
  return {
    name,
    buttons: new Set(radioButtons),
    checked
  };
}
function getDummyInputContainer(element) {
  var _a;
  return ((_a = element === null || element === void 0 ? void 0 : element.__tabsterDummyContainer) === null || _a === void 0 ? void 0 : _a.get()) || null;
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function getTabsterAttribute(props, plain) {
  const attr = JSON.stringify(props);
  {
    return attr;
  }
}
function mergeTabsterProps(props, newProps) {
  for (const key of Object.keys(newProps)) {
    const value = newProps[key];
    if (value) {
      props[key] = value;
    } else {
      delete props[key];
    }
  }
}
function setTabsterAttribute(element, newProps, update) {
  let props;
  {
    const attr = element.getAttribute(TABSTER_ATTRIBUTE_NAME);
    if (attr) {
      try {
        props = JSON.parse(attr);
      } catch (e2) {
      }
    }
  }
  if (!props) {
    props = {};
  }
  mergeTabsterProps(props, newProps);
  if (Object.keys(props).length > 0) {
    element.setAttribute(TABSTER_ATTRIBUTE_NAME, getTabsterAttribute(props));
  } else {
    element.removeAttribute(TABSTER_ATTRIBUTE_NAME);
  }
}
class RootDummyManager extends DummyInputManager {
  constructor(tabster, element, setFocused, sys) {
    super(tabster, element, DummyInputManagerPriorities.Root, sys, void 0, true);
    this._onDummyInputFocus = (dummyInput) => {
      var _a;
      if (dummyInput.useDefaultAction) {
        this._setFocused(false);
      } else {
        this._tabster.keyboardNavigation.setNavigatingWithKeyboard(true);
        const element2 = this._element.get();
        if (element2) {
          this._setFocused(true);
          const toFocus = this._tabster.focusedElement.getFirstOrLastTabbable(dummyInput.isFirst, {
            container: element2,
            ignoreAccessibility: true
          });
          if (toFocus) {
            nativeFocus(toFocus);
            return;
          }
        }
        (_a = dummyInput.input) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
    this._setHandlers(this._onDummyInputFocus);
    this._tabster = tabster;
    this._setFocused = setFocused;
  }
}
class Root extends TabsterPart {
  constructor(tabster, element, onDispose, props, sys) {
    super(tabster, element, props);
    this._isFocused = false;
    this._setFocused = (hasFocused) => {
      var _a;
      if (this._setFocusedTimer) {
        this._tabster.getWindow().clearTimeout(this._setFocusedTimer);
        delete this._setFocusedTimer;
      }
      if (this._isFocused === hasFocused) {
        return;
      }
      const element2 = this._element.get();
      if (element2) {
        if (hasFocused) {
          this._isFocused = true;
          (_a = this._dummyManager) === null || _a === void 0 ? void 0 : _a.setTabbable(false);
          element2.dispatchEvent(new RootFocusEvent({
            element: element2
          }));
        } else {
          this._setFocusedTimer = this._tabster.getWindow().setTimeout(() => {
            var _a2;
            delete this._setFocusedTimer;
            this._isFocused = false;
            (_a2 = this._dummyManager) === null || _a2 === void 0 ? void 0 : _a2.setTabbable(true);
            element2.dispatchEvent(new RootBlurEvent({
              element: element2
            }));
          }, 0);
        }
      }
    };
    this._onFocusIn = (event) => {
      const getParent2 = this._tabster.getParent;
      const rootElement = this._element.get();
      let curElement = event.composedPath()[0];
      do {
        if (curElement === rootElement) {
          this._setFocused(true);
          return;
        }
        curElement = curElement && getParent2(curElement);
      } while (curElement);
    };
    this._onFocusOut = () => {
      this._setFocused(false);
    };
    this._onDispose = onDispose;
    const win = tabster.getWindow;
    this.uid = getElementUId(win, element);
    this._sys = sys;
    if (tabster.controlTab || tabster.rootDummyInputs) {
      this.addDummyInputs();
    }
    const w2 = win();
    const doc = w2.document;
    doc.addEventListener(KEYBORG_FOCUSIN, this._onFocusIn);
    doc.addEventListener(KEYBORG_FOCUSOUT, this._onFocusOut);
    this._add();
  }
  addDummyInputs() {
    if (!this._dummyManager) {
      this._dummyManager = new RootDummyManager(this._tabster, this._element, this._setFocused, this._sys);
    }
  }
  dispose() {
    var _a;
    this._onDispose(this);
    const win = this._tabster.getWindow();
    const doc = win.document;
    doc.removeEventListener(KEYBORG_FOCUSIN, this._onFocusIn);
    doc.removeEventListener(KEYBORG_FOCUSOUT, this._onFocusOut);
    if (this._setFocusedTimer) {
      win.clearTimeout(this._setFocusedTimer);
      delete this._setFocusedTimer;
    }
    (_a = this._dummyManager) === null || _a === void 0 ? void 0 : _a.dispose();
    this._remove();
  }
  moveOutWithDefaultAction(isBackward, relatedEvent) {
    const dummyManager = this._dummyManager;
    if (dummyManager) {
      dummyManager.moveOutWithDefaultAction(isBackward, relatedEvent);
    } else {
      const el = this.getElement();
      if (el) {
        RootDummyManager.moveWithPhantomDummy(this._tabster, el, true, isBackward, relatedEvent);
      }
    }
  }
  _add() {
  }
  _remove() {
  }
}
class RootAPI {
  constructor(tabster, autoRoot) {
    this._autoRootWaiting = false;
    this._roots = {};
    this._forceDummy = false;
    this.rootById = {};
    this._autoRootCreate = () => {
      var _a;
      const doc = this._win().document;
      const body = doc.body;
      if (body) {
        this._autoRootUnwait(doc);
        const props = this._autoRoot;
        if (props) {
          setTabsterAttribute(body, {
            root: props
          });
          updateTabsterByAttribute(this._tabster, body);
          return (_a = getTabsterOnElement(this._tabster, body)) === null || _a === void 0 ? void 0 : _a.root;
        }
      } else if (!this._autoRootWaiting) {
        this._autoRootWaiting = true;
        doc.addEventListener("readystatechange", this._autoRootCreate);
      }
      return void 0;
    };
    this._onRootDispose = (root) => {
      delete this._roots[root.id];
    };
    this._tabster = tabster;
    this._win = tabster.getWindow;
    this._autoRoot = autoRoot;
    tabster.queueInit(() => {
      if (this._autoRoot) {
        this._autoRootCreate();
      }
    });
  }
  _autoRootUnwait(doc) {
    doc.removeEventListener("readystatechange", this._autoRootCreate);
    this._autoRootWaiting = false;
  }
  dispose() {
    const win = this._win();
    this._autoRootUnwait(win.document);
    delete this._autoRoot;
    Object.keys(this._roots).forEach((rootId) => {
      if (this._roots[rootId]) {
        this._roots[rootId].dispose();
        delete this._roots[rootId];
      }
    });
    this.rootById = {};
  }
  createRoot(element, props, sys) {
    const newRoot = new Root(this._tabster, element, this._onRootDispose, props, sys);
    this._roots[newRoot.id] = newRoot;
    if (this._forceDummy) {
      newRoot.addDummyInputs();
    }
    return newRoot;
  }
  addDummyInputs() {
    this._forceDummy = true;
    const roots = this._roots;
    for (const id of Object.keys(roots)) {
      roots[id].addDummyInputs();
    }
  }
  static getRootByUId(getWindow, id) {
    const tabster = getWindow().__tabsterInstance;
    return tabster && tabster.root.rootById[id];
  }
  /**
   * Fetches the tabster context for an element walking up its ancestors
   *
   * @param tabster Tabster instance
   * @param element The element the tabster context should represent
   * @param options Additional options
   * @returns undefined if the element is not a child of a tabster root, otherwise all applicable tabster behaviours and configurations
   */
  static getTabsterContext(tabster, element, options) {
    if (options === void 0) {
      options = {};
    }
    var _a, _b, _c, _d;
    if (!element.ownerDocument) {
      return void 0;
    }
    const {
      checkRtl,
      referenceElement
    } = options;
    const getParent2 = tabster.getParent;
    tabster.drainInitQueue();
    let root;
    let modalizer;
    let groupper;
    let mover;
    let excludedFromMover = false;
    let groupperBeforeMover;
    let modalizerInGroupper;
    let dirRightToLeft;
    let uncontrolled;
    let curElement = referenceElement || element;
    const ignoreKeydown = {};
    while (curElement && (!root || checkRtl)) {
      const tabsterOnElement = getTabsterOnElement(tabster, curElement);
      if (checkRtl && dirRightToLeft === void 0) {
        const dir = curElement.dir;
        if (dir) {
          dirRightToLeft = dir.toLowerCase() === "rtl";
        }
      }
      if (!tabsterOnElement) {
        curElement = getParent2(curElement);
        continue;
      }
      const tagName = curElement.tagName;
      if (tabsterOnElement.uncontrolled || tagName === "IFRAME" || tagName === "WEBVIEW") {
        uncontrolled = curElement;
      }
      if (!mover && ((_a = tabsterOnElement.focusable) === null || _a === void 0 ? void 0 : _a.excludeFromMover) && !groupper) {
        excludedFromMover = true;
      }
      const curModalizer = tabsterOnElement.modalizer;
      const curGroupper = tabsterOnElement.groupper;
      const curMover = tabsterOnElement.mover;
      if (!modalizer && curModalizer) {
        modalizer = curModalizer;
      }
      if (!groupper && curGroupper && (!modalizer || curModalizer)) {
        if (modalizer) {
          if (!curGroupper.isActive() && curGroupper.getProps().tabbability && modalizer.userId !== ((_b = tabster.modalizer) === null || _b === void 0 ? void 0 : _b.activeId)) {
            modalizer = void 0;
            groupper = curGroupper;
          }
          modalizerInGroupper = curGroupper;
        } else {
          groupper = curGroupper;
        }
      }
      if (!mover && curMover && (!modalizer || curModalizer) && (!curGroupper || curElement !== element) && curElement.contains(element)) {
        mover = curMover;
        groupperBeforeMover = !!groupper && groupper !== curGroupper;
      }
      if (tabsterOnElement.root) {
        root = tabsterOnElement.root;
      }
      if ((_c = tabsterOnElement.focusable) === null || _c === void 0 ? void 0 : _c.ignoreKeydown) {
        Object.assign(ignoreKeydown, tabsterOnElement.focusable.ignoreKeydown);
      }
      curElement = getParent2(curElement);
    }
    if (!root) {
      const rootAPI = tabster.root;
      const autoRoot = rootAPI._autoRoot;
      if (autoRoot) {
        if ((_d = element.ownerDocument) === null || _d === void 0 ? void 0 : _d.body) {
          root = rootAPI._autoRootCreate();
        }
      }
    }
    if (groupper && !mover) {
      groupperBeforeMover = true;
    }
    const shouldIgnoreKeydown = (event) => !!ignoreKeydown[event.key];
    return root ? {
      root,
      modalizer,
      groupper,
      mover,
      groupperBeforeMover,
      modalizerInGroupper,
      rtl: checkRtl ? !!dirRightToLeft : void 0,
      uncontrolled,
      excludedFromMover,
      ignoreKeydown: shouldIgnoreKeydown
    } : void 0;
  }
  static getRoot(tabster, element) {
    var _a;
    const getParent2 = tabster.getParent;
    for (let el = element; el; el = getParent2(el)) {
      const root = (_a = getTabsterOnElement(tabster, el)) === null || _a === void 0 ? void 0 : _a.root;
      if (root) {
        return root;
      }
    }
    return void 0;
  }
  onRoot(root, removed) {
    if (removed) {
      delete this.rootById[root.uid];
    } else {
      this.rootById[root.uid] = root;
    }
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class Subscribable {
  constructor() {
    this._callbacks = [];
  }
  dispose() {
    this._callbacks = [];
    delete this._val;
  }
  subscribe(callback) {
    const callbacks = this._callbacks;
    const index = callbacks.indexOf(callback);
    if (index < 0) {
      callbacks.push(callback);
    }
  }
  subscribeFirst(callback) {
    const callbacks = this._callbacks;
    const index = callbacks.indexOf(callback);
    if (index >= 0) {
      callbacks.splice(index, 1);
    }
    callbacks.unshift(callback);
  }
  unsubscribe(callback) {
    const index = this._callbacks.indexOf(callback);
    if (index >= 0) {
      this._callbacks.splice(index, 1);
    }
  }
  setVal(val, detail) {
    if (this._val === val) {
      return;
    }
    this._val = val;
    this._callCallbacks(val, detail);
  }
  getVal() {
    return this._val;
  }
  trigger(val, detail) {
    this._callCallbacks(val, detail);
  }
  _callCallbacks(val, detail) {
    this._callbacks.forEach((callback) => callback(val, detail));
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class FocusableAPI {
  constructor(tabster) {
    this._tabster = tabster;
  }
  dispose() {
  }
  getProps(element) {
    const tabsterOnElement = getTabsterOnElement(this._tabster, element);
    return tabsterOnElement && tabsterOnElement.focusable || {};
  }
  isFocusable(el, includeProgrammaticallyFocusable, noVisibleCheck, noAccessibleCheck) {
    if (matchesSelector(el, FOCUSABLE_SELECTOR) && (includeProgrammaticallyFocusable || el.tabIndex !== -1)) {
      return (noVisibleCheck || this.isVisible(el)) && (noAccessibleCheck || this.isAccessible(el));
    }
    return false;
  }
  isVisible(el) {
    if (!el.ownerDocument || el.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }
    if (isDisplayNone(el)) {
      return false;
    }
    const rect = el.ownerDocument.body.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return false;
    }
    return true;
  }
  isAccessible(el) {
    var _a;
    for (let e2 = el; e2; e2 = dom.getParentElement(e2)) {
      const tabsterOnElement = getTabsterOnElement(this._tabster, e2);
      if (this._isHidden(e2)) {
        return false;
      }
      const ignoreDisabled = (_a = tabsterOnElement === null || tabsterOnElement === void 0 ? void 0 : tabsterOnElement.focusable) === null || _a === void 0 ? void 0 : _a.ignoreAriaDisabled;
      if (!ignoreDisabled && this._isDisabled(e2)) {
        return false;
      }
    }
    return true;
  }
  _isDisabled(el) {
    return el.hasAttribute("disabled");
  }
  _isHidden(el) {
    var _a;
    const attrVal = el.getAttribute("aria-hidden");
    if (attrVal && attrVal.toLowerCase() === "true") {
      if (!((_a = this._tabster.modalizer) === null || _a === void 0 ? void 0 : _a.isAugmented(el))) {
        return true;
      }
    }
    return false;
  }
  findFirst(options, out) {
    return this.findElement({
      ...options
    }, out);
  }
  findLast(options, out) {
    return this.findElement({
      isBackward: true,
      ...options
    }, out);
  }
  findNext(options, out) {
    return this.findElement({
      ...options
    }, out);
  }
  findPrev(options, out) {
    return this.findElement({
      ...options,
      isBackward: true
    }, out);
  }
  findDefault(options, out) {
    return this.findElement({
      ...options,
      acceptCondition: (el) => this.isFocusable(el, options.includeProgrammaticallyFocusable) && !!this.getProps(el).isDefault
    }, out) || null;
  }
  findAll(options) {
    return this._findElements(true, options) || [];
  }
  findElement(options, out) {
    const found = this._findElements(false, options, out);
    return found ? found[0] : found;
  }
  _findElements(isFindAll, options, out) {
    var _a, _b, _c;
    const {
      container,
      currentElement = null,
      includeProgrammaticallyFocusable,
      useActiveModalizer,
      ignoreAccessibility,
      modalizerId,
      isBackward,
      onElement
    } = options;
    if (!out) {
      out = {};
    }
    const elements = [];
    let {
      acceptCondition
    } = options;
    const hasCustomCondition = !!acceptCondition;
    if (!container) {
      return null;
    }
    if (!acceptCondition) {
      acceptCondition = (el) => this.isFocusable(el, includeProgrammaticallyFocusable, false, ignoreAccessibility);
    }
    const acceptElementState = {
      container,
      modalizerUserId: modalizerId === void 0 && useActiveModalizer ? (_a = this._tabster.modalizer) === null || _a === void 0 ? void 0 : _a.activeId : modalizerId || ((_c = (_b = RootAPI.getTabsterContext(this._tabster, container)) === null || _b === void 0 ? void 0 : _b.modalizer) === null || _c === void 0 ? void 0 : _c.userId),
      from: currentElement || container,
      isBackward,
      isFindAll,
      acceptCondition,
      hasCustomCondition,
      includeProgrammaticallyFocusable,
      ignoreAccessibility,
      cachedGrouppers: {},
      cachedRadioGroups: {}
    };
    const walker = createElementTreeWalker(container.ownerDocument, container, (node) => this._acceptElement(node, acceptElementState));
    if (!walker) {
      return null;
    }
    const prepareForNextElement = (shouldContinueIfNotFound) => {
      var _a2, _b2;
      const foundElement = (_a2 = acceptElementState.foundElement) !== null && _a2 !== void 0 ? _a2 : acceptElementState.foundBackward;
      if (foundElement) {
        elements.push(foundElement);
      }
      if (isFindAll) {
        if (foundElement) {
          acceptElementState.found = false;
          delete acceptElementState.foundElement;
          delete acceptElementState.foundBackward;
          delete acceptElementState.fromCtx;
          acceptElementState.from = foundElement;
          if (onElement && !onElement(foundElement)) {
            return false;
          }
        }
        return !!(foundElement || shouldContinueIfNotFound);
      } else {
        if (foundElement && out) {
          out.uncontrolled = (_b2 = RootAPI.getTabsterContext(this._tabster, foundElement)) === null || _b2 === void 0 ? void 0 : _b2.uncontrolled;
        }
        return !!(shouldContinueIfNotFound && !foundElement);
      }
    };
    if (!currentElement) {
      out.outOfDOMOrder = true;
    }
    if (currentElement && dom.nodeContains(container, currentElement)) {
      walker.currentNode = currentElement;
    } else if (isBackward) {
      const lastChild = getLastChild$2(container);
      if (!lastChild) {
        return null;
      }
      if (this._acceptElement(lastChild, acceptElementState) === NodeFilter.FILTER_ACCEPT && !prepareForNextElement(true)) {
        if (acceptElementState.skippedFocusable) {
          out.outOfDOMOrder = true;
        }
        return elements;
      }
      walker.currentNode = lastChild;
    }
    do {
      if (isBackward) {
        walker.previousNode();
      } else {
        walker.nextNode();
      }
    } while (prepareForNextElement());
    if (acceptElementState.skippedFocusable) {
      out.outOfDOMOrder = true;
    }
    return elements.length ? elements : null;
  }
  _acceptElement(element, state) {
    var _a, _b, _c;
    if (state.found) {
      return NodeFilter.FILTER_ACCEPT;
    }
    const foundBackward = state.foundBackward;
    if (foundBackward && (element === foundBackward || !dom.nodeContains(foundBackward, element))) {
      state.found = true;
      state.foundElement = foundBackward;
      return NodeFilter.FILTER_ACCEPT;
    }
    const container = state.container;
    if (element === container) {
      return NodeFilter.FILTER_SKIP;
    }
    if (!dom.nodeContains(container, element)) {
      return NodeFilter.FILTER_REJECT;
    }
    if (getDummyInputContainer(element)) {
      return NodeFilter.FILTER_REJECT;
    }
    if (dom.nodeContains(state.rejectElementsFrom, element)) {
      return NodeFilter.FILTER_REJECT;
    }
    const ctx = state.currentCtx = RootAPI.getTabsterContext(this._tabster, element);
    if (!ctx) {
      return NodeFilter.FILTER_SKIP;
    }
    if (shouldIgnoreFocus(element)) {
      if (this.isFocusable(element, void 0, true, true)) {
        state.skippedFocusable = true;
      }
      return NodeFilter.FILTER_SKIP;
    }
    if (!state.hasCustomCondition && (element.tagName === "IFRAME" || element.tagName === "WEBVIEW")) {
      if (((_a = ctx.modalizer) === null || _a === void 0 ? void 0 : _a.userId) === ((_b = this._tabster.modalizer) === null || _b === void 0 ? void 0 : _b.activeId)) {
        state.found = true;
        state.rejectElementsFrom = state.foundElement = element;
        return NodeFilter.FILTER_ACCEPT;
      } else {
        return NodeFilter.FILTER_REJECT;
      }
    }
    if (!state.ignoreAccessibility && !this.isAccessible(element)) {
      if (this.isFocusable(element, false, true, true)) {
        state.skippedFocusable = true;
      }
      return NodeFilter.FILTER_REJECT;
    }
    let result;
    let fromCtx = state.fromCtx;
    if (!fromCtx) {
      fromCtx = state.fromCtx = RootAPI.getTabsterContext(this._tabster, state.from);
    }
    const fromMover = fromCtx === null || fromCtx === void 0 ? void 0 : fromCtx.mover;
    let groupper = ctx.groupper;
    let mover = ctx.mover;
    result = (_c = this._tabster.modalizer) === null || _c === void 0 ? void 0 : _c.acceptElement(element, state);
    if (result !== void 0) {
      state.skippedFocusable = true;
    }
    if (result === void 0 && (groupper || mover || fromMover)) {
      const groupperElement = groupper === null || groupper === void 0 ? void 0 : groupper.getElement();
      const fromMoverElement = fromMover === null || fromMover === void 0 ? void 0 : fromMover.getElement();
      let moverElement = mover === null || mover === void 0 ? void 0 : mover.getElement();
      if (moverElement && dom.nodeContains(fromMoverElement, moverElement) && dom.nodeContains(container, fromMoverElement) && (!groupperElement || !mover || dom.nodeContains(fromMoverElement, groupperElement))) {
        mover = fromMover;
        moverElement = fromMoverElement;
      }
      if (groupperElement && (groupperElement === container || !dom.nodeContains(container, groupperElement))) {
        groupper = void 0;
      }
      if (moverElement && !dom.nodeContains(container, moverElement)) {
        mover = void 0;
      }
      if (groupper && mover) {
        if (moverElement && groupperElement && !dom.nodeContains(groupperElement, moverElement)) {
          mover = void 0;
        } else {
          groupper = void 0;
        }
      }
      if (groupper) {
        result = groupper.acceptElement(element, state);
      }
      if (mover) {
        result = mover.acceptElement(element, state);
      }
    }
    if (result === void 0) {
      result = state.acceptCondition(element) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      if (result === NodeFilter.FILTER_SKIP && this.isFocusable(element, false, true, true)) {
        state.skippedFocusable = true;
      }
    }
    if (result === NodeFilter.FILTER_ACCEPT && !state.found) {
      if (!state.isFindAll && isRadio(element) && !element.checked) {
        const radioGroupName = element.name;
        let radioGroup = state.cachedRadioGroups[radioGroupName];
        if (!radioGroup) {
          radioGroup = getRadioButtonGroup(element);
          if (radioGroup) {
            state.cachedRadioGroups[radioGroupName] = radioGroup;
          }
        }
        if ((radioGroup === null || radioGroup === void 0 ? void 0 : radioGroup.checked) && radioGroup.checked !== element) {
          return NodeFilter.FILTER_SKIP;
        }
      }
      if (state.isBackward) {
        state.foundBackward = element;
        result = NodeFilter.FILTER_SKIP;
      } else {
        state.found = true;
        state.foundElement = element;
      }
    }
    return result;
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const Keys = {
  Tab: "Tab",
  Enter: "Enter",
  Escape: "Escape",
  Space: " ",
  PageUp: "PageUp",
  PageDown: "PageDown",
  End: "End",
  Home: "Home",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown"
};
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function getUncontrolledCompletelyContainer(tabster, element) {
  var _a;
  const getParent2 = tabster.getParent;
  let el = element;
  do {
    const uncontrolledOnElement = (_a = getTabsterOnElement(tabster, el)) === null || _a === void 0 ? void 0 : _a.uncontrolled;
    if (uncontrolledOnElement && tabster.uncontrolled.isUncontrolledCompletely(el, !!uncontrolledOnElement.completely)) {
      return el;
    }
    el = getParent2(el);
  } while (el);
  return void 0;
}
const AsyncFocusIntentPriorityBySource = {
  [AsyncFocusSources.Restorer]: 0,
  [AsyncFocusSources.Deloser]: 1,
  [AsyncFocusSources.EscapeGroupper]: 2
};
class FocusedElementState extends Subscribable {
  constructor(tabster, getWindow) {
    super();
    this._init = () => {
      const win = this._win();
      const doc = win.document;
      doc.addEventListener(KEYBORG_FOCUSIN, this._onFocusIn, true);
      doc.addEventListener(KEYBORG_FOCUSOUT, this._onFocusOut, true);
      win.addEventListener("keydown", this._onKeyDown, true);
      const activeElement = dom.getActiveElement(doc);
      if (activeElement && activeElement !== doc.body) {
        this._setFocusedElement(activeElement);
      }
      this.subscribe(this._onChanged);
    };
    this._onFocusIn = (e2) => {
      const target = e2.composedPath()[0];
      if (target) {
        this._setFocusedElement(target, e2.detail.relatedTarget, e2.detail.isFocusedProgrammatically);
      }
    };
    this._onFocusOut = (e2) => {
      var _a;
      this._setFocusedElement(void 0, (_a = e2.detail) === null || _a === void 0 ? void 0 : _a.originalEvent.relatedTarget);
    };
    this._validateFocusedElement = (element) => {
    };
    this._onKeyDown = (event) => {
      if (event.key !== Keys.Tab || event.ctrlKey) {
        return;
      }
      const currentElement = this.getVal();
      if (!currentElement || !currentElement.ownerDocument || currentElement.contentEditable === "true") {
        return;
      }
      const tabster2 = this._tabster;
      const controlTab = tabster2.controlTab;
      const ctx = RootAPI.getTabsterContext(tabster2, currentElement);
      if (!ctx || ctx.ignoreKeydown(event)) {
        return;
      }
      const isBackward = event.shiftKey;
      const next = FocusedElementState.findNextTabbable(tabster2, ctx, void 0, currentElement, void 0, isBackward, true);
      const rootElement = ctx.root.getElement();
      if (!rootElement) {
        return;
      }
      const nextElement = next === null || next === void 0 ? void 0 : next.element;
      const uncontrolledCompletelyContainer = getUncontrolledCompletelyContainer(tabster2, currentElement);
      if (nextElement) {
        const nextUncontrolled = next.uncontrolled;
        if (ctx.uncontrolled || dom.nodeContains(nextUncontrolled, currentElement)) {
          if (!next.outOfDOMOrder && nextUncontrolled === ctx.uncontrolled || uncontrolledCompletelyContainer && !dom.nodeContains(uncontrolledCompletelyContainer, nextElement)) {
            return;
          }
          DummyInputManager.addPhantomDummyWithTarget(tabster2, currentElement, isBackward, nextElement);
          return;
        }
        if (nextUncontrolled || nextElement.tagName === "IFRAME") {
          if (rootElement.dispatchEvent(new TabsterMoveFocusEvent({
            by: "root",
            owner: rootElement,
            next: nextElement,
            relatedEvent: event
          }))) {
            DummyInputManager.moveWithPhantomDummy(this._tabster, nextUncontrolled !== null && nextUncontrolled !== void 0 ? nextUncontrolled : nextElement, false, isBackward, event);
          }
          return;
        }
        if (controlTab || (next === null || next === void 0 ? void 0 : next.outOfDOMOrder)) {
          if (rootElement.dispatchEvent(new TabsterMoveFocusEvent({
            by: "root",
            owner: rootElement,
            next: nextElement,
            relatedEvent: event
          }))) {
            event.preventDefault();
            event.stopImmediatePropagation();
            nativeFocus(nextElement);
          }
        }
      } else {
        if (!uncontrolledCompletelyContainer && rootElement.dispatchEvent(new TabsterMoveFocusEvent({
          by: "root",
          owner: rootElement,
          next: null,
          relatedEvent: event
        }))) {
          ctx.root.moveOutWithDefaultAction(isBackward, event);
        }
      }
    };
    this._onChanged = (element, detail) => {
      var _a, _b;
      if (element) {
        element.dispatchEvent(new TabsterFocusInEvent(detail));
      } else {
        const last = (_a = this._lastVal) === null || _a === void 0 ? void 0 : _a.get();
        if (last) {
          const d2 = {
            ...detail
          };
          const lastCtx = RootAPI.getTabsterContext(this._tabster, last);
          const modalizerId = (_b = lastCtx === null || lastCtx === void 0 ? void 0 : lastCtx.modalizer) === null || _b === void 0 ? void 0 : _b.userId;
          if (modalizerId) {
            d2.modalizerId = modalizerId;
          }
          last.dispatchEvent(new TabsterFocusOutEvent(d2));
        }
      }
    };
    this._tabster = tabster;
    this._win = getWindow;
    tabster.queueInit(this._init);
  }
  dispose() {
    super.dispose();
    const win = this._win();
    const doc = win.document;
    doc.removeEventListener(KEYBORG_FOCUSIN, this._onFocusIn, true);
    doc.removeEventListener(KEYBORG_FOCUSOUT, this._onFocusOut, true);
    win.removeEventListener("keydown", this._onKeyDown, true);
    this.unsubscribe(this._onChanged);
    const asyncFocus = this._asyncFocus;
    if (asyncFocus) {
      win.clearTimeout(asyncFocus.timeout);
      delete this._asyncFocus;
    }
    delete FocusedElementState._lastResetElement;
    delete this._nextVal;
    delete this._lastVal;
  }
  static forgetMemorized(instance, parent) {
    var _a, _b;
    let wel = FocusedElementState._lastResetElement;
    let el = wel && wel.get();
    if (el && dom.nodeContains(parent, el)) {
      delete FocusedElementState._lastResetElement;
    }
    el = (_b = (_a = instance._nextVal) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.get();
    if (el && dom.nodeContains(parent, el)) {
      delete instance._nextVal;
    }
    wel = instance._lastVal;
    el = wel && wel.get();
    if (el && dom.nodeContains(parent, el)) {
      delete instance._lastVal;
    }
  }
  getFocusedElement() {
    return this.getVal();
  }
  getLastFocusedElement() {
    var _a;
    let el = (_a = this._lastVal) === null || _a === void 0 ? void 0 : _a.get();
    if (!el || el && !documentContains(el.ownerDocument, el)) {
      this._lastVal = el = void 0;
    }
    return el;
  }
  focus(element, noFocusedProgrammaticallyFlag, noAccessibleCheck) {
    if (!this._tabster.focusable.isFocusable(element, noFocusedProgrammaticallyFlag, false, noAccessibleCheck)) {
      return false;
    }
    element.focus();
    return true;
  }
  focusDefault(container) {
    const el = this._tabster.focusable.findDefault({
      container
    });
    if (el) {
      this._tabster.focusedElement.focus(el);
      return true;
    }
    return false;
  }
  getFirstOrLastTabbable(isFirst, props) {
    var _a;
    const {
      container,
      ignoreAccessibility
    } = props;
    let toFocus;
    if (container) {
      const ctx = RootAPI.getTabsterContext(this._tabster, container);
      if (ctx) {
        toFocus = (_a = FocusedElementState.findNextTabbable(this._tabster, ctx, container, void 0, void 0, !isFirst, ignoreAccessibility)) === null || _a === void 0 ? void 0 : _a.element;
      }
    }
    if (toFocus && !dom.nodeContains(container, toFocus)) {
      toFocus = void 0;
    }
    return toFocus || void 0;
  }
  _focusFirstOrLast(isFirst, props) {
    const toFocus = this.getFirstOrLastTabbable(isFirst, props);
    if (toFocus) {
      this.focus(toFocus, false, true);
      return true;
    }
    return false;
  }
  focusFirst(props) {
    return this._focusFirstOrLast(true, props);
  }
  focusLast(props) {
    return this._focusFirstOrLast(false, props);
  }
  resetFocus(container) {
    if (!this._tabster.focusable.isVisible(container)) {
      return false;
    }
    if (!this._tabster.focusable.isFocusable(container, true, true, true)) {
      const prevTabIndex = container.getAttribute("tabindex");
      const prevAriaHidden = container.getAttribute("aria-hidden");
      container.tabIndex = -1;
      container.setAttribute("aria-hidden", "true");
      FocusedElementState._lastResetElement = new WeakHTMLElement(this._win, container);
      this.focus(container, true, true);
      this._setOrRemoveAttribute(container, "tabindex", prevTabIndex);
      this._setOrRemoveAttribute(container, "aria-hidden", prevAriaHidden);
    } else {
      this.focus(container);
    }
    return true;
  }
  requestAsyncFocus(source, callback, delay) {
    const win = this._tabster.getWindow();
    const currentAsyncFocus = this._asyncFocus;
    if (currentAsyncFocus) {
      if (AsyncFocusIntentPriorityBySource[source] > AsyncFocusIntentPriorityBySource[currentAsyncFocus.source]) {
        return;
      }
      win.clearTimeout(currentAsyncFocus.timeout);
    }
    this._asyncFocus = {
      source,
      callback,
      timeout: win.setTimeout(() => {
        this._asyncFocus = void 0;
        callback();
      }, delay)
    };
  }
  cancelAsyncFocus(source) {
    const asyncFocus = this._asyncFocus;
    if ((asyncFocus === null || asyncFocus === void 0 ? void 0 : asyncFocus.source) === source) {
      this._tabster.getWindow().clearTimeout(asyncFocus.timeout);
      this._asyncFocus = void 0;
    }
  }
  _setOrRemoveAttribute(element, name, value) {
    if (value === null) {
      element.removeAttribute(name);
    } else {
      element.setAttribute(name, value);
    }
  }
  _setFocusedElement(element, relatedTarget, isFocusedProgrammatically) {
    var _a, _b;
    if (this._tabster._noop) {
      return;
    }
    const detail = {
      relatedTarget
    };
    if (element) {
      const lastResetElement = (_a = FocusedElementState._lastResetElement) === null || _a === void 0 ? void 0 : _a.get();
      FocusedElementState._lastResetElement = void 0;
      if (lastResetElement === element || shouldIgnoreFocus(element)) {
        return;
      }
      detail.isFocusedProgrammatically = isFocusedProgrammatically;
      const ctx = RootAPI.getTabsterContext(this._tabster, element);
      const modalizerId = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.modalizer) === null || _b === void 0 ? void 0 : _b.userId;
      if (modalizerId) {
        detail.modalizerId = modalizerId;
      }
    }
    const nextVal = this._nextVal = {
      element: element ? new WeakHTMLElement(this._win, element) : void 0,
      detail
    };
    if (element && element !== this._val) {
      this._validateFocusedElement(element);
    }
    if (this._nextVal === nextVal) {
      this.setVal(element, detail);
    }
    this._nextVal = void 0;
  }
  setVal(val, detail) {
    super.setVal(val, detail);
    if (val) {
      this._lastVal = new WeakHTMLElement(this._win, val);
    }
  }
  static findNextTabbable(tabster, ctx, container, currentElement, referenceElement, isBackward, ignoreAccessibility) {
    const actualContainer = container || ctx.root.getElement();
    if (!actualContainer) {
      return null;
    }
    let next = null;
    const isTabbingTimer = FocusedElementState._isTabbingTimer;
    const win = tabster.getWindow();
    if (isTabbingTimer) {
      win.clearTimeout(isTabbingTimer);
    }
    FocusedElementState.isTabbing = true;
    FocusedElementState._isTabbingTimer = win.setTimeout(() => {
      delete FocusedElementState._isTabbingTimer;
      FocusedElementState.isTabbing = false;
    }, 0);
    const modalizer = ctx.modalizer;
    const groupper = ctx.groupper;
    const mover = ctx.mover;
    const callFindNext = (what) => {
      next = what.findNextTabbable(currentElement, referenceElement, isBackward, ignoreAccessibility);
      if (currentElement && !(next === null || next === void 0 ? void 0 : next.element)) {
        const parentElement = what !== modalizer && dom.getParentElement(what.getElement());
        if (parentElement) {
          const parentCtx = RootAPI.getTabsterContext(tabster, currentElement, {
            referenceElement: parentElement
          });
          if (parentCtx) {
            const currentScopeElement = what.getElement();
            const newCurrent = isBackward ? currentScopeElement : currentScopeElement && getLastChild$2(currentScopeElement) || currentScopeElement;
            if (newCurrent) {
              next = FocusedElementState.findNextTabbable(tabster, parentCtx, container, newCurrent, parentElement, isBackward, ignoreAccessibility);
              if (next) {
                next.outOfDOMOrder = true;
              }
            }
          }
        }
      }
    };
    if (groupper && mover) {
      callFindNext(ctx.groupperBeforeMover ? groupper : mover);
    } else if (groupper) {
      callFindNext(groupper);
    } else if (mover) {
      callFindNext(mover);
    } else if (modalizer) {
      callFindNext(modalizer);
    } else {
      const findProps = {
        container: actualContainer,
        currentElement,
        referenceElement,
        ignoreAccessibility,
        useActiveModalizer: true
      };
      const findPropsOut = {};
      const nextElement = tabster.focusable[isBackward ? "findPrev" : "findNext"](findProps, findPropsOut);
      next = {
        element: nextElement,
        outOfDOMOrder: findPropsOut.outOfDOMOrder,
        uncontrolled: findPropsOut.uncontrolled
      };
    }
    return next;
  }
}
FocusedElementState.isTabbing = false;
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class GroupperDummyManager extends DummyInputManager {
  constructor(element, groupper, tabster, sys) {
    super(tabster, element, DummyInputManagerPriorities.Groupper, sys, true);
    this._setHandlers((dummyInput, isBackward, relatedTarget) => {
      var _a, _b;
      const container = element.get();
      const input = dummyInput.input;
      if (container && input) {
        const ctx = RootAPI.getTabsterContext(tabster, input);
        if (ctx) {
          let next;
          next = (_a = groupper.findNextTabbable(relatedTarget || void 0, void 0, isBackward, true)) === null || _a === void 0 ? void 0 : _a.element;
          if (!next) {
            next = (_b = FocusedElementState.findNextTabbable(tabster, ctx, void 0, dummyInput.isOutside ? input : getAdjacentElement(container, !isBackward), void 0, isBackward, true)) === null || _b === void 0 ? void 0 : _b.element;
          }
          if (next) {
            nativeFocus(next);
          }
        }
      }
    });
  }
}
class Groupper extends TabsterPart {
  constructor(tabster, element, onDispose, props, sys) {
    super(tabster, element, props);
    this._shouldTabInside = false;
    this.makeTabbable(false);
    this._onDispose = onDispose;
    if (!tabster.controlTab) {
      this.dummyManager = new GroupperDummyManager(this._element, this, tabster, sys);
    }
  }
  dispose() {
    var _a;
    this._onDispose(this);
    this._element.get();
    (_a = this.dummyManager) === null || _a === void 0 ? void 0 : _a.dispose();
    delete this.dummyManager;
    delete this._first;
  }
  findNextTabbable(currentElement, referenceElement, isBackward, ignoreAccessibility) {
    const groupperElement = this.getElement();
    if (!groupperElement) {
      return null;
    }
    const currentIsDummy = getDummyInputContainer(currentElement) === groupperElement;
    if (!this._shouldTabInside && currentElement && dom.nodeContains(groupperElement, currentElement) && !currentIsDummy) {
      return {
        element: void 0,
        outOfDOMOrder: true
      };
    }
    const groupperFirstFocusable = this.getFirst(true);
    if (!currentElement || !dom.nodeContains(groupperElement, currentElement) || currentIsDummy) {
      return {
        element: groupperFirstFocusable,
        outOfDOMOrder: true
      };
    }
    const tabster = this._tabster;
    let next = null;
    let outOfDOMOrder = false;
    let uncontrolled;
    if (this._shouldTabInside && groupperFirstFocusable) {
      const findProps = {
        container: groupperElement,
        currentElement,
        referenceElement,
        ignoreAccessibility,
        useActiveModalizer: true
      };
      const findPropsOut = {};
      next = tabster.focusable[isBackward ? "findPrev" : "findNext"](findProps, findPropsOut);
      outOfDOMOrder = !!findPropsOut.outOfDOMOrder;
      if (!next && this._props.tabbability === GroupperTabbabilities.LimitedTrapFocus) {
        next = tabster.focusable[isBackward ? "findLast" : "findFirst"]({
          container: groupperElement,
          ignoreAccessibility,
          useActiveModalizer: true
        }, findPropsOut);
        outOfDOMOrder = true;
      }
      uncontrolled = findPropsOut.uncontrolled;
    }
    return {
      element: next,
      uncontrolled,
      outOfDOMOrder
    };
  }
  makeTabbable(isTabbable) {
    this._shouldTabInside = isTabbable || !this._props.tabbability;
  }
  isActive(noIfFirstIsFocused) {
    var _a;
    const element = this.getElement() || null;
    let isParentActive = true;
    for (let e2 = dom.getParentElement(element); e2; e2 = dom.getParentElement(e2)) {
      const g2 = (_a = getTabsterOnElement(this._tabster, e2)) === null || _a === void 0 ? void 0 : _a.groupper;
      if (g2) {
        if (!g2._shouldTabInside) {
          isParentActive = false;
        }
      }
    }
    let ret = isParentActive ? this._props.tabbability ? this._shouldTabInside : false : void 0;
    if (ret && noIfFirstIsFocused) {
      const focused = this._tabster.focusedElement.getFocusedElement();
      if (focused) {
        ret = focused !== this.getFirst(true);
      }
    }
    return ret;
  }
  getFirst(orContainer) {
    var _a;
    const groupperElement = this.getElement();
    let first;
    if (groupperElement) {
      if (orContainer && this._tabster.focusable.isFocusable(groupperElement)) {
        return groupperElement;
      }
      first = (_a = this._first) === null || _a === void 0 ? void 0 : _a.get();
      if (!first) {
        first = this._tabster.focusable.findFirst({
          container: groupperElement,
          useActiveModalizer: true
        }) || void 0;
        if (first) {
          this.setFirst(first);
        }
      }
    }
    return first;
  }
  setFirst(element) {
    if (element) {
      this._first = new WeakHTMLElement(this._tabster.getWindow, element);
    } else {
      delete this._first;
    }
  }
  acceptElement(element, state) {
    const cachedGrouppers = state.cachedGrouppers;
    const parentElement = dom.getParentElement(this.getElement());
    const parentCtx = parentElement && RootAPI.getTabsterContext(this._tabster, parentElement);
    const parentCtxGroupper = parentCtx === null || parentCtx === void 0 ? void 0 : parentCtx.groupper;
    const parentGroupper = (parentCtx === null || parentCtx === void 0 ? void 0 : parentCtx.groupperBeforeMover) ? parentCtxGroupper : void 0;
    let parentGroupperElement;
    const getIsActive = (groupper) => {
      let cached = cachedGrouppers[groupper.id];
      let isActive2;
      if (cached) {
        isActive2 = cached.isActive;
      } else {
        isActive2 = this.isActive(true);
        cached = cachedGrouppers[groupper.id] = {
          isActive: isActive2
        };
      }
      return isActive2;
    };
    if (parentGroupper) {
      parentGroupperElement = parentGroupper.getElement();
      if (!getIsActive(parentGroupper) && parentGroupperElement && state.container !== parentGroupperElement && dom.nodeContains(state.container, parentGroupperElement)) {
        state.skippedFocusable = true;
        return NodeFilter.FILTER_REJECT;
      }
    }
    const isActive = getIsActive(this);
    const groupperElement = this.getElement();
    if (groupperElement) {
      if (isActive !== true) {
        if (groupperElement === element && parentCtxGroupper) {
          if (!parentGroupperElement) {
            parentGroupperElement = parentCtxGroupper.getElement();
          }
          if (parentGroupperElement && !getIsActive(parentCtxGroupper) && dom.nodeContains(state.container, parentGroupperElement) && parentGroupperElement !== state.container) {
            state.skippedFocusable = true;
            return NodeFilter.FILTER_REJECT;
          }
        }
        if (groupperElement !== element && dom.nodeContains(groupperElement, element)) {
          state.skippedFocusable = true;
          return NodeFilter.FILTER_REJECT;
        }
        const cached = cachedGrouppers[this.id];
        let first;
        if ("first" in cached) {
          first = cached.first;
        } else {
          first = cached.first = this.getFirst(true);
        }
        if (first && state.acceptCondition(first)) {
          state.rejectElementsFrom = groupperElement;
          state.skippedFocusable = true;
          if (first !== state.from) {
            state.found = true;
            state.foundElement = first;
            return NodeFilter.FILTER_ACCEPT;
          } else {
            return NodeFilter.FILTER_REJECT;
          }
        }
      }
    }
    return void 0;
  }
}
class GroupperAPI {
  constructor(tabster, getWindow) {
    this._current = {};
    this._grouppers = {};
    this._init = () => {
      const win = this._win();
      this._tabster.focusedElement.subscribeFirst(this._onFocus);
      const doc = win.document;
      const activeElement = dom.getActiveElement(doc);
      if (activeElement) {
        this._onFocus(activeElement);
      }
      doc.addEventListener("mousedown", this._onMouseDown, true);
      win.addEventListener("keydown", this._onKeyDown, true);
      win.addEventListener(GroupperMoveFocusEventName, this._onMoveFocus);
    };
    this._onGroupperDispose = (groupper) => {
      delete this._grouppers[groupper.id];
    };
    this._onFocus = (element) => {
      if (element) {
        this._updateCurrent(element, true, true);
      }
    };
    this._onMouseDown = (e2) => {
      if (e2.target) {
        this._updateCurrent(e2.target, true);
      }
    };
    this._onKeyDown = (event) => {
      if (event.key !== Keys.Enter && event.key !== Keys.Escape) {
        return;
      }
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        return;
      }
      const element = this._tabster.focusedElement.getFocusedElement();
      if (element) {
        this.handleKeyPress(element, event);
      }
    };
    this._onMoveFocus = (e2) => {
      var _a;
      const element = e2.composedPath()[0];
      const action = (_a = e2.detail) === null || _a === void 0 ? void 0 : _a.action;
      if (element && action !== void 0 && !e2.defaultPrevented) {
        if (action === GroupperMoveFocusActions.Enter) {
          this._enterGroupper(element);
        } else {
          this._escapeGroupper(element);
        }
        e2.stopImmediatePropagation();
      }
    };
    this._tabster = tabster;
    this._win = getWindow;
    tabster.queueInit(this._init);
  }
  dispose() {
    const win = this._win();
    this._tabster.focusedElement.cancelAsyncFocus(AsyncFocusSources.EscapeGroupper);
    this._current = {};
    if (this._updateTimer) {
      win.clearTimeout(this._updateTimer);
      delete this._updateTimer;
    }
    this._tabster.focusedElement.unsubscribe(this._onFocus);
    win.document.removeEventListener("mousedown", this._onMouseDown, true);
    win.removeEventListener("keydown", this._onKeyDown, true);
    win.removeEventListener(GroupperMoveFocusEventName, this._onMoveFocus);
    Object.keys(this._grouppers).forEach((groupperId) => {
      if (this._grouppers[groupperId]) {
        this._grouppers[groupperId].dispose();
        delete this._grouppers[groupperId];
      }
    });
  }
  createGroupper(element, props, sys) {
    const newGroupper = new Groupper(this._tabster, element, this._onGroupperDispose, props, sys);
    this._grouppers[newGroupper.id] = newGroupper;
    const focusedElement = this._tabster.focusedElement.getFocusedElement();
    if (focusedElement && dom.nodeContains(element, focusedElement) && !this._updateTimer) {
      this._updateTimer = this._win().setTimeout(() => {
        delete this._updateTimer;
        if (focusedElement === this._tabster.focusedElement.getFocusedElement()) {
          this._updateCurrent(focusedElement, true, true);
        }
      }, 0);
    }
    return newGroupper;
  }
  forgetCurrentGrouppers() {
    this._current = {};
  }
  _updateCurrent(element, includeTarget, checkTarget) {
    var _a;
    if (this._updateTimer) {
      this._win().clearTimeout(this._updateTimer);
      delete this._updateTimer;
    }
    const newIds = {};
    let isTarget = true;
    for (let el = element; el; el = dom.getParentElement(el)) {
      const groupper = (_a = getTabsterOnElement(this._tabster, el)) === null || _a === void 0 ? void 0 : _a.groupper;
      if (groupper) {
        newIds[groupper.id] = true;
        if (isTarget && checkTarget && el !== element) {
          isTarget = false;
        }
        if (includeTarget || !isTarget) {
          this._current[groupper.id] = groupper;
          const isTabbable = groupper.isActive() || element !== el && (!groupper.getProps().delegated || groupper.getFirst(false) !== element);
          groupper.makeTabbable(isTabbable);
        }
        isTarget = false;
      }
    }
    for (const id of Object.keys(this._current)) {
      const groupper = this._current[id];
      if (!(groupper.id in newIds)) {
        groupper.makeTabbable(false);
        groupper.setFirst(void 0);
        delete this._current[id];
      }
    }
  }
  _enterGroupper(element, relatedEvent) {
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, element);
    const groupper = (ctx === null || ctx === void 0 ? void 0 : ctx.groupper) || (ctx === null || ctx === void 0 ? void 0 : ctx.modalizerInGroupper);
    const groupperElement = groupper === null || groupper === void 0 ? void 0 : groupper.getElement();
    if (groupper && groupperElement && (element === groupperElement || groupper.getProps().delegated && element === groupper.getFirst(false))) {
      const next = tabster.focusable.findNext({
        container: groupperElement,
        currentElement: element,
        useActiveModalizer: true
      });
      if (next && (!relatedEvent || relatedEvent && groupperElement.dispatchEvent(new TabsterMoveFocusEvent({
        by: "groupper",
        owner: groupperElement,
        next,
        relatedEvent
      })))) {
        if (relatedEvent) {
          relatedEvent.preventDefault();
          relatedEvent.stopImmediatePropagation();
        }
        next.focus();
        return next;
      }
    }
    return null;
  }
  _escapeGroupper(element, relatedEvent, fromModalizer) {
    var _a;
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, element);
    const modalizerInGroupper = ctx === null || ctx === void 0 ? void 0 : ctx.modalizerInGroupper;
    let groupper = (ctx === null || ctx === void 0 ? void 0 : ctx.groupper) || modalizerInGroupper;
    const groupperElement = groupper === null || groupper === void 0 ? void 0 : groupper.getElement();
    if (groupper && groupperElement && dom.nodeContains(groupperElement, element)) {
      let next;
      if (element !== groupperElement || fromModalizer) {
        next = groupper.getFirst(true);
      } else {
        const parentElement = dom.getParentElement(groupperElement);
        const parentCtx = parentElement ? RootAPI.getTabsterContext(tabster, parentElement) : void 0;
        groupper = parentCtx === null || parentCtx === void 0 ? void 0 : parentCtx.groupper;
        next = groupper === null || groupper === void 0 ? void 0 : groupper.getFirst(true);
      }
      if (next && (!relatedEvent || relatedEvent && groupperElement.dispatchEvent(new TabsterMoveFocusEvent({
        by: "groupper",
        owner: groupperElement,
        next,
        relatedEvent
      })))) {
        if (groupper) {
          groupper.makeTabbable(false);
          if (modalizerInGroupper) {
            (_a = tabster.modalizer) === null || _a === void 0 ? void 0 : _a.setActive(void 0);
          }
        }
        next.focus();
        return next;
      }
    }
    return null;
  }
  moveFocus(element, action) {
    return action === GroupperMoveFocusActions.Enter ? this._enterGroupper(element) : this._escapeGroupper(element);
  }
  handleKeyPress(element, event, fromModalizer) {
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, element);
    if (ctx && ((ctx === null || ctx === void 0 ? void 0 : ctx.groupper) || (ctx === null || ctx === void 0 ? void 0 : ctx.modalizerInGroupper))) {
      tabster.focusedElement.cancelAsyncFocus(AsyncFocusSources.EscapeGroupper);
      if (ctx.ignoreKeydown(event)) {
        return;
      }
      if (event.key === Keys.Enter) {
        this._enterGroupper(element, event);
      } else if (event.key === Keys.Escape) {
        const focusedElement = tabster.focusedElement.getFocusedElement();
        tabster.focusedElement.requestAsyncFocus(AsyncFocusSources.EscapeGroupper, () => {
          if (focusedElement !== tabster.focusedElement.getFocusedElement() && // A part of Modalizer that has called this handler to escape the active groupper
          // might have been removed from DOM, if the focus is on body, we still want to handle Esc.
          (fromModalizer && !focusedElement || !fromModalizer)) {
            return;
          }
          this._escapeGroupper(element, event, fromModalizer);
        }, 0);
      }
    }
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class KeyboardNavigationState extends Subscribable {
  constructor(getWindow) {
    super();
    this._onChange = (isNavigatingWithKeyboard) => {
      this.setVal(isNavigatingWithKeyboard, void 0);
    };
    this._keyborg = createKeyborg(getWindow());
    this._keyborg.subscribe(this._onChange);
  }
  dispose() {
    super.dispose();
    if (this._keyborg) {
      this._keyborg.unsubscribe(this._onChange);
      disposeKeyborg(this._keyborg);
      delete this._keyborg;
    }
  }
  setNavigatingWithKeyboard(isNavigatingWithKeyboard) {
    var _a;
    (_a = this._keyborg) === null || _a === void 0 ? void 0 : _a.setVal(isNavigatingWithKeyboard);
  }
  isNavigatingWithKeyboard() {
    var _a;
    return !!((_a = this._keyborg) === null || _a === void 0 ? void 0 : _a.isNavigatingWithKeyboard());
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
let _wasFocusedCounter = 0;
const _ariaHidden = "aria-hidden";
class ModalizerDummyManager extends DummyInputManager {
  constructor(element, tabster, sys) {
    super(tabster, element, DummyInputManagerPriorities.Modalizer, sys);
    this._setHandlers((dummyInput, isBackward) => {
      var _a, _b;
      const el = element.get();
      const container = el && ((_a = RootAPI.getRoot(tabster, el)) === null || _a === void 0 ? void 0 : _a.getElement());
      const input = dummyInput.input;
      let toFocus;
      if (container && input) {
        const dummyContainer = getDummyInputContainer(input);
        const ctx = RootAPI.getTabsterContext(tabster, dummyContainer || input);
        if (ctx) {
          toFocus = (_b = FocusedElementState.findNextTabbable(tabster, ctx, container, input, void 0, isBackward, true)) === null || _b === void 0 ? void 0 : _b.element;
        }
        if (toFocus) {
          nativeFocus(toFocus);
        }
      }
    });
  }
}
class Modalizer extends TabsterPart {
  constructor(tabster, element, onDispose, props, sys, activeElements) {
    super(tabster, element, props);
    this._wasFocused = 0;
    this.userId = props.id;
    this._onDispose = onDispose;
    this._activeElements = activeElements;
    if (!tabster.controlTab) {
      this.dummyManager = new ModalizerDummyManager(this._element, tabster, sys);
    }
  }
  makeActive(isActive) {
    if (this._isActive !== isActive) {
      this._isActive = isActive;
      const element = this.getElement();
      if (element) {
        const activeElements = this._activeElements;
        const index = activeElements.map((e2) => e2.get()).indexOf(element);
        if (isActive) {
          if (index < 0) {
            activeElements.push(new WeakHTMLElement(this._tabster.getWindow, element));
          }
        } else {
          if (index >= 0) {
            activeElements.splice(index, 1);
          }
        }
      }
      this._dispatchEvent(isActive);
    }
  }
  focused(noIncrement) {
    if (!noIncrement) {
      this._wasFocused = ++_wasFocusedCounter;
    }
    return this._wasFocused;
  }
  setProps(props) {
    if (props.id) {
      this.userId = props.id;
    }
    this._props = {
      ...props
    };
  }
  dispose() {
    var _a;
    this.makeActive(false);
    this._onDispose(this);
    (_a = this.dummyManager) === null || _a === void 0 ? void 0 : _a.dispose();
    delete this.dummyManager;
    this._activeElements = [];
    this._remove();
  }
  isActive() {
    return !!this._isActive;
  }
  contains(element) {
    return dom.nodeContains(this.getElement(), element);
  }
  findNextTabbable(currentElement, referenceElement, isBackward, ignoreAccessibility) {
    var _a, _b;
    const modalizerElement = this.getElement();
    if (!modalizerElement) {
      return null;
    }
    const tabster = this._tabster;
    let next = null;
    let outOfDOMOrder = false;
    let uncontrolled;
    const container = currentElement && ((_a = RootAPI.getRoot(tabster, currentElement)) === null || _a === void 0 ? void 0 : _a.getElement());
    if (container) {
      const findProps = {
        container,
        currentElement,
        referenceElement,
        ignoreAccessibility,
        useActiveModalizer: true
      };
      const findPropsOut = {};
      next = tabster.focusable[isBackward ? "findPrev" : "findNext"](findProps, findPropsOut);
      if (!next && this._props.isTrapped && ((_b = tabster.modalizer) === null || _b === void 0 ? void 0 : _b.activeId)) {
        next = tabster.focusable[isBackward ? "findLast" : "findFirst"]({
          container,
          ignoreAccessibility,
          useActiveModalizer: true
        }, findPropsOut);
        outOfDOMOrder = true;
      } else {
        outOfDOMOrder = !!findPropsOut.outOfDOMOrder;
      }
      uncontrolled = findPropsOut.uncontrolled;
    }
    return {
      element: next,
      uncontrolled,
      outOfDOMOrder
    };
  }
  _dispatchEvent(isActive, allElements) {
    const element = this.getElement();
    let defaultPrevented = false;
    if (element) {
      const elements = allElements ? this._activeElements.map((e2) => e2.get()) : [element];
      for (const el of elements) {
        if (el) {
          const eventDetail = {
            id: this.userId,
            element
          };
          const event = isActive ? new ModalizerActiveEvent(eventDetail) : new ModalizerInactiveEvent(eventDetail);
          el.dispatchEvent(event);
          if (event.defaultPrevented) {
            defaultPrevented = true;
          }
        }
      }
    }
    return defaultPrevented;
  }
  _remove() {
  }
}
class ModalizerAPI {
  constructor(tabster, alwaysAccessibleSelector, accessibleCheck) {
    this._onModalizerDispose = (modalizer) => {
      const id = modalizer.id;
      const userId = modalizer.userId;
      const part = this._parts[userId];
      delete this._modalizers[id];
      if (part) {
        delete part[id];
        if (Object.keys(part).length === 0) {
          delete this._parts[userId];
          if (this.activeId === userId) {
            this.setActive(void 0);
          }
        }
      }
    };
    this._onKeyDown = (event) => {
      var _a;
      if (event.key !== Keys.Escape) {
        return;
      }
      const tabster2 = this._tabster;
      const element = tabster2.focusedElement.getFocusedElement();
      if (element) {
        const ctx = RootAPI.getTabsterContext(tabster2, element);
        const modalizer = ctx === null || ctx === void 0 ? void 0 : ctx.modalizer;
        if (ctx && !ctx.groupper && (modalizer === null || modalizer === void 0 ? void 0 : modalizer.isActive()) && !ctx.ignoreKeydown(event)) {
          const activeId = modalizer.userId;
          if (activeId) {
            const part = this._parts[activeId];
            if (part) {
              const focusedSince = Object.keys(part).map((id) => {
                var _a2;
                const m2 = part[id];
                const el = m2.getElement();
                let groupper;
                if (el) {
                  groupper = (_a2 = getTabsterOnElement(this._tabster, el)) === null || _a2 === void 0 ? void 0 : _a2.groupper;
                }
                return m2 && el && groupper ? {
                  el,
                  focusedSince: m2.focused(true)
                } : {
                  focusedSince: 0
                };
              }).filter((f2) => f2.focusedSince > 0).sort((a, b2) => a.focusedSince > b2.focusedSince ? -1 : a.focusedSince < b2.focusedSince ? 1 : 0);
              if (focusedSince.length) {
                const groupperElement = focusedSince[0].el;
                if (groupperElement) {
                  (_a = tabster2.groupper) === null || _a === void 0 ? void 0 : _a.handleKeyPress(groupperElement, event, true);
                }
              }
            }
          }
        }
      }
    };
    this._onFocus = (focusedElement, detail) => {
      var _a, _b;
      const ctx = focusedElement && RootAPI.getTabsterContext(this._tabster, focusedElement);
      if (!ctx || !focusedElement) {
        return;
      }
      const augmentedMap = this._augMap;
      for (let e2 = focusedElement; e2; e2 = dom.getParentElement(e2)) {
        if (augmentedMap.has(e2)) {
          augmentedMap.delete(e2);
          augmentAttribute(this._tabster, e2, _ariaHidden);
        }
      }
      const modalizer = ctx.modalizer;
      (_b = modalizer || ((_a = getTabsterOnElement(this._tabster, focusedElement)) === null || _a === void 0 ? void 0 : _a.modalizer)) === null || _b === void 0 ? void 0 : _b.focused();
      if ((modalizer === null || modalizer === void 0 ? void 0 : modalizer.userId) === this.activeId) {
        this.currentIsOthersAccessible = modalizer === null || modalizer === void 0 ? void 0 : modalizer.getProps().isOthersAccessible;
        return;
      }
      if (detail.isFocusedProgrammatically || this.currentIsOthersAccessible || (modalizer === null || modalizer === void 0 ? void 0 : modalizer.getProps().isAlwaysAccessible)) {
        this.setActive(modalizer);
      } else {
        const win2 = this._win();
        win2.clearTimeout(this._restoreModalizerFocusTimer);
        this._restoreModalizerFocusTimer = win2.setTimeout(() => this._restoreModalizerFocus(focusedElement), 100);
      }
    };
    this._tabster = tabster;
    this._win = tabster.getWindow;
    this._modalizers = {};
    this._parts = {};
    this._augMap = /* @__PURE__ */ new WeakMap();
    this._aug = [];
    this._alwaysAccessibleSelector = alwaysAccessibleSelector;
    this._accessibleCheck = accessibleCheck;
    this.activeElements = [];
    if (!tabster.controlTab) {
      tabster.root.addDummyInputs();
    }
    const win = this._win();
    win.addEventListener("keydown", this._onKeyDown, true);
    tabster.queueInit(() => {
      this._tabster.focusedElement.subscribe(this._onFocus);
    });
  }
  dispose() {
    const win = this._win();
    win.removeEventListener("keydown", this._onKeyDown, true);
    Object.keys(this._modalizers).forEach((modalizerId) => {
      if (this._modalizers[modalizerId]) {
        this._modalizers[modalizerId].dispose();
        delete this._modalizers[modalizerId];
      }
    });
    win.clearTimeout(this._restoreModalizerFocusTimer);
    win.clearTimeout(this._hiddenUpdateTimer);
    this._parts = {};
    delete this.activeId;
    this.activeElements = [];
    this._augMap = /* @__PURE__ */ new WeakMap();
    this._aug = [];
    this._tabster.focusedElement.unsubscribe(this._onFocus);
  }
  createModalizer(element, props, sys) {
    var _a;
    const modalizer = new Modalizer(this._tabster, element, this._onModalizerDispose, props, sys, this.activeElements);
    const id = modalizer.id;
    const userId = props.id;
    this._modalizers[id] = modalizer;
    let part = this._parts[userId];
    if (!part) {
      part = this._parts[userId] = {};
    }
    part[id] = modalizer;
    if (dom.nodeContains(element, (_a = this._tabster.focusedElement.getFocusedElement()) !== null && _a !== void 0 ? _a : null)) {
      if (userId !== this.activeId) {
        this.setActive(modalizer);
      } else {
        modalizer.makeActive(true);
      }
    }
    return modalizer;
  }
  isAugmented(element) {
    return this._augMap.has(element);
  }
  hiddenUpdate() {
    if (this._hiddenUpdateTimer) {
      return;
    }
    this._hiddenUpdateTimer = this._win().setTimeout(() => {
      delete this._hiddenUpdateTimer;
      this._hiddenUpdate();
    }, 250);
  }
  setActive(modalizer) {
    const userId = modalizer === null || modalizer === void 0 ? void 0 : modalizer.userId;
    const activeId = this.activeId;
    if (activeId === userId) {
      return;
    }
    this.activeId = userId;
    if (activeId) {
      const part = this._parts[activeId];
      if (part) {
        for (const id of Object.keys(part)) {
          part[id].makeActive(false);
        }
      }
    }
    if (userId) {
      const part = this._parts[userId];
      if (part) {
        for (const id of Object.keys(part)) {
          part[id].makeActive(true);
        }
      }
    }
    this.currentIsOthersAccessible = modalizer === null || modalizer === void 0 ? void 0 : modalizer.getProps().isOthersAccessible;
    this.hiddenUpdate();
  }
  focus(elementFromModalizer, noFocusFirst, noFocusDefault) {
    const ctx = RootAPI.getTabsterContext(this._tabster, elementFromModalizer);
    const modalizer = ctx === null || ctx === void 0 ? void 0 : ctx.modalizer;
    if (modalizer) {
      this.setActive(modalizer);
      const props = modalizer.getProps();
      const modalizerRoot = modalizer.getElement();
      if (modalizerRoot) {
        if (noFocusFirst === void 0) {
          noFocusFirst = props.isNoFocusFirst;
        }
        if (!noFocusFirst && this._tabster.keyboardNavigation.isNavigatingWithKeyboard() && this._tabster.focusedElement.focusFirst({
          container: modalizerRoot
        })) {
          return true;
        }
        if (noFocusDefault === void 0) {
          noFocusDefault = props.isNoFocusDefault;
        }
        if (!noFocusDefault && this._tabster.focusedElement.focusDefault(modalizerRoot)) {
          return true;
        }
        this._tabster.focusedElement.resetFocus(modalizerRoot);
      }
    }
    return false;
  }
  acceptElement(element, state) {
    var _a;
    const modalizerUserId = state.modalizerUserId;
    const currentModalizer = (_a = state.currentCtx) === null || _a === void 0 ? void 0 : _a.modalizer;
    if (modalizerUserId) {
      for (const e2 of this.activeElements) {
        const el = e2.get();
        if (el && (dom.nodeContains(element, el) || el === element)) {
          return NodeFilter.FILTER_SKIP;
        }
      }
    }
    const ret = modalizerUserId === (currentModalizer === null || currentModalizer === void 0 ? void 0 : currentModalizer.userId) || !modalizerUserId && (currentModalizer === null || currentModalizer === void 0 ? void 0 : currentModalizer.getProps().isAlwaysAccessible) ? void 0 : NodeFilter.FILTER_SKIP;
    if (ret !== void 0) {
      state.skippedFocusable = true;
    }
    return ret;
  }
  _hiddenUpdate() {
    var _a;
    const tabster = this._tabster;
    const body = tabster.getWindow().document.body;
    const activeId = this.activeId;
    const parts = this._parts;
    const visibleElements = [];
    const hiddenElements = [];
    const alwaysAccessibleSelector = this._alwaysAccessibleSelector;
    const alwaysAccessibleElements = alwaysAccessibleSelector ? Array.from(dom.querySelectorAll(body, alwaysAccessibleSelector)) : [];
    const activeModalizerElements = [];
    for (const userId of Object.keys(parts)) {
      const modalizerParts = parts[userId];
      for (const id of Object.keys(modalizerParts)) {
        const modalizer = modalizerParts[id];
        const el = modalizer.getElement();
        const props = modalizer.getProps();
        const isAlwaysAccessible = props.isAlwaysAccessible;
        if (el) {
          if (userId === activeId) {
            activeModalizerElements.push(el);
            if (!this.currentIsOthersAccessible) {
              visibleElements.push(el);
            }
          } else if (isAlwaysAccessible) {
            alwaysAccessibleElements.push(el);
          } else {
            hiddenElements.push(el);
          }
        }
      }
    }
    const augmentedMap = this._augMap;
    const allVisibleElements = visibleElements.length > 0 ? [...visibleElements, ...alwaysAccessibleElements] : void 0;
    const newAugmented = [];
    const newAugmentedMap = /* @__PURE__ */ new WeakMap();
    const toggle = (element, hide) => {
      var _a2;
      const tagName = element.tagName;
      if (tagName === "SCRIPT" || tagName === "STYLE") {
        return;
      }
      let isAugmented = false;
      if (augmentedMap.has(element)) {
        if (hide) {
          isAugmented = true;
        } else {
          augmentedMap.delete(element);
          augmentAttribute(tabster, element, _ariaHidden);
        }
      } else if (hide && !((_a2 = this._accessibleCheck) === null || _a2 === void 0 ? void 0 : _a2.call(this, element, activeModalizerElements)) && augmentAttribute(tabster, element, _ariaHidden, "true")) {
        augmentedMap.set(element, true);
        isAugmented = true;
      }
      if (isAugmented) {
        newAugmented.push(new WeakHTMLElement(tabster.getWindow, element));
        newAugmentedMap.set(element, true);
      }
    };
    const walk = (element) => {
      var _a2;
      for (let el = dom.getFirstElementChild(element); el; el = dom.getNextElementSibling(el)) {
        let skip = false;
        let containsModalizer = false;
        let containedByModalizer = false;
        if (allVisibleElements) {
          const elParent = tabster.getParent(el);
          for (const c2 of allVisibleElements) {
            if (el === c2) {
              skip = true;
              break;
            }
            if (dom.nodeContains(el, c2)) {
              containsModalizer = true;
              break;
            } else if (dom.nodeContains(c2, elParent)) {
              containedByModalizer = true;
            }
          }
          if (containsModalizer || ((_a2 = el.__tabsterElementFlags) === null || _a2 === void 0 ? void 0 : _a2.noDirectAriaHidden)) {
            walk(el);
          } else if (!skip && !containedByModalizer) {
            toggle(el, true);
          }
        } else {
          toggle(el, false);
        }
      }
    };
    if (!allVisibleElements) {
      alwaysAccessibleElements.forEach((e2) => toggle(e2, false));
    }
    hiddenElements.forEach((e2) => toggle(e2, true));
    if (body) {
      walk(body);
    }
    (_a = this._aug) === null || _a === void 0 ? void 0 : _a.map((e2) => e2.get()).forEach((e2) => {
      if (e2 && !newAugmentedMap.get(e2)) {
        toggle(e2, false);
      }
    });
    this._aug = newAugmented;
    this._augMap = newAugmentedMap;
  }
  /**
   * Called when an element is focused outside of an active modalizer.
   * Attempts to pull focus back into the active modalizer
   * @param outsideElement - An element being focused outside of the modalizer
   */
  _restoreModalizerFocus(outsideElement) {
    const ownerDocument = outsideElement === null || outsideElement === void 0 ? void 0 : outsideElement.ownerDocument;
    if (!outsideElement || !ownerDocument) {
      return;
    }
    const ctx = RootAPI.getTabsterContext(this._tabster, outsideElement);
    const modalizer = ctx === null || ctx === void 0 ? void 0 : ctx.modalizer;
    const activeId = this.activeId;
    if (!modalizer && !activeId || modalizer && activeId === modalizer.userId) {
      return;
    }
    const container = ctx === null || ctx === void 0 ? void 0 : ctx.root.getElement();
    if (container) {
      let toFocus = this._tabster.focusable.findFirst({
        container,
        useActiveModalizer: true
      });
      if (toFocus) {
        if (outsideElement.compareDocumentPosition(toFocus) & document.DOCUMENT_POSITION_PRECEDING) {
          toFocus = this._tabster.focusable.findLast({
            container,
            useActiveModalizer: true
          });
          if (!toFocus) {
            throw new Error("Something went wrong.");
          }
        }
        this._tabster.focusedElement.focus(toFocus);
        return;
      }
    }
    outsideElement.blur();
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const _inputSelector = /* @__PURE__ */ ["input", "textarea", "*[contenteditable]"].join(", ");
class MoverDummyManager extends DummyInputManager {
  constructor(element, tabster, getMemorized, sys) {
    super(tabster, element, DummyInputManagerPriorities.Mover, sys);
    this._onFocusDummyInput = (dummyInput) => {
      var _a, _b;
      const container = this._element.get();
      const input = dummyInput.input;
      if (container && input) {
        const ctx = RootAPI.getTabsterContext(this._tabster, container);
        let toFocus;
        if (ctx) {
          toFocus = (_a = FocusedElementState.findNextTabbable(this._tabster, ctx, void 0, input, void 0, !dummyInput.isFirst, true)) === null || _a === void 0 ? void 0 : _a.element;
        }
        const memorized = (_b = this._getMemorized()) === null || _b === void 0 ? void 0 : _b.get();
        if (memorized && this._tabster.focusable.isFocusable(memorized)) {
          toFocus = memorized;
        }
        if (toFocus) {
          nativeFocus(toFocus);
        }
      }
    };
    this._tabster = tabster;
    this._getMemorized = getMemorized;
    this._setHandlers(this._onFocusDummyInput);
  }
}
const _moverUpdateAdd = 1;
const _moverUpdateAttr = 2;
const _moverUpdateRemove = 3;
class Mover extends TabsterPart {
  constructor(tabster, element, onDispose, props, sys) {
    var _a;
    super(tabster, element, props);
    this._visible = {};
    this._onIntersection = (entries) => {
      for (const entry of entries) {
        const el = entry.target;
        const id = getElementUId(this._win, el);
        let newVisibility;
        let fullyVisible = this._fullyVisible;
        if (entry.intersectionRatio >= 0.25) {
          newVisibility = entry.intersectionRatio >= 0.75 ? Visibilities.Visible : Visibilities.PartiallyVisible;
          if (newVisibility === Visibilities.Visible) {
            fullyVisible = id;
          }
        } else {
          newVisibility = Visibilities.Invisible;
        }
        if (this._visible[id] !== newVisibility) {
          if (newVisibility === void 0) {
            delete this._visible[id];
            if (fullyVisible === id) {
              delete this._fullyVisible;
            }
          } else {
            this._visible[id] = newVisibility;
            this._fullyVisible = fullyVisible;
          }
          const state = this.getState(el);
          if (state) {
            el.dispatchEvent(new MoverStateEvent(state));
          }
        }
      }
    };
    this._win = tabster.getWindow;
    this.visibilityTolerance = (_a = props.visibilityTolerance) !== null && _a !== void 0 ? _a : 0.8;
    if (this._props.trackState || this._props.visibilityAware) {
      this._intersectionObserver = new IntersectionObserver(this._onIntersection, {
        threshold: [0, 0.25, 0.5, 0.75, 1]
      });
      this._observeState();
    }
    this._onDispose = onDispose;
    const getMemorized = () => props.memorizeCurrent ? this._current : void 0;
    if (!tabster.controlTab) {
      this.dummyManager = new MoverDummyManager(this._element, tabster, getMemorized, sys);
    }
  }
  dispose() {
    var _a;
    this._onDispose(this);
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      delete this._intersectionObserver;
    }
    delete this._current;
    delete this._fullyVisible;
    delete this._allElements;
    delete this._updateQueue;
    if (this._unobserve) {
      this._unobserve();
      delete this._unobserve;
    }
    const win = this._win();
    if (this._setCurrentTimer) {
      win.clearTimeout(this._setCurrentTimer);
      delete this._setCurrentTimer;
    }
    if (this._updateTimer) {
      win.clearTimeout(this._updateTimer);
      delete this._updateTimer;
    }
    (_a = this.dummyManager) === null || _a === void 0 ? void 0 : _a.dispose();
    delete this.dummyManager;
  }
  setCurrent(element) {
    if (element) {
      this._current = new WeakHTMLElement(this._win, element);
    } else {
      this._current = void 0;
    }
    if ((this._props.trackState || this._props.visibilityAware) && !this._setCurrentTimer) {
      this._setCurrentTimer = this._win().setTimeout(() => {
        var _a;
        delete this._setCurrentTimer;
        const changed = [];
        if (this._current !== this._prevCurrent) {
          changed.push(this._current);
          changed.push(this._prevCurrent);
          this._prevCurrent = this._current;
        }
        for (const weak of changed) {
          const el = weak === null || weak === void 0 ? void 0 : weak.get();
          if (el && ((_a = this._allElements) === null || _a === void 0 ? void 0 : _a.get(el)) === this) {
            const props = this._props;
            if (el && (props.visibilityAware !== void 0 || props.trackState)) {
              const state = this.getState(el);
              if (state) {
                el.dispatchEvent(new MoverStateEvent(state));
              }
            }
          }
        }
      });
    }
  }
  getCurrent() {
    var _a;
    return ((_a = this._current) === null || _a === void 0 ? void 0 : _a.get()) || null;
  }
  findNextTabbable(currentElement, referenceElement, isBackward, ignoreAccessibility) {
    const container = this.getElement();
    const currentIsDummy = container && getDummyInputContainer(currentElement) === container;
    if (!container) {
      return null;
    }
    let next = null;
    let outOfDOMOrder = false;
    let uncontrolled;
    if (this._props.tabbable || currentIsDummy || currentElement && !dom.nodeContains(container, currentElement)) {
      const findProps = {
        currentElement,
        referenceElement,
        container,
        ignoreAccessibility,
        useActiveModalizer: true
      };
      const findPropsOut = {};
      next = this._tabster.focusable[isBackward ? "findPrev" : "findNext"](findProps, findPropsOut);
      outOfDOMOrder = !!findPropsOut.outOfDOMOrder;
      uncontrolled = findPropsOut.uncontrolled;
    }
    return {
      element: next,
      uncontrolled,
      outOfDOMOrder
    };
  }
  acceptElement(element, state) {
    var _a, _b;
    if (!FocusedElementState.isTabbing) {
      return ((_a = state.currentCtx) === null || _a === void 0 ? void 0 : _a.excludedFromMover) ? NodeFilter.FILTER_REJECT : void 0;
    }
    const {
      memorizeCurrent,
      visibilityAware,
      hasDefault = true
    } = this._props;
    const moverElement = this.getElement();
    if (moverElement && (memorizeCurrent || visibilityAware || hasDefault) && (!dom.nodeContains(moverElement, state.from) || getDummyInputContainer(state.from) === moverElement)) {
      let found;
      if (memorizeCurrent) {
        const current = (_b = this._current) === null || _b === void 0 ? void 0 : _b.get();
        if (current && state.acceptCondition(current)) {
          found = current;
        }
      }
      if (!found && hasDefault) {
        found = this._tabster.focusable.findDefault({
          container: moverElement,
          useActiveModalizer: true
        });
      }
      if (!found && visibilityAware) {
        found = this._tabster.focusable.findElement({
          container: moverElement,
          useActiveModalizer: true,
          isBackward: state.isBackward,
          acceptCondition: (el) => {
            var _a2;
            const id = getElementUId(this._win, el);
            const visibility = this._visible[id];
            return moverElement !== el && !!((_a2 = this._allElements) === null || _a2 === void 0 ? void 0 : _a2.get(el)) && state.acceptCondition(el) && (visibility === Visibilities.Visible || visibility === Visibilities.PartiallyVisible && (visibilityAware === Visibilities.PartiallyVisible || !this._fullyVisible));
          }
        });
      }
      if (found) {
        state.found = true;
        state.foundElement = found;
        state.rejectElementsFrom = moverElement;
        state.skippedFocusable = true;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
    return void 0;
  }
  _observeState() {
    const element = this.getElement();
    if (this._unobserve || !element || typeof MutationObserver === "undefined") {
      return;
    }
    const win = this._win();
    const allElements = this._allElements = /* @__PURE__ */ new WeakMap();
    const tabsterFocusable = this._tabster.focusable;
    let updateQueue = this._updateQueue = [];
    const observer = dom.createMutationObserver((mutations) => {
      for (const mutation of mutations) {
        const target = mutation.target;
        const removed = mutation.removedNodes;
        const added = mutation.addedNodes;
        if (mutation.type === "attributes") {
          if (mutation.attributeName === "tabindex") {
            updateQueue.push({
              element: target,
              type: _moverUpdateAttr
            });
          }
        } else {
          for (let i = 0; i < removed.length; i++) {
            updateQueue.push({
              element: removed[i],
              type: _moverUpdateRemove
            });
          }
          for (let i = 0; i < added.length; i++) {
            updateQueue.push({
              element: added[i],
              type: _moverUpdateAdd
            });
          }
        }
      }
      requestUpdate();
    });
    const setElement = (element2, remove) => {
      var _a, _b;
      const current = allElements.get(element2);
      if (current && remove) {
        (_a = this._intersectionObserver) === null || _a === void 0 ? void 0 : _a.unobserve(element2);
        allElements.delete(element2);
      }
      if (!current && !remove) {
        allElements.set(element2, this);
        (_b = this._intersectionObserver) === null || _b === void 0 ? void 0 : _b.observe(element2);
      }
    };
    const updateElement = (element2) => {
      const isFocusable = tabsterFocusable.isFocusable(element2);
      const current = allElements.get(element2);
      if (current) {
        if (!isFocusable) {
          setElement(element2, true);
        }
      } else {
        if (isFocusable) {
          setElement(element2);
        }
      }
    };
    const addNewElements = (element2) => {
      const {
        mover
      } = getMoverGroupper(element2);
      if (mover && mover !== this) {
        if (mover.getElement() === element2 && tabsterFocusable.isFocusable(element2)) {
          setElement(element2);
        } else {
          return;
        }
      }
      const walker = createElementTreeWalker(win.document, element2, (node) => {
        const {
          mover: mover2,
          groupper
        } = getMoverGroupper(node);
        if (mover2 && mover2 !== this) {
          return NodeFilter.FILTER_REJECT;
        }
        const groupperFirstFocusable = groupper === null || groupper === void 0 ? void 0 : groupper.getFirst(true);
        if (groupper && groupper.getElement() !== node && groupperFirstFocusable && groupperFirstFocusable !== node) {
          return NodeFilter.FILTER_REJECT;
        }
        if (tabsterFocusable.isFocusable(node)) {
          setElement(node);
        }
        return NodeFilter.FILTER_SKIP;
      });
      if (walker) {
        walker.currentNode = element2;
        while (walker.nextNode()) {
        }
      }
    };
    const removeWalk = (element2) => {
      const current = allElements.get(element2);
      if (current) {
        setElement(element2, true);
      }
      for (let el = dom.getFirstElementChild(element2); el; el = dom.getNextElementSibling(el)) {
        removeWalk(el);
      }
    };
    const requestUpdate = () => {
      if (!this._updateTimer && updateQueue.length) {
        this._updateTimer = win.setTimeout(() => {
          delete this._updateTimer;
          for (const {
            element: element2,
            type
          } of updateQueue) {
            switch (type) {
              case _moverUpdateAttr:
                updateElement(element2);
                break;
              case _moverUpdateAdd:
                addNewElements(element2);
                break;
              case _moverUpdateRemove:
                removeWalk(element2);
                break;
            }
          }
          updateQueue = this._updateQueue = [];
        }, 0);
      }
    };
    const getMoverGroupper = (element2) => {
      const ret = {};
      for (let el = element2; el; el = dom.getParentElement(el)) {
        const toe = getTabsterOnElement(this._tabster, el);
        if (toe) {
          if (toe.groupper && !ret.groupper) {
            ret.groupper = toe.groupper;
          }
          if (toe.mover) {
            ret.mover = toe.mover;
            break;
          }
        }
      }
      return ret;
    };
    updateQueue.push({
      element,
      type: _moverUpdateAdd
    });
    requestUpdate();
    observer.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["tabindex"]
    });
    this._unobserve = () => {
      observer.disconnect();
    };
  }
  getState(element) {
    const id = getElementUId(this._win, element);
    if (id in this._visible) {
      const visibility = this._visible[id] || Visibilities.Invisible;
      const isCurrent = this._current ? this._current.get() === element : void 0;
      return {
        isCurrent,
        visibility
      };
    }
    return void 0;
  }
}
function getDistance(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const xDistance = ax2 < bx1 ? bx1 - ax2 : bx2 < ax1 ? ax1 - bx2 : 0;
  const yDistance = ay2 < by1 ? by1 - ay2 : by2 < ay1 ? ay1 - by2 : 0;
  return xDistance === 0 ? yDistance : yDistance === 0 ? xDistance : Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}
class MoverAPI {
  constructor(tabster, getWindow) {
    this._init = () => {
      const win = this._win();
      win.addEventListener("keydown", this._onKeyDown, true);
      win.addEventListener(MoverMoveFocusEventName, this._onMoveFocus);
      win.addEventListener(MoverMemorizedElementEventName, this._onMemorizedElement);
      this._tabster.focusedElement.subscribe(this._onFocus);
    };
    this._onMoverDispose = (mover) => {
      delete this._movers[mover.id];
    };
    this._onFocus = (element) => {
      var _a;
      let currentFocusableElement = element;
      let deepestFocusableElement = element;
      for (let el = dom.getParentElement(element); el; el = dom.getParentElement(el)) {
        const mover = (_a = getTabsterOnElement(this._tabster, el)) === null || _a === void 0 ? void 0 : _a.mover;
        if (mover) {
          mover.setCurrent(deepestFocusableElement);
          currentFocusableElement = void 0;
        }
        if (!currentFocusableElement && this._tabster.focusable.isFocusable(el)) {
          currentFocusableElement = deepestFocusableElement = el;
        }
      }
    };
    this._onKeyDown = async (event) => {
      var _a;
      if (this._ignoredInputTimer) {
        this._win().clearTimeout(this._ignoredInputTimer);
        delete this._ignoredInputTimer;
      }
      (_a = this._ignoredInputResolve) === null || _a === void 0 ? void 0 : _a.call(this, false);
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        return;
      }
      const key = event.key;
      let moverKey;
      if (key === Keys.ArrowDown) {
        moverKey = MoverKeys.ArrowDown;
      } else if (key === Keys.ArrowRight) {
        moverKey = MoverKeys.ArrowRight;
      } else if (key === Keys.ArrowUp) {
        moverKey = MoverKeys.ArrowUp;
      } else if (key === Keys.ArrowLeft) {
        moverKey = MoverKeys.ArrowLeft;
      } else if (key === Keys.PageDown) {
        moverKey = MoverKeys.PageDown;
      } else if (key === Keys.PageUp) {
        moverKey = MoverKeys.PageUp;
      } else if (key === Keys.Home) {
        moverKey = MoverKeys.Home;
      } else if (key === Keys.End) {
        moverKey = MoverKeys.End;
      }
      if (!moverKey) {
        return;
      }
      const focused = this._tabster.focusedElement.getFocusedElement();
      if (!focused || await this._isIgnoredInput(focused, key)) {
        return;
      }
      this._moveFocus(focused, moverKey, event);
    };
    this._onMoveFocus = (e2) => {
      var _a;
      const element = e2.composedPath()[0];
      const key = (_a = e2.detail) === null || _a === void 0 ? void 0 : _a.key;
      if (element && key !== void 0 && !e2.defaultPrevented) {
        this._moveFocus(element, key);
        e2.stopImmediatePropagation();
      }
    };
    this._onMemorizedElement = (e2) => {
      var _a;
      const target = e2.composedPath()[0];
      let memorizedElement = (_a = e2.detail) === null || _a === void 0 ? void 0 : _a.memorizedElement;
      if (target) {
        const ctx = RootAPI.getTabsterContext(this._tabster, target);
        const mover = ctx === null || ctx === void 0 ? void 0 : ctx.mover;
        if (mover) {
          if (memorizedElement && !dom.nodeContains(mover.getElement(), memorizedElement)) {
            memorizedElement = void 0;
          }
          mover.setCurrent(memorizedElement);
          e2.stopImmediatePropagation();
        }
      }
    };
    this._tabster = tabster;
    this._win = getWindow;
    this._movers = {};
    tabster.queueInit(this._init);
  }
  dispose() {
    var _a;
    const win = this._win();
    this._tabster.focusedElement.unsubscribe(this._onFocus);
    (_a = this._ignoredInputResolve) === null || _a === void 0 ? void 0 : _a.call(this, false);
    if (this._ignoredInputTimer) {
      win.clearTimeout(this._ignoredInputTimer);
      delete this._ignoredInputTimer;
    }
    win.removeEventListener("keydown", this._onKeyDown, true);
    win.removeEventListener(MoverMoveFocusEventName, this._onMoveFocus);
    win.removeEventListener(MoverMemorizedElementEventName, this._onMemorizedElement);
    Object.keys(this._movers).forEach((moverId) => {
      if (this._movers[moverId]) {
        this._movers[moverId].dispose();
        delete this._movers[moverId];
      }
    });
  }
  createMover(element, props, sys) {
    const newMover = new Mover(this._tabster, element, this._onMoverDispose, props, sys);
    this._movers[newMover.id] = newMover;
    return newMover;
  }
  moveFocus(fromElement, key) {
    return this._moveFocus(fromElement, key);
  }
  _moveFocus(fromElement, key, relatedEvent) {
    var _a, _b;
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, fromElement, {
      checkRtl: true
    });
    if (!ctx || !ctx.mover || ctx.excludedFromMover || relatedEvent && ctx.ignoreKeydown(relatedEvent)) {
      return null;
    }
    const mover = ctx.mover;
    const container = mover.getElement();
    if (ctx.groupperBeforeMover) {
      const groupper = ctx.groupper;
      if (groupper && !groupper.isActive(true)) {
        for (let el = dom.getParentElement(groupper.getElement()); el && el !== container; el = dom.getParentElement(el)) {
          if ((_b = (_a = getTabsterOnElement(tabster, el)) === null || _a === void 0 ? void 0 : _a.groupper) === null || _b === void 0 ? void 0 : _b.isActive(true)) {
            return null;
          }
        }
      } else {
        return null;
      }
    }
    if (!container) {
      return null;
    }
    const focusable = tabster.focusable;
    const moverProps = mover.getProps();
    const direction = moverProps.direction || MoverDirections.Both;
    const isBoth = direction === MoverDirections.Both;
    const isVertical = isBoth || direction === MoverDirections.Vertical;
    const isHorizontal = isBoth || direction === MoverDirections.Horizontal;
    const isGridLinear = direction === MoverDirections.GridLinear;
    const isGrid = isGridLinear || direction === MoverDirections.Grid;
    const isCyclic = moverProps.cyclic;
    let next;
    let scrollIntoViewArg;
    let focusedElementRect;
    let focusedElementX1 = 0;
    let focusedElementX2 = 0;
    if (isGrid) {
      focusedElementRect = fromElement.getBoundingClientRect();
      focusedElementX1 = Math.ceil(focusedElementRect.left);
      focusedElementX2 = Math.floor(focusedElementRect.right);
    }
    if (ctx.rtl) {
      if (key === MoverKeys.ArrowRight) {
        key = MoverKeys.ArrowLeft;
      } else if (key === MoverKeys.ArrowLeft) {
        key = MoverKeys.ArrowRight;
      }
    }
    if (key === MoverKeys.ArrowDown && isVertical || key === MoverKeys.ArrowRight && (isHorizontal || isGrid)) {
      next = focusable.findNext({
        currentElement: fromElement,
        container,
        useActiveModalizer: true
      });
      if (next && isGrid) {
        const nextElementX1 = Math.ceil(next.getBoundingClientRect().left);
        if (!isGridLinear && focusedElementX2 > nextElementX1) {
          next = void 0;
        }
      } else if (!next && isCyclic) {
        next = focusable.findFirst({
          container,
          useActiveModalizer: true
        });
      }
    } else if (key === MoverKeys.ArrowUp && isVertical || key === MoverKeys.ArrowLeft && (isHorizontal || isGrid)) {
      next = focusable.findPrev({
        currentElement: fromElement,
        container,
        useActiveModalizer: true
      });
      if (next && isGrid) {
        const nextElementX2 = Math.floor(next.getBoundingClientRect().right);
        if (!isGridLinear && nextElementX2 > focusedElementX1) {
          next = void 0;
        }
      } else if (!next && isCyclic) {
        next = focusable.findLast({
          container,
          useActiveModalizer: true
        });
      }
    } else if (key === MoverKeys.Home) {
      if (isGrid) {
        focusable.findElement({
          container,
          currentElement: fromElement,
          useActiveModalizer: true,
          isBackward: true,
          acceptCondition: (el) => {
            var _a2;
            if (!focusable.isFocusable(el)) {
              return false;
            }
            const nextElementX1 = Math.ceil((_a2 = el.getBoundingClientRect().left) !== null && _a2 !== void 0 ? _a2 : 0);
            if (el !== fromElement && focusedElementX1 <= nextElementX1) {
              return true;
            }
            next = el;
            return false;
          }
        });
      } else {
        next = focusable.findFirst({
          container,
          useActiveModalizer: true
        });
      }
    } else if (key === MoverKeys.End) {
      if (isGrid) {
        focusable.findElement({
          container,
          currentElement: fromElement,
          useActiveModalizer: true,
          acceptCondition: (el) => {
            var _a2;
            if (!focusable.isFocusable(el)) {
              return false;
            }
            const nextElementX1 = Math.ceil((_a2 = el.getBoundingClientRect().left) !== null && _a2 !== void 0 ? _a2 : 0);
            if (el !== fromElement && focusedElementX1 >= nextElementX1) {
              return true;
            }
            next = el;
            return false;
          }
        });
      } else {
        next = focusable.findLast({
          container,
          useActiveModalizer: true
        });
      }
    } else if (key === MoverKeys.PageUp) {
      focusable.findElement({
        currentElement: fromElement,
        container,
        useActiveModalizer: true,
        isBackward: true,
        acceptCondition: (el) => {
          if (!focusable.isFocusable(el)) {
            return false;
          }
          if (isElementVerticallyVisibleInContainer(this._win, el, mover.visibilityTolerance)) {
            next = el;
            return false;
          }
          return true;
        }
      });
      if (isGrid && next) {
        const firstColumnX1 = Math.ceil(next.getBoundingClientRect().left);
        focusable.findElement({
          currentElement: next,
          container,
          useActiveModalizer: true,
          acceptCondition: (el) => {
            if (!focusable.isFocusable(el)) {
              return false;
            }
            const nextElementX1 = Math.ceil(el.getBoundingClientRect().left);
            if (focusedElementX1 < nextElementX1 || firstColumnX1 >= nextElementX1) {
              return true;
            }
            next = el;
            return false;
          }
        });
      }
      scrollIntoViewArg = false;
    } else if (key === MoverKeys.PageDown) {
      focusable.findElement({
        currentElement: fromElement,
        container,
        useActiveModalizer: true,
        acceptCondition: (el) => {
          if (!focusable.isFocusable(el)) {
            return false;
          }
          if (isElementVerticallyVisibleInContainer(this._win, el, mover.visibilityTolerance)) {
            next = el;
            return false;
          }
          return true;
        }
      });
      if (isGrid && next) {
        const lastColumnX1 = Math.ceil(next.getBoundingClientRect().left);
        focusable.findElement({
          currentElement: next,
          container,
          useActiveModalizer: true,
          isBackward: true,
          acceptCondition: (el) => {
            if (!focusable.isFocusable(el)) {
              return false;
            }
            const nextElementX1 = Math.ceil(el.getBoundingClientRect().left);
            if (focusedElementX1 > nextElementX1 || lastColumnX1 <= nextElementX1) {
              return true;
            }
            next = el;
            return false;
          }
        });
      }
      scrollIntoViewArg = true;
    } else if (isGrid) {
      const isBackward = key === MoverKeys.ArrowUp;
      const ax1 = focusedElementX1;
      const ay1 = Math.ceil(focusedElementRect.top);
      const ax2 = focusedElementX2;
      const ay2 = Math.floor(focusedElementRect.bottom);
      let targetElement;
      let lastDistance;
      let lastIntersection = 0;
      focusable.findAll({
        container,
        currentElement: fromElement,
        isBackward,
        onElement: (el) => {
          const rect = el.getBoundingClientRect();
          const bx1 = Math.ceil(rect.left);
          const by1 = Math.ceil(rect.top);
          const bx2 = Math.floor(rect.right);
          const by2 = Math.floor(rect.bottom);
          if (isBackward && ay1 < by2 || !isBackward && ay2 > by1) {
            return true;
          }
          const xIntersectionWidth = Math.ceil(Math.min(ax2, bx2)) - Math.floor(Math.max(ax1, bx1));
          const minWidth = Math.ceil(Math.min(ax2 - ax1, bx2 - bx1));
          if (xIntersectionWidth > 0 && minWidth >= xIntersectionWidth) {
            const intersection = xIntersectionWidth / minWidth;
            if (intersection > lastIntersection) {
              targetElement = el;
              lastIntersection = intersection;
            }
          } else if (lastIntersection === 0) {
            const distance = getDistance(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2);
            if (lastDistance === void 0 || distance < lastDistance) {
              lastDistance = distance;
              targetElement = el;
            }
          } else if (lastIntersection > 0) {
            return false;
          }
          return true;
        }
      });
      next = targetElement;
    }
    if (next && (!relatedEvent || relatedEvent && container.dispatchEvent(new TabsterMoveFocusEvent({
      by: "mover",
      owner: container,
      next,
      relatedEvent
    })))) {
      if (scrollIntoViewArg !== void 0) {
        scrollIntoView(this._win, next, scrollIntoViewArg);
      }
      if (relatedEvent) {
        relatedEvent.preventDefault();
        relatedEvent.stopImmediatePropagation();
      }
      nativeFocus(next);
      return next;
    }
    return null;
  }
  async _isIgnoredInput(element, key) {
    if (element.getAttribute("aria-expanded") === "true" && element.hasAttribute("aria-activedescendant")) {
      return true;
    }
    if (matchesSelector(element, _inputSelector)) {
      let selectionStart = 0;
      let selectionEnd = 0;
      let textLength = 0;
      let asyncRet;
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        const type = element.type;
        const value = element.value;
        textLength = (value || "").length;
        if (type === "email" || type === "number") {
          if (textLength) {
            const selection = dom.getSelection(element);
            if (selection) {
              const initialLength = selection.toString().length;
              const isBackward = key === Keys.ArrowLeft || key === Keys.ArrowUp;
              selection.modify("extend", isBackward ? "backward" : "forward", "character");
              if (initialLength !== selection.toString().length) {
                selection.modify("extend", isBackward ? "forward" : "backward", "character");
                return true;
              } else {
                textLength = 0;
              }
            }
          }
        } else {
          const selStart = element.selectionStart;
          if (selStart === null) {
            return type === "hidden";
          }
          selectionStart = selStart || 0;
          selectionEnd = element.selectionEnd || 0;
        }
      } else if (element.contentEditable === "true") {
        asyncRet = new (getPromise(this._win))((resolve) => {
          this._ignoredInputResolve = (value) => {
            delete this._ignoredInputResolve;
            resolve(value);
          };
          const win = this._win();
          if (this._ignoredInputTimer) {
            win.clearTimeout(this._ignoredInputTimer);
          }
          const {
            anchorNode: prevAnchorNode,
            focusNode: prevFocusNode,
            anchorOffset: prevAnchorOffset,
            focusOffset: prevFocusOffset
          } = dom.getSelection(element) || {};
          this._ignoredInputTimer = win.setTimeout(() => {
            var _a, _b, _c;
            delete this._ignoredInputTimer;
            const {
              anchorNode,
              focusNode,
              anchorOffset,
              focusOffset
            } = dom.getSelection(element) || {};
            if (anchorNode !== prevAnchorNode || focusNode !== prevFocusNode || anchorOffset !== prevAnchorOffset || focusOffset !== prevFocusOffset) {
              (_a = this._ignoredInputResolve) === null || _a === void 0 ? void 0 : _a.call(this, false);
              return;
            }
            selectionStart = anchorOffset || 0;
            selectionEnd = focusOffset || 0;
            textLength = ((_b = element.textContent) === null || _b === void 0 ? void 0 : _b.length) || 0;
            if (anchorNode && focusNode) {
              if (dom.nodeContains(element, anchorNode) && dom.nodeContains(element, focusNode)) {
                if (anchorNode !== element) {
                  let anchorFound = false;
                  const addOffsets = (node) => {
                    if (node === anchorNode) {
                      anchorFound = true;
                    } else if (node === focusNode) {
                      return true;
                    }
                    const nodeText = node.textContent;
                    if (nodeText && !dom.getFirstChild(node)) {
                      const len = nodeText.length;
                      if (anchorFound) {
                        if (focusNode !== anchorNode) {
                          selectionEnd += len;
                        }
                      } else {
                        selectionStart += len;
                        selectionEnd += len;
                      }
                    }
                    let stop = false;
                    for (let e2 = dom.getFirstChild(node); e2 && !stop; e2 = e2.nextSibling) {
                      stop = addOffsets(e2);
                    }
                    return stop;
                  };
                  addOffsets(element);
                }
              }
            }
            (_c = this._ignoredInputResolve) === null || _c === void 0 ? void 0 : _c.call(this, true);
          }, 0);
        });
      }
      if (asyncRet && !await asyncRet) {
        return true;
      }
      if (selectionStart !== selectionEnd) {
        return true;
      }
      if (selectionStart > 0 && (key === Keys.ArrowLeft || key === Keys.ArrowUp || key === Keys.Home)) {
        return true;
      }
      if (selectionStart < textLength && (key === Keys.ArrowRight || key === Keys.ArrowDown || key === Keys.End)) {
        return true;
      }
    }
    return false;
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function observeMutations(doc, tabster, updateTabsterByAttribute2, syncState) {
  if (typeof MutationObserver === "undefined") {
    return () => {
    };
  }
  const getWindow = tabster.getWindow;
  let elementByUId;
  const onMutation = (mutations) => {
    var _a, _b, _c, _d, _e;
    const removedNodes = /* @__PURE__ */ new Set();
    for (const mutation of mutations) {
      const target = mutation.target;
      const removed = mutation.removedNodes;
      const added = mutation.addedNodes;
      if (mutation.type === "attributes") {
        if (mutation.attributeName === TABSTER_ATTRIBUTE_NAME) {
          if (!removedNodes.has(target)) {
            updateTabsterByAttribute2(tabster, target);
          }
        }
      } else {
        for (let i = 0; i < removed.length; i++) {
          const removedNode = removed[i];
          removedNodes.add(removedNode);
          updateTabsterElements(removedNode, true);
          (_b = (_a = tabster._dummyObserver).domChanged) === null || _b === void 0 ? void 0 : _b.call(_a, target);
        }
        for (let i = 0; i < added.length; i++) {
          updateTabsterElements(added[i]);
          (_d = (_c = tabster._dummyObserver).domChanged) === null || _d === void 0 ? void 0 : _d.call(_c, target);
        }
      }
    }
    removedNodes.clear();
    (_e = tabster.modalizer) === null || _e === void 0 ? void 0 : _e.hiddenUpdate();
  };
  function updateTabsterElements(node, removed) {
    if (!elementByUId) {
      elementByUId = getInstanceContext(getWindow).elementByUId;
    }
    processNode(node, removed);
    const walker = createElementTreeWalker(doc, node, (element) => {
      return processNode(element, removed);
    });
    if (walker) {
      while (walker.nextNode()) {
      }
    }
  }
  function processNode(element, removed) {
    var _a;
    if (!element.getAttribute) {
      return NodeFilter.FILTER_SKIP;
    }
    const uid = element.__tabsterElementUID;
    if (uid && elementByUId) {
      if (removed) {
        delete elementByUId[uid];
      } else {
        (_a = elementByUId[uid]) !== null && _a !== void 0 ? _a : elementByUId[uid] = new WeakHTMLElement(getWindow, element);
      }
    }
    if (getTabsterOnElement(tabster, element) || element.hasAttribute(TABSTER_ATTRIBUTE_NAME)) {
      updateTabsterByAttribute2(tabster, element, removed);
    }
    return NodeFilter.FILTER_SKIP;
  }
  const observer = dom.createMutationObserver(onMutation);
  if (syncState) {
    updateTabsterElements(getWindow().document.body);
  }
  observer.observe(doc, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [TABSTER_ATTRIBUTE_NAME]
  });
  return () => {
    observer.disconnect();
  };
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class UncontrolledAPI {
  constructor(isUncontrolledCompletely) {
    this._isUncontrolledCompletely = isUncontrolledCompletely;
  }
  isUncontrolledCompletely(element, completely) {
    var _a;
    const isUncontrolledCompletely = (_a = this._isUncontrolledCompletely) === null || _a === void 0 ? void 0 : _a.call(this, element, completely);
    return isUncontrolledCompletely === void 0 ? completely : isUncontrolledCompletely;
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const HISOTRY_DEPTH = 10;
class Restorer extends TabsterPart {
  constructor(tabster, element, props) {
    var _a;
    super(tabster, element, props);
    this._hasFocus = false;
    this._onFocusOut = (e2) => {
      var _a2;
      const element2 = (_a2 = this._element) === null || _a2 === void 0 ? void 0 : _a2.get();
      if (element2 && e2.relatedTarget === null) {
        element2.dispatchEvent(new RestorerRestoreFocusEvent());
      }
      if (element2 && !dom.nodeContains(element2, e2.relatedTarget)) {
        this._hasFocus = false;
      }
    };
    this._onFocusIn = () => {
      this._hasFocus = true;
    };
    if (this._props.type === RestorerTypes.Source) {
      const element2 = (_a = this._element) === null || _a === void 0 ? void 0 : _a.get();
      element2 === null || element2 === void 0 ? void 0 : element2.addEventListener("focusout", this._onFocusOut);
      element2 === null || element2 === void 0 ? void 0 : element2.addEventListener("focusin", this._onFocusIn);
      this._hasFocus = dom.nodeContains(element2, element2 && dom.getActiveElement(element2.ownerDocument));
    }
  }
  dispose() {
    var _a;
    if (this._props.type === RestorerTypes.Source) {
      const element = (_a = this._element) === null || _a === void 0 ? void 0 : _a.get();
      element === null || element === void 0 ? void 0 : element.removeEventListener("focusout", this._onFocusOut);
      element === null || element === void 0 ? void 0 : element.removeEventListener("focusin", this._onFocusIn);
      if (this._hasFocus) {
        const doc = this._tabster.getWindow().document;
        doc.body.dispatchEvent(new RestorerRestoreFocusEvent());
      }
    }
  }
}
class RestorerAPI {
  constructor(tabster) {
    this._history = [];
    this._onRestoreFocus = (e2) => {
      this._focusedElementState.cancelAsyncFocus(AsyncFocusSources.Restorer);
      const target = e2.composedPath()[0];
      if (target) {
        this._focusedElementState.requestAsyncFocus(AsyncFocusSources.Restorer, () => this._restoreFocus(target), 0);
      }
    };
    this._onFocusIn = (element) => {
      var _a;
      if (!element) {
        return;
      }
      const tabsterAttribute = getTabsterOnElement(this._tabster, element);
      if (((_a = tabsterAttribute === null || tabsterAttribute === void 0 ? void 0 : tabsterAttribute.restorer) === null || _a === void 0 ? void 0 : _a.getProps().type) !== RestorerTypes.Target) {
        return;
      }
      this._addToHistory(element);
    };
    this._restoreFocus = (source) => {
      var _a;
      const doc = this._getWindow().document;
      if (dom.getActiveElement(doc) !== doc.body) {
        return;
      }
      if (
        // clicking on any empty space focuses body - this is can be a false positive
        !this._keyboardNavState.isNavigatingWithKeyboard() && // Source no longer exists on DOM - always restore focus
        dom.nodeContains(doc.body, source)
      ) {
        return;
      }
      let weakElement = this._history.pop();
      while (weakElement && !dom.nodeContains(doc.body, dom.getParentElement(weakElement.get()))) {
        weakElement = this._history.pop();
      }
      (_a = weakElement === null || weakElement === void 0 ? void 0 : weakElement.get()) === null || _a === void 0 ? void 0 : _a.focus();
    };
    this._tabster = tabster;
    this._getWindow = tabster.getWindow;
    this._getWindow().addEventListener(RestorerRestoreFocusEventName, this._onRestoreFocus);
    this._keyboardNavState = tabster.keyboardNavigation;
    this._focusedElementState = tabster.focusedElement;
    this._focusedElementState.subscribe(this._onFocusIn);
  }
  dispose() {
    const win = this._getWindow();
    this._focusedElementState.unsubscribe(this._onFocusIn);
    this._focusedElementState.cancelAsyncFocus(AsyncFocusSources.Restorer);
    win.removeEventListener(RestorerRestoreFocusEventName, this._onRestoreFocus);
  }
  _addToHistory(element) {
    var _a;
    if (((_a = this._history[this._history.length - 1]) === null || _a === void 0 ? void 0 : _a.get()) === element) {
      return;
    }
    if (this._history.length > HISOTRY_DEPTH) {
      this._history.shift();
    }
    this._history.push(new WeakHTMLElement(this._getWindow, element));
  }
  createRestorer(element, props) {
    const restorer = new Restorer(this._tabster, element, props);
    if (props.type === RestorerTypes.Target && dom.getActiveElement(element.ownerDocument) === element) {
      this._addToHistory(element);
    }
    return restorer;
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class Tabster {
  constructor(tabster) {
    this.keyboardNavigation = tabster.keyboardNavigation;
    this.focusedElement = tabster.focusedElement;
    this.focusable = tabster.focusable;
    this.root = tabster.root;
    this.uncontrolled = tabster.uncontrolled;
    this.core = tabster;
  }
}
class TabsterCore {
  constructor(win, props) {
    var _a, _b;
    this._forgetMemorizedElements = [];
    this._wrappers = /* @__PURE__ */ new Set();
    this._initQueue = [];
    this._version = "8.0.1";
    this._noop = false;
    this.getWindow = () => {
      if (!this._win) {
        throw new Error("Using disposed Tabster.");
      }
      return this._win;
    };
    this._storage = createWeakMap(win);
    this._win = win;
    const getWindow = this.getWindow;
    if (props === null || props === void 0 ? void 0 : props.DOMAPI) {
      setDOMAPI({
        ...props.DOMAPI
      });
    }
    this.keyboardNavigation = new KeyboardNavigationState(getWindow);
    this.focusedElement = new FocusedElementState(this, getWindow);
    this.focusable = new FocusableAPI(this);
    this.root = new RootAPI(this, props === null || props === void 0 ? void 0 : props.autoRoot);
    this.uncontrolled = new UncontrolledAPI(
      // TODO: Remove checkUncontrolledTrappingFocus in the next major version.
      (props === null || props === void 0 ? void 0 : props.checkUncontrolledCompletely) || (props === null || props === void 0 ? void 0 : props.checkUncontrolledTrappingFocus)
    );
    this.controlTab = (_a = props === null || props === void 0 ? void 0 : props.controlTab) !== null && _a !== void 0 ? _a : true;
    this.rootDummyInputs = !!(props === null || props === void 0 ? void 0 : props.rootDummyInputs);
    this._dummyObserver = new DummyInputObserver(getWindow);
    this.getParent = (_b = props === null || props === void 0 ? void 0 : props.getParent) !== null && _b !== void 0 ? _b : dom.getParentNode;
    this.internal = {
      stopObserver: () => {
        if (this._unobserve) {
          this._unobserve();
          delete this._unobserve;
        }
      },
      resumeObserver: (syncState) => {
        if (!this._unobserve) {
          const doc = getWindow().document;
          this._unobserve = observeMutations(doc, this, updateTabsterByAttribute, syncState);
        }
      }
    };
    startFakeWeakRefsCleanup(getWindow);
    this.queueInit(() => {
      this.internal.resumeObserver(true);
    });
  }
  /**
   * Merges external props with the current props. Not all
   * props can/should be mergeable, so let's add more as we move on.
   * @param props Tabster props
   */
  _mergeProps(props) {
    var _a;
    if (!props) {
      return;
    }
    this.getParent = (_a = props.getParent) !== null && _a !== void 0 ? _a : this.getParent;
  }
  createTabster(noRefCount, props) {
    const wrapper = new Tabster(this);
    if (!noRefCount) {
      this._wrappers.add(wrapper);
    }
    this._mergeProps(props);
    return wrapper;
  }
  disposeTabster(wrapper, allInstances) {
    if (allInstances) {
      this._wrappers.clear();
    } else {
      this._wrappers.delete(wrapper);
    }
    if (this._wrappers.size === 0) {
      this.dispose();
    }
  }
  dispose() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    this.internal.stopObserver();
    const win = this._win;
    win === null || win === void 0 ? void 0 : win.clearTimeout(this._initTimer);
    delete this._initTimer;
    this._initQueue = [];
    this._forgetMemorizedElements = [];
    if (win && this._forgetMemorizedTimer) {
      win.clearTimeout(this._forgetMemorizedTimer);
      delete this._forgetMemorizedTimer;
    }
    (_a = this.outline) === null || _a === void 0 ? void 0 : _a.dispose();
    (_b = this.crossOrigin) === null || _b === void 0 ? void 0 : _b.dispose();
    (_c = this.deloser) === null || _c === void 0 ? void 0 : _c.dispose();
    (_d = this.groupper) === null || _d === void 0 ? void 0 : _d.dispose();
    (_e = this.mover) === null || _e === void 0 ? void 0 : _e.dispose();
    (_f = this.modalizer) === null || _f === void 0 ? void 0 : _f.dispose();
    (_g = this.observedElement) === null || _g === void 0 ? void 0 : _g.dispose();
    (_h = this.restorer) === null || _h === void 0 ? void 0 : _h.dispose();
    this.keyboardNavigation.dispose();
    this.focusable.dispose();
    this.focusedElement.dispose();
    this.root.dispose();
    this._dummyObserver.dispose();
    stopFakeWeakRefsCleanupAndClearStorage(this.getWindow);
    clearElementCache(this.getWindow);
    this._storage = /* @__PURE__ */ new WeakMap();
    this._wrappers.clear();
    if (win) {
      disposeInstanceContext(win);
      delete win.__tabsterInstance;
      delete this._win;
    }
  }
  storageEntry(element, addremove) {
    const storage = this._storage;
    let entry = storage.get(element);
    if (entry) {
      if (addremove === false && Object.keys(entry).length === 0) {
        storage.delete(element);
      }
    } else if (addremove === true) {
      entry = {};
      storage.set(element, entry);
    }
    return entry;
  }
  forceCleanup() {
    if (!this._win) {
      return;
    }
    this._forgetMemorizedElements.push(this._win.document.body);
    if (this._forgetMemorizedTimer) {
      return;
    }
    this._forgetMemorizedTimer = this._win.setTimeout(() => {
      delete this._forgetMemorizedTimer;
      for (let el = this._forgetMemorizedElements.shift(); el; el = this._forgetMemorizedElements.shift()) {
        clearElementCache(this.getWindow, el);
        FocusedElementState.forgetMemorized(this.focusedElement, el);
      }
    }, 0);
    cleanupFakeWeakRefs(this.getWindow, true);
  }
  queueInit(callback) {
    var _a;
    if (!this._win) {
      return;
    }
    this._initQueue.push(callback);
    if (!this._initTimer) {
      this._initTimer = (_a = this._win) === null || _a === void 0 ? void 0 : _a.setTimeout(() => {
        delete this._initTimer;
        this.drainInitQueue();
      }, 0);
    }
  }
  drainInitQueue() {
    if (!this._win) {
      return;
    }
    const queue = this._initQueue;
    this._initQueue = [];
    queue.forEach((callback) => callback());
  }
}
function createTabster(win, props) {
  let tabster = getCurrentTabster(win);
  if (tabster) {
    return tabster.createTabster(false, props);
  }
  tabster = new TabsterCore(win, props);
  win.__tabsterInstance = tabster;
  return tabster.createTabster();
}
function getGroupper(tabster) {
  const tabsterCore = tabster.core;
  if (!tabsterCore.groupper) {
    tabsterCore.groupper = new GroupperAPI(tabsterCore, tabsterCore.getWindow);
  }
  return tabsterCore.groupper;
}
function getMover(tabster) {
  const tabsterCore = tabster.core;
  if (!tabsterCore.mover) {
    tabsterCore.mover = new MoverAPI(tabsterCore, tabsterCore.getWindow);
  }
  return tabsterCore.mover;
}
function getModalizer(tabster, alwaysAccessibleSelector, accessibleCheck) {
  const tabsterCore = tabster.core;
  if (!tabsterCore.modalizer) {
    tabsterCore.modalizer = new ModalizerAPI(tabsterCore, alwaysAccessibleSelector, accessibleCheck);
  }
  return tabsterCore.modalizer;
}
function getRestorer(tabster) {
  const tabsterCore = tabster.core;
  if (!tabsterCore.restorer) {
    tabsterCore.restorer = new RestorerAPI(tabsterCore);
  }
  return tabsterCore.restorer;
}
function disposeTabster(tabster, allInstances) {
  tabster.core.disposeTabster(tabster, allInstances);
}
function getCurrentTabster(win) {
  return win.__tabsterInstance;
}
const useTabster = () => {
  const { targetDocument } = useFluent();
  const defaultView = (targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) || void 0;
  const shadowDOMAPI = defaultView === null || defaultView === void 0 ? void 0 : defaultView.__tabsterShadowDOMAPI;
  const tabster = reactExports.useMemo(() => {
    if (!defaultView) {
      return null;
    }
    return createTabster(defaultView, {
      autoRoot: {},
      controlTab: false,
      getParent,
      checkUncontrolledTrappingFocus: (element) => {
        var _element_firstElementChild;
        return !!((_element_firstElementChild = element.firstElementChild) === null || _element_firstElementChild === void 0 ? void 0 : _element_firstElementChild.hasAttribute("data-is-focus-trap-zone-bumper"));
      },
      DOMAPI: shadowDOMAPI
    });
  }, [
    defaultView,
    shadowDOMAPI
  ]);
  useIsomorphicLayoutEffect(() => {
    return () => {
      if (tabster) {
        disposeTabster(tabster);
      }
    };
  }, [
    tabster
  ]);
  return tabster;
};
const useTabsterAttributes = (props) => {
  useTabster();
  const strAttr = getTabsterAttribute(props);
  return reactExports.useMemo(() => ({
    [TABSTER_ATTRIBUTE_NAME]: strAttr
  }), [
    strAttr
  ]);
};
const useArrowNavigationGroup = (options = {}) => {
  const {
    circular,
    axis,
    memorizeCurrent = true,
    tabbable,
    ignoreDefaultKeydown,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault
  } = options;
  const tabster = useTabster();
  if (tabster) {
    getMover(tabster);
  }
  return useTabsterAttributes({
    mover: {
      cyclic: !!circular,
      direction: axisToMoverDirection(axis !== null && axis !== void 0 ? axis : "vertical"),
      memorizeCurrent,
      tabbable,
      hasDefault: unstable_hasDefault
    },
    ...ignoreDefaultKeydown && {
      focusable: {
        ignoreKeydown: ignoreDefaultKeydown
      }
    }
  });
};
function axisToMoverDirection(axis) {
  switch (axis) {
    case "horizontal":
      return MoverDirections.Horizontal;
    case "grid":
      return MoverDirections.Grid;
    case "grid-linear":
      return MoverDirections.GridLinear;
    case "both":
      return MoverDirections.Both;
    case "vertical":
    default:
      return MoverDirections.Vertical;
  }
}
const useFocusableGroup = (options) => {
  const tabster = useTabster();
  if (tabster) {
    getGroupper(tabster);
  }
  return useTabsterAttributes({
    groupper: {
      tabbability: getTabbability(options === null || options === void 0 ? void 0 : options.tabBehavior)
    },
    focusable: {
      ignoreKeydown: options === null || options === void 0 ? void 0 : options.ignoreDefaultKeydown
    }
  });
};
const getTabbability = (tabBehavior) => {
  switch (tabBehavior) {
    case "unlimited":
      return GroupperTabbabilities.Unlimited;
    case "limited":
      return GroupperTabbabilities.Limited;
    case "limited-trap-focus":
      return GroupperTabbabilities.LimitedTrapFocus;
    default:
      return void 0;
  }
};
const useFocusFinders = () => {
  const tabster = useTabster();
  const { targetDocument } = useFluent();
  const findAllFocusable = reactExports.useCallback((container, acceptCondition) => (tabster === null || tabster === void 0 ? void 0 : tabster.focusable.findAll({
    container,
    acceptCondition
  })) || [], [
    tabster
  ]);
  const findFirstFocusable = reactExports.useCallback((container) => tabster === null || tabster === void 0 ? void 0 : tabster.focusable.findFirst({
    container
  }), [
    tabster
  ]);
  const findLastFocusable = reactExports.useCallback((container) => tabster === null || tabster === void 0 ? void 0 : tabster.focusable.findLast({
    container
  }), [
    tabster
  ]);
  const findNextFocusable = reactExports.useCallback((currentElement, options = {}) => {
    if (!tabster || !targetDocument) {
      return null;
    }
    const { container = targetDocument.body } = options;
    return tabster.focusable.findNext({
      currentElement,
      container
    });
  }, [
    tabster,
    targetDocument
  ]);
  const findPrevFocusable = reactExports.useCallback((currentElement, options = {}) => {
    if (!tabster || !targetDocument) {
      return null;
    }
    const { container = targetDocument.body } = options;
    return tabster.focusable.findPrev({
      currentElement,
      container
    });
  }, [
    tabster,
    targetDocument
  ]);
  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable
  };
};
function applyFocusWithinPolyfill(element, win) {
  const keyborg = createKeyborg(win);
  keyborg.subscribe((isNavigatingWithKeyboard) => {
    if (!isNavigatingWithKeyboard) {
      removeFocusWithinClass(element);
    }
  });
  const keyborgListener = (e2) => {
    if (keyborg.isNavigatingWithKeyboard() && isHTMLElement(e2.target)) {
      applyFocusWithinClass(element);
    }
  };
  const blurListener = (e2) => {
    if (!e2.relatedTarget || isHTMLElement(e2.relatedTarget) && !element.contains(e2.relatedTarget)) {
      removeFocusWithinClass(element);
    }
  };
  element.addEventListener(KEYBORG_FOCUSIN, keyborgListener);
  element.addEventListener("focusout", blurListener);
  return () => {
    element.removeEventListener(KEYBORG_FOCUSIN, keyborgListener);
    element.removeEventListener("focusout", blurListener);
    disposeKeyborg(keyborg);
  };
}
function applyFocusWithinClass(el) {
  el.setAttribute(FOCUS_WITHIN_ATTR, "");
}
function removeFocusWithinClass(el) {
  el.removeAttribute(FOCUS_WITHIN_ATTR);
}
function isHTMLElement(target) {
  if (!target) {
    return false;
  }
  return Boolean(target && typeof target === "object" && "classList" in target && "contains" in target);
}
function useFocusWithin() {
  const { targetDocument } = useFluent();
  const elementRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if ((targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) && elementRef.current) {
      return applyFocusWithinPolyfill(elementRef.current, targetDocument.defaultView);
    }
  }, [
    elementRef,
    targetDocument
  ]);
  return elementRef;
}
const useModalAttributes = (options = {}) => {
  const { trapFocus, alwaysFocusable, legacyTrapFocus } = options;
  const tabster = useTabster();
  if (tabster) {
    getModalizer(tabster);
    getRestorer(tabster);
  }
  const id = useId("modal-", options.id);
  const modalAttributes = useTabsterAttributes({
    restorer: {
      type: RestorerTypes.Source
    },
    ...trapFocus && {
      modalizer: {
        id,
        isOthersAccessible: !trapFocus,
        isAlwaysAccessible: alwaysFocusable,
        isTrapped: legacyTrapFocus && trapFocus
      }
    }
  });
  const triggerAttributes = useTabsterAttributes({
    restorer: {
      type: RestorerTypes.Target
    }
  });
  return {
    modalAttributes,
    triggerAttributes
  };
};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b2) {
    var c2 = a.length;
    a.push(b2);
    a: for (; 0 < c2; ) {
      var d2 = c2 - 1 >>> 1, e2 = a[d2];
      if (0 < g2(e2, b2)) a[d2] = b2, a[c2] = e2, c2 = d2;
      else break a;
    }
  }
  function h2(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b2 = a[0], c2 = a.pop();
    if (c2 !== b2) {
      a[0] = c2;
      a: for (var d2 = 0, e2 = a.length, w2 = e2 >>> 1; d2 < w2; ) {
        var m2 = 2 * (d2 + 1) - 1, C2 = a[m2], n2 = m2 + 1, x = a[n2];
        if (0 > g2(C2, c2)) n2 < e2 && 0 > g2(x, C2) ? (a[d2] = x, a[n2] = c2, d2 = n2) : (a[d2] = C2, a[m2] = c2, d2 = m2);
        else if (n2 < e2 && 0 > g2(x, c2)) a[d2] = x, a[n2] = c2, d2 = n2;
        else break a;
      }
    }
    return b2;
  }
  function g2(a, b2) {
    var c2 = a.sortIndex - b2.sortIndex;
    return 0 !== c2 ? c2 : a.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b2 = h2(t); null !== b2; ) {
      if (null === b2.callback) k2(t);
      else if (b2.startTime <= a) k2(t), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else break;
      b2 = h2(t);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h2(r2)) A2 = true, I2(J);
    else {
      var b2 = h2(t);
      null !== b2 && K(H2, b2.startTime - a);
    }
  }
  function J(a, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L), L = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b2);
      for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b2) || a && !M()); ) {
        var d2 = v2.callback;
        if ("function" === typeof d2) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d2(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
          G2(b2);
        } else k2(r2);
        v2 = h2(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h2(t);
        null !== m2 && K(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N = false, O = null, L = -1, P = 5, Q = -1;
  function M() {
    return exports.unstable_now() - Q < P ? false : true;
  }
  function R() {
    if (null !== O) {
      var a = exports.unstable_now();
      Q = a;
      var b2 = true;
      try {
        b2 = O(true, a);
      } finally {
        b2 ? S() : (N = false, O = null);
      }
    } else N = false;
  }
  var S;
  if ("function" === typeof F2) S = function() {
    F2(R);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T = new MessageChannel(), U = T.port2;
    T.port1.onmessage = R;
    S = function() {
      U.postMessage(null);
    };
  } else S = function() {
    D2(R, 0);
  };
  function I2(a) {
    O = a;
    N || (N = true, S());
  }
  function K(a, b2) {
    L = D2(function() {
      a(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b2) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c2 = y2;
    y2 = a;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a, b2, c2) {
    var d2 = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a = { id: u2++, callback: b2, priorityLevel: a, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d2 ? (a.sortIndex = c2, f2(t, a), null === h2(r2) && a === h2(t) && (B2 ? (E2(L), L = -1) : B2 = true, K(H2, c2 - d2))) : (a.sortIndex = e2, f2(r2, a), A2 || z2 || (A2 = true, I2(J)));
    return a;
  };
  exports.unstable_shouldYield = M;
  exports.unstable_wrapCallback = function(a) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
const createProvider = (Original) => {
  const Provider = (props) => {
    const valueRef = reactExports.useRef(props.value);
    const versionRef = reactExports.useRef(0);
    const contextValue = reactExports.useRef();
    if (!contextValue.current) {
      contextValue.current = {
        value: valueRef,
        version: versionRef,
        listeners: []
      };
    }
    useIsomorphicLayoutEffect(() => {
      valueRef.current = props.value;
      versionRef.current += 1;
      schedulerExports.unstable_runWithPriority(schedulerExports.unstable_NormalPriority, () => {
        contextValue.current.listeners.forEach((listener) => {
          listener([
            versionRef.current,
            props.value
          ]);
        });
      });
    }, [
      props.value
    ]);
    return reactExports.createElement(Original, {
      value: contextValue.current
    }, props.children);
  };
  return Provider;
};
const createContext = (defaultValue) => {
  const context = reactExports.createContext({
    value: {
      current: defaultValue
    },
    version: {
      current: -1
    },
    listeners: []
  });
  context.Provider = createProvider(context.Provider);
  delete context.Consumer;
  return context;
};
const useContextSelector = (context, selector) => {
  const contextValue = reactExports.useContext(context);
  const { value: { current: value }, version: { current: version }, listeners } = contextValue;
  const selected = selector(value);
  const [state, setState] = reactExports.useState([
    value,
    selected
  ]);
  const dispatch = (payload) => {
    setState((prevState) => {
      if (!payload) {
        return [
          value,
          selected
        ];
      }
      if (payload[0] <= version) {
        if (Object.is(prevState[1], selected)) {
          return prevState;
        }
        return [
          value,
          selected
        ];
      }
      try {
        if (Object.is(prevState[0], payload[1])) {
          return prevState;
        }
        const nextSelected = selector(payload[1]);
        if (Object.is(prevState[1], nextSelected)) {
          return prevState;
        }
        return [
          payload[1],
          nextSelected
        ];
      } catch (e2) {
      }
      return [
        prevState[0],
        prevState[1]
      ];
    });
  };
  if (!Object.is(state[1], selected)) {
    dispatch(void 0);
  }
  const stableDispatch = useEventCallback(dispatch);
  useIsomorphicLayoutEffect(() => {
    listeners.push(stableDispatch);
    return () => {
      const index = listeners.indexOf(stableDispatch);
      listeners.splice(index, 1);
    };
  }, [
    stableDispatch,
    listeners
  ]);
  return state[1];
};
function useHasParentContext(context) {
  const contextValue = reactExports.useContext(context);
  if (contextValue.version) {
    return contextValue.version.current !== -1;
  }
  return false;
}
const ArrowExitFilled = /* @__PURE__ */ createFluentIcon("ArrowExitFilled", "1em", ["M12.75 17.5a.75.75 0 0 0 0-1.5H6.5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6.25a.75.75 0 0 0 0-1.5H6.5A3.5 3.5 0 0 0 3 6v8a3.5 3.5 0 0 0 3.5 3.5h6.25Zm1-11.3a.75.75 0 0 1 1.05.04l3 3.25c.27.29.27.73 0 1.02l-3 3.25a.75.75 0 1 1-1.1-1.02l1.84-1.99H7.75a.75.75 0 0 1 0-1.5h7.79l-1.84-2a.75.75 0 0 1 .04-1.05Z"]);
const KeyMultipleFilled = /* @__PURE__ */ createFluentIcon("KeyMultipleFilled", "1em", ["m10 2 .32.01a5.5 5.5 0 0 0-1.09 7.96l-.73.74v1.69a.6.6 0 0 1-.6.6H6v1.4a.6.6 0 0 1-.6.6H2.6a.6.6 0 0 1-.6-.6v-2.86a.6.6 0 0 1 .18-.42l3.98-3.99A4 4 0 0 1 10 2ZM9 6.5a4.5 4.5 0 1 1 7 3.74v2.05l.78.79a.6.6 0 0 1 0 .84L15.71 15l1.06 1.07a.6.6 0 0 1-.04.89l-2.36 1.88a.6.6 0 0 1-.74 0l-2.4-1.92a.6.6 0 0 1-.23-.47v-6.2A4.5 4.5 0 0 1 9 6.5Zm5.25-1a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"]);
const PersonFilled = /* @__PURE__ */ createFluentIcon("PersonFilled", "1em", ["M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-5 9a2 2 0 0 0-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0 0 10 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0 0 17 13a2 2 0 0 0-2-2H5Z"]);
const TableFilled = /* @__PURE__ */ createFluentIcon("TableFilled", "1em", ["M13 17h1.5a2.5 2.5 0 0 0 2.5-2.5V13h-4v4Zm0-5V8h4v4h-4Zm-1 0H8V8h4v4Zm-4 1h4v4H8v-4Zm-1-1V8H3v4h4Zm-4 1h4v4H5.5A2.5 2.5 0 0 1 3 14.5V13Zm10-6h4V5.5A2.5 2.5 0 0 0 14.5 3H13v4Zm-1-4v4H8V3h4ZM7 3v4H3V5.5A2.5 2.5 0 0 1 5.5 3H7Z"]);
const Apps28Filled = /* @__PURE__ */ createFluentIcon("Apps28Filled", "28", ["M20.84 2.66a2.25 2.25 0 0 0-3.18 0L13.5 6.8v-.56c0-1.24-1-2.25-2.25-2.25h-7C3.01 4 2 5.01 2 6.25v18c0 .97.78 1.75 1.75 1.75h18c1.24 0 2.25-1 2.25-2.25v-7c0-1.24-1-2.25-2.25-2.25h-.56l4.16-4.15c.88-.88.88-2.3 0-3.19l-4.5-4.5Zm-7.34 8.03 3.8 3.81h-3.8v-3.8ZM12 14.5H3.5V6.25c0-.41.34-.75.75-.75h7c.41 0 .75.34.75.75v8.25ZM3.5 16H12v8.5H4.25a.75.75 0 0 1-.75-.75V16Zm10 8.5V16h8.25c.41 0 .75.34.75.75v7c0 .42-.34.75-.75.75H13.5Z"]);
const Dismiss20Regular = /* @__PURE__ */ createFluentIcon("Dismiss20Regular", "20", ["m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"]);
const durations = {
  durationUltraFast: 50,
  durationFaster: 100,
  durationFast: 150,
  durationNormal: 200,
  durationGentle: 250,
  durationSlow: 300,
  durationSlower: 400,
  durationUltraSlow: 500
};
const curves = {
  curveAccelerateMax: "cubic-bezier(0.9,0.1,1,0.2)",
  curveAccelerateMid: "cubic-bezier(1,0,1,1)",
  curveAccelerateMin: "cubic-bezier(0.8,0,0.78,1)",
  curveDecelerateMax: "cubic-bezier(0.1,0.9,0.2,1)",
  curveDecelerateMid: "cubic-bezier(0,0,0,1)",
  curveDecelerateMin: "cubic-bezier(0.33,0,0.1,1)",
  curveEasyEaseMax: "cubic-bezier(0.8,0,0.2,1)",
  curveEasyEase: "cubic-bezier(0.33,0,0.67,1)",
  curveLinear: "cubic-bezier(0,0,1,1)"
};
const motionTokens = {
  ...durations,
  ...curves
};
function useAnimateAtomsInSupportedEnvironment() {
  return reactExports.useCallback((element, value, options) => {
    const atoms = Array.isArray(value) ? value : [
      value
    ];
    const { isReducedMotion } = options;
    const animations = atoms.map((motion) => {
      const { keyframes: keyframes2, ...params } = motion;
      const animation = element.animate(keyframes2, {
        fill: "forwards",
        ...params,
        ...isReducedMotion && {
          duration: 1
        }
      });
      animation.persist();
      return animation;
    });
    return {
      set playbackRate(rate) {
        animations.forEach((animation) => {
          animation.playbackRate = rate;
        });
      },
      setMotionEndCallbacks(onfinish, oncancel) {
        Promise.all(animations.map((animation) => animation.finished)).then(() => {
          onfinish();
        }).catch((err) => {
          var _element_ownerDocument_defaultView;
          const DOMException = (_element_ownerDocument_defaultView = element.ownerDocument.defaultView) === null || _element_ownerDocument_defaultView === void 0 ? void 0 : _element_ownerDocument_defaultView.DOMException;
          if (DOMException && err instanceof DOMException && err.name === "AbortError") {
            oncancel();
            return;
          }
          throw err;
        });
      },
      cancel: () => {
        animations.forEach((animation) => {
          animation.cancel();
        });
      },
      pause: () => {
        animations.forEach((animation) => {
          animation.pause();
        });
      },
      play: () => {
        animations.forEach((animation) => {
          animation.play();
        });
      },
      finish: () => {
        animations.forEach((animation) => {
          animation.finish();
        });
      }
    };
  }, []);
}
function useAnimateAtoms() {
  "use no memo";
  return useAnimateAtomsInSupportedEnvironment();
}
function useMotionImperativeRef(imperativeRef) {
  const animationRef = reactExports.useRef();
  reactExports.useImperativeHandle(imperativeRef, () => ({
    setPlayState: (state) => {
      if (state === "running") {
        var _animationRef_current;
        (_animationRef_current = animationRef.current) === null || _animationRef_current === void 0 ? void 0 : _animationRef_current.play();
      }
      if (state === "paused") {
        var _animationRef_current1;
        (_animationRef_current1 = animationRef.current) === null || _animationRef_current1 === void 0 ? void 0 : _animationRef_current1.pause();
      }
    },
    setPlaybackRate: (rate) => {
      if (animationRef.current) {
        animationRef.current.playbackRate = rate;
      }
    }
  }));
  return animationRef;
}
const REDUCED_MEDIA_QUERY = "screen and (prefers-reduced-motion: reduce)";
function useIsReducedMotion() {
  const { targetDocument } = useFluent();
  var _targetDocument_defaultView;
  const targetWindow = (_targetDocument_defaultView = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) !== null && _targetDocument_defaultView !== void 0 ? _targetDocument_defaultView : null;
  const queryValue = reactExports.useRef(false);
  const isEnabled = reactExports.useCallback(() => queryValue.current, []);
  reactExports.useEffect(() => {
    if (targetWindow === null || typeof targetWindow.matchMedia !== "function") {
      return;
    }
    const queryMatch = targetWindow.matchMedia(REDUCED_MEDIA_QUERY);
    if (queryMatch.matches) {
      queryValue.current = true;
    }
    const matchListener = (e2) => {
      queryValue.current = e2.matches;
    };
    queryMatch.addEventListener("change", matchListener);
    return () => {
      queryMatch.removeEventListener("change", matchListener);
    };
  }, [
    targetWindow
  ]);
  return isEnabled;
}
function getChildElement(children) {
  try {
    const child = reactExports.Children.only(children);
    if (typeof child.type === "string" || reactIsExports.isForwardRef(child)) {
      return child;
    }
  } catch {
  }
  throw new Error([
    "@fluentui/react-motion: Invalid child element.",
    "\n",
    "Motion factories require a single child element to be passed. ",
    "That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef()."
  ].join(""));
}
const PresenceGroupChildContext = reactExports.createContext(void 0);
function useMountedState(visible = false, unmountOnExit = false) {
  const mountedRef = reactExports.useRef(unmountOnExit ? visible : true);
  const forceUpdate = useForceUpdate();
  const setMounted = reactExports.useCallback((newValue) => {
    if (mountedRef.current !== newValue) {
      mountedRef.current = newValue;
      forceUpdate();
    }
  }, [
    forceUpdate
  ]);
  reactExports.useEffect(() => {
    if (visible) {
      mountedRef.current = visible;
    }
  });
  return [
    visible || mountedRef.current,
    setMounted
  ];
}
const MOTION_DEFINITION = Symbol("MOTION_DEFINITION");
function shouldSkipAnimation(appear, isFirstMount, visible) {
  return !appear && isFirstMount && !!visible;
}
function createPresenceComponent(value) {
  return Object.assign((props) => {
    "use no memo";
    const itemContext = reactExports.useContext(PresenceGroupChildContext);
    const merged = {
      ...itemContext,
      ...props
    };
    const { appear, children, imperativeRef, onExit, onMotionFinish, onMotionStart, onMotionCancel, visible, unmountOnExit, ..._rest } = merged;
    const params = _rest;
    const [mounted, setMounted] = useMountedState(visible, unmountOnExit);
    const child = getChildElement(children);
    const handleRef = useMotionImperativeRef(imperativeRef);
    const elementRef = reactExports.useRef();
    const ref = useMergedRefs(elementRef, child.ref);
    const optionsRef = reactExports.useRef({
      appear,
      params
    });
    const animateAtoms = useAnimateAtoms();
    const isFirstMount = useFirstMount();
    const isReducedMotion = useIsReducedMotion();
    const handleMotionStart = useEventCallback((direction) => {
      onMotionStart === null || onMotionStart === void 0 ? void 0 : onMotionStart(null, {
        direction
      });
    });
    const handleMotionFinish = useEventCallback((direction) => {
      onMotionFinish === null || onMotionFinish === void 0 ? void 0 : onMotionFinish(null, {
        direction
      });
      if (direction === "exit" && unmountOnExit) {
        setMounted(false);
        onExit === null || onExit === void 0 ? void 0 : onExit();
      }
    });
    const handleMotionCancel = useEventCallback((direction) => {
      onMotionCancel === null || onMotionCancel === void 0 ? void 0 : onMotionCancel(null, {
        direction
      });
    });
    useIsomorphicLayoutEffect(() => {
      optionsRef.current = {
        appear,
        params
      };
    });
    useIsomorphicLayoutEffect(
      () => {
        const element = elementRef.current;
        if (!element || shouldSkipAnimation(optionsRef.current.appear, isFirstMount, visible)) {
          return;
        }
        const presenceMotion = typeof value === "function" ? value({
          element,
          ...optionsRef.current.params
        }) : value;
        const atoms = visible ? presenceMotion.enter : presenceMotion.exit;
        const direction = visible ? "enter" : "exit";
        const forceFinishMotion = !visible && isFirstMount;
        if (!forceFinishMotion) {
          handleMotionStart(direction);
        }
        const handle = animateAtoms(element, atoms, {
          isReducedMotion: isReducedMotion()
        });
        if (forceFinishMotion) {
          handle.finish();
          return;
        }
        handleRef.current = handle;
        handle.setMotionEndCallbacks(() => handleMotionFinish(direction), () => handleMotionCancel(direction));
        return () => {
          handle.cancel();
        };
      },
      // Excluding `isFirstMount` from deps to prevent re-triggering the animation on subsequent renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        animateAtoms,
        handleRef,
        isReducedMotion,
        handleMotionFinish,
        handleMotionStart,
        handleMotionCancel,
        visible
      ]
    );
    if (mounted) {
      return reactExports.cloneElement(child, {
        ref
      });
    }
    return null;
  }, {
    // Heads up!
    // Always normalize it to a function to simplify types
    [MOTION_DEFINITION]: typeof value === "function" ? value : () => value
  });
}
function presenceMotionSlot(motion, options) {
  const { as, children, ...rest } = motion !== null && motion !== void 0 ? motion : {};
  if (motion === null) {
    const isUnmounted = !options.defaultProps.visible && options.defaultProps.unmountOnExit;
    const renderFn = (_, props) => isUnmounted ? null : /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, props.children);
    return {
      [SLOT_RENDER_FUNCTION_SYMBOL]: renderFn,
      [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType
    };
  }
  const propsWithMetadata = {
    ...options.defaultProps,
    ...rest,
    [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType
  };
  if (typeof children === "function") {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = children;
  }
  return propsWithMetadata;
}
function toMountNodeProps(mountNode) {
  if (isHTMLElement$1(mountNode)) {
    return {
      element: mountNode
    };
  }
  if (typeof mountNode === "object") {
    if (mountNode === null) {
      return {
        element: null
      };
    }
    return mountNode;
  }
  return {};
}
var getCurrentOwner = () => reactExports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
var useIsStrictMode = () => {
  {
    return false;
  }
};
var effectSet = /* @__PURE__ */ new WeakSet();
function useStrictEffect(effect, deps) {
  const currentOwner = getCurrentOwner();
  reactExports.useEffect(() => {
    if (!effectSet.has(currentOwner)) {
      effectSet.add(currentOwner);
      effect();
      return;
    }
    const dispose = effect();
    return dispose;
  }, deps);
}
var memoSet = /* @__PURE__ */ new WeakSet();
function useStrictMemo(factory, deps) {
  return reactExports.useMemo(() => {
    const currentOwner = getCurrentOwner();
    if (!memoSet.has(currentOwner)) {
      memoSet.add(currentOwner);
      return null;
    }
    return factory();
  }, deps);
}
function useDisposable(factory, deps) {
  var _a;
  const isStrictMode = useIsStrictMode() && false;
  const useMemo4 = isStrictMode ? useStrictMemo : reactExports.useMemo;
  const useEffect3 = isStrictMode ? useStrictEffect : reactExports.useEffect;
  const [disposable, dispose] = (_a = useMemo4(() => factory(), deps)) != null ? _a : [
    null,
    () => null
  ];
  useEffect3(() => {
    return dispose;
  }, deps);
  return disposable;
}
const usePortalMountNodeStylesStyles = /* @__PURE__ */ __styles({
  root: {
    qhf8xq: "f1euv43f",
    Bhzewxz: "f15twtuk",
    oyh7mz: ["f1vgc2s3", "f1e31b4d"],
    j35jbq: ["f1e31b4d", "f1vgc2s3"],
    Bj3rh1h: "f494woh"
  }
}, {
  d: [".f1euv43f{position:absolute;}", ".f15twtuk{top:0;}", ".f1vgc2s3{left:0;}", ".f1e31b4d{right:0;}", ".f494woh{z-index:1000000;}"]
});
const useInsertionEffect = React["useInsertionEffect"];
const usePortalMountNode = (options) => {
  "use no memo";
  const { targetDocument, dir } = useFluent();
  const mountNode = usePortalMountNode$1();
  const focusVisibleRef = useFocusVisible();
  const classes = usePortalMountNodeStylesStyles();
  const themeClassName = useThemeClassName();
  const className = mergeClasses(themeClassName, classes.root, options.className);
  const targetNode = mountNode !== null && mountNode !== void 0 ? mountNode : targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.body;
  const element = useDisposable(() => {
    if (targetNode === void 0 || options.disabled) {
      return [
        null,
        () => null
      ];
    }
    const newElement = targetNode.ownerDocument.createElement("div");
    targetNode.appendChild(newElement);
    return [
      newElement,
      () => newElement.remove()
    ];
  }, [
    targetNode
  ]);
  if (useInsertionEffect) {
    useInsertionEffect(() => {
      if (!element) {
        return;
      }
      const classesToApply = className.split(" ").filter(Boolean);
      element.classList.add(...classesToApply);
      element.setAttribute("dir", dir);
      element.setAttribute("data-portal-node", "true");
      focusVisibleRef.current = element;
      return () => {
        element.classList.remove(...classesToApply);
        element.removeAttribute("dir");
      };
    }, [
      className,
      dir,
      element,
      focusVisibleRef
    ]);
  } else {
    reactExports.useMemo(() => {
      if (!element) {
        return;
      }
      element.className = className;
      element.setAttribute("dir", dir);
      element.setAttribute("data-portal-node", "true");
      focusVisibleRef.current = element;
    }, [
      className,
      dir,
      element,
      focusVisibleRef
    ]);
  }
  return element;
};
const usePortal_unstable = (props) => {
  const { element, className } = toMountNodeProps(props.mountNode);
  const virtualParentRootRef = reactExports.useRef(null);
  const fallbackElement = usePortalMountNode({
    disabled: !!element,
    className
  });
  const mountNode = element !== null && element !== void 0 ? element : fallbackElement;
  const state = {
    children: props.children,
    mountNode,
    virtualParentRootRef
  };
  reactExports.useEffect(() => {
    if (!mountNode) {
      return;
    }
    const virtualParent = virtualParentRootRef.current;
    const isVirtualParentInsideChild = mountNode.contains(virtualParent);
    if (virtualParent && !isVirtualParentInsideChild) {
      setVirtualParent(mountNode, virtualParent);
      return () => {
        setVirtualParent(mountNode, void 0);
      };
    }
  }, [
    virtualParentRootRef,
    mountNode
  ]);
  return state;
};
const renderPortal_unstable = (state) => {
  return /* @__PURE__ */ reactExports.createElement("span", {
    hidden: true,
    ref: state.virtualParentRootRef
  }, state.mountNode && /* @__PURE__ */ reactDomExports.createPortal(state.children, state.mountNode));
};
const Portal = (props) => {
  const state = usePortal_unstable(props);
  return renderPortal_unstable(state);
};
Portal.displayName = "Portal";
const renderDivider_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {
    children: state.root.children !== void 0 && /* @__PURE__ */ jsx(state.wrapper, {
      children: state.root.children
    })
  });
};
const useDivider_unstable = (props, ref) => {
  const { alignContent = "center", appearance = "default", inset = false, vertical = false, wrapper } = props;
  const dividerId = useId("divider-");
  return {
    // Props passed at the top-level
    alignContent,
    appearance,
    inset,
    vertical,
    // Slots definition
    components: {
      root: "div",
      wrapper: "div"
    },
    root: always(getIntrinsicElementProps("div", {
      role: "separator",
      "aria-orientation": vertical ? "vertical" : "horizontal",
      "aria-labelledby": props.children ? dividerId : void 0,
      ...props,
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref
    }), {
      elementType: "div"
    }),
    wrapper: always(wrapper, {
      defaultProps: {
        id: dividerId,
        children: props.children
      },
      elementType: "div"
    })
  };
};
const dividerClassNames = {
  root: "fui-Divider",
  wrapper: "fui-Divider__wrapper"
};
const useBaseStyles$2 = /* @__PURE__ */ __styles({
  base: {
    Bt984gj: "f122n59",
    B7ck84d: "f1ewtqcl",
    mc9l5x: "f22iagw",
    Beiy3e4: "f1063pyq",
    Bh6795r: "fqerorx",
    qhf8xq: "f10pi13n",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm",
    fsow6f: "f17mccla",
    Bcvre1j: "fyl8oag",
    Br0sdwz: "f16vkdww",
    Bn78ew0: "fhsnbul",
    li1rpt: "f1gw3sf2",
    ap17g6: "f1ly5f7u",
    B771hl4: "f1s3tz6t"
  },
  childless: {
    susq4k: "f1kyqvp9",
    Bicfajf: ["fzynn9s", "f1z0ukd1"],
    jwcpgy: ["fekrn8e", "ftdg338"],
    B4rk6o: "fesgyo"
  },
  start: {
    Bsft5z2: "f13zj6fq"
  },
  center: {
    Ftih45: "f1wl9k8s",
    Bsft5z2: "f13zj6fq"
  },
  end: {
    Ftih45: "f1wl9k8s"
  },
  brand: {
    sj55zd: "f16muhyy",
    Bq4z7u6: "fcbuu2a",
    Bk5zm6e: ["f1wdw2dr", "f1ttio3w"],
    Bqjgrrk: "f1582fpk",
    Bm6vgfq: ["f1ttio3w", "f1wdw2dr"],
    B0n5ga8: "f1ahrvm8",
    s924m2: ["f1cd3wbc", "f17hbk9y"],
    B1q35kw: "fvrapl0",
    Gp14am: ["f17hbk9y", "f1cd3wbc"]
  },
  "default": {
    sj55zd: "fkfq4zb",
    Bq4z7u6: "f1vccso1",
    Bk5zm6e: ["f1geml7w", "fjml6kk"],
    Bqjgrrk: "f1r7kh1m",
    Bm6vgfq: ["fjml6kk", "f1geml7w"],
    B0n5ga8: "f16j7guv",
    s924m2: ["fx01ahm", "fj1a37q"],
    B1q35kw: "fl8d8yv",
    Gp14am: ["fj1a37q", "fx01ahm"]
  },
  subtle: {
    sj55zd: "f11d4kpn",
    Bq4z7u6: "f5g06un",
    Bk5zm6e: ["f13sxdku", "f1n015lb"],
    Bqjgrrk: "f1x6bl8t",
    Bm6vgfq: ["f1n015lb", "f13sxdku"],
    B0n5ga8: "fvod1wy",
    s924m2: ["fwslg65", "flk0e17"],
    B1q35kw: "f103fvts",
    Gp14am: ["flk0e17", "fwslg65"]
  },
  strong: {
    sj55zd: "f19n0e5",
    Bq4z7u6: "f10tv6oz",
    Bk5zm6e: ["f16xp3sf", "f1seuxxq"],
    Bqjgrrk: "fwrmqbx",
    Bm6vgfq: ["f1seuxxq", "f16xp3sf"],
    B0n5ga8: "ft83z1f",
    s924m2: ["f1g4150c", "f192dr6e"],
    B1q35kw: "f1qnawh6",
    Gp14am: ["f192dr6e", "f1g4150c"]
  }
}, {
  d: [".f122n59{align-items:center;}", ".f1ewtqcl{box-sizing:border-box;}", ".f22iagw{display:flex;}", ".f1063pyq{flex-direction:row;}", ".fqerorx{flex-grow:1;}", ".f10pi13n{position:relative;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f17mccla{text-align:center;}", ".fyl8oag::before{box-sizing:border-box;}", ".f16vkdww::before{display:flex;}", ".fhsnbul::before{flex-grow:1;}", ".f1gw3sf2::after{box-sizing:border-box;}", ".f1ly5f7u::after{display:flex;}", ".f1s3tz6t::after{flex-grow:1;}", ".f1kyqvp9::before{margin-bottom:0;}", ".fzynn9s::before{margin-right:0;}", ".f1z0ukd1::before{margin-left:0;}", ".fekrn8e::after{margin-left:0;}", ".ftdg338::after{margin-right:0;}", ".fesgyo::after{margin-top:0;}", '.f13zj6fq::after{content:"";}', '.f1wl9k8s::before{content:"";}', ".f16muhyy{color:var(--colorBrandForeground1);}", ".fcbuu2a::before{border-top-color:var(--colorBrandStroke1);}", ".f1wdw2dr::before{border-right-color:var(--colorBrandStroke1);}", ".f1ttio3w::before{border-left-color:var(--colorBrandStroke1);}", ".f1582fpk::before{border-bottom-color:var(--colorBrandStroke1);}", ".f1ahrvm8::after{border-top-color:var(--colorBrandStroke1);}", ".f1cd3wbc::after{border-right-color:var(--colorBrandStroke1);}", ".f17hbk9y::after{border-left-color:var(--colorBrandStroke1);}", ".fvrapl0::after{border-bottom-color:var(--colorBrandStroke1);}", ".fkfq4zb{color:var(--colorNeutralForeground2);}", ".f1vccso1::before{border-top-color:var(--colorNeutralStroke2);}", ".f1geml7w::before{border-right-color:var(--colorNeutralStroke2);}", ".fjml6kk::before{border-left-color:var(--colorNeutralStroke2);}", ".f1r7kh1m::before{border-bottom-color:var(--colorNeutralStroke2);}", ".f16j7guv::after{border-top-color:var(--colorNeutralStroke2);}", ".fx01ahm::after{border-right-color:var(--colorNeutralStroke2);}", ".fj1a37q::after{border-left-color:var(--colorNeutralStroke2);}", ".fl8d8yv::after{border-bottom-color:var(--colorNeutralStroke2);}", ".f11d4kpn{color:var(--colorNeutralForeground3);}", ".f5g06un::before{border-top-color:var(--colorNeutralStroke3);}", ".f13sxdku::before{border-right-color:var(--colorNeutralStroke3);}", ".f1n015lb::before{border-left-color:var(--colorNeutralStroke3);}", ".f1x6bl8t::before{border-bottom-color:var(--colorNeutralStroke3);}", ".fvod1wy::after{border-top-color:var(--colorNeutralStroke3);}", ".fwslg65::after{border-right-color:var(--colorNeutralStroke3);}", ".flk0e17::after{border-left-color:var(--colorNeutralStroke3);}", ".f103fvts::after{border-bottom-color:var(--colorNeutralStroke3);}", ".f19n0e5{color:var(--colorNeutralForeground1);}", ".f10tv6oz::before{border-top-color:var(--colorNeutralStroke1);}", ".f16xp3sf::before{border-right-color:var(--colorNeutralStroke1);}", ".f1seuxxq::before{border-left-color:var(--colorNeutralStroke1);}", ".fwrmqbx::before{border-bottom-color:var(--colorNeutralStroke1);}", ".ft83z1f::after{border-top-color:var(--colorNeutralStroke1);}", ".f1g4150c::after{border-right-color:var(--colorNeutralStroke1);}", ".f192dr6e::after{border-left-color:var(--colorNeutralStroke1);}", ".f1qnawh6::after{border-bottom-color:var(--colorNeutralStroke1);}"]
});
const useHorizontalStyles = /* @__PURE__ */ __styles({
  base: {
    a9b677: "fly5x3f",
    Bdkvgpv: "f163fonl",
    B0qfbqy: "f51yk4v",
    pbipgd: "f13rof3u",
    Bm2nyyq: "f8rth92",
    xrcqlc: "f6czdpx",
    i5u598: "f1iyka9k"
  },
  inset: {
    uwmqm3: ["fjlbh76", "f11qrl6u"],
    z189sj: ["f11qrl6u", "fjlbh76"]
  },
  start: {
    Ftih45: "f1wl9k8s",
    Bicfajf: ["f1ojjlep", "fk1kexq"],
    Bxwl2t9: "f1he2m4d",
    jwcpgy: ["f12w1bnb", "f1558wlj"]
  },
  center: {
    Bicfajf: ["f1ojjlep", "fk1kexq"],
    jwcpgy: ["f12w1bnb", "f1558wlj"]
  },
  end: {
    Bicfajf: ["f1ojjlep", "fk1kexq"],
    Bsft5z2: "f13zj6fq",
    jwcpgy: ["f12w1bnb", "f1558wlj"],
    Iy66sp: "f1ayce8x"
  }
}, {
  d: [".fly5x3f{width:100%;}", ".f163fonl::before{border-top-style:solid;}", ".f51yk4v::before{border-top-width:var(--strokeWidthThin);}", ".f13rof3u::before{min-width:8px;}", ".f8rth92::after{border-top-style:solid;}", ".f6czdpx::after{border-top-width:var(--strokeWidthThin);}", ".f1iyka9k::after{min-width:8px;}", ".fjlbh76{padding-left:12px;}", ".f11qrl6u{padding-right:12px;}", '.f1wl9k8s::before{content:"";}', ".f1ojjlep::before{margin-right:12px;}", ".fk1kexq::before{margin-left:12px;}", ".f1he2m4d::before{max-width:8px;}", ".f12w1bnb::after{margin-left:12px;}", ".f1558wlj::after{margin-right:12px;}", '.f13zj6fq::after{content:"";}', ".f1ayce8x::after{max-width:8px;}"]
});
const useVerticalStyles = /* @__PURE__ */ __styles({
  base: {
    Beiy3e4: "f1vx9l62",
    sshi5w: "f16gbxbe",
    m598lv: ["f1yq6w5o", "f1jpmc5p"],
    B4f6apu: ["f9sc749", "f1x8pvcy"],
    zkzzav: "fhkwbjy",
    Barhvk9: ["flthirb", "ftkbnf5"],
    Ihftqj: ["f13hvwk3", "f1en4csx"],
    Bde111x: "f19onpk6"
  },
  inset: {
    B6of3ja: "f1xdg43u",
    jrapky: "f1jlhsmd"
  },
  withChildren: {
    sshi5w: "f1tjaq3g"
  },
  start: {
    Ftih45: "f1wl9k8s",
    susq4k: "fg2pwug",
    Bbdr6tz: "fkjtzyi",
    B4rk6o: "f8vk40g"
  },
  center: {
    susq4k: "fg2pwug",
    B4rk6o: "f8vk40g"
  },
  end: {
    susq4k: "fg2pwug",
    Bsft5z2: "f13zj6fq",
    B4rk6o: "f8vk40g",
    gn64ia: "fqg5mu5"
  }
}, {
  d: [".f1vx9l62{flex-direction:column;}", ".f16gbxbe{min-height:20px;}", ".f1yq6w5o::before{border-right-style:solid;}", ".f1jpmc5p::before{border-left-style:solid;}", ".f9sc749::before{border-right-width:var(--strokeWidthThin);}", ".f1x8pvcy::before{border-left-width:var(--strokeWidthThin);}", ".fhkwbjy::before{min-height:8px;}", ".flthirb::after{border-right-style:solid;}", ".ftkbnf5::after{border-left-style:solid;}", ".f13hvwk3::after{border-right-width:var(--strokeWidthThin);}", ".f1en4csx::after{border-left-width:var(--strokeWidthThin);}", ".f19onpk6::after{min-height:8px;}", ".f1xdg43u{margin-top:12px;}", ".f1jlhsmd{margin-bottom:12px;}", ".f1tjaq3g{min-height:84px;}", '.f1wl9k8s::before{content:"";}', ".fg2pwug::before{margin-bottom:12px;}", ".fkjtzyi::before{max-height:8px;}", ".f8vk40g::after{margin-top:12px;}", '.f13zj6fq::after{content:"";}', ".fqg5mu5::after{max-height:8px;}"]
});
const useDividerStyles_unstable = (state) => {
  "use no memo";
  const baseStyles = useBaseStyles$2();
  const horizontalStyles = useHorizontalStyles();
  const verticalStyles = useVerticalStyles();
  const {
    alignContent,
    appearance,
    inset,
    vertical
  } = state;
  state.root.className = mergeClasses(
    dividerClassNames.root,
    // Base styles
    baseStyles.base,
    baseStyles[alignContent],
    appearance && baseStyles[appearance],
    // Horizontal styles
    !vertical && horizontalStyles.base,
    !vertical && inset && horizontalStyles.inset,
    !vertical && horizontalStyles[alignContent],
    // Vertical styles
    vertical && verticalStyles.base,
    vertical && inset && verticalStyles.inset,
    vertical && verticalStyles[alignContent],
    vertical && state.root.children !== void 0 && verticalStyles.withChildren,
    // Childless styles
    state.root.children === void 0 && baseStyles.childless,
    // User provided class name
    state.root.className
  );
  if (state.wrapper) {
    state.wrapper.className = mergeClasses(dividerClassNames.wrapper, state.wrapper.className);
  }
  return state;
};
const Text = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useText_unstable(props, ref);
  useTextStyles_unstable(state);
  useCustomStyleHook("useTextStyles_unstable")(state);
  return renderText_unstable(state);
});
Text.displayName = "Text";
const caption1ClassNames = {
  root: "fui-Caption1"
};
const useCaption1Styles = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}"]
});
const Caption1 = createPreset({
  useStyles: useCaption1Styles,
  className: caption1ClassNames.root,
  displayName: "Caption1"
});
const useHTMLNoScrollStyles = /* @__PURE__ */ __resetStyles("r6pzz3z", null, [".r6pzz3z{overflow-y:hidden;overflow-y:clip;scrollbar-gutter:stable;}"]);
const useBodyNoScrollStyles = /* @__PURE__ */ __resetStyles("r144vlu9", null, [".r144vlu9{overflow-y:hidden;}"]);
function useDisableBodyScroll() {
  const htmlNoScrollStyles = useHTMLNoScrollStyles();
  const bodyNoScrollStyles = useBodyNoScrollStyles();
  const { targetDocument } = useFluent();
  const disableBodyScroll = reactExports.useCallback(() => {
    var _targetDocument_defaultView;
    if (!targetDocument) {
      return;
    }
    var _targetDocument_defaultView_innerHeight;
    const isHorizontalScrollbarVisible = targetDocument.body.clientHeight > ((_targetDocument_defaultView_innerHeight = (_targetDocument_defaultView = targetDocument.defaultView) === null || _targetDocument_defaultView === void 0 ? void 0 : _targetDocument_defaultView.innerHeight) !== null && _targetDocument_defaultView_innerHeight !== void 0 ? _targetDocument_defaultView_innerHeight : 0);
    if (!isHorizontalScrollbarVisible) {
      return;
    }
    targetDocument.documentElement.classList.add(htmlNoScrollStyles);
    targetDocument.body.classList.add(bodyNoScrollStyles);
    return;
  }, [
    targetDocument,
    htmlNoScrollStyles,
    bodyNoScrollStyles
  ]);
  const enableBodyScroll = reactExports.useCallback(() => {
    if (!targetDocument) {
      return;
    }
    targetDocument.documentElement.classList.remove(htmlNoScrollStyles);
    targetDocument.body.classList.remove(bodyNoScrollStyles);
  }, [
    targetDocument,
    htmlNoScrollStyles,
    bodyNoScrollStyles
  ]);
  return {
    disableBodyScroll,
    enableBodyScroll
  };
}
function useFocusFirstElement(open, modalType) {
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent();
  const dialogRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) {
      return;
    }
    const element = dialogRef.current && findFirstFocusable(dialogRef.current);
    if (element) {
      element.focus();
    } else {
      var _dialogRef_current;
      (_dialogRef_current = dialogRef.current) === null || _dialogRef_current === void 0 ? void 0 : _dialogRef_current.focus();
    }
  }, [
    findFirstFocusable,
    open,
    modalType,
    targetDocument
  ]);
  return dialogRef;
}
const defaultContextValue$1 = {
  open: false,
  inertTrapFocus: false,
  modalType: "modal",
  isNestedDialog: false,
  dialogRef: {
    current: null
  },
  requestOpenChange() {
  }
};
const DialogContext = createContext(void 0);
const DialogProvider = DialogContext.Provider;
const useDialogContext_unstable = (selector) => useContextSelector(DialogContext, (ctx = defaultContextValue$1) => selector(ctx));
const defaultContextValue = false;
const DialogSurfaceContext = reactExports.createContext(void 0);
const DialogSurfaceProvider = DialogSurfaceContext.Provider;
const useDialogSurfaceContext_unstable = () => {
  var _useContext;
  return (_useContext = reactExports.useContext(DialogSurfaceContext)) !== null && _useContext !== void 0 ? _useContext : defaultContextValue;
};
const keyframes$1 = [
  {
    opacity: 0,
    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.1)",
    transform: "scale(0.85) translateZ(0)"
  },
  {
    boxShadow: tokens.shadow64,
    transform: "scale(1) translateZ(0)",
    opacity: 1
  }
];
const DialogSurfaceMotion = createPresenceComponent({
  enter: {
    keyframes: keyframes$1,
    easing: motionTokens.curveDecelerateMid,
    duration: motionTokens.durationGentle
  },
  exit: {
    keyframes: [
      ...keyframes$1
    ].reverse(),
    easing: motionTokens.curveAccelerateMin,
    duration: motionTokens.durationGentle
  }
});
const useDialog_unstable = (props) => {
  const { children, modalType = "modal", onOpenChange, inertTrapFocus = false } = props;
  const [trigger, content] = childrenToTriggerAndContent(children);
  const [open, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false
  });
  const requestOpenChange = useEventCallback((data) => {
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(data.event, data);
    if (!data.event.isDefaultPrevented()) {
      setOpen(data.open);
    }
  });
  const focusRef = useFocusFirstElement(open, modalType);
  const { modalAttributes, triggerAttributes } = useModalAttributes({
    trapFocus: modalType !== "non-modal",
    legacyTrapFocus: !inertTrapFocus
  });
  const isNestedDialog = useHasParentContext(DialogContext);
  return {
    components: {
      // TODO: remove once React v18 slot API is modified
      // This is a problem at the moment due to UnknownSlotProps assumption
      // that `children` property is `ReactNode`, which in this case is not valid
      // as PresenceComponentProps['children'] is `ReactElement`
      surfaceMotion: DialogSurfaceMotion
    },
    inertTrapFocus,
    open,
    modalType,
    content,
    trigger,
    requestOpenChange,
    dialogTitleId: useId("dialog-title-"),
    isNestedDialog,
    dialogRef: focusRef,
    modalAttributes,
    triggerAttributes,
    surfaceMotion: presenceMotionSlot(props.surfaceMotion, {
      elementType: DialogSurfaceMotion,
      defaultProps: {
        appear: true,
        visible: open,
        unmountOnExit: true
      }
    })
  };
};
function childrenToTriggerAndContent(children) {
  const childrenArray = reactExports.Children.toArray(children);
  switch (childrenArray.length) {
    case 2:
      return childrenArray;
    case 1:
      return [
        void 0,
        childrenArray[0]
      ];
    default:
      return [
        void 0,
        void 0
      ];
  }
}
const renderDialog_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(DialogProvider, {
    value: contextValues.dialog,
    children: /* @__PURE__ */ jsxs(DialogSurfaceProvider, {
      value: contextValues.dialogSurface,
      children: [
        state.trigger,
        state.content && /* @__PURE__ */ jsx(state.surfaceMotion, {
          children: state.content
        })
      ]
    })
  });
};
function useDialogContextValues_unstable(state) {
  const { modalType, open, dialogRef, dialogTitleId, isNestedDialog, inertTrapFocus, requestOpenChange, modalAttributes, triggerAttributes } = state;
  const dialog = {
    open,
    modalType,
    dialogRef,
    dialogTitleId,
    isNestedDialog,
    inertTrapFocus,
    modalAttributes,
    triggerAttributes,
    requestOpenChange
  };
  const dialogSurface = false;
  return {
    dialog,
    dialogSurface
  };
}
const Dialog = /* @__PURE__ */ reactExports.memo((props) => {
  const state = useDialog_unstable(props);
  const contextValues = useDialogContextValues_unstable(state);
  return renderDialog_unstable(state, contextValues);
});
Dialog.displayName = "Dialog";
const useDialogTrigger_unstable = (props) => {
  const isInsideSurfaceDialog = useDialogSurfaceContext_unstable();
  const { children, disableButtonEnhancement = false, action = isInsideSurfaceDialog ? "close" : "open" } = props;
  const child = getTriggerChild(children);
  const requestOpenChange = useDialogContext_unstable((ctx) => ctx.requestOpenChange);
  const { triggerAttributes } = useModalAttributes();
  const handleClick = useEventCallback((event) => {
    var _child_props_onClick, _child_props;
    child === null || child === void 0 ? void 0 : (_child_props_onClick = (_child_props = child.props).onClick) === null || _child_props_onClick === void 0 ? void 0 : _child_props_onClick.call(_child_props, event);
    if (!event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        type: "triggerClick",
        open: action === "open"
      });
    }
  });
  const triggerChildProps = {
    ...child === null || child === void 0 ? void 0 : child.props,
    ref: child === null || child === void 0 ? void 0 : child.ref,
    onClick: handleClick,
    ...triggerAttributes
  };
  const ariaButtonTriggerChildProps = useARIAButtonProps((child === null || child === void 0 ? void 0 : child.type) === "button" || (child === null || child === void 0 ? void 0 : child.type) === "a" ? child.type : "div", {
    ...triggerChildProps,
    type: "button"
  });
  return {
    children: applyTriggerPropsToChildren(children, disableButtonEnhancement ? triggerChildProps : ariaButtonTriggerChildProps)
  };
};
const renderDialogTrigger_unstable = (state) => state.children;
const DialogTrigger = (props) => {
  const state = useDialogTrigger_unstable(props);
  return renderDialogTrigger_unstable(state);
};
DialogTrigger.displayName = "DialogTrigger";
DialogTrigger.isFluentTriggerComponent = true;
const useDialogActions_unstable = (props, ref) => {
  const { position = "end", fluid = false } = props;
  return {
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps("div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "div"
    }),
    position,
    fluid
  };
};
const renderDialogActions_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const dialogActionsClassNames = {
  root: "fui-DialogActions"
};
const useResetStyles$1 = /* @__PURE__ */ __resetStyles("rhfpeu0", null, {
  r: [".rhfpeu0{gap:8px;height:fit-content;box-sizing:border-box;display:flex;grid-row-start:3;grid-row-end:3;}"],
  s: ["@media screen and (max-width: 480px){.rhfpeu0{flex-direction:column;justify-self:stretch;}}"]
});
const useStyles$4 = /* @__PURE__ */ __styles({
  gridPositionEnd: {
    Bdqf98w: "f1a7i8kp",
    Br312pm: "fd46tj4",
    Bw0ie65: "fsyjsko",
    B6n781s: "f1f41i0t",
    Bv5d0be: "f1jaqex3",
    v4ugfu: "f2ao6jk"
  },
  gridPositionStart: {
    Bdqf98w: "fsxvdwy",
    Br312pm: "fwpfdsa",
    Bw0ie65: "f1e2fz10",
    Bojbm9c: "f11ihkml",
    Bv5d0be: "fce5bvx",
    v4ugfu: "f2ao6jk"
  },
  fluidStart: {
    Bw0ie65: "fsyjsko"
  },
  fluidEnd: {
    Br312pm: "fwpfdsa"
  }
}, {
  d: [".f1a7i8kp{justify-self:end;}", ".fd46tj4{grid-column-start:2;}", ".fsyjsko{grid-column-end:4;}", ".fsxvdwy{justify-self:start;}", ".fwpfdsa{grid-column-start:1;}", ".f1e2fz10{grid-column-end:2;}"],
  m: [["@media screen and (max-width: 480px){.f1f41i0t{grid-column-start:1;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.f1jaqex3{grid-row-start:4;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.f2ao6jk{grid-row-end:auto;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.f11ihkml{grid-column-end:4;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.fce5bvx{grid-row-start:3;}}", {
    m: "screen and (max-width: 480px)"
  }]]
});
const useDialogActionsStyles_unstable = (state) => {
  "use no memo";
  const resetStyles = useResetStyles$1();
  const styles = useStyles$4();
  state.root.className = mergeClasses(dialogActionsClassNames.root, resetStyles, state.position === "start" && styles.gridPositionStart, state.position === "end" && styles.gridPositionEnd, state.fluid && state.position === "start" && styles.fluidStart, state.fluid && state.position === "end" && styles.fluidEnd, state.root.className);
  return state;
};
const DialogActions = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogActions_unstable(props, ref);
  useDialogActionsStyles_unstable(state);
  useCustomStyleHook("useDialogActionsStyles_unstable")(state);
  return renderDialogActions_unstable(state);
});
DialogActions.displayName = "DialogActions";
const useDialogBody_unstable = (props, ref) => {
  var _props_as;
  return {
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : "div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "div"
    })
  };
};
const renderDialogBody_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const dialogBodyClassNames = {
  root: "fui-DialogBody"
};
const useResetStyles = /* @__PURE__ */ __resetStyles("r1h3qql9", null, {
  r: [".r1h3qql9{overflow:unset;gap:8px;display:grid;max-height:calc(100vh - 2 * 24px);box-sizing:border-box;grid-template-rows:auto 1fr;grid-template-columns:1fr 1fr auto;}"],
  s: ["@media screen and (max-width: 480px){.r1h3qql9{max-width:100vw;grid-template-rows:auto 1fr auto;}}", "@media screen and (max-height: 359px){.r1h3qql9{max-height:unset;}}"]
});
const useDialogBodyStyles_unstable = (state) => {
  "use no memo";
  const resetStyles = useResetStyles();
  state.root.className = mergeClasses(dialogBodyClassNames.root, resetStyles, state.root.className);
  return state;
};
const DialogBody = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogBody_unstable(props, ref);
  useDialogBodyStyles_unstable(state);
  useCustomStyleHook("useDialogBodyStyles_unstable")(state);
  return renderDialogBody_unstable(state);
});
DialogBody.displayName = "DialogBody";
const dialogTitleClassNames = {
  root: "fui-DialogTitle",
  action: "fui-DialogTitle__action"
};
const useRootResetStyles = /* @__PURE__ */ __resetStyles("rxjm636", null, [".rxjm636{font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase500);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase500);margin:0;grid-row-start:1;grid-row-end:1;grid-column-start:1;grid-column-end:3;}"]);
const useStyles$3 = /* @__PURE__ */ __styles({
  rootWithoutAction: {
    Bw0ie65: "fsyjsko"
  }
}, {
  d: [".fsyjsko{grid-column-end:4;}"]
});
const useActionResetStyles = /* @__PURE__ */ __resetStyles("r13kcrze", null, [".r13kcrze{grid-row-start:1;grid-row-end:1;grid-column-start:3;justify-self:end;align-self:start;}"]);
const useDialogTitleInternalStyles = /* @__PURE__ */ __resetStyles("r2avt6e", "roj2bbc", {
  r: [".r2avt6e{overflow:visible;padding:0;border-style:none;position:relative;box-sizing:content-box;background-color:inherit;color:inherit;font-family:inherit;font-size:inherit;cursor:pointer;line-height:0;-webkit-appearance:button;text-align:unset;}", ".r2avt6e:focus{outline-style:none;}", ".r2avt6e:focus-visible{outline-style:none;}", ".r2avt6e[data-fui-focus-visible]{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.r2avt6e[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".roj2bbc{overflow:visible;padding:0;border-style:none;position:relative;box-sizing:content-box;background-color:inherit;color:inherit;font-family:inherit;font-size:inherit;cursor:pointer;line-height:0;-webkit-appearance:button;text-align:unset;}", ".roj2bbc:focus{outline-style:none;}", ".roj2bbc:focus-visible{outline-style:none;}", ".roj2bbc[data-fui-focus-visible]{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.roj2bbc[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.r2avt6e[data-fui-focus-visible]::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media (forced-colors: active){.roj2bbc[data-fui-focus-visible]::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]
});
const useDialogTitleStyles_unstable = (state) => {
  "use no memo";
  const rootResetStyles = useRootResetStyles();
  const actionResetStyles = useActionResetStyles();
  const styles = useStyles$3();
  state.root.className = mergeClasses(dialogTitleClassNames.root, rootResetStyles, !state.action && styles.rootWithoutAction, state.root.className);
  if (state.action) {
    state.action.className = mergeClasses(dialogTitleClassNames.action, actionResetStyles, state.action.className);
  }
  return state;
};
const useDialogTitle_unstable = (props, ref) => {
  const { action } = props;
  const modalType = useDialogContext_unstable((ctx) => ctx.modalType);
  const internalStyles = useDialogTitleInternalStyles();
  return {
    components: {
      root: "h2",
      action: "div"
    },
    root: always(getIntrinsicElementProps("h2", {
      ref,
      id: useDialogContext_unstable((ctx) => ctx.dialogTitleId),
      ...props
    }), {
      elementType: "h2"
    }),
    action: optional(action, {
      renderByDefault: modalType === "non-modal",
      defaultProps: {
        children: /* @__PURE__ */ reactExports.createElement(DialogTrigger, {
          disableButtonEnhancement: true,
          action: "close"
        }, /* @__PURE__ */ reactExports.createElement("button", {
          type: "button",
          className: internalStyles,
          // TODO: find a better way to add internal labels
          "aria-label": "close"
        }, /* @__PURE__ */ reactExports.createElement(Dismiss20Regular, null)))
      },
      elementType: "div"
    })
  };
};
const renderDialogTitle_unstable = (state) => {
  return /* @__PURE__ */ jsxs(reactExports.Fragment, {
    children: [
      /* @__PURE__ */ jsx(state.root, {
        children: state.root.children
      }),
      state.action && /* @__PURE__ */ jsx(state.action, {})
    ]
  });
};
const DialogTitle = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogTitle_unstable(props, ref);
  useDialogTitleStyles_unstable(state);
  useCustomStyleHook("useDialogTitleStyles_unstable")(state);
  return renderDialogTitle_unstable(state);
});
DialogTitle.displayName = "DialogTitle";
const keyframes = [
  {
    opacity: 0
  },
  {
    opacity: 1
  }
];
const DialogBackdropMotion = createPresenceComponent({
  enter: {
    keyframes,
    easing: motionTokens.curveLinear,
    duration: motionTokens.durationGentle
  },
  exit: {
    keyframes: [
      ...keyframes
    ].reverse(),
    easing: motionTokens.curveLinear,
    duration: motionTokens.durationGentle
  }
});
const useDialogSurface_unstable = (props, ref) => {
  const modalType = useDialogContext_unstable((ctx) => ctx.modalType);
  const isNestedDialog = useDialogContext_unstable((ctx) => ctx.isNestedDialog);
  const modalAttributes = useDialogContext_unstable((ctx) => ctx.modalAttributes);
  const dialogRef = useDialogContext_unstable((ctx) => ctx.dialogRef);
  const requestOpenChange = useDialogContext_unstable((ctx) => ctx.requestOpenChange);
  const dialogTitleID = useDialogContext_unstable((ctx) => ctx.dialogTitleId);
  const open = useDialogContext_unstable((ctx) => ctx.open);
  const handledBackdropClick = useEventCallback((event) => {
    if (isResolvedShorthand(props.backdrop)) {
      var _props_backdrop_onClick, _props_backdrop;
      (_props_backdrop_onClick = (_props_backdrop = props.backdrop).onClick) === null || _props_backdrop_onClick === void 0 ? void 0 : _props_backdrop_onClick.call(_props_backdrop, event);
    }
    if (modalType === "modal" && !event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        open: false,
        type: "backdropClick"
      });
    }
  });
  const handleKeyDown = useEventCallback((event) => {
    var _props_onKeyDown;
    (_props_onKeyDown = props.onKeyDown) === null || _props_onKeyDown === void 0 ? void 0 : _props_onKeyDown.call(props, event);
    if (event.key === Escape && !event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        open: false,
        type: "escapeKeyDown"
      });
      event.preventDefault();
    }
  });
  const backdrop = optional(props.backdrop, {
    renderByDefault: modalType !== "non-modal",
    defaultProps: {
      "aria-hidden": "true"
    },
    elementType: "div"
  });
  if (backdrop) {
    backdrop.onClick = handledBackdropClick;
  }
  const { disableBodyScroll, enableBodyScroll } = useDisableBodyScroll();
  useIsomorphicLayoutEffect(() => {
    if (isNestedDialog || modalType === "non-modal") {
      return;
    }
    disableBodyScroll();
    return () => {
      enableBodyScroll();
    };
  }, [
    enableBodyScroll,
    isNestedDialog,
    disableBodyScroll,
    modalType
  ]);
  return {
    components: {
      backdrop: "div",
      root: "div",
      // TODO: remove once React v18 slot API is modified
      // This is a problem at the moment due to UnknownSlotProps assumption
      // that `children` property is `ReactNode`, which in this case is not valid
      // as PresenceComponentProps['children'] is `ReactElement`
      backdropMotion: DialogBackdropMotion
    },
    open,
    backdrop,
    isNestedDialog,
    mountNode: props.mountNode,
    root: always(getIntrinsicElementProps("div", {
      tabIndex: -1,
      "aria-modal": modalType !== "non-modal",
      role: modalType === "alert" ? "alertdialog" : "dialog",
      "aria-labelledby": props["aria-label"] ? void 0 : dialogTitleID,
      ...props,
      ...modalAttributes,
      onKeyDown: handleKeyDown,
      // FIXME:
      // `DialogSurfaceElement` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: useMergedRefs(ref, dialogRef)
    }), {
      elementType: "div"
    }),
    backdropMotion: presenceMotionSlot(props.backdropMotion, {
      elementType: DialogBackdropMotion,
      defaultProps: {
        appear: true,
        visible: open
      }
    }),
    // Deprecated properties
    transitionStatus: void 0
  };
};
const renderDialogSurface_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsxs(Portal, {
    mountNode: state.mountNode,
    children: [
      state.backdrop && /* @__PURE__ */ jsx(state.backdropMotion, {
        children: /* @__PURE__ */ jsx(state.backdrop, {})
      }),
      /* @__PURE__ */ jsx(DialogSurfaceProvider, {
        value: contextValues.dialogSurface,
        children: /* @__PURE__ */ jsx(state.root, {})
      })
    ]
  });
};
const dialogSurfaceClassNames = {
  root: "fui-DialogSurface",
  backdrop: "fui-DialogSurface__backdrop"
};
const useRootBaseStyle = /* @__PURE__ */ __resetStyles("r1svjbtt", "r131yuoq", {
  r: [".r1svjbtt{inset:0;padding:24px;margin:auto;border-style:none;overflow:unset;border:1px solid var(--colorTransparentStroke);border-radius:var(--borderRadiusXLarge);display:block;-webkit-user-select:unset;-moz-user-select:unset;user-select:unset;visibility:unset;position:fixed;height:fit-content;max-width:600px;max-height:100vh;box-sizing:border-box;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);}", ".r1svjbtt:focus{outline-style:none;}", ".r1svjbtt:focus-visible{outline-style:none;}", ".r1svjbtt[data-fui-focus-visible]{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.r1svjbtt[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".r131yuoq{inset:0;padding:24px;margin:auto;border-style:none;overflow:unset;border:1px solid var(--colorTransparentStroke);border-radius:var(--borderRadiusXLarge);display:block;-webkit-user-select:unset;-moz-user-select:unset;user-select:unset;visibility:unset;position:fixed;height:fit-content;max-width:600px;max-height:100vh;box-sizing:border-box;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);}", ".r131yuoq:focus{outline-style:none;}", ".r131yuoq:focus-visible{outline-style:none;}", ".r131yuoq[data-fui-focus-visible]{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.r131yuoq[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.r1svjbtt[data-fui-focus-visible]::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media screen and (max-width: 480px){.r1svjbtt{max-width:100vw;}}", "@media screen and (max-height: 359px){.r1svjbtt{overflow-y:auto;padding-right:calc(24px - 4px);border-right-width:4px;border-top-width:4px;border-bottom-width:4px;}}", "@media (forced-colors: active){.r131yuoq[data-fui-focus-visible]::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}", "@media screen and (max-width: 480px){.r131yuoq{max-width:100vw;}}", "@media screen and (max-height: 359px){.r131yuoq{overflow-y:auto;padding-left:calc(24px - 4px);border-left-width:4px;border-top-width:4px;border-bottom-width:4px;}}"]
});
const useBackdropBaseStyle = /* @__PURE__ */ __resetStyles("rsptlh5", null, [".rsptlh5{inset:0px;background-color:rgba(0, 0, 0, 0.4);position:fixed;}"]);
const useBackdropStyles = /* @__PURE__ */ __styles({
  nestedDialogBackdrop: {
    De3pzq: "f1c21dwh"
  }
}, {
  d: [".f1c21dwh{background-color:var(--colorTransparentBackground);}"]
});
const useDialogSurfaceStyles_unstable = (state) => {
  "use no memo";
  const {
    isNestedDialog,
    root,
    backdrop
  } = state;
  const rootBaseStyle = useRootBaseStyle();
  const backdropBaseStyle = useBackdropBaseStyle();
  const backdropStyles = useBackdropStyles();
  root.className = mergeClasses(dialogSurfaceClassNames.root, rootBaseStyle, root.className);
  if (backdrop) {
    backdrop.className = mergeClasses(dialogSurfaceClassNames.backdrop, backdropBaseStyle, isNestedDialog && backdropStyles.nestedDialogBackdrop, backdrop.className);
  }
  return state;
};
function useDialogSurfaceContextValues_unstable(state) {
  const dialogSurface = true;
  return {
    dialogSurface
  };
}
const DialogSurface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogSurface_unstable(props, ref);
  const contextValues = useDialogSurfaceContextValues_unstable();
  useDialogSurfaceStyles_unstable(state);
  useCustomStyleHook("useDialogSurfaceStyles_unstable")(state);
  return renderDialogSurface_unstable(state, contextValues);
});
DialogSurface.displayName = "DialogSurface";
const useDialogContent_unstable = (props, ref) => {
  var _props_as;
  return {
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : "div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "div"
    })
  };
};
const renderDialogContent_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const dialogContentClassNames = {
  root: "fui-DialogContent"
};
const useStyles$2 = /* @__PURE__ */ __resetStyles("r1v5zwsm", null, {
  r: [".r1v5zwsm{padding:var(--strokeWidthThick);margin:calc(var(--strokeWidthThick) * -1);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);overflow-y:auto;min-height:32px;box-sizing:border-box;grid-row-start:2;grid-row-end:2;grid-column-start:1;grid-column-end:4;}"],
  s: ["@media screen and (max-height: 359px){.r1v5zwsm{overflow-y:unset;}}"]
});
const useDialogContentStyles_unstable = (state) => {
  "use no memo";
  const styles = useStyles$2();
  state.root.className = mergeClasses(dialogContentClassNames.root, styles, state.root.className);
  return state;
};
const DialogContent = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogContent_unstable(props, ref);
  useDialogContentStyles_unstable(state);
  useCustomStyleHook("useDialogContentStyles_unstable")(state);
  return renderDialogContent_unstable(state);
});
DialogContent.displayName = "DialogContent";
const useToolbar_unstable = (props, ref) => {
  const { size = "medium", vertical = false } = props;
  const arrowNavigationProps = useArrowNavigationGroup({
    circular: true,
    axis: "both"
  });
  const initialState = {
    size,
    vertical,
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: "div"
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: always(getIntrinsicElementProps("div", {
      role: "toolbar",
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...vertical && {
        "aria-orientation": "vertical"
      },
      ...arrowNavigationProps,
      ...props
    }), {
      elementType: "div"
    })
  };
  const [checkedValues, onCheckedValueChange] = useToolbarSelectableState({
    checkedValues: props.checkedValues,
    defaultCheckedValues: props.defaultCheckedValues,
    onCheckedValueChange: props.onCheckedValueChange
  });
  const handleToggleButton = useEventCallback((e2, name, value, checked) => {
    if (name && value) {
      const checkedItems = (checkedValues === null || checkedValues === void 0 ? void 0 : checkedValues[name]) || [];
      const newCheckedItems = [
        ...checkedItems
      ];
      if (checked) {
        newCheckedItems.splice(newCheckedItems.indexOf(value), 1);
      } else {
        newCheckedItems.push(value);
      }
      onCheckedValueChange === null || onCheckedValueChange === void 0 ? void 0 : onCheckedValueChange(e2, {
        name,
        checkedItems: newCheckedItems
      });
    }
  });
  const handleRadio = useEventCallback((e2, name, value, checked) => {
    if (name && value) {
      onCheckedValueChange === null || onCheckedValueChange === void 0 ? void 0 : onCheckedValueChange(e2, {
        name,
        checkedItems: [
          value
        ]
      });
    }
  });
  return {
    ...initialState,
    handleToggleButton,
    handleRadio,
    checkedValues: checkedValues !== null && checkedValues !== void 0 ? checkedValues : {}
  };
};
const useToolbarSelectableState = (state) => {
  const [checkedValues, setCheckedValues] = useControllableState({
    state: state.checkedValues,
    defaultState: state.defaultCheckedValues,
    initialState: {}
  });
  const { onCheckedValueChange: onCheckedValueChangeOriginal } = state;
  const onCheckedValueChange = useEventCallback((e2, { name, checkedItems }) => {
    if (onCheckedValueChangeOriginal) {
      onCheckedValueChangeOriginal(e2, {
        name,
        checkedItems
      });
    }
    setCheckedValues((s) => {
      return s ? {
        ...s,
        [name]: checkedItems
      } : {
        [name]: checkedItems
      };
    });
  });
  return [
    checkedValues,
    onCheckedValueChange
  ];
};
const ToolbarContext = createContext(void 0);
const toolbarContextDefaultValue = {
  size: "medium",
  handleToggleButton: () => null,
  handleRadio: () => null,
  vertical: false,
  checkedValues: {}
};
const useToolbarContext_unstable = (selector) => useContextSelector(ToolbarContext, (ctx = toolbarContextDefaultValue) => selector(ctx));
const renderToolbar_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(ToolbarContext.Provider, {
    value: contextValues.toolbar,
    children: /* @__PURE__ */ jsx(state.root, {
      children: state.root.children
    })
  });
};
const toolbarClassNames = {
  root: "fui-Toolbar"
};
const useStyles$1 = /* @__PURE__ */ __styles({
  root: {
    mc9l5x: "f22iagw",
    Bt984gj: "f122n59",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1yqiaad"
  },
  vertical: {
    Beiy3e4: "f1vx9l62",
    a9b677: "f1acs6jw"
  },
  small: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "fvz760z"
  },
  medium: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1yqiaad"
  },
  large: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1ms6bdn"
  }
}, {
  d: [".f22iagw{display:flex;}", ".f122n59{align-items:center;}", [".f1yqiaad{padding:4px 8px;}", {
    p: -1
  }], ".f1vx9l62{flex-direction:column;}", ".f1acs6jw{width:fit-content;}", [".fvz760z{padding:0px 4px;}", {
    p: -1
  }], [".f1yqiaad{padding:4px 8px;}", {
    p: -1
  }], [".f1ms6bdn{padding:4px 20px;}", {
    p: -1
  }]]
});
const useToolbarStyles_unstable = (state) => {
  "use no memo";
  const styles = useStyles$1();
  const {
    vertical,
    size
  } = state;
  state.root.className = mergeClasses(toolbarClassNames.root, styles.root, vertical && styles.vertical, size === "small" && !vertical && styles.small, size === "medium" && !vertical && styles.medium, size === "large" && !vertical && styles.large, state.root.className);
  return state;
};
function useToolbarContextValues_unstable(state) {
  const { size, handleToggleButton, vertical, checkedValues, handleRadio } = state;
  const toolbar = {
    size,
    vertical,
    handleToggleButton,
    handleRadio,
    checkedValues
  };
  return {
    toolbar
  };
}
const Toolbar = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useToolbar_unstable(props, ref);
  const contextValues = useToolbarContextValues_unstable(state);
  useToolbarStyles_unstable(state);
  useCustomStyleHook("useToolbarStyles_unstable")(state);
  return renderToolbar_unstable(state, contextValues);
});
Toolbar.displayName = "Toolbar";
const useBaseStyles$1 = /* @__PURE__ */ __styles({
  vertical: {
    Beiy3e4: "f1vx9l62"
  },
  verticalIcon: {
    Be2twd7: "f1rt2boy",
    jrapky: 0,
    Frg6f3: 0,
    t21cq0: 0,
    B6of3ja: 0,
    B74szlk: "f1s184ao"
  }
}, {
  d: [".f1vx9l62{flex-direction:column;}", ".f1rt2boy{font-size:24px;}", [".f1s184ao{margin:0;}", {
    p: -1
  }]]
});
const useToolbarButtonStyles_unstable = (state) => {
  "use no memo";
  useButtonStyles_unstable(state);
  const buttonStyles = useBaseStyles$1();
  state.root.className = mergeClasses(state.root.className, state.vertical && buttonStyles.vertical);
  if (state.icon) {
    state.icon.className = mergeClasses(state.icon.className, state.vertical && buttonStyles.verticalIcon);
  }
};
const useToolbarButton_unstable = (props, ref) => {
  const { vertical = false, ...buttonProps } = props;
  const state = useButton_unstable({
    appearance: "subtle",
    ...buttonProps
  }, ref);
  return {
    vertical,
    ...state
  };
};
const ToolbarButton = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useToolbarButton_unstable(props, ref);
  useToolbarButtonStyles_unstable(state);
  useCustomStyleHook("useToolbarButtonStyles_unstable")(state);
  return renderButton_unstable(state);
});
ToolbarButton.displayName = "ToolbarButton";
const useBaseStyles = /* @__PURE__ */ __styles({
  root: {
    mc9l5x: "ftuwxu6",
    B2u0y6b: "f1lwjmbk",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1oic3e7"
  },
  vertical: {
    B2u0y6b: "fe668z"
  }
}, {
  d: [".ftuwxu6{display:inline-flex;}", ".f1lwjmbk{max-width:1px;}", [".f1oic3e7{padding:0 12px;}", {
    p: -1
  }], ".fe668z{max-width:initial;}"]
});
const useToolbarDividerStyles_unstable = (state) => {
  "use no memo";
  useDividerStyles_unstable(state);
  const {
    vertical
  } = state;
  const toolbarDividerStyles = useBaseStyles();
  state.root.className = mergeClasses(toolbarDividerStyles.root, !vertical && toolbarDividerStyles.vertical, state.root.className);
  return state;
};
const useToolbarDivider_unstable = (props, ref) => {
  const vertical = useToolbarContext_unstable((ctx) => ctx.vertical);
  return useDivider_unstable({
    vertical: !vertical,
    ...props
  }, ref);
};
const ToolbarDivider = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useToolbarDivider_unstable(props, ref);
  useToolbarDividerStyles_unstable(state);
  useCustomStyleHook("useToolbarDividerStyles_unstable")(state);
  return renderDivider_unstable(state);
});
ToolbarDivider.displayName = "ToolbarDivider";
const useCardSelectable = (props, { referenceLabel, referenceId }, cardRef) => {
  const { checkbox = {}, onSelectionChange, floatingAction, onClick, onKeyDown } = props;
  const { findAllFocusable } = useFocusFinders();
  const checkboxRef = reactExports.useRef(null);
  const [selected, setSelected] = useControllableState({
    state: props.selected,
    defaultState: props.defaultSelected,
    initialState: false
  });
  const selectable = [
    props.selected,
    props.defaultSelected,
    onSelectionChange
  ].some((prop) => typeof prop !== "undefined");
  const [selectFocused, setSelectFocused] = reactExports.useState(false);
  const shouldRestrictTriggerAction = reactExports.useCallback((event) => {
    if (!cardRef.current) {
      return false;
    }
    const focusableElements = findAllFocusable(cardRef.current);
    const target = event.target;
    const isElementInFocusableGroup = focusableElements.some((element) => element.contains(target));
    const isCheckboxSlot = (checkboxRef === null || checkboxRef === void 0 ? void 0 : checkboxRef.current) === target;
    return isElementInFocusableGroup && !isCheckboxSlot;
  }, [
    cardRef,
    findAllFocusable
  ]);
  const onChangeHandler = reactExports.useCallback((event) => {
    if (shouldRestrictTriggerAction(event)) {
      return;
    }
    const newCheckedValue = !selected;
    setSelected(newCheckedValue);
    if (onSelectionChange) {
      onSelectionChange(event, {
        selected: newCheckedValue
      });
    }
  }, [
    onSelectionChange,
    selected,
    setSelected,
    shouldRestrictTriggerAction
  ]);
  const onKeyDownHandler = reactExports.useCallback((event) => {
    if ([
      Enter
    ].includes(event.key)) {
      event.preventDefault();
      onChangeHandler(event);
    }
  }, [
    onChangeHandler
  ]);
  const checkboxSlot = reactExports.useMemo(() => {
    if (!selectable || floatingAction) {
      return;
    }
    const selectableCheckboxProps = {};
    if (referenceId) {
      selectableCheckboxProps["aria-labelledby"] = referenceId;
    } else if (referenceLabel) {
      selectableCheckboxProps["aria-label"] = referenceLabel;
    }
    return optional(checkbox, {
      defaultProps: {
        ref: checkboxRef,
        type: "checkbox",
        checked: selected,
        onChange: (event) => onChangeHandler(event),
        onFocus: () => setSelectFocused(true),
        onBlur: () => setSelectFocused(false),
        ...selectableCheckboxProps
      },
      elementType: "input"
    });
  }, [
    checkbox,
    floatingAction,
    selected,
    selectable,
    onChangeHandler,
    referenceId,
    referenceLabel
  ]);
  const floatingActionSlot = reactExports.useMemo(() => {
    if (!floatingAction) {
      return;
    }
    return optional(floatingAction, {
      defaultProps: {
        ref: checkboxRef
      },
      elementType: "div"
    });
  }, [
    floatingAction
  ]);
  const selectableCardProps = reactExports.useMemo(() => {
    if (!selectable) {
      return null;
    }
    return {
      onClick: mergeCallbacks(onClick, onChangeHandler),
      onKeyDown: mergeCallbacks(onKeyDown, onKeyDownHandler)
    };
  }, [
    selectable,
    onChangeHandler,
    onClick,
    onKeyDown,
    onKeyDownHandler
  ]);
  return {
    selected,
    selectable,
    selectFocused,
    selectableCardProps,
    checkboxSlot,
    floatingActionSlot
  };
};
const cardContext = reactExports.createContext(void 0);
const cardContextDefaultValue = {
  selectableA11yProps: {
    referenceId: void 0,
    setReferenceId() {
    },
    referenceLabel: void 0,
    setReferenceLabel() {
    }
  }
};
const CardProvider = cardContext.Provider;
const useCardContext_unstable = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(cardContext)) !== null && _React_useContext !== void 0 ? _React_useContext : cardContextDefaultValue;
};
const focusMap = {
  off: void 0,
  "no-tab": "limited-trap-focus",
  "tab-exit": "limited",
  "tab-only": "unlimited"
};
const useCardInteractive = ({ focusMode = "off", ...props }) => {
  const interactive = [
    "onClick",
    "onDoubleClick",
    "onMouseUp",
    "onMouseDown",
    "onPointerUp",
    "onPointerDown",
    "onTouchStart",
    "onTouchEnd",
    "onDragStart",
    "onDragEnd"
  ].some((prop) => props[prop]);
  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[interactive ? "no-tab" : focusMode]
  });
  const interactiveFocusAttributes = {
    ...groupperAttrs,
    tabIndex: 0
  };
  return {
    interactive,
    focusAttributes: !interactive && focusMode === "off" ? null : interactiveFocusAttributes
  };
};
const useCard_unstable = (props, ref) => {
  const { appearance = "filled", orientation = "vertical", size = "medium" } = props;
  const [referenceId, setReferenceId] = reactExports.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const [referenceLabel, setReferenceLabel] = reactExports.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const cardBaseRef = useFocusWithin();
  const { selectable, selected, selectableCardProps, selectFocused, checkboxSlot, floatingActionSlot } = useCardSelectable(props, {
    referenceId,
    referenceLabel
  }, cardBaseRef);
  const cardRef = useMergedRefs(cardBaseRef, ref);
  const { interactive, focusAttributes } = useCardInteractive(props);
  return {
    appearance,
    orientation,
    size,
    interactive,
    selectable,
    selectFocused,
    selected,
    selectableA11yProps: {
      setReferenceId,
      referenceId,
      referenceLabel,
      setReferenceLabel
    },
    components: {
      root: "div",
      floatingAction: "div",
      checkbox: "input"
    },
    root: always(getIntrinsicElementProps("div", {
      ref: cardRef,
      role: "group",
      ...!selectable ? focusAttributes : null,
      ...props,
      ...selectableCardProps
    }), {
      elementType: "div"
    }),
    floatingAction: floatingActionSlot,
    checkbox: checkboxSlot
  };
};
const renderCard_unstable = (state, cardContextValue) => {
  return /* @__PURE__ */ jsx(state.root, {
    children: /* @__PURE__ */ jsxs(CardProvider, {
      value: cardContextValue,
      children: [
        state.checkbox ? /* @__PURE__ */ jsx(state.checkbox, {}) : null,
        state.floatingAction ? /* @__PURE__ */ jsx(state.floatingAction, {}) : null,
        state.root.children
      ]
    })
  });
};
const cardHeaderClassNames = {
  root: "fui-CardHeader",
  image: "fui-CardHeader__image",
  header: "fui-CardHeader__header",
  description: "fui-CardHeader__description",
  action: "fui-CardHeader__action"
};
const useStyles = /* @__PURE__ */ __styles({
  root: {
    Bkc6ea2: "fkufhic",
    Bt984gj: "f122n59"
  },
  image: {
    mc9l5x: "ftuwxu6",
    t21cq0: ["fql5097", "f6yss9k"]
  },
  header: {
    mc9l5x: "f22iagw"
  },
  description: {
    mc9l5x: "f22iagw"
  },
  action: {
    Frg6f3: ["f6yss9k", "fql5097"],
    B7frvx2: "f1ndzpm5",
    B06c7xf: ["f1fkeggc", "f1u45u6i"],
    B8uq84v: "f16eyofs",
    snkdo8: ["f1u45u6i", "f1fkeggc"],
    Bpf22ct: "f1wkmkig",
    apjfyd: "f18alut9"
  }
}, {
  d: [".fkufhic{--fui-CardHeader--gap:12px;}", ".f122n59{align-items:center;}", ".ftuwxu6{display:inline-flex;}", ".fql5097{margin-right:var(--fui-CardHeader--gap);}", ".f6yss9k{margin-left:var(--fui-CardHeader--gap);}", ".f22iagw{display:flex;}"],
  m: [["@media (forced-colors: active){.f1ndzpm5 .fui-Button,.f1ndzpm5 .fui-Link{border-top-color:currentColor;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1fkeggc .fui-Button,.f1fkeggc .fui-Link{border-right-color:currentColor;}.f1u45u6i .fui-Button,.f1u45u6i .fui-Link{border-left-color:currentColor;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f16eyofs .fui-Button,.f16eyofs .fui-Link{border-bottom-color:currentColor;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1wkmkig .fui-Button,.f1wkmkig .fui-Link{color:currentColor;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f18alut9 .fui-Button,.f18alut9 .fui-Link{outline-color:currentColor;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useStylesGrid = /* @__PURE__ */ __styles({
  root: {
    mc9l5x: "f13qh94s",
    t4k1zu: "f8a668j"
  },
  image: {
    Br312pm: "fwpfdsa",
    Ijaq50: "fldnz9j"
  },
  header: {
    Br312pm: "fd46tj4",
    Ijaq50: "f16hsg94"
  },
  description: {
    Br312pm: "fd46tj4",
    Ijaq50: "faunodf"
  },
  action: {
    Br312pm: "fis13di",
    Ijaq50: "fldnz9j"
  }
}, {
  d: [".f13qh94s{display:grid;}", ".f8a668j{grid-auto-columns:min-content 1fr min-content;}", ".fwpfdsa{grid-column-start:1;}", ".fldnz9j{grid-row-start:span 2;}", ".fd46tj4{grid-column-start:2;}", ".f16hsg94{grid-row-start:1;}", ".faunodf{grid-row-start:2;}", ".fis13di{grid-column-start:3;}"]
});
const useStylesFlex = /* @__PURE__ */ __styles({
  root: {
    mc9l5x: "f22iagw"
  },
  header: {
    Bh6795r: "fqerorx"
  },
  image: {},
  description: {},
  action: {}
}, {
  d: [".f22iagw{display:flex;}", ".fqerorx{flex-grow:1;}"]
});
const useCardHeaderStyles_unstable = (state) => {
  "use no memo";
  const styles = useStyles();
  const stylesGrid = useStylesGrid();
  const stylesFlex = useStylesFlex();
  const boxModelStyles = state.description ? stylesGrid : stylesFlex;
  const getSlotStyles = (slotName) => {
    var _state_slotName;
    return mergeClasses(cardHeaderClassNames[slotName], styles[slotName], boxModelStyles[slotName], (_state_slotName = state[slotName]) === null || _state_slotName === void 0 ? void 0 : _state_slotName.className);
  };
  state.root.className = getSlotStyles("root");
  if (state.image) {
    state.image.className = getSlotStyles("image");
  }
  if (state.header) {
    state.header.className = getSlotStyles("header");
  }
  if (state.description) {
    state.description.className = getSlotStyles("description");
  }
  if (state.action) {
    state.action.className = getSlotStyles("action");
  }
  return state;
};
const cardClassNames = {
  root: "fui-Card",
  floatingAction: "fui-Card__floatingAction",
  checkbox: "fui-Card__checkbox"
};
const useCardResetStyles = /* @__PURE__ */ __resetStyles("rfxo2k2", "rgle7w9", [".rfxo2k2{overflow:hidden;border-radius:var(--fui-Card--border-radius);padding:var(--fui-Card--size);gap:var(--fui-Card--size);display:flex;position:relative;box-sizing:border-box;color:var(--colorNeutralForeground1);}", '.rfxo2k2::after{position:absolute;top:0;left:0;right:0;bottom:0;content:"";pointer-events:none;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-width:var(--strokeWidthThin);border-right-width:var(--strokeWidthThin);border-bottom-width:var(--strokeWidthThin);border-left-width:var(--strokeWidthThin);border-radius:var(--fui-Card--border-radius);}', ".rfxo2k2>.fui-CardHeader,.rfxo2k2>.fui-CardFooter{flex-shrink:0;}", ".rgle7w9{overflow:hidden;border-radius:var(--fui-Card--border-radius);padding:var(--fui-Card--size);gap:var(--fui-Card--size);display:flex;position:relative;box-sizing:border-box;color:var(--colorNeutralForeground1);}", '.rgle7w9::after{position:absolute;top:0;right:0;left:0;bottom:0;content:"";pointer-events:none;border-top-style:solid;border-left-style:solid;border-bottom-style:solid;border-right-style:solid;border-top-width:var(--strokeWidthThin);border-left-width:var(--strokeWidthThin);border-bottom-width:var(--strokeWidthThin);border-right-width:var(--strokeWidthThin);border-radius:var(--fui-Card--border-radius);}', ".rgle7w9>.fui-CardHeader,.rgle7w9>.fui-CardFooter{flex-shrink:0;}"]);
const useCardStyles = /* @__PURE__ */ __styles({
  focused: {
    Brovlpu: "ftqa4ok",
    B486eqv: "f2hkw1w",
    B8q5s1w: "f8hki3x",
    Bci5o5g: ["f1d2448m", "ffh67wi"],
    n8qw10: "f1bjia2o",
    Bdrgwmp: ["ffh67wi", "f1d2448m"],
    Bb7d1vk: "f226i61",
    zhwhgb: ["f13kzufm", "fsx75g8"],
    dhy2o1: "flujwa2",
    Gfyso: ["fsx75g8", "f13kzufm"],
    Bm4h7ae: "f15bsgw9",
    B7ys5i9: "f14e48fq",
    Busjfv9: "f18yb2kv",
    Bhk32uz: "fd6o370",
    f6g5ot: 0,
    Boxcth7: 0,
    Bhdgwq3: 0,
    hgwjuy: 0,
    Bshpdp8: 0,
    Bsom6fd: 0,
    Blkhhs4: 0,
    Bonggc9: 0,
    Ddfuxk: 0,
    i03rao: 0,
    kclons: 0,
    clg4pj: 0,
    Bpqj9nj: 0,
    B6dhp37: 0,
    Bf4ptjt: 0,
    Bqtpl0w: 0,
    i4rwgc: "fpqizxz",
    Dah5zi: 0,
    B1tsrr9: 0,
    qqdqy8: 0,
    Bkh64rk: 0,
    e3fwne: "fnd8nzh",
    J0r882: "f15fr7a0",
    Bule8hv: ["fwsq40z", "fy0y4wt"],
    Bjwuhne: "f34ld9f",
    Ghsupd: ["fy0y4wt", "fwsq40z"]
  },
  selectableFocused: {
    Brovlpu: "ftqa4ok",
    B486eqv: "f2hkw1w",
    Bssx7fj: "f1b1k54r",
    uh7if5: ["f4ne723", "fqqcjud"],
    clntm0: "fh7aioi",
    Dlk2r6: ["fqqcjud", "f4ne723"],
    Bm3wd5j: "f1k55ka9",
    Bbrhkcr: ["fgclinu", "f16pcs8n"],
    f1oku: "fycbxed",
    aywvf2: ["f16pcs8n", "fgclinu"],
    B2j2mmj: "ffht0p2",
    wigs8: "f1p0ul1q",
    pbfy6t: "f1c901ms",
    B0v4ure: "f1alokd7",
    Byrf0fs: 0,
    Bsiemmq: 0,
    Bwckmig: 0,
    skfxo0: 0,
    Iidy0u: 0,
    B98u21t: 0,
    Bvwlmkc: 0,
    jo1ztg: 0,
    Ba1iezr: 0,
    Blmvk6g: 0,
    B24cy0v: 0,
    Bil7v7r: 0,
    Br3gin4: 0,
    nr063g: 0,
    ghq09: 0,
    Bbgo44z: 0,
    Bseh09z: "f1i978nd",
    az1dzo: 0,
    Ba3ybja: 0,
    B6352mv: 0,
    vppk2z: 0,
    Biaj6j7: "f1nh8hsq",
    B2pnrqr: "f1amxum7",
    B29w5g4: ["f1cec8w7", "f554mv0"],
    Bhhzhcn: "f1sj6kbr",
    Bec0n69: ["f554mv0", "f1cec8w7"]
  },
  orientationHorizontal: {
    Beiy3e4: "f1063pyq",
    Bt984gj: "f122n59",
    Binpb3b: "ftrw7vg",
    qrt8p2: "f18opajm",
    k6ws3r: ["f13002it", "fqo182t"],
    Btcwela: ["f18yna97", "f1kd6wh7"],
    Fer9m8: "f4i4759"
  },
  orientationVertical: {
    Beiy3e4: "f1vx9l62",
    B5nvv7i: ["f14k419y", "f1fgo9fz"],
    Baxg94k: ["f1fgo9fz", "f14k419y"],
    tn21ii: "fvqmfsm",
    B0ud6bj: "f3am6yf",
    Bgdo4j: "f1r5wgso"
  },
  sizeSmall: {
    B7balbw: "f1pi9uxy",
    B1h88n7: "f1h1zgly"
  },
  sizeMedium: {
    B7balbw: "frsmuga",
    B1h88n7: "fuldkky"
  },
  sizeLarge: {
    B7balbw: "f1qua4xo",
    B1h88n7: "fimkt6v"
  },
  interactive: {
    rhjd8f: "f1epqm3e"
  },
  filled: {
    De3pzq: "fxugw4r",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"]
  },
  filledInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "fxugw4r",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"],
    Bi91k9c: "feu1g3u",
    Jwef8y: "f1knas48",
    Bvxd0ez: "f1m145df",
    ecr2s2: "fb40n2d"
  },
  filledInteractiveSelected: {
    De3pzq: "f1nfm20t",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "fx9teim",
    Jwef8y: "f1kz6goq"
  },
  filledAlternative: {
    De3pzq: "f1dmdbja",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"]
  },
  filledAlternativeInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "f1dmdbja",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"],
    Bi91k9c: "fnwyq0v",
    Jwef8y: "f1uvynv3",
    Bvxd0ez: "f1m145df",
    ecr2s2: "f1yhgkbh"
  },
  filledAlternativeInteractiveSelected: {
    De3pzq: "fjxa0vh",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "f1luvkty",
    Jwef8y: "fehi0vp"
  },
  outline: {
    De3pzq: "f1c21dwh",
    E5pizo: "f1couhl3",
    B0n5ga8: "ft83z1f",
    s924m2: ["f1g4150c", "f192dr6e"],
    B1q35kw: "f1qnawh6",
    Gp14am: ["f192dr6e", "f1g4150c"]
  },
  outlineInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "f1c21dwh",
    E5pizo: "f1couhl3",
    B0n5ga8: "ft83z1f",
    s924m2: ["f1g4150c", "f192dr6e"],
    B1q35kw: "f1qnawh6",
    Gp14am: ["f192dr6e", "f1g4150c"],
    Bi91k9c: "feu1g3u",
    Jwef8y: "fjxutwb",
    Be0v6ae: "f1llr77y",
    B5kxglz: ["fzk0khw", "fjj8tog"],
    B3pwyw6: "fb1u8ub",
    Bymgtzf: ["fjj8tog", "fzk0khw"],
    ecr2s2: "fophhak",
    dmfk: "f1uohb70",
    B4ofi8: ["f1jm7v1n", "f1bus3rq"],
    jgq6uv: "f1fbu7rr",
    Baxewws: ["f1bus3rq", "f1jm7v1n"]
  },
  outlineInteractiveSelected: {
    De3pzq: "f1q9pm1r",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "fx9teim",
    Jwef8y: "fg59vm4"
  },
  subtle: {
    De3pzq: "fhovq9v",
    E5pizo: "f1couhl3",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"]
  },
  subtleInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "fhovq9v",
    E5pizo: "f1couhl3",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"],
    Bi91k9c: "feu1g3u",
    Jwef8y: "f1t94bn6",
    ecr2s2: "f1wfn5kd"
  },
  subtleInteractiveSelected: {
    De3pzq: "fq5gl1p",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "fx9teim",
    Jwef8y: "f1uqaxdt"
  },
  highContrastSelected: {
    ycbfsm: "fkc42ay",
    Bsw6fvg: "f1rirnrt",
    Bbusuzp: "f1lkg8j3",
    xgfqdd: "f1nkj0oa",
    Bmmdzwq: "fey3rwa",
    zkpvhj: ["f5jhx11", "fff9uym"],
    B20bydw: "fm7n0jy",
    Bwwwggl: ["fff9uym", "f5jhx11"]
  },
  highContrastInteractive: {
    h1vhog: "fpfvv3l",
    kslmdy: "f1oamsm6",
    Baaf6ca: "f1il21bs",
    x9zz3d: "fnn5dk0",
    Bmmdzwq: "fey3rwa",
    zkpvhj: ["f5jhx11", "fff9uym"],
    B20bydw: "fm7n0jy",
    Bwwwggl: ["fff9uym", "f5jhx11"]
  },
  select: {
    qhf8xq: "f1euv43f",
    Bhzewxz: "fqclxi7",
    j35jbq: ["fiv86kb", "f36uhnt"],
    Bj3rh1h: "f19g0ac"
  },
  hiddenCheckbox: {
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp",
    a9b677: "frkrog8",
    Bqenvij: "f1mpe4l3",
    qhf8xq: "f1euv43f",
    Bh84pgu: "fmf1zke",
    Bgl5zvf: "f1wch0ki",
    Huce71: "fz5stix"
  }
}, {
  f: [".ftqa4ok:focus{outline-style:none;}"],
  i: [".f2hkw1w:focus-visible{outline-style:none;}"],
  d: [".f8hki3x[data-fui-focus-visible]{border-top-color:transparent;}", ".f1d2448m[data-fui-focus-visible]{border-right-color:transparent;}", ".ffh67wi[data-fui-focus-visible]{border-left-color:transparent;}", ".f1bjia2o[data-fui-focus-visible]{border-bottom-color:transparent;}", '.f15bsgw9[data-fui-focus-visible]::after{content:"";}', ".f14e48fq[data-fui-focus-visible]::after{position:absolute;}", ".f18yb2kv[data-fui-focus-visible]::after{pointer-events:none;}", ".fd6o370[data-fui-focus-visible]::after{z-index:1;}", [".fpqizxz[data-fui-focus-visible]::after{border:var(--strokeWidthThick) solid var(--colorStrokeFocus2);}", {
    p: -2
  }], [".fnd8nzh[data-fui-focus-visible]::after{border-radius:var(--fui-Card--border-radius);}", {
    p: -1
  }], ".f15fr7a0[data-fui-focus-visible]::after{top:calc(0px - var(--strokeWidthThick) - -2px);}", ".fwsq40z[data-fui-focus-visible]::after{right:calc(0px - var(--strokeWidthThick) - -2px);}", ".fy0y4wt[data-fui-focus-visible]::after{left:calc(0px - var(--strokeWidthThick) - -2px);}", ".f34ld9f[data-fui-focus-visible]::after{bottom:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1b1k54r[data-fui-focus-within]:focus-within{border-top-color:transparent;}", ".f4ne723[data-fui-focus-within]:focus-within{border-right-color:transparent;}", ".fqqcjud[data-fui-focus-within]:focus-within{border-left-color:transparent;}", ".fh7aioi[data-fui-focus-within]:focus-within{border-bottom-color:transparent;}", '.ffht0p2[data-fui-focus-within]:focus-within::after{content:"";}', ".f1p0ul1q[data-fui-focus-within]:focus-within::after{position:absolute;}", ".f1c901ms[data-fui-focus-within]:focus-within::after{pointer-events:none;}", ".f1alokd7[data-fui-focus-within]:focus-within::after{z-index:1;}", [".f1i978nd[data-fui-focus-within]:focus-within::after{border:var(--strokeWidthThick) solid var(--colorStrokeFocus2);}", {
    p: -2
  }], [".f1nh8hsq[data-fui-focus-within]:focus-within::after{border-radius:var(--fui-Card--border-radius);}", {
    p: -1
  }], ".f1amxum7[data-fui-focus-within]:focus-within::after{top:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1cec8w7[data-fui-focus-within]:focus-within::after{right:calc(0px - var(--strokeWidthThick) - -2px);}", ".f554mv0[data-fui-focus-within]:focus-within::after{left:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1sj6kbr[data-fui-focus-within]:focus-within::after{bottom:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1063pyq{flex-direction:row;}", ".f122n59{align-items:center;}", ".ftrw7vg>.fui-CardPreview{margin-top:calc(var(--fui-Card--size) * -1);}", ".f18opajm>.fui-CardPreview{margin-bottom:calc(var(--fui-Card--size) * -1);}", '.f13002it>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-left:calc(var(--fui-Card--size) * -1);}', '.fqo182t>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-right:calc(var(--fui-Card--size) * -1);}', '.f18yna97>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-right:calc(var(--fui-Card--size) * -1);}', '.f1kd6wh7>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-left:calc(var(--fui-Card--size) * -1);}', ".f4i4759>.fui-CardHeader:last-of-type,.f4i4759>.fui-CardFooter:last-of-type{flex-grow:1;}", ".f1vx9l62{flex-direction:column;}", ".f14k419y>.fui-CardPreview{margin-left:calc(var(--fui-Card--size) * -1);}", ".f1fgo9fz>.fui-CardPreview{margin-right:calc(var(--fui-Card--size) * -1);}", '.fvqmfsm>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-top:calc(var(--fui-Card--size) * -1);}', ".f3am6yf>.fui-Card__floatingAction+.fui-CardPreview{margin-top:calc(var(--fui-Card--size) * -1);}", '.f1r5wgso>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-bottom:calc(var(--fui-Card--size) * -1);}', ".f1pi9uxy{--fui-Card--size:8px;}", ".f1h1zgly{--fui-Card--border-radius:var(--borderRadiusSmall);}", ".frsmuga{--fui-Card--size:12px;}", ".fuldkky{--fui-Card--border-radius:var(--borderRadiusMedium);}", ".f1qua4xo{--fui-Card--size:16px;}", ".fimkt6v{--fui-Card--border-radius:var(--borderRadiusLarge);}", ".f1epqm3e .fui-Text{color:currentColor;}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".f1whvlc6{box-shadow:var(--shadow4);}", ".f16gxe2i::after{border-top-color:var(--colorTransparentStroke);}", ".fpgykix::after{border-right-color:var(--colorTransparentStroke);}", ".fzybk4o::after{border-left-color:var(--colorTransparentStroke);}", ".f1osi826::after{border-bottom-color:var(--colorTransparentStroke);}", ".f1k6fduh{cursor:pointer;}", ".f1nfm20t{background-color:var(--colorNeutralBackground1Selected);}", ".f16eln5f::after{border-top-color:var(--colorNeutralStroke1Selected);}", ".fa2okxs::after{border-right-color:var(--colorNeutralStroke1Selected);}", ".fg4zq3l::after{border-left-color:var(--colorNeutralStroke1Selected);}", ".ff6932p::after{border-bottom-color:var(--colorNeutralStroke1Selected);}", ".f1dmdbja{background-color:var(--colorNeutralBackground2);}", ".fjxa0vh{background-color:var(--colorNeutralBackground2Selected);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".f1couhl3{box-shadow:none;}", ".ft83z1f::after{border-top-color:var(--colorNeutralStroke1);}", ".f1g4150c::after{border-right-color:var(--colorNeutralStroke1);}", ".f192dr6e::after{border-left-color:var(--colorNeutralStroke1);}", ".f1qnawh6::after{border-bottom-color:var(--colorNeutralStroke1);}", ".f1q9pm1r{background-color:var(--colorTransparentBackgroundSelected);}", ".fhovq9v{background-color:var(--colorSubtleBackground);}", ".fq5gl1p{background-color:var(--colorSubtleBackgroundSelected);}", ".f1euv43f{position:absolute;}", ".fqclxi7{top:4px;}", ".fiv86kb{right:4px;}", ".f36uhnt{left:4px;}", ".f19g0ac{z-index:1;}", [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }], ".frkrog8{width:1px;}", ".f1mpe4l3{height:1px;}", ".fmf1zke{clip:rect(0 0 0 0);}", ".f1wch0ki{clip-path:inset(50%);}", ".fz5stix{white-space:nowrap;}"],
  m: [["@media (forced-colors: active){.f226i61[data-fui-focus-visible]::after{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f13kzufm[data-fui-focus-visible]::after{border-right-color:Highlight;}.fsx75g8[data-fui-focus-visible]::after{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.flujwa2[data-fui-focus-visible]::after{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1k55ka9[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f16pcs8n[data-fui-focus-within]:focus-within::after{border-left-color:Highlight;}.fgclinu[data-fui-focus-within]:focus-within::after{border-right-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fycbxed[data-fui-focus-within]:focus-within::after{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fkc42ay{forced-color-adjust:none;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1rirnrt{background-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1lkg8j3{color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1nkj0oa .fui-CardPreview,.f1nkj0oa .fui-CardFooter{forced-color-adjust:auto;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fey3rwa::after{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f5jhx11::after{border-right-color:Highlight;}.fff9uym::after{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fm7n0jy::after{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fpfvv3l:hover,.fpfvv3l :active{forced-color-adjust:none;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1oamsm6:hover,.f1oamsm6 :active{background-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1il21bs:hover,.f1il21bs :active{color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fnn5dk0:hover .fui-CardPreview,.fnn5dk0 :active .fui-CardPreview,.fnn5dk0:hover .fui-CardFooter,.fnn5dk0 :active .fui-CardFooter{forced-color-adjust:auto;}}", {
    m: "(forced-colors: active)"
  }]],
  h: [".feu1g3u:hover{color:var(--colorNeutralForeground1Hover);}", ".f1knas48:hover{background-color:var(--colorNeutralBackground1Hover);}", ".f1m145df:hover{box-shadow:var(--shadow8);}", ".fx9teim:hover{color:var(--colorNeutralForeground1Selected);}", ".f1kz6goq:hover{background-color:var(--colorNeutralBackground1Selected);}", ".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}", ".f1uvynv3:hover{background-color:var(--colorNeutralBackground2Hover);}", ".f1luvkty:hover{color:var(--colorNeutralForeground2Selected);}", ".fehi0vp:hover{background-color:var(--colorNeutralBackground2Selected);}", ".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}", ".f1llr77y:hover::after{border-top-color:var(--colorNeutralStroke1Hover);}", ".fzk0khw:hover::after{border-right-color:var(--colorNeutralStroke1Hover);}", ".fjj8tog:hover::after{border-left-color:var(--colorNeutralStroke1Hover);}", ".fb1u8ub:hover::after{border-bottom-color:var(--colorNeutralStroke1Hover);}", ".fg59vm4:hover{background-color:var(--colorTransparentBackgroundSelected);}", ".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}", ".f1uqaxdt:hover{background-color:var(--colorSubtleBackgroundSelected);}"],
  a: [".fb40n2d:active{background-color:var(--colorNeutralBackground1Pressed);}", ".f1yhgkbh:active{background-color:var(--colorNeutralBackground2Pressed);}", ".fophhak:active{background-color:var(--colorTransparentBackgroundPressed);}", ".f1uohb70:active::after{border-top-color:var(--colorNeutralStroke1Pressed);}", ".f1jm7v1n:active::after{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f1bus3rq:active::after{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1fbu7rr:active::after{border-bottom-color:var(--colorNeutralStroke1Pressed);}", ".f1wfn5kd:active{background-color:var(--colorSubtleBackgroundPressed);}"]
});
const useCardStyles_unstable = (state) => {
  "use no memo";
  const resetStyles = useCardResetStyles();
  const styles = useCardStyles();
  const orientationMap = {
    horizontal: styles.orientationHorizontal,
    vertical: styles.orientationVertical
  };
  const sizeMap = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge
  };
  const appearanceMap = {
    filled: styles.filled,
    "filled-alternative": styles.filledAlternative,
    outline: styles.outline,
    subtle: styles.subtle
  };
  const selectedMap = {
    filled: styles.filledInteractiveSelected,
    "filled-alternative": styles.filledAlternativeInteractiveSelected,
    outline: styles.outlineInteractiveSelected,
    subtle: styles.subtleInteractiveSelected
  };
  const interactiveMap = {
    filled: styles.filledInteractive,
    "filled-alternative": styles.filledAlternativeInteractive,
    outline: styles.outlineInteractive,
    subtle: styles.subtleInteractive
  };
  const isSelectableOrInteractive = state.interactive || state.selectable;
  const focusedClassName = reactExports.useMemo(() => {
    if (state.selectable) {
      if (state.selectFocused) {
        return styles.selectableFocused;
      }
      return "";
    }
    return styles.focused;
  }, [state.selectFocused, state.selectable, styles.focused, styles.selectableFocused]);
  state.root.className = mergeClasses(cardClassNames.root, resetStyles, orientationMap[state.orientation], sizeMap[state.size], appearanceMap[state.appearance], isSelectableOrInteractive && styles.interactive, isSelectableOrInteractive && interactiveMap[state.appearance], state.selected && selectedMap[state.appearance], focusedClassName, isSelectableOrInteractive && styles.highContrastInteractive, state.selected && styles.highContrastSelected, state.root.className);
  if (state.floatingAction) {
    state.floatingAction.className = mergeClasses(cardClassNames.floatingAction, styles.select, state.floatingAction.className);
  }
  if (state.checkbox) {
    state.checkbox.className = mergeClasses(cardClassNames.checkbox, styles.hiddenCheckbox, state.checkbox.className);
  }
  return state;
};
function useCardContextValue({ selectableA11yProps }) {
  return {
    selectableA11yProps
  };
}
const Card = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useCard_unstable(props, ref);
  const cardContextValue = useCardContextValue(state);
  useCardStyles_unstable(state);
  return renderCard_unstable(state, cardContextValue);
});
Card.displayName = "Card";
function getChildWithId(header) {
  function isReactElementWithIdProp(element) {
    return reactExports.isValidElement(element) && Boolean(element.props.id);
  }
  return reactExports.Children.toArray(header).find(isReactElementWithIdProp);
}
function getReferenceId(headerId, childWithId, generatedId) {
  if (headerId) {
    return headerId;
  }
  if (childWithId === null || childWithId === void 0 ? void 0 : childWithId.props.id) {
    return childWithId.props.id;
  }
  return generatedId;
}
const useCardHeader_unstable = (props, ref) => {
  const { image, header, description, action } = props;
  const { selectableA11yProps: { referenceId, setReferenceId } } = useCardContext_unstable();
  const headerRef = reactExports.useRef(null);
  const hasChildId = reactExports.useRef(false);
  const generatedId = useId(cardHeaderClassNames.header, referenceId);
  const headerSlot = optional(header, {
    renderByDefault: true,
    defaultProps: {
      ref: headerRef,
      id: !hasChildId.current ? referenceId : void 0
    },
    elementType: "div"
  });
  reactExports.useEffect(() => {
    var _headerRef_current;
    const headerId = !hasChildId.current ? (_headerRef_current = headerRef.current) === null || _headerRef_current === void 0 ? void 0 : _headerRef_current.id : void 0;
    const childWithId = getChildWithId(headerSlot === null || headerSlot === void 0 ? void 0 : headerSlot.children);
    hasChildId.current = Boolean(childWithId);
    setReferenceId(getReferenceId(headerId, childWithId, generatedId));
  }, [
    generatedId,
    header,
    headerSlot,
    setReferenceId
  ]);
  return {
    components: {
      root: "div",
      image: "div",
      header: "div",
      description: "div",
      action: "div"
    },
    root: always(getIntrinsicElementProps("div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "div"
    }),
    image: optional(image, {
      elementType: "div"
    }),
    header: headerSlot,
    description: optional(description, {
      elementType: "div"
    }),
    action: optional(action, {
      elementType: "div"
    })
  };
};
const renderCardHeader_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.image && /* @__PURE__ */ jsx(state.image, {}),
      /* @__PURE__ */ jsx(state.header, {}),
      state.description && /* @__PURE__ */ jsx(state.description, {}),
      state.action && /* @__PURE__ */ jsx(state.action, {})
    ]
  });
};
const CardHeader = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useCardHeader_unstable(props, ref);
  useCardHeaderStyles_unstable(state);
  return renderCardHeader_unstable(state);
});
CardHeader.displayName = "CardHeader";
const useStackClassName = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  rowGap: tokens.spacingVerticalL
});
const Dashboard = () => {
  const mediaQuery = window.matchMedia("(max-width: 560px)");
  const [verticalToolbar, setVerticalToolbar] = reactExports.useState(mediaQuery.matches);
  const [appsLoading, setAppsLoading] = reactExports.useState(false);
  const [profileLoading, setProfileLoading] = reactExports.useState(false);
  const [logoutLoading, setLogoutLoading] = reactExports.useState(false);
  const [openAppsModal, setOpenAppsModal] = reactExports.useState(false);
  const [apps, setApps] = reactExports.useState([]);
  const [openProfileModal, setOpenProfileModal] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [full_name, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [profileSaveLoading, setProfileSaveLoading] = reactExports.useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = reactExports.useState(false);
  const [password, setPassword] = reactExports.useState("");
  const [newPassword1, setNewPassword1] = reactExports.useState("");
  const [newPassword2, setNewPassword2] = reactExports.useState("");
  const [passwordNotMatch, setPasswordsNotMatch] = reactExports.useState(true);
  const [passwordValidation, setPasswordValidation] = reactExports.useState("");
  const [updatePasswordLoading, setUpdatePasswordLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    mediaQuery.addEventListener("change", (e2) => setVerticalToolbar(e2.matches));
  }, [setVerticalToolbar]);
  const handleApps = async () => {
    setAppsLoading(true);
    try {
      const listApps = await window.connectors.profile.listApps();
      console.log(listApps);
      setApps(listApps);
    } catch (error) {
      console.error(error);
    }
    setAppsLoading(false);
    setOpenAppsModal(true);
  };
  const handleLaunchApp = (app) => () => window.launchApp(app.package_name);
  const handleProfile = async () => {
    setProfileLoading(true);
    try {
      const profile = await window.connectors.profile.info();
      setName(profile.name);
      setFullName(profile.full_name);
      setEmail(profile.email);
      setPhone(profile.phone);
      setOpenProfileModal(true);
    } catch (error) {
      console.error(error);
    }
    setProfileLoading(false);
  };
  const handleSaveProfile = async () => {
    setProfileSaveLoading(true);
    try {
      await window.connectors.profile.update({ name, full_name, email, phone });
    } catch (error) {
      console.error(error);
    }
    setProfileSaveLoading(false);
  };
  const handleSaveUpdatePassword = async () => {
    if (!passwordNotMatch || !password || !newPassword1 || !newPassword2) {
      return;
    }
    setUpdatePasswordLoading(true);
    try {
      const response = await window.connectors.profile.updatePassword({
        current_password: password,
        new_password: newPassword1
      });
      if (!response.ok) {
        setPasswordValidation(response.message);
      }
    } catch (error) {
      console.error(error);
    }
    setUpdatePasswordLoading(false);
  };
  const handleLogout = () => {
    setLogoutLoading(true);
    window.connectors.auth.logOut().then(() => window.location.reload());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        modalType: "non-modal",
        open: openAppsModal,
        onOpenChange: (_, data) => setOpenAppsModal(data.open),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogSurface, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Apps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "apps", children: [
            apps.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No hay apps." }),
            apps.map((app, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "app",
                onClick: handleLaunchApp(app),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CardHeader,
                    {
                      image: /* @__PURE__ */ jsxRuntimeExports.jsx(Apps28Filled, {}),
                      header: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { weight: "semibold", children: app.title }),
                      description: /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: "caption", children: app.author })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text", children: app.description })
                ]
              },
              index
            ))
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        modalType: "non-modal",
        open: openProfileModal,
        onOpenChange: (_, data) => !data.open && !profileSaveLoading && setOpenProfileModal(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogSurface, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Perfil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: useStackClassName(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Nombre de usuario",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "text",
                    disabled: true,
                    value: name
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Nombre completo",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "text",
                    value: full_name,
                    disabled: profileSaveLoading,
                    onChange: (e2) => setFullName(e2.target.value)
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Correo electrónico",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "email",
                    value: email,
                    disabled: profileSaveLoading,
                    onChange: (e2) => setEmail(e2.target.value)
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Teléfono",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "tel",
                    value: phone,
                    disabled: profileSaveLoading,
                    onChange: (e2) => setPhone(e2.target.value)
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogActions, { children: profileSaveLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: handleSaveProfile, children: "Guardar" }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        modalType: "non-modal",
        open: openUpdatePassword,
        onOpenChange: (_, data) => !data.open && !updatePasswordLoading && setOpenUpdatePassword(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogSurface, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogBody, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Cambiar contraseña" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: useStackClassName(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Contraseña actual",
                validationState: passwordValidation === "" ? "none" : "error",
                validationMessage: passwordValidation,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "password",
                    value: password,
                    onChange: (e2) => {
                      setPassword(e2.target.value);
                      setPasswordValidation("");
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Nueva contraseña",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "password",
                    value: newPassword1,
                    onChange: (e2) => setNewPassword1(e2.target.value)
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Repite la nueva contraseña",
                validationState: passwordNotMatch ? "none" : "error",
                validationMessage: passwordNotMatch ? "" : "Las contraseñas no coinciden.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "password",
                    value: newPassword2,
                    onChange: (e2) => setNewPassword2(e2.target.value),
                    onBlur: () => setPasswordsNotMatch(newPassword1 === newPassword2)
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogActions, { children: updatePasswordLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: handleSaveUpdatePassword, children: "Cambiar" }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Toolbar, { vertical: verticalToolbar, size: "large", children: [
      !appsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarButton,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TableFilled, {}),
          vertical: true,
          onClick: handleApps,
          children: "Apps"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
      !profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarButton,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PersonFilled, {}),
          vertical: true,
          onClick: handleProfile,
          children: "Perfil"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarButton,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyMultipleFilled, {}),
          vertical: true,
          onClick: () => setOpenUpdatePassword(true),
          children: "Cambiar contraseña"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarDivider, {}),
      !logoutLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarButton,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowExitFilled, {}),
          vertical: true,
          onClick: handleLogout,
          children: "Cerrar sesión"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {})
    ] })
  ] });
};
export {
  Dashboard as default
};
//# sourceMappingURL=Dashboard-ggiZ_UTX.js.map
