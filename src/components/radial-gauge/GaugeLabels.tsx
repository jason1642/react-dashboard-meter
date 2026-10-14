import type { FunctionComponent } from "react";
import type {
  GaugeShape,
  GaugeTicks,
  LabelOptions,
  Range,
} from "./types";
import { positionGaugeLabels } from "./positionGaugeLabels";

interface GaugeLabelsProps {
  labelOptions: LabelOptions;
  range: Range;
  containerWidth: number;
  containerHeight: number;
  progressFillerWidth: number;
  innerAreaSize: number;
  shape: GaugeShape;
  ticks: GaugeTicks;
}

export const defaultLabelOptions: LabelOptions = {
  size: "default",
  appendedText: false,
  labelValueToFixed: 0,
  labelPosition: "outward",
  labelStyles: {
    color: "#94a3b8",
  },
};

const GaugeLabels: FunctionComponent<GaugeLabelsProps> = ({
  labelOptions,
  range,
  containerWidth,
  containerHeight,
  progressFillerWidth,
  innerAreaSize,
  shape,
  ticks,
}) => (
  <>
    {(ticks === "labels-and-ticks" || ticks === "labels-only") && positionGaugeLabels({
      range,
      containerWidth,
      containerHeight,
      progressFillerWidth,
      innerAreaSize,
      shape,
      labelOptions,
    })}
  </>
);

export default GaugeLabels;
