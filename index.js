const fs = require("fs");
const path = require("path");

// OLD & STABLE facebook api
const login = require("facebook-chat-api");

// Render ENV থেকে appstate লিখে নেওয়া
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

// appstate read
let appState;
try {
  appState = JSON.parse(
    fs.readFileSync(path.join(__dirname, "appstate.json"), "utf8")
  );
} catch (err) {
  console.error("❌ appstate.json read error");
  process.exit(1);
}

// login
login(
  { appState },
  {
    logLevel: "silent"
  },
  (err, api) => {
    if (err) {
      console.error("❌ Login failed:", err);
      return;
    }

    console.log("✅ Bot Logged In Successfully");

    // options ঠিকভাবে object এর ভেতরে
    api.setOptions({
      listenEvents: true,
      selfListen: false,
      updatePresence: true
    });

    // listener start
    require("./includes/listen")(api);
  }
);
