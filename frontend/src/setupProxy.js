const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/ws",
    createProxyMiddleware({
      target: "https://i8b205.p.ssafy.io/ws-stomp",
      ws: true,
    }),
  );
};
