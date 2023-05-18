import MDXComponents from "../components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import DateAndKeywordViewer from "../components/DateAndKeywordViewer";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }) {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-2xl md:text-4xl mb-2">
          {frontMatter.title}
        </h1>
        <DateAndKeywordViewer
          date={frontMatter.date}
          keywords={[...frontMatter.keywords]}
        />
      </div>
      <div className="prose text-base prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg !container dark:prose-invert prose-h1:pt-4 prose-ol:ml-4 prose-a:no-underline">
        <MDXRemote
          components={MDXComponents}
          frontmatter={frontMatter}
          {...mdxSource}
        />
      </div>
    </>
  );
}
