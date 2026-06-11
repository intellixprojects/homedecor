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
  FiMapPin,
  FiLoader,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Footer from "@/components/footer/Footer";
import { clearCart } from "@/store/features/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal >= 5000 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // AUTO FILL LOCATION
  const handleAutoFill = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const addr = data.address || {};

          setFormData((prev) => ({
            ...prev,
            address: [
              addr.house_number,
              addr.road,
              addr.neighbourhood || addr.suburb,
            ]
              .filter(Boolean)
              .join(", "),
            city:
              addr.city ||
              addr.town ||
              addr.village ||
              addr.county ||
              "",
            state: addr.state || "",
            zip: addr.postcode || "",
          }));
        } catch {
          setLocationError("Could not fetch address. Please fill manually.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please allow location access.");
        } else {
          setLocationError("Could not get location. Please fill manually.");
        }
      },
      { timeout: 10000 }
    );
  };

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill all required fields");
      return;
    }

    const userEmail =
      currentUser?.email ||
      JSON.parse(localStorage.getItem("currentUser") || "{}").email ||
      formData.email;

    if (!userEmail) {
      alert("Please login to place an order");
      window.location.href = "/login";
      return;
    }

    try {
      const orderData = {
        orderId: `NSH-${Date.now()}`,
        userEmail,
        estimatedDelivery: "3 - 5 Business Days",
        subtotal, shipping, discount,
        totalAmount: total,
        status: "Processing",
        shippingAddress: `${formData.fullName}, ${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`,
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })),
      };

      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Order creation failed");
        return;
      }

      dispatch(clearCart());
      alert("Order Placed Successfully");
      window.location.href = "/success";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const email = currentUser?.email || JSON.parse(localStorage.getItem("currentUser") || "{}").email;
    if (email) {
      const stored = JSON.parse(localStorage.getItem(`cart_${email}`) || "[]");
      setCartItems(stored);
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <>
      <section className="min-h-screen bg-[#f8f5f0]">

        {/* TOP BAR */}
        <div className="border-b border-[#ede9e3] bg-white py-[18px]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
            <Link href="/cart" className="flex items-center gap-2 text-[13px] font-semibold text-[#a89880] transition-colors hover:text-black">
              <FiArrowLeft size={14} />
              Back To Cart
            </Link>

            <h1 className="ml-[120px] text-[22px] font-black tracking-[-1px] text-[#111827]">Checkout</h1>

            <div className="hidden items-center gap-2 text-[12px] font-semibold md:flex">
              {["Cart", "Shipping", "Payment"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 ${i <= 1 ? "text-black" : "text-[#c4b8a8]"}`}>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i <= 1 ? "bg-black text-white" : "bg-[#e8e0d4] text-[#a89880]"}`}>
                      {i <= 1 ? <FiCheck size={10} /> : i + 1}
                    </div>
                    {step}
                  </div>
                  {i < 2 && <FiChevronRight size={12} className="text-[#c4b8a8]" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-[90px] pt-[50px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

            {/* LEFT — SHIPPING FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[34px] bg-white p-[34px] shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-[30px] font-black text-[#111827]">Shipping Details</h2>

                {/* AUTO FILL BUTTON */}
                <button
                  onClick={handleAutoFill}
                  disabled={locating}
                  className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-[#f8f5f0] px-4 py-2.5 text-[13px] font-semibold text-[#111827] transition-all hover:bg-[#111827] hover:text-white disabled:opacity-60"
                >
                  {locating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Detecting...
                    </>
                  ) : (
                    <>
                      <FiMapPin size={14} />
                      Use My Location
                    </>
                  )}
                </button>
              </div>

              {/* Location error */}
              {locationError && (
                <div className="mb-5 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
                  {locationError}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-[10px] block text-sm font-medium">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" className="h-[58px] w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-[18px] outline-none transition focus:border-black" />
                </div>
                <div>
                  <label className="mb-[10px] block text-sm font-medium">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="h-[58px] w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-[18px] outline-none transition focus:border-black" />
                </div>
                <div>
                  <label className="mb-[10px] block text-sm font-medium">Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="h-[58px] w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-[18px] outline-none transition focus:border-black" />
                </div>
                <div>
                  <label className="mb-[10px] block text-sm font-medium">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" className="h-[58px] w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-[18px] outline-none transition focus:border-black" />
                </div>
              </div>

              <div className="mt-[22px]">
                <label className="mb-[10px] block text-sm font-medium">Full Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className="h-[58px] w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-[18px] outline-none transition focus:border-black" />
              </div>

              <div className="mt-[22px] grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-[10px] block text-sm font-medium">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" className="h-[58px] w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-[18px] outline-none transition focus:border-black" />
                </div>
                <div>
                  <label className="mb-[10px] block text-sm font-medium">ZIP Code</label>
                  <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP code" className="h-[58px] w-full rounded-[18px] border border-transparent bg-[#f8f5f0] px-[18px] outline-none transition focus:border-black" />
                </div>
              </div>
            </motion.div>

            {/* RIGHT — ORDER SUMMARY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-28 flex flex-col gap-5"
            >
              <div className="h-fit rounded-[34px] bg-white p-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

                <div className="mb-[26px] flex items-center justify-between">
                  <h2 className="text-[28px] font-black text-[#111827]">Order Summary</h2>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]"><FiTag /></div>
                </div>

                <div className="mb-[26px] flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[18px] bg-[#f8f5f0]">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-[6px] text-[15px] font-bold leading-[1.3] text-[#111827]">{item.title}</h3>
                        <p className="text-[13px] text-[#a89880]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[16px] font-black text-[#111827]">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-[24px] border-t border-dashed border-[#e8e0d4] pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[14px] text-[#a89880]">Subtotal</p>
                      <p className="text-[12px] text-[#c4b8a8]">{cartItems.length} items</p>
                    </div>
                    <span className="font-bold text-[#111827]">₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-[14px] text-[#a89880]">Discount (10%)</p>
                        <p className="text-[12px] text-emerald-600">Luxury offer applied</p>
                      </div>
                      <span className="font-bold text-emerald-600">-₹{discount}</span>
                    </div>
                  )}

                  <div className="mb-[22px] flex items-center justify-between">
                    <div>
                      <p className="text-[14px] text-[#a89880]">Shipping</p>
                      <p className={`text-[12px] ${shipping === 0 ? "text-emerald-600" : "text-[#c4b8a8]"}`}>
                        {shipping === 0 ? "Free Delivery" : "Standard Delivery"}
                      </p>
                    </div>
                    <span className={`font-bold ${shipping === 0 ? "text-emerald-600" : "text-[#111827]"}`}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-[22px] bg-[#111827] px-[22px] py-5">
                    <div>
                      <p className="text-sm text-white/60">Total Amount</p>
                      <p className="text-xs text-white">Secure SSL Checkout</p>
                    </div>
                    <span className="text-[28px] font-black text-white">₹{total}</span>
                  </div>
                </div>

                <div className="mb-[24px] rounded-[24px] bg-[#f8f5f0] p-[18px]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-white"><FiCreditCard /></div>
                    <div>
                      <p className="font-bold text-[#111827]">Cash On Delivery</p>
                      <p className="text-sm text-[#a89880]">Pay when your order arrives</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  className="mb-[18px] flex h-[60px] w-full items-center justify-center gap-3 rounded-full bg-[#c9a96e] text-[15px] font-extrabold text-black transition-all duration-300 hover:bg-[#b8955a]"
                >
                  <FiLock size={15} />
                  Place Secure Order
                </motion.button>

                <div className="flex flex-wrap items-center justify-center gap-5">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#a89880]"><FiShield size={13} />Secure</div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#a89880]"><FiCheck size={13} />Guaranteed</div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#a89880]"><FiRefreshCcw size={13} />Easy Returns</div>
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