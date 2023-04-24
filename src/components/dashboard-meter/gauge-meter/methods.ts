import type { labelPosition } from "../types"


export const calcRem: (val:number, fontSizePx?: number) => string = (val, fontSizePx= 16) =>
  // Either calc all sizes by multplying static value, or having val be width and have responsive calculations
  `${(val) / fontSizePx}rem`

  export const firstLabelHorizontalPositions = (labelPosition: labelPosition, progressFillerWidth: number ) => 
    labelPosition === 'inside' ?
    `0` :
      labelPosition === 'inward' ? 
        `calc(${progressFillerWidth}px)` : 
        `calc()`




  export const lastLabelHorizontalPositions = (labelPosition: labelPosition, progressFillerWidth: number ) => 
    labelPosition === 'inside' ?
     `calc(100% - ${progressFillerWidth}px)` :
       labelPosition === 'inward' ? 
         `calc(100% - ${progressFillerWidth * 2.2}px)` : 
          `calc()`







export const horizontalLabelArchPositioner = (labelPosition: labelPosition, numLabels: number, index: number, fontSize: string, progressFillerWidth: number) => {
  switch (labelPosition) {
    case 'inside':
      switch (numLabels) {

        case 3:
          return `calc(100% - ${index * 50}%)`

        case 5:
          return `calc((100% - ${(--numLabels - index) * 25}%) ${index === 2 ?
            // Middle Apex label
            `- ${progressFillerWidth / 2}px` : index === 1 ?
            // Between first and apex labels
              `- ${progressFillerWidth}px` :
              // After apex label
              ``})`

        case 7:
          return `calc((100% - ${(--numLabels - index) * 20}%) - ${fontSize})`

        default:
          return ''
      }

    case 'inward':
      switch (numLabels) {
        case 5:
          return  `calc((100% - ${(--numLabels - index) * 25}%) ${index === 2 ?
            `- ${progressFillerWidth / 2}px` : index === 1 ?
              `- ${progressFillerWidth / 2}px` :
              `- (${progressFillerWidth / 2}px)`})`
        default:
          return ``
      }

    default:
      return ''
  }

}


export const verticalLabelArchPositioner = (labelPosition: labelPosition, numLabels: number, index: number, fontSize: string, progressFillerWidth: number) => {
  switch (labelPosition) {

    case 'inside':
      switch (numLabels) {
        case 3:
          return `calc(${progressFillerWidth})`

        case 5:
          return index === 2 ? `calc(0% + ${progressFillerWidth * .33}px)` : `30%`

        default:
          return ''
      }

    case 'inward':
      switch (numLabels) {
        case 5:
          return index === 2 ? `calc(calc(${fontSize} / 2) + ${progressFillerWidth}px)` : `${progressFillerWidth * 2.5}px`
        default:
          return ``
      }


    default:
      return ''
  }
}