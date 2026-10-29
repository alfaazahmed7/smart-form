import type { Metadata } from "next";
import Link from "next/link";
import {
    LuArrowRight,
    LuMessageSquare,
    LuPenLine,
    LuShare2,
    LuInbox,
    LuLayoutDashboard,
    LuChartBar,
    LuCheck,
    LuUsers,
    LuClipboardList,
    LuSparkles,
} from "react-icons/lu";

const STEPS = [
    {
        number: "01",
        title: "Create Your Form",
        description:
            "Start from a blank form and add up to five questions. SmartForm supports short text, email, multiple choice, and yes/no question types. You can mark any question as required, reorder questions by dragging them, and add or remove options for multiple-choice questions.",
        icon: <LuPenLine aria-hidden="true" className="h-5 w-5" />,
    },
    {
        number: "02",
        title: "Customize Your Chatbot",
        description:
            "Switch to the chatbot tab to shape the conversational experience. Configure the welcome message, input placeholder, completion message, theme color, launcher button text, chatbot position, opening behavior and auto-open delay, progress indicator, branding, and whether respondents can restart the conversation.",
        icon: <LuSparkles aria-hidden="true" className="h-5 w-5" />,
    },
    {
        number: "03",
        title: "Publish and Share",
        description:
            "When you publish, SmartForm generates a hosted public link at /forms/[publicId] that anyone can open. You can also copy an embed snippet to place the chatbot widget on your own website, and open the public form directly in a new tab to preview it before sharing.",
        icon: <LuShare2 aria-hidden="true" className="h-5 w-5" />,
    },
    {
        number: "04",
        title: "Collect Responses",
        description:
            "Respondents interact with your form through a conversational chatbot that asks one question at a time, validates answers, and shows progress. Completed submissions are stored and tied to your account, so you always know which form each response came from.",
        icon: <LuMessageSquare aria-hidden="true" className="h-5 w-5" />,
    },
    {
        number: "05",
        title: "Manage Submissions",
        description:
            "Open the Submissions page in your dashboard to review every response in a searchable, organized list. Each submission shows the form it belongs to, a preview of the answers, and the time it was submitted, so you can follow up quickly.",
        icon: <LuInbox aria-hidden="true" className="h-5 w-5" />,
    },
    {
        number: "06",
        title: "Review Available Statistics",
        description:
            "The dashboard overview displays total forms, published and draft counts, total submissions, submissions today and over the last seven days, average submissions per published form, a 30-day activity chart, per-form performance, and your most active form.",
        icon: <LuChartBar aria-hidden="true" className="h-5 w-5" />,
    },
];

const USE_CASES = [
    {
        title: "Customer Feedback",
        description:
            "Collect product or service feedback after a purchase or interaction. Use multiple-choice and yes/no questions for quick ratings, and a short-text question for open comments.",
    },
    {
        title: "Contact Inquiries",
        description:
            "Replace static contact forms with a conversational flow that asks for name, email, and message one step at a time, making it easier for visitors to reach out.",
    },
    {
        title: "Surveys",
        description:
            "Run short surveys to gauge satisfaction, preferences, or opinions. The chatbot format keeps respondents engaged and reduces drop-off compared with long traditional forms.",
    },
    {
        title: "Questionnaires",
        description:
            "Build structured questionnaires for research, onboarding, or intake. Required fields ensure you capture the information you need before a submission is accepted.",
    },
    {
        title: "Lead Collection",
        description:
            "Capture prospective customer details through an embedded chatbot on your website. Published forms provide a shareable link you can use in campaigns, emails, or social posts.",
    },
];

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how SmartForm works: create forms with up to five questions, customize the chatbot experience, publish and share, collect responses, and manage submissions.",
};

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
            <section className="relative overflow-hidden bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 dark:bg-[#0F172A]">
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        How it works
                    </p>
                    <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                        From Form Creation to Insights, Made Simple.
                    </h1>
                    <p className="mt-5 text-pretty text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                        SmartForm helps you build forms, turn them into conversational chatbot experiences, collect responses from anyone with a link, and review every submission from a single dashboard. No code, no setup friction.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/dashboard/forms/new"
                            className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-gray-950"
                        >
                            Create your first form
                            <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                        <a
                            href="#workflow"
                            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-950"
                        >
                            See the workflow
                        </a>
                    </div>
                </div>
            </section>
            <section id="workflow" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                            Step-by-step workflow
                        </p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Six steps from blank page to actionable insights
                        </h2>
                        <p className="mt-4 text-pretty text-base leading-relaxed text-gray-600 dark:text-gray-300">
                            Every stage of the SmartForm workflow is built into the dashboard, so you never have to leave the app to ship a form or read a response.
                        </p>
                    </div>
                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {STEPS.map((step) => (
                            <article key={step.number} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-black/20">
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                                        {step.icon}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-300 dark:text-gray-600">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 dark:bg-[#0F172A]">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                            Use cases
                        </p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Built for the conversations your business already needs
                        </h2>
                        <p className="mt-4 text-pretty text-base leading-relaxed text-gray-600 dark:text-gray-300">
                            SmartForm fits anywhere you would otherwise send a link to a traditional form. A few common examples:
                        </p>
                    </div>
                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {USE_CASES.map((useCase) => (
                            <div key={useCase.title} className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/40">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <LuClipboardList aria-hidden="true" className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                                    {useCase.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    {useCase.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-3xl rounded-2xl border border-indigo-200 bg-indigo-50 p-8 text-center shadow-sm sm:p-10 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm dark:bg-indigo-500">
                        <LuUsers aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        Ready to put your forms to work?
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        Create a form, customize its chatbot, publish it, and start collecting responses in minutes.
                    </p>
                    <Link
                        href="/dashboard/forms/new"
                        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-50 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                    >
                        <LuPenLine aria-hidden="true" className="h-4 w-4" /> Create Form
                    </Link>
                </div>
            </section>
        </div>
    );
}
