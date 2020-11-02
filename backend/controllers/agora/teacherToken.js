
const logger = require('../../lib/logger');
const moment = require('moment');
const { statusCode, internalError } = require('../../lib/constant')
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')
const uuid4 = require('uuid4')
const config = require("../../config/index");
const scheduleModel = require("../../models/database/schedule")


// const generateRtcToken1 = function (req, resp) {
//     const currentTimestamp = Math.floor(Date.now() / 1000)
//     const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
//     const channelName = req.query.channelName;
//     // use 0 if uid is not specified
//     const uid = req.query.uid || 0
//     if (!channelName) {
//         return resp.status(400).json({ 'error': 'channel name is required' }).send();
//     }


//     const key = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

//     resp.header("Access-Control-Allow-Origin", "*")
//     //resp.header("Access-Control-Allow-Origin", "http://ip:port")
//     return resp.json({ 'key': key }).send();
// };



/**
 * This function is to validate the query parameter
 */
const validateQueryParams = (req) => {
    if (!req.query.channelName) { new Error("channelName not found") }
    if (!req.query.scheduleId) { new Error("scheduleId not found") }
}

/**
 * This function is to validate the data fetched from db
 */
const validateData = (schedule, date) => {
    if (!schedule) { throw new Error("schedule not found") }
    // const start = moment(date).subtract(15, 'm');
    // const end = moment(date).add(30, 'm');
    // if (!(moment().isBetween(start, end))) { throw new Error("Class timing not in range") }
    return true;
}

/**
 * This function is to fetch data for creating class
 */
const fetchDataToCreateToken = (data) => new Promise((resolve, reject) => {
    const process = [
        scheduleModel.findOne({ _id: data.scheduleId }),
    ];
    Promise.all(process)
        .then((processResult) => {
            try {
                const [schedule] = processResult;
                const date = moment(schedule.dateTime).utc()
                validateData(schedule, date);
                resolve(schedule)
            } catch (error) {
                logger.error(`fetchDataToCreate- error ${error}`);
                reject({
                    status: statusCode.InvalidData,
                    message: error.message
                });
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataToJoin - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
})



const generateRtcToken = (req) => new Promise((resolve, reject) => {

    try {

        validateQueryParams(req)
        fetchDataToCreateToken(req)
            .then((result) => {

                const appID = config.agora.appID;
                const appCertificate = config.agora.appCertificate;
                const channelName = req.query.channelName

                // token expire time, hardcode to 3600 seconds = 1 hour
                const expirationTimeInSeconds = 86400
                const role = RtcRole.PUBLISHER

                const currentTimestamp = Math.floor(Date.now() / 1000)
                const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
                const uid = uuid4()

                const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

                const response = {
                    status: statusCode.Success,
                    message: 'Teacher token fetch success!',
                    token: token,
                };
                
                resolve(response);
            })
            .catch((error) => {
                logger.error(`createTeacherClass error: ${error}`);
                resolve(error);
            })

    } catch (error) {
        logger.error(`generateRtcToken- error ${error}`);
        reject({
            status: statusCode.InvalidData,
            message: error.message
        });
    }
})






module.exports = {
    generateRtcToken,
}
