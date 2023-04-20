import * as React from 'react';
import styled from 'styled-components';
import type {DashboardMeterProps} from './types'
import GaugeMeter from './GaugeMeter'


const Container = styled.div`
  display:flex;
  height: 100%;
  flex-direction:column;
  align-items: center;
  justify-content: center;
`;

const DashboardMeter: React.FunctionComponent<DashboardMeterProps> = ({
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

export default DashboardMeter;
