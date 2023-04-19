
export type value = number;
export type type = 'linear' | 'arched';
export type title = [string, string, string?] | string | undefined;
export type range = [number, number] | number;
export type labels = Array<string>;




export interface DashboardMeterProps {
    value: value;
    type?: type;
    title: title;
    range?: range;
    labels?: labels;
}