const addNewBatchFormInit = {
  batchName: {
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
  course: {
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
  // teacher: {
  //   value: "",
  //   validation: {
  //     required: {
  //       value: true,
  //       errMsg: "This field is required",
  //     },
  //   },
  //   invalid: false,
  //   touched: false,
  //   helperText: "",
  // },



  // teacherId: {
  //   value: "",
  //   validation: {
  //     required: {
  //       value: true,
  //       errMsg: "This field is required",
  //     },
  //   },
  //   invalid: false,
  //   touched: false,
  //   helperText: "",
  // },
};
export default addNewBatchFormInit;
