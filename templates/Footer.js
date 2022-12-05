const Footer = ({ author, date }) => {
  return (
    <footer className="py-4 text-sm backdrop-brightness-95 text-primary-light dark:text-primary-dark">
      <div className="container flex items-center justify-center mx-auto space-y-2">
        <p>
          &copy; {date} {author}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
