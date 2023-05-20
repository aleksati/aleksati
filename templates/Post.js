import MDXComponents from "../components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import DateAndKeywordViewer from "../components/DateAndKeywordViewer";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }) {
  return (
    <>
      <div className="mb-4">
        {/*  text-2xl md:text-4xl */}
        <h1 className="font-bold leading-10 text-4xl mb-2">
          {frontMatter.title}
        </h1>
        <DateAndKeywordViewer
          date={frontMatter.date}
          keywords={[...frontMatter.keywords]}
        />
      </div>
      <div className="prose text-primary-light dark:text-primary-dark !container dark:prose-invert prose-ol:ml-4 prose-a:no-underline">
        <MDXRemote
          components={MDXComponents}
          frontmatter={frontMatter}
          {...mdxSource}
        />
      </div>
    </>
  );
}
