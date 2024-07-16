// My custom <h1 /> HTML tag for MDX posts.
// automatically converts the title text in readable id to enable
// navigation through a TOC (link to it using my <MyLink /> component)

const MyH2 = ({ children, ...h2Props }: MyTextProps<React.ComponentPropsWithoutRef<"h2">>) => {
  // convert all spaces to "-" and text to lowercase.
  const childID: string = children.toLowerCase().split(" ").join("-");

  return (
    <h2 id={childID} className="font-bold pt-4 text-xl mb-2" {...h2Props}>
      {children}
    </h2>
  );
};

export default MyH2;
