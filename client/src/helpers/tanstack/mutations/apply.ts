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

export const useUpdateApplicationStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: { id: string; status: string }) => {
      return await apiInstance.patch(
        `/api/jobs/applicant/update-status/${_args.id}?application_status=${_args.status}`
      );
    },
    onError: (error: any) => {
      console.error("ERROR UPDDATE APPLICATION STATUS", error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs_employer_applicants"],
      });
    },
  });
};
