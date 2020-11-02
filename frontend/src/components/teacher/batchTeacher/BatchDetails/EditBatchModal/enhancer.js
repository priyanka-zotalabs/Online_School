import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../../../../shared/Components/Loading";
import moment from "moment";
import { validate } from "../../../../../shared/helpers/formValidation";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth })
    // (dispatch) => ({
    //   setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    // })
  ),
  withRouter,
  (EditBatchModal) => ({
    // auth,
    // setAuthUser,
    teacherCourse,

    ...props
  }) => {
    // let [loader, setLoader] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const [error, setError] = useState(null);

    // let [addNewBatchForm, setAddNewBatchForm] = useState(addNewBatchFormInit);

    const batchIdInEdit = props.batchId;
    // const [uniquebBatchId, setuniquebBatchId] = useState();
    let [loader, setLoader] = useState(false);
    const [specificBatchData, setSpecificBatchData] = useState([]);
    const [specificBatchInfo, setSpecificBatchInfo] = useState([]);
    const [teacherArray, setTeacherArray] = useState([]);
    const [studentArray, setStudentArray] = useState([]);
    const [courseArray, setCourseArray] = useState([]);
    const [selectedTeacherId, SetSelectedTeacherId] = useState();
    const [teacherList, setTeacherList] = useState([]);
    const [intialTeacherName, setIntialTeacherName] = useState();
    const [intialCourseName, setIntialCourseName] = useState();
    const [putFormatedStartDate, setPutFormatedStartDate] = useState();
    const [putFormatedEndDate, setPutFormatedEndDate] = useState();

    const [selectedStartDate, setSelectedStartDate] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();


   


    const [check,setCheck]=useState(false);


    const [selectedTeacherList1, setSelectedTeacherList1] = useState([]);
    const [selectedTeacherList, setSelectedTeacherList] = useState([]);
console.log("selectedTeacherListttttt",selectedTeacherList)
    const [teacher , setTeacher]=useState([]);

    const handleCheck=()=>{
      setCheck(true);
    }


    useEffect(() => {
      getDataOfBatch();
      getAllTeacher();
    }, []);
    
    // useEffect(() => {
    //   // allGetCalls();

    //   getAllTeacher();
    // }, []);
    console.log("teachers in mutiple edit batch",teacher);

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
    const onSelectTeacherRemove = (selectedList, removedItem) => {

      try {
        let tempArray = [];
        selectedTeacherList.forEach((teacher) => {
          if (removedItem.teacherId != teacher.teacherId) {
            tempArray.push(teacher);
          }
        });
       
      //   if( teacher.length== 0){
      //     setCheck(true);
      //  }
      //  else{
      //    setCheck(false);
      //  }
       setSelectedTeacherList(tempArray);
      
      }
      catch (e) {
        console.log("Something went wrong while removing teacher", e);
      }


    }

    useEffect(()=>{

      console.log("teacher list changed",selectedTeacherList1);
      // if(selectedTeacherList.length !== 0){
      
              // if(tempArray.length)
              let temp = [];
              let finalCourseModule = [];
              // if (courseList.length > 0) {
              // event.preventDefault();
              selectedTeacherList1.forEach((element) => {
                console.log("element of teachers", element);
                temp.push({
                  teacherId: element.teacherId,
                  name:element.name,
                  // teacherName:element.teacherId.name,



                  // value: element.subject,
                  // teacher: element.userMetaData.name,
                });
              });
        
              //
              setSelectedTeacherList([...temp]);
              // setTeacher([...temp]);
      
      // }
          },[selectedTeacherList1])

          const [finalTeacherId,setFinalTeacherId]=useState([]);
useEffect(()=>{
  console.log("final teacher list ",selectedTeacherList);
  let temp = [];
  selectedTeacherList.forEach((element) => {
    console.log("element of teachers at 151", element);
    temp.push({
      teacherId: element.teacherId,
    
    });
  });

  setFinalTeacherId([...temp]);
},[selectedTeacherList])
          console.log("teacherssssssssssssssssssssss",finalTeacherId);



    // console.log("selectedStartDate", selectedStartDate);
    // console.log("selectedEndDate", selectedEndDate);

    // console.log(
    //   "set to local time",
    //   new Date(
    //     specificBatchInfo.startDate.toString().split("GMT")[0] + " UTC"
    //   ).toISOString()
    // );
    // console.log("new date format of today", new Date());

    // console.log(
    //   "specificBatchInfo.startDate in edit ",
    //   specificBatchInfo.startDate
    // );
    // console.log("specificBatchInfo.endDate in edit", specificBatchInfo.endDate);
    // var date = new Date('2024-08-20T00:00:00.000Z');
    var dateNaresh = new Date("2024-08-20T00:00:00.000Z");
    // console.log("naresh suggessions", dateNaresh);
    // console.log("Initial TeacherId -intialTeacherName", intialTeacherName);

    useEffect(() => {
      // allGetCalls();
      if (intialTeacherName !== undefined) {
        // console.log(
        //   "Initial TeacherId -intialTeacherName is not undefine",
        //   intialTeacherName
        // );
        // addNewBatchForm.course.value = intialCourseName;
        // *****************************************************************
        // addNewBatchForm.teacher.value = intialTeacherName;
        // **********************************************************
        // console.log(
        //   " addNewBatchForm.teacher.value console it !",
        //   addNewBatchForm.teacher.value
        // );
      }
    }, [intialTeacherName]);

    useEffect(() => {
      // allGetCalls();
      if (intialCourseName !== undefined) {
        console.log("intialCourseName  is not undefine", intialCourseName);
        addNewBatchForm.course.value = intialCourseName;

        // console.log(
        //   " addNewBatchForm.course.value console it !",
        //   addNewBatchForm.course.value
        // );
      }
    }, [intialCourseName]);
   

    useEffect(() => {
      getTeacherList();
    }, [teacherList.length > 0]);

    const getTeacherList = (event) => {
      console.log(" edit teacherList  function enhancer", teacherList);
      console.log(" Edit teacherList  length", teacherList.length);
      let temp = [];
      let finalCourseModule = [];
      // if (courseList.length > 0) {
      // event.preventDefault();
      teacherList.forEach((element) => {
        // console.log(" Edit teacher list element", element);
        temp.push({
          teacherId: element.userMetaData._id,
          
          name: element.userMetaData.name,
        });
      });

      //
      setTeacherList([...temp]);
    };
    const getAllTeacher = (e) => {
      // console.log("Edit I am inside of teacher list get call");

      setLoader(true);
      axios
        .get(`${appConfig.host}${urls.getAllTeacherNameList}`)
        .then((result) => {
          console.log("teacher list dataaaaaaaa", result.data.data);
          // setTeacherCourse(result.data.data);
          setTeacherList(result.data.data);
          // console.log(" Edit teacher list get API ");

          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    };
    // console.log("Edit teacher list state outsuide  function", teacherList);

    // console.log("specificBatchInfo edit batch ->", specificBatchInfo);
   


  //   useEffect(() => {
  //     getBatchList();
  //   // }, [Object.keys(specificBatchData).length > 0]);
  // }, specificBatchData);


  useEffect(() => {

    console.log("is working",specificBatchData);
    // getBatchList();
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPP",specificBatchData);
    // console.log(
    //   " edit batch -> batchlist list function enhancer",
    //   specificBatchData
    // );
    setSpecificBatchInfo(specificBatchData);

  // }, [specificBatchData]);
    }, [Object.keys(specificBatchData).length >0]);

    useEffect(() => {
      let temp = [];
      var singleTeacherId;
      // var first = teacherArray[0];
      // console.log(first, first.Id);
      teacherArray.forEach((element) => {
        console.log("Edit Teacher Array element", element);
        singleTeacherId = element.teacherId;
        console.log(
          "Edit Teacher Array element.teacher.teacherId",
          singleTeacherId
        );
      });
      setIntialTeacherName(singleTeacherId);
    }, [teacherArray.length > 0]);
    useEffect(() => {
      let temp = [];
      var singleCourserId;

      console.log("ohhhhhhhhhhhhhhhhkkkkkkkkkk",courseArray)
      // var first = teacherArray[0];
      // console.log(first, first.Id);
      courseArray.forEach((element) => {
        console.log("Edit courseId Array element", element);
        singleCourserId = element.courseId;
        console.log(
          "Edit Teacher Array element.courseId.courseId",
          singleCourserId
        );
      });
      setIntialCourseName(singleCourserId);
    }, [courseArray.length > 0]);

    useEffect(() => {
      // const courseTeacherlist= ()=>{

     
      console.log(
        "edit batch -> specificBatchInfo.teachers);",
        specificBatchInfo.teachers
      );
      console.log(
        "edit batch -> specificBatchInfo.students);",
        specificBatchInfo.students
      );

      if (
        typeof specificBatchInfo.course === "object" &&
        specificBatchInfo.course !== null
      ) {
        console.log(
          "edit batch -> specificBatchInfo.cours is  object and not null",specificBatchInfo.course
        );
        let temp = [];
        temp.push(specificBatchInfo.course);
        var chkCourseArray = Array.isArray(temp);

        if (chkCourseArray == true) {
          console.log("edit batch -> chkCourseArray is Array", chkCourseArray);
          setCourseArray([...temp]);
        }
      }

      var chkArray = Array.isArray(specificBatchInfo.teachers);
      var chkArayStudent = Array.isArray(specificBatchInfo.students);
      var chkArayStudent = Array.isArray(specificBatchInfo.students);

      console.log(
        "edit batch -> specificBatchInfo.teachers is Array or not",
        chkArray
      );
      console.log(
        "edit batch -> specificBatchInfo.students is Array or not",
        chkArayStudent
      );

      if (chkArray == true) {
        setTeacherArray(specificBatchInfo.teachers);
      }
      if (chkArayStudent == true) {
        setStudentArray(specificBatchInfo.students);
      }

      console.log(
        "edit batch -> TeacherArray inside usestatesidde",
        teacherArray
      );

      addNewBatchForm.batchName.value = specificBatchInfo.name;

      console.log(
        "addNewBatchForm.batchName.value",
        addNewBatchForm.batchName.value
      );
      console.log("addNewBatchForm.course.value", addNewBatchForm.course.value);
// *************************
      // console.log(
      //   "addNewBatchForm.teacher.value",
      //   addNewBatchForm.teacher.value
      // );

      // *********************
    }, [specificBatchInfo]);
  // }
    // }, [Object.keys(specificBatchInfo).length > 0]);


    console.log("edit batch -> TeacherArray outsidde", teacherArray);
    console.log(
      "edit batch -> StudentArray outsidde",
      studentArray.length,
      studentArray
    );
    console.log("edit batch -> courseArray outside", courseArray);

    // const getBatchList = (event) => {
    //   console.log(
    //     " edit batch -> batchlist list function enhancer",
    //     specificBatchData
    //   );
    //   setSpecificBatchInfo(specificBatchData);
    // };
    const getDataOfBatch = (e) => {
      setLoader(true);
      axios
        .get(
          `${appConfig.host}${urls.specificBatchGetAPIbasedOnBatchId}?batchId=${batchIdInEdit}`
        )
        .then((result) => {
          console.log(
            "EDit resultssssss",
            result.data.data
          );
          setSelectedTeacherList1(result.data.data.teachers)
          setSpecificBatchData(result.data.data);

          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    };

    console.log(
      "edit batch -> setSpecificBatchData out side axios call",
      specificBatchData
    );

    // previous code
    //select dropdowns functions
    const [state, setState] = useState({
      age: "",
      name: "hai",
    });

    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

    const handleDateChange = (date) => {
      setSelectedStartDate(date);
    };
    const handleEndDateChange = (date) => {
      setSelectedEndDate(date);
    };

//for courses
    useEffect(() => {
      if (
        specificBatchInfo.course !== undefined &&
        specificBatchInfo.course !== null
      ) {
        console.log("coursesssssssssss",specificBatchInfo.course, typeof specificBatchInfo.course);

        // if (typeof specificBatchInfo.course == "object" ) {
          console.log(
            "edit batch -> specificBatchInfo.cours is  object and not null",specificBatchInfo.course
          );
          let temp = [];
          temp.push(specificBatchInfo.course);
          var chkCourseArray = Array.isArray(temp);
  console.log("tempppppppppppppp",temp,chkCourseArray);
  // setCourseArray([...temp]);
          if (chkCourseArray == true) {
            console.log("xxxxxxxxxxxxxxxxxxxxxxx", chkCourseArray);
            setCourseArray([...temp]);
          }
        // }
        
      }
    }, [specificBatchInfo.course]);

    useEffect(() => {
      if (
        specificBatchInfo.startDate !== undefined &&
        specificBatchInfo.startDate !== null
      ) {
        console.log("start date in if in edit", specificBatchInfo.startDate);
        console.log(
          "start date in edit",
          moment(specificBatchInfo.startDate).format("DD-MM-YYYY")
        );
        let sDate = moment(specificBatchInfo.startDate);
        setSelectedStartDate(sDate);

        // let
      }
    }, [specificBatchInfo.startDate]);



    useEffect(() => {
      if (selectedStartDate !== undefined && selectedStartDate !== null) {
        // selectedStartDate;
        var dt = new Date(selectedStartDate);
        console.log("default utc format for start time", dt.toISOString());
        // const [putFormatedStartDate, setPutFormatedStartDate] = useState();
        // setPutFormatedStartDate(dt.toISOString());
        var date = moment(selectedStartDate).format("DD-MM-YYYY");

        setPutFormatedStartDate(date);
      }
    }, [selectedStartDate]);

    useEffect(() => {
      if (
        specificBatchInfo.endDate !== undefined &&
        specificBatchInfo.endDate !== null
      ) {
        console.log("end date in if edit",specificBatchInfo, specificBatchInfo.endDate);
        console.log(
          "end date in dd mm yyyy in edit",
          moment(specificBatchInfo.endDate).format("DD-MM-YYYY")
        );
        let eDate = moment(specificBatchInfo.endDate);
        setSelectedEndDate(eDate);
        // let
        // courseTeacherlist();
        
      
      }
    }, [specificBatchInfo.endDate]);

    useEffect(() => {
      if (selectedEndDate !== undefined && selectedEndDate !== null) {
        // selectedStartDate;
        var dt = new Date(selectedEndDate);
        console.log("default utc format for end time", dt.toISOString());
        // setPutFormatedEndDate(dt.toISOString());
        var date = moment(selectedEndDate).format("DD-MM-YYYY");

        setPutFormatedEndDate(date);
        // const [putFormatedEndDate, setPutFormatedEndDate] = useState();
      }
    }, [selectedEndDate]);

    // start Date
    // useEffect(() => {
    //   if (
    //     specificBatchInfo.startDate !== undefined &&
    //     specificBatchInfo.startDate !== null
    //   ) {
    //     console.log(
    //       "This is start date with the momet format in edit code ",
    //       moment(specificBatchInfo.startDate).format("DD-MM-YYYY")
    //     );
    //     var MyStartDate = moment(specificBatchInfo.startDate).format(
    //       "MM-DD-YYYY"
    //     );
    //     console.log("MyStartDate", MyStartDate);
    //     console.log(
    //       "UTC time zone of specificBatchInfo.startDate",
    //       moment.utc(specificBatchInfo.startDate).toDate().toString()
    //     );
    //     var UTCTimeZone = moment
    //       .utc(specificBatchInfo.startDate)
    //       .toDate()
    //       .toString();
    //     console.log("UTCTimeZone", UTCTimeZone);

    //     // var testDate = moment(UTCTimeZone).format("YYYY-MM-DD");
    //     // var isoDate = new Date(testDate).toISOString();
    //     // setPutFormatedStartDate(isoDate);

    //     setSelectedStartDate(UTCTimeZone);
    //   }
    // }, [specificBatchInfo.startDate]);

    // useEffect(() => {
    //   if (selectedStartDate !== undefined && selectedStartDate !== null) {
    //     var testDate = moment(selectedStartDate).format("YYYY-MM-DD");
    //     var isoDate = new Date(testDate).toISOString();
    //     setPutFormatedStartDate(isoDate);
    //     console.log(
    //       "when selectedStartDate changes update PutFormatedStartDate with value",
    //       typeof isoDate,
    //       isoDate
    //     );
    //   }
    // }, [selectedStartDate]);
    // useEffect(() => {
    //   console.log("type of putFormatedStartDate", typeof putFormatedStartDate);
    // }, [putFormatedStartDate]);
    // // End Date

    // useEffect(() => {
    //   if (
    //     specificBatchInfo.endDate !== undefined &&
    //     specificBatchInfo.endDate !== null
    //   ) {
    //     console.log(
    //       "This is end date with the momet format in edit code ",
    //       moment(specificBatchInfo.endDate).format("DD-MM-YYYY")
    //     );
    //     var MyStartDate = moment(specificBatchInfo.endDate).format(
    //       "MM-DD-YYYY"
    //     );
    //     console.log("MyEndDate", MyStartDate);
    //     console.log(
    //       "UTC time zone of specificBatchInfo.end",
    //       moment.utc(specificBatchInfo.endDate).toDate().toString()
    //     );
    //     var UTCTimeZone = moment
    //       .utc(specificBatchInfo.endDate)
    //       .toDate()
    //       .toString();
    //     console.log("UTCTimeZone end", UTCTimeZone);

    //     // var testDate = moment(UTCTimeZone).format("YYYY-MM-DD");
    //     // var isoDate = new Date(testDate).toISOString();
    //     // setPutFormatedEndDate(isoDate);

    //     setSelectedEndDate(UTCTimeZone);
    //   }
    // }, [specificBatchInfo.endDate]);

    // useEffect(() => {
    //   if (selectedEndDate !== undefined && selectedEndDate !== null) {
    //     var testDate = moment(selectedEndDate).format("YYYY-MM-DD");
    //     var isoDate = new Date(testDate).toISOString();
    //     setPutFormatedEndDate(isoDate);
    //     console.log(
    //       "when selectedEndDate changes update setSelectedEndDate with value",
    //       typeof isoDate,
    //       isoDate
    //     );
    //   }
    // }, [selectedEndDate]);

    // moment.utc('2012-12-14T00:29:40.276Z').format();

    const handleCreateNewBatch = (e) => {
      props.history.push("/batch");
    };

    // code for test

    let [addNewBatchForm, setAddNewBatchForm] = useState({
      batchName: {
        value: "",
        validation: {
          required: {
            value: true,
            errMsg: "This field is required",
          },
        },
        invalid: false,
        touched: true,
        helperText: "",
      },
      course: {
        // value: intialCourseName.toString(),
        value: "",

        validation: {
          required: {
            value: true,
            errMsg: "This field is required",
          },
        },
        invalid: false,
        touched: true,
        helperText: "",
      },
      // teacher: {
      //   value: "",
      //   validation: {
      //     required: {
      //       value: true,
      //       errMsg: "This field is required",
      //     },
      //   },
      //   invalid: false,
      //   touched: true,
      //   helperText: "",
      // },
    });

    const [selectedTeacherName, setSelectedTeacherName] = useState("");

    const getTeacherName = (id) => {
      let clickedOption = teacherList.find((teacher) => teacher.id === id);
      let value = `${clickedOption.id}, ${clickedOption.teacher}`;
      let teachername = `${clickedOption.teacher}`;
      console.log("Only teacher name ", teachername);

      console.log("selected teacher name  baesd on id", value);
      setSelectedTeacherName(teachername);
    };
    console.log("putFormatedStartDate before Submit", putFormatedStartDate);
    console.log("putFormatedEndDate before Submit", putFormatedEndDate);
    console.log(" selectedTeacherName inside submit at 644",addNewBatchForm,props.batchId,
    addNewBatchForm.course.value,addNewBatchForm.batchName.value,putFormatedStartDate,putFormatedEndDate,
    finalTeacherId);


    const handleSubmit = () => {
      console.log("inside submit");
      if (isFormValid(addNewBatchForm)) {
        setLoader(true);
        // **********************
        // console.log("selected teacher id,", addNewBatchForm.teacher.value);
        // ************************

        console.log("selected course id,", addNewBatchForm.course.value);
        console.log(
          "selected batchName id,",
          props.batchId,
          addNewBatchForm.batchName.value
        );
        console.log(" selectedTeacherName inside submit", selectedTeacherName,teacher);
        console.log("putFormatedStartDate Submit", putFormatedStartDate);
        console.log("putFormatedEndDate Submit", putFormatedEndDate);
        // const [putFormatedStartDate, setPutFormatedStartDate]=useState();
        // const [putFormatedEndDate, setPutFormatedEndDate]=useState();
        // {
        //   "batchId": "string",
        //   "courseId": "string",
        //   "name": "string",
        //   "teacher": [
        //     {
        //       "teacherId": "string",
        //       "name": "string"
        //     }
        //   ],
        //   "startDate": "string",
        //   "endDate": "string"
        // }

        let params = {
          // batchId: batchIdInEdit,
          batchId: props.batchId,
          courseId: addNewBatchForm.course.value,
    
          name: addNewBatchForm.batchName.value,
          teacher:[...finalTeacherId],

          // teacher:[...teacher],

          // teacher: [
          //   {
          //     teacherId: addNewBatchForm.teacher.value,

          //     // name: selectedTeacherName,
          //   },
          // ],

          startDate: putFormatedStartDate,
          endDate: putFormatedEndDate,
        };

        axios
          .put(`${appConfig.host}${urls.editSpecificBatch}`, params)
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

        // props.onChildClick();
        // setShow(false);
      } else {
        showAllInputFieldError();
      }
    };

    const isFormValid = (updatedForm) => {
      let tempFormIsValid = true;
      let teachers=false;
      if(finalTeacherId.length >0){
        teachers=true;
      }
      else{
        teachers=false;
      }
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched && teachers && 
          tempFormIsValid ;
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
    // use only if neede here
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
        // **************************
        // getTeacherName(addNewBatchForm.teacher.value);
        // *******************************
      }
    };

    return (
      <EditBatchModal
        {...props}
        {...{
          // auth,
          teacherList,
          // courseList,
          handleSubmit,
          // // getDeatils,
          addNewBatchForm,
          loader,
          // error,

          specificBatchInfo,
          courseArray,
          teacherArray,
          selectedStartDate,

          handleDateChange,
          selectedEndDate,
          handleEndDateChange,

          inputBlurHandler,
          inputChangeHandler,

          formIsValid,

          selectedTeacherList,
          onSelectTeacherAdd,
          onSelectTeacherRemove,
          check,
          handleCheck
        }}
      />
    );
  }
);

export default enhancer;
