import { B as always, C as getIntrinsicElementProps, A as jsx, d as mergeClasses, _ as __styles, c as reactExports } from "../app.js";
const useText_unstable = (props, ref) => {
  const { wrap, truncate, block, italic, underline, strikethrough, size, font, weight, align } = props;
  const state = {
    align: align !== null && align !== void 0 ? align : "start",
    block: block !== null && block !== void 0 ? block : false,
    font: font !== null && font !== void 0 ? font : "base",
    italic: italic !== null && italic !== void 0 ? italic : false,
    size: size !== null && size !== void 0 ? size : 300,
    strikethrough: strikethrough !== null && strikethrough !== void 0 ? strikethrough : false,
    truncate: truncate !== null && truncate !== void 0 ? truncate : false,
    underline: underline !== null && underline !== void 0 ? underline : false,
    weight: weight !== null && weight !== void 0 ? weight : "regular",
    wrap: wrap !== null && wrap !== void 0 ? wrap : true,
    components: {
      root: "span"
    },
    root: always(getIntrinsicElementProps("span", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLHeadingElement & HTMLPreElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "span"
    })
  };
  return state;
};
const renderText_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const textClassNames = {
  root: "fui-Text"
};
const useStyles = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bg96gwp: "f1i3iumi",
    Bhrd7zp: "figsok6",
    fsow6f: "fpgzoln",
    mc9l5x: "f1w7gpdv",
    Huce71: "f6juhto",
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1gl81tg",
    ygn44y: "f2jf649"
  },
  nowrap: {
    Huce71: "fz5stix",
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp"
  },
  truncate: {
    ygn44y: "f1cmbuwj"
  },
  block: {
    mc9l5x: "ftgm304"
  },
  italic: {
    B80ckks: "f1j4dglz"
  },
  underline: {
    w71qe1: "f13mvf36"
  },
  strikethrough: {
    w71qe1: "fv5q2k7"
  },
  strikethroughUnderline: {
    w71qe1: "f1drk4o6"
  },
  base100: {
    Be2twd7: "f13mqy1h",
    Bg96gwp: "fcpl73t"
  },
  base200: {
    Be2twd7: "fy9rknc",
    Bg96gwp: "fwrc4pm"
  },
  base400: {
    Be2twd7: "fod5ikn",
    Bg96gwp: "faaz57k"
  },
  base500: {
    Be2twd7: "f1pp30po",
    Bg96gwp: "f106mvju"
  },
  base600: {
    Be2twd7: "f1x0m3f5",
    Bg96gwp: "fb86gi6"
  },
  hero700: {
    Be2twd7: "fojgt09",
    Bg96gwp: "fcen8rp"
  },
  hero800: {
    Be2twd7: "fccw675",
    Bg96gwp: "f1ebx5kk"
  },
  hero900: {
    Be2twd7: "f15afnhw",
    Bg96gwp: "fr3w3wp"
  },
  hero1000: {
    Be2twd7: "fpyltcb",
    Bg96gwp: "f1ivgwrt"
  },
  monospace: {
    Bahqtrf: "f1fedwem"
  },
  numeric: {
    Bahqtrf: "f1uq0ln5"
  },
  weightMedium: {
    Bhrd7zp: "fdj6btp"
  },
  weightSemibold: {
    Bhrd7zp: "fl43uef"
  },
  weightBold: {
    Bhrd7zp: "flh3ekv"
  },
  alignCenter: {
    fsow6f: "f17mccla"
  },
  alignEnd: {
    fsow6f: "f12ymhq5"
  },
  alignJustify: {
    fsow6f: "f1j59e10"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fpgzoln{text-align:start;}", ".f1w7gpdv{display:inline;}", ".f6juhto{white-space:normal;}", [".f1gl81tg{overflow:visible;}", {
    p: -1
  }], ".f2jf649{text-overflow:clip;}", ".fz5stix{white-space:nowrap;}", [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }], ".f1cmbuwj{text-overflow:ellipsis;}", ".ftgm304{display:block;}", ".f1j4dglz{font-style:italic;}", ".f13mvf36{text-decoration-line:underline;}", ".fv5q2k7{text-decoration-line:line-through;}", ".f1drk4o6{text-decoration-line:line-through underline;}", ".f13mqy1h{font-size:var(--fontSizeBase100);}", ".fcpl73t{line-height:var(--lineHeightBase100);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".f106mvju{line-height:var(--lineHeightBase500);}", ".f1x0m3f5{font-size:var(--fontSizeBase600);}", ".fb86gi6{line-height:var(--lineHeightBase600);}", ".fojgt09{font-size:var(--fontSizeHero700);}", ".fcen8rp{line-height:var(--lineHeightHero700);}", ".fccw675{font-size:var(--fontSizeHero800);}", ".f1ebx5kk{line-height:var(--lineHeightHero800);}", ".f15afnhw{font-size:var(--fontSizeHero900);}", ".fr3w3wp{line-height:var(--lineHeightHero900);}", ".fpyltcb{font-size:var(--fontSizeHero1000);}", ".f1ivgwrt{line-height:var(--lineHeightHero1000);}", ".f1fedwem{font-family:var(--fontFamilyMonospace);}", ".f1uq0ln5{font-family:var(--fontFamilyNumeric);}", ".fdj6btp{font-weight:var(--fontWeightMedium);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".flh3ekv{font-weight:var(--fontWeightBold);}", ".f17mccla{text-align:center;}", ".f12ymhq5{text-align:end;}", ".f1j59e10{text-align:justify;}"]
});
const useTextStyles_unstable = (state) => {
  "use no memo";
  const styles = useStyles();
  state.root.className = mergeClasses(textClassNames.root, styles.root, state.wrap === false && styles.nowrap, state.truncate && styles.truncate, state.block && styles.block, state.italic && styles.italic, state.underline && styles.underline, state.strikethrough && styles.strikethrough, state.underline && state.strikethrough && styles.strikethroughUnderline, state.size === 100 && styles.base100, state.size === 200 && styles.base200, state.size === 400 && styles.base400, state.size === 500 && styles.base500, state.size === 600 && styles.base600, state.size === 700 && styles.hero700, state.size === 800 && styles.hero800, state.size === 900 && styles.hero900, state.size === 1e3 && styles.hero1000, state.font === "monospace" && styles.monospace, state.font === "numeric" && styles.numeric, state.weight === "medium" && styles.weightMedium, state.weight === "semibold" && styles.weightSemibold, state.weight === "bold" && styles.weightBold, state.align === "center" && styles.alignCenter, state.align === "end" && styles.alignEnd, state.align === "justify" && styles.alignJustify, state.root.className);
  return state;
};
function createPreset(options) {
  const { useStyles: useStyles2, className, displayName } = options;
  const Wrapper = reactExports.forwardRef((props, ref) => {
    "use no memo";
    const styles = useStyles2();
    const state = useText_unstable(props, ref);
    useTextStyles_unstable(state);
    state.root.className = mergeClasses(className, state.root.className, styles.root, props.className);
    return renderText_unstable(state);
  });
  Wrapper.displayName = displayName;
  return Wrapper;
}
export {
  useTextStyles_unstable as a,
  createPreset as c,
  renderText_unstable as r,
  useText_unstable as u
};
//# sourceMappingURL=createPreset-BDkj3AUF.js.map
