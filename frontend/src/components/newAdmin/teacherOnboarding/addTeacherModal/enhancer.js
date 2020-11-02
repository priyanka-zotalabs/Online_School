import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import moment from "moment";
import { validate } from "../../../../shared/helpers/formValidation";
import addTeacherModalForm from "./addTeacherModalForm";
import { toast } from "react-toastify";

export let enhancer = compose(
  withRouter,
  (AddTeacherModalComponent) => ({ ...props }) => {
    let [teacherModalForm, setTeacherModalForm] = useState(addTeacherModalForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);



    const colseModal=()=>{
      props.onHide();
    }
    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...teacherModalForm,
      };
      const updatedFormElement = {
        ...updatedForm[inputIdentifier],
      };
      let validationResult = true;
      let helperText;
      updatedFormElement.value = event.target.value;
      for (const key in updatedFormElement.validation) {
        validationResult = validate(
          key,
          updatedFormElement.validation[key].value,
          event.target.value
        );

        if (!validationResult) {
          helperText = updatedFormElement.validation[key].errMsg;
          break;
        }
      }
      updatedFormElement.invalid = !validationResult;
      updatedFormElement.helperText = helperText;
      updatedForm[inputIdentifier] = updatedFormElement;

      let tempFormIsValid = true;
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid;
      }
      setFormIsValid(tempFormIsValid);
      setTeacherModalForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...teacherModalForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setTeacherModalForm({ ...updatedForm });
    };

    const handleSendTeacherData = () => {
      if (formIsValid) {
        setError(null);
        let params = {
          name: teacherModalForm.teacherName.value,
          email: teacherModalForm.teacherEmail.value,
          contactNumber: teacherModalForm.teacherPhoneNumber.value,
        };
        axios
          .post(`${appConfig.host}${urls.addTeacher}`, params)
          .then((success) => {
            toast.success("Teacher Added successfully");
            props.onChildClick();
            props.onHide();


          })
          .catch((error) => {
            toast.error(error);
          });
      } else {
        setError("please Enter all the fields.");
      }
    };

    console.log("teacher modal form : ", teacherModalForm);

    return (
      <AddTeacherModalComponent
        {...props}
        {...{
          teacherModalForm,
          inputBlurHandler,
          inputChangeHandler,
          handleSendTeacherData,
          error,
          colseModal
        }}
      />
    );
  }
);

export default enhancer;
