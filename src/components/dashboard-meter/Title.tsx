import * as React from 'react';
import styled from 'styled-components';
import type { title } from './types';

interface ITitleProps {
    title: title;
}

const Container = styled.div`
  display:flex;
`;

const Title: React.FunctionComponent<ITitleProps> = ({title}) => {

    
  return (
    <Container>

    </Container>
  );
};

export default Title;
