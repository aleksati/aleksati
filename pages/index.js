import CategoryToggles from "../components/CategoryToggles";
import LayoutPage from "../layouts/LayoutPage";
import Nav from "../templates/Nav";

export default function Home() {
  return (
    <LayoutPage>
      <Nav />
      <CategoryToggles />
      <h1 className="text-2xl font-bold">Something about MusTech</h1>
      <p>hello world</p>
    </LayoutPage>
  );
}
