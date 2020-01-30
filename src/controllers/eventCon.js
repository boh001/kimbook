import events from "../socketEvent";
import ChatRoom from "../models/ChatRoom";
import Message from "../models/Message";
import User from "../models/User";

export const JoinRoom = async (socket, io, { roomId, idList, me }) => {
  const user = await User.findOne({ _id: me });
  socket.nickname = user.nickname;
  socket.room = roomId;
  console.log(socket.nickname);

  const room = await ChatRoom.findOne({ _id: roomId });
  if (!room) {
    try {
      await ChatRoom.create({
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
export const SendMessage = async (socket, { text, id }) => {
  const msg = await Message.create({
    author: id,
    description: text
  });
  await ChatRoom.findOneAndUpdate(
    { _id: socket.room },
    { $push: { messages: msg.id } }
  );
  socket.emit(events.SendMessage, { nickname: socket.nickname, text });
};
