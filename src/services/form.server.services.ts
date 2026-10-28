import { cookies } from "next/headers";

export const getFroms = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/forms`, {
            headers: {
                Cookie: cookieHeader,
            },
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
};

export const getDashboardOverview = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/overview`, {
            headers: {
                Cookie: cookieHeader,
            },
            cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || 'Failed to fetch dashboard overview');
        }

        return data;
    }
    catch (error) {
        console.error('Dashboard overview fetch failed:', error);
    }
};
