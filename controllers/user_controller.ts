import { Request, Response } from "express";
import Category from "../models/category";
import Product from "../models/products";

export async function getDashboard(req: Request, res: Response) {
  try {
    const data = await Product.find({});
    const categories = await Category.find({});
    if (!data || !categories) {
      res.render("error", { errorMessage: "Unable to get products data" });
      return;
    }
    res.render("user/index", { data, categories });
  } catch (error) {
    res.render("error", { errorMessage: "Internal Server Error" });
  }
}

export async function getCategory(req: Request, res: Response) {
  const data = await Category.find({});
  res.render("user/category", { data });
}

export function getCreateCategory(req: Request, res: Response) {
  res.render("user/create_category", { errorMessage: null });
}
export async function getCreateProduct(req: Request, res: Response) {
  try {
    const categories = await Category.find({});
    if (!categories) {
      res.render("error", { errorMessage: "Unable to get categories" });
      return;
    }
    console.log(categories);
    res.render("user/create", { categories, errorMessage: null });
  } catch (error) {
    console.log(error);
    res.render("error", { errorMessage: "Internal Server Error" });
  }
}
export async function createCategory(req: Request, res: Response) {
  const { name, description } = req.body;
  try {
    const product = await Category.create({ name, description });
    if (!product) {
      res.render("error", {
        errorMessage: "Failed to create the category. Please try again.",
      });
      return;
    }
    res.redirect("/user/category");
  } catch (error) {
    console.log(error);
    res.render("error", { errorMessage: "Internal Server Error" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const { _id } = req.body;
  console.log(_id);
  try {
    const deletedCategory = await Category.deleteOne({ _id });

    if (!deletedCategory) {
      res.render("error", { errorMessage: "Unable to delete category" });
      return;
    }
    res.redirect("/user/category");
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { errorMessage: "Internal Server error" });
  }
}
export async function createProduct(req: Request, res: Response) {
  const { name, price, description, category, stock } = req.body;
  const image = (req as any).fileKey;

  try {
    // Find the category by its name
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      res.render("error", {
        errorMessage: "The selected category does not exist.",
      });
      return;
    }

    // Create the product with the category ID
    const product = await Product.create({
      name,
      price,
      description,
      stock,
      image,
      category: categoryDoc._id, // Use the ID of the category
    });

    if (!product) {
      res.render("error", {
        errorMessage: "Failed to create the product. Please try again.",
      });
      return;
    }
    console.log(product);
    res.redirect("/user/dashboard");
  } catch (error) {
    console.error(error);
    res.render("error", { errorMessage: "Internal Server Error" });
  }
}
export async function Search(req: Request, res: Response) {
  const { query } = req.body;
  try {
    // Use an empty string if no query is provided
    if (!query.trim()) {
      res.status(400).json({ message: "Search query cannot be empty" });
      return;
    }

    // Search for products where the name contains the query string (case-insensitive)
    const data = await Product.find({
      name: { $regex: query, $options: "i" }, // "i" makes it case-insensitive
    });
    const categories = await Category.find({});

    if (!data || !categories) {
      res.render("error", { errorMessage: "Unable to get products data" });
      return;
    }
    res.render("user/search", { data, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getProductsByCategory(req: Request, res: Response) {
  try {
    // Extract category ID from URL params
    const _id = req.params.id;

    // Find the category by ID (optional, to ensure the category exists)
    const category = await Category.find({ _id });

    if (!category) {
      res.status(404).render("error", { errorMessage: "Category not found" });
      return;
    }

    // Find products that match the category ID
    const data = await Product.find({
      category: _id,
    });
    const categories = await Category.find({});

    if (!data || !categories) {
      res.render("error", { errorMessage: "Unable to get products data" });
      return;
    }
    res.render("user/index", { data, categories });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      errorMessage: "An error occurred while fetching products",
    });
  }
}
export async function deleteProduct(req: Request, res: Response) {
  const { _id } = req.body;
  console.log(_id);
  try {
    const deletedCategory = await Product.deleteOne({ _id });

    if (!deletedCategory) {
      res.render("error", { errorMessage: "Unable to delete category" });
      return;
    }
    res.redirect("/user/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { errorMessage: "Internal Server error" });
  }
}
