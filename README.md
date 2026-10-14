# React Dashboard Meter
  A simple to use, highly customizable gauge meter UI component
  
  
  
 ## Installation 
 ```
    npm i @jason1642/react-dashboard-meter
 ```
 
 
 ## Usage 
 ```jsx
    import {RadialGauge} from '@jason1642/react-dashboard-meter'
    // IMPORTANT - The minimum width of this component is 150px, you can change it by using the containerStyles prop 
const MyComponent: React.FunctionComponent<IMyComponentProps> = ({ value }) => {
    return(
        <div> 
        <RadialGauge
        containerStyles={{
            minWidth: '250px'
        }}
            value={value || 33}
            valueOptions={{
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
value | number | range maximum | A number that determines progress and current value text. Values outside the range are clamped to its bounds; if omitted, the range maximum is used.
range |  [number, number] \| number | [0, 100] | Tuple array or number that will be used to calculate the percentage of the progress bar that should be filled using the value prop. If a single number is provided, the range will be assumed to be 0 - range. You can provide any duo set of numbers as long as the first item in the tuple is smaller than the second. 
progressBarOptions | object | threshold colors | Set threshold colors, the unfilled track color, and `colorMode` (`thresholds` or `gradient`).
innerAreaColor | string | — | Deprecated. The gauge interior is transparent; set `containerStyles.backgroundColor` to style the area behind it.
containerStyles | object | {} | Styles to pass along to the container of the component. You can change the default min-width value here.
innerAreaSize |  number | 86 |  Change percentage amount that the inner area semi circle takes up, if the entire semi circle including the progress bar is 100%.
valueOptions | object | centered | Change the appearance of the current value text. `titleOptions` remains as a deprecated alias. `toFixedAmount` controls decimal places, and `appendedText` sets a unit or suffix.
labelOptions |  object | <code>{size: "default", appendedText: false, labelValueToFixed: 0,labalPosition: 'inward'}</code> | Styles to pass along to the container of the component. You can change the default min-width value here. <br/>  Options: <br/>``` {size: 'small'\|'default'\|'large', appendedTest: string, labelValueToFixed: 0\|1\|2\|3, labelPosition: 'bottom'\|'center'\|'top', numberOfLables: 3\|5 } ```

## Shared helpers

Reusable scale helpers (`clampToRange`, `getRangeBounds`, and `valueToPercent`) and arc geometry helpers (`getArcPoint`, `getArcPath`, and `getArcSegmentPath`) are exported from the package for use in other meter and chart components.
