# React Dashboard Meter
  A simple to use, highly customizable gauge meter UI component
  
  
  
 ## Installation 
 ```
    npm i @jason1642/react-dashboard-meter
 ```
 
 
 ## Usage 
 ```jsx
    import {GaugeMeter} from '@jason1642/react-dashboard-meter'
    // IMPORTANT - The minimum width of this component is 150px, you can change it by using the containerStyles prop 
const MyComponent: React.FunctionComponent<IMyComponentProps> = ({ value }) => {
    return(
        <div> 
        <GaugeMeter 
        containerStyles={{
            minWidth: '250px'
        }}
            value={value || 33}
            titleOptions={{
                appendedText: 'km/h',
                toFixedAmount: 0
            }}
            progressBarOptions={{
                fillerTriColors:['#97c4fb', '#5fa7ff', '#60a5fa']
            }}
            range={[0, 40]}
        />
        </div>
    )}
 ```

![](https://github.com/jason1642/react-dashboard-meter/blob/main/Screenshot%202023-04-27%20at%209.40.45%20AM.png)

 ## API
 
 Name |  type | Default | Description
--- | --- | --- | --- 
value (required) | number | undefined | A number that will calculate the percentage of the progress bar that is filled. As well as provide context to the title label.
range |  [number, number] \| number | [0, 100] | Tuple array or number that will be used to calculate the percentage of the progress bar that should be filled using the value prop. If a single number is provided, the range will be assumed to be 0 - range. You can provide any duo set of numbers as long as the first item in the tuple is smaller than the second. 
progressBarOptions |  object | <code>  {  fillerTriColors: <br>["green", "yellow",  "red"],  emptyAreaColor: "#bcbcbc" } </code> | Change the colors of the progress bars filler and empty areas. You can add three colors to get a linear gradient effect on the filler tri colors prop. Options: <br/> ``` fillerTriColors: [string, string, string?] \| string,  emptyAreaColor: string ```
innerAreaColor | string | 'white' | Change the color of the area that the progress bar covers.
containerStyles | object | {} | Styles to pass along to the container of the component. You can change the default min-width value here.
innerAreaSize |  number | 86 |  Change percentage amount that the inner area semi circle takes up, if the entire semi circle including the progress bar is 100%.
titleOptions |  object | <code>{styles: {color: 'black'}, verticalPosition: 'center' }</code> | Change the appearance of the title label inside the inner semi circle area. toFixedAmount changes the amount of numbers after the decimal point in the titles value, default 0. <br/> Options: <br/> ``` {styles:{fontSize: string, color: string, marginBottom: string,fontFamily: string, marginTop: string}, toFixedAmount: number, reactNode: React.ReactElement, appendedText: string, verticalPOsition: string} ```
labelOptions |  object | <code>{size: "default", appendedText: false, labelValueToFixed: 0,labalPosition: 'inward'}</code> | Styles to pass along to the container of the component. You can change the default min-width value here. <br/>  Options: <br/>``` {size: 'small'\|'default'\|'large', appendedTest: string, labelValueToFixed: 0\|1\|2\|3, labelPosition: 'bottom'\|'center'\|'top', numberOfLables: 3\|5 } ```
