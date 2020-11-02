const express = require('express');
const passport = require('passport');
require('../../lib/passportAuth');
const router = express.Router();
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');
const adminSignupCtrl = require('../../controllers/signUp/admin/email');
const forgotPasswordCtrl = require('../../controllers/user/forgotPassword');
const changePasswordCtrl = require('../../controllers/user/changePassword');
const studentMobileController = require('../../controllers/signUp/student/mobile');
const studentMobileSignInController = require('../../controllers/signIn/student/mobile');
const studentEmailController = require('../../controllers/signUp/student/email');
const teacherMobileController = require('../../controllers/signUp/teacher/mobile');
const teacherMobileSignInController = require('../../controllers/signIn/teacher/mobile');
const teacherEmailController = require('../../controllers/signUp/teacher/email');
const updateCtrl = require('../../controllers/user/update');
const firebaseCtrl = require('../../controllers/firebase/index');


/* Handle Login POST */
router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      return res.status(err.status).json(err);
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(500).json({ status: 500, message: 'Internal error occurred' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ status: 200, message: 'Successfully logged in!', data: user });
    });
  })(req, res, next);
});

/* Handle Mobile Login POST */
router.post('/mobileLogin', (req, res, next) => {
  passport.authenticate('loginMobile', (err, user, info) => {
    if (err) {
      return res.status(err.status).json(err);
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(500).json({ status: 500, message: 'Internal error occurred' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ status: 200, message: 'Successfully logged in!', data: user });
    });
  })(req, res, next);
});

/* Handle signup POST */
router.post('/admin/signup', (req, res, next) => {
  adminSignupCtrl.adminSignup(req.body)
    .then(result => res.status(result.status).json(result))
    .catch(error => res.status(error.status).json(error))
});

/* Handle get for logged in user */
router.get('/user',
  middleware.isAuthenticated([role.STUDENT, role.ADMIN, role.TEACHER]),
  (req, res, next) => {
    res.status(200).json(req.user);
  });

/* Handle logout GET */
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).json({ status: 200, message: 'Logout successful' });
})


/*Handle password recovery*/
router.post('/recover', (req, res) => {
  forgotPasswordCtrl.recover(req.body)
    .then(result => res.status(result.status).json(result))
    .catch(error => res.status(error.status).json(error))
});

/*Handle get for password reset*/
router.get('/validateToken/:token', (req, res) => {
  forgotPasswordCtrl.validateToken(req.params)
    .then(result => {
      res.status(result.status).json(result);
    })
    .catch(error => {
      res.status(error.status).json(error);
    })
});

/*Handle post for password reset*/
router.post('/resetPassword/:token', (req, res) => {
  forgotPasswordCtrl.resetPassword(req.params, req.body)
    .then(result => res.status(result.status).json(result))
    .catch(error => res.status(error.status).json(error))
});

/*Handle post for password change*/
router.post('/changePassword', middleware.isAuthenticated([role.ADMIN, role.STUDENT, role.TEACHER]), (req, res) => {
  changePasswordCtrl.changePassword(req.body, req.user)
    .then(result => res.status(result.status).json(result))
    .catch(error => res.status(error.status).json(error))
});

/**
 * Post api to signup student via mobile step one i.e send OTP
 */
