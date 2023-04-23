import * as React from 'react';
import styled from 'styled-components';
import type { value, progressBarColor, titleFontSize, maxValues, range, LabelOptions } from '../types'
import { calcRem } from './methods';
import Labels from './Labels';

interface StaticProgressMeterProps {
    maxValues: maxValues;
    guageInnerAreaSize: number;
    background: progressBarColor;
    innerAreaBackground:string;
  }

// Filler for curved progress bar
const StaticProgressMeter = styled.div<StaticProgressMeterProps>`
  display:block;
  position: relative;
  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight } }) => calcRem(maxHeight)};
  background: ${({background})=>background};
  /* background: linear-gradient(to right, #f7351f 0%, #f3ff18 50%, #12f912 100%); */
  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  overflow: visible;
  /* Inner area */
  &::before {
    content: '';
    text-align: center;
    position: absolute;
    
    bottom: 0;
    left: 50%;
    z-index: 3;
    display: flex;
    /* Values with * .x - Percent of entire semi-circle gauge covered by inner space */
    width:${({ maxValues: { maxWidth }, guageInnerAreaSize }) => calcRem(maxWidth * (guageInnerAreaSize / 100))};
    height:${({ maxValues: { maxWidth, maxHeight, }, guageInnerAreaSize }) => calcRem(maxHeight * (guageInnerAreaSize / 100))};
    /* Original margin-left = -70 */
    margin-left: -${({ maxValues: { maxWidth, maxHeight }, guageInnerAreaSize }) => calcRem(maxHeight * (guageInnerAreaSize / 100))};
    background: ${({innerAreaBackground})=>innerAreaBackground};
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 
`;

interface IProgressBarFillerProps {
    progressBarFillerColor: string;
    maxValues: { maxHeight: number, maxWidth: number };
    guageInnerAreaSize: number;
    range: range;
    labelOptions: LabelOptions;
    progressFillerWidth: number;
    innerAreaBackgroundColor: string;
}



const ProgressBarFiller: React.FunctionComponent<IProgressBarFillerProps> = (
    {
        progressBarFillerColor, 
        labelOptions,
        range,
         maxValues,
         guageInnerAreaSize,
         innerAreaBackgroundColor,
         progressFillerWidth
    }) => {
        const progressFillerRef: React.MutableRefObject<HTMLDivElement | null> | null = React.useRef(null)

      
  return (
    <StaticProgressMeter
    ref={progressFillerRef}
    innerAreaBackground={innerAreaBackgroundColor}
    background={progressBarFillerColor}
    maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
    guageInnerAreaSize={guageInnerAreaSize}
  >
    {
        progressFillerWidth &&
            <Labels 
            progressFillerWidth={progressFillerWidth}
            containerHeight={maxValues.maxHeight} 
            labelOptions={labelOptions}
            containerWidth={maxValues.maxWidth} 
            range={range}
            />

    }
  </StaticProgressMeter>    
  );
};

export default ProgressBarFiller;
