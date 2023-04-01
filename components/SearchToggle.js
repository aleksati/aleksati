import Icon from "./Icon";

const SearchToggle = ({ onSearchToggle }) => (
  <a onClick={onSearchToggle}>
    <Icon id="search" iconSize="text-md md:text-xl" />
  </a>
);

export default SearchToggle;
