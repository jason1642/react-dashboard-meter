
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


export interface LabelOptions {
    fixedLabels?: [any, any, any, any, any];
    size: 'small' | 'default' | 'large';
    appendedText: string | boolean;

}


export interface LabelComponentProps {
    labelOptions?: LabelOptions; 
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

export interface GaugeMeterProps {
    value: value;
    guageInnerAreaSize?: guageInnerAreaSize;
    type?: type;
    title: title;
    range?: range;
    labelOptions?: LabelOptions;
    progressBarColor?: progressBarColor;
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