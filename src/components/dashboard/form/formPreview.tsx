"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    LuBot,
    LuMessageCircle,
    LuRotateCcw,
    LuSend,
    LuX,
} from "react-icons/lu";
import {
    DEFAULT_CHATBOT_SETTINGS,
    type ChatbotSettings,
} from "@/components/dashboard/form/chatbotSettings";

export interface PreviewQuestion {
    id: string;
    title: string;
    type: "short_text" | "email" | "multiple_choice" | "yes_no";
    required: boolean;
    options: string[];
}

export interface PreviewFormData {
    title: string;
    description: string;
    questions: PreviewQuestion[];
    settings: ChatbotSettings;
}

export interface FormPreviewProps {
    data?: PreviewFormData;
    formData?: PreviewFormData;
    submissionData?: PreviewFormData;
    form?: PreviewFormData;
    previewData?: PreviewFormData;
}

type Message = {
    id: number;
    from: "bot" | "user";
    text: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveData(props: FormPreviewProps): PreviewFormData {
    const data =
        props.data ??
        props.formData ??
        props.submissionData ??
        props.form ??
        props.previewData;
    return {
        title: data?.title ?? "",
        description: data?.description ?? "",
        questions: data?.questions ?? [],
        settings: data?.settings ?? DEFAULT_CHATBOT_SETTINGS,
    };
}

export default function FormPreview(props: FormPreviewProps) {
    const data = resolveData(props);
    const title = data.title;
    const description = data.description;
    const questions = data.questions;
    const settings = data.settings;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [typing, setTyping] = useState(false);
    const [done, setDone] = useState(false);

    const idRef = useRef(1);
    const scrollRef = useRef<HTMLDivElement>(null);
    const autoTimerRef = useRef<number | null>(null);

    const pushMessage = (from: Message["from"], text: string) => {
        setMessages((prev) => [...prev, { id: idRef.current++, from, text }]);
    };

    const startConversation = () => {
        idRef.current = 1;
        setMessages([]);
        setCurrentStep(0);
        setInput("");
        setError(null);
        setDone(false);
        setTyping(false);

        const welcome = settings.welcomeMessage?.trim()
            ? settings.welcomeMessage
            : "Hi there!";
        const initial: Message[] = [{ id: idRef.current++, from: "bot", text: welcome }];

        if (questions.length === 0) {
            setMessages(initial);
            setDone(true);
            return;
        }

        initial.push({ id: idRef.current++, from: "bot", text: questions[0].title });
        setMessages(initial);
        setCurrentStep(0);
    };

    const startConversationRef = useRef(startConversation);
    useEffect(() => {
        startConversationRef.current = startConversation;
    });

    // Auto-open behavior
    useEffect(() => {
        if (settings.openingBehavior === "Automatically after a delay") {
            const delay = Math.max(0, Number(settings.autoOpenDelaySeconds) || 0) * 1000;
            if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
            autoTimerRef.current = window.setTimeout(() => {
                startConversationRef.current();
                setIsOpen(true);
            }, delay);
            return () => {
                if (autoTimerRef.current) {
                    window.clearTimeout(autoTimerRef.current);
                    autoTimerRef.current = null;
                }
            };
        }
        return undefined;
    }, [settings.openingBehavior, settings.autoOpenDelaySeconds]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
        };
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, typing, isOpen]);

    const closeChat = () => setIsOpen(false);

    const restart = () => {
        startConversation();
    };

    const submitText = () => {
        if (typing || done) return;
        const q = questions[currentStep];
        if (!q) return;
        const text = input.trim();

        if (q.required && !text) {
            setError("This question is required. Please enter an answer.");
            return;
        }
        if (q.type === "email" && text && !EMAIL_REGEX.test(text)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError(null);
        setInput("");
        pushMessage("user", text ? text : "Skipped");

        const next = currentStep + 1;
        if (next >= questions.length) {
            window.setTimeout(() => {
                pushMessage("bot", settings.completionMessage);
                setDone(true);
            }, 200);
            setCurrentStep(next);
        } else {
            setCurrentStep(next);
            window.setTimeout(() => {
                pushMessage("bot", questions[next].title);
            }, 200);
        }
    };

    const submitChoice = (value: string) => {
        if (typing || done) return;
        const q = questions[currentStep];
        if (!q) return;

        setError(null);
        setInput("");
        pushMessage("user", value ? value : "Skipped");

        const next = currentStep + 1;
        if (next >= questions.length) {
            window.setTimeout(() => {
                pushMessage("bot", settings.completionMessage);
                setDone(true);
            }, 200);
            setCurrentStep(next);
        } else {
            setCurrentStep(next);
            window.setTimeout(() => {
                pushMessage("bot", questions[next].title);
            }, 200);
        }
    };

    const handleSkip = () => {
        const q = questions[currentStep];
        if (!q || q.required) return;
        submitChoice("");
    };

    const currentQuestion =
        currentStep < questions.length ? questions[currentStep] : null;

    const questionNumber = questions.length
        ? Math.min(currentStep + 1, questions.length)
        : 0;
    const progress = questions.length
        ? done
            ? 100
            : (questionNumber / questions.length) * 100
        : 0;

    const themeColor = settings.themeColor || DEFAULT_CHATBOT_SETTINGS.themeColor;

    const positionIsLeft = settings.chatbotPosition === "Bottom left";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live Preview
                    </span>
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                        {title?.trim() ? title : "Untitled form"}
                    </h2>
                    {description?.trim() ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {description}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="relative min-h-[440px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-900/40">
                {!isOpen ? (
                    <div
                        className={`absolute bottom-4 flex ${
                            positionIsLeft ? "left-4 justify-start" : "right-4 justify-end"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => {
                            startConversation();
                            setIsOpen(true);
                        }}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            style={{ backgroundColor: themeColor }}
                        >
                            <LuMessageCircle className="h-4 w-4" aria-hidden="true" />
                            {settings.launcherButtonText || "Chat"}
                        </button>
                    </div>
                ) : (
                    <div
                        className={`absolute bottom-4 flex w-[min(calc(100%-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 ${
                            positionIsLeft ? "left-4" : "right-4"
                        }`}
                        style={{ maxHeight: "min(70vh, 520px)" }}
                    >
                        <header
                            className="flex items-center justify-between px-4 py-3 text-white"
                            style={{ backgroundColor: themeColor }}
                        >
                            <span className="flex items-center gap-2 text-sm font-semibold">
                                <LuBot className="h-4 w-4" aria-hidden="true" />
                                SmartForm
                            </span>
                            <button
                                type="button"
                                onClick={closeChat}
                                aria-label="Close chat"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15"
                            >
                                <LuX className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </header>

                        {settings.showProgressIndicator && questions.length > 0 ? (
                            <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-800">
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>
                                        Question {questionNumber} of {questions.length}
                                    </span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                                    <div
                                        className="h-full rounded-full transition-all duration-300"
                                        style={{
                                            width: `${progress}%`,
                                            backgroundColor: themeColor,
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}

                        <div
                            ref={scrollRef}
                            className="flex-1 space-y-3 overflow-y-auto p-4"
                        >
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${
                                        m.from === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                            m.from === "user"
                                                ? "text-white"
                                                : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                                        }`}
                                        style={
                                            m.from === "user"
                                                ? { backgroundColor: themeColor }
                                                : undefined
                                        }
                                    >
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {typing ? (
                                <div className="flex justify-start">
                                    <div className="rounded-2xl bg-gray-100 px-3 py-2 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                        Typing...
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="border-t border-gray-200 p-3 dark:border-gray-800">
                            {done ? (
                                <div className="flex flex-col gap-2">
                                    {settings.allowRestart ? (
                                        <button
                                            type="button"
                                            onClick={restart}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                                        >
                                            <LuRotateCcw className="h-4 w-4" aria-hidden="true" />
                                            Restart
                                        </button>
                                    ) : null}
                                </div>
                            ) : questions.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No questions to preview.
                                </p>
                            ) : currentQuestion ? (
                                <div className="space-y-2">
                                    {currentQuestion.type === "short_text" ||
                                    currentQuestion.type === "email" ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type={
                                                    currentQuestion.type === "email"
                                                        ? "email"
                                                        : "text"
                                                }
                                                value={input}
                                                onChange={(e) => {
                                                    setInput(e.target.value);
                                                    if (error) setError(null);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        submitText();
                                                    }
                                                }}
                                                placeholder={settings.inputPlaceholder}
                                                className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={submitText}
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition hover:opacity-95"
                                                style={{ backgroundColor: themeColor }}
                                                aria-label="Send answer"
                                            >
                                                <LuSend className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                        </div>
                                    ) : null}

                                    {currentQuestion.type === "multiple_choice" ? (
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap gap-2">
                                                {(currentQuestion.options || [])
                                                    .filter((o) => o.trim() !== "")
                                                    .map((option, idx) => (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            onClick={() => submitChoice(option)}
                                                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                            </div>
                                            {!currentQuestion.required ? (
                                                <button
                                                    type="button"
                                                    onClick={handleSkip}
                                                    className="text-xs font-medium text-gray-500 underline-offset-2 hover:underline dark:text-gray-400"
                                                >
                                                    Skip
                                                </button>
                                            ) : null}
                                        </div>
                                    ) : null}

                                    {currentQuestion.type === "yes_no" ? (
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => submitChoice("Yes")}
                                                    className="flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                                                    style={{ backgroundColor: themeColor }}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => submitChoice("No")}
                                                    className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                                >
                                                    No
                                                </button>
                                            </div>
                                            {!currentQuestion.required ? (
                                                <button
                                                    type="button"
                                                    onClick={handleSkip}
                                                    className="text-xs font-medium text-gray-500 underline-offset-2 hover:underline dark:text-gray-400"
                                                >
                                                    Skip
                                                </button>
                                            ) : null}
                                        </div>
                                    ) : null}

                                    {error ? (
                                        <p
                                            role="alert"
                                            className="text-xs font-medium text-red-600 dark:text-red-400"
                                        >
                                            {error}
                                        </p>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        {settings.showBranding ? (
                            <div className="border-t border-gray-200 px-3 py-1.5 text-center text-[10px] text-gray-400 dark:border-gray-800 dark:text-gray-500">
                                Powered by SmartForm
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
