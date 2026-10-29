import { Suspense } from "react";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#080b14]">
            <style>{`
                html {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 transparent;
                }
                html.dark {
                    scrollbar-color: #334155 transparent;
                }
                html::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                html::-webkit-scrollbar-track {
                    background: transparent;
                }
                html::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 9999px;
                    border: 2px solid transparent;
                    background-clip: padding-box;
                }
                html::-webkit-scrollbar-thumb:hover {
                    background-color: #94a3b8;
                }
                html.dark::-webkit-scrollbar-thumb {
                    background-color: #334155;
                }
                html.dark::-webkit-scrollbar-thumb:hover {
                    background-color: #475569;
                }
            `}</style>
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:gap-6 lg:px-8 lg:py-8">
                <div className="shrink-0 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:self-start">
                    <Suspense fallback={null}>
                        <DashboardSidebar />
                    </Suspense>
                </div>
                <main className="min-w-0 flex-1 lg:h-[calc(100vh-4rem)] lg:self-start">
                    <div className="h-full overflow-y-auto rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-[#0F172A] shadow-sm p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}