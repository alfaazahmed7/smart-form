import React from 'react';
import { LuArrowDown, LuArrowRight, LuInbox, LuPenLine, LuShare2 } from 'react-icons/lu';

const STEPS = [
    {
        title: 'Create Your Form',
        description:
            'Use the drag-and-drop builder to add questions, logic, and styling — no code required.',
        icon: <LuPenLine aria-hidden="true" className="h-5 w-5" />,
    },
    {
        title: 'Publish & Embed',
        description:
            'Share a public SmartForm link or embed the chatbot widget on your website with one snippet.',
        icon: <LuShare2 aria-hidden="true" className="h-5 w-5" />,
    },
    {
        title: 'Collect Responses',
        description:
            'Watch answers roll in and manage every submission from a single, organized dashboard.',
        icon: <LuInbox aria-hidden="true" className="h-5 w-5" />,
    },
];

const HowItWorksSection = () => {
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

            <section
                id="how-it-works"
                className="relative bg-gray-50 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 dark:bg-[#0F172A]"
            >
                <div className="mx-auto max-w-7xl">
                    {/* Section header */}
                    <div className="sf-fade-up mx-auto max-w-2xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
                            How it works
                        </p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            From idea to live form in three simple steps
                        </h2>
                        <p className="mt-4 text-pretty text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                            Create, publish, and start collecting — the whole workflow
                            takes just a few minutes.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="mt-14 flex flex-col items-stretch gap-8 lg:mt-16 lg:flex-row lg:items-start lg:gap-6">
                        {STEPS.map((step, index) => (
                            <React.Fragment key={step.title}>
                                <div
                                    className="sf-fade-up group flex-1 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20 dark:hover:shadow-black/20"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Icon tile + step number */}
                                    <div className="relative mb-6 w-fit">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:group-hover:border-indigo-400/30 dark:group-hover:bg-indigo-400/10 dark:group-hover:text-indigo-300">
                                            {step.icon}
                                        </div>
                                        <span className="absolute -left-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-semibold text-white shadow-sm ring-2 ring-gray-50 dark:bg-indigo-500 dark:ring-[#0F172A]">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Connector between steps */}
                                {index < STEPS.length - 1 && (
                                    <React.Fragment>
                                        <LuArrowDown
                                            aria-hidden="true"
                                            className="mx-auto h-5 w-5 shrink-0 self-center text-gray-300 dark:text-white/25 lg:hidden"
                                        />
                                        <LuArrowRight
                                            aria-hidden="true"
                                            className="mt-[42px] hidden h-5 w-5 shrink-0 self-start text-gray-300 dark:text-white/25 lg:block"
                                        />
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorksSection;

