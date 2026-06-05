import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

// GET ORDERS BY USER EMAIL
// Usage: /api/orders/user?email=user@example.com
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" });
    }

    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}