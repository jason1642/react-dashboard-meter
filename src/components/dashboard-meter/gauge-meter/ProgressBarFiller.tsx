import * as React from 'react';
import styled from 'styled-components';
import type { labels, value, progressBarColor, titleFontSize, maxValues } from '../types'
import { calcRem } from './methods';


interface StaticProgressMeterProps {
    maxValues: maxValues;
    guageInnerAreaSize: number;
    progressBarColor: progressBarColor;
  }

// Filler for curved progress bar
const StaticProgressMeter = styled.div<StaticProgressMeterProps>`
  display:block;
  position: relative;
  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight } }) => calcRem(maxHeight)};
  background: linear-gradient(to right, #f7351f 0%, #f3ff18 50%, #12f912 100%);
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
    background: #ffffff;
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 
`;

interface IProgressBarFillerProps {
    progressBarColor: string;
    maxValues: { maxHeight: number, maxWidth: number };
    guageInnerAreaSize: number;
}
const Span = styled.span`
  display:flex;
  /* border: 1px solid red; */
  position: absolute;
  z-index: 242;
  /* overflow: visible; */
  font-size: 1.2rem;
  /* height: 1rem; */
  /* Fontsize * 225%(2.25) */
  left: calc(100% - 2.7rem);
  /* width: 2rem; */
  top: calc(100% - 1.2rem);
`;

const labelsArray = [
    '0%',
    //  '50%', 
     '100%'
    ]


const ProgressBarFiller: React.FunctionComponent<IProgressBarFillerProps> = ({progressBarColor, maxValues,guageInnerAreaSize}) => {
  return (
    <StaticProgressMeter
    progressBarColor={progressBarColor}
    maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
    guageInnerAreaSize={guageInnerAreaSize}
  >
    {
        labelsArray.map(ele=>
            <Span
                style={{
                    // left: '0rem'
                }}
            >{ele}</Span>)
    }
  </StaticProgressMeter>    
  );
};

export default ProgressBarFiller;
