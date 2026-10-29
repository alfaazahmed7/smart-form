import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Form",
  description: "Create a new SmartForm form and customize its chatbot experience.",
};

export default function NewFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}