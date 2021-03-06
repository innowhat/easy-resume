const { serialize, parse } = require("cookie");
const { NODE_ENV, SAME_SITE_CONFIG } = require("../config");
const TOKEN_NAME = "easy-token";

const MAX_AGE = 60 * 60 * 8; // 8 hours

const setTokenCookie = (res, token) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: NODE_ENV === "production",
    path: "/",
    sameSite: SAME_SITE_CONFIG,
    // sameSite: "none", //TODO: UPDATE TO lax
  });

  res.setHeader("Set-Cookie", cookie);
};

const removeTokenCookie = (res) => {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

const parseCookies = (req) => {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers.cookie;
  return parse(cookie || "");
};

const getTokenCookie = (req) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};

module.exports.setTokenCookie = setTokenCookie;
module.exports.removeTokenCookie = removeTokenCookie;
module.exports.parseCookies = parseCookies;
module.exports.getTokenCookie = getTokenCookie;

module.exports.MAX_AGE = MAX_AGE;
