import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import signUpFormInit from "./signUpForm";
import { validate } from "../../../../../shared/helpers/formValidation";
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
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    // const [selectedBoard, setSelectedBoard] = useState("");
    // const [selectedGrade, setSelectedGrade] = useState("");
    // const [classList, setClassList] = useState([
    //   { name: "1", value: "1" },
    //   { name: "2", value: "2" },
    //   { name: "3", value: "3" },
    //   { name: "4", value: "4" },
    //   { name: "5", value: "5" },
    //   { name: "6", value: "6" },
    //   { name: "7", value: "7" },
    //   { name: "8", value: "8" },
    //   { name: "9", value: "9" },
    //   { name: "10", value: "10" },
    //   { name: "11", value: "11" },
    //   { name: "12", value: "12" },
    // ]);

    useEffect(() => {
      if (props && props.location && props.location.state) {
        if (props.location.state.password) {
          setPassword(props.location.state.password);
        }

        if (props.location.state.confirmPassword) {
          setConfirmPassword(props.location.state.confirmPassword);
        }
      }
    });

    // const [boardList, setBoardList] = useState([
    //   { name: "SSC", value: "ssc" },
    //   { name: "HSC", value: "hsc" },
    // ]);
    const handleSignInChange = (e) => {
      props.history.push("/student/login");
    };

    const handleNext = (e) => {
      if (formIsValid) {
        setError(null);
        signUp();
      } else {
        setError("Please provide all fields.");
      }
    };

    const signUp = () => {
      let params = {
        name: signUpForm.name.value,
        // gradeCode: selectedGrade,
        // boardCode: selectedBoard,
      };

      if (password) {
        params.password = password;
      }

      if (confirmPassword) {
        params.confirmPassword = password;
      }
      setLoader(true);
      axios
        .post(`${appConfig.host}${urls.registerUserDetails}`, params)
        .then((success) => {
          setLoader(false);
          setAuthUser(success.data.data);
          props.history.push("/");
        })
        .catch((error) => {
          setLoader(false);
          setError(error);
          toast.error(error.response.data.message);
        });
    };

    // useEffect(() => {
    // Promise.all([getBoardDetails(), getGradeDetails()])
    //   .then((result) => {
    //     setBoardList(result[0]);
    //     setClassList(result[1]);
    //   })
    //   .catch((error) => {
    //     setError(error.response.data.message);
    //   });
    // }, []);
    // const getBoardDetails = () => {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(`${appConfig.host}${urls.boardDetails}`)
    //       .then((board) => {
    //         resolve(board.data.data);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // };

    // const getGradeDetails = () => {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(`${appConfig.host}${urls.gradeDetails}`)
    //       .then((grade) => {
    //         resolve(grade.data.data);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // };
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

    // const handleBoardChange = (event, inputIdentifier) => {
    //   const updatedForm = {
    //     ...signUpForm,
    //   };
    //   updatedForm[inputIdentifier].value = event.target.value;
    //   updatedForm[inputIdentifier].invalid = false;
    //   updatedForm[inputIdentifier].helperText = "";
    //   updatedForm[inputIdentifier].touched = true;
    //   setSelectedBoard(event.target.value);
    // };

    // const handleGradeChange = (event, inputIdentifier) => {
    //   const updatedForm = {
    //     ...signUpForm,
    //   };
    //   updatedForm[inputIdentifier].value = event.target.value;
    //   updatedForm[inputIdentifier].invalid = false;
    //   updatedForm[inputIdentifier].helperText = "";
    //   updatedForm[inputIdentifier].touched = true;
    // setSelectedGrade(event.target.value);
    // };
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
          // classList,
          // boardList,
          error,
          // handleBoardChange,
          // handleGradeChange,
          // selectedBoard,
          // selectedGrade,
        }}
      />
    );
  }
);

export default enhancer;
