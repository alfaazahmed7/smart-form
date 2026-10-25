"use client";

import { useState } from "react";
import {
    LuPlus,
    LuTrash2,
    LuPencil,
    LuGripVertical,
    LuArrowUp,
    LuArrowDown,
    LuEye,
    LuSettings,
    LuSend,
} from "react-icons/lu";

type QuestionType = "short_text" | "email" | "multiple_choice" | "yes_no";

interface Question {
    id: string;
    title: string;
    type: QuestionType;
    required: boolean;
    options: string[];
}

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
    short_text: "Short text",
    email: "Email",
    multiple_choice: "Multiple choice",
    yes_no: "Yes/No",
};

function createQuestion(): Question {
    return {
        id: crypto.randomUUID(),
        title: "",
        type: "short_text",
        required: false,
        options: [],
    };
}

export default function NewFormPage() {
    const [step, setStep] = useState<"details" | "editor">("details");
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleCreateForm = () => {
        if (!formTitle.trim()) {
            setTitleError("Form title is required.");
            return;
        }
        setTitleError("");
        setStep("editor");
    };

    const addQuestion = () => {
        if (questions.length >= 5) return;
        setQuestions((prev) => [...prev, createQuestion()]);
    };

    const deleteQuestion = (id: string) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const updateQuestion = (id: string, patch: Partial<Question>) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, ...patch } : q))
        );
    };

    const moveQuestion = (id: string, direction: "up" | "down") => {
        setQuestions((prev) => {
            const index = prev.findIndex((q) => q.id === id);
            if (index < 0) return prev;
            const newIndex = direction === "up" ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= prev.length) return prev;
            const next = [...prev];
            [next[index], next[newIndex]] = [next[newIndex], next[index]];
            return next;
        });
    };

    const addOption = (id: string) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === id ? { ...q, options: [...q.options, ""] } : q
            )
        );
    };

    const updateOption = (id: string, optionIndex: number, value: string) => {
        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== id) return q;
                const nextOptions = [...q.options];
                nextOptions[optionIndex] = value;
                return { ...q, options: nextOptions };
            })
        );
    };

    const removeOption = (id: string, optionIndex: number) => {
        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== id) return q;
                return {
                    ...q,
                    options: q.options.filter((_, i) => i !== optionIndex),
                };
            })
        );
    };

    const handleSubmit = () => {
        console.log({
            title: formTitle,
            description: formDescription,
            questions,
        });
    };
    if (step === "details") {
        return (
            <div className="mx-auto w-full max-w-2xl">
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Create a New Form
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Enter the basic details for your form before adding questions.
                    </p>
                </header>

                <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                    <div>
                        <label
                            htmlFor="form-title"
                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Form title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="form-title"
                            type="text"
                            value={formTitle}
                            onChange={(e) => {
                                setFormTitle(e.target.value);
                                if (titleError) setTitleError("");
                            }}
                            placeholder="Enter form title"
                            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 ${
                                titleError
                                    ? "border-red-400 focus:ring-red-400 dark:border-red-500"
                                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                            }`}
                        />
                        {titleError ? (
                            <p
                                role="alert"
                                className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                            >
                                {titleError}
                            </p>
                        ) : null}
                    </div>

                    <div>
                        <label
                            htmlFor="form-description"
                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Form description
                        </label>
                        <textarea
                            id="form-description"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            placeholder="Enter an optional description"
                            rows={3}
                            className="w-full resize-y rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateForm}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                    >
                        <LuPlus className="h-4 w-4" aria-hidden="true" />
                        Create Form
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-6">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h1 className="truncate text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {formTitle || "Untitled Form"}
                    </h1>
                    {formDescription ? (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {formDescription}
                        </p>
                    ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200"
                    >
                        <LuEye className="h-4 w-4" aria-hidden="true" />
                        Preview
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200"
                    >
                        <LuSettings className="h-4 w-4" aria-hidden="true" />
                        Chatbot Settings
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm dark:bg-indigo-500"
                    >
                        <LuSend className="h-4 w-4" aria-hidden="true" />
                        Publish
                    </button>
                </div>
            </header>

            <div className="space-y-4">
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 dark:border-gray-800 dark:bg-gray-900/60"
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                            <div className="flex items-center gap-2 text-gray-400">
                                <LuGripVertical className="h-5 w-5" aria-hidden="true" />
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {index + 1}
                                </span>
                            </div>

                            <div className="flex-1 space-y-3">
                                <input
                                    type="text"
                                    value={question.title}
                                    onChange={(e) =>
                                        updateQuestion(question.id, { title: e.target.value })
                                    }
                                    placeholder="Question title"
                                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                                />

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <select
                                        value={question.type}
                                        onChange={(e) =>
                                            updateQuestion(question.id, {
                                                type: e.target.value as QuestionType,
                                            })
                                        }
                                        className="rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                                    >
                                        {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>

                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            checked={question.required}
                                            onChange={(e) =>
                                                updateQuestion(question.id, {
                                                    required: e.target.checked,
                                                })
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        Required
                                    </label>
                                </div>

                                {question.type === "multiple_choice" ? (
                                    <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/40">
                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                            Answer options
                                        </p>
                                        {question.options.map((option, optionIndex) => (
                                            <div
                                                key={optionIndex}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) =>
                                                        updateOption(
                                                            question.id,
                                                            optionIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeOption(question.id, optionIndex)
                                                    }
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-200 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-red-400"
                                                    aria-label="Remove option"
                                                >
                                                    <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addOption(question.id)}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            <LuPlus className="h-3.5 w-3.5" aria-hidden="true" />
                                            Add option
                                        </button>
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex items-center gap-1 sm:flex-col">
                                <button
                                    type="button"
                                    onClick={() => moveQuestion(question.id, "up")}
                                    disabled={index === 0}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    aria-label="Move question up"
                                >
                                    <LuArrowUp className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveQuestion(question.id, "down")}
                                    disabled={index === questions.length - 1}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    aria-label="Move question down"
                                >
                                    <LuArrowDown className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    aria-label="Edit question"
                                >
                                    <LuPencil className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteQuestion(question.id)}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-red-400"
                                    aria-label="Delete question"
                                >
                                    <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    onClick={addQuestion}
                    disabled={questions.length >= 5}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
                >
                    <LuPlus className="h-4 w-4" aria-hidden="true" />
                    Add Question
                </button>
                {questions.length >= 5 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Maximum of 5 questions reached.
                    </p>
                ) : null}
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                >
                    Log Form Data
                </button>
            </div>
        </div>
    );
}

