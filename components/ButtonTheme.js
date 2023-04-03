import getCurrTheme from "../functions/getCurrTheme";
import { useState, useEffect } from "react";
// import Link from "next/link";
import Icon from "./Icon";
import ButtonIcon from "./ButtonIcon";

const ButtonTheme = ({ tabOrder }) => {
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
      onClick={handleClick}
      label="Toggle light or dark theme"
    />
  );
};

export default ButtonTheme;
