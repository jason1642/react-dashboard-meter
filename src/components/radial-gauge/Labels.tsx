import type { FunctionComponent } from "react";
import type {
  GaugeShape,
  GaugeTicks,
  LabelOptions,
  range,
} from "./RadialGauge.types";
import { positionLabelsArray } from "./positionLabelsArray";

interface LabelsProps {
  labelOptions: LabelOptions;
  range: range;
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

const Labels: FunctionComponent<LabelsProps> = ({
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
    {(ticks === "labels-and-ticks" || ticks === "labels-only") && positionLabelsArray({
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

export default Labels;
