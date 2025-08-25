"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/modules/Employees";

export function useUser() {
  const { user, fetchUser, loading } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading };
}
