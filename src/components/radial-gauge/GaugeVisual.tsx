import { useId, type CSSProperties, type FunctionComponent } from "react";
import type {
  GaugeShape,
  GaugeVariant,
  GaugeTicks,
  LabelOptions,
  GaugeDimensions,
  InnerAreaSize,
  ProgressBarOptions,
  Range,
} from "./types";
import { getArcPath, getArcPoint, getArcSegmentPath } from "../../helpers/arc";
import { getGaugeArcGeometry } from "./geometry";
import GaugeLabels from "./GaugeLabels";

interface GaugeVisualProps {
  dimensions: GaugeDimensions;
  innerAreaSize: InnerAreaSize;
  range: Range;
  shape: GaugeShape;
  variant: GaugeVariant;
  progressBarOptions?: ProgressBarOptions;
  labelOptions: LabelOptions;
  progressFillerWidth: number;
  percentFilled: number;
  roundedCaps: boolean;
  ticks: GaugeTicks;
  showTarget: boolean;
  target?: number;
}

const FALLBACK_COLORS = ["#34d399", "#fbbf24", "#fb7185"];

const GaugeVisual: FunctionComponent<GaugeVisualProps> = ({
  labelOptions,
  range,
  shape,
  variant,
  progressBarOptions,
  dimensions,
  innerAreaSize,
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
  const colorMode = progressBarOptions?.colorMode ?? "thresholds";
  const requestedStops = Array.isArray(colors)
    ? colors.filter(Boolean)
    : colors
      ? [colors, colors]
      : FALLBACK_COLORS;
  const stops = requestedStops.length > 0 ? requestedStops : FALLBACK_COLORS;
  const singleColor = progressBarOptions?.color ?? stops[0];
  const equalBoundaries = stops.slice(1).map((_, index) => ((index + 1) / stops.length) * 100);
  const requestedBoundaries = progressBarOptions?.thresholds;
  const hasValidBoundaries = requestedBoundaries?.length === stops.length - 1 &&
    requestedBoundaries.every((boundary, index) =>
      Number.isFinite(boundary) &&
      boundary > (index === 0 ? 0 : requestedBoundaries[index - 1]) &&
      boundary < 100,
    );
  const zoneBoundaries = hasValidBoundaries
    ? [0, ...requestedBoundaries!, 100]
    : stops.length === 3
      ? [0, 40, 75, 100]
      : [0, ...equalBoundaries, 100];
  const gradientStops = stops.map((color, index) => ({
    color,
    offset: stops.length === 1 ? "0%" : `${(index / (stops.length - 1)) * 100}%`,
  }));
  const geometry = getGaugeArcGeometry(
    dimensions.maxWidth,
    dimensions.maxHeight,
    shape,
    innerAreaSize,
    progressBarOptions?.thickness,
  );
  const fullPath = getArcPath(geometry);
  const activePath = getArcPath(geometry, percentFilled);
  const needleShowsProgress = variant === "needle" && shape === "three-quarter";
  const showsProgress = variant === "filled-arc" || needleShowsProgress;
  const trackColor = progressBarOptions?.emptyAreaColor ?? "#283244";
  const viewBox = `0 0 ${dimensions.maxWidth} ${dimensions.maxHeight}`;
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
  const needleTipRadius = geometry.radius - geometry.strokeWidth *
    (labelOptions.labelPosition === "inward" ? 1.05 : 0.85);
  const tip = getArcPoint(
    geometry,
    needleAngle,
    Math.max(geometry.strokeWidth * 0.2, needleTipRadius),
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
    width: dimensions.maxWidth,
    height: dimensions.maxHeight,
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

        {variant === "needle" && !needleShowsProgress ? (
          colorMode === "gradient" ? (
            <path
              d={fullPath}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeLinecap={cap}
              strokeWidth={geometry.strokeWidth}
            />
          ) : colorMode === "single-color" ? (
            <path
              d={fullPath}
              fill="none"
              stroke={singleColor}
              strokeLinecap={cap}
              strokeWidth={geometry.strokeWidth}
            />
          ) : (
            <>
              {stops.map((color, index) => {
                const segmentSize = 100 / stops.length;
                return (
                  <path
                    key={`needle-zone-${index}`}
                    d={getArcSegmentPath(geometry, index * segmentSize, (index + 1) * segmentSize)}
                    fill="none"
                    stroke={color}
                    strokeLinecap="butt"
                    strokeWidth={geometry.strokeWidth}
                  />
                );
              })}
            </>
          )
        ) : (
          <>
            <path
              d={fullPath}
              fill="none"
              stroke={trackColor}
              strokeLinecap={roundedCaps ? "round" : "butt"}
              strokeWidth={geometry.strokeWidth}
            />
            {activePath && colorMode === "gradient" && (
              <path
                d={activePath}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeLinecap={cap}
                strokeWidth={geometry.strokeWidth}
              />
            )}
            {activePath && colorMode === "single-color" && (
              <path
                d={activePath}
                fill="none"
                stroke={singleColor}
                strokeLinecap={cap}
                strokeWidth={geometry.strokeWidth}
              />
            )}
            {activePath && colorMode === "thresholds" &&
              stops.map((color, index) => {
                const segmentStart = zoneBoundaries[index];
                const segmentEnd = Math.min(percentFilled, zoneBoundaries[index + 1]);
                const visibleSize = segmentEnd - segmentStart;
                if (visibleSize <= 0) return null;
                return (
                  <path
                    key={`active-zone-${index}`}
                    d={getArcSegmentPath(geometry, segmentStart, segmentEnd)}
                    fill="none"
                    stroke={color}
                    strokeLinecap="butt"
                    strokeWidth={geometry.strokeWidth}
                  />
                );
              })}
          </>
        )}

        {colorMode === "thresholds" && stops.slice(1).map((_, index) => {
          const boundaryPercent = zoneBoundaries[index + 1];
          if (showsProgress && boundaryPercent > percentFilled) return null;
          const angle = geometry.startAngle + geometry.sweepAngle * boundaryPercent / 100;
          const from = getArcPoint(geometry, angle, geometry.radius - geometry.strokeWidth * 0.52);
          const to = getArcPoint(geometry, angle, geometry.radius + geometry.strokeWidth * 0.52);
          return (
            <line
              key={`zone-separator-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#111827"
              strokeWidth={Math.max(1.5, geometry.strokeWidth * 0.07)}
            />
          );
        })}

        {roundedCaps && colorMode === "thresholds" &&
          (showsProgress ? percentFilled > 0 : true) && (() => {
            const endPercent = showsProgress ? percentFilled : 100;
            const nextBoundaryIndex = zoneBoundaries.findIndex(
              (boundary, index) => index > 0 && endPercent <= boundary,
            );
            const endColorIndex = nextBoundaryIndex < 0
              ? stops.length - 1
              : nextBoundaryIndex - 1;
            const endAngle = geometry.startAngle + geometry.sweepAngle * endPercent / 100;
            const endPoint = getArcPoint(geometry, endAngle);
            const startPoint = getArcPoint(geometry, geometry.startAngle);
            const radius = geometry.strokeWidth / 2;
            return (
              <>
                <circle cx={startPoint.x} cy={startPoint.y} r={radius} fill={stops[0]} />
                <circle cx={endPoint.x} cy={endPoint.y} r={radius} fill={stops[endColorIndex]} />
              </>
            );
          })()}

        {(ticks === "labels-and-ticks" || ticks === "ticks-only") &&
          Array.from({ length: 21 }, (_, index) => {
            const isMajor = index % 5 === 0;
            const angle = geometry.startAngle + geometry.sweepAngle * index / 20;
            const innerOffset = geometry.strokeWidth * (isMajor ? 0.64 : 0.54);
            const outerOffset = geometry.strokeWidth * (isMajor ? 1.08 : 0.78);
            const from = getArcPoint(geometry, angle, geometry.radius + innerOffset);
            const to = getArcPoint(geometry, angle, geometry.radius + outerOffset);
            return (
              <line
                key={`tick-${index}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isMajor ? "#8491a8" : "#3f4b60"}
                strokeLinecap="round"
                strokeWidth={isMajor ? Math.max(1.5, geometry.strokeWidth * 0.075) : Math.max(1, geometry.strokeWidth * 0.04)}
              />
            );
          })}

        {showTarget && (
          <line x1={targetInner.x} y1={targetInner.y} x2={targetOuter.x} y2={targetOuter.y} stroke="#f8fafc" strokeWidth={Math.max(2, geometry.strokeWidth * 0.12)} />
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

      <GaugeLabels
        progressFillerWidth={progressFillerWidth}
        containerHeight={dimensions.maxHeight}
        containerWidth={dimensions.maxWidth}
        innerAreaSize={innerAreaSize}
        labelOptions={labelOptions}
        range={range}
        shape={shape}
        ticks={ticks}
      />
    </div>
  );
};

export default GaugeVisual;
