import { useRouter } from "next/router";
import IconTheme from "./IconTheme";
import MyLink from "./MyLink";
import Link from "next/link";

const tabs = ["posts", "projects", "research", "about"];

const NavVertikalDesktop = () => {
  const router = useRouter();
  const page = tabs.includes(router.pathname.slice(1))
    ? router.pathname.slice(1)
    : "";

  return (
    <nav
      className="z-50 fixed min-h-screen border-r border-secondary bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="py-4 flex flex-col min-h-screen px-12 items-start justify-between">
        <div className="space-y-4">
          <Link href="/" className="font-bold">
            Tidemann.is
          </Link>
          {/* <p className="text-sm italic">@aleksati</p> */}
          {tabs.map((tab) => (
            <MyLink key={tab} href={tab} type="page" active={tab === page}>
              {tab}
            </MyLink>
          ))}
        </div>

        <div className="flex items-center -ml-9">
          <IconTheme />
          <p className="">theme</p>
        </div>
      </div>
    </nav>
  );
};

export default NavVertikalDesktop;
