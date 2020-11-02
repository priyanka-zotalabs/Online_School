import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import moment from "moment";
import { toast } from "react-toastify";
import teacherProfileForm from "./teacherProfileForm";
import { validate } from "../../../shared/helpers/formValidation";

export let enhancer = compose(
  connect(({ auth }) => ({ auth })),
  withRouter,
  (TeacherProfileComponent) => ({ auth, ...props }) => {
    const [loader, setLoader] = useState(false);
    const [selectedResume, setSelectedResume] = useState();
    let [teacherForm, setTeacherForm] = useState(teacherProfileForm);
    const [resumeError, setResumeError] = useState();
    const [profileError, setProfileError] = useState();

    useEffect(() => {
      getTeacherDetails();
    }, []);

    const getTeacherDetails = () => {
      axios
        .get(`${appConfig.host}${urls.getTeacherProfile}`)
        .then((success) => {

          console.log("teacher profile data",success.data);
          let temp = {
            ...teacherForm,
            teacherName: {
              ...teacherForm.teacherName,
              value: success.data.data.userMetaData.name,
            },
            teacherPhoneNumber: {
              ...teacherForm.teacherPhoneNumber,
              value: success.data.data.contactNumber,
            },
            aboutMe: {
              ...teacherForm.aboutMe,
              value: success.data.data.userMetaData.aboutMe,
            },
            subject: {
              ...teacherForm.subject,
              value: success.data.data.userMetaData.subject,
            },
            board: {
              ...teacherForm.board,
              value: success.data.data.userMetaData.board,
            },
            qualification: {
              ...teacherForm.qualification,
              value: success.data.data.userMetaData.qualification,
            },
            experience: {
              ...teacherForm.experience,
              value: success.data.data.userMetaData.experience,
            },
            location: {
              ...teacherForm.location,
              value: success.data.data.userMetaData.location,
            },
            linkedInUrl: {
              ...teacherForm.linkedInUrl,
              value: success.data.data.userMetaData.linkedInUrl,
            },
            resume: {
              ...teacherForm.resume,
              value: success.data.data.userMetaData.resumeUrl,
            },
            profileImage: {
              ...teacherForm.profileImage,
              value: success.data.data.userMetaData.imageUrl,
              preview: success.data.data.userMetaData.imageUrl,
            },
          };
          setTeacherForm({ ...temp });
          setSelectedResume(
            GetFilename(success.data.data.userMetaData.resumeUrl)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const GetFilename = (url) => {
      if (url) {
        let decode_url = decodeURIComponent(url);
        let m = decode_url.toString().match(/.*\-(.+?)\./);
        if (m && m.length > 1) {
          return m[1];
        }
      }
      return "";
    };

    const handleSelectedResume = (event, inputIdentifier) => {
      setLoader(true);
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (event.target.files[0].size > 5000000) {
          setResumeError("Size Should be less than 5 MB");
        } else {
          if (["pdf"].includes(uploadFileExtensions)) {
            setSelectedResume(event.target.files[0].name);
            let temp = { ...teacherForm };
            let formData = new FormData();
            formData.append("document", event.target.files[0]);
            axios
              .post(`${appConfig.host}${urls.fileUpload}`, formData)
              .then((success) => {
                console.log("data for document : ", success.data.url);
                temp[inputIdentifier].value = success.data.url;
                setTeacherForm({ ...temp });
                toast.success("Resume Upload Successfully.");
                setLoader(false);
              })
              .catch((error) => {
                console.log(error);
                toast.error("Fail to upload Resume.");
                setLoader(false);
              });
            setResumeError("");
          } else {
            setResumeError("Invalid file format");
          }
        }
      }
    };

    const handleSelectedProfileImage = (event, inputIdentifier) => {
      setLoader(true);
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (event.target.files[0].size > 1000000) {
          setProfileError("Size Should be less than 1 MB");
        } else {
          if (["jpg", "jpeg", "png"].includes(uploadFileExtensions)) {
            let temp = { ...teacherForm };

            temp[inputIdentifier].preview = URL.createObjectURL(
              event.target.files[0]
            );

            setTeacherForm({ ...temp });
            let formData = new FormData();
            formData.append("document", event.target.files[0]);
            axios
              .post(`${appConfig.host}${urls.fileUpload}`, formData)
              .then((success) => {
                console.log("data for document : ", success.data.url);
                temp[inputIdentifier].value = success.data.url;
                setTeacherForm({ ...temp });
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
        ...teacherForm,
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
      setTeacherForm({ ...updatedForm });
    };

    const inputFirstPageChangedHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...teacherForm,
      };

      updatedForm[inputIdentifier].value = event.target.value;

      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;

      setTeacherForm({
        ...updatedForm,
      });
    };

    const handleSaveData = () => {
      let params = {
        name: teacherForm.teacherName.value,
        contactNumber: teacherForm.teacherPhoneNumber.value,
        imageUrl: teacherForm.profileImage.value,
        aboutMe: teacherForm.aboutMe.value,
        subject: teacherForm.subject.value,
        board: teacherForm.board.value,
        qualification: teacherForm.qualification.value,
        experience: teacherForm.experience.value,
        location: teacherForm.location.value,
        linkedInUrl: teacherForm.linkedInUrl.value,
        resumeUrl: teacherForm.resume.value,
      };
      axios
        .put(`${appConfig.host}${urls.saveTeacherProfile}`, params)
        .then((success) => {
          toast.success("Successfully save data.");
          window.location.reload();

        })
        .catch((error) => {
          console.log(error);
          toast.error("Fail to save data.");
        });
    };

    return (
      <TeacherProfileComponent
        {...props}
        {...{
          auth,
          handleSelectedResume,
          inputFirstPageBlurHandler,
          inputFirstPageChangedHandler,
          teacherForm,
          handleSelectedProfileImage,
          resumeError,
          profileError,
          handleSaveData,
          selectedResume,
          loader,
        }}
      />
    );
  }
);

export default enhancer;
