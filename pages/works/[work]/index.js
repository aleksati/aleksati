import LayoutPage from "../../../layouts/LayoutPage";
import Post from "../../../templates/Post";

export default function handler(props) {
  const { frontMatter, mdxSource } = props;

  // I inject keywords straight into the <Head>
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
  const work = await getPostFromSlug(NAV_TABS["works"], params.work);
  return { props: { ...work } };
}

export async function getStaticPaths() {
  let frontMatter;
  if (dev) {
    // when in dev
    frontMatter = getAllFr(NAV_TABS["works"]);
  } else {
    // when in production
    frontMatter = frontMatterCache.filter((fr) => fr.type === "work");
  }

  const slugs = frontMatter.reduce((accum, fr) => [...accum, fr.slug], []);

  // [ 'helloworld', 'bender', 'lorem-ipsum' ]
  const paths = [...slugs];

  return {
    paths: paths.map((item) => ({ params: { work: item } })),
    fallback: false,
  };
}
