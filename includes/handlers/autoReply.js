const replies = require("../../replies/bangla.json");

module.exports = (api, event) => {
  const msg = event.body.toLowerCase();

  for (const key in replies) {
    if (msg.includes(key.toLowerCase())) {
      api.sendMessage(replies[key], event.threadID);
      break;
    }
  }
};