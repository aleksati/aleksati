import { getAllFr, getPostFromSlug } from "../../functions/loadPosts";
import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";
import Post from "../../templates/Post";

const pageMeta = {
  title: "tidemann.xyz",
  keywords:
    "music technology, music, software development, networked audio, programming",
  description: "Official homepage of Aleksander Tidemann ",
  url: "?",
};

export default function Posts(props) {
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

    // only include desired page (pagination)
    const frontMatter = fr.filter((item) => item.page === currPage);

    return { props: { frontMatter, numbPages, type } };
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
