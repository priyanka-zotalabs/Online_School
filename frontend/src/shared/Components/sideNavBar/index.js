import React, { Fragment } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import enhancer from "./enhancer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "22px",
    backgroundColor: "#0D1925",
    paddingTop: "5px",
    // color: "black",
    paddingLeft: "5px",
    color: "white",
    fontWeight: "bold",
    width: "100%",
  },
}));

const SideDrawer = (props) => {
  let {
    menuItems,
    navigateTOChapterPage,
    teacherMenuItems,
    getAllCourse,
  } = props;



  // console.log("sidenav index", props.teacherShowModule);
  const classes = useStyles();
  const teacher = (
    <div className="sidenav">
      {/* <Link to="/teacher/courses">
        <i className="fas fa-file-alt"></i>Courses
      </Link>
      <Link to="/teacher/schedule">
        <i className="far fa-calendar-check"></i>MySchedule
      </Link> */}
      {/*  */}
      {props.teacherShowModule ? (
        <div>
          <Link to="/teacher/courses"
           id="sidebarLink"
          style={{
            // fontSize:"18px",
            color:(props.location.pathname.includes("/teacher/courses") ||props.location.pathname.includes("/modules") )?"white":" ",
            backgroundColor:(props.location.pathname.includes("/teacher/courses")||props.location.pathname.includes("/modules") )?"#8499FF":""}}>
            <i className="fas fa-file-alt"></i>Courses
          </Link>
          <Accordion 
          
          style={{display:(props.location.pathname.includes("/modules"))?"block": "none",}}
          className={classes.heading}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading} style={{fontSize:"18px"}}>Modules</Typography>
            </AccordionSummary>
            {console.log("type of teacherMenuItems",typeof teacherMenuItems,teacherMenuItems)}
            {/* {console.log("type of teacherMenuItems",typeof teacherMenuItems)} */}
            {/* {teacherMenuItems.length > 0 && */}
            {teacherMenuItems &&
              teacherMenuItems.map((element) => (
                <div>
                  <AccordionDetails>
                    <Accordion className={classes.heading}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}
                        style={{fontSize:"15px"}}
                        >
                          {element.name}
                        </Typography>
                      </AccordionSummary>
                      {element.chapters.map((test) => (
                        <AccordionDetails>
                          <Typography className={classes.heading}>
                            <Link
                              to={`/teacher/courses/modules/chapter/${test._id}`}
                              id="sidebarLink"
                              style={{fontSize:"15px",
                                color:(props.location.pathname.includes(`/modules/chapter/${test._id}`))?"white":" ",
                                // backgroundColor:(props.location.pathname.includes(`/modules/chapter/${test._id}`))?"#8499FF":""
                              }}
                            >
                              {test.name}
                            </Link>
                          </Typography>
                        </AccordionDetails>
                      ))}
                    </Accordion>
                  </AccordionDetails>
                </div>
              ))}
          </Accordion>
          <Link to="/teacher/schedule"
           id="sidebarLink"
          style={{
            // fontSize:"18px",
            color:(props.location.pathname.includes("/schedule"))?"white":" ",
            backgroundColor:(props.location.pathname.includes("/schedule"))?"#8499FF":""}}>
            <i className="far fa-calendar-check"></i>My Schedule
          </Link>
          {/* <Link to="/batch">
            <i className="fas fa-file-alt"></i>Batch
          </Link> */}
          {/* /teacher/evalution */}
          <Link to="/teacher/evalution"
           id="sidebarLink"
          style={{
            // fontSize:"18px",
            color:(props.location.pathname.includes("/evalution")||props.location.pathname.includes("/createTest"))?"white":" ",
            backgroundColor:(props.location.pathname.includes("/evalution")||props.location.pathname.includes("/createTest"))?"#8499FF":""}}
            >
            <i className="fas fa-chalkboard"></i>Evaluation
          </Link>
          <Link to="/teacher/messages"
           id="sidebarLink"
                         style={{
                          color:(props.location.pathname.includes("/messages"))?"white":" ",
                          backgroundColor:(props.location.pathname.includes("/messages"))?"#8499FF":""}}          
          >
            <i className="far fa-comment-alt"></i>Messages
          </Link>
        </div>
      ) : (
          <div>
            <Link to="/student/myCourses"
             id="sidebarLink"
            style={{
              // fontSize:"18px",
              color:(props.location.pathname.includes("/myCourses"))?"white":" ",
              backgroundColor:(props.location.pathname.includes("/myCourses"))?"#8499FF":""}}
            
            >
              <i className="fas fa-file-alt"></i>Courses
          </Link>
            <Link to="/teacher/schedule"
             id="sidebarLink"
            style={{
              // fontSize:"18px",
              color:(props.location.pathname.includes("/schedule"))?"white":" ",
              backgroundColor:(props.location.pathname.includes("/schedule"))?"#8499FF":""}}
            >
              <i className="far fa-calendar-check"></i>My Schedule
          </Link>
            {/* <Link to="/batch">
              <i className="fas fa-file-alt"></i>Batch
          </Link> */}
            {/* /teacher/evalution */}
            <Link to="/teacher/evalution"
            
            id="sidebarLink"
            style={{
              // fontSize:"18px",
              color:(props.location.pathname.includes("/evalution"))?"white":" ",
              backgroundColor:(props.location.pathname.includes("/evalution"))?"#8499FF":""}}
            >
              <i className="fas fa-chalkboard"></i>Evaluation
          </Link>
          <Link to="/teacher/messages"
           id="sidebarLink"
          style={{
            // fontSize:"18px",
            color:(props.location.pathname.includes("/messages"))?"white":" ",
            backgroundColor:(props.location.pathname.includes("/messages"))?"#8499FF":""}}
          
          
          >
            <i className="far fa-comment-alt"></i>Messages
          </Link>
          </div>
        )}
    </div>
  );

  const admin = (
    <div className="sidenav">
      {/* <Link to="/admin/formRequest">
        <i className="fas fa-file-alt"></i>Form Request
      </Link>
      <Link to="/admin/formStatus">
        <i className="fas fa-file-alt"></i>Form Status
      </Link> 
      <Link to="/admin/courseRequest">
        <i className="fab fa-delicious"></i>Course Request
      </Link>
      <Link to="/admin/courseStatus">
        <i className="far fa-calendar-check"></i>Course Status
      </Link>
      <Link to="/admin/courseSchedule">
        <i className="far fa-calendar-check"></i>Course Schedule
      </Link>
      <Link to="/admin/studentRegistered">
        <i class="fas fa-user-graduate"></i>Student Registered
      </Link>
      <Link to="/admin/paymentReceived">
        <i class="fas fa-hand-holding-usd"></i>Payment Received
      </Link>*/}
      <Link to="/admin/dashboard" 
       id="sidebarLink"
      style={{
        // fontSize:"18px",
        color:(props.location.pathname.includes("/dashboard"))?"white":" ",
        backgroundColor:(props.location.pathname.includes("/dashboard"))?"#8499FF":""}}>
        <i class="fas fa-chalkboard-teacher"></i>Dashboard
      </Link>
      <Link to="/admin/courses" 
       id="sidebarLink"
      
      style={{
        // fontSize:"18px",
        color:(props.location.pathname.includes("/courses")||props.location.pathname.includes("/modules") )?"white":" ",
        backgroundColor:(props.location.pathname.includes("/courses")||props.location.pathname.includes("/modules") )?"#8499FF":""}}

      // style={state.active === 'http://localhost:3000/admin/courses' ? activeStyle : {}} 
      
      // onClick={(e)=>handleBGColor(e)}
      >
        <i class="fas fa-chalkboard-teacher"></i>Course
      </Link>
      <Link to="/admin/onboardingTeacher"
       id="sidebarLink"
      style={{
        // fontSize:"18px",
        color:(props.location.pathname.includes("/onboardingTeacher"))?"white":" ",
        backgroundColor:(props.location.pathname.includes("/onboardingTeacher"))?"#8499FF":""}}
      
      >
        <i class="fas fa-chalkboard-teacher"></i>Teacher
      </Link>
      <Link to="/admin/onboardingStudent"
       id="sidebarLink"
      style={{
        // fontSize:"18px",
        color:(props.location.pathname.includes("/onboardingStudent"))?"white":" ",
        backgroundColor:(props.location.pathname.includes("/onboardingStudent"))?"#8499FF":""}}
      >
        <i class="fas fa-graduation-cap"></i>Student
      </Link>
      <Link to="/batch"
       id="sidebarLink"
      style={{
        // fontSize:"18px",
        color:(props.location.pathname.includes("/batch"))?"white":" ",
        // backgroundColor:(props.location.pathname.includes("/batch"))?"#8499FF":""}}
        backgroundColor:(props.location.pathname.includes("/batch"))?"#8499FF":""}}

      >
      <i class="fas fa-users"></i>Batch
      </Link>
      <Link to="/admin/schedule"
       id="sidebarLink"
         style={{
          //  fontSize:"18px",
          color:(props.location.pathname.includes("/schedule"))?"white":" ",
          backgroundColor:(props.location.pathname.includes("/schedule"))?"#8499FF":""}}
      >
        <i className="far fa-calendar-check"></i>My Schedule
          </Link>
      <Link to="/admin/evalution"
       id="sidebarLink"
      style={{
        // fontSize:"18px",
        color:(props.location.pathname.includes("/evalution"))?"white":" ",
        backgroundColor:(props.location.pathname.includes("/evalution"))?"#8499FF":""}}
      >
        <i className="fas fa-chalkboard"></i>Evaluation
      </Link>
    </div>
  );
  const student = (
    <div className="sidenav">
      {props.module ? (
        <div>
          <Link to="/student/myCourses" 
           id="sidebarLink"
                style={{
                  // fontSize:"18px",
                  color:(props.location.pathname.includes("/myCourses"))?"white":" ",
                  backgroundColor:(props.location.pathname.includes("/myCourses"))?"#8499FF":""}}
          onClick={(e) => getAllCourse(e)}>
            <i className="fas fa-file-alt"></i>My Courses
          </Link>
          <Accordion className={classes.heading} style={{backgroundColor:"#0D1925"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{backgroundColor:"#0D1925"}}
            >
              <Typography className={classes.heading} style={{color:"white",fontSize:"18px"}}>Modules</Typography>
            </AccordionSummary
            >
            {menuItems &&
              menuItems.length > 0 &&
              menuItems.map((element) => (
                <div>
                  <AccordionDetails
                  style={{backgroundColor:"#0D1925"}}
                  >
                    <Accordion className={classes.heading}
                    style={{backgroundColor:"#0D1925"}}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{backgroundColor:"#0D1925"}}
                      >
                        <Typography className={classes.heading} style={{color:"white",fontSize:"15px",}}
                        >
                          {element.name}
                        </Typography>
                      </AccordionSummary>
                      {element.chapters.map((test) => (
                        <AccordionDetails>
                          <Typography className={classes.heading}>
                            <Link
                              to={`/student/myCourses/modules/chapter/${test._id}`}
                                id="sidebarLink"
                              style={{
                                // fontSize:"18px",
                                color:"white",
                                fontSize:"15px",
                                color:(props.location.pathname.includes("/myCourses/modules/chapter"))?"white":" ",
                                // backgroundColor:(props.location.pathname.includes("/myCourses/modules/chapter"))?"#8499FF":""
                              }}
                            >
                              {test.name}
                            </Link>
                          </Typography>
                        </AccordionDetails>
                      ))}
                    </Accordion>
                  </AccordionDetails>
                </div>
              ))}
          </Accordion>
          <Link to="/student/shedule"
           id="sidebarLink"
          style={{
            // fontSize:"18px",
            color:(props.location.pathname.includes("/shedule"))?"white":" ",
            backgroundColor:(props.location.pathname.includes("/shedule"))?"#8499FF":""}}
          >
            <i className="far fa-calendar-check"></i>My Schedule
          </Link>

          {/* <Link to="/student/fee"
          
          style={{
            color:(props.location.pathname.includes("/fee"))?"white":" ",
            backgroundColor:(props.location.pathname.includes("/fee"))?"#8499FF":""}}
          >
            <i class="fas fa-money-check-alt"></i>Fee
          </Link> */}
          <Link to="/student/evalution"
           id="sidebarLink"
                 style={{
                  //  fontSize:"18px",
                  color:(props.location.pathname.includes("/evalution"))?"white":" ",
                  backgroundColor:(props.location.pathname.includes("/evalution"))?"#8499FF":""}}
          >
            <i className="fas fa-chalkboard"></i>Evaluation
          </Link>
          <Link to="/student/messages"
           id="sidebarLink"
           style={{
            //  fontSize:"18px",
            color:(props.location.pathname.includes("/messages"))?"white":" ",
            backgroundColor:(props.location.pathname.includes("/messages"))?"#8499FF":""}}
          >
            <i className="far fa-comment-alt"></i>Messages
          </Link>
        </div>
      ) : (
          <div>
            <Link to="/student/myCourses" 
             id="sidebarLink"
            style={{
              // fontSize:"18px",
              color:(props.location.pathname.includes("/myCourses"))?"white":" ",
              backgroundColor:(props.location.pathname.includes("/myCourses"))?"#8499FF":""}}
            
            onClick={(e) => getAllCourse(e)}>
              <i className="fas fa-file-alt"></i>My Courses
          </Link>
            <Link to="/student/shedule"
             id="sidebarLink"
            style={{
              // fontSize:"18px",
              color:(props.location.pathname.includes("/shedule"))?"white":" ",
              backgroundColor:(props.location.pathname.includes("/shedule"))?"#8499FF":""}}
            >
              <i className="far fa-calendar-check"></i>My Schedule
          </Link>

            {/* <Link to="/student/fee"
            
            
            style={{
              color:(props.location.pathname.includes("/fee"))?"white":" ",
              backgroundColor:(props.location.pathname.includes("/fee"))?"#8499FF":""}}
            >
              <i class="fas fa-money-check-alt"></i>Fee
          </Link> */}
            <Link to="/student/evalution"
            
            id="sidebarLink"
            style={{
              // fontSize:"18px",
              color:(props.location.pathname.includes("/evalution"))?"white":" ",
              backgroundColor:(props.location.pathname.includes("/evalution"))?"#8499FF":""}}
            >
              <i className="fas fa-chalkboard"></i>Evaluation
          </Link>
          <Link to="/student/messages"
           id="sidebarLink"
          style={{
            // fontSize:"18px",
            color:(props.location.pathname.includes("/messages"))?"white":" ",
            backgroundColor:(props.location.pathname.includes("/messages"))?"#8499FF":""}}
          >
            <i className="far fa-comment-alt"></i>Messages
          </Link>
          </div>
        )}
    </div>
  );
  if (props.role == 3) {
    return teacher;
  } else if (props.role == 2) {
    return admin;
  } else if (props.role == 1) {
    return student;
  }
  // return props.role == 3 ? teacher : admin;
};

