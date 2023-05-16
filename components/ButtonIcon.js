import Icon from "./Icon";
import React from "react";

const ButtonIcon = React.forwardRef(function (props, ref) {
  const { onClick, iconId, iconSize, ...aProps } = props;
  return (
    <a
      {...aProps}
      ref={ref}
      onClick={onClick}
      className="hover:cursor-pointer z-20">
      <Icon id={iconId} iconSize={iconSize} />
    </a>
  );
});

// React.displayName = "";

export default ButtonIcon;
