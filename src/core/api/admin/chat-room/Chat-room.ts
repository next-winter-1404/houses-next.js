import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export const GetChat = async () => {
  const Response = await axios.get(`${BaseUrl}/api/admin/chat-rooms`);

  return Response.data;
};

export const GetChatRoom = async (room) => {
  const Response = await axios.get(
    `${BaseUrl}/api/admin/chat-rooms/${room}/chat`,
  );

  return Response.data;
};
