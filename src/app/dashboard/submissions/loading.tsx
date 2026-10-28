export default function Loading() {
    return (
        <div className="space-y-6">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-36 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800 sm:h-9" />
                    <div className="h-4 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800 sm:h-5" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                    <div className="h-8 w-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
                </div>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-900/60">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                <div className="h-3 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </th>
                            <th className="px-4 py-3 text-left">
                                <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </th>
                            <th className="px-4 py-3 text-left">
                                <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </th>
                            <th className="px-4 py-3 text-left">
                                <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </th>
                            <th className="px-4 py-3 text-right">
                                <div className="ml-auto h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-[#0F172A]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                <td className="px-4 py-3">
                                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="h-3 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="ml-auto h-6 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
