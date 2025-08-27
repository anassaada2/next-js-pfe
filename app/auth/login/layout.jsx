// app/layout.jsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
