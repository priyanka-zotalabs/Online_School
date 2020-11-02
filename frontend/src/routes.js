import React, { Fragment, useState } from "react";
import _ from "lodash";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
//import components here
import Login from "./components/authentication/student/login/index";
import Registration from "./components/authentication/student/register/index";
import Header from "./shared/Components/header";
import MyProfile from "./components/student/StudentProfile/index";
import SideDrawerComponent from "./shared/Components/sidedrawer/SideDrawer";
import Backdrop from "./shared/Components/backDrop/Backdrop";
import SignUpSetPassword from "./components/authentication/student/register/nextPageViaEmail/index";
import SignUpOTP from "./components/authentication/student/register/nextPageViaMobileNumber/index";
import ForgotPassword from "./components/authentication/forgotPassword/index";
import SignInMobileNumber from "./components/authentication/student/login/signInViaMobileNumber/index";
import RegisterDetails from "./components/authentication/student/register/userDetails/index";
import SignUpSetPasswordTeacher from "./components/authentication/teacher/register/nextPageViaEmail/index";
import SignUpOTPTeacher from "./components/authentication/teacher/register/nextPageViaMobileNumber/index";
import SignInMobileNumberTeacher from "./components/authentication/teacher/login/signInViaMobileNumber/index";
import LoginTeacher from "./components/authentication/teacher/login/index";
import LoginAdmin from "./components/authentication/admin/login/index";
import RegistrationTeacher from "./components/authentication/teacher/register/index";
import TeacherProfile from "./components/teacher/TeacherProfile/index";
import ResetPassword from "./components/authentication/forgotPassword/resetPassword/index";
import TeacherCourses from "./components/teacher/course/index";
import TeacherSchedule from "./components/teacher/schedule/index";
import AdminSchedule from "./components/newAdmin/schedule/index";
import SideNavBar from "./shared/Components/sideNavBar/index";

// import FormView from "./components/admin/formView/index";
import CreateCourse from "./components/teacher/createCourse/index";
import ChangePassword from "./components/changePassword/index";
import CourseScheduleStudent from "./components/student/schedule/index";
import StudentEmailVerification from "./components/authentication/student/register/emailVerification/index";
import TeacherEmailVerification from "./components/authentication/teacher/register/emailVerification/index";
import StudentCourse from "./components/student/course/index";
import Iframe from "./components/student/course/iframe/index";
import TeacherModule from "./components/teacher/course/module/index";
import TeacherChapter from "./components/teacher/course/iframe/index";
import TeacherOnboarding from "./components/newAdmin/teacherOnboarding/index";
import CourseUpdate from "./components/teacher/updateCourse/index";
import AdminProfile from "./components/newAdmin/adminProfile/index";
import StudentOnboarding from "./components/newAdmin/studentOnboarding/index";
import TeacherEvalution from "./components/teacher/evalution/index";
import AdminEvalution from "./components/newAdmin/evalution/index";
import TeacherCreateTest from "./components/teacher/evalution/CreateTest/index";
import TeacherCreateSubjectiveTest from "./components/teacher/evalution/SubjectiveTest/CreateTest";
import TeacherAssignTestToBatch from "./components/teacher/evalution/AssignBatch/index";
import AdminAssignTestToBatch from "./components/newAdmin/evalution/AssignBatch/index";
import TeacherEditTest from "./components/teacher/evalution/AssignBatch/EditTest/index";
import Batch from "./components/teacher/batchTeacher/index";
import BatchDetails from "./components/teacher/batchTeacher/BatchDetails/index";
import Fee from "./components/student/fee/index";
import FeeDetails from "./components/student/fee/details/index";
import StudentEvalution from "./components/student/evalution/index";
import StudentTestScreen from "./components/student/evalution/testScreen/index";
import StudentTestContentScreen from "./components/student/evalution/testContentScreen/index";
import StudentTestResult from "./components/student/evalution/testResult/index";
import TeacherLiveClass from "./components/teacher/liveClass/Call";
import StudentLiveClass from "./components/student/liveClass/Call";
import Message from "./components/student/paypalMessage/index";
import AdminCourses from "./components/newAdmin/course/index";
import AdminModule from "./components/newAdmin/course/module/index";
import AdminChapter from "./components/newAdmin/course/iframe/index";
import NewAdminDashboard from "./components/newAdmin/adminDashboard/index";
// import DashBoard from "./components/admin/dashboard/index";

