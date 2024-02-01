import PostListSmall from "../templates/PostListSmall";
import LayoutPage from "../layouts/LayoutPage";
import About from "../templates/About";
import { GetStaticProps } from "next";

type Props = {
  frontMatterList: FrontMatterList;
  keywords: string[];
};

export default function handler({ frontMatterList, keywords }: Props) {
  return (
    <LayoutPage pageMeta={{ title: "about", keywords }}>
      <About />
      <div className="py-4 border-t border-secondary-light dark:border-secondary-dark rounded-sm">
        <h1 className="font-bold text-2xl mb-6">Latest posts</h1>
        <PostListSmall frontMatterList={frontMatterList} />
      </div>
    </LayoutPage>
  );
}

import { generateRSS } from "../scripts/generateRSS";
import { getKeysFromFr } from "../functions/loadPosts";
import { frontMatterListCache } from "../cache/frontmatterlist";

export const getStaticProps: GetStaticProps = async () => {
  // generate RSS at site build.
  // I would love to do this as a pure script from package.json, but I cant import other modules from script folder. Common error with this Next version
  await generateRSS(frontMatterListCache);

  // get the 3 latest post/works
  const frontMatterList: FrontMatterList = frontMatterListCache.slice(0, 3);
  const keywords: string[] = getKeysFromFr(frontMatterListCache);

  return { props: { frontMatterList, keywords } };
};
