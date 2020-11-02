let urls = {
  registerUsingMobile: "/authentication/student/signUp/mobile",
  registerUsingEmail: "/authentication/student/signUp/email",
  registerMobileOtp: "/authentication/student/signUp/verifyMobileOTP",
  registerUserDetails: "/authentication/student/signUp/addUser",
  signInUsingMobile: "/authentication/mobileLogin",
  signInOtp: "/authentication/student/signIn/verifyMobileOTP",
  signInUsingEmail: "/authentication/login",
  logout: "/authentication/logout",
  userDetails: "/authentication/user",
  logout: "/authentication/logout",
  boardDetails: "/board",
  gradeDetails: "/grade",
  examDetails: "/exam",
  teacherSignupMobile: "/authentication/teacher/signUp/mobile",
  teacherSignupOtp: "/authentication/teacher/signUp/verifyMobileOTP",
  teacherSignupEmail: "/authentication/teacher/signUp/email",
  teacherLoginMobile: "/authentication/teacher/signIn/mobile",
  teacherLoginOtp: "/authentication/teacher/signIn/verifyMobileOTP",
  teacherRegisterDetails: "/authentication/teacher/signUp/addUser",
  forgotPassword: "​/authentication/recover",
  validateToken: "/authentication/validateToken",
  resetPassword: "/authentication/resetPassword",
  applyAsTeacher: "/teacherInterview/apply",
  formRequest: "/teacherInterview/apply",
  approveRequest: "​/teacherInterview/approve",
  rejectRequest: "​/teacherInterview/reject",
  course: "/course",
  courseApprove: "/course/approve",
  courseReject: "/course/reject",
  teacherCourses: "/course/teacher/courses",
  upcomingCourse: "/course/upcomingCourse",
  studentRegisterCourse: "/course/registerCourse",
  authenticationUser: "/authentication/user",
  teacherLiveClassJoin: "/liveClass/teacher/create",
  updateStudentName: "/authentication/updateName",
  updateEmail: "/authentication/updateEmail",
  updateContactNumber: "/authentication/updateContactNumber",
  studentRegisterCourse: "/course/registerCourse",
  studentRegisterClasses: "/course/registeredCourse",
  studentLiveclassJoin: "/liveClass/student/join",
  changePassword: "/authentication/changePassword",
  guestSpecificCourse: "/course/getSpecificCourse",
  guestJoin: "/liveClass/guest/join",
  discountLink: "/payment/coupon",
  stripePayment: "/payment/stripe/coursePayment",
  paypalRegister: "/course/registerCourse",
  studentRegistered: "/admin/student",
  paymentReceived: "/admin/registeredStudents",
  studentVerifyEmail: "/authentication/student/signUp/verifyEmail",
  teacherVerifyEmail: "/authentication/teacher/signUp/verifyEmail",
  teacherCreateCourse: "/courseModules",
  scheduleMeeting: "/courseModules/scheduleMeeting",
  teacherGetCourse: "/courseModules/teacher/courses",
  studentAllRegisterClasses: "/courseModules/getAllCourses",

  getAllCoursesForAdmin: "/admin/instituteCourses",

  discussionForum: "/discussionForum",
  deleteCourse: "/courseModules",
  fileUpload: "/documentUpload",
  teacherChangePassword: "/teacherOnboarding/firstLoginChangePassword",
  addTeacher: "/teacherOnboarding",
  getTeacher: "/teacherOnboarding",
  saveTeacherProfile: "/teacher/profile",
  getTeacherProfile: "/teacher/profile",
  getInstituteProfile: "/admin/instituteProfile",
  saveInstituteProfile: "/admin/updateInstituteProfile",
  teacherCreateTest: "/test/createTestQuestions",
  getAllTests: "/test/getAllTests",
  getSpecificTest: "/test/getSpecificTest",
  testEvaluation: "/testEvaluation",
  getAllScores: "/testEvaluation/getScoresForTest",
  deleteTest: "/test/deleteTest",
  updateTestDetails: "/test/updateTestDetails",
  updateQuestion: "/test/updateQuestion",
  assignTest: "/test/assignTest",
  getAssignedTest: "/test/getAssignedTest",
  getStudentTests: "/test/getStudentTests",
  getTeacherBatches: "/test/getTeacherBatches",
  getLogedStudentForBatch: "/authentication/user",
  getStudentBatchId: "/feeStructure/getStudentFeeStructure",
  allBBBSchedule: "/liveClass/allSchedule",
  createBBBClass: "/liveClass/teacher/create",
  studentJoinBBBClass: "/liveClass/student/join",
  teacherAllSchedule: "/liveClass/teacherSchedule",
  studentAllSchedule: "/liveClass/studentSchedule",
  scheduleMeeting: "/courseModules/scheduleMeeting",
  scheduleBBBMeeting: "/courseModules/teacher/bbbSchedule",
  teacherGetCourse: "/courseModules/teacher/courses",
  studentAllRegisterClasses: "/courseModules/getAllCourses",
  getStudentAgoraToken: "/agora/studentToken",
  getTeacherAgoraToken: "/agora/teacherToken",
  getTeacherScheduleForAgora: "/agora/teacherSchedule",
  getStudentScheduleForAgora: "/agora/studentSchedule",
  getInstituteSchedule: "​/admin/instituteSchedule",
  scheduleAgoraLiveclass: "/agora/schedule",
  getAllBatches: "/batch/getAllBatches",
  getAllCourses: "/courseModules/getAllCourses",
  addStudent: "/studentOnboarding",
  getStudents: "/studentOnboarding",
  saveStudentData: "/student/profile",
  getStudentProfile: "/student/profile",
  studentChangePassword: "/studentOnboarding/firstLoginChangePassword",
  activeTeacherdata: "/teacher/profile",
  createNewBatch: "/batch/createBatch",
  // getAllTeacherNameList:"/authentication/user",
  getAllTeacherNameList: "/admin/instituteTeachers",
  getAllBatchList: "/batch/getAllBatches",
  deleteParticularBatch: "/batch/deletebatch",
  specificBatchGetAPIbasedOnBatchId: "/batch/getSpecificBatch",
  editSpecificBatch: "/batch/updateBatch",
  deleteSpecificStudentFromSpecificBatch: "/batch/deleteStudent",
  addNewFeesStructurepostAPI: "/feeStructure",
  getAllTestForBatchGETAPI: "/batch/getTestsForBatch",
  getAllScoreOfParticulatTestInBatch: "/testEvaluation/getScoresForTest",
  // getAllFeesSrtructures:"/feeStructure/batchId/{batchId}",
  getAllFeesSrtructures: "/feeStructure/batchId/",
  deleteEachFeesStructure: "/feeStructure",
  getAllTests: "/test/getAllTests",
  paypalBackend: "/paypal/payment/createOrder",
  paypalCapture: "/paypal/payment/captureOrder",
  singleStudentCourse: "​/student/myCourses",
  updatePaymentStatus: "/feeStructure/updateStudentFeeStructure",
  teacherAllCourse: "/courseModules/teacher/courses",
  instituteCourse: "/admin/instituteCourses",
  getInstituteTests: "/test/getInstituteTests",
  chatBox: "/chatbox",
  getStudentBatchWiseTeachers: "/student/studentBatchWiseTeachers",
  getTeacherBatchWiseStudents: "/teacher/batchWiseStudent",
  teacherAllCourse: "​/courseModules/teacher/courses",
  studentProfileStudentDetails: "/student/searchProfile",
  getTestDetailsofStudent: "/test/getStudentTestDetails",
  getFeesDetailsofParticularStudent:
    "/feeStructure/getStudentFeeDetailsForAdmin",
  payHash: "/payu/payment/generateHash",
  bulkUploadPOST:"/studentOnboarding/bulkUpload",
};

export { urls };
