import { useQuery } from "@tanstack/react-query";
import apiInstance from "~/config/Axios";

export const useGetJobs = (search: string) => {
  return useQuery({
    queryKey: ["jobs", search],
    queryFn: async () => {
      const jobs = await apiInstance.get(`/api/jobs?search=${search ?? ""}`);
      return jobs.data;
    },
  });
};

export const useGetEmployer = () => {
  return useQuery({
    queryKey: ["jobs_employer"],
    queryFn: async () => {
      const jobs_employer = await apiInstance.get(`/api/jobs/employer`);
      return jobs_employer.data;
    },
  });
};

export const useGetEmployerApplicants = () => {
  return useQuery({
    queryKey: ["jobs_employer_applicants"],
    queryFn: async () => {
      const jobs_employer_applicants = await apiInstance.get(
        `/api/jobs/employer/applicants`
      );
      return jobs_employer_applicants.data;
    },
  });
};

export const useGetJobDetails = (id: string) => {
  return useQuery({
    queryKey: ["job_details", id],
    queryFn: async () => {
      const job_details = await apiInstance.get(`/api/jobs/applicant/${id}`);
      return job_details.data;
    },
    enabled: !!id,
  });
};
