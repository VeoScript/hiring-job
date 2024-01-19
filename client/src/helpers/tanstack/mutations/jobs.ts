import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiInstance from "~/config/Axios";

export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: {
      title: string;
      company_details: string;
      description: string;
    }) => {
      return await apiInstance.post(`/api/jobs`, {
        title: _args.title,
        description: _args.description,
        company_details: _args.company_details,
      });
    },
    onError: (error: any) => {
      console.error("ERROR CREATE JOB", error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs_employer"],
      });
    },
  });
};

export const useUpdateJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: {
      id: string;
      title: string;
      company_details: string;
      description: string;
    }) => {
      return await apiInstance.patch(`/api/jobs/${_args.id}`, {
        title: _args.title,
        description: _args.description,
        company_details: _args.company_details,
      });
    },
    onError: (error: any) => {
      console.error("ERROR UPDATE JOB", error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs_employer"],
      });
    },
  });
};

export const useDeleteJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: { id: string }) => {
      return await apiInstance.delete(`/api/jobs/${_args.id}`);
    },
    onError: (error: any) => {
      console.error("ERROR DELETE JOB", error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs_employer"],
      });
    },
  });
};
