"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import { useGetJobs } from "~/helpers/tanstack/queries/jobs";
import { authStore, jobDetailStore } from "~/helpers/store";
import { useLogoutMutation } from "~/helpers/tanstack/mutations/auth";

export default function JobsListApplicant(): JSX.Element {
  const router = useRouter();

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const { data: jobs, isLoading } = useGetJobs();

  const { isAuth, accountType } = authStore();
  const { setId, setTitle, setDescription, setCompanyDetails } =
    jobDetailStore();

  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        setIsLoadingLogout(false);
        router.push("/login");
        router.refresh();
      },
    });
  };

  const handleSelectJob = useCallback(
    (
      id: string,
      title: string,
      description: string,
      company_details: string
    ): void => {
      setId(id);
      setTitle(title);
      setDescription(description);
      setCompanyDetails(company_details);
    },
    [setId, setCompanyDetails, setDescription, setTitle]
  );

  useMemo(() => {
    if (jobs) {
      handleSelectJob(
        jobs[0]?.id ?? "",
        jobs[0]?.title ?? "",
        jobs[0]?.description ?? "",
        jobs[0]?.company_details ?? ""
      );
    }

    return () => {};
  }, [handleSelectJob, jobs]);

  return (
    <div className="flex flex-col items-start w-full max-w-xl h-full p-5 gap-y-3 overflow-x-hidden overflow-y-auto border-r border-neutral-200">
      <div className="flex flex-row items-center justify-between w-full px-3 py-5">
        <div className="flex flex-row items-center gap-x-3">
          <h1 className="font-bold text-xl">Jobs List</h1>
          {accountType && (
            <span className="rounded-full px-3 py-1 text-xs text-white bg-orange-500">
              {accountType}
            </span>
          )}
        </div>
        {!isLoading && (
          <>
            {isAuth ? (
              <button
                disabled={isLoadingLogout}
                type="button"
                className={clsx(
                  isLoadingLogout && "opacity:50 cursor-wait",
                  "rounded-lg px-5 py-3 text-sm text-white bg-red-500 hover:opacity-50"
                )}
                onClick={handleLogout}
              >
                {isLoadingLogout ? "Logging out" : " Log out"}
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-5 py-3 text-sm text-white bg-orange-500 hover:opacity-50"
              >
                Log in
              </Link>
            )}
          </>
        )}
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : (
        <>
          {jobs.map(
            (
              job: {
                id: string;
                title: string;
                description: string;
                company_details: string;
              },
              i: number
            ) => (
              <button
                type="button"
                key={i}
                className="flex flex-col items-start w-full p-5 text-left rounded-lg border border-neutral-300 gap-y-5 hover:opacity-50"
                onClick={() =>
                  handleSelectJob(
                    job.id,
                    job.title,
                    job.description,
                    job.company_details
                  )
                }
              >
                <h1 className="font-bold text-lg">{job.title}</h1>
                <p className="font-semibold text-sm text-neutral-500">
                  {job.company_details}
                </p>
                <p className="font-light text-sm line-clamp-3">
                  {job.description}
                </p>
              </button>
            )
          )}
        </>
      )}
    </div>
  );
}
