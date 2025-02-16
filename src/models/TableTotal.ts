import { Schema, model, models } from "mongoose";

const schema = new Schema({
  value: {
    type: Number,
    required: true,
  },
});

const TableTotal = models.tabletotal || model("tabletotal", schema);

export default TableTotal;
