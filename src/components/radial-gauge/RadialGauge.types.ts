import type { CSSProperties, ReactNode } from "react";

export interface maxValues {
  maxHeight: number;
  maxWidth: number;
}

export type value = number;
export type range = [number, number] | number;
export type innerAreaSize = number;
export type labelPosition = "inward" | "inside" | "outward";
export type labelSize = "small" | "default" | "large";
export type appendedText = string | false;
export type labelValueToFixed = 0 | 1 | 2 | 3;
export type fixedLabels = [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];
export type verticalPosition = "center" | "bottom" | "top";
export type fillerTriColors = string | [string, string, string?];
export type GaugeShape = "half-circle" | "three-quarter";
export type GaugeVariant = "filled-arc" | "needle";
export type GaugeTicks = "labels-and-ticks" | "ticks-only" | "none" | "labels-only";
export type ProgressBarColorMode = "thresholds" | "gradient";

export interface LabelOptions {
  fixedLabels?: fixedLabels;
  labelStyles?: CSSProperties;
  size?: labelSize;
  appendedText?: appendedText;
  labelValueToFixed?: labelValueToFixed;
  labelPosition?: labelPosition;
  numberOfLabels?: number;
}

export interface LabelComponentProps {
  labelOptions: LabelOptions;
  range: range;
  containerWidth: number;
  containerHeight: number;
  progressFillerWidth: number;
}

export interface TitleOptionProps {
  containerStyles?: CSSProperties;
  valueTextStyles?: CSSProperties;
  appendedTextStyles?: CSSProperties;
  toFixedAmount?: 0 | 1 | 2;
  reactNode?: ReactNode;
  appendedText?: string | false;
  verticalPosition?: verticalPosition;
}

export interface ProgressBarOptions {
  fillerTriColors?: fillerTriColors;
  emptyAreaColor?: string;
  colorMode?: ProgressBarColorMode;
}

export interface RadialGaugeProps {
  value: value;
  shape?: GaugeShape;
  variant?: GaugeVariant;
  roundedCaps?: boolean;
  showValue?: boolean;
  showTarget?: boolean;
  target?: number;
  ticks?: GaugeTicks;
  innerAreaSize?: innerAreaSize;
  containerStyles?: CSSProperties;
  range?: range;
  labelOptions?: LabelOptions;
  /** @deprecated The gauge interior is transparent; style the container instead. */
  innerAreaColor?: string;
  progressBarOptions?: ProgressBarOptions;
  titleOptions?: TitleOptionProps;
}

// Preserve the previous public type name for existing consumers.
export type GaugeMeterProps = RadialGaugeProps;
