import  { model, Schema } from "mongoose";
import { Product } from "../types";


const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  stock:{type:Number, required:true},
  image: { type: String, required: true },
});

export default model<Product>("Product", ProductSchema);
