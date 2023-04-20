import * as React from 'react';
import styled from 'styled-components';
import type {labels, value} from './types'


interface RotatingProgressBarProps {
  percentFilled: number;
  maxValues: {maxHeight: number, maxWidth: number};
}

interface StaticProgressMeterProps {
  maxValues: {maxHeight: number, maxWidth: number};

}
interface GaugeProps {
  maxWidth?: number;
}

const Container = styled.div`
  display:flex;
  background-color: green;
  padding: 10px;
  /* height: 760px; */
  width: 450px;
  /* padding: 5px; */
  /* border-radius: 50%; */
  position: relative;
  overflow: hidden;

`;

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
  /* background: linear-gradient(to right, #f7351f 0%, #f3ff18 50%, #12f912 100%); */
  background-color: #00a2ff;
  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;


  /* Inner area */
  &::before {
    content: '80%';
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 3;

    display: block;

    /* Values with * .x - Percent of entire semi-circle gauge covered by inner space */
    width:${({maxValues: {maxWidth}}) =>calcRem(maxWidth * .7)};
    height:${({maxValues: {maxWidth}}) =>calcRem(maxWidth * .35)};
    /* Original margin-left = -70 */
    margin-left: -${({maxValues: {maxWidth}}) =>calcRem(maxWidth * .35)};

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

  transform: rotate(60deg) translate3d(0,0,0);
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

    display: block;
    width: ${({maxValues: { maxWidth}}) =>calcRem(maxWidth + (maxWidth / 100))};
  height:${({maxValues: { maxWidth}}) =>calcRem((maxWidth / 2) + (maxWidth / 100))};
  
    /* 200w & 100h - Set proportional margins */
    margin: -1px 0 0 -1px;

    background: #808080;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }      
`;

interface IMeterProps {
  percentFilled: number;
  labels: labels;
}


const GaugeMeter: React.FunctionComponent<IMeterProps> = ({percentFilled, labels}) => {
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
     <Container>

      <Gauge maxWidth={maxValues?.maxWidth} ref={gaugeRef}>
        {maxValues && <>
           <StaticProgressMeter maxValues={{maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth}}/>
        <RotatingProgressBar maxValues={{maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth}} percentFilled={30}/>
       
       </>
        }
      </Gauge>

</Container>
  );
};

export default GaugeMeter;
