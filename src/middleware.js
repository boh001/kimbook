import routes from "./routes";

const globalVariable = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.users = req.user || false;
  next();
};

export default globalVariable;
