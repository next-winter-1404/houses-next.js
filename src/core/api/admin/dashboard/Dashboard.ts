import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetAdminInfo = async () => {
  const Response = await axios.get(`/api/admin/dashboard`);

  return Response.data;
};

export const GetAdminHouses = async () => {
  const Response = await axios.get(`/api/admin/houses`);

  return Response.data;
};
export const UpdateAdminHouses = async (id, body) => {
  const Response = await axios.put(`/api/admin/houses/${id}`, body);

  return Response.data;
};
export const DeleteAdminHouses = async (id) => {
  const Response = await axios.delete(`/api/admin/houses/${id}`);

  return Response.data;
};
