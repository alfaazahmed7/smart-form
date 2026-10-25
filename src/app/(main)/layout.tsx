import type { ReactNode } from "react";
import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";

export default function MainLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}