import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { withRouter } from "react-router";

export let enhancer = compose(
  connect(
    ({ teacherCourse, teacherModule, teacherCurrentCourse }) => ({
      teacherCourse,
      teacherModule,
      teacherCurrentCourse,
    }),
    (dispatch) => ({
      setAddCourseModule: (params) =>
        dispatch({ type: "ADD_TEACHER_MODULE", params }),
      setTeachetCurrentCourse: (params) =>
        dispatch({ type: "ADD_TEACHER_CURRENT_COURSE", params }),
    })
  ),
  withRouter,
  (MyCourseModule) => ({
    teacherCourse,
    setAddCourseModule,
    setTeachetCurrentCourse,
    teacherCurrentCourse,
    teacherModule,
    ...props
  }) => {
    let { id } = props.match.params;
    let [data, setData] = useState("");

    useEffect(() => {
      let ldata = teacherCourse.filter(function (test) {
        return test._id === id;
      });
      setAddCourseModule(ldata[0].modules);
      setTeachetCurrentCourse(ldata[0]);
      setData(ldata[0].modules);
    }, [teacherCourse]);

    const navigateTOChapterPage = (e, rowData) => {
      // console.log("modulesRow", props.modules);
      props.history.push(
        `/teacher/courses/modules/chapter/${rowData.chapters[0]._id}`
      );
    };

    return (
      <MyCourseModule
        {...props}
        {...{
          data,
          navigateTOChapterPage,
          teacherCurrentCourse,
        }}
      />
    );
  }
);

export default enhancer;
