import PostListItemSmall from "../components/PostListItemSmall";

const PostListSmall = ({ frontMatter }) => (
  <div className="grid grid-cols-1 gap-4">
    {frontMatter.map((post) => (
      <PostListItemSmall
        key={post.slug}
        slug={post.slug}
        date={post.date}
        title={post.title}
        summary={post.summary}
        keywords={post.keywords}
        type={post.type}
      />
    ))}
  </div>
);

export default PostListSmall;
