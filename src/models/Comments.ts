// import { Schema, model, models } from "mongoose";

// const reqString = {
//   type: String,
//   required: true,
// };

// const schema = new Schema({
//   name: reqString,
//   comment: reqString,
//   date: reqString,
//   slug: reqString,
// });

// const Comments = models.comments || model("comments", schema);

// export default Comments;

import mongoose, { Model, Document } from "mongoose";

export interface IComment extends Document {
  slug: string;
  date: string;
  name: string;
  comment: string;
}

const CommentSchema = new mongoose.Schema({
  slug: String,
  date: String,
  name: String,
  comment: String,
});

const Comments: Model<IComment> =
  (mongoose.models.Comments as Model<IComment>) ||
  mongoose.model<IComment>("Comments", CommentSchema);

export default Comments;
