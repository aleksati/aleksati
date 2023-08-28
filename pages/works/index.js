import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";

export default function handler({ frontMatter, keywords }) {
  return (
    <LayoutPage
      pageMeta={{
        title: "works",
        keywords,
      }}>
      <PostList frontMatter={frontMatter} />
    </LayoutPage>
  );
}

import {
  getKeysFromFr,
  getAllFr,
  sortFrByDate,
} from "../../functions/loadPosts";
import { frontMatterCache } from "../../cache/frontmatter";
import { dev, NAV_TABS } from "../../config";

export async function getStaticProps() {
  let frontMatter;

  if (dev) {
    // in dev
    frontMatter = getAllFr(NAV_TABS["works"]);
  } else {
    // in production
    frontMatter = frontMatterCache.filter((fr) => fr.type === "work");
    frontMatter = sortFrByDate(frontMatter);
  }

  const keywords = getKeysFromFr(frontMatter);
  return { props: { frontMatter, keywords } };
}
