import * as React from 'react';
import styled from 'styled-components';
import type {labels, value} from './types'
const Container = styled.div`
  display:flex;
  background-color: green;
  padding: 10px;
  height: 250px;
  width: 500px;
  /* border-radius: 50%; */
  position: relative;
  /* overflow: hidden; */

`;


const staticHeight = 250
const staticWidth = 500



const calcRem = (val: number, fontSizePx: number = 16)=>
  // Either calc all sizes by multplying static value, or having val be width and have responsive calculations
  `${(val * 1) / fontSizePx}rem`

interface RotatingFillerProps {
  percentFilled: number;

}

// Container for meter, labels, and title
const Gauge = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  /* width: 100%; */
  /* height: 100%; */

  width: ${calcRem(staticWidth)};
  height: ${calcRem(staticHeight)};

  margin: ${calcRem(20)};
`;

// Filler for curved progress bar
const StaticProgressMeter = styled.div`
  display:block;
  position: relative;
  /* width: 100%;
  height: 100%; */
  /* width: ${calcRem(staticWidth)}; */
  height: ${calcRem(staticHeight)};
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
    z-index: 2;

    display: block;
    width: ${calcRem(staticWidth * .7)};
    height: ${calcRem(staticHeight * .7)};
    margin-left: ${calcRem(-175)};

    background: #ffffff;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 

`;

// Entire progress bar underneath actual filler
const RotatingProgressBar = styled.div<RotatingFillerProps>`
  position: absolute;
  top: 0;
  left: 0;

  width: ${calcRem(staticWidth)};
  height: ${calcRem(staticHeight)};

  background: transparent;

  transform: rotate(120deg) translate3d(0,0,0);
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
    width: ${calcRem(staticWidth + (staticWidth / 100))};
    height: ${calcRem(staticHeight + (staticHeight / 50))};
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
  return (
     <Container>

      <Gauge>
        <StaticProgressMeter/>
        <RotatingProgressBar percentFilled={30}/>
      </Gauge>

      
</Container>
  );
};

export default GaugeMeter;
