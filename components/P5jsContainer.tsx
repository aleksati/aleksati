import React, { useEffect, useRef, useState } from "react";
// import P5Types from "p5";

const P5jsContainer = ({
  sketch,
}: {
  sketch: P5jsSketch;
}): React.JSX.Element => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>();
  let sketchCleanup: any;

  useEffect(() => {
    if (!isMounted) return;

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

    // cleanup
    return () => sketchCleanup;
    // if (parentRef.current) {
    //   parentRef.current = null;
    // }
  }, [isMounted, sketch]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // parent div of the Canvas p5 creates
  return <div ref={parentRef}></div>;
};

export default P5jsContainer;
