const createTestFormInit = {
    testTitle: {
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
    testDescription: {
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
    totalQuestions: {
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
    totalTime: {
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
      subject: {
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
      marks: {
        value: "0",
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
      options: {
        value: "0",
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



  };
  export default createTestFormInit;
  




  
//     //   radio btn validations for different number of options
//     //   radio btn validations for different marks of each Question
//     // Question validations
//     question: {
//         value: "",
//         validation: {
//           required: {
//             value: true,
//             errMsg: "This field is required",
//           },
//         },
//         invalid: false,
//         touched: false,
//         helperText: "",
//       },
//       numberOfOptions: {
//         value: "",
//         validation: {
//           required: {
//             value: true,
//             errMsg: "This field is required",
//           },
//         },
//         invalid: false,
//         touched: false,
//         helperText: "",
//       },

//     //   correct Answer

// // numberOfOptions: {
// //         value: "",
// //         validation: {
// //           required: {
// //             value: true,
// //             errMsg: "This field is required",
// //           },
// //         },
// //         invalid: false,
// //         touched: false,
// //         helperText: "",
// //       },
//     //   Explanation of correct Answer
//     explanation: {
//         value: "",
//         validation: {
//           required: {
//             value: true,
//             errMsg: "This field is required",
//           },
//         },
//         invalid: false,
//         touched: false,
//         helperText: "",
//       },

//     //   All option fields
//     options: {
//         value: "",
//         validation: {
//           required: {
//             value: true,
//             errMsg: "This field is required",
//           },
//         },
//         invalid: false,
//         touched: false,
//         helperText: "",
//       },