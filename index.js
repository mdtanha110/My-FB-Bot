const fs = require("fs");
const path = require("path");
const login = require("facebook-chat-api");

// ENV থেকে appstate লিখে নেওয়া
if (process.env.FB_APPSTATE) {
  fs.writeFileSync(
    path.join(__dirname, "appstate.json"),
    process.env.FB_APPSTATE
  );
}

const appState = JSON.parse(
  fs.readFileSync(path.join(__dirname, "appstate.json"), "utf8")
);

login({ appState }, (err, api) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("✅ Bot logged in");

  api.setOptions({
    listenEvents: true,
    selfListen: false
  });

  require("./includes/listen")(api);
});    selfListen: false,
    listenEvents: true
  },
  (err, api) => {
    if (err) {
      console.error("❌ Login failed:", err);
      return;
    }

    console.log("✅ Bot Logged In Successfully");

    // options
    api.setOptions({
      listenEvents: true,
      selfListen: false,
      updatePresence: true
    });

    // start listening
    require("./includes/listen")(api);
  }
);
