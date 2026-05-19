import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetTours = async () => {
  const Response = await axios.get(`${BaseUrl}/api/admin/tours`);

  return Response.data;
};

export const GetToursById = async (id) => {
  const Response = await axios.get(`${BaseUrl}/api/admin/tours/${id}`);

  return Response.data;
};
