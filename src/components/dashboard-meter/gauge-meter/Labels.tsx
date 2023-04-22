import * as React from 'react';
import styled from 'styled-components';
import type {LabelComponentProps, range} from '../types'
import { positionLabelsArray } from './positionLabelsArray';
interface ILabelComponentProps extends LabelComponentProps {
}



const Labels: React.FunctionComponent<ILabelComponentProps> = ({
  labelOptions,
   range,
   containerWidth,
   containerHeight,
   progressFillerWidth
}) => {
  const renderLabels = React.useMemo(()=>
    positionLabelsArray(
      {
        range,
        appendedText: '%',
        progressFillerWidth,
        labelValueToFixed: 0,
        labelOptions
          //  numberOfLabels
          }),
    [])
  // If range is undefined, default range will be 0 - 100
  // If range is a single number, range wil be 0 - x
  // If range is a tuple, range will be min and max values
  // Make sure to create even splits to have symmetrical label positions
  console.log(containerHeight, containerWidth)
  console.log()


  return (
    <>
    {
        renderLabels
    }
    </>
  );
};

export default Labels;
