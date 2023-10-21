import PostListItemSmall from "../components/PostListItemSmall";

const PostListSmall = ({ frontMatter }) => (
  <div className="py-4 border-t border-secondary-light dark:border-secondary-dark rounded-sm">
    <h1 className="font-bold text-2xl mb-4">Latest</h1>
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
  </div>
);

export default PostListSmall;
