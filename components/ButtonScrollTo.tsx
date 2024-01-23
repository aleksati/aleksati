import React, { useCallback, useEffect, useState, forwardRef } from "react";
// import isTouchDevice from "../functions/isTouchDevice";
import ButtonIcon from "./ButtonIcon";

type Props = {
  targetId: string;
  // apparently, to pass the useRef as a simple prop, I need to Type it as mutableRefOject to access the current
  PageTopRef: React.MutableRefObject<HTMLDivElement>;
};

const ButtonScrollTo = ({ targetId, PageTopRef }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const isTouch = isTouchDevice();

  // show the scroll button when scrolling.
  const detectParentInFullViewPort = useCallback(() => {
    if (PageTopRef.current) {
      const height: number = Math.floor(
        PageTopRef.current.getBoundingClientRect().y
      );
      setIsVisible(height < 0 ? true : false);
    }
  }, [PageTopRef]);

  // add the scroll eventlistners
  useEffect(() => {
    window.addEventListener("scroll", detectParentInFullViewPort);
    return () =>
      window.removeEventListener("scroll", detectParentInFullViewPort);
  }, [detectParentInFullViewPort]);

  const handleButtonClick = () => {
    document.getElementById(targetId).scrollIntoView({
      behavior: "smooth",
    });
  };

  if (isVisible) {
    return <ButtonIcon iconId="upArrow" onClick={handleButtonClick} />;
  }

  return null;
};

export default ButtonScrollTo;
