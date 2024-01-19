import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiInstance from "~/config/Axios";

export const useApplyJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: { jobId: string }) => {
      return await apiInstance.post(`/api/jobs/apply`, {
        status: "",
        jobId: _args.jobId,
      });
    },
    onError: (error: any) => {
      console.error("ERROR APPLY JOB", error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["job_details"],
      });
    },
  });
};
