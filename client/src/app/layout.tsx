import type { Metadata } from "next";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

const CheckAuth = dynamic(
  () => import("~/components/templates/auth/CheckAuth"),
  { ssr: false }
);

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
      <Providers>
        <body className={inter.className}>
          {children}
          <CheckAuth hasCookies={hasAuthCookie} />
        </body>
      </Providers>
    </html>
  );
}
