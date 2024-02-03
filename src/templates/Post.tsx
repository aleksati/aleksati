import DateAndKeywordViewer from "../components/DateAndKeywordViewer";
import MDXComponents from "../components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }: MDXPostProps) {
  return (
    <>
      <div className="mb-6">
        {/*  text-2xl md:text-4xl */}
        <h1 className="font-bold leading-10 text-4xl mb-2">
          {frontMatter.title}
        </h1>
        <DateAndKeywordViewer
          date={frontMatter.date}
          keywords={[...frontMatter.keywords]}
          type={frontMatter.type}
        />
      </div>
      <div className="prose text-primary-light dark:text-primary-dark !container dark:prose-invert prose-a:font-normal prose-ol:ml-4">
        <MDXRemote
          components={MDXComponents}
          frontmatter={frontMatter}
          {...mdxSource}
        />
      </div>
    </>
  );
}
