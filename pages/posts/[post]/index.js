import LayoutPage from "../../../layouts/LayoutPage";
import Post from "../../../templates/Post";

export default function handler({ frontMatter, mdxSource }) {
  return (
    <LayoutPage
      pageMeta={{
        title: frontMatter.title,
        keywords: frontMatter.keywords.join(", "),
      }}
    >
      <Post mdxSource={mdxSource} frontMatter={frontMatter} />
    </LayoutPage>
  );
}

import { getPostFromSlug, getAllFr } from "../../../functions/loadPosts";

export async function getStaticProps({ params }) {
  const post = await getPostFromSlug("posts", params.post);
  return { props: { ...post } };
}

export async function getStaticPaths() {
  const allFrontMatter = getAllFr("posts");
  const slugs = allFrontMatter.reduce((accum, fr) => [...accum, fr.slug], []);

  // [ 'helloworld', 'bender', 'lorem-ipsum' ]
  const paths = [...slugs];

  return {
    paths: paths.map((item) => ({ params: { post: item } })),
    fallback: false,
  };
}
