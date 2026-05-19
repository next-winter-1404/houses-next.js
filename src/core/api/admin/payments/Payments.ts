import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetPayments = async () => {
  const Response = await axios.get(`${BaseUrl}/api/admin/payments`);

  return Response.data;
};

export const GetPaymentsById = async (id) => {
  const Response = await axios.get(`${BaseUrl}/api/admin/payments/${id}`);

  return Response.data;
};
export const UpdatePaymentsById = async (id) => {
  const Response = await axios.put(`${BaseUrl}/api/admin/payments/${id}`);

  return Response.data;
};
