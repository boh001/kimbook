import { getSocket } from "./socket";

const sendMsg = document.getElementsByClassName("jsSendMsg");
const closeBtn = document.getElementsByClassName("jsClose");

const appendMsg = (text, nickname) => {
  const div = document.createElement("div");
  //   sendMsg.div.innerHTML = `
  //         <div>${nickname ? "out" : "me"} : ${text}</div>
  //     `;
  roomMsg.appendChild(div);
};
const handleSendBtn = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const path = event.path;
    const id = path[3].id;
    let text = path[0].value;
    getSocket().emit(window.events.SendMessage, { text, id });
    appendMsg(text);
    text = "";
  }
};
const handleCloseBtn = event => {
  event.preventDefault();
  event.path[3].style.display = "none";
};
export const handleSendMsg = ({ nickname, text }) => {
  appendMsg(text, nickname);
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
