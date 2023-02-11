import {
  getAllFr,
  getPostFromSlug,
  getSlugs,
} from "../../../functions/loadPosts";
import { category2color } from "../../../categories/category2color";
import { category2text } from "../../../categories/category2text";
import MDXComponents from "../../../components/MDXComponents";
import LayoutPage from "../../../layouts/LayoutPage";
import { MDXRemote } from "next-mdx-remote";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }) {
  return (
    <LayoutPage showTheme={true}>
      <div className="mb-10">
        <h1 className="font-bold text-4xl md:text-6xl mb-2">
          {frontMatter.title}
        </h1>
        <div className="flex space-x-2 text-secondary text-sm">
          <p>{frontMatter.date}</p>
          <div className="flex space-x-2">
            {[...frontMatter.categories].map((category) => (
              <div className="flex space-x-1" key={category}>
                <p style={{ color: `${category2color[category]}` }}>•</p>
                <p>{category2text[category]}</p>
              </div>
            ))}
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
  const frontMatter = await getAllFr();

  return {
    paths: frontMatter.map((item, i) => ({
      params: { page: item.page.toString(), slug: item.slug },
    })),
    fallback: false,
  };
}
