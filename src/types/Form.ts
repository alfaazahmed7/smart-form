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