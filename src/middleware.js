import routes from "./routes";

const globalVariable = (req, res, next) => {
  res.locals.routes = routes;
  next();
};

export default globalVariable;
