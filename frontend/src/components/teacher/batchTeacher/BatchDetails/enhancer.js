import { compose } from "redux";
import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { urls } from "../../../../url";
// import { appConfig } from "../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import addNewBatchFormInit from "./addNewBatchForm";
// import { validate } from "../../../../shared/helpers/formValidation";
// import { toast } from "react-toastify";

export let enhancer = compose(
  connect(({ auth, teacherCourse }) => ({ auth, teacherCourse })),
  withRouter,
  (BatchDetails) => ({
    auth,

    ...props
  }) => {
    return (
      <BatchDetails
        {...props}
        {...{
          auth,
        }}
      />
    );
  }
);

export default enhancer;
