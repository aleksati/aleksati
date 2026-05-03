import LayoutPage from "../layouts/LayoutPage";
import Publications from "../templates/Publications";
import { GetStaticProps } from "next";
import { SITE_DOMAIN } from "../config";

export default function handler({publicationList, message}: {publicationList: PublicationList, message: string}) {
  return (
    <LayoutPage pageMeta={{ title: "publications" }}>
      <h2 className="flex md:flex font-bold mb-6 pb-2 border-b border-secondary-light dark:border-secondary-dark text-xl">
        Latest
      </h2>
      <Publications publicationList={publicationList} message={message} />
    </LayoutPage>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  let publicationList: PublicationList = [];
  let message: string = "";
  try{
    const res = await fetch(`${SITE_DOMAIN}/api/publications`);
    publicationList = await res.json();
  } catch (error) {
    console.log(error);
    message = error.message;
  }

  return { props: { publicationList, message} };
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
