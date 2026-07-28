"use client";

import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹499",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% protected checkout",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "We're here Mon–Sat, 9–6",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-[#F5F1EA]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {badges.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center group"
            >
              
              <div
                className="w-16 h-16 flex items-center justify-center mb-4 bg-[#4B5D45] text-[#F5F1EA] transition-transform duration-300 group-hover:-translate-y-1"
                style={{ borderRadius: "42% 58% 61% 39% / 45% 41% 59% 55%" }}
              >
                <Icon size={26} strokeWidth={1.75} />
              </div>

              <h3 className="font-semibold text-[#2B2724] text-base tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-[#6B6457] mt-1">{description}</p>

            
              <span className="mt-3 h-[2px] w-8 bg-[#A8674F] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}