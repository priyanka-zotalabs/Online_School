const _ = require("lodash");
const logger = require("../../lib/logger");
const courseModulesModel = require("../../models/database/courseModules");
const { statusCode, internalError } = require("../../lib/constant");
var randomstring = require("randomstring");

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (body) => {
  if (!body.name) {
    throw new Error("name not found");
  }
  if (!body.description) {
    throw new Error("description not found");
  }
  return true;
};

/**
 * This fn is to add course to course collection
 * @param {Object} body
 */
const addDataToCourseModulesCollection = (body) =>
  new Promise((resolve, reject) => {
    try {
      courseModules = body.modules;
      let modulesList = [];
      courseModules.forEach((modules, moduleIndex) => {
        let chapterlist = [];
        let modulesChapters = modules.chapters;
        modulesChapters.forEach((chapter, chapterIndex) => {
          if (body.isLock) {
            if (chapterIndex == 0 && moduleIndex == 0) {
              isLock = false;
            } else {
              isLock = true;
            }
          } else {
            isLock = false;
          }

          let contentlist = [];
          let chapterContent = chapter.content;
          chapterContent.forEach((content, index) => {
            let contentObj = {
              uid: randomstring.generate({
                length: 12,
                charset: "alphabetic",
              }),
              typeOfContent: content.typeOfContent,
              title: content.title,
              description: content.description,
              value: content.value,
            };
            contentlist.push(contentObj);
          });
          let chaptersObj = {
            uid: randomstring.generate({
              length: 12,
              charset: "alphabetic",
            }),
            isLock: isLock,
            name: chapter.name,
            description: chapter.description,
            content: contentlist,
          };
          chapterlist.push(chaptersObj);
        });

        //modulesTeacherId = modules.teacherIds;
        let teacherIds = [body.teacherId];

        let modulesObj = {
          uid: randomstring.generate({
            length: 12,
            charset: "alphabetic",
          }),
          name: modules.name,
          description: modules.description,
          teacherIds: teacherIds,
          classType: modules.classType,
          totalClasses: modules.totalClasses,
          modulesImageUrl: modules.modulesImageUrl,
          chapters: chapterlist,
        };
        modulesList.push(modulesObj);
      });

      const courseDetails = {
        teacherUserId: body.userId,
        teacherId: body.teacherId,
        instituteId: body.instituteId,
        name: body.name,
        description: body.description,
        subject: body.subject,
        format: body.format,
        courseImageUrl: body.courseImageUrl,
        modules: modulesList,
      };

      courseModulesModel
        .addMultiple([courseDetails])
        .then((courseResult) => {
          logger.info(
            `addDataToCourseModulesCollection - course data added successfully`
          );
          resolve(courseResult);
        })
        .catch((courseError) => {
          logger.error(
            `addDataToCourseModulesCollection - error:${JSON.stringify(
              courseError,
              null,
              2
            )}`
          );
          reject(internalError);
        });
    } catch (e) {
      logger.error(
        `addDataToCourseModulesCollection - error while parsing the body ${e}`
      );
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

/**
 * This fn is to add course into db
 */
const createCourse = (req) =>
  new Promise((resolve, reject) => {
    const { body } = req;
    try {
      body.userId = req.user._id;
      body.teacherId = req.user.userMetaData.Teacher._id;
      body.instituteId = req.user.instituteId._id;
      validateBody(body);
      addDataToCourseModulesCollection(body)
        .then((result) => {
          logger.info(`createCourse - course addition successful`);
          resolve({
            status: statusCode.Success,
            message: "Successfully added course",
            data: result,
          });
        })
        .catch((error) => reject(error));
    } catch (e) {
      logger.error(`createCourse - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

module.exports = {
  createCourse,
};
