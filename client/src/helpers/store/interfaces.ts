export interface AuthStoreProps {
  isAuth: boolean;
  accountType: string;
  setIsAuth: (value: boolean) => void;
  setAccountType: (value: string) => void;
}

export interface JobDetailsProps {
  title: string;
  description: string;
  company_details: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setCompanyDetails: (value: string) => void;
  setDefault: () => void;
}
