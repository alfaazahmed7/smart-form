import Link from "next/link";
import {
    LuArrowRight,
    LuBot,
    LuChartBar,
    LuCircleCheck,
    LuClock,
    LuFileText,
    LuInbox,
    LuPalette,
    LuPencil,
    LuPlus,
    LuTrendingUp,
} from "react-icons/lu";

const STATS = [
    {
        label: "Total Forms",
        value: "12",
        icon: LuFileText,
        description: "All forms created in your workspace",
        indicator: "+2 this month",
        indicatorTone: "text-emerald-600 dark:text-emerald-400",
    },
    {
        label: "Published Forms",
        value: "8",
        icon: LuCircleCheck,
        description: "Live and accepting responses",
        indicator: "66.7% of total",
        indicatorTone: "text-indigo-600 dark:text-indigo-400",
    },
    {
        label: "Total Responses",
        value: "1,284",
        icon: LuInbox,
        description: "Submissions collected across forms",
        indicator: "+124 this week",
        indicatorTone: "text-emerald-600 dark:text-emerald-400",
    },
    {
        label: "Response Rate",
        value: "68.5%",
        icon: LuTrendingUp,
        description: "Average completion across published forms",
        indicator: "Above 60% target",
        indicatorTone: "text-indigo-600 dark:text-indigo-400",
    },
];

const ACTIVITY_DATA = [
    { day: "Mon", count: 120 },
    { day: "Tue", count: 185 },
    { day: "Wed", count: 142 },
    { day: "Thu", count: 210 },
    { day: "Fri", count: 176 },
    { day: "Sat", count: 98 },
    { day: "Sun", count: 153 },
];

const RECENT_FORMS = [
    { name: "Customer Feedback Survey", status: "Published", responses: 432 },
    { name: "Job Application Form", status: "Published", responses: 187 },
    { name: "Event Registration", status: "Draft", responses: 0 },
];

const RECENT_ACTIVITY = [
    { text: "New response received for Customer Feedback Survey", time: "2 hours ago", icon: LuInbox },
    { text: "Job Application Form was published", time: "5 hours ago", icon: LuCircleCheck },
    { text: "Event Registration was updated", time: "1 day ago", icon: LuPencil },
];

const QUICK_ACTIONS = [
    { label: "Create a Form", href: "/forms/new", icon: LuPlus },
    { label: "View My Forms", href: "/dashboard/forms", icon: LuFileText },
    { label: "View Submissions", href: "/dashboard/submissions", icon: LuInbox },
    { label: "Customize Chatbot", href: "/dashboard/settings", icon: LuPalette },
];

const maxActivity = Math.max(...ACTIVITY_DATA.map((d) => d.count));

const DashboardOverviewPage = () => {
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
                <Link
                    href="/dashboard/forms/new"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                >
                    <LuPlus className="h-4 w-4" aria-hidden="true" />
                    Create Form
                </Link>
            </header>

            <section aria-labelledby="stats-heading">
                <h2 id="stats-heading" className="sr-only">Summary statistics</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {STATS.map((stat) => {
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
                                    <span className={`text-xs font-medium ${stat.indicatorTone}`}>
                                        {stat.indicator}
                                    </span>
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
            <section
                aria-labelledby="activity-chart-heading"
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60"
            >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 id="activity-chart-heading" className="text-base font-semibold text-gray-900 dark:text-white">
                            Response Activity
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Sample response counts over the last 7 days
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <LuChartBar className="h-4 w-4" aria-hidden="true" />
                        <span>Sample data</span>
                    </div>
                </div>

                <div className="mt-6 flex h-48 items-end justify-between gap-2 sm:gap-3">
                    {ACTIVITY_DATA.map((d) => {
                        const heightPct = Math.round((d.count / maxActivity) * 100);
                        return (
                            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                                <div className="flex w-full flex-1 items-end">
                                    <div
                                        className="w-full rounded-t-lg bg-indigo-500/80 transition-all duration-300 hover:bg-indigo-600 dark:bg-indigo-400/70 dark:hover:bg-indigo-400"
                                        style={{ height: `${heightPct}%` }}
                                        title={`${d.day}: ${d.count} responses`}
                                        aria-label={`${d.day}: ${d.count} responses`}
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {d.day}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <span>Total this week: 1,084 responses</span>
                    <span>Peak day: Thursday</span>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <section
                    aria-labelledby="recent-forms-heading"
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60"
                >
                    <div className="flex items-center justify-between">
                        <h2 id="recent-forms-heading" className="text-base font-semibold text-gray-900 dark:text-white">
                            Recent Forms
                        </h2>
                        <Link
                            href="/dashboard/forms"
                            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            View All Forms
                            <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                    </div>

                    <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                        {RECENT_FORMS.map((form) => (
                            <li
                                key={form.name}
                                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                        {form.name}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${form.status === "Published"
                                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                            }`}
                                    >
                                        {form.status}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {form.responses} responses
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section
                    aria-labelledby="recent-activity-heading"
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60"
                >
                    <div className="flex items-center justify-between">
                        <h2 id="recent-activity-heading" className="text-base font-semibold text-gray-900 dark:text-white">
                            Recent Activity
                        </h2>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Sample activities</span>
                    </div>

                    <ul className="mt-4 space-y-3">
                        {RECENT_ACTIVITY.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.text}
                                    className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.text}</p>
                                        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <LuClock className="h-3 w-3" aria-hidden="true" />
                                            {item.time}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>

            <section
                aria-labelledby="quick-actions-heading"
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60"
            >
                <h2 id="quick-actions-heading" className="text-base font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Jump to common tasks in your workspace
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {QUICK_ACTIONS.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors duration-200 group-hover:border-indigo-200 group-hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:group-hover:border-indigo-500/30 dark:group-hover:text-indigo-400">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                    {action.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center shadow-sm sm:p-8 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                <div className="mx-auto max-w-xl">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm dark:bg-indigo-500">
                        <LuBot className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Ready to build your next form?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Create a form or chatbot in minutes and start collecting responses right away.
                    </p>
                    <Link
                        href="/forms/new"
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-50 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
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

