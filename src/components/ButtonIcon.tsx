import { forwardRef } from "react";
import Icon from "./Icon";

// any special prop other than the normal.
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  iconId: string;
  iconSize?: string;
}

// Ref type
type Ref = HTMLButtonElement;

const ButtonIcon = forwardRef<Ref, ButtonProps>(
  ({ iconId, iconSize, ...rest }, ref) => (
    <button ref={ref} className="hover:cursor-pointer p-1 z-20" {...rest}>
      <Icon id={iconId} iconSize={iconSize} />
    </button>
  )
);

export default ButtonIcon;
