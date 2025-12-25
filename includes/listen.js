module.exports = function (api) {
  api.listenMqtt((err, event) => {
    if (err) {
      console.error("Listen error:", err);
      return;
    }

    require("./handlers/autoReply")(api, event);
  });
};
