import NavVerticalTabs from "./NavVerticalTabs";
import ButtonTheme from "./ButtonTheme";
import ButtonIcon from "./ButtonIcon";
import Search from "./Search";
import Link from "next/link";

const NavVertical = ({ onShowVerticalNav }) => {
  return (
    <div className="flex-none border-r border-secondary space-y-6 p-4 pt-4 min-h-screen items-start justify-start">
      <div className="items-center w-full justify-start space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center space-x-2">
            <Link href="/" className="font-bold text-base">
              aleksati.net
            </Link>
          </div>
          <ButtonTheme iconSize={"text-md"} />
        </div>
        <Search />
      </div>
      <div className="w-full">
        <NavVerticalTabs />
      </div>
    </div>
  );
};

export default NavVertical;
