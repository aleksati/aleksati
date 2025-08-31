import { GetStaticPaths, GetStaticProps } from "next";
import LayoutPage from "../../../layouts/LayoutPage";
import Post from "../../../templates/Post";

let page: string = "project";

export default function handler({ frontMatter, mdxSource, toc }: MDXPostProps) {
  return (
    <LayoutPage
      toc={toc}
      pageMeta={{
        title: frontMatter.title,
        keywords: frontMatter.keywords.join(", "),
        description: frontMatter.summary,
      }}>
      <Post mdxSource={mdxSource} frontMatter={frontMatter} />
    </LayoutPage>
  );
}

import { getPostFromSlug, getAllFr } from "../../../functions/loadPosts";
import { frontMatterListCache } from "../../../cache/frontmatterlist";
import { dev, NAV_TABS } from "../../../config";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.project as string;
  const post: MDXPostProps = await getPostFromSlug(NAV_TABS[page + "s"], slug);
  return { props: { ...post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let frontMatterList: FrontMatterList;
  if (dev) {
    // when in dev
    frontMatterList = getAllFr(NAV_TABS[page + "s"]);
  } else {
    // when in production
    frontMatterList = frontMatterListCache.filter((fr) => fr.type === page);
  }

  // [ 'helloworld', 'bender', 'lorem-ipsum' ]
  const slugs: string[] = frontMatterList.reduce(
    (accum, fr) => [...accum, fr.slug],
    []
  );

  return {
    paths: slugs.map((slug: string) => ({ params: { project: slug } })),
    fallback: false,
  };
};
