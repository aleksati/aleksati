import NavRight from "../components/NavRight";
import NavLeft from "../components/NavLeft";

const Nav = () => {
  return (
    <nav className="z-50 p-4 mt-2 space-y-4" aria-label="Navbar" role="toolbar">
      <div className="grid grid-cols-2 items-end">
        <NavLeft />
        <NavRight />
      </div>
    </nav>
  );
};

export default Nav;
