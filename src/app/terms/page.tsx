"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    content: [
      {
        subtitle: "",
        text: "Welcome to NishMee. These Terms and Conditions govern your access to and use of our website and your purchase of products from our store. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, please discontinue use of our website.",
      },
    ],
  },
  {
    title: "Use of Our Website",
    content: [
      {
        subtitle: "Permitted Use",
        text: "You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by any third party.",
      },
      {
        subtitle: "Prohibited Activities",
        text: "You must not use our website in any way that causes, or may cause, damage to the website or impairment of its availability or accessibility. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.",
      },
    ],
  },
  {
    title: "Products & Pricing",
    content: [
      {
        subtitle: "Product Information",
        text: "All products displayed on our website are subject to availability. We make every effort to display product colors, dimensions, and details as accurately as possible; however, slight variations may occur due to the handcrafted nature of certain items, lighting conditions during photography, and individual display settings.",
      },
      {
        subtitle: "Pricing",
        text: "Prices for products are listed in Indian Rupees (₹) and are subject to change without prior notice. We reserve the right to modify, discontinue, or update any product listing, description, or price at any time without liability to you.",
      },
    ],
  },
  {
    title: "Orders & Payment",
    content: [
      {
        subtitle: "Placing an Order",
        text: "By placing an order through our website, you confirm that all information provided, including shipping address and contact details, is accurate, current, and complete. An order constitutes an offer to purchase, which we may accept or decline at our discretion.",
      },
      {
        subtitle: "Payment Methods",
        text: "We currently accept payment via Cash on Delivery (COD). Additional payment methods may be introduced in the future and will be reflected at checkout.",
      },
      {
        subtitle: "Order Cancellation",
        text: "We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud, unauthorized or illegal activity, errors in product or pricing information, or unavailability of stock.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    content: [
      {
        subtitle: "Delivery Timelines",
        text: "We aim to process and ship orders within the estimated delivery timeframe shown at checkout. Delivery times are estimates only and may vary due to factors beyond our control, including courier delays, weather conditions, regional restrictions, or remote locations.",
      },
      {
        subtitle: "Shipping Charges",
        text: "Free shipping is applicable on orders above ₹500. A standard shipping fee of ₹40 applies to orders below this amount. Shipping charges, if any, will be clearly displayed at checkout before order confirmation.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    content: [
      {
        subtitle: "Return Eligibility",
        text: "We offer a 7-day return policy from the date of delivery. To be eligible for a return, the item must be unused, in its original packaging, with all tags and accessories intact, and in the same condition that you received it.",
      },
      {
        subtitle: "Initiating a Return",
        text: "To initiate a return, please contact us at support@nishmee.com with your order ID and reason for return. Our team will guide you through the process and provide further instructions.",
      },
      {
        subtitle: "Refund Processing",
        text: "Refunds, once approved, will be processed within 5–7 business days to the original mode of payment, where applicable. Items damaged due to misuse, normal wear and tear, or improper handling are not eligible for return or refund.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      {
        subtitle: "",
        text: "All content on this website, including text, graphics, logos, images, icons, and product designs, is the property of NishMee or its content suppliers and is protected by applicable intellectual property laws. Unauthorized reproduction, distribution, modification, or use of any content from this website without our prior written consent is strictly prohibited.",
      },
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      {
        subtitle: "",
        text: "NishMee shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of, or inability to use, our website or products. To the maximum extent permitted by law, our total liability for any claim arising out of or relating to a purchase shall not exceed the amount paid by you for the product in question.",
      },
    ],
  },
  {
    title: "Changes to These Terms",
    content: [
      {
        subtitle: "",
        text: "We reserve the right to update, amend, or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon being posted to this page. Your continued use of the website following any changes constitutes your acceptance of the revised terms.",
      },
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>

      <section className="min-h-screen bg-[#f8f5f0]">

        {/* HERO */}
        <div className="bg-[#111827] pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] uppercase tracking-[5px] text-[#c9a96e] font-semibold mb-4"
            >
              Legal
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[36px] sm:text-[52px] font-black text-white leading-tight mb-4"
            >
              Terms &amp; Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-[15px]"
            >
              Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </motion.p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

          {/* INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-[24px] p-6 sm:p-8 mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
          >
            <p className="text-[15px] sm:text-[16px] text-[#4a4540] leading-[1.9]">
              Welcome to <span className="font-bold text-[#111827]">NISH<span className="text-[#c9a96e]">MEE</span></span>. These Terms and Conditions outline the rules and regulations for the use of our website and the purchase of our products. By accessing this website, we assume you accept these terms and conditions in full. Please read them carefully before continuing to use our website.
            </p>
          </motion.div>

          {/* SECTIONS */}
          <div className="space-y-6">
            {sections.map((section, sIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * sIndex }}
                className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
              >
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[12px] font-black text-white">
                    {sIndex + 1}
                  </div>
                  <h2 className="text-[20px] sm:text-[22px] font-black text-[#111827]">
                    {section.title}
                  </h2>
                </div>

                {/* Sub-sections */}
                <div className="space-y-5">
                  {section.content.map((item, iIndex) => (
                    <div key={iIndex}>
                      {item.subtitle && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
                          <h3 className="text-[14px] sm:text-[15px] font-bold text-[#111827]">
                            {item.subtitle}
                          </h3>
                        </div>
                      )}
                      <p className={`text-[14px] sm:text-[15px] text-[#6b6560] leading-[1.85] ${item.subtitle ? "pl-3.5" : ""}`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 rounded-[24px] bg-[#111827] p-6 sm:p-8"
          >
            <h2 className="text-[20px] sm:text-[22px] font-black text-white mb-3">
              Questions About These Terms?
            </h2>
            <p className="text-[14px] sm:text-[15px] text-white/60 leading-[1.85] mb-5">
              If you have any questions or concerns regarding these Terms and Conditions, please feel free to reach out to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&to=support@nishmee.com&su=Terms %26 Conditions Query&body=Hello Nish Mee Team,"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#111827] hover:bg-[#c9a96e] transition-colors"
              >
                📧 support@nishmee.com
              </a>
              <a
                href="/contact"
                className="flex h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-[13px] font-bold text-white hover:bg-white/10 transition-colors"
              >
                Contact Page →
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
}