"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";

const sections = [
    {
        title: "Information We Collect",
        content: [
            {
                subtitle: "Personal Information",
                text: "When you create an account or place an order, we collect information such as your name, email address, phone number, and shipping address. This information is necessary to process your orders and provide you with our services.",
            },
            {
                subtitle: "Payment Information",
                text: "We do not store your payment card details on our servers. All payment transactions are processed through secure third-party payment gateways that comply with PCI DSS standards.",
            },
            {
                subtitle: "Usage Data",
                text: "We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, time spent on pages, and other diagnostic data. This helps us improve our website and services.",
            },
        ],
    },
    {
        title: "How We Use Your Information",
        content: [
            {
                subtitle: "Order Processing",
                text: "We use your personal information to process and fulfill your orders, send order confirmations, provide shipping updates, and handle returns or exchanges.",
            },
            {
                subtitle: "Communication",
                text: "We may use your email address to send you important updates about your account, orders, and our services. With your consent, we may also send promotional emails about new products, special offers, and events.",
            },
            {
                subtitle: "Service Improvement",
                text: "We analyze usage data to understand how customers interact with our website, which helps us improve our products, services, and overall user experience.",
            },
        ],
    },
    {
        title: "Information Sharing",
        content: [
            {
                subtitle: "Third-Party Service Providers",
                text: "We share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders. These providers are contractually obligated to keep your information confidential.",
            },
            {
                subtitle: "Legal Requirements",
                text: "We may disclose your information if required to do so by law or in response to valid requests by public authorities, such as a court or government agency.",
            },
            {
                subtitle: "Business Transfers",
                text: "If Nish Mee is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your information is transferred.",
            },
        ],
    },
    {
        title: "Data Security",
        content: [
            {
                subtitle: "Security Measures",
                text: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. This includes SSL encryption, secure servers, and regular security audits.",
            },
            {
                subtitle: "Data Retention",
                text: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. When your data is no longer needed, we securely delete or anonymize it.",
            },
        ],
    },
    {
        title: "Your Rights",
        content: [
            {
                subtitle: "Access & Correction",
                text: "You have the right to access the personal information we hold about you and request corrections if any information is inaccurate or incomplete. You can do this through your account settings or by contacting us.",
            },
            {
                subtitle: "Deletion",
                text: "You may request that we delete your personal information. We will honor such requests subject to any legal obligations we may have to retain certain data.",
            },
            {
                subtitle: "Opt-Out",
                text: "You can opt out of receiving promotional emails from us at any time by clicking the unsubscribe link in any email or by contacting us directly. Note that you will still receive transactional emails related to your orders.",
            },
        ],
    },
    {
        title: "Cookies",
        content: [
            {
                subtitle: "What Are Cookies",
                text: "Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, keep you logged in, and understand how you use our site.",
            },
            {
                subtitle: "Types We Use",
                text: "We use essential cookies (required for the website to function), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings). We do not use advertising cookies.",
            },
            {
                subtitle: "Managing Cookies",
                text: "You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website.",
            },
        ],
    },
    {
        title: "Children's Privacy",
        content: [
            {
                subtitle: "Age Restriction",
                text: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will delete it.",
            },
        ],
    },
    {
        title: "Changes to This Policy",
        content: [
            {
                subtitle: "Updates",
                text: "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of significant changes by posting the new policy on this page with an updated date.",
            },
        ],
    },
];

export default function PrivacyPolicyPage() {
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
                            Privacy Policy
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
                            At <span className="font-bold text-[#111827]">NISH<span className="flex-row text-[#c9a96e]">MEE</span></span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read this policy carefully. By using our services, you agree to the practices described in this policy.
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
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="mt-8 rounded-[24px] bg-[#111827] p-6 sm:p-8"
                    >
                        <h2 className="text-[20px] sm:text-[22px] font-black text-white mb-3">
                            Contact Us
                        </h2>
                        <p className="text-[14px] sm:text-[15px] text-white/60 leading-[1.85] mb-5">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to reach out to us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://mail.google.com/mail/?view=cm&to=nishmee@gmail.com&su=Privacy Policy Query&body=Hello Nish Mee Team,"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#111827] hover:bg-[#c9a96e] transition-colors"
                            >
                                📧 nishmee@gmail.com
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