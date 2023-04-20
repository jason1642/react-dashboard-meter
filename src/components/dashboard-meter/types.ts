
export interface maxValues {
    maxHeight: number,
    maxWidth: number;
}


export type value = number;
export type type = 'linear' | 'gague';
export type title = [string, string, string?] | string | undefined;
export type range = [number, number] | number;
export type labels = Array<string>;
export type progressBarColor = string | undefined;
export type titleFontSize = string | undefined;


export interface GaugeMeterProps {
    value: value;
    type?: type;
    title: title;
    range?: range;
    labels?: labels;
    progressBarColor?: progressBarColor;
    titleFontSize?: string;
}

export interface LinearMeterProps {
    value: value;
    type?: type;
    title: title;
    range?: range;
    labels?: labels;
    progressBarColor?: progressBarColor;
}