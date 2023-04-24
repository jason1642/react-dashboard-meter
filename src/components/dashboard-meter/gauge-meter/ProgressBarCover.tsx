import { FunctionComponent } from 'react';
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
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight, maxWidth } }) => calcRem(maxWidth)};
  background: transparent;
/* 0% - 100% based on 0deg - 180deg */
  transform: ${({ percentFilled }) => `rotate(${(percentFilled / 100) * 180}deg) translate3d(0,0,0)`};
  transform-origin: center center;
  backface-visibility: hidden;
  transition: all .3s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0%;
    /* z-index: 0; */
    display: flex;
    width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth + (maxWidth / 100))};
  height:${({ maxValues: { maxWidth } }) => calcRem((maxWidth / 2) + (maxWidth / 100))};
    /* 200w & 100h - Set proportional margins */
    
    /* margin: -1px 0 0 -1px; */
    background: ${({background})=>background};
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }      
`;

interface IProgressBarCoverProps {
    percentFilled: number;
    progressBarContainerColor: string;
    maxValues: { maxHeight: number, maxWidth: number };
}

const ProgressBarCover: FunctionComponent<IProgressBarCoverProps> = ({ progressBarContainerColor, percentFilled, maxValues, }) => {


    return (
        <RotatingProgressBar
          style={{marginTop: percentFilled === 100 ? '100%' : '-0px'}}
          background={progressBarContainerColor}
            percentFilled={percentFilled}
            maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
        />
    );
};

export default ProgressBarCover;
