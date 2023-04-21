import * as React from 'react';
import styled from 'styled-components';
import type {labels} from '../types'

interface ILabelsProps {
}
const labelsArray = [
  '0%',
  //  '50%', 
   '100%'
  ]


const Label = styled.span`
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




const Labels: React.FunctionComponent<ILabelsProps> = ({}) => {
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
