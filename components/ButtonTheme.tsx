import getCurrTheme from "../functions/getCurrTheme";
import ButtonIcon from "./ButtonIcon";

const ButtonTheme = () => {
  const { currTheme, setTheme } = getCurrTheme();

  const handleButtonClick = () =>
    currTheme === "dark" ? setTheme("light") : setTheme("dark");

  // id has to be button-theme. Check useClickOutside.ts for more
  return (
    <ButtonIcon
      iconId={currTheme === "dark" ? "sun" : "moon"}
      onClick={handleButtonClick}
      iconSize="text-lg"
      id="button-theme"
    />
  );
};

export default ButtonTheme;
