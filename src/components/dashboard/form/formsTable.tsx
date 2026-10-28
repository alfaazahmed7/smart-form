'use client';

import { useState } from "react";
import { deleteForm, getFormById, getFormForEdit } from "@/services/form.services";
import { LuEye, LuPencil, LuTrash2, LuArrowLeft, LuLoader, LuTriangleAlert } from "react-icons/lu";
import FormDetailsView, { type FormDetails } from "./formDetailsView";
import FormEdit from "./formEdit";
import FormDelete from "./formDelete";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
    const [selectedForm, setSelectedForm] = useState<FormDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [editingForm, setEditingForm] = useState<FormDetails | null>(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

    const resetView = () => {
        setSelectedForm(null);
        setError(null);
    };

    const router = useRouter();

    const handleFormView = async (id: string) => {
        setIsLoading(true);
        setError(null);
        setSelectedForm(null);
        try {
            const formViewData = await getFormById(id);
            if (!formViewData?.success || !formViewData?.form) {
                throw new Error(formViewData?.message || "Failed to retrieve form.");
            }
            setSelectedForm(formViewData.form as FormDetails);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to retrieve form."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleFromEdit = async (id: string) => {
        setEditLoading(true);
        setEditError(null);
        setSelectedForm(null);
        setEditingForm(null);
        try {
            const formViewData = (await getFormForEdit(id)) as FormDetails;
            if (!formViewData) {
                throw new Error("Failed to retrieve form.");
            }
            setEditingForm(formViewData);
        } catch (err) {
            setEditError(
                err instanceof Error
                    ? err.message
                    : "Failed to retrieve form."
            );
        } finally {
            setEditLoading(false);
        }
    };

    const closeEditor = () => {
        setEditingForm(null);
        setEditError(null);
    };

    const handleFormDelete = async (id: string) => {
        const form = await deleteForm(id);
        console.log(form, 'form');
        if (form.success) {
            toast.success('Form deleted successfully');
            router.refresh();
        }
        return form;
    }

    if (isLoading || editLoading) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
                <LuLoader className="h-6 w-6 animate-spin text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Loading form details...
                </p>
            </div>
        );
    }

    const activeError = editError || error;
    if (activeError) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                    <LuTriangleAlert className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Couldn&apos;t load form details
                </h2>
                <p className="mt-1 max-w-md text-sm text-gray-600 dark:text-gray-400">
                    {activeError}
                </p>
                <button
                    type="button"
                    onClick={() => {
                        if (editError) {
                            setEditError(null);
                            closeEditor();
                        } else {
                            resetView();
                        }
                    }}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                >
                    <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to forms
                </button>
            </div>
        );
    }

    if (selectedForm) {
        return <FormDetailsView form={selectedForm} onBack={resetView} />;
    }

    if (editingForm) {
        return <FormEdit key={editingForm.id} form={editingForm} onClose={closeEditor} />;
    }

    return (
        <>
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
                                    <button
                                        type="button"
                                        onClick={() => handleFormView(form.id)}
                                        aria-label="View form"
                                        title="View"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                                    >
                                        <LuEye className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleFromEdit(form.id)}
                                        aria-label="Edit form"
                                        title="Edit"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                                    >
                                        <LuPencil className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteTarget({ id: form.id, title: form.title })}
                                        aria-label="Delete form"
                                        title="Delete"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-gray-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400">
                                        <LuTrash2 className="h-4 w-4"
                                            aria-hidden="true" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <FormDelete
            open={!!deleteTarget}
            formId={deleteTarget?.id ?? null}
            formTitle={deleteTarget?.title}
            onClose={() => setDeleteTarget(null)}
            onDelete={handleFormDelete}
        />
        </>
    );
}
