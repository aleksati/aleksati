// My custom <p /> HTML tag for MDX posts. text-base for the size.

const MyP = ({ children, ...props }: MyTextProps<React.ComponentPropsWithoutRef<"p">>) => (
  <p {...props} className="text-base">
    {children}
  </p>
);

export default MyP;
