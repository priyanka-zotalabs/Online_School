const signInFormInit = {
  email: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})|([0-9]{7,14})$/,
        errMsg: "Enter valid email id/mobile number",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  mNumber: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([0-9]{7,14})$/,
        errMsg: "Mobile Number is 7-14 digits number",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  password: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        errMsg:
          "Password should contain 8 characters containing at least one uppercase, one numeric and one special character",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
};

export default signInFormInit;
