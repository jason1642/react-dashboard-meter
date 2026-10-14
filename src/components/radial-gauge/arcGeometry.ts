import type { GaugeShape } from "./RadialGauge.types";

export interface GaugeArcGeometry {
  centerX: number;
  centerY: number;
  radius: number;
  strokeWidth: number;
  startAngle: number;
  sweepAngle: number;
}

export interface Point {
  x: number;
  y: number;
}

export const getGaugeHeight = (width: number, _shape: GaugeShape): number =>
  width * 0.72;

export const getGaugeArcGeometry = (
  width: number,
  height: number,
  shape: GaugeShape,
  innerAreaSize: number,
): GaugeArcGeometry => {
  const startAngle = shape === "half-circle" ? 180 : 135;
  const sweepAngle = shape === "half-circle" ? 180 : 270;
  const arcHeight = shape === "half-circle" ? height - width * 0.22 : height;
  const availableRadius =
    shape === "half-circle"
      ? Math.min(width / 2, arcHeight)
      : Math.min(width / 2, height / 1.7072);
  const strokeWidth = Math.max(
    8,
    Math.min(width * 0.18, availableRadius * (1 - innerAreaSize / 100)),
  );
  const radius =
    shape === "half-circle"
      ? Math.max(1, Math.min(width / 2 - strokeWidth / 2, arcHeight - strokeWidth))
      : Math.max(
          1,
          Math.min(
            width / 2 - strokeWidth / 2,
            (height - strokeWidth) / 1.7072,
          ),
        );

  return {
    centerX: width / 2,
    centerY:
      shape === "half-circle"
        ? arcHeight + width * 0.08 - strokeWidth / 2
        : radius + strokeWidth / 2,
    radius,
    strokeWidth,
    startAngle,
    sweepAngle,
  };
};

export const getArcPoint = (
  geometry: GaugeArcGeometry,
  angle: number,
  radius = geometry.radius,
): Point => {
  const radians = (angle * Math.PI) / 180;
  return {
    x: geometry.centerX + radius * Math.cos(radians),
    y: geometry.centerY + radius * Math.sin(radians),
  };
};

export const getArcPath = (
  geometry: GaugeArcGeometry,
  progress = 100,
): string => {
  if (progress <= 0) return "";

  const start = getArcPoint(geometry, geometry.startAngle);
  const end = getArcPoint(
    geometry,
    geometry.startAngle + geometry.sweepAngle * Math.min(progress, 100) / 100,
  );
  const sweep = geometry.sweepAngle * Math.min(progress, 100) / 100;
  const largeArc = sweep > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${geometry.radius} ${geometry.radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};
