"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FormPreview from "@/components/dashboard/form/formPreview";
import ChatbotSettings, {
    DEFAULT_CHATBOT_SETTINGS,
    type ChatbotSettings as ChatbotSettingsType,
} from "@/components/dashboard/form/chatbotSettings";
import {
    LuPlus,
    LuTrash2,
    LuPencil,
    LuGripVertical,
    LuChevronDown,
    LuCheck,
    LuEye,
    LuSettings,
    LuSend,
    LuX,
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
interface SortableQuestionCardProps {
    question: Question;
    index: number;
    updateQuestion: (id: string, patch: Partial<Question>) => void;
    deleteQuestion: (id: string) => void;
    addOption: (id: string) => void;
    updateOption: (id: string, optionIndex: number, value: string) => void;
    removeOption: (id: string, optionIndex: number) => void;
}

function SortableQuestionCard({
    question,
    index,
    updateQuestion,
    deleteQuestion,
    addOption,
    updateOption,
    removeOption,
}: SortableQuestionCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
        isOver,
    } = useSortable({ id: question.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const questionTypes = Object.entries(QUESTION_TYPE_LABELS) as [
        QuestionType,
        string,
    ][];
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const typeMenuRef = useRef<HTMLDivElement>(null);
    const typeButtonRef = useRef<HTMLButtonElement>(null);
    const typeListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!isTypeOpen) return;

        setHighlightedIndex(
            questionTypes.findIndex(([value]) => value === question.type)
        );

        typeListRef.current?.focus();

        const handlePointerDown = (event: MouseEvent) => {
            if (
                typeMenuRef.current &&
                !typeMenuRef.current.contains(event.target as Node)
            ) {
                setIsTypeOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsTypeOpen(false);
                typeButtonRef.current?.focus();
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isTypeOpen, question.type]);

    const selectQuestionType = (value: QuestionType) => {
        updateQuestion(question.id, { type: value });
        setIsTypeOpen(false);
        typeButtonRef.current?.focus();
    };

    const handleTypeButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (
            event.key === "ArrowDown" ||
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            setHighlightedIndex(
                questionTypes.findIndex(([value]) => value === question.type)
            );
            setIsTypeOpen(true);
        }
    };

    const handleTypeMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setHighlightedIndex((index) =>
                    (index + 1) % questionTypes.length
                );
                break;
            case "ArrowUp":
                event.preventDefault();
                setHighlightedIndex((index) =>
                    (index - 1 + questionTypes.length) % questionTypes.length
                );
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                selectQuestionType(questionTypes[highlightedIndex][0]);
                break;
            case "Escape":
                event.preventDefault();
                setIsTypeOpen(false);
                typeButtonRef.current?.focus();
                break;
            case "Tab":
                setIsTypeOpen(false);
                break;
            default:
                break;
        }
    };


    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 sm:p-5 dark:bg-gray-900/60 ${
                isDragging
                    ? "opacity-50 ring-2 ring-indigo-400/30"
                    : isOver
                    ? "border-indigo-400 ring-2 ring-indigo-400/40 dark:border-indigo-500"
                    : "border-gray-200 dark:border-gray-800"
            }`}
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex items-center gap-2 text-gray-400">
                    <button
                        type="button"
                        ref={setActivatorNodeRef}
                        {...listeners}
                        {...attributes}
                        className="inline-flex h-9 w-9 cursor-grab items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:cursor-grabbing dark:hover:bg-gray-800 dark:hover:text-gray-300"
                        aria-label="Drag to reorder question"
                        title="Drag to reorder"
                    >
                        <LuGripVertical className="h-5 w-5" aria-hidden="true" />
                    </button>
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
                        aria-label="Question title"
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-[14rem]" ref={typeMenuRef}>
                            <button
                                type="button"
                                ref={typeButtonRef}
                                aria-haspopup="listbox"
                                aria-expanded={isTypeOpen}
                                aria-label="Question type"
                                onClick={() => setIsTypeOpen((open) => !open)}
                                onKeyDown={handleTypeButtonKeyDown}
                                className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white dark:hover:border-gray-600"
                            >
                                <span className="truncate">
                                    {QUESTION_TYPE_LABELS[question.type]}
                                </span>
                                <LuChevronDown
                                    aria-hidden="true"
                                    className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                                        isTypeOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isTypeOpen ? (
                                <div className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-900 dark:ring-white/10">
                                    <ul
                                        ref={typeListRef}
                                        role="listbox"
                                        aria-label="Question type"
                                        tabIndex={-1}
                                        onKeyDown={handleTypeMenuKeyDown}
                                        className="max-h-64 overflow-y-auto py-1"
                                    >
                                        {questionTypes.map(([value, label], index) => (
                                            <li
                                                key={value}
                                                role="option"
                                                aria-selected={value === question.type}
                                                onClick={() => selectQuestionType(value)}
                                                onMouseEnter={() =>
                                                    setHighlightedIndex(index)
                                                }
                                                className={`flex cursor-pointer items-center justify-between px-3.5 py-2 text-sm transition-colors ${
                                                    index === highlightedIndex
                                                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                                                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                                } ${
                                                    value === question.type
                                                        ? "font-medium"
                                                        : ""
                                                }`}
                                            >
                                                <span>{label}</span>
                                                {value === question.type ? (
                                                    <LuCheck
                                                        aria-hidden="true"
                                                        className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                                                    />
                                                ) : null}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </div>

                        <label className="group inline-flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                            <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
                                <input
                                    type="checkbox"
                                    checked={question.required}
                                    onChange={(e) =>
                                        updateQuestion(question.id, {
                                            required: e.target.checked,
                                        })
                                    }
                                    className="peer sr-only"
                                />
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full bg-gray-300 transition-colors duration-200 group-hover:bg-gray-400 peer-checked:bg-indigo-600 peer-checked:group-hover:bg-indigo-700 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:bg-gray-700 dark:group-hover:bg-gray-600 dark:peer-checked:bg-indigo-500 dark:peer-checked:group-hover:bg-indigo-400 dark:peer-focus-visible:ring-offset-gray-900"
                                />
                                <span
                                    aria-hidden="true"
                                    className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5"
                                />
                            </span>
                            <span className="transition-colors group-hover:text-gray-900 dark:group-hover:text-white">
                                Required
                            </span>
                        </label>
                    </div>

                {question.type === "multiple_choice" ? (
                    <div className="space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 dark:border-indigo-500/20 dark:bg-indigo-500/5">
                        <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                                Answer options
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Add the choices respondents can select.
                            </p>
                        </div>
                        <ul className="space-y-2.5">
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-md focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-indigo-500/50">
                                        <span
                                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-indigo-300 bg-white dark:border-indigo-400/60 dark:bg-gray-900"
                                            aria-hidden="true"
                                        />
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
                                            aria-label={`Option ${optionIndex + 1}`}
                                            className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeOption(question.id, optionIndex)
                                            }
                                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                            aria-label="Remove option"
                                            title="Remove option"
                                        >
                                            <LuX className="h-4 w-4" aria-hidden="true" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => addOption(question.id)}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 px-3 py-2.5 text-sm font-medium text-indigo-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-indigo-500/30 dark:bg-indigo-500/5 dark:text-indigo-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200"
                        >
                            <LuPlus className="h-4 w-4" aria-hidden="true" />
                            Add option
                        </button>
                    </div>
                ) : null}

                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                        aria-label="Edit question"
                        title="Edit question"
                    >
                        <LuPencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteQuestion(question.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-red-400"
                        aria-label="Delete question"
                        title="Delete question"
                    >
                        <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function NewFormPage() {
    const [step, setStep] = useState<"details" | "editor">("details");
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);

    const [chatbotSettings, setChatbotSettings] =
        useState<ChatbotSettingsType>(DEFAULT_CHATBOT_SETTINGS);

    const [activeTab, setActiveTab] = useState<"questions" | "preview" | "chatbot">(
        "questions"
    );
    const tabContainerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const tabs = [
        { id: "questions" as const, label: "Questions", icon: LuPencil },
        { id: "preview" as const, label: "Preview", icon: LuEye },
        { id: "chatbot" as const, label: "Chatbot Settings", icon: LuSettings },
    ];

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        setQuestions((prev) => {
            const oldIndex = prev.findIndex((q) => q.id === active.id);
            const newIndex = prev.findIndex((q) => q.id === over.id);
            if (oldIndex < 0 || newIndex < 0) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    const activeIndex = tabs.findIndex((t) => t.id === activeTab);

    useLayoutEffect(() => {
        const container = tabContainerRef.current;
        const btn = tabRefs.current[activeIndex];
        if (!container || !btn) return;
        const cRect = container.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        setIndicator({ left: bRect.left - cRect.left, width: bRect.width });
    }, [activeIndex]);

    useEffect(() => {
        const update = () => {
            const container = tabContainerRef.current;
            const btn = tabRefs.current[activeIndex];
            if (!container || !btn) return;
            const cRect = container.getBoundingClientRect();
            const bRect = btn.getBoundingClientRect();
            setIndicator({ left: bRect.left - cRect.left, width: bRect.width });
        };
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [activeIndex]);
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
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm dark:bg-indigo-500"
                >
                    <LuSend className="h-4 w-4" aria-hidden="true" />
                    Publish
                </button>
            </header>

            <div
                ref={(el) => {
                    tabContainerRef.current = el;
                }}
                className="relative mx-auto flex w-fit max-w-full items-center gap-0.5 rounded-2xl bg-gray-100/80 px-1 py-1.5 dark:bg-gray-800/60"
                role="tablist"
                aria-label="Form builder sections"
            >
                <div
                    className="absolute rounded-xl bg-white shadow-sm transition-all duration-300 ease-out dark:bg-gray-900"
                    style={{ left: indicator.left, width: indicator.width, top: 6, bottom: 6 }}
                    aria-hidden="true"
                />
                {tabs.map((tab, i) => {
                    const Icon = tab.icon;
                    const isActive = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => {
                                tabRefs.current[i] = el;
                                if (el && i === activeIndex) {
                                    const container = tabContainerRef.current;
                                    if (container) {
                                        const cRect = container.getBoundingClientRect();
                                        const bRect = el.getBoundingClientRect();
                                        setIndicator({
                                            left: bRect.left - cRect.left,
                                            width: bRect.width,
                                        });
                                    }
                                }
                            }}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative z-10 flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-[#0F172A] ${
                                isActive
                                    ? "text-indigo-700 dark:text-indigo-300"
                                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            }`}
                        >
                            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span className="truncate">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {activeTab === "questions" ? (
                <>
                    <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={questions.map((q) => q.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <SortableQuestionCard
                                key={question.id}
                                question={question}
                                index={index}
                                updateQuestion={updateQuestion}
                                deleteQuestion={deleteQuestion}
                                addOption={addOption}
                                updateOption={updateOption}
                                removeOption={removeOption}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

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

                </>
            ) : null}

            {activeTab === "preview" ? <FormPreview /> : null}
            {activeTab === "chatbot" ? (
                    <ChatbotSettings
                        settings={chatbotSettings}
                        onChange={(updates) =>
                            setChatbotSettings((prev) => ({
                                ...prev,
                                ...updates,
                            }))
                        }
                    />
                ) : null}
        </div>
    );
}

