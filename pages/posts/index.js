import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";

export default function handler({ frontMatter, keywords }) {
  return (
    <LayoutPage
      pageMeta={{
        title: "posts",
        keywords: keywords.join(", "),
      }}>
      <PostList frontMatterList={frontMatter} />
    </LayoutPage>
  );
}

import { frontMatterCache } from "../../cache/frontmatter";
import { dev, NAV_TABS } from "../../config";
import {
  getKeysFromFr,
  getAllFr,
  sortFrByDate,
} from "../../functions/loadPosts";

export async function getStaticProps() {
  let frontMatter;

  if (dev) {
    // in dev
    frontMatter = getAllFr(NAV_TABS["posts"]);
  } else {
    // in production
    frontMatter = frontMatterCache.filter((fr) => fr.type === "post");
    frontMatter = sortFrByDate(frontMatter);
  }

  const keywords = getKeysFromFr(frontMatter);
  return { props: { frontMatter, keywords } };
}
