const _ = require("lodash");
const logger = require("../../lib/logger");
const courseModulesModel = require("../../models/database/courseModules");
const { statusCode, internalError } = require("../../lib/constant");
var randomstring = require("randomstring");
const courseModules = require("../../models/database/courseModules");

/**
 * This function is for Validate Update Course Body
 * @param {*} body
 */
const validateUpdateCourseBody = (body) => {
  if (!body.courseId) {
    throw new Error("CourseId not found");
  }
  return true;
};

/**
 * This fn is for add Data To Update CourseModules Collection
 * @param {*} body
 * @param {*} courseId
 */
const addDataToUpdateCourseModulesCollection = (body) =>
  new Promise((resolve, reject) => {
    courseId = body.courseId;
    try {
      let courseModules = body.modules;
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
          chapterContent = chapter.content;
          chapterContent.forEach((content, index) => {
            let contentObj = {
              uid: randomstring.generate({
                length: 12,
                charset: "alphabetic",
              }),
              _id: content.contentId,
              title: content.title,
              typeOfContent: content.typeOfContent,
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
            _id: chapter.chapterId,
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
          _id: modules.modulesId,
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

      courseModulesModel
        .update(
          { _id: body.courseId },
          {
            teacherUserId: body.userId,
            teacherId: body.teacherId,
            name: body.name,
            description: body.description,
            subject: body.subject,
            format: body.format,
            courseImageUrl: body.courseImageUrl,
            modules: modulesList,
          }
        )
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
 * This Function is for featch Data For Update Course
 * @param {*} body
 */
const fetchDataForUpdateCourse = (body) =>
  new Promise((resolve, reject) => {
    courseModules
      .findOne({ _id: body.courseId })
      .then((course) => {
        body.courseDetails = course;
        resolve(body);
      })
      .catch((fetchDataForUpdateCourseError) => {
        logger.error(
          `fetchDataForUpdateCourseError - error ${fetchDataForUpdateCourseError}`
        );
        reject(internalError);
      });
  });

/**
 * This Function is for  updateCourse
 * @param {*} body
 */
const updateCourse = (body) =>
  new Promise((resolve, reject) => {
    try {
      courseId = body.courseId;
      validateUpdateCourseBody(body);
      fetchDataForUpdateCourse(body)
        .then(addDataToUpdateCourseModulesCollection)
        .then((updateResult) => {
          const success = {
            status: statusCode.Success,
            message: "Course updated successfully",
          };
          logger.info(`Update Course successfully ${updateResult}`);
          resolve(success);
        })
        .catch((updateError) => {
          logger.error(`updateCourse : Update Course failed:${updateError}`);
          reject(updateError);
        });
    } catch (e) {
      logger.error(`updateCourse - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

module.exports = {
  updateCourse,
};
