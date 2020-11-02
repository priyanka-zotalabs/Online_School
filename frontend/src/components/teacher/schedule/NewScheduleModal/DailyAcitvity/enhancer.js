import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import scheduleFormInit from "./scheduleForm";
import { validate } from "../../../../../shared/helpers/formValidation";

import { toast } from "react-toastify";
import moment from "moment";

export let enhancer = compose(
  connect(
    ({ auth, teacherCourse }) => ({ auth, teacherCourse }),
  ),
  withRouter,
  (ScheduleModal) => ({
    auth,
    teacherCourse,
    history,
    ...props
  }) => {
    let [loader, setLoader] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    let [scheduleForm, setScheduleForm] = useState(scheduleFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [show, setShow] = useState(false);

    const [courseList, setCourseList] = useState([]);
    const [moduleList, setModuleList] = useState([]);
    const [chapterList, setChapterList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const [contentList, setContentList] = useState([]);
    const [selectedContentList, setSelectedContentList] = useState([]);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(null);
    const [courseBatchData, setCourseBatchData] = useState([]);
    let { token } = props.match.params;

    useEffect(() => {
      getBatchData();
    }, []);

    useEffect(() => {
      clearFormData();
      getCourseList();
    }, []);

    useEffect(() => {
      getModuleList();
    }, [scheduleForm.course.value]);

    useEffect(() => {
      getChapterList();
    }, [scheduleForm.module.value]);

    useEffect(() => {
      getContentList();
    }, [scheduleForm.chapter.value]);



    const onSelectContentAdd = (selectedList, selectedItem) => {
      try {
        let tempArray = [...selectedContentList];
        tempArray.push(selectedItem);
        setSelectedContentList(tempArray);
      } catch (e) {
        console.log("Something went wrong while selecting content", e);
      }

    }

    const onSelectContentRemove = (selectedList, removedItem) => {

      try {
        let tempArray = [];
        selectedContentList.forEach((content) => {
          if (removedItem.id != content.id) {
            tempArray.push(content);
          }
        });
        setSelectedContentList(tempArray);
      }
      catch (e) {
        console.log("Something went wrong while removing content", e);
      }


    }
    const getContentList = () => {
      let chapterContent = [];
      if (Array.isArray(teacherCourse)) {
        teacherCourse.forEach((element) => {
          element.modules.forEach((module) => {
            if (module._id == scheduleForm.module.value) {
              module.chapters.forEach((chap) => {
                if (chap._id == scheduleForm.chapter.value) {
                  chap.content.forEach((content) => {
                    chapterContent.push({ id: content._id, value: content.title });
                  })
                }
              });
              setContentList([...chapterContent]);
            }
          });
        });
      }
    };


    const getChapterList = () => {
      let moduleChapter = [];
      if (Array.isArray(teacherCourse)) {
        teacherCourse.forEach((element) => {
          element.modules.forEach((module) => {
            if (module._id == scheduleForm.module.value) {
              module.chapters.forEach((chap) => {
                moduleChapter.push({ id: chap._id, value: chap.name });
              });
              setChapterList([...moduleChapter]);
            }
          });
        });
      }
    };
    console.log("Teacher Course Modal", teacherCourse);
    const getModuleList = () => {
      if (Array.isArray(teacherCourse)) {
        teacherCourse.forEach((element) => {
          if (element._id == scheduleForm.course.value) {
            let courseModules = [];
            element.modules.forEach((module) => {
              courseModules.push({ id: module._id, value: module.name });
            });
            setModuleList([...courseModules]);
            return;
          }
        });
      }
    };

    const getCourseList = () => {
      let temp = [];
      let finalCourseModule = [];
      if (Array.isArray(teacherCourse)) {
        teacherCourse.forEach((element) => {
          temp.push({ id: element._id, value: element.name });
        });
      }


      setCourseList([...temp]);
    };


    // Batch Started 
    const [teacherId, setTeacherId] = useState(auth.currentMetaData._id);

    const getBatchData = () => {
      axios
        .get(`${appConfig.host}${urls.getTeacherBatches}?teacherId=${teacherId}`)
        .then((success) => {
          // console.log("Fetched Batch data ", success.data.data);
          setCourseBatchData(courseBatchData => success.data.data);
        })
        .catch((error) => {
          console.log("Failed to Fetched Batch data ", error);
        });

    }

    useEffect(() => {
      getBatchList();
    }, [scheduleForm.course.value]);

    const getBatchList = () => {
      let temp = [];
      if (courseBatchData.length > 0) {
        courseBatchData.forEach((eachBatch) => {
          if (eachBatch.course._id == scheduleForm.course.value) {
            temp.push({ id: eachBatch._id, value: eachBatch.name });
          }
        });
      }
      setBatchList([...temp]);
    };


    /*  Batch Data */

    // console.log("Course Batch Data", courseBatchData);


    const handleSubmit = (e) => {
      // console.log("Schedule from data", scheduleForm);
      if (isFormValid(scheduleForm)) {
        if (scheduleForm["platform"].value == "zoom") {
          //Zoomplatform
          setLoader(true);
          let params = {
            courseId: scheduleForm.course.value,
            dateTime: moment(selectedDate).utc(),
            // dateTime: moment(selectedDate).utc().format('YYYY-MM-DD hh:mm A'),
            moduleId: scheduleForm.module.value,
            chapterId: scheduleForm.chapter.value,
            batchId: scheduleForm.batch.value,
          };
          // console.log("Zoom Params fron inside modal", params);
          axios
            .post(`${appConfig.host}${urls.scheduleMeeting}`, params)
            .then((success) => {
              setLoader(false);
              toast.success(success.data.message);
              props.getAllMeetingData();
            })
            .catch((error) => {
              setLoader(false);
              console.log("error", error);
              // toast.error(error.response.data.message);
            });
          setShow(false);
        }
        else if (scheduleForm["platform"].value == "liveclass") {
          //Agora Live Class
          setLoader(true);
          let params = {
            courseId: scheduleForm.course.value,
            dateTime: moment(selectedDate).utc(),
            moduleId: scheduleForm.module.value,
            chapterId: scheduleForm.chapter.value,
            batchId: scheduleForm.batch.value,
          };
          // console.log("Agora Live class Params fron inside modal", params);
          axios
            .post(`${appConfig.host}${urls.scheduleAgoraLiveclass}`, params)
            .then((success) => {
              setLoader(false);
              toast.success(success.data.message);
              props.getAllMeetingData();
            })
            .catch((error) => {
              setLoader(false);
              console.log("error", error);
              toast.error("Error scheduling live class");
            });
          setShow(false);
        }
        else {
          //BigBlueButton
          setLoader(true);
          let params = {
            courseId: scheduleForm.course.value,
            dateTime: moment(selectedDate).utc(),
            // dateTime: moment(selectedDate).utc().format('YYYY-MM-DD hh:mm A'),
            moduleId: scheduleForm.module.value,
            chapterId: scheduleForm.chapter.value,
            batchId: scheduleForm.batch.value,
            scheduleType: scheduleForm.format.value
          };
          // console.log("Big Blue Button Params fron inside modal", params);
          axios
            .post(`${appConfig.host}${urls.scheduleBBBMeeting}`, params)
            .then((success) => {
              setLoader(false);
              toast.success(success.data.message);
              props.getAllMeetingData();
            })
            .catch((error) => {
              setLoader(false);
              console.log("error", error);
              // toast.error(error.response.data.message);
            });
          setShow(false);
        }
      } else {
        showAllInputFieldError();
      }
    };

    const isFormValid = (updatedForm) => {
      let tempFormIsValid = true;
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid;
      }
      return tempFormIsValid;
    };

    const showAllInputFieldError = () => {
      const updatedCourseForm = {
        ...scheduleForm,
      };
      for (const key in updatedCourseForm) {
        if (!updatedCourseForm[key].touched) {
          let helperText = "";
          for (const validationKey in updatedCourseForm[key].validation) {
            const validationResult = validate(
              validationKey,
              updatedCourseForm[key].validation[validationKey].value,
              updatedCourseForm[key].value
            );
            if (!validationResult) {
              helperText =
                updatedCourseForm[key].validation[validationKey].errMsg;
              break;
            }
          }

          updatedCourseForm[key].invalid = true;
          updatedCourseForm[key].helperText = helperText;
        }
      }
      setScheduleForm({ ...updatedCourseForm });
    };
    const clearFormData = () => {
      let allFormKeys = Object.keys(scheduleForm);
      let formData = { ...scheduleForm };
      allFormKeys.forEach((formKey) => {
        formData[formKey].value = "";
        // formData[formKey].invalid = false;
        // formData[formKey].helperText = "";
        // formData[formKey].touched = true;
      });
      setScheduleForm(formData);
    };
    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...scheduleForm,

        // Date
        ...selectedDate,
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

      // user detaiils code ends here
      let tempFormIsValid = true;
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid;
      }
      setFormIsValid(tempFormIsValid);
      setScheduleForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...scheduleForm,
      };
      if (inputIdentifier == "format" || inputIdentifier == "platform") {
        updatedForm[inputIdentifier].value = event.target.id;
        // console.log("onChange id", event.target.id);
      }
      else {
        updatedForm[inputIdentifier].value = event.target.value;
        // console.log("onChange value", event.target.value);
      }

      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setScheduleForm({ ...updatedForm });
      // console.log(scheduleForm["platform"]);
    };
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    return (
      <ScheduleModal
        {...props}
        {...{
          auth,
          courseList,
          moduleList,
          handleSubmit,
          handleDateChange,
          selectedDate,
          loader,
          inputBlurHandler,
          inputChangeHandler,
          scheduleForm,
          formIsValid,
          error,
          handleClose,
          handleShow,
          show,
          chapterList,
          batchList,
          contentList,
          selectedContentList,
          onSelectContentRemove,
          onSelectContentAdd
        }}
      />
    );
  }
);
export default enhancer;