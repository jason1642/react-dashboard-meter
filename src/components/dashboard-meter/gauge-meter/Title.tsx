import * as React from 'react';
import styled from 'styled-components';
import { TitleOptionProps, range } from '../types';


interface ITitleProps {
    titleOptions: TitleOptionProps;
    value: number;
    range: range;
}


export const defaultTitleOptions = {
    // styles: undefined,
    fontSize: '2rem',
    color: 'black',
    appenededText: undefined,
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
            reactNode,
            appendedText,
            verticalPosition
        },
        value,
        range
    }) => {

        if (typeof range === 'number') range = [0, range]


    return reactNode ? reactNode : (
        <Container style={{...styles}}>
            {value}{appendedText ? appendedText : range[0] === 0 && range[1] === 100 ? '%' : '' }
        </Container>
    );
};

export default Title;
