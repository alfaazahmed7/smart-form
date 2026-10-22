"use client";

import { Logo } from "@/components/shared/navbar/navbar";
import { LuArrowUpRight } from "react-icons/lu";

const YEAR = new Date().getFullYear();

const NAVIGATION_LINKS = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
];

const PRODUCT_LINKS = [
    { label: "Form Builder", href: "#features" },
    { label: "Chatbot Widget", href: "#chatbot-widget-demo" },
];

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50 px-4 pb-10 pt-14 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#0F172A]">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Logo />
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            SmartForm is the interactive form builder and chatbot widget
                            platform for creating conversational forms and collecting
                            better responses — no code required.
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav aria-label="Footer navigation">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Navigation
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {NAVIGATION_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-600 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:text-gray-400 dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Product */}
                    <nav aria-label="Product">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Product
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {PRODUCT_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-600 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:text-gray-400 dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div id="contact" className="scroll-mt-24">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Contact
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            Questions about SmartForm? Leave your name and email in our
                            live chat demo and the team will get back to you.
                        </p>
                        <a
                            href="#chatbot-widget-demo"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:text-indigo-300 dark:hover:text-indigo-200 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                        >
                            Open the chat demo
                            <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row dark:border-white/10">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        © {YEAR} SmartForm. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Interactive form builder &amp; chatbot widget platform
                    </p>
                </div>
            </div>
        </footer>
    );
}
