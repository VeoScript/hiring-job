import { create } from "zustand";
import * as type from "./interfaces";

export const authStore = create<type.AuthStoreProps>((set) => ({
  isAuth: false,
  accountType: "",
  setIsAuth: (value: boolean) => set(() => ({ isAuth: value })),
  setAccountType: (value: string) => set(() => ({ accountType: value })),
}));

export const jobDetailStore = create<type.JobDetailsProps>((set) => ({
  title: "",
  description: "",
  company_details: "",
  setTitle: (value: string) => set(() => ({ title: value })),
  setDescription: (value: string) => set(() => ({ description: value })),
  setCompanyDetails: (value: string) => set(() => ({ company_details: value })),
  setDefault: () =>
    set(() => ({
      title: "",
      description: "",
      company_details: "",
    })),
}));
