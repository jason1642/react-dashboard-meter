import type { CSSProperties, FunctionComponent } from "react";
import type {
  LabelOptions,
  maxValues,
  ProgressBarOptions,
  range,
} from "./RadialGauge.types";
import Labels from "./Labels";

interface ProgressBarFillerProps {
  maxValues: maxValues;
  innerAreaSize: number;
  range: range;
  progressBarOptions?: ProgressBarOptions;
  labelOptions: LabelOptions;
  progressFillerWidth: number;
  percentFilled: number;
  innerAreaColor: string;
}

const ProgressBarFiller: FunctionComponent<ProgressBarFillerProps> = ({
  labelOptions,
  range,
  progressBarOptions,
  maxValues,
  innerAreaSize,
  innerAreaColor,
  progressFillerWidth,
  percentFilled,
}) => {
  const colors = progressBarOptions?.fillerTriColors;
  const gradientColors = Array.isArray(colors)
    ? colors.filter(Boolean).join(", ")
    : colors
      ? `${colors}, ${colors}`
      : "#16a34a, #facc15, #ef4444";
  const style: CSSProperties = {
    width: maxValues.maxWidth,
    height: maxValues.maxHeight,
    background: `linear-gradient(${percentFilled * 1.8}deg, transparent 50%, ${progressBarOptions?.emptyAreaColor ?? "#a79898"} 0) top / 100% 200%, linear-gradient(to right, ${gradientColors})`,
  };
  const innerAreaStyle: CSSProperties = {
    width: `${innerAreaSize}%`,
    height: `${innerAreaSize}%`,
    backgroundColor: innerAreaColor,
  };

  return (
    <div
      className="relative block overflow-visible rounded-[50%_50%_0%_0%/100%_100%_0%_0%]"
      style={style}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 z-[3] flex -translate-x-1/2 rounded-[50%_50%_0%_0%/100%_100%_0%_0%]"
        style={innerAreaStyle}
      />
      <Labels
        progressFillerWidth={progressFillerWidth}
        containerHeight={maxValues.maxHeight}
        containerWidth={maxValues.maxWidth}
        labelOptions={labelOptions}
        range={range}
      />
    </div>
  );
};

export default ProgressBarFiller;
