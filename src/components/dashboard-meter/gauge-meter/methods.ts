
export const calcRem: (val:number, fontSizePx?: number) => string = (val, fontSizePx= 16) =>
  // Either calc all sizes by multplying static value, or having val be width and have responsive calculations
  `${(val) / fontSizePx}rem`


