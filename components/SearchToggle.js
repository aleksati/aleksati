import Icon from "./Icon";

const SearchToggle = ({ onSearchToggle, iconId }) => (
  <a onClick={onSearchToggle}>
    <Icon id={iconId} iconSize="text-md md:text-xl" />
  </a>
);

export default SearchToggle;
