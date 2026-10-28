export default function Loading() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800 sm:h-9 sm:w-64" />
                    <div className="h-4 w-72 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            </header>

            <section aria-hidden="true">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
                            </div>
                            <div className="mt-4 h-7 w-16 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                            <div className="mt-0.5 h-4 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                            <div className="mt-1 h-3 w-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
                    >
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        </div>
                        <div className="mt-2 h-6 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="mt-0.5 h-3 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                ))}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="space-y-1">
                    <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-3 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="mt-4 h-64 w-full animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800/60" />
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <div className="h-5 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-3 w-44 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0 space-y-1">
                                <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                                <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-3 w-44 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
                <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li
                            key={i}
                            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0 space-y-1">
                                <div className="h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="h-3 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </div>
                            <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center shadow-sm sm:p-8 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                <div className="mx-auto max-w-xl space-y-4">
                    <div className="mx-auto h-12 w-12 animate-pulse rounded-xl bg-indigo-200 dark:bg-indigo-500/20" />
                    <div className="mx-auto h-5 w-48 animate-pulse rounded bg-indigo-200 dark:bg-indigo-500/20" />
                    <div className="mx-auto h-4 w-72 animate-pulse rounded bg-indigo-200 dark:bg-indigo-500/20" />
                    <div className="mx-auto h-10 w-32 animate-pulse rounded-xl bg-indigo-200 dark:bg-indigo-500/20" />
                </div>
            </section>
        </div>
    );
}
