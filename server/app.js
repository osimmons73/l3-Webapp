const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/Station");
require("./models/UserStationMapping");
const stations = require("./routes/api/stations");
const userStation = require("./routes/api/userStationMap");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users/stations", userStation);
app.use("/api/stations", stations);

require("./routes/auth/authRoutes")(app);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  //app.use(express.static(__dirname + "/public/"));
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  // Handle Single Page Application
  //app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
