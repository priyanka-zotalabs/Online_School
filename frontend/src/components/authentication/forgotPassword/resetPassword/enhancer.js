import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validate } from "../../../../shared/helpers/formValidation";
import { toast } from "react-toastify";
import passwordFormInit from './passwordForm'
export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,
  (ResetPasswordComponent) => ({ setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    let [passwordForm, setPasswordForm] = useState(passwordFormInit)
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null)
    let {token} = props.match.params

    useEffect(() => {
      setLoader(true)
      axios.get(`${appConfig.host}${urls.validateToken}/${token}`)
        .then(success => {
          setLoader(false)
        }).catch(error => {
          setLoader(false)
          // props.history.push("/");
          setError(error)
        })
    }, [token])

    const handleSignUpChange = (e) => {
      if (formIsValid) {
        setError(null)
        signUp()
      }
      else {
        setError("Please enter password and confirm password.")
      }
    };

    const signUp = () => {
      let params = {
        'password': passwordForm.password.value,
        'confirmPassword': passwordForm.confirmPassword.value
      }
      setLoader(true)
      axios.post(`${appConfig.host}${urls.resetPassword}/${token}`, params)
        .then(success => {
          setLoader(false)
          props.history.push("/student/login");
        }).catch(error => {
          setLoader(false)
          setError(error)
        })
    }
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
      <ResetPasswordComponent
        {...props}
        {...{
          handleSignUpChange,
          loader,
          inputBlurHandler,
          inputChangeHandler,
          passwordForm,
          formIsValid,
          error
        }}
      />
    );
  }
);

export default enhancer;
