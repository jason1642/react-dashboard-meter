import * as React from 'react';
import styled from 'styled-components';
import type { labels, value, progressBarColor, titleFontSize, maxValues } from '../types'
import Container from './Container'
import ProgressBarFiller from './ProgressBarFiller';
import ProgressBarCover from './ProgressBarCover';




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

        <ProgressBarCover
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
