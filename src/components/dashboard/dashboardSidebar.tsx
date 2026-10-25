"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LuFileText,
    LuInbox,
    LuLayoutDashboard,
    LuMenu,
    LuPanelLeftClose,
    LuPanelLeftOpen,
    LuSettings,
    LuX,
} from "react-icons/lu";

const NAV_ITEMS = [
    { label: "Overview", href: "/dashboard", icon: LuLayoutDashboard },
    { label: "My Forms", href: "/dashboard/forms", icon: LuFileText },
    { label: "Submissions", href: "/dashboard/submissions", icon: LuInbox },
    { label: "Settings", href: "/dashboard/settings", icon: LuSettings },
] as const;

function isActivePath(pathname: string, href: string) {
    if (href === "/dashboard") {
        return pathname === "/dashboard";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <div className="lg:hidden w-full">
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-[#0F172A] px-3 py-2.5 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open navigation menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-dashboard-menu"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A]"
                    >
                        <LuMenu className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Dashboard
                    </span>
                </div>
            </div>

            <div
                id="mobile-dashboard-menu"
                className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-out ${mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden={!mobileOpen}
            >
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
                <aside
                    className={`absolute left-0 top-0 h-full w-72 max-w-[80vw] border-r border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-[#0F172A] shadow-xl transform transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between border-b border-gray-200/70 dark:border-gray-800/70 px-4 py-4">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Navigation
                        </span>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close navigation menu"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A]"
                        >
                            <LuX className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <nav className="p-3">
                        <ul className="space-y-1">
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const active = isActivePath(pathname ?? "", item.href);
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            aria-current={active ? "page" : undefined}
                                            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A] ${active
                                                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                            <span className="truncate">{item.label}</span>
                                            {active && (
                                                <span
                                                    aria-hidden="true"
                                                    className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>
            </div>

            <aside
                className={`hidden lg:flex lg:flex-col sticky top-4 self-start h-[calc(100vh-2rem)] rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-[#0F172A] shadow-sm transition-all duration-300 ease-out ${collapsed ? "w-16" : "w-64"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-gray-200/70 dark:border-gray-800/70 px-3 py-3">
                    {!collapsed && (
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Menu
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={() => setCollapsed((value) => !value)}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        aria-expanded={!collapsed}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A]"
                    >
                        {collapsed ? (
                            <LuPanelLeftOpen className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <LuPanelLeftClose className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-2">
                    <ul className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const active = isActivePath(pathname ?? "", item.href);
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-label={collapsed ? item.label : undefined}
                                        title={collapsed ? item.label : undefined}
                                        aria-current={active ? "page" : undefined}
                                        className={`group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A] ${collapsed ? "justify-center gap-0 px-2" : "gap-3"
                                            } ${active
                                                ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
                                            }`}
                                    >
                                        {active && (
                                            <span
                                                aria-hidden="true"
                                                className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                            />
                                        )}
                                        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                        <span
                                            className={`truncate transition-all duration-300 ${collapsed
                                                    ? "w-0 opacity-0 overflow-hidden"
                                                    : "w-auto opacity-100"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
