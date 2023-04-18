import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";

export default function handler({ frontMatter, keywords }) {
  // I inject keywords straight into the <Head>
  return (
    <LayoutPage
      pageMeta={{
        title: "posts",
        keywords,
      }}>
      <PostList frontMatter={frontMatter} />
    </LayoutPage>
  );
}

import { getKeysFromFr, getAllFr } from "../../functions/loadPosts";
// import { frontMatterCache } from "../../cache/frontmatter";
// import { dev } from "../../config";

export async function getStaticProps() {
  // get frontMatter form all posts
  const frontMatter = getAllFr();
  // get all used keywords in array
  const keywords = getKeysFromFr(frontMatter);
  return { props: { frontMatter, keywords } };
}
