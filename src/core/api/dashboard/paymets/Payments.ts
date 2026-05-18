import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetPayments = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const status = params?.status && params.status !== "" ? params.status : "";

  const sort = params?.sort ?? "createdAt";
  const order = params?.order ?? "DESC";

  const url = `/api/payments?page=${page}&limit=${limit}&status=${status}&sort=${sort}&order=${order}`;

  const response = await axios.get(url);

  return response.data;
};

export const CreatePayMents = async (body) => {
  const Response = await axios.post(`/api/payments`, body);

  return Response.data;
};
