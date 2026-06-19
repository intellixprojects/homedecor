import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

     const Razorpay = (await import("razorpay")).default;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise me convert krta h
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create payment order" },
      { status: 500 }
    );
  }
}