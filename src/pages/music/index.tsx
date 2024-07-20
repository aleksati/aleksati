import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";
import { GetStaticProps } from "next";

let page: string = "music";

type Props = {
  frontMatterList: FrontMatterList;
  keywords: string[];
};

export default function handler({ frontMatterList, keywords }: Props) {
  return (
    <LayoutPage
      pageMeta={{
        title: page,
        keywords,
      }}>
      <PostList frontMatterList={frontMatterList} />
    </LayoutPage>
  );
}

import { getKeysFromFr, getAllFr, sortFrByDate } from "../../functions/loadPosts";
import { frontMatterListCache } from "../../cache/frontmatterlist";
import { dev, NAV_TABS } from "../../config";

export const getStaticProps: GetStaticProps = async () => {
  let frontMatterList: FrontMatterList;

  if (dev) {
    // in dev
    frontMatterList = getAllFr(NAV_TABS[page]);
  } else {
    // in production
    frontMatterList = frontMatterListCache.filter((fr) => fr.type === page);
    frontMatterList = sortFrByDate(frontMatterList);
  }

  const keywords = getKeysFromFr(frontMatterList);
  return { props: { frontMatterList, keywords } };
};
