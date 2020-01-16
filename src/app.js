import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes";
import initRouter from "./routers/initRouter";
import globalVariable from "./middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const SessionStore = MongoStore(session);
app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: true,
    store: new SessionStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(globalVariable);
app.use(routes.home, initRouter);

export default app;
