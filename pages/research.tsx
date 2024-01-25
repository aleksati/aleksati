import LayoutPage from "../layouts/LayoutPage";
import Research from "../templates/Research";
import { GetStaticProps } from "next";

export default function handler() {
  return (
    <LayoutPage pageMeta={{ title: "research" }}>
      <Research />
    </LayoutPage>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

// export async function getServerSideProps(context) {
//   try {
//     const url = "https://api.cristin.no/v2/persons/1213045/results";
//     const res = await fetch(url);
//     const data = await res.json();

//     const data_cleaned = cleanCristinData(data);

//     return { props: { data_cleaned } };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// }
