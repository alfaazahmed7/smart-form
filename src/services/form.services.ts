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

export const getFormById = async (id: string) => {
    try {
        const response = await fetch(`/api/forms/${id}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to retrieve form.");
        }

        return data;
    } catch (error) {
        console.error("Get form error:", error);
        throw error;
    }
}

export const getFormForEdit = async (id: string) => {
    try {
        const response = await fetch(`/api/forms/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to retrieve form.");
        }

        return data.form;
    } catch (error) {
        console.error("Get form for edit error:", error);
        throw error;
    }
};

export const updateForm = async (
    id: string,
    formData: Form
) => {
    try {
        const response = await fetch(`/api/forms/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update form.");
        }

        return data;
    } catch (error) {
        console.error("Update form error:", error);
        throw error;
    }
};

export const deleteForm = async (id: string) => {
    try {
        const response = await fetch(`/api/forms/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete form.");
        }

        return data;
    } catch (error) {
        console.error("Delete form error:", error);
        throw error;
    }
};