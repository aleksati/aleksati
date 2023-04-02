const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const readingTime = require("reading-time");

// get and store all the frontmatter for the blog posts.
// must be run in the root dir to work, "npm run ..."

const root = process.cwd();
const postFolder = "posts";

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
function getAllFr() {
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

  return JSON.stringify(frontMatter);
}

const fileContents = `export const frontMatter = ${getAllFr()}`;

// if the cache directory does not exist, create it
try {
  fs.readdirSync("cache");
} catch (e) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/frontmatter-cache.js", fileContents, (err) => {
  // writing to the posts-cache.js file
  if (err) return console.log(err);
  console.log("Frontmatter cached.");
});
