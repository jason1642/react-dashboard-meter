import type { range } from "../types"
import styled from 'styled-components';
interface IPositionLabelArrayProps{
    range: range;
    containerHeight: number;
    containerWidth: number;
    fontSize: string;
    fixedLabels?: Array<string>;
    numberOfLabels?: number;
    labelValueToFixed?: 0|1|2|3;

  }

  const Label = styled.span<{top:number | string, left:number | string, fontSize: string}>`
    display:flex;
    position: absolute;
    top: ${({top, left, fontSize})=>`calc(${top} - ${fontSize})`};
    top: ${({top, left, fontSize})=>`calc(${top} - ${fontSize})`};
  `;

export const positionLabelsArray: (options: IPositionLabelArrayProps) => React.ReactNode = (
    {
        range,
         containerHeight, 
         containerWidth,
         fixedLabels,
          fontSize = '.8rem',
          labelValueToFixed,
          numberOfLabels = 0
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
        let labelIncrementalValues: Array<React.ReactNode> = []        
    // CURRENT SCENARIO - No fixed labels provided, range is default (0 - 100), numberOfLabels is default (5)
        const intervalAmount:number = range[1] / (numberOfLabels - 1) 
        for(let i = 1; i < numberOfLabels - 1; i++){
            labelIncrementalValues.push(<Label top={100} fontSize={fontSize} left={0}>{Number((intervalAmount * i).toFixed(labelValueToFixed))}%</Label>)
        }


        labelIncrementalValues.unshift(<Label top={'100%'} fontSize={fontSize} left={'0%'}>{range[0]}%</Label>)
        labelIncrementalValues.push(<Label top={'100%'} fontSize={fontSize} left={'100%'}>{range[1]}%</Label>)



    return labelIncrementalValues
}