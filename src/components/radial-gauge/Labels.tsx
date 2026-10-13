import type { FunctionComponent } from "react";
import type { LabelComponentProps, LabelOptions } from "./RadialGauge.types";
import { positionLabelsArray } from "./positionLabelsArray";

interface LabelsProps extends LabelComponentProps {}

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
}) => (
  <>
    {positionLabelsArray({
      range,
      containerWidth,
      containerHeight,
      progressFillerWidth,
      labelOptions,
    })}
  </>
);

export default Labels;
