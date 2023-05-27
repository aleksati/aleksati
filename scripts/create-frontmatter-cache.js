const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
// const readingTime = require("reading-time");

// get and store all the frontmatter for the blog posts and projects
// must be run in the root dir to work, "npm run ..."
// Most of this code is a copy from "functions/loadPosts" but there is issus with ES importing it here

const root = process.cwd();
const postFolder = "posts";

// gather all frontmatter data from posts into correct format
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
const allFr = posts.concat(projects);

const fileContents = `export const frontMatterCache = ${JSON.stringify(allFr)}`;

// if the cache directory does not exist, create it
try {
  fs.readdirSync("cache");
} catch (e) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/frontmatter.js", fileContents, (err) => {
  // writing to the frontmatter.js file
  if (err) return console.log(err);
  console.log("Frontmatter cached.");
});
