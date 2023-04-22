import {FunctionComponent, useMemo, useState, useEffect} from 'react';
import styled from 'styled-components';
import type {  maxValues, GaugeMeterProps } from '../types'
import Container from './Container'
import ProgressBarFiller from './ProgressBarFiller';
import ProgressBarCover from './ProgressBarCover';
import { calculatePercentFilled } from './calculatePercentFilled';



const Title = styled.div<{titleFontSize: string}>`
  position: absolute;
  font-size: ${({titleFontSize})=> titleFontSize};
  /* left: ${({titleFontSize})=> `calc(50% - ${titleFontSize})`}; */

  /* If text is needed at bottom */
  top: ${({titleFontSize})=> `calc(100% - ${titleFontSize})`};
  display: block;
  z-index: 10;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  text-align: center;

`;



const GaugeMeter: FunctionComponent<GaugeMeterProps> = (
  { 
    value = 25,
     progressBarColor = '#00a2ff', 
     labelOptions, 
     range = [0, 100],
     guageInnerAreaSize = 83,
     titleFontSize = '2.2rem'
  }) => {
  const [maxValues, setMaxValues] = useState<maxValues>()

  const handleMaxValues: (maxValues: maxValues)=> void = (maxValues: maxValues)=>{ 
    setMaxValues(maxValues)
  }


  const percentFilled: number | undefined = useMemo(()=>calculatePercentFilled(value, range),[range,value])


useEffect(() => {
    // console.log(maxValues)
    // console.log(percentFilled)
  }, [maxValues, percentFilled]);


  return percentFilled !== undefined ? (
    <Container handleMaxValues={handleMaxValues}  >
      {maxValues &&  percentFilled !== undefined  && <>

        <ProgressBarFiller 
        guageInnerAreaSize={guageInnerAreaSize}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
          progressBarColor={progressBarColor}
          range={range}
          />

          {/* Cover is the component that rotates */}
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


  ) : <></>
};

export default GaugeMeter;
