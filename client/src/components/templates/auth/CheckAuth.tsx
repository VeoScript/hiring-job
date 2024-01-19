"use client";

import { useEffect } from "react";
import { authStore } from "~/helpers/store";

import { useGetUser } from "~/helpers/tanstack/queries/users";

export default function CheckAuth({ hasCookies }: { hasCookies: any }) {
  const { setIsAuth, setAccountType } = authStore();

  const { data: user } = useGetUser();

  useEffect(() => {
    setIsAuth(hasCookies);
    return () => {};
  }, [hasCookies, setIsAuth]);

  useEffect(() => {
    if (user) {
      setAccountType(user?.account_type ?? "");
    }
  }, [setAccountType, user]);

  return <></>;
}
