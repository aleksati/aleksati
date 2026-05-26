import { useEffect, useState } from "react";
import MyLink from "../components/MyLink";

//   const dummy: PublicationList = [{
//     cristin_result_id: "one",
//     authors: "one",
//     year: "one",
//     title: "one",
//     event: "one",
//     doi: "one",
//     handle: "one"
//   },
//   {
//     cristin_result_id: "two",
//     authors: "two",
//     year: "two",
//     title: "two",
//     event: "two",
//     doi: "two",
//     handle: "two"
//   },
//     {
//     cristin_result_id: "two",
//     authors: "two",
//     year: "two",
//     title: "two",
//     event: "two",
//     doi: "two",
//     handle: "two"
//   }
// ]

const Publications = ({publicationList, message}: {publicationList: PublicationList, message: string}) => {
  const [listDisplayed, setListDisplayed] = useState<PublicationList>();

  useEffect(() => {
    const fetchData = async () => {
      // fetch my publication list another time(!) from client side.
      // This is just in case if there are any new publications that
      // are published since last time I built the site on Netlify.
      // keeping the initial render on the server is best for 
      // performance (the site load instantly, but also updates after a while if necessary)
      try {
        const res = await fetch("./api/publications");
        const data = await res.json();
        setListDisplayed(data);
      } catch (error) {
        console.log(error);
      }
    };
    setListDisplayed(publicationList);
    fetchData();
  }, [publicationList]);

  return (
    <div className="space-y-4">
      {!publicationList.length ? (
        <p>
          OPS! Something went wrong while fetching the data. {message}
        </p>
      ) : (
        <div className="flex flex-col space-y-6">
          {listDisplayed?.map((item, idx) => {
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
