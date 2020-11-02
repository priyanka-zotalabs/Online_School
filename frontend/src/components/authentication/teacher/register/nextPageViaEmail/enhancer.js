import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validate } from "../../../../../shared/helpers/formValidation";
import { toast } from "react-toastify";
import passwordFormInit from "./passwordForm";
export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,
  (SignUpViaMobileNumberComponent) => ({ setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    let [passwordForm, setPasswordForm] = useState(passwordFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUpChange = (e) => {
      if (formIsValid) {
        setError(null);
        signUp();
      } else {
        setError("Please enter all fields.");
      }
    };

    const signUp = () => {
      let params = {
        name: passwordForm.name.value,
        password: passwordForm.password.value,
        confirmPassword: passwordForm.confirmPassword.value,
      };
      setLoader(true);
      axios
        .post(`${appConfig.host}${urls.teacherRegisterDetails}`, params)
        .then((success) => {
          setLoader(false);
          setAuthUser(success.data.data);
          props.history.push("/teacher/courses");
        })
        .catch((error) => {
          setLoader(false);
          setError(error);
        });
    };
    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...passwordForm,
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
      setPasswordForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...passwordForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setPasswordForm({ ...updatedForm });
    };

    return (
      <SignUpViaMobileNumberComponent
        {...props}
        {...{
          handleSignUpChange,
          loader,
          inputBlurHandler,
          inputChangeHandler,
          passwordForm,
          formIsValid,
          error,
        }}
      />
    );
  }
);

export default enhancer;
