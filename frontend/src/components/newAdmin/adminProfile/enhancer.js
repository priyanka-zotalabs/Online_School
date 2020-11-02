import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import moment from "moment";
import { toast } from "react-toastify";
import instituteProfileForm from "./instituteProfileForm";
import teacherProfileForm from "./teacherProfileForm";
import { validate } from "../../../shared/helpers/formValidation";

export let enhancer = compose(
  connect(({ auth }) => ({ auth })),
  withRouter,
  (AdminProfileComponent) => ({ auth, ...props }) => {
    // const [flag, setFlag] = useState({
    //   checkedA: false,
    // });
    const [loader, setLoader] = useState(false);
    let [instituteForm, setInstituteForm] = useState(instituteProfileForm);
    const [selectedBrochure, setSelectedBrochure] = useState();
    const [brochureError, setBrochureError] = useState();
    const [instituteProfileError, setInstituteProfileError] = useState();
    //let [teacherForm, setTeacherForm] = useState(teacherProfileForm);

    const [error, setError] = useState(null);

    useEffect(() => {
      getInstituteDetails();
    }, []);

    //getting institute data from  API
    const getInstituteDetails = () => {
      axios
        .get(`${appConfig.host}${urls.getInstituteProfile}`)
        .then((success) => {
          console.log("admin profile info",success.data);
          let temp = {
            ...instituteForm,
            name: {
              ...instituteForm.name,
              value: success.data.data.name ? success.data.data.name : "",
            },
            contactNumber: {
              ...instituteForm.contactNumber,
              value: success.data.data.contactNumber
                ? success.data.data.contactNumber
                : "",
            },
            aboutMe: {
              ...instituteForm.aboutMe,
              value: success.data.data.aboutMe ? success.data.data.aboutMe : "",
            },
            subject: {
              ...instituteForm.subject,
              value: success.data.data.subject ? success.data.data.subject : "",
            },
            board: {
              ...instituteForm.board,
              value: success.data.data.board ? success.data.data.board : "",
            },
            location: {
              ...instituteForm.location,
              value: success.data.data.location
                ? success.data.data.location
                : "",
            },
            website: {
              ...instituteForm.website,
              value: success.data.data.website ? success.data.data.website : "",
            },
            instituteProfileImage: {
              ...instituteForm.instituteProfileImage,
              value: success.data.data.imageUrl
                ? success.data.data.imageUrl
                : "",
              preview: success.data.data.imageUrl
                ? success.data.data.imageUrl
                : "",
            },
            brochure: {
              ...instituteForm.brochure,
              value: success.data.data.brochureUrl
                ? success.data.data.brochureUrl
                : "",
            },
          };
          setInstituteForm({ ...temp });
          setSelectedBrochure(GetFilename(success.data.data.brochureUrl));
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

    //check the teacher flag is on or off
    // const handleChange = (event) => {
    //   setFlag({ ...flag, [event.target.name]: event.target.checked });
    // };

    // handle the upload to create link
    const handleUpload = (event, inputIdentifier) => {
      if (inputIdentifier == "brochure") {
        setLoader(true);
        if (event.target.files.length) {
          let uploadFileExtensions = event.target.files[0].name.split(".")[1];
          if (event.target.files[0].size > 5000000) {
            setBrochureError("Size Should be less than 5 MB");
          } else {
            if (["pdf"].includes(uploadFileExtensions)) {
              setSelectedBrochure(event.target.files[0].name);
              let temp = { ...instituteForm };
              let formData = new FormData();
              formData.append("document", event.target.files[0]);
              axios
                .post(`${appConfig.host}${urls.fileUpload}`, formData)
                .then((success) => {
                  console.log("data for document : ", success.data.url);
                  temp[inputIdentifier].value = success.data.url;
                  setInstituteForm({ ...temp });
                  toast.success("Brochure Upload Successfully.");
                  setLoader(false);
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Fail to upload Brochure.");
                  setLoader(false);
                });
              setBrochureError("");
            } else {
              setBrochureError("Invalid file format");
            }
          }
        }
      } else if (inputIdentifier == "instituteProfileImage") {
        setLoader(true);
        if (event.target.files.length) {
          let uploadFileExtensions = event.target.files[0].name.split(".")[1];
          if (event.target.files[0].size > 1000000) {
            setInstituteProfileError("Size Should be less than 1 MB");
          } else {
            if (["jpg", "jpeg", "png"].includes(uploadFileExtensions)) {
              let temp = { ...instituteForm };

              temp[inputIdentifier].preview = URL.createObjectURL(
                event.target.files[0]
              );

              setInstituteForm({ ...temp });
              let formData = new FormData();
              formData.append("document", event.target.files[0]);
              axios
                .post(`${appConfig.host}${urls.fileUpload}`, formData)
                .then((success) => {
                  console.log("data for document : ", success.data.url);
                  temp[inputIdentifier].value = success.data.url;
                  setInstituteForm({ ...temp });
                  toast.success("Successfully upload profile picture.");
                  setLoader(false);
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Fail to upload Profile Image.");
                  setLoader(false);
                });
              setInstituteProfileError("");
            } else {
              setInstituteProfileError("Invalid file format");
            }
          }
        }
      }
    };

    const inputBlurHandler = (event, inputIdentifier, profileChecker) => {
      if (profileChecker == "institute") {
        const updatedForm = {
          ...instituteForm,
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

        setInstituteForm({ ...updatedForm });
      }
      // } else {
      //   const updatedForm = {
      //     ...teacherForm,
      //   };
      //   const updatedFormElement = {
      //     ...updatedForm[inputIdentifier],
      //   };
      //   let validationResult = true;
      //   let helperText = "";
      //   updatedFormElement.value = event.target.value;
      //   for (const key in updatedFormElement.validation) {
      //     validationResult = validate(
      //       key,
      //       updatedFormElement.validation[key].value,
      //       event.target.value
      //     );

      //     if (!validationResult) {
      //       helperText = updatedFormElement.validation[key].errMsg;
      //       break;
      //     }
      //   }
      //   updatedFormElement.invalid = !validationResult;
      //   updatedFormElement.helperText = helperText;
      //   updatedForm[inputIdentifier] = updatedFormElement;

      //   let tempFormIsValid = true;
      //   for (const key in updatedForm) {
      //     tempFormIsValid =
      //       !updatedForm[key].invalid &&
      //       updatedForm[key].touched &&
      //       tempFormIsValid;
      //   }
      //   setFormIsValid(tempFormIsValid);
      //   setTeacherForm({ ...updatedForm });
      // }
    };

    const inputChangedHandler = (event, inputIdentifier, profileChecker) => {
      let updatedForm = {};
      if (profileChecker == "institute") {
        updatedForm = {
          ...instituteForm,
        };

        updatedForm[inputIdentifier].value = event.target.value;

        updatedForm[inputIdentifier].invalid = false;
        updatedForm[inputIdentifier].helperText = "";
        updatedForm[inputIdentifier].touched = true;

        setInstituteForm({
          ...updatedForm,
        });
      }
      // else {
      //   updatedForm = {
      //     ...teacherForm,
      //   };

      //   updatedForm[inputIdentifier].value = event.target.value;

      //   updatedForm[inputIdentifier].invalid = false;
      //   updatedForm[inputIdentifier].helperText = "";
      //   updatedForm[inputIdentifier].touched = true;

      //   setTeacherForm({
      //     ...updatedForm,
      //   });
      // }
    };


    const UpdateUserData=(e)=>{
      axios
      .get(`${appConfig.host}${urls.getLogedStudentForBatch}`)
      .then((result) => {
        console.log("get updated user data", result.data);
        // setLoader(false);
      })
      .catch((error) => {
        // setLoader(false);
      });

    }
    const handleSaveInstituteData = () => {
      let params = {
        name: instituteForm.name.value,
        aboutMe: instituteForm.aboutMe.value,
        subject: instituteForm.subject.value,
        imageUrl: instituteForm.instituteProfileImage.value,
        contactNumber: instituteForm.contactNumber.value,
        board: instituteForm.board.value,
        location: instituteForm.location.value,
        website: instituteForm.website.value,
        brochureUrl: instituteForm.brochure.value,
      };
      axios
        .put(`${appConfig.host}${urls.saveInstituteProfile}`, params)
        .then((success) => {
          toast.success("Successfully save data.");
         
              UpdateUserData();
              window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Fail to save data.");
        });
    };

    return (
      <AdminProfileComponent
        {...props}
        {...{
          auth,
          // handleChange,
          // flag,
          handleUpload,
          instituteForm,
          selectedBrochure,
          brochureError,
          instituteProfileError,
          inputBlurHandler,
          inputChangedHandler,
          // teacherForm,
          handleSaveInstituteData,
          error,
          loader,
        }}
      />
    );
  }
);

export default enhancer;
