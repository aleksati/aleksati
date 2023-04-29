import { useCallback, useEffect, useState } from "react";
// import isTouchDevice from "../functions/isTouchDevice";
import ButtonIcon from "./ButtonIcon";

const ButtonScrollTo = ({ targetId, parentRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  // const isTouch = isTouchDevice();

  const detectParentInFullViewPort = useCallback(() => {
    if (parentRef.current) {
      const height = Math.floor(parentRef.current.getBoundingClientRect().y);
      setIsVisible(height < 0 ? true : false);
    }
  }, [parentRef]);

  const handleClick = () => {
    document.getElementById(targetId).scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", detectParentInFullViewPort);
    return () =>
      window.removeEventListener("scroll", detectParentInFullViewPort);
  }, [detectParentInFullViewPort]);
  // isTouch && isVisible
  if (isVisible) {
    return (
      <ButtonIcon iconId="upArrow" onClick={handleClick} label="Back to top" />
    );
  }

  return null;
};

export default ButtonScrollTo;
