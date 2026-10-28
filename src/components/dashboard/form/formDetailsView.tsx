
'use client';

import {
    LuArrowLeft,
    LuCircleHelp,
    LuCopy,
    LuInfo,
    LuPencil,
} from "react-icons/lu";

export type FormQuestion = {
    id: string;
    title: string;
    type: string;
    required: boolean;
    options: string[];
    position: number;
};

export type FormChatbotSettings = {
    form_id: string;
    welcome_message: string;
    completion_message: string;
    primary_color: string;
    input_placeholder: string;
    launcher_button_text: string;
    chatbot_position: string;
    opening_behavior: string;
    auto_open_delay_seconds: number;
    allow_restart: boolean;
    show_branding: boolean;
    show_progress_indicator: boolean;
};

export type FormDetails = {
    id: string;
    title: string;
    description: string;
    status: string;
    public_id: string;
    created_at: string;
    updated_at: string;
    questions: FormQuestion[];
    settings: FormChatbotSettings | null;
};

const QUESTION_TYPE_LABELS: Record<string, string> = {
    short_text: "Short Text",
    email: "Email",
    multiple_choice: "Multiple Choice",
    yes_no: "Yes / No",
};

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

function StatusBadge({ status }: { status: string }) {
    const normalized = (status || "").toLowerCase();
    const isPublished = normalized === "published";
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isPublished
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    isPublished ? "bg-emerald-500" : "bg-amber-500"
                }`}
                aria-hidden="true"
            />
            {isPublished ? "Published" : status ? status.charAt(0).toUpperCase() + status.slice(1) : "Draft"}
        </span>
    );
}

function EnabledBadge({ value }: { value: boolean }) {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                value
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }`}
        >
            {value ? "Enabled" : "Disabled"}
        </span>
    );
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-0.5 rounded-xl border border-gray-200 bg-gray-50/60 p-3 dark:border-gray-800 dark:bg-gray-900/40">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {label}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white break-words">
                {value}
            </span>
        </div>
    );
}

export default function FormDetailsView({
    form,
    onBack,
}: {
    form: FormDetails;
    onBack: () => void;
}) {
    const settings = form.settings;
    const questions = [...(form.questions ?? [])].sort(
        (a, b) => (a.position ?? 0) - (b.position ?? 0)
    );
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                >
                    <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to forms
                </button>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Forms / Details
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white break-words">
                            {form.title?.trim() ? form.title : "Untitled form"}
                        </h1>
                        {form.description?.trim() ? (
                            <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400 break-words">
                                {form.description}
                            </p>
                        ) : (
                            <p className="mt-1 text-sm italic text-gray-400 dark:text-gray-500">
                                No description
                            </p>
                        )}
                    </div>
                    <StatusBadge status={form.status} />
                </div>
            </div>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                    Form overview
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <MetaRow label="Form title" value={form.title?.trim() ? form.title : "Untitled form"} />
                    <MetaRow
                        label="Description"
                        value={form.description?.trim() ? form.description : "No description"}
                    />
                    <MetaRow label="Publication status" value={<StatusBadge status={form.status} />} />
                    <MetaRow label="Created date" value={formatDate(form.created_at)} />
                    <MetaRow label="Last updated" value={formatDate(form.updated_at)} />
                    <MetaRow label="Question count" value={questions.length} />
                </div>
            </section>

                        <section className="space-y-3">
                <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                    Questions
                </h2>
                {questions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900/40">
                        <LuCircleHelp className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            This form has no questions yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {questions.map((question, index) => {
                            const typeLabel =
                                QUESTION_TYPE_LABELS[question.type] ||
                                question.type
                                    .split("_")
                                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                                    .join(" ");
                            return (
                                <div
                                    key={question.id || index}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/40"
                                >
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                                                Question {index + 1}
                                            </p>
                                            <h3 className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white break-words">
                                                {question.title?.trim()
                                                    ? question.title
                                                    : "Untitled question"}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                                                {typeLabel}
                                            </span>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                    question.required
                                                        ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                                                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                }`}
                                            >
                                                {question.required ? "Required" : "Optional"}
                                            </span>
                                        </div>
                                    </div>

                                    {question.type === "multiple_choice" ? (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {(question.options ?? []).length === 0 ? (
                                                <span className="text-xs italic text-gray-400 dark:text-gray-500">
                                                    No options
                                                </span>
                                            ) : (
                                                (question.options ?? []).map((option, optionIndex) => (
                                                    <span
                                                        key={optionIndex}
                                                        className="inline-flex items-center rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                                                    >
                                                        {option?.trim() ? option : `Option ${optionIndex + 1}`}
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    ) : null}

                                    {question.type === "yes_no" ? (
                                        <div className="mt-3 flex gap-2">
                                            <span className="inline-flex items-center rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                                                Yes
                                            </span>
                                            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                                No
                                            </span>
                                        </div>
                                    ) : null}

                                    {question.type === "short_text" ? (
                                        <div className="mt-3">
                                            <input
                                                type="text"
                                                disabled
                                                placeholder="Short text answer"
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                                            />
                                        </div>
                                    ) : null}

                                    {question.type === "email" ? (
                                        <div className="mt-3">
                                            <input
                                                type="email"
                                                disabled
                                                placeholder="email@example.com"
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
                        <section className="space-y-3">
                <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                    Chatbot settings
                </h2>
                {!settings ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900/40">
                        <LuInfo />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            No chatbot settings saved for this form.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Appearance
                            </h3>
                            <div className="flex items-center gap-3">
                                <span
                                    className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700"
                                    style={{ backgroundColor: settings.primary_color }}
                                    aria-label="Primary color swatch"
                                />
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Primary theme color
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {settings.primary_color}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Messages
                            </h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Welcome message
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white break-words">
                                        {settings.welcome_message?.trim()
                                            ? settings.welcome_message
                                            : "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Completion message
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white break-words">
                                        {settings.completion_message?.trim()
                                            ? settings.completion_message
                                            : "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Input placeholder
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white break-words">
                                        {settings.input_placeholder?.trim()
                                            ? settings.input_placeholder
                                            : "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Launcher and position
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Launcher button text
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white break-words text-right">
                                        {settings.launcher_button_text?.trim()
                                            ? settings.launcher_button_text
                                            : "—"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Chatbot position
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {settings.chatbot_position || "—"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Opening behavior
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {settings.opening_behavior || "—"}
                                    </span>
                                </div>
                                {settings.opening_behavior
                                    ?.toLowerCase()
                                    .includes("automatic") ? (
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Auto-open delay
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {settings.auto_open_delay_seconds} seconds
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Behavior
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Show progress indicator
                                    </span>
                                    <EnabledBadge value={!!settings.show_progress_indicator} />
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Show branding
                                    </span>
                                    <EnabledBadge value={!!settings.show_branding} />
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Allow restart
                                    </span>
                                    <EnabledBadge value={!!settings.allow_restart} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
                        <section className="space-y-3">
                <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                    Actions
                </h2>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Public viewing, link copying, and editing actions are not available because this project does not expose public form or edit routes.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <button
                            type="button"
                            disabled
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                            title="Not available"
                        >
                            <LuCopy className="h-4 w-4" aria-hidden="true" />
                            Copy Public Link
                        </button>
                        <button
                            type="button"
                            disabled
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                            title="Not available"
                        >
                            <LuPencil className="h-4 w-4" aria-hidden="true" />
                            Edit Form
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}









