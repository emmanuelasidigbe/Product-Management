import express,{ Application,Request,Response} from "express"
import dotenv from "dotenv";
import morgan from "morgan";
import expressLayout from "express-ejs-layouts";
import homeRoute from "./routes/index";
import userRoute from "./routes/user_route";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { uploadDir } from "./middleware/upload_middleware";
import ensureDefaultCategories from "./utils/category";
dotenv.config()

const app: Application = express() 
console.log(path.join(__dirname + "/uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/uploads")));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(expressLayout);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.set("views",  "views");


app.use("/",homeRoute)
app.use("/user",userRoute);

(async () => {
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB connected successfully");
    await ensureDefaultCategories();
    
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with a failure code
  }
})();


