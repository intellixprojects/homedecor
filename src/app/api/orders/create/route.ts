import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      orderId,
      userEmail,
      estimatedDelivery,
      subtotal,
      shipping,
      discount,
      totalAmount,
      status,
      shippingAddress,
      items,
    } = body;

    // Basic validation
    if (
      !orderId ||
      !userEmail ||
      !totalAmount ||
      !shippingAddress ||
      !items?.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Create order
    const order = await Order.create({
      orderId,
      userEmail,
      estimatedDelivery,
      subtotal,
      shipping,
      discount,
      totalAmount,
      status,
      shippingAddress,
      items,
    });

    // Update user stats
    await User.findOneAndUpdate(
      { email: userEmail },
      {
        $inc: {
          orders: 1,
          spent: totalAmount,
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}