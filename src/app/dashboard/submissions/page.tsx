import SubmissionsClient from "../../../components/dashboard/submissions/submissionsClient";
import { getSubmissionsServer } from "@/services/form.server.services";

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
