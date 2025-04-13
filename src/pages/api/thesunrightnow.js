import { commonApiHandlers } from "../../functions/commonApiHandlers";
import { getCurrDate } from "../../functions/getCurrDate";
import nextConnect from "next-connect";

// images from:
// https://sdo.gsfc.nasa.gov/assets/img/browse/2025/04/05/
// filename logic:
// YYYMMDD_HHMMSS_512_0211.jpg

export default nextConnect()
    .use(commonApiHandlers)
  .get(async (req, res) => {
    // retrieve new imgfilenames from the NASA server.
    // get date "2025-12-24" and make "2025/12/24"
    let date = getCurrDate();
    date = date.replaceAll("-", "/");

    const baseUrl = `https://sdo.gsfc.nasa.gov/assets/img/browse/${date}/`;
    const res2 = await fetch(baseUrl);
    const html = await res2.text();

    // Match all hrefs ending in .jpg
    const imageRegex = /href="(.*?\.jpg)"/g;
    const matches = [...html.matchAll(imageRegex)];

    // Build full URLs from matches
    const filenames = matches.map((match) => baseUrl + match[1]);

    // Sort by filename descending (based on timestamp in filename)
    const sorted = filenames.sort().reverse();

    // get latest 16 filenames
    const lastSixteen = sorted.slice(0, 16);

    // choose the first filename of each set of 4. ["", "", "", "", "take this one", "", "" etc.]
    // const imgFileNames = lastSixteen.filter((e, i) => i % 4 == 0);

    // every images comes in 3 resolutions, 512, 2048, 4096. 
    // only grab the images with 2048 resolution.
    // this leaves 4 images in total.
    const imgFileNames = lastSixteen.filter((e) => e.includes("4096"));

    res.status(200).json(imgFileNames);
  });
