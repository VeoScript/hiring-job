import DefaultLayout from "~/components/layouts/DefaultLayout";
import JobsList from "~/components/templates/applicant/JobsList";
import JobDescription from "~/components/templates/applicant/JobDescription";

export default function Home(): JSX.Element {
  return (
    <DefaultLayout>
      <JobsList />
      <JobDescription />
    </DefaultLayout>
  );
}
