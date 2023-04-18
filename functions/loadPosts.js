import MDXComponents from "../components/MDXComponents";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

const root = process.cwd();
const postFolder = "posts";

export function getSlugs() {
  const paths = path.join(root, postFolder);
  const posts = fs.readdirSync(paths);

  return posts.map((path) => {
    const pathContent = path.split("/");
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
}

// function addPagesToFr(fr) {
//   const frontMatter = fr.map((item, i) => ({
//     ...item,
//     page: Math.floor(i / paginationThresh) + 1,
//   }));
//   return frontMatter;
// }

// sort by date
function sortFrByDate(fr) {
  const frSorted = fr.sort((a, b) => {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
    return 0;
  });
  return frSorted.reverse();
}

// gather all frontmatter data from posts into correct format
export function getAllFr() {
  const paths = path.join(root, postFolder);
  const posts = fs.readdirSync(paths);

  const fr = posts.reduce((accumFrontMatter, postSlug) => {
    const post = fs.readFileSync(path.join(root, postFolder, postSlug));
    const { data, content } = matter(post);
    return [
      {
        slug: postSlug.replace(".mdx", ""),
        readingTime: readingTime(content),
        ...data,
      },
      ...accumFrontMatter,
    ];
  }, []);

  // sort by date
  const frontMatter = sortFrByDate(fr);
  return frontMatter;
}

// extract all used keywords in posts
export function getKeysFromFr(frontMatter) {
  const keywords_raw = frontMatter.reduce(
    (accum, fr) => [...fr.keywords, ...accum],
    []
  );

  // only unique values
  const keywords = [...new Set(keywords_raw)];

  return keywords;
}

export async function getPostFromSlug(slug) {
  const postPath = path.join(root, postFolder, `${slug}.mdx`);
  const post = fs.readFileSync(postPath, "utf-8");
  const { data, content } = matter(post);

  // turn it into HTML
  const mdxSource = await serialize(content, {
    components: MDXComponents,
  });

  return {
    mdxSource,
    frontMatter: {
      // wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}
