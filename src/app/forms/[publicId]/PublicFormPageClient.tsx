"use client";

import PublicFormChatbot, {
    type PublicFormData,
} from "@/components/public/publicFormChatbot";
import { getPublicForm } from "@/services/form.services";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLoader, LuTriangleAlert } from "react-icons/lu";

export default function PublicFormPage() {
    const params = useParams();
    const publicId = String(params?.publicId ?? "");

    const [form, setForm] = useState<PublicFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!publicId) return;

        let isMounted = true;

        const loadForm = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPublicForm(publicId);

                if (!data?.success || !data?.form) {
                    throw new Error(data?.message || "Failed to load form.");
                }

                if (isMounted) {
                    setForm(data.form as PublicFormData);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error ? err.message : "Failed to load form."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadForm();

        return () => {
            isMounted = false;
        };
    }, [publicId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#080b14]">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Loading form...
                </div>
            </div>
        );
    }

    if (error || !form) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-[#080b14]">
                <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-[#0F172A]">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                        <LuTriangleAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h1 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Form not available
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {error || "This form could not be found."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#080b14]">
            <div className="mx-auto max-w-2xl px-4 py-10">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {form.title}
                </h1>
                {form.description ? (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {form.description}
                    </p>
                ) : null}
            </div>
            <PublicFormChatbot publicId={publicId} form={form} />
        </div>
    );
}
