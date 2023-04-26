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

 ## API
 
 Name | Is Required? | type | Default | options | Description 
--- | -- | --- | --- | --- | ----
value | true | number | undefined |  | A number that will calculate the percentage of the progress bar that is filled. As well as provide context to the title label.
range | false | [number, number] or number | [0, 100] |  | Tuple array or number that will be used to calculate the percentage of the progress bar that should be filled using the value prop. If a single number is provided, the range will be assumed to be 0 - range. You can provide any duo set of numbers as long as the first item in the tuple is smaller than the second. 



