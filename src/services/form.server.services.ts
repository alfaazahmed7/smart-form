import { cookies } from "next/headers";

export const getFroms = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/forms`, {
            headers: {
                Cookie: cookieHeader,
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || 'Failed to fetch forms');
        }

        return data;
    }
    catch (error) {
        console.error('Forms fetch failed:', error);
    }
}