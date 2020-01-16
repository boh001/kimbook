const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

const USER = "/user";
const PROFILE = "/:id/profile";

const routes = {
  home: HOME,
  user: USER,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  profile: id => {
    if (id) {
      return `${USER}${PROFILE}`;
    } else {
      return PROFILE;
    }
  }
};

export default routes;
