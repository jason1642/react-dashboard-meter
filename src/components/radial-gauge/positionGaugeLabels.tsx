import type { CSSProperties, ReactNode } from "react";
import type { GaugeShape, LabelOptions, Range } from "./types";
import { getArcPoint } from "../../helpers/arc";
import { getGaugeArcGeometry } from "./geometry";

interface PositionGaugeLabelsOptions {
  range: Range;
  labelOptions: LabelOptions;
  containerWidth: number;
  containerHeight: number;
  progressFillerWidth: number;
  innerAreaSize: number;
  shape: GaugeShape;
}

const labelClassName =
  "absolute z-[33] flex items-center justify-center text-center font-sans font-medium text-slate-400";

export const positionGaugeLabels = ({
  range,
  labelOptions,
  containerWidth,
  containerHeight,
  progressFillerWidth,
  innerAreaSize,
  shape,
}: PositionGaugeLabelsOptions): ReactNode[] => {
  const [minimum, maximum] = typeof range === "number" ? [0, range] : range;
  const {
    fixedLabels,
    size = "default",
    appendedText = false,
    labelPosition = "outward",
    labelStyles,
    labelValueToFixed = 0,
  } = labelOptions;
  const requestedCount = labelOptions.numberOfLabels ?? fixedLabels?.length ?? 5;
  const count = Number.isFinite(requestedCount)
    ? Math.max(2, Math.min(25, Math.floor(requestedCount)))
    : 5;
  const fontScale = size === "small" ? 0.5 : size === "large" ? 0.75 : 0.6;
  const fontSize = Math.max(12, progressFillerWidth * fontScale);
  const geometry = getGaugeArcGeometry(
    containerWidth,
    containerHeight,
    shape,
    innerAreaSize,
  );
  const labelRadius =
    labelPosition === "inside"
      ? geometry.radius - geometry.strokeWidth * 0.25
      : labelPosition === "inward"
        ? geometry.radius - geometry.strokeWidth * 0.62
        : geometry.radius + geometry.strokeWidth * 1.08 + fontSize * 0.9;
  const suffix =
    appendedText === false
      ? ""
      : appendedText ?? (minimum === 0 && maximum === 100 ? "%" : "");

  return Array.from({ length: count }, (_, index) => {
    const ratio = index / (count - 1);
    const angle = geometry.startAngle + geometry.sweepAngle * ratio;
    const point = getArcPoint(geometry, angle, labelRadius);
    const value = minimum + (maximum - minimum) * ratio;
    const label = fixedLabels?.[index] ?? value.toFixed(labelValueToFixed);
    const cosine = Math.cos((angle * Math.PI) / 180);
    const transform =
      cosine < -0.8
        ? "translate(-100%, -50%)"
        : cosine > 0.8
          ? "translateY(-50%)"
          : "translate(-50%, -50%)";
    const style: CSSProperties = {
      left: point.x,
      top: point.y,
      transform,
      width: Math.max(progressFillerWidth * 2, fontSize * 2),
      fontSize,
      ...labelStyles,
    };

    return (
      <span key={`${index}-${value}`} className={labelClassName} style={style}>
        {label}
        {suffix && (
          <span
            className="flex text-inherit"
            style={{ fontSize: `calc(${fontSize}px * 0.7)` }}
          >
            {suffix}
          </span>
        )}
      </span>
    );
  });
};
