import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { GaugeShape, maxValues } from "./RadialGauge.types";
import { getGaugeHeight } from "./arcGeometry";

interface GaugeContainerProps {
  children: ReactNode;
  containerStyles?: CSSProperties;
  shape: GaugeShape;
  handleMaxValues: (maxValues: maxValues) => void;
}

const GaugeContainer = ({
  children,
  containerStyles,
  shape,
  handleMaxValues,
}: GaugeContainerProps) => {
  const gaugeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = gaugeRef.current;
    if (!element) return;

    const measure = () => {
      const maxWidth = element.clientWidth;
      if (maxWidth > 0) {
        handleMaxValues({ maxWidth, maxHeight: getGaugeHeight(maxWidth, shape) });
      }
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [handleMaxValues, shape]);

  const style: CSSProperties = {
    height: gaugeRef.current
      ? getGaugeHeight(gaugeRef.current.clientWidth, shape)
      : undefined,
    ...containerStyles,
  };

  return (
    <div
      ref={gaugeRef}
      className="relative block min-w-[150px] w-full bg-transparent"
      style={style}
    >
      {children}
    </div>
  );
};

export default GaugeContainer;
