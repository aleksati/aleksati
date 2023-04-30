import { useEffect, useState, useRef } from "react";

export const useClickOutside = () => {
  const [isClickOutside, setIsClickOutside] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);

  // define and use mount state to solve following issue:
  // NavVertical closes immediatley after it is toggled.
  // i.e we dont want to evaluate the first click.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //
  const handleClick = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
      setIsClickOutside(false);
      return;
    }
    setIsClickOutside(true);
  };

  useEffect(() => {
    if (ref.current && isMounted) {
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [ref, setIsClickOutside, isMounted]);

  return [ref, isClickOutside];
};
