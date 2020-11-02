const logger = require('../../lib/logger');
const csvtojson = require('csvtojson')
const utils = require('../../lib/utils');
const emailHelper = require('../../lib/emailHelper');
const config = require('../../config/index');
const { statusCode, internalError } = require('../../lib/constant');
const _ = require('lodash')
const userModel = require('../../models/database/user');
const roleModel = require('../../models/database/role');
const studentModel = require('../../models/database/student');
const batchModel = require('../../models/database/batch');
const path = require('path');
const fs = require('fs')
const { xlsxToJson } = require('json-and-xlsx');
var async = require("async");
var json2xls = require('json2xls');

/**
* check csv data from file
* @param {Object} csvRow 
*/
const validateCSVTemplate = (csvRow) => {
    const keys = Object.keys(csvRow);

    if (!keys.includes('name')) {
        throw new Error(`Template doesn\'t have name field`);
    }
    if (!keys.includes('schoolName')) {
        throw new Error(`Template doesn\'t have schoolName field`);
    }
    if (!keys.includes('contactNumber')) {
        throw new Error(`Template doesn\'t have contactNumber field`);
    }
    if (!keys.includes('email')) {
        throw new Error(`Template doesn\'t have email field`);
    }
    if (!keys.includes('board')) {
        throw new Error(`Template doesn\'t have board field`);
    }
    return true;
}

/**
* checking student's field values validation 
*/
const fieldValuesValidation = (student) => {
    let comment = "";
    comment = utils.validateEmail(student.email) + utils.validateName(student.name) + utils.validatePhoneNumber(student.contactNumber)
        + utils.validateSchoolName(student.schoolName) + utils.validateBoard(student.board)
    return comment;
}

/**
* file buffer from csv file upload
* @param {JSON} fileJSON
* @param {String} organizationId
*/
const validateStudentJsonData = (fileJSON, instituteDetails) => new Promise((resolve, reject) => {
    let studentContactNumber = []
    let validStudentDataFromDump = []
    let invalidStudentDataFromDump = []
    let studentsJson = {};
    if (fileJSON.length > 0) {
        try {
            validateCSVTemplate(fileJSON[0]);
            fileJSON.forEach(studentJsonObject => {
                const studentObject = {
                    name: utils.toTitleCase(studentJsonObject.name),
                    courseId: instituteDetails.courseId,
                    batchId: instituteDetails.batchId,
                    schoolName: studentJsonObject.schoolName,
                    instituteId: instituteDetails.instituteId,
                    email: studentJsonObject.email || '',
                    contactNumber: studentJsonObject.contactNumber,
                    address: studentJsonObject.address || '',
                    board: studentJsonObject.board,
                    password: 'Student@123'
                }
                let comment = fieldValuesValidation(studentObject);
                if (studentsJson[studentObject.contactNumber]) {
                    comment += ' Duplicate student email found in record above.'
                }
                if (comment.length > 0) {
                    delete studentObject['instituteId']
                    delete studentObject['password']
                    delete studentObject['roleCode']
                    delete studentObject['batchId']
                    delete studentObject['courseId']
                    studentObject.comment = comment;
                    invalidStudentDataFromDump.push(studentObject)
                } else {
                    studentsJson[studentObject.contactNumber] = studentObject;
                    validStudentDataFromDump.push(studentObject)
                    studentContactNumber.push(studentObject.contactNumber)
                }
            })
            studentContactNumber = _.uniq(studentContactNumber);
            logger.info(`validateStudentJsonData - converted csv to json student data${validStudentDataFromDump.length}/${fileJSON.length}`)
            resolve({
                validStudentDataFromDump, studentContactNumber, invalidStudentDataFromDump
            })
        } catch (error) {
            logger.error(`validateStudentJsonData - error occurred while converting to CSV : ${error.message}.`);
            reject({
                status: statusCode.InvalidData,
                message: error.message
            })
        }
    } else {
        logger.error(`validateStudentJsonData- file length is 0`);
        reject({
            status: statusCode.InvalidData,
            message: `CSV doesn't have any data.`
        });
    }
})

/**
 * mapping role id with students to onbaord
 */
const mapRoleId = (successfullStudent, role) => {
    var studentWithRoleId = [];
    successfullStudent.forEach(s => {
        s.roleId = role._id;
        studentWithRoleId.push(s);
    })
    return studentWithRoleId;
}

