const express = require("express");
const router = express.Router();
const middleware = require("../../lib/middleware");
const { role } = require("../../config/index");
const feeStructureController = require("../../controllers/feeStructure/index");

/* POST API to create a fee structure for a batch */
router.post("/", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
  feeStructureController
    .addFeeStructure(req)
    .then((result) => res.status(result.status).json(result))
    .catch((error) => res.status(error.status).json(error));
});

/* PUT API to update a fee structure for a batch */
router.put("/", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
  feeStructureController
    .updateFeeStructure(req)
    .then((result) => res.status(result.status).json(result))
    .catch((error) => res.status(error.status).json(error));
});

/* GET API to delete a fees structure for a particular batch */
router.delete("/", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
  feeStructureController
    .deleteFeeStructure(req)
    .then((result) => res.status(result.status).json(result))
    .catch((error) => res.status(error.status).json(error));
});

/* PUT API to update student's fee structure in a batch after payment completion.*/
router.put(
  "/updateStudentFeeStructure",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res) => {
    feeStructureController
      .updateStudentFeeStructureInBatch(req)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
  }
);

/* GET API to get fee structure for a student for all batch */
router.get(
  "/getStudentFeeStructure",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res) => {
    feeStructureController
      .getStudentFeeStructureFromBatch(req)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
  }
);

/* GET API to get a particular fees structure from a batch */
router.get("/id/:id", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
  feeStructureController
    .getFeeStructure(req)
    .then((result) => res.status(result.status).json(result))
    .catch((error) => res.status(error.status).json(error));
});

/* GET API to get all fees structure for a particular batch */
router.get(
  "/batchId/:batchId",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res) => {
    feeStructureController
      .getAllFeeStructure(req)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
  }
);

router.get(
  "/getStudentFeeDetailsForAdmin",
   middleware.isAuthenticated([role.ADMIN]),
  (req, res) => {
    feeStructureController
      .getStudentFeeDetailsForAdmin(req)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
  }
);

module.exports = router;
