import { getPostFromSlug, getSlugs } from "../../functions/loadPosts";
import MDXComponents from "../../components/MDXComponents";
import LayoutPage from "../../layouts/LayoutPage";
import { MDXRemote } from "next-mdx-remote";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }) {
  return (
    <LayoutPage showTheme={true} showBackButton={true}>
      <div className="pt-12">
        <div className="mb-12">
          <h1 className="font-bold text-7xl mb-2">{frontMatter.title}</h1>
          <div className="flex space-x-2 text-gray-500">
            <p>{frontMatter.date}</p>
            <p>•</p>
            <p>{frontMatter.category}</p>
            {/* <p>•</p>
            <p>{frontMatter.readingTime.text}</p> */}
          </div>
        </div>
        <div className="prose dark:prose-invert !container">
          <MDXRemote
            components={MDXComponents}
            frontmatter={frontMatter}
            {...mdxSource}
          />
        </div>
      </div>
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
