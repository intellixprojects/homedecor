"use client";

import { useState, useEffect } from "react";
import { loadCart } from "@/store/features/cartSlice";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiCreditCard,
  FiShield,
  FiTag,
  FiCheck,
  FiLock,
  FiRefreshCcw,
  FiChevronRight,
  FiSmartphone,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Footer from "@/components/footer/Footer";
import { clearCart } from "@/store/features/cartSlice";

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Load Razorpay script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      )
    ) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay",
  );
  const [processing, setProcessing] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);

  const { currentUser } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = subtotal >= 1999 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SAVE ORDER TO DB
  const saveOrder = async (paymentId: string, paymentStatus: string) => {
    const userEmail = currentUser?.email || formData.email;

    const orderData = {
      orderId: `NSH-${Date.now()}`,
      userEmail,
      estimatedDelivery: "3 - 5 Business Days",
      subtotal,
      shipping,
      discount,
      totalAmount: total,
      status: "Processing",
      paymentId,
      paymentStatus,
      paymentMethod: paymentMethod === "razorpay" ? "Online" : "COD",
      shippingAddress: `${formData.fullName}, ${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}`,
      phone: formData.phone,
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
    };

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  };

  // RAZORPAY PAYMENT
  const handleRazorpayPayment = async () => {
    setProcessing(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Razorpay failed to load. Check your internet connection.");
        setProcessing(false);
        return;
      }

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert("Could not initiate payment. Please try again.");
        setProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: "INR",
        name: "NishMee",
        description: "Luxury Home Decor",
        order_id: orderData.order.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#111827" },

        // UPI + all methods enabled
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              alert("Payment verification failed. Contact support.");
              setProcessing(false);
              return;
            }

            const saved = await saveOrder(response.razorpay_payment_id, "Paid");
            if (saved.success) {
              dispatch(clearCart());
              window.location.href = "/success";
            } else {
              alert(
                "Order save failed. Contact support with payment ID: " +
                response.razorpay_payment_id,
              );
            }
          } catch (err) {
            console.error(err);
            alert("Something went wrong after payment.");
          } finally {
            setProcessing(false);
          }
        },

        modal: {
          ondismiss: () => {
            setProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  // COD ORDER
  const handleCOD = async () => {
    setProcessing(true);
    try {
      const saved = await saveOrder("COD", "Pending");
      if (saved.success) {
        dispatch(clearCart());
        window.location.href = "/success";
      } else {
        alert(saved.message || "Order creation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    if (!/^\d{6}$/.test(formData.zip)) {
      alert("Please enter a valid 6 digit pincode");
      return;
    }

    const userEmail = currentUser?.email || formData.email;
    if (!userEmail) {
      alert("Please login to place an order");
      window.location.href = "/login";
      return;
    }

    if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
    } else {
      await handleCOD();
    }
  };

  useEffect(() => {
    const email =
      currentUser?.email ||
      JSON.parse(localStorage.getItem("currentUser") || "{}").email;
    if (email) {
      const stored = JSON.parse(localStorage.getItem(`cart_${email}`) || "[]");
      setCartItems(stored);
    }

    setCartLoaded(true);
  }, [currentUser]);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartLoaded && cartItems.length === 0) {
      window.location.href = "/cart";
    }
  }, [cartLoaded, cartItems]);

  return (
    <>
      <section className="min-h-screen bg-[#f8f5f0]">
        {/* TOP BAR */}
        <div className="border-b border-[#ede9e3] bg-white py-4.5">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-[13px] font-semibold text-[#a89880] transition-colors hover:text-black"
            >
              <FiArrowLeft size={14} />
              Back To Cart
            </Link>
            <h1 className="ml-30 text-[22px] font-black tracking-[-1px] text-[#111827]">
              Checkout
            </h1>
            <div className="hidden items-center gap-2 text-[12px] font-semibold md:flex">
              {["Cart", "Shipping", "Payment"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  {step === "Cart" ? (
                    <Link
                      href="/cart"
                      className={`flex items-center gap-1.5 transition-colors hover:text-[#c9a96e] ${i <= 1 ? "text-black" : "text-[#c4b8a8]"
                        }`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i <= 1
                            ? "bg-black text-white"
                            : "bg-[#e8e0d4] text-[#a89880]"
                          }`}
                      >
                        <FiCheck size={10} />
                      </div>

                      {step}
                    </Link>
                  ) : (
                    <div
                      className={`flex items-center gap-1.5 ${i <= 1 ? "text-black" : "text-[#c4b8a8]"
                        }`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i <= 1
                            ? "bg-black text-white"
                            : "bg-[#e8e0d4] text-[#a89880]"
                          }`}
                      >
                        {i <= 1 ? <FiCheck size={10} /> : i + 1}
                      </div>

                      {step}
                    </div>
                  )}

                  {i < 2 && (
                    <FiChevronRight size={12} className="text-[#c4b8a8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-22.5 pt-12.5">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            {/* LEFT — SHIPPING FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {/* SHIPPING DETAILS */}
              <div className="rounded-[34px] bg-white p-8.5 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <div className="mb-7 flex items-center justify-between">
                  <h2 className="text-[28px] font-black text-[#111827]">
                    Shipping Details
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    {
                      label: "Full Name",
                      name: "fullName",
                      type: "text",
                      placeholder: "Enter your name",
                    },
                    {
                      label: "Email Address",
                      name: "email",
                      type: "email",
                      placeholder: "Enter your email",
                    },
                    {
                      label: "Phone Number",
                      name: "phone",
                      type: "text",
                      placeholder: "Enter phone number",
                    },
                    {
                      label: "City",
                      name: "city",
                      type: "text",
                      placeholder: "Enter city",
                    },
                  ].map(({ label, name, type, placeholder }) => (
                    <div key={name}>
                      <label className="mb-2.5 block text-sm font-medium">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="h-14.5 w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-4.5 outline-none transition focus:border-black"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <label className="mb-2.5 block text-sm font-medium">
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no, Street, Area"
                    className="h-14.5 w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-4.5 outline-none transition focus:border-black"
                  />
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2.5 block text-sm font-medium">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      className="h-14.5 w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-4.5 outline-none transition focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="mb-2.5 block text-sm font-medium">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="ZIP code"
                      className="h-14.5 w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-4.5 outline-none transition focus:border-black"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — ORDER SUMMARY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-28 flex flex-col gap-5"
            >
              <div className="h-fit rounded-[34px] bg-white p-7.5 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <div className="mb-6.5 flex items-center justify-between">
                  <h2 className="text-[28px] font-black text-[#111827]">
                    Order Summary
                  </h2>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                    <FiTag />
                  </div>
                </div>

                <div className="mb-6.5 flex flex-col gap-4 max-h-65 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-[18px] bg-[#f8f5f0]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1.5 text-[15px] font-bold leading-[1.3] text-[#111827] line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-[13px] text-[#a89880]">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-[16px] font-black text-[#111827] shrink-0">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-6 border-t border-dashed border-[#e8e0d4] pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] text-[#a89880]">
                      Subtotal ({cartItems.length} items)
                    </p>
                    <span className="font-bold text-[#111827]">
                      ₹{subtotal}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] text-emerald-600">
                        Discount (10%)
                      </p>
                      <span className="font-bold text-emerald-600">
                        -₹{discount}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] text-[#a89880]">Shipping</p>
                    <span
                      className={`font-bold ${shipping === 0 ? "text-emerald-600" : "text-[#111827]"}`}
                    >
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-[22px] bg-[#111827] px-5.5 py-5 mt-2">
                    <div>
                      <p className="text-sm text-white/60">Total Amount</p>
                      <p className="text-xs text-white/40">
                        {paymentMethod === "razorpay"
                          ? "Pay via Razorpay"
                          : "Cash On Delivery"}
                      </p>
                    </div>
                    <span className="text-[28px] font-black text-white">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* COMPACT PAYMENT METHOD TOGGLE */}
                <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-2xl bg-[#f8f5f0] p-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold transition-all ${paymentMethod === "razorpay"
                        ? "bg-white text-[#111827] shadow-sm"
                        : "text-[#a89880]"
                      }`}
                  >
                    <FiCreditCard size={13} />
                    Pay Online
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold transition-all ${paymentMethod === "cod"
                        ? "bg-white text-[#111827] shadow-sm"
                        : "text-[#a89880]"
                      }`}
                  >
                    <FiSmartphone size={13} />
                    Cash On Delivery
                  </button>
                </div>

                {/* {paymentMethod === "razorpay" && (
                  <p className="mb-4 text-center text-[11px] font-semibold text-amber-600">
                    Test Mode — Card: 4718 6000 0000 0002 | 12/26 | CVV 123 |
                    OTP 1234
                  </p>
                )} */}

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled
                  className="mb-4.5 flex h-15 w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-gray-300 text-[15px] font-extrabold text-gray-600 opacity-90"
                >
                  <FiLock size={15} />
                   Ordering Coming Soon
                </motion.button>

                <p className="text-center text-[12px] font-medium text-[#a89880]">
                  Orders will be available very soon.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-5">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#a89880]">
                    <FiShield size={13} />
                    100% Secure
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#a89880]">
                    <FiCheck size={13} />
                    Guaranteed
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#a89880]">
                    <FiRefreshCcw size={13} />
                    Easy Returns
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
