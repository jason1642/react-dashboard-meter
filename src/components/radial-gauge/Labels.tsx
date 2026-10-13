import type { FunctionComponent } from "react";
import type {
  GaugeShape,
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
}

export const defaultLabelOptions: LabelOptions = {
  size: "default",
  appendedText: false,
  labelValueToFixed: 0,
  labelPosition: "inward",
  labelStyles: {
    color: "black",
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
}) => (
  <>
    {positionLabelsArray({
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
