import Link from "next/link";
import { LuArrowRight, LuCheck, LuHeart, LuLightbulb, LuShield, LuSparkles, LuTarget, LuUsers } from "react-icons/lu";

const BENEFITS = [
    { title: "Straightforward form building", desc: "Add questions, mark them required, reorder them, and publish in minutes without writing code." },
    { title: "Conversational chatbot experiences", desc: "Each form becomes a guided chat that asks one question at a time and validates answers." },
    { title: "Available chatbot customization", desc: "Tune welcome and completion messages, theme color, position, launcher text, branding, and more." },
    { title: "Organized submission management", desc: "Review every response in a searchable list with form context and submission time." },
    { title: "A centralized dashboard", desc: "Track forms, submissions, and 30-day activity from one overview screen." },
];

const PRINCIPLES = [
    { title: "Usability", desc: "Interfaces stay clear and predictable so anyone can build and share a form quickly." },
    { title: "Clarity", desc: "Questions, settings, and results are labeled plainly to avoid confusion." },
    { title: "Simplicity", desc: "We favor a small set of well-supported question types over feature bloat." },
    { title: "Responsible handling", desc: "Collected responses are scoped to the account that owns each form." },
];

const AUDIENCES = ["Small businesses", "Freelancers", "Marketing teams", "Product teams", "Individuals"];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
            <section className="relative overflow-hidden bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 dark:bg-[#0F172A]">
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">About SmartForm</p>
                    <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">Forms that feel like conversations, managed in one place.</h1>
                    <p className="mt-5 text-pretty text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">SmartForm is an interactive form builder and chatbot widget platform. It helps people design forms, publish them as conversational experiences, collect responses, and keep everything organized without writing code.</p>
                </div>
            </section>
            <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"><LuTarget aria-hidden="true" className="h-5 w-5" /></div>
                        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Our mission</h2>
                        <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">SmartForm aims to simplify form creation, make response collection more approachable for visitors, and keep submissions organized for the people who need to act on them. The goal is a single, calm workflow from first question to final insight.</p>
                    </div>
                    <div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"><LuLightbulb aria-hidden="true" className="h-5 w-5" /></div>
                        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">The problem we solve</h2>
                        <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">Traditional forms are often long and easy to abandon. SmartForm turns the same questions into a step-by-step conversation, validates input as it goes, and stores responses where you can review and follow up without switching tools.</p>
                    </div>
                </div>
            </section>
            <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 dark:bg-[#0F172A]">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Why SmartForm</p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Practical benefits, not buzzwords</h2>
                    </div>
                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {BENEFITS.map((b) => (
                            <div key={b.title} className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/40">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"><LuCheck aria-hidden="true" className="h-5 w-5" /></div>
                                <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">{b.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"><LuUsers aria-hidden="true" className="h-5 w-5" /></div>
                        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Who it is for</h2>
                        <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">SmartForm works for anyone who needs to ask structured questions and read the answers: {AUDIENCES.join(", ").toLowerCase()}.</p>
                    </div>
                    <div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"><LuShield aria-hidden="true" className="h-5 w-5" /></div>
                        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Product principles</h2>
                        <ul className="mt-3 space-y-3">
                            {PRINCIPLES.map((p) => (
                                <li key={p.title} className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold text-gray-900 dark:text-white">{p.title}.</span> {p.desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-3xl rounded-2xl border border-indigo-200 bg-indigo-50 p-8 text-center shadow-sm sm:p-10 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm dark:bg-indigo-500"><LuSparkles aria-hidden="true" className="h-6 w-6" /></div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Start building today</h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">Create your first form and see how a conversational experience changes response rates.</p>
                    <Link href="/dashboard/forms/new" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-50 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]">
                        <LuArrowRight aria-hidden="true" className="h-4 w-4" /> Create Form
                    </Link>
                </div>
            </section>
        </div>
    );
}