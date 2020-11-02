require('dotenv').config({ path: '.env' });
const _ = require('lodash');
const moment = require('moment');
const request = require('request');
const CronJob = require('cron').CronJob;
const config = require('../config/index.js');
const courseModuleModel = require('../models/database/courseModules');
const zoomTokenModel = require('../models/database/zoomToken');
const { statusCode, internalError } = require('../lib/constant');
/*
 * Runs every day
 * after every hour
 */
new CronJob('00 00 * * * *', function () {
    console.log('Running cron for recording search');
    getRecording();
}, function () {
    /* This function is executed when the job stops */
},
    true, /* Start the job right now */
    'America/New_York' /* Time zone of this job. */
);

const getRecordingUrl = (meetingId, token) => new Promise((resolve, reject) => {
    const url = `https://api.zoom.us/v2/meetings/${meetingId}//recordings`
    request
        .get(url, (error, response, body) => {
            if (error) {
                logger.error(`fetchCourseDetails: error ${error}`);
            } else {
                body = JSON.parse(body);
                //const JSONResponse = JSON.stringify(body, null, 2);
                recUrl={
                    url:body.share_url
                }
                resolve(recUrl);
            }
        })
        .auth(null, null, true, token);
});


const updateAccessToken = () => new Promise((resolve, reject) => {
    zoomTokenModel.findOne()
        .then((result) => {
            if (!result) {
                reject({
                    status: statusCode.InvalidData,
                    message: "No token found"
                })
            } else {
                refresh_token = result.refresh_token
                const url = `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`;
                request
                    .post(url, (error, response, body) => {
                        body = JSON.parse(body);
                        zoomTokenDetails = {
                            access_token: body.access_token,
                            token_type: body.token_type,
                            refresh_token: body.refresh_token,
                            expires_in: body.expires_in,
                            scope: body.scope,
                        }
                        zoomTokenModel
                            .update({ _id: result._id }, zoomTokenDetails)
                            .then((result) => {
                                console.log(`newToken - newToken added successfully`);
                                const access_token = zoomTokenDetails.access_token;
                                resolve(access_token);
                            })
                            .catch((error) => {
                                console.log(
                                    `newToken - error:${JSON.stringify(
                                        error,
                                        null,
                                        2
                                    )}`
                                );
                                reject(error);
                            });
                    })
                    .auth(process.env.clientID, process.env.clientSecret);
            }
        })
});

function getRecording() {
    Promise.all([
        courseModuleModel.find({}),
        updateAccessToken()])
        .then((processRes) => {
            let [courseModules, token] = processRes;
            courseModules.forEach((courseModule) => {
                courseModule.modules.forEach((module, moduleIndex) => {
                    module.chapters.forEach((chapter, chapterIndex) => {
                        if (chapter.schedules && chapter.schedules.length) {
                            chapter.schedules.forEach((schedule, scheduleIndex) => {
                                if (!schedule.recordingUrl && moment(schedule.dateTime).utc()) {
                                    getRecordingUrl(schedule.zoomMeetingDetail.id, token)
                                        .then((url) => {
                                            if (url) {
                                                let key = `modules.${moduleIndex}.chapters.${chapterIndex}.schedules.${scheduleIndex}.recordingUrl`;
                                                courseModuleModel.update({ _id: courseModule._id }, { [key]: url })
                                            }
                                        })
                                        .catch((urlError) => {
                                            console.log(urlError);
                                        })
                                }
                            });
                        }
                    });
                });
            })
        })
        .catch((processErr) => {
            console.log(processErr);
        })
}

getRecording()