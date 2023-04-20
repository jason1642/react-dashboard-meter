import * as React from 'react';
import styled from 'styled-components';
import { calcRem } from './methods';





interface RotatingProgressBarProps {
    percentFilled: number;
    maxValues: { maxHeight: number, maxWidth: number };
  }
// Entire progress bar underneath actual filler
const RotatingProgressBar = styled.div<RotatingProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;

  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight, maxWidth } }) => calcRem(maxWidth)};
  background: transparent;

  transform: ${({ percentFilled }) => `rotate(${(percentFilled / 100) * 180}deg) translate3d(0,0,0)`};
  transform-origin: center center;
  backface-visibility: hidden;
  transition: all .3s ease-in-out;
  /* Change percentage filled below - 180deg = 100%, 60def = 30%, ect */

  /* transform: rotate(90deg) translate3d(0,0,0); */
  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0%;
    z-index: 2;
    display: flex;
    width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth + (maxWidth / 100))};
  height:${({ maxValues: { maxWidth } }) => calcRem((maxWidth / 2) + (maxWidth / 100))};
  
    /* 200w & 100h - Set proportional margins */
    margin: -1px 0 0 -1px;

    background: #808080;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }      
`;


interface IProgressBarCoverProps {
    percentFilled: number;
    maxValues: { maxHeight: number, maxWidth: number };
}

const ProgressBarCover: React.FunctionComponent<IProgressBarCoverProps> = ({percentFilled, maxValues}) => {
  return (
    <RotatingProgressBar
    percentFilled={percentFilled}
    maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
  />
  );
};

export default ProgressBarCover;
