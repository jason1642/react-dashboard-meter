import type { CSSProperties, ReactNode } from "react";
import type { ArcShape } from "../../helpers/arc";
import type { MeterRange } from "../../helpers/meterScale";

export interface GaugeDimensions {
  maxHeight: number;
  maxWidth: number;
}

export type GaugeValue = number;
export type Range = MeterRange;
export type InnerAreaSize = number;
export type LabelPosition = "inward" | "inside" | "outward";
export type LabelSize = "small" | "default" | "large";
export type AppendedText = string | false;
export type LabelValueToFixed = 0 | 1 | 2 | 3;
export type FixedLabels = [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];
export type VerticalPosition = "center" | "bottom" | "top";
export type FillerTriColors = string | [string, string, string?];
export type GaugeShape = ArcShape;
export type GaugeVariant = "filled-arc" | "needle";
export type GaugeTicks = "labels-and-ticks" | "ticks-only" | "none" | "labels-only";
export type ProgressBarColorMode = "thresholds" | "gradient";

export interface LabelOptions {
  fixedLabels?: FixedLabels;
  labelStyles?: CSSProperties;
  size?: LabelSize;
  appendedText?: AppendedText;
  labelValueToFixed?: LabelValueToFixed;
  labelPosition?: LabelPosition;
  numberOfLabels?: number;
}

export interface LabelComponentProps {
  labelOptions: LabelOptions;
  range: Range;
  containerWidth: number;
  containerHeight: number;
  progressFillerWidth: number;
}

export interface GaugeValueOptions {
  containerStyles?: CSSProperties;
  valueTextStyles?: CSSProperties;
  appendedTextStyles?: CSSProperties;
  toFixedAmount?: 0 | 1 | 2;
  reactNode?: ReactNode;
  appendedText?: string | false;
  verticalPosition?: VerticalPosition;
}

export interface ProgressBarOptions {
  fillerTriColors?: FillerTriColors;
  emptyAreaColor?: string;
  colorMode?: ProgressBarColorMode;
}

export interface RadialGaugeProps {
  value?: GaugeValue;
  shape?: GaugeShape;
  variant?: GaugeVariant;
  roundedCaps?: boolean;
  showValue?: boolean;
  showTarget?: boolean;
  target?: number;
  ticks?: GaugeTicks;
  innerAreaSize?: InnerAreaSize;
  containerStyles?: CSSProperties;
  range?: Range;
  labelOptions?: LabelOptions;
  /** @deprecated The gauge interior is transparent; style the container instead. */
  innerAreaColor?: string;
  progressBarOptions?: ProgressBarOptions;
  valueOptions?: GaugeValueOptions;
  /** @deprecated Use valueOptions. */
  titleOptions?: GaugeValueOptions;
}

// Legacy aliases retained for consumers using the original public type names.
export type maxValues = GaugeDimensions;
export type value = GaugeValue;
export type range = Range;
export type innerAreaSize = InnerAreaSize;
export type labelPosition = LabelPosition;
export type labelSize = LabelSize;
export type appendedText = AppendedText;
export type labelValueToFixed = LabelValueToFixed;
export type fixedLabels = FixedLabels;
export type verticalPosition = VerticalPosition;
export type fillerTriColors = FillerTriColors;
export type TitleOptionProps = GaugeValueOptions;
export type GaugeMeterProps = RadialGaugeProps;
