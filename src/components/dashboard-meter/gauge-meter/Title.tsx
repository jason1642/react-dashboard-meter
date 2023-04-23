import * as React from 'react';
import styled from 'styled-components';
import { TitleOptionProps, range, verticalPosition } from '../types';


interface ITitleProps {
    titleOptions: TitleOptionProps;
    value: number;
    range: range;
    containerWidth: number;
}


export const defaultTitleOptions = {
    // styles: undefined,
    styles: {
        color: 'black',
        marginBottom: undefined,
    },
    appenededText: undefined,
    reactNode: undefined,
    verticalPosition: 'top'
}

interface SCContainerProps {
    verticalPosition: verticalPosition;
    fontSize: string;
}
const Container = styled.div<SCContainerProps>`
  display:flex;
  font-weight: 300;
  font-size: ${({fontSize})=>fontSize};
  position: absolute;
  top: ${({verticalPosition, fontSize})=>`calc(${verticalPosition === 'center' ? '50%' : verticalPosition === 'bottom' ? `100% - ${fontSize}` : `${fontSize}`})`};
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
        range,
        containerWidth
    }) => {
        
    const fontCalc = (fontSize?: string): string => `calc(${containerWidth / 12}px )`;
        console.log(fontCalc())
        if (typeof range === 'number') range = [0, range]


    return reactNode ? reactNode : (
        <Container 
            fontSize={fontCalc()}
            verticalPosition={verticalPosition}
            style={{fontSize: fontCalc(),...styles}}>
            {value}{appendedText ? appendedText : range[0] === 0 && range[1] === 100 ? '%' : '' }
        </Container>
    );
};

export default Title;
