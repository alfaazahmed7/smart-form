"use client";

import { useEffect, useRef, useState } from "react";

interface CustomSelectProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
}

export default function CustomSelect({
    id,
    value,
    onChange,
    options,
    placeholder,
}: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const selectedIndex = options.indexOf(value);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const selectOption = (index: number) => {
        if (index < 0 || index >= options.length) return;
        onChange(options[index]);
        setOpen(false);
        triggerRef.current?.focus();
    };

    const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
            event.preventDefault();
            if (!open) {
                setOpen(true);
                setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
            } else if (event.key === "Enter" || event.key === " ") {
                selectOption(focusedIndex);
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) {
                setOpen(true);
                setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
            }
        } else if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
        }
    };

    const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setFocusedIndex((prev) =>
                prev < options.length - 1 ? prev + 1 : prev
            );
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectOption(focusedIndex);
        } else if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
        }
    };

    return (
        <div ref={containerRef} className="relative">
            <button
                ref={triggerRef}
                id={id}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={id ? `${id}-listbox` : undefined}
                onClick={() => {
                    if (!open) {
                        setOpen(true);
                        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
                    } else {
                        setOpen(false);
                    }
                }}
                onKeyDown={handleTriggerKeyDown}
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition-colors hover:border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-gray-600"
            >
                <span className="truncate">
                    {value ? value : placeholder ?? "Select an option"}
                </span>
                <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <ul
                ref={menuRef}
                id={id ? `${id}-listbox` : undefined}
                role="listbox"
                aria-labelledby={id}
                tabIndex={-1}
                onKeyDown={handleMenuKeyDown}
                className={`absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg transition-all duration-150 dark:border-gray-700 dark:bg-gray-800 ${
                    open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                }`}
            >
                {options.map((option, index) => {
                    const isSelected = option === value;
                    const isFocused = index === focusedIndex;
                    return (
                        <li
                            key={option}
                            role="option"
                            aria-selected={isSelected}
                            onMouseEnter={() => setFocusedIndex(index)}
                            onClick={() => selectOption(index)}
                            className={`flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2.5 text-sm transition-colors ${
                                isFocused ? "bg-gray-100 dark:bg-gray-700/60" : ""
                            } ${isSelected ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                        >
                            <span className="truncate">{option}</span>
                            {isSelected ? (
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
