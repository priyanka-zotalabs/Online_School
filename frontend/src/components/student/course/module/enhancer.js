import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { withRouter } from "react-router";

export let enhancer = compose(
  connect(
    ({ course, courseModule, studentCurrentCourse }) => ({
      course,
      courseModule,
      studentCurrentCourse,
    }),
    (dispatch) => ({
      setCourseModule: (params) => dispatch({ type: "ADD_MODULE", params }),
      setStudentCurrentCourse: (params) =>
        dispatch({ type: "ADD_STUDENT_CURRENT_COURSE", params }),
    })
  ),
  withRouter,
  (MyCourseModule) => ({
    course,
    setCourseModule,
    courseModule,
    setStudentCurrentCourse,
    studentCurrentCourse,
    ...props
  }) => {
    let { id } = props.match.params;
    let [data, setData] = useState();
    const [loader, setLoader] = useState(true);
    // console.log("id", id);
    useEffect(() => {
      let ldata = course.filter(function (test) {
        // console.log("loop", test);
        return test._id === id;
      });
      setCourseModule(ldata[0].modules);
      setStudentCurrentCourse(ldata[0]);
      setData(ldata[0].modules);
      setLoader(false);
    }, [course]);

    const navigateTOChapterPage = (e, rowData) => {
      // console.log("modulesRow", rowData.chapters);
      props.history.push(
        `/student/myCourses/modules/chapter/${rowData.chapters[0]._id}`
      );
    };

    return (
      <MyCourseModule
        {...props}
        {...{
          data,
          navigateTOChapterPage,
          loader,
        }}
      />
    );
  }
);

export default enhancer;
