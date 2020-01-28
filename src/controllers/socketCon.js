import events from "../socketEvent";
import { JoinRoom } from "./eventCon";
const SocketController = (socket, io) => {
  socket.on(events.JoinRoom, data => {
    JoinRoom(socket, io, data);
  });
};

export default SocketController;
