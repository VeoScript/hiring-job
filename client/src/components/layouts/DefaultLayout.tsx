"use client";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({
  children,
}: DefaultLayoutProps): JSX.Element {
  return (
    <div className="flex flex-row justify-start w-full h-screen overflow-hidden">
      {children}
    </div>
  );
}
