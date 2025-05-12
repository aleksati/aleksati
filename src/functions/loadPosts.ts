import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NAV_TABS } from "../config";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

const root: string = process.cwd() + "/src/writings";

// get slugs from the posts, works or music
export function getSlugs(postType: string = NAV_TABS["posts"]): string[] {
  const paths: string = path.join(root, postType);
  const posts: string[] = fs.readdirSync(paths);

  return posts.map((path: string) => {
    const pathContent: string[] = path.split("/");
    const fileName: string = pathContent[pathContent.length - 1];
    const [slug, _extension]: string[] = fileName.split(".");
    return slug;
  });
}

// sort by date
export function sortFrByDate(
  frontMatterList: FrontMatterList
): FrontMatterList {
  const frSorted = frontMatterList.sort((a, b) => {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
    return 0;
  });
  return frSorted.reverse();
}

// gather all frontmatter data from posts into correct format
export function getAllFr(
  postType: string = NAV_TABS["posts"]
): FrontMatterList {
  const paths: string = path.join(root, postType);
  const posts: string[] = fs.readdirSync(paths);

  const frontMatter: FrontMatterList = posts.reduce(
    (accumFrontMatter, postSlug) => {
      const post = fs.readFileSync(path.join(root, postType, postSlug));
      const { data } = matter(post); //const { data, content }
      return [
        {
          slug: postSlug.replace(".mdx", ""),
          // readingTime: readingTime(content),
          ...data,
        },
        ...accumFrontMatter,
      ];
    },
    []
  );

  // sort by date
  const allFrontMatter = sortFrByDate(frontMatter);
  return allFrontMatter;
}

// extract all used keywords in posts
export function getKeysFromFr(frontMatterList: FrontMatterList): string[] {
  const keywords_raw: string[] = frontMatterList.reduce(
    (accum, fr) => [...fr.keywords, ...accum],
    []
  );

  // only unique values
  const allKeywords: Set<string> = new Set<string>(keywords_raw);
  const uniques: string[] = Array.from(allKeywords);

  return uniques;
}

// extract only the TOC from each post. Only used in getPostFromSlug
function getTocFromSlug(markdown: string) {
  // const paths: string = path.join(root, postType);
  // const markdown: string = fs.readFileSync(
  //   path.join(paths, `${slug}.mdx`),
  //   "utf8"
  // );

  const lines = markdown.split("\n");
  const toc: object[] = [];
  
  let inCodeBlock: boolean = false;

  // for every line in my blogpost
  for (const line of lines) {

    // Toggle in/out of fenced code block
    if (/^```/.test(line.trim())) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    // Skip lines inside code blocks
    if (inCodeBlock) continue;

    // Skip inline HTML code blocks
    if (line.trim().startsWith('<pre') || line.trim().startsWith('</pre>')) {
      inCodeBlock = line.trim().startsWith('<pre');
      continue;
    }
    if (inCodeBlock) continue;

  // Match markdown headings (e.g., # Title)
    const match = line.match(/^(#{1,6})\s+(.*)/);

    if (match) {
      // strip the header size and text
      const depth = match[1].length;
      const text = match[2].replace(/[*_`~]/g, "").trim(); // Strip simple formatting
      toc.push({ depth, text });
    }
  }

  return toc;
}

// should be get MDX post from slug
export async function getPostFromSlug(
  postType: string = NAV_TABS["posts"],
  slug: string
): Promise<MDXPostProps> {
  const postPath: string = path.join(root, postType, `${slug}.mdx`);
  const post: string = fs.readFileSync(postPath, "utf-8");
  const { data, content } = matter(post);

  const toc = getTocFromSlug(post)

  // turn it into HTML
  const mdxSource: MDXRemoteSerializeResult = await serialize(content);

  const frontMatter = {
    slug,
    ...(data as FrontMatter),
  };

  return {
    frontMatter,
    mdxSource,
    toc
  };
}