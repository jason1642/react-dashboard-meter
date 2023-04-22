
export const calcRem: (val:number, fontSizePx?: number) => string = (val, fontSizePx= 16) =>
  // Either calc all sizes by multplying static value, or having val be width and have responsive calculations
  `${(val) / fontSizePx}rem`


export const horizontalLabelArchPositioner = (numLabels: number, index: number, fontSize: string)=> {
  console.log(numLabels / index === 2.5, numLabels, index)
  switch (numLabels){

      case 3: 
        return `calc(100% - ${index * 50}%)`
      
      case 5:
        return `calc((100% - ${(--numLabels - index)  * 25}%) ${index === 2 ?  `- ${fontSize}` : index === 1 ? `- calc(${fontSize} * 2.5)`: `+ calc(${fontSize}) * .5`})`
      case 7:
        return `calc((100% - ${(--numLabels - index)  * 20}%) - ${fontSize})`

      default: 
        return ''
  }
}


export const verticalLabelArchPositioner = (numLabels: number, index: number, containerWidth: number)=> {

  switch(numLabels){
    case 3: 
      return `calc(100% - ${index * 50}%)`

    case 5: 
      return `calc(100% - ${index * 50}%)`

  }
  
}