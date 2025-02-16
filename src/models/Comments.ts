import { Schema, model, models } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const schema = new Schema({
  name: reqString,
  comment: reqString,
  date: reqString,
  slug: reqString,
});

const Comments = models.comments || model("comments", schema);

export default Comments;