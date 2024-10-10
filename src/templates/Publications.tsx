import { cleanCristinData } from "../functions/cleanCristinData";
import { useEffect, useState } from "react";
import MyLink from "../components/MyLink";

// API DOC:
// https://api.cristin.no/v2/doc/index.html

const Publications = () => {
  const [researchData, setResearchData] = useState<ResearchDataList>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();

  // fetch reseach data client side.
  useEffect(() => {
    const fetchCristindata = async () => {
      setLoading(true);
      try {
        const url: string = "https://api.cristin.no/v2/persons/1213045/results";
        const res = await fetch(url);
        const data = await res.json();
        const data_cleaned = cleanCristinData(data);
        setLoading(false);
        setResearchData(data_cleaned);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    fetchCristindata();
  }, []);

  return (
    <>
      {error ? (
        <p>
          Something went wrong while fetching data from{" "}
          <MyLink href="https://app.cristin.no/">Cristin</MyLink> :(
        </p>
      ) : loading ? (
        <p>
          Fetching data from{" "}
          <MyLink href="https://app.cristin.no/">Cristin</MyLink>...
        </p>
      ) : (
        <div className="flex flex-col space-y-8">
          {researchData?.map((item, idx) => {
            // Remove certian results, if needed. Here I remove Hybrid Learning duplicate.
            if (item.cristin_result_id === "2044269") return;
            return (
              <div key={idx}>
                {item.authors} ({item.year}). {item.title}. <i>{item.event}.</i>{" "}
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
    </>
  );
};

export default Publications;
