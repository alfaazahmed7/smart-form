"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { LuListChecks, LuMoon, LuSun } from "react-icons/lu";
import { useEffect, useState, useSyncExternalStore } from "react";

/* Hydration-safe "mounted" detection (no setState in effect) */
const emptySubscribe = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Features", href: "#features", id: "features" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
      aria-label="SmartForm home"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm shadow-indigo-600/25 dark:shadow-indigo-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-indigo-600/30 dark:group-hover:shadow-indigo-500/30">
        <LuListChecks className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">
        Smart
        <span className="text-indigo-600 dark:text-indigo-400">
          Form
        </span>
      </span>
    </Link>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getIsClient, getIsServer);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
    >
      <LuSun
        aria-hidden="true"
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <LuMoon
        aria-hidden="true"
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");

  /* Sticky scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track active section + close mobile menu on navigation */
  useEffect(() => {
    const update = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveId(hash || "home");
      setOpen(false);
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  /* Close mobile menu on Escape and lock background scroll while open */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  /* Close mobile menu when switching to desktop viewport */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mediaQuery.matches) setOpen(false);
    };
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`border-b transition-all duration-300 ease-out ${
          scrolled || open
            ? "border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-[#0F172A] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_8px_24px_-12px_rgba(15,23,42,0.10)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent shadow-none dark:bg-[#0F172A]"
        }`}
      >
        <nav
          aria-label="Main"
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Left: logo */}
          <div className="flex min-w-0 items-center">
            <Logo />
          </div>

          {/* Center: navigation links (desktop) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative px-3.5 py-2 text-sm font-medium outline-none transition-colors duration-200 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Colorful underline: only beneath active center link */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[3px] rounded-full bg-indigo-600 dark:bg-indigo-400 transition-transform duration-300 ease-out ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-50 group-hover:opacity-40"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right: theme toggle + login + hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="#login"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 px-4 text-sm font-medium text-white shadow-sm shadow-indigo-600/25 dark:shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-500 dark:hover:bg-indigo-400 hover:shadow-md hover:shadow-indigo-600/30 dark:hover:shadow-indigo-500/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              Login
            </Link>

            {/* Hamburger (mobile) */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 md:hidden"
            >
              <span className="relative block h-[18px] w-[18px]">
                <span
                  className={`absolute left-0 top-0 block h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                    open ? "top-[8px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[8px] block h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-0 block h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                    open ? "top-[8px] -rotate-45" : "top-[16px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-200/70 dark:border-gray-800/70 px-4 pb-5 pt-3 sm:px-6">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative flex items-center rounded-lg px-3 py-2.5 text-[15px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-800/70 text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-indigo-600 dark:bg-indigo-400"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
