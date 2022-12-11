import { getPostFromSlug, getSlugs } from "../../functions/loadPosts";
import { category2color } from "../../functions/category2color";
import MDXComponents from "../../components/MDXComponents";
import LayoutPage from "../../layouts/LayoutPage";
import { MDXRemote } from "next-mdx-remote";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }) {
  return (
    <LayoutPage showTheme={true}>
      <div className="mb-10">
        <h1 className="font-bold text-5xl md:text-7xl mb-2">
          {frontMatter.title}
        </h1>
        <div className="flex space-x-2 text-secondary">
          <p>{frontMatter.date}</p>
          <p>•</p>
          <div className="flex space-x-1">
            <p style={{ color: `${category2color[frontMatter.category]}` }}>
              ■
            </p>
            <p>{frontMatter.category}</p>
          </div>
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
