import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import DashboardMeter from "../DashboardMeter";
// View component with this story, changes saved in the code editor automatically show on storybook
import styled from 'styled-components'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const Container = styled.div`
  display:flex;
  position:relativve;
  background-color:#80a0fd;
  padding: 70px;
  width: 100vw;
  height: 100vh;

`;


const meta: Meta<typeof DashboardMeter> = {
  title: "ReactComponentLibrary/DashboardMeter",
  component: DashboardMeter,
  decorators: [
    (Story) => (
      <Container>

        <div 
          style={
            {
                backgroundColor: 'grey',
              // backgroundColor: 'linear-gradient(to bottom, #131313, #000000)',
            //   background: 'linear-gradient(to bottom, hsl(224.21052631578948, 100%, 26.078431372549023%), #a5fbd7)',
               position: 'relative',
              //  border: '1px solid blue',
               borderRadius: '15px',
                height: '70vh',
                marginTop: '15px',
                marginLeft: '150px',
                 width: '70vw'
                 }
                 } >
            <Story  />

        
        </div>    
        
  
                 
                 
                 </Container>
    )
  ]
} 

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Template = StoryObj<typeof DashboardMeter>;


// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Change initial values here, leave them undefined to test default cases. Undefined turns the control value 
// input into set object and won't work until its not undefined
export const Primary: Template = {
  args: {


  },
};

export default meta