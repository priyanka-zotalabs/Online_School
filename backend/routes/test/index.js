const express = require("express");
const router = express.Router();
const middleware = require("../../lib/middleware");
const { role } = require("../../config/index");
const testCtrl = require("../../controllers/test/index");
const questionCtrl = require("../../controllers/test/question");


/* Handle post to assign tests
 */
router.post("/assignTest", middleware.isAuthenticated([role.TEACHER]), (req, res ) => {
    testCtrl.assignTest(req)
        .then((result) => res.status(result.status).json(result))
        .catch((error) => res.status(error.status).json(error));
}
);

/* Handle get All tests
 */
router.get("/getAllTests",  middleware.isAuthenticated([role.TEACHER]) ,  (req, res) => {
    questionCtrl.getAllTest(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle get for a test
 */
router.get("/getSpecificTest",  middleware.isAuthenticated([role.TEACHER, role.STUDENT,role.ADMIN]) ,  (req, res) => {
    questionCtrl.getTest(req.query)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);


/* Handle post to create questions for test
 */
router.post("/createTestQuestions", middleware.isAuthenticated([role.TEACHER]), (req, res ) => {
  questionCtrl.createTestQuestions(req)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
}
);

/* Handle get for deleting a test
 */
router.delete("/deleteTest",  middleware.isAuthenticated([role.TEACHER]) , (req, res) => {
  questionCtrl.deleteTest(req.query)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}
);

/* Handle get for assigned tests 
 */
router.get("/getAssignedTest",  middleware.isAuthenticated([role.TEACHER,role.ADMIN]) ,  (req, res) => {
  testCtrl.getAssignedTest(req.query)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}
);

/* Handle put to edit a question
 */
router.put("/updateQuestion", middleware.isAuthenticated([role.TEACHER]), (req, res ) => {
  questionCtrl.updateQuestion(req)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
}
);

// router.delete("/deleteQuestion", middleware.isAuthenticated([role.TEACHER]), (req, res ) => {
//   questionCtrl.deleteQuestion(req.query)
//       .then((result) => res.status(result.status).json(result))
//       .catch((error) => res.status(error.status).json(error));
// }
// );

/* Handle put to edit test details
 */
router.put("/updateTestDetails", middleware.isAuthenticated([role.TEACHER]), (req, res ) => {
  questionCtrl.updateTestDetails(req)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
}
);

/* Handle get for teacher batch
 */
router.get("/getTeacherBatches",  middleware.isAuthenticated([role.TEACHER]) ,  (req, res) => {
  testCtrl.getBatchesForTeacher(req.query)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
},
);

/* Handle get for student tests
 */
router.get("/getStudentTests",  middleware.isAuthenticated([role.STUDENT]) , (req, res) => {
  testCtrl.getStudentTests(req.query)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}
);

/* Handle get All tests for institute
 */
router.get("/getInstituteTests",  middleware.isAuthenticated([role.ADMIN]) ,  (req, res) => {
  questionCtrl.getInstituteTests(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}
);

/* Handle get All student tests for admin
 */
router.get("/getStudentTestDetails",  middleware.isAuthenticated([role.ADMIN]) , (req, res) => {
  testCtrl.getStudentTestDetails(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}
);

module.exports = router;