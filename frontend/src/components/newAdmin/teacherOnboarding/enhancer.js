import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import moment from "moment";

export let enhancer = compose(
  withRouter,
  (TeacherOnboardingComponent) => ({ ...props }) => {
    const [addTeacherModalShow, setAddTeacherModalShow] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
      getAllTeachers();
    }, []);
    function clickAlert() {
      console.log("Is this function called");
      getAllTeachers();
    }
    const getAllTeachers = () => {
      axios
        .get(`${appConfig.host}${urls.getTeacher}`)
        .then((success) => {
          console.log("data for all teachers : ", success.data.data);
          setData(success.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleAddTeacherModal = () => {
      setAddTeacherModalShow(true);
    };

    const handleCloseModal = () => {
      setAddTeacherModalShow(false);
    };

    console.log("Data for students : ", data);

    return (
      <TeacherOnboardingComponent
        {...props}
        {...{
          addTeacherModalShow,
          handleAddTeacherModal,
          handleCloseModal,
          data,
          clickAlert
        }}
      />
    );
  }
);

export default enhancer;
