import { Prism } from "@mantine/prism";
import getCurrTheme from "../functions/getCurrTheme";

// docs:
// https://mantine.dev/others/prism/

const MyCode = (props) => {
  const className = props.children.props.className || "";
  const language = className.replace(/language-/, "").toLowerCase();
  const code = props.children.props.children.trim();
  const { currTheme } = getCurrTheme();

  return (
    <Prism
      className="bg-primary-light dark:bg-primary-dark"
      language={language}
      colorScheme={currTheme}
    >
      {code}
    </Prism>
  );
};

export default MyCode;
