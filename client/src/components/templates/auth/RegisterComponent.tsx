"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import AuthLayout from "~/components/layouts/AuthLayout";

import { registrationValidation } from "~/helpers/hooks/useValidations";
import { useRegisterMutation } from "~/helpers/tanstack/mutations/auth";

export default function RegisterComponent(): JSX.Element {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [registerFormErrors, setRegisterFormErrors] = useState<any>(null);

  const [isEmployer, setIsEmployer] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const registrationMutation = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrationValidation.validate(
        { name, email, password, repassword },
        { abortEarly: false }
      );
      setIsLoading(true);
      await registrationMutation.mutateAsync(
        {
          account_type: isEmployer ? "EMPLOYER" : "APPLICANT",
          name,
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
        setRegisterFormErrors(errors);
      }
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center justify-center w-full max-w-xl h-full py-10 gap-y-5"
      >
        <h1 className="font-bold text-xl">
          Register <span className="font-light">|</span>{" "}
          <span className="text-orange-500">Create Account</span>
        </h1>
        <div className="flex flex-row items-center justify-between w-full gap-x-5">
          <button
            type="button"
            className={clsx(
              isEmployer
                ? "border-orange-300 bg-orange-100"
                : "border-neutral-300 bg-white",
              "flex flex-col items-center justify-center w-full p-10 gap-y-3 rounded-xl border"
            )}
            onClick={() => setIsEmployer(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>

            <h2>Hiring / Employer</h2>
          </button>
          <button
            type="button"
            className={clsx(
              !isEmployer
                ? "border-orange-300 bg-orange-100"
                : "border-neutral-300 bg-white",
              "flex flex-col items-center justify-center w-full p-10 gap-y-3 rounded-xl border"
            )}
            onClick={() => setIsEmployer(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
              />
            </svg>
            <h2>Applicant</h2>
          </button>
        </div>
        {error && (
          <p className="flex flex-col items-center w-full p-3 rounded-xl border border-red-500 text-sm text-white bg-red-400">
            {error}
          </p>
        )}
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="name" className="ml-1 text-sm">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-3 rounded-lg outline-none border bg-white"
            value={name}
            onChange={(e) => {
              setError("");
              setRegisterFormErrors([]);
              setName(e.currentTarget.value);
            }}
          />
          {registerFormErrors && registerFormErrors.name && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {registerFormErrors.name}
            </span>
          )}
        </div>
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
              setRegisterFormErrors([]);
              setEmail(e.currentTarget.value);
            }}
          />
          {registerFormErrors && registerFormErrors.email && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {registerFormErrors.email}
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
              setRegisterFormErrors([]);
              setPassword(e.currentTarget.value);
            }}
          />
          {registerFormErrors && registerFormErrors.password && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {registerFormErrors.password}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="name" className="ml-1 text-sm">
            Re-enter Password
          </label>
          <input
            type="password"
            name="repassword"
            id="repassword"
            className="w-full p-3 rounded-lg outline-none border bg-white"
            value={repassword}
            onChange={(e) => {
              setError("");
              setRegisterFormErrors([]);
              setRepassword(e.currentTarget.value);
            }}
          />
          {registerFormErrors && registerFormErrors.repassword && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {registerFormErrors.repassword}
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
          Register
        </button>
        <Link href="/login" className="text-neutral-500 hover:underline">
          Already have an account?
        </Link>
      </form>
    </AuthLayout>
  );
}
