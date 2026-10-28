"use client";

import { useState } from "react";
import { LuCheck, LuChevronDown, LuInfo, LuSend, LuShield } from "react-icons/lu";


const CATEGORIES = ["Product question", "Technical issue", "Feedback or feature suggestion", "Business or collaboration"];

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [attempted, setAttempted] = useState(false);

    const validate = () => {
        const next: { name?: string; email?: string; message?: string } = {};
        if (!name.trim()) next.name = "Please enter your name.";
        if (!email.trim()) next.email = "Please enter your email.";
        else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.trim())) next.email = "Please enter a valid email address.";
        if (!message.trim()) next.message = "Please enter a message.";
        else if (message.trim().length < 10) next.message = "Please add a bit more detail (at least 10 characters).";
        return next;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const next = validate();
        setErrors(next);
        setAttempted(true);
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
            <section className="relative overflow-hidden bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 dark:bg-[#0F172A]">
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Contact</p>
                    <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">Get in touch with the SmartForm team.</h1>
                    <p className="mt-5 text-pretty text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">Have a question about SmartForm, hit a technical issue, or want to share feedback? Use the form below to draft your message.</p>
                </div>
            </section>
            <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Contact categories</p>
                            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Reasons to reach out</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { title: "Product questions", desc: "Ask how a feature works or whether SmartForm fits your use case." },
                                { title: "Technical issues", desc: "Report a bug or unexpected behavior with steps to reproduce." },
                                { title: "Feedback and feature suggestions", desc: "Share ideas for improvements or new capabilities." },
                                { title: "Business or collaboration inquiries", desc: "Discuss partnerships, integrations, or larger deployments." },
                            ].map((c) => (
                                <li key={c.title} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.title}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{c.desc}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                            <div className="flex items-start gap-2">
                                <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                                <p>This contact form is not yet connected to a backend. Your message is not sent. Please copy it and reach out through your usual channel until a submission endpoint is available.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900/60">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="Your name" />
                                    {errors.name && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="you@example.com" />
                                    {errors.email && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="contact-category" className="block text-sm font-medium text-gray-900 dark:text-white">Inquiry category</label>
                                <div className="relative mt-1.5">
                                    <select
                                        id="contact-category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    >
                                        {CATEGORIES.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <LuChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                <textarea id="contact-message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1.5 w-full resize-y rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="Describe your question, issue, or feedback." />
                                {errors.message && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.message}</p>}
                            </div>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]">
                                    <LuSend aria-hidden="true" className="h-4 w-4" /> Review message
                                </button>
                                {attempted && !hasErrors && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Your message looks complete. Since the form is not connected, please copy it and send it through your preferred channel.</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 dark:bg-[#0F172A]">
                <div className="mx-auto max-w-3xl">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"><LuShield aria-hidden="true" className="h-5 w-5" /></div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Reporting a technical issue</h2>
                    <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">To help us resolve problems quickly, please include:</p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2"><LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" /> What you were trying to do and the exact steps to reproduce.</li>
                        <li className="flex items-start gap-2"><LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" /> The page or form involved, including any public link if applicable.</li>
                        <li className="flex items-start gap-2"><LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" /> What you expected to happen and what actually happened.</li>
                        <li className="flex items-start gap-2"><LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" /> Your browser and device, plus any error message shown.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
