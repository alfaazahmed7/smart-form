import {
    LuSettings,
} from "react-icons/lu";

const DashboardSettingsPage = () => {
    return (
        <div className="space-y-6 sm:space-y-8">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                        Settings
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        Manage your account and workspace preferences.
                    </p>
                </div>
            </header>

            <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center shadow-sm sm:p-8 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                <div className="mx-auto max-w-xl">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm dark:bg-indigo-500">
                        <LuSettings className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Settings options are coming soon!
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        We&apos;re working on new settings options to give you more control over your SmartForm experience. Stay tuned!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default DashboardSettingsPage;