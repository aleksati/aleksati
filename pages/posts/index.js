import { getAllFrontMatter } from "../../functions/loadPosts";
import PostListItem from "../../components/PostListItem";
import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../components/PostList";

const pageMeta = {
  title: "tidemann.xyz",
  keywords: "music technology, software development, networked audio",
  description: "Official homepage of Aleksander Tidemann ",
  url: "?",
};

export default function Posts({ data, categories }) {
  return (
    <LayoutPage
      categories={categories}
      showSearch={true}
      showTheme={true}
      showPostFilter={true}
      pageMeta={pageMeta}>
      <PostList>
        {data.map((post) => (
          <PostListItem
            key={post.slug}
            slug={post.slug}
            date={post.date}
            title={post.title}
            categories={post.categories}
            summary={post.summary}
            readingTime={post.readingTime}
          />
        ))}
      </PostList>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  const { data, categories } = await getAllFrontMatter();
  return { props: { data, categories } };
}
