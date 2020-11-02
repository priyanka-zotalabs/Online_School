const forgotPasswordFormInit = {
  teacherName: {
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
  teacherEmail: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
        errMsg: "Enter valid email id",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  teacherPhoneNumber: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([0-9]{10})$/,
        errMsg: "Mobile Number should 10 digit number",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
};

export default forgotPasswordFormInit;
