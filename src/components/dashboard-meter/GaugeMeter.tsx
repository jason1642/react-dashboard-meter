import * as React from 'react';
import styled from 'styled-components';
import type {labels, value} from './types'
const Container = styled.div`
  display:flex;
  background-color: green;
  padding: 10px;
  height: 185px;
  width: 280px;
  /* border-radius: 50%; */
  position: relative;
  overflow: hidden;

`;

const calcRem = (val: number)=>
  `${val / 16}rem`


const Mask = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: calcRem(200);
  height: calcRem(100);
  margin: calcRem(20);
`;


const SemiCircle = styled.div`
  display:block;
  position: relative;
  width: calcRem(200);
  height: calcRem(100);
  background: linear-gradient(to right, #c0392b 0%, #f1c40f 50%, #1abc9c 100%);

  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;

  &::before {
    content: "";

    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;

    display: block;
    width: calcRem(140);
    height: calcRem(70);
    margin-left: calcRem(-70);

    background: #033be5;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  } 

`;



const SemiCircleMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: rem(200);
  height: rem(200);

  background: transparent;

  transform: rotate(120deg) translate3d(0,0,0);
  transform-origin: center center;
  backface-visibility: hidden;
  transition: all .3s ease-in-out;
  transform: rotate(20deg) translate3d(0,0,0);
  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0%;
    z-index: 2;

    display: block;
    width: rem(202);
    height: rem(102);
    margin: -1px 0 0 -1px;

    background: #f2f2f2;

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

      <Mask>
        <SemiCircle/>
        <SemiCircleMask/>
      </Mask>

      
</Container>
  );
};

export default GaugeMeter;
