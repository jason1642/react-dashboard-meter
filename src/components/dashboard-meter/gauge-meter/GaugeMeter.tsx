import * as React from 'react';
import styled from 'styled-components';
import type { labels, value, progressBarColor, titleFontSize, maxValues } from '../types'
import Container from './Container'
import { calcRem } from './methods';
import ProgressBarFiller from './ProgressBarFiller';
interface RotatingProgressBarProps {
  percentFilled: number;
  maxValues: { maxHeight: number, maxWidth: number };
}

// Entire progress bar underneath actual filler
const RotatingProgressBar = styled.div<RotatingProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;

  width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth)};
  height:${({ maxValues: { maxHeight, maxWidth } }) => calcRem(maxWidth)};
  background: transparent;

  transform: ${({ percentFilled }) => `rotate(${(percentFilled / 100) * 180}deg) translate3d(0,0,0)`};
  transform-origin: center center;
  backface-visibility: hidden;
  transition: all .3s ease-in-out;
  /* Change percentage filled below - 180deg = 100%, 60def = 30%, ect */

  /* transform: rotate(90deg) translate3d(0,0,0); */
  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0%;
    z-index: 2;
    display: flex;
    width: ${({ maxValues: { maxWidth } }) => calcRem(maxWidth + (maxWidth / 100))};
  height:${({ maxValues: { maxWidth } }) => calcRem((maxWidth / 2) + (maxWidth / 100))};
  
    /* 200w & 100h - Set proportional margins */
    margin: -1px 0 0 -1px;

    background: #808080;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }      
`;


const Title = styled.div<{titleFontSize: string}>`
  position: absolute;
  font-size: ${({titleFontSize})=> titleFontSize};
  /* background-color: blue; */
  /* left: ${({titleFontSize})=> `calc(50% - ${titleFontSize})`}; */

  /* If text is needed at bottom */
  top: ${({titleFontSize})=> `calc(100% - ${titleFontSize})`};
  display: block;
  /* justify-self: center; */
  z-index: 10;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  text-align: center;

`;

interface IMeterProps {
  percentFilled: number;
  labels: labels;
  guageInnerAreaSize?: number;
  progressBarColor: progressBarColor;
  titleFontSize: titleFontSize;
}


const GaugeMeter: React.FunctionComponent<IMeterProps> = (
  { 
    percentFilled = 50,
     progressBarColor = '#00a2ff', 
     labels, 
     guageInnerAreaSize = 80,
     titleFontSize = '2.2rem'
  }) => {
  const [maxValues, setMaxValues] = React.useState<maxValues>()


  const handleMaxValues: (maxValues: maxValues)=> void = (maxValues: maxValues)=>{ 
    setMaxValues(maxValues)
  }



  React.useEffect(() => {
    console.log(maxValues)
  }, [maxValues]);


  return (
    <Container handleMaxValues={handleMaxValues}  >
      {maxValues && <>

        <ProgressBarFiller 
        guageInnerAreaSize={guageInnerAreaSize}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
          progressBarColor={progressBarColor}
          />

        <RotatingProgressBar
          percentFilled={percentFilled}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
        />

        <Title titleFontSize={titleFontSize}>
          80%
        </Title>

      </>
      }
    </Container>


  );
};

export default GaugeMeter;
