import { useTheme } from "next-themes";

interface ThemeProps extends Object {
  currTheme: string;
  setTheme: (theme: string) => void;
}

const GetCurrTheme = (): ThemeProps => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currTheme: string = theme === "system" ? systemTheme : theme;
  return { currTheme, setTheme };
};

export default GetCurrTheme;
