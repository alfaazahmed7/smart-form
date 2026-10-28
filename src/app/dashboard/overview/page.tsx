import Link from "next/link";
import { getDashboardOverview } from "@/services/form.server.services";
import SubmissionActivityChart from "@/components/dashboard/overview/submissionActivityChart";
import {
    LuArrowRight,
    LuChartBar,
    LuCalendarDays,
    LuCircleCheck,
    LuFileText,
    LuInbox,
    LuPencil,
    LuPlus,
    LuTriangleAlert,
    LuTrendingUp,
} from "react-icons/lu";
export const instant = false;



type OverviewData = {
    success?: boolean;
    message?: string;
    user?: { id: string; name: string; email: string };
    summary?: {
        totalForms: number;
        publishedForms: number;
        draftForms: number;
        totalSubmissions: number;
        submissionsToday: number;
        submissionsLast7Days: number;
        avgSubmissionsPerPublishedForm: number;
        mostActiveForm: { id: string; title: string; count: number } | null;
    };
    activity?: { date: string; count: number }[];
    formPerformance?: {
        id: string;
        title: string;
        status: string;
        submission_count: number;
        created_at: string;
        updated_at: string;
    }[];
    recentSubmissions?: {
        id: string;
        form_id: string;
        form_title: string;
        answers: { answers: { questionId: string; question: string; type: string; answer: string }[] } | null;
        submitted_at: string;
    }[];
};

function formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatDateTime(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function answerSummary(answers: { answers: { questionId: string; question: string; type: string; answer: string }[] } | null): string {
    const list = answers?.answers ?? [];
    if (list.length === 0) return "No answers recorded";
    const first = list.find((a) => a.answer && a.answer.trim() !== "");
    if (first) return `${first.question}: ${first.answer}`;
    return `${list.length} answer${list.length === 1 ? "" : "s"}`;
}

function StatusBadge({ status }: { status: string }) {
    const normalized = (status || "").toLowerCase();
    const isPublished = normalized === "published";
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isPublished
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    isPublished ? "bg-emerald-500" : "bg-amber-500"
                }`}
                aria-hidden="true"
            />
            {isPublished
                ? "Published"
                : status
                ? status.charAt(0).toUpperCase() + status.slice(1)
                : "Draft"}
        </span>
    );
}

const DashboardOverviewPage = async () => {
    const result = (await getDashboardOverview()) as OverviewData | undefined;
    const success = result?.success === true;
    const data = success ? result : undefined;

    const user = data?.user;
    const summary = data?.summary;
    const activity = data?.activity ?? [];
    const formPerformance = data?.formPerformance ?? [];
    const recentSubmissions = data?.recentSubmissions ?? [];

    const greetingName = user?.name?.trim() ? user.name.trim() : null;

    if (!success) {
        return (
            <div className="space-y-6 sm:space-y-8">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                            Overview
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                            Track your forms, responses, and activity at a glance.
                        </p>
                    </div>
                </header>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                        <LuTriangleAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Couldn&apos;t load your dashboard
                    </h2>
                    <p className="mt-1 max-w-md text-sm text-gray-600 dark:text-gray-400">
                        {result?.message || "Something went wrong while fetching your overview. Please try again in a moment."}
                    </p>
                </div>
            </div>
        );
    }

    const hasForms = (summary?.totalForms ?? 0) > 0;

    return (
        <div className="space-y-6 sm:space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                        {greetingName ? `Welcome back, ${greetingName}` : "Overview"}
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        Here&apos;s an overview of your forms and the responses you&apos;ve collected.
                    </p>
                </div>
                <Link
                    href="/dashboard/forms/new"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A] cursor-pointer"
                >
                    <LuPlus className="h-4 w-4" aria-hidden="true" />
                    Create Form
                </Link>
            </header>
            {!hasForms ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <LuFileText className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        No forms yet
                    </h2>
                    <p className="mt-1 max-w-md text-sm text-gray-600 dark:text-gray-400">
                        You haven&apos;t created any forms yet. Start building your first form to collect responses.
                    </p>
                    <Link
                        href="/dashboard/forms/new"
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A] cursor-pointer"
                    >
                        <LuPlus className="h-4 w-4" aria-hidden="true" />
                        Create Form
                    </Link>
                </div>
            ) : (
                <>
                    <section aria-labelledby="stats-heading">
                        <h2 id="stats-heading" className="sr-only">Summary statistics</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                { label: "Total Forms", value: summary?.totalForms ?? 0, icon: LuFileText, description: "All forms in your workspace" },
                                { label: "Published Forms", value: summary?.publishedForms ?? 0, icon: LuCircleCheck, description: "Live and accepting responses" },
                                { label: "Total Submissions", value: summary?.totalSubmissions ?? 0, icon: LuInbox, description: "Responses collected across forms" },
                                { label: "Draft Forms", value: summary?.draftForms ?? 0, icon: LuPencil, description: "Forms not yet published" },
                            ].map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-black/20"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                                                <Icon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                        </div>
                                        <p className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                        <p className="mt-0.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {stat.label}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                            {stat.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                <LuCalendarDays className="h-4 w-4" aria-hidden="true" />
                                Today
                            </div>
                            <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                                {summary?.submissionsToday ?? 0}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                submissions received today
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                <LuTrendingUp className="h-4 w-4" aria-hidden="true" />
                                Last 7 days
                            </div>
                            <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                                {summary?.submissionsLast7Days ?? 0}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                submissions received
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                <LuChartBar className="h-4 w-4" aria-hidden="true" />
                                Avg per published form
                            </div>
                            <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                                {summary?.avgSubmissionsPerPublishedForm ?? 0}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                submissions on average
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                <LuInbox className="h-4 w-4" aria-hidden="true" />
                                Most active form
                            </div>
                            <p className="mt-2 truncate text-sm font-semibold text-gray-900 dark:text-white">
                                {summary?.mostActiveForm?.title ?? "—"}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                {summary?.mostActiveForm
                                    ? `${summary.mostActiveForm.count} submission${summary.mostActiveForm.count === 1 ? "" : "s"}`
                                    : "No submissions yet"}
                            </p>
                        </div>
                    </section>


                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Submission activity
                                </h2>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Daily submissions over the last 30 days
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <SubmissionActivityChart data={activity} />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Form performance
                                </h2>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Your forms sorted by submission count
                                </p>
                            </div>
                            <Link
                                href="/dashboard/forms"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                            >
                                View all forms
                                <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                            {formPerformance.map((form) => (
                                <div
                                    key={form.id}
                                    className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                            {form.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                            Created {formatDate(form.created_at)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={form.status} />
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            <LuInbox className="h-3.5 w-3.5" aria-hidden="true" />
                                            {form.submission_count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                    Recent submissions
                                </h2>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Your latest responses, newest first
                                </p>
                            </div>
                            <Link
                                href="/dashboard/submissions"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                            >
                                View all submissions
                                <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                        </div>
                        {recentSubmissions.length === 0 ? (
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                No submissions yet. Responses will appear here once someone fills out your forms.
                            </p>
                        ) : (
                            <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                                {recentSubmissions.map((submission) => (
                                    <li
                                        key={submission.id}
                                        className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                {submission.form_title}
                                            </p>
                                            <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                                                {answerSummary(submission.answers)}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDateTime(submission.submitted_at)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </>
            )}

            <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center shadow-sm sm:p-8 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                <div className="mx-auto max-w-xl">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm dark:bg-indigo-500">
                        <LuPlus className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Ready to build your next form?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Create a form or chatbot in minutes and start collecting responses right away.
                    </p>
                    <Link
                        href="/dashboard/forms/new"
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-50 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A] cursor-pointer"
                    >
                        <LuPlus className="h-4 w-4" aria-hidden="true" />
                        Create Form
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default DashboardOverviewPage;

