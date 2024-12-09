import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
// import fs from "fs";

export const uploadDir = path.join(__dirname, "..", "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)
    cb(null, uploadDir); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension (e.g., .png, .jpg)
    const uniqueKey = `${uuidv4()}${ext}`; // Append the extension after the UUID
    cb(null, uniqueKey);

    // Attach the full key (with extension) to the request object
    (req as any).fileKey = uniqueKey;
  },
});

// Initialize multer with the updated storage configuration
export const upload = multer({ storage });
