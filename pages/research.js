import cleanCristinData from "../functions/cleanCristinData";
import LayoutPage from "../layouts/LayoutPage";
import MyLink from "../components/MyLink";

export default function Research({ data_cleaned, notFound }) {
  return (
    <LayoutPage pageMeta={{ title: "research" }}>
      {notFound ? (
        <p>Something went wrong while fetching the data...</p>
      ) : (
        <div className="flex flex-col space-y-6">
          <p className="text-sm">
            Data fetched from{" "}
            <MyLink href="https://app.cristin.no/">Cristin</MyLink>:
          </p>
          {data_cleaned.map((item, idx) => {
            if (idx === 1) return;
            return (
              <div key={idx}>
                {item.authors} ({item.year}). {item.title}.{" "}
                <i>{item.journal}.</i>{" "}
                {item.link ? (
                  <MyLink href={item.link}>Avaliable from here</MyLink>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      )}
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
