// process and clean data from:
//https://api.cristin.no/v2/persons/1213045/results

// API DOC:
// https://api.cristin.no/v2/doc/index.html

export const cleanCristinData = (
  cristinJson: CristinDataResponseJSON
): ResearchDataList => {
  const data_cleaned = cristinJson.reduce((accum: object[], item: any) => {
    // get authors names in nice string
    let authors: string = item.contributors
      ? item.contributors.preview.reduce(
          (accum: string, item: any) =>
            accum + ` ${item.surname}, ${item.first_name[0]}.,`,
          ""
        )
      : "";

    // remove last comma and first space
    authors = authors.slice(1, -1);

    // console.log(item);

    // Get the journal or event name from different research categories
    let event: string = "";
    switch (item.category.code) {
      case "ACADEMICLECTURE":
        event = item.event.name;
        break;
      case "ARTICLE":
        event = item.journal.name;
        break;
      case "CHAPTERACADEMIC":
        // placeholder for now.
        event =
          "Proceedings of the Sound and Music Computing Conference 2024. SMC Network. ISSN 2518-3672";
        break;
      case "PERFORMINGARTS":
        event = "Performing Arts Research Event";
        break;
      default:
        event = "";
    }

    // title and year
    const title = item.title ? item.title.en : "2024";
    const year = item.year_published;

    // DOI and links to papers.
    let link = "";
    if (item.links) {
      let doi = item.links.filter((link: any) => link.url_type == "DOI");
      let fulltekst = item.links.filter(
        (link: any) => link.url_type == "FULLTEKST"
      );
      let data = item.links.filter((link: any) => link.url_type == "DATA");

      link =
        !doi.length && !fulltekst.length && !data.length
          ? ""
          : doi.length
          ? doi[0].url
          : data.length
          ? data[0].url
          : fulltekst[0].url;
    }

    // link = link === "" ? link : `Avaliable at: ${link}`;

    const result: object = {
      cristin_result_id: item.cristin_result_id,
      authors,
      year,
      title,
      event,
      link,
    };

    return [...accum, result];
  }, []);

  // console.log(data_cleaned);

  return data_cleaned;
};
