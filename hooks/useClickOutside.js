import { useEffect, useState, useRef } from "react";

export const useClickOutside = () => {
  const [isClickOutside, setIsClickOutside] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && ref.current.contains(e.target))
        setIsClickOutside(false);
      console.log("click outside!");
      setIsClickOutside(true);
    };

    if (ref.current) {
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [ref]);

  return [ref, isClickOutside];
};
