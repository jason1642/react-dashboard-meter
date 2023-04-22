
export const calcRem: (val:number, fontSizePx?: number) => string = (val, fontSizePx= 16) =>
  // Either calc all sizes by multplying static value, or having val be width and have responsive calculations
  `${(val) / fontSizePx}rem`


export const horizontalLabelArchPositioner = (numLabels: number, index: number, fontSize: string)=> {

  switch (numLabels){

      case 3: 
        return `calc(100% - ${index * 50}%)`
      
      case 5:
        return `calc((100% - ${(--numLabels - index)  * 25}%) - ${fontSize})`

      case 7:
        return `calc(100% - ${(numLabels - 1) * 20}%)`

      default: 
        return ''
  }
  



}