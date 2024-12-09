import Category from "../models/category";

export default async function ensureDefaultCategories() {
  try {
    const defaultCategory = {
      name: "Others",
      description: "Default category for uncategorized items",
    };

    // Check if "Others" category exists
    const categoryExists = await Category.findOne({
      name: defaultCategory.name,
    });

    if (!categoryExists) {
      // Create "Others" category
      await Category.create(defaultCategory);
      console.log(`Category "${defaultCategory.name}" created successfully.`);
    } else {
      console.log(`Category "${defaultCategory.name}" already exists.`);
    }
  } catch (error) {
    console.error("Error ensuring default categories:", error);
  }
}
