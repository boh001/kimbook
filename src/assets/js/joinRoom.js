import { initSocket, getSocket } from "./socket";

const JoinBtn = document.getElementsByClassName("jsJoinBtn");

const handleJoinBtn = event => {
  event.preventDefault();
  const target = event.currentTarget;
  const me = target.parentNode.id;
  const other = target.id;
  let idList = [me, other].sort();
  const roomId = `${idList[0]}/${idList[1]}`;
  const socket = io("/");
  initSocket(socket);
  getSocket().emit(window.events.JoinRoom, { roomId, idList, me });
  const openRoom = document.getElementById(roomId);
  openRoom.style.display = "block";
  openRoom.style.height = "45px";
  openRoom.children[1].style.display = "none";
  openRoom.children[2].style.display = "none";
};

const init = () => {
  const JoinBtnList = Array.from(JoinBtn);
  JoinBtnList.forEach(j => j.addEventListener("click", handleJoinBtn));
};
if (JoinBtn) {
  init();
}
