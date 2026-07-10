import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function getCategories() {
  try {
    await connectDB();
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(categories));
  } catch {
    return [];
  }
}