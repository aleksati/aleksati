// import Footer from "../templates/Footer";

const LayoutApp = ({ children }) => {
  return (
    <main className="flex-grow text-primary-light w-full dark:text-primary-dark bg-primary-light dark:bg-primary-dark">
      {children}
    </main>
  );
};

export default LayoutApp;
