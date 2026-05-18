import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddFavorite } from "../Favorite";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
