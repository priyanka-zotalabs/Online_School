import { compose } from "redux";
import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import moment from "moment";

export let enhancer = compose(
  connect(({ auth, course }) => ({ auth, course })),
  withRouter,
  (MyCourse) => ({ course, setAuthUser, ...props }) => {
    const [loader, setLoader] = useState(false);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //   getCourses();
    // }, []);

    // const getCourses = () => {
    //   setLoader(true);
    //   axios
    //     .get(`${appConfig.host}${urls.teacherCourses}`)
    //     .then((success) => {
    //       setLoader(false);
    //       // setFormRequest(success.data.data)
    //       let lRows = [];
    //       success.data.data.forEach((one) => {
    //         let tempFormData = {
    //           date: moment(one.createdAt).format("DD MMM, YYYY"),
    //           courseName: one.name,
    //           status: one.status,
    //           _id: one._id,
    //         };
    //         lRows.push(tempFormData);
    //       });
    //       setRows(lRows);
    //     })
    //     .catch((error) => {
    //       setLoader(false);
    //       setError(error);
    //     });
    // };
    const navigateTOModulePage = (e, rowData) => {
      // console.log("card click", rowData);
      props.history.push(`/student/myCourses/modules/${rowData._id}`);
    };

    return (
      <MyCourse
        {...props}
        {...{
          navigateTOModulePage,
          rows,
          loader,
          course,
        }}
      />
    );
  }
);

export default enhancer;
