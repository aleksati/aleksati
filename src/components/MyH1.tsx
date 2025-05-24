// My custom <h1 /> HTML tag for MDX posts.
// automatically converts the title text in readable id to enable
// navigation through a TOC (link to it using my <MyLink /> component)

const MyH1 = ({
  children,
  ...h1Props
}: MyTextProps<React.ComponentPropsWithoutRef<"h1">>) => {
  // convert all spaces to "-" and text to lowercase.
  const childID: string = children.toLowerCase().split(" ").join("-");

  return (
    <h1 id={childID} className="pt-8 font-bold text-2xl mb-2" {...h1Props}>
      {children}
    </h1>
  );
};

export default MyH1;
