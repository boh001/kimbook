import "@babel/polyfill";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./db";
import "./models/User";
import "./models/Message";
import "./models/Content";
import "./models/Comment";
import "./models/ChatRoom";
import socketIO from "socket.io";
import SocketController from "./controllers/socketCon";

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listen : http://localhost:${port}`);
});
const io = socketIO.listen(server);
io.on("connection", socket => {
  SocketController(socket, io);
});
