const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
/**
 * Load Models
 */
require("./models/Station");
require("./models/Locker");
require("./models/UserStationMapping");
require("./models/UserLockerMapping");
require("./models/School");
require("./models/User");
/**
 * Load API Routes
 */
const stations = require("./routes/api/stations");
const lockers = require("./routes/api/lockers");
const userStation = require("./routes/api/userStationMap");
const userLocker = require("./routes/api/userLockerMap");
const schools = require("./routes/api/schools");
/**
 * Load passport and configue oauth setup
 */
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
/**
 * Call API Route Handlers
 */
app.use("/api/users/stations", userStation);
app.use("/api/users/lockers", userLocker);
app.use("/api/stations", stations);
app.use("/api/lockers", lockers);
app.use("/api/schools", schools);

/**
 * Load oauth route
 */
require("./routes/auth/authRoutes")(app);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
