import type { range, value } from "../types"




export const calculatePercentFilled: (value: value, range: range)=> number | undefined = (value: value, range: range)=>{

    switch(typeof range){
// If a range is not provided, and the value can be used in a 0 - 100% situation.
        case 'undefined': 
            if(value >= 0 && value <= 100) {
                return value}
            else{
                console.error('Please provide a valid value between 0 - 100 if a range is not provided.')
                return undefined
            }


// If the range prop is a single number, the assumed min value will be, and the range number will be the max
        case 'number':
            if(value < 0 || value > range) {
                console.error('Value is less than 0 or greater than provided range.', {value: value, range: range})
                return undefined
            }
          // ex 67 - (value / 67) * 100
            return (value / range) * 100 
        
// If the range prop is a tuple, make sure the first number is smaller than the second. And the value falls in between the ranges
//Return a percentage calculation, or undefined if it breaks the rules 
        case 'object':
            if (range[0] > range[1] || range[0] === range[1]) {
                console.error('First number in array must be smaller than the second number', {value, range})
                return undefined
              } else if(value > range[1]){
                console.error('The value is greater than the max number provided in range.', {value, range})
                return undefined
              }
              // Initial difference = maxNumber - minNumber
                // Check if first item is less than second item
                // value / (value - minNumber) * 100 = new filled percent
                 return ((value - range[0]) / (range[1] - range[0])) * 100
        
    }

}