import { c as reactExports, o as useIsomorphicLayoutEffect, _ as __styles, I as useIconContext, d as mergeClasses, E as jsxs, A as jsx, G as optional, B as always, C as getIntrinsicElementProps, D as __resetStyles, e as useCustomStyleHook, p as useId, L as Label, J as useOverrides, M as getPartitionedNativeProps } from "../app.js";
function arrayToObject(array) {
  return array.reduce(function(obj, _ref) {
    var prop1 = _ref[0], prop2 = _ref[1];
    obj[prop1] = prop2;
    obj[prop2] = prop1;
    return obj;
  }, {});
}
function isBoolean(val) {
  return typeof val === "boolean";
}
function isFunction(val) {
  return typeof val === "function";
}
function isNumber(val) {
  return typeof val === "number";
}
function isNullOrUndefined(val) {
  return val === null || typeof val === "undefined";
}
function isObject$1(val) {
  return val && typeof val === "object";
}
function isString(val) {
  return typeof val === "string";
}
function includes(inclusive, inclusee) {
  return inclusive.indexOf(inclusee) !== -1;
}
function flipSign(value) {
  if (parseFloat(value) === 0) {
    return value;
  }
  if (value[0] === "-") {
    return value.slice(1);
  }
  return "-" + value;
}
function flipTransformSign(match2, prefix2, offset, suffix) {
  return prefix2 + flipSign(offset) + suffix;
}
function calculateNewBackgroundPosition(value) {
  var idx = value.indexOf(".");
  if (idx === -1) {
    value = 100 - parseFloat(value) + "%";
  } else {
    var len = value.length - idx - 2;
    value = 100 - parseFloat(value);
    value = value.toFixed(len) + "%";
  }
  return value;
}
function getValuesAsList(value) {
  return value.replace(/ +/g, " ").split(" ").map(function(i) {
    return i.trim();
  }).filter(Boolean).reduce(function(_ref2, item) {
    var list = _ref2.list, state = _ref2.state;
    var openParansCount = (item.match(/\(/g) || []).length;
    var closedParansCount = (item.match(/\)/g) || []).length;
    if (state.parensDepth > 0) {
      list[list.length - 1] = list[list.length - 1] + " " + item;
    } else {
      list.push(item);
    }
    state.parensDepth += openParansCount - closedParansCount;
    return {
      list,
      state
    };
  }, {
    list: [],
    state: {
      parensDepth: 0
    }
  }).list;
}
function handleQuartetValues(value) {
  var splitValues = getValuesAsList(value);
  if (splitValues.length <= 3 || splitValues.length > 4) {
    return value;
  }
  var top = splitValues[0], right = splitValues[1], bottom = splitValues[2], left = splitValues[3];
  return [top, left, bottom, right].join(" ");
}
function canConvertValue(value) {
  return !isBoolean(value) && !isNullOrUndefined(value);
}
function splitShadow(value) {
  var shadows = [];
  var start = 0;
  var end = 0;
  var rgba = false;
  while (end < value.length) {
    if (!rgba && value[end] === ",") {
      shadows.push(value.substring(start, end).trim());
      end++;
      start = end;
    } else if (value[end] === "(") {
      rgba = true;
      end++;
    } else if (value[end] === ")") {
      rgba = false;
      end++;
    } else {
      end++;
    }
  }
  if (start != end) {
    shadows.push(value.substring(start, end + 1));
  }
  return shadows;
}
var propertyValueConverters = {
  padding: function padding(_ref) {
    var value = _ref.value;
    if (isNumber(value)) {
      return value;
    }
    return handleQuartetValues(value);
  },
  textShadow: function textShadow(_ref2) {
    var value = _ref2.value;
    var flippedShadows = splitShadow(value).map(function(shadow) {
      return shadow.replace(/(^|\s)(-*)([.|\d]+)/, function(match2, whiteSpace, negative, number) {
        if (number === "0") {
          return match2;
        }
        var doubleNegative = negative === "" ? "-" : "";
        return "" + whiteSpace + doubleNegative + number;
      });
    });
    return flippedShadows.join(",");
  },
  borderColor: function borderColor(_ref3) {
    var value = _ref3.value;
    return handleQuartetValues(value);
  },
  borderRadius: function borderRadius(_ref4) {
    var value = _ref4.value;
    if (isNumber(value)) {
      return value;
    }
    if (includes(value, "/")) {
      var _value$split = value.split("/"), radius1 = _value$split[0], radius2 = _value$split[1];
      var convertedRadius1 = propertyValueConverters.borderRadius({
        value: radius1.trim()
      });
      var convertedRadius2 = propertyValueConverters.borderRadius({
        value: radius2.trim()
      });
      return convertedRadius1 + " / " + convertedRadius2;
    }
    var splitValues = getValuesAsList(value);
    switch (splitValues.length) {
      case 2: {
        return splitValues.reverse().join(" ");
      }
      case 4: {
        var topLeft = splitValues[0], topRight = splitValues[1], bottomRight = splitValues[2], bottomLeft = splitValues[3];
        return [topRight, topLeft, bottomLeft, bottomRight].join(" ");
      }
      default: {
        return value;
      }
    }
  },
  background: function background(_ref5) {
    var value = _ref5.value, valuesToConvert2 = _ref5.valuesToConvert, isRtl = _ref5.isRtl, bgImgDirectionRegex2 = _ref5.bgImgDirectionRegex, bgPosDirectionRegex2 = _ref5.bgPosDirectionRegex;
    if (isNumber(value)) {
      return value;
    }
    var backgroundPositionValue = value.replace(/(url\(.*?\))|(rgba?\(.*?\))|(hsl\(.*?\))|(#[a-fA-F0-9]+)|((^| )(\D)+( |$))/g, "").trim();
    value = value.replace(backgroundPositionValue, propertyValueConverters.backgroundPosition({
      value: backgroundPositionValue,
      valuesToConvert: valuesToConvert2,
      isRtl,
      bgPosDirectionRegex: bgPosDirectionRegex2
    }));
    return propertyValueConverters.backgroundImage({
      value,
      valuesToConvert: valuesToConvert2,
      bgImgDirectionRegex: bgImgDirectionRegex2
    });
  },
  backgroundImage: function backgroundImage(_ref6) {
    var value = _ref6.value, valuesToConvert2 = _ref6.valuesToConvert, bgImgDirectionRegex2 = _ref6.bgImgDirectionRegex;
    if (!includes(value, "url(") && !includes(value, "linear-gradient(")) {
      return value;
    }
    return value.replace(bgImgDirectionRegex2, function(match2, g1, group2) {
      return match2.replace(group2, valuesToConvert2[group2]);
    });
  },
  backgroundPosition: function backgroundPosition(_ref7) {
    var value = _ref7.value, valuesToConvert2 = _ref7.valuesToConvert, isRtl = _ref7.isRtl, bgPosDirectionRegex2 = _ref7.bgPosDirectionRegex;
    return value.replace(isRtl ? /^((-|\d|\.)+%)/ : null, function(match2, group) {
      return calculateNewBackgroundPosition(group);
    }).replace(bgPosDirectionRegex2, function(match2) {
      return valuesToConvert2[match2];
    });
  },
  backgroundPositionX: function backgroundPositionX(_ref8) {
    var value = _ref8.value, valuesToConvert2 = _ref8.valuesToConvert, isRtl = _ref8.isRtl, bgPosDirectionRegex2 = _ref8.bgPosDirectionRegex;
    if (isNumber(value)) {
      return value;
    }
    return propertyValueConverters.backgroundPosition({
      value,
      valuesToConvert: valuesToConvert2,
      isRtl,
      bgPosDirectionRegex: bgPosDirectionRegex2
    });
  },
  transition: function transition(_ref9) {
    var value = _ref9.value, propertiesToConvert2 = _ref9.propertiesToConvert;
    return value.split(/,\s*/g).map(function(transition2) {
      var values = transition2.split(" ");
      values[0] = propertiesToConvert2[values[0]] || values[0];
      return values.join(" ");
    }).join(", ");
  },
  transitionProperty: function transitionProperty(_ref10) {
    var value = _ref10.value, propertiesToConvert2 = _ref10.propertiesToConvert;
    return value.split(/,\s*/g).map(function(prop) {
      return propertiesToConvert2[prop] || prop;
    }).join(", ");
  },
  transform: function transform(_ref11) {
    var value = _ref11.value;
    var nonAsciiPattern = "[^\\u0020-\\u007e]";
    var escapePattern = "(?:(?:(?:\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)|\\\\[^\\r\\n\\f0-9a-f])";
    var signedQuantPattern = "((?:-?" + ("(?:[0-9]*\\.[0-9]+|[0-9]+)(?:\\s*(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)|" + ("-?" + ("(?:[_a-z]|" + nonAsciiPattern + "|" + escapePattern + ")") + ("(?:[_a-z0-9-]|" + nonAsciiPattern + "|" + escapePattern + ")") + "*") + ")?") + ")|(?:inherit|auto))";
    var translateXRegExp = new RegExp("(translateX\\s*\\(\\s*)" + signedQuantPattern + "(\\s*\\))", "gi");
    var translateRegExp = new RegExp("(translate\\s*\\(\\s*)" + signedQuantPattern + "((?:\\s*,\\s*" + signedQuantPattern + "){0,1}\\s*\\))", "gi");
    var translate3dRegExp = new RegExp("(translate3d\\s*\\(\\s*)" + signedQuantPattern + "((?:\\s*,\\s*" + signedQuantPattern + "){0,2}\\s*\\))", "gi");
    var rotateRegExp = new RegExp("(rotate[ZY]?\\s*\\(\\s*)" + signedQuantPattern + "(\\s*\\))", "gi");
    return value.replace(translateXRegExp, flipTransformSign).replace(translateRegExp, flipTransformSign).replace(translate3dRegExp, flipTransformSign).replace(rotateRegExp, flipTransformSign);
  }
};
propertyValueConverters.objectPosition = propertyValueConverters.backgroundPosition;
propertyValueConverters.margin = propertyValueConverters.padding;
propertyValueConverters.borderWidth = propertyValueConverters.padding;
propertyValueConverters.boxShadow = propertyValueConverters.textShadow;
propertyValueConverters.webkitBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.mozBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.WebkitBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.MozBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.borderStyle = propertyValueConverters.borderColor;
propertyValueConverters.webkitTransform = propertyValueConverters.transform;
propertyValueConverters.mozTransform = propertyValueConverters.transform;
propertyValueConverters.WebkitTransform = propertyValueConverters.transform;
propertyValueConverters.MozTransform = propertyValueConverters.transform;
propertyValueConverters.transformOrigin = propertyValueConverters.backgroundPosition;
propertyValueConverters.webkitTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.mozTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.WebkitTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.MozTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.webkitTransition = propertyValueConverters.transition;
propertyValueConverters.mozTransition = propertyValueConverters.transition;
propertyValueConverters.WebkitTransition = propertyValueConverters.transition;
propertyValueConverters.MozTransition = propertyValueConverters.transition;
propertyValueConverters.webkitTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters.mozTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters.WebkitTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters.MozTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters["text-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["border-color"] = propertyValueConverters.borderColor;
propertyValueConverters["border-radius"] = propertyValueConverters.borderRadius;
propertyValueConverters["background-image"] = propertyValueConverters.backgroundImage;
propertyValueConverters["background-position"] = propertyValueConverters.backgroundPosition;
propertyValueConverters["background-position-x"] = propertyValueConverters.backgroundPositionX;
propertyValueConverters["object-position"] = propertyValueConverters.objectPosition;
propertyValueConverters["border-width"] = propertyValueConverters.padding;
propertyValueConverters["box-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["-webkit-box-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["-moz-box-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["border-style"] = propertyValueConverters.borderColor;
propertyValueConverters["-webkit-transform"] = propertyValueConverters.transform;
propertyValueConverters["-moz-transform"] = propertyValueConverters.transform;
propertyValueConverters["transform-origin"] = propertyValueConverters.transformOrigin;
propertyValueConverters["-webkit-transform-origin"] = propertyValueConverters.transformOrigin;
propertyValueConverters["-moz-transform-origin"] = propertyValueConverters.transformOrigin;
propertyValueConverters["-webkit-transition"] = propertyValueConverters.transition;
propertyValueConverters["-moz-transition"] = propertyValueConverters.transition;
propertyValueConverters["transition-property"] = propertyValueConverters.transitionProperty;
propertyValueConverters["-webkit-transition-property"] = propertyValueConverters.transitionProperty;
propertyValueConverters["-moz-transition-property"] = propertyValueConverters.transitionProperty;
var propertiesToConvert = arrayToObject([
  ["paddingLeft", "paddingRight"],
  ["marginLeft", "marginRight"],
  ["left", "right"],
  ["borderLeft", "borderRight"],
  ["borderLeftColor", "borderRightColor"],
  ["borderLeftStyle", "borderRightStyle"],
  ["borderLeftWidth", "borderRightWidth"],
  ["borderTopLeftRadius", "borderTopRightRadius"],
  ["borderBottomLeftRadius", "borderBottomRightRadius"],
  // kebab-case versions
  ["padding-left", "padding-right"],
  ["margin-left", "margin-right"],
  ["border-left", "border-right"],
  ["border-left-color", "border-right-color"],
  ["border-left-style", "border-right-style"],
  ["border-left-width", "border-right-width"],
  ["border-top-left-radius", "border-top-right-radius"],
  ["border-bottom-left-radius", "border-bottom-right-radius"]
]);
var propsToIgnore = ["content"];
var valuesToConvert = arrayToObject([["ltr", "rtl"], ["left", "right"], ["w-resize", "e-resize"], ["sw-resize", "se-resize"], ["nw-resize", "ne-resize"]]);
var bgImgDirectionRegex = new RegExp("(^|\\W|_)((ltr)|(rtl)|(left)|(right))(\\W|_|$)", "g");
var bgPosDirectionRegex = new RegExp("(left)|(right)");
function convert(object) {
  return Object.keys(object).reduce(function(newObj, originalKey) {
    var originalValue = object[originalKey];
    if (isString(originalValue)) {
      originalValue = originalValue.trim();
    }
    if (includes(propsToIgnore, originalKey)) {
      newObj[originalKey] = originalValue;
      return newObj;
    }
    var _convertProperty = convertProperty(originalKey, originalValue), key = _convertProperty.key, value = _convertProperty.value;
    newObj[key] = value;
    return newObj;
  }, Array.isArray(object) ? [] : {});
}
function convertProperty(originalKey, originalValue) {
  var isNoFlip = /\/\*\s?@noflip\s?\*\//.test(originalValue);
  var key = isNoFlip ? originalKey : getPropertyDoppelganger(originalKey);
  var value = isNoFlip ? originalValue : getValueDoppelganger(key, originalValue);
  return {
    key,
    value
  };
}
function getPropertyDoppelganger(property) {
  return propertiesToConvert[property] || property;
}
function getValueDoppelganger(key, originalValue) {
  if (!canConvertValue(originalValue)) {
    return originalValue;
  }
  if (isObject$1(originalValue)) {
    return convert(originalValue);
  }
  var isNum = isNumber(originalValue);
  var isFunc = isFunction(originalValue);
  var importantlessValue = isNum || isFunc ? originalValue : originalValue.replace(/ !important.*?$/, "");
  var isImportant = !isNum && importantlessValue.length !== originalValue.length;
  var valueConverter = propertyValueConverters[key];
  var newValue;
  if (valueConverter) {
    newValue = valueConverter({
      value: importantlessValue,
      valuesToConvert,
      propertiesToConvert,
      isRtl: true,
      bgImgDirectionRegex,
      bgPosDirectionRegex
    });
  } else {
    newValue = valuesToConvert[importantlessValue] || importantlessValue;
  }
  if (isImportant) {
    return newValue + " !important";
  }
  return newValue;
}
const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const cache = {};
function toHyphenLower(match2) {
  return "-" + match2.toLowerCase();
}
function hyphenateProperty(name) {
  if (Object.prototype.hasOwnProperty.call(cache, name)) {
    return cache[name];
  }
  if (name.substr(0, 2) === "--") {
    return name;
  }
  const hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? "-" + hName : hName;
}
function normalizeNestedProperty(nestedProperty) {
  if (nestedProperty.charAt(0) === "&") {
    return nestedProperty.slice(1);
  }
  return nestedProperty;
}
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var MEDIA = "@media";
var IMPORT = "@import";
var SUPPORTS = "@supports";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function tokenize(value) {
  return dealloc(tokenizer(alloc(value)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function tokenizer(children) {
  while (next())
    switch (token(character)) {
      case 0:
        append(identifier(position - 1), children);
        break;
      case 2:
        append(delimit(character), children);
        break;
      default:
        append(from(character), children);
    }
  return children;
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
const globalPlugin = (element) => {
  switch (element.type) {
    case RULESET:
      if (typeof element.props === "string") {
        return;
      }
      element.props = element.props.map((value) => {
        if (value.indexOf(":global(") === -1) {
          return value;
        }
        return tokenize(value).reduce((acc, value2, index, children) => {
          if (value2 === "") {
            return acc;
          }
          if (value2 === ":" && children[index + 1] === "global") {
            const selector = (
              // An inner part of ":global()"
              children[index + 2].slice(1, -1) + // A separator between selectors i.e. "body .class"
              " "
            );
            acc.unshift(selector);
            children[index + 1] = "";
            children[index + 2] = "";
            return acc;
          }
          acc.push(value2);
          return acc;
        }, []).join("");
      });
  }
};
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
      return WEBKIT + value + value;
    case 4215:
      if (charat(value, 9) === 102) {
        return WEBKIT + value + value;
      }
      if (charat(value, length2 + 1) === 116) {
        return WEBKIT + value + value;
      }
      break;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 6968:
      return WEBKIT + value + MOZ + value + value;
    case 6187:
      if (!match(value, /grab/)) {
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
      }
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
        case 102:
          if (charat(value, length2 + 3) === 108) {
            return replace(
              value,
              /(.+:)(.+)-([^]+)/,
              // eslint-disable-next-line no-useless-concat, eqeqeq
              "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")
            ) + value;
          }
        case 115:
          return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
  }
  return value;
}
function prefixerPlugin(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return) switch (element.type) {
      case DECLARATION:
        element.return = prefix(element.value, element.length);
        return;
      case RULESET:
        if (element.length)
          return combine(element.props, function(value) {
            switch (match(value, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return serialize(
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  [copy(element, {
                    props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
                  })],
                  callback
                );
              case "::placeholder":
                return serialize([
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
                  }),
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
                  })
                ], callback);
            }
            return "";
          });
    }
  }
  return void 0;
}
function isAtRuleElement(element) {
  switch (element.type) {
    case "@container":
    case MEDIA:
    case SUPPORTS:
    case LAYER:
      return true;
  }
  return false;
}
const sortClassesInAtRulesPlugin = (element) => {
  if (isAtRuleElement(element) && Array.isArray(element.children)) {
    element.children.sort((a, b) => a.props[0] > b.props[0] ? 1 : -1);
  }
};
function compileCSSRules(cssRules, sortClassesInAtRules) {
  const rules = [];
  serialize(compile(cssRules), middleware([
    globalPlugin,
    sortClassesInAtRulesPlugin,
    prefixerPlugin,
    stringify,
    // 💡 we are using `.insertRule()` API for DOM operations, which does not support
    // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
    // individual rules to be used with this API
    rulesheet((rule) => rules.push(rule))
  ]));
  return rules;
}
const PSEUDO_SELECTOR_REGEX = /,( *[^ &])/g;
function normalizePseudoSelector(pseudoSelector) {
  return "&" + normalizeNestedProperty(
    // Regex there replaces a comma, spaces and an ampersand if it's present with comma and an ampersand.
    // This allows to normalize input, see examples in JSDoc.
    pseudoSelector.replace(PSEUDO_SELECTOR_REGEX, ",&$1")
  );
}
function createCSSRule(classNameSelector, cssDeclaration, pseudos) {
  let cssRule = cssDeclaration;
  if (pseudos.length > 0) {
    cssRule = pseudos.reduceRight((acc, selector) => {
      return `${normalizePseudoSelector(selector)} { ${acc} }`;
    }, cssDeclaration);
  }
  return `${classNameSelector}{${cssRule}}`;
}
function compileAtomicCSSRule(options, atRules) {
  const {
    className,
    selectors,
    property,
    rtlClassName,
    rtlProperty,
    rtlValue,
    value
  } = options;
  const {
    container,
    layer,
    media,
    supports
  } = atRules;
  const classNameSelector = `.${className}`;
  const cssDeclaration = Array.isArray(value) ? `${value.map((v) => `${hyphenateProperty(property)}: ${v}`).join(";")};` : `${hyphenateProperty(property)}: ${value};`;
  let cssRule = createCSSRule(classNameSelector, cssDeclaration, selectors);
  if (rtlProperty && rtlClassName) {
    const rtlClassNameSelector = `.${rtlClassName}`;
    const rtlCSSDeclaration = Array.isArray(rtlValue) ? `${rtlValue.map((v) => `${hyphenateProperty(rtlProperty)}: ${v}`).join(";")};` : `${hyphenateProperty(rtlProperty)}: ${rtlValue};`;
    cssRule += createCSSRule(rtlClassNameSelector, rtlCSSDeclaration, selectors);
  }
  if (media) {
    cssRule = `@media ${media} { ${cssRule} }`;
  }
  if (layer) {
    cssRule = `@layer ${layer} { ${cssRule} }`;
  }
  if (supports) {
    cssRule = `@supports ${supports} { ${cssRule} }`;
  }
  if (container) {
    cssRule = `@container ${container} { ${cssRule} }`;
  }
  return compileCSSRules(cssRule);
}
function cssifyObject(style) {
  let css = "";
  for (const property in style) {
    const value = style[property];
    if (typeof value === "string" || typeof value === "number") {
      css += hyphenateProperty(property) + ":" + value + ";";
      continue;
    }
    if (Array.isArray(value)) {
      for (const arrValue of value) {
        css += hyphenateProperty(property) + ":" + arrValue + ";";
      }
    }
  }
  return css;
}
function compileKeyframeRule(keyframeObject) {
  let css = "";
  for (const percentage in keyframeObject) {
    css += `${percentage}{${cssifyObject(keyframeObject[percentage])}}`;
  }
  return css;
}
function compileKeyframesCSS(keyframeName, keyframeCSS) {
  const cssRule = `@keyframes ${keyframeName} {${keyframeCSS}}`;
  const rules = [];
  serialize(compile(cssRule), middleware([
    stringify,
    prefixerPlugin,
    // 💡 we are using `.insertRule()` API for DOM operations, which does not support
    // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
    // individual rules to be used with this API
    rulesheet((rule) => rules.push(rule))
  ]));
  return rules;
}
function isMediaQuerySelector(property) {
  return property.substr(0, 6) === "@media";
}
function isLayerSelector(property) {
  return property.substr(0, 6) === "@layer";
}
const regex = /^(:|\[|>|&)/;
function isNestedSelector(property) {
  return regex.test(property);
}
function isSupportQuerySelector(property) {
  return property.substr(0, 9) === "@supports";
}
function isContainerQuerySelector(property) {
  return property.substring(0, 10) === "@container";
}
function isObject(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false;
}
function isFactoryDispatch(newState) {
  return typeof newState === "function";
}
const useControllableState = (options) => {
  "use no memo";
  const [internalState, setInternalState] = reactExports.useState(() => {
    if (options.defaultState === void 0) {
      return options.initialState;
    }
    return isInitializer(options.defaultState) ? options.defaultState() : options.defaultState;
  });
  const stateValueRef = reactExports.useRef(options.state);
  reactExports.useEffect(() => {
    stateValueRef.current = options.state;
  }, [
    options.state
  ]);
  const setControlledState = reactExports.useCallback((newState) => {
    if (isFactoryDispatch(newState)) {
      newState(stateValueRef.current);
    }
  }, []);
  return useIsControlled(options.state) ? [
    options.state,
    setControlledState
  ] : [
    internalState,
    setInternalState
  ];
};
function isInitializer(value) {
  return typeof value === "function";
}
const useIsControlled = (controlledValue) => {
  "use no memo";
  const [isControlled] = reactExports.useState(() => controlledValue !== void 0);
  return isControlled;
};
const useEventCallback = (fn) => {
  const callbackRef = reactExports.useRef(() => {
    throw new Error("Cannot call an event handler while rendering");
  });
  useIsomorphicLayoutEffect(() => {
    callbackRef.current = fn;
  }, [
    fn
  ]);
  return reactExports.useCallback((...args) => {
    const callback = callbackRef.current;
    return callback(...args);
  }, [
    callbackRef
  ]);
};
function mergeCallbacks(callback1, callback2) {
  return (...args) => {
    callback1 === null || callback1 === void 0 ? void 0 : callback1(...args);
    callback2 === null || callback2 === void 0 ? void 0 : callback2(...args);
  };
}
const tokens = {
  // Color tokens
  colorNeutralForeground1: "var(--colorNeutralForeground1)",
  colorNeutralForeground1Hover: "var(--colorNeutralForeground1Hover)",
  colorNeutralForeground1Pressed: "var(--colorNeutralForeground1Pressed)",
  colorNeutralForeground1Selected: "var(--colorNeutralForeground1Selected)",
  colorNeutralForeground2: "var(--colorNeutralForeground2)",
  colorNeutralForeground2Hover: "var(--colorNeutralForeground2Hover)",
  colorNeutralForeground2Pressed: "var(--colorNeutralForeground2Pressed)",
  colorNeutralForeground2Selected: "var(--colorNeutralForeground2Selected)",
  colorNeutralForeground2BrandHover: "var(--colorNeutralForeground2BrandHover)",
  colorNeutralForeground2BrandPressed: "var(--colorNeutralForeground2BrandPressed)",
  colorNeutralForeground2BrandSelected: "var(--colorNeutralForeground2BrandSelected)",
  colorNeutralForeground3: "var(--colorNeutralForeground3)",
  colorNeutralForeground3Hover: "var(--colorNeutralForeground3Hover)",
  colorNeutralForeground3Pressed: "var(--colorNeutralForeground3Pressed)",
  colorNeutralForeground3Selected: "var(--colorNeutralForeground3Selected)",
  colorNeutralForeground3BrandHover: "var(--colorNeutralForeground3BrandHover)",
  colorNeutralForeground3BrandPressed: "var(--colorNeutralForeground3BrandPressed)",
  colorNeutralForeground3BrandSelected: "var(--colorNeutralForeground3BrandSelected)",
  colorNeutralForeground4: "var(--colorNeutralForeground4)",
  colorNeutralForegroundDisabled: "var(--colorNeutralForegroundDisabled)",
  colorBrandForegroundLink: "var(--colorBrandForegroundLink)",
  colorBrandForegroundLinkHover: "var(--colorBrandForegroundLinkHover)",
  colorBrandForegroundLinkPressed: "var(--colorBrandForegroundLinkPressed)",
  colorBrandForegroundLinkSelected: "var(--colorBrandForegroundLinkSelected)",
  colorNeutralForeground2Link: "var(--colorNeutralForeground2Link)",
  colorNeutralForeground2LinkHover: "var(--colorNeutralForeground2LinkHover)",
  colorNeutralForeground2LinkPressed: "var(--colorNeutralForeground2LinkPressed)",
  colorNeutralForeground2LinkSelected: "var(--colorNeutralForeground2LinkSelected)",
  colorCompoundBrandForeground1: "var(--colorCompoundBrandForeground1)",
  colorCompoundBrandForeground1Hover: "var(--colorCompoundBrandForeground1Hover)",
  colorCompoundBrandForeground1Pressed: "var(--colorCompoundBrandForeground1Pressed)",
  colorNeutralForegroundOnBrand: "var(--colorNeutralForegroundOnBrand)",
  colorNeutralForegroundInverted: "var(--colorNeutralForegroundInverted)",
  colorNeutralForegroundInvertedHover: "var(--colorNeutralForegroundInvertedHover)",
  colorNeutralForegroundInvertedPressed: "var(--colorNeutralForegroundInvertedPressed)",
  colorNeutralForegroundInvertedSelected: "var(--colorNeutralForegroundInvertedSelected)",
  colorNeutralForegroundInverted2: "var(--colorNeutralForegroundInverted2)",
  colorNeutralForegroundStaticInverted: "var(--colorNeutralForegroundStaticInverted)",
  colorNeutralForegroundInvertedLink: "var(--colorNeutralForegroundInvertedLink)",
  colorNeutralForegroundInvertedLinkHover: "var(--colorNeutralForegroundInvertedLinkHover)",
  colorNeutralForegroundInvertedLinkPressed: "var(--colorNeutralForegroundInvertedLinkPressed)",
  colorNeutralForegroundInvertedLinkSelected: "var(--colorNeutralForegroundInvertedLinkSelected)",
  colorNeutralForegroundInvertedDisabled: "var(--colorNeutralForegroundInvertedDisabled)",
  colorBrandForeground1: "var(--colorBrandForeground1)",
  colorBrandForeground2: "var(--colorBrandForeground2)",
  colorBrandForeground2Hover: "var(--colorBrandForeground2Hover)",
  colorBrandForeground2Pressed: "var(--colorBrandForeground2Pressed)",
  colorNeutralForeground1Static: "var(--colorNeutralForeground1Static)",
  colorBrandForegroundInverted: "var(--colorBrandForegroundInverted)",
  colorBrandForegroundInvertedHover: "var(--colorBrandForegroundInvertedHover)",
  colorBrandForegroundInvertedPressed: "var(--colorBrandForegroundInvertedPressed)",
  colorBrandForegroundOnLight: "var(--colorBrandForegroundOnLight)",
  colorBrandForegroundOnLightHover: "var(--colorBrandForegroundOnLightHover)",
  colorBrandForegroundOnLightPressed: "var(--colorBrandForegroundOnLightPressed)",
  colorBrandForegroundOnLightSelected: "var(--colorBrandForegroundOnLightSelected)",
  colorNeutralBackground1: "var(--colorNeutralBackground1)",
  colorNeutralBackground1Hover: "var(--colorNeutralBackground1Hover)",
  colorNeutralBackground1Pressed: "var(--colorNeutralBackground1Pressed)",
  colorNeutralBackground1Selected: "var(--colorNeutralBackground1Selected)",
  colorNeutralBackground2: "var(--colorNeutralBackground2)",
  colorNeutralBackground2Hover: "var(--colorNeutralBackground2Hover)",
  colorNeutralBackground2Pressed: "var(--colorNeutralBackground2Pressed)",
  colorNeutralBackground2Selected: "var(--colorNeutralBackground2Selected)",
  colorNeutralBackground3: "var(--colorNeutralBackground3)",
  colorNeutralBackground3Hover: "var(--colorNeutralBackground3Hover)",
  colorNeutralBackground3Pressed: "var(--colorNeutralBackground3Pressed)",
  colorNeutralBackground3Selected: "var(--colorNeutralBackground3Selected)",
  colorNeutralBackground4: "var(--colorNeutralBackground4)",
  colorNeutralBackground4Hover: "var(--colorNeutralBackground4Hover)",
  colorNeutralBackground4Pressed: "var(--colorNeutralBackground4Pressed)",
  colorNeutralBackground4Selected: "var(--colorNeutralBackground4Selected)",
  colorNeutralBackground5: "var(--colorNeutralBackground5)",
  colorNeutralBackground5Hover: "var(--colorNeutralBackground5Hover)",
  colorNeutralBackground5Pressed: "var(--colorNeutralBackground5Pressed)",
  colorNeutralBackground5Selected: "var(--colorNeutralBackground5Selected)",
  colorNeutralBackground6: "var(--colorNeutralBackground6)",
  colorNeutralBackgroundInverted: "var(--colorNeutralBackgroundInverted)",
  colorNeutralBackgroundStatic: "var(--colorNeutralBackgroundStatic)",
  colorNeutralBackgroundAlpha: "var(--colorNeutralBackgroundAlpha)",
  colorNeutralBackgroundAlpha2: "var(--colorNeutralBackgroundAlpha2)",
  colorSubtleBackground: "var(--colorSubtleBackground)",
  colorSubtleBackgroundHover: "var(--colorSubtleBackgroundHover)",
  colorSubtleBackgroundPressed: "var(--colorSubtleBackgroundPressed)",
  colorSubtleBackgroundSelected: "var(--colorSubtleBackgroundSelected)",
  colorSubtleBackgroundLightAlphaHover: "var(--colorSubtleBackgroundLightAlphaHover)",
  colorSubtleBackgroundLightAlphaPressed: "var(--colorSubtleBackgroundLightAlphaPressed)",
  colorSubtleBackgroundLightAlphaSelected: "var(--colorSubtleBackgroundLightAlphaSelected)",
  colorSubtleBackgroundInverted: "var(--colorSubtleBackgroundInverted)",
  colorSubtleBackgroundInvertedHover: "var(--colorSubtleBackgroundInvertedHover)",
  colorSubtleBackgroundInvertedPressed: "var(--colorSubtleBackgroundInvertedPressed)",
  colorSubtleBackgroundInvertedSelected: "var(--colorSubtleBackgroundInvertedSelected)",
  colorTransparentBackground: "var(--colorTransparentBackground)",
  colorTransparentBackgroundHover: "var(--colorTransparentBackgroundHover)",
  colorTransparentBackgroundPressed: "var(--colorTransparentBackgroundPressed)",
  colorTransparentBackgroundSelected: "var(--colorTransparentBackgroundSelected)",
  colorNeutralBackgroundDisabled: "var(--colorNeutralBackgroundDisabled)",
  colorNeutralBackgroundInvertedDisabled: "var(--colorNeutralBackgroundInvertedDisabled)",
  colorNeutralStencil1: "var(--colorNeutralStencil1)",
  colorNeutralStencil2: "var(--colorNeutralStencil2)",
  colorNeutralStencil1Alpha: "var(--colorNeutralStencil1Alpha)",
  colorNeutralStencil2Alpha: "var(--colorNeutralStencil2Alpha)",
  colorBackgroundOverlay: "var(--colorBackgroundOverlay)",
  colorScrollbarOverlay: "var(--colorScrollbarOverlay)",
  colorBrandBackground: "var(--colorBrandBackground)",
  colorBrandBackgroundHover: "var(--colorBrandBackgroundHover)",
  colorBrandBackgroundPressed: "var(--colorBrandBackgroundPressed)",
  colorBrandBackgroundSelected: "var(--colorBrandBackgroundSelected)",
  colorCompoundBrandBackground: "var(--colorCompoundBrandBackground)",
  colorCompoundBrandBackgroundHover: "var(--colorCompoundBrandBackgroundHover)",
  colorCompoundBrandBackgroundPressed: "var(--colorCompoundBrandBackgroundPressed)",
  colorBrandBackgroundStatic: "var(--colorBrandBackgroundStatic)",
  colorBrandBackground2: "var(--colorBrandBackground2)",
  colorBrandBackground2Hover: "var(--colorBrandBackground2Hover)",
  colorBrandBackground2Pressed: "var(--colorBrandBackground2Pressed)",
  colorBrandBackground3Static: "var(--colorBrandBackground3Static)",
  colorBrandBackground4Static: "var(--colorBrandBackground4Static)",
  colorBrandBackgroundInverted: "var(--colorBrandBackgroundInverted)",
  colorBrandBackgroundInvertedHover: "var(--colorBrandBackgroundInvertedHover)",
  colorBrandBackgroundInvertedPressed: "var(--colorBrandBackgroundInvertedPressed)",
  colorBrandBackgroundInvertedSelected: "var(--colorBrandBackgroundInvertedSelected)",
  colorNeutralCardBackground: "var(--colorNeutralCardBackground)",
  colorNeutralCardBackgroundHover: "var(--colorNeutralCardBackgroundHover)",
  colorNeutralCardBackgroundPressed: "var(--colorNeutralCardBackgroundPressed)",
  colorNeutralCardBackgroundSelected: "var(--colorNeutralCardBackgroundSelected)",
  colorNeutralCardBackgroundDisabled: "var(--colorNeutralCardBackgroundDisabled)",
  colorNeutralStrokeAccessible: "var(--colorNeutralStrokeAccessible)",
  colorNeutralStrokeAccessibleHover: "var(--colorNeutralStrokeAccessibleHover)",
  colorNeutralStrokeAccessiblePressed: "var(--colorNeutralStrokeAccessiblePressed)",
  colorNeutralStrokeAccessibleSelected: "var(--colorNeutralStrokeAccessibleSelected)",
  colorNeutralStroke1: "var(--colorNeutralStroke1)",
  colorNeutralStroke1Hover: "var(--colorNeutralStroke1Hover)",
  colorNeutralStroke1Pressed: "var(--colorNeutralStroke1Pressed)",
  colorNeutralStroke1Selected: "var(--colorNeutralStroke1Selected)",
  colorNeutralStroke2: "var(--colorNeutralStroke2)",
  colorNeutralStroke3: "var(--colorNeutralStroke3)",
  colorNeutralStrokeSubtle: "var(--colorNeutralStrokeSubtle)",
  colorNeutralStrokeOnBrand: "var(--colorNeutralStrokeOnBrand)",
  colorNeutralStrokeOnBrand2: "var(--colorNeutralStrokeOnBrand2)",
  colorNeutralStrokeOnBrand2Hover: "var(--colorNeutralStrokeOnBrand2Hover)",
  colorNeutralStrokeOnBrand2Pressed: "var(--colorNeutralStrokeOnBrand2Pressed)",
  colorNeutralStrokeOnBrand2Selected: "var(--colorNeutralStrokeOnBrand2Selected)",
  colorBrandStroke1: "var(--colorBrandStroke1)",
  colorBrandStroke2: "var(--colorBrandStroke2)",
  colorBrandStroke2Hover: "var(--colorBrandStroke2Hover)",
  colorBrandStroke2Pressed: "var(--colorBrandStroke2Pressed)",
  colorBrandStroke2Contrast: "var(--colorBrandStroke2Contrast)",
  colorCompoundBrandStroke: "var(--colorCompoundBrandStroke)",
  colorCompoundBrandStrokeHover: "var(--colorCompoundBrandStrokeHover)",
  colorCompoundBrandStrokePressed: "var(--colorCompoundBrandStrokePressed)",
  colorNeutralStrokeDisabled: "var(--colorNeutralStrokeDisabled)",
  colorNeutralStrokeInvertedDisabled: "var(--colorNeutralStrokeInvertedDisabled)",
  colorTransparentStroke: "var(--colorTransparentStroke)",
  colorTransparentStrokeInteractive: "var(--colorTransparentStrokeInteractive)",
  colorTransparentStrokeDisabled: "var(--colorTransparentStrokeDisabled)",
  colorNeutralStrokeAlpha: "var(--colorNeutralStrokeAlpha)",
  colorNeutralStrokeAlpha2: "var(--colorNeutralStrokeAlpha2)",
  colorStrokeFocus1: "var(--colorStrokeFocus1)",
  colorStrokeFocus2: "var(--colorStrokeFocus2)",
  colorNeutralShadowAmbient: "var(--colorNeutralShadowAmbient)",
  colorNeutralShadowKey: "var(--colorNeutralShadowKey)",
  colorNeutralShadowAmbientLighter: "var(--colorNeutralShadowAmbientLighter)",
  colorNeutralShadowKeyLighter: "var(--colorNeutralShadowKeyLighter)",
  colorNeutralShadowAmbientDarker: "var(--colorNeutralShadowAmbientDarker)",
  colorNeutralShadowKeyDarker: "var(--colorNeutralShadowKeyDarker)",
  colorBrandShadowAmbient: "var(--colorBrandShadowAmbient)",
  colorBrandShadowKey: "var(--colorBrandShadowKey)",
  // Color palette tokens
  // Color palette red tokens
  colorPaletteRedBackground1: "var(--colorPaletteRedBackground1)",
  colorPaletteRedBackground2: "var(--colorPaletteRedBackground2)",
  colorPaletteRedBackground3: "var(--colorPaletteRedBackground3)",
  colorPaletteRedBorderActive: "var(--colorPaletteRedBorderActive)",
  colorPaletteRedBorder1: "var(--colorPaletteRedBorder1)",
  colorPaletteRedBorder2: "var(--colorPaletteRedBorder2)",
  colorPaletteRedForeground1: "var(--colorPaletteRedForeground1)",
  colorPaletteRedForeground2: "var(--colorPaletteRedForeground2)",
  colorPaletteRedForeground3: "var(--colorPaletteRedForeground3)",
  colorPaletteRedForegroundInverted: "var(--colorPaletteRedForegroundInverted)",
  // Color palette green tokens
  colorPaletteGreenBackground1: "var(--colorPaletteGreenBackground1)",
  colorPaletteGreenBackground2: "var(--colorPaletteGreenBackground2)",
  colorPaletteGreenBackground3: "var(--colorPaletteGreenBackground3)",
  colorPaletteGreenBorderActive: "var(--colorPaletteGreenBorderActive)",
  colorPaletteGreenBorder1: "var(--colorPaletteGreenBorder1)",
  colorPaletteGreenBorder2: "var(--colorPaletteGreenBorder2)",
  colorPaletteGreenForeground1: "var(--colorPaletteGreenForeground1)",
  colorPaletteGreenForeground2: "var(--colorPaletteGreenForeground2)",
  colorPaletteGreenForeground3: "var(--colorPaletteGreenForeground3)",
  colorPaletteGreenForegroundInverted: "var(--colorPaletteGreenForegroundInverted)",
  // Color palette dark orange tokens
  colorPaletteDarkOrangeBackground1: "var(--colorPaletteDarkOrangeBackground1)",
  colorPaletteDarkOrangeBackground2: "var(--colorPaletteDarkOrangeBackground2)",
  colorPaletteDarkOrangeBackground3: "var(--colorPaletteDarkOrangeBackground3)",
  colorPaletteDarkOrangeBorderActive: "var(--colorPaletteDarkOrangeBorderActive)",
  colorPaletteDarkOrangeBorder1: "var(--colorPaletteDarkOrangeBorder1)",
  colorPaletteDarkOrangeBorder2: "var(--colorPaletteDarkOrangeBorder2)",
  colorPaletteDarkOrangeForeground1: "var(--colorPaletteDarkOrangeForeground1)",
  colorPaletteDarkOrangeForeground2: "var(--colorPaletteDarkOrangeForeground2)",
  colorPaletteDarkOrangeForeground3: "var(--colorPaletteDarkOrangeForeground3)",
  // Color palette yellow tokens
  colorPaletteYellowBackground1: "var(--colorPaletteYellowBackground1)",
  colorPaletteYellowBackground2: "var(--colorPaletteYellowBackground2)",
  colorPaletteYellowBackground3: "var(--colorPaletteYellowBackground3)",
  colorPaletteYellowBorderActive: "var(--colorPaletteYellowBorderActive)",
  colorPaletteYellowBorder1: "var(--colorPaletteYellowBorder1)",
  colorPaletteYellowBorder2: "var(--colorPaletteYellowBorder2)",
  colorPaletteYellowForeground1: "var(--colorPaletteYellowForeground1)",
  colorPaletteYellowForeground2: "var(--colorPaletteYellowForeground2)",
  colorPaletteYellowForeground3: "var(--colorPaletteYellowForeground3)",
  colorPaletteYellowForegroundInverted: "var(--colorPaletteYellowForegroundInverted)",
  // Color palette berry tokens
  colorPaletteBerryBackground1: "var(--colorPaletteBerryBackground1)",
  colorPaletteBerryBackground2: "var(--colorPaletteBerryBackground2)",
  colorPaletteBerryBackground3: "var(--colorPaletteBerryBackground3)",
  colorPaletteBerryBorderActive: "var(--colorPaletteBerryBorderActive)",
  colorPaletteBerryBorder1: "var(--colorPaletteBerryBorder1)",
  colorPaletteBerryBorder2: "var(--colorPaletteBerryBorder2)",
  colorPaletteBerryForeground1: "var(--colorPaletteBerryForeground1)",
  colorPaletteBerryForeground2: "var(--colorPaletteBerryForeground2)",
  colorPaletteBerryForeground3: "var(--colorPaletteBerryForeground3)",
  // Color palette marigold tokens
  colorPaletteMarigoldBackground1: "var(--colorPaletteMarigoldBackground1)",
  colorPaletteMarigoldBackground2: "var(--colorPaletteMarigoldBackground2)",
  colorPaletteMarigoldBackground3: "var(--colorPaletteMarigoldBackground3)",
  colorPaletteMarigoldBorderActive: "var(--colorPaletteMarigoldBorderActive)",
  colorPaletteMarigoldBorder1: "var(--colorPaletteMarigoldBorder1)",
  colorPaletteMarigoldBorder2: "var(--colorPaletteMarigoldBorder2)",
  colorPaletteMarigoldForeground1: "var(--colorPaletteMarigoldForeground1)",
  colorPaletteMarigoldForeground2: "var(--colorPaletteMarigoldForeground2)",
  colorPaletteMarigoldForeground3: "var(--colorPaletteMarigoldForeground3)",
  // Color palette light green tokens
  colorPaletteLightGreenBackground1: "var(--colorPaletteLightGreenBackground1)",
  colorPaletteLightGreenBackground2: "var(--colorPaletteLightGreenBackground2)",
  colorPaletteLightGreenBackground3: "var(--colorPaletteLightGreenBackground3)",
  colorPaletteLightGreenBorderActive: "var(--colorPaletteLightGreenBorderActive)",
  colorPaletteLightGreenBorder1: "var(--colorPaletteLightGreenBorder1)",
  colorPaletteLightGreenBorder2: "var(--colorPaletteLightGreenBorder2)",
  colorPaletteLightGreenForeground1: "var(--colorPaletteLightGreenForeground1)",
  colorPaletteLightGreenForeground2: "var(--colorPaletteLightGreenForeground2)",
  colorPaletteLightGreenForeground3: "var(--colorPaletteLightGreenForeground3)",
  // Color palette anchor tokens
  colorPaletteAnchorBackground2: "var(--colorPaletteAnchorBackground2)",
  colorPaletteAnchorBorderActive: "var(--colorPaletteAnchorBorderActive)",
  colorPaletteAnchorForeground2: "var(--colorPaletteAnchorForeground2)",
  // Color palette beige tokens
  colorPaletteBeigeBackground2: "var(--colorPaletteBeigeBackground2)",
  colorPaletteBeigeBorderActive: "var(--colorPaletteBeigeBorderActive)",
  colorPaletteBeigeForeground2: "var(--colorPaletteBeigeForeground2)",
  // Color palette blue tokens
  colorPaletteBlueBackground2: "var(--colorPaletteBlueBackground2)",
  colorPaletteBlueBorderActive: "var(--colorPaletteBlueBorderActive)",
  colorPaletteBlueForeground2: "var(--colorPaletteBlueForeground2)",
  // Color palette brass tokens
  colorPaletteBrassBackground2: "var(--colorPaletteBrassBackground2)",
  colorPaletteBrassBorderActive: "var(--colorPaletteBrassBorderActive)",
  colorPaletteBrassForeground2: "var(--colorPaletteBrassForeground2)",
  // Color palette brown tokens
  colorPaletteBrownBackground2: "var(--colorPaletteBrownBackground2)",
  colorPaletteBrownBorderActive: "var(--colorPaletteBrownBorderActive)",
  colorPaletteBrownForeground2: "var(--colorPaletteBrownForeground2)",
  // Color palette cornflower tokens
  colorPaletteCornflowerBackground2: "var(--colorPaletteCornflowerBackground2)",
  colorPaletteCornflowerBorderActive: "var(--colorPaletteCornflowerBorderActive)",
  colorPaletteCornflowerForeground2: "var(--colorPaletteCornflowerForeground2)",
  // Color palette cranberry tokens
  colorPaletteCranberryBackground2: "var(--colorPaletteCranberryBackground2)",
  colorPaletteCranberryBorderActive: "var(--colorPaletteCranberryBorderActive)",
  colorPaletteCranberryForeground2: "var(--colorPaletteCranberryForeground2)",
  // Color palette dark green tokens
  colorPaletteDarkGreenBackground2: "var(--colorPaletteDarkGreenBackground2)",
  colorPaletteDarkGreenBorderActive: "var(--colorPaletteDarkGreenBorderActive)",
  colorPaletteDarkGreenForeground2: "var(--colorPaletteDarkGreenForeground2)",
  // Color palette dark red tokens
  colorPaletteDarkRedBackground2: "var(--colorPaletteDarkRedBackground2)",
  colorPaletteDarkRedBorderActive: "var(--colorPaletteDarkRedBorderActive)",
  colorPaletteDarkRedForeground2: "var(--colorPaletteDarkRedForeground2)",
  // Color palette forest tokens
  colorPaletteForestBackground2: "var(--colorPaletteForestBackground2)",
  colorPaletteForestBorderActive: "var(--colorPaletteForestBorderActive)",
  colorPaletteForestForeground2: "var(--colorPaletteForestForeground2)",
  // Color palette gold tokens
  colorPaletteGoldBackground2: "var(--colorPaletteGoldBackground2)",
  colorPaletteGoldBorderActive: "var(--colorPaletteGoldBorderActive)",
  colorPaletteGoldForeground2: "var(--colorPaletteGoldForeground2)",
  // Color palette grape tokens
  colorPaletteGrapeBackground2: "var(--colorPaletteGrapeBackground2)",
  colorPaletteGrapeBorderActive: "var(--colorPaletteGrapeBorderActive)",
  colorPaletteGrapeForeground2: "var(--colorPaletteGrapeForeground2)",
  // Color palette lavender tokens
  colorPaletteLavenderBackground2: "var(--colorPaletteLavenderBackground2)",
  colorPaletteLavenderBorderActive: "var(--colorPaletteLavenderBorderActive)",
  colorPaletteLavenderForeground2: "var(--colorPaletteLavenderForeground2)",
  // Color palette light teal tokens
  colorPaletteLightTealBackground2: "var(--colorPaletteLightTealBackground2)",
  colorPaletteLightTealBorderActive: "var(--colorPaletteLightTealBorderActive)",
  colorPaletteLightTealForeground2: "var(--colorPaletteLightTealForeground2)",
  // Color palette lilac tokens
  colorPaletteLilacBackground2: "var(--colorPaletteLilacBackground2)",
  colorPaletteLilacBorderActive: "var(--colorPaletteLilacBorderActive)",
  colorPaletteLilacForeground2: "var(--colorPaletteLilacForeground2)",
  // Color palette magenta tokens
  colorPaletteMagentaBackground2: "var(--colorPaletteMagentaBackground2)",
  colorPaletteMagentaBorderActive: "var(--colorPaletteMagentaBorderActive)",
  colorPaletteMagentaForeground2: "var(--colorPaletteMagentaForeground2)",
  // Color palette mink tokens
  colorPaletteMinkBackground2: "var(--colorPaletteMinkBackground2)",
  colorPaletteMinkBorderActive: "var(--colorPaletteMinkBorderActive)",
  colorPaletteMinkForeground2: "var(--colorPaletteMinkForeground2)",
  // Color palette navy tokens
  colorPaletteNavyBackground2: "var(--colorPaletteNavyBackground2)",
  colorPaletteNavyBorderActive: "var(--colorPaletteNavyBorderActive)",
  colorPaletteNavyForeground2: "var(--colorPaletteNavyForeground2)",
  // Color palette peach tokens
  colorPalettePeachBackground2: "var(--colorPalettePeachBackground2)",
  colorPalettePeachBorderActive: "var(--colorPalettePeachBorderActive)",
  colorPalettePeachForeground2: "var(--colorPalettePeachForeground2)",
  // Color palette pink tokens
  colorPalettePinkBackground2: "var(--colorPalettePinkBackground2)",
  colorPalettePinkBorderActive: "var(--colorPalettePinkBorderActive)",
  colorPalettePinkForeground2: "var(--colorPalettePinkForeground2)",
  // Color palette platinum tokens
  colorPalettePlatinumBackground2: "var(--colorPalettePlatinumBackground2)",
  colorPalettePlatinumBorderActive: "var(--colorPalettePlatinumBorderActive)",
  colorPalettePlatinumForeground2: "var(--colorPalettePlatinumForeground2)",
  // Color palette plum tokens
  colorPalettePlumBackground2: "var(--colorPalettePlumBackground2)",
  colorPalettePlumBorderActive: "var(--colorPalettePlumBorderActive)",
  colorPalettePlumForeground2: "var(--colorPalettePlumForeground2)",
  // Color palette pumpkin tokens
  colorPalettePumpkinBackground2: "var(--colorPalettePumpkinBackground2)",
  colorPalettePumpkinBorderActive: "var(--colorPalettePumpkinBorderActive)",
  colorPalettePumpkinForeground2: "var(--colorPalettePumpkinForeground2)",
  // Color palette purple tokens
  colorPalettePurpleBackground2: "var(--colorPalettePurpleBackground2)",
  colorPalettePurpleBorderActive: "var(--colorPalettePurpleBorderActive)",
  colorPalettePurpleForeground2: "var(--colorPalettePurpleForeground2)",
  // Color palette royal blue tokens
  colorPaletteRoyalBlueBackground2: "var(--colorPaletteRoyalBlueBackground2)",
  colorPaletteRoyalBlueBorderActive: "var(--colorPaletteRoyalBlueBorderActive)",
  colorPaletteRoyalBlueForeground2: "var(--colorPaletteRoyalBlueForeground2)",
  // Color palette seafoam tokens
  colorPaletteSeafoamBackground2: "var(--colorPaletteSeafoamBackground2)",
  colorPaletteSeafoamBorderActive: "var(--colorPaletteSeafoamBorderActive)",
  colorPaletteSeafoamForeground2: "var(--colorPaletteSeafoamForeground2)",
  // Color palette steel tokens
  colorPaletteSteelBackground2: "var(--colorPaletteSteelBackground2)",
  colorPaletteSteelBorderActive: "var(--colorPaletteSteelBorderActive)",
  colorPaletteSteelForeground2: "var(--colorPaletteSteelForeground2)",
  // Color palette teal tokens
  colorPaletteTealBackground2: "var(--colorPaletteTealBackground2)",
  colorPaletteTealBorderActive: "var(--colorPaletteTealBorderActive)",
  colorPaletteTealForeground2: "var(--colorPaletteTealForeground2)",
  // Color status success tokens
  colorStatusSuccessBackground1: "var(--colorStatusSuccessBackground1)",
  colorStatusSuccessBackground2: "var(--colorStatusSuccessBackground2)",
  colorStatusSuccessBackground3: "var(--colorStatusSuccessBackground3)",
  colorStatusSuccessForeground1: "var(--colorStatusSuccessForeground1)",
  colorStatusSuccessForeground2: "var(--colorStatusSuccessForeground2)",
  colorStatusSuccessForeground3: "var(--colorStatusSuccessForeground3)",
  colorStatusSuccessForegroundInverted: "var(--colorStatusSuccessForegroundInverted)",
  colorStatusSuccessBorderActive: "var(--colorStatusSuccessBorderActive)",
  colorStatusSuccessBorder1: "var(--colorStatusSuccessBorder1)",
  colorStatusSuccessBorder2: "var(--colorStatusSuccessBorder2)",
  // Color status warning tokens
  colorStatusWarningBackground1: "var(--colorStatusWarningBackground1)",
  colorStatusWarningBackground2: "var(--colorStatusWarningBackground2)",
  colorStatusWarningBackground3: "var(--colorStatusWarningBackground3)",
  colorStatusWarningForeground1: "var(--colorStatusWarningForeground1)",
  colorStatusWarningForeground2: "var(--colorStatusWarningForeground2)",
  colorStatusWarningForeground3: "var(--colorStatusWarningForeground3)",
  colorStatusWarningForegroundInverted: "var(--colorStatusWarningForegroundInverted)",
  colorStatusWarningBorderActive: "var(--colorStatusWarningBorderActive)",
  colorStatusWarningBorder1: "var(--colorStatusWarningBorder1)",
  colorStatusWarningBorder2: "var(--colorStatusWarningBorder2)",
  // Color status danger tokens
  colorStatusDangerBackground1: "var(--colorStatusDangerBackground1)",
  colorStatusDangerBackground2: "var(--colorStatusDangerBackground2)",
  colorStatusDangerBackground3: "var(--colorStatusDangerBackground3)",
  colorStatusDangerBackground3Hover: "var(--colorStatusDangerBackground3Hover)",
  colorStatusDangerBackground3Pressed: "var(--colorStatusDangerBackground3Pressed)",
  colorStatusDangerForeground1: "var(--colorStatusDangerForeground1)",
  colorStatusDangerForeground2: "var(--colorStatusDangerForeground2)",
  colorStatusDangerForeground3: "var(--colorStatusDangerForeground3)",
  colorStatusDangerForegroundInverted: "var(--colorStatusDangerForegroundInverted)",
  colorStatusDangerBorderActive: "var(--colorStatusDangerBorderActive)",
  colorStatusDangerBorder1: "var(--colorStatusDangerBorder1)",
  colorStatusDangerBorder2: "var(--colorStatusDangerBorder2)",
  // Border radius tokens
  borderRadiusNone: "var(--borderRadiusNone)",
  borderRadiusSmall: "var(--borderRadiusSmall)",
  borderRadiusMedium: "var(--borderRadiusMedium)",
  borderRadiusLarge: "var(--borderRadiusLarge)",
  borderRadiusXLarge: "var(--borderRadiusXLarge)",
  borderRadiusCircular: "var(--borderRadiusCircular)",
  // Font family tokens
  fontFamilyBase: "var(--fontFamilyBase)",
  fontFamilyMonospace: "var(--fontFamilyMonospace)",
  fontFamilyNumeric: "var(--fontFamilyNumeric)",
  // Font size tokens
  fontSizeBase100: "var(--fontSizeBase100)",
  fontSizeBase200: "var(--fontSizeBase200)",
  fontSizeBase300: "var(--fontSizeBase300)",
  fontSizeBase400: "var(--fontSizeBase400)",
  fontSizeBase500: "var(--fontSizeBase500)",
  fontSizeBase600: "var(--fontSizeBase600)",
  fontSizeHero700: "var(--fontSizeHero700)",
  fontSizeHero800: "var(--fontSizeHero800)",
  fontSizeHero900: "var(--fontSizeHero900)",
  fontSizeHero1000: "var(--fontSizeHero1000)",
  // Font weight tokens
  fontWeightRegular: "var(--fontWeightRegular)",
  fontWeightMedium: "var(--fontWeightMedium)",
  fontWeightSemibold: "var(--fontWeightSemibold)",
  fontWeightBold: "var(--fontWeightBold)",
  // Line height tokens
  lineHeightBase100: "var(--lineHeightBase100)",
  lineHeightBase200: "var(--lineHeightBase200)",
  lineHeightBase300: "var(--lineHeightBase300)",
  lineHeightBase400: "var(--lineHeightBase400)",
  lineHeightBase500: "var(--lineHeightBase500)",
  lineHeightBase600: "var(--lineHeightBase600)",
  lineHeightHero700: "var(--lineHeightHero700)",
  lineHeightHero800: "var(--lineHeightHero800)",
  lineHeightHero900: "var(--lineHeightHero900)",
  lineHeightHero1000: "var(--lineHeightHero1000)",
  // Shadow tokens
  shadow2: "var(--shadow2)",
  shadow4: "var(--shadow4)",
  shadow8: "var(--shadow8)",
  shadow16: "var(--shadow16)",
  shadow28: "var(--shadow28)",
  shadow64: "var(--shadow64)",
  // Shadow brand tokens
  shadow2Brand: "var(--shadow2Brand)",
  shadow4Brand: "var(--shadow4Brand)",
  shadow8Brand: "var(--shadow8Brand)",
  shadow16Brand: "var(--shadow16Brand)",
  shadow28Brand: "var(--shadow28Brand)",
  shadow64Brand: "var(--shadow64Brand)",
  // Stroke width tokens
  strokeWidthThin: "var(--strokeWidthThin)",
  strokeWidthThick: "var(--strokeWidthThick)",
  strokeWidthThicker: "var(--strokeWidthThicker)",
  strokeWidthThickest: "var(--strokeWidthThickest)",
  // Spacings
  spacingHorizontalNone: "var(--spacingHorizontalNone)",
  spacingHorizontalXXS: "var(--spacingHorizontalXXS)",
  spacingHorizontalXS: "var(--spacingHorizontalXS)",
  spacingHorizontalSNudge: "var(--spacingHorizontalSNudge)",
  spacingHorizontalS: "var(--spacingHorizontalS)",
  spacingHorizontalMNudge: "var(--spacingHorizontalMNudge)",
  spacingHorizontalM: "var(--spacingHorizontalM)",
  spacingHorizontalL: "var(--spacingHorizontalL)",
  spacingHorizontalXL: "var(--spacingHorizontalXL)",
  spacingHorizontalXXL: "var(--spacingHorizontalXXL)",
  spacingHorizontalXXXL: "var(--spacingHorizontalXXXL)",
  spacingVerticalNone: "var(--spacingVerticalNone)",
  spacingVerticalXXS: "var(--spacingVerticalXXS)",
  spacingVerticalXS: "var(--spacingVerticalXS)",
  spacingVerticalSNudge: "var(--spacingVerticalSNudge)",
  spacingVerticalS: "var(--spacingVerticalS)",
  spacingVerticalMNudge: "var(--spacingVerticalMNudge)",
  spacingVerticalM: "var(--spacingVerticalM)",
  spacingVerticalL: "var(--spacingVerticalL)",
  spacingVerticalXL: "var(--spacingVerticalXL)",
  spacingVerticalXXL: "var(--spacingVerticalXXL)",
  spacingVerticalXXXL: "var(--spacingVerticalXXXL)",
  // Durations
  durationUltraFast: "var(--durationUltraFast)",
  durationFaster: "var(--durationFaster)",
  durationFast: "var(--durationFast)",
  durationNormal: "var(--durationNormal)",
  durationGentle: "var(--durationGentle)",
  durationSlow: "var(--durationSlow)",
  durationSlower: "var(--durationSlower)",
  durationUltraSlow: "var(--durationUltraSlow)",
  // Curves
  curveAccelerateMax: "var(--curveAccelerateMax)",
  curveAccelerateMid: "var(--curveAccelerateMid)",
  curveAccelerateMin: "var(--curveAccelerateMin)",
  curveDecelerateMax: "var(--curveDecelerateMax)",
  curveDecelerateMid: "var(--curveDecelerateMid)",
  curveDecelerateMin: "var(--curveDecelerateMin)",
  curveEasyEaseMax: "var(--curveEasyEaseMax)",
  curveEasyEase: "var(--curveEasyEase)",
  curveLinear: "var(--curveLinear)"
};
const Enter = "Enter";
const Space = " ";
const Escape = "Escape";
function useARIAButtonProps(type, props) {
  const { disabled, disabledFocusable = false, ["aria-disabled"]: ariaDisabled, onClick, onKeyDown, onKeyUp, ...rest } = props !== null && props !== void 0 ? props : {};
  const normalizedARIADisabled = typeof ariaDisabled === "string" ? ariaDisabled === "true" : ariaDisabled;
  const isDisabled = disabled || disabledFocusable || normalizedARIADisabled;
  const handleClick = useEventCallback((ev) => {
    if (isDisabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick === null || onClick === void 0 ? void 0 : onClick(ev);
    }
  });
  const handleKeyDown = useEventCallback((ev) => {
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(ev);
    if (ev.isDefaultPrevented()) {
      return;
    }
    const key = ev.key;
    if (isDisabled && (key === Enter || key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (key === Space) {
      ev.preventDefault();
      return;
    } else if (key === Enter) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });
  const handleKeyUp = useEventCallback((ev) => {
    onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp(ev);
    if (ev.isDefaultPrevented()) {
      return;
    }
    const key = ev.key;
    if (isDisabled && (key === Enter || key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (key === Space) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });
  if (type === "button" || type === void 0) {
    return {
      ...rest,
      disabled: disabled && !disabledFocusable,
      "aria-disabled": disabledFocusable ? true : normalizedARIADisabled,
      // onclick should still use internal handler to ensure prevention if disabled
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onClick: disabledFocusable ? void 0 : handleClick,
      onKeyUp: disabledFocusable ? void 0 : onKeyUp,
      onKeyDown: disabledFocusable ? void 0 : onKeyDown
    };
  } else {
    const resultProps = {
      role: "button",
      tabIndex: disabled && !disabledFocusable ? void 0 : 0,
      ...rest,
      // If it's not a <button> than listeners are required even with disabledFocusable
      // Since you cannot assure the default behavior of the element
      // E.g: <a> will redirect on click
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      "aria-disabled": disabled || disabledFocusable || normalizedARIADisabled
    };
    if (type === "a" && isDisabled) {
      resultProps.href = void 0;
    }
    return resultProps;
  }
}
const useRootStyles$3 = __styles({
  "root": {
    "mc9l5x": "f1w7gpdv",
    "Bg96gwp": "fez10in",
    "ycbfsm": "fg4l7m0"
  },
  "rtl": {
    "Bz10aip": "f13rod7r"
  }
}, {
  "d": [".f1w7gpdv{display:inline;}", ".fez10in{line-height:0;}", ".f13rod7r{-webkit-transform:scaleX(-1);-moz-transform:scaleX(-1);-ms-transform:scaleX(-1);transform:scaleX(-1);}"],
  "t": ["@media (forced-colors: active){.fg4l7m0{forced-color-adjust:auto;}}"]
});
const useIconState = (props, options) => {
  const {
    title,
    primaryFill = "currentColor",
    ...rest
  } = props;
  const state = {
    ...rest,
    title: void 0,
    fill: primaryFill
  };
  const styles = useRootStyles$3();
  const iconContext = useIconContext();
  state.className = mergeClasses(styles.root, (options === null || options === void 0 ? void 0 : options.flipInRtl) && (iconContext === null || iconContext === void 0 ? void 0 : iconContext.textDirection) === "rtl" && styles.rtl, state.className);
  if (title) {
    state["aria-label"] = title;
  }
  if (!state["aria-label"] && !state["aria-labelledby"]) {
    state["aria-hidden"] = true;
  } else {
    state["role"] = "img";
  }
  return state;
};
const createFluentIcon = (displayName, width, paths, options) => {
  const viewBoxWidth = width === "1em" ? "20" : width;
  const Icon = reactExports.forwardRef((props, ref) => {
    const state = {
      ...useIconState(props, {
        flipInRtl: options === null || options === void 0 ? void 0 : options.flipInRtl
      }),
      ref,
      width,
      height: width,
      viewBox: `0 0 ${viewBoxWidth} ${viewBoxWidth}`,
      xmlns: "http://www.w3.org/2000/svg"
    };
    return reactExports.createElement("svg", state, ...paths.map((d) => reactExports.createElement("path", {
      d,
      fill: state.fill
    })));
  });
  Icon.displayName = displayName;
  return Icon;
};
const CheckmarkCircle12Filled = /* @__PURE__ */ createFluentIcon("CheckmarkCircle12Filled", "12", ["M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6Zm7.35-.9a.5.5 0 1 0-.7-.7L5.5 6.54 4.35 5.4a.5.5 0 1 0-.7.7l1.5 1.5c.2.2.5.2.7 0l2.5-2.5Z"]);
const ErrorCircle12Filled = /* @__PURE__ */ createFluentIcon("ErrorCircle12Filled", "12", ["M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm-.75-2.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm.26-4.84a.5.5 0 0 1 .98 0l.01.09v2.59a.5.5 0 0 1-1 0V3.41Z"]);
const Warning12Filled = /* @__PURE__ */ createFluentIcon("Warning12Filled", "12", ["M5.21 1.46a.9.9 0 0 1 1.58 0l4.09 7.17a.92.92 0 0 1-.79 1.37H1.91a.92.92 0 0 1-.79-1.37l4.1-7.17ZM5.5 4.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0ZM6 6.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"]);
const renderButton_unstable = (state) => {
  const { iconOnly, iconPosition } = state;
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      iconPosition !== "after" && state.icon && /* @__PURE__ */ jsx(state.icon, {}),
      !iconOnly && state.root.children,
      iconPosition === "after" && state.icon && /* @__PURE__ */ jsx(state.icon, {})
    ]
  });
};
const buttonContext = reactExports.createContext(void 0);
const buttonContextDefaultValue = {};
buttonContext.Provider;
const useButtonContext = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(buttonContext)) !== null && _React_useContext !== void 0 ? _React_useContext : buttonContextDefaultValue;
};
const useButton_unstable = (props, ref) => {
  const { size: contextSize } = useButtonContext();
  const { appearance = "secondary", as = "button", disabled = false, disabledFocusable = false, icon, iconPosition = "before", shape = "rounded", size = contextSize !== null && contextSize !== void 0 ? contextSize : "medium" } = props;
  const iconShorthand = optional(icon, {
    elementType: "span"
  });
  return {
    // Props passed at the top-level
    appearance,
    disabled,
    disabledFocusable,
    iconPosition,
    shape,
    size,
    iconOnly: Boolean((iconShorthand === null || iconShorthand === void 0 ? void 0 : iconShorthand.children) && !props.children),
    components: {
      root: "button",
      icon: "span"
    },
    root: always(getIntrinsicElementProps(as, useARIAButtonProps(props.as, props)), {
      elementType: "button",
      defaultProps: {
        ref,
        type: "button"
      }
    }),
    icon: iconShorthand
  };
};
const buttonClassNames = {
  root: "fui-Button",
  icon: "fui-Button__icon"
};
const useRootBaseClassName = /* @__PURE__ */ __resetStyles("r1alrhcs", null, {
  r: [".r1alrhcs{align-items:center;box-sizing:border-box;display:inline-flex;justify-content:center;text-decoration-line:none;vertical-align:middle;margin:0;overflow:hidden;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);font-family:var(--fontFamilyBase);outline-style:none;padding:5px var(--spacingHorizontalM);min-width:96px;border-radius:var(--borderRadiusMedium);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase300);transition-duration:var(--durationFaster);transition-property:background,border,color;transition-timing-function:var(--curveEasyEase);}", ".r1alrhcs:hover{background-color:var(--colorNeutralBackground1Hover);border-color:var(--colorNeutralStroke1Hover);color:var(--colorNeutralForeground1Hover);cursor:pointer;}", ".r1alrhcs:hover:active{background-color:var(--colorNeutralBackground1Pressed);border-color:var(--colorNeutralStroke1Pressed);color:var(--colorNeutralForeground1Pressed);outline-style:none;}", ".r1alrhcs[data-fui-focus-visible]{border-color:var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);border-width:1px;outline:var(--strokeWidthThick) solid var(--colorTransparentStroke);box-shadow:0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;z-index:1;}"],
  s: ["@media screen and (prefers-reduced-motion: reduce){.r1alrhcs{transition-duration:0.01ms;}}", "@media (forced-colors: active){.r1alrhcs:focus{border-color:ButtonText;}.r1alrhcs:hover{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}.r1alrhcs:hover:active{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}}", "@supports (-moz-appearance:button){.r1alrhcs[data-fui-focus-visible]{box-shadow:0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]
});
const useIconBaseClassName = /* @__PURE__ */ __resetStyles("rywnvv2", null, [".rywnvv2{align-items:center;display:inline-flex;justify-content:center;font-size:20px;height:20px;width:20px;--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}"]);
const useRootStyles$2 = /* @__PURE__ */ __styles({
  outline: {
    De3pzq: "f1c21dwh",
    Jwef8y: "fjxutwb",
    iro3zm: "fwiml72"
  },
  primary: {
    De3pzq: "ffp7eso",
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
    B2d53fq: "f1d6v5y2",
    Bsw6fvg: "f1rirnrt",
    Bjwas2f: "f1uu00uk",
    Bn1d65q: ["fkvaka8", "f9a0qzu"],
    Bxeuatn: "f1ux7til",
    n51gp8: ["f9a0qzu", "fkvaka8"],
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
    pc6evw: "f9ddjv3"
  },
  secondary: {},
  subtle: {
    De3pzq: "fhovq9v",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "fkfq4zb",
    Jwef8y: "f1t94bn6",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "fnwyq0v",
    Bk3fhr4: "ft1hn21",
    Bmfj8id: "fuxngvv",
    Bbdnnc7: "fy5bs14",
    iro3zm: "fsv2rcd",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"],
    B2d53fq: "f1omzyqd",
    em6i61: "f1dfjoow",
    vm6p8p: "f1j98vj9",
    x3br3k: "fj8yq94",
    ze5xyy: "f4xjyn1",
    Bx3q9su: "f1et0tmh",
    pc6evw: "f9ddjv3",
    xd2cci: "f1wi8ngl"
  },
  transparent: {
    De3pzq: "f1c21dwh",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "fkfq4zb",
    Jwef8y: "fjxutwb",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "f139oj5f",
    Bk3fhr4: "ft1hn21",
    Bmfj8id: "fuxngvv",
    iro3zm: "fwiml72",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"],
    B2d53fq: "f1fg1p5m",
    em6i61: "f1dfjoow",
    vm6p8p: "f1j98vj9",
    Bqrx1nm: "f1tme0vf",
    ze5xyy: "f4xjyn1",
    g2kj27: "f18onu3q",
    pc6evw: "f9ddjv3"
  },
  circular: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f44lkw9"
  },
  rounded: {},
  square: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f1fabniw"
  },
  small: {
    Bf4jedk: "fh7ncta",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "fneth5b",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm"
  },
  smallWithIcon: {
    Byoj8tv: "f1brlhvm",
    z8tnut: "f1sl3k7w"
  },
  medium: {},
  large: {
    Bf4jedk: "f14es27b",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f4db1ww",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "faaz57k"
  },
  largeWithIcon: {
    Byoj8tv: "fy7v416",
    z8tnut: "f1a1bwwz"
  }
}, {
  d: [".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".ffp7eso{background-color:var(--colorBrandBackground);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}", ".f1phragk{color:var(--colorNeutralForegroundOnBrand);}", ".fhovq9v{background-color:var(--colorSubtleBackground);}", ".fkfq4zb{color:var(--colorNeutralForeground2);}", [".f44lkw9{border-radius:var(--borderRadiusCircular);}", {
    p: -1
  }], [".f1fabniw{border-radius:var(--borderRadiusNone);}", {
    p: -1
  }], ".fh7ncta{min-width:64px;}", [".fneth5b{padding:3px var(--spacingHorizontalS);}", {
    p: -1
  }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f1brlhvm{padding-bottom:1px;}", ".f1sl3k7w{padding-top:1px;}", ".f14es27b{min-width:96px;}", [".f4db1ww{padding:8px var(--spacingHorizontalL);}", {
    p: -1
  }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fod5ikn{font-size:var(--fontSizeBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".fy7v416{padding-bottom:7px;}", ".f1a1bwwz{padding-top:7px;}"],
  h: [".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}", ".fwiml72:hover:active{background-color:var(--colorTransparentBackgroundPressed);}", ".f15wkkf3:hover{background-color:var(--colorBrandBackgroundHover);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".f1rq72xc:hover{color:var(--colorNeutralForegroundOnBrand);}", ".fnp9lpt:hover:active{background-color:var(--colorBrandBackgroundPressed);}", ".f1h0usnq:hover:active{border-top-color:transparent;}", ".fs4ktlq:hover:active{border-right-color:transparent;}", ".fx2bmrt:hover:active{border-left-color:transparent;}", ".f16h9ulv:hover:active{border-bottom-color:transparent;}", ".f1d6v5y2:hover:active{color:var(--colorNeutralForegroundOnBrand);}", ".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}", ".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}", ".ft1hn21:hover .fui-Icon-filled{display:inline;}", ".fuxngvv:hover .fui-Icon-regular{display:none;}", ".fy5bs14:hover .fui-Button__icon{color:var(--colorNeutralForeground2BrandHover);}", ".fsv2rcd:hover:active{background-color:var(--colorSubtleBackgroundPressed);}", ".f1omzyqd:hover:active{color:var(--colorNeutralForeground2Pressed);}", ".f1dfjoow:hover:active .fui-Icon-filled{display:inline;}", ".f1j98vj9:hover:active .fui-Icon-regular{display:none;}", ".fj8yq94:hover:active .fui-Button__icon{color:var(--colorNeutralForeground2BrandPressed);}", ".f139oj5f:hover{color:var(--colorNeutralForeground2BrandHover);}", ".f1fg1p5m:hover:active{color:var(--colorNeutralForeground2BrandPressed);}"],
  m: [["@media (forced-colors: active){.f1rirnrt{background-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1uu00uk{border-top-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f9a0qzu{border-left-color:HighlightText;}.fkvaka8{border-right-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ux7til{border-bottom-color:HighlightText;}}", {
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
  }], ["@media (forced-colors: active){.f1et0tmh:hover .fui-Button__icon{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1wi8ngl:hover:active .fui-Button__icon{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1tme0vf:hover{background-color:var(--colorTransparentBackground);}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f18onu3q:hover:active{background-color:var(--colorTransparentBackground);}}", {
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
    Bceei9c: "fdrzuqr",
    Bfinmwp: "f15x8b5r",
    Jwef8y: "f1falr9n",
    Bgoe8wy: "f12mpcsy",
    Bwzppfd: ["f1gwvigk", "f18rmfxp"],
    oetu4i: "f1jnshp0",
    gg5e9n: ["f18rmfxp", "f1gwvigk"],
    Bi91k9c: "fvgxktp",
    eoavqd: "fphbwmw",
    Bk3fhr4: "f19vpps7",
    Bmfj8id: "fv5swzo",
    Bbdnnc7: "f1al02dq",
    iro3zm: "f1t6o4dc",
    b661bw: "f10ztigi",
    Bk6r4ia: ["f1ft5sdu", "f1gzf82w"],
    B9zn80p: "f12zbtn2",
    Bpld233: ["f1gzf82w", "f1ft5sdu"],
    B2d53fq: "fcvwxyo",
    c3iz72: "f8w4c43",
    em6i61: "f1ol4fw6",
    vm6p8p: "f1q1lw4e",
    x3br3k: "f1dwjv2g"
  },
  highContrast: {
    Bsw6fvg: "f4lkoma",
    Bjwas2f: "fg455y9",
    Bn1d65q: ["f1rvyvqg", "f14g86mu"],
    Bxeuatn: "f1cwzwz",
    n51gp8: ["f14g86mu", "f1rvyvqg"],
    Bbusuzp: "f1dcs8yz",
    G867l3: "fjwq6ea",
    gdbnj: ["f1lr3nhc", "f1mbxvi6"],
    mxns5l: "fn5gmvv",
    o3nasb: ["f1mbxvi6", "f1lr3nhc"],
    Bqrx1nm: "f1vmkb5g",
    pgvf35: "f53ppgq",
    Bh7lczh: ["f1663y11", "f80fkiy"],
    dpv3f4: "f18v5270",
    Bpnjhaq: ["f80fkiy", "f1663y11"],
    ze5xyy: "f1kc2mi9",
    g2kj27: "f1y0svfh",
    Bf756sw: "fihuait",
    Bow2dr7: ["fnxhupq", "fyd6l6x"],
    Bvhedfk: "fx507ft",
    Gye4lf: ["fyd6l6x", "fnxhupq"],
    pc6evw: "fb3rf2x"
  },
  outline: {
    De3pzq: "f1c21dwh",
    Jwef8y: "f9ql6rf",
    iro3zm: "f3h1zc4"
  },
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
    Jwef8y: "f9ql6rf",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    iro3zm: "f3h1zc4",
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
    Jwef8y: "f9ql6rf",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    iro3zm: "f3h1zc4",
    b661bw: "f1h0usnq",
    Bk6r4ia: ["fs4ktlq", "fx2bmrt"],
    B9zn80p: "f16h9ulv",
    Bpld233: ["fx2bmrt", "fs4ktlq"]
  }
}, {
  d: [".f1bg9a2p{background-color:var(--colorNeutralBackgroundDisabled);}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}", ".f15x8b5r .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}"],
  h: [".f1falr9n:hover{background-color:var(--colorNeutralBackgroundDisabled);}", ".f12mpcsy:hover{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1gwvigk:hover{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f18rmfxp:hover{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1jnshp0:hover{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fvgxktp:hover{color:var(--colorNeutralForegroundDisabled);}", ".fphbwmw:hover{cursor:not-allowed;}", ".f19vpps7:hover .fui-Icon-filled{display:none;}", ".fv5swzo:hover .fui-Icon-regular{display:inline;}", ".f1al02dq:hover .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f1t6o4dc:hover:active{background-color:var(--colorNeutralBackgroundDisabled);}", ".f10ztigi:hover:active{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1ft5sdu:hover:active{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f1gzf82w:hover:active{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f12zbtn2:hover:active{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fcvwxyo:hover:active{color:var(--colorNeutralForegroundDisabled);}", ".f8w4c43:hover:active{cursor:not-allowed;}", ".f1ol4fw6:hover:active .fui-Icon-filled{display:none;}", ".f1q1lw4e:hover:active .fui-Icon-regular{display:inline;}", ".f1dwjv2g:hover:active .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f9ql6rf:hover{background-color:var(--colorTransparentBackground);}", ".f3h1zc4:hover:active{background-color:var(--colorTransparentBackground);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".f1h0usnq:hover:active{border-top-color:transparent;}", ".fs4ktlq:hover:active{border-right-color:transparent;}", ".fx2bmrt:hover:active{border-left-color:transparent;}", ".f16h9ulv:hover:active{border-bottom-color:transparent;}"],
  m: [["@media (forced-colors: active){.f4lkoma{background-color:ButtonFace;}}", {
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
  }], ["@media (forced-colors: active){.f1vmkb5g:hover{background-color:ButtonFace;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f53ppgq:hover{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1663y11:hover{border-right-color:GrayText;}.f80fkiy:hover{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f18v5270:hover{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1kc2mi9:hover{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1y0svfh:hover:active{background-color:ButtonFace;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fihuait:hover:active{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fnxhupq:hover:active{border-right-color:GrayText;}.fyd6l6x:hover:active{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fx507ft:hover:active{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fb3rf2x:hover:active{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useRootFocusStyles = /* @__PURE__ */ __styles({
  circular: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "f1062rbf"
  },
  rounded: {},
  square: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "fj0ryk1"
  },
  primary: {
    B8q5s1w: "f17t0x8g",
    Bci5o5g: ["f194v5ow", "fk7jm04"],
    n8qw10: "f1qgg65p",
    Bdrgwmp: ["fk7jm04", "f194v5ow"],
    j6ew2k: ["fhgccpy", "fjo7pq6"],
    he4mth: "f32wu9k",
    Byr4aka: "fu5nqqq",
    lks7q5: ["f13prjl2", "f1nl83rv"],
    Bnan3qt: "f1czftr5",
    k1dn9: ["f1nl83rv", "f13prjl2"],
    Boium3a: ["f12k37oa", "fdnykm2"],
    tm8e47: "fr96u23"
  },
  small: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "fazmxh"
  },
  medium: {},
  large: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "f1b6alqh"
  }
}, {
  d: [[".f1062rbf[data-fui-focus-visible]{border-radius:var(--borderRadiusCircular);}", {
    p: -1
  }], [".fj0ryk1[data-fui-focus-visible]{border-radius:var(--borderRadiusNone);}", {
    p: -1
  }], ".f17t0x8g[data-fui-focus-visible]{border-top-color:var(--colorStrokeFocus2);}", ".f194v5ow[data-fui-focus-visible]{border-right-color:var(--colorStrokeFocus2);}", ".fk7jm04[data-fui-focus-visible]{border-left-color:var(--colorStrokeFocus2);}", ".f1qgg65p[data-fui-focus-visible]{border-bottom-color:var(--colorStrokeFocus2);}", ".fhgccpy[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}", ".fjo7pq6[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}", ".f32wu9k[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;}", ".fu5nqqq[data-fui-focus-visible]:hover{border-top-color:var(--colorStrokeFocus2);}", ".f13prjl2[data-fui-focus-visible]:hover{border-right-color:var(--colorStrokeFocus2);}", ".f1nl83rv[data-fui-focus-visible]:hover{border-left-color:var(--colorStrokeFocus2);}", ".f1czftr5[data-fui-focus-visible]:hover{border-bottom-color:var(--colorStrokeFocus2);}", [".fazmxh[data-fui-focus-visible]{border-radius:var(--borderRadiusSmall);}", {
    p: -1
  }], [".f1b6alqh[data-fui-focus-visible]{border-radius:var(--borderRadiusLarge);}", {
    p: -1
  }]],
  t: ["@supports (-moz-appearance:button){.f12k37oa[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}.fdnykm2[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}}", "@supports (-moz-appearance:button){.fr96u23[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]
});
const useRootIconOnlyStyles = /* @__PURE__ */ __styles({
  small: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "fu97m5z",
    Bf4jedk: "f17fgpbq",
    B2u0y6b: "f1jt17bm"
  },
  medium: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f18ktai2",
    Bf4jedk: "fwbmr0d",
    B2u0y6b: "f44c6la"
  },
  large: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1hbd1aw",
    Bf4jedk: "f12clzc2",
    B2u0y6b: "fjy1crr"
  }
}, {
  d: [[".fu97m5z{padding:1px;}", {
    p: -1
  }], ".f17fgpbq{min-width:24px;}", ".f1jt17bm{max-width:24px;}", [".f18ktai2{padding:5px;}", {
    p: -1
  }], ".fwbmr0d{min-width:32px;}", ".f44c6la{max-width:32px;}", [".f1hbd1aw{padding:7px;}", {
    p: -1
  }], ".f12clzc2{min-width:40px;}", ".fjy1crr{max-width:40px;}"]
});
const useIconStyles = /* @__PURE__ */ __styles({
  small: {
    Be2twd7: "fe5j1ua",
    Bqenvij: "fjamq6b",
    a9b677: "f64fuq3",
    Bqrlyyl: "fbaiahx"
  },
  medium: {},
  large: {
    Be2twd7: "f1rt2boy",
    Bqenvij: "frvgh55",
    a9b677: "fq4mcun",
    Bqrlyyl: "f1exjqw5"
  },
  before: {
    t21cq0: ["f1nizpg2", "f1a695kz"]
  },
  after: {
    Frg6f3: ["f1a695kz", "f1nizpg2"]
  }
}, {
  d: [".fe5j1ua{font-size:20px;}", ".fjamq6b{height:20px;}", ".f64fuq3{width:20px;}", ".fbaiahx{--fui-Button__icon--spacing:var(--spacingHorizontalXS);}", ".f1rt2boy{font-size:24px;}", ".frvgh55{height:24px;}", ".fq4mcun{width:24px;}", ".f1exjqw5{--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}", ".f1nizpg2{margin-right:var(--fui-Button__icon--spacing);}", ".f1a695kz{margin-left:var(--fui-Button__icon--spacing);}"]
});
const useButtonStyles_unstable = (state) => {
  "use no memo";
  const rootBaseClassName = useRootBaseClassName();
  const iconBaseClassName = useIconBaseClassName();
  const rootStyles = useRootStyles$2();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();
  const {
    appearance,
    disabled,
    disabledFocusable,
    icon,
    iconOnly,
    iconPosition,
    shape,
    size
  } = state;
  state.root.className = mergeClasses(
    buttonClassNames.root,
    rootBaseClassName,
    appearance && rootStyles[appearance],
    rootStyles[size],
    icon && size === "small" && rootStyles.smallWithIcon,
    icon && size === "large" && rootStyles.largeWithIcon,
    rootStyles[shape],
    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],
    // Focus styles
    appearance === "primary" && rootFocusStyles.primary,
    rootFocusStyles[size],
    rootFocusStyles[shape],
    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],
    // User provided class name
    state.root.className
  );
  if (state.icon) {
    state.icon.className = mergeClasses(buttonClassNames.icon, iconBaseClassName, !!state.root.children && iconStyles[iconPosition], iconStyles[size], state.icon.className);
  }
  return state;
};
const Button = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);
  useButtonStyles_unstable(state);
  useCustomStyleHook("useButtonStyles_unstable")(state);
  return renderButton_unstable(state);
});
Button.displayName = "Button";
const FieldContext = reactExports.createContext(void 0);
const FieldContextProvider = FieldContext.Provider;
const useFieldContext_unstable = () => reactExports.useContext(FieldContext);
const useFieldContextValues_unstable = (state) => {
  var _state_label, _state_label1, _state_validationMessage, _state_hint;
  const { generatedControlId, orientation, required, size, validationState } = state;
  const labelFor = (_state_label = state.label) === null || _state_label === void 0 ? void 0 : _state_label.htmlFor;
  const labelId = (_state_label1 = state.label) === null || _state_label1 === void 0 ? void 0 : _state_label1.id;
  const validationMessageId = (_state_validationMessage = state.validationMessage) === null || _state_validationMessage === void 0 ? void 0 : _state_validationMessage.id;
  const hintId = (_state_hint = state.hint) === null || _state_hint === void 0 ? void 0 : _state_hint.id;
  const field = reactExports.useMemo(() => ({
    generatedControlId,
    hintId,
    labelFor,
    labelId,
    orientation,
    required,
    size,
    validationMessageId,
    validationState
  }), [
    generatedControlId,
    hintId,
    labelFor,
    labelId,
    orientation,
    required,
    size,
    validationMessageId,
    validationState
  ]);
  return {
    field
  };
};
function useFieldControlProps_unstable(props, options) {
  return getFieldControlProps(useFieldContext_unstable(), props, options);
}
function getFieldControlProps(context, props, options) {
  if (!context) {
    return props;
  }
  props = {
    ...props
  };
  const { generatedControlId, hintId, labelFor, labelId, required, validationMessageId, validationState } = context;
  if (generatedControlId) {
    var _props;
    var _id;
    (_id = (_props = props).id) !== null && _id !== void 0 ? _id : _props.id = generatedControlId;
  }
  if (labelId && (!(options === null || options === void 0 ? void 0 : options.supportsLabelFor) || labelFor !== props.id)) {
    var _props1, _arialabelledby;
    var _;
    (_ = (_props1 = props)[_arialabelledby = "aria-labelledby"]) !== null && _ !== void 0 ? _ : _props1[_arialabelledby] = labelId;
  }
  if (validationMessageId || hintId) {
    props["aria-describedby"] = [
      validationMessageId,
      hintId,
      props === null || props === void 0 ? void 0 : props["aria-describedby"]
    ].filter(Boolean).join(" ");
  }
  if (validationState === "error") {
    var _props2, _ariainvalid;
    var _1;
    (_1 = (_props2 = props)[_ariainvalid = "aria-invalid"]) !== null && _1 !== void 0 ? _1 : _props2[_ariainvalid] = true;
  }
  if (required) {
    if (options === null || options === void 0 ? void 0 : options.supportsRequired) {
      var _props3;
      var _required;
      (_required = (_props3 = props).required) !== null && _required !== void 0 ? _required : _props3.required = true;
    } else {
      var _props4, _ariarequired;
      var _2;
      (_2 = (_props4 = props)[_ariarequired = "aria-required"]) !== null && _2 !== void 0 ? _2 : _props4[_ariarequired] = true;
    }
  }
  if (options === null || options === void 0 ? void 0 : options.supportsSize) {
    var _props5;
    var _size;
    (_size = (_props5 = props).size) !== null && _size !== void 0 ? _size : _props5.size = context.size;
  }
  return props;
}
const renderField_unstable = (state, contextValues) => {
  let { children } = state;
  if (typeof children === "function") {
    children = children(getFieldControlProps(contextValues.field) || {});
  }
  return /* @__PURE__ */ jsx(FieldContextProvider, {
    value: contextValues === null || contextValues === void 0 ? void 0 : contextValues.field,
    children: /* @__PURE__ */ jsxs(state.root, {
      children: [
        state.label && /* @__PURE__ */ jsx(state.label, {}),
        children,
        state.validationMessage && /* @__PURE__ */ jsxs(state.validationMessage, {
          children: [
            state.validationMessageIcon && /* @__PURE__ */ jsx(state.validationMessageIcon, {}),
            state.validationMessage.children
          ]
        }),
        state.hint && /* @__PURE__ */ jsx(state.hint, {})
      ]
    })
  });
};
const validationMessageIcons = {
  error: /* @__PURE__ */ reactExports.createElement(ErrorCircle12Filled, null),
  warning: /* @__PURE__ */ reactExports.createElement(Warning12Filled, null),
  success: /* @__PURE__ */ reactExports.createElement(CheckmarkCircle12Filled, null),
  none: void 0
};
const useField_unstable = (props, ref) => {
  const { children, orientation = "vertical", required = false, validationState = props.validationMessage ? "error" : "none", size = "medium" } = props;
  const baseId = useId("field-");
  const generatedControlId = baseId + "__control";
  const root = always(getIntrinsicElementProps(
    "div",
    {
      ...props,
      ref
    },
    /*excludedPropNames:*/
    [
      "children"
    ]
  ), {
    elementType: "div"
  });
  const label = optional(props.label, {
    defaultProps: {
      htmlFor: generatedControlId,
      id: baseId + "__label",
      required,
      size
    },
    elementType: Label
  });
  const validationMessage = optional(props.validationMessage, {
    defaultProps: {
      id: baseId + "__validationMessage",
      role: validationState === "error" ? "alert" : void 0
    },
    elementType: "div"
  });
  const hint = optional(props.hint, {
    defaultProps: {
      id: baseId + "__hint"
    },
    elementType: "div"
  });
  const defaultIcon = validationMessageIcons[validationState];
  const validationMessageIcon = optional(props.validationMessageIcon, {
    renderByDefault: !!defaultIcon,
    defaultProps: {
      children: defaultIcon
    },
    elementType: "span"
  });
  return {
    children,
    generatedControlId,
    orientation,
    required,
    size,
    validationState,
    components: {
      root: "div",
      label: Label,
      validationMessage: "div",
      validationMessageIcon: "span",
      hint: "div"
    },
    root,
    label,
    validationMessageIcon,
    validationMessage,
    hint
  };
};
const fieldClassNames = {
  root: `fui-Field`,
  label: `fui-Field__label`,
  validationMessage: `fui-Field__validationMessage`,
  validationMessageIcon: `fui-Field__validationMessageIcon`,
  hint: `fui-Field__hint`
};
const useRootStyles$1 = /* @__PURE__ */ __styles({
  base: {
    mc9l5x: "f13qh94s"
  },
  horizontal: {
    Budl1dq: "f2wwaib",
    wkccdc: "f1645dqt"
  },
  horizontalNoLabel: {
    uwmqm3: ["f15jqgz8", "fggqkej"],
    Budl1dq: "f1c2z91y"
  }
}, {
  d: [".f13qh94s{display:grid;}", ".f2wwaib{grid-template-columns:33% 1fr;}", ".f1645dqt{grid-template-rows:auto auto auto 1fr;}", ".f15jqgz8{padding-left:33%;}", ".fggqkej{padding-right:33%;}", ".f1c2z91y{grid-template-columns:1fr;}"]
});
const useLabelStyles = /* @__PURE__ */ __styles({
  vertical: {
    z8tnut: "fclwglc",
    Byoj8tv: "fywfov9",
    jrapky: "fyacil5"
  },
  verticalLarge: {
    z8tnut: "f1sl3k7w",
    Byoj8tv: "f1brlhvm",
    jrapky: "f8l5zjj"
  },
  horizontal: {
    z8tnut: "fp2oml8",
    Byoj8tv: "f1tdddsa",
    t21cq0: ["fkujibs", "f199hnxi"],
    Ijaq50: "f16hsg94",
    nk6f5a: "f1nzqi2z"
  },
  horizontalSmall: {
    z8tnut: "f1ywm7hm",
    Byoj8tv: "f14wxoun"
  },
  horizontalLarge: {
    z8tnut: "f1hqyr95",
    Byoj8tv: "fm4hlj0"
  }
}, {
  d: [".fclwglc{padding-top:var(--spacingVerticalXXS);}", ".fywfov9{padding-bottom:var(--spacingVerticalXXS);}", ".fyacil5{margin-bottom:var(--spacingVerticalXXS);}", ".f1sl3k7w{padding-top:1px;}", ".f1brlhvm{padding-bottom:1px;}", ".f8l5zjj{margin-bottom:var(--spacingVerticalXS);}", ".fp2oml8{padding-top:var(--spacingVerticalSNudge);}", ".f1tdddsa{padding-bottom:var(--spacingVerticalSNudge);}", ".fkujibs{margin-right:var(--spacingHorizontalM);}", ".f199hnxi{margin-left:var(--spacingHorizontalM);}", ".f16hsg94{grid-row-start:1;}", ".f1nzqi2z{grid-row-end:-1;}", ".f1ywm7hm{padding-top:var(--spacingVerticalXS);}", ".f14wxoun{padding-bottom:var(--spacingVerticalXS);}", ".f1hqyr95{padding-top:9px;}", ".fm4hlj0{padding-bottom:9px;}"]
});
const useSecondaryTextBaseClassName = /* @__PURE__ */ __resetStyles("r5c4z9l", null, [".r5c4z9l{margin-top:var(--spacingVerticalXXS);color:var(--colorNeutralForeground3);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase200);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase200);}"]);
const useSecondaryTextStyles = /* @__PURE__ */ __styles({
  error: {
    sj55zd: "f1hcrxcs"
  },
  withIcon: {
    uwmqm3: ["frawy03", "fg4c52"]
  }
}, {
  d: [".f1hcrxcs{color:var(--colorPaletteRedForeground1);}", ".frawy03{padding-left:calc(12px + var(--spacingHorizontalXS));}", ".fg4c52{padding-right:calc(12px + var(--spacingHorizontalXS));}"]
});
const useValidationMessageIconBaseClassName = /* @__PURE__ */ __resetStyles("ra7h1uk", "r1rh6bd7", [".ra7h1uk{display:inline-block;font-size:12px;margin-left:calc(-12px - var(--spacingHorizontalXS));margin-right:var(--spacingHorizontalXS);line-height:0;vertical-align:-1px;}", ".r1rh6bd7{display:inline-block;font-size:12px;margin-right:calc(-12px - var(--spacingHorizontalXS));margin-left:var(--spacingHorizontalXS);line-height:0;vertical-align:-1px;}"]);
const useValidationMessageIconStyles = /* @__PURE__ */ __styles({
  error: {
    sj55zd: "f1hcrxcs"
  },
  warning: {
    sj55zd: "f1k5f75o"
  },
  success: {
    sj55zd: "ffmvakt"
  }
}, {
  d: [".f1hcrxcs{color:var(--colorPaletteRedForeground1);}", ".f1k5f75o{color:var(--colorPaletteDarkOrangeForeground1);}", ".ffmvakt{color:var(--colorPaletteGreenForeground1);}"]
});
const useFieldStyles_unstable = (state) => {
  "use no memo";
  const {
    validationState,
    size
  } = state;
  const horizontal = state.orientation === "horizontal";
  const rootStyles = useRootStyles$1();
  state.root.className = mergeClasses(fieldClassNames.root, rootStyles.base, horizontal && rootStyles.horizontal, horizontal && !state.label && rootStyles.horizontalNoLabel, state.root.className);
  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(fieldClassNames.label, horizontal && labelStyles.horizontal, horizontal && size === "small" && labelStyles.horizontalSmall, horizontal && size === "large" && labelStyles.horizontalLarge, !horizontal && labelStyles.vertical, !horizontal && size === "large" && labelStyles.verticalLarge, state.label.className);
  }
  const validationMessageIconBaseClassName = useValidationMessageIconBaseClassName();
  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(fieldClassNames.validationMessageIcon, validationMessageIconBaseClassName, validationState !== "none" && validationMessageIconStyles[validationState], state.validationMessageIcon.className);
  }
  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();
  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(fieldClassNames.validationMessage, secondaryTextBaseClassName, validationState === "error" && secondaryTextStyles.error, !!state.validationMessageIcon && secondaryTextStyles.withIcon, state.validationMessage.className);
  }
  if (state.hint) {
    state.hint.className = mergeClasses(fieldClassNames.hint, secondaryTextBaseClassName, state.hint.className);
  }
  return state;
};
const Field = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref);
  useFieldStyles_unstable(state);
  const context = useFieldContextValues_unstable(state);
  return renderField_unstable(state, context);
});
Field.displayName = "Field";
const useInput_unstable = (props, ref) => {
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true,
    supportsSize: true
  });
  const overrides = useOverrides();
  var _overrides_inputDefaultAppearance;
  const { size = "medium", appearance = (_overrides_inputDefaultAppearance = overrides.inputDefaultAppearance) !== null && _overrides_inputDefaultAppearance !== void 0 ? _overrides_inputDefaultAppearance : "outline", onChange } = props;
  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: ""
  });
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: "input",
    excludedPropNames: [
      "size",
      "onChange",
      "value",
      "defaultValue"
    ]
  });
  const state = {
    size,
    appearance,
    components: {
      root: "span",
      input: "input",
      contentBefore: "span",
      contentAfter: "span"
    },
    input: always(props.input, {
      defaultProps: {
        type: "text",
        ref,
        ...nativeProps.primary
      },
      elementType: "input"
    }),
    contentAfter: optional(props.contentAfter, {
      elementType: "span"
    }),
    contentBefore: optional(props.contentBefore, {
      elementType: "span"
    }),
    root: always(props.root, {
      defaultProps: nativeProps.root,
      elementType: "span"
    })
  };
  state.input.value = value;
  state.input.onChange = useEventCallback((ev) => {
    const newValue = ev.target.value;
    onChange === null || onChange === void 0 ? void 0 : onChange(ev, {
      value: newValue
    });
    setValue(newValue);
  });
  return state;
};
const renderInput_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.contentBefore && /* @__PURE__ */ jsx(state.contentBefore, {}),
      /* @__PURE__ */ jsx(state.input, {}),
      state.contentAfter && /* @__PURE__ */ jsx(state.contentAfter, {})
    ]
  });
};
const inputClassNames = {
  root: "fui-Input",
  input: "fui-Input__input",
  contentBefore: "fui-Input__contentBefore",
  contentAfter: "fui-Input__contentAfter"
};
const useRootClassName = /* @__PURE__ */ __resetStyles("r1oeeo9n", "r9sxh5", {
  r: [".r1oeeo9n{display:inline-flex;align-items:center;flex-wrap:nowrap;gap:var(--spacingHorizontalXXS);border-radius:var(--borderRadiusMedium);position:relative;box-sizing:border-box;vertical-align:middle;min-height:32px;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);background-color:var(--colorNeutralBackground1);border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);}", '.r1oeeo9n::after{box-sizing:border-box;content:"";position:absolute;left:-1px;bottom:-1px;right:-1px;height:max(2px, var(--borderRadiusMedium));border-bottom-left-radius:var(--borderRadiusMedium);border-bottom-right-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}', ".r1oeeo9n:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}", ".r1oeeo9n:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".r1oeeo9n:focus-within{outline:2px solid transparent;}", ".r9sxh5{display:inline-flex;align-items:center;flex-wrap:nowrap;gap:var(--spacingHorizontalXXS);border-radius:var(--borderRadiusMedium);position:relative;box-sizing:border-box;vertical-align:middle;min-height:32px;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);background-color:var(--colorNeutralBackground1);border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);}", '.r9sxh5::after{box-sizing:border-box;content:"";position:absolute;right:-1px;bottom:-1px;left:-1px;height:max(2px, var(--borderRadiusMedium));border-bottom-right-radius:var(--borderRadiusMedium);border-bottom-left-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}', ".r9sxh5:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}", ".r9sxh5:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".r9sxh5:focus-within{outline:2px solid transparent;}"],
  s: ["@media screen and (prefers-reduced-motion: reduce){.r1oeeo9n::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r1oeeo9n:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r9sxh5::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r9sxh5:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}"]
});
const useRootStyles = /* @__PURE__ */ __styles({
  small: {
    sshi5w: "f1pha7fy",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm"
  },
  medium: {},
  large: {
    sshi5w: "f1w5jphr",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "figsok6",
    Bg96gwp: "faaz57k",
    i8kkvl: 0,
    Belr9w4: 0,
    rmohyg: "f1eyhf9v"
  },
  outline: {},
  outlineInteractive: {
    Bgoe8wy: "fvcxoqz",
    Bwzppfd: ["f1ub3y4t", "f1m52nbi"],
    oetu4i: "f1l4zc64",
    gg5e9n: ["f1m52nbi", "f1ub3y4t"],
    Drbcw7: "f8vnjqi",
    udz0bu: ["fz1etlk", "f1hc16gm"],
    Be8ivqh: "f1klwx88",
    ofdepl: ["f1hc16gm", "fz1etlk"]
  },
  underline: {
    De3pzq: "f1c21dwh",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "fokr779",
    icvyot: "f1ern45e",
    vrafjx: ["f1n71otn", "f1deefiw"],
    wvpqe5: ["f1deefiw", "f1n71otn"],
    Eqx8gd: ["f1n6gb5g", "f15yvnhg"],
    B1piin3: ["f15yvnhg", "f1n6gb5g"]
  },
  underlineInteractive: {
    oetu4i: "f1l4zc64",
    Be8ivqh: "f1klwx88",
    d9w3h3: 0,
    B3778ie: 0,
    B4j8arr: 0,
    Bl18szs: 0,
    Blrzh8d: "f2ale1x"
  },
  filled: {
    g2u3we: "fghlq4f",
    h3c5rm: ["f1gn591s", "fjscplz"],
    B9xav0g: "fb073pr",
    zhjwy3: ["fjscplz", "f1gn591s"]
  },
  filledInteractive: {
    q7v0qe: "ftmjh5b",
    kmh5ft: ["f17blpuu", "fsrcdbj"],
    nagaa4: "f1tpwn32",
    B1yhkcb: ["fsrcdbj", "f17blpuu"]
  },
  invalid: {
    tvckwq: "fs4k3qj",
    gk2u95: ["fcee079", "fmyw78r"],
    hhx65j: "f1fgmyf4",
    Bxowmz0: ["fmyw78r", "fcee079"]
  },
  "filled-darker": {
    De3pzq: "f16xq7d1"
  },
  "filled-lighter": {
    De3pzq: "fxugw4r"
  },
  "filled-darker-shadow": {
    De3pzq: "f16xq7d1",
    E5pizo: "fyed02w"
  },
  "filled-lighter-shadow": {
    De3pzq: "fxugw4r",
    E5pizo: "fyed02w"
  },
  disabled: {
    Bceei9c: "fdrzuqr",
    De3pzq: "f1c21dwh",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    Bjwas2f: "fg455y9",
    Bn1d65q: ["f1rvyvqg", "f14g86mu"],
    Bxeuatn: "f1cwzwz",
    n51gp8: ["f14g86mu", "f1rvyvqg"],
    Bsft5z2: "fhr9occ",
    Bduesf4: "f99w1ws"
  },
  smallWithContentBefore: {
    uwmqm3: ["fk8j09s", "fdw0yi8"]
  },
  smallWithContentAfter: {
    z189sj: ["fdw0yi8", "fk8j09s"]
  },
  mediumWithContentBefore: {
    uwmqm3: ["f1ng84yb", "f11gcy0p"]
  },
  mediumWithContentAfter: {
    z189sj: ["f11gcy0p", "f1ng84yb"]
  },
  largeWithContentBefore: {
    uwmqm3: ["f1uw59to", "fw5db7e"]
  },
  largeWithContentAfter: {
    z189sj: ["fw5db7e", "f1uw59to"]
  }
}, {
  d: [".f1pha7fy{min-height:24px;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f1w5jphr{min-height:40px;}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", [".f1eyhf9v{gap:var(--spacingHorizontalSNudge);}", {
    p: -1
  }], ".f1c21dwh{background-color:var(--colorTransparentBackground);}", [".fokr779{border-radius:0;}", {
    p: -1
  }], ".f1ern45e{border-top-style:none;}", ".f1n71otn{border-right-style:none;}", ".f1deefiw{border-left-style:none;}", ".f1n6gb5g::after{left:0;}", ".f15yvnhg::after{right:0;}", [".f2ale1x::after{border-radius:0;}", {
    p: -1
  }], ".fghlq4f{border-top-color:var(--colorTransparentStroke);}", ".f1gn591s{border-right-color:var(--colorTransparentStroke);}", ".fjscplz{border-left-color:var(--colorTransparentStroke);}", ".fb073pr{border-bottom-color:var(--colorTransparentStroke);}", ".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}", ".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}", ".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}", ".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}", ".f16xq7d1{background-color:var(--colorNeutralBackground3);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".fyed02w{box-shadow:var(--shadow2);}", ".fdrzuqr{cursor:not-allowed;}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fhr9occ::after{content:unset;}", ".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}", ".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}", ".f1ng84yb{padding-left:var(--spacingHorizontalMNudge);}", ".f11gcy0p{padding-right:var(--spacingHorizontalMNudge);}", ".f1uw59to{padding-left:var(--spacingHorizontalM);}", ".fw5db7e{padding-right:var(--spacingHorizontalM);}"],
  h: [".fvcxoqz:hover{border-top-color:var(--colorNeutralStroke1Hover);}", ".f1ub3y4t:hover{border-right-color:var(--colorNeutralStroke1Hover);}", ".f1m52nbi:hover{border-left-color:var(--colorNeutralStroke1Hover);}", ".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}", ".ftmjh5b:hover,.ftmjh5b:focus-within{border-top-color:var(--colorTransparentStrokeInteractive);}", ".f17blpuu:hover,.f17blpuu:focus-within{border-right-color:var(--colorTransparentStrokeInteractive);}", ".fsrcdbj:hover,.fsrcdbj:focus-within{border-left-color:var(--colorTransparentStrokeInteractive);}", ".f1tpwn32:hover,.f1tpwn32:focus-within{border-bottom-color:var(--colorTransparentStrokeInteractive);}"],
  a: [".f8vnjqi:active,.f8vnjqi:focus-within{border-top-color:var(--colorNeutralStroke1Pressed);}", ".fz1etlk:active,.fz1etlk:focus-within{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f1hc16gm:active,.f1hc16gm:focus-within{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1klwx88:active,.f1klwx88:focus-within{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"],
  m: [["@media (forced-colors: active){.fg455y9{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f14g86mu{border-left-color:GrayText;}.f1rvyvqg{border-right-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1cwzwz{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]],
  w: [".f99w1ws:focus-within{outline-style:none;}"]
});
const useInputClassName = /* @__PURE__ */ __resetStyles("r12stul0", null, [".r12stul0{align-self:stretch;box-sizing:border-box;flex-grow:1;min-width:0;border-style:none;padding:0 var(--spacingHorizontalM);color:var(--colorNeutralForeground1);background-color:transparent;outline-style:none;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;}", ".r12stul0::-webkit-input-placeholder{color:var(--colorNeutralForeground4);opacity:1;}", ".r12stul0::-moz-placeholder{color:var(--colorNeutralForeground4);opacity:1;}", ".r12stul0::placeholder{color:var(--colorNeutralForeground4);opacity:1;}"]);
const useInputElementStyles = /* @__PURE__ */ __styles({
  small: {
    uwmqm3: ["f1f5gg8d", "f1vdfbxk"],
    z189sj: ["f1vdfbxk", "f1f5gg8d"]
  },
  medium: {},
  large: {
    uwmqm3: ["fnphzt9", "flt1dlf"],
    z189sj: ["flt1dlf", "fnphzt9"]
  },
  smallWithContentBefore: {
    uwmqm3: ["fgiv446", "ffczdla"]
  },
  smallWithContentAfter: {
    z189sj: ["ffczdla", "fgiv446"]
  },
  mediumWithContentBefore: {
    uwmqm3: ["fgiv446", "ffczdla"]
  },
  mediumWithContentAfter: {
    z189sj: ["ffczdla", "fgiv446"]
  },
  largeWithContentBefore: {
    uwmqm3: ["fk8j09s", "fdw0yi8"]
  },
  largeWithContentAfter: {
    z189sj: ["fdw0yi8", "fk8j09s"]
  },
  disabled: {
    sj55zd: "f1s2aq7o",
    De3pzq: "f1c21dwh",
    Bceei9c: "fdrzuqr",
    yvdlaj: "fahhnxm"
  }
}, {
  d: [".f1f5gg8d{padding-left:var(--spacingHorizontalS);}", ".f1vdfbxk{padding-right:var(--spacingHorizontalS);}", ".fnphzt9{padding-left:calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}", ".flt1dlf{padding-right:calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}", ".fgiv446{padding-left:var(--spacingHorizontalXXS);}", ".ffczdla{padding-right:var(--spacingHorizontalXXS);}", ".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}", ".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".fdrzuqr{cursor:not-allowed;}", ".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}"]
});
const useContentClassName = /* @__PURE__ */ __resetStyles("r1572tok", null, [".r1572tok{box-sizing:border-box;color:var(--colorNeutralForeground3);display:flex;}", ".r1572tok>svg{font-size:20px;}"]);
const useContentStyles = /* @__PURE__ */ __styles({
  disabled: {
    sj55zd: "f1s2aq7o"
  },
  small: {
    Duoase: "f3qv9w"
  },
  medium: {},
  large: {
    Duoase: "f16u2scb"
  }
}, {
  d: [".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f3qv9w>svg{font-size:16px;}", ".f16u2scb>svg{font-size:24px;}"]
});
const useInputStyles_unstable = (state) => {
  "use no memo";
  const {
    size,
    appearance
  } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input["aria-invalid"]}` === "true";
  const filled = appearance.startsWith("filled");
  const rootStyles = useRootStyles();
  const inputStyles = useInputElementStyles();
  const contentStyles = useContentStyles();
  state.root.className = mergeClasses(inputClassNames.root, useRootClassName(), rootStyles[size], state.contentBefore && rootStyles[`${size}WithContentBefore`], state.contentAfter && rootStyles[`${size}WithContentAfter`], rootStyles[appearance], !disabled && appearance === "outline" && rootStyles.outlineInteractive, !disabled && appearance === "underline" && rootStyles.underlineInteractive, !disabled && filled && rootStyles.filledInteractive, filled && rootStyles.filled, !disabled && invalid && rootStyles.invalid, disabled && rootStyles.disabled, state.root.className);
  state.input.className = mergeClasses(inputClassNames.input, useInputClassName(), inputStyles[size], state.contentBefore && inputStyles[`${size}WithContentBefore`], state.contentAfter && inputStyles[`${size}WithContentAfter`], disabled && inputStyles.disabled, state.input.className);
  const contentClasses = [useContentClassName(), disabled && contentStyles.disabled, contentStyles[size]];
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(inputClassNames.contentBefore, ...contentClasses, state.contentBefore.className);
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(inputClassNames.contentAfter, ...contentClasses, state.contentAfter.className);
  }
  return state;
};
const Input = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useInput_unstable(props, ref);
  useInputStyles_unstable(state);
  useCustomStyleHook("useInputStyles_unstable")(state);
  return renderInput_unstable(state);
});
Input.displayName = "Input";
export {
  isAtRuleElement as A,
  Button as B,
  hyphenateProperty as C,
  normalizePseudoSelector as D,
  useARIAButtonProps as E,
  Field as F,
  Escape as G,
  Enter as H,
  Input as I,
  compileAtomicCSSRule as a,
  compileKeyframeRule as b,
  convertProperty as c,
  convert as d,
  compileKeyframesCSS as e,
  isNestedSelector as f,
  isMediaQuerySelector as g,
  isLayerSelector as h,
  isObject as i,
  isSupportQuerySelector as j,
  isContainerQuerySelector as k,
  createFluentIcon as l,
  useEventCallback as m,
  normalizeNestedProperty as n,
  mergeCallbacks as o,
  useButton_unstable as p,
  useButtonStyles_unstable as q,
  renderButton_unstable as r,
  serialize as s,
  tokens as t,
  useControllableState as u,
  compile as v,
  middleware as w,
  globalPlugin as x,
  prefixerPlugin as y,
  stringify as z
};
//# sourceMappingURL=Input-CYceLVOy.js.map
