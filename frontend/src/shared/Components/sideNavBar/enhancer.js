import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";

export let enhancer = compose(
  connect(
    ({ courseModule, teacherModule, course, teacherCourse, auth }) => ({
      courseModule,
      teacherModule,
      course,
      teacherCourse,
      auth,
    }),
    (dispatch) => ({
      setCourse: (params) => dispatch({ type: "ADD_COURSE", params }),
      setTeacherCourse: (params) =>
        dispatch({ type: "ADD_TEACHER_COURSE", params }),
    })
  ),
  withRouter,
  (SideDrawer) => ({
    courseModule,
    teacherModule,
    setCourse,
    teacherCourse,
    setTeacherCourse,
    auth,
    ...props
  }) => {
    const [menuItems, setMenuItems] = useState();
    const [teacherMenuItems, setTeacherMenuItems] = useState();
    useEffect(() => {
      setMenuItems(courseModule);
      setTeacherMenuItems(teacherModule);
    }, [courseModule, teacherModule]);

    const navigateTOChapterPage = (e, rowData) => {
      props.history.push(`/student/myCourses/modules/chapter/${rowData._id}`);
    };
    // console.log(auth, auth.loggedIn, auth.currentRole, auth.currentRole.code);
    useEffect(() => {
      if (
        auth &&
        auth.loggedIn &&
        auth.currentRole &&
        auth.currentRole.code === 1
      ) {
        console.log("student login all course run");
        getAllCourse();
      } else if (
        auth &&
        auth.loggedIn &&
        auth.currentRole &&
        auth.currentRole.code === 3
      ) {
        console.log("Teacher login all course run");
        getAllTeacherCourse();
      }
    }, []);

    const getAllCourse = (e) => {
      axios
        .get(`${appConfig.host}${urls.singleStudentCourse}`)
        .then((board) => {
          setCourse(board.data.data);
        })
        .catch((error) => {
          console.log("student api error", error);
        });
    };

    const getAllTeacherCourse = (e) => {
      axios
        .get(`${appConfig.host}${urls.teacherAllCourse}`)
        .then((board) => {
          setTeacherCourse(board.data.data);
        })
        .catch((error) => {
          console.log("Teacher api error", error);
        });
    };
    return (
      <SideDrawer
        {...props}
        {...{
          menuItems,
          navigateTOChapterPage,
          teacherMenuItems,
          getAllCourse,
        }}
      />
    );
  }
);

export default enhancer;
