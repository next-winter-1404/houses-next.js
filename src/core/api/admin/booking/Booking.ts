import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetBookingAdmin = async () => {
  const Response = await axios.get(`${BaseUrl}/api/admin/bookings`);

  return Response.data;
};

export const GetBookingAdminById = async (id) => {
  const Response = await axios.get(`${BaseUrl}/api/admin/bookings${id}`);

  return Response.data;
};
export const DeleteBookingAdminById = async (id) => {
  const Response = await axios.delete(`${BaseUrl}/api/admin/bookings${id}`);

  return Response.data;
};

export const UpdateBookingAdminById = async (id, body) => {
  const Response = await axios.put(`${BaseUrl}/api/admin/bookings${id}`, body);

  return Response.data;
};
