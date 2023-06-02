import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";

export default function handler({ allFrontMatter, allKeywords }) {
  return (
    <LayoutPage
      pageMeta={{
        title: "posts",
        keywords: allKeywords.join(", "),
      }}
    >
      <PostList frontMatter={allFrontMatter} />
    </LayoutPage>
  );
}

import { getKeysFromFr, getAllFr } from "../../functions/loadPosts";

export async function getStaticProps() {
  // get frontMatter form all posts
  const allFrontMatter = getAllFr("posts");
  // get all used keywords in array
  const allKeywords = getKeysFromFr(allFrontMatter);
  return { props: { allFrontMatter, allKeywords } };
}
