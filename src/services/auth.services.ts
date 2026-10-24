interface registerUseData {
    name: string;
    email: string;
    password: string;
}

interface loginUserData {
    email: string,
    password: string
}

type GetMeResponse =
    | {
        success: true;
        message: string;
        user: {
            id: string,
            email: string,
            name: string
        }
    }
    | {
        success: false;
        message: string;
    };

export const addUser = async (userData: registerUseData) => {
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
            return {
                success: false,
                message: data?.message || "Failed to register user.",
            };
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

export const loginUser = async (userData: loginUserData) => {
    try {
        const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data?.message || 'Failed to login user.'
            };
        }

        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Something went wrong while login user.");
    }
}

export const getMe = async (): Promise<GetMeResponse> => {
    try {
        const res = await fetch('/api/me');

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data?.message ?? `Request failed (${res.status})`
            }
        }

        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error('Something went wrong');
    }
}

export const logoutUser = async () => {
    try {
        const res = await fetch('/api/logout', {
            method: 'POST'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to logout');
        }

        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error('Somehting went wrong');
    }
}