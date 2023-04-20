import {FunctionComponent, useMemo} from 'react';
import styled from 'styled-components';
import { calcRem } from './methods';
import type {maxValues, range} from '../types'

interface RotatingProgressBarProps {
    percentFilled: number;
    maxValues: maxValues;
    range?: range;
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
    range: range;
    maxValues: { maxHeight: number, maxWidth: number };
}

const ProgressBarCover: FunctionComponent<IProgressBarCoverProps> = ({percentFilled, maxValues, range}) => {
    const rangePercentFilled = useMemo<number>(()=>{
        if(typeof range)
    },[])
  
    return (
    <RotatingProgressBar
    range={range}
    percentFilled={percentFilled}
    maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
  />
  );
};

export default ProgressBarCover;
