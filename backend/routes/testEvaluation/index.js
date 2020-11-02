const express = require("express");
const router = express.Router();
const middleware = require("../../lib/middleware");
const { role } = require("../../config/index");
const testEvaluationController = require("../../controllers/testEvaluation/index");

/**
 * save students test with his/her solutions in db
 */
router.post("/", middleware.isAuthenticated([role.STUDENT]), (req, res) => {
  testEvaluationController
    .saveStudentsTestSolutions(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/* Handle get for a batch
 */
router.get(
  "/getScoresForTest",
  middleware.isAuthenticated([role.ADMIN, role.TEACHER]),
  (req, res) => {
    testEvaluationController
      .getScoresForTests(req.query)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * get student's test marks for a particular batchId and testId
 */
router.get("/", middleware.isAuthenticated([role.STUDENT]), (req, res) => {
  testEvaluationController
    .getStudentsTestScore(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

module.exports = router;
