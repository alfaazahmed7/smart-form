"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LuBot, LuCheck, LuRotateCcw, LuSend } from 'react-icons/lu';

type Message = {
    id: number;
    from: 'bot' | 'user';
    text: string;
};

type Question = {
    text: string;
    type: 'text' | 'email' | 'choice';
    placeholder: string;
    choices?: string[];
};

const WELCOME_MESSAGE =
    'Welcome to SmartForm! I am the demo assistant — answer a few quick questions to experience a conversational form.';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HIGHLIGHTS = [
    'One question at a time — no overwhelming forms',
    'Built-in validation keeps every response clean',
    'Embeddable on any site with a single snippet',
];

const QUESTIONS: Question[] = [
    {
        text: "Hi there! I'm the SmartForm assistant. What's your name?",
        type: 'text',
        placeholder: 'Type your name…',
    },
    {
        text: 'Nice to meet you, {name}! What email should we use to reach you?',
        type: 'email',
        placeholder: 'you@company.com',
    },
    {
        text: 'Great! What would you like to build with SmartForm?',
        type: 'choice',
        placeholder: '',
        choices: ['Lead capture form', 'Customer survey', 'Chatbot for my website'],
    },
    {
        text: 'Perfect. Roughly how many responses do you expect per month?',
        type: 'choice',
        placeholder: '',
        choices: ['Under 100', '100 – 1,000', '1,000+'],
    },
];

