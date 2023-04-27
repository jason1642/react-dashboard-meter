
export interface maxValues {
    maxHeight: number,
    maxWidth: number;
}


export type value = number;
export type type = 'linear' | 'gague';
export type title = [string, string, string?] | string | undefined;
export type range = [number, number] | number;
export type titleFontSize = string | undefined;
export type  percentFilled =  number | undefined;
export type innerAreaSize = number | undefined;




// Label Options Types
export type fixedLabels = [any, any, any, any, any] | undefined;
export type labelSize = 'small' | 'default' | 'large' | undefined;
export type appendedText = string | false | undefined;
export type labelValueToFixed =  0 | 1 | 2 | 3;
export type labelPosition = 'inward' | 'inside' | 'outward';

export interface LabelOptions {
    fixedLabels?: fixedLabels;
    size?: labelSize;
    appendedText?: appendedText;
    labelValueToFixed?: labelValueToFixed;
    labelPosition?: labelPosition;
    numberOfLabels?: number;
}

export interface LabelComponentProps {
    labelOptions: LabelOptions; 
    fixedLabels?: [any, any, any, any, any];
    range: range;
    labelPosition?: labelPosition;
    containerWidth: number;
    containerHeight: number;
    progressFillerWidth: number;
}   


// Title Options Types
export type verticalPosition = 'center' | 'bottom' | 'top';



export interface TitleOptionProps {
    styles?: {
        fontSize?: string;
        color?: string;
        marginBottom?:string;
        fontWeight?:string;
        fontFamily?: string;
        marginTop?:string;
    };
    toFixedAmount?: 0 | 1 | 2;
    reactNode?: React.ReactElement;
    appendedText?: string;
    verticalPosition?: verticalPosition;
}

export type fillerTriColors = string | [string, string, string?] | undefined;

export interface ProgressBarOptions {
    fillerTriColors?: fillerTriColors;
    emptyAreaColor?: string | undefined;
}

// Main Components Props
export interface GaugeMeterProps {
    value: value;
    innerAreaSize?: innerAreaSize;
    containerStyles?: any;
    type?: type;
    range?: range;
    labelOptions?: LabelOptions;
    innerAreaColor?: string;
    progressBarOptions?: ProgressBarOptions;
    titleOptions?: TitleOptionProps;
}

export interface LinearMeterProps {
    value: value;
    type?: type;
    title?: title;
    range?: range;
    labelOptions?: LabelOptions;
}