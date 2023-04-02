import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";

export default function handler({ frontMatter, keywords }) {
  // I inject keywords straight into the <Head>
  return (
    <LayoutPage
      pageMeta={{
        title: "posts",
        keywords,
      }}
    >
      <PostList frontMatter={frontMatter} />
    </LayoutPage>
  );
}

import { frontMatter } from "../../cache/frontmatter-cache";
import { getKeysFromFr } from "../../functions/loadPosts";

export async function getStaticProps() {
  // get all used keywords in array
  const keywords = getKeysFromFr(frontMatter);
  return { props: { frontMatter, keywords } };
}
