import { create } from "zustand";
import * as type from "./interfaces";

export const authStore = create<type.AuthStoreProps>((set) => ({
  isAuth: false,
  accountType: "",
  setIsAuth: (value: boolean) => set(() => ({ isAuth: value })),
  setAccountType: (value: string) => set(() => ({ accountType: value })),
}));

export const jobDetailStore = create<type.JobDetailsProps>((set) => ({
  id: "",
  title: "",
  description: "",
  company_details: "",
  applicatDetails: {},
  setId: (value: string) => set(() => ({ id: value })),
  setTitle: (value: string) => set(() => ({ title: value })),
  setDescription: (value: string) => set(() => ({ description: value })),
  setCompanyDetails: (value: string) => set(() => ({ company_details: value })),
  setApplicanDetails: (value: any) => set(() => ({ applicatDetails: value })),
  setDefault: () =>
    set(() => ({
      title: "",
      description: "",
      company_details: "",
      applicatDetails: [],
    })),
}));
