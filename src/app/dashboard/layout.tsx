import DashboardSidebar from "@/components/dashboard/dashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080b14] overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <DashboardSidebar />
          <main className="flex-1 min-w-0">
            <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-[#0F172A] shadow-sm p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
