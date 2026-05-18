import axios from "axios";


export const AddFavorite = async (body) => {
  const Response = await axios.post(`/api/favorites`, body);

  return Response.data;
};
