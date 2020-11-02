// const express = require("express");
// const router = express.Router();
// const firebaseCtrl = require("../../controllers/firebase/index");
// const middleware = require("../../lib/middleware");
// const { role } = require("../../config/index");

// router.post(
//   "/storeToken",
//   middleware.isAuthenticated([role.TEACHER, role.STUDENT]),
//   (req, res) => {
//     firebaseCtrl
//       .storeFirebaseToken(req)
//       .then((result) => {
//         res.status(result.status).json(result);
//       })
//       .catch((error) => {
//         res.status(error.status).json(error);
//       });
//   }
// );

// module.exports = router;
