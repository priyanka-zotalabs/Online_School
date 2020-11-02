const express = require("express");
const router = express.Router();
const { statusCode } = require("../../lib/constant");
const middleware = require("../../lib/middleware");
const { role } = require("../../config/index");
var multer = require("multer");
const logger = require("../../lib/logger");
const inMemoryStorage = multer.memoryStorage();
const upload = multer({ storage: inMemoryStorage });
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const getStream = require('into-stream');
const containerName = 'school';

const getBlobName = originalName => {
  const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

/**
 * This functions returns the url of file uploaded on azure container
 */
router.post("/", upload.any(), middleware.isAuthenticated([role.ADMIN, role.STUDENT, role.TEACHER]), (req, res) => {
  logger.info("File upload started.");
  try {
    const blobName = getBlobName(req.files[0].originalname);
    const type = { contentSettings: { contentType: "application/octet-stream" } }
    if (req.files[0].mimetype == "application/pdf") {
      type.contentSettings.contentType = "application/pdf"
    };
    const stream = getStream(req.files[0].buffer);
    const streamLength = req.files[0].buffer.length;
    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, type, err => {
      if (err) {
        logger.error("File upload failed");
        res.status(400).send({
          status: statusCode.InvalidData,
          message: "No file is selected.",
        })
      }
      else {
        const url = `https://schooleumetry.blob.core.windows.net/${containerName}/${blobName}`;
        logger.info(`File uploaded success }`);
        res.status(200).send({
          status: statusCode.Success,
          url: url,
          message: "File uploaded successfully",
        });
      }
    })
  } catch (error) {
    logger.error("File upload failed");
    res.status(400).send({
      status: statusCode.InvalidData,
      message: error.message,
    });
  }
}
);

module.exports = router;
