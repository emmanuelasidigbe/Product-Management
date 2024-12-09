import { Router } from "express";
import authMiddleware from "../middleware/auth_middleware";
import * as UserController from "../controllers/user_controller";
import {
  createCategoryValidator,
  validateProduct,
} from "../middleware/validator_middleware";
import { upload } from "../middleware/upload_middleware";

const router: Router = Router();

router.use(authMiddleware);
router.get("/dashboard", UserController.getDashboard);
router.get("/category", UserController.getCategory);
router.get("/create-category", UserController.getCreateCategory);
router.get("/category/:id", UserController.getProductsByCategory);
router.get("/create-product", UserController.getCreateProduct);
router.post(
  "/create-category",
  createCategoryValidator,
  UserController.createCategory
);
router.post(
  "/create-product",
  upload.single("file"),
  validateProduct,
  UserController.createProduct
);
router.post("/search",UserController.Search)
router.post("/delete-category", UserController.deleteCategory);
router.post("/delete-product",UserController.deleteProduct)

export default router;
