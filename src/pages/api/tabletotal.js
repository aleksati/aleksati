import { initValidation, check, put } from "../../middleware/middlewareApi";
import { commonApiHandlers } from "../../functions/commonApiHandlers";
import connectMongo from "../../functions/connectMongo";
import TableTotal from "../../models/TableTotal";
import nextConnect from "next-connect";

const putValidator = initValidation([
  check("value").exists().withMessage("Value is missing"),
]);

const filter = { _id: "67b233cc84cf8d7f6dbcc49d" };

export default nextConnect()
  .use(commonApiHandlers)
  .use(put(putValidator))
  .get(async (req, res) => {
    // get current total
    await connectMongo();

    let total = await TableTotal.findOne(filter);

    if (!total) throw new Error(`No total was found`);

    res.status(200).json(total.value);
  })
  .put(async (req, res) => {
    // edit total - with only body (value)
    await connectMongo();

    const update = { ...req.body };

    const doc = await TableTotal.findOneAndUpdate(filter, update);    
    if (!doc) throw new Error(`Total was not found.`);
    await doc.save();

    const total = await TableTotal.findOne(filter);

    res.status(200).json(total.value);
  });
