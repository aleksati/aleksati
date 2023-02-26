import { category2color } from "../categories/category2color";
import { category2text } from "../categories/category2text";
import MDXComponents from "../components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";

//https://tailwindcss.com/docs/typography-plugin

export default function Post({ mdxSource, frontMatter }) {
  return (
    <div>
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
      <div className="prose dark:prose-invert prose-h1:pt-4 prose-a:font-light prose-a:no-underline prose-a:text-blue-600 !container">
        <MDXRemote
          components={MDXComponents}
          frontmatter={frontMatter}
          {...mdxSource}
        />
      </div>
    </div>
  );
}
