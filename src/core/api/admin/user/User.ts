import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetUserAdmin = async () => {
  const Response = await axios.get(`${BaseUrl}/api/admin/users`);

  return Response.data;
};
export const UpdateUserAdmin = async (id, body) => {
  const Response = await axios.get(`${BaseUrl}/api/admin/users${id}`, body);

  return Response.data;
};
export const DeleteUserAdmin = async (id) => {
  const Response = await axios.delete(`${BaseUrl}/api/admin/users${id}`);

  return Response.data;
};
export const UpdateUserAdminRole = async (id, body) => {
  const Response = await axios.put(`${BaseUrl}/api/admin/users${id}`, body);

  return Response.data;
};
