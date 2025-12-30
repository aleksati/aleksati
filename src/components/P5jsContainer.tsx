import React, { useEffect, useRef } from "react";
import { useIsMounted } from "../hooks/useIsMounted";
import p5Types from "p5";

// this was my savior:
// https://www.lloydatkinson.net/posts/2022/how-to-prevent-a-duplicated-canvas-when-using-p5-and-react-strict-mode/
// also, I put the v0.9.0 "p5.sound.js" sound library in a custom "../lib" folder.
// then i updated p5 to the newest version. I found this was the only way to make the sound library work with this current next/react/typescript version. This I found on some forum.
// I should try with the newest version also..?

const P5jsContainer: P5jsContainer = ({ sketch }) => {
  const [isMounted, setIsMounted] = useIsMounted();
  const parentRef = useRef<P5jsContainerRef>(null);

  useEffect(() => {
    if (!isMounted) return;

    let p5instance: p5Types;
    const initP5 = async () => {
      try {
        const p5 = (await import("p5")).default;
        await import("../lib/p5.sound");
        // await import("p5/lib/addons/p5.sound");
        new p5((p) => {
          sketch(p, parentRef.current);
          p5instance = p;
        });
      } catch (error) {
        console.log(error);
      }
    };

    initP5();

    return () => {
      p5instance.remove();
    };
  }, [isMounted, sketch]);

  // parent div of the Canvas p5 creates
  return <div className="pb-4" ref={parentRef}></div>;
};

export default P5jsContainer;
