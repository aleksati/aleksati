// import PostListSmall from "../templates/PostListSmall";
import PostList from "../templates/PostList";
import LayoutPage from "../layouts/LayoutPage";
// import About from "../templates/About";
import { GetStaticProps } from "next";

type Props = {
  frontMatterList: FrontMatterList;
  keywords: string[];
};

export default function handler({ frontMatterList, keywords }: Props) {
  return (
    <LayoutPage pageMeta={{ title: "", keywords }}>
      {/* <About /> */}
      {/* <div className="py-4"> */}
      <h2 className="hidden md:flex font-bold mb-6 pb-2 border-b border-secondary-light dark:border-secondary-dark">latest</h2>
      {/* <PostListSmall frontMatterList={frontMatterList} /> */}
      <PostList frontMatterList={frontMatterList} showType={true} />
      {/* </div> */}
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
  const frontMatterList: FrontMatterList = frontMatterListCache.slice(0, 4);
  const keywords: string[] = getKeysFromFr(frontMatterListCache);

  return { props: { frontMatterList, keywords } };
};
