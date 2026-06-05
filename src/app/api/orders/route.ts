import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

// GET ALL ORDERS
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}

// DELETE ORDER
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Order.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}