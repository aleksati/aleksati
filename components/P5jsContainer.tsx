import React, { useEffect, useRef } from "react";

const P5jsContainer = ({
  sketch,
}: {
  sketch: P5jsSketch;
}): React.JSX.Element => {
  const renderRef = useRef<P5jsContainerRef>();

  useEffect(() => {
    const initp5 = async () => {
      try {
        const p5 = (await import("p5")).default;
        await import("../lib/p5.sound");
        new p5((p) => sketch<P5jsContainerRef>(p, renderRef));
      } catch (error) {
        console.log(error);
      }
    };

    initp5();

    // cleanup
    return () => {
      if (renderRef.current) {
        renderRef.current = null;
      }
    };
  }, [sketch]);

  // parent div of the Canvas p5 creates
  return <div ref={renderRef}></div>;
};

export default P5jsContainer;
