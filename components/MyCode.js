import { Prism } from "@mantine/prism";

const MyCode = ({ children }) => {
  return (
    <pre>
      <code className="python">{children}</code>
    </pre>
  );
};

export default MyCode;
