import type { range, value } from "./RadialGauge.types";

export const calculatePercentFilled = (
  value: value,
  range: range,
): number | undefined => {
  const [minimum, maximum] = typeof range === "number" ? [0, range] : range;

  if (
    !Number.isFinite(value) ||
    !Number.isFinite(minimum) ||
    !Number.isFinite(maximum) ||
    minimum >= maximum ||
    value < minimum ||
    value > maximum
  ) {
    return undefined;
  }

  return ((value - minimum) / (maximum - minimum)) * 100;
};
