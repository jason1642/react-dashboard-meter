import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { GaugeDimensions } from "./types";
import { getGaugeHeight } from "./geometry";

interface GaugeContainerProps {
  children: ReactNode;
  containerStyles?: CSSProperties;
  onDimensionsChange: (dimensions: GaugeDimensions) => void;
}

const GaugeContainer = ({
  children,
  containerStyles,
  onDimensionsChange,
}: GaugeContainerProps) => {
  const gaugeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = gaugeRef.current;
    if (!element) return;

    const measure = () => {
      const maxWidth = element.clientWidth;
      if (maxWidth > 0) {
        onDimensionsChange({ maxWidth, maxHeight: getGaugeHeight(maxWidth) });
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
  }, [onDimensionsChange]);

  const style: CSSProperties = {
    height: gaugeRef.current
      ? getGaugeHeight(gaugeRef.current.clientWidth)
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
