import { GetStaticProps } from "next";
import TheSunRightNow from "../templates/TheSunRightNow";

export default function handler() {
  return (
    <>
      <TheSunRightNow />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
