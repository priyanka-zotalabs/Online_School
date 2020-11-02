import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export let enhancer = compose(
  connect(
    ({ auth, teacherCourse }) => ({ auth, teacherCourse }),
  ),
  withRouter,
  (ScheduleModal) => ({
    auth,
    teacherCourse,
    history,
    ...props
  }) => {
    let [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <ScheduleModal
        {...props}
        {...{
          handleClose,
          handleShow,
          show,
        }}
      />
    );
  }
);
export default enhancer;