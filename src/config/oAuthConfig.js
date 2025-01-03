require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile:", profile);
      try {
        const email = profile.emails[0].value;

        // Validate the email domain
        const allowedDomains = ["econet.co.zw", "omnicontact.biz"];
        const emailDomain = email.split("@")[1];

        if (!allowedDomains.includes(emailDomain)) {
          return done(null, false, { message: "Unauthorized email domain" });
        }

        let user = await User.query().findOne({ email });
        if (!user) {
          user = await User.query().insert({
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email,
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.query().findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
