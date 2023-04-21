import type { range } from "../types"

interface IPositionLabelArrayProps{
    range: range;
    containerHeight: number;
    containerWidth: number;
    fontSize: string;
    fixedLabels?: Array<string>;
    numberOfLabels?: number;
  }


export const positionLabelsArray: (options: IPositionLabelArrayProps) => void = (
    {
        range,
         containerHeight, 
         containerWidth,
         fixedLabels,
          fontSize,
          numberOfLabels = 5
        })  =>{
    // Check range to see if its an appropriate amount of numbers for the default number of labels
    // Create an array of numbers (from the range) to be represented in each label.
        if(typeof range === 'number') range = [0, range]
    // 3 labels = 0% 50% 100% 
    // 5 labels = 0% 25% 50% 75% 100%
    // 6 labels = 0% 20% 40% 60% 80% 100%
    // In other words - Omit the 0% in each case, and divide 100 by the amount of values in the array.
    // 6 labels ^ - 100 / 5 = 20% increments
    // 9 labels = 100 / 8 = 11.11% increments (round it)
    // Default amount of labels is 5
        let labelIncrementalValues: Array<number> = []        
    // CURRENT SCENARIO - No fixed labels provided, range is default (0 - 100), numberOfLabels is default (5)
        
        const intervalAmount:number = range[1] / (numberOfLabels - 1) 

        for(let i = 1; i < numberOfLabels - 1; i++){
            labelIncrementalValues.push(intervalAmount * i)
        }
        labelIncrementalValues.unshift(range[0])
        labelIncrementalValues.push(range[1])



    return labelIncrementalValues.map(ele=><div>
        {ele}%
    </div>)
}