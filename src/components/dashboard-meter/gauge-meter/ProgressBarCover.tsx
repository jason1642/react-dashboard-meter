import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { calcRem } from './methods';
import type { maxValues, range } from '../types'

interface RotatingProgressBarProps {
    percentFilled: number;
    maxValues: maxValues;
    background: string;
}

// Entire progress bar underneath actual filler
const RotatingProgressBar = styled.div<RotatingProgressBarProps>`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0%;
    /* z-index: 0; */
    overflow-y: clip;
    width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth + (maxWidth / 100))};
    height:${({ maxValues: { maxWidth } }) => calcRem((maxWidth / 2) + (maxWidth / 100))};
    /* 200w & 100h - Set proportional margins */
    
    /* margin: -0px 0 0 -1px; */
    background: ${({background})=>background};
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }  


  position: absolute;
  top: 0;
  left: 0;
  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight, maxWidth } }) => calcRem(maxWidth)};
  background: transparent;
  overflow-y: clip;
/* 0% - 100% based on 0deg - 180deg */
  transform: ${({ percentFilled }) => `rotate(${(percentFilled / 100) * 180}deg)`};
  transform-origin: center center;
  /* backface-visibility: hidden; */
  /* transition: all .8s ease-in-out; */

    
`;

interface IProgressBarCoverProps {
    percentFilled: number;
    progressBarContainerColor: string;
    maxValues: { maxHeight: number, maxWidth: number };
}

const ProgressBarCover: FunctionComponent<IProgressBarCoverProps> = ({ progressBarContainerColor, percentFilled, maxValues, }) => {

    const [fillPercent, setFillPercent] = useState<number>(percentFilled)
    useEffect(() => {
      setFillPercent(percentFilled)
      // console.log('settign filled percent')
    }, [percentFilled]);
    return percentFilled ? (
        <RotatingProgressBar
          style={{marginTop: percentFilled === 100 ? '100%' : '-1.5px'}}
          background={progressBarContainerColor}
            percentFilled={fillPercent}
            maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
        />
    ) :<></>
};

export default ProgressBarCover;
