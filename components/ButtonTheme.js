import { useState, useEffect } from "react";
import getCurrTheme from "../functions/getCurrTheme";
import Icon from "../components/Icon";
import Button from "./Button";

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
    <a
      label="Toggle light or dark theme"
      tabOrder={tabOrder}
      onClick={handleClick}
      className="m-auto p-2 flex items-center hover:cursor-pointer"
    >
      <Icon iconSize={"text-xl"} id={currTheme === "dark" ? "sun" : "moon"} />
    </a>
  );
};

export default ButtonTheme;
