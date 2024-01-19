import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required."),
  password: yup.string().trim().required("Password is required."),
});

export const registrationValidation = yup.object({
  name: yup.string().trim().required("Name is required."),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required."),
  password: yup.string().trim().required("Password is required."),
  repassword: yup
    .string()
    .trim()
    .required("Re-type password is required.")
    .oneOf([yup.ref("password")], "Password not matched."),
});

export const createJobValidation = yup.object({
  title: yup.string().trim().required("Title is required."),
  company_details: yup.string().trim().required("Company details is required."),
  description: yup.string().trim().required("Descriptoin is required."),
});
