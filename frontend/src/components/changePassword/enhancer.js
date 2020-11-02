import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../url";
import { appConfig } from "../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validate } from "../../shared/helpers/formValidation";
import { toast } from "react-toastify";
import { css } from 'glamor';
import passwordFormInit from "./changePasswordForm";
export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,
  (ResetPasswordComponent) => ({ auth, setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    let [passwordForm, setPasswordForm] = useState(passwordFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);
    const [isChecked,setisChecked]=useState();
    const [isFirstTimeLogin,setisFirstTimeLogin]=useState()
    const [loginUserdata,setloginUserData]=useState();
    let { token } = props.match.params;

    console.log("Auth from change password : ", auth,auth.currentMetaData.isFirstLogin);
    
    useEffect(()=>{
              getActiveUserDetails();
              // setisFirstTimeLogin(auth.currentMetaData.isFirstLogin);
              
            
    },[])


    useEffect(()=>{
      if(loginUserdata !== undefined){
console.log("priyankaaaaaaaaaaaaa",loginUserdata);
      
    if(loginUserdata.roleId[0].code == 1){
      console.log("login student data",loginUserdata.userMetaData.Student.isFirstLogin);
      setisFirstTimeLogin(loginUserdata.userMetaData.Student.isFirstLogin);
      }
      
        else if( loginUserdata.roleId[0].code == 3){
      console.log("login teacher data",loginUserdata.userMetaData.Teacher.isFirstLogin);
      setisFirstTimeLogin(loginUserdata.userMetaData.Teacher.isFirstLogin);
      }
      else{
      
      console.log("This facility still naot available for Admin");
      }
    }
    },[loginUserdata])


    useEffect(()=>{
      if(isFirstTimeLogin !== undefined){
        if(!isFirstTimeLogin){
          setisChecked(true);
        }else{
          // setisChecked(true);
console.log(" this is not first login of user");
        }
        // if(isFirstTimeLogin){
        //   setisChecked(isChecked);
        // }
        // else{
        //   setisChecked(true);
        // }
      }
     
    },[isFirstTimeLogin]);
    const getActiveUserDetails=()=>{
      console.log("I am inside get Active user deatils get call");

      setLoader(true);
      axios
        .get(`${appConfig.host}${urls.userDetails}`)
        .then((result) => {
          console.log("active teacher details", result.data);

          setloginUserData(result.data)
         
          // setTeacherList(result.data.data);
          // console.log("teacher list get API ");

          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    }


    const handleChangePassword = (e) => {
      // if(passwordForm.currentPassword.value !== passwordForm.newPassword.value ){

      // }
      if (formIsValid && isChecked) {
        if(passwordForm.currentPassword.value !== passwordForm.newPassword.value ){
          console.log("password are diff");
          setError(null);
          saveChangePassword();
        }
      else {
        setError("Please enter new password other than previous");
      }
        
      } else {
        setError("Please enter all fields.");
      }
    };
    console.log("Is first login of teacher ",auth.userMetaData,auth.userMetaData.isFirstLogin);

    const saveChangePassword = () => {
      let params = {
        currentPassword: passwordForm.currentPassword.value,
        newPassword: passwordForm.newPassword.value,
        confirmPassword: passwordForm.confirmPassword.value,
      };
      if (auth.currentRole.code === 3) {
        console.log("Is first login of teacher ",auth.userMetaData,auth.userMetaData.isFirstLogin);

        // if (auth.userMetaData.isFirstLogin) {
        if (auth.currentMetaData.isFirstLogin) {

          // currentMetaData
          console.log("Is first login of teacher ",auth.userMetaData,auth.userMetaData.isFirstLogin);
          setLoader(true);
          axios
            .post(`${appConfig.host}${urls.teacherChangePassword}`, params)
            .then((success) => {
              setLoader(false);
              // toast.success("Password Changed successfully");
              toast.info("Password Changed successfully");

              clearFormData();
            props.history.push("/teacher/profile");

            })
            .catch((error) => {
              setLoader(false);
              toast.error(error.response.data.message);

            });
        } else {
          setLoader(true);
          axios
            .post(`${appConfig.host}${urls.changePassword}`, params)
            .then((success) => {
              setLoader(false);
              // toast.success("Password Changed successfully");
              // toast.info("Password Changed successfully");
              toast("Password Changed successfully", {
                className: css({
                    background: "#8499ff   !important",
                    color:"#0D1925 !important"
                })
            });
              clearFormData();
            })
            .catch((error) => {
              // debugger;
              setLoader(false);
              toast.error(error.response.data.message);
            });
        }
      } else if (auth.currentRole.code === 1) {
        if (auth.userMetaData.Student.isFirstLogin) {
          setLoader(true);
          axios
            .post(`${appConfig.host}${urls.studentChangePassword}`, params)
            .then((success) => {
              setLoader(false);
              toast.success("Password Changed successfully");

              clearFormData();

              props.history.push("/student/MyProfile");
            })
            .catch((error) => {
              setLoader(false);
              toast.error(error.response.data.message);
            });
        } else {
          setLoader(true);
          axios
            .post(`${appConfig.host}${urls.changePassword}`, params)
            .then((success) => {
              setLoader(false);
              toast.success("Password Changed successfully");
              clearFormData();
            })
            .catch((error) => {
              
              setLoader(false);
              toast.error(error.response.data.message);
            });
        }
      }
    };

    const clearFormData = () => {
      let allFormKeys = Object.keys(passwordForm);
      let formData = { ...passwordForm };
      allFormKeys.forEach((formKey) => {
        formData[formKey].value = "";
        formData[formKey].invalid = false;
        formData[formKey].helperText = "";
        formData[formKey].touched = true;
      });
      setPasswordForm(formData);
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


    //   Terms and conditions code 

    const handleCheckbox=(e)=>{
// alert("chk box clicked");
// const [isChecked,setisChecked]=useState(false);
setisChecked(!isChecked);

    }
    return (
      <ResetPasswordComponent
        {...props}
        {...{
          handleChangePassword,
          loader,
          inputBlurHandler,
          inputChangeHandler,
          passwordForm,
          formIsValid,
          error,
          handleCheckbox,
          isChecked,
          isFirstTimeLogin,
          loginUserdata,
         
        }}
      />
    );
  }
);

export default enhancer;
