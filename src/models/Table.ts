import { Schema, model, models } from "mongoose";

const schema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Table = models.table || model("table", schema);

export default Table;
