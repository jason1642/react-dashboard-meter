import { useCallback, useState } from "react";
import "../../tailwind.css";
import type {
  GaugeDimensions,
  InnerAreaSize,
  RadialGaugeProps,
} from "./types";
import { clampToRange, getRangeBounds, valueToPercent } from "../../helpers/meterScale";
import GaugeContainer from "./GaugeContainer";
import GaugeVisual from "./GaugeVisual";
import { getGaugeArcGeometry } from "./geometry";
import { defaultLabelOptions } from "./GaugeLabels";
import GaugeValue, { defaultGaugeValueOptions } from "./GaugeValue";

const RadialGauge = ({
  value,
  shape = "half-circle",
  variant = "filled-arc",
  progressBarOptions,
  valueOptions,
  titleOptions,
  labelOptions,
  range = [0, 100],
  innerAreaSize,
  containerStyles,
  roundedCaps = false,
  showValue = true,
  showTarget = false,
  target,
  ticks = "labels-and-ticks",
}: RadialGaugeProps) => {
  const [, rangeMaximum] = getRangeBounds(range);
  const valueForRange = typeof value === "number" && Number.isFinite(value)
    ? value
    : rangeMaximum;
  const resolvedValue = clampToRange(valueForRange, range);
  const resolvedInnerAreaSize: InnerAreaSize =
    innerAreaSize ?? (labelOptions?.labelPosition === "inside" ? 79 : 86);
  const [dimensions, setDimensions] = useState<GaugeDimensions>();
  const handleDimensionsChange = useCallback((nextDimensions: GaugeDimensions) => {
    setDimensions((current) =>
      current?.maxWidth === nextDimensions.maxWidth &&
      current?.maxHeight === nextDimensions.maxHeight
        ? current
        : nextDimensions,
    );
  }, []);
  const percentFilled = valueToPercent(resolvedValue, range);
  const shapeValueDefaults =
    shape === "three-quarter"
      ? { ...defaultGaugeValueOptions, verticalPosition: "bottom" as const }
      : defaultGaugeValueOptions;

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
      containerStyles={{ backgroundColor: "#111827", ...containerStyles }}
      onDimensionsChange={handleDimensionsChange}
    >
      {dimensions && progressFillerWidth !== undefined && (
        <>
          <GaugeVisual
            innerAreaSize={resolvedInnerAreaSize}
            dimensions={dimensions}
            labelOptions={{ ...defaultLabelOptions, ...labelOptions }}
            range={range}
            shape={shape}
            variant={variant}
            percentFilled={percentFilled}
            progressFillerWidth={progressFillerWidth}
            progressBarOptions={progressBarOptions}
            roundedCaps={roundedCaps}
            ticks={ticks}
            showTarget={showTarget}
            target={target}
          />
          {showValue && <GaugeValue
            containerWidth={dimensions.maxWidth}
            progressFillerWidth={progressFillerWidth}
            range={range}
            value={resolvedValue}
            valueOptions={{
              ...shapeValueDefaults,
              ...titleOptions,
              ...valueOptions,
              ...(variant === "needle" ? { verticalPosition: "bottom" as const } : {}),
            }}
          />}
        </>
      )}
    </GaugeContainer>
  );
};

export { RadialGauge };
