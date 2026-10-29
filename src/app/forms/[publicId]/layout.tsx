import type { Metadata } from "next";

type PublicFormMetadata = {
  success?: boolean;
  form?: {
    title?: string;
    description?: string | null;
    public_id?: string;
  };
};

async function getPublicForm(publicId: string): Promise<PublicFormMetadata | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${baseUrl}/api/public/forms/${publicId}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return (await response.json()) as PublicFormMetadata;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ publicId: string }>;
}): Promise<Metadata> {
  const { publicId } = await params;
  const data = await getPublicForm(publicId);
  const form = data?.success ? data.form : null;

  if (!form) {
    return {
      title: "Form not available",
      description: "This form could not be found or is not published.",
    };
  }

  const title = form.title?.trim() || "Form";
  const description =
    form.description?.trim() || "Complete this form powered by SmartForm.";

  return {
    title,
    description,
  };
}

export default function PublicFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}