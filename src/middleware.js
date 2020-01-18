import routes from "./routes";
import multer from "multer";

export const globalVariable = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.user = req.user || false;
  next();
};

const upload = multer({ dest: "uploads/" });
export const contentUpload = upload.single("content");
