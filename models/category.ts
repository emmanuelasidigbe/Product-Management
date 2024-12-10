import { model, Schema } from "mongoose";
import { Category } from "../types";

const CategorySchema = new Schema<Category>({
  name: { type: String, required: true},
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isdeleted:{type:Boolean}
});

export default model<Category>("Category", CategorySchema);
