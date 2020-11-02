import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import forgotPasswordFormInit from "./forgotPasswordForm";
import { validate } from "../../../shared/helpers/formValidation";

export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,
  (ForgotPasswordComponent) => ({ setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    let [forgotPasswordForm, setForgotPasswordForm] = useState(forgotPasswordFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null)
    const handleSignUpChange = (e) => {
      props.history.push("/student/register");
    };

    const sendResetPasswordLink = () => {
      if (formIsValid) {
        setError(null)
        let params = {
          "email": forgotPasswordForm.email.value
        }

        setLoader(true)
        axios.post(`${appConfig.host}${urls.forgotPassword}`, params)
          .then(success => {
            setLoader(false)
            props.history.push("/");
          }).catch(error => {
            setLoader(false)
            setError(error.response.data.message)
          })
      }
      else {
        setError("Please enter Email Address ")
      }
    }

    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...forgotPasswordForm,
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
      setForgotPasswordForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...forgotPasswordForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setForgotPasswordForm({ ...updatedForm });
    };

    return (
      <ForgotPasswordComponent
        {...props}
        {...{
          //   currentData,
          handleSignUpChange,
          loader,
          inputBlurHandler,
          inputChangeHandler,
          sendResetPasswordLink,
          forgotPasswordForm
        }}
      />
    );
  }
);

export default enhancer;
