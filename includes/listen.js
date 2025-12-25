const autoReply = require("./handlers/autoReply");

module.exports = (api) => {
  api.listenMqtt((err, event) => {
    if (err) return;

    if (event.type === "message" && event.body) {
      autoReply(api, event);
    }
  });
};