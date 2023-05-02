import { useEffect, useState } from "react";

export const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (e) => {
      if (e.key === targetKey) {
        e.preventDefault();
        setKeyPressed(true);
      }
    };

    const upHandler = (e) => {
      e.preventDefault();
      if (e.key === targetKey) {
        e.preventDefault();
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};
