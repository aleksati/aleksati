import Footer from "../templates/Footer";

const LayoutApp = ({ children }) => {
  return (
    <>
      <main className="flex-grow text-primary-light dark:text-primary-dark bg-primary-light dark:bg-primary-dark">
        {children}
      </main>
      <Footer author={"Aleksander Tidemann"} date={new Date().getFullYear()} />
    </>
  );
};

export default LayoutApp;
