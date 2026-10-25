import DashboardSidebar from "@/components/dashboard/dashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-[#080b14]">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4 overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:gap-6 lg:px-8 lg:py-8">
        <DashboardSidebar />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-[#0F172A] shadow-sm p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
