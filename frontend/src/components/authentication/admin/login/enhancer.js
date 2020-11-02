import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../../../shared/helpers/formValidation";
import signInFormInit from "./signInForm";
export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,
  (LoginComponent) => ({ setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    let [loginForm, setLoginForm] = useState(signInFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null)
    const handleSignUpChange = (e) => {
      props.history.push("/student/register");
    };

    const handleSignIn = (e) => {
      if (formIsValid) {
        setError(null)
        signInUsingEmailAddress()
      }
      else {
        setError("Please enter Mobile Number or Email Address ")
      }
    };

    const signInUsingEmailAddress = () => {
      let params = {
        "username": loginForm.email.value,
        "password": loginForm.password.value
      }

      setLoader(true)
      axios.post(`${appConfig.host}${urls.signInUsingEmail}`, params)
        .then(success => {
          setLoader(false)
          setAuthUser(success.data.data)
          props.history.push("/admin");
        }).catch(error => {
          console.log(error)

          setLoader(false)
          setError(error.response.data.message)
        })
    }


    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...loginForm,
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
      setLoginForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...loginForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setLoginForm({ ...updatedForm });
    };
    return (
      <LoginComponent
        {...props}
        {...{
          handleSignUpChange,
          loader,
          handleSignIn,
          loginForm,
          inputBlurHandler,
          inputChangeHandler,
          formIsValid,
          error
        }}
      />
    );
  }
);

export default enhancer;
