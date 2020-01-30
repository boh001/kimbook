import { handleJoinRoom } from "./joinRoom";
import { handleSendMsg } from "./sendMsg";

let socket = null;
export const getSocket = () => socket;
export const initSocket = aSocket => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.JoinRoom, handleJoinRoom);
  socket.on(events.SendMessage, handleSendMsg);
};
