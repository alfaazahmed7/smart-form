export default function Loading() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800 sm:h-9" />
                    <div className="h-4 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800 sm:h-5" />
                </div>
            </header>

            <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center shadow-sm sm:p-8 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                <div className="mx-auto max-w-xl space-y-4">
                    <div className="mx-auto h-12 w-12 animate-pulse rounded-xl bg-indigo-200 dark:bg-indigo-500/20" />
                    <div className="mx-auto h-5 w-48 animate-pulse rounded bg-indigo-200 dark:bg-indigo-500/20" />
                    <div className="mx-auto h-4 w-72 animate-pulse rounded bg-indigo-200 dark:bg-indigo-500/20" />
                </div>
            </section>
        </div>
    );
}
