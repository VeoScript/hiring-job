import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginComponent from "~/components/templates/auth/LoginComponent";

export default function Login(): JSX.Element {
  if (cookies().has(`${process.env.COOKIE_NAME}`)) redirect("/");
  return <LoginComponent />;
}
