"use client";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
}
