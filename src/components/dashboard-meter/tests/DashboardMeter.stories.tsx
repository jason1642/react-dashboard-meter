import React from 'react'
import { StoryObj, Meta } from "@storybook/react";
import GaugeMeter from "../gauge-meter/GaugeMeter";
// View component with this story, changes saved in the code editor automatically show on storybook
import styled from 'styled-components'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const Container = styled.div`
  display:flex;
  position:relativve;
  background-color:#80a0fd;
  padding: 0 0px;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;


const GaugeContainer = styled.div`
  display:flex;
  /* background-color: purple; */
  /* padding: 10px; */
  width:450px;



/* 
  height: 500px;
  width: 220px;

  position: relative;
  overflow: hidden; */

`;

const meta: Meta<typeof GaugeMeter> = {
  title: "ReactComponentLibrary/DashboardMeter",
  component: GaugeMeter,
  decorators: [
    (Story) => (
      <Container>

        <div 
          style={
            {
                backgroundColor: 'white',
              // backgroundColor: 'linear-gradient(to bottom, #131313, #000000)',
            //   background: 'linear-gradient(to bottom, hsl(224.21052631578948, 100%, 26.078431372549023%), #a5fbd7)',
              //  position: 'relative',
              //  border: '1px solid blue',
               borderRadius: '15px',
                // height: '70vh',
                margin: '0 auto',
                marginTop: '15px',
                // marginLeft: '10px',
                //  width: '65vw',
                 padding: '25px',
                 }
                 } >

                    <GaugeContainer> 
                          <Story  />
                    </GaugeContainer>
          

        
        </div>    
        
  
                 
                 
                 </Container>
    )
  ]
} 

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Template = StoryObj<typeof GaugeMeter>;


// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Change initial values here, leave them undefined to test default cases. Undefined turns the control value 
// input into set object and won't work until its not undefined
export const Primary: Template = {
  args: {
    value: 40,
    titleOptions: {
      // toFixedAmount:2
    },
    containerStyles: {
      // minWidth: '1500px'
    }
  
  },
};

export default meta