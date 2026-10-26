"use client";

import { LuEye } from "react-icons/lu";

export default function FormPreview() {
    return (
        <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 p-8 text-center dark:border-gray-700 dark:bg-gray-900/40">
            <div className="space-y-2">
                <LuEye className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Preview
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Form preview will be available here.
                </p>
            </div>
        </div>
    );
}
