import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import RegisterComponent from "~/components/templates/auth/RegisterComponent";

export default function Register(): JSX.Element {
  if (cookies().has(`${process.env.COOKIE_NAME}`)) redirect("/");
  return <RegisterComponent />;
}
