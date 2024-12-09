import { Document } from "mongoose";
interface User extends Document {
  username: string;
  email: string;
  password: string;
}
interface Product extends Document {
  name: string;
  description: string;
  price: number;
  stock:number;
  category: mongoose.Types.ObjectId;
  image: string;
}

interface Category extends Document {
  name: string;
  description: string;
}