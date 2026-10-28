import Link from "next/link";
import { getFroms } from "@/services/form.server.services";
import { LuFileText, LuPlus, LuTriangleAlert } from "react-icons/lu";
import FormsTable, { type FormsTableForm } from "@/components/dashboard/form/formsTable";
export const instant = false;

const DashboardFormsPage = async () => {
    const result = await getFroms();
    const success = result?.success === true;
    const rawForms = success && Array.isArray(result?.forms) ? result.forms : [];
    const forms: FormsTableForm[] = rawForms.map((form: Record<string, unknown>) => ({
        id: String(form?.id ?? ""),
        title: String(form?.title ?? ""),
        description: String(form?.description ?? ""),
        public_id: String(form?.public_id ?? ""),
        created_at: String(form?.created_at ?? ""),
        question_count: Number(form?.question_count ?? 0),
    }));

    return (
        <div className="space-y-6">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                        My Forms
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        Manage your forms, preview their content, and keep everything organized in one place.
                    </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                        <LuFileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {forms.length} {forms.length === 1 ? "form" : "forms"}
                    </span>
                    <Link
                        href="/dashboard/forms/new"
                        className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A] cursor-pointer"
                    >
                        <LuPlus className="h-4 w-4" aria-hidden="true" />
                        Create Form
                    </Link>
                </div>
            </header>

            {!success ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                        <LuTriangleAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Couldn&apos;t load your forms
                    </h2>
                    <p className="mt-1 max-w-md text-sm text-gray-600 dark:text-gray-400">
                        Something went wrong while fetching your forms. Please try again in a moment.
                    </p>
                </div>
            ) : forms.length === 0 ? (
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
                <FormsTable forms={forms} />
            )}
        </div>
    );
};

export default DashboardFormsPage;
