import * as React from 'react';
import styled from 'styled-components';
import type {labels, value, progressBarColor} from '../types'


interface RotatingProgressBarProps {
  percentFilled: number;
  maxValues: {maxHeight: number, maxWidth: number};
}

interface StaticProgressMeterProps {
  maxValues: {maxHeight: number, maxWidth: number};
  guageInnerAreaSize: number;
  progressBarColor: progressBarColor;
}
interface GaugeProps {
  maxWidth?: number;
}

// Static values to calculate - Test with h/w from 100% of parent div using useref
// const staticHeight = 250
// const staticWidth = 500



const calcRem = (val: number, fontSizePx: number = 16)=>
  // Either calc all sizes by multplying static value, or having val be width and have responsive calculations
  `${(val) / fontSizePx}rem`



// Container for meter, labels, and title
const Gauge = styled.div<GaugeProps>`
  position: relative;
  overflow: hidden;
  display: flex;
  border: 2px solid white;
  width: 100%;
  height: ${({maxWidth})=> maxWidth! / 2}px;

  /* margin: ${calcRem(20)}; */
`;

// Filler for curved progress bar
const StaticProgressMeter = styled.div<StaticProgressMeterProps>`
  display:block;
  position: relative;
  /* width: 100%;
  height: 100%; */
  width: ${({maxValues: { maxWidth}}) =>calcRem(maxWidth)};
  height:${({maxValues: {maxHeight}}) =>calcRem(maxHeight)};
  background: linear-gradient(to right, #f7351f 0%, #f3ff18 50%, #12f912 100%);
  /* background: #00a2ff; */
  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;


  /* Inner area */
  &::before {
    content: '1231';
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 3;
    vertical-align: middle;

    display: flex;

    /* Values with * .x - Percent of entire semi-circle gauge covered by inner space */
    width:${({maxValues: {maxWidth},guageInnerAreaSize}) =>calcRem(maxWidth * (guageInnerAreaSize / 100))};
    height:${({maxValues: {maxWidth, maxHeight,},guageInnerAreaSize}) =>calcRem(maxHeight * (guageInnerAreaSize / 100))};
    /* Original margin-left = -70 */
    margin-left: -${({maxValues: {maxWidth, maxHeight},guageInnerAreaSize}) =>calcRem(maxHeight * (guageInnerAreaSize / 100))};

    background: #ffffff;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 




`;

// Entire progress bar underneath actual filler
const RotatingProgressBar = styled.div<RotatingProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;

  width: ${({maxValues: { maxWidth}}) =>calcRem(maxWidth)};
  height:${({maxValues: {maxHeight, maxWidth}}) =>calcRem(maxWidth)};
  background: transparent;

  transform: ${({percentFilled})=>`rotate(${(percentFilled / 100) * 180}deg) translate3d(0,0,0)`};
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
    width: ${({maxValues: { maxWidth}}) =>calcRem(maxWidth + (maxWidth / 100))};
  height:${({maxValues: { maxWidth}}) =>calcRem((maxWidth / 2) + (maxWidth / 100))};
  
    /* 200w & 100h - Set proportional margins */
    margin: -1px 0 0 -1px;

    background: #808080;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }      
`;


const Title = styled.div`
  position: absolute;
  font-size: 2.5rem;
  /* background-color: blue; */
  left: calc(50% - 2.2rem);
  top: 50%;
  display: flex;
  /* justify-self: center; */
  z-index: 10;
  width: 100%;
  text-align: center;

`;



interface IMeterProps {
  percentFilled: number;
  labels: labels;
  guageInnerAreaSize?: number; 
  progressBarColor: progressBarColor;
}


const GaugeMeter: React.FunctionComponent<IMeterProps> = ({percentFilled = 50,progressBarColor='#00a2ff', labels, guageInnerAreaSize = 80}) => {
  const gaugeRef: React.MutableRefObject<HTMLDivElement | null> | null = React.useRef(null)
  const [maxValues, setMaxValues] = React.useState<{maxHeight: number, maxWidth: number}>()

  React.useEffect(() => {
    gaugeRef.current && setMaxValues({maxHeight: gaugeRef.current.clientHeight, maxWidth: gaugeRef?.current.clientWidth})
    console.log(maxValues)
  }, [gaugeRef]);
    


  React.useEffect(() => {
    console.log(maxValues)
  }, [maxValues]);


  return (
      <Gauge maxWidth={maxValues?.maxWidth} ref={gaugeRef}>
        {maxValues && <>
           <StaticProgressMeter
             progressBarColor={progressBarColor}
             maxValues={{maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth}}
             guageInnerAreaSize={guageInnerAreaSize}
             />
        <RotatingProgressBar
         percentFilled={percentFilled}
          maxValues={{maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth}} 
          />
          <Title>
            80%
          </Title>
      
       </>
        }
      </Gauge>


  );
};

export default GaugeMeter;
