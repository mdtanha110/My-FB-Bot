const fs = require("fs");
const path = require("path");

// NEW facebook api
const login = require("@whiskeysockets/facebook-chat-api");

// যদি Render env এ appstate দেওয়া থাকে
if (process.env.FB_APPSTATE) {
  try {
    fs.writeFileSync(
      path.join(__dirname, "appstate.json"),
      process.env.FB_APPSTATE
    );
    console.log("✅ appstate.json loaded from ENV");
  } catch (e) {
    console.error("❌ Failed to write appstate.json:", e);
  }
}

// appstate load
let appState;
try {
  appState = JSON.parse(
    fs.readFileSync(path.join(__dirname, "appstate.json"), "utf8")
  );
} catch (err) {
  console.error("❌ appstate.json read error");
  process.exit(1);
}

// Facebook login
login(
  { appState },
  {
    logLevel: "silent",
    forceLogin: true,
    selfListen: false,
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
