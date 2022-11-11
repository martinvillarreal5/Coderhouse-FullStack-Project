import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { getByEmail, getUserById } from "../../services/userServices.js";
import passport from "passport";

function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

const localLoginStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    //passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  async (email, password, done) => {
    try {
      const user = await getByEmail(email);
      if (!user) {
        return done(null, false, { message: "Invalid Credentials." });
      }
      if (!verifyPassword(password, user.passwordHash)) {
        return done(null, false, { message: "Invalid Credentials." });
      }
      // ? instead of returning a message, add error intead of null?)
      return done(null, user);
    } catch (error) {
      // TODO add better error handling
      done(error, null);
    }
  }
);

// TODO: implement jwt https://coderhouse.zoom.us/rec/play/TRvPbuF1ZoO7uaCaSO-NXUMrFXM5KVf4ufbbMs1dX7XXs9iK1Nbi020qQZUuFQAw0EQtJXmhVuZd99c0.LUhNZanlZh8UR8L3?continueMode=true&_x_zm_rtaid=QbVKwad-R0ifDOY6m74sRA.1666044864411.0a04793b204d23de1e23a330d100ee5b&_x_zm_rhtaid=332
// const jwtLoginStrategy = new JwtStrategy()

const loginStrategy = localLoginStrategy;

export { loginStrategy };

export default async function initializePassport(expressApp) {
  expressApp.use(passport.initialize());
  expressApp.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      if (user) {
        return done(null, user); // return valid object if user exists in database
      } else {
        return done(null, false); // return false if user doesn't exists
      }
    } catch (error) {
      return done(error, false);
    }
  });

  passport.use("login", loginStrategy);
}
