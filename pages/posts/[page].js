import {
  getAllFr,
  getPostFromSlug,
  getCatFromFr,
} from "../../functions/loadPosts";
import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";
import Post from "../../templates/Post";

export default function Posts(props) {
  // inject the categories of postlist or post into the <Head>
  const cat =
    props.type === "postlist" ? props.categories : props.frontMatter.categories;
  const catString = cat.join(", ");

  const pageMeta = {
    title: "tidemann.xyz",
    keywords: catString,
    description: "Official homepage of Aleksander Tidemann ",
    url: "unknown at this time",
  };

  return (
    <LayoutPage pageMeta={pageMeta}>
      {props.type === "postlist" ? (
        <PostList frontMatter={props.frontMatter} numbPages={props.numbPages} />
      ) : (
        <Post mdxSource={props.mdxSource} frontMatter={props.frontMatter} />
      )}
    </LayoutPage>
  );
}

export async function getStaticProps({ params }) {
  let type;
  if (parseInt(params.page)) {
    // if the path is a number, deliver a postlist
    type = "postlist";
    const currPage = parseInt(params.page);

    const fr = await getAllFr();
    // get number of pagination pages
    const lastItem = fr[fr.length - 1];
    const numbPages = lastItem.page;

    // get all used categories
    const categories = getCatFromFr(fr);

    // only include desired page (pagination)
    const frontMatter = fr.filter((item) => item.page === currPage);

    return { props: { frontMatter, numbPages, type, categories } };
  } else {
    // else, the path is slug, so deliver a post
    type = "post";
    const post = await getPostFromSlug(params.page);
    return { props: { ...post, type } };
  }
}

export async function getStaticPaths() {
  const frontMatter = await getAllFr();
  // get number of pagination pages
  const lastItem = frontMatter[frontMatter.length - 1];
  const numbPages = lastItem.page;

  // create array with rising numbers
  const numbPagesArray = Array.from(
    { length: numbPages },
    (_, i) => i + 1 + ""
  );
  const slugs = frontMatter.reduce((accum, fr) => [...accum, fr.slug], []);

  // combine pages and slugs
  // [ '1', '2', '3', 'helloworld', 'bender', 'lorem-ipsum' ]
  const paths = [...numbPagesArray, ...slugs];

  return {
    paths: paths.map((item) => ({ params: { page: item } })),
    fallback: false,
  };
}
