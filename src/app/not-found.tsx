"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuHouse, LuListChecks } from "react-icons/lu";

import { Logo } from "@/components/shared/navbar/navbar";

export default function NotFound() {
    const router = useRouter();

    const handleGoBack = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 dark:bg-[#0F172A]">
            {/* Soft background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.10),transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(99,102,241,0.14),transparent_65%)]"
            />

            <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
                <Logo />

                {/* Form-related visual element */}
                <div className="relative mt-12">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200 bg-white text-indigo-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-indigo-400">
                        <LuListChecks className="h-9 w-9" aria-hidden="true" />
                    </div>
                    <span className="absolute -right-2 -top-2 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm dark:bg-indigo-500">
                        404
                    </span>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Error 404
                </p>

                <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    Oops! Page not found
                </h1>

                <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    The page you are looking for may have been moved, renamed, or no longer
                    exists. Let&apos;s get you back on track.
                </p>

                <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                    <Link
                        href="/"
                        className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 sm:w-auto dark:bg-indigo-500 dark:shadow-indigo-500/25 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-950"
                    >
                        <LuHouse aria-hidden="true" className="h-4 w-4" />
                        Go to Homepage
                    </Link>
                    <button
                        type="button"
                        onClick={handleGoBack}
                        aria-label="Go back to the previous page"
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 sm:w-auto dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-950"
                    >
                        <LuArrowLeft aria-hidden="true" className="h-4 w-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
