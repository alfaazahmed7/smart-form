interface UserData {
    name: string;
    email: string;
    password: string;
}

export const addUser = async (userData: UserData) => {
    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            throw new Error(
                data?.message || "Failed to register user."
            );
        }

        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Something went wrong while registering user.");
    }
};