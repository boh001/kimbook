import routes from "./routes";

const globalVariable = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.user = req.user || false;
  next();
};

export default globalVariable;
