const fs = require('fs');
const logger = require('./logger');
const { appUrl, reactAppUrl } = require('../config/index');
const sgMail = require('@sendgrid/mail');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const hbs = expressHandlebars.create({
  partialsDir: path.join(__dirname, '../views/emailTemplates/'),
  extname: '.hbs',
});
const async = require('async');

const createTemplate = (templateName, data) => new Promise(((resolve, reject) => {
  try {
    const templatePath = path.join(__dirname, `../views/emailTemplates/${templateName}.hbs`);
    hbs.render(templatePath, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  } catch (e) {
    logger.error('error while creation of email Template', e);
    reject(e);
  }
}));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (mailOptions, callback) => {
  callback(null, true);
  sgMail.send(mailOptions, (error, result) => {
    callback(error, result);
  });
};

const createMailOptions = (toEmail, subject, html, bccEmail, attachment) => {
  const mailOptions = {
    from: 'admin@zotalabs.com',
    to: toEmail,
    subject,
    html,
  };
  if (bccEmail) { mailOptions.bcc = bccEmail }
  if (attachment) {
    const data = fs.readFileSync(attachment[0].path);
    const base64data = Buffer.from(data).toString('base64');
    mailOptions.attachments = [{
      filename: path.basename(attachment[0].path),
      content: base64data,
      type: 'application/pdf',
    }];
  }
  return mailOptions;
};

const passwordRecoveryEmail = (userData) => new Promise((resolve, reject) => {
  const toEmail = `${userData.email}`;
  const subject = "Password change request";
  const link = `${reactAppUrl}/resetPassword/${userData.token}`;
  createTemplate('resetPassword', { link })
    .then(html => {
      const mailOptions = createMailOptions(toEmail, subject, html);
      sendMail(mailOptions, (err, result) => {
        if (err) {
          logger.error(`passwordRecoveryEmail: An error occurred while sending email to ${userData.email} `);
          reject(err);
        } else {
          logger.info(`passwordRecoveryEmail: Email successfully sent to ${userData.email} `);
          resolve(result);
        }
      });
    })
    .catch(error => {
      logger.error(error);
      reject(error);
    })
});

/**
 * This fn is to send email for teacherInterviewAcknowledge
 * @param {*} emails 
 * @param {*} status 
 */
const teacherInterviewAcknowledge = (teacherInterviewDetail, status) => new Promise((resolve, reject) => {
  const toEmail = [teacherInterviewDetail.email];
  const subject = "Acknowledge for interview";
  if (status == "APPROVED") {
    template = "approveForm"
  }
  else {
    template = "rejectForm"
  }
  createTemplate(template, { status: status, reactAppUrl })
    .then(html => {
      const mailOptions = createMailOptions(toEmail, subject, html);
      sendMail(mailOptions, (err, result) => {
        if (err) {
          logger.error(`teacherInterviewAcknowledgeEmail: An error:${err} occurred while sending email`);
          reject(err);
        } else {
          logger.info(`teacherInterviewAcknowledgeEmail: Email successfully sent`);
          resolve(result);
        }
      });
    })
    .catch(error => {
      logger.error(error);
      reject(error);
    })
})

/**
 * This fn is to send email for course approval
 * @param {*} email
 * @param {*} name 
 */
const courseApprovalEmail = (userData) => new Promise((resolve, reject) => {
  const toEmail = `${userData.email}`;
  const subject = "Course approval email";
  const name = `${userData.name}`
  const link = `${reactAppUrl}/guest/${userData.courseId}`;
  createTemplate('courseApproval', { link, name })
    .then(html => {
      const mailOptions = createMailOptions(toEmail, subject, html);
      sendMail(mailOptions, (err, result) => {
        if (err) {
          logger.error(`courseApprovalEmail: An error occurred while sending email to ${userData.email} `);
          reject(err);
        } else {
          logger.info(`courseApprovalEmail: Email successfully sent to ${userData.email} `);
          resolve(result);
        }
      });
    })
    .catch(error => {
      logger.error(error);
      reject(error);
    })
});

const verifyAccountEmail = (userData) => new Promise((resolve, reject) => {
  const toEmail = `${userData.email}`;
  const subject = "Verify your account";
  const otp = `${userData.otpCode}`;
  createTemplate('verifyAccountEmail', { otp })
    .then(html => {
      const mailOptions = createMailOptions(toEmail, subject, html);
      sendMail(mailOptions, (err, result) => {
        if (err) {
          logger.error(`verifyAccountEmail: An error occurred while sending email to ${userData.email} `);
          reject(err);
        } else {
          logger.info(`verifyAccountEmail: Email successfully sent to ${userData.email} `);
          resolve(result);
        }
      });
    })
    .catch(error => {
      logger.error(error);
      reject(error);
    })
});



/**
* This fn is to send email for Teacher onboarded
 * @param {*} data 
 */
const teacherOnboardedEmail = (data) => new Promise((resolve, reject) => {
  const toEmail = `${data.email}`;
  const subject = "Teacher onboarded email";
  const name = `${data.name}`
  const password = `${data.password}`
  const loginLink = `${reactAppUrl}/teacher/login`;
  // const signUplink = `${reactAppUrl}/authentication/teacher/signUp/email/${data.email}`;
  createTemplate('teacherOnboarded', { toEmail, loginLink, name, password })
    .then(html => {
      const mailOptions = createMailOptions(toEmail, subject, html);
      sendMail(mailOptions, (err, result) => {
        if (err) {
          logger.error(`teacherOnboardedEmail: An error occurred while sending email to ${data.email} `);
          reject(err);
        } else {
          logger.info(`teacherOnboardedEmail: Email successfully sent to ${data.email} `);
          resolve(result);
        }
      });
    })
    .catch(error => {
      logger.error(error);
      reject(error);
    })
});


/**
* This fn is to send email for Teacher onboarded
 * @param {*} data 
 */
const studentOnboardedEmail = (data) => new Promise((resolve, reject) => {
  const toEmail = `${data.email}`;
  const subject = "student onboarded email";
  const name = `${data.name}`
  const password = `${data.password}`
  const loginLink = `${reactAppUrl}/student/login`;
  // const signUplink = `${reactAppUrl}/authentication/student/signUp/email/${data.email}`;
  createTemplate('studentOnboarded', { toEmail, loginLink, name, password })
    .then(html => {
      const mailOptions = createMailOptions(toEmail, subject, html);
      sendMail(mailOptions, (err, result) => {
        if (err) {
          logger.error(`studentOnboardedEmail: An error occurred while sending email to ${data.email} `);
          reject(err);
        } else {
          logger.info(`studentOnboardedEmail: Email successfully sent to ${data.email} `);
          resolve(result);
        }
      });
    })
    .catch(error => {
      logger.error(error);
      reject(error);
    })
});

// const sendBulkOnBoardEmail = (data) => new Promise((resolve, reject) => {
//   const subject = "student onboarded email";
//   const password = "Student@123"
//   const loginLink = `${reactAppUrl}/login`;
//   async.parallel({
//     function(callback) {
//       for (let i = 0; i < data.length; i += 1) {
//         let toEmail = data[i];
//         createTemplate('studentOnboarded', { toEmail, loginLink, password })
//           .then(html => {
//             const mailOptions = createMailOptions(toEmail, subject, html);
//             sendMail(mailOptions, (err, result) => {
//               if (err) {
//                 logger.error(`studentOnboardedEmail: An error occurred while sending email to ${toEmail} `);
//               } else {
//                 logger.info(`studentOnboardedEmail: Email successfully sent to ${toEmail} `);
//               }
//             });
//           })
//           .catch(error => {
//             logger.error(error);
//             reject(error);
//           })
//       }
//       callback(null, true);
//     }
//   })
// })

module.exports = {
  passwordRecoveryEmail,
  teacherInterviewAcknowledge,
  courseApprovalEmail,
  verifyAccountEmail,
  teacherOnboardedEmail,
  studentOnboardedEmail
}