"use client";

import EditJobModal from "~/components/ui/Modals/EditJobModal";
import NewJobModal from "~/components/ui/Modals/NewJobModal";

import { jobDetailStore } from "~/helpers/store";
import { useDeleteJobMutation } from "~/helpers/tanstack/mutations/jobs";
import { useUpdateApplicationStatusMutation } from "~/helpers/tanstack/mutations/apply";
import clsx from "clsx";

export default function JobDescriptionEmployer(): JSX.Element {
  const { id, title, company_details, applicatDetails } = jobDetailStore();

  const deleteJobMutation = useDeleteJobMutation();
  const updateApplicationStatusMutation = useUpdateApplicationStatusMutation();

  const handleDeleteJob = async () => {
    await deleteJobMutation.mutateAsync({
      id,
    });
  };

  const handleUpdateApplicantsStatus = async (status: string) => {
    await updateApplicationStatusMutation.mutateAsync({
      id: applicatDetails.mainId,
      status,
    });
  };

  return (
    <div className="flex flex-col items-start w-full h-full p-5 gap-y-5 overflow-x-hidden overflow-y-auto">
      {!title ? (
        <></>
      ) : (
        <>
          <div className="flex flex-row items-center justify-between w-full gap-x-5">
            <div className="flex flex-col items-start w-full gap-y-1">
              <h1 className="font-bold text-xl">
                {applicatDetails.name ?? title}
              </h1>
              <h2 className="font-semibold text-sm text-neutral-500">
                {applicatDetails.email ?? company_details}
              </h2>
              {applicatDetails.status && (
                <span
                  className={clsx(
                    applicatDetails.status === "PENDING" && "bg-neutral-600",
                    applicatDetails.status === "APPPROVED" && "bg-green-600",
                    applicatDetails.status === "REJECTED" && "bg-red-600",
                    "rounded-full px-3 py-1 text-xs text-white"
                  )}
                >
                  {applicatDetails.status}
                </span>
              )}
            </div>
            <div className="flex flex-row items-center gap-x-1">
              {applicatDetails.name ? (
                <>
                  {applicatDetails.status === "PENDING" && (
                    <>
                      <button
                        type="button"
                        className="rounded-lg px-5 py-3 text-sm text-white bg-green-600 hover:opacity-50"
                        onClick={() => {
                          handleUpdateApplicantsStatus("APPPROVED");
                        }}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="rounded-lg px-5 py-3 text-sm text-white bg-red-600 hover:opacity-50"
                        onClick={() => {
                          handleUpdateApplicantsStatus("REJECTED");
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <NewJobModal />
                  <EditJobModal />
                  <button
                    type="button"
                    className="rounded-lg px-5 py-3 text-sm text-white bg-red-600 hover:opacity-50"
                    onClick={handleDeleteJob}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="font-light text-sm text-justify">
            Applying for {title}.
          </p>
        </>
      )}
    </div>
  );
}