import NewFeesStructure from "./components/teacher/batchTeacher/BatchDetails/AllFeeStructureTable/AddNewFeesStructure/index";

import EditFeesStructure from "./components/teacher/batchTeacher/BatchDetails/AllFeeStructureTable/EditFeesStructure/index";
import BatchStudentDetails from "./components/teacher/batchTeacher/BatchDetails/VeiwStudentDetailsInBatch/index";
import TeacherChatBox from "./components/teacher/chatbox/index";
import StudentChatBox from "./components/student/chatbox/index";
import TeacherEditSubjectiveTest from "./components/teacher/evalution/SubjectiveTest/ViewTest/EditTest/index";
import TeacherAssignSubjectiveTest from "./components/teacher/evalution/SubjectiveTest/ViewTest/index";
import TeacherCheckingSubjectiveTest from "./components/teacher/evalution/SubjectiveTest/ViewTest/CheckingTest/index";
const Routes = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [teacherShowModule, setTeacherShowModule] = useState(false);

  const showTeacherModule = () => {
    setTeacherShowModule(true);
  };

  let { auth } = props;
  const a = 5;

  const drawerTogglerHandel = () => {
    return setSideDrawerOpen(true);
  };

  const backdropClickHandler = () => {
    return setSideDrawerOpen(false);
  };

  let sideDrawer;
  let backdrop;
  if (sideDrawerOpen) {
    sideDrawer = <SideDrawerComponent role={auth} />;
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  let appSection;
  if (Object.keys(auth).length === 0) {
    appSection = (
      <Fragment>
        <Switch>
          {/* <Router history={useHistory}> */}
          <Route exact strict path="/" component={Login} />

          <Route exact strict path="/student/login" component={Login} />
          <Route exact strict path="/teacher/login" component={Login} />
          <Route exact strict path="/admin/login" component={Login} />
          <Route
            exact
            strict
            path="/student/login/otp/:contactNumber"
            component={SignInMobileNumber}
          />
          {/* <Route
            exact
            strict
            path="/student/signup/password"
            component={SignUpSetPassword}
          /> */}
          {/* <Route
            exact
            strict
            path="/student/signup/EmailOtp/:email"
            component={StudentEmailVerification}
          /> */}
          {/* <Route
            exact
            strict
            path="/student/signup/demography"
            component={RegisterDetails}
          /> */}
          <Route
            exact
            strict
            path="/forgotPassword"
            component={ForgotPassword}
          />
          {/* <Route
            exact
            strict
            path="/liveClasses"
            component={CourseListComponent}
          /> */}
          {/* <Route
            exact
            strict
            path="/teacher/register"
            component={RegistrationTeacher}
          /> */}
          <Route exact strict path="/teacher/login" component={LoginTeacher} />
          {/* <Route exact strict path="/admin/login" component={LoginAdmin} /> */}

          {/* <Route
            exact
            strict
            path="/teacher/signUp/EmailOtp/:email"
            component={TeacherEmailVerification}
          /> */}
          {/* <Route
            exact
            strict
            path="/teacher/signup/password"
            component={SignUpSetPasswordTeacher}
          /> */}
          {/* <Route
            exact
            strict
            path="/teacher/signup/otp/:contactNumber"
            component={SignUpOTPTeacher}
          /> */}

          <Route
            exact
            strict
            path="/resetPassword/:token"
            component={ResetPassword}
          />
          {/*  */}
          {/* <Route exact strict path="/teacher" component={TeacherHomePage} /> */}

          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  } else if (
    auth &&
    auth.loggedIn &&
    auth.currentRole &&
    auth.currentRole.code === 1
  ) {
    appSection = (
      <Fragment>
        <Container className="container-for-admin-and-teacher">
          <div className="sideNavbar-for-admin-and-teacher">
            <SideNavBar role={auth.currentRole.code} />
          </div>
          <div style={{marginLeft:"2%"}}>
          <Row >
            <Col md={{ span: "11", offset: "1" }} >
              <Switch>
                {/* if (auth.userMetaData.isFirstLogin) { */}

                <Route
                  exact
                  strict
                  path="/student/MyProfile"
                  component={MyProfile}
                />
                {/* Discussion Board */}
                {/* <Route
            exact
            strict
            path="/liveClasses/discussionBoard"
            component={DiscussionBoard}
          /> */}
                {/* ChangePassword */}
                <Route
                  exact
                  strict
                  path="/student/changePassword"
                  component={ChangePassword}
                />
                <Route
                  exact
                  strict
                  path="/student/evalution"
                  component={StudentEvalution}
                />
                <Route
                  exact
                  strict
                  path="/student/evalution/testScreen"
                  component={StudentTestScreen}
                />
                <Route
                  exact
                  strict
                  path="/student/evalution/testContentScreen"
                  component={StudentTestContentScreen}
                />
                <Route
                  exact
                  strict
                  path="/student/evalution/testResult"
                  component={StudentTestResult}
                />
                <Route
                  exact
                  strict
                  path="/student/shedule"
                  component={CourseScheduleStudent}
                />
                <Route
                  exact
                  strict
                  path="/student/messages"
                  render={() => <StudentChatBox code={auth.currentRole.code} />}
                />
                <Route
                  exact
                  path="/student/myCourses"
                  render={() => <StudentCourse code={auth.currentRole.code} />}
                // component={StudentCourse}
                />
                <Route
                  exact
                  path="/student/myCourses/modules/:id"
                  render={() => (
                    <StudentCourse code={auth.currentRole.code} module={true} />
                  )}
                // component={StudentCourse}
                />
                {/* Student Live class */}
                <Route
                  exact
                  strict
                  path="/student/liveclass"
                  component={StudentLiveClass}
                />
                <Route
                  exact
                  path="/student/myCourses/modules/chapter/:id"
                  render={() => (
                    <StudentCourse code={auth.currentRole.code} module={true} />
                  )}
                // component={Iframe}
                />
                <Route exact path="/student/fee" component={Fee} />
                <Route exact path="/student/fee/:id" component={FeeDetails} />
                <Route exact path="/fee/message" component={Message} />
                <Redirect to="/student/myCourses" />
                {/* // } */}
              </Switch>
            </Col>
          </Row>
          </div>
        </Container>
      </Fragment>
    );
  } else if (
    auth &&
    auth.loggedIn &&
    auth.currentRole &&
    auth.currentRole.code === 3
  ) {
    // if (
    //   auth.userMetaData &&
    //   auth.userMetaData.teacherInterview &&
    //   auth.userMetaData.teacherInterview.status === "APPROVED"
    // ) {
    appSection = (
      <Fragment>
        <Container className="container-for-admin-and-teacher">
          <div className="sideNavbar-for-admin-and-teacher">
            <SideNavBar
              role={auth.currentRole.code}
              teacherShowModule={teacherShowModule}
            />
          </div>
          <div style={{marginLeft:"2%"}}>
          <Row>
            <Col md={{ span: "11", offset: "1" }}>
              <Switch>
                <Route
                  exact
                  strict
                  path="/teacher/courses/createCourse"
                  component={CreateCourse}
                />

                <Route
                  exact
                  strict
                  path="/teacher/courses"
                  render={() => <TeacherCourses module={showTeacherModule} />}
                // component={TeacherCourses}
                />
                <Route
                  exact
                  strict
                  path="/teacher/changePassword"
                  component={ChangePassword}
                />

                {/* Batch  Batch 
                <Route
                  exact
                  strict
                  path="/batch"
                  component={Batch}
                />
                <Route
                  exact
                  strict
                  path="/batch/details"
                  component={BatchDetails}
                />

              <Route
                  exact
                  strict
                  path="/batch/feesstructure"
                  component={NewFeesStructure}
                /> */}
                {/* Evaluation */}
                <Route
                  exact
                  strict
                  path="/teacher/evalution"
                  component={TeacherEvalution}
                />
                {/* "/teacher/createTest" */}
                <Route
                  exact
                  strict
                  path="/teacher/evalution/createTest"
                  component={TeacherCreateTest}
                />
                <Route
                  exact
                  strict
                  path="/teacher/evalution/createSubjectiveTest"
                  component={TeacherCreateSubjectiveTest}
                />
                <Route
                  exact
                  strict
                  path="/teacher/evalution/editSubjectiveTest"
                  component={TeacherEditSubjectiveTest}
                />
                <Route
                  exact
                  strict
                  path="/teacher/evalution/assignSubjectiveTest"
                  component={TeacherAssignSubjectiveTest}
                />
                <Route
                  exact
                  strict
                  path="/teacher/evalution/checkingTest"
                  component={TeacherCheckingSubjectiveTest}
                />
                {/* TeacherEditTest*/}
                <Route
                  exact
                  strict
                  path="/teacher/evalution/editTest"
                  component={TeacherEditTest}
                />
                {/* /teacher/assignTest */}
                <Route
                  exact
                  strict
                  path="/teacher/evalution/assignTest"
                  component={TeacherAssignTestToBatch}
                />
                {/* Teacher Live class */}
                <Route
                  exact
                  strict
                  path="/teacher/liveclass"
                  component={TeacherLiveClass}
                />

                <Route
                  exact
                  strict
                  path="/teacher/schedule"
                  component={TeacherSchedule}
                />
                <Route
                  exact
                  strict
                  path="/teacher/messages"
                  render={() => <TeacherChatBox code={auth.currentRole.code} />}
                />
                {/* <Route
                  exact
                  strict
                  path="/teacher/createCourse"
                  component={CreateCourse}
                /> */}
                <Route
                  exact
                  strict
                  path="/teacher/profile"
                  component={TeacherProfile}
                />
                {/* <Route
                  exact
                  strict
                  path="/teacher/changePassword"
                  component={ChangePassword}
                /> */}

                {/* <Redirect to="/teacher/course" /> */}
                <Route
                  exact
                  path="/teacher/courses/modules/:id"
                  component={TeacherModule}
                />
                <Route
                  exact
                  path="/teacher/courses/modules/chapter/:id"
                  render={() => <TeacherChapter module={showTeacherModule} />}
                // component={TeacherChapter}
                />
                {/* {firstUrl.length > 2 ? (
                  <Redirect to={firstUrl} />
                ) : (
                  <Redirect to="/teacher/courses" />
                )} */}

                <Route
                  exact
                  path="/teacher/courses/courseUpdate"
                  component={CourseUpdate}
                />

                {/* <Redirect to={(auth.userMetaData.Teacher.isFirstLogin) ? "/teacher/changePassword " : "/teacher/courses"  }/> */}

                <Redirect to="/teacher/courses" />
              </Switch>
            </Col>
          </Row>
          </div>
        </Container>
      </Fragment>
    );
  } else if (
    auth &&
    auth.loggedIn &&
    auth.currentRole &&
    auth.currentRole.code === 2
  ) {
    // if (
    //   auth.userMetaData &&
    //   auth.userMetaData.teacherInterview &&
    //   auth.userMetaData.teacherInterview.status === "APPROVED"
    // ) {
    appSection = (
      <Fragment>
        <Container className="container-for-admin-and-teacher">
          <div className="sideNavbar-for-admin-and-teacher">
            <SideNavBar
              role={auth.currentRole.code}
              teacherShowModule={teacherShowModule}
            />
          </div>
          <div style={{marginLeft:"2%"}}>
          <Row>
            <Col md={{ span: "11", offset: "1" }}>
         

              
              <Switch>
                {/* Batch  Batch */}
                <Route exact strict path="/batch" component={Batch} />

                {/* /admin/dashboard */}

                <Route
                  exact
                  strict
                  path="/admin/dashboard"
                  component={NewAdminDashboard}
                />

                <Route
                  exact
                  strict
                  path="/batch/details"
                  component={BatchDetails}
                />

                <Route
                  exact
                  strict
                  path="/batch/details/students/viewdetails"
                  component={BatchStudentDetails}
                />

                <Route
                  exact
                  strict
                  path="/batch/feesstructure"
                  component={NewFeesStructure}
                />

                <Route
                  exact
                  strict
                  path="/batch/feesstructure/editFeesStructure"
                  component={EditFeesStructure}
                />
                <Route
                  exact
                  path="/admin/onboardingTeacher"
                  component={TeacherOnboarding}
                />
                <Route
                  exact
                  path="/admin/onboardingStudent"
                  component={StudentOnboarding}
                />
                <Route
                  exact
                  strict
                  path="/admin/evalution"
                  component={AdminEvalution}
                />
                <Route
                  exact
                  strict
                  path="/admin/schedule"
                  component={AdminSchedule}
                />
                <Route
                  exact
                  strict
                  path="/admin/evalution/assignTest"
                  component={AdminAssignTestToBatch}
                />
                <Route exact path="/admin/profile" component={AdminProfile} />
                <Route
                  exact
                  strict
                  path="/admin/courses"
                  render={() => <AdminCourses module={showTeacherModule} />}
                // component={TeacherCourses}
                />
                <Route
                  exact
                  path="/admin/Courses/modules/:id"
                  component={AdminModule}
                />
                <Route
                  exact
                  path="/admin/Courses/modules/chapter/:id"
                  render={() => <AdminChapter module={showTeacherModule} />}
                // component={TeacherChapter}
                />

                <Redirect to="/admin/onboardingTeacher" />
              </Switch>
             
            </Col>
          </Row>
          </div>
        </Container>
      </Fragment>
    );
  }
  // else if (
  //   _.get(auth, "userMetaData.teacherInterview.status") !== "PENDING" ||
  //   _.get(auth, "userMetaData.teacherInterview.status") !== "REJECTED"
  // ) {
  //   appSection = (
  //     <Fragment>
  //       <Switch>
  //         <Route exact strict path="/teacher" component={TeacherHomePage} />
  //         <Route
  //           exact
  //           strict
  //           path="/teacher/profile"
  //           component={TeacherProfile}
  //         />
  //         <Route
  //           exact
  //           strict
  //           path="/teacher/application"
  //           component={ApplyAsTeacher}
  //         />
  //         <Route
  //           exact
  //           strict
  //           path="/teacher/application/acknowledge"
  //           component={ApplyAsTeacherAchnowledgeMent}
  //         />
  //         <Redirect to="/teacher" />
  //       </Switch>
  //     </Fragment>
  //   );
  // } else {
  //   appSection = (
  //     <Fragment>
  //       <Switch>
  //         <Route exact strict path="/teacher" component={TeacherHomePage} />
  //         <Route
  //           exact
  //           strict
  //           path="/teacher/profile"
  //           component={TeacherProfile}
  //         />
  //         <Redirect to="/teacher" />
  //       </Switch>
  //     </Fragment>
  //   );
  // }
  // }
  // else if (auth && auth.loggedIn && auth.currentRole.code === 2) {
  //   appSection = (
  //     <Fragment>
  //       <Container className="container-for-admin-and-teacher">
  //         <div className="sideNavbar-for-admin-and-teacher">
  //           <SideNavBar role={auth.currentRole.code} />
  //         </div>
  //         <Row>
  //           <Col md={{ span: "10", offset: "2" }}>
  //             <Switch>
  {
    /* <Route
                  exact
                  strict
                  path="/admin/formRequest"
                  component={FormRequest}
                />
                <Route
                  exact
                  strict
                  path="/admin/formRequest/formView/:id"
                  component={FormView}
                />
                <Route
                  exact
                  strict
                  path="/admin/formStatus"
                  component={FormStatus}
                /> 
                 <Route
                  exact
                  strict
                  path="/admin/courseRequest"
                  component={CourseRequest}
                />
                <Route
                  exact
                  strict
                  path="/admin/courseStatus"
                  component={CourseStatus}
                />
                <Route
                  exact
                  strict
                  path="/admin/studentRegistered"
                  component={StudentRegistered}
                />
                <Route
                  exact
                  strict
                  path="/admin/paymentReceived"
                  component={PaymentReceived}
                />
                <Route
                  exact
                  strict
                  path="/admin/courseSchedule"
                  component={CourseSchedule}
                />
                <Route
                  exact
                  strict
                  path="/admin/courseRequest/courseView/:id"
                  component={CourseView}
                />
                <Route
                  exact
                  strict
                  path="/admin/changePassword"
                  component={ChangePassword}
                /> 
                <Route
                  exact
                  path="/admin/onboardingTeacher"
                  component={TeacherOnboarding}
                />
                <Route
                  exact
                  path="/admin/onboardingStudent"
                  component={StudentOnboarding}
                />
                <Route exact path="/admin/profile" component={AdminProfile} />
                <Redirect to="/admin/onboardingTeacher" />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  } */
  }

  return (
    <Router>
      <Header drawerClickHandler={drawerTogglerHandel} />
      {sideDrawer}
      {backdrop}
      <main id="main">{appSection}</main>
      {/* <Footer /> */}
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.user !== null,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Routes);
// export default Routes;
