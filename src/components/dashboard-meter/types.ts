
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
export type labelSize = 'small' | 'default' | 'large';
export type appendedText = string | boolean;
export type labelValueToFixed =  0 | 1 | 2 | 3;

export interface LabelOptions {
    fixedLabels?: fixedLabels;
    size: labelSize;
    appendedText: appendedText;
    labelValueToFixed?: labelValueToFixed;
}

export interface LabelComponentProps {
    labelOptions: LabelOptions; 
    fixedLabels?: [any, any, any, any, any];
    fontSize?: string;
    appendedText?: string;
    range: range;
    containerWidth: number;
    containerHeight: number;
    numberOfLabels?: number;
    labelValueToFixed?: 0 | 1 | 2 | 3;
    progressFillerWidth: number;
}   





// Main Components Props
export interface GaugeMeterProps {
    value: value;
    guageInnerAreaSize?: guageInnerAreaSize;
    type?: type;
    title: title;
    range?: range;
    labelOptions?: LabelOptions;
    progressBarFillerColor?: progressBarColor;
    progressBarContainerColor?: string;
    innerAreaBackgroundColor: string;
    titleFontSize?: string;
}

export interface LinearMeterProps {
    value: value;
    type?: type;
    title: title;
    range?: range;
    labelOptions?: LabelOptions;
    progressBarColor?: progressBarColor;
}