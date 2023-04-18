import * as React from 'react';
import styled from 'styled-components';
import type {DashboardMeterProps} from './types'



const Container = styled.div`
  display:flex;
  flex-direction:column;
`;

const DashboardMeter: React.FunctionComponent<DashboardMeterProps> = ({
    value, type, title, range
}) => {

  return (
    <Container>
        
    </Container>
  );
};

export default DashboardMeter;
