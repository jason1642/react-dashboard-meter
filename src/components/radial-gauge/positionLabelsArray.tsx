import type { CSSProperties, ReactNode } from "react";
import type { LabelOptions, range } from "./RadialGauge.types";

interface PositionLabelArrayOptions {
  range: range;
  labelOptions: LabelOptions;
  containerWidth: number;
  containerHeight: number;
  progressFillerWidth: number;
}

const labelClassName =
  "absolute z-[33] flex items-center justify-center text-center font-sans font-bold text-black";

export const positionLabelsArray = ({
  range,
  labelOptions,
  containerWidth,
  containerHeight,
  progressFillerWidth,
}: PositionLabelArrayOptions): ReactNode[] => {
  const [minimum, maximum] = typeof range === "number" ? [0, range] : range;
  const {
    fixedLabels,
    size = "default",
    appendedText = false,
    labelPosition = "inward",
    labelStyles,
    labelValueToFixed = 0,
  } = labelOptions;
  const requestedCount = labelOptions.numberOfLabels ?? fixedLabels?.length ?? 5;
  const count = Math.max(2, Math.floor(requestedCount));
  const fontScale = size === "small" ? 0.5 : size === "large" ? 0.75 : 0.6;
  const fontSize = Math.max(10, progressFillerWidth * fontScale);
  const inset =
    labelPosition === "inside"
      ? progressFillerWidth * 0.2
      : labelPosition === "outward"
        ? -progressFillerWidth * 0.3
        : progressFillerWidth * 0.35;
  const radiusX = Math.max(0, containerWidth / 2 - inset);
  const radiusY = Math.max(0, containerHeight - inset);
  const suffix =
    appendedText === false
      ? ""
      : appendedText ?? (minimum === 0 && maximum === 100 ? "%" : "");

  return Array.from({ length: count }, (_, index) => {
    const ratio = index / (count - 1);
    const angle = Math.PI * (1 - ratio);
    const left = containerWidth / 2 + radiusX * Math.cos(angle);
    const top = containerHeight - radiusY * Math.sin(angle);
    const transform =
      index === 0
        ? "translateY(-50%)"
        : index === count - 1
          ? "translate(-100%, -50%)"
          : "translate(-50%, -50%)";
    const value = minimum + (maximum - minimum) * ratio;
    const label = fixedLabels?.[index] ?? value.toFixed(labelValueToFixed);
    const style: CSSProperties = {
      left,
      top,
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
