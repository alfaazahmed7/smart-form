"use client";

import { useSyncExternalStore, useState, type FormEvent } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FcGoogle } from "react-icons/fc";
import { LuArrowRight, LuCheck, LuEye, LuEyeOff, LuShieldCheck, LuSparkles, LuZap } from "react-icons/lu";
import { Logo } from "@/components/shared/navbar/navbar";

// Types & constants   

type FormValues = { name: string; email: string; password: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Verified, publicly accessible Unsplash photo (modern analytics dashboard). */
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80";

const HIGHLIGHTS = ["No-code builder", "Chatbot widget", "Real-time analytics"] as const;

const STATS = [
  { value: "12k+", label: "Forms launched" },
  { value: "98%", label: "Completion rate" },
  { value: "4.9/5", label: "Avg. rating" },
] as const;

// Validation

function validate(data: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

/* Hydration-safe "mounted" detection (no setState in an effect). */
const emptySubscribe = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

// Page  

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* Theme state (hydration-safe, same pattern as the navbar) */
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getIsClient, getIsServer);
  const isDark = mounted && resolvedTheme === "dark";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* Gather the current field values for validation and logging. */
    const values: FormValues = { name: fullName, email, password };

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitted(false);
      return;
    }

    /* Demo only — no API calls. Logged so the collected values can be inspected. */
    console.log("formData", values);
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-[calc(100dvh_-_65px)] w-full flex-col bg-gray-100 dark:bg-[#080B14] sm:p-4 lg:p-4">
      <style>{`@keyframes sf-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.sf-enter{animation:sf-enter .4s cubic-bezier(.22,1,.36,1) both}`}</style>

      <div className="m-auto flex min-h-[calc(100dvh_-_65px)] w-full max-w-[1440px] flex-col overflow-hidden bg-white shadow-2xl shadow-gray-900/5 sm:min-h-[calc(100dvh_-_65px_-_2rem)] sm:rounded-3xl sm:border sm:border-gray-200 dark:bg-[#0F172A] dark:shadow-black/40 dark:sm:border-gray-800 lg:h-[calc(100dvh_-_65px_-_2rem)] lg:max-h-[800px] lg:min-h-0 lg:flex-row">
        {/* Left panel — fixed branding (identical in Sign Up / Sign In) */}
        <aside className="relative isolate flex min-h-[320px] flex-col overflow-hidden bg-[#0B1020] sm:min-h-[400px] lg:min-h-0 lg:w-[46%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE_URL}
            alt=""
            aria-hidden="true"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0B1020] via-[#0B1020]/85 to-[#0B1020]/45" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-[#0B1020]/70" />
          <div aria-hidden="true" className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative z-10 flex flex-1 flex-col justify-center gap-6 px-6 py-9 sm:gap-8 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-200 backdrop-blur">
              <LuSparkles className="h-3.5 w-3.5 text-indigo-300" aria-hidden="true" />
              Interactive form builder + chatbot widget
            </span>

            <div className="space-y-4">
              <h1 className="max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
                Turn conversations into{" "}
                <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
                  insights
                </span>
              </h1>
              <p className="max-w-lg text-sm leading-relaxed text-gray-300 sm:text-[15px]">
                SmartForm helps you build interactive forms and collect responses through
                chatbot-style experiences — craft a flow once, share it anywhere, and watch every
                answer turn into structured, actionable insight.
              </p>
            </div>

            <ul className="hidden flex-wrap items-center gap-2 sm:flex">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 backdrop-blur"
                >
                  <LuCheck className="h-3.5 w-3.5 text-indigo-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <dl className="hidden gap-6 border-t border-white/10 pt-6 lg:grid lg:grid-cols-3">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-xl font-semibold tracking-tight text-white">{stat.value}</dd>
                  <dd className="mt-1 text-xs text-gray-400">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Right panel — authentication form */}
        <main className="relative flex min-h-0 flex-1 flex-col bg-white dark:bg-[#0F172A]">
          <div className="flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-14 lg:pt-2">
            <Logo />
            {/* Theme toggle (inline, no shared component) */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
              className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A]"
            >
              <LuSparkles
                aria-hidden="true"
                className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
                  isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <LuZap
                aria-hidden="true"
                className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
                  isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              />
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 justify-center px-6 py-8 sm:px-10 sm:py-2 lg:overflow-y-auto lg:px-14">
            <div className="sf-enter m-auto w-full max-w-md">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-[1.75rem]">
                  Create your account
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Start building interactive forms in minutes. Free to try, no credit card required.
                </p>
              </div>

              <form noValidate onSubmit={handleSubmit} className="mt-3 space-y-2.5">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setErrors((prev) => (prev.name ? { ...prev, name: undefined } : prev));
                        setSubmitted(false);
                      }}
                      placeholder="Ada Lovelace"
                      autoComplete="name"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500/70 bg-red-50/50 dark:border-red-500/60 dark:bg-red-500/5 text-gray-900 dark:text-gray-100 focus:border-red-500 focus:ring-red-500/25"
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B1220] text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500/25 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/25"
                      }`}
                    />
                  </div>
                  {errors.name ? (
                    <p
                      id="name-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                {/* Email address */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => (prev.email ? { ...prev, email: undefined } : prev));
                        setSubmitted(false);
                      }}
                      placeholder="you@company.com"
                      autoComplete="email"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-500/70 bg-red-50/50 dark:border-red-500/60 dark:bg-red-500/5 text-gray-900 dark:text-gray-100 focus:border-red-500 focus:ring-red-500/25"
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B1220] text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500/25 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/25"
                      }`}
                    />
                  </div>
                  {errors.email ? (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) =>
                          prev.password ? { ...prev, password: undefined } : prev
                        );
                        setSubmitted(false);
                      }}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      aria-invalid={errors.password ? true : undefined}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-2.5 pr-11 text-sm shadow-sm transition duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-500/70 bg-red-50/50 dark:border-red-500/60 dark:bg-red-500/5 text-gray-900 dark:text-gray-100 focus:border-red-500 focus:ring-red-500/25"
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B1220] text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500/25 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/25"
                      }`}
                    />
                    {/* Show / hide password */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400"
                      >
                        {showPassword ? (
                          <LuEyeOff className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <LuEye className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password ? (
                    <p
                      id="password-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                {submitted ? (
                  <p
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 px-3.5 py-3 text-xs font-medium text-green-700 dark:text-green-400"
                  >
                    <LuShieldCheck className="mt-px h-4 w-4 shrink-0" aria-hidden="true" />
                    Details captured — open the browser console to inspect the logged formData.
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                >
                  Create account
                  <LuArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>

                <div className="flex items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">or</span>
                  <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                </div>

                <button
                  type="button"
                  aria-label="Continue with Google"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition duration-200 hover:bg-gray-50 hover:border-gray-400 dark:bg-gray-900/60 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-600 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-[#0F172A]"
                >
                  <FcGoogle className="h-[18px] w-[18px]" aria-hidden="true" />
                  Continue with Google
                </button>

                <p className="pt-1 text-center text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="rounded font-semibold text-indigo-600 underline-offset-4 transition hover:text-indigo-500 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400"
                  >
                    Sign in
                  </Link>
                </p>

                <p className="text-center text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                  By creating an account, you agree to our{" "}
                  <span className="underline underline-offset-2">Terms of Service</span> and{" "}
                  <span className="underline underline-offset-2">Privacy Policy</span>.
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

