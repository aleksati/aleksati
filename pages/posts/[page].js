import {
  getAllFr,
  getPostFromSlug,
  getKeyFromFr,
} from "../../functions/loadPosts";
import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";
import Post from "../../templates/Post";

export default function Posts(props) {
  const isPostList = props.type === "postlist";

  // for injecting the categories of postlist or post into the <Head>
  // const keywords = isPostList ? props.keywords : props.frontMatter.keywords;
  // const keyString = keywords.join(", ");

  return (
    <LayoutPage
      pageMeta={{
        title: isPostList ? "posts" : props.frontMatter.title,
      }}
      showSearch={isPostList}>
      {isPostList ? (
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

    // get all used keywords
    const keywords = getKeyFromFr(fr);

    // only include desired page (pagination)
    const frontMatter = fr.filter((item) => item.page === currPage);

    return { props: { frontMatter, numbPages, type, keywords } };
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
