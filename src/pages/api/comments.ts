import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import connectMongo from "../../functions/connectMongo";
import Comments from "../../models/Comments";

// const getValidator = initValidation([
//   check("slug").exists().withMessage("Slug is missing")
// ])

// const postValidator = initValidation([
//   check("slug").exists().withMessage("Slug is missing"),
//   check("name").exists().withMessage("Name is missing"),
//   check("comment").exists().withMessage("Comment is missing"),
//   check("date").exists().withMessage("Date is missing"),
// ]);

// const deleteValidator = initValidation([
//   check("id").exists().withMessage("Comment ID is missing"),
// ]);

// const putValidator = initValidation([
//   check("id").exists().withMessage("Comment ID is missing"),
//   oneOf([
//     check("name").exists().withMessage("Name is required"),
//     check("slug").exists().withMessage("Slug is required"),
//     check("date").exists().withMessage("Date is required"),
//     check("comment").exists().withMessage("Comment is required"),
//   ]),
// ]);

const router = createRouter<NextApiRequest, NextApiResponse>();

// Middleware
// router
//   .use(get(getValidator))
//   .use(post(postValidator))
//   .use(del(deleteValidator))
//   .use(put(putValidator));

// GET all comments (always returns array)
router.get(async (req, res) => {
  await connectMongo();

  const slug = req.query.slug;

  const comments = slug
    ? await (Comments as any).find({ slug })
    : await (Comments as any).find();

  // Sort so newest comments are first 
  // the date strings are "YYYY-MM-DD HH-MM". This sorts them inside order.
  const commentsSorted = (comments || [])
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .reverse();

  res.status(200).json(commentsSorted);
});

// POST new comment
router.post(async (req, res) => {
  await connectMongo();
  const comment = await Comments.create(req.body);
  res.status(201).json(comment);
});

// DELETE comment
router.delete(async (req, res) => {
  const id = req.body.id;
  if (!id) return res.status(400).json({ error: "Comment ID is required" });

  await connectMongo();

  const { deletedCount } = await Comments.deleteOne({ _id: id });
  if (!deletedCount)
    return res.status(404).json({ error: "Comment not found" });

  res.status(200).json({ message: `Comment ${id} removed` });
});

// PUT update comment
router.put(async (req, res) => {
  await connectMongo();

  const { id, ...update } = req.body;
  if (!id) return res.status(400).json({ error: "Comment ID is required" });

  const doc = await Comments.findOneAndUpdate({ _id: id }, update, {
    new: true,
  });
  if (!doc) return res.status(404).json({ error: "Comment not found" });

  res.status(200).json(doc);
});

// Export handler
export default router.handler({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message || "Internal Server Error" });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});
