import {
  initValidation,
  check,
  post,
  del,
} from "../../middleware/middlewareApi";
import { commonApiHandlers } from "../../functions/commonApiHandlers";
import connectMongo from "../../functions/connectMongo";
import Table from "../../models/Table";
import nextConnect from "next-connect";

const postValidator = initValidation([
  check("value").exists().withMessage("Value is missing"),
  check("date").exists().withMessage("Date is missing"),
]);

const deleteValidator = initValidation([
  check("_id").exists().withMessage("Table item _id is missing"),
]);

export default nextConnect()
  .use(commonApiHandlers)
  .use(post(postValidator))
  .use(del(deleteValidator))
  .get(async (req, res) => {
    // get all table items
    await connectMongo();

    let table = await Table.find();

    if (!table) throw new Error(`No comments were found`);

    // sort by date (newest first)
    const tableSorted = table
      .sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
      })
      .reverse();

    res.status(200).json(tableSorted);
  })
  .post(async (req, res) => {
    // add individual table items - with body (value, date)
    await connectMongo();

    const table = await Table.create(req.body);

    res.status(201).json(table);
  })
  .delete(async (req, res) => {
    // delete individual table items - with body (table id)
    if (!req.body._id)
      throw new Error(
        `To delete table items, provide comment ID as request query.`
      );

    await connectMongo();

    const { deletedCount } = await Table.deleteOne({ _id: req.body._id });

    if (deletedCount === 0)
      throw new Error(
        `Table with ID ${req.body._id} was not found and cannot be deleted.`
      );

    res
      .status(200)
      .json({ message: `Table with ID ${req.body._id} was removed` });
  });
