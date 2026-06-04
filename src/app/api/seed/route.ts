import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { products } from "@/data/products";

export async function GET() {
  try {
    await connectDB();

    // Sab purane products delete karo
    await Product.deleteMany({});
    console.log("Purane products delete ho gaye");

    // Naaye products insert karo
    const inserted = await Product.insertMany(products);

    return NextResponse.json({
      success: true,
      message: `✅ ${inserted.length} products MongoDB me daal diye!`,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error: " + error,
    }, { status: 500 });
  }
}