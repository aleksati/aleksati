import ClientOnly from "./ClientOnly";

const PostList = ({ children }) => {
  return (
    <ClientOnly className="grid grid-cols-1 gap-12 pt-12">
      {/* <h1 className="font-bold text-7xl mb-8">latest posts</h1> */}
      {children}
    </ClientOnly>
  );
};

export default PostList;
