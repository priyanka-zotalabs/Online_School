const signUpFormInit = {
  name: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
        errMsg: "Please enter full name with space",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  // className: {
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
  // boardName: {
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
  // 
};

export default signUpFormInit;
