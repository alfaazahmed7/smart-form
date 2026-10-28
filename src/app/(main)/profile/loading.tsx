export default function Loading() {
    return (
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
    );
}