import { useCallback, useState } from "react";
import "../../tailwind.css";
import type { GaugeMeterProps, innerAreaSize, maxValues } from "./RadialGauge.types";
import GaugeContainer from "./Container";
import ProgressBarFiller from "./ProgressBarFiller";
import { calculatePercentFilled } from "./calculatePercentFilled";
import { defaultLabelOptions } from "./Labels";
import Title, { defaultTitleOptions } from "./Title";

const RadialGauge = ({
  value,
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
      current?.maxWidth === nextDimensions.maxWidth ? current : nextDimensions,
    );
  }, []);
  const percentFilled = calculatePercentFilled(value, range);

  if (typeof percentFilled !== "number") return null;

  const progressFillerWidth = dimensions
    ? (dimensions.maxWidth * (1 - resolvedInnerAreaSize / 100)) / 2
    : undefined;

  return (
    <GaugeContainer
      containerStyles={containerStyles}
      handleMaxValues={handleMaxValues}
    >
      {dimensions && progressFillerWidth !== undefined && (
        <>
          <ProgressBarFiller
            innerAreaSize={resolvedInnerAreaSize}
            maxValues={{
              maxHeight: dimensions.maxWidth / 2,
              maxWidth: dimensions.maxWidth,
            }}
            labelOptions={{ ...defaultLabelOptions, ...labelOptions }}
            range={range}
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
            titleOptions={{ ...defaultTitleOptions, ...titleOptions }}
          />
        </>
      )}
    </GaugeContainer>
  );
};

export { RadialGauge };
