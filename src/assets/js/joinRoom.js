import { initSocket, getSocket } from "./socket";

const JoinBtn = document.getElementsByClassName("jsJoinBtn");

const handleJoinBtn = event => {
  event.preventDefault();
  console.log(event.path);
  let idList = [event.path[1].id, event.path[2].id].sort();
  const roomId = `${idList[0]}/${idList[1]}`;
  const socket = io("/");
  initSocket(socket);
  getSocket().emit(window.events.JoinRoom, { roomId, idList });
};

export const handleJoinRoom = ({ roomId }) => {
  console.log(roomId);
};
const init = () => {
  const JoinBtnList = Array.from(JoinBtn);
  JoinBtnList.map(j => j.addEventListener("click", handleJoinBtn));
};
if (JoinBtn) {
  init();
}
