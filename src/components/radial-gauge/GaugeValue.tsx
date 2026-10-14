import type { CSSProperties, FunctionComponent } from "react";
import type {
  GaugeValue as GaugeValueNumber,
  GaugeValueOptions,
  Range,
} from "./types";

interface GaugeValueProps {
  valueOptions: GaugeValueOptions;
  value: GaugeValueNumber;
  range: Range;
  containerWidth: number;
  progressFillerWidth: number;
}

export const defaultGaugeValueOptions: GaugeValueOptions = {
  containerStyles: {
    color: "#e7ebf5",
  },
  valueTextStyles: {
    color: "#e7ebf5",
  },
  appendedTextStyles: {},
  verticalPosition: "center",
};

const GaugeValueDisplay: FunctionComponent<GaugeValueProps> = ({
  valueOptions,
  value,
  range,
  containerWidth,
  progressFillerWidth,
}) => {
  const {
    reactNode,
    appendedText,
    verticalPosition = "center",
    toFixedAmount = 0,
    containerStyles,
    valueTextStyles,
    appendedTextStyles,
  } = valueOptions;
  const fontSize = `${containerWidth / 12}px`;
  const top =
    verticalPosition === "center"
      ? "50%"
      : verticalPosition === "bottom"
        ? `calc(100% - (${fontSize} * 1.35))`
        : `calc(${progressFillerWidth}px + ${fontSize})`;
  const style: CSSProperties = {
    top,
    transform: verticalPosition === "center" ? "translateY(-50%)" : undefined,
    fontSize,
    ...containerStyles,
  };
  const normalizedRange = typeof range === "number" ? [0, range] : range;
  const suffix =
    appendedText ??
    (normalizedRange[0] === 0 && normalizedRange[1] === 100 ? "%" : "");

  return (
    <div className="absolute z-10 block w-full text-center font-light font-sans" style={style}>
      {reactNode ?? (
        <>
          <span style={valueTextStyles}>{value.toFixed(toFixedAmount)}</span>
          {suffix && (
            <span
              className="text-inherit"
              style={{
                fontSize: `calc(${fontSize} * 0.8)`,
                ...appendedTextStyles,
              }}
            >
              {suffix}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default GaugeValueDisplay;
