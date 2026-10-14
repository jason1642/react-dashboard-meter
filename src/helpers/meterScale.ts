export type MeterRange = number | readonly [number, number];

export const getRangeBounds = (range: MeterRange): [number, number] =>
  typeof range === "number" ? [0, range] : [range[0], range[1]];

export const clampToRange = (value: number, range: MeterRange): number => {
  const [minimum, maximum] = getRangeBounds(range);
  return Math.max(minimum, Math.min(maximum, value));
};

export const valueToPercent = (
  value: number,
  range: MeterRange,
): number | undefined => {
  const [minimum, maximum] = getRangeBounds(range);
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(minimum) ||
    !Number.isFinite(maximum) ||
    minimum >= maximum
  ) {
    return undefined;
  }

  return ((clampToRange(value, range) - minimum) / (maximum - minimum)) * 100;
};
