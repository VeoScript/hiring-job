import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiInstance from "~/config/Axios";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: {
      account_type: "EMPLOYER" | "APPLICANT";
      name: string;
      email: string;
      password: string;
    }) => {
      return await apiInstance.post(`/api/auth/register`, {
        account_type: _args.account_type,
        name: _args.name,
        email: _args.email,
        password: _args.password,
      });
    },
    onError: (error: any) => {
      console.error("ERROR REGISTER", error);
    },
    onSuccess: async () => {
      queryClient.resetQueries();
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: { email: string; password: string }) => {
      return await apiInstance.post(`/api/auth/login`, {
        email: _args.email,
        password: _args.password,
      });
    },
    onError: (error: any) => {
      console.error("ERROR LOGIN", error);
    },
    onSuccess: async () => {
      queryClient.resetQueries();
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return await apiInstance.post(`/api/auth/logout`);
    },
    onError: (error: any) => {
      console.error("ERROR LOGOUT", error);
    },
  });
};
