const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const AUTH = "/auth";
const SEARCH = "/search";

//API
const API = "/api";
const LIKE = "/:id/like";
const REPLY = "/:id/reply";

const USER = "/user";
const PROFILE = "/:id/profile";
const EDITPROFILE = "/:id/editProfile";

const routes = {
  home: HOME,
  search: SEARCH,
  user: USER,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  api: API,
  like: LIKE,
  reply: REPLY,
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
