import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GM_ID,
    pass: process.env.GM_PWD
  }
});

export const mailOptions = (host, nickname, to, key) => {
  return {
    from: "kimbook",
    to,
    subject: `Hello ${nickname}, please verify your email`,
    html:
      "<p>아래의 링크를 클릭해주세요 !</p>" +
      `<a href="http://${host}/auth/?key=${key}">인증하기</a>`
  };
};
