import PostListItemSmall from "../components/PostListItemSmall";

const PostListSmall = ({
  frontMatterList,
}: {
  frontMatterList: FrontMatterList;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {frontMatterList.map((frontMatter) => (
        <PostListItemSmall key={frontMatter.slug} {...frontMatter} />
      ))}
    </div>
  );
};

export default PostListSmall;
