const fs = require("fs");
const path = require("path");
const login = require("facebook-chat-api");

// ===============================
// Load appState
// ===============================
let appState;

try {
  if (process.env.FB_APPSTATE) {
    // Render environment variable
    appState = JSON.parse(process.env.FB_APPSTATE);
  } else {
    // Local file fallback
    appState = JSON.parse(
      fs.readFileSync(path.join(__dirname, "appstate.json"), "utf8")
    );
  }
} catch (err) {
  console.error("❌ Failed to load appState:", err);
  process.exit(1);
}

// ===============================
// Login
// ===============================
login(
  { appState },
  { logLevel: "silent" },
  (err, api) => {
    if (err) {
      console.error("❌ Login failed:", err);
      return;
    }

    console.log("✅ Bot Logged In Successfully");

    // ===============================
    // SAFE MQTT LISTENER
    // ===============================
    api.listenMqtt((err, message) => {
      if (err) {
        console.log("Listen error:", err);
        return;
      }

      if (!message || !message.body) return;

      const text = message.body.toLowerCase();

      // simple test command
      if (text === "ping") {
        api.sendMessage("pong 🟢 bot alive", message.threadID);
      }
    });
  }
);
