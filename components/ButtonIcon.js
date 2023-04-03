import Icon from "./Icon";

const ButtonIcon = (props) => {
  const { onClick, iconId, ...aProps } = props;
  return (
    <a {...aProps} onClick={onClick} className="hover:cursor-pointer">
      <Icon id={iconId} iconSize="text-md md:text-xl" />
    </a>
  );
};

export default ButtonIcon;
