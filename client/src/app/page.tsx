"use client";

import DefaultLayout from "~/components/layouts/DefaultLayout";
import JobsListEmployer from "~/components/templates/employer/JobsListEmployer";
import JobDescriptionEmployer from "~/components/templates/employer/JobDescriptionEmployer";
import JobsListApplicant from "~/components/templates/applicant/JobsListApplicant";
import JobDescriptionApplicant from "~/components/templates/applicant/JobDescriptionApplicant";

import { authStore } from "~/helpers/store";

export default function Home(): JSX.Element {
  const { accountType } = authStore();

  return (
    <DefaultLayout>
      {accountType === "EMPLOYER" ? (
        <>
          <JobsListEmployer />
          <JobDescriptionEmployer />
        </>
      ) : (
        <>
          <JobsListApplicant />
          <JobDescriptionApplicant />
        </>
      )}
    </DefaultLayout>
  );
}
