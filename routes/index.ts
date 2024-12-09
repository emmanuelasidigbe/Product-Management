
import { Router, type Request, type Response } from "express";
import * as authController from "../controllers/auth_controller";
import { signUpValidator,signInValidator } from "../middleware/validator_middleware";

const router: Router = Router();

router.get("/",authController.getSignIn );
router.get("/signup", authController.getSignUp)
router.post("/signup",signUpValidator, authController.signup);
router.post("/signin",signInValidator, authController.signin);

export default router;
