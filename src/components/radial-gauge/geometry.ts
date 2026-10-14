import type { ArcGeometry, ArcShape } from "../../helpers/arc";

export const getGaugeHeight = (width: number): number => width * 0.72;

export const getGaugeArcGeometry = (
  width: number,
  height: number,
  shape: ArcShape,
  innerAreaSize: number,
): ArcGeometry => {
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
