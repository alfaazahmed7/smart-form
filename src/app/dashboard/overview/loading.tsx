export default function Loading() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-72 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900/60"
                    />
                ))}
            </div>
            <div className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900/60" />
        </div>
    );
}
