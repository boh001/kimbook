import events from "../socketEvent";
import { JoinRoom, SendMessage } from "./eventCon";
const SocketController = (socket, io) => {
  socket.on(events.JoinRoom, data => {
    JoinRoom(socket, data);
  });
  socket.on(events.SendMessage, data => {
    SendMessage(socket, data);
  });
};

export default SocketController;
