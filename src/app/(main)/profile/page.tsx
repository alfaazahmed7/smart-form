"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMe } from "@/services/auth.services";
import { LuArrowRight, LuFileText, LuInbox, LuLayoutDashboard, LuTriangleAlert, LuUser } from "react-icons/lu";


type OverviewSummary = { totalForms?: number; publishedForms?: number; draftForms?: number; totalSubmissions?: number; submissionsToday?: number; submissionsLast7Days?: number; };
type OverviewData = { success?: boolean; message?: string; user?: { id: string; name: string; email: string }; summary?: OverviewSummary; };

function initials(name?: string, email?: string): string {
    const source = (name || email || "").trim();
    if (!source) return "?";
    const parts = source.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return source.slice(0, 2).toUpperCase();
}

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
    const [summary, setSummary] = useState<OverviewSummary | null>(null);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const me = await getMe();
                if (!isMounted) return;
                if (!me?.success || !me?.user) { setError(me?.message || "You are not signed in."); setLoading(false); return; }
                setUser(me.user);
                try {
                    const res = await fetch("/api/dashboard/overview", { cache: "no-store" });
                    const data = (await res.json()) as OverviewData;
                    if (isMounted && data?.success && data.summary) setSummary(data.summary);
                } catch { }
            } catch (err) {
                if (isMounted) setError(err instanceof Error ? err.message : "Failed to load profile.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        load();
        return () => { isMounted = false; };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <header className="mb-8 space-y-2">
                    <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                </header>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60 lg:col-span-2">
                        <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                    <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40"
                            >
                                <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="mt-2 h-7 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                    <div className="h-5 w-44 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
                            />
                        ))}
                    </div>
                </section>
            </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
                <div className="mx-auto max-w-md px-4 py-20 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400"><LuTriangleAlert className="h-6 w-6" aria-hidden="true" /></div>
                <h1 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Profile unavailable</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{error || "Please sign in to view your profile."}</p>
                <Link href="/sign-in" className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]">Sign in <LuArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <header className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Profile</h1>
                <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">Your account information and activity at a glance.</p>
            </header>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">{initials(user.name, user.email)}</div>
                        <div className="min-w-0">
                            <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">{user.name || "—"}</p>
                            <p className="truncate text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                            <span className="mt-1 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">Account</span>
                        </div>
                    </div>
                </section>
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60 lg:col-span-2">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Account information</h2>
                    <dl className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Full name</dt>
                            <dd className="text-sm font-medium text-gray-900 dark:text-white">{user.name || "—"}</dd>
                        </div>
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Email address</dt>
                            <dd className="text-sm font-medium text-gray-900 dark:text-white">{user.email || "—"}</dd>
                        </div>
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <dt className="text-sm text-gray-500 dark:text-gray-400">User ID</dt>
                            <dd className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.id}</dd>
                        </div>
                    </dl>
                </section>
            </div>
            {summary && (
                <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Account statistics</h2>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {[
                            { label: "Total forms", value: summary.totalForms },
                            { label: "Published forms", value: summary.publishedForms },
                            { label: "Draft forms", value: summary.draftForms },
                            { label: "Total submissions", value: summary.totalSubmissions },
                            { label: "Submissions today", value: summary.submissionsToday },
                            { label: "Last 7 days", value: summary.submissionsLast7Days },
                        ].filter((s) => typeof s.value === "number").map((s) => (
                            <div key={s.label} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{s.label}</p>
                                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{s.value}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Account navigation</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Link href="/dashboard/overview" className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200 dark:hover:bg-gray-800">
                        <LuLayoutDashboard className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" /> Dashboard
                    </Link>
                    <Link href="/dashboard/forms" className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200 dark:hover:bg-gray-800">
                        <LuFileText className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" /> My Forms
                    </Link>
                    <Link href="/dashboard/submissions" className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200 dark:hover:bg-gray-800">
                        <LuInbox className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" /> Submissions
                    </Link>
                </div>
            </section>
        </div>
        </div>
    );
}
