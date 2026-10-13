import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { maxValues } from "./RadialGauge.types";

interface GaugeContainerProps {
  children: ReactNode;
  containerStyles?: CSSProperties;
  handleMaxValues: (maxValues: maxValues) => void;
}

const GaugeContainer = ({
  children,
  containerStyles,
  handleMaxValues,
}: GaugeContainerProps) => {
  const gaugeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = gaugeRef.current;
    if (!element) return;

    const measure = () => {
      const maxWidth = element.clientWidth;
      if (maxWidth > 0) {
        handleMaxValues({ maxWidth, maxHeight: maxWidth / 2 });
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
  }, [handleMaxValues]);

  const style: CSSProperties = {
    height: gaugeRef.current ? gaugeRef.current.clientWidth / 2 : undefined,
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
