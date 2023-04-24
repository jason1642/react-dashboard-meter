
export interface maxValues {
    maxHeight: number,
    maxWidth: number;
}


export type value = number;
export type type = 'linear' | 'gague';
export type title = [string, string, string?] | string | undefined;
export type range = [number, number] | number;
export type progressBarColor = string | undefined;
export type titleFontSize = string | undefined;
export type  percentFilled =  number | undefined;
export type guageInnerAreaSize = number | undefined;




// Label Options Types
export type fixedLabels = [any, any, any, any, any] | undefined;
export type labelSize = 'small' | 'default' | 'large' | undefined;
export type appendedText = string | boolean | undefined;
export type labelValueToFixed =  0 | 1 | 2 | 3;

export interface LabelOptions {
    fixedLabels?: fixedLabels;
    size?: labelSize;
    appendedText?: appendedText;
    labelValueToFixed?: labelValueToFixed;
}

export interface LabelComponentProps {
    labelOptions: LabelOptions; 
    fixedLabels?: [any, any, any, any, any];
    fontSize?: string;
    range: range;
    containerWidth: number;
    containerHeight: number;
    numberOfLabels?: number;
    labelValueToFixed?: 0 | 1 | 2 | 3;
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
    reactNode?: React.ReactElement;
    appendedText?: string;
    verticalPosition?: verticalPosition;
}

// Main Components Props
export interface GaugeMeterProps {
    value: value;
    guageInnerAreaSize?: guageInnerAreaSize;
    type?: type;
    range?: range;
    labelOptions?: LabelOptions;
    progressBarFillerColor?: progressBarColor;
    progressBarContainerColor?: string;
    innerAreaBackgroundColor?: string;
   
    titleOptions?: TitleOptionProps;
}

export interface LinearMeterProps {
    value: value;
    type?: type;
    title?: title;
    range?: range;
    labelOptions?: LabelOptions;
    progressBarColor?: progressBarColor;
}