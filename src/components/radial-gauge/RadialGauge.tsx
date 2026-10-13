import { useCallback, useState } from "react";
import "../../tailwind.css";
import type {
  GaugeMeterProps,
  innerAreaSize,
  maxValues,
} from "./RadialGauge.types";
import GaugeContainer from "./Container";
import ProgressBarFiller from "./ProgressBarFiller";
import { calculatePercentFilled } from "./calculatePercentFilled";
import { getGaugeArcGeometry } from "./arcGeometry";
import { defaultLabelOptions } from "./Labels";
import Title, { defaultTitleOptions } from "./Title";

const RadialGauge = ({
  value,
  shape = "half-circle",
  variant = "filled-arc",
  progressBarOptions,
  titleOptions,
  labelOptions,
  innerAreaColor = "white",
  range = [0, 100],
  innerAreaSize,
  containerStyles,
}: GaugeMeterProps) => {
  const resolvedInnerAreaSize: innerAreaSize =
    innerAreaSize ?? (labelOptions?.labelPosition === "inside" ? 79 : 86);
  const [dimensions, setDimensions] = useState<maxValues>();
  const handleMaxValues = useCallback((nextDimensions: maxValues) => {
    setDimensions((current) =>
      current?.maxWidth === nextDimensions.maxWidth &&
      current?.maxHeight === nextDimensions.maxHeight
        ? current
        : nextDimensions,
    );
  }, []);
  const percentFilled = calculatePercentFilled(value, range);
  const shapeTitleDefaults =
    shape === "three-quarter"
      ? { ...defaultTitleOptions, verticalPosition: "bottom" as const }
      : defaultTitleOptions;

  if (typeof percentFilled !== "number") return null;

  const progressFillerWidth = dimensions
    ? getGaugeArcGeometry(
        dimensions.maxWidth,
        dimensions.maxHeight,
        shape,
        resolvedInnerAreaSize,
      ).strokeWidth
    : undefined;

  return (
    <GaugeContainer
      shape={shape}
      containerStyles={containerStyles}
      handleMaxValues={handleMaxValues}
    >
      {dimensions && progressFillerWidth !== undefined && (
        <>
          <ProgressBarFiller
            innerAreaSize={resolvedInnerAreaSize}
            maxValues={dimensions}
            labelOptions={{ ...defaultLabelOptions, ...labelOptions }}
            range={range}
            shape={shape}
            variant={variant}
            percentFilled={percentFilled}
            progressFillerWidth={progressFillerWidth}
            progressBarOptions={progressBarOptions}
            innerAreaColor={innerAreaColor}
          />
          <Title
            containerWidth={dimensions.maxWidth}
            progressFillerWidth={progressFillerWidth}
            range={range}
            value={value}
            titleOptions={{ ...shapeTitleDefaults, ...titleOptions }}
          />
        </>
      )}
    </GaugeContainer>
  );
};

export { RadialGauge };
