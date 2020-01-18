const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const AUTH = "/auth";

const USER = "/user";
const PROFILE = "/:id/profile";
const EDITPROFILE = "/:id/editProfile";

const routes = {
  home: HOME,
  user: USER,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  profile: id => {
    if (id) {
      return `${USER}/${id}/profile`;
    } else {
      return PROFILE;
    }
  },
  editProfile: id => {
    if (id) {
      return `${USER}/${id}/editProfile`;
    } else {
      return EDITPROFILE;
    }
  },

  auth: AUTH
};

export default routes;
