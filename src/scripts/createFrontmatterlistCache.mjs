import matter from "gray-matter";
import path from "path";
import fs from "fs";

// gets called at build time from "package.json"

// get and store all the frontmatter for the blog posts and projects
// must be run in the root dir to work, "npm run ..."
// The getAllFr is a copy from "functions/loadPosts" but there is issues with ES importing
// So I just have a replicate function here.

const root = process.cwd() + "/src/writings";

console.log(root);

// sort by date
// SHOULD BE UPDATED, ONLY COMPARES STRINGS.
function sortFrByDate(fr) {
  const frSorted = fr.sort((a, b) => {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
    return 0;
  });
  return frSorted.reverse();
}

// gather all frontmatter data from mdx posts into correct format
function getAllFr(postType = "posts") {
  const paths = path.join(root, postType);
  const posts = fs.readdirSync(paths);

  const frontMatter = posts.reduce((accumFrontMatter, postSlug) => {
    const post = fs.readFileSync(path.join(root, postType, postSlug));
    const { data } = matter(post);

    return [
      {
        slug: postSlug.replace(".mdx", ""),
        // readingTime: readingTime(content),
        ...data,
      },
      ...accumFrontMatter,
    ];
  }, []);

  return frontMatter;
}

// gather all frontmatter and make one big list
const posts = getAllFr("posts");
const projects = getAllFr("projects");
const music = getAllFr("music");
const allFr = posts.concat(projects, music);

// sort by date
const allFrSorted = sortFrByDate(allFr);

const fileContents = `export const frontMatterListCache = ${JSON.stringify(
  allFrSorted
)}`;

// if the cache directory does not exist, create it
try {
  fs.readdirSync("./src/cache");
} catch (e) {
  fs.mkdirSync("./src/cache");
}

fs.writeFile("./src/cache/frontmatterlist.js", fileContents, (err) => {
  // writing to the frontmatter.js file
  if (err) return console.log(err);
  console.log("Frontmatter cached.");
});
