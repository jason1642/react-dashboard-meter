import {FunctionComponent, useMemo, useState, useEffect} from 'react';
import styled from 'styled-components';
import type {  maxValues, GaugeMeterProps } from '../types'
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
  z-index: 10;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  text-align: center;

`;



const GaugeMeter: FunctionComponent<GaugeMeterProps> = (
  { 
    value,
    percentFilled = 50,
     progressBarColor = '#00a2ff', 
     labels, 
     range = [25, 80],
     guageInnerAreaSize = 80,
     titleFontSize = '2.2rem'
  }) => {
  const [maxValues, setMaxValues] = useState<maxValues>()
    const [percentFilledState, setPercentFilledState] = useState<number>(percentFilled)

  const handleMaxValues: (maxValues: maxValues)=> void = (maxValues: maxValues)=>{ 
    setMaxValues(maxValues)
  }


  const rangePercentFilled = useMemo<any>(()=>{

    if(typeof range === 'number'){
      // ex 67 - (value / 67) * 100
        setPercentFilledState((value / range) * 100)
        }
    else if(typeof range === 'object'){
        // Max value - min value = difference
        // Check if first item is less than second item
        // value / different * 100 = new filled percent
        
        return 
    }
},[])


useEffect(() => {
    console.log(maxValues)
    rangePercentFilled()
  }, [maxValues]);


  return (
    <Container handleMaxValues={handleMaxValues}  >
      {maxValues && <>

        <ProgressBarFiller 
        guageInnerAreaSize={guageInnerAreaSize}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
          progressBarColor={progressBarColor}
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


  );
};

export default GaugeMeter;