router.post("/student/signUp/mobile", (req, res, next) => {
  studentMobileController
    .mobileStepOneSignUp(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * verify OTP send from mobile number
 */
router.post("/student/signUp/verifyMobileOTP", (req, res, next) => {
  studentMobileController
    .verifyOTP(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * Post API to signup student step one via email
 */
router.post("/student/signUp/email", (req, res, next) => {
  studentEmailController
    .emailStepOneSignUp(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * Post API to verify email of student
 */
router.post("/student/signUp/verifyEmail", (req, res, next) => {
  studentEmailController
    .verifyAccountEmail(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});
/**
 * Post route to add data to db for student signup last step
 */
router.post("/student/signUp/addUser", (req, res, next) => {
  let process = null;
  if (req.session.signup && req.session.signup.emailSignup) {
    process = studentEmailController.addUser(req)
  } else if (req.session.signup && req.session.signup.mobileSignup) {
    process = studentMobileController.addMobileUser(req)
  } else {
    return res.status(400).json({ status: 401, message: 'Access denied' });
  }
  process.then((result) => {
    req.body.username = 'abc';
    req.body.password = 'abc';
    passport.authenticate("studentSignUp", (err, user, info) => {
      if (err) {
        return res.status(500).json(internalError);
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.status(500).json(internalError);
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({
          status: 200,
          message: "Successfully signup!",
          data: user,
        });
      });
    })(req, res, next);
  }).catch((error) => {
    res.status(error.status).json(error);
  });
});


/**
 * Post api to signIn student via mobile step one i.e send OTP
 */
router.post("/student/signIn/mobile", (req, res, next) => {
  studentMobileSignInController
    .mobileStepOneSignIn(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});


/**
 * verify OTP send from mobile number
 */
router.post("/student/signIn/verifyMobileOTP", (req, res, next) => {
  studentMobileSignInController
    .verifyOTP(req)
    .then((result) => {
      req.body.username = 'abc';
      req.body.password = 'abc';
      passport.authenticate("studentSignIn", (err, user, info) => {
        if (err) {
          return res.status(500).json(internalError);
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.status(500).json(internalError);
        }
        req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.send({
            status: 200,
            message: "Successfully signin!",
            data: user,
          });
        });
      })(req, res, next);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * Post api to signup teacher via mobile step one i.e send OTP
 */
router.post("/teacher/signUp/mobile", (req, res, next) => {
  teacherMobileController
    .mobileStepOneSignUp(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * verify OTP send from mobile number
 */
router.post("/teacher/signUp/verifyMobileOTP", (req, res, next) => {
  teacherMobileController.verifyOTP(req)
    .then((result) => {
      req.body.username = 'abc';
      req.body.password = 'abc';
      passport.authenticate("teacherSignUp", (err, user, info) => {
        if (err) {
          return res.status(500).json(internalError);
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.status(500).json(internalError);
        }
        req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.send({
            status: 200,
            message: "Successfully signin!",
            data: user,
          });
        });
      })(req, res, next);
    }).catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * Post API to signup student step one via email
 */
router.post("/teacher/signUp/email", (req, res, next) => {
  teacherEmailController
    .emailStepOneSignUp(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * Post API to verify email of teacher
 */
router.post("/teacher/signUp/verifyEmail", (req, res, next) => {
  teacherEmailController
    .verifyAccountEmail(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/**
 * Post route to add data to db for teacher signup last step
 */
router.post("/teacher/signUp/addUser", (req, res, next) => {
  if (req.session.signup && req.session.signup.emailSignup) {
    teacherEmailController.addUser(req)
      .then((result) => {
        req.body.username = 'abc';
        req.body.password = 'abc';
        passport.authenticate("teacherSignUp", (err, user, info) => {
          if (err) {
            return res.status(500).json(internalError);
          }
          // Generate a JSON response reflecting authentication status
          if (!user) {
            return res.status(500).json(internalError);
          }
          req.login(user, (loginErr) => {
            if (loginErr) {
              return next(loginErr);
            }
            return res.send({
              status: 200,
              message: "Successfully signup!",
              data: user,
            });
          });
        })(req, res, next);
      }).catch((error) => {
        res.status(error.status).json(error);
      });
  } else {
    return res.status(400).json({ status: 401, message: 'Access denied' });
  }
});

/**
 * Post api to signIn teacher via mobile step one i.e send OTP
 */
router.post("/teacher/signIn/mobile", (req, res, next) => {
  teacherMobileSignInController
    .mobileStepOneSignIn(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});


/**
 * verify OTP send from mobile number
 */
router.post("/teacher/signIn/verifyMobileOTP", (req, res, next) => {
  teacherMobileSignInController
    .verifyOTP(req)
    .then((result) => {
      req.body.username = 'abc';
      req.body.password = 'abc';
      passport.authenticate("teacherSignIn", (err, user, info) => {
        if (err) {
          return res.status(500).json(internalError);
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.status(500).json(internalError);
        }
        req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.send({
            status: 200,
            message: "Successfully signin!",
            data: user,
          });
        });
      })(req, res, next);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

router.put("/updateName", middleware.isAuthenticated([role.STUDENT, role.TEACHER]), (req, res) => {
  updateCtrl.updateName(req)
    .then(result =>
      res.status(result.status).json(result)
    )
    .catch(error =>
      res.status(error.status).json(error)
    )
});



router.put("/updateEmail", middleware.isAuthenticated([role.STUDENT, role.TEACHER]), (req, res) => {
  updateCtrl.updateEmail(req)
    .then(result =>
      res.status(result.status).json(result)
    )
    .catch(error =>
      res.status(error.status).json(error)
    )
});

router.put("/updateContactNumber", middleware.isAuthenticated([role.STUDENT, role.TEACHER]), (req, res) => {
  updateCtrl.updateContactNumber(req)
    .then(result =>
      res.status(result.status).json(result)
    )
    .catch(error =>
      res.status(error.status).json(error)
    )
});


module.exports = router;