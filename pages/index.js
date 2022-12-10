import { getAllFrontMatter, getSlugs } from "../functions/loadPosts";
import PostListItem from "../components/PostListItem";
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

export default function Home({ data }) {
  return (
    <LayoutPage
      categories={categories}
      showSearchAndTheme={true}
      pageMeta={pageMeta}>
      <PostList>
        {data.map((post) => (
          <PostListItem
            key={post.slug}
            title={post.title}
            date={post.date}
            category={post.category}
            summary={post.summary}
            readingTime={post.readingTime}
          />
        ))}
      </PostList>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  const data = await getAllFrontMatter();
  return { props: { data } };
}
