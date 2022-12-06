import { useEffect, useState, useRef } from "react";

export const useMouseHover = () => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);
    const node = ref && ref.current;

    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref]);

  return [ref, hovered];
};
