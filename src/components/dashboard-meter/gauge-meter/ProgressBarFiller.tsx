import * as React from 'react';
import styled from 'styled-components';
import type { value, progressBarColor, maxValues, range, LabelOptions, ProgressBarOptions } from '../types'
import { calcRem  } from './methods';
import Labels from './Labels';

interface ProgressMeterProps {
    maxValues: maxValues;
    gaugeInnerAreaSize: number;
    background: progressBarColor;
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
  background:${({percentFilled})=>`linear-gradient(${(percentFilled / 100) * 180}deg,transparent 50%,#a79898 0) top/100% 200%, linear-gradient(to right, green, yellow,  red)`};

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
    width:${({ maxValues: { maxWidth }, gaugeInnerAreaSize }) => calcRem(maxWidth * (gaugeInnerAreaSize / 100))};
    height:${({ maxValues: { maxWidth, maxHeight, }, gaugeInnerAreaSize }) => calcRem(maxHeight * (gaugeInnerAreaSize / 100))};
    /* Original margin-left = -70 */
    margin-left: -${({ maxValues: { maxWidth, maxHeight }, gaugeInnerAreaSize }) => calcRem(maxHeight * (gaugeInnerAreaSize / 100))};
    background: ${({innerAreaBackground})=>innerAreaBackground};
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 
`;

interface IProgressBarFillerProps {
    progressBarFillerColor?: string;
    maxValues: { maxHeight: number, maxWidth: number };
    gaugeInnerAreaSize: number;
    range: range;
    progressBarOptions?: ProgressBarOptions;
    labelOptions: LabelOptions;
    progressFillerWidth: number;
    percentFilled: number;
    innerAreaBackgroundColor: string;
}



const ProgressBarFiller: React.FunctionComponent<IProgressBarFillerProps> = (
    {
        progressBarFillerColor = '', 
        labelOptions,
        range,
        progressBarOptions,
         maxValues,
         gaugeInnerAreaSize,
         innerAreaBackgroundColor,
         progressFillerWidth,
         percentFilled
    }) => {
        const progressFillerRef: React.MutableRefObject<HTMLDivElement | null> | null = React.useRef(null)
    // const fillerTriColors =        
  return (
    <ProgressMeter
    ref={progressFillerRef}
    innerAreaBackground={innerAreaBackgroundColor}
    background={progressBarFillerColor}
    maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
    gaugeInnerAreaSize={gaugeInnerAreaSize}
    percentFilled={percentFilled}
    progressBarOptions={progressBarOptions}
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
  </ProgressMeter>    
  );
};

export default ProgressBarFiller;
