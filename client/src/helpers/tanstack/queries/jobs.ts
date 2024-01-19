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
