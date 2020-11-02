const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/me/videos", {
      target: "https://api.vimeo.com",
      changeOrigin: true,
    })
  );
};
