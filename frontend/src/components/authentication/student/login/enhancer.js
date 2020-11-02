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
    const [error, setError] = useState(null);
    const handleSignUpChange = (e) => {
      props.history.push("/student/register");
    };

    const handleSignIn = (e) => {
      if (formIsValid) {
        setError(null);
        // if (loginForm.mNumber.value !== "") {
        //   signInUsingMobile();
        // } else {
        signInUsingEmailAddress();
        //  }
      } else {
        setError("Please enter Email Address or Mobile Number");
      }
    };

    // const signInUsingMobile = () => {
    //   let params = {
    //     countryCode: "+91",
    //     contactNumber: loginForm.mNumber.value,
    //   };

    //   setLoader(true);
    //   axios
    //     .post(`${appConfig.host}${urls.signInUsingMobile}`, params)
    //     .then((success) => {
    //       setLoader(false);
    //       props.history.push("/student/login/otp/" + params.contactNumber);
    //     })
    //     .catch((error) => {
    //       setLoader(false);
    //       setError(error.response.data.message);
    //     });
    // };
    const checkUser = (success) => {
      // for student
      if (success.data.data.roleId[0].code == 1) {
        if (success.data.data.userMetaData.Student === undefined) {
          setAuthUser(success.data.data);
          props.history.push("/student/myCourses");
        } else {
          if (success.data.data.userMetaData.Student.isFirstLogin) {
            setAuthUser(success.data.data);
            props.history.push("/student/changePassword");
          } else {
            setAuthUser(success.data.data);
            // props.history.push("/student/MyProfile");
            props.history.push("/student/myCourses");
          }
          //   setAuthUser(success.data.data);
          //   // props.history.push("/student/MyProfile");
          // props.history.push("/student/myCourses");
        }
      }
      // }
      //  for admin
      if (success.data.data.roleId[0].code == 2) {
        setAuthUser(success.data.data);

        // props.history.push("/admin/onboardingTeacher");
        // props.history.push("/admin/profile");

        // /admin/courses
        props.history.push("/admin/courses");
      }
      // for teacher
      if (success.data.data.roleId[0].code == 3) {
        if (success.data.data.userMetaData.Teacher === undefined) {
          setAuthUser(success.data.data);
          props.history.push("/teacher/profile");
        } else {
          if (success.data.data.userMetaData.Teacher.isFirstLogin) {
            console.log(
              "success.data.data.userMetaData.Teacher.isFirstLogin",
              success.data.data.userMetaData.Teacher.isFirstLogin
            );
            setAuthUser(success.data.data);
            props.history.push("/teacher/changePassword");
          } else {
            setAuthUser(success.data.data);
            // props.history.push("/teacher/profile");
            props.history.push("/teacher/courses");

            // /teacher/courses
          }
        }
      }
    };
    const signInUsingEmailAddress = () => {
      let params = {
        username: loginForm.email.value,
        password: loginForm.password.value,
      };
      setLoader(true);
      if (
        new RegExp(
          /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})/
        ).test(params.username)
      ) {
        console.log("email");
        axios
          .post(`${appConfig.host}${urls.signInUsingEmail}`, params)
          .then((success) => {
            setLoader(false);
            checkUser(success);
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
            setError(error?.response?.data?.message);
          });
      } else {
        console.log("mobile");
        axios
          .post(`${appConfig.host}${urls.signInUsingMobile}`, params)
          .then((success) => {
            setLoader(false);
            checkUser(success);
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
            setError(error?.response?.data?.message);
          });
      }
    };

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
      if (inputIdentifier === "mNumber") {
        updatedForm["email"].validation.required = false;
        updatedForm["email"].invalid = false;
        updatedForm["email"].touched = true;
        updatedForm["password"].validation.required = false;
        updatedForm["password"].invalid = false;
        updatedForm["password"].touched = true;
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
          error,
        }}
      />
    );
  }
);

export default enhancer;
