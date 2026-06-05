import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

// GET SINGLE ORDER
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ success: false, error: "Order not found" });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}

// UPDATE ORDER STATUS
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return NextResponse.json({ success: false, error: "Order not found" });
    }

    // If cancelling, decrement user stats
    if (status === "Cancelled" && existingOrder.status !== "Cancelled") {
      await User.findOneAndUpdate(
        { email: existingOrder.userEmail },
        { $inc: { orders: -1, spent: -existingOrder.totalAmount } }
      );
    }

    // If un-cancelling (admin restores), re-increment
    if (status !== "Cancelled" && existingOrder.status === "Cancelled") {
      await User.findOneAndUpdate(
        { email: existingOrder.userEmail },
        { $inc: { orders: 1, spent: existingOrder.totalAmount } }
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}

// DELETE ORDER
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const existingOrder = await Order.findById(id);

    // If deleting a non-cancelled order, decrement user stats
    if (existingOrder && existingOrder.status !== "Cancelled") {
      await User.findOneAndUpdate(
        { email: existingOrder.userEmail },
        { $inc: { orders: -1, spent: -existingOrder.totalAmount } }
      );
    }

    await Order.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}