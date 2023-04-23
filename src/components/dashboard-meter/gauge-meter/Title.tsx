import * as React from 'react';
import styled from 'styled-components';
import { TitleOptionProps } from '../types';


interface ITitleProps {
    titleOptions: TitleOptionProps;
}


export const defaultTitleOptions = {
    // styles: undefined,
    fontSize: '2rem',
    color: 'black',
    reactNode: undefined,
    marginBottom: undefined,
    verticalPosition: 'bottom'
}

const Container = styled.div`
  display:flex;
  position: absolute;
  display: block;
  z-index: 10;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  text-align: center;
`;

const Title: React.FunctionComponent<ITitleProps> = (
    {
        titleOptions: {
            styles,
            fontSize,
            color,
            reactNode,
            marginBottom,
            verticalPosition
        }
    }) => {
  return (
    <Container>
        80%
    </Container>
  );
};

export default Title;
