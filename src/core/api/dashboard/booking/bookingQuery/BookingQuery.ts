import { IData } from "@/core/types/IData";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateBookings, GetBookings } from "../Booking";

export const useBookings = () => {
  return useQuery<IData[]>({
    queryKey: ["bookings"],
    queryFn: GetBookings,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateBookings,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log("رزرو با موفقیت انجام شد:", data);
    },
    onError: (error) => {
      console.error("خطا در ثبت رزرو:", error);
    },
  });
};
