"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function DashboardLenisProvider({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ReactLenis
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        anchors: true,
        allowNestedScroll: true,
        respectReducedMotion: true,
        autoRaf: true,
      }}
      className={className}
    >
      {children}
    </ReactLenis>
  );
}
