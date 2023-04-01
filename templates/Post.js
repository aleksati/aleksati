import { keyword2color, keyword2text } from "../keywords/posts";
import MDXComponents from "../components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import { date2text } from "../functions/date2text";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }) {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-bold text-4xl md:text-6xl mb-2">
          {frontMatter.title}
        </h1>
        <div className="flex space-x-2 text-secondary flex-wrap text-xs md:text-sm">
          <p>{date2text(frontMatter.date)}</p>
          <div className="flex space-x-2">
            {[...frontMatter.keywords].map((keyword) => (
              <div className="flex space-x-1" key={keyword}>
                <p style={{ color: `${keyword2color[keyword]}` }}>•</p>
                <p>{keyword2text[keyword]}</p>
              </div>
            ))}
          </div>
          {/* <p>•</p>
            <p>{frontMatter.readingTime.text}</p> */}
        </div>
      </div>
      <div className="prose dark:prose-invert prose-h1:pt-4 prose-a:font-light prose-a:no-underline !container">
        <MDXRemote
          components={MDXComponents}
          frontmatter={frontMatter}
          {...mdxSource}
        />
      </div>
    </div>
  );
}