const ChatbotWidgetDemo = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, from: 'bot', text: WELCOME_MESSAGE },
    ]);
    const [step, setStep] = useState(0);
    const [typing, setTyping] = useState(true);
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [done, setDone] = useState(false);
    const [runId, setRunId] = useState(0);
    const idRef = useRef(1);
    const timerRef = useRef<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const pushMessage = useCallback((from: Message['from'], text: string) => {
        setMessages((prev) => [...prev, { id: idRef.current++, from, text }]);
    }, []);

    /* Bot delivers the current question after a typing delay */
    useEffect(() => {
        if (done) return;
        const timer = window.setTimeout(() => {
            setTyping(false);
            const question = QUESTIONS[step];
            if (question) {
                pushMessage('bot', question.text.replace('{name}', name || 'friend'));
            }
        }, 1000);
        return () => window.clearTimeout(timer);
    }, [step, done, name, runId, pushMessage]);

    /* Keep the conversation scrolled to the latest message */
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, typing]);

    /* Clear any pending completion timer on unmount */
    useEffect(
        () => () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        },
        [],
    );

    const restart = () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        idRef.current = 1;
        setMessages([{ id: 0, from: 'bot', text: WELCOME_MESSAGE }]);
        setStep(0);
        setTyping(true);
        setInput('');
        setError(null);
        setName('');
        setEmail('');
        setDone(false);
        setRunId((r) => r + 1);
    };

    const handleSend = (raw?: string) => {
        if (typing || done) return;
        const question = QUESTIONS[step];
        if (!question) return;
        const text = (raw ?? input).trim();
        if (!text) {
            setError('Please enter a response.');
            return;
        }
        if (question.type === 'email' && !EMAIL_REGEX.test(text)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError(null);
        setInput('');
        pushMessage('user', text);
        setTyping(true);

        const answerName = step === 0 ? text : name;
        const answerEmail = question.type === 'email' ? text : email;
        if (step === 0) setName(text);
        if (question.type === 'email') setEmail(text);

        /* Final answer: complete the demo */
        if (step + 1 >= QUESTIONS.length) {
            timerRef.current = window.setTimeout(() => {
                setTyping(false);
                pushMessage(
                    'bot',
                    `You're all set${answerName ? `, ${answerName}` : ''}! 🎉 We'll reach out at ${answerEmail} shortly — in the full product this response would land in your dashboard.`,
                );
                setDone(true);
            }, 1100);
            return;
        }
        setStep((s) => s + 1);
    };

    const currentQuestion = step < QUESTIONS.length ? QUESTIONS[step] : null;

    return (
        <div>
            <style>{`
        @keyframes sf-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sf-fade-up {
          opacity: 0;
          animation: sf-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .sf-fade-up { opacity: 1; animation: none; }
        }
      `}</style>

            <section id="chatbot-widget-demo" className="bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8 dark:bg-[#0F172A]">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Copy */}
                    <div className="sf-fade-up max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
                            Live demo
                        </p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Try the chatbot widget yourself
                        </h2>
                        <p className="mt-4 text-pretty text-base leading-relaxed text-gray-600 dark:text-gray-300">
                            This is a real SmartForm chatbot running right here on the page.
                            Answer a few questions to experience the same conversational flow
                            you can embed on your own website.
                        </p>
                        <ul className="mt-7 space-y-3">
                            {HIGHLIGHTS.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200"
                                >
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300">
                                        <LuCheck className="h-3 w-3" aria-hidden="true" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Chat panel */}
                    <div className="sf-fade-up mx-auto w-full max-w-lg" style={{ animationDelay: '120ms' }}>
                        <div className="flex h-[480px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 sm:h-[540px] dark:border-gray-800 dark:bg-gray-950 dark:shadow-black/40">
                            {/* Panel header */}
                            <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3.5 dark:border-gray-800 dark:bg-gray-900/60">
                                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white dark:bg-indigo-500">
                                    <LuBot className="h-5 w-5" aria-hidden="true" />
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                        SmartForm Assistant
                                    </p>
                                    <p className="text-xs text-green-600 dark:text-green-400">Online</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={restart}
                                    aria-label="Restart demo"
                                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus-visible:ring-indigo-400"
                                >
                                    <LuRotateCcw className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                ref={scrollRef}
                                aria-live="polite"
                                className="flex-1 space-y-3 overflow-y-auto px-4 py-5"
                            >
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`sf-fade-up flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] whitespace-pre-wrap px-4 py-2.5 text-sm leading-relaxed ${
                                                message.from === 'user'
                                                    ? 'rounded-2xl rounded-br-sm bg-indigo-600 text-white dark:bg-indigo-500'
                                                    : 'rounded-2xl rounded-bl-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                                            }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {typing && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 dark:bg-gray-800">
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms] dark:bg-gray-500" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms] dark:bg-gray-500" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms] dark:bg-gray-500" />
                                        </div>
                                    </div>
                                )}

                                {/* Restart CTA after completion */}
                                {done && (
                                    <div className="flex justify-start pt-1">
                                        <button
                                            type="button"
                                            onClick={restart}
                                            className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:shadow-indigo-500/25 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-950"
                                        >
                                            <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                                            Restart demo
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Input area */}
                            <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/60">
                                {currentQuestion?.type === 'choice' && !typing && !done && (
                                    <div className="mb-2.5 flex flex-wrap gap-2">
                                        {currentQuestion.choices?.map((choice) => (
                                            <button
                                                key={choice}
                                                type="button"
                                                onClick={() => handleSend(choice)}
                                                className="rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300 dark:hover:bg-indigo-400/20"
                                            >
                                                {choice}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(event) => {
                                            setInput(event.target.value);
                                            if (error) setError(null);
                                        }}
                                        disabled={done || typing}
                                        placeholder={
                                            done
                                                ? 'Demo completed'
                                                : typing
                                                  ? 'Assistant is typing…'
                                                  : currentQuestion?.placeholder ?? 'Type a message…'
                                        }
                                        aria-label="Chat message"
                                        className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-indigo-400"
                                    />
                                    <button
                                        type="submit"
                                        disabled={done || typing}
                                        aria-label="Send message"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:bg-indigo-500 dark:shadow-indigo-500/25 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-900"
                                    >
                                        <LuSend className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </form>

                                {error && (
                                    <p
                                        role="alert"
                                        className="mt-2 text-xs font-medium text-red-600 dark:text-red-400"
                                    >
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChatbotWidgetDemo;