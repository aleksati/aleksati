import React, { useEffect, useState, useRef } from "react";
import { useIsMounted } from "./useIsMounted";

export const useClickOutside = <T extends HTMLElement>(): [
  React.MutableRefObject<T>,
  boolean
] => {
  const [isClickOutside, setIsClickOutside] = useState<boolean>(false);

  // define and use mount state to solve following issue:
  // NavVertical closes immediatley after it is toggled.
  // i.e we dont want to evaluate the first click on the menu icon
  const [isMounted, setIsMounted] = useIsMounted();
  const ref = useRef<T>(null);

  // Event because I pass it to a eventListener.
  const handleClick = (e: Event): void => {
    e.preventDefault();
    const item = e.target as T;
    const parent = item.parentNode as HTMLElement;

    // I have to explicitly make sure that the vertical navbare does
    // NOT close when hitting the theme button on mobile view. For
    // this to work, I added id="button-theme" to the theme button
    // <Icon/> component.
    const isThemeBtnPress: boolean =
      item.id === "button-theme" || parent?.id === "button-theme";

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
  }, [ref, isMounted, handleClick]);

  return [ref, isClickOutside];
};
