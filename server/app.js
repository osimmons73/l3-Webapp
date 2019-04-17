const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/Station");

const stations = require("./routes/api/stations");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/stations", stations);

require("./routes/auth/authRoutes")(app);

app.get("/", (req, res) => {
  res.send({ server: "running..." });
});

// Handle production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  // Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
