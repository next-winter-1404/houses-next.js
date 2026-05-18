import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePayMents, GetPayments } from "../Payments";

export const usePayments = (filters = {}) => {
  const params = {
    sort: "createdAt",
    order: "DESC",
    ...filters,
  };
  return useQuery({
    queryKey: ["payments", params],
    queryFn: GetPayments,
  });
};

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (data) => CreatePayMents(data),
  });
};
