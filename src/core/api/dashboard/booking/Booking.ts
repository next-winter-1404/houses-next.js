import axios from "axios";

export const GetBookings = async () => {
  const Response = await axios.get("/api/bookings");

  return Response.data;
};

export const CreateBookings = async (body) => {
  const Response = await axios.post("/api/bookings", body);

  return Response.data;
};
