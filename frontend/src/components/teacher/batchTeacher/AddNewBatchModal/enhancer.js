import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import addNewBatchFormInit from "./addNewBatchForm";
import { validate } from "../../../../shared/helpers/formValidation";
import { toast } from "react-toastify";
import moment from "moment";
// import { Select } from "antd";

export let enhancer = compose(
  connect(
    ({ auth, teacherCourse }) => ({ auth, teacherCourse })
    // (dispatch) => ({
    //   setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    // })
  ),
  withRouter,
  (AddNewBatchModal) => ({
    // auth,
    // setAuthUser,
    teacherCourse,

    ...props
  }) => {
    let [loader, setLoader] = useState(false);
    let [addNewBatchForm, setAddNewBatchForm] = useState(addNewBatchFormInit);
    const [formIsValid, setFormIsValid] = useState(false);

    const [error, setError] = useState(null);
    const [courseList, setCourseList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [selectedTeacherName, setSelectedTeacherName] = useState("");

    const [check,setCheck]=useState(false);

    const getTeacherName = (id) => {
      let clickedOption = teacherList.find((teacher) => teacher.id === id);
      let value = `${clickedOption.id}, ${clickedOption.teacher}`;
      let teachername = `${clickedOption.teacher}`;
      console.log("Only teacher name ", teachername);

      console.log("selected teacher name  baesd on id", value);
      setSelectedTeacherName(teachername);
    };



    const [selectedTeacherList, setSelectedTeacherList] = useState([]);
    const [teacher , setTeacher]=useState([]);
    console.log("selected teacher list in batch",selectedTeacherList)

const handleCheck=()=>{
  setCheck(true);
}


    const onSelectTeacherAdd = (selectedList, selectedItem) => {
     
      try {
        let tempArray = [...selectedTeacherList];
        tempArray.push(selectedItem);
        setSelectedTeacherList(tempArray);
        // setCheck(true);
        setCheck(false);

      } catch (e) {
        console.log("Something went wrong while selecting teacher", e);
      }

    }

    // onSelectTeacherAdd,
    // onSelectTeacherRemove

    const onSelectTeacherRemove = (selectedList, removedItem) => {

      try {
        let tempArray = [];
        selectedTeacherList.forEach((content) => {
          if (removedItem.id != content.id) {
            tempArray.push(content);
          }
        });
        // if(selectedTeacherList.length== 0){
        //    setCheck(true);
        // }
        // else{
        //   setCheck(false);
        // }

        if( teacher.length== 0){
          setCheck(true);
       }
       else{
         setCheck(false);
       }
        setSelectedTeacherList(tempArray);
      }
      catch (e) {
        console.log("Something went wrong while removing teacher", e);
      }


    }


    useEffect(()=>{

      console.log("teacher list changed",selectedTeacherList);
      // if(selectedTeacherList.length !== 0){
      
              // if(tempArray.length)
              let temp = [];
              let finalCourseModule = [];
              // if (courseList.length > 0) {
              // event.preventDefault();
              selectedTeacherList.forEach((element) => {
                console.log("element of teachers", element);
                temp.push({
                  teacherId: element.id,
                  // value: element.subject,
                  // teacher: element.userMetaData.name,
                });
              });
        
              //
              setTeacher([...temp]);
      
      // }
          },[selectedTeacherList])



          console.log("teacherssssssssssssssssssssss",teacher);
          // useEffect(()=>{
          //   if(selectedTeacherList.length== 0 && teacher.length== 0){
          //     setCheck(true);
          //  }
          //  else{
          //    setCheck(false);
          //  }
          // },[teacher])

    let { token } = props.match.params;

    var startGlobal;
    var endGlobal;

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
      console.log("start date", date);

      setSelectedDate(date);
      // console.log("selected end date ", setSelectedDate(date));

      var startDate = new Date(date);

      console.log(
        "This is start date with the momet format ",
        moment(selectedDate).format("MM-DD-YYYY")
      );
    };

    // console.log("start date global value outside function", startGlobal);

    const convert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join(",");
    };

    // var MyDate= new Date(moment(selectedDate).format("DD/MM/YYYY")));

    // end date
    const [selectedDate2, setSelectedDate2] = useState(
      // new Date("2020-08-18T21:11:54")
      new Date()

      // new Date("2020-08-18")
    );
    const handleDateChange2 = (date) => {
      console.log("end date", date);
      setSelectedDate2(date);
    };

    const convert2 = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join(",");
    };

    test(
      // new Date(2008, 10, 4), // November 4th, 2008
      // new Date(2010, 2, 12) // March 12th, 2010

      new Date(selectedDate),
      new Date(selectedDate2)
    );

    // date & time
    //  start date

    function monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    }

    function test(d1, d2) {
      var diff = monthDiff(d1, d2);
      console.log(
        d1.toISOString().substring(0, 10),
        "to",
        d2.toISOString().substring(0, 10),
        ":",
        diff
      );
    }

    useEffect(() => {
      // allGetCalls();

      getAllCourse();
      getAllTeacher();
      clearFormData();
    }, []);

    useEffect(() => {
      getCourseList();
    }, [courseList.length > 0]);

    useEffect(() => {
      getTeacherList();
    }, [teacherList.length > 0]);

    const getCourseList = (event) => {
      console.log("course list function enhancer", courseList);
      console.log("course list length", courseList.length);
      let temp = [];
      let finalCourseModule = [];
      // if (courseList.length > 0) {
      // event.preventDefault();
      courseList.forEach((element) => {
        console.log("element", element);
        temp.push({
          id: element._id,
          // value: element.subject,
          value: element.name,

          // teacher: element.teacher,
        });
      });

      //
      setCourseList([...temp]);
    };

    const getAllCourse = (e) => {
      console.log("get all course list in batch is called")
      setLoader(true);
      axios
      .get(`${appConfig.host}${"/admin/instituteCourses"}`)

        // .get(`${appConfig.host}${urls.getAllCoursesForAdmin}`)
        .then((result) => {
          console.log("course list data to create batch", result.data.data);
          // setTeacherCourse(result.data.data);
          setCourseList(result.data.data);
          console.log("data get successfully");

          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    };
    console.log("course list state outsuide  function", courseList);
    // All teacher list get API call
    // const [teacherList, setTeacherList] = useState([]);
    const getTeacherList = (event) => {
      console.log("teacherList  function enhancer", teacherList);
      console.log("teacherList  length", teacherList.length);
      let temp = [];
      let finalCourseModule = [];
      // if (courseList.length > 0) {
      // event.preventDefault();
      teacherList.forEach((element) => {
        console.log("element", element);
        temp.push({
          id: element.userMetaData._id,
          // value: element.subject,
          teacher: element.userMetaData.name,
        });
      });

      //
      setTeacherList([...temp]);
    };
    const getAllTeacher = (e) => {
      console.log("I am inside of teacher list get call");

      setLoader(true);
      axios
        .get(`${appConfig.host}${urls.getAllTeacherNameList}`)
        .then((result) => {
          console.log("teacher list data", result.data.data);
          // setTeacherCourse(result.data.data);
          setTeacherList(result.data.data);
          console.log("teacher list get API ");

          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    };
    console.log("teacher list state outsuide  function", teacherList);

    // console.log("selected teacher id,",addNewBatchForm.teacher.value);

    const handleSubmit = () => {
      if (isFormValid(addNewBatchForm)) {
        setLoader(true);
        // console.log("selected teacher id,", addNewBatchForm.teacher.value);

        let params = {
          courseId: addNewBatchForm.course.value,
          name: addNewBatchForm.batchName.value,
          teacher:[...teacher],
          // teacher: [
          //   {
          //     teacherId: addNewBatchForm.teacher.value,

          //     // name: selectedTeacherName,
          //   },
          // ],

          // teacher:(auth.userMetaData.Teacher._id),
          startDate: moment(selectedDate).format("DD-MM-YYYY"),
          endDate: moment(selectedDate2).format("DD-MM-YYYY"),
        };

        axios
          .post(`${appConfig.host}${urls.createNewBatch}`, params)
          .then((success) => {
            setLoader(false);
            toast.success(success.data.message);
            props.onChildClick();
            props.onHide();
          })
          .catch((error) => {
            setLoader(false);
            console.log("error", error);
            // toast.error(error.response.data.message);
          });
        // setShow(false);
      } else {
        showAllInputFieldError();
      }
    };
    // when course list value is change ten execute following code

    const isFormValid = (updatedForm) => {
      let tempFormIsValid = true;

      let teachers=false;
      if(teacher.length >0){
        teachers=true;
      }
      else{
        teachers=false;
      }
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid && teachers;
          
          // selectedTeacherList;
      }
      return tempFormIsValid;
    };

    const showAllInputFieldError = () => {
      const updatedCourseForm = {
        ...addNewBatchForm,
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
      setAddNewBatchForm({ ...updatedCourseForm });
      if (selectedTeacherList.length == 0){
        setCheck(true);
      }
    };

    const clearFormData = () => {
      let allFormKeys = Object.keys(addNewBatchForm);
      let formData = { ...addNewBatchForm };
      allFormKeys.forEach((formKey) => {
        formData[formKey].value = "";
        // formData[formKey].invalid = false;
        // formData[formKey].helperText = "";
        // formData[formKey].touched = true;
      });
      setAddNewBatchForm(formData);
    };

    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...addNewBatchForm,

        // Date
        //   ...selectedDate,
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
      setAddNewBatchForm({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...addNewBatchForm,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      console.log("onChange", event.target.value);
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setAddNewBatchForm({ ...updatedForm });
      if (inputIdentifier == "teacher") {
        console.log("Big Jugad is here");
        // getTeacherName(addNewBatchForm.teacher.value);
      }
    };

    return (
      <AddNewBatchModal
        {...props}
        {...{
          // auth,
          teacherList,
          courseList,
          handleSubmit,
          // getDeatils,
          addNewBatchForm,
          loader,
          error,

          inputBlurHandler,
          inputChangeHandler,

          formIsValid,
          // getTeacherList,
          selectedDate,
          selectedDate2,
          handleDateChange2,
          handleDateChange,
          selectedTeacherList,
          onSelectTeacherAdd,
          onSelectTeacherRemove,
          check,
          handleCheck
          // handleTeacherDetails,
        }}
      />
    );
  }
);

export default enhancer;

// import { compose } from "redux";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { urls } from "../../../../url";
// import { appConfig } from "../../../../constants";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import addNewBatchFormInit from "./addNewBatchForm";
// import { validate } from "../../../../shared/helpers/formValidation";
// import { toast } from "react-toastify";
// import moment from "moment";
// // import { Select } from "antd";

// export let enhancer = compose(
//   connect(
//     ({ auth, teacherCourse }) => ({ auth, teacherCourse })
//     // (dispatch) => ({
//     //   setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
//     // })
//   ),
//   withRouter,
//   (AddNewBatchModal) => ({
//     // auth,
//     // setAuthUser,
//     teacherCourse,

//     ...props
//   }) => {
//     let [loader, setLoader] = useState(false);
//     let [addNewBatchForm, setAddNewBatchForm] = useState(addNewBatchFormInit);
//     const [formIsValid, setFormIsValid] = useState(false);

//     const [error, setError] = useState(null);
//     const [courseList, setCourseList] = useState([]);
//     const [teacherList, setTeacherList] = useState([]);
//     const [selectedTeacherName, setSelectedTeacherName] = useState("");

//     const getTeacherName = (id) => {
//       let clickedOption = teacherList.find((teacher) => teacher.id === id);
//       let value = `${clickedOption.id}, ${clickedOption.teacher}`;
//       let teachername = `${clickedOption.teacher}`;
//       console.log("Only teacher name ", teachername);

//       console.log("selected teacher name  baesd on id", value);
//       setSelectedTeacherName(teachername);
//     };

//     // let { token } = props.match.params;

//     // var startGlobal;
//     // var endGlobal;

//     const [selectedDate, setSelectedDate] = useState(new Date());

//     const handleDateChange = (date) => {
//       console.log("start date", date);

//       setSelectedDate(date);
//       // console.log("selected end date ", setSelectedDate(date));

//       var startDate = new Date(date);

//       console.log(
//         "This is start date with the momet format ",
//         moment(selectedDate).format("MM-DD-YYYY")
//       );
//       // console.log("selected start date ", startDate);

//       // console.log("converted date format ", convert(startDate));
//       // startGlobal = convert(startDate);
//       // console.log("start date global value", startGlobal);
//       // setSelectedDate(startGlobal);
//     };

//     // console.log("start date global value outside function", startGlobal);

//     // end date
//     const [selectedDate2, setSelectedDate2] = useState(
//       // new Date("2020-08-18T21:11:54")
//       new Date()

//       // new Date("2020-08-18")
//     );
//     const handleDateChange2 = (date) => {
//       console.log("end date", date);
//       setSelectedDate2(date);
//       // console.log("selected end date ", setSelectedDate2(date));

//       // var endDate = new Date(date);
//       // console.log("converted date format ", convert2(endDate));
//       // endGlobal = convert2(endDate);

//       // console.log("endGlobal var with date", endGlobal);
//       // setSelectedDate2(endGlobal);
//     };

//     useEffect(() => {
//       // allGetCalls();

//       getAllCourse();
//       getAllTeacher();
//       clearFormData();
//     }, []);

//     useEffect(() => {
//       getCourseList();
//     }, [courseList.length > 0]);

//     useEffect(() => {
//       getTeacherList();
//     }, [teacherList.length > 0]);

//     // useEffect(() => {
//     //     getTeacherName(addNewBatchForm.teacher.value)

//     // }, [addNewBatchForm.teacher.value]);
//     // if(inputIdentifier== "teacher"){
//     //   console.log("Big Jugad is here");
//     //   getTeacherName(addNewBatchForm.teacher.value)
//     // }
//     // useEffect(() => {
//     //   getTeacherList();
//     // }, [addNewBatchForm.teacher.value]);
//     // addNewBatchForm.teacher.value

//     const getCourseList = (event) => {
//       console.log("course list function enhancer", courseList);
//       console.log("course list length", courseList.length);
//       let temp = [];
//       let finalCourseModule = [];
//       // if (courseList.length > 0) {
//       // event.preventDefault();
//       courseList.forEach((element) => {
//         console.log("element", element);
//         temp.push({
//           id: element._id,
//           value: element.subject,
//           // teacher: element.teacher,
//         });
//       });

//       //
//       setCourseList([...temp]);
//     };

//     const getAllCourse = (e) => {
//       setLoader(true);
//       axios
//         .get(`${appConfig.host}${urls.studentAllRegisterClasses}`)
//         .then((result) => {
//           console.log("data", result.data.data);
//           // setTeacherCourse(result.data.data);
//           setCourseList(result.data.data);
//           console.log("data get successfully");

//           setLoader(false);
//         })
//         .catch((error) => {
//           setLoader(false);
//         });
//     };
//     console.log("course list state outsuide  function", courseList);
//     // All teacher list get API call
//     // const [teacherList, setTeacherList] = useState([]);
//     const getTeacherList = (event) => {
//       console.log("teacherList  function enhancer", teacherList);
//       console.log("teacherList  length", teacherList.length);
//       let temp = [];
//       let finalCourseModule = [];
//       // if (courseList.length > 0) {
//       // event.preventDefault();
//       teacherList.forEach((element) => {
//         console.log("element", element);
//         temp.push({
//           id: element.userMetaData._id,
//           // value: element.subject,
//           teacher: element.userMetaData.name,
//         });
//       });

//       //
//       setTeacherList([...temp]);
//     };
//     const getAllTeacher = (e) => {
//       console.log("I am inside of teacher list get call");

//       setLoader(true);
//       axios
//         .get(`${appConfig.host}${urls.getAllTeacherNameList}`)
//         .then((result) => {
//           console.log("teacher list data", result.data.data);
//           // setTeacherCourse(result.data.data);
//           setTeacherList(result.data.data);
//           console.log("teacher list get API ");

//           setLoader(false);
//         })
//         .catch((error) => {
//           setLoader(false);
//         });
//     };
//     console.log("teacher list state outsuide  function", teacherList);

//     // console.log("selected teacher id,",addNewBatchForm.teacher.value);

//     const handleSubmit = () => {
//       if (isFormValid(addNewBatchForm)) {
//         setLoader(true);
//         console.log("selected teacher id,", addNewBatchForm.teacher.value);
//         console.log("selected teacher name in submit", selectedTeacherName);

//         let params = {
//           courseId: addNewBatchForm.course.value,
//           name: addNewBatchForm.batchName.value,
//           teacher: [
//             {
//               teacherId: addNewBatchForm.teacher.value,

//               name: selectedTeacherName,
//             },
//           ],

//           // teacher:(auth.userMetaData.Teacher._id),
//           startDate: moment(selectedDate).format("DD-MM-YYYY"),
//           endDate: moment(selectedDate2).format("DD-MM-YYYY"),
//         };

//         axios
//           .post(`${appConfig.host}${urls.createNewBatch}`, params)
//           .then((success) => {
//             setLoader(false);
//             toast.success(success.data.message);
//             props.onChildClick();
//           })
//           .catch((error) => {
//             setLoader(false);
//             console.log("error", error);
//             // toast.error(error.response.data.message);
//           });
//         // setShow(false);
//         props.onHide();
//       } else {
//         showAllInputFieldError();
//       }
//     };
//     // when course list value is change ten execute following code

//     const isFormValid = (updatedForm) => {
//       let tempFormIsValid = true;
//       for (const key in updatedForm) {
//         tempFormIsValid =
//           !updatedForm[key].invalid &&
//           updatedForm[key].touched &&
//           tempFormIsValid;
//       }
//       return tempFormIsValid;
//     };

//     const showAllInputFieldError = () => {
//       const updatedCourseForm = {
//         ...addNewBatchForm,
//       };
//       for (const key in updatedCourseForm) {
//         if (!updatedCourseForm[key].touched) {
//           let helperText = "";
//           for (const validationKey in updatedCourseForm[key].validation) {
//             const validationResult = validate(
//               validationKey,
//               updatedCourseForm[key].validation[validationKey].value,
//               updatedCourseForm[key].value
//             );
//             if (!validationResult) {
//               helperText =
//                 updatedCourseForm[key].validation[validationKey].errMsg;
//               break;
//             }
//           }

//           updatedCourseForm[key].invalid = true;
//           updatedCourseForm[key].helperText = helperText;
//         }
//       }
//       setAddNewBatchForm({ ...updatedCourseForm });
//     };

//     const clearFormData = () => {
//       let allFormKeys = Object.keys(addNewBatchForm);
//       let formData = { ...addNewBatchForm };
//       allFormKeys.forEach((formKey) => {
//         formData[formKey].value = "";
//         // formData[formKey].invalid = false;
//         // formData[formKey].helperText = "";
//         // formData[formKey].touched = true;
//       });
//       setAddNewBatchForm(formData);
//     };

//     const inputBlurHandler = (event, inputIdentifier) => {
//       const updatedForm = {
//         ...addNewBatchForm,

//         // Date
//         //   ...selectedDate,
//       };
//       const updatedFormElement = {
//         ...updatedForm[inputIdentifier],
//       };
//       let validationResult = true;
//       let helperText;
//       updatedFormElement.value = event.target.value;
//       for (const key in updatedFormElement.validation) {
//         validationResult = validate(
//           key,
//           updatedFormElement.validation[key].value,
//           event.target.value
//         );

//         if (!validationResult) {
//           helperText = updatedFormElement.validation[key].errMsg;
//           break;
//         }
//       }
//       updatedFormElement.invalid = !validationResult;
//       updatedFormElement.helperText = helperText;
//       updatedForm[inputIdentifier] = updatedFormElement;

//       // user detaiils code ends here
//       let tempFormIsValid = true;
//       for (const key in updatedForm) {
//         tempFormIsValid =
//           !updatedForm[key].invalid &&
//           updatedForm[key].touched &&
//           tempFormIsValid;
//       }
//       setFormIsValid(tempFormIsValid);
//       setAddNewBatchForm({ ...updatedForm });
//     };

//     const inputChangeHandler = (event, inputIdentifier) => {
//       const updatedForm = {
//         ...addNewBatchForm,
//       };
//       updatedForm[inputIdentifier].value = event.target.value;
//       console.log("onChange", event.target.value);
//       updatedForm[inputIdentifier].invalid = false;
//       updatedForm[inputIdentifier].helperText = "";
//       updatedForm[inputIdentifier].touched = true;
//       setAddNewBatchForm({ ...updatedForm });
//       if (inputIdentifier == "teacher") {
//         console.log("Big Jugad is here");
//         getTeacherName(addNewBatchForm.teacher.value);
//       }
//     };

//     return (
//       <AddNewBatchModal
//         {...props}
//         {...{
//           // auth,
//           teacherList,
//           courseList,
//           handleSubmit,
//           // getDeatils,
//           addNewBatchForm,
//           loader,
//           error,

//           inputBlurHandler,
//           inputChangeHandler,

//           formIsValid,
//           // getTeacherList,
//           selectedDate,
//           selectedDate2,
//           handleDateChange2,
//           handleDateChange,
//           // handleTeacherDetails,
//         }}
//       />
//     );
//   }
// );

// export default enhancer;

// // const convert = (str) => {
// //   var date = new Date(str),
// //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
// //     day = ("0" + date.getDate()).slice(-2);
// //   return [date.getFullYear(), mnth, day].join(",");
// // };

// // var MyDate= new Date(moment(selectedDate).format("DD/MM/YYYY")));

// // handleChange = id => {
// //   const clickedOption = test.find(item => item.id === id);
// //   const value = `${clickedOption.id}, ${clickedOption.value.x}`;
// //   console.log(value);
// // };

// // useEffect(() => {
// // const handleTeacherDetails = () => {
// //   // (e) => inputChangeHandler(e, "teacher");
// //   {
// //     (e) => inputChangeHandler(e, "teacher");
// //   }

// //   getTeacherName();
// // };
// // }, []);

// // // console.log("endGlobal var with date outside the function", endGlobal);

// // const convert2 = (str) => {
// //   var date = new Date(str),
// //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
// //     day = ("0" + date.getDate()).slice(-2);
// //   return [date.getFullYear(), mnth, day].join(",");
// // };

// // test(
// //   // new Date(2008, 10, 4), // November 4th, 2008
// //   // new Date(2010, 2, 12) // March 12th, 2010

// //   new Date(selectedDate),
// //   new Date(selectedDate2)
// // );

// // // date & time
// // //  start date

// // function monthDiff(d1, d2) {
// //   var months;
// //   months = (d2.getFullYear() - d1.getFullYear()) * 12;
// //   months -= d1.getMonth();
// //   months += d2.getMonth();
// //   return months <= 0 ? 0 : months;
// // }

// // function test(d1, d2) {
// //   var diff = monthDiff(d1, d2);
// //   console.log(
// //     d1.toISOString().substring(0, 10),
// //     "to",
// //     d2.toISOString().substring(0, 10),
// //     ":",
// //     diff
// //   );
// // }
