import React from 'react';
import { LuCode, LuInbox, LuListChecks, LuMessageSquare, LuSend, LuSlidersHorizontal } from 'react-icons/lu';

const FEATURES = [
    {
        title: 'Interactive Form Builder',
        description:
            'Drag, drop, and design multi-step forms with smart validation — no code or developers required.',
        icon: <LuListChecks aria-hidden="true" className="h-5 w-5" />,
    },
    {
        title: 'Conversational Chatbot',
        description:
            'Turn any form into a natural chat experience that guides visitors and boosts completion rates.',
        icon: <LuMessageSquare aria-hidden="true" className="h-5 w-5" />,
    },
    {
        title: 'Website Embedding',
        description:
            'Embed forms and chat widgets on any website with a single copy-paste snippet.',
        icon: <LuCode aria-hidden="true" className="h-5 w-5" />,
    },
    {
        title: 'Response Management',
        description:
            'Collect, filter, and analyze every submission in one clean, searchable dashboard.',
        icon: <LuInbox aria-hidden="true" className="h-5 w-5" />,
    },
    {
        title: 'Form Publishing',
        description:
            'Publish instantly to a hosted SmartForm link and share it anywhere in seconds.',
        icon: <LuSend aria-hidden="true" className="h-5 w-5" />,
    },
    {
        title: 'Customization',
        description:
            'Match your brand with custom themes, colors, fonts, and fine-tuned styling controls.',
        icon: <LuSlidersHorizontal aria-hidden="true" className="h-5 w-5" />,
    },
];

const FeaturesSections = () => {
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
                id="features"
                className="relative bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8 dark:bg-gray-950"
            >
                <div className="mx-auto max-w-7xl">
                    {/* Section header */}
                    <div className="sf-fade-up mx-auto max-w-2xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                            Features
                        </p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Everything you need to capture better responses
                        </h2>
                        <p className="mt-4 text-pretty text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                            From building to publishing, SmartForm gives you one polished
                            toolkit for forms and conversational widgets.
                        </p>
                    </div>

                    {/* Features grid */}
                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {FEATURES.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="sf-fade-up group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-black/20"
                                style={{ animationDelay: `${index * 60}ms` }}
                            >
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                                    {feature.icon}
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesSections;