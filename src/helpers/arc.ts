export type ArcShape = "half-circle" | "three-quarter";

export interface ArcGeometry {
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

export const getArcPoint = (
  geometry: ArcGeometry,
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
  geometry: ArcGeometry,
  progress = 100,
): string => {
  const boundedProgress = Math.max(0, Math.min(100, progress));
  if (boundedProgress === 0) return "";

  const start = getArcPoint(geometry, geometry.startAngle);
  const sweep = geometry.sweepAngle * boundedProgress / 100;
  const end = getArcPoint(geometry, geometry.startAngle + sweep);
  const largeArc = sweep > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${geometry.radius} ${geometry.radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};

export const getArcSegmentPath = (
  geometry: ArcGeometry,
  startPercent: number,
  endPercent: number,
): string => {
  const start = Math.max(0, Math.min(100, startPercent));
  const end = Math.max(start, Math.min(100, endPercent));
  if (end <= start) return "";

  const startAngle = geometry.startAngle + geometry.sweepAngle * start / 100;
  const sweep = geometry.sweepAngle * (end - start) / 100;
  const from = getArcPoint(geometry, startAngle);
  const to = getArcPoint(geometry, startAngle + sweep);
  return `M ${from.x} ${from.y} A ${geometry.radius} ${geometry.radius} 0 ${sweep > 180 ? 1 : 0} 1 ${to.x} ${to.y}`;
};
