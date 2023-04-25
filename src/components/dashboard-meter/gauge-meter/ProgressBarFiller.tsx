import * as React from 'react';
import styled from 'styled-components';
import type { value, progressBarColor, titleFontSize, maxValues, range, LabelOptions } from '../types'
import { calcRem } from './methods';
import Labels from './Labels';

interface StaticProgressMeterProps {
    maxValues: maxValues;
    gaugeInnerAreaSize: number;
    background: progressBarColor;
    innerAreaBackground:string;
  }

// Filler for curved progress bar
const StaticProgressMeter = styled.div<StaticProgressMeterProps>`
  display:block;
  position: relative;
  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight } }) => calcRem(maxHeight)};
  background:  /* a linear gradient to control the progress. Adjust the angle from 0deg to 180deg*/
     linear-gradient(50deg,transparent 50%,#a79898 0) top/100% 200%,
     /* a radial gradient to show only a part of the gradient (20px here)*/
     /* radial-gradient(farthest-side at bottom,#9e9797 calc(100% - 20px),transparent 0), */
     /* the main gradient */
     linear-gradient(to right, green , yellow , red);;
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
    width:${({ maxValues: { maxWidth }, gaugeInnerAreaSize }) => calcRem(maxWidth * (gaugeInnerAreaSize / 100))};
    height:${({ maxValues: { maxWidth, maxHeight, }, gaugeInnerAreaSize }) => calcRem(maxHeight * (gaugeInnerAreaSize / 100))};
    /* Original margin-left = -70 */
    margin-left: -${({ maxValues: { maxWidth, maxHeight }, gaugeInnerAreaSize }) => calcRem(maxHeight * (gaugeInnerAreaSize / 100))};
    background: ${({innerAreaBackground})=>innerAreaBackground};
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 
`;

interface IProgressBarFillerProps {
    progressBarFillerColor: string;
    maxValues: { maxHeight: number, maxWidth: number };
    gaugeInnerAreaSize: number;
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
         gaugeInnerAreaSize,
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
    gaugeInnerAreaSize={gaugeInnerAreaSize}
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
