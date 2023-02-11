import getCurrTheme from "../functions/getCurrTheme";
import { useState, useEffect } from "react";
// import Link from "next/link";
import Icon from "./Icon";

const IconTheme = ({ tabOrder }) => {
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
      onClick={handleClick}
      // tabOrder={tabOrder}
      className="flex items-start p-2 hover:cursor-pointer">
      <Icon id={currTheme === "dark" ? "sun" : "moon"} iconSize={"text-md"} />
    </a>
  );
};

export default IconTheme;
