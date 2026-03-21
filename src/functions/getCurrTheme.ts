import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeProps extends Object {
  currTheme: string;
  setTheme: (theme: string) => void;
}


const GetCurrTheme = (): ThemeProps => {
  const { systemTheme, theme, setTheme } = useTheme();
  // const currTheme: string = theme === "system" ? systemTheme : theme;
  const [currTheme, setCurrTheme] = useState<string>()

  useEffect(() => {
    setCurrTheme(theme === "system" ? systemTheme : theme)
  }, [systemTheme, theme, setTheme])


  return { currTheme, setTheme };
};

export default GetCurrTheme;
