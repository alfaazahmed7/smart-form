"use client";

import {
    DEFAULT_CHATBOT_SETTINGS,
    type ChatbotSettings,
} from "@/components/dashboard/form/new/chatbotSettings";
import { submitPublicForm } from "@/services/form.services";
import { useEffect, useRef, useState } from "react";
import {
    LuBot,
    LuMessageCircle,
    LuRotateCcw,
    LuSend,
    LuX,
} from "react-icons/lu";

export interface PublicQuestion {
    id: string;
    title: string;
    type: "short_text" | "email" | "multiple_choice" | "yes_no";
    required: boolean;
    options: string[];
}

export interface PublicFormData {
    title: string;
    description: string;
    questions: PublicQuestion[];
    settings: ChatbotSettings;
}

interface PublicFormChatbotProps {
    publicId: string;
    form: PublicFormData;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Message = {
    id: number;
    from: "bot" | "user";
    text: string;
};

export default function PublicFormChatbot({
    publicId,
    form,
}: PublicFormChatbotProps) {
    const questions = form.questions ?? [];
    const settings = form.settings ?? DEFAULT_CHATBOT_SETTINGS;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [typing, setTyping] = useState(false);
    const [done, setDone] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});

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
        setIsSubmitting(false);
        setSubmitError(null);
        setAnswers({});
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
    };

    const startConversationRef = useRef(startConversation);
    useEffect(() => {
        startConversationRef.current = startConversation;
    });

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

    useEffect(() => {
        return () => {
            if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
        };
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, typing, isOpen, isSubmitting]);

    const closeChat = () => setIsOpen(false);

    const restart = () => {
        if (!settings.allowRestart) return;
        startConversation();
    };

    const submitAnswersToServer = async (finalAnswers: Record<string, string>) => {
        setIsSubmitting(true);
        setSubmitError(null);

        const payload = questions.map((q) => ({
            questionId: q.id,
            answer: finalAnswers[q.id] ?? "",
        }));

        try {
            await submitPublicForm(publicId, payload);

            window.setTimeout(() => {
                pushMessage("bot", settings.completionMessage);
                setDone(true);
            }, 200);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Failed to submit your response.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const submitText = () => {
        if (typing || done || isSubmitting) return;
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

        const newAnswers = { ...answers, [q.id]: text };
        setAnswers(newAnswers);

        const next = currentStep + 1;
        if (next >= questions.length) {
            setCurrentStep(next);
            submitAnswersToServer(newAnswers);
        } else {
            setCurrentStep(next);
            window.setTimeout(() => {
                pushMessage("bot", questions[next].title);
            }, 200);
        }
    };

    const submitChoice = (value: string) => {
        if (typing || done || isSubmitting) return;
        const q = questions[currentStep];
        if (!q) return;

        setError(null);
        setInput("");
        pushMessage("user", value ? value : "Skipped");

        const newAnswers = { ...answers, [q.id]: value };
        setAnswers(newAnswers);

        const next = currentStep + 1;
        if (next >= questions.length) {
            setCurrentStep(next);
            submitAnswersToServer(newAnswers);
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
            <div
                className={`fixed z-50 ${positionIsLeft ? "left-4 sm:left-6" : "right-4 sm:right-6"
                    } bottom-4 sm:bottom-6`}
            >
                {!isOpen ? (
                    <button
                        type="button"
                        onClick={() => {
                            startConversation();
                            setIsOpen(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        style={{ backgroundColor: themeColor }}
                    >
                        <LuMessageCircle className="h-4 w-4" aria-hidden="true" />
                        {settings.launcherButtonText || "Chat with us"}
                    </button>
                ) : (
                    <div className="w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                        <div
                            className="flex items-center justify-between px-4 py-3 text-white"
                            style={{ backgroundColor: themeColor }}
                        >
                            <span className="flex items-center gap-2 text-sm font-semibold">
                                <LuBot className="h-4 w-4" aria-hidden="true" />
                                SmartForm
                            </span>
                            <div className="flex items-center gap-2">
                                {settings.allowRestart ? (
                                    <button
                                        type="button"
                                        onClick={restart}
                                        aria-label="Restart chat"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                    >
                                        <LuRotateCcw className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={closeChat}
                                    aria-label="Close chat"
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                >
                                    <LuX className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        {settings.showProgressIndicator && questions.length > 0 ? (
                            <div className="border-b border-gray-100 px-4 py-2 dark:border-gray-800">
                                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                                    <span>
                                        Question {Math.min(currentStep + 1, questions.length)} of{" "}
                                        {questions.length}
                                    </span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
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
                            className="max-h-[360px] space-y-3 overflow-y-auto px-4 py-3"
                        >
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.from === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.from === "user"
                                                ? "rounded-br-sm text-white"
                                                : "rounded-bl-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                                            }`}
                                        style={
                                            message.from === "user"
                                                ? { backgroundColor: themeColor }
                                                : undefined
                                        }
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}

                            {isSubmitting ? (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-gray-100 px-3 py-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                                        Submitting your response...
                                    </div>
                                </div>
                            ) : null}
                        </div>


                        {submitError ? (
                            <div className="border-t border-gray-100 px-4 py-2 dark:border-gray-800">
                                <p className="text-xs font-medium text-red-600 dark:text-red-400">
                                    {submitError}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => submitAnswersToServer(answers)}
                                    disabled={isSubmitting}
                                    className="mt-2 inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    Retry submission
                                </button>
                            </div>
                        ) : null}

                        {!done && currentQuestion ? (
                            <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
                                {currentQuestion.type === "multiple_choice" ? (
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {(currentQuestion.options ?? []).map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => submitChoice(option)}
                                                    disabled={isSubmitting}
                                                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
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
                                ) : currentQuestion.type === "yes_no" ? (
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => submitChoice("Yes")}
                                                disabled={isSubmitting}
                                                className="flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                                style={{ backgroundColor: themeColor }}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => submitChoice("No")}
                                                disabled={isSubmitting}
                                                className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
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
                                ) : (

                                    <div className="space-y-2">
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                submitText();
                                            }}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type={currentQuestion.type === "email" ? "email" : "text"}
                                                value={input}
                                                onChange={(event) => {
                                                    setInput(event.target.value);
                                                    if (error) setError(null);
                                                }}
                                                disabled={isSubmitting}
                                                placeholder={settings.inputPlaceholder}
                                                aria-label="Chat message"
                                                className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-indigo-400"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                aria-label="Send message"
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                                style={{ backgroundColor: themeColor }}
                                            >
                                                <LuSend className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                        </form>
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
                                )}

                                {error ? (
                                    <p
                                        role="alert"
                                        className="mt-2 text-xs font-medium text-red-600 dark:text-red-400"
                                    >
                                        {error}
                                    </p>
                                ) : null}
                            </div>
                        ) : null}

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

