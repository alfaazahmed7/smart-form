import { Suspense } from "react";
import PublicFormPageClient from "./PublicFormPageClient";

export default function PublicFormPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#080b14]">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        Loading form...
                    </div>
                </div>
            }
        >
            <PublicFormPageClient />
        </Suspense>
    );
}