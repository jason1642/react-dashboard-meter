import type { CSSProperties, FunctionComponent } from "react";
import type { range, TitleOptionProps } from "./RadialGauge.types";

interface TitleProps {
  titleOptions: TitleOptionProps;
  value: number;
  range: range;
  containerWidth: number;
  progressFillerWidth: number;
}

export const defaultTitleOptions: TitleOptionProps = {
  containerStyles: {
    color: "#e7ebf5",
  },
  valueTextStyles: {
    color: "#e7ebf5",
  },
  appendedTextStyles: {},
  verticalPosition: "center",
};

const Title: FunctionComponent<TitleProps> = ({
  titleOptions,
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
  } = titleOptions;
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

export default Title;
