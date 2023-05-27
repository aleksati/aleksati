import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";

export default function handler({ frontMatter, keywords }) {
  return (
    <LayoutPage
      pageMeta={{
        title: "projects",
        keywords,
      }}>
      <PostList frontMatter={frontMatter} />
    </LayoutPage>
  );
}

import { getKeysFromFr, getAllFr } from "../../functions/loadPosts";

export async function getStaticProps() {
  // get frontMatter form all posts
  const frontMatter = getAllFr("projects");
  // get all used keywords in array
  const keywords = getKeysFromFr(frontMatter);
  return { props: { frontMatter, keywords } };
}
