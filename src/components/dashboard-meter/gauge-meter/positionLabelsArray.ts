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

    const rangeNumbers = [range[0], range[1]]


    return []
}