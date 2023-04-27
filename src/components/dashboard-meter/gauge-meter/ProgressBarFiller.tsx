import * as React from 'react';
import styled from 'styled-components';
import type { value, maxValues, range, LabelOptions, ProgressBarOptions } from '../types'
import { calcRem  } from './methods';
import Labels from './Labels';

interface ProgressMeterProps {
    maxValues: maxValues;
    innerAreaSize: number;
    innerAreaBackground:string;
    percentFilled: number;
    progressBarOptions?: ProgressBarOptions;
  }

// Filler for curved progress bar
const ProgressMeter = styled.div<ProgressMeterProps>`
  display:block;
  position: relative;
  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight } }) => calcRem(maxHeight)};
  background:${({percentFilled})=>`linear-gradient(${(percentFilled / 100) * 180}deg,transparent 50%,#bcbcbc 0) top/100% 200%, linear-gradient(to right, green, yellow,  red)`};

  background:${({percentFilled, progressBarOptions})=>`linear-gradient(${(percentFilled / 100) * 180}deg,transparent 50%,${progressBarOptions?.emptyAreaColor || '#a79898'} 0) top/100% 200%, linear-gradient(to right, ${typeof progressBarOptions?.fillerTriColors === 'object' ? progressBarOptions.fillerTriColors : [progressBarOptions?.fillerTriColors, progressBarOptions?.fillerTriColors]})`};
  /* a linear gradient to control the progress. Adjust the angle from 0deg to 180deg*/
     
     /* a radial gradient to show only a part of the gradient (20px here)*/
     /* radial-gradient(farthest-side at bottom,#9e9797 calc(100% - 20px),transparent 0), */
     /* the main gradient */
     


  



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
    width:${({ maxValues: { maxWidth }, innerAreaSize }) => calcRem(maxWidth * (innerAreaSize / 100))};
    height:${({ maxValues: { maxWidth, maxHeight, }, innerAreaSize }) => calcRem(maxHeight * (innerAreaSize / 100))};
    /* Original margin-left = -70 */
    margin-left: -${({ maxValues: { maxWidth, maxHeight }, innerAreaSize }) => calcRem(maxHeight * (innerAreaSize / 100))};
    background: ${({innerAreaBackground})=>innerAreaBackground};
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 
`;

interface IProgressBarFillerProps {
    maxValues: { maxHeight: number, maxWidth: number };
    innerAreaSize: number;
    range: range;
    progressBarOptions?: ProgressBarOptions;
    labelOptions: LabelOptions;
    progressFillerWidth: number;
    percentFilled: number;
    innerAreaColor: string;
}



const ProgressBarFiller: React.FunctionComponent<IProgressBarFillerProps> = (
    {
        labelOptions,
        range,
        progressBarOptions,
         maxValues,
         innerAreaSize,
         innerAreaColor,
         progressFillerWidth,
         percentFilled
    }) => {
        const progressFillerRef: React.MutableRefObject<HTMLDivElement | null> | null = React.useRef(null)
    // const fillerTriColors =        
  return (
    <ProgressMeter
    ref={progressFillerRef}
    innerAreaBackground={innerAreaColor}
    maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
    innerAreaSize={innerAreaSize}
    percentFilled={percentFilled}
    progressBarOptions={progressBarOptions}
  >
   
            <Labels 
            progressFillerWidth={progressFillerWidth}
            containerHeight={maxValues.maxHeight} 
            labelOptions={labelOptions}
            containerWidth={maxValues.maxWidth} 
            range={range}
            />

    
  </ProgressMeter>    
  );
};

export default ProgressBarFiller;
