import type { range } from "../types"
import styled from 'styled-components';
interface IPositionLabelArrayProps {
    range: range;
    containerHeight: number;
    containerWidth: number;
    fontSize?: string;
    fixedLabels?: Array<string>;
    numberOfLabels?: number;
    labelValueToFixed?: 0 | 1 | 2 | 3;

}

const Label = styled.span<{ top: number | string, left: number | string, fontSize: string }>`
    display:flex;
    justify-content: center;
    align-items: center;
    /* background-color: blue; */
    text-align: center;
    position: absolute;
    font-size: ${({ fontSize }) => fontSize};
    /* font-size: calc(1rem + 1vw); */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    z-index: 33;
    left: ${({ left }) => left};
    top: ${({ top }) => top};
  `;

export const positionLabelsArray: (options: IPositionLabelArrayProps) => React.ReactNode = (
    {
        range,
        containerHeight,
        containerWidth,
        fixedLabels,
        fontSize = '.9rem',
        labelValueToFixed,
        numberOfLabels = 0
    }) => {
    console.log(containerHeight, containerWidth)
    const fontCalc = (fontSize: string) => `calc(calc(${fontSize} / 2) + 2vw)`
    // Check range to see if its an appropriate amount of numbers for the default number of labels
    // Create an array of numbers (from the range) to be represented in each label.
    if (typeof range === 'number') range = [0, range]
    // 3 labels = 0% 50% 100% 
    // 5 labels = 0% 25% 50% 75% 100%
    // 6 labels = 0% 20% 40% 60% 80% 100%
    // In other words - Omit the 0% in each case, and divide 100 by the amount of values in the array.
    // 6 labels ^ - 100 / 5 = 20% increments
    // 9 labels = 100 / 8 = 11.11% increments (round it)
    // Default amount of labels is 5
    let labelIncrementalValues: Array<React.ReactNode> = []
    // CURRENT SCENARIO - No fixed labels provided, range is default (0 - 100), numberOfLabels is default (5)
    const intervalAmount: number = range[1] / (numberOfLabels - 1)
    for (let i = 1; i < numberOfLabels - 1; i++) {
        labelIncrementalValues.push(<Label fontSize={fontSize} top={100} left={0}>{Number((intervalAmount * i).toFixed(labelValueToFixed))}%</Label>)
    }

    // 0% or first label
    labelIncrementalValues.unshift(<Label
        fontSize={fontCalc(fontSize)} 
        top={`calc(100% - (${fontCalc(fontSize)} * 1.25))`}
        left={`calc((${fontCalc(fontSize)} / 4) + (${containerWidth / 100}px))`}
    >{range[0]}%</Label>)


    // 100% or last label
    labelIncrementalValues.push(<Label
        fontSize={fontCalc(fontSize)}
        top={`calc(100% - (${fontCalc(fontSize)} * 1.25))`}
        left={`calc(100% - (${fontCalc(fontSize)} * 2.5) )`}
    >{range[1]}%</Label>)



    return labelIncrementalValues
}