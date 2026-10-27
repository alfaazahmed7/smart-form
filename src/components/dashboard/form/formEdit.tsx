"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LuEye, LuPencil, LuTrash2, LuX, LuCheck, LuSettings, LuPlus } from "react-icons/lu";
import { type FormDetails } from "./formDetailsView";
import ChatbotSettings, {
    DEFAULT_CHATBOT_SETTINGS,
    type ChatbotSettings as ChatbotSettingsType,
} from "@/components/dashboard/form/new/chatbotSettings";
import FormPreview from "@/components/dashboard/form/new/formPreview";
import {
    type Question,
    type QuestionType,
    createQuestion,
    SortableQuestionCard,
} from "@/app/dashboard/forms/[new]/page";

interface FormEditProps {
    form: FormDetails;
    onClose: () => void;
}

function StatusBadge({ status }: { status: string }) {
    const normalized = (status || "").toLowerCase();
    const isPublished = normalized === "published";
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${isPublished
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`}
                aria-hidden="true"
            />
            {isPublished ? "Published" : status ? status.charAt(0).toUpperCase() + status.slice(1) : "Draft"}
        </span>
    );
}

export default function FormEdit({ form, onClose }: FormEditProps) {
    const [title, setTitle] = useState(form.title ?? "");
    const [description, setDescription] = useState(form.description ?? "");
    const [status, setStatus] = useState(form.status ?? "");
    const [questions, setQuestions] = useState<Question[]>(() =>
        (form.questions ?? []).map((q) => ({
            id: q.id,
            title: q.title ?? "",
            type: (q.type as QuestionType) ?? "short_text",
            required: !!q.required,
            options: Array.isArray(q.options) ? q.options : [],
        }))
    );
    const [chatbotSettings, setChatbotSettings] = useState<ChatbotSettingsType>(() => {
        const s = form.settings;
        return s
            ? {
                welcomeMessage: s.welcome_message ?? DEFAULT_CHATBOT_SETTINGS.welcomeMessage,
                inputPlaceholder: s.input_placeholder ?? DEFAULT_CHATBOT_SETTINGS.inputPlaceholder,
                completionMessage: s.completion_message ?? DEFAULT_CHATBOT_SETTINGS.completionMessage,
                showProgressIndicator: s.show_progress_indicator ?? DEFAULT_CHATBOT_SETTINGS.showProgressIndicator,
                themeColor: s.primary_color ?? DEFAULT_CHATBOT_SETTINGS.themeColor,
                chatbotPosition: (s.chatbot_position as "Bottom right" | "Bottom left") ?? DEFAULT_CHATBOT_SETTINGS.chatbotPosition,
                launcherButtonText: s.launcher_button_text ?? DEFAULT_CHATBOT_SETTINGS.launcherButtonText,
                showBranding: s.show_branding ?? DEFAULT_CHATBOT_SETTINGS.showBranding,
                openingBehavior: (s.opening_behavior as "Manual" | "Automatically after a delay") ?? DEFAULT_CHATBOT_SETTINGS.openingBehavior,
                autoOpenDelaySeconds: s.auto_open_delay_seconds ?? DEFAULT_CHATBOT_SETTINGS.autoOpenDelaySeconds,
                allowRestart: s.allow_restart ?? DEFAULT_CHATBOT_SETTINGS.allowRestart,
            }
            : DEFAULT_CHATBOT_SETTINGS;
    });

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
            prev.map((q) => {
                if (q.id !== id) return q;
                if (q.options.length >= 3) return q;
                return { ...q, options: [...q.options, ""] };
            })
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

    const handleSaveChanges = () => {
        console.log(
            {
                title,
                description,
                questions,
                settings: chatbotSettings,
            },
            "form update data"
        );
    };

    const submissionData = {
        title,
        description,
        questions,
        settings: chatbotSettings,
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Edit Form
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {title?.trim() ? title : "Untitled form"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <StatusBadge status={status} />
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close editor"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    >
                        <LuX className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </header>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div
                    ref={tabContainerRef}
                    className="relative mb-6 flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800/60"
                >
                    <span
                        aria-hidden="true"
                        className="absolute top-1 bottom-1 rounded-lg bg-white shadow-sm transition-all duration-300 dark:bg-gray-900"
                        style={{ left: indicator.left, width: indicator.width }}
                    />
                    {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = tab.id === activeTab;
                        return (
                            <button
                                key={tab.id}
                                ref={(el) => {
                                    tabRefs.current[index] = el;
                                }}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative z-10 inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? "text-indigo-700 dark:text-indigo-300"
                                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                    }`}
                            >
                                <Icon className="h-4 w-4" aria-hidden="true" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {activeTab === "questions" ? (
                    <>
                        <div className="mb-5 space-y-4">
                            <div>
                                <label
                                    htmlFor="edit-form-title"
                                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Form title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="edit-form-title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter form title"
                                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="edit-form-description"
                                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Form description
                                </label>
                                <textarea
                                    id="edit-form-description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter form description"
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white"
                                />
                            </div>
                        </div>

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

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                    </>
                ) : null}

                {activeTab === "preview" ? (
                    <FormPreview
                        data={submissionData}
                        formData={submissionData}
                        submissionData={submissionData}
                    />
                ) : null}

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

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                >
                    <LuCheck className="h-4 w-4" aria-hidden="true" />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
