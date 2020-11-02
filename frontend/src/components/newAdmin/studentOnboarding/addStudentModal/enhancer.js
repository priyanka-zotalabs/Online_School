import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import moment from "moment";
import { validate } from "../../../../shared/helpers/formValidation";
import addStudentModalForm from "./addStudentModalForm";
import { toast } from "react-toastify";



// import BulkTemplate from "../../../../../public/template2.xlsx" 



export let enhancer = compose(
  withRouter,
  (AddStudentModalComponent) => ({ ...props }) => {
    let [studentModalForm, setStudentModalForm] = useState(addStudentModalForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);
    const [batchList, setBatchList] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [feeStructure, setFeeStructure] = useState([]);
    const [selectedFeeStructure, setSelectedFeeStructure] = useState("");
    const [courseList, setCourseList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [tempSelectedCourse, setTemSelectedCourse] = useState([]);
    const [tempSelectedBatch, setTempSelectedBatch] = useState([]);
    const [tempSelectedFeeStructure, setTempSelectedFeeStructure] = useState(
      []
    );
    // courseInBulk,
    // batchInBulk,
    // handleBatchBulk,
    // handleBatchBulk
    const [courseInBulk, setCourseInBulk] = useState(" ");
    const [batchInBulk, setBatchInBulk] = useState(" ");
    const [bulkUploadFile, setBulkUploadFile] = useState();

    const [uploadedFilename, setUplaodedFilename] = useState();
    const [bulkFileState, setBulkFileState] = useState();

    console.log(
      "All bulk file params",
      bulkFileState,
      courseInBulk,
      batchInBulk,
      bulkUploadFile
    );
    const handleCourseBulk = (event) => {
      console.log("Bulk upload course", event, event.target.value);
      setCourseInBulk(event.target.value);
    };

    // const handleCourseBulk = (event, data) => {
    //   console.log("Bulk upload course",event,data);
    //   setCourseInBulk(event.target.value);
    // };
    const handleBatchBulk = (event) => {
      console.log("Bulk upload batch", event, event.target.value);

      setBatchInBulk(event.target.value);
    };
    console.log("nnnnnnnnnnnnnnnnn",props);

    const colseModal=()=>{
      props.onHide();
    }
    // single={singleStudentOnboarding}
    // multiple={multiple}

    const single = props.single;
    const multiple = props.multiple;
    // single,
    // multiple
    console.log("single & multiple", single, multiple);

    const [singleStudentOnboarding, setSingleStudentOnboarding] = useState(
      single
    );
    const [multipleStudentOnboarding, setMultipleStudentOnboarding] = useState(
      multiple
    );

    useEffect(() => {
      getBatchDetails();
    }, []);

    const getBatchDetails = () => {
      axios
        .get(`${appConfig.host}${urls.getAllBatches}`)
        .then((success) => {
          setBatchList(success.data.data);
         
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // useEffect(() => {
    //   getFreeStructure();
    // }, [selectedBatch]);

    const getFreeStructure = () => {
      let tempFeeStructure;
      if (selectedBatch) {
        batchList.forEach((batch) => {
          if (batch._id === selectedBatch) {
            tempFeeStructure = batch.feeStructure;
          }
        });
        setFeeStructure(tempFeeStructure);
      }
    };

    useEffect(() => {
      getCourseList();
    }, []);

    const getCourseList = () => {
      axios
        .get(`${appConfig.host}${urls.instituteCourse}`)
        .then((success) => {
          console.log("success", success);
          setCourseList(success.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...studentModalForm,
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
      setStudentModalForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...studentModalForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setStudentModalForm({ ...updatedForm });
    };

    const handleBatchChange = (event, data) => {
      setSelectedBatch(event.target.value);
      setTempSelectedBatch(data.props.data);
      console.log("selected course data", data.props.data);
    };

    const handleFeeStructureChange = (event, data) => {
      setSelectedFeeStructure(event.target.value);
      setTempSelectedFeeStructure(data.props.data);
    };

    const handleCourseChange = (event, data) => {
      setSelectedCourse(event.target.value);
      setTemSelectedCourse(data.props.data);

      console.log(
        "selectted course in student onboarding",
        tempSelectedCourse,
        event.target.value,
        data.props.data
      );
    };
    console.log(
      "selectted course in student onboarding ****",
      tempSelectedCourse
    );

    const handleSendStudentData = () => {
      if (formIsValid) {
        setError(null);
        let params = {
          name: studentModalForm.studentName.value,
          email: studentModalForm.studentEmail.value,
          contactNumber: studentModalForm.studentPhoneNumber.value,
          // discount: studentModalForm.discount.value,
          courses: [
            {
              courseId: tempSelectedCourse[0],
              courseName: tempSelectedCourse[1],
              batchId: tempSelectedBatch[0],
              batchName: tempSelectedBatch[1],
              // feeStructureId: tempSelectedFeeStructure[0],
              // feeStructureName: tempSelectedFeeStructure[1],
            },
          ],
        };
        axios
          .post(`${appConfig.host}${urls.addStudent}`, params)
          .then((success) => {
            toast.success("Student Added successfully");
            props.onChildClick();
            props.onHide();
          })
          .catch((error) => {
            console.log("students info",error);
            toast.error(error);
          });
      } else {
        setError("please Enter all the fields.");
      }
    };

    const IsFormValidForBulkUpload = () => {
      let tempFormIsValid = true;
      let course = false;
      let batch = false;
      let csvFile = false;
      if (courseInBulk !== undefined && courseInBulk !== null) {
        course = true;
      }

      // batchInBulk
      if (batchInBulk !== undefined && batchInBulk !== null) {
        batch = true;
      }
      // if(bulkUploadFile !== undefined  ){
      //   csvFile= true;
      // }
      if (bulkFileState !== undefined) {
        csvFile = true;
      }
      // tempFormIsValid =tempFormIsValid && course && batch && csvFile;
      tempFormIsValid = tempFormIsValid && course && batch && csvFile;

      return tempFormIsValid;
    };
    const handleStudentBulkUpload = () => {
      if (IsFormValidForBulkUpload()) {
        setError(null);
        console.log("here we are now");

        //   let params = {
        //     courseId:courseInBulk ,
        //     batchId:batchInBulk  ,
        //     bulkFile:bulkUploadFile,
        //   };
        //   axios
        //   .post(`${appConfig.host}${urls.bulkUpload}`, params)
        //   .then((success) => {
        //     toast.success("Student Added successfully");
        //     props.onHide();
        //   })

        //   .catch((error) => {
        //     toast.error(error);
        //   });

        axios({
          method: "post",
          url: `${appConfig.host}${urls.bulkUploadPOST}`,
          data: bulkFileState,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((success) => {
            // toast.success("Bulk File  Uploded");
            console.log("bulk upload done", success);

            if (
              success.data.message ==
              "Partial bulk student Onboarding successful. Please find error in file."
            ) {
              toast.success("Partial Bulk File Uploaded");

              window.open(success.data.data.errorFileLink);
            }
            if (success.data.message == "Bulk student Onboarding successful.") {
              toast.success("Whole Bulk File Uploaded");
            }

            // const [courseInBulk,setCourseInBulk]=useState(" ");
            // const [batchInBulk,setBatchInBulk]=useState(" ");
            setCourseInBulk(null);
            setBatchInBulk(null);
            setBulkFileState();
            setUplaodedFilename(" ");
            props.onHide();
          })
          .catch((error) => {
            toast.error("Student Bulk Upload Fail");
          });
      } else {
        setError("please Enter all the fields.");
      }
    };

    const inputFirstPageImageUpload = (event) => {
      let formData = new FormData();
      console.log(
        "is input field is changing",
        event,
        event.target.files[0],
        event.target.files[0].name
      );

      if (event.target.files[0].name) {
        setUplaodedFilename(event.target.files[0].name);
      }
      // console.table("file", event.target.files[0]);
      // console.log("is file upload",event,event.target.files[0]);

      //     if(courseInBulk !== undefined && courseInBulk !== null ){
      //       formData.append("courseId", courseInBulk);
      //     }
      //     if(batchInBulk !== undefined && batchInBulk !== null ){
      // formData.append("batchId ", batchInBulk);

      //     }

      if (courseInBulk !== undefined && courseInBulk !== null) {
        formData.append("courseId", courseInBulk);
      }
      if (batchInBulk !== undefined && batchInBulk !== null) {
        formData.append("batchId", batchInBulk);
      }

      if (event.target.files.length) {
        // formData.append("courseId", courseInBulk);
        // formData.append("batchId", batchInBulk);
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];

        if (["xlsx", "csv", "XLSX", ".CSV"].includes(uploadFileExtensions)) {
          formData.append("bulkFile", event.target.files[0]);
        } else {
          toast.error("select .csv or .xlsx file format");
        }
      }
      setBulkFileState(formData);
      console.log(
        "bulk fileeeeeeeeeeee ",
        formData,
        formData.get("courseId"),
        formData.get("batchId"),
        formData.get("bulkFile")
      );

      // axios({
      //   method: "post",
      //   url: `${appConfig.host}${urls.bulkUploadPOST}`,
      //   data: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
      //   .then((success) => {
      //     toast.success("File  Uploded");
      //     console.log("bulk upload done",success);
      //   })
      //   .catch((error) => {
      //     toast.error("Course Image Upload Fail");
      //   });
    };

    console.log("bulk state files", bulkFileState);
    return (
      <AddStudentModalComponent
        {...props}
        {...{
          studentModalForm,
          inputBlurHandler,
          inputChangeHandler,
          batchList,
          selectedBatch,
          handleBatchChange,
          feeStructure,
          handleFeeStructureChange,
          selectedFeeStructure,
          courseList,
          selectedCourse,
          handleCourseChange,
          handleSendStudentData,
          error,
          singleStudentOnboarding,
          multipleStudentOnboarding,
          single,
          multiple,
          courseInBulk,
          batchInBulk,
          handleCourseBulk,
          handleBatchBulk,
          bulkUploadFile,
          setBulkUploadFile,
          handleStudentBulkUpload,
          inputFirstPageImageUpload,
          uploadedFilename,
          colseModal
        }}
      />
    );
  }
);

export default enhancer;
