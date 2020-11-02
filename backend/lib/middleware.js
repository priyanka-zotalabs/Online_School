const _ = require("lodash");
const { statusCode } = require("./constant");

/**
 * Fn to check for role base authentication
 * Also configure Sentry to identify the user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @param {Object} role
 */
const isAuthenticated = (roles) => (req, res, next) => {
  if (req.isAuthenticated()) {
    const activeSessionRole = getRoleCodeFromRequest(req);
    let userIsAuthenticated = false;
    roles.forEach((role) => {
      if (activeSessionRole.includes(role)) {
        userIsAuthenticated = true;
      }
    });
    if (userIsAuthenticated == true) {
      return next();
    }
  }
  return res.status(statusCode.Unauthorized).json({
    status: statusCode.Unauthorized,
    message: "Access denied!",
  });
};

/**
 * Fn to get the role code from the request
 * @param {Object} req
 */
const getRoleCodeFromRequest = (req) => {
  let userRoleCode = 0;
  if (_.get(req, "user.roleId")) {
    userRoleCode = [];
    roleCodes = req.user.roleId;
    roleCodes.forEach((role) => {
      userRoleCode.push(role.code);
    });
    // userRoleCode = req.user.roleId.code;
  }
  return userRoleCode;
};

/**
 * Fn to check req is ajax or redirect
 * @param {Object} req
 * @param {Object} res
 */
const isAjaxRequest = (req, res) => {
  if (req.xhr) {
    const response = {
      message: "UNAUTHORIZED",
      status: "Unauthorized",
    };
    return res
      .status(401)
      .json(utils.localizeMessage(response, req.session.lang));
  }
  return res.redirect("/unauthorized");
};

module.exports = {
  isAuthenticated,
};
