import { getSocket } from "./socket";

const sendMsg = document.getElementsByClassName("jsSendMsg");
const closeBtn = document.getElementsByClassName("jsClose");

const appendMsg = (roomId, text, nickname, avatarUrl) => {
  const div = document.createElement("div");
  const room = document.getElementById(roomId);
  div.innerHTML = `
          <div class=${nickname ? "msg__user" : "msg__me"}>${
    nickname ? `<img src=${avatarUrl} class =miniAvatar3>` : ""
  }<div class=user__text>${text}</div>
      `;
  room.children[1].appendChild(div);
};
const handleSendBtn = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const target = event.currentTarget;
    const id = target.parentNode.parentNode.parentNode.id;
    const roomId = target.parentNode.parentNode.id;
    let text = target.value;
    getSocket().emit(window.events.SendMessage, {
      text,
      id,
      roomId
    });
    appendMsg(roomId, text);
    target.value = "";
  }
};
const handleCloseBtn = event => {
  event.preventDefault();
  const target = event.currentTarget;
  target.parentNode.parentNode.parentNode.style.display = "none";
};
export const handleNewMsg = ({ nickname, text, roomId, avatarUrl }) => {
  appendMsg(roomId, text, nickname, avatarUrl);
};
const init = () => {
  const sendMsgList = Array.from(sendMsg);
  const closeBtnList = Array.from(closeBtn);
  sendMsgList.map(s => s.addEventListener("keyup", handleSendBtn));
  closeBtnList.map(s => s.addEventListener("click", handleCloseBtn));
};
if (sendMsg) {
  init();
}
