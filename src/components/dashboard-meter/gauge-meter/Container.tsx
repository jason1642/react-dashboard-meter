import {FunctionComponent, useEffect, useRef,MutableRefObject} from 'react';
import styled from 'styled-components';
import { maxValues } from '../types';


interface IGuageContainerProps {
    children: React.ReactNode;
 
    handleMaxValues: (maxValues: maxValues)=>void;
}

interface GaugeProps {
    maxWidth?: number;
   
  }

// Container for meter, labels, and title
const Container = styled.div<GaugeProps>`
  position: relative;
  overflow: hidden;
  display: flex;
  background: transparent;
  border: 2px solid white;
  width: 100%;
  height: ${({ maxWidth }) => maxWidth! / 2}px;

`;

const GuageContainer: FunctionComponent<IGuageContainerProps> = ({children, handleMaxValues}) => {
    const gaugeRef: MutableRefObject<HTMLDivElement | null> | null = useRef(null)

    useEffect(() => {
        gaugeRef.current && handleMaxValues({ maxHeight: gaugeRef.current.clientHeight, maxWidth: gaugeRef?.current.clientWidth })
    
      }, [gaugeRef]);

  return (
    <Container maxWidth={gaugeRef?.current?.clientWidth} ref={gaugeRef}>
        {children}
    </Container>
  );
};

export default GuageContainer;