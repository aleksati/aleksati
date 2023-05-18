import Icon from "./Icon";
import React from "react";

const ButtonIcon = React.forwardRef((props, ref) => {
  const { onClick, iconId, iconSize, ...aProps } = props;
  return (
    <div ref={ref} className="hover:cursor-pointer p-1 z-20" onClick={onClick}>
      <a {...aProps}>
        <Icon id={iconId} iconSize={iconSize} />
      </a>
    </div>
  );
});

ButtonIcon.displayName = "ButtonIcon";

export default ButtonIcon;
