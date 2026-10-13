import { useId, type CSSProperties, type FunctionComponent } from "react";
import type {
  GaugeShape,
  GaugeVariant,
  GaugeTicks,
  LabelOptions,
  maxValues,
  ProgressBarOptions,
  range,
} from "./RadialGauge.types";
import { getArcPath, getArcPoint, getGaugeArcGeometry } from "./arcGeometry";
import Labels from "./Labels";

interface ProgressBarFillerProps {
  maxValues: maxValues;
  innerAreaSize: number;
  range: range;
  shape: GaugeShape;
  variant: GaugeVariant;
  progressBarOptions?: ProgressBarOptions;
  labelOptions: LabelOptions;
  progressFillerWidth: number;
  percentFilled: number;
  innerAreaColor: string;
  roundedCaps: boolean;
  ticks: GaugeTicks;
  showTarget: boolean;
  target?: number;
}

const FALLBACK_COLORS = ["#34d399", "#fbbf24", "#fb7185"];

const ProgressBarFiller: FunctionComponent<ProgressBarFillerProps> = ({
  labelOptions,
  range,
  shape,
  variant,
  progressBarOptions,
  maxValues,
  innerAreaSize,
  innerAreaColor,
  progressFillerWidth,
  percentFilled,
  roundedCaps,
  ticks,
  showTarget,
  target,
}) => {
  const generatedId = useId().replace(/:/g, "");
  const gradientId = `radial-gauge-gradient-${generatedId}`;
  const colors = progressBarOptions?.fillerTriColors;
  const stops = Array.isArray(colors)
    ? colors.filter(Boolean)
    : colors
      ? [colors, colors]
      : FALLBACK_COLORS;
  const gradientStops = stops.map((color, index) => ({
    color,
    offset: stops.length === 1 ? "0%" : `${(index / (stops.length - 1)) * 100}%`,
  }));
  const geometry = getGaugeArcGeometry(
    maxValues.maxWidth,
    maxValues.maxHeight,
    shape,
    innerAreaSize,
  );
  const fullPath = getArcPath(geometry);
  const sectorPath = `${fullPath} L ${geometry.centerX} ${geometry.centerY} Z`;
  const activePath = getArcPath(geometry, percentFilled);
  const trackColor = progressBarOptions?.emptyAreaColor ?? "#a79898";
  const viewBox = `0 0 ${maxValues.maxWidth} ${maxValues.maxHeight}`;
  const cap = roundedCaps ? "round" : "butt";
  const [rangeMinimum, rangeMaximum] = typeof range === "number" ? [0, range] : range;
  const targetValue = target ?? (rangeMinimum + rangeMaximum) / 2;
  const targetPercent = Math.max(
    0,
    Math.min(100, ((targetValue - rangeMinimum) / (rangeMaximum - rangeMinimum)) * 100),
  );
  const targetAngle = geometry.startAngle + geometry.sweepAngle * targetPercent / 100;
  const targetInner = getArcPoint(geometry, targetAngle, geometry.radius - geometry.strokeWidth * 0.65);
  const targetOuter = getArcPoint(geometry, targetAngle, geometry.radius + geometry.strokeWidth * 0.65);

  const needleAngle =
    geometry.startAngle + (geometry.sweepAngle * percentFilled) / 100;
  const tip = getArcPoint(
    geometry,
    needleAngle,
    geometry.radius - geometry.strokeWidth * 0.85,
  );
  const radians = (needleAngle * Math.PI) / 180;
  const baseRadius = geometry.strokeWidth * 0.45;
  const halfBase = geometry.strokeWidth * 0.24;
  const baseCenter = {
    x: geometry.centerX + Math.cos(radians) * baseRadius,
    y: geometry.centerY + Math.sin(radians) * baseRadius,
  };
  const perpendicular = {
    x: -Math.sin(radians) * halfBase,
    y: Math.cos(radians) * halfBase,
  };
  const needlePoints = [
    `${tip.x},${tip.y}`,
    `${baseCenter.x + perpendicular.x},${baseCenter.y + perpendicular.y}`,
    `${baseCenter.x - perpendicular.x},${baseCenter.y - perpendicular.y}`,
  ].join(" ");
  const wrapperStyle: CSSProperties = {
    width: maxValues.maxWidth,
    height: maxValues.maxHeight,
  };

  return (
    <div className="absolute inset-0" style={wrapperStyle}>
      <svg
        aria-label={`${shape} ${variant} gauge, ${Math.round(percentFilled)}%`}
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        viewBox={viewBox}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            {gradientStops.map((stop) => (
              <stop
                key={`${stop.offset}-${stop.color}`}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </linearGradient>
        </defs>

        <path d={sectorPath} fill={innerAreaColor} />

        {(ticks === "labels-and-ticks" || ticks === "ticks-only") && Array.from({ length: 5 }, (_, index) => {
          const angle = geometry.startAngle + geometry.sweepAngle * index / 4;
          const from = getArcPoint(geometry, angle, geometry.radius - geometry.strokeWidth * 0.72);
          const to = getArcPoint(geometry, angle, geometry.radius + geometry.strokeWidth * 0.72);
          return <line key={`tick-${index}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#94a3b8" strokeWidth={Math.max(1, geometry.strokeWidth * 0.09)} />;
        })}

        {showTarget && (
          <line x1={targetInner.x} y1={targetInner.y} x2={targetOuter.x} y2={targetOuter.y} stroke="#f8fafc" strokeWidth={Math.max(2, geometry.strokeWidth * 0.12)} />
        )}

        {variant === "needle" ? (
          <path
            d={fullPath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeLinecap={cap}
            strokeWidth={geometry.strokeWidth}
          />
        ) : (
          <>
            <path
              d={fullPath}
              fill="none"
              stroke={trackColor}
              strokeLinecap={cap}
              strokeWidth={geometry.strokeWidth}
            />
            {activePath && (
              <path
                d={activePath}
                fill="none"
                pathLength={100}
                stroke={`url(#${gradientId})`}
                strokeDasharray={`${percentFilled} 100`}
                strokeLinecap={cap}
                strokeWidth={geometry.strokeWidth}
              />
            )}
          </>
        )}

        {variant === "needle" && (
          <>
            <polygon fill="#e7ebf5" points={needlePoints} />
            <circle
              cx={geometry.centerX}
              cy={geometry.centerY}
              fill="#e7ebf5"
              r={geometry.strokeWidth * 0.32}
            />
            <circle
              cx={geometry.centerX}
              cy={geometry.centerY}
              fill="#111827"
              r={geometry.strokeWidth * 0.12}
            />
          </>
        )}
      </svg>

      <Labels
        progressFillerWidth={progressFillerWidth}
        containerHeight={maxValues.maxHeight}
        containerWidth={maxValues.maxWidth}
        innerAreaSize={innerAreaSize}
        labelOptions={labelOptions}
        range={range}
        shape={shape}
        ticks={ticks}
      />
    </div>
  );
};

export default ProgressBarFiller;
