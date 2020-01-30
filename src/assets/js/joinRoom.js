import { initSocket, getSocket } from "./socket";

const JoinBtn = document.getElementsByClassName("jsJoinBtn");

const handleJoinBtn = event => {
  event.preventDefault();
  const path = event.path;
  let idList = [path[1].id, path[2].id].sort();
  const me = path[1].id;
  const roomId = `${idList[0]}/${idList[1]}`;
  const openRoom = document.getElementById(roomId);
  openRoom.style.display = "block";

  const socket = io("/");
  initSocket(socket);
  getSocket().emit(window.events.JoinRoom, { roomId, idList, me });
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
