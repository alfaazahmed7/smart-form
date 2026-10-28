'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { LuTrash2, LuLoader, LuX } from 'react-icons/lu';

interface FormDeleteProps {
    open: boolean;
    formId: string | null;
    formTitle?: string;
    onClose: () => void;
    onDelete: (id: string) => Promise<{ success?: boolean; message?: string } | void>;
}

export default function FormDelete({
    open,
    formId,
    formTitle,
    onClose,
    onDelete,
}: FormDeleteProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (open) {
            const timer = window.setTimeout(() => {
                cancelButtonRef.current?.focus();
            }, 0);
            document.body.style.overflow = 'hidden';
            return () => {
                window.clearTimeout(timer);
                document.body.style.overflow = '';
            };
        }
        document.body.style.overflow = '';
        return undefined;
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isDeleting) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, isDeleting, onClose]);

    if (!open || !formId) return null;

    const handleConfirm = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            const result = await onDelete(formId);
            if (result && result.success === false) {
                toast.error(result.message || 'Failed to delete form');
                return;
            }
            onClose();
        } catch (error) {
            console.error('Delete form error:', error);
            toast.error(
                error instanceof Error ? error.message : 'Failed to delete form'
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-form-title"
            aria-describedby="delete-form-description"
        >
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity cursor-pointer"
                onClick={() => {
                    if (!isDeleting) onClose();
                }}
                aria-hidden="true"
            />
            <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isDeleting}
                    aria-label="Close"
                    className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
                >
                    <LuX className="h-4 w-4" aria-hidden="true" />
                </button>
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                        <LuTrash2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2
                        id="delete-form-title"
                        className="mt-4 text-lg font-semibold text-gray-900 dark:text-white"
                    >
                        Delete form?
                    </h2>
                    <p
                        id="delete-form-description"
                        className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                        Are you sure you want to delete this form? This action
                        cannot be undone.
                    </p>
                    {formTitle ? (
                        <p className="mt-3 w-full truncate rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200">
                            {formTitle}
                        </p>
                    ) : null}
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-[#0F172A] cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-rose-500 dark:hover:bg-rose-400 dark:focus-visible:ring-offset-[#0F172A] cursor-pointer"
                    >
                        {isDeleting ? (
                            <>
                                <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                                Delete Form
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}