"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteAdminHouses, GetAdminHouses, GetAdminInfo, UpdateAdminHouses } from "../Dashboard";

export const useAdminInfo = () => {
  return useQuery({
    queryKey: ["admin-info"],
    queryFn: GetAdminInfo,
  });
};


export const useAdminHouses = () => {
  return useQuery({
    queryKey: ["admin-houses"],
    queryFn: GetAdminHouses,
  });
};


export const useUpdateHouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: any }) =>
      UpdateAdminHouses(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-houses"]);
    },
  });
};

export const useDeleteHouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => DeleteAdminHouses(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-houses"]);
    },
  });
};