export default enhancer(SideDrawer);
//
// import React, { Fragment } from "react";
// import "./style.scss";
// import { Link } from "react-router-dom";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { makeStyles } from "@material-ui/core/styles";
// import enhancer from "./enhancer";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   heading: {
//     fontSize: "22px",
//     backgroundColor: "#008ccb",
//     color: "white",
//     paddingLeft: "5px",
//   },
// }));

// const SideDrawer = (props) => {
//   let { menuItems, navigateTOChapterPage, teacherMenuItems } = props;
//   // console.log("sidenav index", props.teacherShowModule);
//   const classes = useStyles();
//   const teacher = (
//     <div className="sidenav">
//       {/* <Link to="/teacher/courses">
//         <i className="fas fa-file-alt"></i>Courses
//       </Link>
//       <Link to="/teacher/schedule">
//         <i className="far fa-calendar-check"></i>MySchedule
//       </Link> */}
//       {props.teacherShowModule ? (
//         <div>
//           <Link to="/teacher/courses">
//             <i className="fas fa-file-alt"></i>Courses
//           </Link>
//           <Accordion className={classes.heading}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1a-content"
//               id="panel1a-header"
//             >
//               <Typography className={classes.heading}>Modules</Typography>
//             </AccordionSummary>
//             {teacherMenuItems.length > 0 &&
//               teacherMenuItems.map((element) => (
//                 <div>
//                   <AccordionDetails>
//                     <Accordion className={classes.heading}>
//                       <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                       >
//                         <Typography className={classes.heading}>
//                           {element.name}
//                         </Typography>
//                       </AccordionSummary>
//                       {element.chapters.map((test) => (
//                         <AccordionDetails>
//                           <Typography
//                           // className={classes.heading}
//                           >
//                             <Link
//                               to={`/teacher/myCourses/modules/chapter/${test._id}`}
//                             >
//                               {test.name}
//                             </Link>
//                           </Typography>
//                         </AccordionDetails>
//                       ))}
//                     </Accordion>
//                   </AccordionDetails>
//                 </div>
//               ))}
//           </Accordion>
//           <Link to="/teacher/schedule">
//             <i className="far fa-calendar-check"></i>MySchedule
//           </Link>
//         </div>
//       ) : (
//         <div>
//           <Link to="/student/myCourses">
//             <i className="fas fa-file-alt"></i>Courses
//           </Link>
//           <Link to="/teacher/schedule">
//             <i className="far fa-calendar-check"></i>MySchedule
//           </Link>
//         </div>
//       )}
//     </div>
//   );

