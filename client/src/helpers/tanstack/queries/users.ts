import { useQuery } from "@tanstack/react-query";
import apiInstance from "~/config/Axios";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await apiInstance.get(`/api/auth/user`);
      return user.data;
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await apiInstance.get(`/api/auth/users`);
      return users.data;
    },
  });
};
