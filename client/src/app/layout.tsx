import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cookies } from "next/headers";

import Providers from "./providers";
import CheckAuth from "~/components/templates/auth/CheckAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hiring Job",
  description: "This is hiring job website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasAuthCookie = cookies().has(`${process.env.COOKIE_NAME}`);
  return (
    <html lang="en">
      <CheckAuth hasCookies={hasAuthCookie} />
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
