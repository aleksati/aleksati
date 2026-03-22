import { useEffect, useState, useRef, RefObject } from "react";

export const useMouseHover = <T extends HTMLElement = HTMLElement>(): [
  RefObject<T>,
  boolean
] => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

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
  }, []);

  return [ref, hovered];
};
