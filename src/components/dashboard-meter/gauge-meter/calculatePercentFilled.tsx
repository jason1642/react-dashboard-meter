import type { range, value } from "../types"


export const calculatePercentFilled: (value: value, range: range)=> number | undefined = (value: value, range: range)=>{

    if (range === undefined && value >= 0 && value <= 100) return value
    if(typeof range === 'number'){
      // ex 67 - (value / 67) * 100
        return (value / range) * 100 
        }
    else if(typeof range === 'object'){
      if (range[0] > range[1]) {
        console.error('First number in array must be smaller than the second number')
      }
      // Initial difference = maxNumber - minNumber
        // Check if first item is less than second item
        // value / (value - minNumber) * 100 = new filled percent

         return range[0] > range[1] ? 
         undefined
         :
         ((value - range[0]) / (range[1] - range[0])) * 100

    }

}