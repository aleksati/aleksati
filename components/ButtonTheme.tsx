import getCurrTheme from "../functions/getCurrTheme";
import ButtonIcon from "./ButtonIcon";

const ButtonTheme = () => {
  const { currTheme, setTheme } = getCurrTheme();

  const handleClick = () =>
    currTheme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <ButtonIcon
      iconId={currTheme === "dark" ? "sun" : "moon"}
      onClick={handleClick}
      iconSize={"text-lg"}
    />
  );
};

export default ButtonTheme;
