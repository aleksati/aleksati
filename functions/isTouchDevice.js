import { useEffect, useState } from "react";
// import * as rdd from 'react-device-detect'

function furtherDetectTouchDevice() {
  if (typeof window === "undefined") return false;
  const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  function mq(query) {
    return typeof window !== "undefined" && window.matchMedia(query).matches;
  }
  // @ts-ignore
  if (
    "ontouchstart" in window ||
    (window?.DocumentTouch && document instanceof DocumentTouch)
  )
    return true;
  const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
    ""
  ); // include the 'heartz' - https://git.io/vznFH
  return mq(query);
}

export default function isTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const {
      isAndroid,
      isIPad13,
      isIPhone13,
      isWinPhone,
      isMobileSafari,
      isTablet,
    } = require("react-device-detect");
    setIsTouch(
      isTouch ||
        isAndroid ||
        isIPad13 ||
        isIPhone13 ||
        isWinPhone ||
        isMobileSafari ||
        isTablet ||
        furtherDetectTouchDevice()
    );
  }, []);

  return isTouch;
}
