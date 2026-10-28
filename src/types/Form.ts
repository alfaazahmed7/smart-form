export interface Form {
    title: string;
    description: string;
    questions: {
        id: string;
        title: string;
        type: "short_text" | "email" | "multiple_choice" | "yes_no";
        required: boolean;
        options: string[];
    }[];
    settings: {
        welcomeMessage: string;
        inputPlaceholder: string;
        completionMessage: string;
        showProgressIndicator: boolean;
        themeColor: string;
        chatbotPosition: string;
        launcherButtonText: string;
        showBranding: boolean;
        openingBehavior: string;
        autoOpenDelaySeconds: number;
        allowRestart: boolean;
    };
}

export interface SubmissionAnswer {
    questionId: string;
    question: string;
    type: string;
    answer: string;
}

export interface Submission {
    id: string;
    form_id: string;
    form_title: string;
    answers: {
        answers: SubmissionAnswer[];
    } | null;
    submitted_at: string;
}
