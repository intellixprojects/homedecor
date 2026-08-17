import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: true, // OTP hata diya, direct verified
    });

    return NextResponse.json({ success: true, message: "Signup successful" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const { name, email, password, phone } = await req.json();

//     if (!name || !email || !password || !phone) {
//       return NextResponse.json(
//         { success: false, message: "All fields required" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await User.findOne({ email });

//     // agar already verified account hai to block karo
//     if (existingUser && existingUser.isVerified) {
//       return NextResponse.json(
//         { success: false, message: "Email already registered" },
//         { status: 400 }
//       );
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

//     // agar unverified user pehle se hai (retry case) to update karo, warna naya create karo
//     await User.findOneAndUpdate(
//       { email },
//       {
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         otp,
//         otpExpiry,
//         isVerified: false,
//       },
//       { upsert: true, new: true }
//     );

//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: "Verify your NishMee account",
//       html: `<h2>Your OTP is</h2><h1>${otp}</h1><p>This OTP expires in 10 minutes</p>`,
//     });

//     return NextResponse.json({ success: true, message: "OTP sent" });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { success: false, message: "OTP sending failed" },
//       { status: 500 }
//     );
//   }
// }