require('dotenv').config({ path: '.env' });

let seneca = require('seneca');
const config = require('./config');
const logger = require('./lib/logger');

seneca = seneca({ timeout: config.databaseMicroService.timeout });
logger.init();
const admin = require('./services/admin');
const role = require('./services/role');
const student = require('./services/student');
const user = require('./services/user');
const board = require('./services/board');
const grade = require('./services/grade');
const teacherInterview = require('./services/teacherInterview');
const teacher = require('./services/teacher');
const institute = require('./services/institute');
const onboardedTeacher = require('./services/onboardedTeacher');
const course = require('./services/course');
const courseModules = require('./services/courseModules');
const schedule = require('./services/schedule');
const liveClass = require('./services/liveClass');
const courseRegistration = require('./services/courseRegistration');
const exam = require('./services/exam');
const zoomToken = require('./services/zoomToken');
const test = require('./services/test');
const testQuestion = require('./services/testQuestion');
const batch = require('./services/batch');
const chatbox = require('./services/chatbox');
const discussionForum = require('./services/discussionForum');
const studentsTestSolution = require('./services/studentsTestSolution');
const paymentDetails = require('./services/paymentDetails');
const feeStructure = require('./services/feeStructure');


seneca.use(admin);
seneca.use(role);
seneca.use(student);
seneca.use(user);
seneca.use(board)
seneca.use(grade)
seneca.use(teacherInterview);
seneca.use(teacher)
seneca.use(institute)
seneca.use(onboardedTeacher)
seneca.use(course)
seneca.use(courseModules)
seneca.use(schedule)
seneca.use(liveClass)
seneca.use(courseRegistration)
seneca.use(exam)
seneca.use(zoomToken)
seneca.use(chatbox)
seneca.use(discussionForum)
seneca.use(studentsTestSolution)
seneca.use(test)
seneca.use(testQuestion)
seneca.use(batch)
seneca.use(feeStructure)
seneca.use(paymentDetails)



seneca.listen(config.databaseMicroService);
console.log(`Started databaseConnector micro-service on port: ${config.databaseMicroService.port}`);
logger.info(`Started databaseConnector micro-service on port: ${config.databaseMicroService.port}`);
