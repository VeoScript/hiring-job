import { useQuery } from "@tanstack/react-query";
import apiInstance from "~/config/Axios";

export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const jobs = await apiInstance.get(`/api/jobs`);
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
