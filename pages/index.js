import LayoutPage from "../layouts/LayoutPage";
import PostList from "../components/PostList";

const pageMeta = {
  title: "Aleksander Tidemann",
  keywords:
    "music technology, software development, networked music performance",
  description: "Official homepage of Aleksander Tidemann ",
  url: "?",
};

const categories = [
  {
    category: "network music",
    color: "category-one",
  },
  {
    category: "music tech",
    color: "category-two",
  },
  {
    category: "audio programming",
    color: "yellow-400",
  },
  {
    category: "software dev",
    color: "green-400",
  },
];

export default function Home() {
  return (
    <LayoutPage
      categories={categories}
      showSearchAndTheme={true}
      pageMeta={pageMeta}>
      <PostList categories={categories} />
    </LayoutPage>
  );
}
