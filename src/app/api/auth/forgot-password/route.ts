import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    // security: user na mile tab bhi generic message do (email enumeration se bachne ke liye)
    if (!user || !user.isVerified) {
      return NextResponse.json(
        { success: false, message: "No account found with this email" },
        { status: 404 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your NishMee password",
      html: `<h2>Your password reset OTP is</h2><h1>${otp}</h1><p>This OTP expires in 10 minutes</p>`,
    });

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}