//   const admin = (
//     <div className="sidenav">
//       {/* <Link to="/admin/formRequest">
//         <i className="fas fa-file-alt"></i>Form Request
//       </Link>
//       <Link to="/admin/formStatus">
//         <i className="fas fa-file-alt"></i>Form Status
//       </Link> */}
//       <Link to="/admin/courseRequest">
//         <i className="fab fa-delicious"></i>Course Request
//       </Link>
//       <Link to="/admin/courseStatus">
//         <i className="far fa-calendar-check"></i>Course Status
//       </Link>
//       <Link to="/admin/courseSchedule">
//         <i className="far fa-calendar-check"></i>Course Schedule
//       </Link>
//       <Link to="/admin/studentRegistered">
//         <i class="fas fa-user-graduate"></i>Student Registered
//       </Link>
//       <Link to="/admin/paymentReceived">
//         <i class="fas fa-hand-holding-usd"></i>Payment Received
//       </Link>
//     </div>
//   );
//   const student = (
//     <div className="sidenav">
//       {props.module ? (
//         <div>
//           <Link to="/student/myCourses">
//             <i className="fas fa-file-alt"></i>Courses
//           </Link>
//           <Accordion className={classes.heading}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1a-content"
//               id="panel1a-header"
//             >
//               <Typography className={classes.heading}>Modules</Typography>
//             </AccordionSummary>
//             {menuItems.length > 0 &&
//               menuItems.map((element) => (
//                 <div>
//                   <AccordionDetails>
//                     <Accordion className={classes.heading}>
//                       <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                       >
//                         <Typography className={classes.heading}>
//                           {element.name}
//                         </Typography>
//                       </AccordionSummary>
//                       {element.chapters.map((test) => (
//                         <AccordionDetails>
//                           <Typography
//                           // className={classes.heading}
//                           >
//                             <Link
//                               to={`/student/myCourses/modules/chapter/${test._id}`}
//                             >
//                               {test.name}
//                             </Link>
//                           </Typography>
//                         </AccordionDetails>
//                       ))}
//                     </Accordion>
//                   </AccordionDetails>
//                 </div>
//               ))}
//           </Accordion>
//         </div>
//       ) : (
//         <Link to="/student/myCourses">
//           <i className="fas fa-file-alt"></i>Courses
//         </Link>
//       )}
//     </div>
//   );
//   if (props.role == 3) {
//     return teacher;
//   } else if (props.role == 2) {
//     return admin;
//   } else if (props.role == 1) {
//     return student;
//   }
//   // return props.role == 3 ? teacher : admin;
// };

// export default enhancer(SideDrawer);
