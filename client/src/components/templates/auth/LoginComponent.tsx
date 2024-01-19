"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import AuthLayout from "~/components/layouts/AuthLayout";

import { loginValidation } from "~/helpers/hooks/useValidations";
import { useLoginMutation } from "~/helpers/tanstack/mutations/auth";

export default function LoginComponent() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loginFormErrors, setLoginFormErrors] = useState<any>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginMutation = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginValidation.validate(
        { email, password },
        { abortEarly: false }
      );
      setIsLoading(true);
      await loginMutation.mutateAsync(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            router.push("/");
            router.refresh();
          },
          onError: (error) => {
            setIsLoading(false);
            setError(error?.response?.data?.message);
          },
        }
      );
    } catch (error: any) {
      if (error?.inner) {
        const errors: any = {};
        error.inner.forEach((e: any) => {
          errors[e.path] = e.message;
        });
        setLoginFormErrors(errors);
      }
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center w-full max-w-xl h-screen gap-y-5"
      >
        <h1 className="font-bold text-xl">
          Hiring Job <span className="font-light">|</span>{" "}
          <span className="text-orange-500">Log in</span>
        </h1>
        {error && (
          <p className="flex flex-col items-center w-full p-3 rounded-xl border border-red-500 text-sm text-white bg-red-400">
            {error}
          </p>
        )}
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="name" className="ml-1 text-sm">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="w-full p-3 rounded-lg outline-none border bg-white"
            value={email}
            onChange={(e) => {
              setError("");
              setLoginFormErrors([]);
              setEmail(e.currentTarget.value);
            }}
          />
          {loginFormErrors && loginFormErrors.email && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {loginFormErrors.email}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="name" className="ml-1 text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-3 rounded-lg outline-none border bg-white"
            value={password}
            onChange={(e) => {
              setError("");
              setLoginFormErrors([]);
              setPassword(e.currentTarget.value);
            }}
          />
          {loginFormErrors && loginFormErrors.password && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {loginFormErrors.password}
            </span>
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={clsx(
            isLoading && "cursor-wait opacity-50",
            "w-full p-3 rounded-lg outline-none border border-orange-300 text-white bg-orange-500 hover:opacity-50"
          )}
        >
          Log in
        </button>
        <Link
          href="/"
          className="w-full p-3 rounded-lg outline-none border border-blue-300 text-center text-white bg-blue-500 hover:opacity-50"
        >
          Start Job Hunting
        </Link>
        <Link href="/register" className="text-neutral-500 hover:underline">
          Create an account?
        </Link>
      </form>
    </AuthLayout>
  );
}
