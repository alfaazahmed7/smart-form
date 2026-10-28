'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { LuCode, LuCopy, LuX, LuCheck, LuGlobe, LuInfo } from 'react-icons/lu';

export type EmbedForm = {
    id: string;
    title: string;
    public_id: string;
    status: string;
};

interface FormEmbedProps {
    open: boolean;
    form: EmbedForm | null;
    onClose: () => void;
}

function StatusBadge({ status }: { status: string }) {
    const normalized = (status || '').toLowerCase();
    const isPublished = normalized === 'published';
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isPublished
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    isPublished ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                aria-hidden="true"
            />
            {isPublished
                ? 'Published'
                : status
                ? status.charAt(0).toUpperCase() + status.slice(1)
                : 'Draft'}
        </span>
    );
}

export default function FormEmbed({ open, form, onClose }: FormEmbedProps) {
    const cancelButtonRef = useRef<HTMLButtonElement>(null);
    const [copied, setCopied] = useState(false);
    const [isCopying, setIsCopying] = useState(false);

    const appUrl =
        (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_APP_URL) ||
        (typeof window !== 'undefined' ? window.location.origin : '');
        console.log(appUrl, 'appUrl');

    const isPublished = (form?.status || '').toLowerCase() === 'published';
    const isLocalhost =
        appUrl.includes('localhost') || appUrl.includes('127.0.0.1');

    const snippet = form
        ? `<script
  src="${appUrl}/widget.js"
  data-form-id="${form.public_id}"
  async
></script>`
        : '';

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
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onClose]);


    const handleCopy = async () => {
        if (!isPublished || !snippet) return;
        setIsCopying(true);
        try {
            await navigator.clipboard.writeText(snippet);
            setCopied(true);
            toast.success('Embed code copied to clipboard');
            window.setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Copy embed code error:', error);
            toast.error('Failed to copy embed code. Please copy it manually.');
        } finally {
            setIsCopying(false);
        }
    };

    if (!open || !form) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="embed-form-title"
            aria-describedby="embed-form-description"
        >
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative flex w-full max-w-2xl max-h-[90vh] flex-col rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                            <LuCode className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h2
                                id="embed-form-title"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Embed your chatbot
                            </h2>
                            <p
                                id="embed-form-description"
                                className="mt-1 text-sm text-gray-600 dark:text-gray-400"
                            >
                                Add this chatbot to an external website using a small
                                script snippet.
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Form:
                                </span>
                                <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                    {form.title || 'Untitled form'}
                                </span>
                                <StatusBadge status={form.status} />
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    >
                        <LuX className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    <section className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-900/40">
                        <div className="flex items-start gap-3">
                            <div
                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                    isPublished
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                        : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                                }`}
                            >
                                {isPublished ? (
                                    <LuCheck className="h-4 w-4" aria-hidden="true" />
                                ) : (
                                    <LuInfo className="h-4 w-4" aria-hidden="true" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {isPublished
                                            ? 'Published and ready to embed'
                                            : 'Publishing required'}
                                    </h3>
                                    <StatusBadge status={form.status} />
                                </div>
                                {isPublished ? (
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        This form is published and eligible for
                                        embedding. Copy the snippet below and paste it
                                        into your website.
                                    </p>
                                ) : (
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        This form must be published before it can be
                                        embedded. The chatbot is not publicly
                                        available while it remains a draft. Publish
                                        the form first, then return here to copy the
                                        embed code.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {isPublished ? (
                        <section className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Embed code
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    disabled={isCopying}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                                >
                                    {copied ? (
                                        <>
                                            <LuCheck className="h-4 w-4" aria-hidden="true" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <LuCopy className="h-4 w-4" aria-hidden="true" />
                                            Copy embed code
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-950 p-4 dark:border-gray-800">
                                <pre className="text-xs leading-relaxed text-gray-100 font-mono whitespace-pre">
                                    <code>{snippet}</code>
                                </pre>
                            </div>
                            <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-500/20 dark:bg-amber-500/5">
                                <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                                <p className="text-xs text-amber-800 dark:text-amber-300">
                                    This snippet is a preparation for the upcoming
                                    widget implementation. The{' '}
                                    <code className="font-mono">widget.js</code> file
                                    is not yet available on{' '}
                                    <span className="font-mono break-all">
                                        {appUrl}
                                    </span>
                                    , so the embed will not load a chatbot until that
                                    script is implemented and publicly accessible.
                                    {isLocalhost
                                        ? ' The configured URL points to localhost and is intended for development only.'
                                        : ''}
                                </p>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <LuGlobe className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                <span>
                                    Public URL:{' '}
                                    <span className="font-mono break-all">{appUrl}</span>
                                </span>
                            </div>
                        </section>
                    ) : null}

                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Installation guide
                        </h3>
                        <ol className="space-y-2.5">
                            {[
                                'Copy the embed code using the button above.',
                                'Open your website and access the HTML source or the custom-code/embed section provided by your website platform.',
                                'Paste the snippet in the appropriate location, preferably before the closing </body> tag when working directly with HTML.',
                                'Save the website changes and open the website to test the chatbot.',
                            ].map((step, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                                        {index + 1}
                                    </span>
                                    <span className="pt-0.5">{step}</span>
                                </li>
                            ))}
                        </ol>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Website platforms differ and may require a custom HTML,
                            custom code, or script-injection feature. The widget
                            script must be implemented and publicly accessible on the
                            configured SmartForm domain before the snippet can
                            actually load the chatbot.
                        </p>
                    </section>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-[#0F172A]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
