const express = require('express');
const router = express.Router();
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');
const batchCtrl = require('../../controllers/batch/index');


/* Handle post to create a batch
 */
router.post("/createBatch", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.createBatch(req)
        .then((result) => {
            res.status(result.status).json(result)
        })
        .catch((error) => {
            res.status(error.status).json(error)
        });
}
);

/* Handle get All batches
 */
router.get("/getAllBatches", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.getAllBatches(req)
        .then((result) => {
            res.status(result.status).json(result);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
}
);

/* Handle get for a batch
 */
router.get("/getSpecificBatch", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.getBatch(req.query)
        .then((result) => {
            res.status(result.status).json(result);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
}
);

/* Handle delete for deleting a batch
 */
router.delete("/deleteBatch", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.deleteBatch(req.query)
        .then((result) => {
            res.status(result.status).json(result);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
}
);

/* Handle delete for deleting a student from batch
 */
router.delete("/deleteStudent", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.deleteStudent(req.query)
        .then((result) => res.status(result.status).json(result))
        .catch((error) => res.status(error.status).json(error));
}
);

/* Handle put to edit a batch
 */
router.put("/updateBatch", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.editBatch(req)
        .then((result) => res.status(result.status).json(result))
        .catch((error) => res.status(error.status).json(error));
}
);

/* Handle post to add student to  a batch
 */
router.post("/addStudent", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.addStudent(req.body)
        .then((result) => res.status(result.status).json(result))
        .catch((error) => res.status(error.status).json(error));
}
);

/* Handle get for tests for a batch
 */
router.get("/getTestsForBatch", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
    batchCtrl.getTestsForBatch(req.query)
        .then((result) => {
            res.status(result.status).json(result);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
}
);

/* Handle get courses of a teacher from batch
 */
router.get("/getTeacherCoursesFromBatches", middleware.isAuthenticated([role.ADMIN, role.TEACHER]), (req, res) => {
    batchCtrl.getTeacherCoursesFromBatches(req)
        .then((result) => {
            res.status(result.status).json(result);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
}
);
module.exports = router;