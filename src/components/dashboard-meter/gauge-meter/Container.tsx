import {FunctionComponent, useEffect, useRef,MutableRefObject} from 'react';
import styled from 'styled-components';
import { maxValues } from '../types';


interface IGuageContainerProps {
    children: React.ReactNode;
    containerStyles?: any;
    handleMaxValues: (maxValues: maxValues)=>void;
}

interface GaugeProps {
    maxWidth?: number;
   
  }

// Container for meter, labels, and title
const Container = styled.div<GaugeProps>`
  position: relative;
  /* overflow-y: clip; */

  display: block;
  background: transparent;
  /* margin: 5px; */
  width: 100%;
  min-width: 150px;
  height: ${({ maxWidth }) => maxWidth! / 2}px;

`;

const GuageContainer: FunctionComponent<IGuageContainerProps> = ({children, handleMaxValues, containerStyles}) => {
    const gaugeRef: MutableRefObject<HTMLDivElement | null> | null = useRef(null)

    useEffect(() => {
        gaugeRef.current && handleMaxValues({ maxHeight: gaugeRef.current.clientHeight, maxWidth: gaugeRef?.current.clientWidth })

      }, [gaugeRef]);

  return (
    <Container style={{...containerStyles}} maxWidth={gaugeRef?.current?.clientWidth} ref={gaugeRef}>
        {children}
    </Container>
  );
};

export default GuageContainer;
