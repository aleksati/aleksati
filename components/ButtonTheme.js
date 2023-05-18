import getCurrTheme from "../functions/getCurrTheme";
import { useState, useEffect } from "react";
import ButtonIcon from "./ButtonIcon";

const ButtonTheme = ({ tabOrder, iconSize }) => {
  const [mounted, setMounted] = useState(false);
  const { currTheme, setTheme } = getCurrTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () =>
    currTheme === "dark" ? setTheme("light") : setTheme("dark");

  if (!mounted) return null;

  return (
    <ButtonIcon
      iconId={currTheme === "dark" ? "sun" : "moon"}
      label="Toggle light or dark theme"
      onClick={handleClick}
      iconSize={"text-lg"}
    />
  );
};

export default ButtonTheme;
