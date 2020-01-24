import routes from "./routes";
import multer from "multer";
import fs from "fs";
import path from "path";

export const globalVariable = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.user = req.user || false;
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
