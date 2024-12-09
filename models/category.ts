import { model, Schema } from "mongoose";
import { Category } from "../types";

const CategorySchema = new Schema<Category>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true},
});

export default model<Category>("Category", CategorySchema);
