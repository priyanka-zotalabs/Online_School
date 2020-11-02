import { compose } from "redux";
import React, { useState } from "react";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validate } from "../../../../../shared/helpers/formValidation";
import otpFormInit from "./otpForm";
export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,
  (StudentSighUPComponent) => ({ setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    let [otpForm, setOtpForm] = useState(otpFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUpChange = (e) => {
      if (formIsValid) {
        setError(null);
        verifyOtp();
      } else {
        setError("Please enter otp.");
      }
    };

    const verifyOtp = () => {
      let params = {
        code: otpForm.otp.value,
      };

      setLoader(true);
      axios
        .post(`${appConfig.host}${urls.teacherVerifyEmail}`, params)
        .then((success) => {
          setLoader(false);
          props.history.push("/teacher/signup/password");
        })
        .catch((error) => {
          setLoader(false);
          setError(
            error.response && error.response.data
              ? error.response.data.message
              : "Invalid OTP"
          );
        });
    };

    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...otpForm,
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
      setOtpForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...otpForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setOtpForm({ ...updatedForm });
    };

    return (
      <StudentSighUPComponent
        {...props}
        {...{
          handleSignUpChange,
          loader,
          inputBlurHandler,
          inputChangeHandler,
          otpForm,
          formIsValid,
          error,
        }}
      />
    );
  }
);

export default enhancer;
