import { getPostFromSlug, getKeysFromFr } from "../../functions/loadPosts";
import { frontMatter } from "../../cache/frontmatter-cache";
import LayoutPage from "../../layouts/LayoutPage";
import PostList from "../../templates/PostList";
import Post from "../../templates/Post";

export default function Posts(props) {
  const { isPostList, frontMatter, mdxSource, numbPages, keywords } = props;

  // I inject keywords straight into the <Head>

  return (
    <LayoutPage
      pageMeta={{
        title: isPostList ? "posts" : frontMatter.title,
        keywords: isPostList ? keywords : frontMatter.keywords.join(", "),
      }}
      showSearch={isPostList}
    >
      {isPostList ? (
        <PostList frontMatter={frontMatter} numbPages={numbPages} />
      ) : (
        <Post mdxSource={mdxSource} frontMatter={frontMatter} />
      )}
    </LayoutPage>
  );
}

// enable URL pagination for posts. posts/1,2,3 etc are the postlists, posts/slug is the actual post.
// but this is overly complicated, i think... keep it simple

export async function getStaticProps({ params }) {
  let isPostList;
  if (parseInt(params.page)) {
    // if the path is a number, deliver a postlist
    isPostList = true;
    const currPage = parseInt(params.page);

    // get number of pagination pages
    const lastItem = frontMatter[frontMatter.length - 1];
    const numbPages = lastItem.page;

    // get all used keywords in array
    const keywords = getKeysFromFr(frontMatter);

    // only include desired page (pagination)
    // const frontMatterFiltered = fr.filter((item) => item.page === currPage);

    return { props: { frontMatter, numbPages, isPostList, keywords } };
  } else {
    // else, the path is slug, so deliver a post
    isPostList = false;
    const post = await getPostFromSlug(params.page);
    return { props: { ...post, isPostList } };
  }
}

export async function getStaticPaths() {
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
