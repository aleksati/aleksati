import mongoose, { Model, Document } from "mongoose";

export interface MyComment extends Document {
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

const Comments: Model<MyComment> =
  (mongoose.models.Comments as Model<MyComment>) ||
  mongoose.model<MyComment>("Comments", CommentSchema);

export default Comments;
