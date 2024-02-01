import { Prism } from "@mantine/prism";
// import type { PrismProps } from "@mantine/prism";
import getCurrTheme from "../functions/getCurrTheme";

// docs:
// https://mantine.dev/others/prism/
// not anymore.

const MyCode = (props: any): React.JSX.Element => {
  let child = props.children;
  let childProps = child.props;
  let childPropsClass = childProps.className || "";

  const language = childPropsClass.replace(/language-/, "").toLowerCase();
  const code = childProps.children.trim();

  const { currTheme } = getCurrTheme();

  return (
    <Prism
      className="bg-primary-light dark:bg-primary-dark pb-4"
      language={language}
      colorScheme={currTheme as "dark" | "light"}>
      {code}
    </Prism>
  );
};

export default MyCode;
