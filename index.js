const login = require("facebook-chat-api");
const fs = require("fs");

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

login({ appState }, (err, api) => {
  if (err) {
    console.error("❌ Login Failed", err);
    return;
  }

  console.log("🤖 Bot Logged In Successfully");

  require("./includes/listen")(api);
});