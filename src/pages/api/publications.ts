import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

// fetch and clean my research data from cristin API, and send it to the client side.

// process and clean data from:
//https://api.cristin.no/v2/persons/1213045/results

// API DOC:
// https://api.cristin.no/v2/doc/index.html

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const url: string = "https://api.cristin.no/v2/persons/1213045/results";
  const res2 = await fetch(url);
  const data: any[] = await res2.json();

  // clean the Cristin data into a more usable format for the frontend.

  const data_cleaned: PublicationList = [];
  for (const item of data) {
    // get authors names in nice string
    let authors: string = item.contributors
      ? item.contributors.preview.reduce(
          (accum: string, item: any) =>
            accum + ` ${item.surname}, ${item.first_name[0]}.,`,
          "",
        )
      : "";

    // remove last comma and first space
    authors = authors.slice(1, -1);

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
        // get the parent data to find the event name.
        // this is because the chapteracademic category does not have the journal name in the main data, but in the parent data.
        const parentUrl: string = item.part_of.url;
        const resParent = await fetch(parentUrl);
        const parentData = await resParent.json();
        const FirstEventTitle: any = Object.values(parentData.title)[0];
        event = FirstEventTitle || "";

        break;
      case "PERFORMINGARTS":
        event = "Performing Arts Research Event";
        break;
      case "LECTURE":
        event = item.event.name;
        break;
      default:
        event = "";
    }

    // title and year
    const firstTitle: any = Object.values(item.title)[0];
    const title: string = firstTitle ? firstTitle : "Title";
    const year: string = item.year_published ? item.year_published : "2026";

    // DOI and handle
    let doi: string = "";
    let handle: string = "";
    if (item.links) {

      let doiLink = item.links.filter((link: any) => link.url_type == "DOI");

      // if not a doi is there, check for the FULLTEKST type.
      if (!doiLink.length) {
        doiLink = item.links.filter((link: any) => link.url_type == "FULLTEKST");
      }

      doi = doiLink.length
        ? doiLink[0].url
        : "https://nva.sikt.no/research-profile/1213045";

      let handleLinks = item.links.filter(
        (link: any) => link.url_type == "ARKIV",
      );
      handle = handleLinks.length
        ? handleLinks[0].url
        : "https://nva.sikt.no/research-profile/1213045";
    }

    const result: Publication = {
      cristin_result_id: item.cristin_result_id,
      authors,
      year,
      title,
      event,
      doi,
      handle,
    };

    data_cleaned.push(result);
  }

  res.status(200).json(data_cleaned);
});

// Export handler
export default router.handler({
  onError(error, req, res) {
    console.error(error);
    res
      .status(500)
      .json({ error: (error as Error).message || "Internal Server Error" });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});
