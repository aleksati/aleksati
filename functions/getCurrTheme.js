import { useTheme } from "next-themes";

const getCurrTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currTheme = theme === "system" ? systemTheme : theme;
  return { currTheme, setTheme };
};

export default getCurrTheme;
