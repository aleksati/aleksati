import { useEffect, useState, useRef } from "react";
import { useIsMounted } from "./useIsMounted";

export const useClickOutside = () => {
  const [isClickOutside, setIsClickOutside] = useState(false);

  // define and use mount state to solve following issue:
  // NavVertical closes immediatley after it is toggled.
  // i.e we dont want to evaluate the first click on the menu icon
  const [isMounted, setIsMounted] = useIsMounted();
  const ref = useRef(null);

  // if the ref.current matches the e.target
  const handleClick = (e) => {
    const item = e.target;

    // I have to explicitly make sure that the vertical navbare does
    // NOT close when hitting the theme button on mobile view. For
    // this to work, I added id="button-theme" to the theme button
    // <Icon/> component.
    const isThemeBtnPress =
      item.id === "button-theme" || item.parentNode?.id === "button-theme";

    if (ref.current && (ref.current.contains(item) || isThemeBtnPress)) {
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
