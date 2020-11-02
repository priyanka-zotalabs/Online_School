import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import signUpFormInit from "./signUpForm";
import { validate } from "../../../../shared/helpers/formValidation";
export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,
  (RegisterComponent) => ({ setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    let [signUpForm, setSignUpForm] = useState(signUpFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);

    const handleSignInChange = (e) => {
      props.history.push("/teacher/login");
    };

    const handleNext = (e) => {
      //props.history.push("/student/signup/password");
      if (formIsValid) {
        setError(null);
        // if (signUpForm.mNumber.value !== "") {
        //   registerUsingMobile();
        // } else {
        registerUsingEmailAddress();
        // }
      } else {
        setError("Please enter Email Address ");
      }
    };

    // const registerUsingMobile = () => {
    //   let params = {
    //     countryCode: "+91",
    //     contactNumber: signUpForm.mNumber.value,
    //   };

    //   setLoader(true);
    //   axios
    //     .post(`${appConfig.host}${urls.teacherSignupMobile}`, params)
    //     .then((success) => {
    //       setLoader(false);
    //       props.history.push("/teacher/signup/otp/" + params.contactNumber);
    //     })
    //     .catch((error) => {
    //       setLoader(false);
    //       setError(error.response.data.message);
    //     });
    // };

    const registerUsingEmailAddress = () => {
      let params = {
        email: signUpForm.email.value,
      };

      setLoader(true);
      axios
        .post(`${appConfig.host}${urls.teacherSignupEmail}`, params)
        .then((success) => {
          setLoader(false);
          props.history.push("/teacher/signUp/EmailOtp/" + params.email);
        })
        .catch((error) => {
          setLoader(false);
          setError(error.response.data.message);
        });
    };

    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...signUpForm,
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
      if (inputIdentifier === "mNumber") {
        updatedForm["email"].validation.required = false;
        updatedForm["email"].invalid = false;
        updatedForm["email"].touched = true;
      } else {
        updatedForm["mNumber"].validation.required = false;
        updatedForm["mNumber"].invalid = false;
        updatedForm["mNumber"].touched = true;
      }

      let tempFormIsValid = true;
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid;
      }
      setFormIsValid(tempFormIsValid);
      setSignUpForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...signUpForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setSignUpForm({ ...updatedForm });
    };
    return (
      <RegisterComponent
        {...props}
        {...{
          handleSignInChange,
          loader,
          handleNext,
          signUpForm,
          inputBlurHandler,
          inputChangeHandler,
          formIsValid,
          error,
        }}
      />
    );
  }
);

export default enhancer;
