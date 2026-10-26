import { Form } from "@/types/Form";

export const formSubmission = async (formData: Form, userId: string) => {
    try {
        const response = await fetch('/api/forms', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                userId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || 'Failed to create form');
        }

        return data;
    }
    catch (error) {
        console.error('Form submisson failed:', error);
    }
}