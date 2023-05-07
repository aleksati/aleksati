import Icon from "./Icon";

const ButtonIcon = (props) => {
  const { onClick, iconId, iconSize, ...aProps } = props;
  return (
    <a {...aProps} onClick={onClick} className="hover:cursor-pointer z-20">
      <Icon id={iconId} iconSize={iconSize} />
    </a>
  );
};

export default ButtonIcon;
