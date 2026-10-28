"use client";

import { getSubmissions } from "@/services/form.services";
import { Submission } from "@/types/Form";
import { useEffect, useState } from "react";
import {
    LuInbox,
    LuTriangleAlert,
    LuEye,
    LuX,
    LuRefreshCw,
} from "react-icons/lu";
import { toast } from "react-toastify";

function formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "—";
    }
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

interface SubmissionsClientProps {
    initialSubmissions: Submission[];
    initialError: string | null;
}

export default function SubmissionsClient({
    initialSubmissions,
    initialError,
}: SubmissionsClientProps) {
    const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(initialError);
    const [selected, setSelected] = useState<Submission | null>(null);

    const loadSubmissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSubmissions();
            if (!data?.success) {
                throw new Error(data?.message || "Failed to fetch submissions.");
            }
            const rows = Array.isArray(data.submissions) ? data.submissions : [];
            setSubmissions(rows as Submission[]);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Failed to fetch submissions.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selected) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelected(null);
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [selected]);

    return (
        <div className="space-y-6">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                        Submissions
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        Review responses collected through your forms.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                        <LuInbox className="h-3.5 w-3.5" aria-hidden="true" />
                        {submissions.length}{" "}
                        {submissions.length === 1 ? "submission" : "submissions"}
                    </span>
                    <button
                        type="button"
                        onClick={loadSubmissions}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        <LuRefreshCw
                            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
                            aria-hidden="true"
                        />
                        Refresh
                    </button>
                </div>
            </header>

            {(() => {
                if (error) {
                    return (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                                <LuTriangleAlert className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Couldn&apos;t load submissions
                            </h2>
                            <p className="mt-1 max-w-md text-sm text-gray-600 dark:text-gray-400">
                                {error}
                            </p>
                            <button
                                type="button"
                                onClick={loadSubmissions}
                                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                            >
                                Try again
                            </button>
                        </div>
                    );
                }

                if (submissions.length === 0) {
                    return (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400">
                                <LuInbox className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                No submissions yet
                            </h2>
                            <p className="mt-1 max-w-md text-sm text-gray-600 dark:text-gray-400">
                                Responses from your published forms will appear here.
                            </p>
                        </div>
                    );
                }

                return (
                    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50 dark:bg-gray-900/60">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Form
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Submission ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Submitted
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Answers
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-[#0F172A]">
                                {submissions.map((submission) => {
                                    const answerList =
                                        submission.answers?.answers ?? [];
                                    const summary =
                                        answerList.length > 0
                                            ? answerList
                                                  .map((a) => a.answer)
                                                  .filter(Boolean)
                                                  .slice(0, 2)
                                                  .join(", ")
                                            : "—";
                                    return (
                                        <tr
                                            key={submission.id}
                                            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40"
                                        >
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                                {submission.form_title}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                                                {submission.id}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(submission.submitted_at)}
                                            </td>
                                            <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {summary || "—"}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelected(submission)}
                                                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                                                >
                                                    <LuEye className="h-3.5 w-3.5" aria-hidden="true" />
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })()}

            {selected ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#0F172A]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {selected.form_title}
                                </h2>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Submitted {formatDate(selected.submitted_at)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                aria-label="Close details"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800"
                            >
                                <LuX className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            {(selected.answers?.answers ?? []).map((answer, index) => (
                                <div
                                    key={`${answer.questionId}-${index}`}
                                    className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 dark:border-gray-800 dark:bg-gray-900/40"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        {answer.question}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {answer.answer ? answer.answer : "—"}
                                    </p>
                                </div>
                            ))}
                            {(selected.answers?.answers ?? []).length === 0 ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    No answers recorded.
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
