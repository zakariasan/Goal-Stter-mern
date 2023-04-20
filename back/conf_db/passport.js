const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
//Load User
const User = require("../model/User");
module.exports = function(passport) {
  passport.use(
    new localStrategy({ usernameField: 'name' }, async (name, password, done) => {
      try {
        const user = await User.findOne({ name: name });
        if (!user) {
          return done(null, false, { message: 'That User is not registered' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

passport.serializeUser(async (user, done) => {
  try {
    const id = user.id;
    done(null, id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
};
