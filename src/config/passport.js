const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Google Strategy Settings
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
         // Saving the user information in the database
      console.log("📌 פרטי המשתמש מגוגל:", profile);
      return done(null, profile); 
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