/**
* filtering out already present students email from csv file 
*/
const filterContactNumber = (users, validDataFromDump) => {
    let studentsContactNumberRegistered = {};
    let studentsContactNumberRepeated = [];
    let studentsWithNewContactNumber = [];
    users.forEach(u => {
        studentsContactNumberRegistered[u.contactNumber] = u;
    })
    validDataFromDump.forEach(s => {
        if (studentsContactNumberRegistered[s.contactNumber]) {
            delete s['instituteId']
            delete s['password']
            delete s['roleCode']
            delete s['courseId']
            delete s['batchId']
            s.comment = "Contact number already exists."
            studentsContactNumberRepeated.push(s);
        }
        else {
            studentsWithNewContactNumber.push(s);
        }
    })
    return { studentsContactNumberRepeated, studentsWithNewContactNumber };
}

// /**
// * add public key to successfull students 
// */
// const addPublicKey = (studentFilterData) => new Promise((resolve, reject) => {
// const numberOfStudents = studentFilterData.validStudentData.length;
// userCtrl.generatePublicKey(numberOfStudents)
// .then(publicKeys => {
// studentFilterData.validStudentData.forEach((s, index) => {
// s.publicKey = publicKeys[index];
// });
// logger.info(`addPublicKey - success`);
// resolve({
// validStudentData: studentFilterData.validStudentData,
// invalidStudentData: studentFilterData.invalidStudentData,
// });
// })
// .catch(addPublicKeyError => {
// logger.error(`addPublicKey - Error while adding public key : ${addPublicKeyError}`);
// reject(internalError);
// })
// })

/**
* This function is to add bulk data to user collection
*
*/
const addBulkDataToUserCollection = (studentFilterData) => new Promise((resolve, reject) => {
    let { validStudentData, invalidStudentData } = studentFilterData;
    let users = []
    validStudentData.forEach(student => {
        const userDetails = {
            email: student.email || "",
            password: utils.generateBcryptHash('Student@123'),
            roleId: student.roleId,
            instituteId: student.instituteId,
            contactNumber: student.contactNumber
        };
        users.push(userDetails);
    })
    let results = []
    const userChunks = _.chunk(users, config.batchSize);
    async.eachSeries(userChunks, function (chunk, callback) {
        userModel.addMultiple(chunk)
            .then(userData => {
                logger.info(`addBulkDataToUserCollection - user bulk data added successfully`);
                results.push(...userData);
                callback();
            })
            .catch(userDataError => {
                logger.error(`addDataToUserCollection - error:${userError}`);
                callback(userDataError);
            })
    }, err => {
        if (err) {
            logger.error(`addBulkDataToUserCollection - Error while adding data to user collection:${err}`);
            reject(internalError);
        }
        logger.info(`addBulkDataToUserCollection - Success`);
        resolve({ validStudentData, invalidStudentData, users: results });
    })
});

/**
* mapping userid with contact number for studentbulk upload
*/
const userIdContactNumberMapFun = (userMetaData) => {
    let userIdContactNumberMap = {}
    userMetaData.forEach(u => {
        userIdContactNumberMap[u.contactNumber] = u._id
    })
    return userIdContactNumberMap;
}

/**
* This function is to add data to student collections
*/
const addBulkDataToStudentCollection = (studentFilterData) => new Promise((resolve, reject) => {
    let students = [];
    const { validStudentData, invalidStudentData, users } = studentFilterData;
    const userIdContactNumberMap = userIdContactNumberMapFun(users);
    validStudentData.forEach(student => {
        const userMetaData = {
            userId: userIdContactNumberMap[student.contactNumber],
            instituteId: student.instituteId,
            courses: {
                batchId: student.batchId,
                courseId: student.courseId
            },
            name: utils.toTitleCase(student.name),
            // contactNumber: student.contactNumber,
            location: student.address || '',
            school: student.schoolName,
            board: student.board
        };
        students.push(userMetaData);
    })

    let results = []
    const userChunks = _.chunk(students, config.batchSize);
    async.eachSeries(userChunks, function (chunk, callback) {
        studentModel.addMultiple(chunk)
            .then(studentData => {
                logger.info(`addBulkDataToStudentCollection - added bulk data to student collection`);
                results.push(...studentData);
                callback();
            })
            .catch(userDataError => {
                logger.error(`addBulkDataToStudentCollection - error in adding data to student collection: ${userDataError}`);
                callback(userDataError);
            })
    }, err => {
        if (err) {
            logger.error(`addBulkDataToStudentCollection - err: ${err}`);
            reject(internalError)
        }
        logger.info(`addBulkDataToStudentCollection - success`);
        resolve({ invalidStudentData, results });
    })
});

const addBulkDataToBatchCollection = (studentFilterData, instituteDetails) => new Promise((resolve, reject) => {
    const { invalidStudentData, results } = studentFilterData;
    const batchId = instituteDetails.batchId;
    let students = [];
    results.forEach((result) => {
        students.push({ studentId: result._id })
    })
    batchModel.addStudent({ _id: batchId }, students)
        .then(studentData => {
            logger.info(`addBulkDataToBatchCollection - added bulk data to batch collection`);
            resolve({ invalidStudentData, studentData });
        })
        .catch(userDataError => {
            logger.error(`addBulkDataToBatchCollection - error in adding data to batch collection: ${userDataError}`);
            reject(userDataError);
        })
})

