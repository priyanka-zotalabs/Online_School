const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/database/user');
const userCtrl = require('../controllers/user/signIn');
const userMobileCtrl = require('../controllers/user/signInMobile');
const logger = require('./logger');

passport.use('login', new LocalStrategy({
  passReqToCallback: true,
}, ((req, email, password, done) => {
  userCtrl.signIn({ email: email.toLowerCase(), password })
    .then((user) => {
      req.user = user;
      done(null, user);
    }).catch((err) => {
      done(err);
    });
})));

passport.use('loginMobile', new LocalStrategy({
  passReqToCallback: true,
}, ((req, contactNumber, password, done) => {
  userMobileCtrl.signIn({ contactNumber, password })
    .then((user) => {
      req.user = user;
      done(null, user);
    }).catch((err) => {
      done(err);
    });
})));

passport.use('studentSignUp', new LocalStrategy({
  passReqToCallback: true,
}, ((req, email, password, done) => {
  req.user = req.session.user;
  done(null, req.user);
})
));

passport.use('studentSignIn', new LocalStrategy({
  passReqToCallback: true,
}, ((req, email, password, done) => {
  req.user = req.session.user;
  done(null, req.user);
})
));

passport.use('teacherSignUp', new LocalStrategy({
  passReqToCallback: true,
}, ((req, email, password, done) => {
  req.user = req.session.user;
  done(null, req.user);
})
));

passport.use('teacherSignIn', new LocalStrategy({
  passReqToCallback: true,
}, ((req, email, password, done) => {
  req.user = req.session.user;
  done(null, req.user);
})
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
