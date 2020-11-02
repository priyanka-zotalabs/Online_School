import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../../../url";
import { appConfig } from "../../../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import addNewBatchFormInit from "./addNewBatchForm";
import { validate } from "../../../../../../shared/helpers/formValidation";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { createBrowserHistory } from "history";
// import { browserHistory } from "react-router";

export let enhancer = compose(
  connect(
    ({ auth, teacherCourse }) => ({ auth, teacherCourse })
    // (dispatch) => ({
    //   setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    // })
  ),
  withRouter,
  (AddNewFeesStruct) => ({
    // auth,
    // setAuthUser,
    // teacherCourse,

    ...props
  }) => {
    const location = useLocation();
    let history = useHistory();
    // const browserHistory = createBrowserHistory();
    let [loader, setLoader] = useState(false);

    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);
    const [initialFeesDetails, setInitialFeesDetails] = useState();
    const [intialFeesStructureName, setIntialFeesStructurerName] = useState();
    const [feesStructId, setFeesStructId] = useState("");

    let startFeesDates = location.state.feesStartDate;
    let endFeesDates = location.state.feesEndDate;
    let batchIds = location.state.batchId;
    let particularFees = location.state.particularFees;
    let batchName = location.state.batchName;

    console.log(
      "particularFees & batch Id",
      batchIds,
      particularFees,
      //   particularFees.amount,
      startFeesDates,
      endFeesDates
    );

    let [addNewBatchForm, setAddNewBatchForm] = useState({
      feesStructureName: {
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
      amount: {
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
      tax: {
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
      currency:{
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
      }

    });

    // useEffect(() => {
    //   let tempp = [];
    //   // particularFees.

    //   if (initialFeesDetails !== undefined && initialFeesDetails !== null) {
    //     initialFeesDetails.forEach((element) => {
    //       console.log(
    //         "element in initial data of fees initialFeesDetails ",
    //         element
    //       );

    //       setIntialFeesStructurerName(element.initialName);
    //     });
    //   }
    // }, [initialFeesDetails]);
    // console.log(
    //   "intial stuct name in form",
    //   addNewBatchForm.feesStructureName.value
    // );
    // console.log("intialFeesStructureName", intialFeesStructureName);
    // let tempArray = _.cloneDeep(addNewBatchForm);
    // useEffect(() => {
    //   if (intialFeesStructureName !== undefined) {
    //     tempArray.feesStructureName.value = intialFeesStructureName;
    //     console.log(
    //       "fees name in useEffect",
    //       tempArray.feesStructureName.value
    //     );

    //     setAddNewBatchForm(tempArray);
    //   }
    // }, [intialFeesStructureName]);

    console.log(
      "intial stuct name in form",
      addNewBatchForm.feesStructureName.value
    );
    useEffect(() => {
      let tempp = [];
      // particularFees.
      let tempArray = _.cloneDeep(addNewBatchForm);
      if (particularFees !== undefined && particularFees !== null) {
        particularFees.forEach((element) => {
          console.log("element in initial data of fees ", element.element);
          tempArray.feesStructureName.value = element.element.name;

          // set Initial value of the currency in edit 
          tempArray.currency.value = element.element.currency;

          tempArray.amount.value = element.element.amount;
          tempArray.tax.value = element.element.tax;
          let durationbtnInst = element.element.durationBetweenInstallments.split(
            " ",
            1
          );
          setFeesStructId(element.element._id);
          setValuetwo(Number(durationbtnInst));
          setValue(Number(element.element.numberOfInstallments));

          // tempp.push({
          //   id: element.element._id,
          //   initialName: element.element.name,
          // });
        });
        setAddNewBatchForm(tempArray);
        // setInitialFeesDetails([...tempp]);
      }
    }, [particularFees]);

    // let clickAlert = location.state.clickAlert;

    console.log("startFeesDate add new fees", startFeesDates);
    console.log("endFeesDatet add new fees", endFeesDates);
    console.log("batchIds in add new fees", batchIds);

    const [selectedDate, setSelectedDate] = useState(startFeesDates);
    const [selectedDate2, setSelectedDate2] = useState(endFeesDates);
    const [batchDuration, setBatchDuration] = useState();
    const [totalAmount, setTotalAmount] = useState(0);

    const [parentData, setparentData] = useState();
    console.log(" parentData from param", parentData);

    const monthDifference = moment(new Date(endFeesDates)).diff(
      new Date(startFeesDates),
      "months",
      true
    );
    console.log("Differenec between months ............ ", monthDifference);

    // const handleTotalAmountChange = (e) => {
    //   setTotalAmount(e.target.value);
    // };
    console.log("total amount", totalAmount);
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

    // seperate day, month , year from end date in number format

    let day2 = endFeesDates.slice(0, 2);
    let dayNum2 = parseInt(day2);
    console.log("day", day2, typeof day2, dayNum2, typeof dayNum2);

    let month2 = 1 + moment(endFeesDates, "YYYY/MM/DD").month();
    console.log("months", month2, typeof month2);

    var year2 = endFeesDates.substring(endFeesDates.lastIndexOf("-") + 1);
    var yearNum2 = parseInt(year2);
    console.log("yrrrr", year2, typeof yearNum2);

    // seperate day, month , year from start date in number format
    let day1 = startFeesDates.slice(0, 2);
    let dayNum1 = parseInt(day1);
    console.log("day  one", day1, typeof day1, dayNum1, typeof dayNum1);

    let month1 = 1 + moment(startFeesDates, "YYYY/MM/DD").month();
    console.log("months one", month1, typeof month1);

    var year1 = startFeesDates.substring(startFeesDates.lastIndexOf("-") + 1);
    var yearNum1 = parseInt(year1);
    console.log("yrrrr one", year1, typeof yearNum1);

    // to calculate diffeence between start date and end date
    // start date
    var date1 = new Date(yearNum1, month1, dayNum1); //Remember, months are 0 based in JS
    // end date
    var date2 = new Date(yearNum2, month2, dayNum2);
    var yeardiff1 = date1.getFullYear();
    var yeardiff2 = date2.getFullYear();
    var monthdiff1 = date1.getMonth();
    var monthdiff2 = date2.getMonth();
    if (monthdiff1 === 0) {
      //Have to take into account
      monthdiff1++;
      monthdiff2++;
    }
    var numberOfMonths =
      (yeardiff2 - yeardiff1) * 12 + (monthdiff2 - monthdiff1);
    console.log("numbr of months ", numberOfMonths);

    const months = numberOfMonths;
    // one method to calculate month diff
    // const months = Math.round(
    //   moment
    //     .duration(moment(endFeesDates).diff(moment(startFeesDates)))
    //     .asMonths()
    // );

    console.log("get month ", months);

    console.log(
      "month diference calculation using moment pacakge",
      batchDuration
    );

    // const handleDateChange2 = (date) => {
    //   console.log("end date", date);
    //   setSelectedDate2(date);
    //   // console.log("selected end date ", setSelectedDate2(date));
    // };

    var dateString = "" + yearNum1 + "-" + month1 + "-" + dayNum1;
    // var dateString = '' + year + '-' + month + '-' + day;
    console.log("coverted date string", dateString, typeof dateString);

    const convert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join(",");
    };

    const convert2 = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join(",");
    };

    // //test(new Date(selectedDate), new Date(selectedDate2));

    // useEffect(() => {
    //   monthDiff()

    // },[selectedDate2> selectedDate]);
    // date & time
    //  start date

    // // function monthDiff(d1, d2) {
    // //   var months;
    // //   months = (d2.getFullYear() - d1.getFullYear()) * 12;
    // //   months -= d1.getMonth();
    //  //   months += d2.getMonth();
    // //   return months <= 0 ? 0 : months;
    // // }

    // // function test(d1, d2) {
    //  //   var diff = monthDiff(d1, d2);
    // //   // setBatchDuration(monthDiff(d1, d2));
    // //   console.log(
    // //     d1.toISOString().substring(0, 10),
    // //     "to",
    // //     d2.toISOString().substring(0, 10),
    // //     ":",
    // //     // batchDuration
    // //     diff
    // //   );
    // // }

    // console.log("batch duration", batchDuration);

    // ending of // 1) Batch duration calculation

    //   const handleAssignTestToBatch = (e) => {
    //     props.history.push("/batch/newFees/structure");
    //   };

    const [value, setValue] = useState();
    const [slider1, setSlider1] = useState();



    const handleChange = (name) =>  (event, newValue) => {
      setValue(newValue);
      setValuetwo(0);
     
        setSlider1({
          [name]:newValue
        })
        // setValue({
        //   [name]:newValue
        // })


    };
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
    console.log("value ", value);

    const [valuetwo, setValuetwo] = useState();
    const [slider2, setSlider2] = useState();


    console.log("slider 2 value updated in edit fees section",slider2,valuetwo);

    const handleChangetwo = (name) =>  (event, newValue) => {
      setValuetwo(newValue);

      // setSlider2({
      //   [name]:newValue
      // });
    };

  
    // const handleChangetwo = (event, newValue) => {
    //   setValuetwo(newValue);
    // };
    console.log("value  2", valuetwo);

    const [sliderTwoMax, setSliderTwoMax] = useState(0);
    console.log(" to set max value of the second sliders  2", sliderTwoMax);

    // useful to calculate future month;
    const [futureMonth, setFutureMonth] = useState("");

    // for field repitation

    const [questionList, setQuestionList] = useState([]);
    const [questionList2, setQuestionList2] = useState([]);

    const handleInput = (e, fieldName, mi) => {
      console.log("Question Index selected handleInput", mi);

      let tempArray = _.cloneDeep(questionList);
      tempArray[mi][fieldName].value = e.target.value;
      tempArray[mi][fieldName].invalid = false;
      tempArray[mi][fieldName].helperText = "";
      tempArray[mi][fieldName].touched = true;

      setQuestionList((questionList) => tempArray);
    };
    let Schema = {
      date: {
        value: "",
        validation: {
          required: {
            value: true,
            errMsg: "This field is required",
          },
        },
        invalid: false,
        touched: false,
        helperText: "",
      },

      Amount: {
        value: "",
        validation: {
          required: {
            value: true,
            errMsg: "This field is required",
          },
        },
        invalid: false,
        touched: false,
        helperText: "",
      },
    };

    // let temp = [];
    // questionList.forEach((element) => {
    //   console.log("element of schema in fees structure", element);
    //   temp.push({
    //     date: element.date.value,
    //     amounts: element.Amount.value,
    //     // teacher: element.teacher,
    //   });
    //   setQuestionList2([...temp]);
    // });

    console.log(
      "Fees structure name in add new fees strure fees",
      addNewBatchForm.feesStructureName.value
    );
    console.log(
      "amount in add new fees strure fees",
      addNewBatchForm.amount.value,
      typeof addNewBatchForm.amount.value
    );

    console.log(
      "tax in add new fees strure fees",
      addNewBatchForm.tax.value,
      typeof addNewBatchForm.tax.value
    );

    console.log(
      "Schema.date.value in add new fees strure fees",
      Schema.date.value,
      typeof Schema.date.value
    );

    console.log(
      "Schema.Amount.value in add new fees strure fees",
      Schema.Amount.value,
      typeof Schema.Amount.value
    );

    console.log(
      "Schema.date.value date pushed otsde function",
      Schema.date.value
    );
    console.log(
      "Schema.Amount.value date pushed outside finction",
      Schema.Amount.value
    );
    // selectedDatessss

    // const [totalAmount,setTotalAmount]= useState(0);

    useEffect(() => {
      console.log("before  amount is not enty now ");

      if (
        addNewBatchForm.amount.value !== undefined &&
        addNewBatchForm.amount.value !== null &&
        addNewBatchForm.amount.value !== ""
      ) {
        if (
          addNewBatchForm.tax.value !== undefined &&
          addNewBatchForm.tax.value !== null &&
          addNewBatchForm.tax.value !== ""
        ) {
          console.log(
            "amount is not enty now ",
            addNewBatchForm.amount.value,
            typeof Number(addNewBatchForm.amount.value)
          );
          console.log(
            "amount is not enty now in number form",
            typeof addNewBatchForm.amount.value
          );
        }

        let amountNum = Number(addNewBatchForm.amount.value);
        let taxNum = Number(addNewBatchForm.tax.value);
        let taxInPer = (amountNum * taxNum) / 100;
        let finalAmountNum = amountNum + taxInPer;
        // RepeateDate();'
        setTotalAmount(finalAmountNum);
      }
    }, [addNewBatchForm.amount.value, addNewBatchForm.tax.value]);

    useEffect(() => {
      // RepeateField();
      // let amount=(totalAmount/value)
      RepeateDate();

      // console.log("",valuetwo);
    }, [totalAmount]);

    useEffect(() => {
      let Duration = Math.trunc(months / value);
      setSliderTwoMax(Duration);
      //  let resetSecondSlider=Math.trunc((months /2));

      // if(value>(resetSecondSlider)){
      //     setValuetwo(1);
      //   }

      console.log("first slider value change in useeffect", value);
      // RepeateField();
      // setValuetwo(0);
      // setValuetwo(0);
      RepeateDate();
    }, [value]);

    useEffect(() => {
      // RepeateField();
      RepeateDate();
      // setSlider2(valuetwo);
      console.log("second slider value change in useeffect", valuetwo);
    }, [valuetwo]);
    // to set max value of the second sliders
const handleChangeSlidertwo=(e,value)=>{
  setSlider2(valuetwo);


}
    const RepeateDate = () => {
      let tempArray = _.cloneDeep(questionList);
      let p = tempArray.length;
      console.log("array length", tempArray.length);
      if (p == 0) {
        for (let i = 0; i < value; i++) {
          tempArray.push(Schema);
          console.log("tempArray.push(Schema) at index", tempArray.length);
        }
        setQuestionList(tempArray);
        console.log("array length after push", tempArray.length);
      } else {
        console.log("array lenth is greater than 0 which is =", p);
        for (p; p > 0; p--) {
          tempArray.pop(Schema);
          console.log("tempArray.pop(Schema) at index", tempArray.length);
        }
        setQuestionList(tempArray);
        console.log("array length after pop", tempArray.length, p);

        if (p == 0) {
          for (p; p < value; p++) {
            console.log("hii i am inside RepeateDate function ");
            if (p == 0) {
              if (value !== 1) {
                var currentDate = moment(dateString);
                console.log(
                  "first date (todays ie slected date) with value of i ",
                  p,
                  currentDate.format("DD-MM-YYYY")
                );
                var currentDate = moment(currentDate).subtract(valuetwo, "M");
                console.log(
                  "first date (1 month before todays date) with value of i ",
                  p,
                  currentDate.format("DD-MM-YYYY")
                );

                setFutureMonth(currentDate);
              }
              if (value == 1) {
                var currentDate = moment(dateString);
                console.log(
                  "first date (todays ie slected date) with value of i ",
                  p,
                  currentDate.format("DD-MM-YYYY")
                );
                // var currentDate = moment(currentDate).subtract(1, "M");
                var currentDate = moment(currentDate).subtract(0, "M");

                console.log(
                  "first date (1 month before todays date) with value of i ",
                  p,
                  currentDate.format("DD-MM-YYYY")
                );

                setFutureMonth(currentDate);
              }
            } else {
              // var currentDate = moment(dateString);

              var currentDate = futureMonth;
            }
            var futureMonth = moment(currentDate).add(valuetwo, "M");
            var futureMonthEnd = moment(futureMonth).endOf("month");

            if (
              currentDate.date() != futureMonth.date() &&
              futureMonth.isSame(futureMonthEnd.format("YYYY-MM-DD"))
            ) {
              futureMonth = futureMonth.add(1, "d");
            }

            // console.log(currentDate.format('DD-MM-YYYY'));
            console.log("value of i is ", p, futureMonth.format("DD-MM-YYYY"));

            Schema.date.value = moment(futureMonth).format("DD-MM-YYYY");
            // const [totalAmount,setTotalAmount]= useState(0);
            let amount = (totalAmount / value).toFixed(2);
            Schema.Amount.value = amount;
            console.log("Schema.date.value date pushed", Schema.date.value);
            console.log("Schema.Amount.value date pushed", Schema.Amount.value);

            console.log("schema  before pushing date", Schema);

            tempArray.push(_.cloneDeep(Schema));
            // tempArray.push( "Schema.date.value","Schema.Amount.value")

            console.log("schema after pushing date", Schema);

            console.log("tempArray.push(Schema) at index", tempArray.length);
          }
          setQuestionList(tempArray);
          console.log("All array elements", tempArray);
          console.log("array length after pop+ push", tempArray.length);
        }
      }
    }; // end function

    // ********************************************************

    const handleSubmit = () => {
      if (isFormValid(addNewBatchForm)) {
        // toast.success("Clicked successfully");
        setLoader(true);
        //   console.log("selected teacher id,", addNewBatchForm.teacher.value);

        // {
        //   "batchId": "string",
        //   "name": "string",
        //   "amount": "string",
        //   "tax": "string",
        //   "totalAmount": "string",
        //   "numberOfInstallments": "string",
        //   "durationBetweenInstallments": "string",
        //   "installmentCalculator": [
        //     {
        //       "date": "string",
        //       "amount": "string"
        //     }
        //   ]
        // }

        let temp = [];
        // let finalCourseModule = [];
        // if (courseList.length > 0) {
        // event.preventDefault();
        questionList.forEach((element) => {
          console.log("element of date and amount", element);
          temp.push({
            date: element.date.value,

            amount: element.Amount.value,
          });
        });
        let arrayInsta = [...temp];

        // {
        //   "batchId": "string",
        //   "feeStructureId": "string",
        //   "name": "string",
        //   "amount": "string",
        //   "tax": "string",
        //   "totalAmount": "string",
        //   "numberOfInstallments": "string",
        //   "durationBetweenInstallments": "string",
        //   "installmentCalculator": [
        //     {
        //       "date": "string",
        //       "amount": "string"
        //     }
        //   ]
        // }
        let params = {
          batchId: batchIds,
          feeStructureId: feesStructId,
          name: addNewBatchForm.feesStructureName.value,
          // currency: addNewBatchForm.currency.value,
          currency: addNewBatchForm.currency.value,

          amount: addNewBatchForm.amount.value,
          tax: addNewBatchForm.tax.value,
          totalAmount: totalAmount,
          numberOfInstallments: value,
          durationBetweenInstallments: valuetwo,
          installmentCalculator: [...temp],

          // installmentCalculator: [
          //   {
          //     date: questionList.date,

          //     amount: questionList.Amount,
          //   },
          // ],
        };
        arrayInsta.forEach((element) => {
          console.log("element of date and amount installment cal", element);
        });
        axios
          .put(`${appConfig.host}${urls.addNewFeesStructurepostAPI}`, params)
          .then((success) => {
            setLoader(false);
            toast.success(success.data.message);

            history.goBack();
          })
          .catch((error) => {
            setLoader(false);
            console.log("error", error);
            // toast.error(error.response.data.message);
          });
        // setShow(false);
        // props.onHide();
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
      // if (inputIdentifier == "teacher") {
      //   console.log("Big Jugad is here");
      //   getTeacherName(addNewBatchForm.teacher.value);
      // }
    };

    return (
      <AddNewFeesStruct
        {...props}
        {...{
          selectedDate,
          selectedDate2,
          // handleTotalAmountChange,
          months,
          handleChange,
          value,
          sliderTwoMax,
          handleChangetwo,
          valuetwo,
          questionList,
          handleInput,

          handleSubmit,
          loader,
          error,
          inputBlurHandler,
          inputChangeHandler,
          formIsValid,
          addNewBatchForm,
          totalAmount,
          batchName,
          slider1,
          slider2,
          handleChangeSlidertwo
        }}
      />
    );
  }
);

export default enhancer;
