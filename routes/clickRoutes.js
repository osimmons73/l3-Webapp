/**
 * Gus Jenkins (jenkins6g@gmail.com)
 * This route is used to count how many time a user navigates to this route.
 * This is just a demo/test case.
 */
const mongoose = require("mongoose");
const Click = mongoose.model("Clicks");
const User = mongoose.model("User");

module.exports = app => {
  app.get("/clicks/email/:email/clicks/:clicks", (req, res) => {
    const email = req.params.email;
    const clicks = parseInt(req.params.clicks);
    User.findOne({ email: email }, (err, user) => {
      Click.findOne({ _id: user.click_id }, (err, click) => {
        if (click) {
          var updateClicks = clicks + click.clicks;
          click.clicks = updateClicks;
          if (click.clicks > 30 && user.isAdmin != true) {
            user.isAdmin = true;
            user.save();
          }
          click.save();
        } else {
          const clicked = new Click({
            email: email,
            clicks: clicks,
            _user: user._id,
            dateClicked: Date.now()
          });
          user.click_id = clicked._id;
          clicked.save();
          user.save();
        }
      });
    });
  });
};
