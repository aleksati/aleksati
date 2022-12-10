import Footer from "../templates/Footer";
import { useRouter } from "next/router";
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
      className="z-50 w-56 fixed min-h-screen bg-primary-light dark:bg-primary-dark border-r border-primary-light dark:border-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="py-4 flex flex-col min-h-screen justify-between">
        <div className="mx-auto space-y-4 w-1/2">
          <Link href="/" className="m-2 font-bold">
            Tidemann.is
          </Link>
          {tabs.map((tab) => (
            <MyLink key={tab} href={tab} type="page" active={tab === page}>
              {tab}
            </MyLink>
          ))}
        </div>

        <div className="text-sm flex items-center justify-center">
          <Footer
            author={"Aleksander Tidemann"}
            date={new Date().getFullYear()}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavVertikalDesktop;
