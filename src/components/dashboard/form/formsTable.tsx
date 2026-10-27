import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

export type FormsTableForm = {
    id: string;
    title: string;
    description: string;
    public_id: string;
    created_at: string;
    question_count: number;
};

interface FormsTableProps {
    forms: FormsTableForm[];
}

function formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "—";
    }
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function FormsTable({ forms }: FormsTableProps) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900/60">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Form</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Questions</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Created</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-[#0F172A]">
                    {forms.map((form) => (
                        <tr key={form.id} className="transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5">
                            <td className="px-4 py-4 align-top">
                                <div className="min-w-0 max-w-md">
                                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{form.title?.trim() ? form.title : "Untitled form"}</p>
                                    {form.description?.trim() ? (
                                        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{form.description}</p>
                                    ) : (
                                        <p className="mt-0.5 text-xs italic text-gray-400 dark:text-gray-500">No description</p>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">{form.question_count}</span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{formatDate(form.created_at)}</td>
                            <td className="px-4 py-4">
                                <div className="flex items-center justify-end gap-1.5">
                                    <button type="button" aria-label="View form" title="View" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"><LuEye className="h-4 w-4" aria-hidden="true" /></button>
                                    <button type="button" aria-label="Edit form" title="Edit" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"><LuPencil className="h-4 w-4" aria-hidden="true" /></button>
                                    <button type="button" aria-label="Delete form" title="Delete" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-gray-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"><LuTrash2 className="h-4 w-4" aria-hidden="true" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
