"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import NewJobModal from "~/components/ui/Modals/NewJobModal";

import { useGetEmployer } from "~/helpers/tanstack/queries/jobs";
import { authStore, jobDetailStore } from "~/helpers/store";
import { useLogoutMutation } from "~/helpers/tanstack/mutations/auth";
import { useGetEmployerApplicants } from "~/helpers/tanstack/queries/jobs";

export default function JobsListEmployer(): JSX.Element {
  const router = useRouter();

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);
  const [isFirstTab, setIsFirstTab] = useState<boolean>(true);

  const { data: jobs_employer, isLoading } = useGetEmployer();

  const { isAuth, accountType } = authStore();
  const { setApplicanDetails } = jobDetailStore();

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
          <div className="flex flex-row items-center justify-between w-full border-y border-nuetral-200">
            <button
              type="button"
              className={clsx(
                isFirstTab && "bg-neutral-200",
                "flex flex-row items-center justify-center w-full p-3 hover:opacity-50"
              )}
              onClick={() => {
                if (setApplicanDetails) {
                  setApplicanDetails({});
                }
                setIsFirstTab(true);
              }}
            >
              Created Jobs
            </button>
            <button
              type="button"
              className={clsx(
                !isFirstTab && "bg-neutral-200",
                "flex flex-row items-center justify-center w-full p-3 hover:opacity-50"
              )}
              onClick={() => {
                if (setApplicanDetails) {
                  setApplicanDetails({});
                }
                setIsFirstTab(false);
              }}
            >
              Applied Jobs
            </button>
          </div>
          <div className="flex flex-col items-start w-full gap-y-3">
            {isFirstTab ? (
              <CreatedJobs jobs_employer={jobs_employer} />
            ) : (
              <EmployerApplicants />
            )}
          </div>
        </>
      )}
    </div>
  );
}

const CreatedJobs = ({ jobs_employer }: any) => {
  const { setId, setTitle, setDescription, setCompanyDetails } =
    jobDetailStore();

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
    if (jobs_employer) {
      handleSelectJob(
        jobs_employer[0]?.id ?? "",
        jobs_employer[0]?.title ?? "",
        jobs_employer[0]?.description ?? "",
        jobs_employer[0]?.company_details ?? ""
      );
    }

    return () => {};
  }, [handleSelectJob, jobs_employer]);
  return (
    <>
      {jobs_employer.length === 0 && (
        <div className="flex flex-col items-center w-full">
          <NewJobModal />
        </div>
      )}
      {jobs_employer.map(
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
            <p className="font-light text-sm line-clamp-3">{job.description}</p>
          </button>
        )
      )}
    </>
  );
};

const EmployerApplicants = () => {
  const {
    setId,
    setTitle,
    setDescription,
    setCompanyDetails,
    setApplicanDetails,
  } = jobDetailStore();

  const { data: applicants, isLoading } = useGetEmployerApplicants();

  const handleSelectJob = useCallback(
    (
      id: string,
      title: string,
      description: string,
      company_details: string,
      applicationDetails: {
        id: string;
        status: string;
        name: string;
        email: string;
        mainId: string;
      }
    ): void => {
      setId(id);
      setTitle(title);
      setDescription(description);
      setCompanyDetails(company_details);
      if (setApplicanDetails) {
        setApplicanDetails(applicationDetails ?? {});
      }
    },
    [setId, setTitle, setDescription, setCompanyDetails, setApplicanDetails]
  );

  useMemo(() => {
    if (applicants) {
      handleSelectJob(
        applicants[0].job?.id ?? "",
        applicants[0].job?.title ?? "",
        applicants[0].job?.description ?? "",
        applicants[0].job?.company_details ?? "",
        {
          id: applicants[0].user?.id ?? "",
          status: applicants[0]?.status ?? "PENDING",
          name: applicants[0].user?.name ?? "",
          email: applicants[0].user?.email ?? "",
          mainId: applicants[0].id,
        }
      );
    }

    return () => {};
  }, [handleSelectJob, applicants]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {applicants.length === 0 && (
        <div className="flex flex-col items-center w-full">
          <NewJobModal />
        </div>
      )}
      {applicants.map(
        (
          applicant: {
            id: string;
            status: string;
            job: {
              id: string;
              title: string;
              description: string;
              company_details: string;
            };
            user: {
              id: string;
              account_type: string;
              name: string;
              email: string;
            };
          },
          i: number
        ) => (
          <button
            type="button"
            key={i}
            className="flex flex-col items-start w-full p-5 text-left rounded-lg border border-neutral-300 gap-y-5 hover:opacity-50"
            onClick={() =>
              handleSelectJob(
                applicant.job.id,
                applicant.job.title,
                applicant.job.description,
                applicant.job.company_details,
                {
                  id: applicant.user.id,
                  status: applicant.status,
                  name: applicant.user.name,
                  email: applicant.user.email,
                  mainId: applicant.id,
                }
              )
            }
          >
            <h1 className="font-bold text-lg">{applicant.user.name}</h1>
            <p className="font-semibold text-sm text-neutral-500">
              {applicant.user.email}
            </p>
            <p className="font-light text-sm line-clamp-3">
              Applying for {applicant.job.title}.
            </p>
          </button>
        )
      )}
    </>
  );
};
