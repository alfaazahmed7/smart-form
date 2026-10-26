"use client";

import {
    LuMessageSquare,
    LuType,
    LuCircleCheck,
    LuActivity,
    LuPalette,
    LuMapPin,
    LuMessageCircle,
    LuSparkles,
    LuClock,
    LuTimer,
    LuRotateCcw,
    LuBot,
} from "react-icons/lu";

export interface ChatbotSettings {
    welcomeMessage: string;
    inputPlaceholder: string;
    completionMessage: string;
    showProgressIndicator: boolean;
    themeColor: string;
    chatbotPosition: "Bottom right" | "Bottom left";
    launcherButtonText: string;
    showBranding: boolean;
    openingBehavior: "Manual" | "Automatically after a delay";
    autoOpenDelaySeconds: number;
    allowRestart: boolean;
}

export const DEFAULT_CHATBOT_SETTINGS: ChatbotSettings = {
    welcomeMessage: "Hi there! 👋 Let's get started. I'll ask you a few quick questions.",
    inputPlaceholder: "Type your answer...",
    completionMessage: "Thanks for your time! Your response has been submitted successfully.",
    showProgressIndicator: true,
    themeColor: "#6366F1",
    chatbotPosition: "Bottom right",
    launcherButtonText: "Chat with us",
    showBranding: true,
    openingBehavior: "Manual",
    autoOpenDelaySeconds: 5,
    allowRestart: true,
};

const PRESET_COLORS = [
    "#6366F1",
    "#4F46E5",
    "#8B5CF6",
    "#7C3AED",
    "#A855F7",
    "#EC4899",
    "#F472B6",
    "#DB2777",
];

interface ChatbotSettingsProps {
    settings: ChatbotSettings;
    onChange: (updates: Partial<ChatbotSettings>) => void;
}

function Switch({
    id,
    checked,
    onChange,
    ariaLabel,
}: {
    id: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    ariaLabel: string;
}) {
    return (
        <label
            htmlFor={id}
            className="group inline-flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300"
        >
            <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    aria-label={ariaLabel}
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
        </label>
    );
}

