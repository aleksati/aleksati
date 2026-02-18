import getCurrTheme from "../functions/getCurrTheme";
import ButtonIcon from "./ButtonIcon";
// import MyLink from "./MyLink";

const ButtonTheme = () => {
  const { currTheme, setTheme } = getCurrTheme();

  const handleButtonClick = () =>
    currTheme === "dark" ? setTheme("light") : setTheme("dark");

  // id has to be button-theme. Check useClickOutside.ts for more
  return (
    // <MyLink onClick={handleButtonClick} href="" type="nav">
    <div
      className="flex items-center space-x-1 hover:cursor-pointer"
      onClick={handleButtonClick}>
      <ButtonIcon
        iconId={currTheme === "dark" ? "sun" : "moon"}
        // onClick={handleButtonClick}
        iconSize="text-md"
        className="-pl-0.2"
        id="button-theme"
      />
      <p>Theme</p>
    </div>
    // </MyLink>
  );
};

export default ButtonTheme;
