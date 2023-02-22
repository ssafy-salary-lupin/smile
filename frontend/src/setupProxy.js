const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
<<<<<<< HEAD
  app.use(
    "/ws",
    createProxyMiddleware({
      target: "https://i8b205.p.ssafy.io/manage",
      ws: true,
    }),
  );
=======
  // app.use(
  //   "/ws-stomp",
  //   createProxyMiddleware({ target: "https://i8b205.p.ssafy.io/be-api/ws-stomp", ws: true }),
  // );
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
};
