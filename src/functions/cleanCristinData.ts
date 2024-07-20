// process and clean data from:
//https://api.cristin.no/v2/persons/1213045/results

// API DOC:
// https://api.cristin.no/v2/doc/index.html

export const cleanCristinData = (cristinJson: CristinDataResponseJSON): ResearchDataList => {
  const data_cleaned = cristinJson.reduce((accum: object[], item: any) => {
    let authors = item.contributors ? item.contributors.preview.reduce((accum: string, item: any) => accum + ` ${item.surname}, ${item.first_name[0]}.,`, "") : "";
    // remove last comma and first space
    authors = authors.slice(1, -1);

    console.log(item);

    // journal + publication
    // ADDED SMC JUST AS A PLACEHOLDER BECAUSE THIS INFO IS NOT CURRENTLY ADDED ONLINE
    // IS USUALLY JUST A "".
    const journal = item.journal ? item.journal.name : item.event ? item.event.name : "Proceedings of the Sound and Music Computing Conference 2024. SMC Network. ISSN 2518-3672";

    // title and year
    const title = item.title ? item.title.en : "";
    const year = item.year_published;

    // DOI and link¨
    let link = "";
    if (item.links) {
      let doi = item.links.filter((link: any) => link.url_type == "DOI");
      let fulltekst = item.links.filter((link: any) => link.url_type == "FULLTEKST");
      let data = item.links.filter((link: any) => link.url_type == "DATA");

      link = !doi.length && !fulltekst.length && !data.length ? "" : doi.length ? doi[0].url : data.length ? data[0].url : fulltekst[0].url;
    }

    // link = link === "" ? link : `Avaliable at: ${link}`;

    const result: object = {
      authors,
      year,
      title,
      journal,
      link,
    };

    return [...accum, result];
  }, []);

  console.log(data_cleaned);

  return data_cleaned;
};
