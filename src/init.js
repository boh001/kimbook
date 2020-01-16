import dotenv from "dotenv";
import "@babel/polyfill";
import app from "./app";
import "./db";
import "./models/User";
dotenv.config();

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listen : http://localhost:${port}`);
});
