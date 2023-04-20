import * as React from 'react';
import styled from 'styled-components';
import type {LinearMeterProps} from '../types'
import GaugeMeter from '../gauge-meter/GaugeMeter'


const Container = styled.div`
  display:flex;
  height: 100%;
  flex-direction:column;
  align-items: center;
  justify-content: center;
`;

const LinearMeter: React.FunctionComponent<LinearMeterProps> = ({
    value, type, title, range,progressBarColor
}) => {

  return (
    <Container>
        <GaugeMeter  
        progressBarColor={progressBarColor} 
        percentFilled={55} 
        labels={['%']} 
        />

    </Container>
  );
};

export default LinearMeter;
