export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-2xl space-y-6">
            <header className="mb-6 space-y-2">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-72 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            </header>

            <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="space-y-1.5">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="space-y-1.5">
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-24 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
        </div>
    );
}
