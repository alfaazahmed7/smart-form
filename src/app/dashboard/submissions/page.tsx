import type { Metadata } from "next";
import SubmissionsClient from "../../../components/dashboard/submissions/submissionsClient";
import { getSubmissionsServer } from "@/services/form.server.services";

export const metadata: Metadata = {
  title: "Submissions",
  description: "Review and manage submissions collected by your SmartForm forms.",
};

export default async function DashboardSubmissionsPage() {
    const result = await getSubmissionsServer();
    const success = result?.success === true;
    const initialSubmissions = success && Array.isArray(result?.submissions)
        ? result.submissions
        : [];
    const initialError = success
        ? null
        : result?.message || "Failed to fetch submissions.";

    return (
        <SubmissionsClient
            initialSubmissions={initialSubmissions}
            initialError={success ? null : initialError}
        />
    );
}
