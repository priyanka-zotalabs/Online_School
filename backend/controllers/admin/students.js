const userModel = require('../../models/database/user');
const studentModel = require('../../models/database/student');
const adminModel = require('../../models/database/admin');
const config = require("../../config/index");
const loginCtrl = require("../user/signIn");



const utils = require('../../lib/utils');


const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');
const student = require('../../models/database/student');


const formatestudentDetails = (students) => {
    const studentsDetails = [];
    students.forEach(student => {
        const data = student.userId;
        delete data.password;
        delete student.userId;
        data.userMetaData = student;
        studentsDetails.push(data);
    });
    return studentsDetails;
}

/**
 * This function is to get the student data
 * @param {Object} params 
 */
const getStudents = (req) => new Promise((resolve, reject) => {
    let process;
    // if (params.code) {
    //     process = studentModel.findOne({ _id: params.studentID });
    // } else {
    process = studentModel.find({ instituteId: req.user.instituteId._id });
    // }
    process
        .then(students => {
            const studentsDetails = formatestudentDetails(students);
            const response = {
                status: statusCode.Success,
                message: 'student fetch success!',
                data: studentsDetails !== null ? studentsDetails : {},
            }
            resolve(response);
        })
        .catch(studentErr => {
            logger.error(`getstudent - error getting the students ${JSON.stringify(studentErr, null, 2)}`);
            reject(internalError)
        })
});

// /** 
//  * @param {Array<*>} arr 
//  * @param {Number} perPage 
//  */ 
// function paginator( arr, perPage ) 
// { 
// 	if ( perPage < 1 || !arr ) return () => []; 
	 
// 	return function( page ) { 
// 		const basePage = page * perPage; 
	 
// 		return page < 0 || basePage >= arr.length  
// 			? []  
// 			: arr.slice( basePage,  basePage + perPage ); 
// 	}; 
// } 

/** 
 * @param {Array<*>} arr 
 * @param {Number} perPage 
 * @param {Number} page 
 * @return {Array<*>} 
 */ 
function paginate( arr, perPage, page ) 
{ 
	const basePage = page * perPage; 
	 
	return page < 0 || perPage < 1 || basePage >= arr.length  
		? []  
		: arr.slice( basePage,  basePage + perPage ); 
} 

/**
 * This function is to get the student data
 * @param {Object} params 
 */
const getStudentPagination = (req) => new Promise((resolve, reject) => {
    let process;
    const query = req.query;
    const page = query.page ? parseInt(query.page) : 0;
    const limit = query.limit ? parseInt(query.limit) : 5;
    process = studentModel.find({ instituteId: req.user.instituteId._id });
    process
        .then(students => {
           
            const totalPages = Math.ceil(students.length / limit);
            const paginateArray = paginate( students, limit ,page); 
            const studentsDetails = formatestudentDetails(paginateArray);
            const response = {
                status: statusCode.Success,
                message: 'student fetch success!',
                currentPage: page,
                totalPages: totalPages,
                data: studentsDetails !== null ? studentsDetails : {},
            }

            resolve(response);
        })
        .catch(studentErr => {
            logger.error(`getstudent - error getting the students ${JSON.stringify(studentErr, null, 2)}`);
            reject(internalError)
        })
});



module.exports = {
    getStudents,
    getStudentPagination
}