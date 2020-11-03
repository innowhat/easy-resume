const Iron = require("@hapi/iron");
const { MAX_AGE, setTokenCookie, getTokenCookie } = require("./auth-cookies");
const { TOKEN_SECRET } = require("../config");

const setLoginSession = async (res, session) => {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
};

const getLoginSession = async (req) => {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() < expiresAt) {
    return session;
  }
};

module.exports.setLoginSession = setLoginSession;
module.exports.getLoginSession = getLoginSession;
