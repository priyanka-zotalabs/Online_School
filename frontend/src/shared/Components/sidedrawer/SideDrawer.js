import React, { Fragment } from "react";
import _ from "lodash";
import "./SideDrawer.scss";
import { Link } from "react-router-dom";

const sideDrawer = (props) => {
  const student = (
    <nav className="side-drawer">
      <ul>
        <li>
          <a href="/">
            <i class="fas fa-home"></i>
            Home
          </a>
        </li>
        {/* <li>
          <a href="/">
            <i class="fas fa-clipboard"></i>
            Free Courses
          </a>
        </li> */}
        <li>
          <a href="/">
            <i class="fas fa-headset"></i>
            Live Classes
          </a>
        </li>
      </ul>
    </nav>
  );

  const teacher = (
    <div className="mobile-sidenav">
      <a href="/teacher/courses">
        <i className="fas fa-file-alt"></i>Courses
      </a>
      <a href="/teacher/schedule">
        <i className="far fa-calendar-check"></i>MySchedule
      </a>
    </div>
  );

  const admin = (
    <div className="mobile-sidenav">
      {/* <a href="/admin/formRequest">
        <i className="fas fa-file-alt"></i>Form Request
      </a>
      <a href="/admin/formStatus">
        <i className="fas fa-file-alt"></i>Form Status
      </a> */}
      <a href="/admin/courseRequest">
        <i className="fab fa-delicious"></i>Course Request
      </a>
      <a href="/admin/courseStatus">
        <i className="far fa-calendar-check"></i>Course Status
      </a>
      <a href="/admin/courseSchedule">
        <i className="far fa-calendar-check"></i>Course Schedule
      </a>
      <a href="/admin/studentRegistered">
        <i class="fas fa-user-graduate"></i>Student Registered
      </a>
      <a href="/admin/paymentReceived">
        <i class="fas fa-hand-holding-usd"></i>Payment Received
      </a>
    </div>
  );
console.log("Side Drawer ",props);
  if (props.role && props.role.roleId && props.role.roleId.code == 3) {
    if (
      _.get(props, "role.userMetaData.teacherInterview.status") == "APPROVED"
    ) {
      return teacher;
    } else {
      return "";
    }
  } else if (props.role && props.role.roleId && props.role.roleId.code == 2) {
    return admin;
  } else {
    return student;
  }
};

export default sideDrawer;
