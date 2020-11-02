import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { urls } from "../../../../url";
import { urls } from "../../../../url";

import { appConfig } from "../../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firstPageInIt from "./createTestForm";
import { validate } from "../../../../shared/helpers/formValidation";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";

export let enhancer = compose(
  connect(
    ({ auth }) => ({ auth }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
    })
  ),
  withRouter,

  (CreateTestComponent) => ({ setAuthUser, ...props }) => {
    let [loader, setLoader] = useState(false);
    // validation Form state
    const [firstPageData, setFirstPageData] = useState(firstPageInIt);

    // let [createTestForm, setCreateTestForm] = useState(createTestFormInit);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    let [formActivePanel1, setFormActivePanel1] = useState(1);
    let [formActivePanel1Changed, setFormActivePanel1Changed] = useState(false);
    const [questionList, setQuestionList] = useState([]);



    const [isChange, SetIsChange] = useState(true);
    const [firstChaneisChange, SetFirstChaneisChange] = useState(true);

    // FirstChaneisChange

    // const swapFormActive = (a) => (param) => (e) => {
    //   setFormActivePanel1(param);
    //   setFormActivePanel1Changed(true);
    // };


    const swapFormActive = (a) => (param) => (e) => {
      if (param === 2) {
        if (isFormValid(firstPageData)) {
          setFormActivePanel1(param);
          setFormActivePanel1Changed(true);
          // firstPageData["options"].touched = false;
          // firstPageData["marks"].touched = false;
          let tempArray = _.cloneDeep(questionList);
          if (tempArray.length > 0) {
            for (let i = 0; i < tempArray.length; i++) {
              tempArray[i]["marks"].touched = false;
              tempArray[i]["marks"].invalid = false;
            }
            setQuestionList(tempArray);


          }
          // SetIsChange(!isChange);
          SetFirstChaneisChange(!firstChaneisChange);

        }
        else {
          showAllInputFieldError()
          setFormActivePanel1(1);
          setFormActivePanel1Changed(false);
        }
      }

      // go to back on details page (after onclick of the bakc btn)
      if (param === 1) {
        setFormActivePanel1(1);
        setFormActivePanel1Changed(true);
      }
    };




    const isFormValid = (updatedForm) => {
      let tempFormIsValid = true;
      for (const key in updatedForm) {
        console.log("is create test keys of form is here ", key, updatedForm[key].invalid, updatedForm[key].touched);
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid;


      }
      return tempFormIsValid;
    };
    const showAllInputFieldError = () => {
      const updatedCourseForm = {
        ...firstPageData,
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
      setFirstPageData({ ...updatedCourseForm });
    };










    // Diff Options handler

    const [diffOptions, setDiffOptions] = useState(true);
    const [diffMarks, setDiffMarks] = useState(true);


    console.log("Diff options & marks ", diffOptions, diffMarks);
    useEffect(() => {

      if (diffOptions == false) {

        console.log("diff options is false");
        firstPageData["options"].touched = true;
        // firstPageData["marks"].touched = false;
        firstPageData["options"].invalid = false;

        console.log("is diff is false (no)", firstPageData["options"].touched, questionList, questionList.length);

        //  for(let i=0;i<questionList.length ;i++){
        //    console.log("questionList number of option is touched",questionList[i]["numberOfOptions"].touched);
        //   questionList[i]["numberOfOptions"].touched = false;
        //   questionList[i]["numberOfOptions"].invalid = true;

        //          }



      }
      if (diffOptions == true && (firstPageData["options"].value !== null)) {

        firstPageData["options"].touched = false;
        console.log("diff options is true");

        //         for(let i=0;i<questionList.length ;i++){
        //  questionList[i]["numberOfOptions"].touched = true;
        //         }

      }

    }, [diffOptions]);


    // for qlist touched or not based on diff options


    useEffect(() => {
      let tempArray = _.cloneDeep(questionList);

      // for diff options
      console.log("qlist length", questionList.length);

      if (tempArray.length > 0) {

        if (diffOptions == false) {
          console.log("qlit is greater than 0  & diffoptin false");

          console.log("is diff is false (no)", firstPageData["options"].touched, tempArray, tempArray.length);


          for (let i = 0; i < tempArray.length; i++) {
            console.log("questionList number of option is touched", tempArray[i]["numberOfOptions"].touched);

            if (tempArray[i]["numberOfOptions"].value !== "") {
              tempArray[i]["numberOfOptions"].touched = true;
              tempArray[i]["numberOfOptions"].invalid = false;
            }
            else {
              tempArray[i]["numberOfOptions"].touched = false;
              tempArray[i]["numberOfOptions"].invalid = true;
              // tempArray[i]["numberOfOptions"].touched = false;
              // tempArray[i]["numberOfOptions"].invalid = false;
            }


          }

        }

        if (diffOptions == true) {

          // if (diffOptions == true && (firstPageData["options"].value !== null)) {
          // firstPageData["options"].touched = false;

          console.log("qlit is greater than 0  & diffoptin true", firstPageData.options.value);


          for (let i = 0; i < tempArray.length; i++) {
            // firstPageData.options.value
            tempArray[i]["numberOfOptions"].value = firstPageData.options.value;

            tempArray[i]["numberOfOptions"].touched = true;
            tempArray[i]["numberOfOptions"].invalid = false;

          }
        }



        // for diff marks

        if (diffMarks == false) {
          console.log("qlit is greater than 0  & diffmarks false");


          for (let i = 0; i < tempArray.length; i++) {
            // tempArray[i]["marks"].touched = false;
            // tempArray[i]["marks"].invalid = true;
            if (tempArray[i]["marks"].value !== '') {

              tempArray[i]["marks"].touched = true;
              tempArray[i]["marks"].invalid = false;
              tempArray[i]["marks"].helperText = " ";
              // // tempArray[i]["marks"].touched = false;
              // // tempArray[i]["marks"].invalid = true;
            }
            // else{
            //   tempArray[i]["marks"].touched = false;
            //   tempArray[i]["marks"].invalid = true;
            // }


            else if (tempArray[i]["marks"].value == '') {
              // tempArray[i]["marks"].touched = false;
              // tempArray[i]["marks"].invalid = false;
              tempArray[i]["marks"].touched = false;
              tempArray[i]["marks"].invalid = true;





              //   // tempArray[i]["marks"].touched = true;
              //   // tempArray[i]["marks"].invalid = false;
              //   // tempArray[i]["marks"].helperText =" ";

            }
            else {
              tempArray[i]["marks"].touched = false;
              tempArray[i]["marks"].invalid = false;
            }
          }
        }

        // if (diffMarks == true && (firstPageData["marks"].value == " ") && (firstPageData["marks"].value == 0)) {
        if (diffMarks == true) {

          //  firstPageData["marks"].touched = false;
          console.log("qlit is greater than 0  & diffmarks true");

          for (let i = 0; i < tempArray.length; i++) {
            tempArray[i]["marks"].value = firstPageData.marks.value;

            // if(tempArray[i]["marks"].value != " "){
            // firstPageData.marks.value
            tempArray[i]["marks"].touched = true;
            tempArray[i]["marks"].invalid = false;
            tempArray[i]["marks"].helperText = " ";
            // }
            // else{


            // tempArray[i]["marks"].touched = false;
            // tempArray[i]["marks"].invalid = true;
            // // tempArray[i]["marks"].helperText =" ";
            // }

            // helperText
            console.log("is marks in qlist is touched when yes is slected ", tempArray[i]["marks"].touched);
          }
          console.log("is marks in qlist is touched when yes is slected ouside if ", tempArray);

        }

        setQuestionList(tempArray);

      }




    }, [isChange, diffMarks, diffOptions])



    useEffect(() => {
      let tempArray = _.cloneDeep(questionList);

      // for diff options
      console.log("qlist length", questionList.length);

      if (tempArray.length > 0) {

        if (diffOptions == false) {
          console.log("qlit is greater than 0  & diffoptin false");

          console.log("is diff is false (no)", firstPageData["options"].touched, tempArray, tempArray.length);


          for (let i = 0; i < tempArray.length; i++) {
            console.log("questionList number of option is touched", tempArray[i]["numberOfOptions"].touched);

            if (tempArray[i]["numberOfOptions"].value !== "") {
              tempArray[i]["numberOfOptions"].touched = true;
              tempArray[i]["numberOfOptions"].invalid = false;
            }
            else {
              // tempArray[i]["numberOfOptions"].touched = false;
              // tempArray[i]["numberOfOptions"].invalid = true;
              tempArray[i]["numberOfOptions"].touched = false;
              tempArray[i]["numberOfOptions"].invalid = false;
            }


          }

        }

        if (diffOptions == true) {

          // if (diffOptions == true && (firstPageData["options"].value !== null)) {
          // firstPageData["options"].touched = false;

          console.log("qlit is greater than 0  & diffoptin true", firstPageData.options.value);


          for (let i = 0; i < tempArray.length; i++) {
            // firstPageData.options.value
            tempArray[i]["numberOfOptions"].value = firstPageData.options.value;

            tempArray[i]["numberOfOptions"].touched = true;
            tempArray[i]["numberOfOptions"].invalid = false;

          }
        }



        // for diff marks

        if (diffMarks == false) {
          console.log("qlit is greater than 0  & diffmarks false");


          for (let i = 0; i < tempArray.length; i++) {
            // tempArray[i]["marks"].touched = false;
            // tempArray[i]["marks"].invalid = true;
            if (tempArray[i]["marks"].value !== '') {

              tempArray[i]["marks"].touched = true;
              tempArray[i]["marks"].invalid = false;
              tempArray[i]["marks"].helperText = " ";
              // // tempArray[i]["marks"].touched = false;
              // // tempArray[i]["marks"].invalid = true;
            }
            // else{
            //   tempArray[i]["marks"].touched = false;
            //   tempArray[i]["marks"].invalid = true;
            // }


            else if (tempArray[i]["marks"].value == '') {
              tempArray[i]["marks"].touched = false;
              tempArray[i]["marks"].invalid = false;
              // tempArray[i]["marks"].touched = false;
              // tempArray[i]["marks"].invalid = true;





              //   // tempArray[i]["marks"].touched = true;
              //   // tempArray[i]["marks"].invalid = false;
              //   // tempArray[i]["marks"].helperText =" ";

            }
            else {
              tempArray[i]["marks"].touched = false;
              tempArray[i]["marks"].invalid = false;
            }
          }
        }

        // if (diffMarks == true && (firstPageData["marks"].value == " ") && (firstPageData["marks"].value == 0)) {
        if (diffMarks == true) {

          //  firstPageData["marks"].touched = false;
          console.log("qlit is greater than 0  & diffmarks true");

          for (let i = 0; i < tempArray.length; i++) {
            tempArray[i]["marks"].value = firstPageData.marks.value;

            // if(tempArray[i]["marks"].value != " "){
            // firstPageData.marks.value
            tempArray[i]["marks"].touched = true;
            tempArray[i]["marks"].invalid = false;
            tempArray[i]["marks"].helperText = " ";
            // }
            // else{


            // tempArray[i]["marks"].touched = false;
            // tempArray[i]["marks"].invalid = true;
            // // tempArray[i]["marks"].helperText =" ";
            // }

            // helperText
            console.log("is marks in qlist is touched when yes is slected ", tempArray[i]["marks"].touched);
          }
          console.log("is marks in qlist is touched when yes is slected ouside if ", tempArray);

        }

        setQuestionList(tempArray);

      }


    }, [firstChaneisChange])


    // }, [isChange,diffMarks,diffOptions])







    console.log("qlist with number of option", questionList);


    useEffect(() => {



      if (diffMarks == false) {

        console.log("diff marks is false");
        firstPageData["marks"].touched = true;
        firstPageData["marks"].invalid = false;



      }




      if (diffMarks == true && (firstPageData["marks"].value == " ") && (firstPageData["marks"].value == 0)) {
        firstPageData["marks"].touched = false;
        console.log("diff marks is true");
        //  for(let i=0;i<questionList.length ;i++){
        //   questionList[i]["marks"].touched = true;
        //          }

      }
    }, [diffMarks]);

    // for qlist touched or not based on diff marks


    const togglingYes = () => {
      setDiffOptions(true);
      setQuestionList([]);
    };

    const togglingNo = () => {
      setDiffOptions(false);
      setQuestionList([]);
      let firstDataCopy = _.cloneDeep(firstPageData);
      firstDataCopy.options.value = "0";
      setFirstPageData((firstPageData) => firstDataCopy);
    };
    const togglingYesDiffmarks = () => {
      setDiffMarks(true);
    };

    const togglingNoDiffmarks = () => {
      setDiffMarks(false);
      let firstDataCopy = _.cloneDeep(firstPageData);
      firstDataCopy.marks.value = "0";
      setFirstPageData((firstPageData) => firstDataCopy);
    };

    let questionSchema = {
      question: {
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

      numberOfOptions: {
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

      correctAnswer: {
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

      explanation: {
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
      // marks for each Question
      marks: {
        value: "",
        validation: {
          required: {
            value: true,
            errMsg: "This field is required",
          },
          regex: {
            value: /^[0-9]*$/,
            errMsg: "Enter Number Only",
          },
        },
        invalid: false,
        touched: false,
        helperText: "",
      },
      options: [],
    };

    // Options Schema
    let optionSchema = {
      // radio buttons value
      option: {
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
      //   options respective text field value
      value: {
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




    //validaton for second panel here


    // const isFormValid2 = (updatedForm) => {
    //   let tempFormIsValid = true;
    //   for (const key in updatedForm) {
    //     tempFormIsValid =
    //       !updatedForm[key].invalid &&
    //       updatedForm[key].touched &&
    //       tempFormIsValid;
    //   }
    //   return tempFormIsValid;
    // };

    const isFormValid2 = (updatedForm) => {




      let tempFormIsValid = true;
      // let tempFormIsValid1 = true;
      // let tempFormIsValid2 = true;
      console.log("updatedForm", updatedForm);
      updatedForm.forEach((element) => {
        for (const key in element) {
          console.log("loop keys and elements", key);
          if (key !== "options") {
            console.log("keys  of qlist and optionlist", key, element[key].invalid, element[key].touched);
            tempFormIsValid =
              !element[key].invalid &&
              element[key].touched &&
              tempFormIsValid;
          }
          else {


            // console.log("else", element[key]);
            element[key].forEach((options) => {
              for (const key in options) {
                // if (key != "content") {
                tempFormIsValid =
                  !options[key].invalid &&
                  options[key].touched &&
                  tempFormIsValid;
                // }
              }
            });
          }

        }


        // if(element.correctAnswer.value)
      })



      return tempFormIsValid;
    }

    const showAllInputFieldError2 = (updatedForm) => {
      // const updatedCourseForm = {
      //   ...questionList,
      // };

      const updatedCourseForm = updatedForm;


      updatedForm.forEach((element) => {

        // for (const key in updatedCourseForm) {

        for (const key in element) {
          console.log("element in show all error for qlist", element);
          console.log("is marks are touched", element["marks"].touched)


          // console.log("key in show all error for qlist", key)
          if (key !== "options") {
            console.log("is marks are touched", element["marks"].touched)
            if (!element[key].touched) {
              // if (!element[key].touched) {
              console.log("element in show all error for qlist at 515", element);

              console.log("is element are touched ", key, element[key].touched)

              let helperText = "";
              for (const validationKey in element[key].validation) {
                const validationResult = validate(
                  validationKey,
                  element[key].validation[validationKey].value,
                  element[key].value
                );
                if (!validationResult) {
                  helperText =
                    element[key].validation[validationKey].errMsg;
                  break;
                }
              }

              element[key].invalid = true;
              element[key].helperText = helperText;
              console.log("element[key].helperText", element[key].helperText);
            }
          }


          // else{
          if (key == "options") {

            element[key].forEach((options) => {


              for (const key in options) {

                if (!options[key].touched) {
                  // if (!element[key].touched) {

                  let helperText = "";
                  for (const validationKey in options[key].validation) {
                    const validationResult = validate(
                      validationKey,
                      options[key].validation[validationKey].value,
                      options[key].value
                    );
                    if (!validationResult) {
                      helperText =
                        options[key].validation[validationKey].errMsg;
                      break;
                    }
                  }

                  options[key].invalid = true;
                  options[key].helperText = helperText;
                  console.log("options[key].helperText", options[key].helperText);
                }

              }

            })

          }


        }
      })
      // setQuestionList({ ...updatedCourseForm });
      // setQuestionList({ ...updatedCourseForm });
      console.log("show All error", updatedCourseForm);

      setQuestionList(updatedCourseForm);

    };




    // validations for second pane end here

    useEffect(() => {
      questionListInitialiser();

    }, [firstPageData.totalQuestions.value, firstPageData.options.value]);

    const questionListInitialiser = () => {
      let tempArray = _.cloneDeep(questionList);
      if (firstPageData.totalQuestions.value > 0) {
        if (tempArray.length === 0) {
          //first time with value

          if (diffOptions) {
            for (let i = 0; i < firstPageData.totalQuestions.value; i++) {
              tempArray.push(
                getQuestionWithDefaultOptions(
                  parseInt(firstPageData.options.value)
                )
              );
            }
          } else {
            for (let i = 0; i < firstPageData.totalQuestions.value; i++) {
              tempArray.push(getQuestionWithDefaultOptions(0));
            }
          }
        } else {
          //do soemthing for dynamic changes
          if (firstPageData.totalQuestions.value < tempArray.length) {
            tempArray.splice(
              firstPageData.totalQuestions.value - 1,
              tempArray.length - firstPageData.totalQuestions.value
            );
          } else {
            while (
              tempArray.length - 1 !=
              parseInt(firstPageData.totalQuestions.value) - 1
            ) {
              if (diffOptions) {
                tempArray.push(
                  getQuestionWithDefaultOptions(
                    parseInt(firstPageData.options.value)
                  )
                );
              } else {
                tempArray.push(questionSchema);
              }
            }
          }
        }






        setQuestionList(tempArray);
      } else {
        // initialise some value
        setQuestionList([]);
      }
      // console.log("temp Array of question list", tempArray);
    };

    //logic for options to list
    const getQuestionWithDefaultOptions = (numOptions) => {
      let questionScehmaCopy = _.cloneDeep(questionSchema);
      for (let i = 0; i < numOptions; i++) {
        questionScehmaCopy.options.push(_.cloneDeep(optionSchema));
      }
      return questionScehmaCopy;
    };

    // module to Question mapping here

    const inputBlurHandlerForQuestions = (event, fieldName, mi) => {
      // // console.log("Question Index selected inputBlurHandlerForQuestions", mi);

      // let tempArray = _.cloneDeep(questionList);
      // tempArray[mi][fieldName].value = e.target.value;
      // tempArray[mi][fieldName].invalid = false;
      // tempArray[mi][fieldName].helperText = "";
      // tempArray[mi][fieldName].touched = true;

      // //for handling numberOfOptions of Each Questions.
      // if (fieldName === "numberOfOptions") {
      //   tempArray[mi].options = [];
      //   for (let i = 0; i < e.target.value; i++) {
      //     tempArray[mi].options.push(_.cloneDeep(optionSchema));
      //   }
      // }

      // setQuestionList((questionList) => tempArray);


      const updatedForm = [...questionList];

      const updatedFormElement = {
        ...updatedForm[mi][fieldName],
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
      updatedForm[mi][fieldName] = updatedFormElement;

      setQuestionList(updatedForm);


    };

    const handleInput = (e, fieldName, mi) => {
      // console.log("Question Index selected handleInput", mi);

      console.log("value of entered of number of options", e.target.value)
      let tempArray = _.cloneDeep(questionList);
      tempArray[mi][fieldName].value = e.target.value;
      tempArray[mi][fieldName].invalid = false;
      tempArray[mi][fieldName].helperText = "";
      tempArray[mi][fieldName].touched = true;

      //for handling numberOfOptions of Each Questions.
      if (fieldName === "numberOfOptions") {
        tempArray[mi].options = [];
        for (let i = 0; i < e.target.value; i++) {
          tempArray[mi].options.push(_.cloneDeep(optionSchema));
        }
      }
      setQuestionList((questionList) => tempArray);
    };

    // inputblurhandler for options
    const inputBlurHandlerForOptions = (event, fieldName, mi, optionIndex) => {
      const updatedForm = [...questionList];
      const updatedFormElement = {
        ...updatedForm[mi]["options"][optionIndex][fieldName],
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

      updatedForm[mi]["options"][optionIndex][fieldName] = updatedFormElement;

      setQuestionList(updatedForm);
    };

    const handleOptionInput = (e, fieldName, questionIndex, optionIndex) => {
      // let temp = [
      //   ...questionList,
      //   ((questionList[questionIndex].options[optionIndex][fieldName].value =
      //     e.target.value),
      //     (questionList[questionIndex].options[optionIndex][
      //       fieldName
      //     ].invalid = false),
      //     (questionList[questionIndex].options[optionIndex][fieldName].helperText =
      //       ""),
      //     (questionList[questionIndex].options[optionIndex][
      //       fieldName
      //     ].touched = true)),
      // ];
      // // console.log("temp", temp);
      // setQuestionList(temp.slice(0, -1));
      let tempQuestions = _.cloneDeep(questionList);
      console.log("I am here to change the input of options", e.target.value);

      tempQuestions[questionIndex].options[optionIndex][fieldName].value =
        e.target.value;
      tempQuestions[questionIndex].options[optionIndex][
        fieldName
      ].invalid = false;
      tempQuestions[questionIndex].options[optionIndex][fieldName].helperText =
        "";
      tempQuestions[questionIndex].options[optionIndex][
        fieldName
      ].touched = true;

      // for options => option.option: it redundantinfo which will change before post axios call in formdata
      tempQuestions[questionIndex].options[optionIndex]["option"].value =
        e.target.value;
      tempQuestions[questionIndex].options[optionIndex][
        "option"
      ].invalid = false;
      tempQuestions[questionIndex].options[optionIndex]["option"].helperText =
        "";
      tempQuestions[questionIndex].options[optionIndex][
        "option"
      ].touched = true;

      setQuestionList((questionList) => tempQuestions);
    };

    // Handle Correct Answer
    const correctAnswerAssignUsingRadioButton = (
      e,
      questionIndex,
      optionIndex
    ) => {
      let tempQuestions = _.cloneDeep(questionList);
      // console.log("Correct Answer Assigned", optionIndex + 1);
      tempQuestions[questionIndex].correctAnswer.value = optionIndex + 1;

      tempQuestions[questionIndex].correctAnswer.invalid = false;
      tempQuestions[questionIndex].correctAnswer.touched = true;
      tempQuestions[questionIndex].correctAnswer.helperText = " ";



      setQuestionList((questionList) => tempQuestions);
    };
    // handle Add Questions on click of ADD Button
    const handleQuestionAddClick = () => {
      let tempArray = _.cloneDeep(firstPageData);
      // console.log("Total Questions plus one", tempArray.totalQuestions.value);
      if (!tempArray.totalQuestions.value) {
        tempArray.totalQuestions.value = 1;
      } else {
        tempArray.totalQuestions.value =
          parseInt(tempArray.totalQuestions.value) + 1;
      }
      setFirstPageData((firstPageData) => tempArray);
    };

    const handleEvalutionCards = (e) => {
      props.history.push("/teacher/evalution");
    };

    useEffect(() => {
      // clearFormData();
      clearFirstForm();
    }, []);

    const clearFirstForm = () => {
      let allFormKeys = Object.keys(firstPageData);
      let formData = { ...firstPageData };

      allFormKeys.forEach((formKey) => {
        formData[formKey].value = "";
        formData[formKey].invalid = false;
        formData[formKey].helperText = "";
        formData[formKey].touched = false;
      });
      setFirstPageData(formData);
    };

    const inputFirstPageBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...firstPageData,
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

      setFirstPageData({ ...updatedForm });
    };
    const inputFirstPageChangedHandler = (event, inputIdentifier) => {
      console.log("when this morks are chnages in function");
      const updatedForm = {
        ...firstPageData,
      };

      updatedForm[inputIdentifier].value = event.target.value;

      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;

      setFirstPageData({
        ...updatedForm,
      });
      if (inputIdentifier === "options") {
        setQuestionList((questionList) => []);
      }
    };









    const handleCreateTest = (event) => {
      SetIsChange(!isChange);


      if (isFormValid2(questionList)) {






        //   // setLoader(true);
        // event.preventDefault();

        const formData = {};
        for (const key in firstPageData) {
          if (key != "options" && key != "marks") {
            formData[key] = firstPageData[key].value;
          }
        }

        let questionFormList = [];
        questionList.map((question) => {
          const questionFormData = {};
          questionFormData["question"] = question.question.value;
          questionFormData["numberOfOptions"] = diffOptions
            ? firstPageData.options.value
            : question.numberOfOptions.value;
          questionFormData["correctAnswer"] = question.correctAnswer.value;
          questionFormData["explanation"] = question.explanation.value;
          questionFormData["marks"] = diffMarks
            ? firstPageData.marks.value
            : question.marks.value;
          let tempOptions = [];
          console.log("question.options", question.options)
          question.options.map((opt, index) => {
            const optionFormData = {};
            // optionFormData["option"] = opt.option.value;
            optionFormData["option"] = index + 1;
            optionFormData["value"] = opt.value.value;
            // optionFormData["content"] = tempContent;
            tempOptions.push(optionFormData);
          });
          questionFormData["options"] = tempOptions;
          questionFormList.push(questionFormData);
        });
        formData["questions"] = questionFormList;

        console.log("questionList at 745", questionList);



        console.log("no error in second panel vaidation for details");
        // if (isFormValid2(questionList)) {
        setLoader(true);


        axios
          .post(`${appConfig.host}${urls.teacherCreateTest}`, formData)
          .then((success) => {
            setLoader(false);
            props.history.push("/teacher/evalution");
            // console.log("success", success);
            toast.success("Test created");
          })
          .catch((error) => {
            console.log("Post Test Creation", error);
            setLoader(false);
          });



      } else {
        console.log("there is  error in second panel vaidation for details");

        showAllInputFieldError2(questionList);
      }

    };

    return (
      <CreateTestComponent
        {...props}
        {...{
          modalShow,
          setModalShow,
          // handleNext,
          loader,
          // handleSubmit,
          // inputChangeHandler,

          // createTestForm,
          // inputBlurHandler,
          formIsValid,
          error,
          // handleTitleChange,
          handleEvalutionCards,
          formActivePanel1,
          swapFormActive,
          handleInput,

          questionList,
          inputBlurHandlerForQuestions,

          inputFirstPageChangedHandler,
          inputFirstPageBlurHandler,
          firstPageData,

          handleCreateTest,
          inputBlurHandlerForOptions,
          handleOptionInput,
          handleQuestionAddClick,
          togglingNo,
          togglingYes,
          togglingYesDiffmarks,
          togglingNoDiffmarks,
          diffOptions,
          diffMarks,
          correctAnswerAssignUsingRadioButton,

        }}
      />
    ); // return Close
  } // CreateTestComponent close whcih is after Withrouter
); // enhancer compose close

export default enhancer;

// // Enter All Enhecner code here only

// // To add error for All required input fileds

// const handleNext = (e) => {
//     if (formIsValid) {
//       setError(null);
//     //   signUp();

//     let params = {
//         testTitle: createTestForm.testTitle.value,
//         testDescription: createTestForm.testDescription.value,
//         totalQuestions: createTestForm.totalQuestions.value,
//         totalTime: createTestForm.totalTime.value,
//         // subject: createTestForm.subject.value,
//         // question: createTestForm.question.value,
//         // numberOfOptions: createTestForm.numberOfOptions.value,
//         // explanation: createTestForm.explanation.value,
//         // options: createTestForm. options.value,

//     };

//     } else {
//       setError("Please provide all fields.");
//     }
//   };

// //   const signUp = () => {
// //     let params = {
// //         testTitle: createTestForm.testTitle.value,

// //     };
// // }

//     // to chk form validations
//     // const handleCreateTest = (e) => {

//     const handleSubmit = (e) => {
//         if (isFormValid(createTestForm)) {
//           setLoader(true);
//           let params = {
//             // courseId: scheduleForm.course.value,
//             // moduleId: scheduleForm.module.value,
//             // chapterId: scheduleForm.chapter.value,
//           };
//         //   axios
//         //     .post(`${appConfig.host}${urls.teacherCreateTest}`, params)
//         //     .then((success) => {
//         //       setLoader(false);
//         //       toast.success(success.data.message);
//         //     })
//         //     .catch((error) => {
//         //       setLoader(false);
//         //       console.log("error", error);
//         //       // toast.error(error.response.data.message);
//         //     });
//         //   setShow(false);
//         // } else {
//         //   showAllInputFieldError();
//         }
//       };

//     const isFormValid = (updatedForm) => {
//         let tempFormIsValid = true;
//         for (const key in updatedForm) {
//           tempFormIsValid =
//             !updatedForm[key].invalid &&
//             updatedForm[key].touched &&
//             tempFormIsValid;
//         }
//         return tempFormIsValid;
//       };

//       const showAllInputFieldError = () => {
//         const updatedCreateTestForm = {
//           ...createTestForm,
//         };
//         for (const key in updatedCreateTestForm) {
//           if (!updatedCreateTestForm[key].touched) {
//             let helperText = "";
//             for (const validationKey in updatedCreateTestForm[key].validation) {
//               const validationResult = validate(
//                 validationKey,
//                 updatedCreateTestForm[key].validation[validationKey].value,
//                 updatedCreateTestForm[key].value
//               );
//               if (!validationResult) {
//                 helperText =
//                 updatedCreateTestForm[key].validation[validationKey].errMsg;
//                 break;
//               }
//             }

//             updatedCreateTestForm[key].invalid = true;
//             updatedCreateTestForm[key].helperText = helperText;
//           }
//         }
//         setCreateTestForm({ ...updatedCreateTestForm });
//       };

//       const clearFormData = () => {
//         let allFormKeys = Object.keys(createTestForm);
//         let formData = { ...createTestForm };
//         allFormKeys.forEach((formKey) => {
//           formData[formKey].value = "";
//           // formData[formKey].invalid = false;
//           // formData[formKey].helperText = "";
//           // formData[formKey].touched = true;
//         });
//         setCreateTestForm(formData);
//       };

//       const inputBlurHandler = (event, inputIdentifier) => {
//         const updatedForm = {
//           ...createTestForm,

//         };
//         const updatedFormElement = {
//           ...updatedForm[inputIdentifier],
//         };
//         let validationResult = true;
//         let helperText;
//         updatedFormElement.value = event.target.value;
//         for (const key in updatedFormElement.validation) {
//           validationResult = validate(
//             key,
//             updatedFormElement.validation[key].value,
//             event.target.value
//           );

//           if (!validationResult) {
//             helperText = updatedFormElement.validation[key].errMsg;
//             break;
//           }
//         }
//         updatedFormElement.invalid = !validationResult;
//         updatedFormElement.helperText = helperText;
//         updatedForm[inputIdentifier] = updatedFormElement;

//         // user detaiils code ends here
//         let tempFormIsValid = true;
//         for (const key in updatedForm) {
//           tempFormIsValid =
//             !updatedForm[key].invalid &&
//             updatedForm[key].touched &&
//             tempFormIsValid;
//         }
//         setFormIsValid(tempFormIsValid);
//         setCreateTestForm({ ...updatedForm });
//       };

//       const inputChangeHandler = (event, inputIdentifier) => {
//         const updatedForm = {
//           ...createTestForm,
//         };
//         updatedForm[inputIdentifier].value = event.target.value;
//         // console.log("onChange", event.target.value);
//         updatedForm[inputIdentifier].invalid = false;
//         updatedForm[inputIdentifier].helperText = "";
//         updatedForm[inputIdentifier].touched = true;
//         setCreateTestForm({ ...updatedForm });
//         console.log(updatedForm[inputIdentifier].value )
//       };