function SegmentedControl<T extends string>({
    options,
    value,
    onChange,
    ariaLabel,
}: {
    options: readonly T[];
    value: T;
    onChange: (value: T) => void;
    ariaLabel: string;
}) {
    return (
        <div
            role="radiogroup"
            aria-label={ariaLabel}
            className="inline-flex flex-wrap rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800"
        >
            {options.map((option) => {
                const selected = option === value;
                return (
                    <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onChange(option)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${selected
                                ? "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            }`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}

function Field({
    id,
    label,
    description,
    icon: Icon,
    children,
}: {
    id?: string;
    label: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                {Icon ? (
                    <Icon
                        className="h-4 w-4 text-indigo-500 dark:text-indigo-400"
                        aria-hidden={true}
                    />
                ) : null}
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {label}
                </label>
            </div>
            {description ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            ) : null}
            {children}
        </div>
    );
}

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-indigo-400";
const textareaClass =
    inputClass + " min-h-[96px] resize-y";

export default function ChatbotSettings({ settings, onChange }: ChatbotSettingsProps) {
    const isValidHex = (value: string) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <header className="mb-6">
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                        Chatbot Settings
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Customize how your chatbot looks, behaves, and greets visitors.
                    </p>
                </header>

                <section className="space-y-5">
                    <div className="border-b border-gray-200 pb-3 dark:border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Welcome and Conversation
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            Control the messages visitors see while chatting.
                        </p>
                    </div>

                    <Field
                        id="welcome-message"
                        label="Welcome message"
                        description="Shown when the chatbot opens."
                        icon={LuMessageSquare}
                    >
                        <textarea
                            id="welcome-message"
                            value={settings.welcomeMessage}
                            onChange={(e) =>
                                onChange({ welcomeMessage: e.target.value })
                            }
                            className={textareaClass}
                        />
                    </Field>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field
                            id="input-placeholder"
                            label="Input placeholder"
                            description="Placeholder text in the chat input."
                            icon={LuType}
                        >
                            <input
                                id="input-placeholder"
                                type="text"
                                value={settings.inputPlaceholder}
                                onChange={(e) =>
                                    onChange({ inputPlaceholder: e.target.value })
                                }
                                className={inputClass}
                            />
                        </Field>

                        <Field
                            id="completion-message"
                            label="Completion message"
                            description="Shown when a visitor finishes the form."
                            icon={LuCircleCheck}
                        >
                            <textarea
                                id="completion-message"
                                value={settings.completionMessage}
                                onChange={(e) =>
                                    onChange({ completionMessage: e.target.value })
                                }
                                className={textareaClass}
                            />
                        </Field>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/40">
                        <div className="flex items-center gap-2">
                            <LuActivity className="h-4 w-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Show progress indicator
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Let visitors see their progress through the questions.
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="show-progress"
                            checked={settings.showProgressIndicator}
                            onChange={(value) =>
                                onChange({ showProgressIndicator: value })
                            }
                            ariaLabel="Show progress indicator"
                        />
                    </div>
                </section>

                <section className="space-y-5 pt-2">
                    <div className="border-b border-gray-200 pb-3 dark:border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Appearance and Branding
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            Match the chatbot to your brand.
                        </p>
                    </div>

                    <Field
                        id="theme-color"
                        label="Theme color"
                        description="Primary color used across the chatbot."
                        icon={LuPalette}
                    >
                        <div className="flex items-center gap-3">
                            <input
                                id="theme-color"
                                type="color"
                                value={isValidHex(settings.themeColor) ? settings.themeColor : "#6366F1"}
                                onChange={(e) =>
                                    onChange({ themeColor: e.target.value })
                                }
                                className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800"
                                aria-label="Theme color picker"
                            />
                            <input
                                id="theme-color-hex"
                                type="text"
                                value={settings.themeColor}
                                onChange={(e) =>
                                    onChange({ themeColor: e.target.value })
                                }
                                className={inputClass + " flex-1 font-mono"}
                                placeholder="#6366F1"
                            />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => onChange({ themeColor: color })}
                                    aria-label={`Use ${color}`}
                                    className={`h-7 w-7 rounded-full border-2 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${settings.themeColor.toLowerCase() === color.toLowerCase()
                                            ? "border-indigo-500 scale-110"
                                            : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </Field>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field
                            id="chatbot-position"
                            label="Chatbot position"
                            description="Where the launcher appears."
                            icon={LuMapPin}
                        >
                            <SegmentedControl
                                options={["Bottom right", "Bottom left"] as const}
                                value={settings.chatbotPosition}
                                onChange={(value) =>
                                    onChange({ chatbotPosition: value })
                                }
                                ariaLabel="Chatbot position"
                            />
                        </Field>

                        <Field
                            id="launcher-text"
                            label="Launcher button text"
                            description="Label on the floating launcher."
                            icon={LuMessageCircle}
                        >
                            <input
                                id="launcher-text"
                                type="text"
                                value={settings.launcherButtonText}
                                onChange={(e) =>
                                    onChange({ launcherButtonText: e.target.value })
                                }
                                className={inputClass}
                            />
                        </Field>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/40">
                        <div className="flex items-center gap-2">
                            <LuSparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Show SmartForm branding
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Display SmartForm branding in the chatbot.
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="show-branding"
                            checked={settings.showBranding}
                            onChange={(value) => onChange({ showBranding: value })}
                            ariaLabel="Show SmartForm branding"
                        />
                    </div>
                </section>

                <section className="space-y-5 pt-2">
                    <div className="border-b border-gray-200 pb-3 dark:border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Behavior and Experience
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            Decide how the chatbot opens and what visitors can do.
                        </p>
                    </div>

                    <Field
                        id="opening-behavior"
                        label="Chatbot opening behavior"
                        description="Choose manual or automatic opening."
                        icon={LuClock}
                    >
                        <SegmentedControl
                            options={["Manual", "Automatically after a delay"] as const}
                            value={settings.openingBehavior}
                            onChange={(value) =>
                                onChange({ openingBehavior: value })
                            }
                            ariaLabel="Chatbot opening behavior"
                        />
                    </Field>

                    <Field
                        id="auto-open-delay"
                        label="Auto-open delay (seconds)"
                        description="Delay before the chatbot opens automatically."
                        icon={LuTimer}
                    >
                        <input
                            id="auto-open-delay"
                            type="number"
                            min={0}
                            value={settings.autoOpenDelaySeconds}
                            disabled={settings.openingBehavior !== "Automatically after a delay"}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (!Number.isNaN(value)) {
                                    onChange({ autoOpenDelaySeconds: value });
                                }
                            }}
                            className={inputClass + " disabled:cursor-not-allowed disabled:opacity-50"}
                        />
                    </Field>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/40">
                        <div className="flex items-center gap-2">
                            <LuRotateCcw className="h-4 w-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Allow visitors to restart
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Offer a restart option after completion.
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="allow-restart"
                            checked={settings.allowRestart}
                            onChange={(value) => onChange({ allowRestart: value })}
                            ariaLabel="Allow visitors to restart"
                        />
                    </div>
                </section>

                <section className="space-y-3 pt-2">
                    <div className="border-b border-gray-200 pb-3 dark:border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Live Appearance Preview
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            A quick look at your chatbot&apos;s appearance.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
                        <div
                            className={`flex ${settings.chatbotPosition === "Bottom left"
                                    ? "justify-start"
                                    : "justify-end"
                                }`}
                        >
                            <div className="w-full max-w-xs space-y-2">
                                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                    <div
                                        className="px-3 py-2 text-sm font-medium text-white"
                                        style={{ backgroundColor: settings.themeColor }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <LuBot className="h-4 w-4" aria-hidden="true" />
                                            SmartForm
                                        </span>
                                    </div>
                                    <div className="space-y-2 p-3">
                                        <div
                                            className="max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-white"
                                            style={{ backgroundColor: settings.themeColor }}
                                        >
                                            {settings.welcomeMessage}
                                        </div>
                                        <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">
                                            {settings.inputPlaceholder}
                                        </div>
                                        {settings.showBranding ? (
                                            <p className="pt-1 text-[10px] text-gray-400 dark:text-gray-500">
                                                Powered by SmartForm
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div
                                    className={`flex ${settings.chatbotPosition === "Bottom left"
                                            ? "justify-start"
                                            : "justify-end"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm"
                                        style={{ backgroundColor: settings.themeColor }}
                                    >
                                        <LuMessageCircle className="h-4 w-4" aria-hidden="true" />
                                        {settings.launcherButtonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        // onClick={() => console.log(settings)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                    >
                        Log Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
