import LayoutPage from "../../../layouts/LayoutPage";
import Post from "../../../templates/Post";

export default function handler({ frontMatter, mdxSource }) {
  return (
    <LayoutPage
      pageMeta={{
        title: frontMatter.title,
        keywords: frontMatter.keywords.join(", "),
      }}>
      <Post mdxSource={mdxSource} frontMatter={frontMatter} />
    </LayoutPage>
  );
}

import { getPostFromSlug, getAllFr } from "../../../functions/loadPosts";
import { frontMatterCache } from "../../../cache/frontmatter";
import { dev, NAV_TABS } from "../../../config";

export async function getStaticProps({ params }) {
  const post = await getPostFromSlug(NAV_TABS["posts"], params.post);
  return { props: { ...post } };
}

export async function getStaticPaths() {
  let frontMatter;
  if (dev) {
    // when in dev
    frontMatter = getAllFr(NAV_TABS["posts"]);
  } else {
    // when in production
    frontMatter = frontMatterCache.filter((fr) => fr.type === "post");
  }

  const slugs = frontMatter.reduce((accum, fr) => [...accum, fr.slug], []);

  // [ 'helloworld', 'bender', 'lorem-ipsum' ]
  const paths = [...slugs];

  return {
    paths: paths.map((item) => ({ params: { post: item } })),
    fallback: false,
  };
}
