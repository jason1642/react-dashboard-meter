import * as React from 'react';
import styled from 'styled-components';
import type {LabelProps, range} from '../types'
import { positionLabelsArray } from './positionLabelsArray';
interface ILabelsProps extends LabelProps {
}
const labelsArray = [
  // '0%',
  //  '50%', 
   '10%'
  ]

const currentStaticHeight = 124

const Label = styled.span`
  display:flex;
  /* border: 1px solid red; */
  position: absolute;
  z-index: 242;
  /* background-color: #bf60fe; */
  
  font-size: .8rem;

  /* Fontsize * 225%(2.25) */
  left: calc(0);
  /* width: 2rem; */
  top: calc(100% - .8rem);
`; 




const Labels: React.FunctionComponent<ILabelsProps> = ({
  fixedLabels,
  fontSize = '1rem',
  appendedText,
   range,
   containerWidth,
   containerHeight
}) => {
  const renderLabels = React.useMemo(()=>
    positionLabelsArray({range, labelValueToFixed: 0,containerHeight, containerWidth, fontSize,fixedLabels, numberOfLabels:8}),
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
