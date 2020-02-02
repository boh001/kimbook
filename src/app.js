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
import { globalVariable } from "./middleware";
import "./passport";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const SessionStore = MongoStore(session);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SessionStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(globalVariable);
app.use(routes.home, initRouter);
app.use(routes.user, userRouter);
app.use(routes.api, apiRouter);
export default app;
