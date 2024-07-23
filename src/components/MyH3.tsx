// My custom <h3 /> HTML tag for MDX posts.
// automatically converts the title text in readable id to enable
// navigation through a TOC (link to it using my <MyLink /> component)

const MyH3 = ({ children, ...h3Props }: MyTextProps<React.ComponentPropsWithoutRef<"h3">>) => {
  // convert all spaces to "-" and text to lowercase.
  const childID: string = children.toLowerCase().split(" ").join("-");

  console.log(childID);

  return (
    <h3 id={childID} className="font-bold pt-4 text-lg mb-2" {...h3Props}>
      {children}
    </h3>
  );
};

export default MyH3;
