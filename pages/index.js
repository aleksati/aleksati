import PostListSmall from "../templates/PostListSmall";
import LayoutPage from "../layouts/LayoutPage";
import About from "../templates/About";

export default function handler({ latestFrontMatter, keywords }) {
  return (
    <LayoutPage pageMeta={{ title: "about", keywords }}>
      <About />
      <PostListSmall frontMatter={latestFrontMatter} />
    </LayoutPage>
  );
}

import generateRSS from "../scripts/generateRSS";
import { getKeysFromFr } from "../functions/loadPosts";
import { frontMatterCache } from "../cache/frontmatter";

export async function getStaticProps() {
  // generate RSS at site build
  await generateRSS(frontMatterCache);

  // get the 3 latest post/works
  const latestFrontMatter = frontMatterCache.slice(0, 3);
  const keywords = getKeysFromFr(frontMatterCache);

  return { props: { latestFrontMatter, keywords } };
}
