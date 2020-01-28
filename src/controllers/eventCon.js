import events from "../socketEvent";
import chatRoom from "../models/chatRoom";

export const JoinRoom = async (socket, io, { roomId, idList }) => {
  const room = await chatRoom.findOne({ _id: roomId });
  if (!room) {
    try {
      await chatRoom.create({
        _id: roomId,
        members: idList
      });
      socket.join(roomId, () => {
        io.to(roomId).emit(events.JoinRoom, { roomId });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
