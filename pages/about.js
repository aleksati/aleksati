import PostListSmall from "../templates/PostListSmall";
import LayoutPage from "../layouts/LayoutPage";
import About from "../templates/About";

export default function handler({ frontMatterList, keywords }) {
  return (
    <LayoutPage pageMeta={{ title: "about", keywords }}>
      <About />
      <div className="py-4 border-t border-secondary-light dark:border-secondary-dark rounded-sm">
        <h1 className="font-bold text-2xl mb-6">Latest</h1>
        <PostListSmall frontMatterList={frontMatterList} />
      </div>
    </LayoutPage>
  );
}

import { getKeysFromFr } from "../functions/loadPosts";
import { frontMatterCache } from "../cache/frontmatter";

export async function getStaticProps() {
  // get the 3 latest post/works
  const frontMatterList = frontMatterCache.slice(0, 3);
  const keywords = getKeysFromFr(frontMatterCache);

  return { props: { frontMatterList, keywords } };
}
