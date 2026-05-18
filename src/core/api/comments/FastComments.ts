import axios from "axios";
import { IData } from "../../types/IData";
import { BaseUrl } from "../BaseUrl";
export const getCommentById = async (house_id: number): Promise<IData[]> => {
  const response = await axios.get(
    `${BaseUrl}/api/houses/${house_id}/comments`,
  );
  return response.data;
};

export const createComment = async (params) => {
  const response = await axios.post(`/api/comments`, params);

  return response.data;
};

export const updateComment = async (
  id: number,
  data: {
    title: string;
    caption: string;
    rating: number;
  },
) => {
  const response = await axios.put(`/api/comments/${id}`, data, {
    withCredentials: true, 
  });
  return response.data;
};

//for landing
export const getAllComment = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const sort = params?.sort ?? "created_at";
  const order = params?.order ?? "DESC";

  const house_id = params?.house_id;
  const user_id = params?.user_id;
  const rating = params?.rating;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    order,
  });

  if (house_id) query.append("house_id", String(house_id));
  if (user_id) query.append("user_id", String(user_id));
  if (rating) query.append("rating", String(rating));

  const response = await axios.get(`/api/comments?${query.toString()}`);

  return response.data;
};
