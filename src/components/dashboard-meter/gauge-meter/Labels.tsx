import * as React from 'react';
import styled from 'styled-components';
import type {LabelProps} from '../types'

interface ILabelsProps extends LabelProps {
}
const labelsArray = [
  // '0%',
  //  '50%', 
   '100%'
  ]


const Label = styled.span`
  display:flex;
  /* border: 1px solid red; */
  position: absolute;
  z-index: 242;
  background-color: #bf60fe;
  font-size: 1rem;

  /* Fontsize * 225%(2.25) */
  left: calc(0);
  /* width: 2rem; */
  top: calc(100% - 1rem);
`;




const Labels: React.FunctionComponent<ILabelsProps> = ({
  fixedLabels,
  fontSize = '1rem',
  appendedText,
   range
}) => {
  // If range is undefined, default range will be 0 - 100
  // If range is a single number, range wil be 0 - x
  // If range is a tuple, range will be min and max values
  // Make sure to create even splits to have symmetrical label positions
  return (
    <>
    {
        labelsArray.map(ele=>
            <Label
                style={{
                    // left: '0rem'
                }}
            >{ele}</Label>)
    }
    </>
  );
};

export default Labels;