/**
* This function is to fetch data for bulk student onboarding
* @param {Object} fileJsonData
*/
const fetchDataForBulkOnboarding = (fileJsonData) => new Promise((resolve, reject) => {
    const process = [
        userModel.find({ contactNumber: { $in: fileJsonData.studentContactNumber } }),
        roleModel.findOne({ code: config.role.STUDENT })
    ];
    Promise.all(process)
        .then((processRes) => {
            try {
                const [users, role] = processRes;
                let repeatedStudentContactNumber = []
                let validDataFromDump = []
                let invalidDataFromDump = []
                validDataFromDump = fileJsonData.validStudentDataFromDump;
                invalidDataFromDump = fileJsonData.invalidStudentDataFromDump;

                contactNumberFilter = filterContactNumber(users, validDataFromDump);
                repeatedStudentContactNumber = contactNumberFilter.studentsContactNumberRepeated;
                newContactNumberFromDump = contactNumberFilter.studentsWithNewContactNumber;
                studentWithRoleId = mapRoleId(newContactNumberFromDump, role)
                totalErrorData = [...repeatedStudentContactNumber, ...invalidDataFromDump]
                logger.info(`fetchDataForBulkOnboarding - success`);
                resolve({ validStudentData: studentWithRoleId, invalidStudentData: totalErrorData });
            }
            catch (e) {
                logger.error(`fetchDataForBulkOnboarding - Error occurred in fetching data: ${JSON.stringify(e, null, 2)}`)
                reject(internalError);
            }
        })
        .catch((processError) => {
            logger.error(`fetchDataForBulkOnboarding - Error occurred in fetching data: ${JSON.stringify(processError, null, 2)}`)
            reject(internalError);
        })
});

/**
* convert json to xlsx for error file
* @param {Object} data 
*/
const JSONDataToXLSXFile = (data, name) => {
    var xls = json2xls(data);
    fs.writeFileSync(`public/bulkUpload/error/error ${name}.xlsx`, xls, 'binary');
}

/**
* Convert file data to json
* @param {Object} fileBuffer 
* @param {String} fileExtension 
*/
const convertFileDataToJson = (fileBuffer, fileExtension) => new Promise((resolve, reject) => {
    if (fileExtension == '.csv') {
        csvtojson()
            .fromString(fileBuffer.toString())
            .then((csvRow) => {
                logger.info(`convertFileDataToJson - success`);
                resolve(csvRow)
            })
            .catch(csvRowErr => {
                logger.error(`convertFileDataToJson - failed ${csvRowErr}`);
                reject(internalError);
            });
    }
    else {
        try {
            const XLSXToJSON = xlsxToJson.readFromBufferAndGet(fileBuffer);
            logger.info(`convertFileDataToJson - success`);
            resolve(XLSXToJSON);
        } catch (e) {
            logger.error(`convertFileDataToJson - failed ${e}`);
            reject(internalError);
        }
    }
})

/**
* Student bulk onbarding through csv file
* @param {Object} file 
* @param {Object} user
*/
const bulkOnboarding = (file, req) => new Promise((resolve, reject) => {
    const instituteDetails = {
        instituteId: req.user.instituteId._id,
        instituteName: req.user.instituteId.name,
        courseId: req.body.courseId,
        batchId: req.body.batchId
    }
    const fileExtension = path.extname(file.originalname)
    convertFileDataToJson(file.buffer, fileExtension)
        .then((jsonData) => validateStudentJsonData(jsonData, instituteDetails))
        .then(fetchDataForBulkOnboarding)
        .then(addBulkDataToUserCollection)
        .then(addBulkDataToStudentCollection)
        .then((result) => addBulkDataToBatchCollection(result, instituteDetails))
        .then((data) => {
            logger.info(`bulkOnboarding - Bulk onboarding successful.`);
            if (data.invalidStudentData.length > 0) {
                JSONDataToXLSXFile(data.invalidStudentData, instituteDetails.instituteName)
                resolve({
                    status: statusCode.Success,
                    message: 'Partial bulk student Onboarding successful. Please find error in file.',
                    data: {
                        errorFileLink: `${config.appUrl}/bulkUpload/error/error ${instituteDetails.instituteName}.xlsx`
                    }
                });
            }
            else {
                resolve({
                    status: statusCode.Success,
                    message: 'Bulk student Onboarding successful.',
                });
            }
        })
        .catch(error => {
            logger.error(`bulkOnboarding - Error occurred ${error}`);
            reject(error);
        })
});

module.exports = {
    bulkOnboarding
}

