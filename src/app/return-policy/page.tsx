"use client";

import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";

const sections = [
    {
        title: "Return Eligibility",
        content: [
            {
                subtitle: "Return Window",
                text: "You may request a return within 7 days of the delivery date. Requests made after this window cannot be accepted, so please inspect your order as soon as it arrives.",
            },
            {
                subtitle: "Item Condition",
                text: "To be eligible for a return, the item must be unused, undamaged, and in its original packaging with all tags, accessories, and documentation intact. Items that show signs of use or damage after delivery are not eligible.",
            },
        ],
    },
    {
        title: "Non-Returnable Items",
        content: [
            {
                subtitle: "Customized Products",
                text: "Products that are customized, personalized, or made to order specifically for you cannot be returned unless they arrive damaged or defective.",
            },
            {
                subtitle: "Final Sale Items",
                text: "Items explicitly marked as 'Final Sale' at the time of purchase are not eligible for return or refund.",
            },
            {
                subtitle: "Misused Products",
                text: "Products damaged due to misuse, improper handling, or negligence after delivery are not covered under this return policy.",
            },
        ],
    },
    {
        title: "How to Request a Return",
        content: [
            {
                subtitle: "Step 1 — Contact Us",
                text: "Email us at info@nishmee.in or call +91 9818185270 within 7 days of delivery, mentioning your order ID and reason for return.",
            },
            {
                subtitle: "Step 2 — Approval",
                text: "Our team will review your request and confirm pickup eligibility within 24–48 hours of receiving your request.",
            },
            {
                subtitle: "Step 3 — Pack & Handover",
                text: "Pack the item securely in its original packaging for pickup or drop-off, as instructed by our support team.",
            },
            {
                subtitle: "Step 4 — Inspection & Resolution",
                text: "Once we receive and inspect the returned item, your refund or replacement will be processed accordingly.",
            },
        ],
    },
    {
        title: "Refunds",
        content: [
            {
                subtitle: "Processing Time",
                text: "Once your returned item is received and inspected, we will notify you of the approval status. Approved refunds are processed to your original payment method within 5–7 business days.",
            },
            {
                subtitle: "Cash on Delivery Orders",
                text: "For Cash on Delivery orders, refunds are issued via bank transfer or UPI after we confirm your payment details with you.",
            },
        ],
    },
    {
        title: "Damaged or Wrong Items",
        content: [
            {
                subtitle: "Reporting Window",
                text: "If you receive a damaged, defective, or incorrect product, please contact us within 48 hours of delivery along with photos of the item and its packaging.",
            },
            {
                subtitle: "Our Resolution",
                text: "We will arrange a free replacement or full refund for verified cases — you will not bear any return shipping cost in this situation.",
            },
        ],
    },
    {
        title: "Exchanges",
        content: [
            {
                subtitle: "Current Policy",
                text: "We currently do not offer direct exchanges. If you would like a different product, size, or variant, please return the original item for a refund and place a new order separately.",
            },
        ],
    },
];

export default function ReturnPolicyPage() {
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
                            Customer Care
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[36px] sm:text-[52px] font-black text-white leading-tight mb-4"
                        >
                            Return & Refund Policy
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
                            At <span className="font-bold text-[#111827]">NISH<span className="flex-row text-[#c9a96e]">MEE</span></span>, we want you to love what you ordered. This Return & Refund Policy explains the conditions under which returns are accepted, how refunds are processed, and what to do if something isn't quite right. Please read this policy carefully before requesting a return.
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
                                            {section.content.length > 1 && (
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
                                                    <h3 className="text-[14px] sm:text-[15px] font-bold text-[#111827]">
                                                        {item.subtitle}
                                                    </h3>
                                                </div>
                                            )}
                                            <p className="text-[14px] sm:text-[15px] text-[#6b6560] leading-[1.85] pl-3.5">
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
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-8 rounded-[24px] bg-[#111827] p-6 sm:p-8"
                    >
                        <h2 className="text-[20px] sm:text-[22px] font-black text-white mb-3">
                            Need Help With a Return?
                        </h2>
                        <p className="text-[14px] sm:text-[15px] text-white/60 leading-[1.85] mb-5">
                            Our support team is happy to help you with your return, exchange, or refund request. Reach out to us anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://mail.google.com/mail/?view=cm&to=info@nishmee.in&su=Return Request&body=Hello Nish Mee Team,%0D%0A%0D%0AOrder ID:%0D%0AReason for return:"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#111827] hover:bg-[#c9a96e] transition-colors"
                            >
                                📧 info@nishmee.in
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