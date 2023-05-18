import cleanCristinData from "../functions/cleanCristinData";
import LayoutPage from "../layouts/LayoutPage";
import Research from "../templates/Research";

export default function handler({ data_cleaned, notFound }) {
  return (
    <LayoutPage pageMeta={{ title: "research" }}>
      <Research data={data_cleaned} notFound={notFound} />
    </LayoutPage>
  );
}

// API DOC:
// https://api.cristin.no/v2/doc/index.html

export async function getServerSideProps(context) {
  try {
    const url = "https://api.cristin.no/v2/persons/1213045/results";
    const res = await fetch(url);
    const data = await res.json();

    const data_cleaned = cleanCristinData(data);

    return { props: { data_cleaned } };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
