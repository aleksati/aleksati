import React from "react";

const selector = "#__next";

// used in Modal.js
// apparantly I do not need the scrollLock in the Navbar anymore
// scrollLock-compensation
function isiOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export const useScrollLock = () => {
  const scrollOffset = React.useRef(0);

  const lockScroll = React.useCallback(() => {
    const mainElement = document.querySelector(selector);

    mainElement.dataset.scrollLock = "true";
    // mainElement.style.overflow = "hidden";
    mainElement.style.paddingRight = "var(--scrollbar-compensation)";
    //mainElement.getBoundingClientRect().y;
    // mainElement.pageYOffset = "100px";
    window.pageYOffset = "100px";

    if (isiOS) {
      scrollOffset.current = window.pageYOffset;
      mainElement.style.position = "fixed";
      mainElement.style.top = `-${scrollOffset.current}px`;
      mainElement.style.width = "100%";
    }
  }, []);

  const unlockScroll = React.useCallback(() => {
    const mainElement = document.querySelector(selector);

    mainElement.style.overflow = "";
    mainElement.style.paddingRight = "";

    if (isiOS) {
      mainElement.style.position = "";
      mainElement.style.top = ``;
      mainElement.style.width = "";
      // window.scrollTo(0, scrollOffset.current);
    }

    delete mainElement.dataset.scrollLock;
  }, []);

  React.useEffect(() => {
    const mainElement = document.querySelector(selector);
    const scrollBarCompensation = window.innerWidth - mainElement.offsetWidth;
    mainElement.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarCompensation}px`
    );
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};

// import React from "react";
// function isiOS() {
//   return (
//     [
//       "iPad Simulator",
//       "iPhone Simulator",
//       "iPod Simulator",
//       "iPad",
//       "iPhone",
//       "iPod",
//     ].includes(navigator.platform) ||
//     // iPad on iOS 13 detection
//     (navigator.userAgent.includes("Mac") && "ontouchend" in document)
//   );
// }
// export const useScrollLock = () => {
//   const scrollOffset = React.useRef(0);
//   const lockScroll = React.useCallback(() => {
//     const main = document.querySelector("#__next");
//    mainElement.dataset.scrollLock = "true";
//    mainElement.style.overflow = "hidden";
//    mainElement.style.paddingRight = "var(--scrollbar-compensation)";
//     if (isiOS) {
//       scrollOffset.current = window.pageYOffset;
//      mainElement.style.position = "fixed";
//      mainElement.style.top = `-${scrollOffset.current}px`;
//      mainElement.style.width = "100%";
//     }
//   }, []);
//   const unlockScroll = React.useCallback(() => {
//    mainElement.style.overflow = "";
//    mainElement.style.paddingRight = "";
//     if (isiOS) {
//      mainElement.style.position = "";
//      mainElement.style.top = ``;
//      mainElement.style.width = "";
//       window.scrollTo(0, scrollOffset.current);
//     }
//     deletemainElement.dataset.scrollLock;
//   }, []);
//   React.useEffect(() => {
//     const scrollBarCompensation = window.innerWidth -mainElement.offsetWidth;
//    mainElement.style.setProperty(
//       "--scrollbar-compensation",
//       `${scrollBarCompensation}px`
//     );
//   }, []);
//   return {
//     lockScroll,
//     unlockScroll,
//   };
//};
