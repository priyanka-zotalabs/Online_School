import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import moment from "moment";
import { toast } from "react-toastify";
import studentProfileForm from "./studentProfileForm";
import { validate } from "../../../shared/helpers/formValidation";
import { param } from "jquery";

export let enhancer = compose(
  connect(({ auth }) => ({ auth })),
  withRouter,
  (TeacherProfileComponent) => ({ auth, ...props }) => {
    const [loader, setLoader] = useState(false);
    let [studentForm, setStudentForm] = useState(studentProfileForm);
    const [profileError, setProfileError] = useState();
    const [data, setData] = useState([]);

    const fetchData = () => {
      setLoader(true);

      axios
        .get(`${appConfig.host}${urls.getStudentBatchId}`)
        .then((result) => {
          setLoader(false);
          setData([...result.data.data]);
        })
        .catch((err) => {
          setLoader(false);
          alert(err);
        });
    };

    const handleFeeView = (e, id) => {
      props.history.push(`/student/fee/${id}`);
    };

    useEffect(() => {
      getStudentDetails();
      // fetchData();
    }, []);

    const getStudentDetails = () => {
      axios
        .get(`${appConfig.host}${urls.getStudentProfile}`)
        .then((success) => {
          console.log("Student profile data",success.data);

          let temp = {
            ...studentForm,
            name: {
              ...studentForm.name,
              value: success.data.data.userMetaData.name
                ? success.data.data.userMetaData.name
                : "",
            },
            contactNumber: {
              ...studentForm.contactNumber,
              value: success.data.data.contactNumber
                ? success.data.data.contactNumber
                : "",
            },
            class: {
              ...studentForm.class,
              value: success.data.data.userMetaData.class
                ? success.data.data.userMetaData.class
                : "",
            },
            board: {
              ...studentForm.board,
              value: success.data.data.userMetaData.board
                ? success.data.data.userMetaData.board
                : "",
            },
            school: {
              ...studentForm.school,
              value: success.data.data.userMetaData.school
                ? success.data.data.userMetaData.school
                : "",
            },
            location: {
              ...studentForm.location,
              value: success.data.data.userMetaData.location
                ? success.data.data.userMetaData.location
                : "",
            },
            profileImage: {
              ...studentForm.profileImage,
              value: success.data.data.userMetaData.imageUrl
                ? success.data.data.userMetaData.imageUrl
                : "",
              preview: success.data.data.userMetaData.imageUrl
                ? success.data.data.userMetaData.imageUrl
                : "",
            },
          };
          setStudentForm({ ...temp });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleSelectedProfileImage = (event, inputIdentifier) => {
      setLoader(true);
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (event.target.files[0].size > 1000000) {
          setProfileError("Size Should be less than 1 MB");
        } else {
          if (["jpg", "jpeg", "png"].includes(uploadFileExtensions)) {
            let temp = { ...studentForm };

            temp[inputIdentifier].preview = URL.createObjectURL(
              event.target.files[0]
            );

            setStudentForm({ ...temp });
            let formData = new FormData();
            formData.append("document", event.target.files[0]);
            axios
              .post(`${appConfig.host}${urls.fileUpload}`, formData)
              .then((success) => {
                console.log("data for document : ", success.data.url);
                temp[inputIdentifier].value = success.data.url;
                setStudentForm({ ...temp });
                toast.success("Successfully upload profile picture.");
                setLoader(false);
              })
              .catch((error) => {
                console.log(error);
                toast.error("Fail to upload Profile Image.");
                setLoader(false);
              });
            setProfileError("");
          } else {
            setProfileError("Invalid file format");
          }
        }
      }
    };

    const inputFirstPageBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...studentForm,
      };
      const updatedFormElement = {
        ...updatedForm[inputIdentifier],
      };
      let validationResult = true;
      let helperText = "";
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
      setStudentForm({ ...updatedForm });
    };

    const inputFirstPageChangedHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...studentForm,
      };

      updatedForm[inputIdentifier].value = event.target.value;

      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;

      setStudentForm({
        ...updatedForm,
      });
    };

    const handleSaveData = () => {
      let params = {
        name: studentForm.name.value,
        imageUrl: studentForm.profileImage.value,
        contactNumber: studentForm.contactNumber.value,
        board: studentForm.board.value,
        class: studentForm.class.value,
        location: studentForm.location.value,
        school: studentForm.school.value,
      };
      setLoader(true);
      axios
        .put(`${appConfig.host}${urls.saveStudentData}`, params)
        .then((success) => {
          setLoader(false);
          toast.success("Successfully save data.");
          window.location.reload();
        })
        .catch((error) => {
          setLoader(false);
          console.log(error);
          toast.error("Fail to save data.");
        });
    };

    return (
      <TeacherProfileComponent
        {...props}
        {...{
          auth,
          inputFirstPageBlurHandler,
          inputFirstPageChangedHandler,
          studentForm,
          handleSelectedProfileImage,
          profileError,
          handleSaveData,
          loader,
          data,
          handleFeeView,
        }}
      />
    );
  }
);

export default enhancer;
