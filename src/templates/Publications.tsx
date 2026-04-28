import { useEffect, useState } from "react";
import MyLink from "../components/MyLink";

const Publications = () => {
  const [researchData, setResearchData] = useState<ResearchDataList>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();

  // fetch reseach data from API.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("./api/publications");
        const data = await res.json();
        setLoading(false);
        setResearchData(data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      {error ? (
        <p>
          OPS! Something went wrong while fetching the data.
        </p>
      ) : loading ? (
        <p>
          Fetching data...
        </p>
      ) : (
        <div className="flex flex-col space-y-6">
          {researchData?.map((item, idx) => {
            // Remove certian results, if needed. Here I remove the KD audio duplicate.
            if (item.cristin_result_id === "10268340") return;
            // Remove also Hybrid Learning duplicate.
            if (item.cristin_result_id === "2044269") return;
            // Remove also the duplicate Hardanger Fiddle papers
            if (item.cristin_result_id === "1939273") return;
            // Remove also the Perfoming arts thing from Popsenteret dance event.
            if (item.cristin_result_id === "2305608") return;
            return (
              <div key={idx}>
                {item.authors} ({item.year}). <i>{item.title}.</i> {item.event}. doi: <MyLink href={item.doi} type="toc">{item.doi}</MyLink>. <MyLink href={item.handle}>Full text in Research Archive</MyLink>
              </div>
            );
          })}
        </div>
      )}
      <p>
        See a complete list of my research publications at {" "}
        <MyLink href="https://nva.sikt.no/research-profile/1213045">
          NVA SIKT
        </MyLink>
        .
      </p>
    </div>
  );
};

export default Publications;
