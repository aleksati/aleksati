import React, { useEffect, useRef } from "react";
import { useIsMounted } from "../hooks/useIsMounted";

const P5jsContainer = ({
  sketch,
}: {
  sketch: P5jsSketch;
}): React.JSX.Element => {
  const [isMounted, setIsMounted] = useIsMounted();
  const parentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!isMounted) return;

    let sketchCleanup: () => void;

    const initp5 = async () => {
      try {
        const p5 = (await import("p5")).default;
        await import("../lib/p5.sound");
        new p5((p) => {
          const { cleanup } = sketch(p, parentRef.current);
          sketchCleanup = cleanup;
        });
      } catch (error) {
        console.log(error);
      }
    };

    initp5();

    return sketchCleanup;
  }, [isMounted, sketch]);

  // parent div of the Canvas p5 creates
  return <div ref={parentRef}></div>;
};

export default P5jsContainer;
