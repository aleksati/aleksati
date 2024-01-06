import { useCallback, useEffect, useState } from "react";
// import isTouchDevice from "../functions/isTouchDevice";
import ButtonIcon from "./ButtonIcon";

const ButtonScrollTo = ({ targetId, pageTopRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  // const isTouch = isTouchDevice();

  const detectParentInFullViewPort = useCallback(() => {
    if (pageTopRef.current) {
      const height = Math.floor(pageTopRef.current.getBoundingClientRect().y);
      setIsVisible(height < 0 ? true : false);
    }
  }, [pageTopRef]);

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
