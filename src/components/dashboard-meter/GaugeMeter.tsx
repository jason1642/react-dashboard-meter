import * as React from 'react';
import styled from 'styled-components';
import type {labels, value} from './types'
const Container = styled.div`
  display:flex;
  background-color: green;
  height: 85px;
  /* border-radius: 50%; */
  position: relative;
  overflow: hidden;

`;



const ProgressMeter = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 80px;
  background-color: lightblue;
  position: relative;
  border: 1px solid black;
  display:flex;
  /* justify-content: center;
  align-items: center; */
  overflow: hidden;
  /* z-index: 1; */


 
`;
const Filler = styled.div`
  display:flex;
  background-color:red;
  position: absolute;
  border: 10px solid blue;
  border-bottom: none;

    overflow: hidden;

  z-index: 1;
  left:0;
  top: 0;
  right:0;
  bottom: -25px;
  /* height: 80%; */
  border-radius: 50% 50% 50% 50%;

`;

const ProgressFiller = styled.div`
  display:flex;
  position: absolute;
  height: 50%;
  left: 60%;
  width: 42%;
  z-index: 5;
  background-color: #07ff8b;
  /* border-radius: inherit; */
`;





const Title = styled.div`
  display:flex;
  text-align: center;
  position: absolute;
  top: 50%;
  font-size: 1rem;
  margin: 0 auto;
  /* If title font size changes, change calc to 100% - fontsize */
  left: calc(50% - 1rem);
`;

interface IMeterProps {
  percentFilled: number;
  labels: labels;
}


const GaugeMeter: React.FunctionComponent<IMeterProps> = ({percentFilled, labels}) => {
  return (
     <Container>
     <Filler>
      <ProgressFiller/>
     </Filler>

    {/* Bar container */}
   
    {/* Meter with length proportioinal to % of range filled  */}
    <ProgressMeter style={{width: `${percentFilled}%`}}>

    </ProgressMeter>
<Title>
 80%
</Title>
</Container>
  );
};

export default GaugeMeter;
