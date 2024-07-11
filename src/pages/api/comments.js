import { initValidation, check, post, del, put, oneOf } from "../../middleware/middlewareApi";
import { commonApiHandlers } from "../../functions/commonApiHandlers";
import connectMongo from "../../functions/connectMongo";
import Comments from "../../models/Comments";
import nextConnect from "next-connect";

const musicPostValidator = initValidation([check("slug").exists().withMessage("Slug is missing"), check("name").exists().withMessage("Name is missing"), check("comment").exists().withMessage("Comment is missing"), check("date").exists().withMessage("Date is missing")]);

const musicDeleteValidator = initValidation([check("id").exists().withMessage("Comment ID is missing")]);

const musicPutValidator = initValidation([
  check("id").exists().withMessage("Comment ID is missing"),
  oneOf([check("name").exists().withMessage("Name is required"), check("slug").exists().withMessage("Slug is required"), check("date").exists().withMessage("Date is required"), check("comment").exists().withMessage("Comment is required")]),
]);

export default nextConnect()
  .use(commonApiHandlers)
  .use(post(musicPostValidator))
  .use(del(musicDeleteValidator))
  .use(put(musicPutValidator))
  .get(async (req, res) => {
    // get all comments
    // with query (post slug) get all comments of specific post
    await connectMongo();

    // find comments for a specific post (slug) or all comments
    let comments;
    if (req.query.slug) {
      let slug = req.query.slug;
      comments = await Comments.find({ slug });
    } else {
      comments = await Comments.find();
    }

    if (!comments) throw new Error(`No comments were found`);

    // sort by date (newest first)
    const commentsSorted = comments
      .sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
      })
      .reverse();

    res.status(200).json(commentsSorted);
  })
  .post(async (req, res) => {
    // add individual comments - with body (slug, name, comment, date)
    await connectMongo();

    const comments = await Comments.create(req.body);

    res.status(201).json(comments);
  })
  .delete(async (req, res) => {
    // delete individual comments - with body (comment id)
    if (!req.body.id) throw new Error(`To delete comments, provide comment ID as request query.`);

    await connectMongo();

    const { deletedCount } = await Comments.deleteOne({ _id: req.body.id });

    if (deletedCount === 0) throw new Error(`Comment with ID ${req.body.id} was not found and cannot be deleted.`);

    res.status(200).json({ message: `Comment with ID ${req.body.id} was removed` });
  })
  .put(async (req, res) => {
    // edit individual comments - with body (comment id + things to update)
    await connectMongo();

    const filter = { _id: req.body.id };
    const update = { ...req.body };
    delete update.id;

    const doc = await Comments.findOneAndUpdate(filter, update);

    if (!doc) throw new Error(`comment with id ${req.body.id} was not found.`);

    await doc.save();

    res.status(200).json(doc);
  });
