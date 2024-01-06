import PostListSmall from "../templates/PostListSmall";
import LayoutPage from "../layouts/LayoutPage";
import About from "../templates/About";

export default function handler({ latestFrontMatter, keywords }) {
  return (
    <LayoutPage pageMeta={{ title: "about", keywords }}>
      <About />
      <div className="py-4 border-t border-secondary-light dark:border-secondary-dark rounded-sm">
        <h1 className="font-bold text-2xl mb-4">Latest</h1>
        <PostListSmall frontMatter={latestFrontMatter} />
      </div>
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
