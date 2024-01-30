import React, { useEffect, useRef } from "react";
import { useIsMounted } from "../hooks/useIsMounted";

// this was my savior:
// https://www.lloydatkinson.net/posts/2022/how-to-prevent-a-duplicated-canvas-when-using-p5-and-react-strict-mode/
// also, I put the v0.9.0 "p5.sound.js" sound library in a custom "../lib" folder.
// then i updated p5 to the newest version. I found this was the only way to make the sound library work with this current next/react/typescript version. This I found on some forum.
// I should try with the newest version also..?

// TODO :
// 1. The sound hangs when going out of the page. should also quit the div?
// 2. The search is not limted to 5. Try "au"

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
