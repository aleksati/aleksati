import IconTheme from "./IconTheme";

const NavRight = () => {
  return (
    <>
      <input
        type="search"
        className="bg-primary-light dark:bg-primary-dark form-search rounded w-36 md:w-46 h-8"
        id="site-search"
        placeholder="&#x1F50E;&#xFE0E; search"
      />
      <IconTheme />
    </>
  );
};

export default NavRight;
