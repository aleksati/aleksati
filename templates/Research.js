import cleanCristinData from "../functions/cleanCristinData";
import { useEffect, useState } from "react";
import MyLink from "../components/MyLink";

// API DOC:
// https://api.cristin.no/v2/doc/index.html

const Research = () => {
  const [researchData, setResearchData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCristindata = async () => {
      setLoading(true);
      try {
        const url = "https://api.cristin.no/v2/persons/1213045/results";
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
          {researchData.map((item, idx) => {
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
    </>
  );
};

export default Research;
