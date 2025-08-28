// import PostListSmall from "../templates/PostListSmall";
import PostList from "../templates/PostList";
import LayoutPage from "../layouts/LayoutPage";
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
      <h2 className="flex md:flex font-bold mb-6 pb-2 border-b border-secondary-light dark:border-secondary-dark text-xl">
        Latest
      </h2>
      {/* <PostListSmall frontMatterList={frontMatterList} /> */}
      <PostList frontMatterList={frontMatterList} showType={true} />
      {/* <p className="pt-6">...</p> */}
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

  // get the 5 of the latest post/works
  const frontMatterList: FrontMatterList = frontMatterListCache; // frontMatterListCache.slice(0, 5); I used to filter this..
  const keywords: string[] = getKeysFromFr(frontMatterListCache);

  return { props: { frontMatterList, keywords } };
};
