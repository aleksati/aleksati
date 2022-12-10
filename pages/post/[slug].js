import { getPostFromSlug, getSlugs } from "../../functions/loadPosts";
import MDXComponents from "../../components/MDXComponents";
import LayoutPage from "../../layouts/LayoutPage";
import { MDXRemote } from "next-mdx-remote";

export default function Post({ mdxSource, frontMatter }) {
  return (
    <LayoutPage showSearchAndTheme={true}>
      <MDXRemote
        components={MDXComponents}
        frontmatter={frontMatter}
        {...mdxSource}
      />
    </LayoutPage>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPostFromSlug(params.slug);

  return { props: post };
}

export async function getStaticPaths() {
  const slugs = await getSlugs();

  return {
    paths: slugs.map((s) => ({ params: { slug: s } })),
    fallback: false,
  };
}
