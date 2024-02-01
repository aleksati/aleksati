import GoogleAnalytics from "../components/GoogleAnalytics";
import React from "react";

const LayoutApp = ({ children }: { children: React.ReactNode }) => (
  <>
    <GoogleAnalytics />
    <main className="flex-grow text-base text-primary-light dark:text-primary-dark bg-primary-light dark:bg-primary-dark">
      {children}
    </main>
  </>
);

export default LayoutApp;
