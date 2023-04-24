import type { LabelOptions, range } from "../types"
import styled from 'styled-components';
import { horizontalLabelArchPositioner, verticalLabelArchPositioner, firstLabelHorizontalPositions,  lastLabelHorizontalPositions } from "./methods";
interface IPositionLabelArrayProps {
    range: range;
    labelOptions: LabelOptions;
    progressFillerWidth: number;
    fontSize?: string;
    fixedLabels?: Array<string>;
    numberOfLabels?: number;
    labelValueToFixed?: 0 | 1 | 2 | 3;
}

const Label = styled.span<{ top: number | string, left: number | string, progressFillerWidth: number, fontSize: string }>`
    display:flex;
    justify-content: center;
    align-items: center;
    width: ${({progressFillerWidth})=>progressFillerWidth}px;
    font-weight: bold;
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


const AppendedTextSpan = styled.span<{fontCalc:string}>`
  display:flex;
  font-size: ${({fontCalc})=>`calc(${fontCalc} * .7)`};
`;
export const positionLabelsArray: (options: IPositionLabelArrayProps) => React.ReactNode = (
    {
        labelOptions: {
            fixedLabels,
            size,
            appendedText,
            labelPosition
        },
        range,
        progressFillerWidth,
      
        labelValueToFixed,
        numberOfLabels = 5
    }) => {
    // progressFillWidth is space between inner semi circle outer border and outer progress bar outer border. 
    // Responsive calc to get font size that fills in space if there are 4 or less characters based on .9rem
    // Change the decimal number that is multpliying progressFillerWidth to change scale of font but stay responsive
    const fontCalc: string = `calc(${progressFillerWidth * .45}px)`;
    console.log(fontCalc)
    // Check range to see if its an appropriate amount of numbers for the default number of labels
    // Create an array of numbers (from the range) to be represented in each label.
    if (typeof range === 'number') range = [0, range]
    const appendedTextFormula = appendedText ? 
                                    appendedText :
                                     ((typeof appendedText === 'boolean') && (appendedText === false)) ?
                                      '' :
                                       (range[0] === 0 && range[1] ===  100 ) ?
                                        '%' :
                                        ''
 

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
       console.log(range)
        labelIncrementalValues.push(
            <Label
                progressFillerWidth={progressFillerWidth}
                fontSize={fontCalc}
                top={verticalLabelArchPositioner(labelPosition!, numberOfLabels, i, fontCalc, progressFillerWidth)}
                left={horizontalLabelArchPositioner(labelPosition!, numberOfLabels, i, fontCalc, progressFillerWidth)}

            >{Number((intervalAmount * i).toFixed(labelValueToFixed))}
            <AppendedTextSpan fontCalc={fontCalc}>{appendedTextFormula}</AppendedTextSpan>
            </Label>)
    }

    // 0% or first label
    labelIncrementalValues.unshift(<Label 
        progressFillerWidth={progressFillerWidth} 
        fontSize={fontCalc} 
        top={`calc(100% - (${fontCalc} * 1.25))`}
        // left={`calc((${fontCalc} / 4) + (${containerWidth / 100}px))`}
        left={firstLabelHorizontalPositions(labelPosition!, progressFillerWidth)}
    >{range[0]}<AppendedTextSpan fontCalc={fontCalc}>{appendedTextFormula}</AppendedTextSpan></Label>)


    // 100% or last label
    labelIncrementalValues.push(<Label
        progressFillerWidth={progressFillerWidth} 
        fontSize={fontCalc}
        top={`calc(100% - (${fontCalc} * 1.25))`}
        left={lastLabelHorizontalPositions(labelPosition!, progressFillerWidth)}
    >{range[1]}
    <AppendedTextSpan fontCalc={fontCalc}>{appendedTextFormula}</AppendedTextSpan>
    </Label>)



    return labelIncrementalValues
}