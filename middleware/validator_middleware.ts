import { NextFunction,Response, Request } from "express";
import { body, check, validationResult } from "express-validator";

export const signUpValidator = [
  body("username")
    .notEmpty()
    .withMessage("Name is required"),


  // Validate email: it must be a valid email
  body("email").isEmail().withMessage("Enter a valid email address"),

  // Validate password: it must be at least 6 characters
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("error", {
        errorMessage: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
      return 
    }
    next();
  },
];
export const signInValidator = [
  // Validate email: it must be a valid email
  body("email").isEmail().withMessage("Enter a valid email address"),

  // Validate password: it must be at least 6 characters
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("error", {
        errorMessage: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
      return 
    }
    next();
  },
];
export const createCategoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation fails, re-render the form with error messages
      res.status(400).render("error", {
        errorMessage: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
      return 
    }
    next();
  },
];
// Validation rules for the create product form
export const validateProduct = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),
  check("price")
    .notEmpty()
    .withMessage('price is required'),
  check("stock").notEmpty().withMessage("Product stock must be at least 1"), 
  check("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),
  check("category")
  .notEmpty()
  .withMessage("Please select a category"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("error", {
        errorMessage: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
      return
    }
    next();
  },
];

