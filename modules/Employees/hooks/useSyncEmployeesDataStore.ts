"use client";
import { useEffect } from "react";
import { useEmployeeDataStore, useGetEmployees } from "@/modules/Employees";

export const useSyncEmployeesDataStore = () => {
  const { setEmployees, setLoading } = useEmployeeDataStore();
  const { data, isLoading } = useGetEmployees();
  useEffect(() => {
    setLoading(isLoading);
    if (data) setEmployees(data);
  }, [data, isLoading, setEmployees, setEmployees]);
};
