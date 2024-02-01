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

// should be get MDX post from slug
export async function getPostFromSlug(
  postType: string = NAV_TABS["posts"],
  slug: string
): Promise<MDXPostProps> {
  const postPath: string = path.join(root, postType, `${slug}.mdx`);
  const post: string = fs.readFileSync(postPath, "utf-8");
  const { data, content } = matter(post);

  // turn it into HTML
  const mdxSource: MDXRemoteSerializeResult = await serialize(content);

  const frontMatter = {
    slug,
    ...(data as FrontMatter),
  };

  return {
    mdxSource,
    frontMatter,
  };
}
