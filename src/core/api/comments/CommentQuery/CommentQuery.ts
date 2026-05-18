import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
} from "../FastComments";
import { IData } from "@/core/types/IData";

export const useGetAllComments = (params) => {
  return useQuery<IData[]>({
    queryKey: ["comments", params],
    queryFn: getAllComment,
  });
};

export const useHouseComments = (houseId: number) => {
  return useQuery({
    queryKey: ["house-comments", houseId],
    queryFn: () => getCommentById(houseId),
    enabled: !!houseId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["house-comments", variables.house_id],
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateComment(id, data),

    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });
};
