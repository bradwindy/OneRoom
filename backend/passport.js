const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const { JWT_SECRET } = require("./configuration");
const config = require("./configuration");
const User = require("./models/userModel");

/** JSON Web Token Strategy
 *   Logic: We are seeing where the token is contained and what is the secret
 *   and inside the function, using the secret and the the actual token
 *   passport will decode the token from the payload (token data)
 */
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: config.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//Local Strategy
passport.use(
  new LocalStrategy(
    {
      //email and password
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        //find the user given the email
        const user = await User.findOne({ email });
        //if not, handle it
        if (!user) {
          return done(null, false);
        }
        //check if the password is correct
        const isMatch = await user.isValidPassword(password);
        //if not, hanlde it
        if (!isMatch) {
          return done(null, false);
        }
        //otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
