import { compose } from "redux";
import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";

export let enhancer = compose(
  connect(
    ({ auth, teacherCourse, teacherCurrentCourse }) => ({
      auth,
      teacherCourse,
      teacherCurrentCourse,
    }),
    (dispatch) => ({
      setTeacherCourse: (params) =>
        dispatch({ type: "ADD_TEACHER_COURSE", params }),
      setTeachetCurrentCourse: (params) =>
        dispatch({ type: "ADD_TEACHER_CURRENT_COURSE", params }),
    })
  ),
  withRouter,
  (LoginComponent) => ({
    setAuthUser,
    setTeacherCourse,
    teacherCourse,
    teacherCurrentCourse,
    setTeachetCurrentCourse,
    ...props
  }) => {
    const [loader, setLoader] = useState(true);
    const [rows, setRows] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [courseId, setCourseId] = useState("");

    useEffect(() => {
      getAllCourse();
    }, []);

    const getAllCourse = (e) => {
      setLoader(true);
      axios
        .get(`${appConfig.host}${urls.teacherAllCourse}`)
        .then((board) => {
          console.log("techer data", board.data.data);
          setTeacherCourse(board.data.data);
          setLoader(false);
        })
        .catch((error) => {
          console.log("error teacher course", error);
          setLoader(false);
        });
    };

    const navigateTOModulePage = (e, rowData) => {
      // console.log("card click", props.module);
      props.module();
      props.history.push(`/teacher/courses/modules/${rowData._id}`);
    };

    const handleAddCourse = (e) => {
      props.history.push("/teacher/courses/createCourse");
    };

    const handleUpdateCourse = (id) => {
      let ldata = teacherCourse.filter(function (test) {
        return test._id === id;
      });
      setTeachetCurrentCourse(ldata[0]);
      props.history.push("/teacher/courses/courseUpdate");
    };

    const handleModalShow = (id) => {
      // console.log("id", id);
      setCourseId(id);
      setModalShow(true);
    };

    const handleModalClose = () => {
      setModalShow(false);
    };

    const handleDelete = () => {
      // console.log("delete", courseId);
      axios
        .delete(`${appConfig.host}${urls.deleteCourse}?courseId=${courseId}`)
        .then((result) => {
          getAllCourse();
        })
        .catch((error) => {});
      handleModalClose();
    };

    return (
      <LoginComponent
        {...props}
        {...{
          handleAddCourse,
          rows,
          loader,
          teacherCourse,
          navigateTOModulePage,
          handleModalShow,
          modalShow,
          handleModalClose,

          handleDelete,
          handleUpdateCourse,
        }}
      />
    );
  }
);

export default enhancer;
