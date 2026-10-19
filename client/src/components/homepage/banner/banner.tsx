import React from 'react';
import { LuArrowRight, LuCheck } from 'react-icons/lu';

const BannerSection = () => {
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
      `}
            </style>

            <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 dark:bg-[#0F172A]">
                {/* Decorative grid pattern */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(107,114,128,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(107,114,128,0.09)_1px,transparent_1px)] bg-[size:56px_56px] [-webkit-mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,black,transparent)] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,black,transparent)] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]"
                />
                {/* Soft top glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[860px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.12),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_65%)]"
                />

                <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    {/* Badge */}
                    <div
                        className="sf-fade-up inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-300"
                        style={{ animationDelay: "0ms" }}
                    >
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                        </span>
                        AI-powered chatbot widgets are here
                    </div>

                    {/* Headline */}
                    <h1
                        className="sf-fade-up mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
                        style={{ animationDelay: "80ms" }}
                    >
                        Build forms that feel like{" "}
                        <span className="text-indigo-600 dark:text-indigo-400">conversations</span>
                    </h1>

                    {/* Description */}
                    <p
                        className="sf-fade-up mt-5 max-w-2xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300"
                        style={{ animationDelay: "160ms" }}
                    >
                        SmartForm is the interactive form builder and chatbot widget platform
                        that helps you design beautiful forms, capture better responses, and
                        engage visitors in real time — no code required.
                    </p>

                    {/* CTAs */}
                    <div
                        className="sf-fade-up mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center"
                        style={{ animationDelay: "240ms" }}
                    >
                        <a
                            href="#login"
                            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 sm:w-auto dark:bg-indigo-500 dark:shadow-indigo-500/25 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-950"
                        >
                            Get Started
                            <LuArrowRight
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </a>
                        <a
                            href="#features"
                            className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 sm:w-auto dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-950"
                        >
                            Explore Features
                        </a>
                    </div>

                    {/* Trust line */}
                    <p
                        className="sf-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400"
                        style={{ animationDelay: "320ms" }}
                    >
                        <span className="inline-flex items-center gap-1.5">
                            <LuCheck aria-hidden="true" className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                            Free plan available
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <LuCheck aria-hidden="true" className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                            No credit card required
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <LuCheck aria-hidden="true" className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                            Setup in minutes
                        </span>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default BannerSection;