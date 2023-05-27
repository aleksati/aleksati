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

export async function getStaticProps({ params }) {
  const post = await getPostFromSlug("projects", params.project);
  return { props: { ...post } };
}

export async function getStaticPaths() {
  const frontMatter = getAllFr("projects");
  const slugs = frontMatter.reduce((accum, fr) => [...accum, fr.slug], []);

  // [ 'helloworld', 'bender', 'lorem-ipsum' ]
  const paths = [...slugs];

  return {
    paths: paths.map((item) => ({ params: { project: item } })),
    fallback: false,
  };
}