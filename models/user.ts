import { model ,Schema } from "mongoose";
import { User } from "../types";


const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<User>("User", UserSchema);
