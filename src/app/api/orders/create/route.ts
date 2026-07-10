import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      paymentMethod,
      paymentStatus,
      paymentId,
    } = body;

    if (!orderId || !userEmail || !totalAmount || !shippingAddress || !items?.length) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

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
      paymentMethod,
      paymentStatus,
      paymentId,
    });

    await User.findOneAndUpdate(
      { email: userEmail },
      { $inc: { orders: 1, spent: totalAmount } },
      { new: true }
    );

    // ── ORDER CONFIRMATION EMAIL ──
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "intellixprojects@gmail.com",
      subject: `Order Confirmed! #${orderId} - Nishmee Store`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f5f0;">
          <div style="background-color: #111827; padding: 30px; border-radius: 16px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: #c9a96e; margin: 0; font-size: 28px; letter-spacing: 2px;">NISHMEE</h1>
            <p style="color: #ffffff; margin: 8px 0 0 0; font-size: 14px;">Luxury Spiritual & Home Decor</p>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 16px; text-align: center; margin-bottom: 20px;">
            <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
            <h2 style="color: #111827; margin: 0 0 8px 0; font-size: 24px;">Order Confirmed!</h2>
            <p style="color: #6b7280; margin: 0; font-size: 15px;">Thank you for shopping with Nishmee Store</p>
            <div style="background-color: #f8f5f0; padding: 12px 20px; border-radius: 10px; display: inline-block; margin-top: 16px;">
              <p style="margin: 0; color: #111827; font-size: 14px;">Order ID: <strong style="color: #c9a96e;">#${orderId}</strong></p>
            </div>
          </div>
          <div style="background-color: #ffffff; padding: 24px; border-radius: 16px; margin-bottom: 20px;">
            <h3 style="color: #111827; margin: 0 0 16px 0; font-size: 16px; border-bottom: 2px solid #f8f5f0; padding-bottom: 12px;">Order Summary</h3>
            ${items.map((item: { title: string; quantity: number; price: number }) => `
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f8f5f0;">
                <div>
                  <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 600;">${item.title}</p>
                  <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">Qty: ${item.quantity}</p>
                </div>
                <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 600;">₹${item.price * item.quantity}</p>
              </div>
            `).join("")}
            <div style="margin-top: 16px;">
              <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Subtotal</p>
                <p style="margin: 0; color: #111827; font-size: 14px;">₹${subtotal}</p>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Shipping</p>
                <p style="margin: 0; color: #111827; font-size: 14px;">${shipping === 0 ? "FREE" : `₹${shipping}`}</p>
              </div>
              ${discount > 0 ? `
              <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                <p style="margin: 0; color: #16a34a; font-size: 14px;">Discount</p>
                <p style="margin: 0; color: #16a34a; font-size: 14px;">-₹${discount}</p>
              </div>` : ""}
              <div style="display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #f8f5f0; margin-top: 8px;">
                <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 700;">Total</p>
                <p style="margin: 0; color: #c9a96e; font-size: 16px; font-weight: 700;">₹${totalAmount}</p>
              </div>
            </div>
          </div>
          <div style="background-color: #ffffff; padding: 24px; border-radius: 16px; margin-bottom: 20px;">
            <h3 style="color: #111827; margin: 0 0 12px 0; font-size: 16px;">📦 Shipping Address</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.8;">
  ${shippingAddress}
</p>
          </div>
          <div style="background-color: #111827; padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 20px;">
            <p style="margin: 0; color: #c9a96e; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Estimated Delivery</p>
            <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 18px; font-weight: 700;">${estimatedDelivery}</p>
          </div>
          <div style="text-align: center; padding: 20px;">
            <p style="color: #6b7280; font-size: 13px; margin: 0;">Questions? Contact us at</p>
            <p style="color: #c9a96e; font-size: 13px; margin: 4px 0 0 0;">nishmee@gmail.com</p>
            <p style="color: #9ca3af; font-size: 12px; margin: 16px 0 0 0;">© 2025 Nishmee Store. All rights reserved.</p>
          </div>
        </div>
      `,
    });

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
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}