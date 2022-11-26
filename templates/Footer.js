const Footer = ({ author, date }) => {
  return (
    <footer className="py-4 border-t font-sm text-primary-light dark:text-primary-dark bg-primary-light dark:bg-primary-dark">
      <div className="container flex items-center justify-center mx-auto space-y-2">
        <p>
          &copy; {date} {author}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
