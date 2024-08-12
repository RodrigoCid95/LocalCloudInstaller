import { m as murmur2, H as HASH_PREFIX, R as RESET, U as UNSUPPORTED_CSS_PROPERTIES, i as insertionFactory, r as reduceToClassNameForSlots, u as useTextDirection, a as useRenderer, b as insertionFactory$1, _ as __styles, c as reactExports, d as mergeClasses, e as useCustomStyleHook, j as jsxRuntimeExports, S as Spinner } from "../app.js";
import { c as convertProperty, a as compileAtomicCSSRule, b as compileKeyframeRule, d as convert, e as compileKeyframesCSS, i as isObject, f as isNestedSelector, n as normalizeNestedProperty, g as isMediaQuerySelector, h as isLayerSelector, j as isSupportQuerySelector, k as isContainerQuerySelector, l as createFluentIcon, u as useControllableState, m as useEventCallback, o as mergeCallbacks, p as useButton_unstable, q as useButtonStyles_unstable, r as renderButton_unstable, t as tokens, F as Field, I as Input, B as Button } from "./Input-CYceLVOy.js";
const positionMap = ["Top", "Right", "Bottom", "Left"];
function generateStyles(property, suffix, ...values) {
  const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values;
  const valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  const styles = {};
  for (let i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      const newKey = property + positionMap[i] + suffix;
      styles[newKey] = valuesWithDefaults[i];
    }
  }
  return styles;
}
function borderWidth(...values) {
  return generateStyles("border", "Width", ...values);
}
function borderStyle(...values) {
  return generateStyles("border", "Style", ...values);
}
function borderColor(...values) {
  return generateStyles("border", "Color", ...values);
}
const LINE_STYLES = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
function isBorderStyle(value) {
  return LINE_STYLES.includes(value);
}
function border(...values) {
  if (isBorderStyle(values[0])) {
    return Object.assign({}, borderStyle(values[0]), values[1] && borderWidth(values[1]), values[2] && borderColor(values[2]));
  }
  return Object.assign({}, borderWidth(values[0]), values[1] && borderStyle(values[1]), values[2] && borderColor(values[2]));
}
function borderLeft(...values) {
  if (isBorderStyle(values[0])) {
    return Object.assign({
      borderLeftStyle: values[0]
    }, values[1] && {
      borderLeftWidth: values[1]
    }, values[2] && {
      borderLeftColor: values[2]
    });
  }
  return Object.assign({
    borderLeftWidth: values[0]
  }, values[1] && {
    borderLeftStyle: values[1]
  }, values[2] && {
    borderLeftColor: values[2]
  });
}
function borderBottom(...values) {
  if (isBorderStyle(values[0])) {
    return Object.assign({
      borderBottomStyle: values[0]
    }, values[1] && {
      borderBottomWidth: values[1]
    }, values[2] && {
      borderBottomColor: values[2]
    });
  }
  return Object.assign({
    borderBottomWidth: values[0]
  }, values[1] && {
    borderBottomStyle: values[1]
  }, values[2] && {
    borderBottomColor: values[2]
  });
}
function borderRight(...values) {
  if (isBorderStyle(values[0])) {
    return Object.assign({
      borderRightStyle: values[0]
    }, values[1] && {
      borderRightWidth: values[1]
    }, values[2] && {
      borderRightColor: values[2]
    });
  }
  return Object.assign({
    borderRightWidth: values[0]
  }, values[1] && {
    borderRightStyle: values[1]
  }, values[2] && {
    borderRightColor: values[2]
  });
}
function borderTop(...values) {
  if (isBorderStyle(values[0])) {
    return Object.assign({
      borderTopStyle: values[0]
    }, values[1] && {
      borderTopWidth: values[1]
    }, values[2] && {
      borderTopColor: values[2]
    });
  }
  return Object.assign({
    borderTopWidth: values[0]
  }, values[1] && {
    borderTopStyle: values[1]
  }, values[2] && {
    borderTopColor: values[2]
  });
}
function borderRadius(value1, value2 = value1, value3 = value1, value4 = value2) {
  return {
    borderBottomRightRadius: value3,
    borderBottomLeftRadius: value4,
    borderTopRightRadius: value2,
    borderTopLeftRadius: value1
  };
}
const isUnit = (value) => typeof value === "string" && /(\d+(\w+|%))/.test(value);
const isUnitless = (value) => typeof value === "number" && !Number.isNaN(value);
const isInitial = (value) => value === "initial";
const isAuto = (value) => value === "auto";
const isNone = (value) => value === "none";
const widthReservedKeys = ["content", "fit-content", "max-content", "min-content"];
const isWidth = (value) => widthReservedKeys.some((key) => value === key) || isUnit(value);
function flex(...values) {
  const isOneValueSyntax = values.length === 1;
  const isTwoValueSyntax = values.length === 2;
  const isThreeValueSyntax = values.length === 3;
  if (isOneValueSyntax) {
    const [firstValue] = values;
    if (isInitial(firstValue)) {
      return {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto"
      };
    }
    if (isAuto(firstValue)) {
      return {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto"
      };
    }
    if (isNone(firstValue)) {
      return {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "auto"
      };
    }
    if (isUnitless(firstValue)) {
      return {
        flexGrow: firstValue,
        flexShrink: 1,
        flexBasis: 0
      };
    }
    if (isWidth(firstValue)) {
      return {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: firstValue
      };
    }
  }
  if (isTwoValueSyntax) {
    const [firstValue, secondValue] = values;
    if (isUnitless(secondValue)) {
      return {
        flexGrow: firstValue,
        flexShrink: secondValue,
        flexBasis: 0
      };
    }
    if (isWidth(secondValue)) {
      return {
        flexGrow: firstValue,
        flexShrink: 1,
        flexBasis: secondValue
      };
    }
  }
  if (isThreeValueSyntax) {
    const [firstValue, secondValue, thirdValue] = values;
    if (isUnitless(firstValue) && isUnitless(secondValue) && (isAuto(thirdValue) || isWidth(thirdValue))) {
      return {
        flexGrow: firstValue,
        flexShrink: secondValue,
        flexBasis: thirdValue
      };
    }
  }
  return {};
}
function gap(columnGap, rowGap = columnGap) {
  return {
    columnGap,
    rowGap
  };
}
const cssVarRegEx = /var\(.*\)/gi;
function isValidGridAreaInput(value) {
  return value === void 0 || typeof value === "number" || typeof value === "string" && !cssVarRegEx.test(value);
}
const customIdentRegEx = /^[a-zA-Z0-9\-_\\#;]+$/;
const nonCustomIdentRegEx = /^-moz-initial$|^auto$|^initial$|^inherit$|^revert$|^unset$|^span \d+$|^\d.*/;
function isCustomIdent(value) {
  return value !== void 0 && typeof value === "string" && customIdentRegEx.test(value) && !nonCustomIdentRegEx.test(value);
}
function gridArea(...values) {
  if (values.some((value) => !isValidGridAreaInput(value))) {
    return {};
  }
  const gridRowStart = values[0] !== void 0 ? values[0] : "auto";
  const gridColumnStart = values[1] !== void 0 ? values[1] : isCustomIdent(gridRowStart) ? gridRowStart : "auto";
  const gridRowEnd = values[2] !== void 0 ? values[2] : isCustomIdent(gridRowStart) ? gridRowStart : "auto";
  const gridColumnEnd = values[3] !== void 0 ? values[3] : isCustomIdent(gridColumnStart) ? gridColumnStart : "auto";
  return {
    gridRowStart,
    gridColumnStart,
    gridRowEnd,
    gridColumnEnd
  };
}
function margin(...values) {
  return generateStyles("margin", "", ...values);
}
function marginBlock(start, end = start) {
  return {
    marginBlockStart: start,
    marginBlockEnd: end
  };
}
function marginInline(start, end = start) {
  return {
    marginInlineStart: start,
    marginInlineEnd: end
  };
}
function padding(...values) {
  return generateStyles("padding", "", ...values);
}
function paddingBlock(start, end = start) {
  return {
    paddingBlockStart: start,
    paddingBlockEnd: end
  };
}
function paddingInline(start, end = start) {
  return {
    paddingInlineStart: start,
    paddingInlineEnd: end
  };
}
function overflow(overflowX, overflowY = overflowX) {
  return {
    overflowX,
    overflowY
  };
}
function inset(...values) {
  const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values;
  return {
    top: firstValue,
    right: secondValue,
    bottom: thirdValue,
    left: fourthValue
  };
}
function outline(outlineWidth, outlineStyle, outlineColor) {
  return Object.assign({
    outlineWidth
  }, outlineStyle && {
    outlineStyle
  }, outlineColor && {
    outlineColor
  });
}
function transition(...values) {
  if (isTransitionGlobalInputs(values)) {
    return {
      transitionDelay: values[0],
      transitionDuration: values[0],
      transitionProperty: values[0],
      transitionTimingFunction: values[0]
    };
  }
  const transitionInputs = normalizeTransitionInputs(values);
  return transitionInputs.reduce((acc, [property, duration = "0s", delay = "0s", timingFunction = "ease"], index) => {
    if (index === 0) {
      acc.transitionProperty = property;
      acc.transitionDuration = duration;
      acc.transitionDelay = delay;
      acc.transitionTimingFunction = timingFunction;
    } else {
      acc.transitionProperty += `, ${property}`;
      acc.transitionDuration += `, ${duration}`;
      acc.transitionDelay += `, ${delay}`;
      acc.transitionTimingFunction += `, ${timingFunction}`;
    }
    return acc;
  }, {});
}
const transitionGlobalInputs = ["-moz-initial", "inherit", "initial", "revert", "unset"];
function isTransitionGlobalInputs(values) {
  return values.length === 1 && transitionGlobalInputs.includes(values[0]);
}
function normalizeTransitionInputs(transitionInputs) {
  if (transitionInputs.length === 1 && Array.isArray(transitionInputs[0])) {
    return transitionInputs[0];
  }
  return [transitionInputs];
}
function textDecoration(value, ...values) {
  if (values.length === 0) {
    return isTextDecorationStyleInput(value) ? {
      textDecorationStyle: value
    } : {
      textDecorationLine: value
    };
  }
  const [textDecorationStyle, textDecorationColor, textDecorationThickness] = values;
  return Object.assign({
    textDecorationLine: value
  }, textDecorationStyle && {
    textDecorationStyle
  }, textDecorationColor && {
    textDecorationColor
  }, textDecorationThickness && {
    textDecorationThickness
  });
}
const textDecorationStyleInputs = ["dashed", "dotted", "double", "solid", "wavy"];
function isTextDecorationStyleInput(value) {
  return textDecorationStyleInputs.includes(value);
}
const shorthands$1 = {
  animation: [-1, ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimeline", "animationTimingFunction"]],
  animationRange: [-1, ["animationRangeEnd", "animationRangeStart"]],
  background: [-2, ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPosition", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"]],
  backgroundPosition: [-1, ["backgroundPositionX", "backgroundPositionY"]],
  border: [-2, ["borderBottom", "borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderLeft", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRight", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTop", "borderTopColor", "borderTopStyle", "borderTopWidth"]],
  borderBottom: [-1, ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"]],
  borderImage: [-1, ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"]],
  borderLeft: [-1, ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"]],
  borderRadius: [-1, ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"]],
  borderRight: [-1, ["borderRightColor", "borderRightStyle", "borderRightWidth"]],
  borderTop: [-1, ["borderTopColor", "borderTopStyle", "borderTopWidth"]],
  caret: [-1, ["caretColor", "caretShape"]],
  columnRule: [-1, ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"]],
  columns: [-1, ["columnCount", "columnWidth"]],
  containIntrinsicSize: [-1, ["containIntrinsicHeight", "containIntrinsicWidth"]],
  container: [-1, ["containerName", "containerType"]],
  flex: [-1, ["flexBasis", "flexGrow", "flexShrink"]],
  flexFlow: [-1, ["flexDirection", "flexWrap"]],
  font: [-1, ["fontFamily", "fontSize", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "lineHeight"]],
  gap: [-1, ["columnGap", "rowGap"]],
  grid: [-1, ["columnGap", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridColumnGap", "gridRowGap", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows", "rowGap"]],
  gridArea: [-1, ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"]],
  gridColumn: [-1, ["gridColumnEnd", "gridColumnStart"]],
  gridRow: [-1, ["gridRowEnd", "gridRowStart"]],
  gridTemplate: [-1, ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"]],
  inset: [-1, ["bottom", "left", "right", "top"]],
  insetBlock: [-1, ["insetBlockEnd", "insetBlockStart"]],
  insetInline: [-1, ["insetInlineEnd", "insetInlineStart"]],
  listStyle: [-1, ["listStyleImage", "listStylePosition", "listStyleType"]],
  margin: [-1, ["marginBottom", "marginLeft", "marginRight", "marginTop"]],
  marginBlock: [-1, ["marginBlockEnd", "marginBlockStart"]],
  marginInline: [-1, ["marginInlineEnd", "marginInlineStart"]],
  mask: [-1, ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPosition", "maskRepeat", "maskSize"]],
  maskBorder: [-1, ["maskBorderMode", "maskBorderOutset", "maskBorderRepeat", "maskBorderSlice", "maskBorderSource", "maskBorderWidth"]],
  offset: [-1, ["offsetAnchor", "offsetDistance", "offsetPath", "offsetPosition", "offsetRotate"]],
  outline: [-1, ["outlineColor", "outlineStyle", "outlineWidth"]],
  overflow: [-1, ["overflowX", "overflowY"]],
  overscrollBehavior: [-1, ["overscrollBehaviorX", "overscrollBehaviorY"]],
  padding: [-1, ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"]],
  paddingBlock: [-1, ["paddingBlockEnd", "paddingBlockStart"]],
  paddingInline: [-1, ["paddingInlineEnd", "paddingInlineStart"]],
  placeContent: [-1, ["alignContent", "justifyContent"]],
  placeItems: [-1, ["alignItems", "justifyItems"]],
  placeSelf: [-1, ["alignSelf", "justifySelf"]],
  scrollMargin: [-1, ["scrollMarginBottom", "scrollMarginLeft", "scrollMarginRight", "scrollMarginTop"]],
  scrollMarginBlock: [-1, ["scrollMarginBlockEnd", "scrollMarginBlockStart"]],
  scrollMarginInline: [-1, ["scrollMarginInlineEnd", "scrollMarginInlineStart"]],
  scrollPadding: [-1, ["scrollPaddingBottom", "scrollPaddingLeft", "scrollPaddingRight", "scrollPaddingTop"]],
  scrollPaddingBlock: [-1, ["scrollPaddingBlockEnd", "scrollPaddingBlockStart"]],
  scrollPaddingInline: [-1, ["scrollPaddingInlineEnd", "scrollPaddingInlineStart"]],
  scrollTimeline: [-1, ["scrollTimelineAxis", "scrollTimelineName"]],
  textDecoration: [-1, ["textDecorationColor", "textDecorationLine", "textDecorationStyle", "textDecorationThickness"]],
  textEmphasis: [-1, ["textEmphasisColor", "textEmphasisStyle"]],
  transition: [-1, ["transitionBehavior", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"]],
  viewTimeline: [-1, ["viewTimelineAxis", "viewTimelineName"]]
};
function generateCombinedQuery(currentMediaQuery, nestedMediaQuery) {
  if (currentMediaQuery.length === 0) {
    return nestedMediaQuery;
  }
  return `${currentMediaQuery} and ${nestedMediaQuery}`;
}
const pseudosMap = {
  // :focus-within
  "us-w": "w",
  // :focus-visible
  "us-v": "i",
  // :link
  nk: "l",
  // :visited
  si: "v",
  // :focus
  cu: "f",
  // :hover
  ve: "h",
  // :active
  ti: "a"
};
function getStyleBucketName(selectors, atRules) {
  if (atRules.media) {
    return "m";
  }
  if (atRules.layer || atRules.supports) {
    return "t";
  }
  if (atRules.container) {
    return "c";
  }
  if (selectors.length > 0) {
    const normalizedPseudo = selectors[0].trim();
    if (normalizedPseudo.charCodeAt(0) === 58) {
      return pseudosMap[normalizedPseudo.slice(4, 8)] || pseudosMap[normalizedPseudo.slice(3, 5)] || "d";
    }
  }
  return "d";
}
function addAtRulePrefix(atRule, prefix) {
  return atRule ? prefix + atRule : atRule;
}
function atRulesToString(atRules) {
  return addAtRulePrefix(atRules.container, "c") + addAtRulePrefix(atRules.media, "m") + addAtRulePrefix(atRules.layer, "l") + addAtRulePrefix(atRules.supports, "s");
}
function hashPropertyKey(selector, property, atRules) {
  const computedKey = selector + atRulesToString(atRules) + property;
  const hashedKey = murmur2(computedKey);
  const firstCharCode = hashedKey.charCodeAt(0);
  const startsWithNumber = firstCharCode >= 48 && firstCharCode <= 57;
  if (startsWithNumber) {
    return String.fromCharCode(firstCharCode + 17) + hashedKey.slice(1);
  }
  return hashedKey;
}
function hashClassName({
  property,
  selector,
  salt,
  value
}, atRules) {
  return HASH_PREFIX + murmur2(salt + selector + atRulesToString(atRules) + property + // Trimming of value is required to generate consistent hashes
  value.trim());
}
function isResetValue(value) {
  return value === RESET;
}
function trimSelector(selector) {
  return selector.replace(/>\s+/g, ">");
}
function warnAboutUnsupportedProperties(property, value) {
}
function getShorthandDefinition(property) {
  return shorthands$1[property];
}
function computePropertyPriority(shorthand) {
  var _a;
  return (_a = shorthand === null || shorthand === void 0 ? void 0 : shorthand[0]) !== null && _a !== void 0 ? _a : 0;
}
function pushToClassesMap(classesMap, propertyKey, ltrClassname, rtlClassname) {
  classesMap[propertyKey] = rtlClassname ? [ltrClassname, rtlClassname] : ltrClassname;
}
function createBucketEntry(cssRule, metadata) {
  if (metadata.length > 0) {
    return [cssRule, Object.fromEntries(metadata)];
  }
  return cssRule;
}
function pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media, priority) {
  var _a;
  const metadata = [];
  if (priority !== 0) {
    metadata.push(["p", priority]);
  }
  if (styleBucketName === "m" && media) {
    metadata.push(["m", media]);
  }
  (_a = cssRulesByBucket[styleBucketName]) !== null && _a !== void 0 ? _a : cssRulesByBucket[styleBucketName] = [];
  if (ltrCSS) {
    cssRulesByBucket[styleBucketName].push(createBucketEntry(ltrCSS, metadata));
  }
  if (rtlCSS) {
    cssRulesByBucket[styleBucketName].push(createBucketEntry(rtlCSS, metadata));
  }
}
function resolveStyleRules(styles, classNameHashSalt = "", selectors = [], atRules = {
  container: "",
  layer: "",
  media: "",
  supports: ""
}, cssClassesMap = {}, cssRulesByBucket = {}, rtlValue) {
  for (const property in styles) {
    if (UNSUPPORTED_CSS_PROPERTIES.hasOwnProperty(property)) {
      warnAboutUnsupportedProperties(property, styles[property]);
      continue;
    }
    const value = styles[property];
    if (value == null) {
      continue;
    }
    if (isResetValue(value)) {
      const selector = trimSelector(selectors.join(""));
      const key = hashPropertyKey(selector, property, atRules);
      pushToClassesMap(cssClassesMap, key, 0, void 0);
      continue;
    }
    if (typeof value === "string" || typeof value === "number") {
      const selector = trimSelector(selectors.join(""));
      const shorthand = getShorthandDefinition(property);
      if (shorthand) {
        const shorthandProperties = shorthand[1];
        const shorthandResetStyles = Object.fromEntries(shorthandProperties.map((property2) => [property2, RESET]));
        resolveStyleRules(shorthandResetStyles, classNameHashSalt, selectors, atRules, cssClassesMap, cssRulesByBucket);
      }
      const key = hashPropertyKey(selector, property, atRules);
      const className = hashClassName({
        value: value.toString(),
        salt: classNameHashSalt,
        selector,
        property
      }, atRules);
      const rtlDefinition = rtlValue && {
        key: property,
        value: rtlValue
      } || convertProperty(property, value);
      const flippedInRtl = rtlDefinition.key !== property || rtlDefinition.value !== value;
      const rtlClassName = flippedInRtl ? hashClassName({
        value: rtlDefinition.value.toString(),
        property: rtlDefinition.key,
        salt: classNameHashSalt,
        selector
      }, atRules) : void 0;
      const rtlCompileOptions = flippedInRtl ? {
        rtlClassName,
        rtlProperty: rtlDefinition.key,
        rtlValue: rtlDefinition.value
      } : void 0;
      const styleBucketName = getStyleBucketName(selectors, atRules);
      const [ltrCSS, rtlCSS] = compileAtomicCSSRule(Object.assign({
        className,
        selectors,
        property,
        value
      }, rtlCompileOptions), atRules);
      pushToClassesMap(cssClassesMap, key, className, rtlClassName);
      pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, atRules.media, computePropertyPriority(shorthand));
    } else if (property === "animationName") {
      const animationNameValue = Array.isArray(value) ? value : [value];
      const animationNames = [];
      const rtlAnimationNames = [];
      for (const keyframeObject of animationNameValue) {
        const keyframeCSS = compileKeyframeRule(keyframeObject);
        const rtlKeyframeCSS = compileKeyframeRule(convert(keyframeObject));
        const animationName = HASH_PREFIX + murmur2(keyframeCSS);
        let rtlAnimationName;
        const keyframeRules = compileKeyframesCSS(animationName, keyframeCSS);
        let rtlKeyframeRules = [];
        if (keyframeCSS === rtlKeyframeCSS) {
          rtlAnimationName = animationName;
        } else {
          rtlAnimationName = HASH_PREFIX + murmur2(rtlKeyframeCSS);
          rtlKeyframeRules = compileKeyframesCSS(rtlAnimationName, rtlKeyframeCSS);
        }
        for (let i = 0; i < keyframeRules.length; i++) {
          pushToCSSRules(
            cssRulesByBucket,
            // keyframes styles should be inserted into own bucket
            "k",
            keyframeRules[i],
            rtlKeyframeRules[i],
            atRules.media,
            // keyframes always have default priority
            0
          );
        }
        animationNames.push(animationName);
        rtlAnimationNames.push(rtlAnimationName);
      }
      resolveStyleRules({
        animationName: animationNames.join(", ")
      }, classNameHashSalt, selectors, atRules, cssClassesMap, cssRulesByBucket, rtlAnimationNames.join(", "));
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      const selector = trimSelector(selectors.join(""));
      const shorthand = getShorthandDefinition(property);
      if (shorthand) {
        const shorthandProperties = shorthand[1];
        const shorthandResetStyles = Object.fromEntries(shorthandProperties.map((property2) => [property2, RESET]));
        resolveStyleRules(shorthandResetStyles, classNameHashSalt, selectors, atRules, cssClassesMap, cssRulesByBucket);
      }
      const key = hashPropertyKey(selector, property, atRules);
      const className = hashClassName({
        value: value.map((v) => (v !== null && v !== void 0 ? v : "").toString()).join(";"),
        salt: classNameHashSalt,
        selector,
        property
      }, atRules);
      const rtlDefinitions = value.map((v) => convertProperty(property, v));
      const rtlPropertyConsistent = !rtlDefinitions.some((v) => v.key !== rtlDefinitions[0].key);
      if (!rtlPropertyConsistent) {
        continue;
      }
      const flippedInRtl = rtlDefinitions[0].key !== property || rtlDefinitions.some((v, i) => v.value !== value[i]);
      const rtlClassName = flippedInRtl ? hashClassName({
        value: rtlDefinitions.map((v) => {
          var _a;
          return ((_a = v === null || v === void 0 ? void 0 : v.value) !== null && _a !== void 0 ? _a : "").toString();
        }).join(";"),
        salt: classNameHashSalt,
        property: rtlDefinitions[0].key,
        selector
      }, atRules) : void 0;
      const rtlCompileOptions = flippedInRtl ? {
        rtlClassName,
        rtlProperty: rtlDefinitions[0].key,
        rtlValue: rtlDefinitions.map((d) => d.value)
      } : void 0;
      const styleBucketName = getStyleBucketName(selectors, atRules);
      const [ltrCSS, rtlCSS] = compileAtomicCSSRule(Object.assign({
        className,
        selectors,
        property,
        value
      }, rtlCompileOptions), atRules);
      pushToClassesMap(cssClassesMap, key, className, rtlClassName);
      pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, atRules.media, computePropertyPriority(shorthand));
    } else if (isObject(value)) {
      if (isNestedSelector(property)) {
        resolveStyleRules(value, classNameHashSalt, selectors.concat(normalizeNestedProperty(property)), atRules, cssClassesMap, cssRulesByBucket);
      } else if (isMediaQuerySelector(property)) {
        const combinedMediaQuery = generateCombinedQuery(atRules.media, property.slice(6).trim());
        resolveStyleRules(value, classNameHashSalt, selectors, Object.assign({}, atRules, {
          media: combinedMediaQuery
        }), cssClassesMap, cssRulesByBucket);
      } else if (isLayerSelector(property)) {
        const combinedLayerQuery = (atRules.layer ? `${atRules.layer}.` : "") + property.slice(6).trim();
        resolveStyleRules(value, classNameHashSalt, selectors, Object.assign({}, atRules, {
          layer: combinedLayerQuery
        }), cssClassesMap, cssRulesByBucket);
      } else if (isSupportQuerySelector(property)) {
        const combinedSupportQuery = generateCombinedQuery(atRules.supports, property.slice(9).trim());
        resolveStyleRules(value, classNameHashSalt, selectors, Object.assign({}, atRules, {
          supports: combinedSupportQuery
        }), cssClassesMap, cssRulesByBucket);
      } else if (isContainerQuerySelector(property)) {
        const containerQuery = property.slice(10).trim();
        resolveStyleRules(value, classNameHashSalt, selectors, Object.assign({}, atRules, {
          container: containerQuery
        }), cssClassesMap, cssRulesByBucket);
      } else ;
    }
  }
  return [cssClassesMap, cssRulesByBucket];
}
function resolveStyleRulesForSlots(stylesBySlots, classNameHashSalt = "") {
  const classesMapBySlot = {};
  const cssRules = {};
  for (const slotName in stylesBySlots) {
    const slotStyles = stylesBySlots[slotName];
    const [cssClassMap, cssRulesByBucket] = resolveStyleRules(slotStyles, classNameHashSalt);
    classesMapBySlot[slotName] = cssClassMap;
    Object.keys(cssRulesByBucket).forEach((styleBucketName) => {
      cssRules[styleBucketName] = (cssRules[styleBucketName] || []).concat(cssRulesByBucket[styleBucketName]);
    });
  }
  return [classesMapBySlot, cssRules];
}
function makeStyles$1(stylesBySlots, factory = insertionFactory) {
  const insertStyles = factory();
  let classesMapBySlot = null;
  let cssRules = null;
  let ltrClassNamesForSlots = null;
  let rtlClassNamesForSlots = null;
  function computeClasses(options) {
    const {
      dir,
      renderer
    } = options;
    if (classesMapBySlot === null) {
      [classesMapBySlot, cssRules] = resolveStyleRulesForSlots(stylesBySlots, renderer.classNameHashSalt);
    }
    const isLTR = dir === "ltr";
    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        ltrClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }
    insertStyles(renderer, cssRules);
    const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;
    return classNamesForSlots;
  }
  return computeClasses;
}
const shorthands = {
  border,
  borderLeft,
  borderBottom,
  borderRight,
  borderTop,
  borderColor,
  borderStyle,
  borderRadius,
  borderWidth,
  flex,
  gap,
  gridArea,
  margin,
  marginBlock,
  marginInline,
  padding,
  paddingBlock,
  paddingInline,
  overflow,
  inset,
  outline,
  transition,
  textDecoration
};
function makeStyles(stylesBySlots) {
  const getStyles = makeStyles$1(stylesBySlots, insertionFactory$1);
  return function useClasses() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}
const EyeRegular = /* @__PURE__ */ createFluentIcon("EyeRegular", "1em", ["M3.26 11.6A6.97 6.97 0 0 1 10 6c3.2 0 6.06 2.33 6.74 5.6a.5.5 0 0 0 .98-.2A7.97 7.97 0 0 0 10 5a7.97 7.97 0 0 0-7.72 6.4.5.5 0 0 0 .98.2ZM10 8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-2.5 3.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"]);
const EyeOffRegular = /* @__PURE__ */ createFluentIcon("EyeOffRegular", "1em", ["M2.85 2.15a.5.5 0 1 0-.7.7l3.5 3.5a8.1 8.1 0 0 0-3.37 5.05.5.5 0 1 0 .98.2 7.09 7.09 0 0 1 3.1-4.53l1.6 1.59a3.5 3.5 0 1 0 4.88 4.89l4.3 4.3a.5.5 0 0 0 .71-.7l-15-15Zm9.27 10.68a2.5 2.5 0 1 1-3.45-3.45l3.45 3.45Zm-2-4.83 3.38 3.38A3.5 3.5 0 0 0 10.12 8ZM10 6c-.57 0-1.13.07-1.67.21l-.8-.8A7.65 7.65 0 0 1 10 5c3.7 0 6.94 2.67 7.72 6.4a.5.5 0 0 1-.98.2A6.97 6.97 0 0 0 10 6Z"]);
const iconFilledClassName = "fui-Icon-filled";
const iconRegularClassName = "fui-Icon-regular";
const useBundledIconStyles = __styles({
  "root": {
    "mc9l5x": "fjseox"
  },
  "visible": {
    "mc9l5x": "f1w7gpdv"
  }
}, {
  "d": [".fjseox{display:none;}", ".f1w7gpdv{display:inline;}"]
});
const bundleIcon = (FilledIcon, RegularIcon) => {
  const Component = (props) => {
    const {
      className,
      filled,
      ...rest
    } = props;
    const styles = useBundledIconStyles();
    return reactExports.createElement(reactExports.Fragment, null, reactExports.createElement(FilledIcon, Object.assign({}, rest, {
      className: mergeClasses(styles.root, filled && styles.visible, iconFilledClassName, className)
    })), reactExports.createElement(RegularIcon, Object.assign({}, rest, {
      className: mergeClasses(styles.root, !filled && styles.visible, iconRegularClassName, className)
    })));
  };
  Component.displayName = "CompoundIcon";
  return Component;
};
function useToggleState(props, state) {
  const { checked, defaultChecked, disabled, disabledFocusable } = props;
  const { onClick, role } = state.root;
  const [checkedValue, setCheckedValue] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false
  });
  const isCheckboxTypeRole = role === "menuitemcheckbox" || role === "checkbox";
  const onToggleClick = reactExports.useCallback((ev) => {
    if (!disabled && !disabledFocusable) {
      if (ev.defaultPrevented) {
        return;
      }
      setCheckedValue(!checkedValue);
    }
  }, [
    checkedValue,
    disabled,
    disabledFocusable,
    setCheckedValue
  ]);
  return {
    ...state,
    checked: checkedValue,
    root: {
      ...state.root,
      [isCheckboxTypeRole ? "aria-checked" : "aria-pressed"]: checkedValue,
      onClick: useEventCallback(mergeCallbacks(onClick, onToggleClick))
    }
  };
}
const useToggleButton_unstable = (props, ref) => {
  const buttonState = useButton_unstable(props, ref);
  return useToggleState(props, buttonState);
};
const toggleButtonClassNames = {
  root: "fui-ToggleButton",
  icon: "fui-ToggleButton__icon"
};
const useRootCheckedStyles = /* @__PURE__ */ __styles({
  base: {
    De3pzq: "f1nfm20t",
    g2u3we: "fj3muxo",
    h3c5rm: ["f1akhkt", "f1lxtadh"],
    B9xav0g: "f1aperda",
    zhjwy3: ["f1lxtadh", "f1akhkt"],
    sj55zd: "f14nttnl",
    B4j52fo: "f192inf7",
    Bekrc4i: ["f5tn483", "f1ojsxk5"],
    Bn0qgzm: "f1vxd6vx",
    ibv6hh: ["f1ojsxk5", "f5tn483"],
    D0sxk3: "fxoiby5",
    t6yez3: "f15q0o9g",
    Jwef8y: "f1knas48",
    Bgoe8wy: "fvcxoqz",
    Bwzppfd: ["f1ub3y4t", "f1m52nbi"],
    oetu4i: "f1xlaoq0",
    gg5e9n: ["f1m52nbi", "f1ub3y4t"],
    Bi91k9c: "feu1g3u",
    iro3zm: "f141de4g",
    b661bw: "f11v6sdu",
    Bk6r4ia: ["f9yn8i4", "f1ajwf28"],
    B9zn80p: "f1uwu36w",
    Bpld233: ["f1ajwf28", "f9yn8i4"],
    B2d53fq: "f9olfzr"
  },
  highContrast: {
    Bsw6fvg: "f1rirnrt",
    Bjwas2f: "f132fbg1",
    Bn1d65q: ["f1ene5x0", "fzbc999"],
    Bxeuatn: "f6jgcol",
    n51gp8: ["fzbc999", "f1ene5x0"],
    Bbusuzp: "f1lkg8j3",
    ycbfsm: "fkc42ay",
    Bqrx1nm: "fq7113v",
    pgvf35: "ff1wgvm",
    Bh7lczh: ["fiob0tu", "f1x4h75k"],
    dpv3f4: "f1j6scgf",
    Bpnjhaq: ["f1x4h75k", "fiob0tu"],
    ze5xyy: "f4xjyn1",
    g2kj27: "fbgcvur",
    Bf756sw: "f1ks1yx8",
    Bow2dr7: ["f1o6qegi", "fmxjhhp"],
    Bvhedfk: "fcnxywj",
    Gye4lf: ["fmxjhhp", "f1o6qegi"],
    pc6evw: "f9ddjv3",
    F3bflw: 0,
    mxns5l: 0,
    B0tp99d: 0,
    l9kbep: 0,
    Bg4echp: 0,
    o3nasb: 0,
    B55dcl7: 0,
    By5cl00: 0,
    Bnk1xnq: 0,
    gdbnj: 0,
    Bw5jppy: 0,
    B8jyv7h: 0,
    ka51wi: 0,
    G867l3: 0,
    abbn9y: 0,
    Btyszwp: 0,
    Bi9mhhg: "f1mh9o5k",
    B7d2ofm: "fkom8lu"
  },
  outline: {
    De3pzq: "f1q9pm1r",
    g2u3we: "fj3muxo",
    h3c5rm: ["f1akhkt", "f1lxtadh"],
    B9xav0g: "f1aperda",
    zhjwy3: ["f1lxtadh", "f1akhkt"],
    B4j52fo: "fgx37oo",
    Bekrc4i: ["f130t4y6", "f1efpmoh"],
    Bn0qgzm: "fv51ejd",
    ibv6hh: ["f1efpmoh", "f130t4y6"],
    Jwef8y: "fjxutwb",
    iro3zm: "fwiml72",
    B8q5s1w: "fcaw57c",
    Bci5o5g: ["fpwd27e", "f1999bjr"],
    n8qw10: "f1hi52o4",
    Bdrgwmp: ["f1999bjr", "fpwd27e"]
  },
  primary: {
    De3pzq: "f8w4g0q",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "f1phragk",
    Jwef8y: "f15wkkf3",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "f1rq72xc",
    iro3zm: "fnp9lpt",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"],
    B2d53fq: "f1d6v5y2"
  },
  secondary: {},
  subtle: {
    De3pzq: "fq5gl1p",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "f1eryozh",
    Jwef8y: "f1t94bn6",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "fnwyq0v",
    iro3zm: "fsv2rcd",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"],
    B2d53fq: "f1omzyqd"
  },
  transparent: {
    De3pzq: "f1q9pm1r",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "f1qj7y59",
    Jwef8y: "fjxutwb",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "f139oj5f",
    iro3zm: "fwiml72",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"],
    B2d53fq: "f1fg1p5m"
  }
}, {
  d: [".f1nfm20t{background-color:var(--colorNeutralBackground1Selected);}", ".fj3muxo{border-top-color:var(--colorNeutralStroke1);}", ".f1akhkt{border-right-color:var(--colorNeutralStroke1);}", ".f1lxtadh{border-left-color:var(--colorNeutralStroke1);}", ".f1aperda{border-bottom-color:var(--colorNeutralStroke1);}", ".f14nttnl{color:var(--colorNeutralForeground1Selected);}", ".f192inf7{border-top-width:var(--strokeWidthThin);}", ".f5tn483{border-right-width:var(--strokeWidthThin);}", ".f1ojsxk5{border-left-width:var(--strokeWidthThin);}", ".f1vxd6vx{border-bottom-width:var(--strokeWidthThin);}", ".fxoiby5 .fui-Icon-filled{display:inline;}", ".f15q0o9g .fui-Icon-regular{display:none;}", ".f1q9pm1r{background-color:var(--colorTransparentBackgroundSelected);}", ".fgx37oo{border-top-width:var(--strokeWidthThicker);}", ".f130t4y6{border-right-width:var(--strokeWidthThicker);}", ".f1efpmoh{border-left-width:var(--strokeWidthThicker);}", ".fv51ejd{border-bottom-width:var(--strokeWidthThicker);}", ".fcaw57c[data-fui-focus-visible]{border-top-color:var(--colorNeutralStroke1);}", ".fpwd27e[data-fui-focus-visible]{border-right-color:var(--colorNeutralStroke1);}", ".f1999bjr[data-fui-focus-visible]{border-left-color:var(--colorNeutralStroke1);}", ".f1hi52o4[data-fui-focus-visible]{border-bottom-color:var(--colorNeutralStroke1);}", ".f8w4g0q{background-color:var(--colorBrandBackgroundSelected);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}", ".f1phragk{color:var(--colorNeutralForegroundOnBrand);}", ".fq5gl1p{background-color:var(--colorSubtleBackgroundSelected);}", ".f1eryozh{color:var(--colorNeutralForeground2Selected);}", ".f1qj7y59{color:var(--colorNeutralForeground2BrandSelected);}"],
  h: [".f1knas48:hover{background-color:var(--colorNeutralBackground1Hover);}", ".fvcxoqz:hover{border-top-color:var(--colorNeutralStroke1Hover);}", ".f1ub3y4t:hover{border-right-color:var(--colorNeutralStroke1Hover);}", ".f1m52nbi:hover{border-left-color:var(--colorNeutralStroke1Hover);}", ".f1xlaoq0:hover{border-bottom-color:var(--colorNeutralStroke1Hover);}", ".feu1g3u:hover{color:var(--colorNeutralForeground1Hover);}", ".f141de4g:hover:active{background-color:var(--colorNeutralBackground1Pressed);}", ".f11v6sdu:hover:active{border-top-color:var(--colorNeutralStroke1Pressed);}", ".f9yn8i4:hover:active{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f1ajwf28:hover:active{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1uwu36w:hover:active{border-bottom-color:var(--colorNeutralStroke1Pressed);}", ".f9olfzr:hover:active{color:var(--colorNeutralForeground1Pressed);}", ".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}", ".fwiml72:hover:active{background-color:var(--colorTransparentBackgroundPressed);}", ".f15wkkf3:hover{background-color:var(--colorBrandBackgroundHover);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".f1rq72xc:hover{color:var(--colorNeutralForegroundOnBrand);}", ".fnp9lpt:hover:active{background-color:var(--colorBrandBackgroundPressed);}", ".f1h0usnq:hover:active{border-top-color:transparent;}", ".fs4ktlq:hover:active{border-right-color:transparent;}", ".fx2bmrt:hover:active{border-left-color:transparent;}", ".f16h9ulv:hover:active{border-bottom-color:transparent;}", ".f1d6v5y2:hover:active{color:var(--colorNeutralForegroundOnBrand);}", ".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}", ".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}", ".fsv2rcd:hover:active{background-color:var(--colorSubtleBackgroundPressed);}", ".f1omzyqd:hover:active{color:var(--colorNeutralForeground2Pressed);}", ".f139oj5f:hover{color:var(--colorNeutralForeground2BrandHover);}", ".f1fg1p5m:hover:active{color:var(--colorNeutralForeground2BrandPressed);}"],
  m: [["@media (forced-colors: active){.f1rirnrt{background-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f132fbg1{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ene5x0{border-right-color:Highlight;}.fzbc999{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f6jgcol{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1lkg8j3{color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fkc42ay{forced-color-adjust:none;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fq7113v:hover{background-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.ff1wgvm:hover{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1x4h75k:hover{border-left-color:Highlight;}.fiob0tu:hover{border-right-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1j6scgf:hover{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f4xjyn1:hover{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fbgcvur:hover:active{background-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ks1yx8:hover:active{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1o6qegi:hover:active{border-right-color:Highlight;}.fmxjhhp:hover:active{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fcnxywj:hover:active{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f9ddjv3:hover:active{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1mh9o5k:focus{border:1px solid HighlightText;}}", {
    p: -2,
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fkom8lu:focus{outline-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useRootDisabledStyles = /* @__PURE__ */ __styles({
  base: {
    De3pzq: "f1bg9a2p",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    sj55zd: "f1s2aq7o",
    Jwef8y: "f1falr9n",
    Bgoe8wy: "f12mpcsy",
    Bwzppfd: ["f1gwvigk", "f18rmfxp"],
    oetu4i: "f1jnshp0",
    gg5e9n: ["f18rmfxp", "f1gwvigk"],
    Bi91k9c: "fvgxktp",
    iro3zm: "f1t6o4dc",
    b661bw: "f10ztigi",
    Bk6r4ia: ["f1ft5sdu", "f1gzf82w"],
    B9zn80p: "f12zbtn2",
    Bpld233: ["f1gzf82w", "f1ft5sdu"],
    B2d53fq: "fcvwxyo"
  },
  outline: {},
  primary: {
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"]
  },
  secondary: {},
  subtle: {
    De3pzq: "f1c21dwh",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    Jwef8y: "fjxutwb",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    iro3zm: "fwiml72",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"]
  },
  transparent: {
    De3pzq: "f1c21dwh",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    Jwef8y: "fjxutwb",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    iro3zm: "fwiml72",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"]
  }
}, {
  d: [".f1bg9a2p{background-color:var(--colorNeutralBackgroundDisabled);}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}"],
  h: [".f1falr9n:hover{background-color:var(--colorNeutralBackgroundDisabled);}", ".f12mpcsy:hover{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1gwvigk:hover{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f18rmfxp:hover{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1jnshp0:hover{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fvgxktp:hover{color:var(--colorNeutralForegroundDisabled);}", ".f1t6o4dc:hover:active{background-color:var(--colorNeutralBackgroundDisabled);}", ".f10ztigi:hover:active{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1ft5sdu:hover:active{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f1gzf82w:hover:active{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f12zbtn2:hover:active{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fcvwxyo:hover:active{color:var(--colorNeutralForegroundDisabled);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".f1h0usnq:hover:active{border-top-color:transparent;}", ".fs4ktlq:hover:active{border-right-color:transparent;}", ".fx2bmrt:hover:active{border-left-color:transparent;}", ".f16h9ulv:hover:active{border-bottom-color:transparent;}", ".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}", ".fwiml72:hover:active{background-color:var(--colorTransparentBackgroundPressed);}"]
});
const useIconCheckedStyles = /* @__PURE__ */ __styles({
  subtleOrTransparent: {
    sj55zd: "f1qj7y59"
  },
  highContrast: {
    ycbfsm: "fg4l7m0"
  }
}, {
  d: [".f1qj7y59{color:var(--colorNeutralForeground2BrandSelected);}"],
  m: [["@media (forced-colors: active){.fg4l7m0{forced-color-adjust:auto;}}", {
    m: "(forced-colors: active)"
  }]]
});
const usePrimaryHighContrastStyles = /* @__PURE__ */ __styles({
  base: {
    Bsw6fvg: "f4lkoma",
    Bjwas2f: "f1bauw5b",
    Bn1d65q: ["fbpknfk", "fedl69w"],
    Bxeuatn: "f15s25nd",
    n51gp8: ["fedl69w", "fbpknfk"],
    Bbusuzp: "f1e4kh5",
    ycbfsm: "fg4l7m0"
  },
  disabled: {
    Bjwas2f: "fg455y9",
    Bn1d65q: ["f1rvyvqg", "f14g86mu"],
    Bxeuatn: "f1cwzwz",
    n51gp8: ["f14g86mu", "f1rvyvqg"],
    Bbusuzp: "f1dcs8yz",
    G867l3: "fjwq6ea",
    gdbnj: ["f1lr3nhc", "f1mbxvi6"],
    mxns5l: "fn5gmvv",
    o3nasb: ["f1mbxvi6", "f1lr3nhc"]
  }
}, {
  m: [["@media (forced-colors: active){.f4lkoma{background-color:ButtonFace;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1bauw5b{border-top-color:ButtonBorder;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fbpknfk{border-right-color:ButtonBorder;}.fedl69w{border-left-color:ButtonBorder;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f15s25nd{border-bottom-color:ButtonBorder;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1e4kh5{color:ButtonText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fg4l7m0{forced-color-adjust:auto;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fg455y9{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f14g86mu{border-left-color:GrayText;}.f1rvyvqg{border-right-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1cwzwz{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1dcs8yz{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fjwq6ea:focus{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1lr3nhc:focus{border-right-color:GrayText;}.f1mbxvi6:focus{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fn5gmvv:focus{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useToggleButtonStyles_unstable = (state) => {
  "use no memo";
  const rootCheckedStyles = useRootCheckedStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const iconCheckedStyles = useIconCheckedStyles();
  const primaryHighContrastStyles = usePrimaryHighContrastStyles();
  const {
    appearance,
    checked,
    disabled,
    disabledFocusable
  } = state;
  state.root.className = mergeClasses(
    toggleButtonClassNames.root,
    // Primary high contrast styles
    appearance === "primary" && primaryHighContrastStyles.base,
    appearance === "primary" && (disabled || disabledFocusable) && primaryHighContrastStyles.disabled,
    // Checked styles
    checked && rootCheckedStyles.base,
    checked && rootCheckedStyles.highContrast,
    appearance && checked && rootCheckedStyles[appearance],
    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],
    // User provided class name
    state.root.className
  );
  if (state.icon) {
    state.icon.className = mergeClasses(toggleButtonClassNames.icon, checked && (appearance === "subtle" || appearance === "transparent") && iconCheckedStyles.subtleOrTransparent, iconCheckedStyles.highContrast, state.icon.className);
  }
  useButtonStyles_unstable(state);
  return state;
};
const ToggleButton = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useToggleButton_unstable(props, ref);
  useToggleButtonStyles_unstable(state);
  useCustomStyleHook("useToggleButtonStyles_unstable")(state);
  return renderButton_unstable(state);
});
ToggleButton.displayName = "ToggleButton";
const Eye = bundleIcon(EyeOffRegular, EyeRegular);
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXL)
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap(tokens.spacingVerticalS)
  },
  buttonContainer: {
    marginTop: tokens.spacingVerticalS,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    flexDirection: "row"
  }
});
function Login() {
  const styles = useStyles();
  const [userName, setUsername] = reactExports.useState("");
  const [msgValidation1, setMsgValidation1] = reactExports.useState("");
  const [validationState1, setValidationState1] = reactExports.useState("none");
  const [password, setPassword] = reactExports.useState("");
  const [msgValidation2, setMsgValidation2] = reactExports.useState("");
  const [validationState2, setValidationState2] = reactExports.useState("none");
  const [eye, setEye] = reactExports.useState(true);
  const [loading, setLoading] = reactExports.useState(false);
  const handleLogin = async () => {
    if (!userName) {
      setMsgValidation1("Escribe un nombre de usuario.");
      setValidationState1("warning");
      return;
    }
    if (!password) {
      setMsgValidation2("Escribe una contraseña.");
      setValidationState2("warning");
      return;
    }
    setLoading(true);
    const result = await window.connectors.auth.logIn({ userName, password });
    if (result.ok) {
      window.location.reload();
      return;
    }
    if (result.code === "user-not-found") {
      setMsgValidation1(result.message);
      setValidationState1("error");
    }
    if (result.code === "incorrect-password") {
      setMsgValidation2(result.message);
      setValidationState2("error");
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.form, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "Nombre de Usuario",
        style: { width: "100%" },
        validationState: validationState1,
        validationMessage: msgValidation1,
        onBlur: () => {
          setValidationState1("none");
          setMsgValidation1("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: userName,
            onChange: (e) => setUsername(e.target.value),
            disabled: loading
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "Contraseña",
        validationState: validationState2,
        validationMessage: msgValidation2,
        onBlur: () => {
          setValidationState2("none");
          setMsgValidation2("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: eye ? "password" : "text",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            disabled: loading,
            contentAfter: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleButton,
              {
                appearance: "transparent",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, {}),
                checked: eye,
                onClick: () => setEye(!eye)
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.buttonContainer, children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
      !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleLogin, children: "Iniciar Sesión" })
    ] })
  ] }) });
}
export {
  Login as default
};
//# sourceMappingURL=Login-QGcwfuay.js.map
