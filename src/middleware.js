import routes from "./routes";
import multer from "multer";
import fs from "fs";
import path from "path";
import User from "./models/User";
import events from "./socketEvent";
export const globalVariable = async (req, res, next) => {
  res.locals.routes = routes;
  res.locals.events = JSON.stringify(events);
  res.locals.user = req.user || false;
  if (req.user) {
    const {
      user: { id }
    } = req;
    const users = await User.findOne({ _id: id }).populate([
      {
        path: "friends",
        model: "User"
      }
    ]);
    res.locals.users = users;
  }
  next();
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!req.body.nickname) {
      var {
        user: { nickname }
      } = req;
    } else {
      var {
        body: { nickname }
      } = req;
    }
    const { mimetype } = file;
    const store = `uploads/${nickname}/${mimetype.split("/")[0]}`;
    fs.mkdirSync(path.join(__dirname, store), { recursive: true }, err => {
      console.log(err);
    });
    cb(null, store);
  }
});
const upload = multer({ storage });
export const contentUpload = upload.single("content");
