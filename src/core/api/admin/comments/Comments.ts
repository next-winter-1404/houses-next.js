import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetCommentsAdmin = async () => {
  const Response = await axios.get(`${BaseUrl}/api/admin/comments`);

  return Response.data;
};

export const GetCommentsAdminById = async (id) => {
  const Response = await axios.get(`${BaseUrl}/api/admin/comments${id}`);

  return Response.data;
};
export const DeleteCommentsAdminById = async (id) => {
  const Response = await axios.delete(`${BaseUrl}/api/admin/comments${id}`);

  return Response.data;
};
export const UpdateCommentsAdminById = async (id, body) => {
  const Response = await axios.put(`${BaseUrl}/api/admin/comments${id}`, body);

  return Response.data;
};
